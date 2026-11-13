import React, { useRef, useEffect } from 'react';
import { QuestionItem, AnswerMode, AnswerResult } from '../../types/quiz';
import { CategoryInfo } from '../../types/chemistry';
import { formatFormula } from '../../utils/text';
import { OptionGrid } from './OptionGrid';
import { CategoryGrid } from './CategoryGrid';
import { KeyBadge } from '../Common/KeyBadge';

interface QuestionCardProps {
  question: QuestionItem;
  mode: AnswerMode;
  questionState: 'asking' | 'feedback';
  typedValue: string;
  pickedChoice: string | null;
  pickedCategory: string | null;
  choices: string[];
  warningMessage: string | null;
  categories: CategoryInfo[];
  lastFeedback: AnswerResult | null;
  questionNumber: number;
  onTypedChange: (val: string) => void;
  onSelectChoice: (choice: string) => void;
  onSelectCategory: (catKey: string) => void;
  onSubmit: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  mode,
  questionState,
  typedValue,
  pickedChoice,
  pickedCategory,
  choices,
  warningMessage,
  categories,
  lastFeedback,
  questionNumber,
  onTypedChange,
  onSelectChoice,
  onSelectCategory,
  onSubmit
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const answered = questionState === 'feedback';
  const includeType = question.includeType && categories.length > 0;

  const displayPrompt = question.standard.prompt;
  const promptSub = question.standard.promptSub;

  const isLongPrompt = displayPrompt.length > 25;
  const promptClass = isLongPrompt
    ? 'q-symbol is-name'
    : displayPrompt.length > 10
    ? 'q-symbol is-formula'
    : 'q-symbol';

  useEffect(() => {
    if (questionState === 'asking' && mode === 'type') {
      inputRef.current?.focus();
    }
  }, [question, questionState, mode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    const isFormulaTarget =
      (question.quiz === 'compound' && question.dir === 'ad-formul') ||
      (question.quiz === 'compound_naming' && question.dir === 'name-form');
    if (isFormulaTarget) {
      val = formatFormula(val);
    }
    onTypedChange(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <article className={`card q-card ${!includeType ? 'no-cats' : ''}`}>
      {/* Üst Bağlam & Tekrar Satırı */}
      <div className="q-card-meta">
        <span className="q-context-pill">Soru #{questionNumber}</span>
        {question.retry && <span className="q-tag">Tekrar</span>}
      </div>

      {/* Soru Ana Gösterimi */}
      <div className="q-prompt-zone">
        <div className={promptClass}>{displayPrompt}</div>
        {promptSub && <div className="q-prompt-sub">{promptSub}</div>}
      </div>

      {/* Giriş Alanı veya Seçenekler */}
      <div className="q-input">
        {mode === 'type' ? (
          <>
            <label className="sr-only" htmlFor="user-answer-input">
              Cevabınız
            </label>
            <input
              id="user-answer-input"
              ref={inputRef}
              type="text"
              placeholder="Cevabınızı yazın..."
              maxLength={60}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              value={typedValue}
              disabled={answered}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </>
        ) : (
          <OptionGrid
            choices={choices}
            pickedChoice={pickedChoice}
            onSelectChoice={onSelectChoice}
            answered={answered}
            correctChoice={answered && lastFeedback ? lastFeedback.correctText : null}
          />
        )}
        <p className="hint center kb-hint q-flow">
          {mode === 'choice'
            ? includeType
              ? 'Şıkkı seç (Q, W, E, R) → Türü seç → Enter'
              : 'Şıkkı seç (Q, W, E, R) → Enter ile onayla'
            : includeType
            ? 'Cevabı yaz → Türü seç → Enter'
            : 'Cevabı yaz → Enter'}
        </p>
      </div>

      {/* Tür Butonları (yalnızca includeType true ise) */}
      {includeType && (
        <CategoryGrid
          categories={categories}
          pickedCategory={pickedCategory}
          onSelectCategory={onSelectCategory}
          answered={answered}
          correctCategory={answered && lastFeedback ? lastFeedback.correctCat : null}
          altBadges={question.quiz === 'compound' && mode === 'type'}
        />
      )}

      {/* Aksiyon Butonu ve Uyarı */}
      <div className="q-actions">
        {!answered && (
          <button type="button" className="btn primary block" onClick={onSubmit}>
            Gönder <KeyBadge label="↵" />
          </button>
        )}
        {warningMessage && (
          <p className="warn" role="alert">
            {warningMessage}
          </p>
        )}
      </div>
    </article>
  );
};
