import React from 'react';
import { AnswerResult, QuestionItem } from '../../types/quiz';
import { KeyBadge } from '../Common/KeyBadge';

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
  const { nameOk, catOk, full, correctText, userText, correctCat, userCat, includeType } = feedback;

  const mood = includeType
    ? full
      ? 'good'
      : nameOk || catOk
      ? 'mixed'
      : 'bad'
    : full
    ? 'good'
    : 'bad';

  const title = includeType
    ? full
      ? 'Doğru!'
      : nameOk || catOk
      ? 'Kısmen doğru'
      : 'Yanlış'
    : full
    ? 'Doğru!'
    : 'Yanlış';

  const infoChips = question.standard.infoChips || [];

  return (
    <section className={`card feedback ${mood}`} aria-live="polite">
      <div className={`fb-title ${mood}`}>{title}</div>

      {/* Cevap Satırı */}
      <div className="fb-row">
        <div className={`fb-icon ${nameOk ? 'ok' : 'no'}`}>{nameOk ? '✓' : '✗'}</div>
        <div>
          <div className="fb-label">Cevap</div>
          <div className="fb-val">
            {nameOk ? correctText : `Doğru cevap: ${correctText}`}
          </div>
          {(!nameOk || userText !== correctText) && userText && (
            <div className="fb-sub">Senin cevabın: “{userText}”</div>
          )}
          {question.standard.synonyms && question.standard.synonyms.length > 0 && (
            <div className="fb-sub">
              Ayrıca kabul edilir: {question.standard.synonyms.join(', ')}
            </div>
          )}
        </div>
      </div>

      {/* Tür Satırı (Yalnızca tür dahilse gösterilir) */}
      {includeType && (
        <div className="fb-row">
          <div className={`fb-icon ${catOk ? 'ok' : 'no'}`}>{catOk ? '✓' : '✗'}</div>
          <div>
            <div className="fb-label">Tür / Kategori</div>
            <div className="fb-val">
              {catOk ? correctCat : `Doğru kategori: ${correctCat}`}
            </div>
            {!catOk && userCat && (
              <div className="fb-sub">Seçtiğin kategori: {userCat}</div>
            )}
          </div>
        </div>
      )}

      {/* Bilgi Kutucukları */}
      {infoChips.length > 0 && (
        <div className="info">
          {infoChips.map((chip, i) => (
            <div key={chip.label + i} className="chip">
              <span>{chip.label}</span>
              <strong>{chip.value}</strong>
            </div>
          ))}
        </div>
      )}

      {/* Ek ÖSYM İpucu */}
      {question.standard.hint && (
        <div className="fb-osym-tip">
          💡 <strong>ÖSYM İpucu:</strong> {question.standard.hint}
        </div>
      )}

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
