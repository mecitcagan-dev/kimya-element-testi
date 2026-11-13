import React, { useEffect, useMemo, useState } from 'react';
import { FormulaText } from '../Common/FormulaText';
import {
  CompoundNamingCategory,
  COVALENT_NAMING_CATEGORIES,
  IONIC_NAMING_CATEGORIES
} from '../../data/compoundNaming';

export interface CompoundBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartNamingQuiz: (categories?: CompoundNamingCategory[]) => void;
}

type WorkshopTab = 'ionic' | 'covalent';

interface CationDef {
  id: string;
  symbol: string;       // ASCII symbol for formula composition (e.g., 'NH4', 'Fe')
  disp: string;         // Display ion with charge (e.g., 'NH₄⁺', 'Fe³⁺')
  baseName: string;     // Turkish base name (e.g., 'Demir', 'Amonyum')
  charge: number;       // Positive integer (1..4)
  isVariable: boolean;  // Requires Roman numeral?
  roman?: string;       // 'I' | 'II' | 'III' | 'IV'
  isPoly: boolean;      // Polyatomic ion?
  isAmphoteric: boolean;
  groupNote: string;
  trapNote?: string;
}

interface AnionDef {
  id: string;
  symbol: string;       // ASCII symbol (e.g., 'OH', 'SO4', 'Cl')
  disp: string;         // Display ion with charge (e.g., 'SO₄²⁻', 'Cl⁻')
  name: string;         // Lowercase Turkish anion name (e.g., 'klorür', 'sülfat')
  chargeAbs: number;    // Positive integer magnitude of negative charge (1..4)
  isPoly: boolean;      // Polyatomic ion?
  kind: 'single' | 'poly';
}

const CATIONS: CationDef[] = [
  // Sabit değerlikliler
  {
    id: 'Na',
    symbol: 'Na',
    disp: 'Na⁺',
    baseName: 'Sodyum',
    charge: 1,
    isVariable: false,
    isPoly: false,
    isAmphoteric: false,
    groupNote: '1A Grubu (+1 sabit)'
  },
  {
    id: 'K',
    symbol: 'K',
    disp: 'K⁺',
    baseName: 'Potasyum',
    charge: 1,
    isVariable: false,
    isPoly: false,
    isAmphoteric: false,
    groupNote: '1A Grubu (+1 sabit)'
  },
  {
    id: 'Li',
    symbol: 'Li',
    disp: 'Li⁺',
    baseName: 'Lityum',
    charge: 1,
    isVariable: false,
    isPoly: false,
    isAmphoteric: false,
    groupNote: '1A Grubu (+1 sabit)'
  },
  {
    id: 'NH4',
    symbol: 'NH4',
    disp: 'NH₄⁺',
    baseName: 'Amonyum',
    charge: 1,
    isVariable: false,
    isPoly: true,
    isAmphoteric: false,
    groupNote: 'Çok atomlu katyon (+1 sabit)'
  },
  {
    id: 'Mg',
    symbol: 'Mg',
    disp: 'Mg²⁺',
    baseName: 'Magnezyum',
    charge: 2,
    isVariable: false,
    isPoly: false,
    isAmphoteric: false,
    groupNote: '2A Grubu (+2 sabit)'
  },
  {
    id: 'Ca',
    symbol: 'Ca',
    disp: 'Ca²⁺',
    baseName: 'Kalsiyum',
    charge: 2,
    isVariable: false,
    isPoly: false,
    isAmphoteric: false,
    groupNote: '2A Grubu (+2 sabit)'
  },
  {
    id: 'Ba',
    symbol: 'Ba',
    disp: 'Ba²⁺',
    baseName: 'Baryum',
    charge: 2,
    isVariable: false,
    isPoly: false,
    isAmphoteric: false,
    groupNote: '2A Grubu (+2 sabit)'
  },
  {
    id: 'Zn',
    symbol: 'Zn',
    disp: 'Zn²⁺',
    baseName: 'Çinko',
    charge: 2,
    isVariable: false,
    isPoly: false,
    isAmphoteric: true,
    groupNote: 'Geçiş metali (+2 sabit)',
    trapNote: "ÖSYM Tuzağı: Çinko geçiş metalidir fakat DAİMA +2 alır. 'Çinko(II) ...' YAZILMAZ!"
  },
  {
    id: 'Ag',
    symbol: 'Ag',
    disp: 'Ag⁺',
    baseName: 'Gümüş',
    charge: 1,
    isVariable: false,
    isPoly: false,
    isAmphoteric: false,
    groupNote: 'Geçiş metali (+1 sabit)',
    trapNote: "ÖSYM Tuzağı: Gümüş geçiş metalidir fakat DAİMA +1 alır. 'Gümüş(I) ...' YAZILMAZ!"
  },
  {
    id: 'Al',
    symbol: 'Al',
    disp: 'Al³⁺',
    baseName: 'Alüminyum',
    charge: 3,
    isVariable: false,
    isPoly: false,
    isAmphoteric: true,
    groupNote: '3A Grubu (+3 sabit)',
    trapNote: "ÖSYM Tuzağı: Alüminyum sabit +3 değerliklidir. 'Alüminyum(III) ...' YAZILMAZ!"
  },

  // Değişken değerlikliler (Romen rakamlı)
  {
    id: 'Fe2',
    symbol: 'Fe',
    disp: 'Fe²⁺',
    baseName: 'Demir',
    charge: 2,
    isVariable: true,
    roman: 'II',
    isPoly: false,
    isAmphoteric: false,
    groupNote: 'Değişken değerlikli (+2 / +3)'
  },
  {
    id: 'Fe3',
    symbol: 'Fe',
    disp: 'Fe³⁺',
    baseName: 'Demir',
    charge: 3,
    isVariable: true,
    roman: 'III',
    isPoly: false,
    isAmphoteric: false,
    groupNote: 'Değişken değerlikli (+2 / +3)'
  },
  {
    id: 'Cu1',
    symbol: 'Cu',
    disp: 'Cu⁺',
    baseName: 'Bakır',
    charge: 1,
    isVariable: true,
    roman: 'I',
    isPoly: false,
    isAmphoteric: false,
    groupNote: 'Değişken değerlikli (+1 / +2)'
  },
  {
    id: 'Cu2',
    symbol: 'Cu',
    disp: 'Cu²⁺',
    baseName: 'Bakır',
    charge: 2,
    isVariable: true,
    roman: 'II',
    isPoly: false,
    isAmphoteric: false,
    groupNote: 'Değişken değerlikli (+1 / +2)'
  },
  {
    id: 'Hg1',
    symbol: 'Hg',
    disp: 'Hg⁺',
    baseName: 'Cıva',
    charge: 1,
    isVariable: true,
    roman: 'I',
    isPoly: false,
    isAmphoteric: false,
    groupNote: 'Değişken değerlikli (+1 / +2)'
  },
  {
    id: 'Hg2',
    symbol: 'Hg',
    disp: 'Hg²⁺',
    baseName: 'Cıva',
    charge: 2,
    isVariable: true,
    roman: 'II',
    isPoly: false,
    isAmphoteric: false,
    groupNote: 'Değişken değerlikli (+1 / +2)'
  },
  {
    id: 'Sn2',
    symbol: 'Sn',
    disp: 'Sn²⁺',
    baseName: 'Kalay',
    charge: 2,
    isVariable: true,
    roman: 'II',
    isPoly: false,
    isAmphoteric: true,
    groupNote: 'Değişken değerlikli (+2 / +4)'
  },
  {
    id: 'Sn4',
    symbol: 'Sn',
    disp: 'Sn⁴⁺',
    baseName: 'Kalay',
    charge: 4,
    isVariable: true,
    roman: 'IV',
    isPoly: false,
    isAmphoteric: true,
    groupNote: 'Değişken değerlikli (+2 / +4)'
  },
  {
    id: 'Pb2',
    symbol: 'Pb',
    disp: 'Pb²⁺',
    baseName: 'Kurşun',
    charge: 2,
    isVariable: true,
    roman: 'II',
    isPoly: false,
    isAmphoteric: true,
    groupNote: 'Değişken değerlikli (+2 / +4)'
  },
  {
    id: 'Pb4',
    symbol: 'Pb',
    disp: 'Pb⁴⁺',
    baseName: 'Kurşun',
    charge: 4,
    isVariable: true,
    roman: 'IV',
    isPoly: false,
    isAmphoteric: true,
    groupNote: 'Değişken değerlikli (+2 / +4)'
  },
  {
    id: 'Cr3',
    symbol: 'Cr',
    disp: 'Cr³⁺',
    baseName: 'Krom',
    charge: 3,
    isVariable: true,
    roman: 'III',
    isPoly: false,
    isAmphoteric: true,
    groupNote: 'Değişken değerlikli (+2 / +3 / +6)'
  },
  {
    id: 'Mn4',
    symbol: 'Mn',
    disp: 'Mn⁴⁺',
    baseName: 'Mangan',
    charge: 4,
    isVariable: true,
    roman: 'IV',
    isPoly: false,
    isAmphoteric: false,
    groupNote: 'Değişken değerlikli (+2..+7)'
  }
];

