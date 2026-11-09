import React from 'react';
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
  if (!isOpen || !topicId) return null;

  const topic = TOPIC_MAP.get(topicId);
  if (!topic) return null;

  const items = getTopicStandardItems(topicId);

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '16px',
        backdropFilter: 'blur(5px)'
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{
          maxWidth: '750px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '26px' }}>{topic.icon}</span>
            <div>
              <h2 style={{ margin: 0, fontSize: '20px' }}>{topic.title} — Çalışma Kartları</h2>
              <span
                style={{
                  display: 'inline-block',
                  marginTop: '4px',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: `${topic.badgeColor}22`,
                  color: topic.badgeColor,
                  border: `1px solid ${topic.badgeColor}66`
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

        <table className="compound-table">
          <thead>
            <tr>
              <th style={{ width: '35%' }}>Soru / Gösterim</th>
              <th style={{ width: '35%' }}>Doğru Cevap</th>
              <th style={{ width: '30%' }}>Detay / İpucu</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
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
                    <div style={{ fontSize: '12px', color: 'var(--faint)' }}>
                      {item.hint}
                    </div>
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
