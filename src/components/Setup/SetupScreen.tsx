import React, { useState, useEffect } from 'react';
import { TopicId, ExamCategory } from '../../types/topics';
import { AnswerMode, ElementRangeKey, QuizConfig } from '../../types/quiz';
import { ALL_TOPICS, TOPIC_MAP } from '../../data/topics';
import { SegmentGroup } from './SegmentGroup';
import { KeyBadge } from '../Common/KeyBadge';
import { readStored, writeStored, KEYS } from '../../utils/storage';
import { getWeakTopicIds } from '../../engine/statsEngine';

interface SetupScreenProps {
  onStartQuiz: (cfg: QuizConfig) => void;
  onOpenPeriodicTable: () => void;
  onOpenTopicReference: (topicId: TopicId) => void;
  onOpenTrendsExplorer: () => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({
  onStartQuiz,
  onOpenPeriodicTable,
  onOpenTopicReference,
  onOpenTrendsExplorer
}) => {
  // Sınav kategorisi filtresi: 'all' | 'tyt_ayt' | 'tyt' | 'ayt'
  const [examCat, setExamCat] = useState<ExamCategory>('all');

  // Seçili konu ID'si
  const [selectedTopicId, setSelectedTopicId] = useState<TopicId>(() => {
    const saved = readStored(KEYS.tab);
    if (saved && TOPIC_MAP.has(saved as TopicId)) {
      return saved as TopicId;
    }
    return 'element';
  });

  // Element özel aralık ayarı
  const [elementRange, setElementRange] = useState<ElementRangeKey>('1-36');

  // Yön seçimi (bileşik, kökler veya organik için)
  const [direction, setDirection] = useState<string>('ad-formul');

  // Bileşiklerde tür sorulsun mu?
  const [includeCompoundType, setIncludeCompoundType] = useState<boolean>(() => {
    const saved = readStored(KEYS.compoundIncludeType);
    return saved !== null ? saved === 'true' : true;
  });

  // Ortak ayarlar
  const [questionCount, setQuestionCount] = useState<number | 'inf'>(20);
  const [answerMode, setAnswerMode] = useState<AnswerMode>(() => {
    const saved = readStored(KEYS.answerMode);
    if (saved === 'type' || saved === 'choice') return saved;
    try {
      return window.matchMedia('(pointer: coarse)').matches ? 'choice' : 'type';
    } catch {
      return 'choice';
    }
  });
  const [retryWrong, setRetryWrong] = useState<boolean>(true);
  const [showTableSetting, setShowTableSetting] = useState<boolean>(() => {
    const saved = readStored(KEYS.showTable);
    return saved !== null ? saved === 'true' : true;
  });

  // Seçili konuya ait zayıf noktalar
  const [weakItems, setWeakItems] = useState<(string | number)[]>([]);

  const selectedTopic = TOPIC_MAP.get(selectedTopicId) || ALL_TOPICS[0];

  useEffect(() => {
    const weak = getWeakTopicIds(selectedTopicId);
    setWeakItems(weak);
    if (selectedTopic.directions && selectedTopic.directions.length > 0) {
      setDirection(selectedTopic.directions[0].id);
    }
  }, [selectedTopicId, selectedTopic]);

  const handleTopicSelect = (id: TopicId) => {
    setSelectedTopicId(id);
    writeStored(KEYS.tab, id);
  };

  const handleModeChange = (mode: AnswerMode) => {
    setAnswerMode(mode);
    writeStored(KEYS.answerMode, mode);
  };

  const handleIncludeCompoundTypeChange = (include: boolean) => {
    setIncludeCompoundType(include);
    writeStored(KEYS.compoundIncludeType, String(include));
  };

  const handleStart = () => {
    const totalCount = questionCount === 'inf' ? Infinity : questionCount;
    onStartQuiz({
      quiz: selectedTopicId,
      kind: 'range',
      range: selectedTopicId === 'element' ? elementRange : undefined,
      total: totalCount,
      retry: retryWrong,
      mode: answerMode,
      dir: direction,
      includeCompoundType
    });
  };

  const handleStartWeak = () => {
    if (weakItems.length === 0) return;
    const totalCount = questionCount === 'inf' ? Infinity : questionCount;
    onStartQuiz({
      quiz: selectedTopicId,
      kind: 'weak',
      zs: weakItems,
      total: Math.min(totalCount, weakItems.length),
      retry: retryWrong,
      mode: answerMode,
      dir: direction,
      includeCompoundType
    });
  };

  // Filtrelenen konular
  const filteredTopics = ALL_TOPICS.filter(t => {
    if (examCat === 'all') return true;
    return t.examCategory === examCat;
  });

  return (
    <section id="view-setup">
      {/* Hero Başlık */}
      <header className="hero">
        <svg className="atom" viewBox="0 0 64 64" aria-hidden="true">
          <g fill="none" stroke="currentColor" strokeWidth="2.5">
            <ellipse cx="32" cy="32" rx="28" ry="10" />
            <ellipse cx="32" cy="32" rx="28" ry="10" transform="rotate(60 32 32)" />
            <ellipse cx="32" cy="32" rx="28" ry="10" transform="rotate(-60 32 32)" />
          </g>
          <circle cx="32" cy="32" r="5" fill="#e5484d" />
        </svg>
        <h1>TYT & AYT Kimya Ezber Testi</h1>
        <p>
          YKS Kimya müfredatındaki kritik formülleri, kökleri, bileşikleri ve kavramları
          oyun mantığıyla refleks haline getirin.
        </p>
      </header>

      {/* Periyodik Sistem Değişim Pusulası Hızlı Erişim Bandı */}
      <div
        style={{
          margin: '16px 0',
          padding: '12px 16px',
          backgroundColor: 'var(--card-2)',
          border: '1px solid var(--border-2)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '26px' }}>🧭</span>
          <div>
            <strong style={{ fontSize: '15px', color: '#ffd43b' }}>
              Periyodik Tablo Değişim Pusulası
            </strong>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--muted)' }}>
              Soldan sağa ve yukarıdan aşağıya ne artar, ne azalır, bilimsel nedeni ve ÖSYM istisnaları!
            </p>
          </div>
        </div>
        <button
          type="button"
          className="btn secondary small"
          onClick={onOpenTrendsExplorer}
          style={{ borderColor: '#ffd43b66', color: '#ffd43b' }}
        >
          🧭 Pusulayı Aç ➡️
        </button>
      </div>

      {/* 1. Sınav Kategorisi Sekmeleri */}
      <div className="exam-tabs" role="tablist" aria-label="Sınav kategorisi">
        <button
          type="button"
          className={`exam-tab ${examCat === 'all' ? 'active' : ''}`}
          onClick={() => setExamCat('all')}
        >
          Tüm Konular ({ALL_TOPICS.length})
        </button>
        <button
          type="button"
          className={`exam-tab ${examCat === 'tyt_ayt' ? 'active' : ''}`}
          style={examCat === 'tyt_ayt' ? { borderColor: '#e5484d', color: '#ff8787' } : {}}
          onClick={() => setExamCat('tyt_ayt')}
        >
          🔥 TYT + AYT Ortak ({ALL_TOPICS.filter(t => t.examCategory === 'tyt_ayt').length})
        </button>
        <button
          type="button"
          className={`exam-tab ${examCat === 'tyt' ? 'active' : ''}`}
          style={examCat === 'tyt' ? { borderColor: '#30a46c', color: '#69db7c' } : {}}
          onClick={() => setExamCat('tyt')}
        >
          🧪 TYT Kimya ({ALL_TOPICS.filter(t => t.examCategory === 'tyt').length})
        </button>
        <button
          type="button"
          className={`exam-tab ${examCat === 'ayt' ? 'active' : ''}`}
          style={examCat === 'ayt' ? { borderColor: '#7950f2', color: '#b197fc' } : {}}
          onClick={() => setExamCat('ayt')}
        >
          🧬 AYT Kimya ({ALL_TOPICS.filter(t => t.examCategory === 'ayt').length})
        </button>
      </div>

      {/* 2. Konu Seçim Kartları */}
      <div className="topic-grid">
        {filteredTopics.map(t => {
          const isSelected = t.id === selectedTopicId;
          return (
            <div
              key={t.id}
              className={`topic-card ${isSelected ? 'selected' : ''}`}
              onClick={() => handleTopicSelect(t.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter') handleTopicSelect(t.id); }}
            >
              <div>
                <div className="topic-head">
                  <div className="topic-title">
                    <span>{t.icon}</span>
                    <span>{t.title}</span>
                  </div>
                  <span
                    className="topic-badge"
                    style={{
                      backgroundColor: `${t.badgeColor}18`,
                      borderColor: `${t.badgeColor}55`,
                      color: t.badgeColor
                    }}
                  >
                    {t.tag}
                  </span>
                </div>
                <p className="topic-desc">{t.description}</p>
              </div>

              <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="hint" style={{ fontSize: '11px' }}>
                  {isSelected ? '✓ Seçili' : 'Seçmek için tıkla'}
                </span>
                <button
                  type="button"
                  className="btn ghost small"
                  style={{ padding: '4px 8px', fontSize: '11px' }}
                  onClick={e => {
                    e.stopPropagation();
                    onOpenTopicReference(t.id);
                  }}
                >
                  📖 İncele
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Seçili Konunun Detay Kurulum Kartı */}
      <div className="card setup" style={{ marginTop: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '22px' }}>{selectedTopic.icon}</span>
            <strong style={{ fontSize: '18px' }}>{selectedTopic.title} Ayarları</strong>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn ghost small"
              onClick={onOpenTrendsExplorer}
            >
              🧭 Değişim Pusulası
            </button>
            <button
              type="button"
              className="btn secondary small"
              onClick={() => onOpenTopicReference(selectedTopic.id)}
            >
              📖 Konu Listesini İncele
            </button>
          </div>
        </div>

        {/* Element Aralık Seçimi */}
        {selectedTopicId === 'element' && (
          <div className="field">
            <div className="field-label">Aralık</div>
            <SegmentGroup<ElementRangeKey>
              options={[
                { value: '1-18', label: '1–18', keyBadge: 'Q' },
                { value: '19-36', label: '19–36', keyBadge: 'W' },
                { value: '1-36', label: '1–36 (Tümü)', keyBadge: 'E' }
              ]}
              value={elementRange}
              onChange={setElementRange}
            />
          </div>
        )}

        {/* Çoklu Yön Seçimi Varsa */}
        {selectedTopic.directions && selectedTopic.directions.length > 0 && (
          <div className="field">
            <div className="field-label">Soru Yönü</div>
            <SegmentGroup<string>
              columns={selectedTopic.directions.length === 2 ? 2 : 3}
              options={selectedTopic.directions.map(d => ({
                value: d.id,
                label: d.label,
                keyBadge: d.keyBadge
              }))}
              value={direction}
              onChange={setDirection}
            />
          </div>
        )}

        {/* Bileşik Tür Seçimi (Türlü / Türsüz Mod) */}
        {selectedTopic.hasTypeToggle && (
          <div className="field">
            <div className="field-label">
              <span>{selectedTopic.typeToggleLabel || 'Kategori / Tür Seçimi'}</span>
              <span className="hint" style={{ fontWeight: 'normal' }}>
                {includeCompoundType ? 'Tür zorunluluğu var' : 'Türsüz - Yalnızca temel bilgi'}
              </span>
            </div>
            <SegmentGroup<string>
              columns={2}
              options={[
                { value: 'false', label: 'Türsüz (Yalnızca Formül & Ad)', keyBadge: 'T' },
                { value: 'true', label: 'Türleri Sor (Asit/Baz/Tuz/Oksit)', keyBadge: 'Y' }
              ]}
              value={String(includeCompoundType)}
              onChange={v => handleIncludeCompoundTypeChange(v === 'true')}
            />
          </div>
        )}

        {/* Soru Sayısı */}
        <div className="field">
          <div className="field-label">Soru sayısı</div>
          <SegmentGroup<number | 'inf'>
            columns={4}
            options={[
              { value: 10, label: '10', keyBadge: 'A' },
              { value: 20, label: '20', keyBadge: 'S' },
              { value: selectedTopic.defaultCount, label: String(selectedTopic.defaultCount), keyBadge: 'D' },
              { value: 'inf', label: 'Sonsuz', keyBadge: 'F' }
            ]}
            value={questionCount}
            onChange={setQuestionCount}
          />
        </div>

        {/* Cevap Şekli: Yazarak / Seçenekli */}
        <div className="field">
          <div className="field-label">
            <span>Cevap şekli</span>
            <KeyBadge label="X" />
          </div>
          <SegmentGroup<AnswerMode>
            columns={2}
            options={[
              { value: 'type', label: 'Yazarak' },
              { value: 'choice', label: 'Seçenekli (Çoktan Seçmeli)' }
            ]}
            value={answerMode}
            onChange={handleModeChange}
          />
        </div>

        {/* Yanlışları Tekrar Sor Onayı */}
        <div className="field">
          <label className="check">
            <input
              type="checkbox"
              checked={retryWrong}
              onChange={e => setRetryWrong(e.target.checked)}
            />
            <span>
              Yanlışları test içinde tekrar sor <KeyBadge label="R" />
            </span>
          </label>
        </div>

        {/* Periyodik Tablo (Element Konusunda) */}
        {selectedTopic.hasPeriodicTable && (
          <div style={{ display: 'grid', gap: '8px' }}>
            <label className="check">
              <input
                type="checkbox"
                checked={showTableSetting}
                onChange={e => {
                  setShowTableSetting(e.target.checked);
                  writeStored(KEYS.showTable, String(e.target.checked));
                }}
              />
              <span>
                Test esnasında periyodik tabloyu göster <KeyBadge label="0" />
              </span>
            </label>
            <button
              type="button"
              className="btn secondary small"
              onClick={onOpenPeriodicTable}
            >
              ⚛️ Periyodik Tabloyu İncele
            </button>
          </div>
        )}

        {/* Başlat ve Zayıf Noktalar */}
        <div className="setup-actions">
          <button type="button" className="btn primary block" onClick={handleStart}>
            Testi Başlat <KeyBadge label="↵" />
          </button>
          <button
            type="button"
            className="btn secondary block"
            disabled={weakItems.length === 0}
            onClick={handleStartWeak}
          >
            Zayıf noktalarım ({weakItems.length}) <KeyBadge label="Z" />
          </button>
          <p className="hint center">
            {weakItems.length > 0
              ? `${selectedTopic.title} konusunda hata yaptığın ${weakItems.length} madde zayıf noktalar listene alındı.`
              : 'Bu konuda henüz hata kaydın yok. Test çözdükten sonra zayıf noktaların burada toplanır.'}
          </p>
        </div>
      </div>
    </section>
  );
};
