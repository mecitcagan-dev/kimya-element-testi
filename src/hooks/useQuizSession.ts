import { useState, useCallback, useRef } from 'react';
import { QuizConfig, QuestionItem, AnswerResult, MissedQuestion, SessionResult } from '../types/quiz';
import { TOPIC_MAP } from '../data/topics';
import {
  createQuestion,
  evaluateAnswer,
  generateChoices,
  getPoolIds
} from '../engine/quizEngine';
import {
  recordTopicResult,
  getWeakTopicIds
} from '../engine/statsEngine';
import { randInt, shuffle } from '../utils/random';
import { squeeze } from '../utils/text';

interface RetryItem {
  id: number | string;
  due: number;
}

export interface QuizProgress {
  freshAnswered: number;
  total: number;
  fullCorrect: number;
  nameCorrect: number;
  catCorrect: number;
  streak: number;
  bestStreak: number;
  totalAnswers: number;
}

export function useQuizSession() {
  const [config, setConfig] = useState<QuizConfig | null>(null);
  const [status, setStatus] = useState<'setup' | 'testing' | 'result'>('setup');
  const [currentQuestion, setCurrentQuestion] = useState<QuestionItem | null>(null);
  const [questionState, setQuestionState] = useState<'asking' | 'feedback'>('asking');

  // Cevap girdi durumları
  const [typedValue, setTypedValue] = useState<string>('');
  const [pickedChoice, setPickedChoice] = useState<string | null>(null);
  const [pickedCategory, setPickedCategory] = useState<string | null>(null);
  const [choices, setChoices] = useState<string[]>([]);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  // Geri bildirim ve sonuçlar
  const [lastFeedback, setLastFeedback] = useState<AnswerResult | null>(null);
  const [progress, setProgress] = useState<QuizProgress>({
    freshAnswered: 0,
    total: 0,
    fullCorrect: 0,
    nameCorrect: 0,
    catCorrect: 0,
    streak: 0,
    bestStreak: 0,
    totalAnswers: 0
  });

  const [sessionResult, setSessionResult] = useState<SessionResult | null>(null);
  const [showPeriodicTable, setShowPeriodicTable] = useState<boolean>(false);

  // Oturum iç durum referansları
  const poolRef = useRef<(number | string)[]>([]);
  const deckRef = useRef<(number | string)[]>([]);
  const retryQueueRef = useRef<RetryItem[]>([]);
  const missedMapRef = useRef<Map<number | string, MissedQuestion>>(new Map());
  const questionIndexRef = useRef<number>(0);
  const freshAskedRef = useRef<number>(0);
  const lastDrawnRef = useRef<number | string>(-1);
  const progressRef = useRef<QuizProgress>(progress);

  const drawFresh = useCallback((): number | string => {
    if (deckRef.current.length === 0) {
      deckRef.current = shuffle(poolRef.current.slice());
      const n = deckRef.current.length;
      if (n > 1 && deckRef.current[n - 1] === lastDrawnRef.current) {
        [deckRef.current[0], deckRef.current[n - 1]] = [deckRef.current[n - 1], deckRef.current[0]];
      }
    }
    const drawn = deckRef.current.pop() ?? poolRef.current[0];
    lastDrawnRef.current = drawn;
    return drawn;
  }, []);

  const pickNextQuestion = useCallback((cfg: QuizConfig): QuestionItem | null => {
    const pos = questionIndexRef.current + 1;

    // 1) Vakti gelmiş tekrar sorusu
    let retryIdx = -1;
    retryQueueRef.current.forEach((r, i) => {
      if (r.due <= pos && (retryIdx < 0 || r.due < retryQueueRef.current[retryIdx].due)) {
        retryIdx = i;
      }
    });

    if (retryIdx >= 0) {
      const item = retryQueueRef.current.splice(retryIdx, 1)[0];
      return createQuestion(item.id, cfg.quiz, true, cfg);
    }

    // 2) Sıradaki yeni soru
    if (poolRef.current.length > 0 && freshAskedRef.current < cfg.total) {
      freshAskedRef.current += 1;
      const id = drawFresh();
      return createQuestion(id, cfg.quiz, false, cfg);
    }

    // 3) Bekleyen tekrarlar varsa onları sor
    if (retryQueueRef.current.length > 0) {
      retryIdx = 0;
      retryQueueRef.current.forEach((r, i) => {
        if (r.due < retryQueueRef.current[retryIdx].due) {
          retryIdx = i;
        }
      });
      const item = retryQueueRef.current.splice(retryIdx, 1)[0];
      return createQuestion(item.id, cfg.quiz, true, cfg);
    }

    return null;
  }, [drawFresh]);

  const presentNext = useCallback((cfg: QuizConfig) => {
    const nextQ = pickNextQuestion(cfg);
    if (!nextQ) {
      // Sorular tükendi, oturumu bitir
      const missed = Array.from(missedMapRef.current.values());
      const p = progressRef.current;
      const topicInfo = TOPIC_MAP.get(cfg.quiz);
      const res: SessionResult = {
        quiz: cfg.quiz,
        topicTitle: topicInfo?.title || cfg.quiz,
        answered: p.freshAnswered,
        full: p.fullCorrect,
        nameOk: p.nameCorrect,
        catOk: p.catCorrect,
        bestStreak: p.bestStreak,
        answers: p.totalAnswers,
        missed,
        missedZs: missed.map(m => m.z),
        includeCompoundType: cfg.includeCompoundType
      };
      setSessionResult(res);
      setStatus('result');
      return;
    }

    questionIndexRef.current += 1;
    setCurrentQuestion(nextQ);
    setQuestionState('asking');
    setTypedValue('');
    setPickedChoice(null);
    setPickedCategory(null);
    setWarningMessage(null);
    setLastFeedback(null);

    if (cfg.mode === 'choice') {
      const generated = generateChoices(nextQ);
      setChoices(generated);
    } else {
      setChoices([]);
    }
  }, [pickNextQuestion]);

  const startQuiz = useCallback((cfg: QuizConfig) => {
    const weakList = getWeakTopicIds(cfg.quiz);
    const pool = getPoolIds(cfg, weakList);

    setConfig(cfg);
    poolRef.current = pool;
    deckRef.current = [];
    retryQueueRef.current = [];
    missedMapRef.current = new Map();
    questionIndexRef.current = 0;
    freshAskedRef.current = 0;
    lastDrawnRef.current = -1;

    const initialProgress: QuizProgress = {
      freshAnswered: 0,
      total: cfg.total,
      fullCorrect: 0,
      nameCorrect: 0,
      catCorrect: 0,
      streak: 0,
      bestStreak: 0,
      totalAnswers: 0
    };
    progressRef.current = initialProgress;
    setProgress(initialProgress);
    setStatus('testing');

    presentNext(cfg);
  }, [presentNext]);

  const submitAnswer = useCallback(() => {
    if (!currentQuestion || !config || questionState !== 'asking') return;

    const isChoice = config.mode === 'choice';
    const answerText = isChoice ? (pickedChoice || '') : typedValue;
    const hasText = squeeze(answerText).length > 0;
    const requiresCategory = currentQuestion.includeType;
    const hasCategory = pickedCategory !== null;

    if (!hasText && requiresCategory && !hasCategory) {
      setWarningMessage(
        isChoice ? 'Lütfen bir seçenek ve bir tür seçin.' : 'Lütfen cevabı yazın ve bir tür seçin.'
      );
      return;
    }

    if (!hasText) {
      setWarningMessage(
        isChoice ? 'Lütfen bir seçenek işaretleyin.' : 'Lütfen cevabı yazın.'
      );
      return;
    }

    if (requiresCategory && !hasCategory) {
      setWarningMessage('Lütfen bir tür/kategori seçin.');
      return;
    }

    setWarningMessage(null);
    const evalRes = evaluateAnswer(currentQuestion, answerText, pickedCategory, isChoice);
    setLastFeedback(evalRes);
    setQuestionState('feedback');

    // İstatistik ve sayaç güncelleme
    const isRetry = currentQuestion.retry;
    const prev = progressRef.current;
    const newStreak = evalRes.full ? prev.streak + 1 : 0;
    const newBestStreak = Math.max(prev.bestStreak, newStreak);

    const updated: QuizProgress = {
      ...prev,
      totalAnswers: prev.totalAnswers + 1,
      freshAnswered: isRetry ? prev.freshAnswered : prev.freshAnswered + 1,
      fullCorrect: (!isRetry && evalRes.full) ? prev.fullCorrect + 1 : prev.fullCorrect,
      nameCorrect: (!isRetry && evalRes.nameOk) ? prev.nameCorrect + 1 : prev.nameCorrect,
      catCorrect: (!isRetry && evalRes.catOk) ? prev.catCorrect + 1 : prev.catCorrect,
      streak: newStreak,
      bestStreak: newBestStreak
    };
    progressRef.current = updated;
    setProgress(updated);

    // Kalıcı konu istatistiğini kaydet
    recordTopicResult(
      currentQuestion.quiz,
      currentQuestion.id,
      evalRes.nameOk,
      evalRes.catOk,
      currentQuestion.includeType
    );

    // Yanlışları kaydet & kuyruğa ekle
    const qId = currentQuestion.id;
    if (!evalRes.full) {
      if (!missedMapRef.current.has(qId)) {
        missedMapRef.current.set(qId, {
          z: qId,
          title: currentQuestion.standard.prompt,
          prompt: currentQuestion.standard.prompt,
          correctText: currentQuestion.standard.answer,
          typed: squeeze(answerText),
          pickedCat: pickedCategory || '',
          resolved: false
        });
      }
      if (config.retry) {
        retryQueueRef.current.push({
          id: qId,
          due: questionIndexRef.current + randInt(3, 5)
        });
      }
    } else {
      if (missedMapRef.current.has(qId)) {
        missedMapRef.current.get(qId)!.resolved = true;
      }
    }
  }, [currentQuestion, config, questionState, pickedChoice, typedValue, pickedCategory]);

  const advanceToNext = useCallback(() => {
    if (!config || questionState !== 'feedback') return;
    presentNext(config);
  }, [config, questionState, presentNext]);

  const finishQuiz = useCallback(() => {
    if (!config) {
      setStatus('setup');
      return;
    }
    const missed = Array.from(missedMapRef.current.values());
    const p = progressRef.current;
    const topicInfo = TOPIC_MAP.get(config.quiz);
    const res: SessionResult = {
      quiz: config.quiz,
      topicTitle: topicInfo?.title || config.quiz,
      answered: p.freshAnswered,
      full: p.fullCorrect,
      nameOk: p.nameCorrect,
      catOk: p.catCorrect,
      bestStreak: p.bestStreak,
      answers: p.totalAnswers,
      missed,
      missedZs: missed.map(m => m.z),
      includeCompoundType: config.includeCompoundType
    };
    setSessionResult(res);
    setStatus('result');
  }, [config]);

  const restartQuiz = useCallback(() => {
    if (config) {
      startQuiz(config);
    }
  }, [config, startQuiz]);

  const startMissedOnly = useCallback(() => {
    if (config && sessionResult && sessionResult.missedZs.length > 0) {
      startQuiz({
        ...config,
        kind: 'list',
        zs: sessionResult.missedZs.slice(),
        total: sessionResult.missedZs.length
      });
    }
  }, [config, sessionResult, startQuiz]);

  const togglePeriodicTable = useCallback(() => {
    setShowPeriodicTable(prev => !prev);
  }, []);

  const goToSetup = useCallback(() => {
    setStatus('setup');
    setCurrentQuestion(null);
    setQuestionState('asking');
  }, []);

  return {
    config,
    status,
    currentQuestion,
    questionState,
    typedValue,
    pickedChoice,
    pickedCategory,
    choices,
    warningMessage,
    lastFeedback,
    progress,
    sessionResult,
    showPeriodicTable,
    hasMore: poolRef.current.length > 0 || retryQueueRef.current.length > 0,
    setTypedValue,
    setPickedChoice,
    setPickedCategory,
    startQuiz,
    submitAnswer,
    advanceToNext,
    finishQuiz,
    restartQuiz,
    startMissedOnly,
    togglePeriodicTable,
    setShowPeriodicTable,
    goToSetup
  };
}
