import React from 'react';
import { TopicDefinition, TopicId } from '../../types/topics';
import { AnswerMode, ElementRangeKey } from '../../types/quiz';
import { AnimationSceneId } from '../Animations/ChemistryAnimationsModal';
import { SegmentGroup } from './SegmentGroup';
import { KeyBadge } from '../Common/KeyBadge';
import {
  ALL_COMPOUND_NAMING_CATEGORIES,
  COMPOUND_NAMING_CATEGORY_COUNTS,
  COMPOUND_NAMING_CATEGORY_META,
  COMPOUND_NAMING_PRESETS,
  CompoundNamingCategory,
  getCompoundNamingCountChoices,
  getFilteredCompoundNamingItems,
  matchNamingPreset
} from '../../data/compoundNaming';

interface SetupInspectorProps {
  selectedTopic: TopicDefinition;
  elementRange: ElementRangeKey;
  onElementRangeChange: (val: ElementRangeKey) => void;
  direction: string;
  onDirectionChange: (val: string) => void;
  includeCompoundType: boolean;
  onIncludeCompoundTypeChange: (val: boolean) => void;
  namingCategories: CompoundNamingCategory[];
  onNamingCategoriesChange: (val: CompoundNamingCategory[]) => void;
  questionCount: number | 'inf';
  onQuestionCountChange: (val: number | 'inf') => void;
  answerMode: AnswerMode;
  onAnswerModeChange: (val: AnswerMode) => void;
  retryWrong: boolean;
  onRetryWrongChange: (val: boolean) => void;
  showTableSetting: boolean;
  onShowTableSettingChange: (val: boolean) => void;
  weakCount: number;
  onStart: () => void;
  onStartWeak: () => void;
  onOpenPeriodicTable: () => void;
  onOpenTopicReference: (topicId: TopicId) => void;
  onOpenTrendsExplorer: () => void;
  onOpenMnemonics: (initialCategory?: string) => void;
  onOpenCompoundBuilder: () => void;
  onOpenChemistryLab: (tab?: 'equilibrium' | 'electrochemistry') => void;
  onOpenAnimations: (scene?: AnimationSceneId) => void;
}

const CONTEXTUAL_ANIMATION_BY_TOPIC: Partial<Record<TopicId, AnimationSceneId>> = {
  electrochemistry_organic: 'galvanic_cell',
  kinetics_equilibrium: 'equilibrium_collision',
  gases_solutions: 'gas_laws',
  interactions: 'hydration_polarity',
  quantum_orbitals: 'bohr_orbital',
  compound: 'acid_base_titration'
};

const CONTEXTUAL_CALLOUT_TEXT: Partial<Record<TopicId, string>> = {
  compound_naming: 'İyon çaprazlama, EBOB sadeleştirme ve Latince önekleri deneyerek öğren:',
  kinetics_equilibrium: 'Le Chatelier etki–tepki grafiklerini ve çarpışma animasyonunu canlı incele:',
  electrochemistry_organic: 'Galvanik pilde anot/katot, elektron akışı ve Nernst etkilerini canlı izle:',
  periodic_trends: 'Periyodik özelliklerin grup ve periyot boyunca değişimini canlı incele:',
  gases_solutions: 'Gaz yasaları (P-V-T) ve Graham difüzyon yarışını animasyonla gözlemle:',
  interactions: 'NaCl hidratasyonu, su dipolleri ve hidrojen bağı animasyonunu canlı izle:',
  quantum_orbitals: 'Bohr enerji katmanlarını, foton emisyonunu ve s/p/d orbitallerini incele:',
  compound: 'Asit–baz titrasyonu, eşdeğerlik noktası ve pH renk değişimini canlı izle:'
};

