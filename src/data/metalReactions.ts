export interface MetalReactionItem {
  id: string;
  reactants: string;
  gasProduced:
    | 'H2 gazı'
    | 'NO2 gazı (Kahverengi zehirli)'
    | 'NO gazı (Renksiz nötr)'
    | 'SO2 gazı (Keskin kokulu asit gazı)'
    | 'CO2 gazı (Kireç suyunu bulandıran)'
    | 'Tepkime Olmaz (Gaz Çıkmaz)';
  metalClass: 'Aktif Metal' | 'Amfoter Metal' | 'Yarı Soy Metal' | 'Tam Soy Metal' | 'Karbonatlı Tuz (Tuzak)';
  equation: string;
  examHighlight: string;
}

export const METAL_REACTIONS: MetalReactionItem[] = [
  {
    id: 'cu-derisik-hno3',
    reactants: 'Bakır (Cu) + Derişik HNO3',
    gasProduced: 'NO2 gazı (Kahverengi zehirli)',
    metalClass: 'Yarı Soy Metal',
    equation: 'Cu + 4HNO3(der.) -> Cu(NO3)2 + 2NO2(g) + 2H2O',
    examHighlight: 'Yarı soy metaller asla H2 çıkaramaz! Derişik nitrik asitle kızıl-kahverengi zehirli NO2 gazı açığa çıkar.'
  },
  {
    id: 'cu-seyreltik-hno3',
    reactants: 'Bakır (Cu) + Seyreltik HNO3',
    gasProduced: 'NO gazı (Renksiz nötr)',
    metalClass: 'Yarı Soy Metal',
    equation: '3Cu + 8HNO3(seyr.) -> 3Cu(NO3)2 + 2NO(g) + 4H2O',
    examHighlight: 'Seyreltik nitrik asitle renksiz nötr NO gazı çıkar. NO havayla temas edince hemen kahverengi NO2 ye dönüşür.'
  },
  {
    id: 'cu-hcl',
    reactants: 'Bakır (Cu) + Tuz Ruhu (HCl)',
    gasProduced: 'Tepkime Olmaz (Gaz Çıkmaz)',
    metalClass: 'Yarı Soy Metal',
    equation: 'Cu + HCl -> Tepkime Yok!',
    examHighlight: 'ÖSYM KLASİĞİ: Yarı soy metaller (Cu, Ag, Hg) oksijensiz asitlerle (HCl, HBr) ASLA tepkime vermez!'
  },
  {
    id: 'ag-derisik-h2so4',
    reactants: 'Gümüş (Ag) + Sıcak Derişik H2SO4',
    gasProduced: 'SO2 gazı (Keskin kokulu asit gazı)',
    metalClass: 'Yarı Soy Metal',
    equation: '2Ag + 2H2SO4(sıcak der.) -> Ag2SO4 + SO2(g) + 2H2O',
    examHighlight: 'Yarı soy metaller derişik sülfürik asitle tepkimeye girerek keskin kokulu SO2 asit yağmuru gazı çıkarır.'
  },
  {
    id: 'zn-naoh',
    reactants: 'Çinko (Zn) + Kostik (Kuvvetli Baz: NaOH)',
    gasProduced: 'H2 gazı',
    metalClass: 'Amfoter Metal',
    equation: 'Zn + 2NaOH -> Na2ZnO2 + H2(g)',
    examHighlight: 'Çinko amfoter metaldir (Zengin Pabuçlu Beyaz Karısına Alttan Sandık). KUVVETLİ bazlarla tepkime verip H2 çıkarır.'
  },
  {
    id: 'zn-nh3',
    reactants: 'Çinko (Zn) + Amonyak (Zayıf Baz: NH3)',
    gasProduced: 'Tepkime Olmaz (Gaz Çıkmaz)',
    metalClass: 'Amfoter Metal',
    equation: 'Zn + NH3(sulu) -> Tepkime Yok!',
    examHighlight: 'ÇOK BÜYÜK ÖSYM TUZAĞI: Amfoter metaller yalnızca KUVVETLİ bazlarla tepkime verir; zayıf baz olan NH3 ile tepkime vermezler!'
  },
  {
    id: 'fe-hcl',
    reactants: 'Demir (Fe) + Tuz Ruhu (HCl)',
    gasProduced: 'H2 gazı',
    metalClass: 'Aktif Metal',
    equation: 'Fe + 2HCl -> FeCl2 + H2(g)',
    examHighlight: 'Aktif metaller tüm asitlerle (oksijenli ya da oksijensiz) tepkime vererek daima H2 gazı açığa çıkarır.'
  },
  {
    id: 'na-h2o',
    reactants: 'Sodyum (Na) + Su (H2O)',
    gasProduced: 'H2 gazı',
    metalClass: 'Aktif Metal',
    equation: 'Na + H2O -> NaOH + 1/2 H2(g)',
    examHighlight: '1A ve 2A grubu aktif metaller soğuk suyla bile şiddetle patlayarak H2 gazı ve bazik çözelti oluşturur.'
  },
  {
    id: 'al-hcl',
    reactants: 'Alüminyum (Al) + HCl',
    gasProduced: 'H2 gazı',
    metalClass: 'Amfoter Metal',
    equation: 'Al + 3HCl -> AlCl3 + 3/2 H2(g)',
    examHighlight: 'Alüminyum hem asitlerle hem de kuvvetli bazlarla tepkimeye girip değerliği/2 (3/2) mol H2 gazı çıkarır.'
  },
  {
    id: 'al-koh',
    reactants: 'Alüminyum (Al) + Potas Kostik (KOH)',
    gasProduced: 'H2 gazı',
    metalClass: 'Amfoter Metal',
    equation: 'Al + 3KOH -> K3AlO3 + 3/2 H2(g)',
    examHighlight: 'Kuvvetli baz olan KOH ile amfoter Al tepkime vererek kompleks tuz ve H2 gazı oluşturur.'
  },
  {
    id: 'au-hno3',
    reactants: 'Altın (Au) + Kezzap (HNO3)',
    gasProduced: 'Tepkime Olmaz (Gaz Çıkmaz)',
    metalClass: 'Tam Soy Metal',
    equation: 'Au + HNO3 -> Tepkime Yok!',
    examHighlight: 'Tam soy metaller (Au, Pt) tek başına hiçbir asitle tepkime vermez. Yalnızca Kral Suyu (3 HCl + 1 HNO3) ile çözünür.'
  },
  {
    id: 'pt-h2so4',
    reactants: 'Platin (Pt) + H2SO4',
    gasProduced: 'Tepkime Olmaz (Gaz Çıkmaz)',
    metalClass: 'Tam Soy Metal',
    equation: 'Pt + H2SO4 -> Tepkime Yok!',
    examHighlight: 'Platin soy metaldir, en kuvvetli asitler bile tek başına platini aşındıramaz veya gaz çıkaramaz.'
  },
  {
    id: 'caco3-hcl',
    reactants: 'Kireçtaşı (CaCO3) + Tuz Ruhu (HCl)',
    gasProduced: 'CO2 gazı (Kireç suyunu bulandıran)',
    metalClass: 'Karbonatlı Tuz (Tuzak)',
    equation: 'CaCO3 + 2HCl -> CaCl2 + CO2(g) + H2O',
    examHighlight: 'ÖSYM TUZAĞI: Karbonatlı tuzlar (CaCO3, NaHCO3) asitlerle H2 gazı ÇIKARMAZ; köpürerek CO2 gazı açığa çıkarır.'
  },
  {
    id: 'mg-hno3',
    reactants: 'Magnezyum (Mg) + Seyreltik HNO3',
    gasProduced: 'H2 gazı',
    metalClass: 'Aktif Metal',
    equation: 'Mg + 2HNO3 -> Mg(NO3)2 + H2(g)',
    examHighlight: 'Magnezyum yarı soy değil AKTİF bir metaldir. Bu yüzden nitrik asitle de H2 gazı açığa çıkarır (Cu ile karıştırma!).'
  },
  {
    id: 'fe-naoh',
    reactants: 'Demir (Fe) + Kostik (NaOH)',
    gasProduced: 'Tepkime Olmaz (Gaz Çıkmaz)',
    metalClass: 'Aktif Metal',
    equation: 'Fe + NaOH -> Tepkime Yok!',
    examHighlight: 'Demir amfoter metal DEĞİLDİR (sadece aktif metaldir). Bu nedenle bazlarla asla tepkime vermez.'
  },
  {
    id: 'nahco3-hcl',
    reactants: 'Yemek Sodası (NaHCO3) + HCl',
    gasProduced: 'CO2 gazı (Kireç suyunu bulandıran)',
    metalClass: 'Karbonatlı Tuz (Tuzak)',
    equation: 'NaHCO3 + HCl -> NaCl + CO2(g) + H2O',
    examHighlight: 'Bikarbonat kökü içeren tuzlar asit damlatıldığında köpürerek kireç suyunu bulandıran CO2 gazı çıkarır.'
  }
];
