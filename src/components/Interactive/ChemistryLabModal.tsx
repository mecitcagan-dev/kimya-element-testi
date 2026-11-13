import React, { useEffect, useState } from 'react';

export interface ChemistryLabModalProps {
  isOpen: boolean;
  initialTab?: 'equilibrium' | 'electrochemistry';
  onClose: () => void;
  onStartEquilibriumQuiz: () => void;
  onStartElectroQuiz: () => void;
}

type LabTab = 'equilibrium' | 'electrochemistry';

/* ============================================================================
 * TAB 1: LE CHATELIER DENGE SİMÜLATÖRÜ VERİLERİ
 * ========================================================================== */

type ReactionId = 'haber' | 'no2' | 'caco3';

type DisturbanceId =
  | 'temp_up'
  | 'temp_down'
  | 'vol_down'
  | 'vol_up'
  | 'catalyst'
  | 'add_reactant_gas'
  | 'add_inert'
  | 'add_solid';

type ShiftDirection = 'right' | 'left' | 'none';
type KcEffect = 'increase' | 'decrease' | 'unchanged';

interface ReactionDef {
  id: ReactionId;
  title: string;
  subtitle: string;
  equation: string;
  deltaHLabel: string;
  isExothermic: boolean;
  isHeterogeneous: boolean;
  gasMolesLeft: number;
  gasMolesRight: number;
  kcExpression: string;
  reactantGasLabel: string | null;
  solidLabel: string | null;
  colorNote?: string;
}

interface DisturbanceButtonDef {
  id: DisturbanceId;
  label: string;
  shortTag: string;
}

interface DisturbanceOutcome {
  shift: ShiftDirection;
  shiftLabel: string;
  kc: KcEffect;
  kcLabel: string;
  rateComparison: string;
  rateDetail: string;
  concentrationsSummary: string;
  osymTrap: string;
  graphMode:
    | 'temp_shift_right'
    | 'temp_shift_left'
    | 'vol_down_shift_right'
    | 'vol_down_shift_left'
    | 'vol_up_shift_right'
    | 'vol_up_shift_left'
    | 'caco3_vol_down'
    | 'caco3_vol_up'
    | 'add_reactant_shift_right'
    | 'no_change_catalyst'
    | 'no_change_flat';
}

const REACTIONS: ReactionDef[] = [
  {
    id: 'haber',
    title: 'Haber Süreci (Amonyak Sentezi)',
    subtitle: 'Ekzotermik • Gaz molü azalıyor (4 → 2)',
    equation: 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g) + Isı',
    deltaHLabel: 'ΔH < 0 (Ekzotermik)',
    isExothermic: true,
    isHeterogeneous: false,
    gasMolesLeft: 4,
    gasMolesRight: 2,
    kcExpression: 'Kc = [NH₃]² / ([N₂] · [H₂]³)',
    reactantGasLabel: 'N₂(g) / H₂(g)',
    solidLabel: null
  },
  {
    id: 'no2',
    title: 'Azot Dioksit Dengesi',
    subtitle: 'Endotermik • Gaz molü artıyor (1 → 2)',
    equation: 'N₂O₄(g) + Isı ⇌ 2NO₂(g)',
    deltaHLabel: 'ΔH > 0 (Endotermik)',
    isExothermic: false,
    isHeterogeneous: false,
    gasMolesLeft: 1,
    gasMolesRight: 2,
    kcExpression: 'Kc = [NO₂]² / [N₂O₄]',
    reactantGasLabel: 'N₂O₄(g)',
    solidLabel: null,
    colorNote: 'N₂O₄(g) renksizdir, NO₂(g) ise kızıl-kahverengidir.'
  },
  {
    id: 'caco3',
    title: 'Kireç Taşı Ayrışması',
    subtitle: 'Heterojen Endotermik • Sadece CO₂(g) bağıntıda',
    equation: 'CaCO₃(k) + Isı ⇌ CaO(k) + CO₂(g)',
    deltaHLabel: 'ΔH > 0 (Endotermik)',
    isExothermic: false,
    isHeterogeneous: true,
    gasMolesLeft: 0,
    gasMolesRight: 1,
    kcExpression: 'Kc = [CO₂]  (Katılar yazılmaz!)',
    reactantGasLabel: null,
    solidLabel: 'CaCO₃(k) veya CaO(k)'
  }
];

const DISTURBANCES: DisturbanceButtonDef[] = [
  { id: 'temp_up', label: '🔥 Sıcaklığı Artır (T↑)', shortTag: 'T ↑' },
  { id: 'temp_down', label: '❄️ Sıcaklığı Azalt (T↓)', shortTag: 'T ↓' },
  { id: 'vol_down', label: '📦 Hacmi Küçült (V↓, P↑)', shortTag: 'V ↓' },
  { id: 'vol_up', label: '🎈 Hacmi Büyüt (V↑, P↓)', shortTag: 'V ↑' },
  { id: 'catalyst', label: '⚡ Katalizör Ekle', shortTag: 'Katalizör' },
  { id: 'add_reactant_gas', label: '➕ Giren Gaz Ekle', shortTag: '+ Gaz' },
  { id: 'add_inert', label: '💨 Sabit Hacimde İnert Gaz (He) Ekle', shortTag: '+ He(g)' },
  { id: 'add_solid', label: '🪨 Saf Katı Ekle', shortTag: '+ Katı' }
];

