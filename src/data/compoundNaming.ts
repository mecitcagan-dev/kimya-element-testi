import { StandardQuizItem, TopicCategoryOption } from '../types/topics';

export type CompoundNamingCategory =
  | 'Sabit Değerlikli İyonik'
  | 'Değişken Değerlikli (Romen Rakamlı)'
  | 'Çok Atomlu Kökler'
  | 'Kovalent Bileşikler (Latince Ekler)'
  | 'Asit & Baz Sistematik Adları';

export interface CompoundNamingItem {
  id: string;
  formula: string;            // ASCII formül (yazarak yanıtlama eşleşmesi için)
  disp: string;               // Unicode alt simgeli gösterim
  name: string;               // Sistematik IUPAC Türkçe adı
  synonyms: string[];         // Eş anlamlılar ve ASCII formül alternatifleri
  nameDistractors: string[];  // Formül -> Ad yönü için ÖSYM tuzak çeldiricileri
  formulaDistractors: string[]; // Ad -> Formül yönü için formül çeldiricileri
  category: CompoundNamingCategory;
  components: string;         // Oluşturan iyonlar veya element yapısı
  ruleNote: string;           // ÖSYM kural notu / yükseltgenme basamağı açıklaması
}

export const COMPOUND_NAMING_CATEGORIES: TopicCategoryOption[] = [
  { key: 'Sabit Değerlikli İyonik', rgb: '77,171,247' },
  { key: 'Değişken Değerlikli (Romen Rakamlı)', rgb: '255,146,43' },
  { key: 'Çok Atomlu Kökler', rgb: '255,212,59' },
  { key: 'Kovalent Bileşikler (Latince Ekler)', rgb: '56,217,217' },
  { key: 'Asit & Baz Sistematik Adları', rgb: '240,101,149' }
];

export const ALL_COMPOUND_NAMING_CATEGORIES: CompoundNamingCategory[] =
  COMPOUND_NAMING_CATEGORIES.map(c => c.key as CompoundNamingCategory);

export const IONIC_NAMING_CATEGORIES: CompoundNamingCategory[] = [
  'Sabit Değerlikli İyonik',
  'Değişken Değerlikli (Romen Rakamlı)',
  'Çok Atomlu Kökler'
];

export const COVALENT_NAMING_CATEGORIES: CompoundNamingCategory[] = [
  'Kovalent Bileşikler (Latince Ekler)'
];

export interface CompoundNamingPreset {
  id: string;
  label: string;
  shortDesc: string;
  categories: CompoundNamingCategory[];
}

export const COMPOUND_NAMING_PRESETS: CompoundNamingPreset[] = [
  {
    id: 'all',
    label: '🎲 Karışık (Tümü)',
    shortDesc: 'İyonik + Kovalent + Kök + Asit/Baz',
    categories: ALL_COMPOUND_NAMING_CATEGORIES
  },
  {
    id: 'ionic_all',
    label: '⚡ Sadece İyonikler (Tümü)',
    shortDesc: 'Sabit + Değişken + Çok Atomlu Kökler',
    categories: IONIC_NAMING_CATEGORIES
  },
  {
    id: 'ionic_basic',
    label: '🔹 Sadece Temel İyonlar',
    shortDesc: '1A/2A/3A + Zn/Ag (Romen rakamsız)',
    categories: ['Sabit Değerlikli İyonik']
  },
  {
    id: 'covalent_only',
    label: '🔗 Sadece Kovalent (Ametaller)',
    shortDesc: 'Mono, di, tri… ametal molekülleri',
    categories: COVALENT_NAMING_CATEGORIES
  },
  {
    id: 'ionic_without_roman',
    label: '🧩 Temel İyon + Kök İyonlar',
    shortDesc: 'Romen rakamları hariç tüm iyonikler',
    categories: ['Sabit Değerlikli İyonik', 'Çok Atomlu Kökler']
  },
  {
    id: 'covalent_and_ab',
    label: '🧪 Kovalent + Asit & Baz',
    shortDesc: 'Ametal bileşikleri ve asit-baz adları',
    categories: ['Kovalent Bileşikler (Latince Ekler)', 'Asit & Baz Sistematik Adları']
  }
];

export const COMPOUND_NAMING_CATEGORY_META: Record<
  CompoundNamingCategory,
  { shortLabel: string; icon: string; rgb: string }
> = {
  'Sabit Değerlikli İyonik': { shortLabel: 'Sabit İyonik', icon: '⚡', rgb: '77,171,247' },
  'Değişken Değerlikli (Romen Rakamlı)': { shortLabel: 'Romen Rakamlı İyonik', icon: '🔢', rgb: '255,146,43' },
  'Çok Atomlu Kökler': { shortLabel: 'Çok Atomlu Kökler', icon: '🧩', rgb: '255,212,59' },
  'Kovalent Bileşikler (Latince Ekler)': { shortLabel: 'Kovalent Ametaller', icon: '🔗', rgb: '56,217,217' },
  'Asit & Baz Sistematik Adları': { shortLabel: 'Asit & Bazlar', icon: '💧', rgb: '240,101,149' }
};

