// Kimya temel veri tipleri

export type QuizTopic = 'element' | 'compound';

export interface ElementData {
  z: number;              // Atom numarası (1–36)
  s: string;              // Sembol (H, He, Li...)
  names: string[];        // [Kanonik Türkçe ad, ...kabul edilen eşanlamlılar]
  p: number;              // Periyot (1–4)
  g: string;              // Grup (1A, 2A, 3B...)
  c: string;              // Kategori adı (Alkali Metal, Halojen...)
}

export interface CompoundData {
  z: number;              // Sıra numarası (1–18)
  f: string;              // Ham formül (H2O, HCl, H2SO4...)
  names: string[];        // [Kanonik Türkçe ad, ...kabul edilen adlar]
  c: string;              // Tür (Asit, Baz, Tuz, Oksit)
  fk: string;             // Arama ve eşleştirme anahtarı
  disp: string;           // Alt simgeli gösterim metni (H₂O...)
}

export interface CategoryInfo {
  key: string;            // Kategori veya tür adı
  rgb: string;            // '255,146,43' renk formatı
}