function computeEquilibriumOutcome(
  reaction: ReactionDef,
  disturbance: DisturbanceId
): DisturbanceOutcome {
  switch (disturbance) {
    case 'temp_up': {
      if (reaction.isExothermic) {
        return {
          shift: 'left',
          shiftLabel: '⬅️ Girenler Lehine',
          kc: 'decrease',
          kcLabel: '📉 Azalır',
          rateComparison: 'rᵢ ↑ ve r₉ ↑ (r₉ > rᵢ olur)',
          rateDetail:
            'Sıcaklık arttığı için hem ileri hız (rᵢ) hem geri hız (r₉) artar; ancak endotermik olan geri yön daha çok hızlanır.',
          concentrationsSummary:
            '[NH₃] azalır; [N₂] ve [H₂] artar. Toplam gaz mol sayısı ve kaptaki basınç artar.',
          osymTrap:
            'Sıcaklık artınca ekzotermik tepkime bile olsa ileri ve geri HIZ her ikisi de artar! "Ekzotermik olduğu için hız azalır" ifadesi klasik ÖSYM tuzağıdır.',
          graphMode: 'temp_shift_left'
        };
      }
      return {
        shift: 'right',
        shiftLabel: '➡️ Ürünler Lehine',
        kc: 'increase',
        kcLabel: '📈 Artar',
        rateComparison: 'rᵢ ↑ ve r₉ ↑ (rᵢ > r₉ olur)',
        rateDetail:
          'Sıcaklık arttığı için hem ileri (rᵢ) hem geri (r₉) hız artar; endotermik olan ileri yön daha fazla hızlanır.',
        concentrationsSummary:
          reaction.id === 'no2'
            ? '[NO₂] artar, [N₂O₄] azalır. Kabın rengi koyulaşır.'
            : 'CaCO₃(k) ayrışması artar; CO₂(g) derişimi ve mol sayısı artar, CaO(k) kütlesi artar.',
        osymTrap:
          reaction.id === 'caco3'
            ? 'Heterojen tepkimede Kc = [CO₂] olduğundan sıcaklık artışı Kc değerini doğrudan büyütür.'
            : 'Endotermik tepkimede sıcaklık artınca ürün verimi ve Kc artar; ancak her iki hızın da (rᵢ ve r₉) arttığı unutulmamalıdır.',
        graphMode: 'temp_shift_right'
      };
    }

    case 'temp_down': {
      if (reaction.isExothermic) {
        return {
          shift: 'right',
          shiftLabel: '➡️ Ürünler Lehine',
          kc: 'increase',
          kcLabel: '📈 Artar',
          rateComparison: 'rᵢ ↓ ve r₉ ↓ (r₉ daha çok düşer → rᵢ > r₉)',
          rateDetail:
            'Sıcaklık azaldığı için hem ileri hem geri hız DÜŞER; ancak endotermik olan geri hız daha çok azaldığından net akış ürünlere yönelir.',
          concentrationsSummary:
            '[NH₃] artar; [N₂] ve [H₂] azalır. Toplam gaz mol sayısı azalır.',
          osymTrap:
            'Denge ürünlere kaysa bile sıcaklık düştüğü için ileri ve geri hızların İKİSİ DE AZALIR! "Ürünlere kaydığı için ileri hız artar" tuzağına düşme.',
          graphMode: 'temp_shift_right'
        };
      }
      return {
        shift: 'left',
        shiftLabel: '⬅️ Girenler Lehine',
        kc: 'decrease',
        kcLabel: '📉 Azalır',
        rateComparison: 'rᵢ ↓ ve r₉ ↓ (rᵢ daha çok düşer → r₉ > rᵢ)',
        rateDetail:
          'Sıcaklık düştüğünde hem ileri hem geri hız azalır; endotermik ileri yön daha çok yavaşladığı için denge girenlere kayar.',
        concentrationsSummary:
          reaction.id === 'no2'
            ? '[NO₂] azalır, [N₂O₄] artar. Kahverengi renk açılır.'
            : 'CO₂(g) derişimi ve molü azalır; CaCO₃(k) kütlesi artar, CaO(k) azalır.',
        osymTrap:
          'Sıcaklık azalması tüm tepkimelerde (endo veya ekzo fark etmeksizin) ileri ve geri hız sabitlerini (kᵢ ve k₉) küçültür.',
        graphMode: 'temp_shift_left'
      };
    }

    case 'vol_down': {
      const rightFewerGas = reaction.gasMolesRight < reaction.gasMolesLeft;
      if (reaction.id === 'caco3') {
        return {
          shift: 'left',
          shiftLabel: '⬅️ Girenler Lehine',
          kc: 'unchanged',
          kcLabel: '🔒 DEĞİŞMEZ (Sadece sıcaklık değiştirir!)',
          rateComparison: 'r₉ ani artar (r₉ > rᵢ), sonra tekrar eşitlenir',
          rateDetail:
            'Hacim küçülünce [CO₂] artar ve geri hız (r₉) büyür; CO₂(g) + CaO(k) → CaCO₃(k) yönüne kayar.',
          concentrationsSummary:
            '[CO₂] önce sıçrar, sonra eski değerine TAM OLARAK geri döner! CO₂(g) mol sayısı azalır, CaCO₃(k) miktarı artar.',
          osymTrap:
            'DEV ÖSYM TUZAĞI: Sıcaklık sabit olduğu için Kc = [CO₂] DEĞİŞMEZ! Yani yeni dengede [CO₂] derişimi ve kısmi basıncı (P = [CO₂]·R·T) ilk değerine eşit kalır; yalnızca CO₂(g) mol sayısı azalır ve CaCO₃(k) kütlesi artar.',
          graphMode: 'caco3_vol_down'
        };
      }
      if (rightFewerGas) {
        return {
          shift: 'right',
          shiftLabel: '➡️ Ürünler Lehine (4 mol → 2 mol gaz)',
          kc: 'unchanged',
          kcLabel: '🔒 DEĞİŞMEZ (Sadece sıcaklık değiştirir!)',
          rateComparison: 'rᵢ ↑ ve r₉ ↑ (tüm derişimler arttı; rᵢ > r₉)',
          rateDetail:
            'M = n/V olduğundan tüm gazların derişimi artar; katsayısı büyük olan girenler hızı (rᵢ) daha fazla artar.',
          concentrationsSummary:
            'Tüm gazların molar derişimi başlangıca göre ARTAR! Denge ürünlere kaydığı için NH₃ verimi artar, toplam mol azalır.',
          osymTrap:
            'Hacim azaldığında denge ürünlere kaysa bile [N₂] ve [H₂] derişimleri ilk dengeye göre YÜKSEK kalır (sıçrama miktarı geri dönüşten büyüktür).',
          graphMode: 'vol_down_shift_right'
        };
      }
      return {
        shift: 'left',
        shiftLabel: '⬅️ Girenler Lehine (2 mol → 1 mol gaz)',
        kc: 'unchanged',
        kcLabel: '🔒 DEĞİŞMEZ (Sadece sıcaklık değiştirir!)',
        rateComparison: 'rᵢ ↑ ve r₉ ↑ (tüm derişimler arttı; r₉ > rᵢ)',
        rateDetail:
          'Hacim küçülünce hem [N₂O₄] hem [NO₂] artar; [NO₂]² terimi nedeniyle geri hız daha fazla büyür.',
        concentrationsSummary:
          'Hem [N₂O₄] hem [NO₂] son durumda başlangıçtan yüksektir! İlk anda renk koyulaşır, sonra biraz açılsa da ilk hâlinden koyu kalır.',
        osymTrap:
          'Denge girenlere kaydığı için "NO₂ derişimi ilk duruma göre azalır" demek yanlıştır; hacim küçüldüğü için TÜM gazların derişimi artmıştır.',
        graphMode: 'vol_down_shift_left'
      };
    }

    case 'vol_up': {
      const rightMoreGas = reaction.gasMolesRight > reaction.gasMolesLeft;
      if (reaction.id === 'caco3') {
        return {
          shift: 'right',
          shiftLabel: '➡️ Ürünler Lehine',
          kc: 'unchanged',
          kcLabel: '🔒 DEĞİŞMEZ (Sadece sıcaklık değiştirir!)',
          rateComparison: 'r₉ ani düşer (rᵢ > r₉), sonra tekrar eşitlenir',
          rateDetail:
            'Hacim büyüyünce [CO₂] düşer ve geri hız azalır; bir miktar CaCO₃(k) ayrışarak CO₂(g) üretir.',
          concentrationsSummary:
            '[CO₂] önce düşer, yeterli CaCO₃(k) varsa tekrar ilk değerine yükselir! CO₂ mol sayısı artar, CaCO₃(k) kütlesi azalır.',
          osymTrap:
            'Sıcaklık sabitken Kc = [CO₂] sabit kalmak zorundadır. Bu nedenle yeterli katı varsa CO₂ derişimi ve kısmi basıncı ilk değerine geri döner!',
          graphMode: 'caco3_vol_up'
        };
      }
      if (rightMoreGas) {
        return {
          shift: 'right',
          shiftLabel: '➡️ Ürünler Lehine (1 mol → 2 mol gaz)',
          kc: 'unchanged',
          kcLabel: '🔒 DEĞİŞMEZ (Sadece sıcaklık değiştirir!)',
          rateComparison: 'rᵢ ↓ ve r₉ ↓ (tüm derişimler azaldı; rᵢ > r₉)',
          rateDetail:
            'Hacim büyüyünce tüm gaz derişimleri düşer; geri hız [NO₂]² ile orantılı olduğu için daha çok düşer.',
          concentrationsSummary:
            'Hem [N₂O₄] hem [NO₂] son durumda ilk dengeye göre AZALIR! Renk ilk anda açılır, sonra hafifçe koyulaşsa da ilk hâlinden açık kalır.',
          osymTrap:
            'Hacim arttırıldığında denge ürünlere kaysa bile [NO₂] başlangıçtaki derişimine ASLA geri çıkamaz.',
          graphMode: 'vol_up_shift_right'
        };
      }
      return {
        shift: 'left',
        shiftLabel: '⬅️ Girenler Lehine (2 mol → 4 mol gaz)',
        kc: 'unchanged',
        kcLabel: '🔒 DEĞİŞMEZ (Sadece sıcaklık değiştirir!)',
        rateComparison: 'rᵢ ↓ ve r₉ ↓ (tüm derişimler azaldı; r₉ > rᵢ)',
        rateDetail:
          'Hacim büyüyünce tüm gazların derişimi düşer; gaz molünün fazla olduğu girenlere doğru bozulma olur.',
        concentrationsSummary:
          'Tüm gazların molar derişimi başlangıca göre AZALIR; toplam gaz mol sayısı ise artar.',
        osymTrap:
          'Gaz mol sayısının artması (girenlere kayış), hacim artışından kaynaklı derişim düşüşünü telafi edemez; [N₂] ve [H₂] de başlangıcın altında kalır.',
        graphMode: 'vol_up_shift_left'
      };
    }

    case 'catalyst':
      return {
        shift: 'none',
        shiftLabel: '⏸️ Denge Bozulmaz',
        kc: 'unchanged',
        kcLabel: '🔒 DEĞİŞMEZ (Sadece sıcaklık değiştirir!)',
        rateComparison: 'rᵢ ↑ ve r₉ ↑ (AYNI oranda artar → rᵢ = r₉)',
        rateDetail:
          'Pozitif katalizör aktifleşme enerjisini (Ea) düşürerek ileri ve geri hız sabitlerini (kᵢ ve k₉) eşit oranda artırır.',
        concentrationsSummary:
          'Dengedeki tüm maddelerin derişimi, mol sayısı ve ürün verimi SABİT kalır.',
        osymTrap:
          'Katalizör dengeye ulaşma süresini kısaltır ancak denge konumunu, ΔH değerini ve Kc sabitini ASLA değiştirmez!',
        graphMode: 'no_change_catalyst'
      };

    case 'add_reactant_gas': {
      if (!reaction.reactantGasLabel) {
        return {
          shift: 'none',
          shiftLabel: '⏸️ Denge Bozulmaz (Girenlerde gaz yok!)',
          kc: 'unchanged',
          kcLabel: '🔒 DEĞİŞMEZ (Sadece sıcaklık değiştirir!)',
          rateComparison: 'rᵢ ve r₉ DEĞİŞMEZ',
          rateDetail:
            'CaCO₃(k) + Isı ⇌ CaO(k) + CO₂(g) tepkimesinde girenlerde gaz fazında madde yoktur; CaCO₃ saf katıdır.',
          concentrationsSummary:
            'Yalnızca ürün tarafındaki CO₂(g) eklenirse denge girenlere kayar; giren katı eklenmesi dengeyi bozmaz.',
          osymTrap:
            'Heterojen dengelerde girenlerde yalnızca katı/sıvı varsa "giren eklenmesi dengeyi ürünlere kaydırır" genellemesi ÇALIŞMAZ!',
          graphMode: 'no_change_flat'
        };
      }
      return {
        shift: 'right',
        shiftLabel: '➡️ Ürünler Lehine',
        kc: 'unchanged',
        kcLabel: '🔒 DEĞİŞMEZ (Sadece sıcaklık değiştirir!)',
        rateComparison: 'rᵢ ani artar (rᵢ > r₉), zamanla tekrar eşitlenir',
        rateDetail:
          `Kaba ${reaction.reactantGasLabel} eklenince giren derişimi artar ve ileri tepkime hızlanır.`,
        concentrationsSummary:
          reaction.id === 'haber'
            ? 'Eklenen gazın (örn. N₂) derişimi ilk hâlinden YÜKSEK kalır; diğer giren H₂ harcandığı için azalır, ürün NH₃ artar.'
            : '[N₂O₄] önce fırlar sonra bir kısmı harcanır ama ilk değerinin ÜSTÜNDE kalır; [NO₂] artar.',
        osymTrap:
          'Le Chatelier ilkesi etkiyi SIFIRLAMAZ, yalnızca AZALTIR! Eklenen gazın tamamı tükenmez; son derişimi başlangıçtan mutlaka büyüktür.',
        graphMode: 'add_reactant_shift_right'
      };
    }

    case 'add_inert':
      return {
        shift: 'none',
        shiftLabel: '⏸️ Denge Bozulmaz',
        kc: 'unchanged',
        kcLabel: '🔒 DEĞİŞMEZ (Sadece sıcaklık değiştirir!)',
        rateComparison: 'rᵢ ve r₉ DEĞİŞMEZ',
        rateDetail:
          'Sabit hacimli kaba tepkimeye girmeyen He(g) eklendiğinde tepkimedeki gazların derişimleri (n/V) ve kısmi basınçları değişmez.',
        concentrationsSummary:
          'Kaptaki toplam basınç (P_toplam) artar ancak tepkime bileşenlerinin derişimi ve kısmi basıncı değişmez.',
        osymTrap:
          'DİKKAT: "Sabit hacimde" He eklemek dengeyi BOZMAZ; fakat "sabit basınçlı ideal pistonlu kapta" He eklenseydi hacim artacağı için gaz derişimleri düşer ve denge gaz molünün çok olduğu tarafa kayardı!',
        graphMode: 'no_change_flat'
      };

    case 'add_solid':
      if (reaction.isHeterogeneous) {
        return {
          shift: 'none',
          shiftLabel: '⏸️ Denge Bozulmaz',
          kc: 'unchanged',
          kcLabel: '🔒 DEĞİŞMEZ (Sadece sıcaklık değiştirir!)',
          rateComparison: 'rᵢ ve r₉ DEĞİŞMEZ',
          rateDetail:
            `Saf katıların (${reaction.solidLabel}) molar derişimleri (d / M_A) sabittir ve Kc = [CO₂] bağıntısında yer almaz.`,
          concentrationsSummary:
            'Eklenen katının kendi mol sayısı artar ancak [CO₂] ve denge konumu değişmez (kapta zaten katı bulunduğu sürece).',
          osymTrap:
            'Klasik ÖSYM tuzağı: CaCO₃(k) veya CaO(k) eklemek ya da bir kısmını (tamamen bitirmeden) almak dengeyi HİÇBİR YÖNE kaydırmaz!',
          graphMode: 'no_change_flat'
        };
      }
      return {
        shift: 'none',
        shiftLabel: '⏸️ Denge Bozulmaz',
        kc: 'unchanged',
        kcLabel: '🔒 DEĞİŞMEZ (Sadece sıcaklık değiştirir!)',
        rateComparison: 'rᵢ ve r₉ DEĞİŞMEZ',
        rateDetail:
          'Bu tepkime homojen gaz dengesidir; tepkimede katı faz bulunmaz ve katıların derişimi denge bağıntısına yazılmaz.',
        concentrationsSummary:
          'Gaz bileşenlerin derişimi değişmediği sürece denge bozulmaz.',
        osymTrap:
          'Saf katı ve saf sıvıların derişimi sabit kabul edildiğinden heterojen dengelerde bile Kc bağıntısına ve denge yönüne etki etmezler.',
        graphMode: 'no_change_flat'
      };
  }
}

