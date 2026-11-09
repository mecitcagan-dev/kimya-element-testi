import { StandardQuizItem } from '../types/topics';

export interface FunctionalGroupData {
  id: number;
  className: string;         // Alkol, Aldehit, Keton...
  groupStructure: string;    // R-OH, R-CHO, R-CO-R'...
  groupName: string;         // Hidroksil, Karbonil, Karboksil...
  generalFormula: string;    // C_n H_{2n+2}O...
  suffix: string;            // -ol, -al, -on, -oik asit...
  example: string;           // Etanol, Etanal, Propanon...
}

export const FUNCTIONAL_GROUPS: FunctionalGroupData[] = [
  {
    id: 1,
    className: 'Alkan',
    groupStructure: '—C—C— (Tekli C-C Bağı)',
    groupName: 'Doymuş Alkil',
    generalFormula: 'CₙH₂ₙ₊₂',
    suffix: '-an',
    example: 'Etan (CH₃—CH₃)'
  },
  {
    id: 2,
    className: 'Alken',
    groupStructure: '—C=C— (İkili C=C Bağı)',
    groupName: 'Alkenil (Doymamış)',
    generalFormula: 'CₙH₂ₙ',
    suffix: '-en / -ilen',
    example: 'Eten / Etilen (CH₂=CH₂)'
  },
  {
    id: 3,
    className: 'Alkin',
    groupStructure: '—C≡C— (Üçlü C≡C Bağı)',
    groupName: 'Alkinil (Doymamış)',
    generalFormula: 'CₙH₂ₙ₋₂',
    suffix: '-in',
    example: 'Etin / Asetilen (CH≡CH)'
  },
  {
    id: 4,
    className: 'Alkil Halojenür',
    groupStructure: 'R—X (X = F, Cl, Br, I)',
    groupName: 'Halo grubu',
    generalFormula: 'CₙH₂ₙ₊₁X',
    suffix: 'halo- / -ür',
    example: 'Kloroetan (CH₃—CH₂Cl)'
  },
  {
    id: 5,
    className: 'Alkol',
    groupStructure: 'R—OH',
    groupName: 'Hidroksil grubu (—OH)',
    generalFormula: 'CₙH₂ₙ₊₂O (Monoalkol)',
    suffix: '-ol',
    example: 'Etanol (CH₃CH₂OH)'
  },
  {
    id: 6,
    className: 'Eter',
    groupStructure: 'R—O—R′',
    groupName: 'Alkoksi / Eter bağı (—O—)',
    generalFormula: 'CₙH₂ₙ₊₂O',
    suffix: '-eter / alkoksi-',
    example: 'Dimetil eter (CH₃—O—CH₃)'
  },
  {
    id: 7,
    className: 'Aldehit',
    groupStructure: 'R—CHO (R—C(=O)H)',
    groupName: 'Karbonil grubu (zincir ucunda)',
    generalFormula: 'CₙH₂ₙO',
    suffix: '-al',
    example: 'Etanal / Asetaldehit (CH₃CHO)'
  },
  {
    id: 8,
    className: 'Keton',
    groupStructure: 'R—CO—R′ (R—C(=O)R′)',
    groupName: 'Karbonil grubu (zincir ortasında)',
    generalFormula: 'CₙH₂ₙO',
    suffix: '-on',
    example: 'Propanon / Aseton (CH₃COCH₃)'
  },
  {
    id: 9,
    className: 'Karboksilik Asit',
    groupStructure: 'R—COOH (R—C(=O)OH)',
    groupName: 'Karboksil grubu (—COOH)',
    generalFormula: 'CₙH₂ₙO₂',
    suffix: '-oik asit',
    example: 'Etanoik asit / Asetik asit (CH₃COOH)'
  },
  {
    id: 10,
    className: 'Ester',
    groupStructure: 'R—COO—R′ (R—C(=O)O—R′)',
    groupName: 'Ester bağı (—COO—)',
    generalFormula: 'CₙH₂ₙO₂',
    suffix: '-oat',
    example: 'Metil etanoat (CH₃COOCH₃)'
  },
  {
    id: 11,
    className: 'Amin',
    groupStructure: 'R—NH₂ (Primer), R₂NH, R₃N',
    groupName: 'Amino grubu (—NH₂)',
    generalFormula: 'CₙH₂ₙ₊₃N',
    suffix: '-amin',
    example: 'Metilamin (CH₃NH₂)'
  },
  {
    id: 12,
    className: 'Amit',
    groupStructure: 'R—CONH₂ (R—C(=O)NH₂)',
    groupName: 'Amit grubu (—CONH₂)',
    generalFormula: 'CₙH₂ₙ₊₁NO',
    suffix: '-amit',
    example: 'Etanamit / Asetamit (CH₃CONH₂)'
  },
  {
    id: 13,
    className: 'Aromatik (Aren)',
    groupStructure: 'C₆H₆ / Ar—H (Benzen Halkası)',
    groupName: 'Fenil / Aren halkası',
    generalFormula: 'C₆H₆ (Benzen)',
    suffix: '-benzen / fenil-',
    example: 'Benzen (C₆H₆), Fenol (C₆H₅OH)'
  }
];

export function functionalGroupToQuizItem(fg: FunctionalGroupData): StandardQuizItem {
  return {
    id: fg.id,
    prompt: fg.groupStructure,
    promptSub: `Fonksiyonel Grup: ${fg.groupName} | Genel Formül: ${fg.generalFormula}`,
    answer: fg.className,
    synonyms: [],
    category: fg.className,
    infoChips: [
      { label: 'Organik Sınıf', value: fg.className },
      { label: 'Grup Yapısı', value: fg.groupStructure },
      { label: 'Genel Formül', value: fg.generalFormula },
      { label: 'IUPAC Soneki', value: fg.suffix },
      { label: 'Örnek Bileşik', value: fg.example }
    ],
    hint: `Karakteristik grubu: ${fg.groupName}, adlandırma soneki: ${fg.suffix}`
  };
}
