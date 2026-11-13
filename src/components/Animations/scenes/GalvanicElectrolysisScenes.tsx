import React, { useEffect, useId, useRef, useState } from 'react';

type PlaybackSpeed = 0.5 | 1 | 1.5;

interface Point2D {
  x: number;
  y: number;
}

interface PlaybackState {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  speed: PlaybackSpeed;
  setSpeed: React.Dispatch<React.SetStateAction<PlaybackSpeed>>;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  reset: () => void;
}

const SPEEDS: PlaybackSpeed[] = [0.5, 1, 1.5];

/**
 * Animasyon zaman çizelgesi (0..100%) ve Oynat/Duraklat/Hız kontrolü için ortak hook.
 * Tüm parçacık konumları `progress` değerinden deterministik olarak türetilir;
 * böylece öğrenci duraklatıp kaydırıcı ile her anı adım adım inceleyebilir.
 */
function useAnimationPlayback(cycleRatePerSecond = 7.2): PlaybackState {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<PlaybackSpeed>(1);
  const [progress, setProgress] = useState<number>(18);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      return;
    }

    let rafId = 0;
    const step = (now: number) => {
      if (lastTimeRef.current !== null) {
        const dt = Math.min((now - lastTimeRef.current) / 1000, 0.08);
        setProgress((prev) => {
          const next = prev + dt * cycleRatePerSecond * speed;
          return next >= 100 ? next % 100 : next;
        });
      }
      lastTimeRef.current = now;
      rafId = window.requestAnimationFrame(step);
    };

    rafId = window.requestAnimationFrame(step);
    return () => {
      window.cancelAnimationFrame(rafId);
      lastTimeRef.current = null;
    };
  }, [isPlaying, speed, cycleRatePerSecond]);

  const reset = () => {
    lastTimeRef.current = null;
    setProgress(0);
    setIsPlaying(true);
  };

  return {
    isPlaying,
    setIsPlaying,
    speed,
    setSpeed,
    progress,
    setProgress,
    reset
  };
}

/**
 * Çoklu doğru parçası (polyline) boyunca normalize [0..1] ilerlemeye göre (x, y) koordinatı hesaplar.
 */
function samplePolyline(points: readonly Point2D[], u: number): Point2D {
  if (points.length === 0) return { x: 0, y: 0 };
  if (points.length === 1) return points[0];

  const clamped = Math.max(0, Math.min(1, u));
  const segLengths: number[] = [];
  let totalLength = 0;

  for (let i = 0; i < points.length - 1; i++) {
    const dx = points[i + 1].x - points[i].x;
    const dy = points[i + 1].y - points[i].y;
    const len = Math.hypot(dx, dy);
    segLengths.push(len);
    totalLength += len;
  }

  if (totalLength === 0) return points[0];

  let target = clamped * totalLength;
  for (let i = 0; i < segLengths.length; i++) {
    const len = segLengths[i];
    if (target <= len || i === segLengths.length - 1) {
      const ratio = len === 0 ? 0 : target / len;
      return {
        x: points[i].x + (points[i + 1].x - points[i].x) * ratio,
        y: points[i].y + (points[i + 1].y - points[i].y) * ratio
      };
    }
    target -= len;
  }

  return points[points.length - 1];
}

interface PlaybackBarProps {
  playback: PlaybackState;
  scrubberLabel: string;
}

const PlaybackBar: React.FC<PlaybackBarProps> = ({ playback, scrubberLabel }) => {
  const { isPlaying, setIsPlaying, speed, setSpeed, progress, setProgress, reset } = playback;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '10px 14px',
        padding: '10px 14px',
        backgroundColor: 'var(--card-2)',
        border: '1px solid var(--border)',
        borderRadius: '12px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <button
          type="button"
          className={`btn ${isPlaying ? 'secondary' : 'primary'} small`}
          onClick={() => setIsPlaying((prev) => !prev)}
        >
          {isPlaying ? '⏸ Duraklat' : '▶ Oynat'}
        </button>
        <button type="button" className="btn ghost small" onClick={reset}>
          ↺ Sıfırla
        </button>
      </div>

      <div
        role="group"
        aria-label="Animasyon hızı"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
      >
        <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 700, marginRight: '2px' }}>
          Hız:
        </span>
        {SPEEDS.map((s) => (
          <button
            key={s}
            type="button"
            className={`btn ${speed === s ? 'primary' : 'ghost'} small`}
            onClick={() => setSpeed(s)}
            style={{ padding: '5px 9px', fontSize: '12px' }}
          >
            {s}x
          </button>
        ))}
      </div>

      <label
        style={{
          flex: '1 1 200px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          minWidth: 0
        }}
      >
        <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 700, whiteSpace: 'nowrap' }}>
          {scrubberLabel}
        </span>
        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={progress}
          aria-label={scrubberLabel}
          onChange={(e) => {
            setIsPlaying(false);
            setProgress(Number(e.target.value));
          }}
          style={{
            width: '100%',
            accentColor: 'var(--accent)',
            cursor: 'pointer'
          }}
        />
        <span
          style={{
            fontSize: '12px',
            fontWeight: 800,
            fontVariantNumeric: 'tabular-nums',
            color: 'var(--text)',
            minWidth: '38px',
            textAlign: 'right'
          }}
        >
          %{Math.round(progress)}
        </span>
      </label>
    </div>
  );
};

/* ============================================================================
 * 1. DANİELL PİLİ (GALVANİK HÜCRE) CANLI ANİMASYONU
 * ========================================================================== */

interface GalvanicPhaseInfo {
  step: number;
  title: string;
  targetProgress: number;
  badgeColor: string;
  equation: string;
  explanation: string;
}

