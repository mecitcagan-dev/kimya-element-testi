import React from 'react';
import { COMPOUNDS, COMPOUND_CATEGORIES } from '../../data/compounds';

interface CompoundReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CAT_COLORS = new Map(COMPOUND_CATEGORIES.map(c => [c.key, c.rgb]));

export const CompoundReferenceModal: React.FC<CompoundReferenceModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '16px',
        backdropFilter: 'blur(4px)'
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{
          maxWidth: '650px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '20px' }}>🧪 Yaygın Bileşikler Listesi (18 Adet)</h2>
          <button
            type="button"
            className="btn ghost small"
            onClick={onClose}
            aria-label="Kapat"
          >
            ✕
          </button>
        </div>
        <p className="hint" style={{ marginTop: '6px' }}>
          Müfredatta yer alan yaygın bileşiklerin formülleri, adları ve türleri:
        </p>

        <table className="compound-table">
          <thead>
            <tr>
              <th>Formül</th>
              <th>Yaygın Adı</th>
              <th>Türü</th>
            </tr>
          </thead>
          <tbody>
            {COMPOUNDS.map(c => {
              const rgb = CAT_COLORS.get(c.c) || '255,255,255';
              return (
                <tr key={c.z}>
                  <td style={{ fontWeight: 800, fontSize: '16px' }}>{c.disp}</td>
                  <td>{c.names.join(', ')}</td>
                  <td>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '3px 8px',
                        borderRadius: '999px',
                        fontSize: '12px',
                        fontWeight: 700,
                        backgroundColor: `rgba(${rgb}, 0.15)`,
                        color: `rgb(${rgb})`,
                        border: `1px solid rgba(${rgb}, 0.4)`
                      }}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: `rgb(${rgb})`
                        }}
                      />
                      {c.c}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ marginTop: '18px', textAlign: 'right' }}>
          <button type="button" className="btn primary small" onClick={onClose}>
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
