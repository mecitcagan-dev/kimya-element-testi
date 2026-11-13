import React from 'react';
import { ExamCategory, TopicDefinition, TopicId } from '../../types/topics';
import { ALL_TOPICS } from '../../data/topics';

interface TopicExplorerProps {
  examCat: ExamCategory;
  onExamCatChange: (cat: ExamCategory) => void;
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
  onlyWeakTopics: boolean;
  onToggleOnlyWeak: () => void;
  weakCountsByTopic: Record<string, number>;
  selectedTopicId: TopicId;
  onSelectTopic: (id: TopicId) => void;
  onOpenTopicReference: (id: TopicId) => void;
}

/** Sol panel: sınav sekmeleri, canlı konu arama, zayıf konu filtresi ve erişilebilir konu kartları */
export const TopicExplorer: React.FC<TopicExplorerProps> = ({
  examCat,
  onExamCatChange,
  searchQuery,
  onSearchQueryChange,
  onlyWeakTopics,
  onToggleOnlyWeak,
  weakCountsByTopic,
  selectedTopicId,
  onSelectTopic,
  onOpenTopicReference
}) => {
  const totalWeakTopics = ALL_TOPICS.filter(t => (weakCountsByTopic[t.id] || 0) > 0).length;

  const filteredTopics: TopicDefinition[] = ALL_TOPICS.filter(t => {
    if (examCat !== 'all' && t.examCategory !== examCat) return false;
    if (onlyWeakTopics && (weakCountsByTopic[t.id] || 0) === 0) return false;

    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tag.toLowerCase().includes(q)
    );
  });

  const resetFilters = () => {
    onExamCatChange('all');
    onSearchQueryChange('');
    if (onlyWeakTopics) onToggleOnlyWeak();
  };

  return (
    <div className="topic-explorer">
      <div className="explorer-toolbar">
        {/* Sınav Kategorisi Sekmeleri */}
        <div className="exam-tabs" role="tablist" aria-label="Sınav kategorisi">
          <button
            type="button"
            className={`exam-tab ${examCat === 'all' ? 'active' : ''}`}
            onClick={() => onExamCatChange('all')}
          >
            Tüm Konular ({ALL_TOPICS.length})
          </button>
          <button
            type="button"
            className={`exam-tab cat-tyt_ayt ${examCat === 'tyt_ayt' ? 'active' : ''}`}
            onClick={() => onExamCatChange('tyt_ayt')}
          >
            🔥 TYT + AYT Ortak ({ALL_TOPICS.filter(t => t.examCategory === 'tyt_ayt').length})
          </button>
          <button
            type="button"
            className={`exam-tab cat-tyt ${examCat === 'tyt' ? 'active' : ''}`}
            onClick={() => onExamCatChange('tyt')}
          >
            🧪 TYT Kimya ({ALL_TOPICS.filter(t => t.examCategory === 'tyt').length})
          </button>
          <button
            type="button"
            className={`exam-tab cat-ayt ${examCat === 'ayt' ? 'active' : ''}`}
            onClick={() => onExamCatChange('ayt')}
          >
            🧬 AYT Kimya ({ALL_TOPICS.filter(t => t.examCategory === 'ayt').length})
          </button>
        </div>

        {/* Arama ve Hızlı Filtre Satırı */}
        <div className="explorer-filter-row">
          <div className="search-box">
            <span className="search-box-icon" aria-hidden="true">
              🔍
            </span>
            <input
              type="search"
              className="search-input"
              aria-label="Konu veya kavram ara"
              placeholder="Konu veya kavram ara (örn. gaz, adlandırma, pil)..."
              value={searchQuery}
              onChange={e => onSearchQueryChange(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear"
                aria-label="Aramayı temizle"
                onClick={() => onSearchQueryChange('')}
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="button"
            className={`filter-chip ${onlyWeakTopics ? 'active' : ''}`}
            disabled={totalWeakTopics === 0 && !onlyWeakTopics}
            aria-pressed={onlyWeakTopics}
            onClick={onToggleOnlyWeak}
          >
            ⚠ Zayıf Konular ({totalWeakTopics})
          </button>
        </div>
      </div>

      {/* Konu Kartları Izgarası */}
      {filteredTopics.length === 0 ? (
        <div className="empty-topics" role="status">
          <strong>Eşleşen konu bulunamadı</strong>
          <p>Farklı bir anahtar kelime deneyin veya tüm konuları görüntülemek için filtreleri sıfırlayın.</p>
          <button type="button" className="btn secondary small" onClick={resetFilters}>
            Filtreleri Sıfırla
          </button>
        </div>
      ) : (
        <div className="topic-grid">
          {filteredTopics.map(t => {
            const isSelected = t.id === selectedTopicId;
            const weakCount = weakCountsByTopic[t.id] || 0;

            return (
              <article
                key={t.id}
                className={`topic-card ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectTopic(t.id)}
              >
                <button
                  type="button"
                  className="topic-select-trigger"
                  aria-pressed={isSelected}
                  onClick={e => {
                    e.stopPropagation();
                    onSelectTopic(t.id);
                  }}
                >
                  <div className="topic-head">
                    <div className="topic-title">
                      <span aria-hidden="true">{t.icon}</span>
                      <span>{t.title}</span>
                    </div>
                    <span
                      className="topic-badge"
                      style={{
                        backgroundColor: `${t.badgeColor}1f`,
                        borderColor: `${t.badgeColor}66`,
                        color: t.badgeColor
                      }}
                    >
                      {t.tag}
                    </span>
                  </div>
                  <p className="topic-desc">{t.description}</p>
                </button>

                <div className="topic-footer">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span className={`topic-status ${isSelected ? 'is-selected' : ''}`}>
                      {isSelected ? '✓ Seçili Konu' : 'Seçmek için tıkla'}
                    </span>
                    {weakCount > 0 && (
                      <span className="topic-weak-pill">⚠ {weakCount} hata</span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="btn ghost small topic-inspect-btn"
                    onClick={e => {
                      e.stopPropagation();
                      onOpenTopicReference(t.id);
                    }}
                  >
                    📖 İncele
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
