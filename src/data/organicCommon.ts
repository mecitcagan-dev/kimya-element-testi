import { StandardQuizItem } from '../types/topics';

export interface OrganicCommonData {
  id: number;
  formula: string;
  name: string;
  specialName: string;
  chemicalClass: string;
  examHighlight: string;
}

export const ORGANIC_COMMON: OrganicCommonData[] = [
  {
    id: 1,
    formula: 'CH₄',
    name: 'Metan',
    specialName: 'Bataklık gazı / Grizu',
    chemicalClass: 'Alkan',
    examHighlight: 'Doğal gazın (LNG/CNG) %90’dan fazlasını oluşturan en basit hidrokarbon.'
  },
  {
    id: 2,
    formula: 'C₂H₄ (CH₂=CH₂)',
    name: 'Eten',
    specialName: 'Etilen',
    chemicalClass: 'Alken',
    examHighlight: 'Meyvelerin olgunlaşmasını sağlayan bitkisel hormon; polietilen (PE) monomeri.'
  },
  {
    id: 3,
    formula: 'C₂H₂ (CH≡CH)',
    name: 'Etin',
    specialName: 'Asetilen',
    chemicalClass: 'Alkin',
    examHighlight: 'Karpitin (CaC₂) suyla tepkimesinden elde edilir; yüksek sıcaklıklı oksi-asetilen kaynak gazı.'
  },
  {
    id: 4,
    formula: 'CH₃OH',
    name: 'Metanol',
    specialName: 'Odun ruhu / Metil alkol',
    chemicalClass: 'Alkol',
    examHighlight: 'Sahte içkide körlüğe ve ölüme yol açan zehirli monoalkol.'
  },
  {
    id: 5,
    formula: 'C₂H₅OH',
    name: 'Etanol',
    specialName: 'Etil alkol',
    chemicalClass: 'Alkol',
    examHighlight: 'Biyoyakıt, kolonya, tıbbi antiseptik; fermantasyonla elde edilir.'
  },
  {
    id: 6,
    formula: 'CH₂OH—CH₂OH',
    name: '1,2-Etandiol',
    specialName: 'Glikol / Antifriz',
    chemicalClass: 'Diol (İki değerlikli alkol)',
    examHighlight: 'Radyatör antifrizi; hidrojen bağları sayesinde suyun donma noktasını düşürür, kaynamayı yükseltir.'
  },
  {
    id: 7,
    formula: 'C₃H₅(OH)₃',
    name: '1,2,3-Propantriol',
    specialName: 'Gliserin / Gliserol',
    chemicalClass: 'Triol (Üç değerlikli alkol)',
    examHighlight: 'Kozmetik nemlendirici; nitrolanarak nitrogliserin (dinamit) yapımında kullanılır.'
  },
  {
    id: 8,
    formula: 'C₂H₅—O—C₂H₅',
    name: 'Etoksietan',
    specialName: 'Dietil eter / Lokman ruhu',
    chemicalClass: 'Eter',
    examHighlight: 'Tıpta bayıltıcı (genel anestezik) olarak kullanılmış ilk maddedir.'
  },
  {
    id: 9,
    formula: 'HCHO',
    name: 'Metanal',
    specialName: 'Formaldehit',
    chemicalClass: 'Aldehit',
    examHighlight: '%37’lik sulu çözeltisi (formalin) biyolojik doku ve kadavraları korumada kullanılır.'
  },
  {
    id: 10,
    formula: 'CH₃CHO',
    name: 'Etanal',
    specialName: 'Asetaldehit',
    chemicalClass: 'Aldehit',
    examHighlight: 'Yeşil elma kokulu toksik aldehit.'
  },
  {
    id: 11,
    formula: 'CH₃COCH₃',
    name: 'Propanon',
    specialName: 'Aseton',
    chemicalClass: 'Keton',
    examHighlight: 'En küçük ketondur; yaygın organik çözücü ve oje çıkarıcıdır.'
  },
  {
    id: 12,
    formula: 'HCOOH',
    name: 'Metanoik asit',
    specialName: 'Formik asit / Karınca asidi',
    chemicalClass: 'Karboksilik Asit',
    examHighlight: 'Yapısında hem aldehit hem karboksil grubu taşır; Tollens ve Fehling ile tepkime veren TEK karboksilik asittir!'
  },
  {
    id: 13,
    formula: 'CH₃COOH',
    name: 'Etanoik asit',
    specialName: 'Asetik asit / Sirke asidi',
    chemicalClass: 'Karboksilik Asit',
    examHighlight: 'Sirkeye ekşi tat ve keskin koku veren zayıf organik asit; kireç çözücü.'
  },
  {
    id: 14,
    formula: 'C₆H₆',
    name: 'Benzen',
    specialName: 'Benzen halkası',
    chemicalClass: 'Aromatik Hidrokarbon (Aren)',
    examHighlight: 'Düzlemsel 6 karbonlu halka; Kekulé rezonansı taşır; katılma vermez, yer değiştirme verir.'
  },
  {
    id: 15,
    formula: 'C₆H₅—CH₃',
    name: 'Metilbenzen',
    specialName: 'Toluen',
    chemicalClass: 'Aromatik Hidrokarbon',
    examHighlight: 'TNT (trinitrotoluen) patlayıcı maddesinin ve boya inceltici tinerin hammaddesi.'
  },
  {
    id: 16,
    formula: 'C₆H₅—OH',
    name: 'Hidroksibenzen',
    specialName: 'Fenol',
    chemicalClass: 'Aromatik Alkol DEĞİLDİR! (Zayıf Asittir)',
    examHighlight: 'ÖSYM TUZAĞI: Yapısında —OH olmasına rağmen ALKOL DEĞİLDİR, ZAYIF ASİTTİR! Karbolik asit olarak antiseptiktir.'
  },
  {
    id: 17,
    formula: 'C₆H₅—NH₂',
    name: 'Aminobenzen',
    specialName: 'Anilin',
    chemicalClass: 'Aromatik Zayıf BAZ',
    examHighlight: 'Zayıf bazik özellik gösterir; kumaş ve mürekkep boyar maddelerinin (anilin boyaları) anasıdır.'
  },
  {
    id: 18,
    formula: 'C₁₀H₈',
    name: 'Naftalin',
    specialName: 'Naftalin',
    chemicalClass: 'Aromatik Hidrokarbon',
    examHighlight: 'Oda koşullarında kolayca süblimleşen iki halkalı aromatik katı; güve kovucu.'
  }
];

export function organicCommonToQuizItem(item: OrganicCommonData, direction: 'spec-form' | 'form-spec' = 'spec-form'): StandardQuizItem {
  const isSpecToForm = direction === 'spec-form';
  return {
    id: item.id,
    prompt: isSpecToForm ? `${item.specialName} (${item.name})` : item.formula,
    promptSub: isSpecToForm ? `${item.chemicalClass}` : `${item.specialName}`,
    answer: isSpecToForm ? item.formula : item.specialName,
    synonyms: isSpecToForm ? [item.name] : [item.name, item.specialName],
    category: item.chemicalClass,
    infoChips: [
      { label: 'Özel Adı', value: item.specialName },
      { label: 'Sistematik Ad', value: item.name },
      { label: 'Formülü', value: item.formula },
      { label: 'Kimyasal Sınıf', value: item.chemicalClass },
      { label: 'ÖSYM Notu', value: item.examHighlight }
    ],
    hint: item.examHighlight
  };
}
