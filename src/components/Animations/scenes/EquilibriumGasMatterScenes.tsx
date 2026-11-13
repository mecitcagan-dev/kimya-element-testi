import React, { useEffect, useMemo, useRef, useState } from 'react';

/* ============================================================================
 * Ortak Yardımcı Tipler & Küçük UI Parçaları
 * ========================================================================== */

interface SceneProps {
  onPracticeTopic?: () => void;
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  color: 'var(--text)',
};

const headerRowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 10,
};

const cardBoxStyle: React.CSSProperties = {
  background: 'var(--card-2)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-sm, 10px)',
  padding: '12px 14px',
};

const svgFrameStyle: React.CSSProperties = {
  background: 'var(--card)',
  border: '1px solid var(--border-2)',
  borderRadius: 'var(--radius, 14px)',
  padding: 10,
  overflow: 'hidden',
};

const controlsWrapStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 8,
};

const trapBoxStyle: React.CSSProperties = {
  background: 'var(--warn-soft, rgba(245, 165, 36, 0.14))',
  border: '1px solid var(--warn)',
  borderRadius: 'var(--radius-sm, 10px)',
  padding: '10px 14px',
  fontSize: 13,
  lineHeight: 1.5,
  color: 'var(--text)',
};

const footerRowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 10,
};

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * clamp(t, 0, 1);
}

function pillStyle(tone: 'accent' | 'ok' | 'warn' | 'info' | 'neutral'): React.CSSProperties {
  const map: Record<typeof tone, { bg: string; border: string; color: string }> = {
    accent: {
      bg: 'var(--accent-soft, rgba(229, 72, 77, 0.14))',
      border: 'var(--accent)',
      color: 'var(--accent)',
    },
    ok: {
      bg: 'var(--ok-soft, rgba(48, 181, 117, 0.15))',
      border: 'var(--ok)',
      color: 'var(--ok)',
    },
    warn: {
      bg: 'var(--warn-soft, rgba(245, 165, 36, 0.14))',
      border: 'var(--warn)',
      color: 'var(--warn)',
    },
    info: {
      bg: 'var(--info-soft, rgba(77, 171, 247, 0.14))',
      border: 'var(--info)',
      color: 'var(--info)',
    },
    neutral: {
      bg: 'var(--card-2)',
      border: 'var(--border-2)',
      color: 'var(--muted)',
    },
  };
  const palette = map[tone];
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '4px 10px',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    background: palette.bg,
    border: `1px solid ${palette.border}`,
    color: palette.color,
    whiteSpace: 'nowrap',
  };
}

/* ============================================================================
 * 1. EquilibriumCollisionScene: Kimyasal Denge, Çarpışma Teorisi & Le Chatelier
 * ========================================================================== */

type EqDisturbanceId = 'equilibrium' | 'temp_up' | 'vol_down' | 'add_n2' | 'catalyst';
type MoleculeKind = 'N2' | 'H2' | 'NH3';

interface EqMolecule {
  id: number;
  kind: MoleculeKind;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  vAngle: number;
}

interface EqDisturbanceConfig {
  id: EqDisturbanceId;
  label: string;
  targetCounts: { N2: number; H2: number; NH3: number };
  speedMult: number;
  ceilingY: number;
  forwardInitial: number;
  reverseInitial: number;
  forwardFinal: number;
  reverseFinal: number;
  kcLabel: string;
  kcTone: 'ok' | 'warn' | 'info' | 'accent';
  shiftLabel: string;
  shiftTone: 'ok' | 'warn' | 'info' | 'neutral';
  explanation: string;
  osymTrap: string;
}

const EQ_CONFIGS: Record<EqDisturbanceId, EqDisturbanceConfig> = {
  equilibrium: {
    id: 'equilibrium',
    label: 'Denge Hali',
    targetCounts: { N2: 4, H2: 9, NH3: 6 },
    speedMult: 1.0,
    ceilingY: 46,
    forwardInitial: 55,
    reverseInitial: 55,
    forwardFinal: 55,
    reverseFinal: 55,
    kcLabel: 'Kc = Sabit',
    kcTone: 'ok',
    shiftLabel: 'Dinamik Denge (rᵢ = r₉)',
    shiftTone: 'ok',
    explanation:
      'Kapalı ve sabit sıcaklıktaki sistemde ileri tepkime hızı (rᵢ) ile geri tepkime hızı (r₉) birbirine eşittir. N₂, H₂ ve NH₃ derişimleri sabit kalır ancak tepkime mikroskobik düzeyde durmadan devam eder.',
    osymTrap:
      'Denge anında tepkime DURMAZ! İleri ve geri hızlar eşitlendiği için gözlenebilir değişim durur; ayrıca derişimler eşit olmak zorunda değildir, sabit kalmaları yeterlidir.',
  },
  temp_up: {
    id: 'temp_up',
    label: 'Sıcaklığı Artır (+Isı)',
    targetCounts: { N2: 6, H2: 12, NH3: 3 },
    speedMult: 1.82,
    ceilingY: 46,
    forwardInitial: 68,
    reverseInitial: 94,
    forwardFinal: 78,
    reverseFinal: 78,
    kcLabel: 'Kc ↓ Azalır',
    kcTone: 'warn',
    shiftLabel: '⬅️ Girenler Lehine (Endotermik Yön)',
    shiftTone: 'warn',
    explanation:
      'Tepkime ekzotermik (+Isı ürünlerde) olduğu için sıcaklık artışı hem rᵢ hem r₉ hızını artırır; ancak endotermik olan geri yön daha çok hızlanır (r₉ > rᵢ). NH₃ ayrışır, N₂ ve H₂ artar; yeni dengede Kc küçülür.',
    osymTrap:
      'Sıcaklık artırıldığında ekzotermik tepkime bile olsa ileri tepkime hızı (rᵢ) AZALMAZ! Her iki yöndeki hız da artar, sadece geri hız (r₉) daha fazla artar.',
  },
  vol_down: {
    id: 'vol_down',
    label: 'Hacmi Küçült (P↑)',
    targetCounts: { N2: 2, H2: 5, NH3: 8 },
    speedMult: 1.24,
    ceilingY: 122,
    forwardInitial: 92,
    reverseInitial: 72,
    forwardFinal: 80,
    reverseFinal: 80,
    kcLabel: 'Kc = Sabit (T sabit)',
    kcTone: 'ok',
    shiftLabel: '➡️ Ürünler Lehine (4 mol → 2 mol)',
    shiftTone: 'info',
    explanation:
      'Piston aşağı inip hacim azaldığında tüm gazların derişimi ve basıncı artar. Sistem basıncı azaltmak için gaz mol sayısının az olduğu tarafa (4 mol girenden → 2 mol ürüne) kayar; NH₃ artar, Kc değişmez.',
    osymTrap:
      'Hacim küçüldüğünde tüm gazların derişimleri ilk anda artar ve denge ürünler lehine kaysa bile N₂ ve H₂ derişimleri başlangıçtakinden daha YÜKSEK seviyede dengelenir; Kc yalnızca sıcaklıkla değişir!',
  },
  add_n2: {
    id: 'add_n2',
    label: 'N₂ Ekle',
    targetCounts: { N2: 7, H2: 6, NH3: 8 },
    speedMult: 1.12,
    ceilingY: 46,
    forwardInitial: 90,
    reverseInitial: 55,
    forwardFinal: 72,
    reverseFinal: 72,
    kcLabel: 'Kc = Sabit (T sabit)',
    kcTone: 'ok',
    shiftLabel: '➡️ Ürünler Lehine ([N₂]↑ → [NH₃]↑)',
    shiftTone: 'info',
    explanation:
      'Kaba N₂(g) eklendiğinde etkin çarpışma sayısı artar ve ileri hız aniden yükselir (rᵢ > r₉). Eklenen N₂’nin bir kısmı H₂ ile birleşip NH₃ oluşturur. Yeni dengede [N₂] ve [NH₃] başlangıçtan yüksek, [H₂] ise düşüktür.',
    osymTrap:
      'Eklenen N₂’nin TAMAMI harcanmaz! Le Chatelier ilkesine göre etki tamamen sıfırlanamaz; [N₂] ilk eklenen pik değerden düşer ama başlangıç derişiminin üstünde kalır.',
  },
  catalyst: {
    id: 'catalyst',
    label: 'Katalizör Ekle',
    targetCounts: { N2: 4, H2: 9, NH3: 6 },
    speedMult: 1.45,
    ceilingY: 46,
    forwardInitial: 88,
    reverseInitial: 88,
    forwardFinal: 88,
    reverseFinal: 88,
    kcLabel: 'Kc = Sabit',
    kcTone: 'ok',
    shiftLabel: 'Denge Bozulmaz • Süre Kısalır',
    shiftTone: 'ok',
    explanation:
      'Pozitif katalizör aktifleşme enerjisini (Eₐ → Eₐ′) düşüren alternatif yeşil bir yol açar. İleri ve geri hız sabitlerini (kᵢ ve k₉) AYNI oranda artırdığı için rᵢ = r₉ eşitliği bozulmaz; denge verimi değişmez.',
    osymTrap:
      'Katalizör denge bileşimini, ürün miktarını, ΔH’ı veya Kc’yi KESİNLİKLE değiştirmez! Sadece tepkimenin dengeye ulaşma süresini kısaltır.',
  },
};

