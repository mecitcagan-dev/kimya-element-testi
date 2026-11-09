import React, { useRef, useEffect } from 'react';
import { QuestionItem, AnswerMode, AnswerResult } from '../../types/quiz';
import { CategoryInfo } from '../../types/chemistry';
import { isFormulaAsk } from '../../engine/quizEngine';
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
  onTypedChange,
  onSelectChoice,
  onSelectCategory,
  onSubmit
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isCompound = question.quiz === 'compound';
  const askFormula = isFormulaAsk(question);
  const answered = questionState === 'feedback';
  const includeType = question.includeType;

  // Soru metni ve görseli
  const displaySymbol = !isCompound
    ? (question.data as any).s
    : askFormula
    ? (question.data as any).names[0]
    : (question.data as any).disp;

  const symbolClass = !isCompound
    ? 'q-symbol'
    : askFormula
    ? 'q-symbol is-name'
    : 'q-symbol is-formula';

  const placeholder = !isCompound
    ? 'Elementin Türkçe adı'
    : askFormula
    ? 'Bileşiğin formülü'
    : 'Bileşiğin Türkçe adı';

  // Otomatik odaklanma
  useEffect(() => {
    if (questionState === 'asking' && mode === 'type') {
      inputRef.current?.focus();
    }
  }, [question, questionState, mode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (isCompound && askFormula) {
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

  // İpucu metni
  let flowHint = '';
  if (mode === 'choice') {
    flowHint = includeType
      ? `${askFormula ? 'Formülü' : 'Adı'} seç (Q, W, E, R) → 1–${categories.length} ile türü seç → Enter`
      : 'Seçeneği seç (Q, W, E, R) → Enter';
  } else {
    flowHint = includeType
      ? `${askFormula ? 'Formülü' : 'İsmi'} yaz → ${
          isCompound ? '⌥1–4' : '1–8'
        } ile türü seç → Enter`
      : `${askFormula ? 'Formülü' : 'İsmi'} yaz → Enter`;
  }

  return (
    <article className={`card q-card ${!includeType ? 'no-cats' : ''}`}>
      {/* Atom Numarası (yalnızca elementte) */}
      {!isCompound && (
        <span className="q-num">{question.data.z}</span>
      )}

      {/* Tekrar Sorusu Etiketi */}
      {question.retry && (
        <span className="q-tag">Tekrar</span>
      )}

      {/* Soru Ana Gösterimi (Sembol / Ad / Formül) */}
      <div className={symbolClass}>{displaySymbol}</div>

      {/* Giriş Alanı veya Seçenekler */}
      <div className="q-input">
        {mode === 'type' ? (
          <>
            <label className="sr-only" htmlFor="user-answer-input">
              {placeholder}
            </label>
            <input
              id="user-answer-input"
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              maxLength={40}
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
        <p className="hint center kb-hint q-flow">{flowHint}</p>
      </div>

      {/* Tür Butonları (yalnızca includeType true ise) */}
      {includeType && (
        <CategoryGrid
          categories={categories}
          pickedCategory={pickedCategory}
          onSelectCategory={onSelectCategory}
          answered={answered}
          correctCategory={answered && lastFeedback ? lastFeedback.correctCat : null}
          altBadges={isCompound && mode === 'type'}
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
