import React from 'react';
import { SessionResult } from '../../types/quiz';
import { KeyBadge } from '../Common/KeyBadge';
import { formatFormula } from '../../utils/text';

interface ResultScreenProps {
  result: SessionResult;
  onRestart: () => void;
  onStartMissed: () => void;
  onGoToSetup: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  onRestart,
  onStartMissed,
  onGoToSetup
}) => {
  const n = result.answered;
  const pct = n > 0 ? Math.round((result.full / n) * 100) : 0;
  const hasMissed = result.missed.length > 0;
  const showCatBox = result.includeCompoundType && result.catOk > 0;

  return (
    <section id="view-result">
      <h2 className="page-title">Sonuç — {result.topicTitle}</h2>

      <div className="card res-hero">
        <div className="res-pct">{pct}%</div>
        <div className="res-sub">
          {n > 0
            ? `${n} sorudan ${result.full} tanesi tam doğru`
            : 'Bu oturumda henüz soru cevaplanmadı.'}
        </div>

        <div className="bar" aria-hidden="true">
          <span style={{ width: `${pct}%` }} />
        </div>

        <div className="res-grid">
          <div className="res-box">
            <span>Cevap doğru</span>
            <strong>{result.nameOk} / {n}</strong>
          </div>

          {showCatBox ? (
            <div className="res-box">
              <span>Tür / Kategori doğru</span>
              <strong>{result.catOk} / {n}</strong>
            </div>
          ) : (
            <div className="res-box">
              <span>Konu</span>
              <strong style={{ fontSize: '15px', color: 'var(--accent)' }}>{result.topicTitle}</strong>
            </div>
          )}

          <div className="res-box">
            <span>En uzun seri</span>
            <strong>{result.bestStreak}</strong>
          </div>

          <div className="res-box">
            <span>Toplam cevap</span>
            <strong>{result.answers}</strong>
          </div>
        </div>
      </div>

      {/* Yanlış Yapılan Sorular Listesi */}
      <div className="card">
        <h3 className="section-title">
          Yanlış Yaptığın Maddeler ({result.missed.length})
        </h3>

        <ul className="miss-list">
          {hasMissed ? (
            result.missed.map((m, idx) => (
              <li key={String(m.z) + idx} className="miss is-compound">
                <div>
                  <div className="miss-top">
                    <span className="miss-name">{m.prompt}</span>
                    <span className={`pill ${m.resolved ? 'ok' : 'bad'}`}>
                      {m.resolved ? 'Tekrarda doğru' : 'Yanlış'}
                    </span>
                  </div>
                  <div className="miss-line">
                    <span className="k">Doğru cevap:</span> {m.correctText}
                  </div>
                  <div className="miss-line">
                    <span className="k">Senin cevabın:</span> {formatFormula(m.typed) || '—'}
                    {m.pickedCat && (
                      <> &nbsp;·&nbsp; <span className="k">Seçtiğin tür:</span> {m.pickedCat}</>
                    )}
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="empty">
              {result.answers > 0
                ? 'Harika! Bu testte hiç yanlış yapmadın.'
                : 'Henüz cevap verilmedi.'}
            </li>
          )}
        </ul>
      </div>

      {/* Aksiyon Butonları */}
      <div className="actions">
        <button type="button" className="btn primary block" onClick={onRestart}>
          Tekrar Başlat <KeyBadge label="↵" /> <KeyBadge label="T" />
        </button>
        <button
          type="button"
          className="btn secondary block"
          disabled={!hasMissed}
          onClick={onStartMissed}
        >
          Sadece yanlışları çalış <KeyBadge label="Y" />
        </button>
        <button type="button" className="btn ghost block" onClick={onGoToSetup}>
          Ayarlara dön <KeyBadge label="G" />
        </button>
      </div>
    </section>
  );
};