const DISTURBANCE_ORDER: EqDisturbanceId[] = [
  'equilibrium',
  'temp_up',
  'vol_down',
  'add_n2',
  'catalyst',
];

const VESSEL_LEFT = 28;
const VESSEL_RIGHT = 382;
const VESSEL_BOTTOM = 252;

function createMolecule(id: number, kind: MoleculeKind, ceilingY: number): EqMolecule {
  const angle = ((id * 137.5) % 360) * (Math.PI / 180);
  const speed = kind === 'H2' ? 92 : kind === 'N2' ? 58 : 66;
  return {
    id,
    kind,
    x: VESSEL_LEFT + 26 + ((id * 53) % (VESSEL_RIGHT - VESSEL_LEFT - 52)),
    y: ceilingY + 24 + ((id * 37) % Math.max(40, VESSEL_BOTTOM - ceilingY - 48)),
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    angle: (id * 45) % 360,
    vAngle: (id % 2 === 0 ? 1 : -1) * (40 + (id % 5) * 14),
  };
}

function buildInitialMolecules(counts: { N2: number; H2: number; NH3: number }, ceilingY: number): EqMolecule[] {
  const list: EqMolecule[] = [];
  let nextId = 1;
  for (let i = 0; i < counts.N2; i++) list.push(createMolecule(nextId++, 'N2', ceilingY));
  for (let i = 0; i < counts.H2; i++) list.push(createMolecule(nextId++, 'H2', ceilingY));
  for (let i = 0; i < counts.NH3; i++) list.push(createMolecule(nextId++, 'NH3', ceilingY));
  return list;
}

function reconcileMolecules(
  current: EqMolecule[],
  target: { N2: number; H2: number; NH3: number },
  ceilingY: number,
  nextIdRef: React.MutableRefObject<number>,
  spawnFromTopForN2: boolean
): EqMolecule[] {
  const byKind: Record<MoleculeKind, EqMolecule[]> = {
    N2: current.filter((m) => m.kind === 'N2'),
    H2: current.filter((m) => m.kind === 'H2'),
    NH3: current.filter((m) => m.kind === 'NH3'),
  };

  (['N2', 'H2', 'NH3'] as const).forEach((kind) => {
    const want = target[kind];
    while (byKind[kind].length > want) {
      byKind[kind].pop();
    }
    while (byKind[kind].length < want) {
      const m = createMolecule(nextIdRef.current++, kind, ceilingY);
      if (spawnFromTopForN2 && kind === 'N2') {
        m.x = 205 + ((m.id % 3) - 1) * 12;
        m.y = ceilingY + 14;
        m.vy = Math.abs(m.vy) + 35;
      }
      byKind[kind].push(m);
    }
  });

  return [...byKind.N2, ...byKind.H2, ...byKind.NH3];
}