/** Sağ yapışkan denetçi paneli: seçili konunun tüm ayarları ve anlık başlatma CTA'ları */
export const SetupInspector: React.FC<SetupInspectorProps> = ({
  selectedTopic,
  elementRange,
  onElementRangeChange,
  direction,
  onDirectionChange,
  includeCompoundType,
  onIncludeCompoundTypeChange,
  namingCategories,
  onNamingCategoriesChange,
  questionCount,
  onQuestionCountChange,
  answerMode,
  onAnswerModeChange,
  retryWrong,
  onRetryWrongChange,
  showTableSetting,
  onShowTableSettingChange,
  weakCount,
  onStart,
  onStartWeak,
  onOpenPeriodicTable,
  onOpenTopicReference,
  onOpenTrendsExplorer,
  onOpenMnemonics,
  onOpenCompoundBuilder,
  onOpenChemistryLab,
  onOpenAnimations
}) => {
  const selectedTopicId = selectedTopic.id;
  const contextualScene = CONTEXTUAL_ANIMATION_BY_TOPIC[selectedTopicId];
  const contextualText = CONTEXTUAL_CALLOUT_TEXT[selectedTopicId];

  const hasContextualLab = Boolean(contextualText);

  const namingPoolCount =
    selectedTopicId === 'compound_naming'
      ? getFilteredCompoundNamingItems(namingCategories).length
      : 0;
  const activeNamingPreset =
    selectedTopicId === 'compound_naming' ? matchNamingPreset(namingCategories) : null;

  const handleToggleNamingCategory = (cat: CompoundNamingCategory) => {
    const exists = namingCategories.includes(cat);
    if (exists) {
      if (namingCategories.length <= 1) return; // En az 1 grup aktif kalmalı
      onNamingCategoriesChange(namingCategories.filter(c => c !== cat));
    } else {
      onNamingCategoriesChange([...namingCategories, cat]);
    }
  };

  const countOptions =
    selectedTopicId === 'compound_naming'
      ? (() => {
          const [c1, c2, c3] = getCompoundNamingCountChoices(namingPoolCount);
          return [
            { value: c1 as number | 'inf', label: String(c1), keyBadge: 'A' },
            { value: c2 as number | 'inf', label: String(c2), keyBadge: 'S' },
            { value: c3 as number | 'inf', label: `Tümü (${c3})`, keyBadge: 'D' },
            { value: 'inf' as number | 'inf', label: 'Sonsuz', keyBadge: 'F' }
          ];
        })()
      : [
          { value: 10 as number | 'inf', label: '10', keyBadge: 'A' },
          { value: 20 as number | 'inf', label: '20', keyBadge: 'S' },
          {
            value: selectedTopic.defaultCount as number | 'inf',
            label: String(selectedTopic.defaultCount),
            keyBadge: 'D'
          },
          { value: 'inf' as number | 'inf', label: 'Sonsuz', keyBadge: 'F' }
        ];

  return (
    <aside className="card setup-inspector" aria-label="Seçili konu ayarları">
      {/* Başlık & Hızlı İnceleme */}
      <div className="inspector-header">
        <div className="inspector-title-row">
          <div className="inspector-icon-box" aria-hidden="true">
            {selectedTopic.icon}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h2 className="inspector-title">{selectedTopic.title} Ayarları</h2>
            <span
              className="topic-badge"
              style={{
                display: 'inline-block',
                marginTop: '4px',
                backgroundColor: `${selectedTopic.badgeColor}1f`,
                borderColor: `${selectedTopic.badgeColor}66`,
                color: selectedTopic.badgeColor
              }}
            >
              {selectedTopic.tag}
            </span>
          </div>
        </div>

        <div className="inspector-quick-links">
          <button
            type="button"
            className="btn secondary small"
            onClick={() => onOpenTopicReference(selectedTopic.id)}
          >
            📖 Konu Listesini İncele
          </button>
          <button
            type="button"
            className="btn ghost small"
            onClick={onOpenTrendsExplorer}
          >
            🧭 Değişim Pusulası
          </button>
        </div>
      </div>

      {/* Bağlamsal Stüdyo / Laboratuvar / Animasyon Kısayolu */}
      {hasContextualLab && (
        <div className="contextual-lab-callout">
          <div className="contextual-lab-text">{contextualText}</div>
          <div className="contextual-lab-actions">
            {selectedTopicId === 'compound_naming' && (
              <button
                type="button"
                className="btn secondary small"
                onClick={onOpenCompoundBuilder}
              >
                🧪 İyon Çaprazlama & Adlandırma Atölyesini Aç
              </button>
            )}
            {selectedTopicId === 'kinetics_equilibrium' && (
              <button
                type="button"
                className="btn secondary small"
                onClick={() => onOpenChemistryLab('equilibrium')}
              >
                ⚖️ Le Chatelier Denge Simülatörünü Aç
              </button>
            )}
            {selectedTopicId === 'electrochemistry_organic' && (
              <button
                type="button"
                className="btn secondary small"
                onClick={() => onOpenChemistryLab('electrochemistry')}
              >
                🔋 Galvanik Pil & Elektroliz Laboratuvarını Aç
              </button>
            )}
            {selectedTopicId === 'periodic_trends' && (
              <button
                type="button"
                className="btn secondary small"
                onClick={onOpenTrendsExplorer}
              >
                🧭 Periyodik Değişim Pusulasını Aç
              </button>
            )}
            {contextualScene && (
              <button
                type="button"
                className="btn secondary small"
                onClick={() => onOpenAnimations(contextualScene)}
              >
                🎬 Canlı Animasyonu İzle
              </button>
            )}
          </div>
        </div>
      )}

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
            onChange={onElementRangeChange}
          />
        </div>
      )}

      {/* Sistematik Bileşik Adlandırma Kapsam Seçimi */}
      {selectedTopicId === 'compound_naming' && (
        <div className="field naming-scope-field">
          <div className="field-label">
            <span>Çalışma Kapsamı (Bileşik Grubu)</span>
            <span className="naming-pool-badge">
              {namingPoolCount} bileşik ·{' '}
              {activeNamingPreset
                ? activeNamingPreset.id === 'all'
                  ? 'Karışık'
                  : activeNamingPreset.label.replace(/^[^ ]+ /, '')
                : `${namingCategories.length} grup`}
            </span>
          </div>

          <div
            className="naming-presets-grid"
            role="group"
            aria-label="Adlandırma hazır çalışma paketleri"
          >
            {COMPOUND_NAMING_PRESETS.map(preset => {
              const isPresetActive = activeNamingPreset?.id === preset.id;
              const presetCount = getFilteredCompoundNamingItems(preset.categories).length;
              return (
                <button
                  key={preset.id}
                  type="button"
                  className={`naming-preset-btn ${isPresetActive ? 'active' : ''}`}
                  aria-pressed={isPresetActive}
                  onClick={() => onNamingCategoriesChange(preset.categories)}
                >
                  <div className="naming-preset-top">
                    <span className="naming-preset-title">{preset.label}</span>
                    <span className="naming-preset-count">{presetCount}</span>
                  </div>
                  <span className="naming-preset-desc">{preset.shortDesc}</span>
                </button>
              );
            })}
          </div>

          <div className="naming-custom-label">
            Özel seçim (istediğin grupları aç/kapat):
          </div>
          <div
            className="naming-category-chips"
            role="group"
            aria-label="Adlandırma alt konu grupları"
          >
            {ALL_COMPOUND_NAMING_CATEGORIES.map(cat => {
              const meta = COMPOUND_NAMING_CATEGORY_META[cat];
              const count = COMPOUND_NAMING_CATEGORY_COUNTS[cat];
              const isChecked = namingCategories.includes(cat);
              const isOnlyOneLeft = isChecked && namingCategories.length === 1;
              return (
                <button
                  key={cat}
                  type="button"
                  className={`naming-cat-chip ${isChecked ? 'active' : ''}`}
                  aria-pressed={isChecked}
                  title={
                    isOnlyOneLeft
                      ? 'En az 1 bileşik grubu seçili olmalıdır'
                      : `${cat} (${count} bileşik)`
                  }
                  style={
                    isChecked
                      ? ({ '--cat-rgb': meta.rgb } as React.CSSProperties)
                      : undefined
                  }
                  onClick={() => handleToggleNamingCategory(cat)}
                >
                  <span aria-hidden="true">{isChecked ? '☑' : '☐'}</span>
                  <span aria-hidden="true">{meta.icon}</span>
                  <span>{meta.shortLabel}</span>
                  <span className="naming-cat-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Çoklu Yön Seçimi */}
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
            onChange={onDirectionChange}
          />
        </div>
      )}

      {/* Bileşik Tür Seçimi */}
      {selectedTopic.hasTypeToggle && (
        <div className="field">
          <div className="field-label">
            <span>{selectedTopic.typeToggleLabel || 'Kategori / Tür Seçimi'}</span>
            <button
              type="button"
              className="btn ghost small"
              onClick={() => onOpenMnemonics('compound_rules')}
            >
              💡 Asit/Baz/Tuz Nasıl Bulunur? (Püf Noktaları)
            </button>
          </div>
          <SegmentGroup<string>
            columns={2}
            options={[
              { value: 'false', label: 'Türsüz (Yalnızca Formül & Ad)', keyBadge: 'T' },
              { value: 'true', label: 'Türleri Sor (Asit/Baz/Tuz/Oksit)', keyBadge: 'Y' }
            ]}
            value={String(includeCompoundType)}
            onChange={v => onIncludeCompoundTypeChange(v === 'true')}
          />
        </div>
      )}

      {/* Soru Sayısı */}
      <div className="field">
        <div className="field-label">Soru sayısı</div>
        <SegmentGroup<number | 'inf'>
          columns={4}
          options={countOptions}
          value={questionCount}
          onChange={onQuestionCountChange}
        />
      </div>

      {/* Cevap Şekli */}
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
          onChange={onAnswerModeChange}
        />
      </div>

      {/* Tekrar & Periyodik Tablo Seçenekleri */}
      <div className="field">
        <label className="check-tile">
          <input
            type="checkbox"
            checked={retryWrong}
            onChange={e => onRetryWrongChange(e.target.checked)}
          />
          <span>
            Yanlışları test içinde tekrar sor <KeyBadge label="R" />
          </span>
        </label>

        {selectedTopic.hasPeriodicTable && (
          <>
            <label className="check-tile">
              <input
                type="checkbox"
                checked={showTableSetting}
                onChange={e => onShowTableSettingChange(e.target.checked)}
              />
              <span>
                Test esnasında periyodik tabloyu göster <KeyBadge label="0" />
              </span>
            </label>
            <button
              type="button"
              className="btn secondary small block"
              onClick={onOpenPeriodicTable}
            >
              ⚛️ Periyodik Tabloyu İncele
            </button>
          </>
        )}
      </div>

      {/* Başlat & Zayıf Noktalar */}
      <div className="setup-actions">
        <button type="button" className="btn primary block" onClick={onStart}>
          Testi Başlat <KeyBadge label="↵" />
        </button>
        <button
          type="button"
          className="btn secondary block"
          disabled={weakCount === 0}
          onClick={onStartWeak}
        >
          Zayıf noktalarım ({weakCount}) <KeyBadge label="Z" />
        </button>
        <p className="hint center" style={{ margin: '4px 0 0' }}>
          {weakCount > 0
            ? `${selectedTopic.title} konusunda hata yaptığın ${weakCount} madde listende.`
            : 'Bu konuda henüz hata kaydın yok.'}
        </p>
      </div>
    </aside>
  );
};
