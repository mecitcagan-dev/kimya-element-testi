import React, { useEffect, useId, useMemo, useRef, useState } from 'react';

export interface SceneProps {
  onPracticeTopic?: () => void;
}

/* ============================================================================
 * ORTAK YARDIMCI STİLLER & HOOK'LAR
 * ========================================================================== */

const cardSurfaceStyle: React.CSSProperties = {
  backgroundColor: 'var(--card-2)',
  border: '1px solid var(--border-2)',
  borderRadius: '14px',
  padding: '16px',
  display: 'grid',
  gap: '14px'
};

const svgFrameStyle: React.CSSProperties = {
  backgroundColor: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: '12px',
  padding: '10px',
  overflow: 'hidden'
};

const infoBoxStyle: React.CSSProperties = {
  backgroundColor: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: '10px',
  padding: '10px 12px',
  fontSize: '13px',
  lineHeight: 1.5
};

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Sinüzoidal foton dalgası SVG path üreticisi.
 * İki nokta arasındaki doğrultuda dikey sinüs salınımı çizer.
 */
function buildPhotonWavePath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  amplitude: number,
  cycles: number,
  phase: number,
  samples = 42
): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 1) return '';

  const ux = dx / len;
  const uy = dy / len;
  const nx = -uy;
  const ny = ux;

  const parts: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const s = i / samples;
    const envelope = Math.sin(s * Math.PI);
    const wave = Math.sin(s * cycles * Math.PI * 2 - phase) * amplitude * envelope;
    const px = x1 + dx * s + nx * wave;
    const py = y1 + dy * s + ny * wave;
    parts.push(`${i === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`);
  }
  return parts.join(' ');
}

/* ============================================================================
 * 1. BOHR FOTON GEÇİŞLERİ & KÜRESEL SİMETRİ (24Cr / 29Cu) SAHNESİ
 * ========================================================================== */

type BohrMode = 'transitions' | 'symmetry';

interface BohrTransitionDef {
  id: string;
  label: string;
  from: 1 | 2 | 3 | 4;
  to: 1 | 2 | 3 | 4;
  kind: 'absorption' | 'emission';
  series: string;
  wavelength: string;
  deltaE: string;
  photonColor: string;
  spectrumX: number; // Spektrum çubuğu üzerindeki konum (0..1)
  explanation: string;
}

const BOHR_ORBIT_RADII: Record<1 | 2 | 3 | 4, number> = {
  1: 36,
  2: 66,
  3: 98,
  4: 132
};

const BOHR_ENERGY_EV: Record<1 | 2 | 3 | 4, number> = {
  1: -13.6,
  2: -3.4,
  3: -1.51,
  4: -0.85
};

const BOHR_TRANSITIONS: BohrTransitionDef[] = [
  {
    id: 'abs_1_3',
    label: 'n=1 → n=3 Absorpsiyon',
    from: 1,
    to: 3,
    kind: 'absorption',
    series: 'Lyman Soğurma (Morötesi)',
    wavelength: '103 nm',
    deltaE: '+12.09 eV (Enerji Alır)',
    photonColor: '#a78bfa',
    spectrumX: 0.14,
    explanation:
      'Temel haldeki (n=1) elektron, ΔE = E₃ − E₁ değerine tam eşit enerjili fotonu soğurarak n=3 katmanına uyarılır.'
  },
  {
    id: 'em_3_2',
    label: 'n=3 → n=2 Emisyon (Balmer)',
    from: 3,
    to: 2,
    kind: 'emission',
    series: 'Balmer Hα (Görünür Kırmızı)',
    wavelength: '656 nm',
    deltaE: '−1.89 eV (Foton Yayılır)',
    photonColor: '#ef4444',
    spectrumX: 0.84,
    explanation:
      'Uyarılmış elektron n=3’ten n=2’ye inerken görünür bölgede kırmızı (656 nm) emisyon çizgisini oluşturur.'
  },
  {
    id: 'em_4_2',
    label: 'n=4 → n=2 Emisyon (Balmer)',
    from: 4,
    to: 2,
    kind: 'emission',
    series: 'Balmer Hβ (Görünür Turkuaz)',
    wavelength: '486 nm',
    deltaE: '−2.55 eV (Foton Yayılır)',
    photonColor: '#22d3ee',
    spectrumX: 0.56,
    explanation:
      'n=4 → n=2 geçişi Balmer serisinin turkuaz-mavi (486 nm) çizgisidir; enerjisi Hα’dan daha büyüktür.'
  },
  {
    id: 'em_4_1',
    label: 'n=4 → n=1 Morötesi (Lyman)',
    from: 4,
    to: 1,
    kind: 'emission',
    series: 'Lyman γ (Morötesi / UV)',
    wavelength: '97 nm',
    deltaE: '−12.75 eV (Yüksek Enerjili UV)',
    photonColor: '#8b5cf6',
    spectrumX: 0.08,
    explanation:
      'n=1 katmanına düşen tüm geçişler Lyman serisidir; enerji farkı çok büyük olduğu için morötesi (UV) foton yayılır.'
  }
];

type SymmetryElement = 'Cr' | 'Cu';

interface OrbitalSnapshot {
  title: string;
  subtitle: string;
  fourS: ('up' | 'down')[];
  threeD: ('up' | 'down')[][];
  isLeaping: boolean;
  isFinal: boolean;
  configText: string;
}

function getSymmetrySteps(element: SymmetryElement): OrbitalSnapshot[] {
  if (element === 'Cr') {
    return [
      {
        title: '1. Başlangıç: [Ar] Çekirdeği Hazır',
        subtitle: '₂₄Cr için ilk 18 elektron [Ar] dizilimindedir. Kalan 6 değerlik elektronu 4s ve 3d’ye yerleşecek.',
        fourS: [],
        threeD: [[], [], [], [], []],
        isLeaping: false,
        isFinal: false,
        configText: '[Ar] 4s⁰ 3d⁰ (6 e⁻ bekliyor)'
      },
      {
        title: '2. Aufbau Kuralı: Önce 4s Dolar',
        subtitle: 'n + l değeri daha düşük (4+0 = 4 < 3+2 = 5) olduğu için önce 4s orbitali 2 elektronla dolar.',
        fourS: ['up', 'down'],
        threeD: [[], [], [], [], []],
        isLeaping: false,
        isFinal: false,
        configText: '[Ar] 4s² ... (4 e⁻ kaldı)'
      },
      {
        title: '3. Hund Kuralı: Beklenen 4s² 3d⁴ Durumu',
        subtitle: 'Kalan 4 elektron 3d orbitallerine paralel spinli tek tek yerleşir. 5. 3d orbitali boş kaldığı için kararsızdır!',
        fourS: ['up', 'down'],
        threeD: [['up'], ['up'], ['up'], ['up'], []],
        isLeaping: false,
        isFinal: false,
        configText: 'Beklenen (Yanlış): [Ar] 4s² 3d⁴'
      },
      {
        title: '4. Küresel Simetri Sıçraması (4s → 3d)',
        subtitle: '4s’deki bir elektron, tüm 3d orbitallerini yarı dolu (3d⁵) küresel simetriye ulaştırmak için 5. 3d orbitaline geçer!',
        fourS: ['up'],
        threeD: [['up'], ['up'], ['up'], ['up'], []],
        isLeaping: true,
        isFinal: false,
        configText: '4s → 3d Küresel Simetri Geçişi...'
      },
      {
        title: '5. Gerçek Temel Hal: [Ar] 4s¹ 3d⁵',
        subtitle: 'Yarı dolu küresel simetri (d⁵) atomu daha düşük enerjili ve kararlı kılar. Uyarılmış hal DEĞİLDİR!',
        fourS: ['up'],
        threeD: [['up'], ['up'], ['up'], ['up'], ['up']],
        isLeaping: false,
        isFinal: true,
        configText: 'Gerçek Temel Hal: [Ar] 4s¹ 3d⁵'
      }
    ];
  }

  return [
    {
      title: '1. Başlangıç: [Ar] Çekirdeği Hazır',
      subtitle: '₂₉Cu için ilk 18 elektron [Ar] dizilimindedir. Kalan 11 değerlik elektronu 4s ve 3d’ye yerleşecek.',
      fourS: [],
      threeD: [[], [], [], [], []],
      isLeaping: false,
      isFinal: false,
      configText: '[Ar] 4s⁰ 3d⁰ (11 e⁻ bekliyor)'
    },
    {
      title: '2. Aufbau Kuralı: Önce 4s Dolar',
      subtitle: 'Enerjisi daha düşük olan 4s orbitali önce 2 elektronla dolar (4s²).',
      fourS: ['up', 'down'],
      threeD: [[], [], [], [], []],
      isLeaping: false,
      isFinal: false,
      configText: '[Ar] 4s² ... (9 e⁻ kaldı)'
    },
    {
      title: '3. Hund Kuralı: Beklenen 4s² 3d⁹ Durumu',
      subtitle: '3d’ye önce 5 elektron tek tek yerleşir, ardından 4 elektron eşleşir. Son orbital yarı dolu kalır!',
      fourS: ['up', 'down'],
      threeD: [['up', 'down'], ['up', 'down'], ['up', 'down'], ['up', 'down'], ['up']],
      isLeaping: false,
      isFinal: false,
      configText: 'Beklenen (Yanlış): [Ar] 4s² 3d⁹'
    },
    {
      title: '4. Küresel Simetri Sıçraması (4s → 3d)',
      subtitle: '4s’deki elektron, 3d orbitallerini tam dolu (3d¹⁰) küresel simetriye tamamlamak için son 3d kutusuna atlar!',
      fourS: ['up'],
      threeD: [['up', 'down'], ['up', 'down'], ['up', 'down'], ['up', 'down'], ['up']],
      isLeaping: true,
      isFinal: false,
      configText: '4s → 3d Küresel Simetri Geçişi...'
    },
    {
      title: '5. Gerçek Temel Hal: [Ar] 4s¹ 3d¹⁰',
      subtitle: 'Tam dolu küresel simetri (d¹⁰) en kararlı temel hal dizilimidir. Bakır (₂₉Cu) ÖSYM’nin en klasik istisnasıdır!',
      fourS: ['up'],
      threeD: [
        ['up', 'down'],
        ['up', 'down'],
        ['up', 'down'],
        ['up', 'down'],
        ['up', 'down']
      ],
      isLeaping: false,
      isFinal: true,
      configText: 'Gerçek Temel Hal: [Ar] 4s¹ 3d¹⁰'
    }
  ];
}

