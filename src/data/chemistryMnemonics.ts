export interface MnemonicRule {
  trigger: string;
  result: string;
  example: string;
  note?: string;
}

export type MnemonicCategory =
  | 'compound_rules'
  | 'atomic_models'
  | 'metals_activity'
  | 'interactions_polarity'
  | 'periodic_trends'
  | 'gases_solutions'
  | 'energy_kinetics_equilibrium'
  | 'electrochemistry_organic';

export interface MnemonicItem {
  id: string;
  title: string;
  code?: string;
  expansion?: string;
  category: MnemonicCategory;
  examLevel: 'TYT' | 'AYT' | 'TYT + AYT';
  summary: string;
  rules?: MnemonicRule[];
  explanation: string;
  pitfalls: string[];
}

export const CHEMISTRY_MNEMONICS: MnemonicItem[] = [
  // ================= 1. BİLEŞİK SINIFLANDIRMA & ASİT/BAZ/TUZ/OKSİT =================
  {
    id: 'bilesik-teshis-algoritmasi',
    title: 'Bileşik Türünü 3 Saniyede Bulma (Evrensel Filtreleme)',
    code: 'Metal/NH₄⁺ mi? Organik mi? Oksit mi? İnorganik Asit mi?',
    expansion: '4 Kademeli Karar Protokolü: İyonik vs Organik vs Oksit vs Asit',
    category: 'compound_rules',
    examLevel: 'TYT + AYT',
    summary: 'Ezber yapmadan formüle bakar bakmaz bileşiğin Asit, Baz, Tuz, Oksit, Alkol veya Eter olduğunu anlama algoritması.',
    rules: [
      {
        trigger: 'Metal veya NH₄⁺ (Amonyum) katyonu varsa',
        result: 'Bileşik İYONİKTİR. Sadece O varsa Oksit, OH⁻ varsa Baz, diğer kökler (Cl⁻, SO₄²⁻, CO₃²⁻) varsa Tuzdur.',
        example: 'Na₂O (Bazik Oksit), NaOH (Baz), NaCl (Tuz), NH₄Cl (Tuz), CaCO₃ (Tuz)',
        note: 'Metal içermese bile NH₄⁺ ile başlayan her bileşik iyonik bir TUZDUR!'
      },
      {
        trigger: 'Sadece C, H (ve O, N) varsa (Organik Adayı)',
        result: '-COOH varsa Karboksilik Asit, -COO- varsa Ester, -CHO varsa Aldehit, -CO- varsa Keton, R-O-R varsa Eterdir.',
        example: 'CH₃COOH (Asit), CH₃COOCH₃ (Ester), CH₃CHO (Aldehit), CH₃COCH₃ (Keton)',
        note: 'Sonunda -OH olanlar: Benzene bağlıysa FENOL (Zayıf Asit), alifatikse ALKOL (Nötr)!'
      },
      {
        trigger: 'Yalnızca 2 Element ve biri Oksijen (Ametal + Oksijen)',
        result: 'O sayısı > Ametal ise Asidik Oksit (CO₂, SO₃); O sayısı <= Ametal ise Nötr Oksittir (CO, NO, N₂O).',
        example: 'CO₂ (Asidik Oksit - asit yağmuru yapar), CO (Nötr Oksit - yanar ama suyla tepkime vermez)',
        note: 'Nötr oksitlerin 3 silahşörü: CO, NO, N₂O. Su, asit ve bazla tepkime vermez!'
      },
      {
        trigger: 'Başında "H" olan inorganik ametal bileşikleri',
        result: 'İnorganik Asittir (Sulu çözeltisine H⁺ / H₃O⁺ verir).',
        example: 'HCl (Tuz ruhu), HNO₃ (Kezzap), H₂SO₄ (Zaç yağı), H₃PO₄, HF, HCN, H₂S',
        note: 'İSTİSNA: NH₃ (Amonyak) formülünde OH olmamasına rağmen zayıf bir BAZDIR!'
      }
    ],
    explanation: 'ÖSYM sorularında bileşiği tanırken önce metale bakın. Metal varsa asit olamaz (tuz, baz veya oksittir). Organiklerde -COOH asit, -OH alkol (nötr) veya fenol (asit), aminler bazdır.',
    pitfalls: [
      '⚠️ EN ÇOK DÜŞÜLEN TUZAK: Alkoller (CH₃OH, C₂H₅OH) yapısında -OH olmasına rağmen BAZ DEĞİLDİR; suda moleküler çözünür, nötrdür (turnusolu etkilemez).',
      '⚠️ Glikoz (C₆H₁₂O₆) bolca -OH taşımasına rağmen nötrdür; asit veya baz değildir.',
      '⚠️ Kireç taşı (CaCO₃) ve yemek sodası (NaHCO₃) BAZ değil, BAZİK TUZDUR; asitle H₂ değil, CO₂ gazı çıkarırlar!',
      '⚠️ 3 tür element içeren CaCO₃ veya H₂SO₄ içinde oksijen olsa dahi OKSİT DEĞİLDİR (Oksit sadece 2 cins element içerir).'
    ]
  },
  {
    id: 'asit-bulma',
    title: 'Bileşiğin ASİT Olduğu Nasıl Anlaşılır?',
    code: 'H- ile Başla veya -COOH ile Bit!',
    expansion: 'H⁺ İyonu Verenler & Ametal Oksitleri',
    category: 'compound_rules',
    examLevel: 'TYT + AYT',
    summary: 'Bir formüle baktığınızda asit olduğunu saniyeler içinde anlamanızı sağlayan 3 altın kural.',
    rules: [
      {
        trigger: 'Formülün başında "H" varsa (İnorganik Asitler)',
        result: 'Kesinlikle Asittir',
        example: 'HCl (Tuz ruhu), HNO3 (Kezzap), H2SO4 (Zaç yağı), H3PO4, HBr, HF, HCN, H2S',
        note: 'Sulu çözeltisine H+ (H3O+) iyonu verir.'
      },
      {
        trigger: 'Formülün sonunda "-COOH" (Karboksil) grubu varsa (Organik Asitler)',
        result: 'Organik Karboksilik Asittir',
        example: 'HCOOH (Karınca asidi / Formik asit), CH3COOH (Sirke asidi / Asetik asit)',
        note: 'Karboksil grubunun sonundaki H iyonlaşarak ortama asitlik verir.'
      },
      {
        trigger: 'Ametal Oksijence Zenginse (Oksijen sayısı > Ametal sayısı)',
        result: 'Asit Anhidritidir (Asidik Oksit)',
        example: 'CO2, SO2, SO3, N2O5, NO2',
        note: 'Suyla tepkimeye girerek asit oluşturur (Asit yağmurlarının kaynağıdır).'
      }
    ],
    explanation: 'Asitler sulu çözeltilerinde H⁺ (hidronyum H₃O⁺) derişimini artıran maddelerdir. Tatları ekşidir, mavi turnusolu kırmızıya çevirirler. Aşındırıcıdırlar.',
    pitfalls: [
      '⚠️ NH3 (Amonyak) formülünde 3 tane H olmasına rağmen ASİT DEĞİL, BAZDIR!',
      '⚠️ CH4 (Metan) asit değildir, nötr bir hidrokarbondur.',
      '⚠️ H2O nötrdür.',
      '⚠️ HF zayıf asittir ama camı ve porseleni eriten tek asittir!'
    ]
  },
  {
    id: 'asit-baz-kuvveti',
    title: 'Asit ve Baz Kuvveti Kıyaslama Kuralları',
    code: 'Halojende Aşağı İn; Oksiasitte Oksijeni Say; Organikte Zinciri Kısalt!',
    expansion: 'Kuvvet = Suda %100 İyonlaşma Derecesi (Derişim veya pH Demek Değildir!)',
    category: 'compound_rules',
    examLevel: 'AYT',
    summary: 'Halojen asitleri (HI > HBr > HCl >> HF), Oksiasitler (HClO4 > HClO3 > HClO2 > HClO) ve Organik asitlerde kuvvet kıyaslama algoritması.',
    rules: [
      {
        trigger: '7A Halojen Asitleri (HI, HBr, HCl, HF)',
        result: 'Asitlik: HI > HBr > HCl >> HF',
        example: 'Aşağı inildikçe çap büyür, H-X bağı zayıflar, H⁺ kolay kopar. HF zayıf asittir!',
        note: 'HF zayıf asittir ama camı/porseleni aşındıran tek asittir (SiO₂ ile tepkime verir).'
      },
      {
        trigger: 'Oksiasitlerde (HaXOb) Oksijen Sayısı',
        result: 'Oksijen sayısı arttıkça asitlik kuvveti artar.',
        example: 'HClO₄ (Perklorik: Süper Asit) > HClO₃ > HClO₂ > HClO (Hipokloröz: Çok zayıf)',
        note: 'Elektronegatif oksijen atomları elektron çeker, O-H bağını gevşetir, H⁺ çok rahat kopar.'
      },
      {
        trigger: 'Organik Karboksilik Asitlerde Zincir Uzunluğu',
        result: 'Karbon zinciri uzadıkça elektron itici etki (+I) ile asitlik DÜŞER.',
        example: 'HCOOH (Formik asit) > CH₃COOH (Asetik) > C₂H₅COOH (Propanoik)',
        note: 'Basit karboksilik asitlerin en kuvvetlisi 1 karbonlu Formik Asittir.'
      },
      {
        trigger: '1A ve 2A Metallerinin Hidroksit Bazları',
        result: 'Grupta aşağı inildikçe metal çapı büyür, OH⁻ suya daha kolay bırakılır, BAZLIK ARTAR.',
        example: 'CsOH > KOH > NaOH > LiOH ve Ba(OH)₂ > Ca(OH)₂ >> Mg(OH)₂',
        note: 'Geçiş metali hidroksitleri (Fe(OH)₃, Cu(OH)₂) ve NH₃ zayıf bazlardır.'
      }
    ],
    explanation: 'Bir asidin kuvveti pH değerine değil, suya atıldığında yüzde kaç iyonlaştığına bağlıdır. 0.001 M HCl (%100 iyonlaşır, kuvvetli) pH=3 iken, 1 M HF (%1 iyonlaşır, zayıf) pH≈1.85 olabilir.',
    pitfalls: [
      '⚠️ HF zayıf asittir ama cam şişeyi eritir; plastik veya teflon kapta saklanır!',
      '⚠️ Karboksilik aside halojen bağlandıkça elektron çekici (-I) etkiyle asitlik fırlar: CCl₃COOH > CHCl₂COOH > CH₂ClCOOH > CH₃COOH.',
      '⚠️ HF zayıf asit olmasına rağmen flor elektronegatif diye kuvvetli sanmak en yaygın ÖSYM hatasıdır.'
    ]
  },
  {
    id: 'alkol-baz-fenol',
    title: 'Alkol vs Baz vs Fenol Ayrımı',
    code: 'Alkol Nötrdür; Fenol Zayıf Asittir; Metal-OH Bazdır!',
    expansion: 'Sonunda -OH Görülen Her Maddeye Baz Deme!',
    category: 'compound_rules',
    examLevel: 'TYT + AYT',
    summary: 'ÖSYM\'nin en çok avladığı 3 -OH grubu: Alkoller nötrdür, Fenol asidiktir, sadece iyonik Metal-OH bazdır.',
    rules: [
      {
        trigger: 'Metal + OH⁻ (NaOH, KOH, Ca(OH)₂)',
        result: 'GERÇEK BAZDIR. İyonik yapılıdır, suda OH⁻ iyonu verir, turnusolu maviye çevirir.',
        example: 'NaOH (Sudkostik), KOH (Potaskostik), Ca(OH)₂ (Sönmüş kireç)',
        note: 'Elektriği iyi iletirler (elektrolit).'
      },
      {
        trigger: 'Doymuş Alifatik Karbon + OH (CH₃OH, C₂H₅OH)',
        result: 'ALKOLDÜR. Kovalenttir, moleküler çözünür, KESİNLİKLE NÖTRDÜR (pH = 7).',
        example: 'CH₃OH (Metanol - zehirli), C₂H₅OH (Etanol - ispirto)',
        note: 'Turnusolü değiştirmez, elektriği iletmez, bazlarla nötralleşme vermez!'
      },
      {
        trigger: 'Benzen Halkasına Doğrudan Bağlı OH (C₆H₅OH)',
        result: 'FENOLDÜR (Karbolik Asit). Alkol DEĞİLDİR, ZAYIF ASİTTİR (Ka ≈ 10⁻¹⁰).',
        example: 'C₆H₅OH + NaOH -> C₆H₅ONa (Sodyum Fenolat tuzu) + H₂O',
        note: 'Kuvvetli baz olan NaOH ile tepkime verir; ancak alkoller NaOH ile tepkime vermez!'
      }
    ],
    explanation: 'Alkol olabilmesi için -OH grubunun sp³ hibritli doymuş karbona bağlı olması gerekir. Benzen halkasındaki karbonlar sp² olduğundan Fenol bir alkol değil, zayıf asittir.',
    pitfalls: [
      '⚠️ C₂H₅OH (Etanol) baz değildir; turnusol kağıdının rengini ASLA değiştirmez!',
      '⚠️ Fenol (C₆H₅OH) asit olduğu için NaOH ile nötralleşir; alkol ise NaOH ile tepkimeye girmez.',
      '⚠️ Fenol zayıf bazik tuz olan NaHCO₃ ile CO₂ gazı çıkaramaz (karbonik asitten zayıftır).'
    ]
  },
  {
    id: 'tuz-hidroliz',
    title: 'Tuz Çeşitleri ve Hidroliz Kuralı',
    code: 'Kuvvetlinin Borusu Öter; Zayıfın İyonu Suyla Kavga Eder (Hidroliz)!',
    expansion: 'Nötr Tuz (pH=7) vs Asidik Tuz (pH<7) vs Bazik Tuz (pH>7)',
    category: 'compound_rules',
    examLevel: 'TYT + AYT',
    summary: 'Hangi tuz hidroliz olur, hangisi olmaz? Tuzun çözelti pH\'ı nasıl bulunur?',
    rules: [
      {
        trigger: 'Kuvvetli Asit + Kuvvetli Baz Tuzu (NaCl, KNO₃, Na₂SO₄)',
        result: 'NÖTR TUZDUR (pH = 7). Asla HİDROLİZ OLMAZ!',
        example: 'HCl + NaOH -> NaCl + H₂O. Ne Na⁺ ne Cl⁻ suyla tepkimeye girmez.',
        note: 'Turnusolu etkilemez.'
      },
      {
        trigger: 'Kuvvetli Asit + Zayıf Baz Tuzu (NH₄Cl, NH₄NO₃, FeCl₃)',
        result: 'ASİDİK TUZDUR (pH < 7). Zayıftan gelen KATYON (NH₄⁺) HİDROLİZ OLUR!',
        example: 'NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺ (Ortama H₃O⁺ vererek pH\'ı 7\'nin altına düşürür).',
        note: 'Nişadır (NH₄Cl) asidik bir tuzdur.'
      },
      {
        trigger: 'Zayıf Asit + Kuvvetli Baz Tuzu (CH₃COONa, NaHCO₃, Na₂CO₃, KF)',
        result: 'BAZİK TUZDUR (pH > 7). Zayıftan gelen ANYON (F⁻, CH₃COO⁻) HİDROLİZ OLUR!',
        example: 'F⁻ + H₂O ⇌ HF + OH⁻ veya CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻.',
        note: 'Yemek sodası (NaHCO₃) ve çamaşır sodası (Na₂CO₃) bazik tuzdur.'
      }
    ],
    explanation: 'Tuzun asidik veya bazik karakterini kuvvetli olan ebeveyni belirler. Ancak suyla hidroliz olan iyon daima zayıf olan ebeveynden gelen iyondur!',
    pitfalls: [
      '⚠️ Nötr tuzlar (NaCl, KNO₃) hidroliz OLMAZ; sadece suda iyonlarına ayrışır.',
      '⚠️ Yemek sodası (NaHCO₃) asit değildir, bazik bir tuzdur; asit damlatılırsa köpürerek CO₂ gazı çıkarır.'
    ]
  },

  // ================= 2. ATOM MODELLERİ & KUANTUM =================
  {
    id: 'deden-trabzonlu-mu',
    title: 'Atom Modellerinin Kronolojik Sıralaması',
    code: 'DeDen TRabzonlu Mu?',
    expansion: 'Democritus → Dalton → Thomson → Rutherford → Bohr → Modern Atom Teorisi',
    category: 'atomic_models',
    examLevel: 'TYT',
    summary: 'M.Ö. simya çağından kuantum mekaniğine kadar atom teorisinin gelişim sırasını veren meşhur kodlama.',
    rules: [
      { trigger: 'De (1)', result: 'Democritus (M.Ö. 400)', example: 'Atomos (bölünemez tanecik) fikrini ilk ortaya atan filozof.' },
      { trigger: 'D (2)', result: 'Dalton (1803)', example: 'İlk bilimsel atom modeli. İçi dolu, bölünemez, berk küre.' },
      { trigger: 'T (3)', result: 'Thomson (1897)', example: 'Üzümlü kek modeli. Elektronu keşfetti; atom nötrdür dedi.' },
      { trigger: 'R (4)', result: 'Rutherford (1911)', example: 'Gezegen modeli & Altın yaprak deneyi. Çekirdeği ve çekirdekteki protonu keşfetti.' },
      { trigger: 'B (5)', result: 'Bohr (1913)', example: 'Yörüngeli (katmanlı) model. Elektronlar belirli enerji seviyelerinde döner.' },
      { trigger: 'M (6)', result: 'Modern Atom Teorisi (Bulut Modeli)', example: 'Heisenberg belirsizlik ilkesi ve Schrödinger dalga denklemi. Orbital kavramı.' }
    ],
    explanation: 'ÖSYM kronolojik sıralama veya "hangi kavram hangi modelde ilk kez yer almıştır" sorularında bu sırayı test eder. Nötron 1932 yılında James Chadwick tarafından keşfedilmiştir; Dalton, Thomson ve Rutherford modellerinde nötron ismi yer almaz.',
    pitfalls: [
      '⚠️ Çekirdek kavramını ilk bulan Rutherford\'dur (Thomson\'da çekirdek yoktur).',
      '⚠️ Orbital kavramı ilk kez Modern Atom Teorisindedir (Bohr yörünge/katman demiştir).',
      '⚠️ Nötron 1932\'de Chadwick tarafından bulunmuştur; ilk 4 modelde nötron yoktur.'
    ]
  },
  {
    id: 'kuantum-ve-elektron-dizilimi',
    title: 'Kuantum Sayıları, Aufbau & Cr/Cu İstisnası',
    code: 'Adres Analojisi: n (Şehir) - ℓ (Cadde) - mℓ (Daire) - ms (Yatak)',
    expansion: 'Madelung n+ℓ Kuralı; Cr/Cu Temel Haldir; Elektron Önce 4s\'ten Kopar!',
    category: 'atomic_models',
    examLevel: 'AYT',
    summary: 'Kuantum sayıları (n, ℓ, mℓ, ms), Aufbau/Pauli/Hund ilkeleri, 24-Cr ve 29-Cu küresel simetrisi ve katyondan elektron koparma sırası.',
    rules: [
      {
        trigger: 'Kuantum Sayıları Sınırları',
        result: 'n ≥ 1, 0 ≤ ℓ ≤ n-1, -ℓ ≤ mℓ ≤ +ℓ, ms = +1/2 veya -1/2',
        example: 'ℓ=0 (s: 1 orbital), ℓ=1 (p: 3 orbital), ℓ=2 (d: 5 orbital), ℓ=3 (f: 7 orbital)',
        note: 'n=2 için ℓ asla 2 olamaz (2d diye bir orbital yoktur!).'
      },
      {
        trigger: '24-Cr ve 29-Cu Elektron Dizilimi',
        result: 'Cr: [Ar] 4s¹ 3d⁵ (yarı dolu) ve Cu: [Ar] 4s¹ 3d¹⁰ (tam dolu).',
        example: 'Beklenen 4s² 3d⁴ ve 4s² 3d⁹ dizilimleri YANLIŞTIR! Bu geçişler UYARILMA DEĞİL, TEMEL HALDİR!',
        note: 'Küresel simetri kararlılığı için kendiliğinden oluşur.'
      },
      {
        trigger: 'İyondan Elektron Koparma Sırası',
        result: 'Elektron daima EN DIŞ KATMANDAN (Baş kuantum sayısı "n" en büyük olandan) kopar!',
        example: '₂₆Fe: [Ar] 4s² 3d⁶ -> Fe²⁺: [Ar] 3d⁶ (Elektron 3d\'den değil, 4s\'ten kopar!).',
        note: 'Yangında kapıya en yakın olan (en dıştaki 4s) ilk dışarı çıkar!'
      }
    ],
    explanation: 'Aufbau ilkesine göre elektronlar n+ℓ toplamı küçük olan orbitale önce yerleşir (4s, 3d\'den önce dolar). Ancak elektron koparılırken enerjisi değil, çekirdeğe en uzak olan n=4 katmanındaki 4s elektronu ilk verilir.',
    pitfalls: [
      '⚠️ ÖSYM TUZAĞI: "Cr atomunda 4s elektronu 3d\'ye uyarılmıştır" ifadesi KESİNLİKLE YANLIŞTIR! 4s¹ 3d⁵ temel haldir.',
      '⚠️ İzoelektroniklik: Hem elektron sayıları hem de dizilimleri AYNI olmalıdır (₂₀Ca: [Ar]4s² ile ₂₁Sc⁺: [Ar]4s¹3d¹ elektron sayıları 20 olmasına rağmen izoelektronik DEĞİLDİR!).',
      '⚠️ Her alt kabukta (s, p, d, f) mutlaka 1 adet mℓ = 0 orbitali bulunur.'
    ]
  },

  // ================= 3. METALLER, AKTİFLİK & GAZ ÇIKIŞI =================
  {
    id: 'amfoter-metaller',
    title: 'Amfoter Metaller Kodlaması',
    code: 'Zengin Pabuçlu Beyaz Karısına Alttan Sandık',
    expansion: 'Zn (Çinko), Pb (Kurşun), Be (Berilyum), Cr (Krom), Al (Alüminyum), Sn (Kalay)',
    category: 'metals_activity',
    examLevel: 'TYT + AYT',
    summary: 'Hem asitlerle hem de KUVVETLİ bazlarla tepkimeye girip H2 gazı açığa çıkaran 6 amfoter metal.',
    rules: [
      { trigger: 'Zengin', result: 'Zn (Çinko)', example: 'Zn + 2NaOH -> Na2ZnO2 + H2' },
      { trigger: 'Pabuçlu', result: 'Pb (Kurşun)', example: 'Pb + kuvvetli baz -> H2' },
      { trigger: 'Beyaz', result: 'Be (Berilyum)', example: '2A grubunun tek amfoter metalidir.' },
      { trigger: 'Karısına', result: 'Cr (Krom)', example: 'Değişken değerlikli amfoter geçiş metali.' },
      { trigger: 'Alttan', result: 'Al (Alüminyum)', example: 'Al + 3KOH -> K3AlO3 + 3/2 H2' },
      { trigger: 'Sandık', result: 'Sn (Kalay)', example: 'Sn + kuvvetli baz -> H2' }
    ],
    explanation: 'Bu 6 metal asitlerin tamamıyla tepkimeye girdiği gibi kuvvetli bazlarla da tepkime verir ve daima H₂ gazı çıkarır.',
    pitfalls: [
      '⚠️ EN BÜYÜK TUZAK: Amfoter metaller yalnızca KUVVETLİ bazlarla (NaOH, KOH) tepkime verir; ZAYIF BAZ olan amonyak (NH3) ile tepkime VERMEZLER!',
      '⚠️ Normal aktif metaller (Fe, Mg, Na) bazlarla tepkime vermez; yalnızca bu 6 amfoter metal bazla tepkime verir.'
    ]
  },
  {
    id: 'soy-metaller',
    title: 'Yarı Soy ve Tam Soy Metaller',
    code: 'Cumhur Haksızca Ağlayanların Avucunu Patlattı',
    expansion: 'Yarı Soylar: Cu, Hg, Ag | Tam Soylar: Au, Pt',
    category: 'metals_activity',
    examLevel: 'TYT + AYT',
    summary: 'Asitlerle asla H2 gazı çıkaramayan ve oksijensiz asitlerle hiç tepkime vermeyen metaller.',
    rules: [
      {
        trigger: 'Yarı Soy Metaller (Cu, Hg, Ag) + Oksijensiz Asit (HCl, HBr)',
        result: 'KESİNLİKLE TEPKİME YOKTUR!',
        example: 'Cu + HCl -> Tepkime olmaz. Cu kapta HCl güvenle saklanır.',
        note: 'Yarı soylar oksijensiz asitleri sevmez.'
      },
      {
        trigger: 'Yarı Soy Metaller (Cu, Hg, Ag) + Derişik HNO3',
        result: 'Tepkime olur; KAHVERENGİ NO2 GAZI ÇIKAR! (Asla H2 çıkmaz)',
        example: 'Cu + 4HNO3(derişik) -> Cu(NO3)2 + 2NO2(g) + 2H2O',
        note: 'Derişik olan kalabalıktır, oksijeni çok olan NO2 çıkarır.'
      },
      {
        trigger: 'Yarı Soy Metaller (Cu, Hg, Ag) + Seyreltik HNO3',
        result: 'Tepkime olur; RENKSİZ NO GAZI ÇIKAR!',
        example: '3Cu + 8HNO3(seyreltik) -> 3Cu(NO3)2 + 2NO(g) + 4H2O',
        note: 'Seyreltik olan seyrektir, oksijeni az olan NO çıkarır.'
      },
      {
        trigger: 'Yarı Soy Metaller (Cu, Hg, Ag) + Sıcak Derişik H2SO4',
        result: 'Tepkime olur; KÜKÜRT DİOKSİT (SO2) GAZI ÇIKAR!',
        example: 'Cu + 2H2SO4(sıcak der.) -> CuSO4 + SO2(g) + 2H2O',
        note: 'Seyreltik H2SO4 ile tepkime vermez!'
      },
      {
        trigger: 'Tam Soy Metaller (Au, Pt)',
        result: 'Hiçbir tek asitle tepkime vermez; Yalnızca KRAL SUYU (3 HCl + 1 HNO3) ile tepkime verir.',
        example: 'Altın veya platin yüzük kezzapta veya tuz ruhunda erimez.',
        note: 'Simyacı Câbir bin Hayyân tarafından keşfedilmiştir.'
      }
    ],
    explanation: 'Yarı soy metallerin hidrojen verme eğilimi hidrojenden düşüktür (E° < 0). Bu yüzden asidin hidrojenini indirgeyemezler; asidin kökünü indirgeyerek NO, NO2 veya SO2 gazı oluştururlar.',
    pitfalls: [
      '⚠️ Yarı soy metaller asitlerle tepkimesinden ASLA H₂ gazı ÇIKARMAZ!',
      '⚠️ Cu metali HCl çözeltisinde tepkime vermez; dolayısıyla Cu kapta HCl çözeltisi saklanabilir.',
      '⚠️ Cıva (Hg) oda koşullarında sıvı olan bir yarı soy metaldir; Cu ve Ag ile aynı kurallara tabidir.'
    ]
  },
  {
    id: 'gaz-cikisi-ve-karbonat-tuzagi',
    title: 'Hangi Maddeden Hangi Gaz Çıkar? (CO₂ Tuzağı)',
    code: 'Metal Asitle H₂; Karbonat Asitle CO₂; Yarı Soy NO/NO₂/SO₂ Çıkarır!',
    expansion: 'CaCO₃ ve NaHCO₃ Metal Değildir; Asitle CO₂ Verir!',
    category: 'metals_activity',
    examLevel: 'TYT + AYT',
    summary: 'ÖSYM\'nin "hangi kaptan H2 gazı çıkmaz?" sorularında kullandığı en büyük tuzak: Karbonatlı tuzlar.',
    rules: [
      {
        trigger: 'Aktif Metal + Asit (Na, Mg, Fe, Al + HCl)',
        result: 'H₂ (Hidrojen) Gazı Çıkar.',
        example: 'Mg + 2HCl -> MgCl2 + H2(g)',
        note: 'Çıkan H2 mol sayısı = Metalin Değerliği / 2 (1 mol Al -> 1.5 mol H2 verir).'
      },
      {
        trigger: 'Karbonatlı veya Bikarbonatlı Tuz + Asit (CaCO₃, NaHCO₃ + Asit)',
        result: 'KÖPÜREREK CO₂ (Karbondioksit) Gazı Çıkar! (H₂ DEĞİL!)',
        example: 'CaCO3(kireç taşı) + 2HCl -> CaCl2 + H2O + CO2(g)',
        note: 'Mermer tezgaha limon sıkılınca mermerin aşınması ve köpürmesi CO2 gazıdır.'
      },
      {
        trigger: '1A ve 2A Aktif Metalleri + Su (Na, K, Ca + H₂O)',
        result: 'Şiddetli alevle H₂ Gazı Çıkar.',
        example: 'Na + H2O -> NaOH + 1/2 H2(g)',
        note: 'Oda sıcaklığında suyla bile patlamalı tepkime verirler.'
      }
    ],
    explanation: 'Karbonat kökü (CO₃²⁻) asitle birleştiğinde kararsız karbonik asit (H₂CO₃) oluşur ve anında H₂O ve CO₂ gazına parçalanır.',
    pitfalls: [
      '⚠️ ÖSYM: "Aşağıdakilerin hangisinde H₂ gazı çıkmaz?" sorusunun cevabı genellikle CaCO₃ + HCl veya Cu + HNO₃\'tür.',
      '⚠️ Eşit molde Na, Mg ve Al asitle tepkimeye sokulursa çıkan gaz hacmi: Al (1.5 mol) > Mg (1 mol) > Na (0.5 mol).'
    ]
  },

  // ================= 4. ETKİLEŞİMLER, POLARİTE & HİDROJEN BAĞI =================
  {
    id: 'polarite-5-saniyede',
    title: '5 Saniyede Molekül Polaritesi (Lewis Çizmeden)',
    code: 'Simetri Varsa Apolar; Şapka/Boynuz Varsa Polar!',
    expansion: 'Halat Çekme Modeli & 5A/6A Merkez Atom Kuralı',
    category: 'interactions_polarity',
    examLevel: 'TYT + AYT',
    summary: 'Sınavda Lewis yapısı çizip vakit kaybetmeden molekülün polar mı apolar mı olduğunu anlama taktiği.',
    rules: [
      {
        trigger: '2 Atomlu Moleküller',
        result: 'Aynı atomlar (H₂, O₂, N₂, Cl₂) APOLAR; Farklı atomlar (HCl, CO, NO, HF) POLARDIR.',
        example: 'O=O çekimi eşit (net kuvvet sıfır); H-Cl klor daha çok çeker (kutuplu).',
        note: 'Bağ polarlığı ile molekül polarlığı aynıdır.'
      },
      {
        trigger: 'Sadece Karbon ve Hidrojen İçerenler (Hidrokarbonlar)',
        result: 'DAİMA APOLARDIR!',
        example: 'CH₄, C₂H₆, C₂H₄, C₂H₂, C₆H₆ (Benzen)',
        note: 'Yapısında pi bağı veya halka olsa bile sadece C ve H varsa molekül apolardır!'
      },
      {
        trigger: 'C ve H yanında 3. bir atom (O, N, S, Halojen) varsa',
        result: 'DAİMA POLARDIR!',
        example: 'CH₃OH, C₂H₅OH, CH₃Cl, CH₃COOH, CH₃OCH₃',
        note: 'Simetri bozulur, dipol momenti sıfırdan farklı olur.'
      },
      {
        trigger: 'Merkez Atom 5A (N, P) veya 6A (O, S) ise',
        result: 'DAİMA POLARDIR! (Merkez atomda ortaklanmamış elektron çifti / şapka vardır).',
        example: 'NH₃ (üçgen piramit), H₂O (kırık doğru), H₂S, NF₃, SO₂',
        note: 'Tepedeki serbest elektron çifti bağları aşağı büker, net kuvvet asla sıfır olamaz.'
      },
      {
        trigger: 'Merkez Atom 2A (Be), 3A (B) veya 4A (C, Si) ve tüm uçlar aynıysa',
        result: 'APOLARDIR! (Merkezde bağa katılmayan elektron çifti kalmaz, çekimler birbirini sıfırlar).',
        example: 'BeH₂, BF₃, BCl₃, CO₂, CS₂, CH₄, CCl₄',
        note: 'Bağlar polar kovalent olmasına rağmen molekül APOLARDIR!'
      }
    ],
    explanation: 'Halat Çekme Oyunu Modeli: Karbonun iki ucundan eşit güçle çeken iki oksijen (O=C=O) ortadaki karbonu hareket ettiremez (net kuvvet = 0, APOLAR). Ancak suda oksijenin tepesindeki serbest elektronlar bağları büktüğü için çekimler sıfırlanmaz (POLAR).',
    pitfalls: [
      '⚠️ "Bağlar polar ise molekül de polardır" KOCAMAN BİR YALANDIR! CO₂ ve CCl₄ bağları son derece polardır ama molekülleri APOLARDIR.',
      '⚠️ London kuvveti sadece apolarlarda bulunmaz; elektron içeren TÜM maddelerde (polar, apolar, soygaz) vardır! Apolarlarda tek kuvvettir.'
    ]
  },
  {
    id: 'hidrojen-bagi-fon',
    title: 'Hidrojen Bağı & "H\'nin F-O-N Aşkı"',
    code: 'F, O, N Atomuna DOĞRUDAN Bağlı H Olmalı!',
    expansion: 'Eter ve Aldehit Kendi Arasında H-Bağı Yapmaz, Suyla Yapar!',
    category: 'interactions_polarity',
    examLevel: 'TYT + AYT',
    summary: 'Hidrojen bağının kesin varlık şartı, kaynama noktasına devasa etkisi ve ÖSYM\'nin eter/aldehit tuzağı.',
    rules: [
      {
        trigger: 'F, O, N atomlarına doğrudan bağlı Hidrojen varsa (H₂O, HF, NH₃, Alkoller, Asitler)',
        result: 'Kendi molekülleri arasında HİDROJEN BAĞI kurarlar.',
        example: 'H₂O...H₂O, CH₃OH...CH₃OH, HF...HF',
        note: 'Zayıf etkileşimlerin en kuvvetlisidir; kaynama noktasını ve viskoziteyi fırlatır.'
      },
      {
        trigger: 'Eterler (CH₃-O-CH₃), Aldehitler (CH₃CHO) ve Ketonlar (CH₃COCH₃)',
        result: 'Kendi molekülleri arasında HİDROJEN BAĞI YOKTUR! (Etkin: Dipol-Dipol). Ancak SUYLA HİDROJEN BAĞI YAPARLAR!',
        example: 'Dimetil eterde H atomları O\'ya değil C\'a bağlıdır; ama Oksijeni suyun H\'sini tutar.',
        note: 'Bu yüzden aseton ve eter suda çok iyi çözünür!'
      },
      {
        trigger: 'H₂O vs HF vs NH₃ Kaynama Noktası Kıyası',
        result: 'H₂O (100°C) > HF (19.5°C) > NH₃ (-33°C)',
        example: 'HF bağı güçlüdür ama H₂O molekül başına 4 H-bağı yapar; HF sadece 2 bağ yapabilir.',
        note: 'Molekül başına düşen hidrojen bağı sayısı belirleyicidir.'
      }
    ],
    explanation: 'Hidrojen periyodik cetvelin tek elektronlu en küçük atomudur. F, O, N gibi elektronegatiflik canavarlarına bağlandığında elektronu çekilir ve H adeta çıplak bir protona dönüşür. Komşu moleküldeki serbest elektron çiftlerine sımsıkı yapışır.',
    pitfalls: [
      '⚠️ PH₃ ve H₂S moleküllerinde hidrojen bağı YOKTUR! P ve S atomları FON üyesi değildir (Dipol-Dipol vardır).',
      '⚠️ Kaynama veya buharlaşma sırasında kovalent bağlar ASLA kopmaz; sadece moleküller arası Hidrojen bağı ve London kuvvetleri kopar.'
    ]
  },
  {
    id: 'kaynama-noktasi-algoritmasi',
    title: 'Kaynama Noktası Kıyaslama Algoritması & Kirpi Modeli',
    code: 'İyonik > H-Bağı > Dipol-Dipol > London (Dallanma Arttıkça KN Düşer!)',
    expansion: 'Spagetti vs Kirpi Modeli: Temas Yüzeyi Arttıkça London Güçlenir',
    category: 'interactions_polarity',
    examLevel: 'TYT + AYT',
    summary: 'Farklı veya aynı kimyasal türe sahip maddelerin erime ve kaynama noktalarını hatasız kıyaslama rehberi.',
    rules: [
      {
        trigger: 'Tür Farkı Varsa (İyonik vs Polar vs Apolar)',
        result: 'Kovalent Ağ Katıları (Elmas) > İyonik (NaCl) > Hidrojen Bağlı (H₂O) > Dipol-Dipol (HCl) > London (CH₄).',
        example: 'NaCl (801°C) > H₂O (100°C) > HCl (-85°C) > CH₄ (-161°C)',
        note: 'İyonik bağ güçlü etkileşimdir; moleküler maddeler zayıf etkileşimle tutunur.'
      },
      {
        trigger: 'Apolar Moleküller ve Soygazlar (London)',
        result: 'Toplam elektron sayısı / Mol kütlesi (MA) arttıkça London kuvvetlenir, KN ARTAR.',
        example: 'Soygazlar: He < Ne < Ar < Kr < Xe | Halojenler: F₂ < Cl₂ < Br₂ < I₂ (I₂ katıdır!)',
        note: 'Elektron sayısı arttıkça elektron bulutunun polarize olabilirliği artar.'
      },
      {
        trigger: 'İzomer Moleküllerde Dallanma (n-pentan vs neopentan)',
        result: 'Dallanma arttıkça molekül küreselleşir (kirpi modeli), temas yüzeyi küçülür, London zayıflar, KN DÜŞER!',
        example: 'n-Pentan (düz zincir, 36°C) > İzopentan (28°C) > Neopentan (küresel, 9.5°C)',
        note: 'Düz zincirliler spagetti gibi boydan boya yapışır; ayırmak çok zordur.'
      },
      {
        trigger: 'Alkollerde -OH Sayısı',
        result: '-OH sayısı arttıkça molekül başına düşen H-bağı artar, KN ve viskozite uçar.',
        example: 'Gliserin (3 -OH) > Glikol (2 -OH) > Etanol (1 -OH)',
        note: 'Karboksilik asitler dimerleştiği için aynı karbonlu alkollerden bile yüksek kaynar.'
      }
    ],
    explanation: 'Kaynama noktası molekülleri birbirinden ayırmak için gereken enerjidir. Moleküller arasındaki çekim ne kadar güçlüyse ve temas yüzeyi ne kadar genişse kaynama noktası o kadar yüksektir.',
    pitfalls: [
      '⚠️ Aynı ortamda kaynamakta olan BÜTÜN sıvıların buhar basınçları birbirine EŞİTTİR (dış basınca eşittir). Kaynama noktası yüksek olanın buhar basıncı daha yüksek DEĞİLDİR!',
      '⚠️ Sıvının kaynama noktası sıvı miktarına, kabın şekline veya ısıtıcının gücüne KESİNLİKLE BAĞLI DEĞİLDİR.'
    ]
  },

  // ================= 5. PERİYODİK SİSTEM & İSTİSNALAR =================
  {
    id: 'kardan-adam-ve-3-asagi',
    title: 'Periyodik Eğilimler: Kardan Adam & 3 Aşağı 5 Yukarı',
    code: 'Kardan Adam Şişmanlar (Çap Aşağı Artar); 1A < 3A < 2A < 4A < 6A < 5A < 7A < 8A',
    expansion: '2A ve 5A Gruplarında Küresel Simetri Zirvesi',
    category: 'periodic_trends',
    examLevel: 'TYT + AYT',
    summary: 'Periyodik cetvelde soldan sağa ve yukarıdan aşağıya değişimlerin fiziksel mantığı ve zikzak iyonlaşma grafiği.',
    rules: [
      {
        trigger: 'Kardan Adam Modeli (Atom Yarıçapı)',
        result: 'Aşağı indikçe kardan adam şişmanlar (katman artar, çap büyür). Sağa gittikçe havuç burun incelir (proton artar, elektronu çeker, çap küçülür).',
        example: 'En büyük çap: Fransiyum (Fr); En küçük çap: Helyum (He) / Flor (F).',
        note: 'İyonlaşma enerjisi ve elektronegatiflik kardan adamın tersidir (sağa ve yukarı artar).'
      },
      {
        trigger: 'İyonlaşma Enerjisi Periyot Sıralaması ("3 Aşağı 5 Yukarı")',
        result: '1A < 3A < 2A < 4A < 6A < 5A < 7A < 8A',
        example: '2A (ns² tam dolu) ve 5A (ns² np³ yarı dolu) küresel simetri nedeniyle komşularından yüksek İE gerektirir!',
        note: '3A, 2A\'nın aşağısına iner; 5A, 6A\'nın yukarısına çıkar.'
      },
      {
        trigger: 'Elektron İlgisinde Dev İstisna: Klor > Flor (Cl > F)',
        result: 'Elektron ilgisi en yüksek element KLOR\'dur (Cl > F). Elektronegatiflik şampiyonu ise FLOR\'dur.',
        example: 'Florun çapı aşırı küçüktür; elektron yoğunluğu gelen elektronu iter. Klor daha rahat kabul eder.',
        note: 'Flor bağa asılır (elektronegatiflik), Klor elektrona sarılır (elektron ilgisi)!'
      },
      {
        trigger: 'İzoelektronik İyonlarda Çap Kıyası',
        result: 'Anyon Çapı > Nötr Çapı > Katyon Çapı. Proton sayısı büyük olan elektronları daha çok çeker, çapı küçülür!',
        example: '₈O²⁻ (en büyük) > ₉F⁻ > ₁₀Ne > ₁₁Na⁺ > ₁₂Mg²⁺ > ₁₃Al³⁺ (en küçük)',
        note: 'Hepsinde 10 elektron var; 13 protonlu Al³⁺ elektron bulutunu en çok büzer.'
      }
    ],
    explanation: 'Küresel simetriye sahip atomlar ekstra kararlıdır. Bu yüzden 2A grubundaki Berilyum veya Magnezyumdan elektron koparmak 3A grubundaki Bordan daha zordur.',
    pitfalls: [
      '⚠️ Soygazların (8A) elektronegatiflik ve elektron ilgisi değerleri YOK KABUL EDİLİR (bağ yapmadıkları için tanımsızdır). Periyotta elektronegatiflik 7A\'da son bulur.',
      '⚠️ Tabloda en az 3.5 - 4 kat sıçrama görüldüğü an değerlik elektron sayısı ve A grubu belirlenir!'
    ]
  },
  {
    id: 'ametaller-cop-hasan',
    title: 'Ametaller Şifresi (Kovalent vs İyonik Bağ Anahtarı)',
    code: 'COP HASAN Flor Klorun Burnunu Isırıp Attı',
    expansion: 'C, O, P, H, S, A(N) + F, Cl, Br, I (Bu 10 Ametali Bil Gerisini Çöz!)',
    category: 'periodic_trends',
    examLevel: 'TYT + AYT',
    summary: 'Periyodik tablodaki ametalleri eksiksiz bilerek iyonik-kovalent bağ ayrımını 1 saniyede yapma şifresi.',
    rules: [
      { trigger: 'COP', result: 'Karbon (C), Oksijen (O), Fosfor (P)', example: 'CO2, PCl3 kovalenttir.' },
      { trigger: 'HASAN', result: 'Hidrojen (H), Kükürt (S), Azot (N)', example: 'H2S, NH3 kovalenttir.' },
      { trigger: '7A Halojenleri', result: 'Flor (F), Klor (Cl), Brom (Br), İyot (I)', example: 'Tuz yapıcı ametaller.' }
    ],
    explanation: 'Kimyada karşılaştığınız bir element bu 10 ametalden biri değilse (ve soygaz değilse) kesinlikle METALDİR. İki ametal kovalent bağ, bir metal bir ametal iyonik bağ yapar.',
    pitfalls: [
      '⚠️ Hidrojen 1A grubundadır ama metal DEĞİLDİR, ametaldir! NaH iyoniktir, HCl kovalenttir.',
      '⚠️ NH₄Cl bileşiğinde hiç metal yoktur ama NH₄⁺ ve Cl⁻ iyonlarından oluştuğu için İYONİK BİR BİLEŞİKTİR.'
    ]
  },

  // ================= 6. GAZLAR & ÇÖZELTİLER =================
  {
    id: 'gazlar-ve-idealite',
    title: 'Gaz Bağıntıları & İdeallik Şartları',
    code: 'Paran Varsa Ne Rahat (PV=nRT) & Pijama Daha Rahat (P·MA=d·R·T)',
    expansion: 'İdeale Yaklaşma: Yüksek T, Düşük P, Küçük MA, Apolar!',
    category: 'gases_solutions',
    examLevel: 'AYT',
    summary: 'İdeal gaz denklemleri, Graham difüzyonu ve su üstünde gaz toplama püf noktaları.',
    rules: [
      {
        trigger: 'Tek Durum Gaz Formülü',
        result: 'P · V = n · R · T (P: atm, V: Litre, n: mol, T: Kelvin = °C + 273)',
        example: 'R = 22.4 / 273 veya 0.082 L·atm/(mol·K)',
        note: 'Sıcaklık daima KELVİN alınır! Celsius ile işlem yapmak en büyük hatadır.'
      },
      {
        trigger: 'Yoğunluk ve Mol Kütlesi Formülü',
        result: 'P · MA = d · R · T ("Pijama Daha Rahat" veya "Polis Mahkemede Adam DöveRT")',
        example: 'Gazın özkütlesi (d) veya mol kütlesi (MA) sorulduğunda doğrudan uygulanır.',
        note: 'Sabit hacimli kapta gaz eklenirse d artar; ideal pistonda aynı gaz eklenirse d değişmez.'
      },
      {
        trigger: 'Graham Difüzyon Yasası (Hız & Süre)',
        result: 'v₁ / v₂ = √(MA₂ / MA₁) · √(T₁ / T₂) = t₂ / t₁',
        example: 'He (MA=4) ile CH₄ (MA=16): He\'nin hızı 2 katıdır, borudan çıkış süresi yarısıdır!',
        note: 'Hafif ve sıcak olan uçar, ağır ve soğuk olan yavaşlar!'
      },
      {
        trigger: 'Su Üstünde Toplanan Gazlar',
        result: 'P_toplam = P_gaz + P_su(buhar). Su buharı basıncı HACİMLE DEĞİŞMEZ!',
        example: 'Piston itilip hacim yarıya indirilirse gaz basıncı 2 katına çıkar ama su buharı basıncı SABİT kalır.',
        note: 'Buhar basıncı sadece 3S\'ye bağlıdır: Sıcaklık, Sıvının cinsi, Saflık!'
      }
    ],
    explanation: 'Gaz molekülleri arasındaki çekim kuvvetinin sıfır ve moleküllerin öz hacminin ihmal edildiği varsayılan gazlara İdeal Gaz denir. Gerçek gazlar yüksek sıcaklık ve düşük basınçta ideale yaklaşır.',
    pitfalls: [
      '⚠️ Sıcaklık 25°C\'den 50°C\'ye çıkınca basınç 2 KATINA ÇIKMAZ! Kelvin cinsinden 298 K\'den 323 K\'ye çıkar (artış sadece %8\'dir).',
      '⚠️ Joule-Thomson Olayı: Aniden genleşen gerçek gaz ortamdan ısı alarak soğur (Buzdolabı ve klima prensibi).'
    ]
  },
  {
    id: 'cozeltiler-ve-koligatif',
    title: 'Çözeltiler: "Denizde Yüzen On Maymun" & Koligatif Kurallar',
    code: 'M = (d · % · 10) / MA & ΔT = K · i · m',
    expansion: 'Kaynama Anında Tüm Sıvıların Buhar Basınçları Eşittir!',
    category: 'gases_solutions',
    examLevel: 'TYT + AYT',
    summary: 'Molarite-özkütle bağıntısı, donma noktası alçalması, kaynama noktası yükselmesi ve kaynama anı tuzakları.',
    rules: [
      {
        trigger: 'Yoğunluk ve Kütlece Yüzde Verildiğinde Molarite',
        result: 'M = (d · % · 10) / MA ("Denizde Yüzen On Maymun")',
        example: 'd=1.2 g/mL, %40\'lık NaOH (MA=40) -> M = (1.2 * 40 * 10) / 40 = 12 M.',
        note: 'Yüzde doğrudan tam sayı olarak formüle yazılır.'
      },
      {
        trigger: 'Koligatif Özellikler (Van\'t Hoff Faktörü "i")',
        result: 'ΔTk = Kk · m · i (Kaynama yükselmesi) | ΔTd = Kd · m · i (Donma alçalması)',
        example: 'Glikoz ve alkolde i=1 (moleküler); NaCl\'de i=2; CaCl₂\'de i=3; Al(NO₃)₃\'te i=4.',
        note: 'Toplam iyon derişimi ne kadar çoksa kaynama o kadar yükselir, donma o kadar düşer.'
      },
      {
        trigger: 'Kaynama Anı Eşitliği (ÖSYM Şampiyon Sorusu)',
        result: 'Aynı ortamda kaynamakta olan BÜTÜN sıvıların buhar basınçları birbirine EŞİTTİR!',
        example: 'Kaynayan saf su ile kaynayan doymuş tuzlu suyun buhar basınçları eşittir (ikisi de Pdış\'a eşittir).',
        note: 'Doymamış tuzlu su kaynarken su buharlaştıkça sıcaklığı yükselmeye devam eder!'
      },
      {
        trigger: 'Gazların Çözünürlüğü ("Soğuk ve Gazlı Kola")',
        result: 'Gazların çözünmesi DAİMA EKZOTERMİKTİR. Düşük Sıcaklık ve Yüksek Basınçta gaz çözünürlüğü tavan yapar.',
        example: 'Kola soğuk içilir ve kapağı kapalı tutulur (T düşür, P artır).',
        note: 'Ortak iyon çözünürlüğü DAİMA AZALTIR!'
      }
    ],
    explanation: 'Koligatif özellikler çözünen maddenin kimyasal cinsine değil, çözeltideki toplam tanecik (iyon veya molekül) derişimine bağlıdır.',
    pitfalls: [
      '⚠️ Doymamış tuzlu su kaynarken sıcaklığı sabit kalmaz, artmaya devam eder! Doygunluğa ulaşınca sıcaklık sabitlenir.',
      '⚠️ Temas yüzeyi (küp şeker vs toz şeker) veya karıştırmak çözünürlüğü DEĞİŞTİRMEZ; sadece çözünme HIZINI artırır!'
    ]
  },

  // ================= 7. ENERJİ, HIZ & KİMYASAL DENGE =================
  {
    id: 'enerji-hiz-denge-kurallari',
    title: 'Katalizör Ne Yapar/Yapmaz? & K Sabitini Değiştiren Tek Şey',
    code: 'Katalizör ΔH\'ı ve K\'yı Değiştirmez! Denge Sabitini (K) YALNIZCA SICAKLIK Değiştirir!',
    expansion: 'Ea Daima Pozitiftir; Hız Bağıntısı Yavaş Basamağa Göredir',
    category: 'energy_kinetics_equilibrium',
    examLevel: 'AYT',
    summary: 'Tepkime ısısı (ΔH), aktifleşme enerjisi (Ea), katalizörün sınırları ve Le Chatelier ilkesi grafikleri.',
    rules: [
      {
        trigger: 'Katalizör Ne Yapar?',
        result: 'Eai ve Eag\'yi EŞİT MİKTARDA düşürür, aktifleşmiş kompleksin enerjisini düşürür, hız sabitini (k) artırır, dengeye ulaşma süresini kısaltır.',
        example: 'Mekanizmalı tepkimede yavaş basamağın eşik enerjisini düşürür.',
        note: 'Tepkimeden kimyasal olarak değişmeden çıkar.'
      },
      {
        trigger: 'Katalizör Ne Yapmaz? (ÖSYM Tuzakları)',
        result: 'ΔH\'ı DEĞİŞTİRMEZ! Denge sabitini (Kc, Kp) DEĞİŞTİRMEZ! Denge yönünü DEĞİŞTİRMEZ! Verimi/ürün miktarını DEĞİŞTİRMEZ!',
        example: 'Eai ve Eag aynı miktarda indiği için ΔH = Eai - Eag farkı asla değişmez.',
        note: 'Başlamayan tepkimeyi başlatmaz.'
      },
      {
        trigger: 'Denge Sabitini (K) Değiştiren Faktörler',
        result: 'Denge sabitini (Kc, Kp, Ka, Kb, Kçç, Ksu) YALNIZCA SICAKLIK DEĞİŞTİRİR!',
        example: 'Basınç, hacim, derişim veya katalizör K değerini ASLA değiştiremez.',
        note: 'Endotermikte T artarsa K artar; Ekzotermikte T artarsa K azalır.'
      },
      {
        trigger: 'Derişim-Zaman Grafiklerinde Ani Dikey Çizgiler',
        result: 'Tek maddede ani dikey çizgi varsa o madde eklenmiş/çekilmiştir. Tüm gazlarda ani dikey çizgi varsa HACİM değiştirilmiştir.',
        example: 'Hiçbir dikey kırılma olmadan yumuşak eğrilerle değişim varsa SICAKLIK değiştirilmiştir.',
        note: 'Hacim küçültülürse gaz katsayısının az olduğu tarafa kayar.'
      }
    ],
    explanation: 'Termodinamik (Enerji/Denge) ile Kinetik (Hız) birbirinden bağımsızdır. Sıcaklık artışı hem endotermik hem de ekzotermik TÜM tepkimelerin hızını artırır (k büyür).',
    pitfalls: [
      '⚠️ Aktifleşme enerjisi (Eai, Eag) ASLA NEGATİF OLAMAZ! Daima pozitiftir (Ea > 0).',
      '⚠️ Katı ve sıvı eklemek denge bağıntısında yer almadığı için dengeyi sağa ya da sola kaydırmaz (derişimleri sabittir).'
    ]
  },

  // ================= 8. ELEKTROKİMYA & ORGANİK KİMYA =================
  {
    id: 'elektrokimya-kimya-kurali',
    title: 'Elektrokimya: "KİMYA" / Anot-Katot & Suyun Elektrolizi',
    code: 'KİMYA: Katotta İndirgenme; Meydana Gelir; Yükseltgenme Anotta!',
    expansion: 'Elektron Anot\'tan Katot\'a; Anyon Anota, Katyon Katota; Katotta 2V H₂, Anotta V O₂',
    category: 'electrochemistry_organic',
    examLevel: 'AYT',
    summary: 'Pil şeması, anot/katot bulma, Nernst denklemi, Faraday yasaları ve elektroliz gaz hacimleri.',
    rules: [
      {
        trigger: 'Anot ve Katot Tespiti (Aktiflik)',
        result: 'Yükseltgenme potansiyeli (E°yüks) BÜYÜK olan metal aktiftir ve ANOT\'tur. Katotta ise ÇÖZELTİDEKİ İYON İNDİRGENİR!',
        example: 'Zn (E°=0.76 V) vs Cu (E°=0.34 V) -> Zn anottur, çözünür.',
        note: 'Katot kabında H⁺ varsa H2 gazı çıkar, çubuğun kütlesi değişmez!'
      },
      {
        trigger: 'Dış Devre ve Tuz Köprüsü Yönleri',
        result: 'Dış devrede elektron daima ANOT\'TAN KATOT\'A akar. Tuz köprüsünde ANYONLAR ANOTA, KATYONLAR KATOTA göç eder.',
        example: 'Aşınan Anot (kütlesi azalır), Kalınlaşan Katot (kütlesi artar).',
        note: 'Tuz köprüsü çekilirse pil potansiyeli anında sıfır olur (E=0).'
      },
      {
        trigger: 'Suyun Elektrolizi (Hofmann Voltametresi)',
        result: 'Katotta H₂ gazı (2V hacim), Anotta O₂ gazı (1V hacim) toplanır.',
        example: '2 H2O -> 2 H2(g) + O2(g) (Hacim: V(H2) = 2 · V(O2)).',
        note: 'Hacı Katot 2 kat gaz toplar!'
      },
      {
        trigger: 'Pillere Sıcaklık ve Seyreltme Etkisi (Nernst)',
        result: 'Piller EKZOTERMİKTİR (ΔH < 0). Sıcaklık arttıkça pil gerilimi AZALIR! Anot kabına su eklenirse Epil ARTAR.',
        example: 'Derişim pillerinde: SADE Kat (Seyreltik = Anot, Derişik = Katot).',
        note: 'Derişimler eşitlenince pil biter.'
      }
    ],
    explanation: 'Elektrokimyada anot aşınır, katot toplanır. Bir yarı tepkime 2 ile veya 3 ile çarpılırsa E° değeri ASLA çarpılmaz (şiddet özelliğidir). Ters çevrilirse E° işaret değiştirir.',
    pitfalls: [
      '⚠️ Katot çubuğunun kendisi indirgenmez! Çözeltideki katyon elektronu alıp indirgenir.',
      '⚠️ Elektrolizde işaretler değişse bile anotta yine yükseltgenme, katotta yine indirgenme olur!'
    ]
  },
  {
    id: 'organik-izomerlik-reaksiyonlar',
    title: 'Organik Kimya: "AL-ET, AL-KET, AS-EST" & "UÇ-AL-FOR"',
    code: 'Markovnikov: "Zengine Zengin, Fakire Fakir" | Tollens: "UÇ-AL-FOR"',
    expansion: 'Alkol-Eter, Aldehit-Keton, Asit-Ester İzomerliği & Alkol Yükseltgenme Merdiveni',
    category: 'electrochemistry_organic',
    examLevel: 'AYT',
    summary: 'Organik fonksiyonel grup izomer çiftleri, Markovnikov katılma kuralı, Tollens/Fehling ayıraçları ve cis-trans şartları.',
    rules: [
      {
        trigger: 'Fonksiyonel Grup İzomer Çiftleri ("AL-ET, AL-KET, AS-EST")',
        result: 'Alkol ⇌ Eter (CnH2n+2O) | Aldehit ⇌ Keton (CnH2nO) | Karboksilik Asit ⇌ Ester (CnH2nO2).',
        example: 'Etanol ile Dimetil eter izomerdir. Aseton (3C) en küçük ketondur; formaldehitin keton izomeri yoktur!',
        note: 'En küçük ester 2 karbonludur (Metil format); formik asidin ester izomeri yoktur.'
      },
      {
        trigger: 'Markovnikov Kuralı (Katılma Tepkimeleri)',
        result: 'Asimetrik alkene HX veya H2O katılırken H atomu hidrojeni ÇOK olan ikili bağ karbonuna, diğer grup hidrojeni AZ olana bağlanır.',
        example: 'CH3-CH=CH2 + H2O -> CH3-CH(OH)-CH3 (2-Propanol / Sekonder Alkol ana ürün).',
        note: 'Zengine zengin (H), fakire fakir (OH/X)!'
      },
      {
        trigger: 'Tollens ve Fehling ile Tepkime Verenler ("UÇ-AL-FOR")',
        result: 'UÇ alkinler (beyaz/kırmızı çökelek - yer değiştirme), ALdehitler (gümüş aynası - redoks), FORmik asit (CO2\'ye yükseltgenir).',
        example: 'Ketonlar ve İÇ alkinler Tollens/Fehling ile tepkime VERMEZ!',
        note: 'Uç alkin tepkimesi redoks DEĞİLDİR, asit-baz tuz çökmesidir!'
      },
      {
        trigger: 'Alkollerin Yükseltgenme Merdiveni',
        result: 'Primer Alkol -> Aldehit -> Karboksilik Asit (2 adım). Sekonder Alkol -> Keton (1 adım). Tersiyer Alkol -> YÜKSELTGENMEZ!',
        example: 'Tersiyer alkolün alfa karbonunda hidrojen olmadığı için yükseltgenemez.',
        note: '1 Numara çift dikiş, 2 Numara tek atar, 3 Numara sıfır çeker!'
      },
      {
        trigger: 'Cis-Trans (Geometrik) İzomerlik Şartı',
        result: 'İkili bağ karbonlarından herhangi birine AYNI iki atom veya grup bağlıysa cis-trans İZOMERLİĞİ GÖRÜLMEZ!',
        example: 'CH2=CH-CH3 (1. karbonda 2 tane H var -> cis-trans YOKTUR!).',
        note: 'Cis izomerin kaynama noktası genellikle trans izomerden yüksektir (daha polardır).'
      }
    ],
    explanation: 'Asetilene (C₂H₂) su katıldığında Asetaldehit (Aldehit) oluşurken, diğer tüm alkinlere su katıldığında Keton oluşur (Keto-Enol tautomerisi).',
    pitfalls: [
      '⚠️ "Tollens ile çökelek veriyorsa kesin aldehittir" TUZAKTIR! Uç alkinler de beyaz çökelek verir (yer değiştirme ile gümüş tuzu çöker).',
      '⚠️ Formik asit (HCOOH) hem karboksil hem aldehit grubu taşır; bu yüzden Tollens/Fehling ile yükseltgenebilen TEK karboksilik asittir!'
    ]
  }
];
