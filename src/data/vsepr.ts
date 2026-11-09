export interface VseprItem {
  id: string;
  formula: string;
  name: string;
  vsepr: 'AX2' | 'AX3' | 'AX2E' | 'AX4' | 'AX3E' | 'AX2E2';
  geometry: 'Doğrusal' | 'Düzlem Üçgen' | 'Kırık Doğru (Açısal)' | 'Düzgün Dörtyüzlü' | 'Üçgen Piramit';
  hybridization: 'sp' | 'sp2' | 'sp3';
  bondAngle: string;
  polarity: 'Apolar Molekül' | 'Polar Molekül';
  examHighlight: string;
}

export const VSEPR_MOLECULES: VseprItem[] = [
  {
    id: 'beh2',
    formula: 'BeH2',
    name: 'Berilyum Hidrür',
    vsepr: 'AX2',
    geometry: 'Doğrusal',
    hybridization: 'sp',
    bondAngle: '180°',
    polarity: 'Apolar Molekül',
    examHighlight: 'Merkez atom Berilyum (Be) 2A grubundadır, oktet boşluğu vardır (4 elektronda kalır).'
  },
  {
    id: 'co2',
    formula: 'CO2',
    name: 'Karbondioksit',
    vsepr: 'AX2',
    geometry: 'Doğrusal',
    hybridization: 'sp',
    bondAngle: '180°',
    polarity: 'Apolar Molekül',
    examHighlight: 'Çift bağlar VSEPR de tek bir doğrultu (X) sayılır. Bağları polar kovalent ama molekül simetriden apolardır.'
  },
  {
    id: 'hcn',
    formula: 'HCN',
    name: 'Hidrojen Siyanür',
    vsepr: 'AX2',
    geometry: 'Doğrusal',
    hybridization: 'sp',
    bondAngle: '180°',
    polarity: 'Polar Molekül',
    examHighlight: 'C atomu sp hibriti yapar. Doğrusal olmasına rağmen iki uç farklı atom (H ve N) olduğundan POLAR bir moleküldür.'
  },
  {
    id: 'c2h2',
    formula: 'C2H2',
    name: 'Asetilen (Etin)',
    vsepr: 'AX2',
    geometry: 'Doğrusal',
    hybridization: 'sp',
    bondAngle: '180°',
    polarity: 'Apolar Molekül',
    examHighlight: 'Her bir karbon atomu 2 doğrultuya sahip olduğundan AX2 gösterimine ve sp hibritleşmesine sahiptir.'
  },
  {
    id: 'bh3',
    formula: 'BH3 / BF3',
    name: 'Bor Hidrür / Bor Triflorür',
    vsepr: 'AX3',
    geometry: 'Düzlem Üçgen',
    hybridization: 'sp2',
    bondAngle: '120°',
    polarity: 'Apolar Molekül',
    examHighlight: 'Bor (3A) oktet boşluğuna sahiptir (6 e-). Simetrik çekimle net dipol sıfırdır, molekül apolardır.'
  },
  {
    id: 'so3',
    formula: 'SO3',
    name: 'Kükürt Trioksit',
    vsepr: 'AX3',
    geometry: 'Düzlem Üçgen',
    hybridization: 'sp2',
    bondAngle: '120°',
    polarity: 'Apolar Molekül',
    examHighlight: 'Merkez S atomunda serbest elektron çifti kalmadığı için düzlem üçgen ve apolar moleküldür.'
  },
  {
    id: 'hcho',
    formula: 'HCHO',
    name: 'Formaldehit (Metanal)',
    vsepr: 'AX3',
    geometry: 'Düzlem Üçgen',
    hybridization: 'sp2',
    bondAngle: '~120°',
    polarity: 'Polar Molekül',
    examHighlight: 'Karbonil karbonu sp2 hibritleşmesi yapar. Geometrisi düzlem üçgendir fakat Oksijen nedeniyle POLARDIR.'
  },
  {
    id: 'c2h4',
    formula: 'C2H4',
    name: 'Etilen (Eten)',
    vsepr: 'AX3',
    geometry: 'Düzlem Üçgen',
    hybridization: 'sp2',
    bondAngle: '120°',
    polarity: 'Apolar Molekül',
    examHighlight: 'Her bir karbon atomu 3 doğrultuya sahiptir (2 tekli C-H, 1 ikili C=C) $\\to$ AX3, sp2 hibritleşmesi.'
  },
  {
    id: 'so2',
    formula: 'SO2',
    name: 'Kükürt Dioksit',
    vsepr: 'AX2E',
    geometry: 'Kırık Doğru (Açısal)',
    hybridization: 'sp2',
    bondAngle: '<120° (~119°)',
    polarity: 'Polar Molekül',
    examHighlight: 'ÖSYM TUZAĞI: H2O ile ikisi de kırık doğrudur ancak SO2 de S atomu sp2 hibriti yapar ve bağ açısı ~119° dir!'
  },
  {
    id: 'ch4',
    formula: 'CH4',
    name: 'Metan',
    vsepr: 'AX4',
    geometry: 'Düzgün Dörtyüzlü',
    hybridization: 'sp3',
    bondAngle: '109.5°',
    polarity: 'Apolar Molekül',
    examHighlight: '4 özdeş C-H bağı 109.5° açıyla tetrahedron oluşturur. Kusursuz simetri molekülü apolar yapar.'
  },
  {
    id: 'ccl4',
    formula: 'CCl4',
    name: 'Karbon Tetraklorür',
    vsepr: 'AX4',
    geometry: 'Düzgün Dörtyüzlü',
    hybridization: 'sp3',
    bondAngle: '109.5°',
    polarity: 'Apolar Molekül',
    examHighlight: 'C-Cl bağları çok polardır ancak 4 klorun zıt yönlü çekimi birbirini sıfırladığından molekül APOLARDIR.'
  },
  {
    id: 'ch3cl',
    formula: 'CH3Cl',
    name: 'Klorometan',
    vsepr: 'AX4',
    geometry: 'Düzgün Dörtyüzlü',
    hybridization: 'sp3',
    bondAngle: '~109.5°',
    polarity: 'Polar Molekül',
    examHighlight: 'AX4 yapısındadır fakat bağlı atomlardan biri farklı (Cl) olduğundan simetri bozulur ve molekül POLAR olur.'
  },
  {
    id: 'nh3',
    formula: 'NH3',
    name: 'Amonyak',
    vsepr: 'AX3E',
    geometry: 'Üçgen Piramit',
    hybridization: 'sp3',
    bondAngle: '107.3° (~107°)',
    polarity: 'Polar Molekül',
    examHighlight: 'N üzerindeki 1 ortaklanmamış e- çifti bağları aşağı iterek açıyı 109.5° den 107.3° ye düşürür. Molekül polardır.'
  },
  {
    id: 'nf3',
    formula: 'NF3',
    name: 'Azot Triflorür',
    vsepr: 'AX3E',
    geometry: 'Üçgen Piramit',
    hybridization: 'sp3',
    bondAngle: '~102° (<107°)',
    polarity: 'Polar Molekül',
    examHighlight: 'NH3 ile aynı VSEPR (AX3E) yapısındadır; üçgen piramit geometrili polar bir moleküldür.'
  },
  {
    id: 'h2o',
    formula: 'H2O',
    name: 'Su',
    vsepr: 'AX2E2',
    geometry: 'Kırık Doğru (Açısal)',
    hybridization: 'sp3',
    bondAngle: '104.5° (~105°)',
    polarity: 'Polar Molekül',
    examHighlight: 'Oksijen üzerindeki 2 serbest e- çifti bağları şiddetle iter $\\to$ açı 104.5° ye iner. sp3 hibritleşmesi yapar.'
  },
  {
    id: 'of2',
    formula: 'OF2',
    name: 'Oksijen Diflorür',
    vsepr: 'AX2E2',
    geometry: 'Kırık Doğru (Açısal)',
    hybridization: 'sp3',
    bondAngle: '~103°',
    polarity: 'Polar Molekül',
    examHighlight: 'H2O ile aynı geometriye (kırık doğru, sp3, AX2E2) sahiptir. Oksijenin +2 yükseltgenme basamağı aldığı tek bileşiktir.'
  }
];
