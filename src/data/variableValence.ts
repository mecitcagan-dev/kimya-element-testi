import { StandardQuizItem } from '../types/topics';

export interface ValenceMetalData {
  id: number;
  symbol: string;
  name: string;
  isVariable: boolean;        // Değişken değerlikli mi?
  valences: string;           // '+2, +3' veya '+2 (Sabit)'
  sampleCompounds: string[];  // Örnek bileşikler
  namingRule: string;         // 'Romen rakamı zorunludur' veya 'Romen rakamı KULLANILMAZ'
}

export const VALENCE_METALS: ValenceMetalData[] = [
  // Değişken Değerlikli (Romen Rakamı Zorunlu)
  {
    id: 1,
    symbol: 'Fe',
    name: 'Demir',
    isVariable: true,
    valences: '+2, +3',
    sampleCompounds: ['FeO: Demir(II) oksit', 'Fe₂O₃: Demir(III) oksit'],
    namingRule: 'Bileşik adlandırmasında Romen rakamı (II veya III) KULLANILIR.'
  },
  {
    id: 2,
    symbol: 'Cu',
    name: 'Bakır',
    isVariable: true,
    valences: '+1, +2',
    sampleCompounds: ['Cu₂O: Bakır(I) oksit', 'CuO: Bakır(II) oksit', 'CuSO₄: Bakır(II) sülfat'],
    namingRule: 'Bileşik adlandırmasında Romen rakamı (I veya II) KULLANILIR.'
  },
  {
    id: 3,
    symbol: 'Hg',
    name: 'Cıva',
    isVariable: true,
    valences: '+1, +2',
    sampleCompounds: ['Hg₂Cl₂: Cıva(I) klorür', 'HgO: Cıva(II) oksit'],
    namingRule: 'Bileşik adlandırmasında Romen rakamı (I veya II) KULLANILIR.'
  },
  {
    id: 4,
    symbol: 'Sn',
    name: 'Kalay',
    isVariable: true,
    valences: '+2, +4',
    sampleCompounds: ['SnCl₂: Kalay(II) klorür', 'SnO₂: Kalay(IV) oksit'],
    namingRule: 'Bileşik adlandırmasında Romen rakamı (II veya IV) KULLANILIR.'
  },
  {
    id: 5,
    symbol: 'Pb',
    name: 'Kurşun',
    isVariable: true,
    valences: '+2, +4',
    sampleCompounds: ['Pb(NO₃)₂: Kurşun(II) nitrat', 'PbO₂: Kurşun(IV) oksit'],
    namingRule: 'Bileşik adlandırmasında Romen rakamı (II veya IV) KULLANILIR.'
  },
  {
    id: 6,
    symbol: 'Cr',
    name: 'Krom',
    isVariable: true,
    valences: '+2, +3, +6',
    sampleCompounds: ['CrO: Krom(II) oksit', 'Cr₂O₃: Krom(III) oksit', 'K₂Cr₂O₇ (Cr: +6)'],
    namingRule: 'Bileşik adlandırmasında Romen rakamı KULLANILIR.'
  },
  {
    id: 7,
    symbol: 'Mn',
    name: 'Mangan',
    isVariable: true,
    valences: '+2, +3, +4, +6, +7',
    sampleCompounds: ['MnO₂: Mangan(IV) oksit', 'KMnO₄ (Mn: +7)'],
    namingRule: 'Bileşik adlandırmasında Romen rakamı KULLANILIR.'
  },

  // Sınav Tuzakları: Sabit Değerlikli (Romen Rakamı Asla Kullanılmaz!)
  {
    id: 8,
    symbol: 'Zn',
    name: 'Çinko',
    isVariable: false,
    valences: '+2 (Sabit)',
    sampleCompounds: ['ZnCl₂: Çinko klorür (Çinko(II) klorür YANLIŞTIR!)'],
    namingRule: 'Geçiş metalidir fakat DAİMA +2 alır. Romen rakamı KESİNLİKLE KULLANILMAZ.'
  },
  {
    id: 9,
    symbol: 'Ag',
    name: 'Gümüş',
    isVariable: false,
    valences: '+1 (Sabit)',
    sampleCompounds: ['AgNO₃: Gümüş nitrat (Gümüş(I) nitrat YANLIŞTIR!)'],
    namingRule: 'Geçiş metalidir fakat DAİMA +1 alır. Romen rakamı KESİNLİKLE KULLANILMAZ.'
  },
  {
    id: 10,
    symbol: 'Al',
    name: 'Alüminyum',
    isVariable: false,
    valences: '+3 (Sabit)',
    sampleCompounds: ['Al₂O₃: Alüminyum oksit'],
    namingRule: '3A grubu metalidir, DAİMA +3 alır. Romen rakamı KULLANILMAZ.'
  }
];

export function valenceToQuizItem(m: ValenceMetalData): StandardQuizItem {
  return {
    id: m.id,
    prompt: `${m.name} (${m.symbol})`,
    promptSub: m.isVariable ? 'Değişken Değerlikli Metal' : 'Sabit Değerlikli Metal (Sınav Tuzağı)',
    answer: m.valences,
    synonyms: [],
    category: m.isVariable ? 'Değişken Değerlikli' : 'Sabit Değerlikli',
    infoChips: [
      { label: 'Metal', value: `${m.name} (${m.symbol})` },
      { label: 'Aldığı Yükler', value: m.valences },
      { label: 'Romen Rakamı Kuralı', value: m.namingRule },
      { label: 'Örnek Bileşikler', value: m.sampleCompounds.join(' · ') }
    ],
    hint: m.namingRule
  };
}
