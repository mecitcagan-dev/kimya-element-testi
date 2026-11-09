import React from 'react';
import { SessionResult } from '../../types/quiz';
import { ELEMENT_BY_Z } from '../../data/elements';
import { COMPOUND_BY_Z } from '../../data/compounds';
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
  const isCompound = result.quiz === 'compound';
  const n = result.answered;
  const pct = n > 0 ? Math.round((result.full / n) * 100) : 0;
  const hasMissed = result.missed.length > 0;
  const showCatBox = !isCompound || result.includeCompoundType;

  return (
    <section id="view-result">
      <h2 className="page-title">Sonuç</h2>

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
            <span>{isCompound ? 'Cevap doğru' : 'İsim doğru'}</span>
            <strong>{result.nameOk} / {n}</strong>
          </div>

          {showCatBox ? (
            <div className="res-box">
              <span>Tür doğru</span>
              <strong>{result.catOk} / {n}</strong>
            </div>
          ) : (
            <div className="res-box">
              <span>Mod</span>
              <strong style={{ fontSize: '15px', color: 'var(--muted)' }}>Türsüz Mod</strong>
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
          Yanlış yaptığın {isCompound ? 'bileşikler' : 'elementler'} ({result.missed.length})
        </h3>

        <ul className="miss-list">
          {hasMissed ? (
            result.missed.map(m => {
              const el = !isCompound ? ELEMENT_BY_Z[m.z] : null;
              const c = isCompound ? COMPOUND_BY_Z[m.z] : null;

              if (isCompound && c) {
                return (
                  <li key={m.z} className="miss is-compound">
                    <div>
                      <div className="miss-top">
                        <span className="miss-name">{c.disp}</span>
                        <span className="miss-meta">{c.names[0]}</span>
                        <span className={`pill ${m.resolved ? 'ok' : 'bad'}`}>
                          {m.resolved ? 'Tekrarda doğru' : 'Yanlış'}
                        </span>
                      </div>
                      {result.includeCompoundType && (
                        <div className="miss-line">
                          <span className="k">Doğru tür:</span> {c.c}
                        </div>
                      )}
                      <div className="miss-line">
                        <span className="k">Senin cevabın:</span> {formatFormula(m.typed) || '—'}
                        {result.includeCompoundType && m.pickedCat && (
                          <> &nbsp;·&nbsp; <span className="k">Seçtiğin tür:</span> {m.pickedCat}</>
                        )}
                      </div>
                    </div>
                  </li>
                );
              }

              if (!isCompound && el) {
                return (
                  <li key={m.z} className="miss">
                    <div className="miss-sym">{el.s}</div>
                    <div>
                      <div className="miss-top">
                        <span className="miss-name">{el.names[0]}</span>
                        <span className="miss-meta">Atom No {el.z}</span>
                        {el.names.length > 1 && (
                          <span className="miss-meta">
                            Ayrıca: {el.names.slice(1).join(', ')}
                          </span>
                        )}
                        <span className={`pill ${m.resolved ? 'ok' : 'bad'}`}>
                          {m.resolved ? 'Tekrarda doğru' : 'Yanlış'}
                        </span>
                      </div>
                      <div className="miss-line">
                        <span className="k">Doğru tür:</span> {el.c}
                      </div>
                      <div className="miss-line">
                        <span className="k">Senin cevabın:</span> {m.typed || '—'}
                        {m.pickedCat && (
                          <> &nbsp;·&nbsp; <span className="k">Seçtiğin tür:</span> {m.pickedCat}</>
                        )}
                      </div>
                    </div>
                  </li>
                );
              }

              return null;
            })
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
