import React, { useEffect, useMemo, useState } from 'react';
import { useQuizSession } from './hooks/useQuizSession';
import { useKeyboard } from './hooks/useKeyboard';
import { AppHeader, AppTheme } from './components/Layout/AppHeader';
import { SetupScreen } from './components/Setup/SetupScreen';
import { QuizScreen } from './components/Quiz/QuizScreen';
import { ResultScreen } from './components/Result/ResultScreen';
import { TopicReferenceModal } from './components/Reference/TopicReferenceModal';
import { PeriodicTableView } from './components/PeriodicTable/PeriodicTableView';
import { PeriodicTrendsExplorer } from './components/PeriodicTable/PeriodicTrendsExplorer';
import { MnemonicsModal } from './components/Mnemonics/MnemonicsModal';
import { CompoundBuilderModal } from './components/Interactive/CompoundBuilderModal';
import { ChemistryLabModal } from './components/Interactive/ChemistryLabModal';
import {
  AnimationSceneId,
  ChemistryAnimationsModal
} from './components/Animations/ChemistryAnimationsModal';
import { ALL_TOPICS, TOPIC_MAP } from './data/topics';
import { TopicId } from './types/topics';
import { KEYS, readStored, writeStored } from './utils/storage';
import { getWeakTopicIds } from './engine/statsEngine';