const GALVANIC_PHASES: readonly GalvanicPhaseInfo[] = [
  {
    step: 1,
    title: '1. Anot Yükseltgenmesi',
    targetProgress: 12,
    badgeColor: 'var(--accent)',
    equation: 'Zn(k) → Zn²⁺(suda) + 2e⁻   (E°yüks = +0.76 V)',
    explanation:
      'Aktif olan Zn elektrot yükseltgenir; Zn çubuk aşınarak incelir ve çözeltiye Zn²⁺ iyonları geçer.'
  },
  {
    step: 2,
    title: '2. Dış Devrede e⁻ Akışı',
    targetProgress: 37,
    badgeColor: 'var(--warn)',
    equation: 'Dış Devre: Anot (Zn) → Katot (Cu)   |   E°pil = 1.10 V',
    explanation:
      'Anot çubukta açığa çıkan elektronlar (e⁻), iletken tel ve voltmetre üzerinden katoda doğru akar.'
  },
  {
    step: 3,
    title: '3. Katot İndirgenmesi & Kütle Artışı',
    targetProgress: 62,
    badgeColor: 'var(--ok)',
    equation: 'Cu²⁺(suda) + 2e⁻ → Cu(k)   (E°ind = +0.34 V)',
    explanation:
      'Çözeltideki mavi Cu²⁺ iyonları katot yüzeyinde e⁻ alarak Cu(k) halinde birikir; bakır çubuk kalınlaşır, çözelti rengi açılır.'
  },
  {
    step: 4,
    title: '4. Tuz Köprüsü İyon Dengesi',
    targetProgress: 87,
    badgeColor: 'var(--info)',
    equation: 'NO₃⁻ (Anyon) → Anota   |   K⁺ (Katyon) → Katota',
    explanation:
      'Anot kabındaki + yük fazlalığını dengelemek için NO₃⁻ sola, katot kabındaki + yük kaybını telafi etmek için K⁺ sağa göç eder.'
  }
];

const GALVANIC_WIRE_POINTS: readonly Point2D[] = [
  { x: 118, y: 112 },
  { x: 118, y: 42 },
  { x: 522, y: 42 },
  { x: 522, y: 112 }
];

const SALT_BRIDGE_LEFT_TO_RIGHT: readonly Point2D[] = [
  { x: 174, y: 222 },
  { x: 174, y: 116 },
  { x: 192, y: 102 },
  { x: 448, y: 102 },
  { x: 466, y: 116 },
  { x: 466, y: 222 }
];