export const COMPOUND_NAMING_ITEMS: CompoundNamingItem[] = [
  // =========================================================================
  // 1. SABİT DEĞERLİKLİ İYONİK BİLEŞİKLER (14 madde)
  // =========================================================================
  {
    id: 'ionic-nacl',
    formula: 'NaCl',
    disp: 'NaCl',
    name: 'Sodyum klorür',
    synonyms: ['NaCl'],
    nameDistractors: ['Sodyum(I) klorür', 'Sodyum monoklorür', 'Sodyum klorat'],
    formulaDistractors: ['NaCl₂', 'Na₂Cl', 'NaClO'],
    category: 'Sabit Değerlikli İyonik',
    components: 'Na⁺ + Cl⁻',
    ruleNote: '1A grubu metali Na daima +1 alır; Romen rakamı ve Latince ek (mono-) kullanılmaz.'
  },
  {
    id: 'ionic-cao',
    formula: 'CaO',
    disp: 'CaO',
    name: 'Kalsiyum oksit',
    synonyms: ['CaO'],
    nameDistractors: ['Kalsiyum(II) oksit', 'Kalsiyum monoksit', 'Kalsiyum peroksit'],
    formulaDistractors: ['CaO₂', 'Ca₂O', 'Ca₂O₂'],
    category: 'Sabit Değerlikli İyonik',
    components: 'Ca²⁺ + O²⁻',
    ruleNote: '2A grubu metali Ca sabit +2 değerliklidir; yükler sadeleşerek CaO yazarız ve Romen rakamı koymayız.'
  },
  {
    id: 'ionic-mg3n2',
    formula: 'Mg3N2',
    disp: 'Mg₃N₂',
    name: 'Magnezyum nitrür',
    synonyms: ['Mg3N2', 'Mg₃N₂'],
    nameDistractors: ['Trimagnezyum dinitrür', 'Magnezyum(II) nitrür', 'Magnezyum nitrat'],
    formulaDistractors: ['Mg₂N₃', 'MgN', 'Mg(NO₃)₂'],
    category: 'Sabit Değerlikli İyonik',
    components: 'Mg²⁺ + N³⁻',
    ruleNote: 'İyonik bileşiklerde Latince sayı eki (tri-, di-) kullanılmaz; N³⁻ anyonu "nitrür" olarak okunur.'
  },
  {
    id: 'ionic-al2s3',
    formula: 'Al2S3',
    disp: 'Al₂S₃',
    name: 'Alüminyum sülfür',
    synonyms: ['Al2S3', 'Al₂S₃'],
    nameDistractors: ['Dialüminyum trisülfür', 'Alüminyum(III) sülfür', 'Alüminyum sülfat'],
    formulaDistractors: ['Al₃S₂', 'AlS', 'Al₂(SO₄)₃'],
    category: 'Sabit Değerlikli İyonik',
    components: 'Al³⁺ + S²⁻',
    ruleNote: 'Al sabit +3 değerlikli metaldir; S²⁻ iyonu "sülfür", SO₄²⁻ ise "sülfat"tır. Karıştırılmamalıdır.'
  },
  {
    id: 'ionic-k3p',
    formula: 'K3P',
    disp: 'K₃P',
    name: 'Potasyum fosfür',
    synonyms: ['K3P', 'K₃P'],
    nameDistractors: ['Tripotasyum fosfür', 'Potasyum fosfat', 'Potasyum(I) fosfür'],
    formulaDistractors: ['KP₃', 'K₂P', 'K₃PO₄'],
    category: 'Sabit Değerlikli İyonik',
    components: 'K⁺ + P³⁻',
    ruleNote: '5A grubundaki P³⁻ tek atomlu anyonu "fosfür" olarak adlandırılır; PO₄³⁻ (fosfat) ile karıştırma.'
  },
  {
    id: 'ionic-cah2',
    formula: 'CaH2',
    disp: 'CaH₂',
    name: 'Kalsiyum hidrür',
    synonyms: ['CaH2', 'CaH₂'],
    nameDistractors: ['Kalsiyum dihidrür', 'Kalsiyum(II) hidrür', 'Kalsiyum hidroksit'],
    formulaDistractors: ['CaH', 'Ca₂H', 'Ca(OH)₂'],
    category: 'Sabit Değerlikli İyonik',
    components: 'Ca²⁺ + H⁻',
    ruleNote: 'Hidrojen metallerle yaptığı iyonik bileşiklerde -1 yük alır ve "hidrür" olarak okunur.'
  },
  {
    id: 'ionic-al4c3',
    formula: 'Al4C3',
    disp: 'Al₄C₃',
    name: 'Alüminyum karbür',
    synonyms: ['Al4C3', 'Al₄C₃'],
    nameDistractors: ['Tetraalüminyum trikarbür', 'Alüminyum(III) karbür', 'Alüminyum karbonat'],
    formulaDistractors: ['Al₃C₄', 'AlC', 'Al₂(CO₃)₃'],
    category: 'Sabit Değerlikli İyonik',
    components: 'Al³⁺ + C⁴⁻',
    ruleNote: 'C⁴⁻ anyonu "karbür" adını alır; Al³⁺ ve C⁴⁻ çaprazlandığında Al₄C₃ oluşur.'
  },
  {
    id: 'ionic-al2o3',
    formula: 'Al2O3',
    disp: 'Al₂O₃',
    name: 'Alüminyum oksit',
    synonyms: ['Al2O3', 'Al₂O₃'],
    nameDistractors: ['Dialüminyum trioksit', 'Alüminyum(III) oksit', 'Alüminyum hidroksit'],
    formulaDistractors: ['AlO', 'Al₃O₂', 'AlO₃'],
    category: 'Sabit Değerlikli İyonik',
    components: 'Al³⁺ + O²⁻',
    ruleNote: 'Al (3A) sabit +3 değerlikli metal olduğu için Romen rakamı ve Latince ön ek kullanılmaz.'
  },
  {
    id: 'ionic-na2o',
    formula: 'Na2O',
    disp: 'Na₂O',
    name: 'Sodyum oksit',
    synonyms: ['Na2O', 'Na₂O'],
    nameDistractors: ['Disodyum monoksit', 'Sodyum(I) oksit', 'Sodyum peroksit'],
    formulaDistractors: ['NaO', 'NaO₂', 'Na₂O₂'],
    category: 'Sabit Değerlikli İyonik',
    components: 'Na⁺ + O²⁻',
    ruleNote: 'Na⁺ ve O²⁻ iyonlarından oluşan bazik oksittir; Na₂O₂ (sodyum peroksit) ile karıştırılmamalıdır.'
  },
  {
    id: 'ionic-mgf2',
    formula: 'MgF2',
    disp: 'MgF₂',
    name: 'Magnezyum florür',
    synonyms: ['MgF2', 'MgF₂'],
    nameDistractors: ['Magnezyum diflorür', 'Magnezyum(II) florür', 'Magnezyum florat'],
    formulaDistractors: ['MgF', 'Mg₂F', 'Mg₂F₃'],
    category: 'Sabit Değerlikli İyonik',
    components: 'Mg²⁺ + F⁻',
    ruleNote: 'İyonik bileşiklerde halojen sayısı için "di-" eki kullanılmaz; doğrudan "Magnezyum florür" denir.'
  },
  {
    id: 'ionic-zncl2',
    formula: 'ZnCl2',
    disp: 'ZnCl₂',
    name: 'Çinko klorür',
    synonyms: ['ZnCl2', 'ZnCl₂'],
    nameDistractors: ['Çinko(II) klorür', 'Çinko diklorür', 'Çinko(I) klorür'],
    formulaDistractors: ['ZnCl', 'Zn₂Cl', 'ZnCl₃'],
    category: 'Sabit Değerlikli İyonik',
    components: 'Zn²⁺ + Cl⁻',
    ruleNote: 'ÖSYM TUZAĞI: Çinko (Zn) B grubu geçiş metali olmasına rağmen daima +2 değerlik alır; Romen rakamı YAZILMAZ!'
  },
  {
    id: 'ionic-ag2s',
    formula: 'Ag2S',
    disp: 'Ag₂S',
    name: 'Gümüş sülfür',
    synonyms: ['Ag2S', 'Ag₂S'],
    nameDistractors: ['Gümüş(I) sülfür', 'Digümüş sülfür', 'Gümüş sülfat'],
    formulaDistractors: ['AgS', 'AgS₂', 'Ag₂SO₄'],
    category: 'Sabit Değerlikli İyonik',
    components: 'Ag⁺ + S²⁻',
    ruleNote: 'ÖSYM TUZAĞI: Gümüş (Ag) geçiş metali olsa da bileşiklerinde yalnızca +1 alır; "Gümüş(I)" denmez!'
  },
  {
    id: 'ionic-li3n',
    formula: 'Li3N',
    disp: 'Li₃N',
    name: 'Lityum nitrür',
    synonyms: ['Li3N', 'Li₃N'],
    nameDistractors: ['Trilityum nitrür', 'Lityum(I) nitrür', 'Lityum nitrit'],
    formulaDistractors: ['LiN₃', 'LiN', 'LiNO₂'],
    category: 'Sabit Değerlikli İyonik',
    components: 'Li⁺ + N³⁻',
    ruleNote: '1A grubu metali Li (+1) ile N³⁻ (nitrür) iyonunun oluşturduğu iyonik bileşiktir.'
  },
  {
    id: 'ionic-nah',
    formula: 'NaH',
    disp: 'NaH',
    name: 'Sodyum hidrür',
    synonyms: ['NaH'],
    nameDistractors: ['Sodyum monohidrür', 'Sodyum hidroksit', 'Sodyum(I) hidrür'],
    formulaDistractors: ['NaH₂', 'Na₂H', 'NaOH'],
    category: 'Sabit Değerlikli İyonik',
    components: 'Na⁺ + H⁻',
    ruleNote: 'Aktif metal Na (+1) karşısında H atomu -1 yükseltgenme basamağı (hidrür) alır.'
  },

  // =========================================================================
  // 2. DEĞİŞKEN DEĞERLİKLİ (ROMEN RAKAMLI) BİLEŞİKLER (14 madde)
  // =========================================================================
  {
    id: 'var-fecl2',
    formula: 'FeCl2',
    disp: 'FeCl₂',
    name: 'Demir(II) klorür',
    synonyms: ['FeCl2', 'FeCl₂', 'Demir (II) klorür'],
    nameDistractors: ['Demir klorür', 'Demir diklorür', 'Demir(III) klorür'],
    formulaDistractors: ['FeCl₃', 'Fe₂Cl', 'FeCl'],
    category: 'Değişken Değerlikli (Romen Rakamlı)',
    components: 'Fe²⁺ + 2 Cl⁻',
    ruleNote: 'Cl⁻ = -1 olduğundan toplam 2×(-1) = -2 yükü dengelemek için Fe +2 değerliklidir -> Demir(II).'
  },
  {
    id: 'var-fecl3',
    formula: 'FeCl3',
    disp: 'FeCl₃',
    name: 'Demir(III) klorür',
    synonyms: ['FeCl3', 'FeCl₃', 'Demir (III) klorür'],
    nameDistractors: ['Demir klorür', 'Demir triklorür', 'Demir(II) klorür'],
    formulaDistractors: ['FeCl₂', 'Fe₃Cl', 'FeCl'],
    category: 'Değişken Değerlikli (Romen Rakamlı)',
    components: 'Fe³⁺ + 3 Cl⁻',
    ruleNote: '3 Cl⁻ (-3) ile nötrleşen Fe iyonu +3 yüklüdür; Romen rakamı olmadan "Demir klorür" yazmak yanlıştır.'
  },
  {
    id: 'var-feo',
    formula: 'FeO',
    disp: 'FeO',
    name: 'Demir(II) oksit',
    synonyms: ['FeO', 'Demir (II) oksit'],
    nameDistractors: ['Demir oksit', 'Demir monoksit', 'Demir(I) oksit'],
    formulaDistractors: ['Fe₂O₃', 'Fe₂O', 'FeO₂'],
    category: 'Değişken Değerlikli (Romen Rakamlı)',
    components: 'Fe²⁺ + O²⁻',
    ruleNote: 'KLASİK TUZAK: Formülde alt indis 1 olsa da O²⁻ (-2) yükünü dengeleyen Fe burada +2 değerliklidir (I değildir!).'
  },
  {
    id: 'var-fe2o3',
    formula: 'Fe2O3',
    disp: 'Fe₂O₃',
    name: 'Demir(III) oksit',
    synonyms: ['Fe2O3', 'Fe₂O₃', 'Demir (III) oksit'],
    nameDistractors: ['Demir oksit', 'Didemir trioksit', 'Demir(II) oksit'],
    formulaDistractors: ['FeO', 'Fe₃O₂', 'FeO₃'],
    category: 'Değişken Değerlikli (Romen Rakamlı)',
    components: '2 Fe³⁺ + 3 O²⁻',
    ruleNote: '3 O²⁻ = -6 yükü 2 Fe atomu paylaştığı için her Fe +3 değerliklidir -> Demir(III) oksit.'
  },
  {
    id: 'var-cu2o',
    formula: 'Cu2O',
    disp: 'Cu₂O',
    name: 'Bakır(I) oksit',
    synonyms: ['Cu2O', 'Cu₂O', 'Bakır (I) oksit'],
    nameDistractors: ['Bakır(II) oksit', 'Dibakır monoksit', 'Bakır oksit'],
    formulaDistractors: ['CuO', 'CuO₂', 'Cu₂O₃'],
    category: 'Değişken Değerlikli (Romen Rakamlı)',
    components: '2 Cu⁺ + O²⁻',
    ruleNote: 'O²⁻ (-2) yükünü 2 Cu atomu dengelediğinden her Cu +1 değerliklidir -> Bakır(I) oksit.'
  },
  {
    id: 'var-cuo',
    formula: 'CuO',
    disp: 'CuO',
    name: 'Bakır(II) oksit',
    synonyms: ['CuO', 'Bakır (II) oksit'],
    nameDistractors: ['Bakır(I) oksit', 'Bakır oksit', 'Bakır monoksit'],
    formulaDistractors: ['Cu₂O', 'CuO₂', 'Cu₂O₃'],
    category: 'Değişken Değerlikli (Romen Rakamlı)',
    components: 'Cu²⁺ + O²⁻',
    ruleNote: 'Oksijen -2 aldığı için birebir birleşmede bakırın yükü +2 dir -> Bakır(II) oksit.'
  },
  {
    id: 'var-hg2cl2',
    formula: 'Hg2Cl2',
    disp: 'Hg₂Cl₂',
    name: 'Cıva(I) klorür',
    synonyms: ['Hg2Cl2', 'Hg₂Cl₂', 'Cıva (I) klorür', 'Civa(I) klorür'],
    nameDistractors: ['Cıva(II) klorür', 'Dicıva diklorür', 'Cıva klorür'],
    formulaDistractors: ['HgCl₂', 'HgCl', 'Hg₂Cl'],
    category: 'Değişken Değerlikli (Romen Rakamlı)',
    components: 'Hg₂²⁺ + 2 Cl⁻',
    ruleNote: 'ÖSYM FAVORİSİ: Cıva(I) katyonu doğada dimerik Hg₂²⁺ halindedir; 2 Cl⁻ (-2) yükünü 2 Hg (+1/+1) dengeler.'
  },
  {
    id: 'var-hgcl2',
    formula: 'HgCl2',
    disp: 'HgCl₂',
    name: 'Cıva(II) klorür',
    synonyms: ['HgCl2', 'HgCl₂', 'Cıva (II) klorür', 'Civa(II) klorür'],
    nameDistractors: ['Cıva(I) klorür', 'Cıva diklorür', 'Cıva klorür'],
    formulaDistractors: ['Hg₂Cl₂', 'HgCl', 'Hg₂Cl'],
    category: 'Değişken Değerlikli (Romen Rakamlı)',
    components: 'Hg²⁺ + 2 Cl⁻',
    ruleNote: 'Tek Hg atomu 2 Cl⁻ anyonunu dengelediği için cıvanın değerliği +2 dir -> Cıva(II) klorür.'
  },
  {
    id: 'var-sncl4',
    formula: 'SnCl4',
    disp: 'SnCl₄',
    name: 'Kalay(IV) klorür',
    synonyms: ['SnCl4', 'SnCl₄', 'Kalay (IV) klorür'],
    nameDistractors: ['Kalay tetraklorür', 'Kalay(II) klorür', 'Kalay klorür'],
    formulaDistractors: ['SnCl₂', 'Sn₄Cl', 'SnCl₃'],
    category: 'Değişken Değerlikli (Romen Rakamlı)',
    components: 'Sn⁴⁺ + 4 Cl⁻',
    ruleNote: 'Kalay (+2, +4) değişken değerliklidir; 4 Cl⁻ (-4) karşısında Sn +4 alır -> Kalay(IV) klorür.'
  },
  {
    id: 'var-sno',
    formula: 'SnO',
    disp: 'SnO',
    name: 'Kalay(II) oksit',
    synonyms: ['SnO', 'Kalay (II) oksit'],
    nameDistractors: ['Kalay oksit', 'Kalay(IV) oksit', 'Kalay(I) oksit'],
    formulaDistractors: ['SnO₂', 'Sn₂O', 'Sn₂O₃'],
    category: 'Değişken Değerlikli (Romen Rakamlı)',
    components: 'Sn²⁺ + O²⁻',
    ruleNote: 'O²⁻ yükünü dengeleyen kalay +2 değerliklidir; SnO₂ (Kalay(IV) oksit) ile karıştırılmamalıdır.'
  },
  {
    id: 'var-pbo2',
    formula: 'PbO2',
    disp: 'PbO₂',
    name: 'Kurşun(IV) oksit',
    synonyms: ['PbO2', 'PbO₂', 'Kurşun (IV) oksit'],
    nameDistractors: ['Kurşun dioksit', 'Kurşun(II) oksit', 'Kurşun(II) dioksit'],
    formulaDistractors: ['PbO', 'Pb₂O', 'PbO₄'],
    category: 'Değişken Değerlikli (Romen Rakamlı)',
    components: 'Pb⁴⁺ + 2 O²⁻',
    ruleNote: 'SÜPER TUZAK: Formülde O₂ görülmesi Kurşun(II) anlamına gelmez! 2×(-2) = -4 -> Kurşun +4 değerliklidir.'
  },
  {
    id: 'var-pbcl2',
    formula: 'PbCl2',
    disp: 'PbCl₂',
    name: 'Kurşun(II) klorür',
    synonyms: ['PbCl2', 'PbCl₂', 'Kurşun (II) klorür'],
    nameDistractors: ['Kurşun klorür', 'Kurşun diklorür', 'Kurşun(IV) klorür'],
    formulaDistractors: ['PbCl₄', 'Pb₂Cl', 'PbCl'],
    category: 'Değişken Değerlikli (Romen Rakamlı)',
    components: 'Pb²⁺ + 2 Cl⁻',
    ruleNote: 'Kurşun (+2, +4) değişken değerlikli olduğu için 2 Cl⁻ ile yaptığı tuz "Kurşun(II) klorür"dür.'
  },
  {
    id: 'var-mno2',
    formula: 'MnO2',
    disp: 'MnO₂',
    name: 'Mangan(IV) oksit',
    synonyms: ['MnO2', 'MnO₂', 'Mangan (IV) oksit'],
    nameDistractors: ['Mangan dioksit', 'Mangan(II) oksit', 'Mangan(VII) oksit'],
    formulaDistractors: ['MnO', 'Mn₂O', 'Mn₂O₇'],
    category: 'Değişken Değerlikli (Romen Rakamlı)',
    components: 'Mn⁴⁺ + 2 O²⁻',
    ruleNote: 'İyonik metal oksididir; 2 O²⁻ (-4) nedeniyle Mn +4 alır. Sistematik adı "Mangan(IV) oksit"tir.'
  },
  {
    id: 'var-cr2o3',
    formula: 'Cr2O3',
    disp: 'Cr₂O₃',
    name: 'Krom(III) oksit',
    synonyms: ['Cr2O3', 'Cr₂O₃', 'Krom (III) oksit'],
    nameDistractors: ['Dikrom trioksit', 'Krom oksit', 'Krom(VI) oksit'],
    formulaDistractors: ['CrO', 'CrO₃', 'Cr₃O₂'],
    category: 'Değişken Değerlikli (Romen Rakamlı)',
    components: '2 Cr³⁺ + 3 O²⁻',
    ruleNote: '3 O²⁻ (-6) yükünü 2 krom iyonu paylaşır; Cr = +3 değerlikli olduğundan Krom(III) oksit denir.'
  },

  // =========================================================================
  // 3. ÇOK ATOMLU KÖKLER İÇEREN BİLEŞİKLER (14 madde)
  // =========================================================================
  {
    id: 'poly-nh4-2so4',
    formula: '(NH4)2SO4',
    disp: '(NH₄)₂SO₄',
    name: 'Amonyum sülfat',
    synonyms: ['(NH4)2SO4', '(NH₄)₂SO₄'],
    nameDistractors: ['Diamonyum sülfat', 'Amonyum sülfür', 'Amonyum sülfit'],
    formulaDistractors: ['NH₄SO₄', '(NH₄)₂SO₃', '(NH₄)₂S'],
    category: 'Çok Atomlu Kökler',
    components: '2 NH₄⁺ + SO₄²⁻',
    ruleNote: 'Hiç metal içermemesine rağmen NH₄⁺ katyonu ve SO₄²⁻ anyonu arasındaki bağ iyoniktir.'
  },
  {
    id: 'poly-ca-no3-2',
    formula: 'Ca(NO3)2',
    disp: 'Ca(NO₃)₂',
    name: 'Kalsiyum nitrat',
    synonyms: ['Ca(NO3)2', 'Ca(NO₃)₂'],
    nameDistractors: ['Kalsiyum dinitrat', 'Kalsiyum(II) nitrat', 'Kalsiyum nitrit'],
    formulaDistractors: ['CaNO₃', 'Ca(NO₂)₂', 'Ca₃N₂'],
    category: 'Çok Atomlu Kökler',
    components: 'Ca²⁺ + 2 NO₃⁻',
    ruleNote: 'Ca sabit +2 değerliklidir; kök sayısını belirten "di-" eki kullanılmaz. NO₃⁻ "nitrat", NO₂⁻ "nitrit"tir.'
  },
  {
    id: 'poly-na2co3',
    formula: 'Na2CO3',
    disp: 'Na₂CO₃',
    name: 'Sodyum karbonat',
    synonyms: ['Na2CO3', 'Na₂CO₃', 'Çamaşır sodası'],
    nameDistractors: ['Disodyum karbonat', 'Sodyum bikarbonat', 'Sodyum karbür'],
    formulaDistractors: ['NaCO₃', 'NaHCO₃', 'Na₂C'],
    category: 'Çok Atomlu Kökler',
    components: '2 Na⁺ + CO₃²⁻',
    ruleNote: 'CO₃²⁻ kökü "karbonat", HCO₃⁻ kökü ise "bikarbonat"tır. Yaygın adı çamaşır sodasıdır.'
  },
  {
    id: 'poly-kmno4',
    formula: 'KMnO4',
    disp: 'KMnO₄',
    name: 'Potasyum permanganat',
    synonyms: ['KMnO4', 'KMnO₄'],
    nameDistractors: ['Potasyum manganat', 'Potasyum manganez oksit', 'Potasyum(I) permanganat'],
    formulaDistractors: ['K₂MnO₄', 'KMnO₃', 'K₂MnO₃'],
    category: 'Çok Atomlu Kökler',
    components: 'K⁺ + MnO₄⁻',
    ruleNote: 'MnO₄⁻ kökü "permanganat"tır (Mn +7); MnO₄²⁻ "manganat" ile karıştırılmamalıdır.'
  },
  {
    id: 'poly-k2cr2o7',
    formula: 'K2Cr2O7',
    disp: 'K₂Cr₂O₇',
    name: 'Potasyum dikromat',
    synonyms: ['K2Cr2O7', 'K₂Cr₂O₇'],
    nameDistractors: ['Potasyum kromat', 'Dipotasyum dikromat', 'Potasyum krom(VI) oksit'],
    formulaDistractors: ['K₂CrO₄', 'KCr₂O₇', 'KCrO₄'],
    category: 'Çok Atomlu Kökler',
    components: '2 K⁺ + Cr₂O₇²⁻',
    ruleNote: 'Cr₂O₇²⁻ kökü "dikromat", CrO₄²⁻ kökü ise "kromat"tır; ikisi de -2 yüklüdür.'
  },
  {
    id: 'poly-al2-so4-3',
    formula: 'Al2(SO4)3',
    disp: 'Al₂(SO₄)₃',
    name: 'Alüminyum sülfat',
    synonyms: ['Al2(SO4)3', 'Al₂(SO₄)₃'],
    nameDistractors: ['Alüminyum(III) sülfat', 'Alüminyum sülfit', 'Alüminyum sülfür'],
    formulaDistractors: ['AlSO₄', 'Al₃(SO₄)₂', 'Al₂(SO₃)₃'],
    category: 'Çok Atomlu Kökler',
    components: '2 Al³⁺ + 3 SO₄²⁻',
    ruleNote: 'Al³⁺ ve SO₄²⁻ çaprazlandığında Al₂(SO₄)₃ elde edilir; Al sabit +3 olduğu için Romen rakamı konmaz.'
  },
  {
    id: 'poly-fe-oh-3',
    formula: 'Fe(OH)3',
    disp: 'Fe(OH)₃',
    name: 'Demir(III) hidroksit',
    synonyms: ['Fe(OH)3', 'Fe(OH)₃', 'Demir (III) hidroksit'],
    nameDistractors: ['Demir hidroksit', 'Demir trihidroksit', 'Demir(II) hidroksit'],
    formulaDistractors: ['Fe(OH)₂', 'FeOH', 'Fe₃OH'],
    category: 'Çok Atomlu Kökler',
    components: 'Fe³⁺ + 3 OH⁻',
    ruleNote: 'OH⁻ (-1) yüklüdür; 3 adet OH⁻ ile nötrleşen demir +3 değerlikli olduğundan "Demir(III) hidroksit" denir.'
  },
  {
    id: 'poly-cuso4',
    formula: 'CuSO4',
    disp: 'CuSO₄',
    name: 'Bakır(II) sülfat',
    synonyms: ['CuSO4', 'CuSO₄', 'Bakır (II) sülfat', 'Göztaşı'],
    nameDistractors: ['Bakır sülfat', 'Bakır(I) sülfat', 'Bakır(II) sülfit'],
    formulaDistractors: ['Cu₂SO₄', 'CuSO₃', 'Cu(SO₄)₂'],
    category: 'Çok Atomlu Kökler',
    components: 'Cu²⁺ + SO₄²⁻',
    ruleNote: 'SO₄²⁻ (-2) yükünü tek bakır iyonu dengelediğinden Cu +2 yüklüdür -> Bakır(II) sülfat (Göztaşı).'
  },
  {
    id: 'poly-nh4no3',
    formula: 'NH4NO3',
    disp: 'NH₄NO₃',
    name: 'Amonyum nitrat',
    synonyms: ['NH4NO3', 'NH₄NO₃'],
    nameDistractors: ['Amonyum nitrit', 'Azot tetrahidrür nitrat', 'Amonyak nitrat'],
    formulaDistractors: ['NH₄NO₂', '(NH₄)₂NO₃', 'NH₃NO₃'],
    category: 'Çok Atomlu Kökler',
    components: 'NH₄⁺ + NO₃⁻',
    ruleNote: 'İki çok atomlu kökün (NH₄⁺ ve NO₃⁻) birebir birleşmesiyle oluşan iyonik bir tuzdur.'
  },
  {
    id: 'poly-ba-oh-2',
    formula: 'Ba(OH)2',
    disp: 'Ba(OH)₂',
    name: 'Baryum hidroksit',
    synonyms: ['Ba(OH)2', 'Ba(OH)₂'],
    nameDistractors: ['Baryum dihidroksit', 'Baryum(II) hidroksit', 'Baryum hidrür'],
    formulaDistractors: ['BaOH', 'Ba₂OH', 'BaH₂'],
    category: 'Çok Atomlu Kökler',
    components: 'Ba²⁺ + 2 OH⁻',
    ruleNote: '2A grubu metali Ba sabit +2 değerliklidir; Romen rakamı ve Latince ek olmadan okunur.'
  },
  {
    id: 'poly-nh4cl',
    formula: 'NH4Cl',
    disp: 'NH₄Cl',
    name: 'Amonyum klorür',
    synonyms: ['NH4Cl', 'NH₄Cl', 'Nişadır'],
    nameDistractors: ['Amonyak klorür', 'Amonyum klorat', 'Azot tetrahidrojen klorür'],
    formulaDistractors: ['NH₃Cl', '(NH₄)₂Cl', 'NH₄ClO₃'],
    category: 'Çok Atomlu Kökler',
    components: 'NH₄⁺ + Cl⁻',
    ruleNote: 'Metal içermeyen iyonik katı (Nişadır) örneğidir; NH₄⁺ ile Cl⁻ arasında iyonik bağ vardır.'
  },
  {
    id: 'poly-ca3-po4-2',
    formula: 'Ca3(PO4)2',
    disp: 'Ca₃(PO₄)₂',
    name: 'Kalsiyum fosfat',
    synonyms: ['Ca3(PO4)2', 'Ca₃(PO₄)₂'],
    nameDistractors: ['Trikalsiyum difosfat', 'Kalsiyum(II) fosfat', 'Kalsiyum fosfit'],
    formulaDistractors: ['CaPO₄', 'Ca₂(PO₄)₃', 'Ca₃(PO₃)₂'],
    category: 'Çok Atomlu Kökler',
    components: '3 Ca²⁺ + 2 PO₄³⁻',
    ruleNote: 'Ca²⁺ ve PO₄³⁻ iyonlarının çaprazlanmasıyla Ca₃(PO₄)₂ oluşur; kemik ve diş yapısında bulunur.'
  },
  {
    id: 'poly-nahco3',
    formula: 'NaHCO3',
    disp: 'NaHCO₃',
    name: 'Sodyum bikarbonat',
    synonyms: ['NaHCO3', 'NaHCO₃', 'Sodyum hidrojen karbonat', 'Yemek sodası'],
    nameDistractors: ['Sodyum karbonat', 'Sodyum hidrojen karbür', 'Sodyum monohidrojen karbonat'],
    formulaDistractors: ['Na₂CO₃', 'Na₂HCO₃', 'NaH₂CO₃'],
    category: 'Çok Atomlu Kökler',
    components: 'Na⁺ + HCO₃⁻',
    ruleNote: 'HCO₃⁻ anyonunun adı "bikarbonat" veya "hidrojen karbonat"tır; yaygın adı yemek sodasıdır.'
  },
  {
    id: 'poly-kcn',
    formula: 'KCN',
    disp: 'KCN',
    name: 'Potasyum siyanür',
    synonyms: ['KCN'],
    nameDistractors: ['Potasyum karbon nitrür', 'Potasyum tiyosiyanat', 'Potasyum(I) siyanür'],
    formulaDistractors: ['K₂CN', 'KSCN', 'K(CN)₂'],
    category: 'Çok Atomlu Kökler',
    components: 'K⁺ + CN⁻',
    ruleNote: 'CN⁻ tek değerlikli çok atomlu anyon olup "siyanür" şeklinde adlandırılır.'
  },

  // =========================================================================
  // 4. KOVALENT BİLEŞİKLER - LATİNCE SAYI EKLERİ (16 madde)
  // =========================================================================
  {
    id: 'cov-co',
    formula: 'CO',
    disp: 'CO',
    name: 'Karbon monoksit',
    synonyms: ['CO'],
    nameDistractors: ['Monokarbon monoksit', 'Karbon oksit', 'Karbon dioksit'],
    formulaDistractors: ['CO₂', 'C₂O', 'CO₃'],
    category: 'Kovalent Bileşikler (Latince Ekler)',
    components: '1 C + 1 O (Ametal-Ametal)',
    ruleNote: 'İlk ametal 1 tane ise "mono-" yazılmaz; ikinci ametal 1 tane olduğunda "monoksit" yazılır.'
  },
  {
    id: 'cov-co2',
    formula: 'CO2',
    disp: 'CO₂',
    name: 'Karbon dioksit',
    synonyms: ['CO2', 'CO₂'],
    nameDistractors: ['Monokarbon dioksit', 'Karbon oksit', 'Karbon(IV) oksit'],
    formulaDistractors: ['CO', 'C₂O', 'CO₃'],
    category: 'Kovalent Bileşikler (Latince Ekler)',
    components: '1 C + 2 O (Ametal-Ametal)',
    ruleNote: 'ÖSYM TUZAĞI: İlk elementin sayısı 1 ise başına kesinlikle "mono-" getirilmez!'
  },
  {
    id: 'cov-no',
    formula: 'NO',
    disp: 'NO',
    name: 'Azot monoksit',
    synonyms: ['NO'],
    nameDistractors: ['Monoazot monoksit', 'Azot oksit', 'Azot(II) oksit'],
    formulaDistractors: ['N₂O', 'NO₂', 'N₂O₃'],
    category: 'Kovalent Bileşikler (Latince Ekler)',
    components: '1 N + 1 O (Ametal-Ametal)',
    ruleNote: 'Ametal-ametal kovalent bileşiklerinde Romen rakamı yerine Latince sayı ekleri kullanılır.'
  },
  {
    id: 'cov-n2o',
    formula: 'N2O',
    disp: 'N₂O',
    name: 'Diazot monoksit',
    synonyms: ['N2O', 'N₂O'],
    nameDistractors: ['Diazot oksit', 'Azot monoksit', 'Azot(I) oksit'],
    formulaDistractors: ['NO₂', 'NO', 'N₂O₂'],
    category: 'Kovalent Bileşikler (Latince Ekler)',
    components: '2 N + 1 O (Ametal-Ametal)',
    ruleNote: 'İlk ametal sayısı 1 den büyükse (2) "di-" eki alır; ikinci element 1 ise "mono-" unutulmaz.'
  },
  {
    id: 'cov-no2',
    formula: 'NO2',
    disp: 'NO₂',
    name: 'Azot dioksit',
    synonyms: ['NO2', 'NO₂'],
    nameDistractors: ['Monoazot dioksit', 'Azot(IV) oksit', 'Diazot oksit'],
    formulaDistractors: ['N₂O', 'N₂O₄', 'NO'],
    category: 'Kovalent Bileşikler (Latince Ekler)',
    components: '1 N + 2 O (Ametal-Ametal)',
    ruleNote: '1 Azot (ön ek yok) + 2 Oksijen (dioksit) -> Azot dioksit (asidik oksit).'
  },
  {
    id: 'cov-n2o3',
    formula: 'N2O3',
    disp: 'N₂O₃',
    name: 'Diazot trioksit',
    synonyms: ['N2O3', 'N₂O₃'],
    nameDistractors: ['Azot trioksit', 'Diazot(III) oksit', 'Triazot dioksit'],
    formulaDistractors: ['N₃O₂', 'NO₃', 'N₂O₅'],
    category: 'Kovalent Bileşikler (Latince Ekler)',
    components: '2 N + 3 O (Ametal-Ametal)',
    ruleNote: '2 = di-, 3 = tri- Latince ekleriyle "Diazot trioksit" biçiminde okunur.'
  },
  {
    id: 'cov-n2o4',
    formula: 'N2O4',
    disp: 'N₂O₄',
    name: 'Diazot tetraoksit',
    synonyms: ['N2O4', 'N₂O₄', 'Diazot tetroksit'],
    nameDistractors: ['Azot dioksit', 'Diazot pentaoksit', 'Tetraazot dioksit'],
    formulaDistractors: ['N₄O₂', 'NO₂', 'N₂O₅'],
    category: 'Kovalent Bileşikler (Latince Ekler)',
    components: '2 N + 4 O (Ametal-Ametal)',
    ruleNote: 'Moleküler kovalent bileşiklerde formül sadeleştirilmez! N₂O₄ doğrudan "Diazot tetraoksit"tir.'
  },
  {
    id: 'cov-n2o5',
    formula: 'N2O5',
    disp: 'N₂O₅',
    name: 'Diazot pentaoksit',
    synonyms: ['N2O5', 'N₂O₅', 'Diazot pentoksit'],
    nameDistractors: ['Azot pentaoksit', 'Diazot(V) oksit', 'Pentaazot dioksit'],
    formulaDistractors: ['N₅O₂', 'NO₅', 'N₂O₃'],
    category: 'Kovalent Bileşikler (Latince Ekler)',
    components: '2 N + 5 O (Ametal-Ametal)',
    ruleNote: '2 = di-, 5 = penta- ekleri kullanılır. Asidik oksittir ve suyla HNO₃ oluşturur.'
  },
  {
    id: 'cov-pcl3',
    formula: 'PCl3',
    disp: 'PCl₃',
    name: 'Fosfor triklorür',
    synonyms: ['PCl3', 'PCl₃'],
    nameDistractors: ['Monofosfor triklorür', 'Fosfor(III) klorür', 'Fosfor klorür'],
    formulaDistractors: ['PCl₅', 'P₃Cl', 'PCl'],
    category: 'Kovalent Bileşikler (Latince Ekler)',
    components: '1 P + 3 Cl (Ametal-Ametal)',
    ruleNote: 'Fosfor ve klor ametaldir; kovalent bileşikte Romen rakamı yerine "tri-" eki kullanılır.'
  },
  {
    id: 'cov-pcl5',
    formula: 'PCl5',
    disp: 'PCl₅',
    name: 'Fosfor pentaklorür',
    synonyms: ['PCl5', 'PCl₅'],
    nameDistractors: ['Monofosfor pentaklorür', 'Fosfor(V) klorür', 'Fosfor hekzaklorür'],
    formulaDistractors: ['PCl₃', 'P₅Cl', 'PCl₆'],
    category: 'Kovalent Bileşikler (Latince Ekler)',
    components: '1 P + 5 Cl (Ametal-Ametal)',
    ruleNote: '5 klor atomu için "penta-" ön eki getirilir ve anyon kökü "-ür" ekiyle biter.'
  },
  {
    id: 'cov-sf6',
    formula: 'SF6',
    disp: 'SF₆',
    name: 'Kükürt hekzaflorür',
    synonyms: ['SF6', 'SF₆'],
    nameDistractors: ['Monokükürt hekzaflorür', 'Kükürt heptaflorür', 'Kükürt(VI) florür'],
    formulaDistractors: ['SF₄', 'SF₇', 'S₆F'],
    category: 'Kovalent Bileşikler (Latince Ekler)',
    components: '1 S + 6 F (Ametal-Ametal)',
    ruleNote: '6 = hekza-, 7 = hepta- ekleri karıştırılmamalıdır; SF₆ "Kükürt hekzaflorür"dür.'
  },
  {
    id: 'cov-ccl4',
    formula: 'CCl4',
    disp: 'CCl₄',
    name: 'Karbon tetraklorür',
    synonyms: ['CCl4', 'CCl₄', 'Tetraklorometan'],
    nameDistractors: ['Monokarbon tetraklorür', 'Karbon klorür', 'Karbon(IV) klorür'],
    formulaDistractors: ['CCl₂', 'C₄Cl', 'CHCl₃'],
    category: 'Kovalent Bileşikler (Latince Ekler)',
    components: '1 C + 4 Cl (Ametal-Ametal)',
    ruleNote: '4 = tetra- eki alır. Apolar yapılı kovalent bileşiktir.'
  },
  {
    id: 'cov-cs2',
    formula: 'CS2',
    disp: 'CS₂',
    name: 'Karbon disülfür',
    synonyms: ['CS2', 'CS₂'],
    nameDistractors: ['Monokarbon disülfür', 'Karbon sülfat', 'Karbon(IV) sülfür'],
    formulaDistractors: ['CS', 'C₂S', 'C(SO₄)₂'],
    category: 'Kovalent Bileşikler (Latince Ekler)',
    components: '1 C + 2 S (Ametal-Ametal)',
    ruleNote: 'Kükürt ikinci element (daha elektronegatif) olduğunda "-ür" ekiyle "sülfür" okunur.'
  },
  {
    id: 'cov-of2',
    formula: 'OF2',
    disp: 'OF₂',
    name: 'Oksijen diflorür',
    synonyms: ['OF2', 'OF₂'],
    nameDistractors: ['Oksijen florür', 'Diflor monoksit', 'Oksijen(II) florür'],
    formulaDistractors: ['F₂O', 'O₂F', 'OF'],
    category: 'Kovalent Bileşikler (Latince Ekler)',
    components: '1 O (+2) + 2 F (-1)',
    ruleNote: 'ÖSYM KLASİĞİ: Flor oksijenden daha elektronegatif (-1) olduğu için önce oksijen (+2), sonra "diflorür" yazılır!'
  },
  {
    id: 'cov-so3',
    formula: 'SO3',
    disp: 'SO₃',
    name: 'Kükürt trioksit',
    synonyms: ['SO3', 'SO₃'],
    nameDistractors: ['Monokükürt trioksit', 'Sülfit', 'Kükürt(VI) oksit'],
    formulaDistractors: ['SO₂', 'S₂O₃', 'SO₄'],
    category: 'Kovalent Bileşikler (Latince Ekler)',
    components: '1 S + 3 O (Ametal-Ametal)',
    ruleNote: 'SO₃ yüksüz bir bileşiktir (Kükürt trioksit); SO₃²⁻ ise -2 yüklü "sülfit" iyonudur!'
  },
  {
    id: 'cov-so2',
    formula: 'SO2',
    disp: 'SO₂',
    name: 'Kükürt dioksit',
    synonyms: ['SO2', 'SO₂'],
    nameDistractors: ['Monokükürt dioksit', 'Kükürt(IV) oksit', 'Kükürt oksit'],
    formulaDistractors: ['SO₃', 'S₂O', 'SO'],
    category: 'Kovalent Bileşikler (Latince Ekler)',
    components: '1 S + 2 O (Ametal-Ametal)',
    ruleNote: '1 kükürt + 2 oksijen -> "Kükürt dioksit". Asit yağmurlarına yol açan asidik oksittir.'
  },

  // =========================================================================
  // 5. ASİT & BAZ SİSTEMATİK ADLARI (11 madde)
  // =========================================================================
  {
    id: 'ab-hcl',
    formula: 'HCl',
    disp: 'HCl',
    name: 'Hidrojen klorür',
    synonyms: ['HCl', 'Hidroklorik asit', 'Hidrojen klorür / Hidroklorik asit', 'Tuz ruhu'],
    nameDistractors: ['Hidrojen klorat', 'Klorik asit', 'Monohidrojen monoklorür'],
    formulaDistractors: ['HClO', 'HClO₃', 'H₂Cl'],
    category: 'Asit & Baz Sistematik Adları',
    components: 'H⁺ + Cl⁻ (Gaz: Hidrojen klorür / Suda: Hidroklorik asit)',
    ruleNote: 'Saf gaz halinde "Hidrojen klorür", sulu çözeltisinde "Hidroklorik asit" (Tuz ruhu) olarak adlandırılır.'
  },
  {
    id: 'ab-hf',
    formula: 'HF',
    disp: 'HF',
    name: 'Hidrojen florür',
    synonyms: ['HF', 'Hidroflorik asit', 'Cam asidi'],
    nameDistractors: ['Hidrojen florat', 'Florik asit', 'Hidrojen monoflorür'],
    formulaDistractors: ['HF₂', 'H₂F', 'HFO'],
    category: 'Asit & Baz Sistematik Adları',
    components: 'H⁺ + F⁻ (Zayıf asit, camı aşındırır)',
    ruleNote: 'Gazı "Hidrojen florür", sulu çözeltisi "Hidroflorik asit"tir; SiO₂ camını aşındıran tek asittir.'
  },
  {
    id: 'ab-hbr',
    formula: 'HBr',
    disp: 'HBr',
    name: 'Hidrojen bromür',
    synonyms: ['HBr', 'Hidrobromik asit'],
    nameDistractors: ['Hidrojen bromat', 'Bromik asit', 'Monohidrojen bromür'],
    formulaDistractors: ['HBrO₃', 'HBrO', 'H₂Br'],
    category: 'Asit & Baz Sistematik Adları',
    components: 'H⁺ + Br⁻ (Kuvvetli halojen asidi)',
    ruleNote: 'Oksijensiz ikili asitler sulu çözeltide "hidro-...-ik asit" (Hidrobromik asit) adını alır.'
  },
  {
    id: 'ab-h2so4',
    formula: 'H2SO4',
    disp: 'H₂SO₄',
    name: 'Sülfürik asit',
    synonyms: ['H2SO4', 'H₂SO₄', 'Dihidrojen sülfat', 'Zaç yağı'],
    nameDistractors: ['Sülfüröz asit', 'Hidrosülfürik asit', 'Hidrojen sülfür'],
    formulaDistractors: ['H₂SO₃', 'H₂S', 'HSO₄'],
    category: 'Asit & Baz Sistematik Adları',
    components: '2 H⁺ + SO₄²⁻ (Sülfat kökü)',
    ruleNote: 'SO₄²⁻ (sülfat) kökünden türeyen oksiasittir: "-at" son eki "-ik asit"e dönüşür -> Sülfürik asit.'
  },
  {
    id: 'ab-hno3',
    formula: 'HNO3',
    disp: 'HNO₃',
    name: 'Nitrik asit',
    synonyms: ['HNO3', 'HNO₃', 'Hidrojen nitrat', 'Kezzap'],
    nameDistractors: ['Nitröz asit', 'Hidronitrik asit', 'Hidrojen nitrür'],
    formulaDistractors: ['HNO₂', 'H₂NO₃', 'NH₃'],
    category: 'Asit & Baz Sistematik Adları',
    components: 'H⁺ + NO₃⁻ (Nitrat kökü)',
    ruleNote: 'NO₃⁻ (nitrat) kökünden türediği için "Nitrik asit"tir; HNO₂ (nitrit köklü) "Nitröz asit"tir.'
  },
  {
    id: 'ab-h3po4',
    formula: 'H3PO4',
    disp: 'H₃PO₄',
    name: 'Fosforik asit',
    synonyms: ['H3PO4', 'H₃PO₄', 'Trihidrojen fosfat', 'Ortofosforik asit'],
    nameDistractors: ['Fosforöz asit', 'Hidrofosforik asit', 'Hidrojen fosfür'],
    formulaDistractors: ['H₃PO₃', 'HPO₄', 'H₂PO₄'],
    category: 'Asit & Baz Sistematik Adları',
    components: '3 H⁺ + PO₄³⁻ (Fosfat kökü)',
    ruleNote: 'PO₄³⁻ (fosfat) kökünü 3 H⁺ dengeler; zayıf ama 3 değerli (tesir değerliği 3) bir asittir.'
  },
  {
    id: 'ab-h2co3',
    formula: 'H2CO3',
    disp: 'H₂CO₃',
    name: 'Karbonik asit',
    synonyms: ['H2CO3', 'H₂CO₃', 'Dihidrojen karbonat'],
    nameDistractors: ['Karboksilik asit', 'Hidrokarbonik asit', 'Hidrojen karbür'],
    formulaDistractors: ['HCO₃', 'H₂CO₂', 'CH₃COOH'],
    category: 'Asit & Baz Sistematik Adları',
    components: '2 H⁺ + CO₃²⁻ (Karbonat kökü)',
    ruleNote: 'CO₂ + H₂O tepkimesiyle oluşan zayıf asittir; CO₃²⁻ (karbonat) kökünden türediği için "Karbonik asit"tir.'
  },
  {
    id: 'ab-ch3cooh',
    formula: 'CH3COOH',
    disp: 'CH₃COOH',
    name: 'Asetik asit',
    synonyms: ['CH3COOH', 'CH₃COOH', 'Etanoik asit', 'Sirke asidi', 'Sirke ruhu'],
    nameDistractors: ['Formik asit', 'Metanoik asit', 'Propanoik asit'],
    formulaDistractors: ['HCOOH', 'CH₃OH', 'C₂H₅COOH'],
    category: 'Asit & Baz Sistematik Adları',
    components: 'CH₃COO⁻ + H⁺ (Zayıf organik asit)',
    ruleNote: '2 karbonlu karboksilik asittir (Etanoik asit); suda kısmen iyonlaşır ve tesir değerliği 1 dir.'
  },
  {
    id: 'ab-naoh',
    formula: 'NaOH',
    disp: 'NaOH',
    name: 'Sodyum hidroksit',
    synonyms: ['NaOH', 'Sud kostik'],
    nameDistractors: ['Sodyum(I) hidroksit', 'Sodyum hidrür', 'Sodyum oksihidrür'],
    formulaDistractors: ['Na(OH)₂', 'NaH', 'Na₂O'],
    category: 'Asit & Baz Sistematik Adları',
    components: 'Na⁺ + OH⁻ (Kuvvetli baz)',
    ruleNote: 'Na⁺ (1A) + OH⁻ (hidroksit) -> Sodyum hidroksit. Yaygın adı "Sud kostik"tir.'
  },
  {
    id: 'ab-koh',
    formula: 'KOH',
    disp: 'KOH',
    name: 'Potasyum hidroksit',
    synonyms: ['KOH', 'Potas kostik'],
    nameDistractors: ['Potasyum(I) hidroksit', 'Potasyum hidrür', 'Potasyum oksit'],
    formulaDistractors: ['K(OH)₂', 'KH', 'K₂O'],
    category: 'Asit & Baz Sistematik Adları',
    components: 'K⁺ + OH⁻ (Kuvvetli baz)',
    ruleNote: 'K⁺ + OH⁻ -> Potasyum hidroksit. Yaygın adı "Potas kostik" olup arap sabunu yapımında kullanılır.'
  },
  {
    id: 'ab-ca-oh-2',
    formula: 'Ca(OH)2',
    disp: 'Ca(OH)₂',
    name: 'Kalsiyum hidroksit',
    synonyms: ['Ca(OH)2', 'Ca(OH)₂', 'Sönmüş kireç'],
    nameDistractors: ['Kalsiyum dihidroksit', 'Kalsiyum(II) hidroksit', 'Kalsiyum hidrür'],
    formulaDistractors: ['CaOH', 'CaO', 'CaH₂'],
    category: 'Asit & Baz Sistematik Adları',
    components: 'Ca²⁺ + 2 OH⁻ (Kuvvetli baz)',
    ruleNote: 'Ca sabit +2 değerliklidir; Romen rakamı ve "di-" kullanılmaz. Yaygın adı "Sönmüş kireç"tir.'
  }
];

