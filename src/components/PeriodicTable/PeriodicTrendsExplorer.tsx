import React, { useEffect, useState } from 'react';
import {
  PERIODIC_DIRECTIONAL_TRENDS,
  TrendDirectionKey,
  PeriodicTrendProperty
} from '../../data/periodicSystemTrends';

interface PeriodicTrendsExplorerProps {
  onStartTrendQuiz?: () => void;
  onClose?: () => void;
}

type ExplorerTab = 'guide' | 'interactive_test';

export const PeriodicTrendsExplorer: React.FC<PeriodicTrendsExplorerProps> = ({
  onStartTrendQuiz,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<ExplorerTab>('guide');
  const [selectedDirection, setSelectedDirection] = useState<TrendDirectionKey>('soldan-saga');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Yön Testi (Interactive Multi-Select Test) State'leri
  const [testDirection, setTestDirection] = useState<TrendDirectionKey>('soldan-saga');
  const [testTarget, setTestTarget] = useState<'Artar' | 'Azalır'>('Artar');
  const [selectedPropIds, setSelectedPropIds] = useState<Set<string>>(new Set());
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (!onClose) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const currentGroup = PERIODIC_DIRECTIONAL_TRENDS[selectedDirection];

  // Arama filtresi
  const filteredProperties = currentGroup.properties.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.scientificReason.toLowerCase().includes(q) ||
      (p.exceptionOrWarning && p.exceptionOrWarning.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
    );
  });

  const increasing = filteredProperties.filter(p => p.change.includes('Artar'));
  const decreasing = filteredProperties.filter(p => p.change.includes('Azalır'));
  const constant = filteredProperties.filter(p => p.change === 'Değişmez');

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const getBadgeStyle = (change: string) => {
    if (change === 'Artar') {
      return { bg: '#2b8a3e22', color: '#40c057', border: '#2b8a3e66', text: '▲ ARTAR' };
    }
    if (change === 'Genellikle Artar') {
      return { bg: '#2b8a3e22', color: '#69db7c', border: '#2b8a3e66', text: '▲ GENELLİKLE ARTAR' };
    }
    if (change === 'Azalır') {
      return { bg: '#c92a2a22', color: '#ff6b6b', border: '#c92a2a66', text: '▼ AZALIR' };
    }
    if (change === 'Genellikle Azalır') {
      return { bg: '#c92a2a22', color: '#ffa8a8', border: '#c92a2a66', text: '▼ GENELLİKLE AZALIR' };
    }
    return { bg: '#868e9622', color: '#adb5bd', border: '#868e9666', text: '● DEĞİŞMEZ' };
  };

  // Test için seçilen yönün tüm özellikleri
  const testGroup = PERIODIC_DIRECTIONAL_TRENDS[testDirection];
  const testCorrectIds = new Set(
    testGroup.properties
      .filter(p => p.change.includes(testTarget))
      .map(p => p.id)
  );

  const toggleTestProp = (id: string) => {
    if (isChecked) return;
    setSelectedPropIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleNextTestQuestion = (dir: TrendDirectionKey, target: 'Artar' | 'Azalır') => {
    setTestDirection(dir);
    setTestTarget(target);
    setSelectedPropIds(new Set());
    setIsChecked(false);
  };

  const renderPropertyCard = (prop: PeriodicTrendProperty) => {
    const isExpanded = expandedId === prop.id;
    const badge = getBadgeStyle(prop.change);

    return (
      <div
        key={prop.id}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        style={{
          backgroundColor: 'var(--card-2)',
          border: '1px solid var(--border-2)',
          borderRadius: '12px',
          padding: '14px 18px',
          marginBottom: '12px',
          cursor: 'pointer',
          transition: 'all 0.15s ease'
        }}
        onClick={() => toggleExpand(prop.id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleExpand(prop.id);
          }
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>{prop.icon}</span>
            <div>
              <span style={{ fontWeight: 700, fontSize: '16px' }}>{prop.name}</span>
              <span
                style={{
                  display: 'inline-block',
                  marginLeft: '10px',
                  fontSize: '12px',
                  color: 'var(--faint)'
                }}
              >
                ({prop.category})
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                backgroundColor: badge.bg,
                color: badge.color,
                border: `1px solid ${badge.border}`,
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '12px',
                fontWeight: 700
              }}
            >
              {badge.text}
            </span>
            <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
              {isExpanded ? '▲ Gizle' : '▼ Detay'}
            </span>
          </div>
        </div>

        {/* Detay Açıklaması */}
        {isExpanded && (
          <div
            style={{
              marginTop: '14px',
              paddingTop: '12px',
              borderTop: '1px dashed var(--border-2)',
              fontSize: '14px',
              lineHeight: 1.55
            }}
          >
            <div style={{ marginBottom: '10px' }}>
              <strong style={{ color: '#4dabf7' }}>🔬 Bilimsel Nedeni: </strong>
              <span style={{ color: 'var(--text)' }}>{prop.scientificReason}</span>
            </div>

            {prop.exceptionOrWarning && (
              <div
                style={{
                  marginBottom: '10px',
                  padding: '10px 14px',
                  backgroundColor: '#f59f0015',
                  borderLeft: '4px solid #f59f00',
                  borderRadius: '6px'
                }}
              >
                <strong style={{ color: '#ffd43b' }}>⚠️ ÖSYM Tuzağı & İstisnası: </strong>
                <span style={{ color: 'var(--text)' }}>{prop.exceptionOrWarning}</span>
              </div>
            )}

            {prop.mnemonic && (
              <div
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#7950f215',
                  borderLeft: '4px solid #7950f2',
                  borderRadius: '6px'
                }}
              >
                <strong style={{ color: '#b197fc' }}>💡 Hafıza Tekniği (Mnemonic): </strong>
                <span style={{ color: 'var(--text)' }}>{prop.mnemonic}</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="card"
      style={{
        maxWidth: '1080px',
        width: '100%',
        margin: '0 auto',
        padding: '28px 32px'
      }}
    >
      {/* Başlık ve Kapat Butonu */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '32px' }}>🧭</span>
          <div>
            <h2 style={{ margin: 0, fontSize: '22px' }}>Periyodik Sistem Değişim Pusulası</h2>
            <p className="hint" style={{ margin: '3px 0 0', fontSize: '14px' }}>
              Periyodik tabloda soldan sağa, sağdan sola ve yukarıdan aşağıya ne artar, ne azalır?
            </p>
          </div>
        </div>
        {onClose && (
          <button type="button" className="btn ghost small" onClick={onClose} aria-label="Kapat">
            ✕
          </button>
        )}
      </div>

      {/* Ana Mod Sekmeleri: Konu Anlatımı / Yön Testi */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginTop: '18px',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '12px'
        }}
      >
        <button
          type="button"
          className={`btn ${activeTab === 'guide' ? 'primary' : 'ghost'} small`}
          onClick={() => setActiveTab('guide')}
        >
          📖 Konu Anlatımı & Keşif Rehberi
        </button>
        <button
          type="button"
          className={`btn ${activeTab === 'interactive_test' ? 'primary' : 'ghost'} small`}
          style={activeTab === 'interactive_test' ? { backgroundColor: '#ffd43b', color: '#15151c' } : {}}
          onClick={() => setActiveTab('interactive_test')}
        >
          🎯 Yön Sınavı (Neler Artar / Azalır? - Seçenekleri İşaretle)
        </button>
      </div>

      {/* ==================== 1. MOD: KONU ANLATIMI & KEŞİF ==================== */}
      {activeTab === 'guide' && (
        <>
          {/* 4 Yönlü Seçim Çubuğu */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '10px',
              marginTop: '18px'
            }}
          >
            <button
              type="button"
              className={`btn ${selectedDirection === 'soldan-saga' ? 'primary' : 'ghost'}`}
              style={{ justifyContent: 'center', padding: '12px' }}
              onClick={() => setSelectedDirection('soldan-saga')}
            >
              ➡️ Soldan Sağa (Aynı Periyot)
            </button>
            <button
              type="button"
              className={`btn ${selectedDirection === 'yukaridan-asagiya' ? 'primary' : 'ghost'}`}
              style={{ justifyContent: 'center', padding: '12px' }}
              onClick={() => setSelectedDirection('yukaridan-asagiya')}
            >
              ⬇️ Yukarıdan Aşağıya (Aynı Grup)
            </button>
            <button
              type="button"
              className={`btn ${selectedDirection === 'sagdan-sola' ? 'primary' : 'ghost'}`}
              style={{ justifyContent: 'center', padding: '12px' }}
              onClick={() => setSelectedDirection('sagdan-sola')}
            >
              ⬅️ Sağdan Sola (Geri Yön)
            </button>
            <button
              type="button"
              className={`btn ${selectedDirection === 'asagidan-yukariya' ? 'primary' : 'ghost'}`}
              style={{ justifyContent: 'center', padding: '12px' }}
              onClick={() => setSelectedDirection('asagidan-yukariya')}
            >
              ⬆️ Aşağıdan Yukarıya (Yukarı Yön)
            </button>
          </div>

          {/* Seçili Yönün Büyük Özet Kartı */}
          <div
            style={{
              marginTop: '18px',
              padding: '16px 20px',
              backgroundColor: 'var(--card-2)',
              borderLeft: '5px solid #e5484d',
              borderRadius: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '26px' }}>{currentGroup.arrow}</span>
              <div>
                <strong style={{ fontSize: '17px', color: '#ff8787' }}>{currentGroup.title}</strong>
                <span style={{ marginLeft: '10px', fontSize: '14px', color: 'var(--muted)' }}>
                  ({currentGroup.subTitle})
                </span>
              </div>
            </div>
            <p style={{ margin: '10px 0 0', fontSize: '14px', color: 'var(--text)', lineHeight: 1.55 }}>
              {currentGroup.summary}
            </p>
          </div>

          {/* Arama Kutusu */}
          <div style={{ marginTop: '18px', marginBottom: '16px' }}>
            <input
              type="text"
              className="text-input"
              placeholder="Özellik ara (örn: yarıçap, iyonlaşma, elektronegatiflik, asitlik)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ width: '100%', fontSize: '15px', padding: '12px 16px' }}
            />
          </div>

          {/* Özellik Listeleri */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
            {increasing.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '18px' }}>🟢</span>
                  <h3 style={{ margin: 0, fontSize: '16px', color: '#69db7c' }}>
                    Artan Özellikler ({increasing.length})
                  </h3>
                </div>
                {increasing.map(renderPropertyCard)}
              </div>
            )}

            {decreasing.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '18px' }}>🔴</span>
                  <h3 style={{ margin: 0, fontSize: '16px', color: '#ff8787' }}>
                    Azalan Özellikler ({decreasing.length})
                  </h3>
                </div>
                {decreasing.map(renderPropertyCard)}
              </div>
            )}

            {constant.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '18px' }}>⚪</span>
                  <h3 style={{ margin: 0, fontSize: '16px', color: '#adb5bd' }}>
                    Değişmeyen / Sabit Kalanlar ({constant.length})
                  </h3>
                </div>
                {constant.map(renderPropertyCard)}
              </div>
            )}
          </div>
        </>
      )}

      {/* ==================== 2. MOD: YÖN SINAVI (SEÇENEKLERİ İŞARETLE) ==================== */}
      {activeTab === 'interactive_test' && (
        <div style={{ marginTop: '20px' }}>
          {/* Soru Seçici Butonları */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
            <button
              type="button"
              className={`btn ${testDirection === 'soldan-saga' && testTarget === 'Artar' ? 'primary' : 'ghost'} small`}
              onClick={() => handleNextTestQuestion('soldan-saga', 'Artar')}
            >
              ➡️ Soldan Sağa NELER ARTAR?
            </button>
            <button
              type="button"
              className={`btn ${testDirection === 'soldan-saga' && testTarget === 'Azalır' ? 'primary' : 'ghost'} small`}
              onClick={() => handleNextTestQuestion('soldan-saga', 'Azalır')}
            >
              ➡️ Soldan Sağa NELER AZALIR?
            </button>
            <button
              type="button"
              className={`btn ${testDirection === 'sagdan-sola' && testTarget === 'Artar' ? 'primary' : 'ghost'} small`}
              onClick={() => handleNextTestQuestion('sagdan-sola', 'Artar')}
            >
              ⬅️ Sağdan Sola NELER ARTAR?
            </button>
            <button
              type="button"
              className={`btn ${testDirection === 'yukaridan-asagiya' && testTarget === 'Artar' ? 'primary' : 'ghost'} small`}
              onClick={() => handleNextTestQuestion('yukaridan-asagiya', 'Artar')}
            >
              ⬇️ Yukarıdan Aşağıya NELER ARTAR?
            </button>
            <button
              type="button"
              className={`btn ${testDirection === 'yukaridan-asagiya' && testTarget === 'Azalır' ? 'primary' : 'ghost'} small`}
              onClick={() => handleNextTestQuestion('yukaridan-asagiya', 'Azalır')}
            >
              ⬇️ Yukarıdan Aşağıya NELER AZALIR?
            </button>
          </div>

          {/* Soru Başlık Kutusu */}
          <div
            style={{
              padding: '20px 24px',
              backgroundColor: 'var(--card-2)',
              border: '2px solid var(--border-2)',
              borderRadius: '14px',
              marginBottom: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '28px' }}>{testGroup.arrow}</span>
              <div>
                <h3 style={{ margin: 0, fontSize: '20px', color: '#fff' }}>
                  {testGroup.title} ({testGroup.subTitle}) gidildikçe aşağıdaki özelliklerden hangileri{' '}
                  <span style={{ color: testTarget === 'Artar' ? '#40c057' : '#ff6b6b', textDecoration: 'underline' }}>
                    {testTarget.toUpperCase()}?
                  </span>
                </h3>
                <p className="hint" style={{ margin: '4px 0 0', fontSize: '13px' }}>
                  {testTarget === 'Artar' ? 'Artan' : 'Azalan'} olduğunu düşündüğünüz tüm seçenekleri işaretleyip kontrol edin.
                </p>
              </div>
            </div>
          </div>

          {/* Seçenekler Izgarası (Geniş ve Ferah) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '12px'
            }}
          >
            {testGroup.properties.map(prop => {
              const isSelected = selectedPropIds.has(prop.id);
              const isActuallyCorrect = testCorrectIds.has(prop.id);

              let borderColor = 'var(--border-2)';
              let bgColor = 'var(--card-2)';
              let icon = isSelected ? '☑️' : '⬜';

              if (isChecked) {
                if (isSelected && isActuallyCorrect) {
                  borderColor = '#2b8a3e';
                  bgColor = '#2b8a3e22';
                  icon = '✅';
                } else if (isSelected && !isActuallyCorrect) {
                  borderColor = '#c92a2a';
                  bgColor = '#c92a2a22';
                  icon = '❌';
                } else if (!isSelected && isActuallyCorrect) {
                  borderColor = '#f59f00';
                  bgColor = '#f59f0015';
                  icon = '⚠️ Kaçırıldı';
                }
              } else if (isSelected) {
                borderColor = 'var(--accent)';
                bgColor = 'rgba(229, 72, 77, 0.12)';
              }

              return (
                <div
                  key={prop.id}
                  role="button"
                  tabIndex={isChecked ? -1 : 0}
                  aria-pressed={isSelected}
                  style={{
                    backgroundColor: bgColor,
                    border: `1.5px solid ${borderColor}`,
                    borderRadius: '12px',
                    padding: '14px 16px',
                    cursor: isChecked ? 'default' : 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                  onClick={() => toggleTestProp(prop.id)}
                  onKeyDown={(e) => {
                    if (!isChecked && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      toggleTestProp(prop.id);
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '18px' }}>{prop.icon}</span>
                      <strong style={{ fontSize: '15px' }}>{prop.name}</strong>
                    </div>
                    <span style={{ fontSize: '16px' }}>{icon}</span>
                  </div>

                  {isChecked && (
                    <div
                      style={{
                        marginTop: '10px',
                        paddingTop: '8px',
                        borderTop: '1px dashed var(--border-2)',
                        fontSize: '12px',
                        color: 'var(--muted)',
                        lineHeight: 1.4
                      }}
                    >
                      <div>
                        <strong>Gerçek Değişim: </strong>
                        <span style={{ color: prop.change.includes('Artar') ? '#40c057' : prop.change.includes('Azalır') ? '#ff6b6b' : '#adb5bd' }}>
                          {prop.change}
                        </span>
                      </div>
                      <div style={{ marginTop: '3px' }}>{prop.scientificReason}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Test Aksiyon Butonları */}
          <div
            style={{
              marginTop: '20px',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-2)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div>
              <span style={{ fontWeight: 700, fontSize: '14px' }}>
                Seçilen: {selectedPropIds.size} özellik
              </span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {!isChecked ? (
                <button
                  type="button"
                  className="btn primary small"
                  disabled={selectedPropIds.size === 0}
                  onClick={() => setIsChecked(true)}
                >
                  ✅ Cevabımı Kontrol Et
                </button>
              ) : (
                <button
                  type="button"
                  className="btn secondary small"
                  onClick={() => {
                    setIsChecked(false);
                    setSelectedPropIds(new Set());
                  }}
                >
                  🔄 Tekrar Dene
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Alt Aksiyon Butonları */}
      <div
        style={{
          marginTop: '24px',
          paddingTop: '18px',
          borderTop: '1px solid var(--border-2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <span className="hint" style={{ fontSize: '13px' }}>
          💡 YKS Kimya'da periyodik özellikler her yıl doğrudan soru getirir.
        </span>
        <div style={{ display: 'flex', gap: '10px' }}>
          {onStartTrendQuiz && (
            <button type="button" className="btn primary small" onClick={onStartTrendQuiz}>
              🎯 20 Soruluk Hızlı Testi Başlat
            </button>
          )}
          {onClose && (
            <button type="button" className="btn ghost small" onClick={onClose}>
              Kapat
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
