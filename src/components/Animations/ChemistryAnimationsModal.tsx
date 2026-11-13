import React, { useEffect, useMemo, useState } from 'react';
import { TopicId } from '../../types/topics';
import {
  ANIMATION_CATALOG,
  ANIMATION_CATALOG_MAP,
  AnimationCatalogItem,
  AnimationExamBadge,
  AnimationSceneId
} from './animationCatalog';
import {
  ElectrolysisAnimationScene,
  GalvanicCellAnimationScene
} from './scenes/GalvanicElectrolysisScenes';
import {
  EquilibriumCollisionScene,
  GasLawsDiffusionScene,
  HydrationPolarityScene
} from './scenes/EquilibriumGasMatterScenes';
import {
  AcidBaseTitrationScene,
  BohrOrbitalScene,
  ColligativeOsmosisScene
} from './scenes/AtomicColligativeTitrationScenes';

export type { AnimationSceneId } from './animationCatalog';

export interface ChemistryAnimationsModalProps {
  isOpen: boolean;
  initialScene?: AnimationSceneId;
  onClose: () => void;
  onStartTopicQuiz: (topicId: TopicId) => void;
}

type ExamFilter = 'all' | 'tyt_ortak' | 'ayt';

function matchesFilter(item: AnimationCatalogItem, filter: ExamFilter): boolean {
  if (filter === 'all') return true;
  if (filter === 'tyt_ortak') {
    return item.examBadge === 'TYT' || item.examBadge === 'TYT + AYT';
  }
  return item.examBadge === 'AYT';
}

function getBadgeStyle(badge: AnimationExamBadge): React.CSSProperties {
  if (badge === 'TYT') {
    return {
      background: 'var(--ok-soft)',
      color: 'var(--ok)',
      borderColor: 'rgba(48, 181, 117, 0.35)'
    };
  }
  if (badge === 'TYT + AYT') {
    return {
      background: 'var(--accent-soft)',
      color: 'var(--accent-2)',
      borderColor: 'rgba(229, 72, 77, 0.38)'
    };
  }
  return {
    background: 'var(--violet-soft)',
    color: 'var(--violet)',
    borderColor: 'rgba(167, 139, 250, 0.38)'
  };
}