export const App: React.FC = () => {
  const session = useQuizSession();
  const [theme, setTheme] = useState<AppTheme>(() => {
    const saved = readStored(KEYS.theme);
    return saved === 'light' || saved === 'dark' ? saved : 'dark';
  });

  const [referenceTopicId, setReferenceTopicId] = useState<TopicId | null>(null);
  const [isSetupPeriodicOpen, setIsSetupPeriodicOpen] = useState(false);
  const [isTrendsExplorerOpen, setIsTrendsExplorerOpen] = useState(false);
  const [isMnemonicsOpen, setIsMnemonicsOpen] = useState(false);
  const [mnemonicsCategory, setMnemonicsCategory] = useState<string>('compound_rules');
  const [isCompoundBuilderOpen, setIsCompoundBuilderOpen] = useState(false);
  const [isChemistryLabOpen, setIsChemistryLabOpen] = useState(false);
  const [chemistryLabTab, setChemistryLabTab] = useState<'equilibrium' | 'electrochemistry'>('equilibrium');
  const [isAnimationsOpen, setIsAnimationsOpen] = useState(false);
  const [animationScene, setAnimationScene] = useState<AnimationSceneId>('galvanic_cell');

  const isAnyModalOpen =
    referenceTopicId !== null ||
    isTrendsExplorerOpen ||
    isMnemonicsOpen ||
    isCompoundBuilderOpen ||
    isChemistryLabOpen ||
    isAnimationsOpen;

  const handleGoHome = () => {
    session.goToSetup();
    setReferenceTopicId(null);
    setIsSetupPeriodicOpen(false);
    setIsTrendsExplorerOpen(false);
    setIsMnemonicsOpen(false);
    setIsCompoundBuilderOpen(false);
    setIsChemistryLabOpen(false);
    setIsAnimationsOpen(false);
    if (typeof window.scrollTo === 'function' && !/jsdom/i.test(navigator.userAgent)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!isAnyModalOpen && !isSetupPeriodicOpen) return;
    const handleModalEscape = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      if (referenceTopicId !== null) {
        setReferenceTopicId(null);
      } else if (isTrendsExplorerOpen) {
        setIsTrendsExplorerOpen(false);
      } else if (isMnemonicsOpen) {
        setIsMnemonicsOpen(false);
      } else if (isCompoundBuilderOpen) {
        setIsCompoundBuilderOpen(false);
      } else if (isChemistryLabOpen) {
        setIsChemistryLabOpen(false);
      } else if (isAnimationsOpen) {
        setIsAnimationsOpen(false);
      } else if (isSetupPeriodicOpen) {
        setIsSetupPeriodicOpen(false);
      }
    };
    window.addEventListener('keydown', handleModalEscape);
    return () => window.removeEventListener('keydown', handleModalEscape);
  }, [
    isAnyModalOpen,
    isSetupPeriodicOpen,
    referenceTopicId,
    isTrendsExplorerOpen,
    isMnemonicsOpen,
    isCompoundBuilderOpen,
    isChemistryLabOpen,
    isAnimationsOpen
  ]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    writeStored(KEYS.theme, theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', theme === 'light' ? '#f3f6fb' : '#090c12');
    }
  }, [theme]);

  const totalWeakItems = useMemo(() => {
    return ALL_TOPICS.reduce((sum, topic) => sum + getWeakTopicIds(topic.id).length, 0);
  }, [session.status, session.sessionResult]);

  useKeyboard({
    disabled: isAnyModalOpen,
    status: session.status,
    topic: session.config?.quiz ?? 'element',
    question: session.currentQuestion,
    questionState: session.questionState,
    mode: session.config?.mode ?? 'choice',
    choices: session.choices,
    onSubmit: session.submitAnswer,
    onNext: session.advanceToNext,
    onFinish: session.finishQuiz,
    onRestart: session.restartQuiz,
    onStartMissed: session.startMissedOnly,
    onGoToSetup: session.goToSetup,
    onToggleTable:
      session.status === 'setup'
        ? () => setIsSetupPeriodicOpen(prev => !prev)
        : session.togglePeriodicTable,
    onSelectChoiceIndex: index => {
      const choice = session.choices[index];
      if (choice) {
        session.setPickedChoice(prev => (prev === choice ? null : choice));
      }
    },
    onSelectCategoryIndex: index => {
      const topicInfo = TOPIC_MAP.get(session.currentQuestion?.quiz ?? 'element');
      const cats = topicInfo?.categories || [];
      const cat = cats[index];
      if (cat) {
        session.setPickedCategory(prev => (prev === cat.key ? null : cat.key));
      }
    }
  });

  return (
    <main className="wrap">
      <AppHeader
        theme={theme}
        onToggleTheme={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
        onGoHome={handleGoHome}
        totalTopics={ALL_TOPICS.length}
        totalWeakItems={totalWeakItems}
        isSetupView={session.status === 'setup'}
      />

      {/* 1. Kurulum Ekranı */}
      {session.status === 'setup' && (
        <>
          <SetupScreen
            onStartQuiz={(cfg) => {
              setIsSetupPeriodicOpen(false);
              session.startQuiz(cfg);
            }}
            onOpenPeriodicTable={() => setIsSetupPeriodicOpen(prev => !prev)}
            onOpenTopicReference={topicId => setReferenceTopicId(topicId)}
            onOpenTrendsExplorer={() => setIsTrendsExplorerOpen(true)}
            onOpenMnemonics={cat => {
              if (cat) setMnemonicsCategory(cat);
              setIsMnemonicsOpen(true);
            }}
            onOpenCompoundBuilder={() => setIsCompoundBuilderOpen(true)}
            onOpenChemistryLab={(tab = 'equilibrium') => {
              setChemistryLabTab(tab);
              setIsChemistryLabOpen(true);
            }}
            onOpenAnimations={(scene = 'galvanic_cell') => {
              setAnimationScene(scene);
              setIsAnimationsOpen(true);
            }}
          />

          {isSetupPeriodicOpen && (
            <div className="setup-periodic-drawer card">
              <div className="setup-periodic-head">
                <span style={{ fontWeight: 700, fontSize: '15px' }}>
                  Periyodik Tablo (İlk 36 Element)
                </span>
                <button
                  type="button"
                  className="btn ghost small"
                  onClick={() => setIsSetupPeriodicOpen(false)}
                >
                  Gizle
                </button>
              </div>
              <PeriodicTableView />
            </div>
          )}
        </>
      )}

      {/* 2. Test Ekranı */}
      {session.status === 'testing' && session.currentQuestion && (
        <QuizScreen
          question={session.currentQuestion}
          mode={session.config?.mode ?? 'choice'}
          questionState={session.questionState}
          typedValue={session.typedValue}
          pickedChoice={session.pickedChoice}
          pickedCategory={session.pickedCategory}
          choices={session.choices}
          warningMessage={session.warningMessage}
          lastFeedback={session.lastFeedback}
          progress={session.progress}
          hasMore={session.hasMore}
          showPeriodicTable={session.showPeriodicTable}
          onTypedChange={session.setTypedValue}
          onSelectChoice={choice =>
            session.setPickedChoice(prev => (prev === choice ? null : choice))
          }
          onSelectCategory={catKey =>
            session.setPickedCategory(prev => (prev === catKey ? null : catKey))
          }
          onSubmit={session.submitAnswer}
          onNext={session.advanceToNext}
          onFinish={session.finishQuiz}
          onToggleTable={session.togglePeriodicTable}
        />
      )}

      {/* 3. Sonuç Ekranı */}
      {session.status === 'result' && session.sessionResult && (
        <ResultScreen
          result={session.sessionResult}
          onRestart={session.restartQuiz}
          onStartMissed={session.startMissedOnly}
          onGoToSetup={session.goToSetup}
        />
      )}

      {/* Dinamik Konu Çalışma / Referans Modalı */}
      <TopicReferenceModal
        topicId={referenceTopicId}
        isOpen={referenceTopicId !== null}
        onClose={() => setReferenceTopicId(null)}
      />

      {/* Periyodik Sistem Değişim Pusulası Modalı */}
      {isTrendsExplorerOpen && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsTrendsExplorerOpen(false)}
        >
          <div className="modal-panel wide" onClick={e => e.stopPropagation()}>
            <PeriodicTrendsExplorer
              onClose={() => setIsTrendsExplorerOpen(false)}
              onStartTrendQuiz={() => {
                setIsTrendsExplorerOpen(false);
                session.startQuiz({
                  quiz: 'periodic_trends',
                  kind: 'range',
                  total: 20,
                  retry: true,
                  mode: 'choice',
                  includeCompoundType: false
                });
              }}
            />
          </div>
        </div>
      )}

      {/* Kimya Kodlamaları & Püf Noktaları Modalı */}
      <MnemonicsModal
        isOpen={isMnemonicsOpen}
        initialCategory={mnemonicsCategory}
        onClose={() => setIsMnemonicsOpen(false)}
      />

      {/* İyon Çaprazlama & Bileşik Adlandırma Atölyesi Modalı */}
      <CompoundBuilderModal
        isOpen={isCompoundBuilderOpen}
        onClose={() => setIsCompoundBuilderOpen(false)}
        onStartNamingQuiz={() => {
          setIsCompoundBuilderOpen(false);
          session.startQuiz({
            quiz: 'compound_naming',
            kind: 'range',
            total: 20,
            retry: true,
            mode: 'choice',
            dir: 'form-name',
            includeCompoundType: false
          });
        }}
      />

      {/* AYT İnteraktif Denge & Pil Laboratuvarı Modalı */}
      <ChemistryLabModal
        isOpen={isChemistryLabOpen}
        initialTab={chemistryLabTab}
        onClose={() => setIsChemistryLabOpen(false)}
        onStartEquilibriumQuiz={() => {
          setIsChemistryLabOpen(false);
          session.startQuiz({
            quiz: 'kinetics_equilibrium',
            kind: 'range',
            total: 20,
            retry: true,
            mode: 'choice',
            includeCompoundType: false
          });
        }}
        onStartElectroQuiz={() => {
          setIsChemistryLabOpen(false);
          session.startQuiz({
            quiz: 'electrochemistry_organic',
            kind: 'range',
            total: 20,
            retry: true,
            mode: 'choice',
            includeCompoundType: false
          });
        }}
      />

      {/* Canlı Kimya Animasyonları Stüdyosu Modalı */}
      <ChemistryAnimationsModal
        isOpen={isAnimationsOpen}
        initialScene={animationScene}
        onClose={() => setIsAnimationsOpen(false)}
        onStartTopicQuiz={topicId => {
          setIsAnimationsOpen(false);
          const topicDef = TOPIC_MAP.get(topicId);
          session.startQuiz({
            quiz: topicId,
            kind: 'range',
            total: 20,
            retry: true,
            mode: 'choice',
            dir: topicDef?.directions?.[0]?.id,
            includeCompoundType: false
          });
        }}
      />
    </main>
  );
};

export default App;
