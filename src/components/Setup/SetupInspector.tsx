import React from 'react';
import { TopicDefinition, TopicId } from '../../types/topics';
import { AnswerMode, ElementRangeKey } from '../../types/quiz';
import { AnimationSceneId } from '../Animations/ChemistryAnimationsModal';
import { SegmentGroup } from './SegmentGroup';
import { KeyBadge } from '../Common/KeyBadge';

interface SetupInspectorProps {
  selectedTopic: TopicDefinition;
  elementRange: ElementRangeKey;
  onElementRangeChange: (val: ElementRangeKey) => void;
  direction: string;
  onDirectionChange: (val: string) => void;
  includeCompoundType: boolean;
  onIncludeCompoundTypeChange: (val: boolean) => void;
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
          options={[
            { value: 10, label: '10', keyBadge: 'A' },
            { value: 20, label: '20', keyBadge: 'S' },
            { value: selectedTopic.defaultCount, label: String(selectedTopic.defaultCount), keyBadge: 'D' },
            { value: 'inf', label: 'Sonsuz', keyBadge: 'F' }
          ]}
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
