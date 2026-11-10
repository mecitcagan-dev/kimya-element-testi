import React, { useState } from 'react';
import { CHEMISTRY_MNEMONICS } from '../../data/chemistryMnemonics';

interface MnemonicsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

export const MnemonicsModal: React.FC<MnemonicsModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'compound_rules'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    if (isOpen && initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [isOpen, initialCategory]);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: '✨ Tümü', icon: '✨' },
    { id: 'compound_rules', label: '🧪 Bileşik Türü (Asit/Baz/Tuz/Oksit)', icon: '🧪' },
    { id: 'atomic_models', label: '⚛️ Atom & Tarihçe (DeDen TRabzonlu...)', icon: '⚛️' },
    { id: 'metals_activity', label: '⚡ Metaller & Aktiflik (Zengin Pabuçlu...)', icon: '⚡' },
    { id: 'interactions_polarity', label: '🧲 Etkileşimler & Polarite (FON, Şapka...)', icon: '🧲' },
    { id: 'periodic_trends', label: '🧭 Periyodik Eğilimler (Kardan Adam, 3 Aşağı...)', icon: '🧭' },
    { id: 'gases_solutions', label: '🎈 Gazlar & Çözeltiler (Paran Varsa, 10 Maymun...)', icon: '🎈' },
    { id: 'energy_kinetics_equilibrium', label: '⚖️ Enerji, Hız & Denge (Katalizör...)', icon: '⚖️' },
    { id: 'electrochemistry_organic', label: '🔋 Elektrokimya & Organik (KİMYA, UÇ-AL-FOR...)', icon: '🔋' }
  ];

  const filteredItems = CHEMISTRY_MNEMONICS.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      (item.code && item.code.toLowerCase().includes(q)) ||
      (item.expansion && item.expansion.toLowerCase().includes(q)) ||
      item.summary.toLowerCase().includes(q) ||
      item.explanation.toLowerCase().includes(q) ||
      item.pitfalls.some(p => p.toLowerCase().includes(q))
    );
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '20px',
        backdropFilter: 'blur(5px)'
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{
          maxWidth: '1100px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          position: 'relative',
          padding: '28px 34px'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Başlık ve Kapat */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '32px' }}>💡</span>
            <div>
              <h2 style={{ margin: 0, fontSize: '22px' }}>
                Kimya Kodlamaları & Püf Noktaları Rehberi
              </h2>
              <p className="hint" style={{ margin: '4px 0 0', fontSize: '14px' }}>
                Bileşik türü bulma algoritmaları, YKS sınav tuzakları ve akılda kalıcı efsane kodlamalar!
              </p>
            </div>
          </div>
          <button
            type="button"
            className="btn ghost small"
            onClick={onClose}
            aria-label="Kapat"
          >
            ✕
          </button>
        </div>

        {/* Kategori Sekmeleri */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginTop: '20px',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '12px'
          }}
        >
          {categories.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                className={`btn ${isActive ? 'primary' : 'ghost'} small`}
                style={isActive ? { backgroundColor: '#ffd43b', color: '#15151c' } : {}}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Arama Çubuğu */}
        <div style={{ marginTop: '16px', marginBottom: '20px' }}>
          <input
            type="text"
            className="text-input"
            placeholder="Kodlama, formül veya kural ara (örn: deden, asit, baz, alkol, amfoter, anot, paran)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ width: '100%', fontSize: '15px', padding: '12px 16px' }}
          />
        </div>

        {/* Kodlama ve Kural Kartları Listesi */}
        <div style={{ display: 'grid', gap: '24px' }}>
          {filteredItems.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: 'var(--muted)' }}>
              Aramanızla eşleşen kodlama veya kural bulunamadı.
            </div>
          ) : (
            filteredItems.map(item => (
              <article
                key={item.id}
                style={{
                  backgroundColor: 'var(--card-2)',
                  border: '1px solid var(--border-2)',
                  borderRadius: '16px',
                  padding: '24px 28px',
                  display: 'grid',
                  gap: '16px'
                }}
              >
                {/* Kart Başlığı ve Kodlama Kutusu */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h3 style={{ margin: 0, fontSize: '19px', color: 'var(--text)' }}>
                        {item.title}
                      </h3>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '999px',
                          backgroundColor: 'rgba(245, 165, 36, 0.15)',
                          color: '#ffd43b',
                          border: '1px solid rgba(245, 165, 36, 0.4)'
                        }}
                      >
                        {item.examLevel}
                      </span>
                    </div>
                    <p style={{ margin: '6px 0 0', fontSize: '14px', color: 'var(--muted)' }}>
                      {item.summary}
                    </p>
                  </div>

                  {item.code && (
                    <div
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#ffd43b18',
                        border: '1.5px solid #ffd43b66',
                        borderRadius: '10px',
                        textAlign: 'right'
                      }}
                    >
                      <div style={{ fontSize: '11px', color: '#ffd43b', fontWeight: 700 }}>
                        Hafıza Kodu
                      </div>
                      <strong style={{ fontSize: '16px', color: '#fff' }}>{item.code}</strong>
                      {item.expansion && (
                        <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                          {item.expansion}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Kurallar Tablosu (Varsa) */}
                {item.rules && item.rules.length > 0 && (
                  <div style={{ overflowX: 'auto' }}>
                    <table className="compound-table" style={{ width: '100%', fontSize: '14px' }}>
                      <thead>
                        <tr>
                          <th style={{ width: '35%' }}>Püf Noktası / İpucu</th>
                          <th style={{ width: '30%' }}>Sonuç / Tür</th>
                          <th style={{ width: '35%' }}>Örnekler & Not</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.rules.map((r, idx) => (
                          <tr key={idx}>
                            <td>
                              <strong style={{ color: '#4dabf7' }}>{r.trigger}</strong>
                            </td>
                            <td>
                              <span style={{ fontWeight: 700, color: 'var(--text)' }}>
                                {r.result}
                              </span>
                            </td>
                            <td>
                              <div style={{ fontWeight: 600 }}>{r.example}</div>
                              {r.note && (
                                <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                                  {r.note}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Bilimsel Açıklama */}
                <div style={{ fontSize: '14px', lineHeight: 1.55, color: 'var(--text)' }}>
                  {item.explanation}
                </div>

                {/* ÖSYM Tuzakları ve Çeldiricileri */}
                {item.pitfalls.length > 0 && (
                  <div
                    style={{
                      padding: '12px 16px',
                      backgroundColor: 'rgba(229, 72, 77, 0.08)',
                      borderLeft: '4px solid #e5484d',
                      borderRadius: '8px'
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '13px', color: '#ff8787', marginBottom: '6px' }}>
                      ⚠️ ÖSYM'nin En Sevdiği Çeldiriciler & Tuzaklar:
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: 'var(--text)', lineHeight: 1.5 }}>
                      {item.pitfalls.map((p, idx) => (
                        <li key={idx} style={{ marginBottom: '4px' }}>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            ))
          )}
        </div>

        {/* Kapat Butonu */}
        <div style={{ marginTop: '24px', textAlign: 'right' }}>
          <button type="button" className="btn primary small" onClick={onClose}>
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