export function compoundNamingToQuizItem(
  item: CompoundNamingItem,
  dir: 'form-name' | 'name-form' = 'form-name'
): StandardQuizItem {
  const isFormToName = dir === 'form-name';

  return {
    id: item.id,
    prompt: isFormToName ? item.disp : item.name,
    promptSub: isFormToName
      ? `${item.category} · Sistematik IUPAC adını bulun`
      : `${item.category} · Kimyasal formülünü bulun`,
    answer: isFormToName ? item.name : item.disp,
    distractors: isFormToName ? item.nameDistractors : item.formulaDistractors,
    synonyms: isFormToName
      ? item.synonyms.filter(s => s !== item.formula && s !== item.disp)
      : [item.formula, item.disp],
    category: item.category,
    infoChips: [
      { label: 'Formül', value: item.disp },
      { label: 'Sistematik Ad', value: item.name },
      { label: 'Yapı / İyonlar', value: item.components },
      { label: 'Kategori', value: item.category }
    ],
    hint: item.ruleNote
  };
}

export const COMPOUND_NAMING_CATEGORY_COUNTS: Record<CompoundNamingCategory, number> =
  COMPOUND_NAMING_ITEMS.reduce(
    (acc, item) => {
      acc[item.category] = (acc[item.category] ?? 0) + 1;
      return acc;
    },
    {
      'Sabit Değerlikli İyonik': 0,
      'Değişken Değerlikli (Romen Rakamlı)': 0,
      'Çok Atomlu Kökler': 0,
      'Kovalent Bileşikler (Latince Ekler)': 0,
      'Asit & Baz Sistematik Adları': 0
    } as Record<CompoundNamingCategory, number>
  );

