export interface SolidItem {
  id: string;
  name: string;
  formula: string;
  solidType: 'İyonik Katı' | 'Moleküler Katı' | 'Kovalent Katı' | 'Metalik Katı' | 'Amorf Katı';
  bonding: string;
  conductivity: string;
  meltingPoint: string;
  examHighlight: string;
}

export const SOLIDS: SolidItem[] = [
  {
    id: 'kuru-buz',
    name: 'Kuru Buz',
    formula: 'CO2(k)',
    solidType: 'Moleküler Katı',
    bonding: 'London Kuvvetleri',
    conductivity: 'İletmez',
    meltingPoint: 'Düşük (-78.5°C süblimleşir)',
    examHighlight: 'Kovalent katı DEĞİLDİR! Karbondioksit molekülleri arasında zayıf London çekimi olan moleküler katıdır.'
  },
  {
    id: 'elmas',
    name: 'Elmas',
    formula: 'C(k)',
    solidType: 'Kovalent Katı',
    bonding: '3 Boyutlu Kovalent Ağ (sp3)',
    conductivity: 'İletmez (Isıyı çok iyi iletir)',
    meltingPoint: 'Aşırı yüksek (>3500°C)',
    examHighlight: 'Doğadaki en sert doğal maddedir. Düzgün dörtyüzlü kovalent ağ örgüsü içerir.'
  },
  {
    id: 'grafit',
    name: 'Grafit',
    formula: 'C(k)',
    solidType: 'Kovalent Katı',
    bonding: 'Tabakalı Kovalent Ağ (sp2) + London',
    conductivity: 'Katı halde elektriği iletir!',
    meltingPoint: 'Aşırı yüksek (>3600°C)',
    examHighlight: 'ÖSYM KLASİĞİ: Kovalent katı olmasına rağmen delokalize pi elektronları sayesinde katı halde elektriği iletir.'
  },
  {
    id: 'kuvars',
    name: 'Kuvars (Kuvars Kumu)',
    formula: 'SiO2',
    solidType: 'Kovalent Katı',
    bonding: '3 Boyutlu Kovalent Ağ (Si-O)',
    conductivity: 'İletmez',
    meltingPoint: 'Çok yüksek (~1700°C)',
    examHighlight: 'CO2 moleküler katı iken SiO2 kovalent ağ örgülü katıdır.'
  },
  {
    id: 'yemek-tuzu',
    name: 'Yemek Tuzu',
    formula: 'NaCl',
    solidType: 'İyonik Katı',
    bonding: 'İyonik Bağ (Elektrostatik çekim)',
    conductivity: 'Katı halde iletmez; sıvı ve suda iletir',
    meltingPoint: 'Yüksek (801°C)',
    examHighlight: 'Katı halde iyonlar sabittir, eriyik veya sulu çözeltisinde hareketli iyonlarla iletir.'
  },
  {
    id: 'nisadir',
    name: 'Nişadır',
    formula: 'NH4Cl',
    solidType: 'İyonik Katı',
    bonding: 'İyonik Bağ (NH4+ ve Cl-)',
    conductivity: 'Katı halde iletmez; suda iletir',
    meltingPoint: 'Yüksek (338°C süblimleşir)',
    examHighlight: 'HİÇ METAL İÇERMEMESİNE rağmen amonyum katyonu içerdiği için İYONİK katıdır.'
  },
  {
    id: 'buz',
    name: 'Su Buzu',
    formula: 'H2O(k)',
    solidType: 'Moleküler Katı',
    bonding: 'Hidrojen Bağı ve Dipol-dipol',
    conductivity: 'İletmez',
    meltingPoint: '0°C',
    examHighlight: 'Molekülleri bir arada tutan kuvvet hidrojen bağıdır. Erirken zayıf hidrojen bağları kopar.'
  },
  {
    id: 'iyot',
    name: 'İyot Kristali',
    formula: 'I2(k)',
    solidType: 'Moleküler Katı',
    bonding: 'London Kuvvetleri',
    conductivity: 'İletmez',
    meltingPoint: 'Düşük (113.7°C, süblimleşir)',
    examHighlight: 'Apolar kovalent bağlı I2 moleküllerinin London kuvvetleriyle oluşturduğu moleküler katıdır.'
  },
  {
    id: 'naftalin',
    name: 'Naftalin',
    formula: 'C10H8',
    solidType: 'Moleküler Katı',
    bonding: 'London Kuvvetleri',
    conductivity: 'İletmez',
    meltingPoint: 'Düşük (80°C, süblimleşir)',
    examHighlight: 'Apolar moleküler katıdır, kolayca süblimleşir, kokusu oda sıcaklığında yayılır.'
  },
  {
    id: 'seker',
    name: 'Çay Şekeri (Sakkaroz)',
    formula: 'C12H22O11',
    solidType: 'Moleküler Katı',
    bonding: 'Hidrojen Bağı ve Dipol-dipol',
    conductivity: 'İletmez (Suda çözünse de iletmez)',
    meltingPoint: 'Düşük (186°C bozunarak erir)',
    examHighlight: 'Suda moleküler çözünür, ne katısı ne sulu çözeltisi elektrik akımını iletmez.'
  },
  {
    id: 'cam',
    name: 'Cam',
    formula: 'Amorf Silikat',
    solidType: 'Amorf Katı',
    bonding: 'Düzensiz Kovalent Ağ',
    conductivity: 'İletmez',
    meltingPoint: 'Sabit erime noktası YOKTUR (Camsı geçiş)',
    examHighlight: 'Belirli bir geometrik kristal yapısı ve erime noktası yoktur; ısıtıldığında yumuşar.'
  },
  {
    id: 'plastik-mum',
    name: 'Parafin (Mum) / Plastik',
    formula: 'CnH2n+2',
    solidType: 'Amorf Katı',
    bonding: 'Düzensiz Polimer/Hidrokarbon zincirleri',
    conductivity: 'İletmez',
    meltingPoint: 'Sabit erime noktası yoktur',
    examHighlight: 'Amorf katı örneğidir. Camsı geçiş sıcaklığı aralığında yumuşayıp viskoz sıvı haline gelir.'
  },
  {
    id: 'demir',
    name: 'Demir',
    formula: 'Fe(k)',
    solidType: 'Metalik Katı',
    bonding: 'Metalik Bağ (Elektron denizi)',
    conductivity: 'Hem katı hem sıvı halde çok iyi iletir',
    meltingPoint: 'Yüksek (1538°C)',
    examHighlight: 'Elektron denizi sayesinde tel ve levha haline gelebilir (işlenebilir), kırılgan değildir.'
  },
  {
    id: 'bakir',
    name: 'Bakır',
    formula: 'Cu(k)',
    solidType: 'Metalik Katı',
    bonding: 'Metalik Bağ',
    conductivity: 'Hem katı hem sıvı halde mükemmel iletir',
    meltingPoint: 'Yüksek (1085°C)',
    examHighlight: 'Elektriği elektron hareketiyle fiziksel olarak iletir; sıcaklık arttıkça iletkenliği azalır.'
  },
  {
    id: 'silisyum-karbur',
    name: 'Silisyum Karbür (Karborundum)',
    formula: 'SiC',
    solidType: 'Kovalent Katı',
    bonding: '3 Boyutlu Kovalent Ağ',
    conductivity: 'İletmez',
    meltingPoint: 'Aşırı yüksek (~2730°C)',
    examHighlight: 'Elmase benzer şekilde 3B kovalent ağ örgüsüne sahiptir ve aşındırıcı zımpara olarak kullanılır.'
  },
  {
    id: 'sonmus-kirec',
    name: 'Kalsiyum Oksit (Sönmemiş Kireç)',
    formula: 'CaO',
    solidType: 'İyonik Katı',
    bonding: 'İyonik Bağ (Ca2+ ve O2-)',
    conductivity: 'Katı halde iletmez; eriyik ve sulu çözeltide iletir',
    meltingPoint: 'Çok yüksek (2613°C)',
    examHighlight: 'İyon yükleri (+2 ve -2) yüksek olduğundan iyonik çekimi NaCl den çok daha kuvvetlidir.'
  },
  {
    id: 'cinko-sulfur',
    name: 'Çinko Sülfür (Çinko Blend)',
    formula: 'ZnS',
    solidType: 'İyonik Katı',
    bonding: 'İyonik Bağ (Zn2+ ve S2-)',
    conductivity: 'Katı halde iletmez; eriyik ve sulu çözeltide iletir',
    meltingPoint: 'Yüksek (1185°C)',
    examHighlight: 'MEB ders kitaplarında kristal örgü birim hücresi gösterilen klasik iyonik katıdır.'
  },
  {
    id: 'kukurt',
    name: 'Rombik Kükürt',
    formula: 'S8(k)',
    solidType: 'Moleküler Katı',
    bonding: 'London Kuvvetleri',
    conductivity: 'İletmez',
    meltingPoint: 'Düşük (115°C)',
    examHighlight: '8 atomlu halkalı S8 moleküllerinin oluşturduğu sarı renkli moleküler kristaldir.'
  }
];