const EquilibriumGraph: React.FC<{
  outcome: DisturbanceOutcome;
  reaction: ReactionDef;
}> = ({ outcome, reaction }) => {
  const mode = outcome.graphMode;

  // İki eğri çiziyoruz: Giren/Gaz (mavi #4dabf7) ve Ürün/Gaz (yeşil #40c057)
  // t1 = 110, t2 = 250 (x ekseni: 30..310)
  let leftLabel = reaction.id === 'caco3' ? 'CaCO₃(k) miktarı' : reaction.id === 'haber' ? '[N₂], [H₂]' : '[N₂O₄]';
  let rightLabel = reaction.id === 'caco3' ? '[CO₂]' : reaction.id === 'haber' ? '[NH₃]' : '[NO₂]';

  let leftPath = 'M 30 95 L 110 95 L 300 95';
  let rightPath = 'M 30 55 L 110 55 L 300 55';
  let rateNote = 't₁ anında etki uygulanır, t₂ anında yeni denge kurulur.';

  switch (mode) {
    case 'temp_shift_right':
      leftPath = 'M 30 70 L 110 70 Q 170 92 250 96 L 300 96';
      rightPath = 'M 30 75 L 110 75 Q 170 50 250 44 L 300 44';
      if (reaction.id === 'caco3') {
        leftLabel = 'CaCO₃(k) mol';
      }
      break;
    case 'temp_shift_left':
      leftPath = 'M 30 85 L 110 85 Q 170 58 250 52 L 300 52';
      rightPath = 'M 30 55 L 110 55 Q 170 84 250 90 L 300 90';
      if (reaction.id === 'caco3') {
        leftLabel = 'CaCO₃(k) mol';
      }
      break;
    case 'vol_down_shift_right':
      leftPath = 'M 30 85 L 110 85 L 110 46 Q 170 58 250 62 L 300 62';
      rightPath = 'M 30 98 L 110 98 L 110 66 Q 170 50 250 45 L 300 45';
      break;
    case 'vol_down_shift_left':
      leftPath = 'M 30 95 L 110 95 L 110 64 Q 170 48 250 44 L 300 44';
      rightPath = 'M 30 82 L 110 82 L 110 42 Q 170 56 250 60 L 300 60';
      break;
    case 'vol_up_shift_right':
      leftPath = 'M 30 52 L 110 52 L 110 86 Q 170 98 250 102 L 300 102';
      rightPath = 'M 30 62 L 110 62 L 110 96 Q 170 84 250 80 L 300 80';
      break;
    case 'vol_up_shift_left':
      leftPath = 'M 30 48 L 110 48 L 110 86 Q 170 74 250 70 L 300 70';
      rightPath = 'M 30 58 L 110 58 L 110 96 Q 170 106 250 110 L 300 110';
      break;
    case 'caco3_vol_down':
      leftLabel = 'CaCO₃(k) mol (katı)';
      leftPath = 'M 30 88 L 110 88 Q 170 72 250 68 L 300 68';
      rightPath = 'M 30 65 L 110 65 L 110 34 Q 175 62 250 65 L 300 65';
      rateNote = 'Sıcaklık sabit olduğundan [CO₂] = Kc eski değerine geri döner!';
      break;
    case 'caco3_vol_up':
      leftLabel = 'CaCO₃(k) mol (katı)';
      leftPath = 'M 30 68 L 110 68 Q 170 86 250 90 L 300 90';
      rightPath = 'M 30 65 L 110 65 L 110 98 Q 175 68 250 65 L 300 65';
      rateNote = 'Sıcaklık sabit olduğundan [CO₂] = Kc eski değerine geri döner!';
      break;
    case 'add_reactant_shift_right':
      leftPath = 'M 30 85 L 110 85 L 110 38 Q 170 54 250 58 L 300 58';
      rightPath = 'M 30 96 L 110 96 Q 170 72 250 66 L 300 66';
      rateNote = 'Eklenen gazın derişimi sıçrar; yeni dengede ilk değerinin üstünde kalır.';
      break;
    case 'no_change_catalyst':
      leftPath = 'M 30 84 L 110 84 L 300 84';
      rightPath = 'M 30 52 L 110 52 L 300 52';
      rateNote = 'Derişimler değişmez; katalizör sadece dengeye ulaşma süresini kısaltır.';
      break;
    case 'no_change_flat':
      leftPath = 'M 30 84 L 110 84 L 300 84';
      rightPath = 'M 30 52 L 110 52 L 300 52';
      rateNote = 'Etki anında (t₁) denge bileşenlerinin derişimleri değişmez.';
      break;
  }

  return (
    <div
      style={{
        backgroundColor: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '14px 16px'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '8px'
        }}
      >
        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)' }}>
          📈 Derişim / Miktar – Zaman Grafiği
        </span>
        <div style={{ display: 'flex', gap: '14px', fontSize: '12px' }}>
          <span style={{ color: '#4dabf7', fontWeight: 600 }}>● {leftLabel}</span>
          <span style={{ color: '#40c057', fontWeight: 600 }}>● {rightLabel}</span>
        </div>
      </div>

      <svg
        viewBox="0 0 330 135"
        style={{ width: '100%', maxHeight: '165px', display: 'block' }}
        aria-label="Denge derişim zaman grafiği"
      >
        {/* Eksenler */}
        <line x1="30" y1="16" x2="30" y2="115" stroke="#4a4a57" strokeWidth="1.5" />
        <line x1="30" y1="115" x2="312" y2="115" stroke="#4a4a57" strokeWidth="1.5" />

        {/* t1 ve t2 çizgileri */}
        <line x1="110" y1="18" x2="110" y2="115" stroke="#f5a524" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="250" y1="18" x2="250" y2="115" stroke="#6e6e7d" strokeWidth="1" strokeDasharray="3 3" />

        <text x="110" y="128" fill="#ffd43b" fontSize="10" fontWeight="700" textAnchor="middle">
          t₁ (Etki)
        </text>
        <text x="250" y="128" fill="#9b9bab" fontSize="10" fontWeight="700" textAnchor="middle">
          t₂ (Yeni Denge)
        </text>
        <text x="16" y="22" fill="#9b9bab" fontSize="10" fontWeight="700" textAnchor="middle">
          M
        </text>
        <text x="314" y="128" fill="#9b9bab" fontSize="10" fontWeight="700" textAnchor="end">
          t
        </text>

        {/* Eğriler */}
        <path d={leftPath} fill="none" stroke="#4dabf7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d={rightPath} fill="none" stroke="#40c057" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>{rateNote}</div>
    </div>
  );
};

