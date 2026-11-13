import React, { useEffect, useState } from 'react';
import { TopicId } from '../../types/topics';
import { TOPIC_MAP } from '../../data/topics';
import { getTopicStandardItems } from '../../engine/quizEngine';

interface TopicReferenceModalProps {
  topicId: TopicId | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TopicReferenceModal: React.FC<TopicReferenceModalProps> = ({
  topicId,
  isOpen,
  onClose
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    setQuery('');
  }, [topicId, isOpen]);

  if (!isOpen || !topicId) return null;

  const topic = TOPIC_MAP.get(topicId);
  if (!topic) return null;

  const items = getTopicStandardItems(topicId);
  const normalizedQuery = query.trim().toLowerCase();
  const filteredItems = normalizedQuery
    ? items.filter(
        item =>
          item.prompt.toLowerCase().includes(normalizedQuery) ||
          item.answer.toLowerCase().includes(normalizedQuery) ||
          (item.category && item.category.toLowerCase().includes(normalizedQuery)) ||
          (item.hint && item.hint.toLowerCase().includes(normalizedQuery))
      )
    : items;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`${topic.title} Çalışma Kartları`}
      onClick={onClose}
    >
      <div className="card modal-panel medium" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '26px' }} aria-hidden="true">
              {topic.icon}
            </span>
            <div>
              <h2 style={{ margin: 0, fontSize: '20px' }}>{topic.title} — Çalışma Kartları</h2>
              <span
                className="topic-badge"
                style={{
                  display: 'inline-block',
                  marginTop: '4px',
                  backgroundColor: `${topic.badgeColor}1f`,
                  color: topic.badgeColor,
                  borderColor: `${topic.badgeColor}66`
                }}
              >
                {topic.tag}
              </span>
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

        <p className="hint" style={{ marginTop: '12px' }}>
          {topic.description} Toplam <strong>{items.length}</strong> madde listelenmiştir:
        </p>

        {items.length > 6 && (
          <div className="search-box" style={{ marginTop: '10px' }}>
            <span className="search-box-icon" aria-hidden="true">
              🔍
            </span>
            <input
              type="search"
              className="search-input"
              aria-label="Çalışma kartlarında ara"
              placeholder="Listede ara (formül, ad, kategori)..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            {query && (
              <button
                type="button"
                className="search-clear"
                aria-label="Aramayı temizle"
                onClick={() => setQuery('')}
              >
                ✕
              </button>
            )}
          </div>
        )}

        <table className="compound-table">
          <thead>
            <tr>
              <th style={{ width: '35%' }}>Soru / Gösterim</th>
              <th style={{ width: '35%' }}>Doğru Cevap</th>
              <th style={{ width: '30%' }}>Detay / İpucu</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, idx) => (
              <tr key={String(item.id) + idx}>
                <td>
                  <strong style={{ fontSize: '15px' }}>{item.prompt}</strong>
                  {item.promptSub && (
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                      {item.promptSub}
                    </div>
                  )}
                </td>
                <td style={{ color: 'var(--text)', fontWeight: 600 }}>
                  {item.answer}
                  {item.synonyms && item.synonyms.length > 0 && (
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                      Ayrıca: {item.synonyms.join(', ')}
                    </div>
                  )}
                </td>
                <td>
                  {item.category && (
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor: 'var(--card-2)',
                        border: '1px solid var(--border-2)',
                        marginBottom: '4px'
                      }}
                    >
                      {item.category}
                    </span>
                  )}
                  {item.hint && (
                    <div style={{ fontSize: '12px', color: 'var(--faint)' }}>{item.hint}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button type="button" className="btn primary small" onClick={onClose}>
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