export const EquilibriumCollisionScene: React.FC<SceneProps> = ({ onPracticeTopic }) => {
  const [disturbance, setDisturbance] = useState<EqDisturbanceId>('equilibrium');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [shiftElapsed, setShiftElapsed] = useState<number>(1);
  const [ceilingY, setCeilingY] = useState<number>(EQ_CONFIGS.equilibrium.ceilingY);
  const nextIdRef = useRef<number>(100);
  const moleculesRef = useRef<EqMolecule[]>(
    buildInitialMolecules(EQ_CONFIGS.equilibrium.targetCounts, EQ_CONFIGS.equilibrium.ceilingY)
  );
  const [molecules, setMolecules] = useState<EqMolecule[]>(moleculesRef.current);
  const ceilingRef = useRef<number>(EQ_CONFIGS.equilibrium.ceilingY);
  const shiftStartRef = useRef<number>(0);

  const cfg = EQ_CONFIGS[disturbance];

  const applyDisturbance = (nextId: EqDisturbanceId) => {
    const nextCfg = EQ_CONFIGS[nextId];
    setDisturbance(nextId);
    setShiftElapsed(0);
    shiftStartRef.current = performance.now();

    if (nextId === 'add_n2') {
      // İlk anda N2 fazlasıyla enjekte edilir, ardından tepkimeyle dengeye kayar
      const spikeCounts = { N2: 9, H2: 9, NH3: 6 };
      moleculesRef.current = reconcileMolecules(
        moleculesRef.current,
        spikeCounts,
        ceilingRef.current,
        nextIdRef,
        true
      );
      setMolecules([...moleculesRef.current]);
    } else if (nextId === 'equilibrium') {
      moleculesRef.current = reconcileMolecules(
        moleculesRef.current,
        nextCfg.targetCounts,
        nextCfg.ceilingY,
        nextIdRef,
        false
      );
      setMolecules([...moleculesRef.current]);
    }
  };

  const handleReset = () => {
    setDisturbance('equilibrium');
    setIsPlaying(true);
    setShiftElapsed(1);
    ceilingRef.current = EQ_CONFIGS.equilibrium.ceilingY;
    setCeilingY(EQ_CONFIGS.equilibrium.ceilingY);
    moleculesRef.current = buildInitialMolecules(
      EQ_CONFIGS.equilibrium.targetCounts,
      EQ_CONFIGS.equilibrium.ceilingY
    );
    setMolecules([...moleculesRef.current]);
  };

  useEffect(() => {
    if (!isPlaying) return;
    let rafId = 0;
    let lastTime = performance.now();
    shiftStartRef.current = lastTime;

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const activeCfg = EQ_CONFIGS[disturbance];
      const progress = disturbance === 'equilibrium' ? 1 : clamp((now - shiftStartRef.current) / 2600, 0, 1);
      setShiftElapsed(progress);

      // Hacim pistonunu yumuşak kaydır
      const nextCeiling = lerp(ceilingRef.current, activeCfg.ceilingY, Math.min(1, dt * 5));
      ceilingRef.current = nextCeiling;
      setCeilingY(nextCeiling);

      // Kayma ilerledikçe molekül sayısını hedef denge sayısına kademeli yaklaştır
      if (progress > 0.35) {
        moleculesRef.current = reconcileMolecules(
          moleculesRef.current,
          activeCfg.targetCounts,
          nextCeiling,
          nextIdRef,
          false
        );
      }

      const topBound = nextCeiling + 14;
      const bottomBound = VESSEL_BOTTOM - 14;
      const leftBound = VESSEL_LEFT + 14;
      const rightBound = VESSEL_RIGHT - 14;
      const speedFactor = activeCfg.speedMult;

      const updated = moleculesRef.current.map((m) => {
        let nx = m.x + m.vx * speedFactor * dt;
        let ny = m.y + m.vy * speedFactor * dt;
        let nvx = m.vx;
        let nvy = m.vy;

        if (nx < leftBound) {
          nx = leftBound;
          nvx = Math.abs(nvx);
        } else if (nx > rightBound) {
          nx = rightBound;
          nvx = -Math.abs(nvx);
        }

        if (ny < topBound) {
          ny = topBound;
          nvy = Math.abs(nvy);
        } else if (ny > bottomBound) {
          ny = bottomBound;
          nvy = -Math.abs(nvy);
        }

        return {
          ...m,
          x: nx,
          y: ny,
          vx: nvx,
          vy: nvy,
          angle: (m.angle + m.vAngle * speedFactor * dt) % 360,
        };
      });

      moleculesRef.current = updated;
      setMolecules(updated);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, disturbance]);

  const forwardRate = Math.round(lerp(cfg.forwardInitial, cfg.forwardFinal, shiftElapsed));
  const reverseRate = Math.round(lerp(cfg.reverseInitial, cfg.reverseFinal, shiftElapsed));

  const counts = useMemo(() => {
    let n2 = 0;
    let h2 = 0;
    let nh3 = 0;
    for (const m of molecules) {
      if (m.kind === 'N2') n2++;
      else if (m.kind === 'H2') h2++;
      else nh3++;
    }
    return { n2, h2, nh3 };
  }, [molecules]);

  return (
    <div style={containerStyle}>
      <div style={headerRowStyle}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800 }}>
            Kimyasal Denge & Le Chatelier: N₂(g) + 3H₂(g) ⇌ 2NH₃(g) + Isı
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            Ekzotermik (ΔH &lt; 0) • Gaz mol sayısı: 4 mol giren ⇌ 2 mol ürün
          </div>
        </div>
        <div style={controlsWrapStyle}>
          <button
            type="button"
            className="btn small primary"
            onClick={() => setIsPlaying((p) => !p)}
          >
            {isPlaying ? '⏸ Duraklat' : '▶ Oynat'}
          </button>
          <button type="button" className="btn small secondary" onClick={handleReset}>
            ↺ Sıfırla
          </button>
        </div>
      </div>

      {/* Etki Düğmeleri */}
      <div style={controlsWrapStyle} role="group" aria-label="Dengeye Etki Eden Faktörler">
        {DISTURBANCE_ORDER.map((id) => {
          const item = EQ_CONFIGS[id];
          const active = disturbance === id;
          return (
            <button
              key={id}
              type="button"
              className={`btn small ${active ? 'primary' : 'secondary'}`}
              aria-pressed={active}
              onClick={() => applyDisturbance(id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Ana SVG Sahnesi */}
      <div style={svgFrameStyle}>
        <svg
          viewBox="0 0 640 285"
          width="100%"
          role="img"
          aria-label="Haber süreci denge tepkime kabı ve aktivasyon enerjisi simülasyonu"
        >
          <defs>
            <linearGradient id="eq-heat-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(245, 165, 36, 0)" />
              <stop offset="100%" stopColor="rgba(229, 72, 77, 0.25)" />
            </linearGradient>
          </defs>

          {/* Sol Tepkime Kabı (Silindir + Hareketli Piston) */}
          <rect
            x={VESSEL_LEFT}
            y={34}
            width={VESSEL_RIGHT - VESSEL_LEFT}
            height={VESSEL_BOTTOM - 34}
            rx={10}
            fill="var(--card-2)"
            stroke="var(--border-2)"
            strokeWidth={2}
          />

          {/* Sıcaklık Artışı Isı Parlaması */}
          {disturbance === 'temp_up' && (
            <g>
              <rect
                x={VESSEL_LEFT + 2}
                y={ceilingY + 2}
                width={VESSEL_RIGHT - VESSEL_LEFT - 4}
                height={VESSEL_BOTTOM - ceilingY - 4}
                rx={6}
                fill="url(#eq-heat-grad)"
              />
              <text
                x={205}
                y={272}
                textAnchor="middle"
                fontSize={11}
                fontWeight={700}
                fill="var(--warn)"
              >
                🔥 +Isı Veriliyor (T ↑ → Tüm tanecikler hızlandı!)
              </text>
            </g>
          )}

          {/* N2 Enjeksiyon Girişi */}
          {disturbance === 'add_n2' && (
            <g>
              <rect
                x={194}
                y={10}
                width={22}
                height={ceilingY - 8}
                fill="var(--info)"
                opacity={0.35}
                rx={4}
              />
              <text
                x={205}
                y={272}
                textAnchor="middle"
                fontSize={11}
                fontWeight={700}
                fill="var(--info)"
              >
                ➕ Kaba N₂(g) enjekte edildi
              </text>
            </g>
          )}

          {/* Katalizör Göstergesi (Kabin Altında Yeşil Katalizör Yüzeyi) */}
          {disturbance === 'catalyst' && (
            <g>
              <rect
                x={VESSEL_LEFT + 12}
                y={VESSEL_BOTTOM - 10}
                width={VESSEL_RIGHT - VESSEL_LEFT - 24}
                height={7}
                rx={3}
                fill="var(--ok)"
                opacity={0.85}
              />
              <text
                x={205}
                y={272}
                textAnchor="middle"
                fontSize={11}
                fontWeight={700}
                fill="var(--ok)"
              >
                ⚡ Katalizör Yüzeyi (Eₐ düştü, rᵢ ve r₉ eşit arttı)
              </text>
            </g>
          )}

          {/* Hareketli Piston Başlığı */}
          <rect
            x={199}
            y={12}
            width={12}
            height={Math.max(8, ceilingY - 12)}
            fill="var(--muted)"
            rx={3}
          />
          <rect
            x={VESSEL_LEFT + 2}
            y={ceilingY - 8}
            width={VESSEL_RIGHT - VESSEL_LEFT - 4}
            height={10}
            rx={3}
            fill="var(--border-2)"
            stroke="var(--muted)"
            strokeWidth={1.2}
          />
          {disturbance === 'vol_down' && (
            <g>
              <text
                x={205}
                y={ceilingY - 14}
                textAnchor="middle"
                fontSize={11}
                fontWeight={700}
                fill="var(--accent)"
              >
                ⬇ Hacim Küçüldü (P ↑)
              </text>
              <text
                x={205}
                y={272}
                textAnchor="middle"
                fontSize={11}
                fontWeight={700}
                fill="var(--info)"
              >
                4 mol gaz → 2 mol NH₃ yönüne kayar
              </text>
            </g>
          )}

          {/* Moleküller */}
          {molecules.map((m) => {
            if (m.kind === 'N2') {
              return (
                <g key={m.id} transform={`translate(${m.x}, ${m.y}) rotate(${m.angle})`}>
                  <circle cx={-5} cy={0} r={5.5} fill="#3b82f6" stroke="#1d4ed8" strokeWidth={1} />
                  <circle cx={5} cy={0} r={5.5} fill="#60a5fa" stroke="#1d4ed8" strokeWidth={1} />
                </g>
              );
            }
            if (m.kind === 'H2') {
              return (
                <g key={m.id} transform={`translate(${m.x}, ${m.y}) rotate(${m.angle})`}>
                  <circle cx={-3.5} cy={0} r={3.6} fill="#22d3ee" stroke="#0891b2" strokeWidth={0.9} />
                  <circle cx={3.5} cy={0} r={3.6} fill="#67e8f9" stroke="#0891b2" strokeWidth={0.9} />
                </g>
              );
            }
            return (
              <g key={m.id} transform={`translate(${m.x}, ${m.y}) rotate(${m.angle})`}>
                <circle cx={-5.5} cy={4} r={3.2} fill="#fde68a" stroke="#d97706" strokeWidth={0.8} />
                <circle cx={5.5} cy={4} r={3.2} fill="#fde68a" stroke="#d97706" strokeWidth={0.8} />
                <circle cx={0} cy={-6} r={3.2} fill="#fde68a" stroke="#d97706" strokeWidth={0.8} />
                <circle cx={0} cy={0} r={6} fill="#f97316" stroke="#c2410c" strokeWidth={1} />
              </g>
            );
          })}

          {/* Sağ Panel: Molekül Sayacı & Enerji Koordinat Grafiği */}
          <g transform="translate(402, 24)">
            <rect
              x={0}
              y={0}
              width={220}
              height={102}
              rx={10}
              fill="var(--card-2)"
              stroke="var(--border)"
            />
            <text x={12} y={20} fontSize={12} fontWeight={800} fill="var(--text)">
              Kaptaki Tanecikler
            </text>

            <circle cx={20} cy={40} r={5} fill="#3b82f6" />
            <text x={32} y={44} fontSize={12} fill="var(--text)" fontWeight={600}>
              N₂ (Giren): {counts.n2}
            </text>

            <circle cx={20} cy={62} r={4.5} fill="#22d3ee" />
            <text x={32} y={66} fontSize={12} fill="var(--text)" fontWeight={600}>
              H₂ (Giren): {counts.h2}
            </text>

            <circle cx={20} cy={84} r={5.5} fill="#f97316" />
            <text x={32} y={88} fontSize={12} fill="var(--text)" fontWeight={600}>
              NH₃ (Ürün): {counts.nh3}
            </text>

            {/* Sağ Alt: Aktifleşme Enerjisi & Katalizör Yolu Diyagramı */}
            <rect
              x={0}
              y={114}
              width={220}
              height={118}
              rx={10}
              fill="var(--card-2)"
              stroke={disturbance === 'catalyst' ? 'var(--ok)' : 'var(--border)'}
              strokeWidth={disturbance === 'catalyst' ? 1.8 : 1}
            />
            <text x={12} y={133} fontSize={11.5} fontWeight={800} fill="var(--text)">
              Potansiyel Enerji (Eₐ)
            </text>
            {/* Eksenler */}
            <line x1={22} y1={144} x2={22} y2={214} stroke="var(--muted)" strokeWidth={1.2} />
            <line x1={22} y1={214} x2={204} y2={214} stroke="var(--muted)" strokeWidth={1.2} />
            {/* Katalizörsüz Yüksek Tepe (Ekzotermik: ürünler daha aşağıda) */}
            <path
              d="M 26 178 Q 96 130 148 188 L 198 196"
              fill="none"
              stroke="var(--accent)"
              strokeWidth={2.2}
            />
            {/* Katalizörlü Alternatif Yeşil Yol */}
            {disturbance === 'catalyst' && (
              <g>
                <path
                  d="M 26 178 Q 96 154 148 188 L 198 196"
                  fill="none"
                  stroke="var(--ok)"
                  strokeWidth={2.5}
                  strokeDasharray="5 3"
                />
                <text x={98} y={160} textAnchor="middle" fontSize={10} fontWeight={800} fill="var(--ok)">
                  Eₐ′ (Katalizörlü)
                </text>
              </g>
            )}
            <text x={106} y={145} textAnchor="middle" fontSize={9.5} fill="var(--muted)">
              Eₐ (Katalizörsüz)
            </text>
            <text x={32} y={193} fontSize={9.5} fill="var(--muted)">
              N₂+3H₂
            </text>
            <text x={158} y={208} fontSize={9.5} fill="var(--muted)">
              2NH₃ (ΔH&lt;0)
            </text>
          </g>
        </svg>
      </div>

      {/* Canlı İleri/Geri Hız Göstergeleri & Kc Durum Hapı */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: 10,
        }}
      >
        <div style={cardBoxStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
            <span>İleri Tepkime Hızı (rᵢ)</span>
            <span style={{ color: 'var(--info)' }}>{forwardRate} birim</span>
          </div>
          <div style={{ height: 8, borderRadius: 999, background: 'var(--border)', overflow: 'hidden' }}>
            <div
              style={{
                width: `${forwardRate}%`,
                height: '100%',
                background: 'var(--info)',
                transition: 'width 0.2s ease',
              }}
            />
          </div>
        </div>

        <div style={cardBoxStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
            <span>Geri Tepkime Hızı (r₉)</span>
            <span style={{ color: 'var(--accent)' }}>{reverseRate} birim</span>
          </div>
          <div style={{ height: 8, borderRadius: 999, background: 'var(--border)', overflow: 'hidden' }}>
            <div
              style={{
                width: `${reverseRate}%`,
                height: '100%',
                background: 'var(--accent)',
                transition: 'width 0.2s ease',
              }}
            />
          </div>
        </div>

        <div
          style={{
            ...cardBoxStyle,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 6,
          }}
        >
          <span style={pillStyle(cfg.shiftTone)}>{cfg.shiftLabel}</span>
          <span style={pillStyle(cfg.kcTone)}>{cfg.kcLabel}</span>
        </div>
      </div>

      {/* Açıklama & ÖSYM Tuzağı */}
      <div style={{ ...cardBoxStyle, fontSize: 13.5, lineHeight: 1.55 }}>{cfg.explanation}</div>
      <div style={trapBoxStyle}>
        <strong>⚠️ ÖSYM Tuzağı:</strong> {cfg.osymTrap}
      </div>

      {onPracticeTopic && (
        <div style={footerRowStyle}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
            Kc = [NH₃]² / ([N₂]·[H₂]³) — Yalnızca sıcaklık değiştirir.
          </span>
          <button type="button" className="btn primary small" onClick={onPracticeTopic}>
            ⚖️ Hız &amp; Denge Testini Çöz
          </button>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
 * 2. GasLawsDiffusionScene: PV = nRT Piston & Graham Difüzyon Yarışı
 * ========================================================================== */

type GasMode = 'piston' | 'graham';
type GrahamPairId = 'nh3_hcl' | 'he_so2';

interface GasParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface GrahamPairDef {
  id: GrahamPairId;
  label: string;
  leftFormula: string;
  leftMass: number;
  leftColor: string;
  rightFormula: string;
  rightMass: number;
  rightColor: string;
  ratioText: string;
  meetFraction: number;
  meetLabel: string;
}

const GRAHAM_PAIRS: Record<GrahamPairId, GrahamPairDef> = {
  nh3_hcl: {
    id: 'nh3_hcl',
    label: 'NH₃ (17) vs HCl (36.5)',
    leftFormula: 'NH₃',
    leftMass: 17,
    leftColor: '#38bdf8',
    rightFormula: 'HCl',
    rightMass: 36.5,
    rightColor: '#f59e0b',
    ratioText: 'v(NH₃) / v(HCl) = √(36.5 / 17) ≈ 1.47',
    meetFraction: 1.465 / (1.465 + 1), // ≈ 0.594
    meetLabel: 'Beyaz NH₄Cl(k) Duman Halkası (~0.59 L)',
  },
  he_so2: {
    id: 'he_so2',
    label: 'He (4) vs SO₂ (64)',
    leftFormula: 'He',
    leftMass: 4,
    leftColor: '#34d399',
    rightFormula: 'SO₂',
    rightMass: 64,
    rightColor: '#f43f5e',
    ratioText: 'v(He) / v(SO₂) = √(64 / 4) = 4.00',
    meetFraction: 4 / (4 + 1), // 0.80
    meetLabel: 'Karşılaşma Noktası = 4/5 L (0.80 L)',
  },
};

function createGasParticles(count: number, minX: number, maxX: number, minY: number, maxY: number): GasParticle[] {
  const list: GasParticle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = ((i * 73 + 25) % 360) * (Math.PI / 180);
    const speed = 78 + (i % 4) * 14;
    list.push({
      id: i + 1,
      x: minX + 18 + ((i * 39) % Math.max(40, maxX - minX - 36)),
      y: minY + 14 + ((i * 29) % Math.max(30, maxY - minY - 28)),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
    });
  }
  return list;
}

export const GasLawsDiffusionScene: React.FC<SceneProps> = ({ onPracticeTopic }) => {
  const [mode, setMode] = useState<GasMode>('piston');

  // Piston state
  const [tempK, setTempK] = useState<number>(300);
  const [pressureAtm, setPressureAtm] = useState<number>(1.0);
  const [pistonPlaying, setPistonPlaying] = useState<boolean>(true);
  const gasRef = useRef<GasParticle[]>(createGasParticles(16, 175, 425, 110, 240));
  const [gasParticles, setGasParticles] = useState<GasParticle[]>(gasRef.current);

  // Graham state
  const [grahamPair, setGrahamPair] = useState<GrahamPairId>('nh3_hcl');
  const [grahamPlaying, setGrahamPlaying] = useState<boolean>(true);
  const [grahamProgress, setGrahamProgress] = useState<number>(0);

  // V = nRT / P (n = 1.0 mol, R = 0.082)
  const volumeLiters = (1.0 * 0.082 * tempK) / pressureAtm;
  // Minimum V ≈ 5.47 L (200K/3atm), Max V ≈ 49.2 L (600K/1atm)
  const chamberHeight = clamp(48 + ((volumeLiters - 5.4) / (49.2 - 5.4)) * 148, 48, 196);
  const chamberBottom = 248;
  const pistonY = chamberBottom - chamberHeight;
  const speedScale = Math.sqrt(tempK / 300);

  useEffect(() => {
    if (mode !== 'piston' || !pistonPlaying) return;
    let rafId = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const left = 182;
      const right = 418;
      const top = pistonY + 12;
      const bottom = chamberBottom - 8;

      const next = gasRef.current.map((p) => {
        let nx = p.x + p.vx * speedScale * dt;
        let ny = p.y + p.vy * speedScale * dt;
        let nvx = p.vx;
        let nvy = p.vy;

        if (nx < left) {
          nx = left;
          nvx = Math.abs(nvx);
        } else if (nx > right) {
          nx = right;
          nvx = -Math.abs(nvx);
        }

        if (ny < top) {
          ny = top;
          nvy = Math.abs(nvy);
        } else if (ny > bottom) {
          ny = bottom;
          nvy = -Math.abs(nvy);
        }

        return { ...p, x: nx, y: ny, vx: nvx, vy: nvy };
      });

      gasRef.current = next;
      setGasParticles(next);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [mode, pistonPlaying, pistonY, speedScale]);

  useEffect(() => {
    if (mode !== 'graham' || !grahamPlaying) return;
    let rafId = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      setGrahamProgress((prev) => {
        const next = prev + dt * 0.22;
        if (next >= 1) {
          return 1;
        }
        return next;
      });
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [mode, grahamPlaying]);

  const pair = GRAHAM_PAIRS[grahamPair];
  const tubeLeft = 64;
  const tubeRight = 576;
  const tubeWidth = tubeRight - tubeLeft;
  const meetX = tubeLeft + pair.meetFraction * tubeWidth;
  // İki gazın öncü dalgaları t = 0.72 anında tam meetX noktasında karşılaşsın
  const travelPhase = clamp(grahamProgress / 0.72, 0, 1);
  const leftFrontX = lerp(tubeLeft + 10, meetX, travelPhase);
  const rightFrontX = lerp(tubeRight - 10, meetX, travelPhase);
  const smokeRingIntensity = grahamProgress >= 0.72 ? clamp((grahamProgress - 0.72) / 0.28, 0, 1) : 0;

  return (
    <div style={containerStyle}>
      <div style={headerRowStyle}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800 }}>
            Gazların Kinetik Teorisi &amp; Difüzyon Yasaları
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            İdeal Gaz Denklemi (PV = nRT) ve Graham Difüzyon Hızı (v₁/v₂ = √(M₂/M₁))
          </div>
        </div>

        <div style={controlsWrapStyle} role="tablist" aria-label="Gaz Simülasyon Modları">
          <button
            type="button"
            className={`btn small ${mode === 'piston' ? 'primary' : 'secondary'}`}
            aria-pressed={mode === 'piston'}
            onClick={() => setMode('piston')}
          >
            🔩 Sürtünmesiz Hareketli Piston
          </button>
          <button
            type="button"
            className={`btn small ${mode === 'graham' ? 'primary' : 'secondary'}`}
            aria-pressed={mode === 'graham'}
            onClick={() => setMode('graham')}
          >
            🏁 Graham Difüzyon Yarışı
          </button>
        </div>
      </div>

      {mode === 'piston' ? (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 10,
            }}
          >
            <div style={cardBoxStyle}>
              <label
                htmlFor="gas-temp-slider"
                style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700 }}
              >
                <span>🌡️ Sıcaklık (T)</span>
                <span style={{ color: tempK > 380 ? 'var(--warn)' : 'var(--info)' }}>{tempK} K</span>
              </label>
              <input
                id="gas-temp-slider"
                type="range"
                min={200}
                max={600}
                step={10}
                value={tempK}
                onChange={(e) => setTempK(Number(e.target.value))}
                style={{ width: '100%', marginTop: 8, accentColor: 'var(--accent)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted)' }}>
                <span>200 K (Yavaş)</span>
                <span>300 K</span>
                <span>600 K (Hızlı)</span>
              </div>
            </div>

            <div style={cardBoxStyle}>
              <label
                htmlFor="gas-press-slider"
                style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700 }}
              >
                <span>⚖️ Dış Basınç / Ağırlık (P)</span>
                <span style={{ color: 'var(--accent)' }}>{pressureAtm.toFixed(2)} atm</span>
              </label>
              <input
                id="gas-press-slider"
                type="range"
                min={1}
                max={3}
                step={0.25}
                value={pressureAtm}
                onChange={(e) => setPressureAtm(Number(e.target.value))}
                style={{ width: '100%', marginTop: 8, accentColor: 'var(--accent)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted)' }}>
                <span>1.00 atm</span>
                <span>2.00 atm</span>
                <span>3.00 atm</span>
              </div>
            </div>
          </div>

          <div style={svgFrameStyle}>
            <svg
              viewBox="0 0 600 285"
              width="100%"
              role="img"
              aria-label="Sürtünmesiz hareketli piston PV=nRT canlı gaz simülasyonu"
            >
              {/* Sol Cetvel / Hacim Ölçeği */}
              <line x1={142} y1={52} x2={142} y2={chamberBottom} stroke="var(--border-2)" strokeWidth={1.5} />
              {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
                const tickY = chamberBottom - frac * 196;
                return (
                  <g key={frac}>
                    <line x1={134} y1={tickY} x2={142} y2={tickY} stroke="var(--muted)" strokeWidth={1.2} />
                    <text x={128} y={tickY + 4} textAnchor="end" fontSize={10} fill="var(--muted)">
                      {Math.round(5 + frac * 45)} L
                    </text>
                  </g>
                );
              })}

              {/* Silindir Duvarları */}
              <rect
                x={170}
                y={40}
                width={260}
                height={chamberBottom - 40}
                rx={6}
                fill="var(--card-2)"
                stroke="var(--border-2)"
                strokeWidth={2}
              />

              {/* Sıcaklık Taban Işıması */}
              <rect
                x={172}
                y={chamberBottom - 10}
                width={256}
                height={8}
                rx={2}
                fill={tempK >= 360 ? 'var(--warn)' : tempK <= 240 ? 'var(--info)' : 'var(--border-2)'}
                opacity={tempK >= 360 || tempK <= 240 ? 0.65 : 0.35}
              />

              {/* Gaz Molekülleri */}
              {gasParticles.map((p) => (
                <circle
                  key={p.id}
                  cx={p.x}
                  cy={clamp(p.y, pistonY + 10, chamberBottom - 8)}
                  r={5.5}
                  fill={tempK >= 420 ? '#f97316' : tempK <= 250 ? '#38bdf8' : 'var(--info)'}
                  stroke="var(--text)"
                  strokeWidth={0.7}
                  opacity={0.92}
                />
              ))}

              {/* Piston Kolu & Dış Ağırlık Blokları */}
              <rect
                x={292}
                y={10}
                width={16}
                height={Math.max(10, pistonY - 12)}
                fill="var(--muted)"
                rx={3}
              />
              {/* Basınçla orantılı ağırlıklar */}
              {Array.from({ length: Math.round(pressureAtm) }).map((_, idx) => (
                <rect
                  key={idx}
                  x={240}
                  y={pistonY - 22 - idx * 14}
                  width={120}
                  height={12}
                  rx={3}
                  fill="var(--accent)"
                  stroke="var(--text)"
                  strokeWidth={0.7}
                  opacity={0.9}
                />
              ))}
              {/* Piston Başlığı */}
              <rect
                x={172}
                y={pistonY - 8}
                width={256}
                height={11}
                rx={3}
                fill="var(--border-2)"
                stroke="var(--text)"
                strokeWidth={1}
              />
              <text
                x={448}
                y={pistonY + 2}
                fontSize={12}
                fontWeight={800}
                fill="var(--text)"
              >
                V = {volumeLiters.toFixed(1)} L
              </text>
              <text x={448} y={pistonY + 18} fontSize={11} fill="var(--muted)">
                Pᵢç = P_dış = {pressureAtm.toFixed(2)} atm
              </text>

              {/* Alt Bilgi */}
              <text x={300} y={272} textAnchor="middle" fontSize={11.5} fontWeight={700} fill="var(--muted)">
                {tempK > 320 ? '🔥 T arttı → E_k ve tanecik hızı arttı' : tempK < 280 ? '❄️ T azaldı → Tanecikler yavaşladı' : 'Dengeli Kinetik Dağılım (n = 1.0 mol)'}
              </text>
            </svg>
          </div>

          {/* Canlı Formül & Kontrol Satırı */}
          <div style={{ ...cardBoxStyle, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700 }}>
              P·V = n·R·T ⇒ ({pressureAtm.toFixed(2)} atm) · ({volumeLiters.toFixed(1)} L) = (1.0) · (0.082) · ({tempK} K)
            </div>
            <div style={controlsWrapStyle}>
              <span style={pillStyle('info')}>
                E_k(ort) ∝ {tempK} K ({(tempK / 300).toFixed(2)}×)
              </span>
              <button
                type="button"
                className="btn small secondary"
                onClick={() => setPistonPlaying((p) => !p)}
              >
                {pistonPlaying ? '⏸ Duraklat' : '▶ Oynat'}
              </button>
              <button
                type="button"
                className="btn small ghost"
                onClick={() => {
                  setTempK(300);
                  setPressureAtm(1.0);
                  setPistonPlaying(true);
                }}
              >
                ↺ Sıfırla
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={headerRowStyle}>
            <div style={controlsWrapStyle} role="group" aria-label="Graham Difüzyon Gaz Çifti">
              {(['nh3_hcl', 'he_so2'] as const).map((id) => (
                <button
                  key={id}
                  type="button"
                  className={`btn small ${grahamPair === id ? 'primary' : 'secondary'}`}
                  aria-pressed={grahamPair === id}
                  onClick={() => {
                    setGrahamPair(id);
                    setGrahamProgress(0);
                    setGrahamPlaying(true);
                  }}
                >
                  {GRAHAM_PAIRS[id].label}
                </button>
              ))}
            </div>
            <div style={controlsWrapStyle}>
              <button
                type="button"
                className="btn small primary"
                onClick={() => {
                  if (grahamProgress >= 1) {
                    setGrahamProgress(0);
                    setGrahamPlaying(true);
                  } else {
                    setGrahamPlaying((p) => !p);
                  }
                }}
              >
                {grahamProgress >= 1 ? '▶ Tekrar Yarıştır' : grahamPlaying ? '⏸ Duraklat' : '▶ Oynat'}
              </button>
              <button
                type="button"
                className="btn small secondary"
                onClick={() => {
                  setGrahamProgress(0);
                  setGrahamPlaying(true);
                }}
              >
                ↺ Sıfırla
              </button>
            </div>
          </div>

          <div style={svgFrameStyle}>
            <svg
              viewBox="0 0 640 220"
              width="100%"
              role="img"
              aria-label="Graham difüzyon yasası cam boru yarışı animasyonu"
            >
              {/* Cam Boru Gövdesi */}
              <rect
                x={tubeLeft}
                y={64}
                width={tubeWidth}
                height={70}
                rx={10}
                fill="var(--card-2)"
                stroke="var(--border-2)"
                strokeWidth={2.2}
              />

              {/* Sol ve Sağ Pamuk/Giriş Tıpaları */}
              <rect x={tubeLeft - 14} y={70} width={16} height={58} rx={4} fill={pair.leftColor} opacity={0.85} />
              <rect x={tubeRight - 2} y={70} width={16} height={58} rx={4} fill={pair.rightColor} opacity={0.85} />

              <text x={tubeLeft} y={50} textAnchor="middle" fontSize={13} fontWeight={800} fill={pair.leftColor}>
                {pair.leftFormula} (M={pair.leftMass})
              </text>
              <text x={tubeRight} y={50} textAnchor="middle" fontSize={13} fontWeight={800} fill={pair.rightColor}>
                {pair.rightFormula} (M={pair.rightMass})
              </text>

              {/* Sol Gaz Bulutu ve Tanecikleri (Hızlı Hafif Gaz) */}
              <rect
                x={tubeLeft + 4}
                y={72}
                width={Math.max(4, leftFrontX - tubeLeft - 4)}
                height={54}
                fill={pair.leftColor}
                opacity={0.14}
                rx={4}
              />
              {[0.25, 0.5, 0.72, 0.88, 1].map((f, idx) => {
                const px = lerp(tubeLeft + 12, leftFrontX, f);
                const py = 82 + ((idx * 17) % 36);
                return (
                  <circle
                    key={`l-${idx}`}
                    cx={px}
                    cy={py}
                    r={4.2}
                    fill={pair.leftColor}
                    opacity={0.9}
                  />
                );
              })}

              {/* Sağ Gaz Bulutu ve Tanecikleri (Yavaş Ağır Gaz) */}
              <rect
                x={rightFrontX}
                y={72}
                width={Math.max(4, tubeRight - rightFrontX - 4)}
                height={54}
                fill={pair.rightColor}
                opacity={0.14}
                rx={4}
              />
              {[0.25, 0.5, 0.72, 0.88, 1].map((f, idx) => {
                const px = lerp(tubeRight - 12, rightFrontX, f);
                const py = 82 + ((idx * 23 + 10) % 36);
                return (
                  <circle
                    key={`r-${idx}`}
                    cx={px}
                    cy={py}
                    r={5.5}
                    fill={pair.rightColor}
                    opacity={0.9}
                  />
                );
              })}

              {/* Karşılaşma Noktası: Beyaz NH4Cl Duman Halkası */}
              {smokeRingIntensity > 0 && (
                <g opacity={smokeRingIntensity}>
                  <ellipse
                    cx={meetX}
                    cy={99}
                    rx={8 + smokeRingIntensity * 6}
                    ry={32}
                    fill="rgba(248, 250, 252, 0.25)"
                    stroke="#f8fafc"
                    strokeWidth={3.2}
                  />
                  <ellipse
                    cx={meetX}
                    cy={99}
                    rx={4}
                    ry={26}
                    fill="none"
                    stroke="var(--info)"
                    strokeWidth={1.2}
                    strokeDasharray="3 3"
                  />
                  <text
                    x={meetX}
                    y={30}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={800}
                    fill="var(--text)"
                  >
                    ☁️ {pair.meetLabel}
                  </text>
                </g>
              )}

              {/* Alt Cetvel İşaretleri (0.0L .. 1.0L) */}
              {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((mark) => {
                const mx = tubeLeft + mark * tubeWidth;
                return (
                  <g key={mark}>
                    <line x1={mx} y1={138} x2={mx} y2={148} stroke="var(--muted)" strokeWidth={1.2} />
                    <text x={mx} y={163} textAnchor="middle" fontSize={11} fill="var(--muted)">
                      {mark === 0 ? '0' : `${mark.toFixed(1)} L`}
                    </text>
                  </g>
                );
              })}

              <text x={320} y={196} textAnchor="middle" fontSize={12.5} fontWeight={800} fill="var(--info)">
                {pair.ratioText} — Hafif gaz daha hızlı gider; karşılaşma ağır tarafa yakın olur!
              </text>
            </svg>
          </div>
        </>
      )}

      <div style={trapBoxStyle}>
        <strong>⚠️ ÖSYM Tuzağı:</strong> Aynı sıcaklıkta (T) bulunan tüm gazların{' '}
        <strong>ortalama kinetik enerjileri EŞİTTİR</strong> (E_k = 3/2 kT); gazların mol kütlesine göre
        değişen şey kinetik enerjileri değil, <strong>difüzyon hızlarıdır</strong> (v ∝ 1/√M)!
      </div>

      {onPracticeTopic && (
        <div style={footerRowStyle}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
            Sıcaklık sabitken hafif gazın aldığı yol √(M_ağır / M_hafif) katıdır.
          </span>
          <button type="button" className="btn primary small" onClick={onPracticeTopic}>
            🎈 Gazlar Testini Çöz
          </button>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
 * 3. HydrationPolarityScene: Çözünme & Polarlık (Hidratasyon & Benzer Benzeri Çözer)
 * ========================================================================== */

type HydrationMode = 'hydration' | 'polarity';

interface IonSeed {
  id: string;
  label: 'Na⁺' | 'Cl⁻';
  row: number;
  col: number;
  peelStart: number;
  targetX: number;
  targetY: number;
}

const CRYSTAL_IONS: IonSeed[] = [
  // 3x3 NaCl kafesi: köşeler ilk önce soyulur
  { id: '0-0', label: 'Na⁺', row: 0, col: 0, peelStart: 0.12, targetX: 112, targetY: 72 },
  { id: '0-1', label: 'Cl⁻', row: 0, col: 1, peelStart: 0.36, targetX: 295, targetY: 56 },
  { id: '0-2', label: 'Na⁺', row: 0, col: 2, peelStart: 0.18, targetX: 486, targetY: 74 },
  { id: '1-0', label: 'Cl⁻', row: 1, col: 0, peelStart: 0.42, targetX: 98, targetY: 162 },
  { id: '1-1', label: 'Na⁺', row: 1, col: 1, peelStart: 0.64, targetX: 300, targetY: 152 },
  { id: '1-2', label: 'Cl⁻', row: 1, col: 2, peelStart: 0.48, targetX: 502, targetY: 164 },
  { id: '2-0', label: 'Na⁺', row: 2, col: 0, peelStart: 0.24, targetX: 154, targetY: 236 },
  { id: '2-1', label: 'Cl⁻', row: 2, col: 1, peelStart: 0.56, targetX: 332, targetY: 238 },
  { id: '2-2', label: 'Na⁺', row: 2, col: 2, peelStart: 0.3, targetX: 454, targetY: 234 },
];

interface WaterDipoleProps {
  x: number;
  y: number;
  angleDeg: number; // 0 derece: Oksijen (δ-) SAĞA, Hidrojenler (δ+) SOLA bakar; 180: Oksijen SOLA, H'ler SAĞA
  scale?: number;
}

const WaterDipoleSvg: React.FC<WaterDipoleProps> = ({ x, y, angleDeg, scale = 1 }) => (
  <g transform={`translate(${x}, ${y}) rotate(${angleDeg}) scale(${scale})`}>
    {/* O-H bağları */}
    <line x1={3} y1={0} x2={-7} y2={-6.5} stroke="var(--muted)" strokeWidth={1.6} />
    <line x1={3} y1={0} x2={-7} y2={6.5} stroke="var(--muted)" strokeWidth={1.6} />
    {/* δ+ Hidrojenler (beyaz + belirgin gri kenarlık) */}
    <circle cx={-8} cy={-7} r={3.8} fill="#f8fafc" stroke="#64748b" strokeWidth={1.2} />
    <circle cx={-8} cy={7} r={3.8} fill="#f8fafc" stroke="#64748b" strokeWidth={1.2} />
    {/* δ- Oksijen (kırmızı) */}
    <circle cx={4} cy={0} r={6} fill="#ef4444" stroke="#b91c1c" strokeWidth={1.2} />
  </g>
);

export const HydrationPolarityScene: React.FC<SceneProps> = ({ onPracticeTopic }) => {
  const [mode, setMode] = useState<HydrationMode>('hydration');
  const [progress, setProgress] = useState<number>(35);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [phaseTick, setPhaseTick] = useState<number>(0);

  useEffect(() => {
    if (!isPlaying) return;
    let rafId = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      setPhaseTick((t) => t + dt);
      if (mode === 'hydration') {
        setProgress((prev) => {
          const next = prev + dt * 14;
          return next >= 100 ? 100 : next;
        });
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, mode]);

  const norm = progress / 100;

  const hydrationStageLabel =
    progress < 25
      ? '1. Su Dipolleri Kristal Köşelerine Yaklaşıyor'
      : progress < 68
        ? '2. İyon-Dipol Çekimiyle Na⁺ ve Cl⁻ Yüzeyden Koparılıyor'
        : '3. Tam Hidratasyon Kafesi (İyonlar Su ile Çevrelendi)';

  return (
    <div style={containerStyle}>
      <div style={headerRowStyle}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800 }}>
            Çözünme &amp; Polarlık (&ldquo;Benzer Benzeri Çözer&rdquo;)
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            İyon-Dipol Hidratasyonu (NaCl + H₂O) • Hidrojen Bağı vs Apolar Faz Ayrışması
          </div>
        </div>

        <div style={controlsWrapStyle} role="tablist" aria-label="Çözünme Animasyon Modları">
          <button
            type="button"
            className={`btn small ${mode === 'hydration' ? 'primary' : 'secondary'}`}
            aria-pressed={mode === 'hydration'}
            onClick={() => setMode('hydration')}
          >
            🧂 NaCl Hidratasyonu
          </button>
          <button
            type="button"
            className={`btn small ${mode === 'polarity' ? 'primary' : 'secondary'}`}
            aria-pressed={mode === 'polarity'}
            onClick={() => setMode('polarity')}
          >
            💧 Polar vs Apolar
          </button>
        </div>
      </div>

      {mode === 'hydration' ? (
        <>
          <div style={{ ...cardBoxStyle, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
            <button
              type="button"
              className="btn small primary"
              onClick={() => {
                if (progress >= 100) {
                  setProgress(0);
                  setIsPlaying(true);
                } else {
                  setIsPlaying((p) => !p);
                }
              }}
            >
              {progress >= 100 ? '▶ Tekrar Oynat' : isPlaying ? '⏸ Duraklat' : '▶ Oynat'}
            </button>
            <button
              type="button"
              className="btn small secondary"
              onClick={() => {
                setProgress(0);
                setIsPlaying(true);
              }}
            >
              ↺ Sıfırla
            </button>

            <div style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <label htmlFor="hydration-scrub" style={{ fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>
                İlerleme: {Math.round(progress)}%
              </label>
              <input
                id="hydration-scrub"
                type="range"
                min={0}
                max={100}
                value={Math.round(progress)}
                onChange={(e) => {
                  setIsPlaying(false);
                  setProgress(Number(e.target.value));
                }}
                style={{ width: '100%', accentColor: 'var(--accent)' }}
              />
            </div>

            <span style={pillStyle(progress >= 68 ? 'ok' : 'info')}>{hydrationStageLabel}</span>
          </div>

          <div style={svgFrameStyle}>
            <svg
              viewBox="0 0 600 295"
              width="100%"
              role="img"
              aria-label="NaCl iyonik kristalinin su molekülleri tarafından hidratasyon animasyonu"
            >
              {/* Su Ortamı Arka Planı */}
              <rect
                x={14}
                y={14}
                width={572}
                height={264}
                rx={12}
                fill="rgba(77, 171, 247, 0.08)"
                stroke="var(--info)"
                strokeWidth={1.4}
              />

              {/* Köşe Açıklama Etiketleri */}
              <g transform="translate(24, 28)">
                <circle cx={8} cy={0} r={5.5} fill="#ef4444" stroke="#b91c1c" strokeWidth={1} />
                <text x={18} y={4} fontSize={11} fontWeight={700} fill="var(--text)">
                  O (δ⁻) → Na⁺&apos;ya yönelir
                </text>
                <circle cx={155} cy={0} r={4.5} fill="#f8fafc" stroke="#64748b" strokeWidth={1.1} />
                <text x={165} y={4} fontSize={11} fontWeight={700} fill="var(--text)">
                  H (δ⁺) → Cl⁻&apos;ye yönelir
                </text>
              </g>

              {/* İyonlar ve Etrafındaki Hidratasyon Su Kafesleri */}
              {CRYSTAL_IONS.map((ion, idx) => {
                const baseX = 272 + ion.col * 28;
                const baseY = 122 + ion.row * 28;
                const localT = clamp((norm - ion.peelStart) / 0.32, 0, 1);
                const bobX = localT > 0.3 ? Math.sin(phaseTick * 1.8 + idx) * 3.5 * localT : 0;
                const bobY = localT > 0.3 ? Math.cos(phaseTick * 1.5 + idx) * 3.5 * localT : 0;
                const cx = lerp(baseX, ion.targetX, localT) + bobX;
                const cy = lerp(baseY, ion.targetY, localT) + bobY;
                const isNa = ion.label === 'Na⁺';
                const radius = isNa ? 11 : 14;

                // Yalnızca dışa ayrılan iyonların etrafında belirgin su kafesi göster
                const showCage = localT > 0.35;
                const cageOpacity = clamp((localT - 0.35) / 0.45, 0, 1);
                const cageAngles = [0, 90, 180, 270];

                return (
                  <g key={ion.id}>
                    {showCage &&
                      cageAngles.map((deg, wIdx) => {
                        const rad = (deg * Math.PI) / 180;
                        const dist = radius + 16;
                        const wx = cx + Math.cos(rad) * dist;
                        const wy = cy + Math.sin(rad) * dist;
                        // WaterDipoleSvg angleDeg = 0 iken Oksijen (+x) sağa bakar.
                        // İyon (cx, cy) su molekülüne göre (-cos(rad), -sin(rad)) yönündedir.
                        // Na+ için O (δ-) iyona bakmalı => rot = deg + 180
                        // Cl- için H (δ+) iyona bakmalı => rot = deg
                        const dipoleAngle = isNa ? deg + 180 : deg;
                        return (
                          <g key={wIdx} opacity={cageOpacity}>
                            <line
                              x1={cx + Math.cos(rad) * radius}
                              y1={cy + Math.sin(rad) * radius}
                              x2={wx - Math.cos(rad) * 4}
                              y2={wy - Math.sin(rad) * 4}
                              stroke={isNa ? '#ef4444' : 'var(--info)'}
                              strokeWidth={1.1}
                              strokeDasharray="2.5 2.5"
                            />
                            <WaterDipoleSvg x={wx} y={wy} angleDeg={dipoleAngle} scale={0.78} />
                          </g>
                        );
                      })}

                    <circle
                      cx={cx}
                      cy={cy}
                      r={radius}
                      fill={isNa ? '#8b5cf6' : '#10b981'}
                      stroke="var(--text)"
                      strokeWidth={1.1}
                    />
                    <text
                      x={cx}
                      y={cy + 3.5}
                      textAnchor="middle"
                      fontSize={isNa ? 9.5 : 10}
                      fontWeight={800}
                      fill="#ffffff"
                    >
                      {ion.label}
                    </text>
                  </g>
                );
              })}

              {/* Serbest yüzen H2O dipolleri */}
              {[
                { x: 46, y: 88, a: 28 },
                { x: 548, y: 112, a: 155 },
                { x: 220, y: 248, a: -42 },
                { x: 392, y: 92, a: 205 },
              ].map((w, i) => (
                <WaterDipoleSvg
                  key={i}
                  x={w.x + Math.sin(phaseTick * 1.4 + i) * 5}
                  y={w.y + Math.cos(phaseTick * 1.2 + i) * 4}
                  angleDeg={w.a + Math.sin(phaseTick + i) * 12}
                  scale={0.85}
                />
              ))}
            </svg>
          </div>
        </>
      ) : (
        <div style={svgFrameStyle}>
          <svg
            viewBox="0 0 640 270"
            width="100%"
            role="img"
            aria-label="Polar etanol-su hidrojen bağı çözünmesi ve apolar yağ-su faz ayrışması"
          >
            {/* SOL BEHER: ETANOL + SU (POLAR + POLAR = HOMOJEN) */}
            <rect
              x={20}
              y={22}
              width={284}
              height={226}
              rx={12}
              fill="rgba(48, 181, 117, 0.08)"
              stroke="var(--ok)"
              strokeWidth={1.8}
            />
            <text x={162} y={44} textAnchor="middle" fontSize={13} fontWeight={800} fill="var(--ok)">
              ✅ Polar + Polar → Çözünür (Homojen)
            </text>
            <text x={162} y={62} textAnchor="middle" fontSize={11.5} fill="var(--muted)">
              Etanol (C₂H₅OH) + Su (H₂O) — Hidrojen Bağı
            </text>

            {/* Etanol molekülü + Su molekülleri + kesikli H-bağları */}
            <g transform={`translate(115, ${138 + Math.sin(phaseTick * 1.6) * 3})`}>
              {/* Etil grubu */}
              <rect x={-52} y={-11} width={44} height={22} rx={11} fill="var(--info)" opacity={0.8} />
              <text x={-30} y={4} textAnchor="middle" fontSize={10.5} fontWeight={800} fill="#ffffff">
                C₂H₅
              </text>
              {/* -OH ucu */}
              <circle cx={4} cy={0} r={8.5} fill="#ef4444" stroke="#b91c1c" strokeWidth={1.1} />
              <text x={4} y={3.5} textAnchor="middle" fontSize={9} fontWeight={800} fill="#ffffff">
                O
              </text>
              <circle cx={20} cy={-6} r={5} fill="#f8fafc" stroke="#64748b" strokeWidth={1.2} />
              <text x={20} y={-3} textAnchor="middle" fontSize={7.5} fontWeight={800} fill="#0f172a">
                H
              </text>

              {/* Hidrojen bağları */}
              <line
                x1={25}
                y1={-6}
                x2={64}
                y2={-16}
                stroke="var(--ok)"
                strokeWidth={2}
                strokeDasharray="4 3"
              />
              <line
                x1={4}
                y1={9}
                x2={-8}
                y2={42}
                stroke="var(--ok)"
                strokeWidth={2}
                strokeDasharray="4 3"
              />
              <text x={50} y={-24} fontSize={9.5} fontWeight={800} fill="var(--ok)">
                H-Bağı
              </text>
            </g>
            <WaterDipoleSvg x={196} y={120 + Math.cos(phaseTick * 1.6) * 3} angleDeg={165} scale={0.95} />
            <WaterDipoleSvg x={106} y={196 + Math.sin(phaseTick * 1.4) * 3} angleDeg={-75} scale={0.95} />
            <WaterDipoleSvg x={242} y={188 + Math.cos(phaseTick * 1.3) * 3} angleDeg={200} scale={0.85} />
            <text x={162} y={234} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--text)">
              O–H···O Hidrojen bağları sayesinde her oranda karışır
            </text>

            {/* SAĞ BEHER: YAĞ / HEKZAN + SU (APOLAR + POLAR = HETEROJEN) */}
            <rect
              x={336}
              y={22}
              width={284}
              height={226}
              rx={12}
              fill="var(--card-2)"
              stroke="var(--accent)"
              strokeWidth={1.8}
            />
            <text x={478} y={44} textAnchor="middle" fontSize={13} fontWeight={800} fill="var(--accent)">
              ❌ Apolar + Polar → Çözünmez (2 Faz)
            </text>
            <text x={478} y={62} textAnchor="middle" fontSize={11.5} fill="var(--muted)">
              Hekzan / Yağ (C₆H₁₄) + Su (H₂O)
            </text>

            {/* Üst Apolar Yağ Fazı */}
            <rect
              x={338}
              y={74}
              width={280}
              height={72}
              fill="rgba(245, 165, 36, 0.16)"
            />
            {[
              { x: 382, y: 102 },
              { x: 472, y: 94 },
              { x: 552, y: 112 },
            ].map((oil, idx) => (
              <g
                key={idx}
                transform={`translate(${oil.x + Math.sin(phaseTick * 1.2 + idx) * 4}, ${oil.y})`}
              >
                <path
                  d="M -22 4 L -10 -5 L 2 4 L 14 -5 L 24 4"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth={4.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            ))}
            <text x={478} y={134} textAnchor="middle" fontSize={10.5} fontWeight={700} fill="var(--warn)">
              Apolar Faz (d &lt; 1, London Kuvvetleri, μ = 0)
            </text>

            {/* Faz Sınırı */}
            <path
              d="M 338 146 Q 408 141 478 146 T 618 146"
              fill="none"
              stroke="var(--accent)"
              strokeWidth={2.5}
            />

            {/* Alt Polar Su Fazı */}
            <rect
              x={338}
              y={147}
              width={280}
              height={99}
              rx={10}
              fill="rgba(77, 171, 247, 0.14)"
            />
            <WaterDipoleSvg x={392} y={188 + Math.sin(phaseTick * 1.5) * 3} angleDeg={20} scale={0.85} />
            <WaterDipoleSvg x={472} y={182 + Math.cos(phaseTick * 1.5) * 3} angleDeg={190} scale={0.85} />
            <WaterDipoleSvg x={548} y={194 + Math.sin(phaseTick * 1.3) * 3} angleDeg={135} scale={0.85} />
            <text x={478} y={234} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--text)">
              Polar H₂O molekülleri kendi arasında H bağı kurar, yağı dışlar
            </text>
          </svg>
        </div>
      )}

      <div style={trapBoxStyle}>
        <strong>⚠️ ÖSYM Tuzağı:</strong>{' '}
        {mode === 'hydration'
          ? 'NaCl(k)’nın suda çözünmesi KİMYASAL değil, iyon-dipol etkileşimli FİZİKSEL hidratasyon olayıdır! Na⁺ iyonunu suyun kısmi negatif O (δ⁻) ucu, Cl⁻ iyonunu ise kısmi pozitif H (δ⁺) uçları sarar.'
          : 'CCl₄ ve CO₂ polar kovalent bağlar içermelerine rağmen molekül geometrileri simetrik (μ = 0) olduğundan APOLAR moleküllerdir ve polar olan suda çözünmezler!'}
      </div>

      {onPracticeTopic && (
        <div style={footerRowStyle}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
            Benzer benzeri çözer: Polar &amp; İyonik maddeler polar çözücülerde iyi çözünür.
          </span>
          <button type="button" className="btn primary small" onClick={onPracticeTopic}>
            🧲 Etkileşimler Testini Çöz
          </button>
        </div>
      )}
    </div>
  );
};