export const GalvanicCellAnimationScene: React.FC<{ onPracticeTopic?: () => void }> = ({
  onPracticeTopic
}) => {
  const uid = useId().replace(/:/g, '');
  const playback = useAnimationPlayback(6.8);
  const [saltBridgePresent, setSaltBridgePresent] = useState<boolean>(true);

  const effectiveProgress = saltBridgePresent ? playback.progress : 0;
  const t = effectiveProgress / 100;
  const activePhaseIndex = Math.min(3, Math.floor(playback.progress / 25));
  const activePhase = GALVANIC_PHASES[activePhaseIndex];

  // Zn çubuk genişliği zamanla incelir (26 -> 13), Cu çubuk kaplama kalınlığı artar (0 -> 8)
  const znWidth = 26 - 13 * t;
  const cuCoreWidth = 18;
  const cuPlating = 8.5 * t;
  const cuBlueOpacity = 0.36 - 0.21 * t;

  // Dış devrede sürekli akan 6 elektron
  const electrons = Array.from({ length: 6 }, (_, idx) => {
    const u = (t * 2.4 + idx / 6) % 1;
    return { id: idx, pos: samplePolyline(GALVANIC_WIRE_POINTS, u) };
  });

  // Anotta çubuktan çözeltiye fırlayan Zn²⁺ iyonları
  const znIons = Array.from({ length: 4 }, (_, idx) => {
    const localT = (t * 2 + idx * 0.25) % 1;
    return {
      id: idx,
      x: 126 + localT * (38 + (idx % 2) * 14),
      y: 172 + idx * 22 + Math.sin(localT * Math.PI) * 10,
      opacity: localT < 0.15 ? localT / 0.15 : 1 - (localT - 0.15) * 0.65
    };
  });

  // Katotta çubuğa doğru yüzüp indirgenen Cu²⁺ iyonları
  const cuIons = Array.from({ length: 4 }, (_, idx) => {
    const localT = (t * 2 + idx * 0.25) % 1;
    const startX = 442 + (idx % 2) * 14;
    const targetX = 510 - cuPlating;
    return {
      id: idx,
      x: startX + (targetX - startX) * localT,
      y: 176 + idx * 21 - Math.sin(localT * Math.PI) * 8,
      opacity: localT > 0.85 ? (1 - localT) / 0.15 : 0.95
    };
  });

  // Tuz köprüsü NO₃⁻ (sola / Anota) ve K⁺ (sağa / Katota)
  const nitrateIons = Array.from({ length: 3 }, (_, idx) => {
    const uRightToLeft = 1 - ((t * 1.8 + idx / 3) % 1);
    return {
      id: idx,
      pos: samplePolyline(SALT_BRIDGE_LEFT_TO_RIGHT, uRightToLeft)
    };
  });

  const potassiumIons = Array.from({ length: 3 }, (_, idx) => {
    const uLeftToRight = (t * 1.8 + idx / 3 + 0.16) % 1;
    return {
      id: idx,
      pos: samplePolyline(SALT_BRIDGE_LEFT_TO_RIGHT, uLeftToRight)
    };
  });

  return (
    <div style={{ display: 'grid', gap: '14px' }}>
      {/* Üst Başlık ve Kimya Mnemonic Rozeti */}
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
          <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)' }}>
            🔋 Daniell Pili: Zn(k) | Zn²⁺(1M) || Cu²⁺(1M) | Cu(k)
          </div>
          <div style={{ fontSize: '12.5px', color: 'var(--muted)', marginTop: '2px' }}>
            Kendiliğinden gerçekleşen redoks tepkimesi — kimyasal enerji elektrik enerjisine dönüşür.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 10px',
              borderRadius: '999px',
              backgroundColor: 'var(--warn-soft)',
              border: '1px solid var(--warn)',
              color: 'var(--warn)',
              fontSize: '12px',
              fontWeight: 800
            }}
          >
            💡 KİMYA: Katotta İndirgenme · Yükseltgenme Anotta
          </span>
          <button
            type="button"
            className={`btn ${saltBridgePresent ? 'ghost' : 'primary'} small`}
            onClick={() => setSaltBridgePresent((prev) => !prev)}
          >
            {saltBridgePresent ? '🌉 Tuz Köprüsünü Çıkar' : '🌉 Tuz Köprüsünü Tak'}
          </button>
        </div>
      </div>

      {/* Oynatma Kontrolleri */}
      <PlaybackBar playback={playback} scrubberLabel="Tepkime İlerlemesi" />

      {/* Ana SVG Diyagramı */}
      <div
        style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          padding: '12px',
          overflow: 'hidden'
        }}
      >
        <svg
          viewBox="0 0 640 330"
          role="img"
          aria-label="Daniell Pili canlı animasyon şeması"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <defs>
            <linearGradient id={`${uid}-zn-rod`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
            <linearGradient id={`${uid}-cu-rod`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#b45309" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#9a3412" />
            </linearGradient>
            <filter id={`${uid}-glow`} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Dış İletken Tel */}
          <polyline
            points="118,112 118,42 522,42 522,112"
            fill="none"
            stroke="var(--border-2)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Elektron Akış Yönü Etiketi */}
          <text
            x="212"
            y="30"
            fill={saltBridgePresent ? 'var(--warn)' : 'var(--accent)'}
            fontSize="11"
            fontWeight="800"
            textAnchor="middle"
          >
            {saltBridgePresent ? 'e⁻ akışı →' : 'Akım durdu!'}
          </text>
          <text
            x="428"
            y="30"
            fill={saltBridgePresent ? 'var(--warn)' : 'var(--accent)'}
            fontSize="11"
            fontWeight="800"
            textAnchor="middle"
          >
            {saltBridgePresent ? 'e⁻ akışı →' : 'Yük dengesiz'}
          </text>

          {/* Merkez Voltmetre */}
          <g>
            <circle
              cx="320"
              cy="42"
              r="29"
              fill="var(--card-2)"
              stroke={saltBridgePresent ? 'var(--warn)' : 'var(--accent)'}
              strokeWidth="2.5"
            />
            <text
              x="320"
              y="40"
              fill={saltBridgePresent ? 'var(--text)' : 'var(--accent)'}
              fontSize="13.5"
              fontWeight="900"
              textAnchor="middle"
            >
              {saltBridgePresent ? '1.10 V' : '0.00 V'}
            </text>
            <text x="320" y="54" fill="var(--muted)" fontSize="8.5" fontWeight="700" textAnchor="middle">
              VOLTMETRE
            </text>
          </g>

          {/* Dış Devredeki Hareketli Elektronlar */}
          {saltBridgePresent &&
            electrons.map((el) => {
              // Voltmetrenin arkasında gizlenmesin ama merkeze çok yakınsa hafif küçülsün
              const nearMeter = Math.hypot(el.pos.x - 320, el.pos.y - 42) < 26;
              return (
                <g
                  key={el.id}
                  transform={`translate(${el.pos.x}, ${el.pos.y})`}
                  opacity={nearMeter ? 0.15 : 1}
                  filter={`url(#${uid}-glow)`}
                >
                  <circle r="8.5" fill="#fbbf24" stroke="#78350f" strokeWidth="1.2" />
                  <text
                    x="0"
                    y="3.5"
                    fill="#111827"
                    fontSize="9"
                    fontWeight="900"
                    textAnchor="middle"
                  >
                    e⁻
                  </text>
                </g>
              );
            })}

          {/* SOL BEHER: ANOT — ZnSO₄ */}
          <g>
            <rect
              x="44"
              y="146"
              width="172"
              height="136"
              rx="10"
              fill="var(--card-2)"
              stroke="var(--border-2)"
              strokeWidth="2"
            />
            {/* ZnSO₄ Çözeltisi (renksiz / hafif buz mavisi) */}
            <rect
              x="47"
              y="168"
              width="166"
              height="111"
              rx="7"
              fill="rgba(148, 163, 184, 0.18)"
            />
            {/* Zn Elektrot Çubuğu — zamanla incelir */}
            <rect
              x={118 - znWidth / 2}
              y="108"
              width={znWidth}
              height="148"
              rx="4"
              fill={`url(#${uid}-zn-rod)`}
              stroke="#64748b"
              strokeWidth="1.2"
            />
            {/* Aşınma hayalet çerçevesi (başlangıç kalınlığını gösterir) */}
            <rect
              x={118 - 13}
              y="168"
              width={26}
              height="88"
              rx="3"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity={t > 0.08 ? 0.65 : 0}
            />
            <text x="118" y="138" fill="var(--text)" fontSize="11" fontWeight="900" textAnchor="middle">
              Zn
            </text>

            {/* Çubuktan kopan Zn²⁺ iyonları */}
            {saltBridgePresent &&
              znIons.map((ion) => (
                <g key={ion.id} transform={`translate(${ion.x}, ${ion.y})`} opacity={ion.opacity}>
                  <circle r="11" fill="#e5484d" stroke="#fecaca" strokeWidth="1.2" />
                  <text x="0" y="3.5" fill="#ffffff" fontSize="8.5" fontWeight="900" textAnchor="middle">
                    Zn²⁺
                  </text>
                </g>
              ))}

            <text x="130" y="270" fill="var(--text)" fontSize="11" fontWeight="800" textAnchor="middle">
              ZnSO₄(suda) · [Zn²⁺] ↑
            </text>
            <text x="130" y="302" fill="var(--accent)" fontSize="12" fontWeight="900" textAnchor="middle">
              ANOT (-) · Zn Çubuk Aşınır
            </text>
            <text x="130" y="318" fill="var(--muted)" fontSize="10" fontWeight="700" textAnchor="middle">
              Zn(k) → Zn²⁺ + 2e⁻
            </text>
          </g>

          {/* SAĞ BEHER: KATOT — CuSO₄ */}
          <g>
            <rect
              x="424"
              y="146"
              width="172"
              height="136"
              rx="10"
              fill="var(--card-2)"
              stroke="var(--border-2)"
              strokeWidth="2"
            />
            {/* CuSO₄ Çözeltisi — zamanla mavisi açılır */}
            <rect
              x="427"
              y="168"
              width="166"
              height="111"
              rx="7"
              fill={`rgba(37, 138, 255, ${cuBlueOpacity.toFixed(3)})`}
            />

            {/* Cu Elektrot Üzerindeki Yeni Bakır Kaplama Tabakası */}
            <rect
              x={522 - cuCoreWidth / 2 - cuPlating}
              y="168"
              width={cuCoreWidth + cuPlating * 2}
              height="90"
              rx="5"
              fill="#f97316"
              opacity={0.85}
            />
            {/* Cu Çekirdek Elektrot Çubuğu */}
            <rect
              x={522 - cuCoreWidth / 2}
              y="108"
              width={cuCoreWidth}
              height="148"
              rx="4"
              fill={`url(#${uid}-cu-rod)`}
              stroke="#9a3412"
              strokeWidth="1.2"
            />
            <text x="522" y="138" fill="var(--text)" fontSize="11" fontWeight="900" textAnchor="middle">
              Cu
            </text>

            {/* Çözeltiden çubuğa yüzüp kaplanan Cu²⁺ iyonları */}
            {saltBridgePresent &&
              cuIons.map((ion) => (
                <g key={ion.id} transform={`translate(${ion.x}, ${ion.y})`} opacity={ion.opacity}>
                  <circle r="11" fill="#0ea5e9" stroke="#bae6fd" strokeWidth="1.2" />
                  <text x="0" y="3.5" fill="#ffffff" fontSize="8.5" fontWeight="900" textAnchor="middle">
                    Cu²⁺
                  </text>
                </g>
              ))}

            <text x="510" y="270" fill="var(--text)" fontSize="11" fontWeight="800" textAnchor="middle">
              CuSO₄(suda) · [Cu²⁺] ↓
            </text>
            <text x="510" y="302" fill="var(--ok)" fontSize="12" fontWeight="900" textAnchor="middle">
              KATOT (+) · Cu Çubuk Kalınlaşır
            </text>
            <text x="510" y="318" fill="var(--muted)" fontSize="10" fontWeight="700" textAnchor="middle">
              Cu²⁺ + 2e⁻ → Cu(k)
            </text>
          </g>

          {/* TUZ KÖPRÜSÜ (KNO₃) */}
          {saltBridgePresent ? (
            <g>
              {/* Dış cam boru */}
              <path
                d="M 174 224 L 174 116 Q 174 96 196 96 L 444 96 Q 466 96 466 116 L 466 224"
                fill="none"
                stroke="var(--border-2)"
                strokeWidth="28"
                strokeLinecap="round"
              />
              {/* İç jel elektrolit */}
              <path
                d="M 174 224 L 174 116 Q 174 96 196 96 L 444 96 Q 466 96 466 116 L 466 224"
                fill="none"
                stroke="rgba(77, 171, 247, 0.24)"
                strokeWidth="22"
                strokeLinecap="round"
              />

              {/* Köprü Üstü Başlık */}
              <rect
                x="236"
                y="70"
                width="168"
                height="22"
                rx="8"
                fill="var(--card-2)"
                stroke="var(--info)"
                strokeWidth="1.2"
              />
              <text x="320" y="84.5" fill="var(--info)" fontSize="10.5" fontWeight="800" textAnchor="middle">
                Tuz Köprüsü (KNO₃)
              </text>

              {/* NO₃⁻ Anyonları (SOLA - Anota) */}
              {nitrateIons.map((ion) => (
                <g key={`no3-${ion.id}`} transform={`translate(${ion.pos.x}, ${ion.pos.y - 5})`}>
                  <rect x="-15" y="-8.5" width="30" height="17" rx="8.5" fill="#f59f00" />
                  <text x="0" y="3" fill="#111827" fontSize="8.5" fontWeight="900" textAnchor="middle">
                    NO₃⁻
                  </text>
                </g>
              ))}

              {/* K⁺ Katyonları (SAĞA - Katota) */}
              {potassiumIons.map((ion) => (
                <g key={`k-${ion.id}`} transform={`translate(${ion.pos.x}, ${ion.pos.y + 6})`}>
                  <rect x="-12" y="-8.5" width="24" height="17" rx="8.5" fill="#30b575" />
                  <text x="0" y="3" fill="#ffffff" fontSize="8.5" fontWeight="900" textAnchor="middle">
                    K⁺
                  </text>
                </g>
              ))}

              {/* İyon Yön Açıklaması */}
              <text x="320" y="132" fill="var(--muted)" fontSize="10.5" fontWeight="700" textAnchor="middle">
                ← NO₃⁻ (Anyonlar Anota)  |  (Katyonlar Katota) K⁺ →
              </text>
            </g>
          ) : (
            <g>
              <rect
                x="220"
                y="96"
                width="200"
                height="46"
                rx="10"
                fill="var(--bad-soft)"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <text x="320" y="116" fill="var(--accent)" fontSize="12" fontWeight="900" textAnchor="middle">
                ✕ TUZ KÖPRÜSÜ YOK!
              </text>
              <text x="320" y="132" fill="var(--text)" fontSize="10" fontWeight="700" textAnchor="middle">
                Yük denkliği bozuldu → Pil anında durdu
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Canlı Senkronize 4 Fazlı Anlatım Kartı */}
      <div
        style={{
          backgroundColor: 'var(--card-2)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          padding: '14px',
          display: 'grid',
          gap: '12px'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '8px'
          }}
        >
          {GALVANIC_PHASES.map((phase, idx) => {
            const isActive = saltBridgePresent && activePhaseIndex === idx;
            return (
              <button
                key={phase.step}
                type="button"
                onClick={() => {
                  playback.setIsPlaying(false);
                  playback.setProgress(phase.targetProgress);
                }}
                style={{
                  textAlign: 'left',
                  padding: '9px 11px',
                  borderRadius: '10px',
                  border: isActive ? `1.5px solid ${phase.badgeColor}` : '1px solid var(--border)',
                  backgroundColor: isActive ? 'var(--card)' : 'transparent',
                  color: 'var(--text)',
                  cursor: 'pointer',
                  font: 'inherit',
                  transition: 'border-color 0.15s, background-color 0.15s'
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    color: isActive ? phase.badgeColor : 'var(--muted)'
                  }}
                >
                  {phase.title}
                </div>
              </button>
            );
          })}
        </div>

        <div
          style={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '12px 14px',
            display: 'grid',
            gap: '6px'
          }}
        >
          {saltBridgePresent ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <strong style={{ fontSize: '14px', color: activePhase.badgeColor }}>
                  {activePhase.title}
                </strong>
                <code style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text)' }}>
                  {activePhase.equation}
                </code>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>
                {activePhase.explanation}
              </div>
            </>
          ) : (
            <div style={{ fontSize: '13.5px', color: 'var(--accent)', fontWeight: 700, lineHeight: 1.5 }}>
              ⚠️ Tuz köprüsü çıkarıldığında devre tamamlanamaz, yarı hücrelerde yük birikimi oluşur ve pil
              potansiyeli anında 0.00 V değerine düşer. Tekrar izlemek için &quot;Tuz Köprüsünü Tak&quot; butonuna basın.
            </div>
          )}
        </div>
      </div>

      {/* ÖSYM Tuzağı + Pratik CTA */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 14px',
          backgroundColor: 'var(--accent-soft)',
          border: '1px solid var(--accent)',
          borderRadius: '12px'
        }}
      >
        <div style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.5, flex: '1 1 320px' }}>
          <strong style={{ color: 'var(--accent)' }}>🎯 ÖSYM Tuzağı: </strong>
          <strong>Tuz köprüsü olmazsa pil anında durur!</strong> Ayrıca tuz köprüsünde elektron değil{' '}
          <strong>iyonlar</strong> göç eder (Anyonlar → Anota, Katyonlar → Katota).
        </div>

        {onPracticeTopic && (
          <button type="button" className="btn primary small" onClick={onPracticeTopic}>
            ⚡ Elektrokimya Testini Çöz
          </button>
        )}
      </div>
    </div>
  );
};