export function getFilteredCompoundNamingItems(
  categories?: CompoundNamingCategory[]
): CompoundNamingItem[] {
  if (!categories || categories.length === 0) {
    return COMPOUND_NAMING_ITEMS;
  }
  const allowed = new Set(categories);
  const filtered = COMPOUND_NAMING_ITEMS.filter(item => allowed.has(item.category));
  return filtered.length > 0 ? filtered : COMPOUND_NAMING_ITEMS;
}

export function normalizeNamingCategories(
  categories: CompoundNamingCategory[]
): CompoundNamingCategory[] {
  const allowed = new Set(categories);
  const ordered = ALL_COMPOUND_NAMING_CATEGORIES.filter(cat => allowed.has(cat));
  return ordered.length > 0 ? ordered : ALL_COMPOUND_NAMING_CATEGORIES;
}

export function matchNamingPreset(
  selected: CompoundNamingCategory[]
): CompoundNamingPreset | null {
  const norm = normalizeNamingCategories(selected);
  for (const preset of COMPOUND_NAMING_PRESETS) {
    if (
      preset.categories.length === norm.length &&
      preset.categories.every((c, idx) => norm[idx] === c)
    ) {
      return preset;
    }
  }
  return null;
}

export function getCompoundNamingCountChoices(poolCount: number): [number, number, number] {
  return poolCount <= 16 ? [5, 10, poolCount] : [10, 20, poolCount];
}