export const ChemistryAnimationsModal: React.FC<ChemistryAnimationsModalProps> = ({
  isOpen,
  initialScene = 'galvanic_cell',
  onClose,
  onStartTopicQuiz
}) => {
  const [examFilter, setExamFilter] = useState<ExamFilter>('all');
  const [activeSceneId, setActiveSceneId] = useState<AnimationSceneId>(initialScene);

  useEffect(() => {
    if (!isOpen) return;
    setActiveSceneId(initialScene);
    setExamFilter('all');
  }, [isOpen, initialScene]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const tytOrtakCount = useMemo(
    () => ANIMATION_CATALOG.filter(item => matchesFilter(item, 'tyt_ortak')).length,
    []
  );

  const aytCount = useMemo(
    () => ANIMATION_CATALOG.filter(item => matchesFilter(item, 'ayt')).length,
    []
  );

  const filteredItems = useMemo(
    () => ANIMATION_CATALOG.filter(item => matchesFilter(item, examFilter)),
    [examFilter]
  );

  if (!isOpen) return null;

  const activeMeta = ANIMATION_CATALOG_MAP[activeSceneId] ?? ANIMATION_CATALOG[0];

  const handleFilterChange = (nextFilter: ExamFilter) => {
    setExamFilter(nextFilter);
    const matching = ANIMATION_CATALOG.filter(item => matchesFilter(item, nextFilter));
    if (matching.length > 0 && !matching.some(item => item.id === activeSceneId)) {
      setActiveSceneId(matching[0].id);
    }
  };

  const handlePracticeActiveTopic = () => {
    onStartTopicQuiz(activeMeta.topicId);
  };

  const renderActiveScene = () => {
    switch (activeSceneId) {
      case 'galvanic_cell':
        return <GalvanicCellAnimationScene onPracticeTopic={handlePracticeActiveTopic} />;
      case 'electrolysis':
        return <ElectrolysisAnimationScene onPracticeTopic={handlePracticeActiveTopic} />;
      case 'equilibrium_collision':
        return <EquilibriumCollisionScene onPracticeTopic={handlePracticeActiveTopic} />;
      case 'gas_laws':
        return <GasLawsDiffusionScene onPracticeTopic={handlePracticeActiveTopic} />;
      case 'hydration_polarity':
        return <HydrationPolarityScene onPracticeTopic={handlePracticeActiveTopic} />;
      case 'bohr_orbital':
        return <BohrOrbitalScene onPracticeTopic={handlePracticeActiveTopic} />;
      case 'colligative_osmosis':
        return <ColligativeOsmosisScene onPracticeTopic={handlePracticeActiveTopic} />;
      case 'acid_base_titration':
        return <AcidBaseTitrationScene onPracticeTopic={handlePracticeActiveTopic} />;
      default:
        return <GalvanicCellAnimationScene onPracticeTopic={handlePracticeActiveTopic} />;
    }
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Canlı Kimya Animasyonları Stüdyosu"
      onClick={onClose}
    >
      <style>{`
        .anim-studio-panel {
          max-width: 1220px;
          width: 100%;
          max-height: 94vh;
          display: flex;
          flex-direction: column;
          padding: 22px 24px;
          overflow: hidden;
        }
        .anim-studio-workspace {
          display: grid;
          grid-template-columns: 290px minmax(0, 1fr);
          gap: 18px;
          align-items: start;
          flex: 1 1 auto;
          min-height: 0;
          margin-top: 14px;
          overflow: hidden;
        }
        .anim-studio-sidebar {
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-height: 100%;
          overflow-y: auto;
          padding-right: 4px;
        }
        .anim-studio-stage {
          max-height: 100%;
          overflow-y: auto;
          padding-right: 4px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .anim-scene-card {
          width: 100%;
          text-align: left;
          background: var(--card-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 11px 12px;
          color: var(--text);
          cursor: pointer;
          transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.1s ease;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-family: inherit;
        }
        .anim-scene-card:hover {
          background: var(--card-hover);
          border-color: var(--border-2);
        }
        .anim-scene-card.active {
          background: var(--accent-soft);
          border-color: var(--accent);
          box-shadow: 0 0 0 1px rgba(229, 72, 77, 0.25);
        }
        @media (max-width: 900px) {
          .anim-studio-panel {
            padding: 16px;
            max-height: 95vh;
            overflow-y: auto;
          }
          .anim-studio-workspace {
            grid-template-columns: minmax(0, 1fr);
            overflow: visible;
            gap: 14px;
          }
          .anim-studio-sidebar {
            flex-direction: row;
            overflow-x: auto;
            overflow-y: hidden;
            padding-right: 0;
            padding-bottom: 6px;
          }
          .anim-scene-card {
            min-width: 220px;
            flex: 0 0 auto;
          }
          .anim-studio-stage {
            overflow-y: visible;
            padding-right: 0;
          }
        }
      `}</style>

      <div
        className="card modal-panel anim-studio-panel"
        onClick={event => event.stopPropagation()}
      >
        {/* Üst Başlık ve Sınav Filtreleri */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '12px',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              aria-hidden="true"
              style={{
                fontSize: '28px',
                lineHeight: 1,
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'var(--card-2)',
                border: '1px solid var(--border-2)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              🎬
            </span>
            <div>
              <h2 style={{ margin: 0, fontSize: '20px', lineHeight: 1.25 }}>
                Canlı Kimya Animasyonları Stüdyosu
              </h2>
              <p className="hint" style={{ margin: '3px 0 0', fontSize: '13px' }}>
                TYT ve AYT’nin soyut kimya olaylarını etkileşimli, gerçek zamanlı SVG sahneleriyle keşfet.
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

        {/* Sınav Filtre Hapları */}
        <div
          className="exam-tabs"
          role="tablist"
          aria-label="Animasyon sınav filtresi"
          style={{
            marginTop: '14px',
            paddingBottom: '12px',
            borderBottom: '1px solid var(--border)'
          }}
        >
          <button
            type="button"
            role="tab"
            aria-selected={examFilter === 'all'}
            className={`exam-tab ${examFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            Tümü ({ANIMATION_CATALOG.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={examFilter === 'tyt_ortak'}
            className={`exam-tab cat-tyt_ayt ${examFilter === 'tyt_ortak' ? 'active' : ''}`}
            onClick={() => handleFilterChange('tyt_ortak')}
          >
            TYT / Ortak ({tytOrtakCount})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={examFilter === 'ayt'}
            className={`exam-tab cat-ayt ${examFilter === 'ayt' ? 'active' : ''}`}
            onClick={() => handleFilterChange('ayt')}
          >
            AYT ({aytCount})
          </button>
        </div>

        {/* Ana Çalışma Alanı: Sol Kenar Çubuğu + Sağ Sahne */}
        <div className="anim-studio-workspace">
          <nav
            className="anim-studio-sidebar"
            aria-label="Kimya animasyon sahneleri"
          >
            {filteredItems.map(item => {
              const isActive = item.id === activeMeta.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`anim-scene-card ${isActive ? 'active' : ''}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => setActiveSceneId(item.id)}
                >
                  <span
                    aria-hidden="true"
                    style={{ fontSize: '20px', lineHeight: 1.2, flexShrink: 0 }}
                  >
                    {item.icon}
                  </span>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div
                      style={{
                        fontSize: '13.5px',
                        fontWeight: 700,
                        lineHeight: 1.3,
                        color: 'var(--text)'
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '6px',
                        marginTop: '6px'
                      }}
                    >
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontWeight: 700,
                          padding: '2px 7px',
                          borderRadius: '999px',
                          border: '1px solid',
                          ...getBadgeStyle(item.examBadge)
                        }}
                      >
                        {item.examBadge}
                      </span>
                      <span
                        style={{
                          fontSize: '11.5px',
                          color: 'var(--muted)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {item.shortTitle}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>

          <div className="anim-studio-stage">
            {/* Aktif Sahne Bilgi Şeridi */}
            <div
              style={{
                background: 'var(--card-2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span aria-hidden="true" style={{ fontSize: '19px' }}>
                    {activeMeta.icon}
                  </span>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>
                    {activeMeta.title}
                  </h3>
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 9px',
                    borderRadius: '999px',
                    border: '1px solid',
                    ...getBadgeStyle(activeMeta.examBadge)
                  }}
                >
                  {activeMeta.examBadge}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)', lineHeight: 1.45 }}>
                {activeMeta.summary}
              </p>
              <div
                style={{
                  fontSize: '12.5px',
                  color: 'var(--text)',
                  background: 'var(--info-soft)',
                  borderLeft: '3px solid var(--info)',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  lineHeight: 1.45
                }}
              >
                <strong style={{ color: 'var(--info)' }}>💡 ÖSYM Püf Noktası: </strong>
                {activeMeta.osymTakeaway}
              </div>
            </div>

            {/* Aktif SVG Sahne Bileşeni */}
            <div>{renderActiveScene()}</div>
          </div>
        </div>

        {/* Alt Aksiyon Çubuğu */}
        <div
          style={{
            marginTop: '14px',
            paddingTop: '14px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap'
          }}
        >
          <span className="hint" style={{ fontSize: '12.5px' }}>
            🎬 Sahneyi inceledikten sonra hemen ilgili konunun ÖSYM sorularıyla pekiştirme yapabilirsin.
          </span>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn primary small"
              onClick={handlePracticeActiveTopic}
            >
              🎯 Bu Konunun Testini Çöz
            </button>
            <button type="button" className="btn ghost small" onClick={onClose}>
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