const ANIONS: AnionDef[] = [
  // Tek atomlular
  { id: 'F', symbol: 'F', disp: 'F⁻', name: 'florür', chargeAbs: 1, isPoly: false, kind: 'single' },
  { id: 'Cl', symbol: 'Cl', disp: 'Cl⁻', name: 'klorür', chargeAbs: 1, isPoly: false, kind: 'single' },
  { id: 'Br', symbol: 'Br', disp: 'Br⁻', name: 'bromür', chargeAbs: 1, isPoly: false, kind: 'single' },
  { id: 'I', symbol: 'I', disp: 'I⁻', name: 'iyodür', chargeAbs: 1, isPoly: false, kind: 'single' },
  { id: 'O', symbol: 'O', disp: 'O²⁻', name: 'oksit', chargeAbs: 2, isPoly: false, kind: 'single' },
  { id: 'S', symbol: 'S', disp: 'S²⁻', name: 'sülfür', chargeAbs: 2, isPoly: false, kind: 'single' },
  { id: 'N', symbol: 'N', disp: 'N³⁻', name: 'nitrür', chargeAbs: 3, isPoly: false, kind: 'single' },
  { id: 'P', symbol: 'P', disp: 'P³⁻', name: 'fosfür', chargeAbs: 3, isPoly: false, kind: 'single' },
  { id: 'H', symbol: 'H', disp: 'H⁻', name: 'hidrür', chargeAbs: 1, isPoly: false, kind: 'single' },
  { id: 'C', symbol: 'C', disp: 'C⁴⁻', name: 'karbür', chargeAbs: 4, isPoly: false, kind: 'single' },

  // Çok atomlu kökler
  { id: 'OH', symbol: 'OH', disp: 'OH⁻', name: 'hidroksit', chargeAbs: 1, isPoly: true, kind: 'poly' },
  { id: 'NO3', symbol: 'NO3', disp: 'NO₃⁻', name: 'nitrat', chargeAbs: 1, isPoly: true, kind: 'poly' },
  { id: 'CN', symbol: 'CN', disp: 'CN⁻', name: 'siyanür', chargeAbs: 1, isPoly: true, kind: 'poly' },
  { id: 'CH3COO', symbol: 'CH3COO', disp: 'CH₃COO⁻', name: 'asetat', chargeAbs: 1, isPoly: true, kind: 'poly' },
  { id: 'MnO4', symbol: 'MnO4', disp: 'MnO₄⁻', name: 'permanganat', chargeAbs: 1, isPoly: true, kind: 'poly' },
  { id: 'SO4', symbol: 'SO4', disp: 'SO₄²⁻', name: 'sülfat', chargeAbs: 2, isPoly: true, kind: 'poly' },
  { id: 'CO3', symbol: 'CO3', disp: 'CO₃²⁻', name: 'karbonat', chargeAbs: 2, isPoly: true, kind: 'poly' },
  { id: 'CrO4', symbol: 'CrO4', disp: 'CrO₄²⁻', name: 'kromat', chargeAbs: 2, isPoly: true, kind: 'poly' },
  { id: 'PO4', symbol: 'PO4', disp: 'PO₄³⁻', name: 'fosfat', chargeAbs: 3, isPoly: true, kind: 'poly' }
];

const FAMOUS_TRADITIONAL_NAMES: Record<string, { name: string; detail: string }> = {
  NaCl: { name: 'Sofra tuzu (Yemek tuzu)', detail: 'Nötr iyonik tuz; gıda ve serum fizyolojikte kullanılır.' },
  NaOH: { name: 'Sudkostik (Kostik)', detail: 'Kuvvetli baz; beyaz sabun ve lavabo açıcı üretiminde kullanılır.' },
  KOH: { name: 'Potaskostik', detail: 'Kuvvetli baz; arap sabunu ve pil elektrolitinde kullanılır.' },
  'Ca(OH)2': { name: 'Sönmüş kireç', detail: 'Kireç suyunun ana maddesi (CO₂ ayıracı); orta-kuvvetli bazdır.' },
  CaO: { name: 'Sönmemiş kireç', detail: 'Su ile egzotermik tepkime vererek sönmüş kirece dönüşür.' },
  CaCO3: { name: 'Kireç taşı (Mermer / Tebeşir)', detail: 'Suda çözünmez; asitlerle tepkime verip CO₂ gazı çıkarır.' },
  Na2CO3: { name: 'Çamaşır sodası', detail: 'Bazik tuzdur; sert suları yumuşatmada ve cam üretiminde kullanılır.' },
  NH4Cl: { name: 'Nişadır', detail: 'Asidik tuzdur; lehimcilikte ve kuru pillerde kullanılır.' },
  NH4NO3: { name: 'Amonyum nitrat', detail: 'Azotça zengin suni gübre ve soğutma paketlerinde kullanılır.' },
  KNO3: { name: 'Güherçile', detail: 'Kara barut ve potasyumlu gübre üretiminde kullanılır.' },
  CuSO4: { name: 'Göztaşı (Susuz formu)', detail: 'Pentahidratı (CuSO₄·5H₂O) mavi göztaşı olarak bilinir; tarım ilacıdır.' },
  'Mg(OH)2': { name: 'Magnezya sütü', detail: 'Suda az çözünen zayıf baz; mide asidini nötrleştirmede kullanılır.' },
  BaSO4: { name: 'Barit', detail: 'Suda çok az çözünür; tıpta röntgen kontrast maddesidir.' },
  CaSO4: { name: 'Alçı taşı bileşeni', detail: 'Dihidratı (CaSO₄·2H₂O) jips / alçı taşı olarak bilinir.' },
  Na2SO4: { name: 'Glauber tuzu (Susuz)', detail: 'Kağıt ve deterjan sanayisinde kullanılır.' },
  AgNO3: { name: 'Cehennem taşı', detail: 'Klorür iyonu ayıracı olarak laboratuvarda kullanılır.' },
  KMnO4: { name: 'Potasyum permanganat', detail: 'Mor renkli güçlü yükseltgen ve antiseptik maddedir.' },
  NH4OH: { name: 'Sulu amonyak', detail: 'NH₃ gazının sudaki çözeltisidir; zayıf baz özelliği gösterir.' },
  Al2O3: { name: 'Korundum / Boksit cevheri', detail: 'Çok sert amfoter oksittir; alüminyum üretiminde kullanılır.' },
  Fe2O3: { name: 'Hematit (Demir pası)', detail: 'Kırmızı-kahverengi demir cevheridir.' },
  Al4C3: { name: 'Alüminyum karbür', detail: 'Su ile tepkimeye girerek metan (CH₄) gazı açığa çıkarır.' },
  HgCl2: { name: 'Süblime (Ak süblime)', detail: 'Kuvvetli zehirli cıva bileşiğidir.' },
  PbS: { name: 'Galen', detail: 'Başlıca kurşun cevheridir.' },
  SnO2: { name: 'Kasiterit (Kalay taşı)', detail: 'Başlıca kalay cevheridir.' }
};

const HIGH_YIELD_IONIC_PRESETS: Array<{ cationId: string; anionId: string; label: string }> = [
  { cationId: 'Ca', anionId: 'O', label: 'Ca²⁺ + O²⁻' },
  { cationId: 'Sn4', anionId: 'O', label: 'Sn⁴⁺ + O²⁻' },
  { cationId: 'Al', anionId: 'SO4', label: 'Al³⁺ + SO₄²⁻' },
  { cationId: 'Ca', anionId: 'OH', label: 'Ca²⁺ + OH⁻' },
  { cationId: 'NH4', anionId: 'SO4', label: 'NH₄⁺ + SO₄²⁻' },
  { cationId: 'Fe3', anionId: 'OH', label: 'Fe³⁺ + OH⁻' },
  { cationId: 'Zn', anionId: 'Cl', label: 'Zn²⁺ + Cl⁻' },
  { cationId: 'Cu1', anionId: 'O', label: 'Cu⁺ + O²⁻' }
];

