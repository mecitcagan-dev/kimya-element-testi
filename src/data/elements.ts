import { CategoryInfo, ElementData } from '../types/chemistry';

export const ELEMENT_RANGES: Record<'1-18' | '19-36' | '1-36', [number, number]> = {
  '1-18': [1, 18],
  '19-36': [19, 36],
  '1-36': [1, 36]
};

// 1–8 tuşlarıyla eşleşir. rgb: nokta rengi
export const ELEMENT_CATEGORIES: CategoryInfo[] = [
  { key: 'Alkali Metal', rgb: '255,146,43' },
  { key: 'Toprak Alkali Metal', rgb: '255,212,59' },
  { key: 'Geçiş Metali', rgb: '77,171,247' },
  { key: 'Post-Geçiş Metali', rgb: '56,217,217' },
  { key: 'Yarı Metal', rgb: '151,117,250' },
  { key: 'Ametal', rgb: '169,227,75' },
  { key: 'Halojen', rgb: '240,101,149' },
  { key: 'Soy Gaz', rgb: '206,212,218' }
];

export const ELEMENTS: ElementData[] = [
  { z: 1,  s: 'H',  names: ['Hidrojen'], p: 1, g: '1A', c: 'Ametal' },
  { z: 2,  s: 'He', names: ['Helyum'], p: 1, g: '8A', c: 'Soy Gaz' },
  { z: 3,  s: 'Li', names: ['Lityum'], p: 2, g: '1A', c: 'Alkali Metal' },
  { z: 4,  s: 'Be', names: ['Berilyum'], p: 2, g: '2A', c: 'Toprak Alkali Metal' },
  { z: 5,  s: 'B',  names: ['Bor'], p: 2, g: '3A', c: 'Yarı Metal' },
  { z: 6,  s: 'C',  names: ['Karbon'], p: 2, g: '4A', c: 'Ametal' },
  { z: 7,  s: 'N',  names: ['Azot', 'Nitrojen'], p: 2, g: '5A', c: 'Ametal' },
  { z: 8,  s: 'O',  names: ['Oksijen'], p: 2, g: '6A', c: 'Ametal' },
  { z: 9,  s: 'F',  names: ['Flor'], p: 2, g: '7A', c: 'Halojen' },
  { z: 10, s: 'Ne', names: ['Neon'], p: 2, g: '8A', c: 'Soy Gaz' },
  { z: 11, s: 'Na', names: ['Sodyum', 'Natriyum'], p: 3, g: '1A', c: 'Alkali Metal' },
  { z: 12, s: 'Mg', names: ['Magnezyum'], p: 3, g: '2A', c: 'Toprak Alkali Metal' },
  { z: 13, s: 'Al', names: ['Alüminyum'], p: 3, g: '3A', c: 'Post-Geçiş Metali' },
  { z: 14, s: 'Si', names: ['Silisyum', 'Silikon'], p: 3, g: '4A', c: 'Yarı Metal' },
  { z: 15, s: 'P',  names: ['Fosfor'], p: 3, g: '5A', c: 'Ametal' },
  { z: 16, s: 'S',  names: ['Kükürt'], p: 3, g: '6A', c: 'Ametal' },
  { z: 17, s: 'Cl', names: ['Klor'], p: 3, g: '7A', c: 'Halojen' },
  { z: 18, s: 'Ar', names: ['Argon'], p: 3, g: '8A', c: 'Soy Gaz' },
  { z: 19, s: 'K',  names: ['Potasyum', 'Kalyum'], p: 4, g: '1A', c: 'Alkali Metal' },
  { z: 20, s: 'Ca', names: ['Kalsiyum'], p: 4, g: '2A', c: 'Toprak Alkali Metal' },
  { z: 21, s: 'Sc', names: ['Skandiyum'], p: 4, g: '3B', c: 'Geçiş Metali' },
  { z: 22, s: 'Ti', names: ['Titanyum'], p: 4, g: '4B', c: 'Geçiş Metali' },
  { z: 23, s: 'V',  names: ['Vanadyum'], p: 4, g: '5B', c: 'Geçiş Metali' },
  { z: 24, s: 'Cr', names: ['Krom'], p: 4, g: '6B', c: 'Geçiş Metali' },
  { z: 25, s: 'Mn', names: ['Mangan', 'Manganez'], p: 4, g: '7B', c: 'Geçiş Metali' },
  { z: 26, s: 'Fe', names: ['Demir'], p: 4, g: '8B', c: 'Geçiş Metali' },
  { z: 27, s: 'Co', names: ['Kobalt'], p: 4, g: '8B', c: 'Geçiş Metali' },
  { z: 28, s: 'Ni', names: ['Nikel'], p: 4, g: '8B', c: 'Geçiş Metali' },
  { z: 29, s: 'Cu', names: ['Bakır'], p: 4, g: '1B', c: 'Geçiş Metali' },
  { z: 30, s: 'Zn', names: ['Çinko'], p: 4, g: '2B', c: 'Geçiş Metali' },
  { z: 31, s: 'Ga', names: ['Galyum'], p: 4, g: '3A', c: 'Post-Geçiş Metali' },
  { z: 32, s: 'Ge', names: ['Germanyum'], p: 4, g: '4A', c: 'Yarı Metal' },
  { z: 33, s: 'As', names: ['Arsenik'], p: 4, g: '5A', c: 'Yarı Metal' },
  { z: 34, s: 'Se', names: ['Selenyum'], p: 4, g: '6A', c: 'Ametal' },
  { z: 35, s: 'Br', names: ['Brom'], p: 4, g: '7A', c: 'Halojen' },
  { z: 36, s: 'Kr', names: ['Kripton'], p: 4, g: '8A', c: 'Soy Gaz' }
];

export const ELEMENT_BY_Z: Record<number, ElementData> = {};
ELEMENTS.forEach(el => {
  ELEMENT_BY_Z[el.z] = el;
});

// Periyodik tablo sütun eşleşmeleri (1–18)
export const PT_COL: Record<number, number> = {
  1: 1, 2: 18,
  3: 1, 4: 2, 5: 13, 6: 14, 7: 15, 8: 16, 9: 17, 10: 18,
  11: 1, 12: 2, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18,
  19: 1, 20: 2, 21: 3, 22: 4, 23: 5, 24: 6, 25: 7, 26: 8, 27: 9, 28: 10,
  29: 11, 30: 12, 31: 13, 32: 14, 33: 15, 34: 16, 35: 17, 36: 18
};

export const PT_GROUPS = [
  '1A', '2A', '3B', '4B', '5B', '6B', '7B', '8B', '8B', '8B',
  '1B', '2B', '3A', '4A', '5A', '6A', '7A', '8A'
];
