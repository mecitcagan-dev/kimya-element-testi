// Bileşik verileri: formül, Türkçe ad(lar) ve tür
import { formatFormula, formulaKey } from '../utils/text.js';

// Bileşik türleri: sıra 1–4 tuşlarıyla eşleşir (Alt+rakam yazarak modunda, rakam seçenekli modda)
export const COMPOUND_CATS = [
  { key: 'Asit', rgb: '255,146,43' },
  { key: 'Baz', rgb: '77,171,247' },
  { key: 'Tuz', rgb: '255,212,59' },
  { key: 'Oksit', rgb: '56,217,217' }
];

// z: sıra (1–18), f: formül (ham metin), names: [kanonik ad, ...kabul edilen], c: tür
export const COMPOUNDS = [
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

// Karşılaştırma ve gösterim anahtarları bir kez hesaplanır: fk arama anahtarı, disp alt simgeli formül
COMPOUNDS.forEach(c => {
  c.fk = formulaKey(c.f);
  c.disp = formatFormula(c.f);
});

// Sıra numarasına göre bileşik (z → bileşik)
export const CMP_BY_Z = {};
COMPOUNDS.forEach(c => { CMP_BY_Z[c.z] = c; });