/* ============================================================================
 * 2. ELEKTROLİZ & HOFMANN VOLTAMETRESİ ANİMASYONU
 * ========================================================================== */

type ElectrolysisMode = 'water' | 'nacl';

const WATER_WIRE_LEFT: readonly Point2D[] = [
  { x: 185, y: 266 },
  { x: 185, y: 298 },
  { x: 288, y: 298 }
];

const WATER_WIRE_RIGHT: readonly Point2D[] = [
  { x: 352, y: 298 },
  { x: 455, y: 298 },
  { x: 455, y: 266 }
];

const NACL_WIRE_LEFT: readonly Point2D[] = [
  { x: 205, y: 120 },
  { x: 205, y: 50 },
  { x: 284, y: 50 }
];

const NACL_WIRE_RIGHT: readonly Point2D[] = [
  { x: 356, y: 50 },
  { x: 435, y: 50 },
  { x: 435, y: 120 }
];

export const ElectrolysisAnimationScene: React.FC<{ onPracticeTopic?: () => void }> = ({
  onPracticeTopic
}) => {
  const uid = useId().replace(/:/g, '');
  const [mode, setMode] = useState<ElectrolysisMode>('water');
  const playback = useAnimationPlayback(7.0);

  const t = playback.progress / 100;

  // Suyun Elektrolizi (Hofmann Voltametresi) hacim ve su seviyesi hesabı
  // Tüp iç yüksekliği: y = 62 .. 222 (toplam 160px)
  // Anotta (O₂): max 48px gaz boşluğu (V), Katotta (H₂): max 96px gaz boşluğu (2V) -> TAM 2 KATI!
  const o2GasHeight = 48 * t;
  const h2GasHeight = 96 * t;
  const o2MeniscusY = 62 + o2GasHeight;
  const h2MeniscusY = 62 + h2GasHeight;
  const o2VolumeMl = 20 * t;
  const h2VolumeMl = 40 * t;
  // Ortadaki hazne su seviyesi, iki tüpten itilen toplam su hacmine orantılı yükselir
  const reservoirTopY = 112 - 44 * t;

  const o2Bubbles = Array.from({ length: 3 }, (_, idx) => {
    const localT = (t * 2.6 + idx / 3) % 1;
    const startY = 236;
    const endY = Math.max(o2MeniscusY + 6, 68);
    return {
      id: idx,
      x: 185 + ((idx % 2 === 0 ? -1 : 1) * (4 + idx * 2)),
      y: startY - (startY - endY) * localT
    };
  });

  const h2Bubbles = Array.from({ length: 6 }, (_, idx) => {
    const localT = (t * 2.6 + idx / 6) % 1;
    const startY = 236;
    const endY = Math.max(h2MeniscusY + 6, 68);
    return {
      id: idx,
      x: 455 + ((idx % 2 === 0 ? -1 : 1) * (3 + (idx % 3) * 3)),
      y: startY - (startY - endY) * localT
    };
  });

  const waterElectronsLeft = Array.from({ length: 3 }, (_, idx) => {
    const u = (t * 2.5 + idx / 3) % 1;
    return { id: idx, pos: samplePolyline(WATER_WIRE_LEFT, u) };
  });

  const waterElectronsRight = Array.from({ length: 3 }, (_, idx) => {
    const u = (t * 2.5 + idx / 3) % 1;
    return { id: idx, pos: samplePolyline(WATER_WIRE_RIGHT, u) };
  });

  // Erimiş NaCl parçacıkları
  const naclElectronsLeft = Array.from({ length: 3 }, (_, idx) => {
    const u = (t * 2.5 + idx / 3) % 1;
    return { id: idx, pos: samplePolyline(NACL_WIRE_LEFT, u) };
  });

  const naclElectronsRight = Array.from({ length: 3 }, (_, idx) => {
    const u = (t * 2.5 + idx / 3) % 1;
    return { id: idx, pos: samplePolyline(NACL_WIRE_RIGHT, u) };
  });

  const clIons = Array.from({ length: 4 }, (_, idx) => {
    const localT = (t * 1.9 + idx * 0.25) % 1;
    return {
      id: idx,
      x: 315 - (315 - 224) * localT,
      y: 182 + idx * 20 + Math.sin(localT * Math.PI) * 5,
      opacity: localT > 0.88 ? (1 - localT) / 0.12 : 1
    };
  });

  const naIons = Array.from({ length: 4 }, (_, idx) => {
    const localT = (t * 1.9 + idx * 0.25) % 1;
    return {
      id: idx,
      x: 325 + (416 - 325) * localT,
      y: 188 + idx * 20 - Math.sin(localT * Math.PI) * 5,
      opacity: localT > 0.88 ? (1 - localT) / 0.12 : 1
    };
  });

  const cl2GasBubbles = Array.from({ length: 5 }, (_, idx) => {
    const localT = (t * 2.4 + idx * 0.2) % 1;
    return {
      id: idx,
      x: 205 + (idx % 2 === 0 ? -10 : 12),
      y: 235 - 108 * localT,
      opacity: localT > 0.85 ? (1 - localT) / 0.15 : 0.92
    };
  });

  return (
    <div style={{ display: 'grid', gap: '14px' }}>
      {/* Üst Başlık ve Mod Seçimi */}
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
          <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)' }}>
            🔌 Elektroliz Hücresi &amp; Hofmann Voltametresi
          </div>
          <div style={{ fontSize: '12.5px', color: 'var(--muted)', marginTop: '2px' }}>
            Dış doğru akım (DC) kaynağı ile istemsiz redoks tepkimeleri zorla gerçekleştirilir.
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Elektroliz Modu"
          style={{ display: 'inline-flex', gap: '6px', flexWrap: 'wrap' }}
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'water'}
            className={`btn ${mode === 'water' ? 'primary' : 'secondary'} small`}
            onClick={() => {
              setMode('water');
              playback.setProgress(25);
            }}
          >
            💧 Suyun Elektrolizi (Hofmann)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'nacl'}
            className={`btn ${mode === 'nacl' ? 'primary' : 'secondary'} small`}
            onClick={() => {
              setMode('nacl');
              playback.setProgress(25);
            }}
          >
            🧂 Erimiş NaCl Elektrolizi
          </button>
        </div>
      </div>

      {/* Oynatma Kontrolleri */}
      <PlaybackBar
        playback={playback}
        scrubberLabel={mode === 'water' ? 'Gaz Birikimi (V vs 2V)' : 'Elektroliz Süreci'}
      />

      {/* SVG Sahne */}
      <div
        style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          padding: '12px',
          overflow: 'hidden'
        }}
      >
        {mode === 'water' ? (
          <svg
            viewBox="0 0 640 330"
            role="img"
            aria-label="Hofmann voltametresi ile suyun elektrolizi animasyonu"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          >
            <defs>
              <clipPath id={`${uid}-anode-tube`}>
                <rect x="163" y="62" width="44" height="162" rx="4" />
              </clipPath>
              <clipPath id={`${uid}-cathode-tube`}>
                <rect x="433" y="62" width="44" height="162" rx="4" />
              </clipPath>
              <clipPath id={`${uid}-center-tube`}>
                <rect x="303" y="54" width="34" height="190" rx="6" />
              </clipPath>
            </defs>

            {/* Bağlantı alt yatay su köprüsü */}
            <rect
              x="167"
              y="224"
              width="306"
              height="24"
              rx="10"
              fill="rgba(56, 189, 248, 0.25)"
              stroke="var(--border-2)"
              strokeWidth="2"
            />

            {/* ORTA HAZNE BORUSU (Su Seviyesi Yükselir) */}
            <rect
              x="301"
              y="52"
              width="38"
              height="194"
              rx="8"
              fill="var(--card-2)"
              stroke="var(--border-2)"
              strokeWidth="2"
            />
            <rect
              x="303"
              y={reservoirTopY}
              width="34"
              height={244 - reservoirTopY}
              fill="rgba(56, 189, 248, 0.32)"
              clipPath={`url(#${uid}-center-tube)`}
            />
            {/* Üst huni ağzı */}
            <path
              d="M 294 42 L 346 42 L 338 56 L 302 56 Z"
              fill="var(--card-2)"
              stroke="var(--border-2)"
              strokeWidth="2"
            />
            <text x="320" y="34" fill="var(--muted)" fontSize="9.5" fontWeight="700" textAnchor="middle">
              Su Haznesi
            </text>

            {/* SOL TÜP: (+) ANOT — O₂(g) (V Hacim) */}
            <g>
              <rect
                x="161"
                y="60"
                width="48"
                height="166"
                rx="6"
                fill="var(--card-2)"
                stroke="var(--border-2)"
                strokeWidth="2"
              />
              {/* Toplanan O₂ gaz bölgesi */}
              <rect
                x="163"
                y="62"
                width="44"
                height={o2GasHeight}
                fill="rgba(229, 72, 77, 0.16)"
                clipPath={`url(#${uid}-anode-tube)`}
              />
              {/* Kalan su sütunu */}
              <rect
                x="163"
                y={o2MeniscusY}
                width="44"
                height={224 - o2MeniscusY}
                fill="rgba(56, 189, 248, 0.34)"
                clipPath={`url(#${uid}-anode-tube)`}
              />
              {/* Su menisküs çizgisi */}
              <line
                x1="163"
                y1={o2MeniscusY}
                x2="207"
                y2={o2MeniscusY}
                stroke="var(--info)"
                strokeWidth="2"
              />
              {/* Derece çizgileri (0..40 mL) */}
              {[0, 24, 48, 72, 96].map((dy, idx) => (
                <g key={dy}>
                  <line
                    x1="161"
                    y1={62 + dy}
                    x2="170"
                    y2={62 + dy}
                    stroke="var(--muted)"
                    strokeWidth="1.2"
                  />
                  <text x="155" y={65 + dy} fill="var(--muted)" fontSize="8.5" textAnchor="end">
                    {idx * 10}
                  </text>
                </g>
              ))}
              {/* Pt Anot Elektrot */}
              <rect x="180" y="220" width="10" height="46" rx="2" fill="#94a3b8" />

              {/* Yükselen O₂ kabarcıkları */}
              {o2Bubbles.map((b) => (
                <circle
                  key={b.id}
                  cx={b.x}
                  cy={b.y}
                  r="3.8"
                  fill="rgba(255, 255, 255, 0.78)"
                  stroke="var(--accent)"
                  strokeWidth="1"
                />
              ))}

              {/* Etiketler */}
              <text x="185" y="40" fill="var(--accent)" fontSize="12" fontWeight="900" textAnchor="middle">
                (+) ANOT · O₂(g)
              </text>
              <rect
                x="62"
                y="74"
                width="82"
                height="44"
                rx="8"
                fill="var(--card-2)"
                stroke="var(--accent)"
                strokeWidth="1.3"
              />
              <text x="103" y="93" fill="var(--accent)" fontSize="13" fontWeight="900" textAnchor="middle">
                V ({o2VolumeMl.toFixed(1)} mL)
              </text>
              <text x="103" y="109" fill="var(--muted)" fontSize="9.5" fontWeight="700" textAnchor="middle">
                1 mol O₂ gazı
              </text>
            </g>

            {/* SAĞ TÜP: (-) KATOT — H₂(g) (2V Hacim) */}
            <g>
              <rect
                x="431"
                y="60"
                width="48"
                height="166"
                rx="6"
                fill="var(--card-2)"
                stroke="var(--border-2)"
                strokeWidth="2"
              />
              {/* Toplanan H₂ gaz bölgesi (TAM 2 KATI!) */}
              <rect
                x="433"
                y="62"
                width="44"
                height={h2GasHeight}
                fill="rgba(48, 181, 117, 0.18)"
                clipPath={`url(#${uid}-cathode-tube)`}
              />
              {/* Kalan su sütunu */}
              <rect
                x="433"
                y={h2MeniscusY}
                width="44"
                height={224 - h2MeniscusY}
                fill="rgba(56, 189, 248, 0.34)"
                clipPath={`url(#${uid}-cathode-tube)`}
              />
              {/* Su menisküs çizgisi */}
              <line
                x1="433"
                y1={h2MeniscusY}
                x2="477"
                y2={h2MeniscusY}
                stroke="var(--info)"
                strokeWidth="2"
              />
              {/* Derece çizgileri (0..40 mL) */}
              {[0, 24, 48, 72, 96].map((dy, idx) => (
                <g key={dy}>
                  <line
                    x1="470"
                    y1={62 + dy}
                    x2="479"
                    y2={62 + dy}
                    stroke="var(--muted)"
                    strokeWidth="1.2"
                  />
                  <text x="485" y={65 + dy} fill="var(--muted)" fontSize="8.5" textAnchor="start">
                    {idx * 10}
                  </text>
                </g>
              ))}
              {/* Pt Katot Elektrot */}
              <rect x="450" y="220" width="10" height="46" rx="2" fill="#94a3b8" />

              {/* Yükselen H₂ kabarcıkları (2 kat yoğun) */}
              {h2Bubbles.map((b) => (
                <circle
                  key={b.id}
                  cx={b.x}
                  cy={b.y}
                  r="3.8"
                  fill="rgba(255, 255, 255, 0.85)"
                  stroke="var(--ok)"
                  strokeWidth="1"
                />
              ))}

              {/* Etiketler */}
              <text x="455" y="40" fill="var(--ok)" fontSize="12" fontWeight="900" textAnchor="middle">
                (-) KATOT · H₂(g)
              </text>
              <rect
                x="496"
                y="74"
                width="92"
                height="44"
                rx="8"
                fill="var(--card-2)"
                stroke="var(--ok)"
                strokeWidth="1.3"
              />
              <text x="542" y="93" fill="var(--ok)" fontSize="13" fontWeight="900" textAnchor="middle">
                2V ({h2VolumeMl.toFixed(1)} mL)
              </text>
              <text x="542" y="109" fill="var(--muted)" fontSize="9.5" fontWeight="700" textAnchor="middle">
                2 mol H₂ (Tam 2×)
              </text>
            </g>

            {/* Alt DC Üreteç & İletken Teller */}
            <polyline
              points="185,266 185,298 288,298"
              fill="none"
              stroke="var(--border-2)"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <polyline
              points="352,298 455,298 455,266"
              fill="none"
              stroke="var(--border-2)"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            {/* DC Üreteç Kutusu */}
            <g>
              <rect
                x="284"
                y="278"
                width="72"
                height="38"
                rx="8"
                fill="var(--card-2)"
                stroke="var(--warn)"
                strokeWidth="2"
              />
              <text x="296" y="301" fill="var(--accent)" fontSize="15" fontWeight="900" textAnchor="middle">
                +
              </text>
              <text x="320" y="294" fill="var(--warn)" fontSize="10" fontWeight="900" textAnchor="middle">
                DC
              </text>
              <text x="320" y="307" fill="var(--muted)" fontSize="8" fontWeight="700" textAnchor="middle">
                ÜRETEÇ
              </text>
              <text x="344" y="301" fill="var(--ok)" fontSize="16" fontWeight="900" textAnchor="middle">
                −
              </text>
            </g>

            {/* Zorlanan Elektronlar: (+) Anot -> DC -> (-) Katot */}
            {waterElectronsLeft.map((el) => (
              <g key={`wl-${el.id}`} transform={`translate(${el.pos.x}, ${el.pos.y})`}>
                <circle r="7.5" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
                <text x="0" y="3" fill="#111827" fontSize="8" fontWeight="900" textAnchor="middle">
                  e⁻
                </text>
              </g>
            ))}
            {waterElectronsRight.map((el) => (
              <g key={`wr-${el.id}`} transform={`translate(${el.pos.x}, ${el.pos.y})`}>
                <circle r="7.5" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
                <text x="0" y="3" fill="#111827" fontSize="8" fontWeight="900" textAnchor="middle">
                  e⁻
                </text>
              </g>
            ))}

            <text x="235" y="317" fill="var(--warn)" fontSize="9.5" fontWeight="800" textAnchor="middle">
              e⁻ çekilir →
            </text>
            <text x="405" y="317" fill="var(--warn)" fontSize="9.5" fontWeight="800" textAnchor="middle">
              e⁻ pompalanır →
            </text>
          </svg>
        ) : (
          /* MOD 2: ERİMİŞ NaCl ELEKTROLİZİ */
          <svg
            viewBox="0 0 640 330"
            role="img"
            aria-label="Erimiş NaCl elektrolizi animasyonu"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          >
            {/* Üst İletken Teller ve DC Üreteç */}
            <polyline
              points="205,120 205,50 284,50"
              fill="none"
              stroke="var(--border-2)"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            <polyline
              points="356,50 435,50 435,120"
              fill="none"
              stroke="var(--border-2)"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />

            {/* DC Üreteç */}
            <g>
              <rect
                x="280"
                y="26"
                width="80"
                height="44"
                rx="9"
                fill="var(--card-2)"
                stroke="var(--warn)"
                strokeWidth="2"
              />
              <text x="294" y="53" fill="var(--accent)" fontSize="16" fontWeight="900" textAnchor="middle">
                +
              </text>
              <text x="320" y="45" fill="var(--warn)" fontSize="10.5" fontWeight="900" textAnchor="middle">
                DC
              </text>
              <text x="320" y="59" fill="var(--muted)" fontSize="8.5" fontWeight="700" textAnchor="middle">
                ÜRETEÇ
              </text>
              <text x="346" y="53" fill="var(--ok)" fontSize="17" fontWeight="900" textAnchor="middle">
                −
              </text>
            </g>

            {/* Tel üzerinde zorla akan elektronlar */}
            {naclElectronsLeft.map((el) => (
              <g key={`nl-${el.id}`} transform={`translate(${el.pos.x}, ${el.pos.y})`}>
                <circle r="8" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
                <text x="0" y="3" fill="#111827" fontSize="8.5" fontWeight="900" textAnchor="middle">
                  e⁻
                </text>
              </g>
            ))}
            {naclElectronsRight.map((el) => (
              <g key={`nr-${el.id}`} transform={`translate(${el.pos.x}, ${el.pos.y})`}>
                <circle r="8" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
                <text x="0" y="3" fill="#111827" fontSize="8.5" fontWeight="900" textAnchor="middle">
                  e⁻
                </text>
              </g>
            ))}

            <text x="242" y="36" fill="var(--warn)" fontSize="10" fontWeight="800" textAnchor="middle">
              e⁻ Anottan →
            </text>
            <text x="398" y="36" fill="var(--warn)" fontSize="10" fontWeight="800" textAnchor="middle">
              e⁻ Katota →
            </text>

            {/* Erimiş NaCl Pota / Hücre */}
            <rect
              x="128"
              y="132"
              width="384"
              height="156"
              rx="14"
              fill="var(--card-2)"
              stroke="var(--border-2)"
              strokeWidth="2.5"
            />
            <rect
              x="133"
              y="158"
              width="374"
              height="125"
              rx="10"
              fill="rgba(245, 165, 36, 0.16)"
            />

            {/* Sol Elektrot: (+) ANOT — Grafit */}
            <rect x="195" y="114" width="20" height="138" rx="4" fill="#475569" stroke="#94a3b8" />
            <text x="205" y="103" fill="var(--accent)" fontSize="12" fontWeight="900" textAnchor="middle">
              (+) ANOT
            </text>

            {/* Sağ Elektrot: (-) KATOT — Grafit + Metalik Na birikimi */}
            <rect
              x={425 - 5 * t}
              y="162"
              width={20 + 10 * t}
              height="90"
              rx="5"
              fill="#e2e8f0"
              opacity={0.3 + 0.65 * t}
            />
            <rect x="425" y="114" width="20" height="138" rx="4" fill="#475569" stroke="#94a3b8" />
            <text x="435" y="103" fill="var(--ok)" fontSize="12" fontWeight="900" textAnchor="middle">
              (-) KATOT
            </text>

            {/* (+) Anotta çıkan sarı-yeşil Cl₂(g) gaz kabarcıkları */}
            {cl2GasBubbles.map((b) => (
              <g key={`cl2-${b.id}`} transform={`translate(${b.x}, ${b.y})`} opacity={b.opacity}>
                <circle r="7.5" fill="#a3e635" stroke="#4d7c0f" strokeWidth="1.2" />
                <text x="0" y="2.8" fill="#1a2e05" fontSize="6.8" fontWeight="900" textAnchor="middle">
                  Cl₂
                </text>
              </g>
            ))}

            {/* Sola (Anota) göç eden Cl⁻ anyonları */}
            {clIons.map((ion) => (
              <g key={`cl-${ion.id}`} transform={`translate(${ion.x}, ${ion.y})`} opacity={ion.opacity}>
                <circle r="11" fill="#84cc16" stroke="#ecfccb" strokeWidth="1.2" />
                <text x="0" y="3.5" fill="#1a2e05" fontSize="8.5" fontWeight="900" textAnchor="middle">
                  Cl⁻
                </text>
              </g>
            ))}

            {/* Sağa (Katota) göç eden Na⁺ katyonları */}
            {naIons.map((ion) => (
              <g key={`na-${ion.id}`} transform={`translate(${ion.x}, ${ion.y})`} opacity={ion.opacity}>
                <circle r="11" fill="#f59f00" stroke="#fef3c7" strokeWidth="1.2" />
                <text x="0" y="3.5" fill="#111827" fontSize="8.5" fontWeight="900" textAnchor="middle">
                  Na⁺
                </text>
              </g>
            ))}

            {/* Alt Etiketler */}
            <text x="320" y="272" fill="var(--text)" fontSize="11.5" fontWeight="800" textAnchor="middle">
              Erimiş NaCl(s) &gt; 801°C · (Su yok!)
            </text>
            <text x="205" y="308" fill="#84cc16" fontSize="11.5" fontWeight="900" textAnchor="middle">
              2Cl⁻ → Cl₂(g) ↑ + 2e⁻ (Sarı-yeşil gaz)
            </text>
            <text x="435" y="308" fill="var(--ok)" fontSize="11.5" fontWeight="900" textAnchor="middle">
              Na⁺ + e⁻ → Na(s) (Metalik Na birikir)
            </text>
          </svg>
        )}
      </div>

      {/* Canlı Yarı Tepkimeler & Hacim Oranı Kartı */}
      <div
        style={{
          backgroundColor: 'var(--card-2)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          padding: '14px',
          display: 'grid',
          gap: '8px',
          fontSize: '13px'
        }}
      >
        {mode === 'water' ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <strong style={{ color: 'var(--text)' }}>Suyun Elektrolizi Yarı Tepkimeleri</strong>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: 'var(--ok)',
                  backgroundColor: 'var(--ok-soft)',
                  padding: '2px 9px',
                  borderRadius: '999px'
                }}
              >
                Katot H₂ : Anot O₂ = 2V : V (Tam 2 Kat!)
              </span>
            </div>
            <div>
              <strong style={{ color: 'var(--accent)' }}>(+) Anot (Yükseltgenme): </strong>
              <code>2H₂O(s) → O₂(g) + 4H⁺(suda) + 4e⁻</code>
            </div>
            <div>
              <strong style={{ color: 'var(--ok)' }}>(-) Katot (İndirgenme): </strong>
              <code>4H⁺(suda) + 4e⁻ → 2H₂(g)</code>
            </div>
            <div style={{ paddingTop: '6px', borderTop: '1px dashed var(--border-2)' }}>
              <strong style={{ color: 'var(--warn)' }}>Net Tepkime: </strong>
              <code>2H₂O(s) → 2H₂(g) + O₂(g)</code>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <strong style={{ color: 'var(--text)' }}>Erimiş NaCl Elektrolizi Yarı Tepkimeleri</strong>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: 'var(--warn)',
                  backgroundColor: 'var(--warn-soft)',
                  padding: '2px 9px',
                  borderRadius: '999px'
                }}
              >
                Anyon (+) Anota · Katyon (-) Katota
              </span>
            </div>
            <div>
              <strong style={{ color: 'var(--accent)' }}>(+) Anot (Yükseltgenme): </strong>
              <code>2Cl⁻(s) → Cl₂(g) + 2e⁻</code>
            </div>
            <div>
              <strong style={{ color: 'var(--ok)' }}>(-) Katot (İndirgenme): </strong>
              <code>2Na⁺(s) + 2e⁻ → 2Na(s)</code>
            </div>
            <div style={{ paddingTop: '6px', borderTop: '1px dashed var(--border-2)' }}>
              <strong style={{ color: 'var(--warn)' }}>Net Tepkime: </strong>
              <code>2NaCl(s) → 2Na(s) + Cl₂(g)</code>
            </div>
          </>
        )}
      </div>

      {/* ÖSYM Tuzağı + Pratik CTA */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 14px',
          backgroundColor: 'var(--accent-soft)',
          border: '1px solid var(--accent)',
          borderRadius: '12px'
        }}
      >
        <div style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.5, flex: '1 1 320px' }}>
          <strong style={{ color: 'var(--accent)' }}>🎯 ÖSYM Tuzağı: </strong>
          <strong>Anot–Katot işaretleri pildekinin TERSİDİR: Elektrolizde Anot (+), Katot (-)!</strong>{' '}
          (Ancak KİMYA kuralı her zaman aynıdır: Anotta yine yükseltgenme, Katotta yine indirgenme olur.)
        </div>

        {onPracticeTopic && (
          <button type="button" className="btn primary small" onClick={onPracticeTopic}>
            ⚡ Elektrokimya Testini Çöz
          </button>
        )}
      </div>
    </div>
  );
};
