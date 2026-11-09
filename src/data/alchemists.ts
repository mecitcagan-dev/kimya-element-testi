import { StandardQuizItem } from '../types/topics';

export interface AlchemistData {
  id: number;
  name: string;
  era: 'Simya Dönemi' | 'Modern Kimyaya Geçiş';
  keyContribution: string;
  discoveredItems: string;
  famousBookOrLaw: string;
}

export const ALCHEMISTS: AlchemistData[] = [
  {
    id: 1,
    name: 'Empedokles',
    era: 'Simya Dönemi',
    keyContribution: 'Bütün maddelerin dört ana ögeden (Toprak, Ateş, Hava, Su) oluştuğunu ve bunları birleştiren gücün "sevgi", ayıran gücün "nefret" olduğunu öne sürdü.',
    discoveredItems: '4 Temel Öge Felsefesi',
    famousBookOrLaw: 'Sevgi ve Nefret Güçleri'
  },
  {
    id: 2,
    name: 'Democritus',
    era: 'Simya Dönemi',
    keyContribution: 'Maddenin bölünemez en küçük yapı taşlarına Yunanca bölünemez anlamına gelen "Atomos" (Atom) adını veren ilk filozoftur.',
    discoveredItems: 'İlk Atom Fikri (Atomos)',
    famousBookOrLaw: 'Atomculuk Felsefesi'
  },
  {
    id: 3,
    name: 'Aristo (Aristoteles)',
    era: 'Simya Dönemi',
    keyContribution: '4 element kuramına 4 temel özellik (Sıcak, Soğuk, Islak, Kuru) ekledi. Ateş (Sıcak+Kuru), Hava (Sıcak+Islak), Su (Soğuk+Islak), Toprak (Soğuk+Kuru).',
    discoveredItems: 'Element Döngüsü ve Nitelikler',
    famousBookOrLaw: 'Dört Nitelik Kuramı'
  },
  {
    id: 4,
    name: 'Cabir bin Hayyan',
    era: 'Simya Dönemi',
    keyContribution: 'Kimyanın babası olarak bilinir. Damıtmada kullanılan "İmbik" aletini geliştirdi; Kezzap (HNO₃), Zaç yağı (H₂SO₄), Tuz ruhu (HCl) ve altını çözen Kral suyunu elde etti.',
    discoveredItems: 'İmbik, Kezzap, Zaç yağı, Tuz ruhu, Kral suyu',
    famousBookOrLaw: 'Kitab al-Kimya'
  },
  {
    id: 5,
    name: 'Ebubekir er-Razi',
    era: 'Simya Dönemi',
    keyContribution: 'Karıncaları damıtarak Karınca asidini (Formik asit, HCOOH) buldu. Etil alkolü tıpta antiseptik olarak kullandı; kostik sodayı (NaOH) ve gliserini keşfetti.',
    discoveredItems: 'Formik asit (karınca asidi), Kostik soda (NaOH), Etil alkol antiseptiği',
    famousBookOrLaw: 'Kitabü’l-Esrar (Sırlar Kitabı)'
  },
  {
    id: 6,
    name: 'Robert Boyle',
    era: 'Modern Kimyaya Geçiş',
    keyContribution: 'Elementin ilk modern tanımını yaptı ("bilinen yöntemlerle kendinden daha basit maddelere ayrılamayan saf madde"). Simyadan kimyaya geçişin kilometre taşıdır.',
    discoveredItems: 'Boyle Gaz Yasası (P·V = sabit), Vakum pompası',
    famousBookOrLaw: 'Kuşkucu Kimyager (The Sceptical Chymist)'
  },
  {
    id: 7,
    name: 'Antoine Lavoisier',
    era: 'Modern Kimyaya Geçiş',
    keyContribution: 'Kütlenin Korunumu Kanunu’nu kanıtladı. Yanma olayının "flogiston" değil, havadaki oksijen gazı ile gerçekleştiğini ispatlayarak modern kimya çağını başlattı.',
    discoveredItems: 'Oksijenin yanmadaki rolü, Kütlenin Korunumu',
    famousBookOrLaw: 'Kütlenin Korunumu Kanunu (1789)'
  }
];

export function alchemistToQuizItem(a: AlchemistData): StandardQuizItem {
  return {
    id: a.id,
    prompt: a.keyContribution,
    promptSub: `${a.era} | Önemli Katkı: ${a.discoveredItems}`,
    answer: a.name,
    synonyms: [],
    category: a.era,
    infoChips: [
      { label: 'Bilim İnsanı', value: a.name },
      { label: 'Dönemi', value: a.era },
      { label: 'Buluş / Katkı', value: a.discoveredItems },
      { label: 'Eser / Yasa', value: a.famousBookOrLaw }
    ],
    hint: a.famousBookOrLaw
  };
}