const gcd = (a: number, b: number): number => {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
};

const formatAsciiPart = (symbol: string, isPoly: boolean, sub: number): string => {
  if (sub === 1) return symbol;
  return isPoly ? `(${symbol})${sub}` : `${symbol}${sub}`;
};

const getCompoundClass = (
  cation: CationDef,
  anion: AnionDef
): { label: string; badgeColor: string; note: string } => {
  if (anion.id === 'OH') {
    if (cation.isAmphoteric) {
      return {
        label: 'Amfoter Hidroksit',
        badgeColor: '#ffd43b',
        note: `${cation.baseName} amfoter metaldir; hidroksiti hem asitlerle hem kuvvetli bazlarla tepkime verir.`
      };
    }
    if (cation.id === 'NH4') {
      return {
        label: 'Baz (Zayıf Baz)',
        badgeColor: '#4dabf7',
        note: 'Amonyağın (NH₃) sudaki çözünmüş formudur; zayıf baz özelliği gösterir.'
      };
    }
    const isStrong = ['Na', 'K', 'Li', 'Ca', 'Ba'].includes(cation.id);
    return {
      label: isStrong ? 'Baz (Kuvvetli Baz)' : 'Baz',
      badgeColor: '#4dabf7',
      note: isStrong
        ? '1A / ağır 2A grubu hidroksitleri suda iyonlaşarak kuvvetli baz çözeltisi oluşturur.'
        : 'Suda az çözünen metal hidroksittir; asitlerle nötrleşme tepkimesi verir.'
    };
  }

  if (anion.id === 'O') {
    if (cation.id === 'NH4') {
      return {
        label: 'Teorik İyonik Oksit',
        badgeColor: '#9b9bab',
        note: '(NH₄)₂O saf katı olarak kararlı değildir; sulu ortamda NH₃ ve suya ayrışır.'
      };
    }
    if (cation.isAmphoteric) {
      return {
        label: 'Amfoter Oksit',
        badgeColor: '#ffd43b',
        note: `${cation.baseName} amfoter metaldir (Al, Zn, Cr, Sn, Pb, Be). Oksiti hem asitle hem kuvvetli bazla tepkime verir.`
      };
    }
    if (cation.id === 'Mn4') {
      return {
        label: 'Metal Oksit (Geçiş Metali)',
        badgeColor: '#ff922b',
        note: 'MnO₂ yüksek yükseltgenme basamaklı geçiş metali oksididir; kuvvetli yükseltgen ve katalizördür.'
      };
    }
    return {
      label: 'Bazik Oksit',
      badgeColor: '#4dabf7',
      note: 'Amfoter olmayan metal oksitler bazik özellik taşır; asitlerle tuz ve su, aktif olanları suyla baz oluşturur.'
    };
  }

  if (anion.id === 'H') {
    return {
      label: 'Metal Hidrür (Bazik Karakterli)',
      badgeColor: '#51cf66',
      note: 'Hidrojen bu bileşikte -1 değerliklidir; su ile tepkime verip H₂ gazı ve baz oluşturur.'
    };
  }

  // Tuzlar
  if (cation.id === 'NH4' && ['Cl', 'Br', 'I', 'NO3', 'SO4'].includes(anion.id)) {
    return {
      label: 'Tuz (Asidik Tuz)',
      badgeColor: '#51cf66',
      note: 'Zayıf baz (NH₃) ile kuvvetli asitten türediği için sulu çözeltisi asidiktir (pH < 7).'
    };
  }
  if (['Na', 'K', 'Li'].includes(cation.id) && ['CO3', 'CN', 'CH3COO', 'F'].includes(anion.id)) {
    return {
      label: 'Tuz (Bazik Tuz)',
      badgeColor: '#51cf66',
      note: 'Kuvvetli baz ile zayıf asitten türediği için hidroliz olur ve sulu çözeltisi baziktir (pH > 7).'
    };
  }
  return {
    label: 'Tuz (İyonik Bileşik)',
    badgeColor: '#51cf66',
    note: 'Katyon ve anyonun elektrostatik çekimiyle oluşan kristal örgü yapılı iyonik tuzdur.'
  };
};

// --- Tab 2: Kovalent Bileşikler Verileri ---

const LATIN_PREFIXES: Array<{ num: number; prefix: string; example: string }> = [
  { num: 1, prefix: 'mono', example: 'CO → Karbon monoksit' },
  { num: 2, prefix: 'di', example: 'CO₂ → Karbon dioksit' },
  { num: 3, prefix: 'tri', example: 'SO₃ → Kükürt trioksit' },
  { num: 4, prefix: 'tetra', example: 'CCl₄ → Karbon tetraklorür' },
  { num: 5, prefix: 'penta', example: 'PCl₅ → Fosfor pentaklorür' },
  { num: 6, prefix: 'hekza', example: 'SF₆ → Kükürt hekzaflorür' },
  { num: 7, prefix: 'hepta', example: 'Cl₂O₇ → Diklor heptaoksit' },
  { num: 8, prefix: 'okta', example: 'OsO₄ değil; S₈ / oktaflorürler' },
  { num: 9, prefix: 'nona', example: 'Nona- (9 atomlu yapılar)' },
  { num: 10, prefix: 'deka', example: 'P₄O₁₀ → Tetrafosfor dekaoksit' }
];

interface FirstNonmetal {
  symbol: string;
  name: string;       // Capitalized Turkish name
  lowerName: string;  // Lowercase Turkish name
  en: number;         // Pauling electronegativity
}

interface SecondNonmetal {
  symbol: string;
  anionName: string;  // e.g., 'oksit', 'florür'
  en: number;
}

const FIRST_NONMETALS: FirstNonmetal[] = [
  { symbol: 'C', name: 'Karbon', lowerName: 'karbon', en: 2.55 },
  { symbol: 'N', name: 'Azot', lowerName: 'azot', en: 3.04 },
  { symbol: 'S', name: 'Kükürt', lowerName: 'kükürt', en: 2.58 },
  { symbol: 'P', name: 'Fosfor', lowerName: 'fosfor', en: 2.19 },
  { symbol: 'Cl', name: 'Klor', lowerName: 'klor', en: 3.16 },
  { symbol: 'O', name: 'Oksijen', lowerName: 'oksijen', en: 3.44 }
];

const SECOND_NONMETALS: SecondNonmetal[] = [
  { symbol: 'O', anionName: 'oksit', en: 3.44 },
  { symbol: 'F', anionName: 'florür', en: 3.98 },
  { symbol: 'Cl', anionName: 'klorür', en: 3.16 },
  { symbol: 'Br', anionName: 'bromür', en: 2.96 },
  { symbol: 'S', anionName: 'sülfür', en: 2.58 }
];

interface CuratedCovalentMolecule {
  formulaAscii: string;
  el1: string;
  n1: number;
  el2: string;
  n2: number;
  note: string;
}