/* ============================================================================
 * TAB 2: GALVANİK PİL & ELEKTROLİZ CANLANDIRICISI VERİLERİ
 * ========================================================================== */

type ElectrodeId = 'Mg' | 'Al' | 'Zn' | 'Fe' | 'H2' | 'Cu' | 'Ag';

interface ElectrodeDef {
  id: ElectrodeId;
  symbol: string;
  barLabel: string;
  ionLabel: string;
  solutionLabel: string;
  eInd: number;
  electrons: number;
  isGasPt: boolean;
  rodColor: string;
  solutionColor: string;
  reductionBase: { left: string; right: string };
  oxidationBase: { left: string; right: string };
}

const ELECTRODES: ElectrodeDef[] = [
  {
    id: 'Mg',
    symbol: 'Mg',
    barLabel: 'Mg(k)',
    ionLabel: 'Mg²⁺',
    solutionLabel: '1 M Mg²⁺',
    eInd: -2.37,
    electrons: 2,
    isGasPt: false,
    rodColor: '#adb5bd',
    solutionColor: 'rgba(173, 181, 189, 0.14)',
    reductionBase: { left: 'Mg²⁺(suda) + 2e⁻', right: 'Mg(k)' },
    oxidationBase: { left: 'Mg(k)', right: 'Mg²⁺(suda) + 2e⁻' }
  },
  {
    id: 'Al',
    symbol: 'Al',
    barLabel: 'Al(k)',
    ionLabel: 'Al³⁺',
    solutionLabel: '1 M Al³⁺',
    eInd: -1.66,
    electrons: 3,
    isGasPt: false,
    rodColor: '#ced4da',
    solutionColor: 'rgba(206, 212, 218, 0.14)',
    reductionBase: { left: 'Al³⁺(suda) + 3e⁻', right: 'Al(k)' },
    oxidationBase: { left: 'Al(k)', right: 'Al³⁺(suda) + 3e⁻' }
  },
  {
    id: 'Zn',
    symbol: 'Zn',
    barLabel: 'Zn(k)',
    ionLabel: 'Zn²⁺',
    solutionLabel: '1 M Zn²⁺',
    eInd: -0.76,
    electrons: 2,
    isGasPt: false,
    rodColor: '#868e96',
    solutionColor: 'rgba(134, 142, 150, 0.15)',
    reductionBase: { left: 'Zn²⁺(suda) + 2e⁻', right: 'Zn(k)' },
    oxidationBase: { left: 'Zn(k)', right: 'Zn²⁺(suda) + 2e⁻' }
  },
  {
    id: 'Fe',
    symbol: 'Fe',
    barLabel: 'Fe(k)',
    ionLabel: 'Fe²⁺',
    solutionLabel: '1 M Fe²⁺',
    eInd: -0.44,
    electrons: 2,
    isGasPt: false,
    rodColor: '#747880',
    solutionColor: 'rgba(64, 192, 87, 0.15)',
    reductionBase: { left: 'Fe²⁺(suda) + 2e⁻', right: 'Fe(k)' },
    oxidationBase: { left: 'Fe(k)', right: 'Fe²⁺(suda) + 2e⁻' }
  },
  {
    id: 'H2',
    symbol: 'H₂ (Pt)',
    barLabel: 'Pt / H₂(g)',
    ionLabel: 'H⁺',
    solutionLabel: '1 M H⁺ (pH=0)',
    eInd: 0.0,
    electrons: 2,
    isGasPt: true,
    rodColor: '#e9ecef',
    solutionColor: 'rgba(77, 171, 247, 0.16)',
    reductionBase: { left: '2H⁺(suda) + 2e⁻', right: 'H₂(g)' },
    oxidationBase: { left: 'H₂(g)', right: '2H⁺(suda) + 2e⁻' }
  },
  {
    id: 'Cu',
    symbol: 'Cu',
    barLabel: 'Cu(k)',
    ionLabel: 'Cu²⁺',
    solutionLabel: '1 M Cu²⁺',
    eInd: 0.34,
    electrons: 2,
    isGasPt: false,
    rodColor: '#e67700',
    solutionColor: 'rgba(34, 139, 230, 0.24)',
    reductionBase: { left: 'Cu²⁺(suda) + 2e⁻', right: 'Cu(k)' },
    oxidationBase: { left: 'Cu(k)', right: 'Cu²⁺(suda) + 2e⁻' }
  },
  {
    id: 'Ag',
    symbol: 'Ag',
    barLabel: 'Ag(k)',
    ionLabel: 'Ag⁺',
    solutionLabel: '1 M Ag⁺',
    eInd: 0.8,
    electrons: 1,
    isGasPt: false,
    rodColor: '#f8f9fa',
    solutionColor: 'rgba(248, 249, 250, 0.12)',
    reductionBase: { left: 'Ag⁺(suda) + e⁻', right: 'Ag(k)' },
    oxidationBase: { left: 'Ag(k)', right: 'Ag⁺(suda) + e⁻' }
  }
];

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

function formatCoef(coef: number, formula: string): string {
  return coef === 1 ? formula : `${coef}${formula}`;
}

function formatNetReaction(anot: ElectrodeDef, katot: ElectrodeDef): {
  anotHalf: string;
  katotHalf: string;
  netEquation: string;
  transferredElectrons: number;
} {
  const lcm = (anot.electrons * katot.electrons) / gcd(anot.electrons, katot.electrons);
  const multA = lcm / anot.electrons;
  const multK = lcm / katot.electrons;

  const anotHalf = `${anot.oxidationBase.left} → ${anot.oxidationBase.right}   (E°yüks = ${(-anot.eInd >= 0 ? '+' : '') + (-anot.eInd).toFixed(2)} V)`;
  const katotHalf = `${katot.reductionBase.left} → ${katot.reductionBase.right}   (E°ind = ${(katot.eInd >= 0 ? '+' : '') + katot.eInd.toFixed(2)} V)`;

  const anotLeftTerm = anot.isGasPt
    ? formatCoef(multA, 'H₂(g)')
    : formatCoef(multA, `${anot.symbol}(k)`);
  const anotRightTerm = anot.isGasPt
    ? formatCoef(2 * multA, 'H⁺(suda)')
    : formatCoef(multA, `${anot.ionLabel}(suda)`);

  const katotLeftTerm = katot.isGasPt
    ? formatCoef(2 * multK, 'H⁺(suda)')
    : formatCoef(multK, `${katot.ionLabel}(suda)`);
  const katotRightTerm = katot.isGasPt
    ? formatCoef(multK, 'H₂(g)')
    : formatCoef(multK, `${katot.symbol}(k)`);

  return {
    anotHalf,
    katotHalf,
    netEquation: `${anotLeftTerm} + ${katotLeftTerm} ⇌ ${anotRightTerm} + ${katotRightTerm}`,
    transferredElectrons: lcm
  };
}

