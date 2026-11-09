import React, { useState, useEffect } from 'react';
import { QuizTopic } from '../../types/chemistry';
import { AnswerMode, CompoundDirection, ElementRangeKey, QuizConfig } from '../../types/quiz';
import { SegmentGroup } from './SegmentGroup';
import { KeyBadge } from '../Common/KeyBadge';
import { readStored, writeStored, KEYS } from '../../utils/storage';
import { getWeakElementZs, getWeakCompoundZs } from '../../engine/statsEngine';
import { ELEMENT_BY_Z } from '../../data/elements';
import { COMPOUND_BY_Z } from '../../data/compounds';

interface SetupScreenProps {
  onStartQuiz: (cfg: QuizConfig) => void;
  onOpenPeriodicTable: () => void;
  onOpenCompoundReference: () => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({
  onStartQuiz,
  onOpenPeriodicTable,
  onOpenCompoundReference
}) => {
  // Tab seçimi (Element | Bileşik)
  const [tab, setTab] = useState<QuizTopic>(() => {
    const saved = readStored(KEYS.tab);
    return saved === 'compound' ? 'compound' : 'element';
  });

  // Element ayarları
  const [elementRange, setElementRange] = useState<ElementRangeKey>('1-36');
  const [elementCount, setElementCount] = useState<number | 'inf'>(36);

  // Bileşik ayarları
  const [compoundDir, setCompoundDir] = useState<CompoundDirection>(() => {
    const saved = readStored(KEYS.compoundDirection);
    return (saved === 'ad-formul' || saved === 'formul-ad' || saved === 'karisik')
      ? saved
      : 'ad-formul';
  });
  const [compoundCount, setCompoundCount] = useState<number | 'inf'>(18);

  // YENİ: Bileşiklerde tür sorulsun mu? (Varsayılan true, ama öğrenci türsüz seçebilir)
  const [includeCompoundType, setIncludeCompoundType] = useState<boolean>(() => {
    const saved = readStored(KEYS.compoundIncludeType);
    return saved !== null ? saved === 'true' : true;
  });

  // Ortak ayarlar
  const [answerMode, setAnswerMode] = useState<AnswerMode>(() => {
    const saved = readStored(KEYS.answerMode);
    if (saved === 'type' || saved === 'choice') return saved;
    try {
      return window.matchMedia('(pointer: coarse)').matches ? 'choice' : 'type';
    } catch {
      return 'type';
    }
  });
  const [retryWrong, setRetryWrong] = useState<boolean>(true);
  const [showTableSetting, setShowTableSetting] = useState<boolean>(() => {
    const saved = readStored(KEYS.showTable);
    return saved !== null ? saved === 'true' : true;
  });

  // Zayıf noktalar
  const [weakElements, setWeakElements] = useState<number[]>([]);
  const [weakCompounds, setWeakCompounds] = useState<number[]>([]);

  useEffect(() => {
    setWeakElements(getWeakElementZs());
    setWeakCompounds(getWeakCompoundZs());
  }, [tab]);

  const handleTabChange = (newTab: QuizTopic) => {
    setTab(newTab);
    writeStored(KEYS.tab, newTab);
  };

  const handleModeChange = (mode: AnswerMode) => {
    setAnswerMode(mode);
    writeStored(KEYS.answerMode, mode);
  };

  const handleCompoundDirChange = (dir: CompoundDirection) => {
    setCompoundDir(dir);
    writeStored(KEYS.compoundDirection, dir);
  };

  const handleIncludeCompoundTypeChange = (include: boolean) => {
    setIncludeCompoundType(include);
    writeStored(KEYS.compoundIncludeType, String(include));
  };

  const handleStart = () => {
    const isCompound = tab === 'compound';
    const totalCount = isCompound
      ? (compoundCount === 'inf' ? Infinity : compoundCount)
      : (elementCount === 'inf' ? Infinity : elementCount);

    onStartQuiz({
      quiz: tab,
      kind: 'range',
      range: isCompound ? undefined : elementRange,
      total: totalCount,
      retry: retryWrong,
      mode: answerMode,
      dir: isCompound ? compoundDir : undefined,
      includeCompoundType: isCompound ? includeCompoundType : true
    });
  };

  const handleStartWeak = () => {
    const isCompound = tab === 'compound';
    const list = isCompound ? weakCompounds : weakElements;
    if (list.length === 0) return;

    const totalCount = isCompound
      ? (compoundCount === 'inf' ? Infinity : compoundCount)
      : (elementCount === 'inf' ? Infinity : elementCount);

    onStartQuiz({
      quiz: tab,
      kind: 'weak',
      zs: list,
      total: Math.min(totalCount, list.length),
      retry: retryWrong,
      mode: answerMode,
      dir: isCompound ? compoundDir : undefined,
      includeCompoundType: isCompound ? includeCompoundType : true
    });
  };

  const isCompound = tab === 'compound';
  const weakCount = isCompound ? weakCompounds.length : weakElements.length;

  return (
    <section id="view-setup">
      <div className="tabs" role="tablist" aria-label="Test konusu">
        <button
          type="button"
          className="tab"
          role="tab"
          aria-selected={tab === 'element'}
          onClick={() => handleTabChange('element')}
        >
          Element <KeyBadge label="1" />
        </button>
        <button
          type="button"
          className="tab"
          role="tab"
          aria-selected={tab === 'compound'}
          onClick={() => handleTabChange('compound')}
        >
          Bileşik <KeyBadge label="2" />
        </button>
      </div>

      <header className="hero">
        <svg className="atom" viewBox="0 0 64 64" aria-hidden="true">
          <g fill="none" stroke="currentColor" strokeWidth="2.5">
            <ellipse cx="32" cy="32" rx="28" ry="10" />
            <ellipse cx="32" cy="32" rx="28" ry="10" transform="rotate(60 32 32)" />
            <ellipse cx="32" cy="32" rx="28" ry="10" transform="rotate(-60 32 32)" />
          </g>
          <circle cx="32" cy="32" r="5" fill="#e5484d" />
        </svg>
        <h1>{isCompound ? 'Bileşik Testi' : 'Element Testi'}</h1>
        <p>
          {isCompound
            ? 'Yaygın bileşiklerin formüllerini, adlarını ve türlerini test et.'
            : 'İlk 36 elementin sembolünü, Türkçe adını ve kategorisini test et.'}
        </p>
      </header>

      <div className="card setup">
        {/* Element Aralık Seçimi */}
        {!isCompound && (
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

        {/* Bileşik Soru Yönü */}
        {isCompound && (
          <div className="field">
            <div className="field-label">Soru yönü</div>
            <SegmentGroup<CompoundDirection>
              options={[
                { value: 'ad-formul', label: 'Ad → Formül', keyBadge: 'H' },
                { value: 'formul-ad', label: 'Formül → Ad', keyBadge: 'J' },
                { value: 'karisik', label: 'Karışık', keyBadge: 'K' }
              ]}
              value={compoundDir}
              onChange={handleCompoundDirChange}
            />
          </div>
        )}

        {/* YENİ: Bileşik Tür Seçimi (Türlü / Türsüz Mod) */}
        {isCompound && (
          <div className="field">
            <div className="field-label">
              <span>Bileşik Türü (Asit/Baz/Tuz/Oksit)</span>
              <span className="hint" style={{ fontWeight: 'normal' }}>
                {includeCompoundType ? 'Tür seçimi istenir' : 'Yalnızca ad ve formül'}
              </span>
            </div>
            <SegmentGroup<string>
              columns={2}
              options={[
                { value: 'false', label: 'Türsüz (Yalnızca Formül & Ad)', keyBadge: 'T' },
                { value: 'true', label: 'Türleri Sor (Asit/Baz/Tuz)', keyBadge: 'Y' }
              ]}
              value={String(includeCompoundType)}
              onChange={v => handleIncludeCompoundTypeChange(v === 'true')}
            />
          </div>
        )}

        {/* Soru Sayısı */}
        <div className="field">
          <div className="field-label">Soru sayısı</div>
          {!isCompound ? (
            <SegmentGroup<number | 'inf'>
              columns={4}
              options={[
                { value: 10, label: '10', keyBadge: 'A' },
                { value: 20, label: '20', keyBadge: 'S' },
                { value: 36, label: '36', keyBadge: 'D' },
                { value: 'inf', label: 'Sonsuz', keyBadge: 'F' }
              ]}
              value={elementCount}
              onChange={setElementCount}
            />
          ) : (
            <SegmentGroup<number | 'inf'>
              columns={4}
              options={[
                { value: 10, label: '10', keyBadge: 'A' },
                { value: 20, label: '20', keyBadge: 'S' },
                { value: 18, label: '18', keyBadge: 'D' },
                { value: 'inf', label: 'Sonsuz', keyBadge: 'F' }
              ]}
              value={compoundCount}
              onChange={setCompoundCount}
            />
          )}
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
              Yanlışları tekrar sor <KeyBadge label="R" />
            </span>
          </label>
          <p className="hint retry-hint">
            {isCompound
              ? 'Yanlış cevapladığın bileşik 3–5 soru sonra yeniden sorulur.'
              : 'Yanlış cevapladığın element 3–5 soru sonra yeniden sorulur.'}
          </p>
        </div>

        {/* Periyodik Tablo / Referans Görünüm Butonları */}
        {!isCompound ? (
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
        ) : (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              className="btn secondary small"
              style={{ flex: 1 }}
              onClick={onOpenCompoundReference}
            >
              📖 Bileşik Listesini İncele
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
            disabled={weakCount === 0}
            onClick={handleStartWeak}
          >
            Zayıf noktalarım ({weakCount}) <KeyBadge label="Z" />
          </button>
          <p className="hint center">
            {weakCount > 0
              ? `Hata geçmişine göre en çok yanlış yaptıkların: ${
                  isCompound
                    ? weakCompounds.map(z => COMPOUND_BY_Z[z]?.disp).join(', ')
                    : weakElements.map(z => ELEMENT_BY_Z[z]?.s).join(', ')
                }`
              : 'Henüz hata kaydın yok. Birkaç test çözdükten sonra burada görünür.'}
          </p>
        </div>
      </div>
    </section>
  );
};