const CURATED_COVALENT_MOLECULES: CuratedCovalentMolecule[] = [
  {
    formulaAscii: 'CO',
    el1: 'C',
    n1: 1,
    el2: 'O',
    n2: 1,
    note: "İlk C'de 'mono' atılır, ikinci O'da 'monoksit' yazılır. Nötr oksittir, zehirlidir."
  },
  {
    formulaAscii: 'CO2',
    el1: 'C',
    n1: 1,
    el2: 'O',
    n2: 2,
    note: 'Asidik oksit, doğrusal apolar molekül. Kuru buz olarak bilinir.'
  },
  {
    formulaAscii: 'NO',
    el1: 'N',
    n1: 1,
    el2: 'O',
    n2: 1,
    note: 'Nötr oksittir (oksijen sayısı ametale eşit veya az olan oksit).'
  },
  {
    formulaAscii: 'NO2',
    el1: 'N',
    n1: 1,
    el2: 'O',
    n2: 2,
    note: 'Kahverengi gaz; asidik oksittir ve asit yağmurlarına yol açar.'
  },
  {
    formulaAscii: 'N2O',
    el1: 'N',
    n1: 2,
    el2: 'O',
    n2: 1,
    note: 'Güldürücü gaz olarak bilinir; oksijence fakir olduğu için nötr oksittir.'
  },
  {
    formulaAscii: 'N2O3',
    el1: 'N',
    n1: 2,
    el2: 'O',
    n2: 3,
    note: 'Mavi sıvı/gaz; asidik oksittir (HNO₂ anhidridi).'
  },
  {
    formulaAscii: 'N2O4',
    el1: 'N',
    n1: 2,
    el2: 'O',
    n2: 4,
    note: 'NO₂ ile denge halindeki dimer molekül (2NO₂ ⇌ N₂O₄).'
  },
  {
    formulaAscii: 'N2O5',
    el1: 'N',
    n1: 2,
    el2: 'O',
    n2: 5,
    note: 'Dikkat: penta + oksit = pentaoksit (a düşmez, sadece monoksitte o düşer).'
  },
  {
    formulaAscii: 'SO2',
    el1: 'S',
    n1: 1,
    el2: 'O',
    n2: 2,
    note: 'Kırık doğru (açısal) polar molekül; asit yağmuru etkenidir.'
  },
  {
    formulaAscii: 'SO3',
    el1: 'S',
    n1: 1,
    el2: 'O',
    n2: 3,
    note: 'Düzlem üçgen apolar molekül; suyla H₂SO₄ oluşturur.'
  },
  {
    formulaAscii: 'PCl3',
    el1: 'P',
    n1: 1,
    el2: 'Cl',
    n2: 3,
    note: 'Üçgen piramit (polar) molekül.'
  },
  {
    formulaAscii: 'PCl5',
    el1: 'P',
    n1: 1,
    el2: 'Cl',
    n2: 5,
    note: 'Üçgen bipiramit molekül (fosfor okteti aşar).'
  },
  {
    formulaAscii: 'SF6',
    el1: 'S',
    n1: 1,
    el2: 'F',
    n2: 6,
    note: 'Düzgün sekizyüzlü (oktahedral) apolar gaz; yalıtkan olarak kullanılır.'
  },
  {
    formulaAscii: 'CCl4',
    el1: 'C',
    n1: 1,
    el2: 'Cl',
    n2: 4,
    note: 'Düzgün dörtyüzlü (tetrahedral) apolar organik çözücü.'
  },
  {
    formulaAscii: 'CS2',
    el1: 'C',
    n1: 1,
    el2: 'S',
    n2: 2,
    note: 'CO₂ gibi doğrusal ve apolar kovalent moleküldür.'
  },
  {
    formulaAscii: 'OF2',
    el1: 'O',
    n1: 1,
    el2: 'F',
    n2: 2,
    note: "ÖSYM KLASİĞİ: F (EN=3.98) > O (EN=3.44) olduğu için O başa (+2), F sona (-1) yazılır → Oksijen diflorür! 'Diflor oksit' YANLIŞTIR."
  }
];

const EXTRA_KNOWN_COVALENT: Record<string, string> = {
  Cl2O: 'Gerçek asidik oksit (Diklor monoksit); Cl daha az elektronegatif olduğu için başa yazılır.',
  Cl2O7: 'Gerçek asidik oksit (Perklorik asidin anhidridi).',
  PBr3: 'Gerçek molekül (Fosfor tribromür).',
  SF4: 'Gerçek molekül (Kükürt tetraflorür).',
  SCl2: 'Gerçek molekül (Kükürt diklorür).',
  NCl3: 'Gerçek molekül (Azot triklorür).',
  P2O5: 'Ampirik formül (gerçek moleküler hali P₄O₁₀ dur).'
};

const capitalizeTr = (s: string): string =>
  s.length === 0 ? s : s.charAt(0).toLocaleUpperCase('tr-TR') + s.slice(1);

const getPrefixByNum = (n: number): string =>
  LATIN_PREFIXES.find(p => p.num === n)?.prefix ?? String(n);

const buildCovalentName = (
  first: FirstNonmetal,
  n1: number,
  second: SecondNonmetal,
  n2: number
): {
  fullName: string;
  firstPart: string;
  secondPart: string;
  firstRule: string;
  secondRule: string;
} => {
  const p1 = getPrefixByNum(n1);
  const p2 = getPrefixByNum(n2);

  const firstPart =
    n1 === 1 ? first.name : capitalizeTr(`${p1}${first.lowerName}`);

  const firstRule =
    n1 === 1
      ? `İlk elementin sayısı 1 olduğu için "mono" ÖNEKİ KULLANILMAZ → ${first.name}`
      : `Sayı ${n1} → "${p1}" + "${first.lowerName}" → ${firstPart}`;

  // mono + oksit -> monoksit (o harfi düşer)
  let secondPart: string;
  let secondRule: string;
  if (n2 === 1 && second.symbol === 'O') {
    secondPart = 'monoksit';
    secondRule = '2. element 1 olsa bile "mono" YAZILIR; mono + oksit → "monoksit"';
  } else {
    secondPart = `${p2}${second.anionName}`;
    secondRule =
      n2 === 1
        ? `2. elementte 1 olsa bile "mono" YAZILIR → "mono" + "${second.anionName}" = ${secondPart}`
        : `Sayı ${n2} → "${p2}" + "${second.anionName}" = ${secondPart}`;
  }

  return {
    fullName: `${firstPart} ${secondPart}`,
    firstPart,
    secondPart,
    firstRule,
    secondRule
  };
};

