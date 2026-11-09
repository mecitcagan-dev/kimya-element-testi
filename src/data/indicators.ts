import { StandardQuizItem } from '../types/topics';

export interface IndicatorData {
  id: number;
  name: string;
  acidColor: string;
  neutralColor: string;
  baseColor: string;
  phRange: string;
  nature: 'Sentetik / Standart' | 'Doğal İndikatör';
}

export const INDICATORS: IndicatorData[] = [
  {
    id: 1,
    name: 'Turnusol',
    acidColor: 'Kırmızı',
    neutralColor: 'Mor',
    baseColor: 'Mavi',
    phRange: '4.5 – 8.3',
    nature: 'Sentetik / Standart'
  },
  {
    id: 2,
    name: 'Fenolftalein',
    acidColor: 'Renksiz',
    neutralColor: 'Renksiz',
    baseColor: 'Pembe (Fuşya)',
    phRange: '8.2 – 10.0',
    nature: 'Sentetik / Standart'
  },
  {
    id: 3,
    name: 'Metil Oranj',
    acidColor: 'Kırmızı',
    neutralColor: 'Turuncu',
    baseColor: 'Sarı',
    phRange: '3.1 – 4.4',
    nature: 'Sentetik / Standart'
  },
  {
    id: 4,
    name: 'Bromtimol Mavisi',
    acidColor: 'Sarı',
    neutralColor: 'Yeşil',
    baseColor: 'Mavi',
    phRange: '6.0 – 7.6',
    nature: 'Sentetik / Standart'
  },
  {
    id: 5,
    name: 'Alizarin Sarısı',
    acidColor: 'Sarı',
    neutralColor: 'Sarı',
    baseColor: 'Kırmızı-Eflatun',
    phRange: '10.2 – 12.0',
    nature: 'Sentetik / Standart'
  },
  {
    id: 6,
    name: 'Kırmızı Lahana Suyu',
    acidColor: 'Kırmızı / Pembe',
    neutralColor: 'Mor',
    baseColor: 'Yeşil / Sarı',
    phRange: 'Geniş spektrum',
    nature: 'Doğal İndikatör'
  },
  {
    id: 7,
    name: 'Çay',
    acidColor: 'Açık Sarı',
    neutralColor: 'Kehribar',
    baseColor: 'Koyu Kahve / Kırmızı',
    phRange: 'Doğal tanenler',
    nature: 'Doğal İndikatör'
  },
  {
    id: 8,
    name: 'Ortanca Çiçeği Toprağı',
    acidColor: 'Mavi Çiçek (Asidik Toprak)',
    neutralColor: 'Mor Çiçek',
    baseColor: 'Pembe Çiçek (Bazik Toprak)',
    phRange: 'Antosiyanin renklenmesi',
    nature: 'Doğal İndikatör'
  }
];

export function indicatorToQuizItem(ind: IndicatorData): StandardQuizItem {
  return {
    id: ind.id,
    prompt: ind.name,
    promptSub: `${ind.nature} (Dönüşüm pH: ${ind.phRange})`,
    answer: `Asit: ${ind.acidColor} | Baz: ${ind.baseColor}`,
    synonyms: [
      `${ind.acidColor} - ${ind.baseColor}`,
      `${ind.acidColor}, ${ind.baseColor}`
    ],
    category: ind.nature,
    infoChips: [
      { label: 'İndikatör', value: ind.name },
      { label: 'Asitte Renk', value: ind.acidColor },
      { label: 'Bazda Renk', value: ind.baseColor },
      { label: 'Nötrde Renk', value: ind.neutralColor },
      { label: 'pH Aralığı', value: ind.phRange }
    ],
    hint: `Asit ortamda ${ind.acidColor}, baz ortamda ${ind.baseColor} renk verir.`
  };
}
