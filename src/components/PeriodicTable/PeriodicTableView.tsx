import React from 'react';
import { ELEMENTS, PT_COL, PT_GROUPS, ELEMENT_CATEGORIES } from '../../data/elements';

interface PeriodicTableViewProps {
  currentZ?: number;
  isFeedback?: boolean;
  feedbackOk?: boolean;
}

const CATEGORY_MAP = new Map(ELEMENT_CATEGORIES.map(c => [c.key, c.rgb]));

export const PeriodicTableView: React.FC<PeriodicTableViewProps> = ({
  currentZ,
  isFeedback = false,
  feedbackOk = false
}) => {
  return (
    <div className="card pt-card" id="pt-card">
      <div className="pt-viewport">
        <div className={`pt-stage ${isFeedback ? 'is-fb' : ''}`}>
          {/* Boş köşe hücresi */}
          <div style={{ gridColumn: 1, gridRow: 1 }} />

          {/* Sütun Grup Başlıkları (1A..8A) */}
          {PT_GROUPS.map((grp, i) => (
            <div
              key={grp + i}
              className="pt-gl"
              style={{ gridColumn: i + 2, gridRow: 1 }}
            >
              {grp}
            </div>
          ))}

          {/* Periyot Başlıkları (1..4) */}
          {[1, 2, 3, 4].map(p => (
            <div
              key={p}
              className="pt-pl"
              style={{ gridColumn: 1, gridRow: p + 1 }}
            >
              {p}
            </div>
          ))}

          {/* 36 Element Hücresi */}
          {ELEMENTS.map(el => {
            const isCur = el.z === currentZ;
            const rgb = CATEGORY_MAP.get(el.c) || '255,255,255';
            const col = PT_COL[el.z] + 1; // +1 çünkü 1. sütun periyot etiketidir
            const row = el.p + 1;         // +1 çünkü 1. satır grup etiketidir

            let cellClass = 'pt-cell';
            if (isCur) {
              cellClass += ' cur';
              if (isFeedback) {
                cellClass += feedbackOk ? ' ok' : ' bad';
              }
            }

            return (
              <div
                key={el.z}
                className={cellClass}
                style={
                  {
                    gridColumn: col,
                    gridRow: row,
                    '--rgb': rgb
                  } as React.CSSProperties
                }
              >
                <span className="pt-num">{el.z}</span>
                <span className="pt-sym">{el.s}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