export const CompoundBuilderModal: React.FC<CompoundBuilderModalProps> = ({
  isOpen,
  onClose,
  onStartNamingQuiz
}) => {
  const [activeTab, setActiveTab] = useState<WorkshopTab>('ionic');

  // Tab 1 state (start on a classic simplification example or famous compound)
  const [cationId, setCationId] = useState<string>('Al');
  const [anionId, setAnionId] = useState<string>('SO4');

  // Tab 2 state
  const [covEl1, setCovEl1] = useState<string>('N');
  const [covN1, setCovN1] = useState<number>(2);
  const [covEl2, setCovEl2] = useState<string>('O');
  const [covN2, setCovN2] = useState<number>(5);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const cation = useMemo(
    () => CATIONS.find(c => c.id === cationId) ?? CATIONS[0],
    [cationId]
  );
  const anion = useMemo(
    () => ANIONS.find(a => a.id === anionId) ?? ANIONS[0],
    [anionId]
  );

  // Cross-over calculations
  const ionicResult = useMemo(() => {
    const rawCationSub = anion.chargeAbs;
    const rawAnionSub = cation.charge;
    const divisor = gcd(rawCationSub, rawAnionSub);
    const cationSub = rawCationSub / divisor;
    const anionSub = rawAnionSub / divisor;

    const rawFormulaAscii = `${formatAsciiPart(
      cation.symbol,
      cation.isPoly,
      rawCationSub
    )}${formatAsciiPart(anion.symbol, anion.isPoly, rawAnionSub)}`;

    const netFormulaAscii = `${formatAsciiPart(
      cation.symbol,
      cation.isPoly,
      cationSub
    )}${formatAsciiPart(anion.symbol, anion.isPoly, anionSub)}`;

    const iupacName = cation.isVariable
      ? `${cation.baseName}(${cation.roman}) ${anion.name}`
      : `${cation.baseName} ${anion.name}`;

    const compoundClass = getCompoundClass(cation, anion);
    const famous = FAMOUS_TRADITIONAL_NAMES[netFormulaAscii];

    return {
      rawCationSub,
      rawAnionSub,
      divisor,
      cationSub,
      anionSub,
      rawFormulaAscii,
      netFormulaAscii,
      iupacName,
      compoundClass,
      famous
    };
  }, [cation, anion]);

  const handleRandomIonic = () => {
    // 60% chance curated high-yield pair, 40% chance any pair (guaranteed different)
    let nextCat = cationId;
    let nextAn = anionId;
    let tries = 0;
    while (nextCat === cationId && nextAn === anionId && tries < 10) {
      tries++;
      if (Math.random() < 0.6) {
        const pick =
          HIGH_YIELD_IONIC_PRESETS[
            Math.floor(Math.random() * HIGH_YIELD_IONIC_PRESETS.length)
          ];
        nextCat = pick.cationId;
        nextAn = pick.anionId;
      } else {
        const randC = CATIONS[Math.floor(Math.random() * CATIONS.length)];
        const randA = ANIONS[Math.floor(Math.random() * ANIONS.length)];
        nextCat = randC.id;
        nextAn = randA.id;
      }
    }
    setCationId(nextCat);
    setAnionId(nextAn);
  };

  // Covalent calculations
  const covalentResult = useMemo(() => {
    const first =
      FIRST_NONMETALS.find(e => e.symbol === covEl1) ?? FIRST_NONMETALS[0];
    const second =
      SECOND_NONMETALS.find(e => e.symbol === covEl2) ?? SECOND_NONMETALS[0];

    const formulaAscii = `${first.symbol}${covN1 > 1 ? covN1 : ''}${second.symbol}${
      covN2 > 1 ? covN2 : ''
    }`;

    const naming = buildCovalentName(first, covN1, second, covN2);
    const curated = CURATED_COVALENT_MOLECULES.find(
      m => m.formulaAscii === formulaAscii
    );
    const extraNote = EXTRA_KNOWN_COVALENT[formulaAscii];

    const sameElement = first.symbol === second.symbol;
    const wrongEnOrder = !sameElement && first.en > second.en;

    return {
      first,
      second,
      formulaAscii,
      naming,
      curated,
      extraNote,
      sameElement,
      wrongEnOrder
    };
  }, [covEl1, covN1, covEl2, covN2]);

  if (!isOpen) return null;

  const fixedCations = CATIONS.filter(c => !c.isVariable);
  const variableCations = CATIONS.filter(c => c.isVariable);
  const singleAnions = ANIONS.filter(a => a.kind === 'single');
  const polyAnions = ANIONS.filter(a => a.kind === 'poly');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="compound-builder-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '20px',
        backdropFilter: 'blur(5px)'
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{
          maxWidth: '1100px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          position: 'relative',
          padding: '28px 34px'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Başlık */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '32px' }}>🧪</span>
            <div>
              <h2 id="compound-builder-title" style={{ margin: 0, fontSize: '22px' }}>
                İyon Çaprazlama &amp; Bileşik Adlandırma Atölyesi
              </h2>
              <p className="hint" style={{ margin: '4px 0 0', fontSize: '14px' }}>
                Katyon–anyon çaprazlamasını, EBOB sadeleştirmeyi, Romen rakamı kurallarını ve kovalent Latince önekleri deneyerek öğren!
              </p>
            </div>
          </div>
          <button
            type="button"
            className="btn ghost small"
            onClick={onClose}
            aria-label="Kapat"
          >
            ✕
          </button>
        </div>

        {/* Ana Sekmeler */}
        <div
          role="tablist"
          aria-label="Atölye sekmeleri"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginTop: '20px',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '14px'
          }}
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'ionic'}
            className={`btn ${activeTab === 'ionic' ? 'primary' : 'ghost'} small`}
            style={
              activeTab === 'ionic'
                ? { backgroundColor: '#ffd43b', color: '#15151c', borderColor: '#ffd43b' }
                : {}
            }
            onClick={() => setActiveTab('ionic')}
          >
            ⚡ İyonik Bileşik Çaprazlama Atölyesi
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'covalent'}
            className={`btn ${activeTab === 'covalent' ? 'primary' : 'ghost'} small`}
            style={
              activeTab === 'covalent'
                ? { backgroundColor: '#4dabf7', color: '#15151c', borderColor: '#4dabf7' }
                : {}
            }
            onClick={() => setActiveTab('covalent')}
          >
            🔤 Kovalent Bileşikler &amp; Latince Önek Atölyesi
          </button>
        </div>

        {/* TAB 1: İYONİK BİLEŞİK ÇAPRAZLAMA ATÖLYESİ */}
        {activeTab === 'ionic' && (
          <div style={{ marginTop: '20px', display: 'grid', gap: '20px' }}>
            {/* Üst Araç Çubuğu: Hızlı Örnekler + Rastgele */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 700, marginRight: '4px' }}>
                  ÖSYM Klasikleri:
                </span>
                {HIGH_YIELD_IONIC_PRESETS.map(p => {
                  const isCurrent = p.cationId === cationId && p.anionId === anionId;
                  return (
                    <button
                      key={p.label}
                      type="button"
                      className="btn ghost small"
                      onClick={() => {
                        setCationId(p.cationId);
                        setAnionId(p.anionId);
                      }}
                      style={{
                        padding: '4px 10px',
                        fontSize: '12px',
                        borderRadius: '999px',
                        borderColor: isCurrent ? '#ffd43b' : 'var(--border-2)',
                        color: isCurrent ? '#ffd43b' : 'var(--muted)',
                        backgroundColor: isCurrent ? 'rgba(255, 212, 59, 0.12)' : 'var(--card-2)'
                      }}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                className="btn secondary small"
                onClick={handleRandomIonic}
                style={{
                  borderColor: 'rgba(255, 212, 59, 0.5)',
                  color: '#ffd43b'
                }}
              >
                Rastgele Örnek Getir 🎲
              </button>
            </div>

            {/* Canlı Çaprazlama Motoru Sonuç Paneli */}
            <section
              style={{
                backgroundColor: 'var(--card-2)',
                border: '1px solid var(--border-2)',
                borderRadius: '16px',
                padding: '22px 24px',
                display: 'grid',
                gap: '18px'
              }}
            >
              {/* Görsel Çaprazlama Akışı */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '14px'
                }}
              >
                {/* Katyon Kutusu */}
                <div
                  style={{
                    minWidth: '140px',
                    padding: '12px 18px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(77, 171, 247, 0.10)',
                    border: '1.5px solid rgba(77, 171, 247, 0.45)',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#4dabf7', textTransform: 'uppercase' }}>
                    Katyon (+)
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginTop: '2px' }}>
                    {cation.disp}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                    Yük: <strong style={{ color: '#4dabf7' }}>+{cation.charge}</strong> → Anyon altına{' '}
                    <strong style={{ color: '#fff' }}>{cation.charge}</strong>
                  </div>
                </div>

                <div style={{ fontSize: '20px', color: 'var(--muted)', fontWeight: 800 }}>⇄</div>

                {/* Anyon Kutusu */}
                <div
                  style={{
                    minWidth: '140px',
                    padding: '12px 18px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(255, 146, 43, 0.10)',
                    border: '1.5px solid rgba(255, 146, 43, 0.45)',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#ff922b', textTransform: 'uppercase' }}>
                    Anyon (−)
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginTop: '2px' }}>
                    {anion.disp}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                    Yük: <strong style={{ color: '#ff922b' }}>-{anion.chargeAbs}</strong> → Katyon altına{' '}
                    <strong style={{ color: '#fff' }}>{anion.chargeAbs}</strong>
                  </div>
                </div>

                <div style={{ fontSize: '22px', color: '#ffd43b', fontWeight: 800 }}>➜</div>

                {/* Net Formül Kutusu */}
                <div
                  style={{
                    minWidth: '200px',
                    padding: '14px 24px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(255, 212, 59, 0.12)',
                    border: '2px solid rgba(255, 212, 59, 0.65)',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#ffd43b', textTransform: 'uppercase' }}>
                    Net Bileşik Formülü
                  </div>
                  <div
                    style={{
                      fontSize: 'clamp(28px, 4vw, 38px)',
                      fontWeight: 800,
                      color: '#fff',
                      letterSpacing: '-0.01em',
                      marginTop: '2px'
                    }}
                  >
                    <FormulaText text={ionicResult.netFormulaAscii} />
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>
                    Yük dengesi: {ionicResult.cationSub}×(+{cation.charge}) + {ionicResult.anionSub}×(-{anion.chargeAbs}) = 0
                  </div>
                </div>
              </div>

              {/* Adım Adım Çaprazlama Dökümü */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '10px',
                  padding: '12px 14px',
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  fontSize: '13px'
                }}
              >
                <div>
                  <span style={{ color: 'var(--muted)', fontWeight: 700, display: 'block', marginBottom: '3px' }}>
                    1. Çaprazlama Adımı
                  </span>
                  <span style={{ color: 'var(--text)' }}>
                    {cation.symbol} altına <strong style={{ color: '#ff922b' }}>{ionicResult.rawCationSub}</strong>,{' '}
                    {anion.symbol} altına <strong style={{ color: '#4dabf7' }}>{ionicResult.rawAnionSub}</strong> gelir →{' '}
                    <strong style={{ color: '#fff' }}>
                      <FormulaText text={ionicResult.rawFormulaAscii} />
                    </strong>
                  </span>
                </div>

                <div>
                  <span style={{ color: 'var(--muted)', fontWeight: 700, display: 'block', marginBottom: '3px' }}>
                    2. EBOB Sadeleştirme
                  </span>
                  {ionicResult.divisor > 1 ? (
                    <span style={{ color: '#51cf66', fontWeight: 600 }}>
                      EBOB({ionicResult.rawCationSub}, {ionicResult.rawAnionSub}) = {ionicResult.divisor} → Her iki alt indis{' '}
                      {ionicResult.divisor} ile bölünür →{' '}
                      <strong>
                        <FormulaText text={ionicResult.netFormulaAscii} />
                      </strong>
                    </span>
                  ) : (
                    <span style={{ color: 'var(--text)' }}>
                      EBOB({ionicResult.rawCationSub}, {ionicResult.rawAnionSub}) = 1 (Ortak bölen yok, sadeleşme yapılmaz)
                    </span>
                  )}
                </div>

                <div>
                  <span style={{ color: 'var(--muted)', fontWeight: 700, display: 'block', marginBottom: '3px' }}>
                    3. Parantez &amp; 1 Kuralı
                  </span>
                  <span style={{ color: 'var(--text)' }}>
                    {(cation.isPoly && ionicResult.cationSub > 1) ||
                    (anion.isPoly && ionicResult.anionSub > 1)
                      ? 'Çok atomlu kökün alt indisi 1’den büyük olduğu için kök paranteze alınır.'
                      : cation.isPoly || anion.isPoly
                      ? 'Çok atomlu kökün alt indisi 1 olduğu için parantez KONMAZ ve 1 yazılmaz.'
                      : 'Tek atomlu iyonlarda parantez konmaz; alt indis 1 ise yazılmaz.'}
                  </span>
                </div>
              </div>

              {/* Adlandırma, Sınıf ve Geleneksel Ad Kartları */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '12px'
                }}
              >
                {/* IUPAC Sistematik Adı */}
                <div
                  style={{
                    padding: '14px 16px',
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 700 }}>
                      IUPAC Sistematik Adı
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '999px',
                        backgroundColor: cation.isVariable
                          ? 'rgba(255, 146, 43, 0.16)'
                          : 'rgba(77, 171, 247, 0.15)',
                        color: cation.isVariable ? '#ff922b' : '#4dabf7',
                        border: `1px solid ${cation.isVariable ? 'rgba(255, 146, 43, 0.45)' : 'rgba(77, 171, 247, 0.45)'}`
                      }}
                    >
                      {cation.isVariable ? `Romen Rakamlı (${cation.roman})` : 'Sabit Değerlikli'}
                    </span>
                  </div>
                  <div style={{ fontSize: '21px', fontWeight: 800, color: '#fff', marginTop: '6px' }}>
                    {ionicResult.iupacName}
                  </div>
                  <p style={{ margin: '6px 0 0', fontSize: '12px', color: cation.trapNote ? '#ffd43b' : 'var(--muted)', lineHeight: 1.45 }}>
                    {cation.trapNote
                      ? `⚠️ ${cation.trapNote}`
                      : cation.isVariable
                      ? `${cation.baseName} birden fazla pozitif değerlik alabildiği için yükü Romen rakamı (${cation.roman}) ile belirtilir.`
                      : `${cation.groupNote} olduğu için Romen rakamı KULLANILMAZ.`}
                  </p>
                </div>

                {/* Bileşik Sınıfı */}
                <div
                  style={{
                    padding: '14px 16px',
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px'
                  }}
                >
                  <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 700 }}>
                    Bileşik Sınıfı
                  </span>
                  <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        width: '9px',
                        height: '9px',
                        borderRadius: '50%',
                        backgroundColor: ionicResult.compoundClass.badgeColor,
                        flexShrink: 0
                      }}
                    />
                    <strong style={{ fontSize: '18px', color: '#fff' }}>
                      {ionicResult.compoundClass.label}
                    </strong>
                  </div>
                  <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'var(--muted)', lineHeight: 1.45 }}>
                    {ionicResult.compoundClass.note}
                  </p>
                </div>

                {/* Yaygın Geleneksel Ad & Özel Kimya Notu */}
                <div
                  style={{
                    padding: '14px 16px',
                    backgroundColor: ionicResult.famous
                      ? 'rgba(255, 212, 59, 0.08)'
                      : 'var(--card)',
                    border: ionicResult.famous
                      ? '1px solid rgba(255, 212, 59, 0.4)'
                      : '1px solid var(--border)',
                    borderRadius: '12px'
                  }}
                >
                  <span style={{ fontSize: '12px', color: ionicResult.famous ? '#ffd43b' : 'var(--muted)', fontWeight: 700 }}>
                    {ionicResult.famous ? '⭐ Yaygın Geleneksel Ad' : '💡 Kimya İpucu'}
                  </span>
                  {ionicResult.famous ? (
                    <>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffd43b', marginTop: '6px' }}>
                        {ionicResult.famous.name}
                      </div>
                      <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'var(--text)', lineHeight: 1.45 }}>
                        {ionicResult.famous.detail}
                      </p>
                    </>
                  ) : (
                    <p style={{ margin: '8px 0 0', fontSize: '12px', color: 'var(--muted)', lineHeight: 1.5 }}>
                      İyonik bileşikler katyon + anyon adıyla okunur; Latince önekler (mono, di, tri...) <strong>ASLA</strong> kullanılmaz!
                    </p>
                  )}

                  {cation.id === 'Hg1' && (
                    <div
                      style={{
                        marginTop: '8px',
                        padding: '6px 8px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(229, 72, 77, 0.12)',
                        borderLeft: '3px solid #e5484d',
                        fontSize: '11.5px',
                        color: 'var(--text)'
                      }}
                    >
                      <strong>Gerçek Yapı Notu:</strong> Cıva(I) iyonu doğada dimer (<strong>Hg₂²⁺</strong>) halindedir; bu yüzden Cıva(I) klorür gerçekte <strong>Hg₂Cl₂</strong> olarak yazılır.
                    </div>
                  )}

                  {anion.id === 'CH3COO' && (
                    <div
                      style={{
                        marginTop: '8px',
                        padding: '6px 8px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(77, 171, 247, 0.10)',
                        borderLeft: '3px solid #4dabf7',
                        fontSize: '11.5px',
                        color: 'var(--text)'
                      }}
                    >
                      <strong>Gösterim Notu:</strong> Organik asit tuzu olan asetatlarda anyon başa da yazılabilir (örn. CH₃COONa, (CH₃COO)₂Ca).
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Katyon & Anyon Seçici Izgara */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '16px'
              }}
            >
              {/* Sol: Katyonlar */}
              <div
                style={{
                  backgroundColor: 'var(--card-2)',
                  border: '1px solid var(--border-2)',
                  borderRadius: '14px',
                  padding: '16px 18px',
                  display: 'grid',
                  gap: '14px',
                  alignContent: 'start'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, fontSize: '15px', color: '#4dabf7' }}>
                    1. Katyon Seç (+)
                  </h3>
                  <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                    Seçili: <strong style={{ color: '#fff' }}>{cation.disp}</strong>
                  </span>
                </div>

                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)', marginBottom: '8px' }}>
                    Sabit Değerlikliler (Romen Rakamı Yok)
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {fixedCations.map(c => {
                      const active = c.id === cationId;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setCationId(c.id)}
                          style={{
                            appearance: 'none',
                            padding: '6px 10px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            font: 'inherit',
                            fontSize: '13px',
                            fontWeight: 700,
                            border: active
                              ? '1.5px solid #4dabf7'
                              : '1px solid var(--border-2)',
                            backgroundColor: active
                              ? 'rgba(77, 171, 247, 0.2)'
                              : 'var(--card)',
                            color: active ? '#fff' : 'var(--text)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}
                        >
                          <span>{c.disp}</span>
                          <span style={{ fontSize: '11px', fontWeight: 500, color: active ? '#cce8ff' : 'var(--muted)' }}>
                            {c.baseName}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#ff922b', marginBottom: '8px' }}>
                    Değişken Değerlikliler (Romen Rakamlı)
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {variableCations.map(c => {
                      const active = c.id === cationId;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setCationId(c.id)}
                          style={{
                            appearance: 'none',
                            padding: '6px 10px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            font: 'inherit',
                            fontSize: '13px',
                            fontWeight: 700,
                            border: active
                              ? '1.5px solid #ff922b'
                              : '1px solid var(--border-2)',
                            backgroundColor: active
                              ? 'rgba(255, 146, 43, 0.2)'
                              : 'var(--card)',
                            color: active ? '#fff' : 'var(--text)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}
                        >
                          <span>{c.disp}</span>
                          <span style={{ fontSize: '11px', fontWeight: 500, color: active ? '#ffd8a8' : 'var(--muted)' }}>
                            {c.baseName}({c.roman})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Sağ: Anyonlar */}
              <div
                style={{
                  backgroundColor: 'var(--card-2)',
                  border: '1px solid var(--border-2)',
                  borderRadius: '14px',
                  padding: '16px 18px',
                  display: 'grid',
                  gap: '14px',
                  alignContent: 'start'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, fontSize: '15px', color: '#ff922b' }}>
                    2. Anyon Seç (−)
                  </h3>
                  <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                    Seçili: <strong style={{ color: '#fff' }}>{anion.disp}</strong> ({anion.name})
                  </span>
                </div>

                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)', marginBottom: '8px' }}>
                    Tek Atomlu Anyonlar
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {singleAnions.map(a => {
                      const active = a.id === anionId;
                      return (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() => setAnionId(a.id)}
                          style={{
                            appearance: 'none',
                            padding: '6px 10px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            font: 'inherit',
                            fontSize: '13px',
                            fontWeight: 700,
                            border: active
                              ? '1.5px solid #ff922b'
                              : '1px solid var(--border-2)',
                            backgroundColor: active
                              ? 'rgba(255, 146, 43, 0.2)'
                              : 'var(--card)',
                            color: active ? '#fff' : 'var(--text)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}
                        >
                          <span>{a.disp}</span>
                          <span style={{ fontSize: '11px', fontWeight: 500, color: active ? '#ffd8a8' : 'var(--muted)' }}>
                            {a.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#ffd43b', marginBottom: '8px' }}>
                    Çok Atomlu Kökler (Alt indis &gt; 1 ise Parantez)
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {polyAnions.map(a => {
                      const active = a.id === anionId;
                      return (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() => setAnionId(a.id)}
                          style={{
                            appearance: 'none',
                            padding: '6px 10px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            font: 'inherit',
                            fontSize: '13px',
                            fontWeight: 700,
                            border: active
                              ? '1.5px solid #ffd43b'
                              : '1px solid var(--border-2)',
                            backgroundColor: active
                              ? 'rgba(255, 212, 59, 0.18)'
                              : 'var(--card)',
                            color: active ? '#fff' : 'var(--text)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}
                        >
                          <span>{a.disp}</span>
                          <span style={{ fontSize: '11px', fontWeight: 500, color: active ? '#fff3bf' : 'var(--muted)' }}>
                            {a.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KOVALENT BİLEŞİKLER & LATİNCE ÖNEK ATÖLYESİ */}
        {activeTab === 'covalent' && (
          <div style={{ marginTop: '20px', display: 'grid', gap: '20px' }}>
            {/* Altın Kural Banner */}
            <div
              style={{
                padding: '14px 18px',
                borderRadius: '12px',
                backgroundColor: 'rgba(77, 171, 247, 0.10)',
                borderLeft: '4px solid #4dabf7',
                fontSize: '14px',
                lineHeight: 1.5,
                color: 'var(--text)'
              }}
            >
              <strong style={{ color: '#4dabf7' }}>📌 Kovalent Adlandırma Altın Kuralı:</strong>{' '}
              İlk elementin sayısı <strong>1 ise MONO kullanılmaz</strong>; 2. elementte{' '}
              <strong>1 bile olsa MONO yazılır!</strong>{' '}
              <span style={{ color: 'var(--muted)' }}>
                (Örn: CO → &quot;Monokarbon monoksit&quot; DEĞİL, <strong>Karbon monoksit</strong>)
              </span>
            </div>

            {/* Gerçek ÖSYM Kovalent Molekülleri Hızlı Seçim */}
            <div
              style={{
                backgroundColor: 'var(--card-2)',
                border: '1px solid var(--border-2)',
                borderRadius: '14px',
                padding: '16px 18px'
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--muted)', marginBottom: '10px' }}>
                🎯 Gerçek ÖSYM Kovalent Molekülleri (Tıkla &amp; İncele):
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {CURATED_COVALENT_MOLECULES.map(m => {
                  const isActive =
                    m.el1 === covEl1 &&
                    m.n1 === covN1 &&
                    m.el2 === covEl2 &&
                    m.n2 === covN2;
                  return (
                    <button
                      key={m.formulaAscii}
                      type="button"
                      onClick={() => {
                        setCovEl1(m.el1);
                        setCovN1(m.n1);
                        setCovEl2(m.el2);
                        setCovN2(m.n2);
                      }}
                      style={{
                        appearance: 'none',
                        padding: '7px 13px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        font: 'inherit',
                        fontSize: '14px',
                        fontWeight: 800,
                        border: isActive
                          ? '1.5px solid #4dabf7'
                          : '1px solid var(--border-2)',
                        backgroundColor: isActive
                          ? 'rgba(77, 171, 247, 0.22)'
                          : 'var(--card)',
                        color: isActive ? '#fff' : 'var(--text)'
                      }}
                    >
                      <FormulaText text={m.formulaAscii} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Etkileşimli Kovalent Kurucu + Adım Adım Sonuç */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
                gap: '16px'
              }}
            >
              {/* Sol: Ametal & Sayı Seçicileri */}
              <div
                style={{
                  backgroundColor: 'var(--card-2)',
                  border: '1px solid var(--border-2)',
                  borderRadius: '14px',
                  padding: '18px',
                  display: 'grid',
                  gap: '14px'
                }}
              >
                <h3 style={{ margin: 0, fontSize: '15px', color: '#4dabf7' }}>
                  Kendin Kur: Ametal &amp; Atom Sayısı Seç
                </h3>

                {/* 1. Ametal */}
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)', marginBottom: '6px' }}>
                    1. Ametal (Daha az elektronegatif / Kısmi +)
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                    {FIRST_NONMETALS.map(el => (
                      <button
                        key={el.symbol}
                        type="button"
                        onClick={() => setCovEl1(el.symbol)}
                        style={{
                          appearance: 'none',
                          padding: '6px 11px',
                          borderRadius: '9px',
                          cursor: 'pointer',
                          font: 'inherit',
                          fontSize: '13px',
                          fontWeight: 700,
                          border:
                            covEl1 === el.symbol
                              ? '1.5px solid #4dabf7'
                              : '1px solid var(--border-2)',
                          backgroundColor:
                            covEl1 === el.symbol
                              ? 'rgba(77, 171, 247, 0.2)'
                              : 'var(--card)',
                          color: covEl1 === el.symbol ? '#fff' : 'var(--text)'
                        }}
                      >
                        {el.symbol} ({el.name})
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--muted)', marginRight: '4px' }}>
                      1. Sayı:
                    </span>
                    {[1, 2, 3, 4, 5].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setCovN1(num)}
                        style={{
                          appearance: 'none',
                          width: '34px',
                          height: '32px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          font: 'inherit',
                          fontSize: '13px',
                          fontWeight: 800,
                          border:
                            covN1 === num
                              ? '1.5px solid #4dabf7'
                              : '1px solid var(--border-2)',
                          backgroundColor:
                            covN1 === num ? 'rgba(77, 171, 247, 0.2)' : 'var(--card)',
                          color: covN1 === num ? '#fff' : 'var(--muted)'
                        }}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Ametal */}
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)', marginBottom: '6px' }}>
                    2. Ametal (Daha elektronegatif / Kısmi −, &quot;-ür / oksit&quot;)
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                    {SECOND_NONMETALS.map(el => (
                      <button
                        key={el.symbol}
                        type="button"
                        onClick={() => setCovEl2(el.symbol)}
                        style={{
                          appearance: 'none',
                          padding: '6px 11px',
                          borderRadius: '9px',
                          cursor: 'pointer',
                          font: 'inherit',
                          fontSize: '13px',
                          fontWeight: 700,
                          border:
                            covEl2 === el.symbol
                              ? '1.5px solid #ff922b'
                              : '1px solid var(--border-2)',
                          backgroundColor:
                            covEl2 === el.symbol
                              ? 'rgba(255, 146, 43, 0.2)'
                              : 'var(--card)',
                          color: covEl2 === el.symbol ? '#fff' : 'var(--text)'
                        }}
                      >
                        {el.symbol} ({el.anionName})
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--muted)', marginRight: '4px' }}>
                      2. Sayı:
                    </span>
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setCovN2(num)}
                        style={{
                          appearance: 'none',
                          width: '34px',
                          height: '32px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          font: 'inherit',
                          fontSize: '13px',
                          fontWeight: 800,
                          border:
                            covN2 === num
                              ? '1.5px solid #ff922b'
                              : '1px solid var(--border-2)',
                          backgroundColor:
                            covN2 === num ? 'rgba(255, 146, 43, 0.2)' : 'var(--card)',
                          color: covN2 === num ? '#fff' : 'var(--muted)'
                        }}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sağ: Canlı Kovalent Sonuç & Adım Adım Kurulum */}
              <div
                style={{
                  backgroundColor: 'var(--card-2)',
                  border: '1px solid var(--border-2)',
                  borderRadius: '14px',
                  padding: '18px 20px',
                  display: 'grid',
                  gap: '14px',
                  alignContent: 'start'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>
                      Molekül Formülü
                    </div>
                    <div style={{ fontSize: '36px', fontWeight: 800, color: '#fff', lineHeight: 1.15 }}>
                      <FormulaText text={covalentResult.formulaAscii} />
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#4dabf7', textTransform: 'uppercase' }}>
                      IUPAC Sistematik Adı
                    </div>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: '#ffd43b', marginTop: '4px' }}>
                      {covalentResult.sameElement
                        ? 'Aynı ametal — element molekülü'
                        : covalentResult.naming.fullName}
                    </div>
                  </div>
                </div>

                {/* Adım adım adlandırma */}
                {!covalentResult.sameElement && (
                  <div
                    style={{
                      display: 'grid',
                      gap: '8px',
                      padding: '12px 14px',
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '10px',
                      fontSize: '13px'
                    }}
                  >
                    <div>
                      <strong style={{ color: '#4dabf7' }}>1. Parça ({covalentResult.naming.firstPart}):</strong>{' '}
                      <span style={{ color: 'var(--text)' }}>{covalentResult.naming.firstRule}</span>
                    </div>
                    <div>
                      <strong style={{ color: '#ff922b' }}>2. Parça ({covalentResult.naming.secondPart}):</strong>{' '}
                      <span style={{ color: 'var(--text)' }}>{covalentResult.naming.secondRule}</span>
                    </div>
                  </div>
                )}

                {/* Molekül Notu / Elektronegatiflik Uyarısı */}
                {covalentResult.sameElement ? (
                  <div
                    style={{
                      padding: '10px 12px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(229, 72, 77, 0.12)',
                      borderLeft: '3px solid #e5484d',
                      fontSize: '12.5px',
                      color: 'var(--text)'
                    }}
                  >
                    Aynı iki ametal atomu bileşik değil, element molekülü (O₂, Cl₂, S₈ gibi) oluşturur. Farklı iki ametal seçin.
                  </div>
                ) : covalentResult.wrongEnOrder ? (
                  <div
                    style={{
                      padding: '10px 12px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(245, 165, 36, 0.12)',
                      borderLeft: '3px solid #f5a524',
                      fontSize: '12.5px',
                      color: 'var(--text)'
                    }}
                  >
                    ⚠️ <strong>Elektronegatiflik Sırası Notu:</strong> {covalentResult.first.name} (EN=
                    {covalentResult.first.en}) &gt; {covalentResult.second.symbol} (EN=
                    {covalentResult.second.en}). Kovalent bileşiklerde daha elektronegatif olan element <strong>SONA</strong> yazılır. (Oksijen yalnızca Flor karşısında başa geçer → <strong>OF₂</strong>!).
                  </div>
                ) : covalentResult.curated ? (
                  <div
                    style={{
                      padding: '10px 12px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(48, 164, 108, 0.12)',
                      borderLeft: '3px solid #30a46c',
                      fontSize: '12.5px',
                      color: 'var(--text)'
                    }}
                  >
                    ✅ <strong>Gerçek ÖSYM Molekülü:</strong> {covalentResult.curated.note}
                  </div>
                ) : covalentResult.extraNote ? (
                  <div
                    style={{
                      padding: '10px 12px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(48, 164, 108, 0.12)',
                      borderLeft: '3px solid #30a46c',
                      fontSize: '12.5px',
                      color: 'var(--text)'
                    }}
                  >
                    ✅ {covalentResult.extraNote}
                  </div>
                ) : (
                  <div
                    style={{
                      padding: '10px 12px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      borderLeft: '3px solid var(--border-2)',
                      fontSize: '12.5px',
                      color: 'var(--muted)'
                    }}
                  >
                    ℹ️ Bu kombinasyon kuramsal bir kovalent adlandırma alıştırmasıdır. Gerçek sınav molekülleri için yukarıdaki 16 ÖSYM örneğini seçebilirsin.
                  </div>
                )}
              </div>
            </div>

            {/* 1-10 Latince Önekler Tablosu & Özel İstisnalar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '16px'
              }}
            >
              {/* 1-10 Latince Önekler */}
              <div
                style={{
                  backgroundColor: 'var(--card-2)',
                  border: '1px solid var(--border-2)',
                  borderRadius: '14px',
                  padding: '16px 18px'
                }}
              >
                <h3 style={{ margin: '0 0 8px', fontSize: '15px', color: '#fff' }}>
                  1–10 Latince Sayı Önekleri
                </h3>
                <table className="compound-table" style={{ marginTop: 0 }}>
                  <thead>
                    <tr>
                      <th>Sayı</th>
                      <th>Latince Önek</th>
                      <th>Örnek</th>
                    </tr>
                  </thead>
                  <tbody>
                    {LATIN_PREFIXES.map(item => (
                      <tr key={item.num}>
                        <td style={{ fontWeight: 800, color: '#4dabf7' }}>{item.num}</td>
                        <td style={{ fontWeight: 700, color: '#ffd43b' }}>{item.prefix}</td>
                        <td style={{ color: 'var(--muted)', fontSize: '13px' }}>{item.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Geleneksel Adı Öncelikli Kovalent İstisnalar */}
              <div
                style={{
                  backgroundColor: 'var(--card-2)',
                  border: '1px solid var(--border-2)',
                  borderRadius: '14px',
                  padding: '16px 18px',
                  display: 'grid',
                  gap: '12px',
                  alignContent: 'start'
                }}
              >
                <h3 style={{ margin: 0, fontSize: '15px', color: '#ffd43b' }}>
                  ⚠️ Yaygın Adı Öncelikli İstisnalar (NH₃, CH₄, H₂O)
                </h3>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)', lineHeight: 1.45 }}>
                  Bu üç kovalent molekül, Latince önekli sistematik adları yerine{' '}
                  <strong style={{ color: 'var(--text)' }}>geleneksel/IUPAC kabul görmüş özel adlarıyla</strong> sorulur:
                </p>

                <div style={{ display: 'grid', gap: '10px' }}>
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '17px', color: '#fff' }}>H₂O</strong>
                      <span style={{ fontWeight: 800, color: '#4dabf7' }}>Su</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '3px' }}>
                      Sistematik adı <em>dihidrojen monoksit</em> olsa da her zaman <strong>Su</strong> denir.
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '17px', color: '#fff' }}>NH₃</strong>
                      <span style={{ fontWeight: 800, color: '#ffd43b' }}>Amonyak</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '3px' }}>
                      Elektronegatifliği yüksek N başta yazıldığı için istisnadır; <em>&quot;trihidrojen mononitrür&quot;</em> kullanılmaz, <strong>Amonyak</strong> denir!
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '17px', color: '#fff' }}>CH₄</strong>
                      <span style={{ fontWeight: 800, color: '#51cf66' }}>Metan</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '3px' }}>
                      Organik alkan adlandırması gereği <em>karbon tetrahidrür</em> yerine <strong>Metan</strong> olarak adlandırılır.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alt Bilgi & CTA */}
        <div
          style={{
            marginTop: '24px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <span className="hint" style={{ fontSize: '13px' }}>
            Kapatmak için <strong>ESC</strong> tuşuna basabilirsin.
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginLeft: 'auto' }}>
            <button type="button" className="btn ghost small" onClick={onClose}>
              Kapat
            </button>
            <button
              type="button"
              className="btn secondary small"
              onClick={() =>
                onStartNamingQuiz(
                  activeTab === 'ionic' ? IONIC_NAMING_CATEGORIES : COVALENT_NAMING_CATEGORIES
                )
              }
              style={{ padding: '10px 14px', fontSize: '13.5px' }}
            >
              {activeTab === 'ionic'
                ? '⚡ Sadece İyonikleri Test Et (42)'
                : '🔗 Sadece Kovalentleri Test Et (16)'}
            </button>
            <button
              type="button"
              className="btn primary small"
              onClick={() => onStartNamingQuiz()}
              style={{ padding: '10px 18px', fontSize: '14px' }}
            >
              🎯 Bileşik Adlandırma Testini Başlat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