function formatPotential(val: number): string {
  const fixed = val.toFixed(2);
  return val > 0 ? `+${fixed} V` : `${fixed} V`;
}

interface BatteryEffectsState {
  diluteAnode: boolean;
  diluteCathode: boolean;
  increaseTemp: boolean;
  removeSaltBridge: boolean;
}

const INITIAL_BATTERY_EFFECTS: BatteryEffectsState = {
  diluteAnode: false,
  diluteCathode: false,
  increaseTemp: false,
  removeSaltBridge: false
};

/* ============================================================================
 * ANA MODAL BİLEŞENİ
 * ========================================================================== */

export const ChemistryLabModal: React.FC<ChemistryLabModalProps> = ({
  isOpen,
  initialTab = 'equilibrium',
  onClose,
  onStartEquilibriumQuiz,
  onStartElectroQuiz
}) => {
  const [activeTab, setActiveTab] = useState<LabTab>(initialTab);

  // Tab 1 state
  const [selectedReactionId, setSelectedReactionId] = useState<ReactionId>('haber');
  const [selectedDisturbance, setSelectedDisturbance] = useState<DisturbanceId>('temp_up');

  // Tab 2 state
  const [leftElectrodeId, setLeftElectrodeId] = useState<ElectrodeId>('Zn');
  const [rightElectrodeId, setRightElectrodeId] = useState<ElectrodeId>('Cu');
  const [effects, setEffects] = useState<BatteryEffectsState>(INITIAL_BATTERY_EFFECTS);

  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activeReaction = REACTIONS.find(r => r.id === selectedReactionId) ?? REACTIONS[0];
  const outcome = computeEquilibriumOutcome(activeReaction, selectedDisturbance);

  const leftElectrode = ELECTRODES.find(e => e.id === leftElectrodeId) ?? ELECTRODES[2];
  const rightElectrode = ELECTRODES.find(e => e.id === rightElectrodeId) ?? ELECTRODES[5];
  const isSameElectrode = leftElectrode.id === rightElectrode.id;

  // Anot: E°ind küçük (E°yüks büyük); Katot: E°ind büyük
  const leftIsAnode = leftElectrode.eInd < rightElectrode.eInd;
  const anot = leftIsAnode ? leftElectrode : rightElectrode;
  const katot = leftIsAnode ? rightElectrode : leftElectrode;
  const standardEpil = isSameElectrode ? 0 : -anot.eInd + katot.eInd;
  const reactionInfo = isSameElectrode ? null : formatNetReaction(anot, katot);

  // Pil etkilerini hesapla
  const toggleEffect = (key: keyof BatteryEffectsState) => {
    setEffects(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getBatteryEffectSummary = () => {
    if (effects.removeSaltBridge) {
      return {
        badge: '⛔ Pil Durdu (Epil = 0.00 V)',
        color: '#ff6b6b',
        bg: 'rgba(229, 72, 77, 0.14)',
        border: 'rgba(229, 72, 77, 0.45)',
        detail:
          'Tuz köprüsü çıkarıldığında yarı hücrelerde yük denkliği sağlanamaz, dış devreden elektron akışı anında durur ve voltmetre 0.00 V gösterir!'
      };
    }

    if (isSameElectrode) {
      if (effects.diluteAnode && !effects.diluteCathode) {
        return {
          badge: '⚡ Derişim Pili Oluştu! (Epil > 0 V)',
          color: '#40c057',
          bg: 'rgba(48, 164, 108, 0.14)',
          border: 'rgba(48, 164, 108, 0.45)',
          detail:
            'Aynı elektrotlarda sol kaba su eklendiğinde sol kap daha seyreltik hâle gelir ve ANOT olur; derişim farkı sayesinde pil çalışır!'
        };
      }
      if (effects.diluteCathode && !effects.diluteAnode) {
        return {
          badge: '⚡ Derişim Pili Oluştu! (Epil > 0 V)',
          color: '#40c057',
          bg: 'rgba(48, 164, 108, 0.14)',
          border: 'rgba(48, 164, 108, 0.45)',
          detail:
            'Aynı elektrotlarda sağ kaba su eklendiğinde sağ kap daha seyreltik hâle gelir ve ANOT olur; derişim farkı sayesinde pil çalışır!'
        };
      }
      return {
        badge: '⏸️ Epil = 0.00 V (Çalışmaz)',
        color: '#adb5bd',
        bg: 'rgba(134, 142, 150, 0.14)',
        border: 'rgba(134, 142, 150, 0.4)',
        detail:
          'İki yarı hücrede aynı elektrot ve eşit derişim (1 M) olduğu için potansiyel farkı 0.00 V’tur.'
      };
    }

    const upReasons: string[] = [];
    const downReasons: string[] = [];

    if (effects.diluteAnode) {
      upReasons.push(
        `Anot kabına su eklenince [${anot.ionLabel}] azalır → Nernst / Le Chatelier dengesi ürünlere kayar → Epil ARTAR.`
      );
    }
    if (effects.diluteCathode) {
      downReasons.push(
        `Katot kabına su eklenince [${katot.ionLabel}] azalır → Denge girenlere kayar → Epil AZALIR.`
      );
    }
    if (effects.increaseTemp) {
      downReasons.push(
        'Galvanik piller EKZOTERMİK tepkimelerdir (Isı ürünlerde). Sıcaklık artınca denge girenlere kayar → Epil AZALIR!'
      );
    }

    if (upReasons.length === 0 && downReasons.length === 0) {
      return {
        badge: `🔒 Standart Şartlar (25 °C, 1 M) → E°pil = ${standardEpil.toFixed(2)} V`,
        color: '#4dabf7',
        bg: 'rgba(77, 171, 247, 0.12)',
        border: 'rgba(77, 171, 247, 0.35)',
        detail:
          'Nernst Denklemi: Epil = E°pil - (0.0592 / n) · log(Q). Standart şartlarda Q = 1 olduğu için log(1) = 0 ve Epil = E°pil olur.'
      };
    }

    if (upReasons.length > 0 && downReasons.length === 0) {
      return {
        badge: `📈 Epil ARTAR (> ${standardEpil.toFixed(2)} V)`,
        color: '#40c057',
        bg: 'rgba(48, 164, 108, 0.14)',
        border: 'rgba(48, 164, 108, 0.45)',
        detail: upReasons.join(' ')
      };
    }

    if (downReasons.length > 0 && upReasons.length === 0) {
      return {
        badge: `📉 Epil AZALIR (< ${standardEpil.toFixed(2)} V)`,
        color: '#ff6b6b',
        bg: 'rgba(229, 72, 77, 0.14)',
        border: 'rgba(229, 72, 77, 0.45)',
        detail: downReasons.join(' ')
      };
    }

    return {
      badge: '⚖️ Zıt Etkiler Bir Arada (Net Yön Miktarlara Bağlı)',
      color: '#ffd43b',
      bg: 'rgba(245, 165, 36, 0.14)',
      border: 'rgba(245, 165, 36, 0.45)',
      detail: `${upReasons.join(' ')} Ancak: ${downReasons.join(' ')}`
    };
  };

  const batteryEffectSummary = getBatteryEffectSummary();

  // Dashboard renk belirteçleri
  const shiftBadgeStyle =
    outcome.shift === 'right'
      ? { bg: 'rgba(48, 164, 108, 0.15)', color: '#40c057', border: 'rgba(48, 164, 108, 0.45)' }
      : outcome.shift === 'left'
        ? { bg: 'rgba(245, 165, 36, 0.15)', color: '#ffd43b', border: 'rgba(245, 165, 36, 0.45)' }
        : { bg: 'rgba(134, 142, 150, 0.15)', color: '#adb5bd', border: 'rgba(134, 142, 150, 0.4)' };

  const kcBadgeStyle =
    outcome.kc === 'increase'
      ? { bg: 'rgba(48, 164, 108, 0.15)', color: '#40c057', border: 'rgba(48, 164, 108, 0.45)' }
      : outcome.kc === 'decrease'
        ? { bg: 'rgba(229, 72, 77, 0.15)', color: '#ff6b6b', border: 'rgba(229, 72, 77, 0.45)' }
        : { bg: 'rgba(77, 171, 247, 0.15)', color: '#74c0fc', border: 'rgba(77, 171, 247, 0.4)' };

  const displayedVolts = effects.removeSaltBridge
    ? '0.00 V'
    : isSameElectrode
      ? '0.00 V*'
      : `${standardEpil.toFixed(2)} V`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="AYT İnteraktif Denge ve Pil Laboratuvarı"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '20px',
        backdropFilter: 'blur(5px)'
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{
          maxWidth: '1100px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          position: 'relative',
          padding: '28px 34px'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Başlık ve Kapat */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '32px' }}>⚗️</span>
            <div>
              <h2 style={{ margin: 0, fontSize: '22px' }}>
                AYT İnteraktif Denge & Pil Laboratuvarı
              </h2>
              <p className="hint" style={{ margin: '4px 0 0', fontSize: '14px' }}>
                Etkiyi seç, tepkime ve potansiyel değişimlerini canlı incele, ÖSYM tuzaklarını anında yakala!
              </p>
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

        {/* Ana Sekmeler */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginTop: '18px',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '12px'
          }}
        >
          <button
            type="button"
            className={`btn ${activeTab === 'equilibrium' ? 'primary' : 'ghost'} small`}
            onClick={() => setActiveTab('equilibrium')}
          >
            ⚖️ Le Chatelier Denge Simülatörü
          </button>
          <button
            type="button"
            className={`btn ${activeTab === 'electrochemistry' ? 'primary' : 'ghost'} small`}
            style={
              activeTab === 'electrochemistry'
                ? { backgroundColor: '#ffd43b', color: '#15151c' }
                : {}
            }
            onClick={() => setActiveTab('electrochemistry')}
          >
            🔋 Galvanik Pil & Elektroliz Canlandırıcısı
          </button>
        </div>

        {/* ================================================================ */}
        {/* TAB 1: LE CHATELIER DENGE SİMÜLATÖRÜ                           */}
        {/* ================================================================ */}
        {activeTab === 'equilibrium' && (
          <div style={{ marginTop: '20px', display: 'grid', gap: '20px' }}>
            {/* 1. Tepkime Seçimi */}
            <div>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'var(--muted)',
                  marginBottom: '10px'
                }}
              >
                1. Klasik ÖSYM Denge Tepkimesi Seç
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '12px'
                }}
              >
                {REACTIONS.map(r => {
                  const isActive = r.id === selectedReactionId;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSelectedReactionId(r.id)}
                      style={{
                        textAlign: 'left',
                        padding: '14px 16px',
                        borderRadius: '12px',
                        backgroundColor: isActive ? 'rgba(229, 72, 77, 0.12)' : 'var(--card-2)',
                        border: isActive ? '1.5px solid var(--accent)' : '1px solid var(--border-2)',
                        color: 'var(--text)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', alignItems: 'center' }}>
                        <strong style={{ fontSize: '14px' }}>{r.title}</strong>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '999px',
                            backgroundColor: r.isExothermic ? 'rgba(229, 72, 77, 0.16)' : 'rgba(77, 171, 247, 0.16)',
                            color: r.isExothermic ? '#ff8787' : '#74c0fc'
                          }}
                        >
                          {r.isExothermic ? 'Ekzotermik' : 'Endotermik'}
                        </span>
                      </div>
                      <div
                        style={{
                          marginTop: '8px',
                          fontSize: '15px',
                          fontWeight: 800,
                          color: '#ffd43b',
                          letterSpacing: '-0.01em'
                        }}
                      >
                        {r.equation}
                      </div>
                      <div style={{ marginTop: '4px', fontSize: '12px', color: 'var(--muted)' }}>
                        {r.subtitle}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Seçili Tepkime Özet Şeridi */}
              <div
                style={{
                  marginTop: '12px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--card-2)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px 20px',
                  fontSize: '13px',
                  alignItems: 'center'
                }}
              >
                <span>
                  <strong style={{ color: 'var(--muted)' }}>Bağıntı: </strong>
                  <code style={{ color: '#74c0fc', fontWeight: 700 }}>{activeReaction.kcExpression}</code>
                </span>
                <span>
                  <strong style={{ color: 'var(--muted)' }}>Gaz Molü: </strong>
                  <span>
                    Giren {activeReaction.gasMolesLeft} mol ⇌ Ürün {activeReaction.gasMolesRight} mol
                  </span>
                </span>
                <span>
                  <strong style={{ color: 'var(--muted)' }}>Isı Türü: </strong>
                  <span>{activeReaction.deltaHLabel}</span>
                </span>
                {activeReaction.colorNote && (
                  <span style={{ color: '#ffd43b', fontSize: '12px' }}>
                    🎨 {activeReaction.colorNote}
                  </span>
                )}
              </div>
            </div>

            {/* 2. Etki Seçimi */}
            <div>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'var(--muted)',
                  marginBottom: '10px'
                }}
              >
                2. Dengedeki Sisteme Etki Seç (Le Chatelier)
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: '8px'
                }}
              >
                {DISTURBANCES.map(d => {
                  const isActive = d.id === selectedDisturbance;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      className={`btn ${isActive ? 'primary' : 'secondary'} small`}
                      style={{
                        textAlign: 'left',
                        justifyContent: 'flex-start',
                        padding: '10px 14px',
                        borderColor: isActive ? 'var(--accent)' : 'var(--border-2)'
                      }}
                      onClick={() => setSelectedDisturbance(d.id)}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Anlık Sonuç Panosu */}
            <div
              style={{
                backgroundColor: 'var(--card-2)',
                border: '1px solid var(--border-2)',
                borderRadius: '14px',
                padding: '20px',
                display: 'grid',
                gap: '16px'
              }}
            >
              {/* Üst 3 Metrik Kartı */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    backgroundColor: shiftBadgeStyle.bg,
                    border: `1px solid ${shiftBadgeStyle.border}`,
                    borderRadius: '10px',
                    padding: '12px 14px'
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>
                    Denge Yönü
                  </div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: shiftBadgeStyle.color, marginTop: '4px' }}>
                    {outcome.shiftLabel}
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: kcBadgeStyle.bg,
                    border: `1px solid ${kcBadgeStyle.border}`,
                    borderRadius: '10px',
                    padding: '12px 14px'
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>
                    Denge Sabiti (Kc)
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: kcBadgeStyle.color, marginTop: '4px' }}>
                    {outcome.kcLabel}
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border-2)',
                    borderRadius: '10px',
                    padding: '12px 14px'
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>
                    İleri / Geri Hız (rᵢ, r₉)
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text)', marginTop: '4px' }}>
                    {outcome.rateComparison}
                  </div>
                </div>
              </div>

              {/* Grafik + Açıklama Izgarası */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '16px',
                  alignItems: 'start'
                }}
              >
                <EquilibriumGraph outcome={outcome} reaction={activeReaction} />

                <div style={{ display: 'grid', gap: '10px' }}>
                  <div
                    style={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      fontSize: '13.5px',
                      lineHeight: 1.5
                    }}
                  >
                    <div>
                      <strong style={{ color: '#4dabf7' }}>🔬 Hız & Derişim Mekanizması: </strong>
                      <span>{outcome.rateDetail}</span>
                    </div>
                    <div style={{ marginTop: '8px', color: 'var(--muted)' }}>
                      <strong style={{ color: 'var(--text)' }}>📊 Madde Miktarları: </strong>
                      {outcome.concentrationsSummary}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '12px 14px',
                      backgroundColor: 'rgba(245, 165, 36, 0.1)',
                      borderLeft: '4px solid #f5a524',
                      borderRadius: '8px',
                      fontSize: '13.5px',
                      lineHeight: 1.5
                    }}
                  >
                    <strong style={{ color: '#ffd43b' }}>⚠️ ÖSYM Tuzağı: </strong>
                    <span style={{ color: 'var(--text)' }}>{outcome.osymTrap}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 2: GALVANİK PİL & ELEKTROLİZ CANLANDIRICISI                  */}
        {/* ================================================================ */}
        {activeTab === 'electrochemistry' && (
          <div style={{ marginTop: '20px', display: 'grid', gap: '20px' }}>
            {/* 1. Sol ve Sağ Elektrot Seçicileri */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '14px'
              }}
            >
              {/* Sol Yarı Hücre */}
              <div
                style={{
                  backgroundColor: 'var(--card-2)',
                  border: '1px solid var(--border-2)',
                  borderRadius: '12px',
                  padding: '14px 16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <strong style={{ fontSize: '14px' }}>🧪 Sol Yarı Hücre Elektrotu</strong>
                  {!isSameElectrode && (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '999px',
                        backgroundColor: leftIsAnode ? 'rgba(229, 72, 77, 0.16)' : 'rgba(48, 164, 108, 0.16)',
                        color: leftIsAnode ? '#ff8787' : '#40c057'
                      }}
                    >
                      {leftIsAnode ? 'ANOT (-)' : 'KATOT (+)'}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {ELECTRODES.map(el => {
                    const active = el.id === leftElectrodeId;
                    return (
                      <button
                        key={el.id}
                        type="button"
                        className={`btn ${active ? 'primary' : 'ghost'} small`}
                        style={{ padding: '7px 11px', fontSize: '13px' }}
                        onClick={() => setLeftElectrodeId(el.id)}
                      >
                        {el.symbol} ({formatPotential(el.eInd)})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sağ Yarı Hücre */}
              <div
                style={{
                  backgroundColor: 'var(--card-2)',
                  border: '1px solid var(--border-2)',
                  borderRadius: '12px',
                  padding: '14px 16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <strong style={{ fontSize: '14px' }}>🧪 Sağ Yarı Hücre Elektrotu</strong>
                  {!isSameElectrode && (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '999px',
                        backgroundColor: !leftIsAnode ? 'rgba(229, 72, 77, 0.16)' : 'rgba(48, 164, 108, 0.16)',
                        color: !leftIsAnode ? '#ff8787' : '#40c057'
                      }}
                    >
                      {!leftIsAnode ? 'ANOT (-)' : 'KATOT (+)'}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {ELECTRODES.map(el => {
                    const active = el.id === rightElectrodeId;
                    return (
                      <button
                        key={el.id}
                        type="button"
                        className={`btn ${active ? 'primary' : 'ghost'} small`}
                        style={{ padding: '7px 11px', fontSize: '13px' }}
                        onClick={() => setRightElectrodeId(el.id)}
                      >
                        {el.symbol} ({formatPotential(el.eInd)})
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 2. Aynı Elektrot Uyarısı veya Pil Panosu */}
            {isSameElectrode ? (
              <div
                style={{
                  backgroundColor: 'rgba(245, 165, 36, 0.12)',
                  border: '1.5px solid rgba(245, 165, 36, 0.45)',
                  borderRadius: '14px',
                  padding: '20px',
                  display: 'grid',
                  gap: '10px'
                }}
              >
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffd43b' }}>
                  ⚠️ Aynı elektrot seçildi ({leftElectrode.symbol}) — Derişim Pili Şartı!
                </div>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.55, color: 'var(--text)' }}>
                  İki yarı hücrede de aynı elektrot (<code>{leftElectrode.symbol}</code>) ve aynı standart
                  derişim (1 M) varsa <strong>E°pil = 0.00 V</strong> olur ve pil çalışmaz.
                  Ancak çözeltilerin derişimleri farklı yapılırsa <strong>Derişim Pili</strong> oluşur:
                  <strong> Seyreltik olan kap ANOT</strong>, <strong>derişik olan kap KATOT</strong> olur
                  ve derişimler eşitleninceye kadar akım üretir!
                </p>
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: 'var(--card-2)',
                  border: '1px solid var(--border-2)',
                  borderRadius: '14px',
                  padding: '20px',
                  display: 'grid',
                  gap: '16px'
                }}
              >
                {/* Görsel Pil Şeması (SVG) + Temel Metrikler */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '18px',
                    alignItems: 'center'
                  }}
                >
                  {/* Canlı SVG Galvanik Pil Şeması */}
                  <div
                    style={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      padding: '12px 14px'
                    }}
                  >
                    <svg
                      viewBox="0 0 380 190"
                      style={{ width: '100%', display: 'block' }}
                      aria-label="Galvanik Pil Şeması"
                    >
                      {/* Dış devre teli */}
                      <path
                        d="M 85 68 L 85 26 L 295 26 L 295 68"
                        fill="none"
                        stroke={effects.removeSaltBridge ? '#6e6e7d' : '#ffd43b'}
                        strokeWidth="2.5"
                      />

                      {/* Voltmetre */}
                      <circle
                        cx="190"
                        cy="26"
                        r="22"
                        fill="#15151c"
                        stroke={effects.removeSaltBridge ? '#e5484d' : '#ffd43b'}
                        strokeWidth="2"
                      />
                      <text
                        x="190"
                        y="24"
                        fill="#fff"
                        fontSize="10"
                        fontWeight="800"
                        textAnchor="middle"
                      >
                        {displayedVolts}
                      </text>
                      <text
                        x="190"
                        y="35"
                        fill="#9b9bab"
                        fontSize="8"
                        fontWeight="700"
                        textAnchor="middle"
                      >
                        Voltmetre
                      </text>

                      {/* Elektron akış yönü etiketi */}
                      {!effects.removeSaltBridge && (
                        <text
                          x="190"
                          y="62"
                          fill="#ffd43b"
                          fontSize="11"
                          fontWeight="800"
                          textAnchor="middle"
                        >
                          {leftIsAnode ? 'e⁻ akışı: Sol → Sağ (Anot → Katot)' : 'e⁻ akışı: Sağ → Sol (Anot → Katot)'}
                        </text>
                      )}

                      {/* Sol Beher */}
                      <rect x="35" y="82" width="105" height="90" rx="6" fill="none" stroke="#4a4a57" strokeWidth="2" />
                      <rect x="37" y="108" width="101" height="62" rx="4" fill={leftElectrode.solutionColor} />
                      {/* Sol Elektrot Çubuğu */}
                      <rect x="77" y="68" width="16" height="80" rx="3" fill={leftElectrode.rodColor} />
                      <text x="85" y="162" fill="#ededf1" fontSize="10" fontWeight="700" textAnchor="middle">
                        {leftElectrode.solutionLabel}
                      </text>
                      <text
                        x="85"
                        y="185"
                        fill={leftIsAnode ? '#ff8787' : '#40c057'}
                        fontSize="11"
                        fontWeight="800"
                        textAnchor="middle"
                      >
                        {leftElectrode.barLabel} • {leftIsAnode ? 'ANOT (-)' : 'KATOT (+)'}
                      </text>

                      {/* Sağ Beher */}
                      <rect x="240" y="82" width="105" height="90" rx="6" fill="none" stroke="#4a4a57" strokeWidth="2" />
                      <rect x="242" y="108" width="101" height="62" rx="4" fill={rightElectrode.solutionColor} />
                      {/* Sağ Elektrot Çubuğu */}
                      <rect x="287" y="68" width="16" height="80" rx="3" fill={rightElectrode.rodColor} />
                      <text x="292" y="162" fill="#ededf1" fontSize="10" fontWeight="700" textAnchor="middle">
                        {rightElectrode.solutionLabel}
                      </text>
                      <text
                        x="292"
                        y="185"
                        fill={!leftIsAnode ? '#ff8787' : '#40c057'}
                        fontSize="11"
                        fontWeight="800"
                        textAnchor="middle"
                      >
                        {rightElectrode.barLabel} • {!leftIsAnode ? 'ANOT (-)' : 'KATOT (+)'}
                      </text>

                      {/* Tuz Köprüsü */}
                      {!effects.removeSaltBridge ? (
                        <>
                          <path
                            d="M 118 138 L 118 82 Q 118 70 132 70 L 248 70 Q 262 70 262 82 L 262 138"
                            fill="none"
                            stroke="#74c0fc"
                            strokeWidth="10"
                            strokeOpacity="0.35"
                            strokeLinecap="round"
                          />
                          <text x="190" y="92" fill="#74c0fc" fontSize="9.5" fontWeight="700" textAnchor="middle">
                            Tuz Köprüsü
                          </text>
                          <text x="190" y="104" fill="#9b9bab" fontSize="8.5" textAnchor="middle">
                            {leftIsAnode ? '← Anyon | Katyon →' : '← Katyon | Anyon →'}
                          </text>
                        </>
                      ) : (
                        <text x="190" y="95" fill="#ff6b6b" fontSize="10.5" fontWeight="800" textAnchor="middle">
                          ✕ Tuz Köprüsü Yok!
                        </text>
                      )}
                    </svg>
                  </div>

                  {/* Sağ Taraf: Anot / Katot / Epil / Net Tepkime */}
                  <div style={{ display: 'grid', gap: '10px' }}>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                        gap: '8px'
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: 'rgba(229, 72, 77, 0.12)',
                          border: '1px solid rgba(229, 72, 77, 0.4)',
                          borderRadius: '10px',
                          padding: '10px 12px'
                        }}
                      >
                        <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 700 }}>
                          ANOT (Aktif, E°yüks büyük)
                        </div>
                        <div style={{ fontSize: '16px', fontWeight: 800, color: '#ff8787', marginTop: '3px' }}>
                          {anot.symbol}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                          E°yüks = {formatPotential(-anot.eInd)}
                        </div>
                      </div>

                      <div
                        style={{
                          backgroundColor: 'rgba(48, 164, 108, 0.12)',
                          border: '1px solid rgba(48, 164, 108, 0.4)',
                          borderRadius: '10px',
                          padding: '10px 12px'
                        }}
                      >
                        <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 700 }}>
                          KATOT (Pasif, E°ind büyük)
                        </div>
                        <div style={{ fontSize: '16px', fontWeight: 800, color: '#40c057', marginTop: '3px' }}>
                          {katot.symbol}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                          E°ind = {formatPotential(katot.eInd)}
                        </div>
                      </div>

                      <div
                        style={{
                          backgroundColor: 'rgba(245, 165, 36, 0.12)',
                          border: '1px solid rgba(245, 165, 36, 0.45)',
                          borderRadius: '10px',
                          padding: '10px 12px'
                        }}
                      >
                        <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 700 }}>
                          Standart E°pil
                        </div>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffd43b', marginTop: '3px' }}>
                          {standardEpil.toFixed(2)} V
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                          n = {reactionInfo?.transferredElectrons} e⁻
                        </div>
                      </div>
                    </div>

                    {/* Yarı Tepkimeler & Net Pil Tepkimesi */}
                    {reactionInfo && (
                      <div
                        style={{
                          backgroundColor: 'var(--card)',
                          border: '1px solid var(--border)',
                          borderRadius: '10px',
                          padding: '12px 14px',
                          fontSize: '13px',
                          display: 'grid',
                          gap: '6px'
                        }}
                      >
                        <div>
                          <strong style={{ color: '#ff8787' }}>Anot (Yükseltgenme): </strong>
                          <code>{reactionInfo.anotHalf}</code>
                        </div>
                        <div>
                          <strong style={{ color: '#40c057' }}>Katot (İndirgenme): </strong>
                          <code>{reactionInfo.katotHalf}</code>
                        </div>
                        <div
                          style={{
                            marginTop: '4px',
                            paddingTop: '8px',
                            borderTop: '1px dashed var(--border-2)',
                            fontSize: '14px'
                          }}
                        >
                          <strong style={{ color: '#ffd43b' }}>Net Pil Tepkimesi: </strong>
                          <code style={{ fontWeight: 800, color: '#fff' }}>{reactionInfo.netEquation}</code>
                        </div>
                        <div style={{ fontSize: '11.5px', color: 'var(--muted)' }}>
                          💡 Elektronları eşitlemek için yarı tepkimeler çarpılsa bile E° değerleri ASLA çarpılmaz!
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Dış Devre & Tuz Köprüsü Paneli */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '10px'
                  }}
                >
                  <div
                    style={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '10px',
                      padding: '11px 14px',
                      fontSize: '13px'
                    }}
                  >
                    <div style={{ fontWeight: 700, color: '#ffd43b', marginBottom: '4px' }}>
                      ⚡ Dış Devre (KİMYA Kuralı)
                    </div>
                    <div>
                      Elektron akışı: <strong>Anot → Katot</strong> ({anot.symbol} → {katot.symbol})
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '10px',
                      padding: '11px 14px',
                      fontSize: '13px'
                    }}
                  >
                    <div style={{ fontWeight: 700, color: '#74c0fc', marginBottom: '4px' }}>
                      🌉 Tuz Köprüsü (İyon Akışı)
                    </div>
                    <div>
                      <strong>Anyonlar → Anota</strong> ({anot.symbol}) • <strong>Katyonlar → Katota</strong> ({katot.symbol})
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '10px',
                      padding: '11px 14px',
                      fontSize: '13px'
                    }}
                  >
                    <div style={{ fontWeight: 700, color: '#40c057', marginBottom: '4px' }}>
                      ⚖️ Elektrot Kütlesi Değişimi
                    </div>
                    <div>
                      {anot.isGasPt
                        ? 'Anot Pt çubuk DEĞİŞMEZ (H₂ gazı yükseltgenir, pH düşer).'
                        : `Anot (${anot.symbol}) AŞINIR (azalır).`}{' '}
                      {katot.isGasPt
                        ? 'Katotta H₂ gazı çıkar, Pt çubuk kütlesi DEĞİŞMEZ!'
                        : `Katot (${katot.symbol}) KALINLAŞIR (artar).`}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Pile Etki Et (Nernst / Denge) + Elektroliz Notu */}
            <div
              style={{
                backgroundColor: 'var(--card-2)',
                border: '1px solid var(--border-2)',
                borderRadius: '14px',
                padding: '18px 20px',
                display: 'grid',
                gap: '14px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <strong style={{ fontSize: '15px' }}>🎛️ Pile Etki Et (Nernst / Denge Simülasyonu)</strong>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                    Etkenleri açıp kapatarak pil potansiyelinin (Epil) nasıl değiştiğini test et.
                  </div>
                </div>
                <button
                  type="button"
                  className="btn ghost small"
                  onClick={() => setEffects(INITIAL_BATTERY_EFFECTS)}
                >
                  ↺ Standart Şartlara Dön
                </button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <button
                  type="button"
                  className={`btn ${effects.diluteAnode ? 'primary' : 'secondary'} small`}
                  onClick={() => toggleEffect('diluteAnode')}
                >
                  💧 {isSameElectrode ? 'Sol' : 'Anot'} Kabına Su Ekle
                </button>
                <button
                  type="button"
                  className={`btn ${effects.diluteCathode ? 'primary' : 'secondary'} small`}
                  onClick={() => toggleEffect('diluteCathode')}
                >
                  💧 {isSameElectrode ? 'Sağ' : 'Katot'} Kabına Su Ekle
                </button>
                <button
                  type="button"
                  className={`btn ${effects.increaseTemp ? 'primary' : 'secondary'} small`}
                  onClick={() => toggleEffect('increaseTemp')}
                >
                  🔥 Sıcaklığı Artır (T↑)
                </button>
                <button
                  type="button"
                  className={`btn ${effects.removeSaltBridge ? 'primary' : 'secondary'} small`}
                  onClick={() => toggleEffect('removeSaltBridge')}
                >
                  🌉 Tuz Köprüsünü Çıkar
                </button>
              </div>

              <div
                style={{
                  backgroundColor: batteryEffectSummary.bg,
                  border: `1px solid ${batteryEffectSummary.border}`,
                  borderRadius: '10px',
                  padding: '12px 16px'
                }}
              >
                <div style={{ fontSize: '15px', fontWeight: 800, color: batteryEffectSummary.color }}>
                  {batteryEffectSummary.badge}
                </div>
                <div style={{ fontSize: '13.5px', color: 'var(--text)', marginTop: '4px', lineHeight: 1.5 }}>
                  {batteryEffectSummary.detail}
                </div>
              </div>

              {/* Elektroliz Kısa Bağlantısı */}
              <div
                style={{
                  padding: '10px 14px',
                  backgroundColor: 'rgba(121, 80, 242, 0.1)',
                  borderLeft: '4px solid #7950f2',
                  borderRadius: '8px',
                  fontSize: '13px',
                  lineHeight: 1.5
                }}
              >
                <strong style={{ color: '#b197fc' }}>🔌 Elektroliz ile Farkı: </strong>
                {!isSameElectrode ? (
                  <span>
                    Bu galvanik pile dışarıdan <strong>{standardEpil.toFixed(2)} V</strong> değerinden büyük bir ters
                    gerilim uygulanırsa sistem <strong>elektroliz hücresine</strong> dönüşür ve tepkime tersine zorlanır:
                    <strong> {katot.symbol}</strong> bu kez <em>(+) Anot</em> olup aşınır, <strong>{anot.symbol}</strong> ise{' '}
                    <em>(-) Katot</em> olur! (<strong>KİMYA</strong> kuralı: Katotta İndirgenme, Anotta Yükseltgenme her iki hücrede de değişmez!)
                  </span>
                ) : (
                  <span>
                    Elektrolizde elektrik enerjisiyle istemsiz tepkimeler gerçekleştirilir. Galvanik pilden farklı olarak
                    Anot (+), Katot (-) kutuptur; ancak <strong>Katotta İndirgenme, Anotta Yükseltgenme</strong> her zaman geçerlidir.
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Alt Aksiyon Butonları */}
        <div
          style={{
            marginTop: '24px',
            paddingTop: '18px',
            borderTop: '1px solid var(--border-2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <span className="hint" style={{ fontSize: '13px' }}>
            💡 ÖSYM AYT'de Kimyasal Denge ve Elektrokimya her yıl mutlaka soru getiren kilit konulardır.
          </span>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {activeTab === 'equilibrium' ? (
              <button type="button" className="btn primary small" onClick={onStartEquilibriumQuiz}>
                ⚖️ Hız & Denge Testine Başla
              </button>
            ) : (
              <button type="button" className="btn primary small" onClick={onStartElectroQuiz}>
                🔋 Elektrokimya Testine Başla
              </button>
            )}
            <button type="button" className="btn ghost small" onClick={onClose}>
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
