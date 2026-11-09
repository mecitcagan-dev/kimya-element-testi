export interface InteractionItem {
  id: string;
  pair: string;
  species1: string;
  species2: string;
  dominantInteraction:
    | 'Hidrojen Bağı'
    | 'Dipol - Dipol'
    | 'İyon - Dipol'
    | 'London Kuvvetleri'
    | 'Dipol - İndüklenmiş Dipol';
  dissolution: 'Çözünür (Benzer benzeri çözer)' | 'Çözünmez (Farklı faz oluşturur)';
  examHighlight: string;
}

export const INTERACTIONS: InteractionItem[] = [
  {
    id: 'h2o-h2o',
    pair: 'H2O — H2O',
    species1: 'H2O (Polar, FON içerir)',
    species2: 'H2O (Polar, FON içerir)',
    dominantInteraction: 'Hidrojen Bağı',
    dissolution: 'Çözünür (Benzer benzeri çözer)',
    examHighlight: 'Su molekül başına 4 adet hidrojen bağı kurabilir. Bu anomali suyun 100°C gibi yüksek kaynama noktasına sahip olmasını sağlar.'
  },
  {
    id: 'nacl-h2o',
    pair: 'NaCl — H2O',
    species1: 'NaCl (İyonik bileşik: Na+, Cl-)',
    species2: 'H2O (Polar çözücü)',
    dominantInteraction: 'İyon - Dipol',
    dissolution: 'Çözünür (Benzer benzeri çözer)',
    examHighlight: 'Tuzun suda çözünmesi iyon-dipol etkileşimi (hidratasyon) ile gerçekleşir. Elektrolit çözelti oluşur.'
  },
  {
    id: 'ch4-ch4',
    pair: 'CH4 — CH4',
    species1: 'CH4 (Apolar molekül)',
    species2: 'CH4 (Apolar molekül)',
    dominantInteraction: 'London Kuvvetleri',
    dissolution: 'Çözünür (Benzer benzeri çözer)',
    examHighlight: 'Apolar moleküller arasında sadece geçici kutuplanma (indüklenmiş dipol - indüklenmiş dipol / London) kuvvetleri bulunur.'
  },
  {
    id: 'hcl-hcl',
    pair: 'HCl — HCl',
    species1: 'HCl (Polar molekül, Cl FON da yok!)',
    species2: 'HCl (Polar molekül)',
    dominantInteraction: 'Dipol - Dipol',
    dissolution: 'Çözünür (Benzer benzeri çözer)',
    examHighlight: 'ÖSYM TUZAĞI: Klorun elektronegatifliği yüksek olsa da 3. periyotta çapı büyüktür. HCl hidrojen bağı YAPMAZ, dipol-dipol yapar!'
  },
  {
    id: 'nh3-h2o',
    pair: 'NH3 — H2O',
    species1: 'NH3 (Polar, N atomunda H var)',
    species2: 'H2O (Polar, O atomunda H var)',
    dominantInteraction: 'Hidrojen Bağı',
    dissolution: 'Çözünür (Benzer benzeri çözer)',
    examHighlight: 'İki tür arasında hidrojen bağı kurulduğu için amonyak gazı suda olağanüstü yüksek oranda çözünür.'
  },
  {
    id: 'co2-ccl4',
    pair: 'CO2 — CCl4',
    species1: 'CO2 (Apolar molekül)',
    species2: 'CCl4 (Apolar molekül)',
    dominantInteraction: 'London Kuvvetleri',
    dissolution: 'Çözünür (Benzer benzeri çözer)',
    examHighlight: 'Bağları polar kovalent olmasına rağmen molekül geometrileri simetrik olduğundan ikisi de apolardır; aralarında London etkindir.'
  },
  {
    id: 'eter-h2o',
    pair: 'Dimetil Eter (CH3-O-CH3) — H2O',
    species1: 'CH3-O-CH3 (Polar, O var ama H bağlı değil)',
    species2: 'H2O (Polar, O ya bağlı H var)',
    dominantInteraction: 'Hidrojen Bağı',
    dissolution: 'Çözünür (Benzer benzeri çözer)',
    examHighlight: 'KRİTİK MEB AYRIMI: Eter kendi molekülleri arasında H-bağı yapamazken, su ile karıştırıldığında suyun hidrojeniyle H-bağı yapar!'
  },
  {
    id: 'eter-eter',
    pair: 'Dimetil Eter — Dimetil Eter',
    species1: 'CH3-O-CH3 (Polar)',
    species2: 'CH3-O-CH3 (Polar)',
    dominantInteraction: 'Dipol - Dipol',
    dissolution: 'Çözünür (Benzer benzeri çözer)',
    examHighlight: 'Oksijene doğrudan bağlı hidrojen atomu bulunmadığından saf eter molekülleri kendi arasında sadece dipol-dipol yapar.'
  },
  {
    id: 'hf-hf',
    pair: 'HF — HF',
    species1: 'HF (Polar, F-H bağı)',
    species2: 'HF (Polar, F-H bağı)',
    dominantInteraction: 'Hidrojen Bağı',
    dissolution: 'Çözünür (Benzer benzeri çözer)',
    examHighlight: 'Halojen asitleri (HCl, HBr, HI) arasında SADECE HF hidrojen bağı yapar. Bu yüzden kaynama noktası gruptaki diğerlerinden çok daha yüksektir.'
  },
  {
    id: 'c2h5oh-h2o',
    pair: 'Etil Alkol (C2H5OH) — H2O',
    species1: 'C2H5OH (Polar alkol, -OH)',
    species2: 'H2O (Polar su)',
    dominantInteraction: 'Hidrojen Bağı',
    dissolution: 'Çözünür (Benzer benzeri çözer)',
    examHighlight: 'Alkol ve su birbiri içinde her oranda homojen karışır (kolonya). Etkin çekim hidrojen bağıdır.'
  },
  {
    id: 'h2s-h2s',
    pair: 'H2S — H2S',
    species1: 'H2S (Polar molekül, S FON da yok)',
    species2: 'H2S (Polar molekül)',
    dominantInteraction: 'Dipol - Dipol',
    dissolution: 'Çözünür (Benzer benzeri çözer)',
    examHighlight: 'H2O hidrojen bağı yaparken, aynı gruptaki kükürdün oluşturduğu H2S hidrojen bağı YAPMAZ; dipol-dipol etkindir.'
  },
  {
    id: 'he-ne',
    pair: 'He — Ne',
    species1: 'He (Soy gaz atomu)',
    species2: 'Ne (Soy gaz atomu)',
    dominantInteraction: 'London Kuvvetleri',
    dissolution: 'Çözünür (Benzer benzeri çözer)',
    examHighlight: 'Soy gaz atomları arasındaki tek çekim kuvveti geçici dipollerin oluşturduğu zayıf London kuvvetleridir.'
  },
  {
    id: 'h2o-ccl4',
    pair: 'H2O — CCl4',
    species1: 'H2O (Polar)',
    species2: 'CCl4 (Apolar)',
    dominantInteraction: 'Dipol - İndüklenmiş Dipol',
    dissolution: 'Çözünmez (Farklı faz oluşturur)',
    examHighlight: 'Polar su ile apolar karbon tetraklorür birbiri içinde çözünmez; zayıf dipol-indüklenmiş dipol etkileşimi kurarlar.'
  },
  {
    id: 'aseton-su',
    pair: 'Aseton (CH3COCH3) — H2O',
    species1: 'Aseton (Polar, C=O)',
    species2: 'H2O (Polar, H-O)',
    dominantInteraction: 'Hidrojen Bağı',
    dissolution: 'Çözünür (Benzer benzeri çözer)',
    examHighlight: 'Kendi arasında dipol-dipol yapan ketonlar, su molekülleriyle hidrojen bağı kurarak suda çok iyi çözünür.'
  },
  {
    id: 'iyot-ccl4',
    pair: 'İyot (I2) — CCl4',
    species1: 'I2 (Apolar katı)',
    species2: 'CCl4 (Apolar sıvı)',
    dominantInteraction: 'London Kuvvetleri',
    dissolution: 'Çözünür (Benzer benzeri çözer)',
    examHighlight: 'Apolar iyot apolar CCl4 içinde mor renkli çözelti oluşturarak mükemmel çözünür (benzer benzeri çözer).'
  },
  {
    id: 'ch3cl-ch3cl',
    pair: 'Klorometan (CH3Cl) — CH3Cl',
    species1: 'CH3Cl (Polar molekül)',
    species2: 'CH3Cl (Polar molekül)',
    dominantInteraction: 'Dipol - Dipol',
    dissolution: 'Çözünür (Benzer benzeri çözer)',
    examHighlight: 'Asimetrik yapısı nedeniyle polar bir moleküldür. Cl FON elementlerine ait olmadığından baskın kuvvet dipol-dipoldür.'
  }
];
