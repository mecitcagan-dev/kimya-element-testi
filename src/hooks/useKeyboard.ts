import { useEffect } from 'react';
import { TopicId } from '../types/topics';
import { QuestionItem, AnswerMode } from '../types/quiz';

interface UseKeyboardProps {
  status: 'setup' | 'testing' | 'result';
  topic: TopicId;
  question: QuestionItem | null;
  questionState: 'asking' | 'feedback';
  mode: AnswerMode;
  choices: string[];
  onSubmit: () => void;
  onNext: () => void;
  onFinish: () => void;
  onRestart: () => void;
  onStartMissed: () => void;
  onGoToSetup: () => void;
  onToggleTable: () => void;
  onSelectChoiceIndex: (index: number) => void;
  onSelectCategoryIndex: (index: number) => void;
}

const OPT_KEYS = ['q', 'w', 'e', 'r'];

export function useKeyboard({
  status,
  question,
  questionState,
  mode,
  choices,
  onSubmit,
  onNext,
  onFinish,
  onRestart,
  onStartMissed,
  onGoToSetup,
  onToggleTable,
  onSelectChoiceIndex,
  onSelectCategoryIndex
}: UseKeyboardProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.isComposing) return;

      const key = (e.key || '').toLowerCase();
      const code = e.code || '';

      // Test ekranında Alt + 1..4: Bileşik yazarak modunda tür seçimi
      if (e.altKey) {
        const altMatch = /^(?:Digit|Numpad)([1-4])$/.exec(code);
        if (
          altMatch &&
          status === 'testing' &&
          questionState === 'asking' &&
          question?.quiz === 'compound' &&
          question?.includeType &&
          mode === 'type'
        ) {
          e.preventDefault();
          onSelectCategoryIndex(Number(altMatch[1]) - 1);
        }
        return;
      }

      // Genel '0' kısayolu: periyodik tabloyu aç/kapat (element testinde)
      if (key === '0' && (status !== 'testing' || question?.quiz === 'element')) {
        const isInputField = document.activeElement?.tagName === 'INPUT';
        if (!isInputField) {
          e.preventDefault();
          onToggleTable();
          return;
        }
      }

      // 1) Test Ekranı
      if (status === 'testing') {
        if (questionState === 'asking') {
          if (key === 'escape') {
            e.preventDefault();
            onFinish();
            return;
          }

          if (key === 'enter') {
            e.preventDefault();
            onSubmit();
            return;
          }

          // Seçenekli modda Q, W, E, R tuşları
          if (mode === 'choice') {
            const optIdx = OPT_KEYS.indexOf(key);
            if (optIdx >= 0 && optIdx < choices.length) {
              e.preventDefault();
              onSelectChoiceIndex(optIdx);
              return;
            }

            // Seçenekli modda 1-8 tuşları tür seçimi (eğer tür aktifse)
            if (question?.includeType && /^[1-8]$/.test(key)) {
              e.preventDefault();
              onSelectCategoryIndex(Number(key) - 1);
              return;
            }
          } else {
            // Yazarak modda element sorusu için 1-8 tuşları tür seçimi
            if (
              question?.quiz === 'element' &&
              question.includeType &&
              /^[1-8]$/.test(key)
            ) {
              // Yalnızca rakam doğrudan tür seçsin
              e.preventDefault();
              onSelectCategoryIndex(Number(key) - 1);
              return;
            }
          }
        }

        // Geri bildirim ekranı: Enter veya Space ile sonraki soruya geçiş
        if (questionState === 'feedback') {
          if (key === 'enter' || key === ' ' || code === 'Space') {
            e.preventDefault();
            onNext();
            return;
          }
          if (key === 'escape') {
            e.preventDefault();
            onFinish();
            return;
          }
        }
      }

      // 2) Sonuç Ekranı
      if (status === 'result') {
        if (key === 'enter' || key === 't') {
          e.preventDefault();
          onRestart();
          return;
        }
        if (key === 'y') {
          e.preventDefault();
          onStartMissed();
          return;
        }
        if (key === 'g' || key === 'escape') {
          e.preventDefault();
          onGoToSetup();
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    status,
    question,
    questionState,
    mode,
    choices,
    onSubmit,
    onNext,
    onFinish,
    onRestart,
    onStartMissed,
    onGoToSetup,
    onToggleTable,
    onSelectChoiceIndex,
    onSelectCategoryIndex
  ]);
}
