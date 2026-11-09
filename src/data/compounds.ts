import { CategoryInfo, CompoundData } from '../types/chemistry';
import { formatFormula, formulaKey } from '../utils/text';

// Bileşik türleri: 1–4 tuşlarıyla eşleşir
export const COMPOUND_CATEGORIES: CategoryInfo[] = [
  { key: 'Asit', rgb: '255,146,43' },
  { key: 'Baz', rgb: '77,171,247' },
  { key: 'Tuz', rgb: '255,212,59' },
  { key: 'Oksit', rgb: '56,217,217' }
];

const RAW_COMPOUNDS = [
  { z: 1,  f: 'H2O', names: ['Su'], c: 'Oksit' },
  { z: 2,  f: 'HCl', names: ['Tuz ruhu'], c: 'Asit' },
  { z: 3,  f: 'H2SO4', names: ['Zaç yağı'], c: 'Asit' },
  { z: 4,  f: 'HNO3', names: ['Kezzap'], c: 'Asit' },
  { z: 5,  f: 'CH3COOH', names: ['Sirke ruhu'], c: 'Asit' },
  { z: 6,  f: 'NH3', names: ['Amonyak'], c: 'Baz' },
  { z: 7,  f: 'NaCl', names: ['Sofra tuzu'], c: 'Tuz' },
  { z: 8,  f: 'KOH', names: ['Potas kostik'], c: 'Baz' },
  { z: 9,  f: 'NaOH', names: ['Sud kostik'], c: 'Baz' },
  { z: 10, f: 'NaHCO3', names: ['Yemek sodası'], c: 'Tuz' },
  { z: 11, f: 'Na2CO3', names: ['Çamaşır sodası'], c: 'Tuz' },
  { z: 12, f: 'CaCO3', names: ['Kireç taşı'], c: 'Tuz' },
  { z: 13, f: 'CaO', names: ['Sönmemiş kireç'], c: 'Oksit' },
  { z: 14, f: 'Ca(OH)2', names: ['Sönmüş kireç'], c: 'Baz' },
  { z: 15, f: 'HCOOH', names: ['Karınca asiti'], c: 'Asit' },
  { z: 16, f: 'KNO3', names: ['Güherçile'], c: 'Tuz' },
  { z: 17, f: 'CuSO4', names: ['Göztaşı'], c: 'Tuz' },
  { z: 18, f: 'FeSO4', names: ['Kıbrıs'], c: 'Tuz' }
];

export const COMPOUNDS: CompoundData[] = RAW_COMPOUNDS.map(c => ({
  ...c,
  fk: formulaKey(c.f),
  disp: formatFormula(c.f)
}));

export const COMPOUND_BY_Z: Record<number, CompoundData> = {};
COMPOUNDS.forEach(c => {
  COMPOUND_BY_Z[c.z] = c;
});
