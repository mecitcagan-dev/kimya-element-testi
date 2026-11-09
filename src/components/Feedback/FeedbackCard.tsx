import React from 'react';
import { AnswerResult, QuestionItem } from '../../types/quiz';
import { ElementData, CompoundData } from '../../types/chemistry';
import { KeyBadge } from '../Common/KeyBadge';
import { isFormulaAsk } from '../../engine/quizEngine';

interface FeedbackCardProps {
  feedback: AnswerResult;
  question: QuestionItem;
  hasMore: boolean;
  onNext: () => void;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({
  feedback,
  question,
  hasMore,
  onNext
}) => {
  const isCompound = question.quiz === 'compound';
  const askFormula = isFormulaAsk(question);
  const { nameOk, catOk, full, correctText, userText, correctCat, userCat, includeType } = feedback;

  const mood = includeType
    ? (full ? 'good' : (nameOk || catOk) ? 'mixed' : 'bad')
    : (full ? 'good' : 'bad');

  const title = includeType
    ? (full ? 'Doğru!' : (nameOk || catOk) ? 'Kısmen doğru' : 'Yanlış')
    : (full ? 'Doğru!' : 'Yanlış');

  const data = question.data;
  const elementData = !isCompound ? (data as ElementData) : null;
  const compoundData = isCompound ? (data as CompoundData) : null;

  return (
    <section className={`card feedback ${mood}`} aria-live="polite">
      <div className="fb-title">{title}</div>

      {/* İsim / Formül Satırı */}
      <div className="fb-row">
        <div className={`fb-icon ${nameOk ? 'ok' : 'no'}`}>
          {nameOk ? '✓' : '✗'}
        </div>
        <div>
          <div className="fb-label">
            {!isCompound ? 'İsim' : askFormula ? 'Formül' : 'Ad'}
          </div>
          <div className="fb-val">
            {nameOk ? correctText : `Doğru cevap: ${correctText}`}
          </div>
          {(!nameOk || userText !== correctText) && userText && (
            <div className="fb-sub">Senin cevabın: “{userText}”</div>
          )}
          {data.names.length > 1 && (
            <div className="fb-sub">
              Ayrıca kabul edilir: {data.names.slice(1).join(', ')}
            </div>
          )}
        </div>
      </div>

      {/* Tür Satırı (Yalnızca tür dahilse gösterilir!) */}
      {includeType && (
        <div className="fb-row">
          <div className={`fb-icon ${catOk ? 'ok' : 'no'}`}>
            {catOk ? '✓' : '✗'}
          </div>
          <div>
            <div className="fb-label">Tür</div>
            <div className="fb-val">
              {catOk ? correctCat : `Doğru cevap: ${correctCat}`}
            </div>
            {!catOk && userCat && (
              <div className="fb-sub">Seçtiğin tür: {userCat}</div>
            )}
          </div>
        </div>
      )}

      {/* Bilgi Kutucukları */}
      <div className="info">
        {compoundData ? (
          <>
            <div className="chip">
              <span>Formül</span>
              <strong>{compoundData.disp}</strong>
            </div>
            <div className="chip">
              <span>Ad</span>
              <strong>{compoundData.names[0]}</strong>
            </div>
            <div className="chip">
              <span>Kategori</span>
              <strong>{compoundData.c}</strong>
            </div>
          </>
        ) : elementData ? (
          <>
            <div className="chip">
              <span>Atom No</span>
              <strong>{elementData.z}</strong>
            </div>
            <div className="chip">
              <span>Periyot</span>
              <strong>{elementData.p}</strong>
            </div>
            <div className="chip">
              <span>Grup</span>
              <strong>{elementData.g}</strong>
            </div>
            <div className="chip">
              <span>Kategori</span>
              <strong>{elementData.c}</strong>
            </div>
          </>
        ) : null}
      </div>

      <div className="fb-actions">
        <span className="hint kb-hint">
          Devam etmek için <kbd>Enter</kbd> veya <kbd>Space</kbd>
        </span>
        <button type="button" className="btn primary" onClick={onNext} autoFocus>
          <span>{hasMore ? 'Sonraki' : 'Sonuçları Gör'}</span>
          <KeyBadge label="↵" />
        </button>
      </div>
    </section>
  );
};
