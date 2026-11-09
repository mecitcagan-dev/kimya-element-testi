import React, { useState } from 'react';
import {
  PERIODIC_DIRECTIONAL_TRENDS,
  TrendDirectionKey,
  PeriodicTrendProperty
} from '../../data/periodicSystemTrends';

interface PeriodicTrendsExplorerProps {
  onStartTrendQuiz?: () => void;
  onClose?: () => void;
}

export const PeriodicTrendsExplorer: React.FC<PeriodicTrendsExplorerProps> = ({
  onStartTrendQuiz,
  onClose
}) => {
  const [selectedDirection, setSelectedDirection] = useState<TrendDirectionKey>('soldan-saga');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const currentGroup = PERIODIC_DIRECTIONAL_TRENDS[selectedDirection];

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

  const renderPropertyCard = (prop: PeriodicTrendProperty) => {
    const isExpanded = expandedId === prop.id;
    const badge = getBadgeStyle(prop.change);

    return (
      <div
        key={prop.id}
        style={{
          backgroundColor: 'var(--card-2)',
          border: '1px solid var(--border-2)',
          borderRadius: '10px',
          padding: '12px 14px',
          marginBottom: '10px',
          cursor: 'pointer',
          transition: 'all 0.15s ease'
        }}
        onClick={() => toggleExpand(prop.id)}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>{prop.icon}</span>
            <div>
              <span style={{ fontWeight: 700, fontSize: '15px' }}>{prop.name}</span>
              <span
                style={{
                  display: 'inline-block',
                  marginLeft: '8px',
                  fontSize: '11px',
                  color: 'var(--faint)'
                }}
              >
                ({prop.category})
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                backgroundColor: badge.bg,
                color: badge.color,
                border: `1px solid ${badge.border}`,
                borderRadius: '6px',
                padding: '2px 8px',
                fontSize: '11px',
                fontWeight: 700
              }}
            >
              {badge.text}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
              {isExpanded ? '▲ Gizle' : '▼ Detay'}
            </span>
          </div>
        </div>

        {/* Detay Açıklaması */}
        {isExpanded && (
          <div
            style={{
              marginTop: '12px',
              paddingTop: '10px',
              borderTop: '1px dashed var(--border-2)',
              fontSize: '13px',
              lineHeight: 1.5
            }}
          >
            <div style={{ marginBottom: '8px' }}>
              <strong style={{ color: '#4dabf7' }}>🔬 Bilimsel Nedeni: </strong>
              <span style={{ color: 'var(--text)' }}>{prop.scientificReason}</span>
            </div>

            {prop.exceptionOrWarning && (
              <div
                style={{
                  marginBottom: '8px',
                  padding: '8px 10px',
                  backgroundColor: '#f59f0015',
                  borderLeft: '3px solid #f59f00',
                  borderRadius: '4px'
                }}
              >
                <strong style={{ color: '#ffd43b' }}>⚠️ ÖSYM Tuzağı & İstisnası: </strong>
                <span style={{ color: 'var(--text)' }}>{prop.exceptionOrWarning}</span>
              </div>
            )}

            {prop.mnemonic && (
              <div
                style={{
                  padding: '6px 10px',
                  backgroundColor: '#7950f215',
                  borderLeft: '3px solid #7950f2',
                  borderRadius: '4px'
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
    <div className="card" style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      {/* Başlık ve Kapat Butonu */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '28px' }}>🧭</span>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px' }}>Periyodik Sistem Değişim Pusulası</h2>
            <p className="hint" style={{ margin: '2px 0 0' }}>
              Periyodik tabloda soldan sağa ve yukarıdan aşağıya ne artar, ne azalır, neden değişir?
            </p>
          </div>
        </div>
        {onClose && (
          <button type="button" className="btn ghost small" onClick={onClose} aria-label="Kapat">
            ✕
          </button>
        )}
      </div>

      {/* 4 Yönlü Seçim Çubuğu */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '8px',
          marginTop: '16px'
        }}
      >
        <button
          type="button"
          className={`btn ${selectedDirection === 'soldan-saga' ? 'primary' : 'ghost'}`}
          style={{ justifyContent: 'center', padding: '10px' }}
          onClick={() => setSelectedDirection('soldan-saga')}
        >
          ➡️ Soldan Sağa (Aynı Periyotta)
        </button>
        <button
          type="button"
          className={`btn ${selectedDirection === 'yukaridan-asagiya' ? 'primary' : 'ghost'}`}
          style={{ justifyContent: 'center', padding: '10px' }}
          onClick={() => setSelectedDirection('yukaridan-asagiya')}
        >
          ⬇️ Yukarıdan Aşağıya (Aynı Grupta)
        </button>
        <button
          type="button"
          className={`btn ${selectedDirection === 'sagdan-sola' ? 'primary' : 'ghost'}`}
          style={{ justifyContent: 'center', padding: '10px' }}
          onClick={() => setSelectedDirection('sagdan-sola')}
        >
          ⬅️ Sağdan Sola (Geri Yön)
        </button>
        <button
          type="button"
          className={`btn ${selectedDirection === 'asagidan-yukariya' ? 'primary' : 'ghost'}`}
          style={{ justifyContent: 'center', padding: '10px' }}
          onClick={() => setSelectedDirection('asagidan-yukariya')}
        >
          ⬆️ Aşağıdan Yukarıya (Yukarı Yön)
        </button>
      </div>

      {/* Seçili Yönün Büyük Özet Kartı */}
      <div
        style={{
          marginTop: '16px',
          padding: '14px 18px',
          backgroundColor: 'var(--card-2)',
          borderLeft: '4px solid #e5484d',
          borderRadius: '8px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '24px' }}>{currentGroup.arrow}</span>
          <div>
            <strong style={{ fontSize: '16px', color: '#ff8787' }}>{currentGroup.title}</strong>
            <span style={{ marginLeft: '8px', fontSize: '13px', color: 'var(--muted)' }}>
              ({currentGroup.subTitle})
            </span>
          </div>
        </div>
        <p style={{ margin: '8px 0 0', fontSize: '13px', color: 'var(--text)', lineHeight: 1.5 }}>
          {currentGroup.summary}
        </p>
      </div>

      {/* Arama Kutusu */}
      <div style={{ marginTop: '16px', marginBottom: '14px' }}>
        <input
          type="text"
          className="text-input"
          placeholder="Özellik ara (örn: yarıçap, iyonlaşma, elektronegatiflik, asitlik)..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{ width: '100%', fontSize: '14px' }}
        />
      </div>

      {/* Özellik Listeleri: Artanlar, Azalanlar, Değişmeyenler */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
        {/* 1. ARTANLAR */}
        {increasing.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '16px' }}>🟢</span>
              <h3 style={{ margin: 0, fontSize: '15px', color: '#69db7c' }}>
                Artan Özellikler ({increasing.length})
              </h3>
            </div>
            {increasing.map(renderPropertyCard)}
          </div>
        )}

        {/* 2. AZALANLAR */}
        {decreasing.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '16px' }}>🔴</span>
              <h3 style={{ margin: 0, fontSize: '15px', color: '#ff8787' }}>
                Azalan Özellikler ({decreasing.length})
              </h3>
            </div>
            {decreasing.map(renderPropertyCard)}
          </div>
        )}

        {/* 3. DEĞİŞMEYENLER */}
        {constant.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '16px' }}>⚪</span>
              <h3 style={{ margin: 0, fontSize: '15px', color: '#adb5bd' }}>
                Değişmeyen / Sabit Kalanlar ({constant.length})
              </h3>
            </div>
            {constant.map(renderPropertyCard)}
          </div>
        )}
      </div>

      {/* Alt Aksiyon Butonları */}
      <div
        style={{
          marginTop: '20px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}
      >
        <span className="hint" style={{ fontSize: '12px' }}>
          Kartlara tıklayarak bilimsel nedenleri ve ÖSYM istisna tuzaklarını görebilirsiniz.
        </span>
        <div style={{ display: 'flex', gap: '10px' }}>
          {onStartTrendQuiz && (
            <button type="button" className="btn primary small" onClick={onStartTrendQuiz}>
              🎯 Bu Konuda Hemen Test Çöz
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
