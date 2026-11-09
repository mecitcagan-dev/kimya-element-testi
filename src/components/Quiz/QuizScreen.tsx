import React from 'react';
import { QuestionItem, AnswerMode, AnswerResult } from '../../types/quiz';
import { QuizProgress } from '../../hooks/useQuizSession';
import { ELEMENT_CATEGORIES } from '../../data/elements';
import { COMPOUND_CATEGORIES } from '../../data/compounds';
import { QuestionCard } from './QuestionCard';
import { FeedbackCard } from '../Feedback/FeedbackCard';
import { PeriodicTableView } from '../PeriodicTable/PeriodicTableView';
import { KeyBadge } from '../Common/KeyBadge';

interface QuizScreenProps {
  question: QuestionItem;
  mode: AnswerMode;
  questionState: 'asking' | 'feedback';
  typedValue: string;
  pickedChoice: string | null;
  pickedCategory: string | null;
  choices: string[];
  warningMessage: string | null;
  lastFeedback: AnswerResult | null;
  progress: QuizProgress;
  hasMore: boolean;
  showPeriodicTable: boolean;
  onTypedChange: (val: string) => void;
  onSelectChoice: (choice: string) => void;
  onSelectCategory: (catKey: string) => void;
  onSubmit: () => void;
  onNext: () => void;
  onFinish: () => void;
  onToggleTable: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  question,
  mode,
  questionState,
  typedValue,
  pickedChoice,
  pickedCategory,
  choices,
  warningMessage,
  lastFeedback,
  progress,
  hasMore,
  showPeriodicTable,
  onTypedChange,
  onSelectChoice,
  onSelectCategory,
  onSubmit,
  onNext,
  onFinish,
  onToggleTable
}) => {
  const isCompound = question.quiz === 'compound';
  const categories = isCompound ? COMPOUND_CATEGORIES : ELEMENT_CATEGORIES;
  const isFiniteTotal = Number.isFinite(progress.total);
  const pct = isFiniteTotal && progress.total > 0
    ? Math.min(100, (progress.freshAnswered / progress.total) * 100)
    : 0;

  return (
    <section id="view-test">
      {/* Üst Bar */}
      <div className="topbar">
        <div className="stats">
          <div className="stat">
            <span className="stat-label">İlerleme</span>
            <span className="stat-value">
              {isFiniteTotal ? `${progress.freshAnswered}/${progress.total}` : `${progress.freshAnswered} / ∞`}
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">Doğru</span>
            <span className="stat-value">{progress.fullCorrect}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Seri</span>
            <span className="stat-value">{progress.streak}</span>
          </div>
        </div>

        <div className="topbar-actions">
          {!isCompound && (
            <button
              type="button"
              className="btn ghost small"
              onClick={onToggleTable}
              aria-expanded={showPeriodicTable}
            >
              <span>{showPeriodicTable ? 'Tabloyu gizle' : 'Tabloyu göster'}</span>
              <KeyBadge label="0" />
            </button>
          )}
          <button type="button" className="btn ghost small" onClick={onFinish}>
            <span>Bitir</span>
            <KeyBadge label="Esc" />
          </button>
        </div>
      </div>

      {/* İlerleme Çubuğu */}
      <div className="progress" aria-hidden="true">
        <span style={{ width: `${pct}%` }} />
      </div>

      {/* Soru Kartı */}
      <QuestionCard
        question={question}
        mode={mode}
        questionState={questionState}
        typedValue={typedValue}
        pickedChoice={pickedChoice}
        pickedCategory={pickedCategory}
        choices={choices}
        warningMessage={warningMessage}
        categories={categories}
        lastFeedback={lastFeedback}
        onTypedChange={onTypedChange}
        onSelectChoice={onSelectChoice}
        onSelectCategory={onSelectCategory}
        onSubmit={onSubmit}
      />

      {/* Periyodik Tablo (Element testinde açıksa) */}
      {!isCompound && showPeriodicTable && (
        <PeriodicTableView
          currentZ={question.data.z}
          isFeedback={questionState === 'feedback'}
          feedbackOk={lastFeedback?.full ?? false}
        />
      )}

      {/* Geri Bildirim Paneli */}
      {questionState === 'feedback' && lastFeedback && (
        <FeedbackCard
          feedback={lastFeedback}
          question={question}
          hasMore={hasMore}
          onNext={onNext}
        />
      )}
    </section>
  );
};
