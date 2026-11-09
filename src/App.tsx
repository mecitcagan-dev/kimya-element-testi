import React, { useState } from 'react';
import { useQuizSession } from './hooks/useQuizSession';
import { useKeyboard } from './hooks/useKeyboard';
import { SetupScreen } from './components/Setup/SetupScreen';
import { QuizScreen } from './components/Quiz/QuizScreen';
import { ResultScreen } from './components/Result/ResultScreen';
import { CompoundReferenceModal } from './components/Reference/CompoundReferenceModal';
import { PeriodicTableView } from './components/PeriodicTable/PeriodicTableView';
import { ELEMENT_CATEGORIES } from './data/elements';
import { COMPOUND_CATEGORIES } from './data/compounds';

export const App: React.FC = () => {
  const session = useQuizSession();
  const [isCompoundRefOpen, setIsCompoundRefOpen] = useState(false);
  const [isSetupPeriodicOpen, setIsSetupPeriodicOpen] = useState(false);

  // Klavye olayları bağlama
  useKeyboard({
    status: session.status,
    topic: session.config?.quiz ?? 'element',
    question: session.currentQuestion,
    questionState: session.questionState,
    mode: session.config?.mode ?? 'type',
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
      const cats = session.currentQuestion?.quiz === 'compound'
        ? COMPOUND_CATEGORIES
        : ELEMENT_CATEGORIES;
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
            onOpenCompoundReference={() => setIsCompoundRefOpen(true)}
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
          mode={session.config?.mode ?? 'type'}
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

      {/* Bileşik Referans Modal */}
      <CompoundReferenceModal
        isOpen={isCompoundRefOpen}
        onClose={() => setIsCompoundRefOpen(false)}
      />
    </main>
  );
};
export default App;
