import React, { useState } from 'react';
import { useQuizSession } from './hooks/useQuizSession';
import { useKeyboard } from './hooks/useKeyboard';
import { SetupScreen } from './components/Setup/SetupScreen';
import { QuizScreen } from './components/Quiz/QuizScreen';
import { ResultScreen } from './components/Result/ResultScreen';
import { TopicReferenceModal } from './components/Reference/TopicReferenceModal';
import { PeriodicTableView } from './components/PeriodicTable/PeriodicTableView';
import { TOPIC_MAP } from './data/topics';
import { TopicId } from './types/topics';

export const App: React.FC = () => {
  const session = useQuizSession();
  const [referenceTopicId, setReferenceTopicId] = useState<TopicId | null>(null);
  const [isSetupPeriodicOpen, setIsSetupPeriodicOpen] = useState(false);

  // Klavye olayları bağlama
  useKeyboard({
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
    onToggleTable: session.togglePeriodicTable,
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
      {/* 1. Kurulum Ekranı */}
      {session.status === 'setup' && (
        <>
          <SetupScreen
            onStartQuiz={session.startQuiz}
            onOpenPeriodicTable={() => setIsSetupPeriodicOpen(prev => !prev)}
            onOpenTopicReference={topicId => setReferenceTopicId(topicId)}
          />

          {isSetupPeriodicOpen && (
            <div style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: 700, fontSize: '15px' }}>Periyodik Tablo (İlk 36 Element)</span>
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
    </main>
  );
};
export default App;
