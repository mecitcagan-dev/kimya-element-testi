import { StandardQuizItem } from '../types/topics';

export interface PolyatomicIonData {
  id: number;
  formula: string;       // Ham metin / gösterim
  disp: string;          // Alt ve üst simgeli gösterim
  name: string;          // Türkçe adı
  synonyms: string[];    // Eş anlamlılar
  charge: number;        // +1, -1, -2, -3
  chargeStr: string;     // '+1', '-1', '-2', '-3'
  type: 'Katyon' | 'Anyon';
}

export const POLYATOMIC_IONS: PolyatomicIonData[] = [
  // Katyonlar (+1)
  { id: 1, formula: 'NH4+', disp: 'NH₄⁺', name: 'Amonyum', synonyms: ['Amonyum iyonu'], charge: 1, chargeStr: '+1', type: 'Katyon' },
  { id: 2, formula: 'H3O+', disp: 'H₃O⁺', name: 'Hidronyum', synonyms: ['Oksonyum'], charge: 1, chargeStr: '+1', type: 'Katyon' },

  // Anyonlar (-1)
  { id: 3, formula: 'OH-', disp: 'OH⁻', name: 'Hidroksit', synonyms: [], charge: -1, chargeStr: '-1', type: 'Anyon' },
  { id: 4, formula: 'NO3-', disp: 'NO₃⁻', name: 'Nitrat', synonyms: [], charge: -1, chargeStr: '-1', type: 'Anyon' },
  { id: 5, formula: 'NO2-', disp: 'NO₂⁻', name: 'Nitrit', synonyms: [], charge: -1, chargeStr: '-1', type: 'Anyon' },
  { id: 6, formula: 'CN-', disp: 'CN⁻', name: 'Siyanür', synonyms: [], charge: -1, chargeStr: '-1', type: 'Anyon' },
  { id: 7, formula: 'SCN-', disp: 'SCN⁻', name: 'Tiyosiyanat', synonyms: [], charge: -1, chargeStr: '-1', type: 'Anyon' },
  { id: 8, formula: 'MnO4-', disp: 'MnO₄⁻', name: 'Permanganat', synonyms: [], charge: -1, chargeStr: '-1', type: 'Anyon' },
  { id: 9, formula: 'CH3COO-', disp: 'CH₃COO⁻', name: 'Asetat', synonyms: ['Etanoat'], charge: -1, chargeStr: '-1', type: 'Anyon' },
  { id: 10, formula: 'HCOO-', disp: 'HCOO⁻', name: 'Format', synonyms: ['Metanoat'], charge: -1, chargeStr: '-1', type: 'Anyon' },
  { id: 11, formula: 'HCO3-', disp: 'HCO₃⁻', name: 'Bikarbonat', synonyms: ['Hidrojen karbonat'], charge: -1, chargeStr: '-1', type: 'Anyon' },
  { id: 12, formula: 'HSO4-', disp: 'HSO₄⁻', name: 'Bisülfat', synonyms: ['Hidrojen sülfat'], charge: -1, chargeStr: '-1', type: 'Anyon' },
  { id: 13, formula: 'H2PO4-', disp: 'H₂PO₄⁻', name: 'Dihidrojen fosfat', synonyms: [], charge: -1, chargeStr: '-1', type: 'Anyon' },
  { id: 14, formula: 'ClO-', disp: 'ClO⁻', name: 'Hipoklorit', synonyms: [], charge: -1, chargeStr: '-1', type: 'Anyon' },
  { id: 15, formula: 'ClO2-', disp: 'ClO₂⁻', name: 'Klorit', synonyms: [], charge: -1, chargeStr: '-1', type: 'Anyon' },
  { id: 16, formula: 'ClO3-', disp: 'ClO₃⁻', name: 'Klorat', synonyms: [], charge: -1, chargeStr: '-1', type: 'Anyon' },
  { id: 17, formula: 'ClO4-', disp: 'ClO₄⁻', name: 'Perklorat', synonyms: [], charge: -1, chargeStr: '-1', type: 'Anyon' },

  // Anyonlar (-2)
  { id: 18, formula: 'SO4^2-', disp: 'SO₄²⁻', name: 'Sülfat', synonyms: [], charge: -2, chargeStr: '-2', type: 'Anyon' },
  { id: 19, formula: 'SO3^2-', disp: 'SO₃²⁻', name: 'Sülfit', synonyms: [], charge: -2, chargeStr: '-2', type: 'Anyon' },
  { id: 20, formula: 'CO3^2-', disp: 'CO₃²⁻', name: 'Karbonat', synonyms: [], charge: -2, chargeStr: '-2', type: 'Anyon' },
  { id: 21, formula: 'CrO4^2-', disp: 'CrO₄²⁻', name: 'Kromat', synonyms: [], charge: -2, chargeStr: '-2', type: 'Anyon' },
  { id: 22, formula: 'Cr2O7^2-', disp: 'Cr₂O₇²⁻', name: 'Dikromat', synonyms: [], charge: -2, chargeStr: '-2', type: 'Anyon' },
  { id: 23, formula: 'C2O4^2-', disp: 'C₂O₄²⁻', name: 'Oksalat', synonyms: ['Okzalat'], charge: -2, chargeStr: '-2', type: 'Anyon' },
  { id: 24, formula: 'S2O3^2-', disp: 'S₂O₃²⁻', name: 'Tiyosülfat', synonyms: [], charge: -2, chargeStr: '-2', type: 'Anyon' },

  // Anyonlar (-3)
  { id: 25, formula: 'PO4^3-', disp: 'PO₄³⁻', name: 'Fosfat', synonyms: ['Ortofosfat'], charge: -3, chargeStr: '-3', type: 'Anyon' },
  { id: 26, formula: 'PO3^3-', disp: 'PO₃³⁻', name: 'Fosfit', synonyms: [], charge: -3, chargeStr: '-3', type: 'Anyon' }
];

export const ION_CATEGORIES = [
  { key: '+1 Katyon', rgb: '77,171,247' },
  { key: '-1 Anyon', rgb: '255,146,43' },
  { key: '-2 Anyon', rgb: '255,212,59' },
  { key: '-3 Anyon', rgb: '240,101,149' }
];

export function ionToQuizItem(ion: PolyatomicIonData, direction: 'form-name' | 'name-form' = 'form-name'): StandardQuizItem {
  const isFormToName = direction === 'form-name';
  const catKey = ion.charge === 1 ? '+1 Katyon' : ion.charge === -1 ? '-1 Anyon' : ion.charge === -2 ? '-2 Anyon' : '-3 Anyon';

  return {
    id: ion.id,
    prompt: isFormToName ? ion.disp : ion.name,
    promptSub: isFormToName ? `Yük: ${ion.chargeStr} (${ion.type})` : `Formülünü ve yükünü bulun (${ion.type})`,
    answer: isFormToName ? ion.name : ion.disp,
    synonyms: isFormToName ? ion.synonyms : [ion.formula, ion.disp],
    category: catKey,
    infoChips: [
      { label: 'İyon Adı', value: ion.name },
      { label: 'Formülü', value: ion.disp },
      { label: 'İyon Yükü', value: ion.chargeStr },
      { label: 'Türü', value: ion.type }
    ],
    hint: `${ion.name} iyonu ${ion.chargeStr} yüklü bir ${ion.type.toLowerCase()}dur.`
  };
}