export const BohrOrbitalScene: React.FC<SceneProps> = ({ onPracticeTopic }) => {
  const uid = useId().replace(/:/g, '');
  const [mode, setMode] = useState<BohrMode>('transitions');

  // Mod 1: Bohr Foton Geçişleri durumu
  const [selectedTransitionId, setSelectedTransitionId] = useState<string>('em_3_2');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [cycle, setCycle] = useState<number>(0.42); // 0..1 geçiş döngüsü
  const [orbitAngle, setOrbitAngle] = useState<number>(0.8);

  // Mod 2: Küresel Simetri durumu
  const [symElement, setSymElement] = useState<SymmetryElement>('Cr');
  const [symStep, setSymStep] = useState<number>(3);
  const [symPlaying, setSymPlaying] = useState<boolean>(true);
  const [symPulse, setSymPulse] = useState<number>(0);

  const lastRef = useRef<number | null>(null);

  useEffect(() => {
    const activeAnim = (mode === 'transitions' && isPlaying) || (mode === 'symmetry' && symPlaying);
    if (!activeAnim) {
      lastRef.current = null;
      return;
    }

    let rafId = 0;
    let stepTimer = 0;

    const tick = (now: number) => {
      if (lastRef.current !== null) {
        const dt = Math.min((now - lastRef.current) / 1000, 0.05);
        if (mode === 'transitions' && isPlaying) {
          setCycle((prev) => (prev + dt * 0.28) % 1);
          setOrbitAngle((prev) => (prev + dt * 2.1) % (Math.PI * 2));
        } else if (mode === 'symmetry' && symPlaying) {
          setSymPulse((prev) => (prev + dt * 1.4) % 1);
          stepTimer += dt;
          if (stepTimer >= 2.2) {
            stepTimer = 0;
            setSymStep((prev) => (prev >= 4 ? 0 : prev + 1));
          }
        }
      }
      lastRef.current = now;
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(rafId);
      lastRef.current = null;
    };
  }, [mode, isPlaying, symPlaying]);

  const activeTransition =
    BOHR_TRANSITIONS.find((t) => t.id === selectedTransitionId) ?? BOHR_TRANSITIONS[1];

  const handleSelectTransition = (id: string) => {
    setSelectedTransitionId(id);
    setCycle(0.05);
    setIsPlaying(true);
  };

  // Elektronun yarıçapını döngüye göre hesapla
  const rFrom = BOHR_ORBIT_RADII[activeTransition.from];
  const rTo = BOHR_ORBIT_RADII[activeTransition.to];
  const leapStart = 0.3;
  const leapEnd = 0.56;
  const electronRadius =
    cycle < leapStart
      ? rFrom
      : cycle > leapEnd
        ? rTo
        : lerp(rFrom, rTo, (cycle - leapStart) / (leapEnd - leapStart));

  const atomCx = 172;
  const atomCy = 166;
  const ex = atomCx + Math.cos(orbitAngle) * electronRadius;
  const ey = atomCy + Math.sin(orbitAngle) * electronRadius;

  // Foton dalgası hesaplamaları
  const showAbsorptionWave =
    activeTransition.kind === 'absorption' && cycle >= 0.04 && cycle <= leapStart + 0.04;
  const showEmissionWave = activeTransition.kind === 'emission' && cycle >= leapStart + 0.04;

  const photonAngle = -0.55; // Sağ üst doğrultudan giriş / çıkış
  const waveProgressAbs = clamp((cycle - 0.04) / (leapStart - 0.04), 0, 1);
  const absHeadR = lerp(168, rFrom + 6, waveProgressAbs);
  const absTailR = Math.min(182, absHeadR + 54);

  const waveProgressEm = clamp((cycle - (leapStart + 0.04)) / 0.55, 0, 1);
  const emTailR = lerp(rTo + 8, 138, waveProgressEm);
  const emHeadR = emTailR + 54;

  const photonPath = showAbsorptionWave
    ? buildPhotonWavePath(
        atomCx + Math.cos(photonAngle) * absTailR,
        atomCy + Math.sin(photonAngle) * absTailR,
        atomCx + Math.cos(photonAngle) * absHeadR,
        atomCy + Math.sin(photonAngle) * absHeadR,
        6.5,
        3.5,
        cycle * 24
      )
    : showEmissionWave
      ? buildPhotonWavePath(
          atomCx + Math.cos(photonAngle) * emTailR,
          atomCy + Math.sin(photonAngle) * emTailR,
          atomCx + Math.cos(photonAngle) * emHeadR,
          atomCy + Math.sin(photonAngle) * emHeadR,
          7,
          3.5,
          cycle * 24
        )
      : '';

  const flashAlpha =
    Math.abs(cycle - leapStart) < 0.06 ? 1 - Math.abs(cycle - leapStart) / 0.06 : 0;

  // Enerji merdiveni Y koordinatları (n=1 en altta, n=4 en üstte)
  const energyYMap: Record<1 | 2 | 3 | 4, number> = {
    4: 44,
    3: 76,
    2: 122,
    1: 196
  };
  const arrowY1 = energyYMap[activeTransition.from];
  const arrowY2 = energyYMap[activeTransition.to];
  const spectrumBarLit =
    activeTransition.kind === 'emission'
      ? cycle >= leapStart + 0.04
      : cycle >= leapStart - 0.05 && cycle <= leapEnd + 0.25;

  // Küresel simetri adımları
  const symSteps = useMemo(() => getSymmetrySteps(symElement), [symElement]);
  const activeSymStep = symSteps[clamp(symStep, 0, symSteps.length - 1)];

  return (
    <div style={cardSurfaceStyle}>
      {/* Üst Başlık & Mod Seçici */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: 'var(--text)' }}>
            Bohr Foton Geçişleri &amp; Küresel Simetri (₂₄Cr / ₂₉Cu)
          </h3>
          <p style={{ margin: '3px 0 0', fontSize: '12.5px', color: 'var(--muted)' }}>
            Kuantumlu enerji düzeylerinde absorpsiyon/emisyon ve Aufbau istisnalarını canlı incele.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          <button
            type="button"
            className={`btn small ${mode === 'transitions' ? 'primary' : 'secondary'}`}
            aria-pressed={mode === 'transitions'}
            onClick={() => setMode('transitions')}
          >
            Emisyon &amp; Absorpsiyon Sıçraması
          </button>
          <button
            type="button"
            className={`btn small ${mode === 'symmetry' ? 'primary' : 'secondary'}`}
            aria-pressed={mode === 'symmetry'}
            onClick={() => setMode('symmetry')}
          >
            Aufbau, Hund &amp; 24Cr / 29Cu İstisnası
          </button>
        </div>
      </div>

      {mode === 'transitions' ? (
        <>
          {/* Geçiş Seçim Butonları & Oynatma */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
            {BOHR_TRANSITIONS.map((t) => {
              const active = t.id === activeTransition.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  className={`btn small ${active ? 'primary' : 'secondary'}`}
                  aria-pressed={active}
                  onClick={() => handleSelectTransition(t.id)}
                >
                  {t.label}
                </button>
              );
            })}
            <button
              type="button"
              className="btn small ghost"
              onClick={() => setIsPlaying((p) => !p)}
            >
              {isPlaying ? '⏸ Duraklat' : '▶ Oynat'}
            </button>
            <button
              type="button"
              className="btn small ghost"
              onClick={() => {
                setCycle(0.02);
                setIsPlaying(true);
              }}
            >
              ↻ Tekrar Sıçrat
            </button>
          </div>

          {/* Bohr Atomu + Enerji Seviyesi + Spektrum SVG */}
          <div style={svgFrameStyle}>
            <svg
              viewBox="0 0 640 330"
              style={{ width: '100%', display: 'block' }}
              aria-label="Bohr atom modeli foton absorpsiyon ve emisyon animasyonu"
            >
              <defs>
                <linearGradient id={`${uid}-spectrum`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6d28d9" />
                  <stop offset="22%" stopColor="#4f46e5" />
                  <stop offset="40%" stopColor="#2563eb" />
                  <stop offset="56%" stopColor="#06b6d4" />
                  <stop offset="70%" stopColor="#22c55e" />
                  <stop offset="82%" stopColor="#eab308" />
                  <stop offset="94%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#991b1b" />
                </linearGradient>
                <radialGradient id={`${uid}-nuc`} cx="40%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#fda4af" />
                  <stop offset="100%" stopColor="#e5484d" />
                </radialGradient>
              </defs>

              {/* SOL PANEL: Konsantrik Bohr Yörüngeleri */}
              <text x="172" y="20" fill="var(--muted)" fontSize="11.5" fontWeight="700" textAnchor="middle">
                Bohr Yörüngeleri (n = 1, 2, 3, 4)
              </text>

              {([4, 3, 2, 1] as const).map((n) => {
                const r = BOHR_ORBIT_RADII[n];
                const isTarget = n === activeTransition.from || n === activeTransition.to;
                return (
                  <g key={n}>
                    <circle
                      cx={atomCx}
                      cy={atomCy}
                      r={r}
                      fill="none"
                      stroke={isTarget ? activeTransition.photonColor : 'var(--border-2)'}
                      strokeWidth={isTarget ? 1.8 : 1.2}
                      strokeDasharray={isTarget ? 'none' : '4 4'}
                      opacity={isTarget ? 0.85 : 0.65}
                    />
                    <text
                      x={atomCx - r - 4}
                      y={atomCy + 4}
                      fill={isTarget ? 'var(--text)' : 'var(--muted)'}
                      fontSize="10"
                      fontWeight={isTarget ? 800 : 600}
                      textAnchor="end"
                    >
                      n={n}
                    </text>
                  </g>
                );
              })}

              {/* Çekirdek */}
              <circle cx={atomCx} cy={atomCy} r="13" fill={`url(#${uid}-nuc)`} />
              <text x={atomCx} y={atomCy + 4} fill="#ffffff" fontSize="11" fontWeight="800" textAnchor="middle">
                +
              </text>

              {/* Sıçrama Parıltısı */}
              {flashAlpha > 0 && (
                <circle
                  cx={ex}
                  cy={ey}
                  r={10 + (1 - flashAlpha) * 16}
                  fill="none"
                  stroke={activeTransition.photonColor}
                  strokeWidth="2.5"
                  opacity={flashAlpha}
                />
              )}

              {/* Foton Dalgası */}
              {photonPath && (
                <g>
                  <path
                    d={photonPath}
                    fill="none"
                    stroke={activeTransition.photonColor}
                    strokeWidth="2.6"
                    strokeLinecap="round"
                  />
                  <text
                    x={
                      atomCx +
                      Math.cos(photonAngle) * (showAbsorptionWave ? absTailR - 14 : emHeadR - 12)
                    }
                    y={
                      atomCy +
                      Math.sin(photonAngle) * (showAbsorptionWave ? absTailR - 14 : emHeadR - 12) -
                      10
                    }
                    fill={activeTransition.photonColor}
                    fontSize="10.5"
                    fontWeight="800"
                    textAnchor="middle"
                  >
                    h·ν ({activeTransition.kind === 'absorption' ? 'Soğurulan' : 'Yayılan'} Foton)
                  </text>
                </g>
              )}

              {/* Elektron */}
              <circle
                cx={ex}
                cy={ey}
                r="7.5"
                fill="var(--info)"
                stroke="#ffffff"
                strokeWidth="1.8"
              />
              <text x={ex} y={ey + 3} fill="#ffffff" fontSize="8.5" fontWeight="800" textAnchor="middle">
                e⁻
              </text>

              {/* SAĞ PANEL: Enerji Düzeyleri & Atomik Çizgi Spektrumu */}
              <line x1="342" y1="24" x2="342" y2="310" stroke="var(--border)" strokeWidth="1" />

              <text x="488" y="20" fill="var(--muted)" fontSize="11.5" fontWeight="700" textAnchor="middle">
                Enerji Düzeyleri &amp; Çizgi Spektrumu
              </text>

              {([4, 3, 2, 1] as const).map((n) => {
                const y = energyYMap[n];
                const activeLevel = n === activeTransition.from || n === activeTransition.to;
                return (
                  <g key={n}>
                    <line
                      x1="382"
                      y1={y}
                      x2="585"
                      y2={y}
                      stroke={activeLevel ? activeTransition.photonColor : 'var(--border-2)'}
                      strokeWidth={activeLevel ? 2.2 : 1.3}
                    />
                    <text
                      x="375"
                      y={y + 4}
                      fill={activeLevel ? 'var(--text)' : 'var(--muted)'}
                      fontSize="10.5"
                      fontWeight="700"
                      textAnchor="end"
                    >
                      n={n}
                    </text>
                    <text
                      x="592"
                      y={y + 4}
                      fill="var(--muted)"
                      fontSize="10"
                      fontWeight="600"
                    >
                      {BOHR_ENERGY_EV[n].toFixed(2)} eV
                    </text>
                  </g>
                );
              })}

              {/* Geçiş Oku */}
              <line
                x1="482"
                y1={arrowY1}
                x2="482"
                y2={arrowY2}
                stroke={activeTransition.photonColor}
                strokeWidth="3"
              />
              {/* Ok Ucu */}
              <polygon
                points={
                  arrowY2 < arrowY1
                    ? `482,${arrowY2} 476,${arrowY2 + 10} 488,${arrowY2 + 10}`
                    : `482,${arrowY2} 476,${arrowY2 - 10} 488,${arrowY2 - 10}`
                }
                fill={activeTransition.photonColor}
              />
              <rect
                x="494"
                y={(arrowY1 + arrowY2) / 2 - 11}
                width="96"
                height="22"
                rx="6"
                fill="var(--card-2)"
                stroke={activeTransition.photonColor}
                strokeWidth="1"
              />
              <text
                x="542"
                y={(arrowY1 + arrowY2) / 2 + 4}
                fill="var(--text)"
                fontSize="10"
                fontWeight="800"
                textAnchor="middle"
              >
                {activeTransition.kind === 'absorption' ? '↑ Absorpsiyon' : '↓ Emisyon'}
              </text>

              {/* Atomik Çizgi Spektrumu Çubuğu */}
              <text x="364" y="236" fill="var(--text)" fontSize="11" fontWeight="700">
                Atomik {activeTransition.kind === 'emission' ? 'Emisyon' : 'Absorpsiyon'} Spektrumu
              </text>
              <rect
                x="364"
                y="246"
                width="256"
                height="34"
                rx="6"
                fill={activeTransition.kind === 'emission' ? '#0b0f19' : `url(#${uid}-spectrum)`}
                stroke="var(--border-2)"
                strokeWidth="1.5"
              />

              {/* Arka plan referans çizgileri */}
              {BOHR_TRANSITIONS.map((t) => {
                const lx = 368 + t.spectrumX * 246;
                const isThis = t.id === activeTransition.id;
                const lineColor =
                  activeTransition.kind === 'absorption' && isThis ? '#090c12' : t.photonColor;
                return (
                  <g key={t.id}>
                    <line
                      x1={lx}
                      y1="248"
                      x2={lx}
                      y2="278"
                      stroke={lineColor}
                      strokeWidth={isThis && spectrumBarLit ? 4.5 : 1.5}
                      opacity={isThis ? (spectrumBarLit ? 1 : 0.45) : activeTransition.kind === 'emission' ? 0.25 : 0}
                    />
                    {isThis && spectrumBarLit && (
                      <circle cx={lx} cy="292" r="4" fill={activeTransition.photonColor} />
                    )}
                  </g>
                );
              })}

              <text x="364" y="308" fill="var(--muted)" fontSize="9.5" fontWeight="600">
                Morötesi (Lyman)
              </text>
              <text x="505" y="308" fill="var(--muted)" fontSize="9.5" fontWeight="600">
                Görünür (Balmer) → Kırmızı
              </text>
            </svg>
          </div>

          {/* Alt Bilgi Kartları */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '10px'
            }}
          >
            <div style={infoBoxStyle}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)' }}>
                SERİ &amp; DALGA BOYU
              </div>
              <div style={{ fontWeight: 800, color: activeTransition.photonColor, marginTop: '2px' }}>
                {activeTransition.series} ({activeTransition.wavelength})
              </div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                {activeTransition.deltaE}
              </div>
            </div>
            <div style={infoBoxStyle}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)' }}>
                ÖSYM MANTIĞI
              </div>
              <div style={{ color: 'var(--text)', marginTop: '2px' }}>
                {activeTransition.explanation}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Mod 2: Aufbau, Hund & 24Cr / 29Cu İstisnası */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              <button
                type="button"
                className={`btn small ${symElement === 'Cr' ? 'primary' : 'secondary'}`}
                aria-pressed={symElement === 'Cr'}
                onClick={() => {
                  setSymElement('Cr');
                  setSymStep(0);
                  setSymPlaying(true);
                }}
              >
                ₂₄Cr (Krom — d⁵ Yarı Dolu)
              </button>
              <button
                type="button"
                className={`btn small ${symElement === 'Cu' ? 'primary' : 'secondary'}`}
                aria-pressed={symElement === 'Cu'}
                onClick={() => {
                  setSymElement('Cu');
                  setSymStep(0);
                  setSymPlaying(true);
                }}
              >
                ₂₉Cu (Bakır — d¹⁰ Tam Dolu)
              </button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              <button
                type="button"
                className="btn small ghost"
                onClick={() => setSymPlaying((p) => !p)}
              >
                {symPlaying ? '⏸ Duraklat' : '▶ Oynat'}
              </button>
              <button
                type="button"
                className="btn small secondary"
                onClick={() => {
                  setSymPlaying(false);
                  setSymStep((s) => (s >= 4 ? 0 : s + 1));
                }}
              >
                ⏭ Sonraki Adım ({symStep + 1}/5)
              </button>
              <button
                type="button"
                className="btn small ghost"
                onClick={() => {
                  setSymStep(0);
                  setSymPlaying(true);
                }}
              >
                ↺ Sıfırla
              </button>
            </div>
          </div>

          <div style={svgFrameStyle}>
            <svg
              viewBox="0 0 640 250"
              style={{ width: '100%', display: 'block' }}
              aria-label={`${symElement} orbital kutuları Aufbau ve küresel simetri animasyonu`}
            >
              {/* Üst Karşılaştırma Bandı */}
              <rect
                x="18"
                y="14"
                width="290"
                height="44"
                rx="9"
                fill="var(--card-2)"
                stroke="var(--border)"
              />
              <text x="30" y="32" fill="var(--muted)" fontSize="10.5" fontWeight="700">
                BEKLENEN (KÜRESEL SİMETRİ ÖNCESİ)
              </text>
              <text x="30" y="49" fill="var(--warn)" fontSize="13.5" fontWeight="800">
                {symElement === 'Cr' ? '[Ar] 4s² 3d⁴  (Kararsız)' : '[Ar] 4s² 3d⁹  (Kararsız)'}
              </text>

              <rect
                x="326"
                y="14"
                width="296"
                height="44"
                rx="9"
                fill={activeSymStep.isFinal ? 'var(--ok-soft)' : 'var(--card-2)'}
                stroke={activeSymStep.isFinal ? 'var(--ok)' : 'var(--border)'}
              />
              <text x="338" y="32" fill="var(--muted)" fontSize="10.5" fontWeight="700">
                GERÇEK TEMEL HAL (KÜRESEL SİMETRİ)
              </text>
              <text
                x="338"
                y="49"
                fill={activeSymStep.isFinal ? 'var(--ok)' : 'var(--text)'}
                fontSize="13.5"
                fontWeight="800"
              >
                {symElement === 'Cr' ? '[Ar] 4s¹ 3d⁵  (Yarı Dolu)' : '[Ar] 4s¹ 3d¹⁰  (Tam Dolu)'}
              </text>

              {/* [Ar] Çekirdek Kutusu */}
              <rect
                x="24"
                y="128"
                width="74"
                height="54"
                rx="10"
                fill="var(--card-2)"
                stroke="var(--border-2)"
                strokeWidth="1.6"
              />
              <text x="61" y="153" fill="var(--text)" fontSize="14" fontWeight="800" textAnchor="middle">
                [Ar]
              </text>
              <text x="61" y="170" fill="var(--muted)" fontSize="10" fontWeight="700" textAnchor="middle">
                18 e⁻ Tam
              </text>

              {/* 4s Orbital Kutusu */}
              <g>
                <rect
                  x="126"
                  y="128"
                  width="64"
                  height="54"
                  rx="10"
                  fill="var(--card-2)"
                  stroke={activeSymStep.isLeaping ? 'var(--warn)' : 'var(--info)'}
                  strokeWidth="2"
                />
                <text x="158" y="200" fill="var(--info)" fontSize="12" fontWeight="800" textAnchor="middle">
                  4s ({activeSymStep.fourS.length})
                </text>
                {activeSymStep.fourS.map((spin, idx) => (
                  <text
                    key={idx}
                    x={idx === 0 ? 147 : 169}
                    y="163"
                    fill={spin === 'up' ? 'var(--info)' : 'var(--warn)'}
                    fontSize="24"
                    fontWeight="800"
                    textAnchor="middle"
                  >
                    {spin === 'up' ? '↑' : '↓'}
                  </text>
                ))}
              </g>

              {/* 3d Orbital Kutuları (5 adet) */}
              <g>
                {[0, 1, 2, 3, 4].map((boxIdx) => {
                  const bx = 236 + boxIdx * 74;
                  const spins = activeSymStep.threeD[boxIdx];
                  const isTargetBox = boxIdx === 4 && activeSymStep.isLeaping;
                  return (
                    <g key={boxIdx}>
                      <rect
                        x={bx}
                        y="128"
                        width="66"
                        height="54"
                        rx="9"
                        fill={
                          activeSymStep.isFinal
                            ? 'var(--ok-soft)'
                            : isTargetBox
                              ? 'var(--warn-soft)'
                              : 'var(--card-2)'
                        }
                        stroke={
                          activeSymStep.isFinal
                            ? 'var(--ok)'
                            : isTargetBox
                              ? 'var(--warn)'
                              : 'var(--border-2)'
                        }
                        strokeWidth={isTargetBox || activeSymStep.isFinal ? 2.2 : 1.5}
                      />
                      {spins.map((spin, sIdx) => (
                        <text
                          key={sIdx}
                          x={spins.length === 1 ? bx + 33 : sIdx === 0 ? bx + 22 : bx + 44}
                          y="163"
                          fill={spin === 'up' ? 'var(--ok)' : 'var(--accent-2)'}
                          fontSize="24"
                          fontWeight="800"
                          textAnchor="middle"
                        >
                          {spin === 'up' ? '↑' : '↓'}
                        </text>
                      ))}
                      <text
                        x={bx + 33}
                        y="200"
                        fill="var(--muted)"
                        fontSize="10.5"
                        fontWeight="700"
                        textAnchor="middle"
                      >
                        mₗ = {boxIdx - 2}
                      </text>
                    </g>
                  );
                })}
                <text x="418" y="224" fill="var(--text)" fontSize="12" fontWeight="800" textAnchor="middle">
                  3d Orbitalleri ({activeSymStep.threeD.reduce((sum, b) => sum + b.length, 0)} e⁻)
                </text>
              </g>

              {/* 4s -> 3d Sıçrama Yayı */}
              {activeSymStep.isLeaping && (
                <g>
                  <path
                    d="M 168 124 Q 368 58 564 124"
                    fill="none"
                    stroke="var(--warn)"
                    strokeWidth="2.8"
                    strokeDasharray="6 4"
                  />
                  <polygon points="566,127 555,121 562,113" fill="var(--warn)" />
                  {/* Hareketli Sıçrayan Elektron Noktası */}
                  {(() => {
                    const t = symPulse;
                    const p0x = 168;
                    const p0y = 124;
                    const p1x = 368;
                    const p1y = 58;
                    const p2x = 564;
                    const p2y = 124;
                    const lx = (1 - t) * (1 - t) * p0x + 2 * (1 - t) * t * p1x + t * t * p2x;
                    const ly = (1 - t) * (1 - t) * p0y + 2 * (1 - t) * t * p1y + t * t * p2y;
                    return (
                      <g>
                        <circle cx={lx} cy={ly} r="8" fill="var(--warn)" stroke="#ffffff" strokeWidth="1.5" />
                        <text x={lx} y={ly + 3} fill="#090c12" fontSize="8" fontWeight="900" textAnchor="middle">
                          e⁻
                        </text>
                      </g>
                    );
                  })()}
                  <rect
                    x="275"
                    y="72"
                    width="192"
                    height="22"
                    rx="6"
                    fill="var(--warn-soft)"
                    stroke="var(--warn)"
                  />
                  <text x="371" y="87" fill="var(--warn)" fontSize="10.5" fontWeight="800" textAnchor="middle">
                    Küresel Simetri Sıçraması (4s¹ → 3d)
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Adım Açıklama & ÖSYM Tuzağı */}
          <div style={{ display: 'grid', gap: '8px' }}>
            <div style={infoBoxStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                <strong style={{ color: activeSymStep.isFinal ? 'var(--ok)' : 'var(--text)' }}>
                  {activeSymStep.title}
                </strong>
                <code style={{ fontWeight: 800, color: 'var(--info)' }}>{activeSymStep.configText}</code>
              </div>
              <div style={{ color: 'var(--muted)', marginTop: '4px' }}>{activeSymStep.subtitle}</div>
            </div>
            <div
              style={{
                ...infoBoxStyle,
                backgroundColor: 'var(--warn-soft)',
                borderColor: 'rgba(245, 165, 36, 0.35)'
              }}
            >
              <strong style={{ color: 'var(--warn)' }}>⚠️ ÖSYM Tuzağı: </strong>
              <span>
                ₂₄Cr (4s¹ 3d⁵) ve ₂₉Cu (4s¹ 3d¹⁰) dizilimleri <strong>uyarılmış hal DEĞİLDİR</strong>;
                doğal kararlı <strong>temel halleridir</strong>. s² d⁴ ve s² d⁹ kendiliğinden bu yapıya geçer.
              </span>
            </div>
          </div>
        </>
      )}

      {onPracticeTopic && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="button" className="btn small primary" onClick={onPracticeTopic}>
            🧬 Modern Atom Testini Çöz
          </button>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
 * 2. KOLİGATİF ÖZELLİKLER: BUHAR BASINCI DÜŞMESİ, KAYNAMA & OZMOZ SAHNESİ
 * ========================================================================== */

type ColligativeMode = 'vapor_boiling' | 'osmosis';
type SoluteOptionId = 'sugar' | 'nacl' | 'cacl2';

interface SoluteDef {
  id: SoluteOptionId;
  label: string;
  formula: string;
  vantHoff: 1 | 2 | 3;
  dissociation: string;
  vaporPressureMmHg: number;
  boilingPointC: number;
  deltaTk: number;
  ionColors: string[];
  ionLabels: string[];
}

const SOLUTE_OPTIONS: SoluteDef[] = [
  {
    id: 'sugar',
    label: '1 M Şeker (i = 1)',
    formula: 'C₆H₁₂O₆(suda)',
    vantHoff: 1,
    dissociation: 'C₆H₁₂O₆(k) → C₆H₁₂O₆(suda)  [Moleküler, iyonlaşmaz]',
    vaporPressureMmHg: 746,
    boilingPointC: 100.52,
    deltaTk: 0.52,
    ionColors: ['#f59e0b'],
    ionLabels: ['Ş']
  },
  {
    id: 'nacl',
    label: '1 M NaCl (i = 2)',
    formula: 'Na⁺ + Cl⁻',
    vantHoff: 2,
    dissociation: 'NaCl(k) → Na⁺(suda) + Cl⁻(suda)  [2 mol tanecik]',
    vaporPressureMmHg: 733,
    boilingPointC: 101.04,
    deltaTk: 1.04,
    ionColors: ['#a78bfa', '#30b575'],
    ionLabels: ['Na⁺', 'Cl⁻']
  },
  {
    id: 'cacl2',
    label: '1 M CaCl₂ (i = 3)',
    formula: 'Ca²⁺ + 2Cl⁻',
    vantHoff: 3,
    dissociation: 'CaCl₂(k) → Ca²⁺(suda) + 2Cl⁻(suda)  [3 mol tanecik]',
    vaporPressureMmHg: 720,
    boilingPointC: 101.56,
    deltaTk: 1.56,
    ionColors: ['#f59e0b', '#30b575', '#30b575'],
    ionLabels: ['Ca²⁺', 'Cl⁻', 'Cl⁻']
  }
];

export const ColligativeOsmosisScene: React.FC<SceneProps> = ({ onPracticeTopic }) => {
  const [mode, setMode] = useState<ColligativeMode>('vapor_boiling');
  const [soluteId, setSoluteId] = useState<SoluteOptionId>('nacl');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [timeSec, setTimeSec] = useState<number>(0);
  const [osmosisProgress, setOsmosisProgress] = useState<number>(0.25); // 0..1

  const lastRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      lastRef.current = null;
      return;
    }

    let rafId = 0;
    const tick = (now: number) => {
      if (lastRef.current !== null) {
        const dt = Math.min((now - lastRef.current) / 1000, 0.05);
        setTimeSec((prev) => (prev + dt) % 1000);
        if (mode === 'osmosis') {
          setOsmosisProgress((prev) => {
            const next = prev + dt * 0.09;
            return next >= 1 ? 1 : next;
          });
        }
      }
      lastRef.current = now;
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(rafId);
      lastRef.current = null;
    };
  }, [isPlaying, mode]);

  const activeSolute = SOLUTE_OPTIONS.find((s) => s.id === soluteId) ?? SOLUTE_OPTIONS[1];

  // Yüzey engelleyici iyon X konumları (i = 1 -> 2 engel, i = 2 -> 4 engel, i = 3 -> 6 engel)
  const blockerCount = activeSolute.vantHoff * 2;
  const surfaceBlockers = Array.from({ length: blockerCount }, (_, idx) => {
    const xStart = 392;
    const span = 186;
    const x = xStart + ((idx + 0.5) / blockerCount) * span + Math.sin(timeSec * 1.4 + idx) * 3;
    const y = 148 + Math.cos(timeSec * 1.8 + idx * 1.3) * 2.5;
    return {
      x,
      y,
      color: activeSolute.ionColors[idx % activeSolute.ionColors.length],
      label: activeSolute.ionLabels[idx % activeSolute.ionLabels.length]
    };
  });

  // Ozmoz sıvı seviyeleri
  const leftLiquidTop = 104 + osmosisProgress * 36;
  const rightLiquidTop = 104 - osmosisProgress * 36;

  return (
    <div style={cardSurfaceStyle}>
      {/* Başlık & Mod Seçici */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: 'var(--text)' }}>
            Koligatif Özellikler: Buharlaşma Engeli, Kaynama &amp; Ozmoz
          </h3>
          <p style={{ margin: '3px 0 0', fontSize: '12.5px', color: 'var(--muted)' }}>
            Uçucu olmayan tanecikler yüzeyden kaçışı engeller (P<sub>buhar</sub>↓, T<sub>k</sub>↑); ozmozda su seyreltikten derişiğe geçer.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          <button
            type="button"
            className={`btn small ${mode === 'vapor_boiling' ? 'primary' : 'secondary'}`}
            aria-pressed={mode === 'vapor_boiling'}
            onClick={() => setMode('vapor_boiling')}
          >
            Saf Su vs Tuzlu Su Buharlaşma Engeli
          </button>
          <button
            type="button"
            className={`btn small ${mode === 'osmosis' ? 'primary' : 'secondary'}`}
            aria-pressed={mode === 'osmosis'}
            onClick={() => {
              setMode('osmosis');
              setIsPlaying(true);
            }}
          >
            Yarı Geçirgen Zar &amp; Ozmoz
          </button>
        </div>
      </div>

      {mode === 'vapor_boiling' ? (
        <>
          {/* Van't Hoff Çözünen Seçici & Oynat/Duraklat */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {SOLUTE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`btn small ${opt.id === soluteId ? 'primary' : 'secondary'}`}
                  aria-pressed={opt.id === soluteId}
                  onClick={() => setSoluteId(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="btn small ghost"
              onClick={() => setIsPlaying((p) => !p)}
            >
              {isPlaying ? '⏸ Duraklat' : '▶ Oynat'}
            </button>
          </div>

          {/* İkiz Beher SVG */}
          <div style={svgFrameStyle}>
            <svg
              viewBox="0 0 640 310"
              style={{ width: '100%', display: 'block' }}
              aria-label="Saf su ve çözelti buharlaşma engeli karşılaştırması"
            >
              {/* SOL BEHER: Saf Su */}
              <g>
                <text x="155" y="22" fill="var(--info)" fontSize="13" fontWeight="800" textAnchor="middle">
                  SAF SU (100 °C)
                </text>
                <text x="155" y="38" fill="var(--ok)" fontSize="11" fontWeight="700" textAnchor="middle">
                  P_buhar = 760 mmHg (Kaynıyor!) • i = 0
                </text>

                {/* Beher kabı */}
                <rect
                  x="50"
                  y="146"
                  width="210"
                  height="118"
                  rx="8"
                  fill="rgba(77, 171, 247, 0.14)"
                  stroke="none"
                />
                <path
                  d="M 48 64 L 48 264 Q 48 270 54 270 L 256 270 Q 262 270 262 264 L 262 64"
                  fill="none"
                  stroke="var(--border-2)"
                  strokeWidth="2.5"
                />
                <line x1="50" y1="146" x2="260" y2="146" stroke="var(--info)" strokeWidth="2" strokeDasharray="5 3" />

                {/* Saf su: bolca kaçan H2O buhar taneciği */}
                {[0, 1, 2, 3, 4, 5].map((idx) => {
                  const u = (timeSec * 0.65 + idx * 0.17) % 1;
                  const x = 72 + idx * 32 + Math.sin(u * 8 + idx) * 5;
                  const y = lerp(168, 56, u);
                  const opacity = u > 0.8 ? (1 - u) * 5 : 1;
                  return (
                    <g key={idx} opacity={opacity}>
                      <circle cx={x} cy={y} r="6.5" fill="var(--info)" />
                      <circle cx={x - 5} cy={y - 5} r="2.6" fill="#ffffff" />
                      <circle cx={x + 5} cy={y - 5} r="2.6" fill="#ffffff" />
                    </g>
                  );
                })}

                {/* Sıvı içi H2O tanecikleri */}
                {[0, 1, 2, 3, 4].map((idx) => {
                  const bx = 76 + idx * 38 + Math.sin(timeSec * 2 + idx) * 4;
                  const by = 200 + (idx % 2) * 28 + Math.cos(timeSec * 2.2 + idx) * 4;
                  return (
                    <g key={idx}>
                      <circle cx={bx} cy={by} r="6.5" fill="var(--info)" opacity="0.75" />
                      <circle cx={bx - 5} cy={by - 5} r="2.5" fill="#ffffff" opacity="0.85" />
                      <circle cx={bx + 5} cy={by - 5} r="2.5" fill="#ffffff" opacity="0.85" />
                    </g>
                  );
                })}

                <rect x="70" y="278" width="170" height="22" rx="6" fill="var(--ok-soft)" stroke="var(--ok)" />
                <text x="155" y="293" fill="var(--ok)" fontSize="11" fontWeight="800" textAnchor="middle">
                  T_kaynama = 100.00 °C
                </text>
              </g>

              {/* ORTA AYRAÇ */}
              <line x1="320" y1="24" x2="320" y2="296" stroke="var(--border)" strokeDasharray="4 4" />

              {/* SAĞ BEHER: Çözelti */}
              <g>
                <text x="485" y="22" fill="var(--warn)" fontSize="13" fontWeight="800" textAnchor="middle">
                  {activeSolute.label.toUpperCase()} (100 °C)
                </text>
                <text x="485" y="38" fill="var(--accent-2)" fontSize="11" fontWeight="700" textAnchor="middle">
                  P_buhar = {activeSolute.vaporPressureMmHg} mmHg (&lt; 760) • i = {activeSolute.vantHoff}
                </text>

                {/* Beher kabı */}
                <rect
                  x="380"
                  y="146"
                  width="210"
                  height="118"
                  rx="8"
                  fill="rgba(245, 165, 36, 0.12)"
                  stroke="none"
                />
                <path
                  d="M 378 64 L 378 264 Q 378 270 384 270 L 586 270 Q 592 270 592 264 L 592 64"
                  fill="none"
                  stroke="var(--border-2)"
                  strokeWidth="2.5"
                />
                <line x1="380" y1="146" x2="590" y2="146" stroke="var(--warn)" strokeWidth="2" strokeDasharray="5 3" />

                {/* Az sayıda kaçabilen buhar (i arttıkça azalır) */}
                {Array.from({ length: Math.max(1, 4 - activeSolute.vantHoff) }, (_, idx) => {
                  const u = (timeSec * 0.48 + idx * 0.34) % 1;
                  const x = 418 + idx * 64 + Math.sin(u * 6 + idx) * 4;
                  const y = lerp(142, 62, u);
                  const opacity = u > 0.78 ? (1 - u) * 4.5 : 1;
                  return (
                    <g key={idx} opacity={opacity}>
                      <circle cx={x} cy={y} r="6" fill="var(--info)" />
                      <circle cx={x - 4.5} cy={y - 4.5} r="2.4" fill="#ffffff" />
                      <circle cx={x + 4.5} cy={y - 4.5} r="2.4" fill="#ffffff" />
                    </g>
                  );
                })}

                {/* Yüzey engelleyici iyonlara çarpıp geri dönen H2O molekülleri */}
                {surfaceBlockers.map((blk, idx) => {
                  const bouncePhase = (timeSec * 0.9 + idx * 0.25) % 1;
                  // 0..0.5 yukarı çıkar, 0.5..1 geri seker
                  const tri = bouncePhase < 0.5 ? bouncePhase * 2 : (1 - bouncePhase) * 2;
                  const wy = lerp(228, blk.y + 15, tri);
                  return (
                    <g key={`b-${idx}`}>
                      <circle cx={blk.x} cy={wy} r="5.5" fill="var(--info)" opacity="0.85" />
                      <circle cx={blk.x - 4} cy={wy - 4} r="2.2" fill="#ffffff" />
                      <circle cx={blk.x + 4} cy={wy - 4} r="2.2" fill="#ffffff" />
                      {bouncePhase > 0.42 && bouncePhase < 0.58 && (
                        <text x={blk.x} y={blk.y - 14} fill="var(--accent-2)" fontSize="9.5" fontWeight="900" textAnchor="middle">
                          ✕ Engel
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Yüzeyde oturan Na+ / Cl- / Şeker / Ca2+ tanecikleri */}
                {surfaceBlockers.map((blk, idx) => (
                  <g key={`ion-${idx}`}>
                    <circle cx={blk.x} cy={blk.y} r="10.5" fill={blk.color} stroke="#ffffff" strokeWidth="1.2" />
                    <text x={blk.x} y={blk.y + 3.5} fill="#090c12" fontSize="8" fontWeight="900" textAnchor="middle">
                      {blk.label}
                    </text>
                  </g>
                ))}

                {/* Sıvı içinde çözünen tanecikler */}
                {[0, 1, 2].map((idx) => {
                  const ix = 418 + idx * 65 + Math.cos(timeSec * 1.5 + idx) * 6;
                  const iy = 236 + Math.sin(timeSec * 1.7 + idx) * 6;
                  const col = activeSolute.ionColors[idx % activeSolute.ionColors.length];
                  const lbl = activeSolute.ionLabels[idx % activeSolute.ionLabels.length];
                  return (
                    <g key={`bulk-${idx}`}>
                      <circle cx={ix} cy={iy} r="9" fill={col} opacity="0.88" />
                      <text x={ix} y={iy + 3} fill="#090c12" fontSize="7.5" fontWeight="900" textAnchor="middle">
                        {lbl}
                      </text>
                    </g>
                  );
                })}

                <rect x="392" y="278" width="186" height="22" rx="6" fill="var(--warn-soft)" stroke="var(--warn)" />
                <text x="485" y="293" fill="var(--warn)" fontSize="11" fontWeight="800" textAnchor="middle">
                  T_kaynama = {activeSolute.boilingPointC.toFixed(2)} °C (+{activeSolute.deltaTk.toFixed(2)})
                </text>
              </g>
            </svg>
          </div>

          {/* Canlı Van't Hoff (i) Karşılaştırma Şeridi */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))',
              gap: '8px'
            }}
          >
            {SOLUTE_OPTIONS.map((opt) => {
              const selected = opt.id === soluteId;
              return (
                <div
                  key={opt.id}
                  style={{
                    ...infoBoxStyle,
                    borderColor: selected ? 'var(--warn)' : 'var(--border)',
                    backgroundColor: selected ? 'var(--warn-soft)' : 'var(--card)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: 'var(--text)' }}>{opt.label}</strong>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '1px 7px',
                        borderRadius: '999px',
                        backgroundColor: 'var(--card-2)',
                        color: 'var(--warn)'
                      }}
                    >
                      i = {opt.vantHoff}
                    </span>
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--muted)', marginTop: '3px' }}>
                    P<sub>buhar</sub>: <strong>{opt.vaporPressureMmHg} mmHg</strong> • T<sub>k</sub>:{' '}
                    <strong>{opt.boilingPointC.toFixed(2)} °C</strong>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={infoBoxStyle}>
            <strong>{activeSolute.dissociation}</strong> — Formül: <code>ΔTₖ = Kₖ · m · i</code> (1 molal sulu çözeltide i arttıkça yüzeydeki engel artar, buhar basıncı daha çok düşer ve kaynama noktası daha çok yükselir).
          </div>
        </>
      ) : (
        <>
          {/* Mod 2: Yarı Geçirgen Zar & Ozmoz */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn small ghost"
                onClick={() => setIsPlaying((p) => !p)}
              >
                {isPlaying ? '⏸ Duraklat' : '▶ Oynat'}
              </button>
              <button
                type="button"
                className="btn small ghost"
                onClick={() => {
                  setOsmosisProgress(0);
                  setIsPlaying(true);
                }}
              >
                ↺ Sıfırla
              </button>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--muted)' }}>
              <span>Ozmoz İlerlemesi:</span>
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(osmosisProgress * 100)}
                onChange={(e) => {
                  setIsPlaying(false);
                  setOsmosisProgress(Number(e.target.value) / 100);
                }}
              />
              <strong style={{ color: 'var(--text)', minWidth: '38px' }}>
                %{Math.round(osmosisProgress * 100)}
              </strong>
            </label>
          </div>

          <div style={svgFrameStyle}>
            <svg
              viewBox="0 0 640 295"
              style={{ width: '100%', display: 'block' }}
              aria-label="Yarı geçirgen zar ve ozmoz su akışı animasyonu"
            >
              {/* Başlıklar */}
              <text x="165" y="22" fill="var(--info)" fontSize="13" fontWeight="800" textAnchor="middle">
                SEYRELTİK ÇÖZELTİ (Çok Su)
              </text>
              <text x="475" y="22" fill="var(--warn)" fontSize="13" fontWeight="800" textAnchor="middle">
                DERİŞİK ÇÖZELTİ (Az Su, Çok Çözünen)
              </text>

              {/* Sol Sıvı */}
              <rect
                x="44"
                y={leftLiquidTop}
                width="270"
                height={264 - leftLiquidTop}
                fill="rgba(77, 171, 247, 0.22)"
              />
              {/* Sağ Sıvı */}
              <rect
                x="326"
                y={rightLiquidTop}
                width="270"
                height={264 - rightLiquidTop}
                fill="rgba(245, 165, 36, 0.22)"
              />

              {/* Dış Kap Çerçevesi */}
              <path
                d="M 42 48 L 42 266 L 598 266 L 598 48"
                fill="none"
                stroke="var(--border-2)"
                strokeWidth="3"
              />

              {/* Yarı Geçirgen Zar (Gözenekli Kesikli Duvar) */}
              <line
                x1="320"
                y1="48"
                x2="320"
                y2="266"
                stroke="var(--ok)"
                strokeWidth="5"
                strokeDasharray="12 10"
              />
              <rect x="252" y="32" width="136" height="20" rx="6" fill="var(--ok-soft)" stroke="var(--ok)" />
              <text x="320" y="45" fill="var(--ok)" fontSize="10" fontWeight="800" textAnchor="middle">
                Yarı Geçirgen Zar
              </text>

              {/* Zardan Net Su Geçişi (Seyreltik -> Derişik) */}
              {[0, 1, 2, 3].map((idx) => {
                const u = (timeSec * 0.55 + idx * 0.25) % 1;
                const x = lerp(245, 395, u);
                const y = 148 + idx * 28;
                return (
                  <g key={`flow-${idx}`}>
                    <circle cx={x} cy={y} r="6" fill="var(--info)" stroke="#ffffff" strokeWidth="1" />
                    <text x={x} y={y - 9} fill="var(--info)" fontSize="9" fontWeight="800" textAnchor="middle">
                      H₂O →
                    </text>
                  </g>
                );
              })}

              {/* Sol tarafta az sayıda çözünen + bol su */}
              {[0, 1, 2, 3, 4].map((idx) => {
                const wx = 82 + idx * 42 + Math.sin(timeSec * 1.6 + idx) * 6;
                const wy = Math.max(leftLiquidTop + 18, 175 + (idx % 2) * 38);
                return <circle key={`lw-${idx}`} cx={wx} cy={wy} r="5.5" fill="var(--info)" opacity="0.85" />;
              })}
              <circle cx="135" cy="224" r="11" fill="var(--warn)" opacity="0.85" />

              {/* Sağ tarafta büyük çözünen tanecikler (zardan geçemez!) */}
              {[0, 1, 2, 3, 4, 5].map((idx) => {
                const sx = 356 + (idx % 3) * 78 + Math.cos(timeSec * 1.4 + idx) * 6;
                const sy = Math.max(rightLiquidTop + 20, 138 + Math.floor(idx / 3) * 62);
                return (
                  <g key={`rs-${idx}`}>
                    <circle cx={sx} cy={sy} r="12" fill="var(--warn)" stroke="#ffffff" strokeWidth="1.2" />
                    <text x={sx} y={sy + 3.5} fill="#090c12" fontSize="8" fontWeight="900" textAnchor="middle">
                      Na⁺
                    </text>
                  </g>
                );
              })}

              {/* Hidrostatik Yükseklik Farkı (Δh) */}
              {osmosisProgress > 0.08 && (
                <g>
                  <line
                    x1="564"
                    y1={rightLiquidTop}
                    x2="564"
                    y2={leftLiquidTop}
                    stroke="var(--accent-2)"
                    strokeWidth="2.5"
                  />
                  <line x1="554" y1={rightLiquidTop} x2="574" y2={rightLiquidTop} stroke="var(--accent-2)" strokeWidth="2" />
                  <line x1="554" y1={leftLiquidTop} x2="574" y2={leftLiquidTop} stroke="var(--accent-2)" strokeWidth="2" />
                  <text x="550" y={(rightLiquidTop + leftLiquidTop) / 2 + 4} fill="var(--accent-2)" fontSize="11" fontWeight="800" textAnchor="end">
                    Δh (Ozmotik Basınç)
                  </text>
                </g>
              )}

              {/* Net Akış Yönü Bandı */}
              <rect x="192" y="270" width="256" height="20" rx="6" fill="var(--info-soft)" stroke="var(--info)" />
              <text x="320" y="284" fill="var(--info)" fontSize="10.5" fontWeight="800" textAnchor="middle">
                Net Su Akışı: Seyreltik ───▶ Derişik
              </text>
            </svg>
          </div>

          <div style={infoBoxStyle}>
            <strong style={{ color: 'var(--ok)' }}>💡 Ozmoz Özeti: </strong>
            Yarı geçirgen zar büyük çözünen tanecikleri geçirmez, yalnızca <strong>su moleküllerini</strong> geçirir. Su derişiminin fazla olduğu <strong>seyreltik</strong> bölmeden <strong>derişik</strong> bölmeye net su geçişi olur ve sağdaki sıvı sütunu yükselir.
          </div>
        </>
      )}

      {onPracticeTopic && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="button" className="btn small primary" onClick={onPracticeTopic}>
            💧 Çözeltiler Testini Çöz
          </button>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
 * 3. ASİT–BAZ NÖTRALLEŞME & TİTRASYON EĞRİSİ (HCl + NaOH, FENOLFTALEİN) SAHNESİ
 * ========================================================================== */

/**
 * 25.0 mL 0.10 M HCl üzerine V mL 0.10 M NaOH eklendiğindeki tam pH değeri.
 */
function computeTitrationPH(vNaOH: number): number {
  const va = 25;
  const ca = 0.1;
  const cb = 0.1;
  const kw = 1e-14;
  const totalV = va + vNaOH;
  const delta = (ca * va - cb * vNaOH) / totalV;
  const hPlus = (delta + Math.sqrt(delta * delta + 4 * kw)) / 2;
  const ph = -Math.log10(Math.max(hPlus, 1e-14));
  return clamp(ph, 0, 14);
}

function getIndicatorAppearance(vNaOH: number, ph: number): {
  fill: string;
  label: string;
  badgeColor: string;
} {
  if (ph < 6.95 && vNaOH < 24.9) {
    return {
      fill: 'rgba(116, 192, 252, 0.24)',
      label: 'Renksiz (Asidik Ortam)',
      badgeColor: 'var(--info)'
    };
  }
  if (Math.abs(vNaOH - 25) <= 0.5 || (ph >= 6.95 && ph <= 9.2)) {
    return {
      fill: 'rgba(244, 114, 182, 0.42)',
      label: 'Soluk Pembe (Dönüm / Eşdeğerlik)',
      badgeColor: '#ec4899'
    };
  }
  return {
    fill: 'rgba(219, 39, 119, 0.72)',
    label: 'Koyu Pembe / Fuşya (Bazik Ortam)',
    badgeColor: '#db2777'
  };
}

export const AcidBaseTitrationScene: React.FC<SceneProps> = ({ onPracticeTopic }) => {
  const [addedNaOH, setAddedNaOH] = useState<number>(12.5);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [dropPhase, setDropPhase] = useState<number>(0);

  const lastRef = useRef<number | null>(null);

  useEffect(() => {
    let rafId = 0;
    const tick = (now: number) => {
      if (lastRef.current !== null) {
        const dt = Math.min((now - lastRef.current) / 1000, 0.05);
        setDropPhase((prev) => (prev + dt * (isPlaying ? 1.8 : 0.65)) % 1);
        if (isPlaying) {
          setAddedNaOH((prev) => {
            const next = prev + dt * 3.6;
            if (next >= 50) {
              setIsPlaying(false);
              return 50;
            }
            return next;
          });
        }
      }
      lastRef.current = now;
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(rafId);
      lastRef.current = null;
    };
  }, [isPlaying]);

  const roundedV = Math.round(addedNaOH * 10) / 10;
  const currentPH = computeTitrationPH(addedNaOH);
  const indicator = getIndicatorAppearance(addedNaOH, currentPH);

  // Tam S-eğrisi (0 -> 50 mL)
  const plotLeft = 368;
  const plotRight = 626;
  const plotTop = 36;
  const plotBottom = 266;
  const plotW = plotRight - plotLeft;
  const plotH = plotBottom - plotTop;

  const toPlotX = (v: number) => plotLeft + (clamp(v, 0, 50) / 50) * plotW;
  const toPlotY = (ph: number) => plotBottom - (clamp(ph, 0, 14) / 14) * plotH;

  const fullCurvePoints = useMemo(() => {
    const vols: number[] = [];
    for (let v = 0; v <= 50; v += 0.5) {
      if (v === 24.5) {
        vols.push(24.5, 24.9, 25.0, 25.1);
      } else {
        vols.push(v);
      }
    }
    return vols.map((v) => ({ v, ph: computeTitrationPH(v) }));
  }, []);

  const fullCurvePath = useMemo(() => {
    return fullCurvePoints
      .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${toPlotX(pt.v).toFixed(1)} ${toPlotY(pt.ph).toFixed(1)}`)
      .join(' ');
  }, [fullCurvePoints]);

  const activeCurvePath = useMemo(() => {
    const filtered = fullCurvePoints.filter((pt) => pt.v <= addedNaOH);
    const pts = [...filtered, { v: addedNaOH, ph: currentPH }];
    return pts
      .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${toPlotX(pt.v).toFixed(1)} ${toPlotY(pt.ph).toFixed(1)}`)
      .join(' ');
  }, [fullCurvePoints, addedNaOH, currentPH]);

  // İyon sayıları (0..5 ölçekli görsel temsil; 25 mL = 5 birim)
  const hIonCount = addedNaOH < 25 ? Math.max(0, Math.round(((25 - addedNaOH) / 25) * 5)) : 0;
  const ohIonCount = addedNaOH > 25 ? Math.max(0, Math.round(((addedNaOH - 25) / 25) * 5)) : 0;
  const naIonCount = Math.round((addedNaOH / 50) * 8);
  const waterFormedPairs = Math.round((Math.min(addedNaOH, 25) / 25) * 5);

  const buretteLiquidTop = 28 + (addedNaOH / 50) * 66;
  const flaskLiquidTop = 218 - (addedNaOH / 50) * 18;

  return (
    <div style={cardSurfaceStyle}>
      {/* Başlık */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: 'var(--text)' }}>
            Asit–Baz Nötralleşme &amp; Titrasyon Eğrisi (HCl + NaOH, Fenolftalein)
          </h3>
          <p style={{ margin: '3px 0 0', fontSize: '12.5px', color: 'var(--muted)' }}>
            25 mL 0.1 M HCl çözeltisine büretten 0.1 M NaOH damlatıldıkça pH sıçramasını ve renk değişimini izle.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          <button
            type="button"
            className="btn small primary"
            onClick={() => {
              if (addedNaOH >= 50) setAddedNaOH(0);
              setIsPlaying((p) => !p);
            }}
          >
            {isPlaying ? '⏸ Duraklat' : '▶ Damlatmayı Başlat'}
          </button>
          <button
            type="button"
            className="btn small ghost"
            onClick={() => {
              setIsPlaying(false);
              setAddedNaOH(0);
            }}
          >
            ↺ Sıfırla (0 mL)
          </button>
        </div>
      </div>

      {/* Hacim Slider & Hızlı Durak Butonları */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px'
        }}
      >
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flex: '1 1 260px',
            fontSize: '13px',
            fontWeight: 700,
            color: 'var(--text)'
          }}
        >
          <span>Eklenen NaOH:</span>
          <input
            type="range"
            min={0}
            max={50}
            step={0.5}
            value={addedNaOH}
            style={{ flex: 1 }}
            aria-label="Eklenen NaOH hacmi (mL)"
            onChange={(e) => {
              setIsPlaying(false);
              setAddedNaOH(Number(e.target.value));
            }}
          />
          <span style={{ color: 'var(--info)', minWidth: '64px', textAlign: 'right' }}>
            {roundedV.toFixed(1)} mL
          </span>
        </label>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {[
            { v: 0, label: '0 mL (Asidik)' },
            { v: 12.5, label: '12.5 mL' },
            { v: 25, label: '25.0 mL (Eşdeğerlik)' },
            { v: 35, label: '35.0 mL (Bazik)' }
          ].map((preset) => (
            <button
              key={preset.v}
              type="button"
              className={`btn small ${Math.abs(addedNaOH - preset.v) < 0.3 ? 'primary' : 'secondary'}`}
              onClick={() => {
                setIsPlaying(false);
                setAddedNaOH(preset.v);
              }}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Büret + Erlenmeyer + S-Eğrisi SVG */}
      <div style={svgFrameStyle}>
        <svg
          viewBox="0 0 650 310"
          style={{ width: '100%', display: 'block' }}
          aria-label="Asit baz titrasyon düzeneği ve pH hacim eğrisi"
        >
          {/* SOL BÖLÜM: Büret & Erlenmeyer */}
          <text x="155" y="18" fill="var(--muted)" fontSize="11.5" fontWeight="700" textAnchor="middle">
            Büret (0.1 M NaOH) → Erlenmeyer (25 mL 0.1 M HCl)
          </text>

          {/* Büret Gövdesi */}
          <rect
            x="141"
            y="26"
            width="28"
            height="84"
            rx="3"
            fill="var(--card-2)"
            stroke="var(--border-2)"
            strokeWidth="1.8"
          />
          <rect
            x="143"
            y={buretteLiquidTop}
            width="24"
            height={Math.max(4, 108 - buretteLiquidTop)}
            fill="rgba(77, 171, 247, 0.38)"
          />
          {/* Büret musluğu & ucu */}
          <rect x="148" y="110" width="14" height="12" rx="2" fill="var(--border-2)" />
          <line x1="138" y1="116" x2="172" y2="116" stroke="var(--warn)" strokeWidth="3" strokeLinecap="round" />
          <polygon points="152,122 158,122 156,134 154,134" fill="var(--border-2)" />

          {/* Düşen NaOH Damlası */}
          {addedNaOH < 50 && (isPlaying || addedNaOH > 0) && (
            <circle
              cx="155"
              cy={lerp(137, flaskLiquidTop - 6, dropPhase)}
              r="3.8"
              fill="var(--info)"
              opacity={dropPhase > 0.9 ? 0.3 : 0.95}
            />
          )}

          {/* Erlenmeyer Sıvı Dolgusu (Renk geçişli!) */}
          <path
            d={`M ${155 - (flaskLiquidTop - 165) * 0.65} ${flaskLiquidTop} L ${155 + (flaskLiquidTop - 165) * 0.65} ${flaskLiquidTop} L 234 274 Q 238 282 228 282 L 82 282 Q 72 282 76 274 Z`}
            fill={indicator.fill}
          />
          {/* Erlenmeyer Cam Çerçeve */}
          <path
            d="M 138 148 L 138 172 L 74 274 Q 70 284 82 284 L 228 284 Q 240 284 236 274 L 172 172 L 172 148"
            fill="none"
            stroke="var(--border-2)"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />

          {/* Erlenmeyer İçindeki İyonlar */}
          {/* Cl⁻ (Seyirci - 5 adet yeşil) */}
          {[0, 1, 2, 3, 4].map((idx) => (
            <g key={`cl-${idx}`}>
              <circle
                cx={96 + idx * 29 + Math.sin(dropPhase * 6.28 + idx) * 2.5}
                cy={262 - (idx % 2) * 14}
                r="7"
                fill="var(--ok)"
                opacity="0.85"
              />
              <text
                x={96 + idx * 29 + Math.sin(dropPhase * 6.28 + idx) * 2.5}
                y={265 - (idx % 2) * 14}
                fill="#090c12"
                fontSize="7"
                fontWeight="900"
                textAnchor="middle"
              >
                Cl⁻
              </text>
            </g>
          ))}

          {/* Na⁺ (Eklenen baz kadar artar) */}
          {Array.from({ length: naIonCount }, (_, idx) => (
            <g key={`na-${idx}`}>
              <circle
                cx={98 + (idx % 4) * 35 + Math.cos(dropPhase * 6.28 + idx) * 2.5}
                cy={236 + Math.floor(idx / 4) * 18}
                r="6.5"
                fill="#a78bfa"
              />
              <text
                x={98 + (idx % 4) * 35 + Math.cos(dropPhase * 6.28 + idx) * 2.5}
                y={239 + Math.floor(idx / 4) * 18}
                fill="#090c12"
                fontSize="6.5"
                fontWeight="900"
                textAnchor="middle"
              >
                Na⁺
              </text>
            </g>
          ))}

          {/* Fazla H⁺ iyonları (V < 25) */}
          {Array.from({ length: hIonCount }, (_, idx) => (
            <g key={`h-${idx}`}>
              <circle cx={108 + idx * 24} cy={222} r="6.5" fill="var(--accent)" />
              <text x={108 + idx * 24} y={225} fill="#ffffff" fontSize="7" fontWeight="900" textAnchor="middle">
                H⁺
              </text>
            </g>
          ))}

          {/* Fazla OH⁻ iyonları (V > 25) */}
          {Array.from({ length: ohIonCount }, (_, idx) => (
            <g key={`oh-${idx}`}>
              <circle cx={108 + idx * 24} cy={222} r="7" fill="var(--info)" />
              <text x={108 + idx * 24} y={224.5} fill="#090c12" fontSize="6.3" fontWeight="900" textAnchor="middle">
                OH⁻
              </text>
            </g>
          ))}

          {/* Oluşan H2O bilgisi */}
          <text x="155" y="300" fill="var(--muted)" fontSize="10.5" fontWeight="700" textAnchor="middle">
            Nötralleşen: {waterFormedPairs} birim H₂O (H⁺ + OH⁻ → H₂O)
          </text>

          {/* ORTA AYRAÇ */}
          <line x1="305" y1="20" x2="305" y2="296" stroke="var(--border)" strokeDasharray="4 4" />

          {/* SAĞ BÖLÜM: Canlı Titrasyon pH-V S-Eğrisi */}
          <text x="495" y="18" fill="var(--muted)" fontSize="11.5" fontWeight="700" textAnchor="middle">
            Canlı Titrasyon pH–V Eğrisi (Fenolftalein: pH 8.2–10.0)
          </text>

          {/* Fenolftalein Renk Değişim Bandı */}
          <rect
            x={plotLeft}
            y={toPlotY(10)}
            width={plotW}
            height={toPlotY(8.2) - toPlotY(10)}
            fill="rgba(236, 72, 153, 0.14)"
          />
          <text x={plotRight - 4} y={toPlotY(9.1) + 3} fill="#ec4899" fontSize="8.5" fontWeight="700" textAnchor="end">
            Fenolftalein Aralığı
          </text>

          {/* Eksenler */}
          <line x1={plotLeft} y1={plotTop} x2={plotLeft} y2={plotBottom} stroke="var(--border-2)" strokeWidth="1.6" />
          <line x1={plotLeft} y1={plotBottom} x2={plotRight} y2={plotBottom} stroke="var(--border-2)" strokeWidth="1.6" />

          {/* Y Eksen Etiketleri */}
          {[0, 2, 4, 7, 10, 12, 14].map((phTick) => {
            const ty = toPlotY(phTick);
            return (
              <g key={phTick}>
                <line
                  x1={plotLeft - 4}
                  y1={ty}
                  x2={plotRight}
                  y2={ty}
                  stroke={phTick === 7 ? 'var(--warn)' : 'var(--border)'}
                  strokeDasharray={phTick === 7 ? '4 3' : '2 4'}
                  opacity={phTick === 7 ? 0.7 : 0.45}
                />
                <text x={plotLeft - 8} y={ty + 3} fill="var(--muted)" fontSize="9.5" textAnchor="end">
                  {phTick}
                </text>
              </g>
            );
          })}
          <text x={plotLeft - 24} y={(plotTop + plotBottom) / 2} fill="var(--muted)" fontSize="10.5" fontWeight="700" textAnchor="middle">
            pH
          </text>

          {/* X Eksen Etiketleri */}
          {[0, 10, 20, 25, 30, 40, 50].map((vTick) => {
            const tx = toPlotX(vTick);
            return (
              <g key={vTick}>
                <line
                  x1={tx}
                  y1={plotBottom}
                  x2={tx}
                  y2={plotBottom + 4}
                  stroke="var(--border-2)"
                />
                {vTick === 25 && (
                  <line
                    x1={tx}
                    y1={plotTop}
                    x2={tx}
                    y2={plotBottom}
                    stroke="var(--warn)"
                    strokeDasharray="4 3"
                    opacity="0.7"
                  />
                )}
                <text
                  x={tx}
                  y={plotBottom + 15}
                  fill={vTick === 25 ? 'var(--warn)' : 'var(--muted)'}
                  fontSize="9.5"
                  fontWeight={vTick === 25 ? 800 : 600}
                  textAnchor="middle"
                >
                  {vTick}
                </text>
              </g>
            );
          })}
          <text x={(plotLeft + plotRight) / 2} y="299" fill="var(--muted)" fontSize="10" fontWeight="700" textAnchor="middle">
            Eklenen 0.1 M NaOH Hacmi (mL)
          </text>

          {/* Eşdeğerlik Noktası İşaretçisi (25 mL, pH 7) */}
          <circle cx={toPlotX(25)} cy={toPlotY(7)} r="4" fill="var(--warn)" />
          <text x={toPlotX(25) + 6} y={toPlotY(7) + 4} fill="var(--warn)" fontSize="9" fontWeight="800">
            Eşdeğerlik (25 mL, pH 7)
          </text>

          {/* Arka Plan S-Eğrisi */}
          <path d={fullCurvePath} fill="none" stroke="var(--border-2)" strokeWidth="2" opacity="0.55" />

          {/* Aktif Çizilen S-Eğrisi */}
          <path d={activeCurvePath} fill="none" stroke="var(--accent-2)" strokeWidth="3" strokeLinecap="round" />

          {/* Hareketli İzleyici Nokta */}
          <circle
            cx={toPlotX(addedNaOH)}
            cy={toPlotY(currentPH)}
            r="6.5"
            fill={indicator.badgeColor}
            stroke="#ffffff"
            strokeWidth="2"
          />
          <rect
            x={clamp(toPlotX(addedNaOH) - 34, plotLeft + 4, plotRight - 74)}
            y={clamp(toPlotY(currentPH) - 28, plotTop + 2, plotBottom - 26)}
            width="70"
            height="20"
            rx="6"
            fill="var(--card-2)"
            stroke={indicator.badgeColor}
          />
          <text
            x={clamp(toPlotX(addedNaOH) - 34, plotLeft + 4, plotRight - 74) + 35}
            y={clamp(toPlotY(currentPH) - 28, plotTop + 2, plotBottom - 26) + 13.5}
            fill="var(--text)"
            fontSize="10"
            fontWeight="800"
            textAnchor="middle"
          >
            pH {currentPH.toFixed(2)}
          </text>
        </svg>
      </div>

      {/* Canlı Telemetri Kartları */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))',
          gap: '8px'
        }}
      >
        <div style={infoBoxStyle}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)' }}>ÇÖZELTİ pH DEĞERİ</div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: indicator.badgeColor, marginTop: '2px' }}>
            pH = {currentPH.toFixed(2)}
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--muted)' }}>
            V<sub>NaOH</sub> = {roundedV.toFixed(1)} mL
          </div>
        </div>

        <div style={infoBoxStyle}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)' }}>FENOLFTALEİN RENGİ</div>
          <div style={{ fontSize: '13.5px', fontWeight: 800, color: indicator.badgeColor, marginTop: '3px' }}>
            {indicator.label}
          </div>
        </div>

        <div style={infoBoxStyle}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)' }}>NET İYON DENKLEMİ</div>
          <div style={{ fontWeight: 800, color: 'var(--text)', marginTop: '3px' }}>
            H⁺(suda) + OH⁻(suda) → H₂O(s)
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--muted)' }}>
            Seyirci iyonlar: Na⁺ ve Cl⁻
          </div>
        </div>
      </div>

      {onPracticeTopic && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="button" className="btn small primary" onClick={onPracticeTopic}>
            🧪 Gazlar &amp; Asit-Baz Testini Çöz
          </button>
        </div>
      )}
    </div>
  );
};
