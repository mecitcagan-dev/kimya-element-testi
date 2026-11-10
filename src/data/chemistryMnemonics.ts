export interface MnemonicRule {
  trigger: string;
  result: string;
  example: string;
  note?: string;
}

export interface MnemonicItem {
  id: string;
  title: string;
  code?: string;
  expansion?: string;
  category:
    | 'compound_rules'
    | 'atomic_models'
    | 'metals_activity'
    | 'periodic_groups'
    | 'electrochemistry_gas';
  examLevel: 'TYT' | 'AYT' | 'TYT + AYT';
  summary: string;
  rules?: MnemonicRule[];
  explanation: string;
  pitfalls: string[];
}

export const CHEMISTRY_MNEMONICS: MnemonicItem[] = [
  // ================= 1. BİLEŞİK TÜRÜ BULMA PÜF NOKTALARI =================
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
        result: 'Asit Anhidriti (Asidik Oksit)',
        example: 'CO2, SO2, SO3, N2O5',
        note: 'Suyla tepkimeye girdiklerinde asit oluştururlar (CO2 + H2O -> H2CO3).'
      }
    ],
    explanation: 'Asitler suda çözündüklerinde H3O+ (hidronyum) iyonu derişimini artıran maddelerdir. Tatları ekşidir, mavi turnusolu kırmızıya çevirirler ve pH değerleri 7 den küçüktür.',
    pitfalls: [
      '⚠️ NH3 (Amonyak): Başında/içinde H olmasına rağmen ASİT DEĞİL, BAZDIR!',
      '⚠️ CH4 (Metan) ve Hidrokarbonlar: C ve H içerir ama suda iyonlaşmazlar, NÖTRDÜR!',
      '⚠️ H2O (Su): Amfoter maddedir (hem asit hem baz gibi davranabilir).'
    ]
  },
  {
    id: 'baz-bulma',
    title: 'Bileşiğin BAZ Olduğu Nasıl Anlaşılır?',
    code: 'Metal-OH veya Amonyak (NH3)!',
    expansion: 'OH⁻ İyonu Verenler & Metal Oksitleri',
    category: 'compound_rules',
    examLevel: 'TYT + AYT',
    summary: 'Bir formüle baktığınızda baz olduğunu saniyeler içinde anlamanızı sağlayan 3 altın kural.',
    rules: [
      {
        trigger: 'Metalin yanında "-OH" (Hidroksit) varsa',
        result: 'Kuvvetli veya Zayıf Bazdır',
        example: 'NaOH (Kostik), KOH (Potas kostik), Ca(OH)2 (Sönmüş kireç), Mg(OH)2, Ba(OH)2, Fe(OH)3',
        note: 'Suda çözündüğünde OH- iyonu salar.'
      },
      {
        trigger: 'Amonyak (NH3) ve Amin türevleri (R-NH2)',
        result: 'Susuz Zayıf Bazdır',
        example: 'NH3 (Amonyak), CH3NH2 (Metilamin)',
        note: 'Yapısında OH içermez ancak sudan H+ kopararak OH- oluşturur (NH3 + H2O <-> NH4+ + OH-).'
      },
      {
        trigger: 'Metal Oksitleri (Metallere bağlı oksijen)',
        result: 'Bazik Oksit (Baz Anhidriti)',
        example: 'Na2O, K2O, CaO (Sönmemiş kireç), MgO, BaO',
        note: 'Suyla tepkimeye girdiklerinde baz çözeltisi verirler (CaO + H2O -> Ca(OH)2).'
      }
    ],
    explanation: 'Bazlar suda çözündüklerinde OH- (hidroksit) iyonu oluşturan maddelerdir. Tatları acıdır, ele kayganlık hissi verirler, kırmızı turnusolu maviye çevirirler ve pH ları 7 den büyüktür.',
    pitfalls: [
      '⚠️ ALKOL TUZAĞI (ÖSYM nin 1 Numaralı Tuzağı): CH3OH (Metanol) ve C2H5OH (Etanol) yapısında -OH vardır ancak metal değil ametale bağlıdır; suda moleküler çözünürler, BAZ DEĞİLDİR, NÖTRDÜR!',
      '⚠️ ŞEKER TUZAĞI: C6H12O6 (Glikoz) bolca -OH içerir ama BAZ DEĞİLDİR, nötr moleküler maddedir!',
      '⚠️ NH3 te OH olmadığı için baz değil sanılması en yaygın öğrenci hatasıdır.'
    ]
  },
  {
    id: 'tuz-bulma',
    title: 'Bileşiğin TUZ Olduğu Nasıl Anlaşılır?',
    code: 'Metal + Ametal veya Kök Bileşimi!',
    expansion: 'Katyon + Anyon Elektrostatik Kristali',
    category: 'compound_rules',
    examLevel: 'TYT + AYT',
    summary: 'Ne H+ ile başlar ne OH- ile biter; bir katyon ile bir anyonun oluşturduğu nötralleşme ürünü iyonik kristaldir.',
    rules: [
      {
        trigger: 'Metal + Ametal birleşimi',
        result: 'İyonik Tuz',
        example: 'NaCl (Yemek tuzu), KCl, CaF2, KBr, ZnS',
        note: 'Asit ile bazın nötralleşmesi veya metal-ametal tepkimesiyle oluşur.'
      },
      {
        trigger: 'Metal + Çok Atomlu Kök (Asit anyonu)',
        result: 'Oksijenli Tuz',
        example: 'CaCO3 (Kireçtaşı), NaNO3 (Güherçile), CuSO4 (Göztaşı), NaHCO3 (Yemek sodası), Na2CO3 (Çamaşır sodası)',
        note: 'Karbonatlı, sülfatlı, nitratlı tuzlar bu gruptadır.'
      },
      {
        trigger: 'Amonyum Kökü (NH4+) + Ametal veya Kök',
        result: 'Metal İçermeyen İyonik Tuz',
        example: 'NH4Cl (Nişadır), NH4NO3 (Amonyum nitrat), (NH4)2SO4',
        note: 'Yapısında hiç metal olmamasına rağmen katyon ve anyon içerdiği için TUZDUR.'
      }
    ],
    explanation: 'Tuzlar oda koşullarında katı kristal örgülü bileşiklerdir. Katı halde elektrik iletmezler; eriyikleri ve sulu çözeltileri elektrik akımını iyon hareketiyle iletir.',
    pitfalls: [
      '⚠️ NaHCO3 (Yemek sodası) içinde H olmasına rağmen ASİT DEĞİL, BAZİK BİR TUZDUR!',
      '⚠️ NH4Cl hiç metal içermediği için kovalent sanılır; oysa NH4+ ve Cl- iyonlarından oluşan TUZDUR!',
      '⚠️ Tuzların tümü nötr değildir; asidik tuz (NH4Cl), bazik tuz (NaHCO3, Na2CO3) ve nötr tuz (NaCl) türleri vardır.'
    ]
  },
  {
    id: 'oksit-bulma',
    title: 'Bileşiğin OKSİT Türü Nasıl Belirlenir?',
    code: 'Sadece 2 Element & Biri Oksijen (O⁻²)!',
    expansion: 'Asidik, Bazik, Nötr ve Amfoter Oksitler',
    category: 'compound_rules',
    examLevel: 'TYT + AYT',
    summary: 'Oksit olmanın ilk şartı toplam 2 cins element içermek ve oksijenin -2 değerlikli olmasıdır.',
    rules: [
      {
        trigger: 'Ametal Oksiti + Oksijen sayısı > Ametal sayısı',
        result: 'Asidik Oksit (Asit Anhidriti)',
        example: 'CO2, SO2, SO3, N2O5, P2O5',
        note: 'Suyla asit oluşturur, bazlarla tuz oluşturur.'
      },
      {
        trigger: 'Ametal Oksiti + Oksijen sayısı <= Ametal sayısı',
        result: 'Nötr Oksit',
        example: 'CO (Karbonmonoksit), NO (Azotmonoksit), N2O (Diazotmonoksit)',
        note: 'Suyla, asitle ve bazla tepkime VERMEZ! (Yanabilirler).'
      },
      {
        trigger: 'Normal Metal Oksiti',
        result: 'Bazik Oksit',
        example: 'Na2O, K2O, CaO, MgO, BaO',
        note: 'Suyla baz oluşturur, asitlerle nötralleşip tuz verir.'
      },
      {
        trigger: 'Amfoter Metal (Zn, Pb, Cr, Al, Sn, Be) Oksiti',
        result: 'Amfoter Oksit',
        example: 'Al2O3, ZnO, SnO, Cr2O3',
        note: 'Hem kuvvetli asitlerle hem kuvvetli bazlarla tepkime verir; suda çözünmez!'
      }
    ],
    explanation: 'Bileşikte 3 tür element varsa oksit OLAMAZ (örn: CaCO3, H2SO4 oksit değildir, tuz/asittir). OF2 bileşiğinde oksijen +2 değerlikli olduğu için oksit sayılmaz.',
    pitfalls: [
      '⚠️ CO ve NO nötr oksittir; asla asit yağmuru YAPMAZ!',
      '⚠️ CaCO3 veya H2SO4 içinde oksijen olmasına rağmen 3 farklı element içerdiği için OKSİT DEĞİLDİR.',
      '⚠️ Amfoter oksitler (Al2O3, ZnO) zayıf baz olan NH3 ile tepkime VERMEZ!'
    ]
  },

  // ================= 2. ATOM MODELLERİ & TARİHÇE =================
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
      { trigger: 'B (5)', result: 'Bohr (1913)', example: 'Yörüngeli (katmanlı) model. Elektronlar belirli enerji seviyelerinde (dairesel yörüngelerde) döner.' },
      { trigger: 'M (6)', result: 'Modern Atom Teorisi (Bulut Modeli)', example: 'Heisenberg belirsizlik ilkesi ve Schrödinger dalga denklemi. Orbital (elektron bulutu) kavramı.' }
    ],
    explanation: 'ÖSYM kronolojik sıralama veya "hangi kavram hangi modelde ilk kez yer almıştır" sorularında bu sırayı test eder. Nötronu 1932 yılında Chadwick keşfetmiştir; Dalton, Thomson ve Rutherford modellerinde nötron ismi yer almaz.',
    pitfalls: [
      '⚠️ Çekirdek kavramını ilk bulan Rutherford dur (Thomson da çekirdek yoktur).',
      '⚠️ Orbital kavramı ilk kez Modern Atom Teorisindedir (Bohr yörünge/katman demiştir).',
      '⚠️ Nötron Rutherford un öngörüsü olmasına rağmen 1932 de James Chadwick tarafından keşfedilmiştir.'
    ]
  },

  // ================= 3. METALLER & AKTİFLİK =================
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
    explanation: 'Alternatif kodlama: "Sana Aldığım Pabuçları Çarık Zannetme" (Sn, Al, Pb, Cr, Zn). Bu metaller oksitleri ve hidroksitleriyle birlikte amfoterdir.',
    pitfalls: [
      '⚠️ EN BÜYÜK TUZAK: Amfoter metaller yalnızca KUVVETLİ bazlarla (NaOH, KOH) tepkime verir; ZAYIF BAZ olan amonyak (NH3) ile tepkime VERMEZLER!',
      '⚠️ Normal aktif metaller (Fe, Mg, Na) bazlarla tepkime vermez; yalnızca bu 6 amfoter metal bazla tepkime verir.'
    ]
  },
  {
    id: 'soy-metaller',
    title: 'Soy ve Yarı Soy Metaller Kodlaması',
    code: 'Cumhur Haksızca Ağlayanların... Avucunu Patlattı!',
    expansion: 'Yarı Soy: Cu, Hg, Ag | Tam Soy: Au, Pt',
    category: 'metals_activity',
    examLevel: 'TYT + AYT',
    summary: 'Asitlerle tepkimesinde H2 gazı ÇIKARAMAYAN metaller topluluğu.',
    rules: [
      { trigger: 'Cumhur Haksızca Ağladı (Cu, Hg, Ag)', result: 'Yarı Soy Metaller', example: 'Bakır (Cu), Cıva (Hg), Gümüş (Ag)' },
      { trigger: 'Avucunu Patlattı (Au, Pt)', result: 'Tam Soy Metaller', example: 'Altın (Au), Platin (Pt)' }
    ],
    explanation: 'Yarı soy metaller (Cu, Hg, Ag) oksijensiz asitlerle (HCl, HBr) tepkimeye girmez. Sadece kuvvetli ve oksijenli asitlerle (derişik HNO3 -> NO2, seyreltik HNO3 -> NO, sıcak derişik H2SO4 -> SO2) tepkimeye girer. Tam soy metaller (Au, Pt) ise sadece Kral Suyu (3 HCl + 1 HNO3) ile çözünür.',
    pitfalls: [
      '⚠️ Yarı soy metaller asla ve asla H2 gazı ÇIKARMAZ!',
      '⚠️ Cu + HCl tepkimesi gerçekleşmez (gaz çıkışı olmaz).'
    ]
  },

  // ================= 4. PERİYODİK TABLO GRUPLARI & AMETALLER =================
  {
    id: 'cop-hasan-ametaller',
    title: 'Ametaller Kodlaması',
    code: 'COP HASAN + 7A Halojenleri',
    expansion: 'C, O, P, H, S, N + F, Cl, Br, I',
    category: 'periodic_groups',
    examLevel: 'TYT + AYT',
    summary: 'Kimyadaki tüm ametalleri eksiksiz aklınızda tutmanızı sağlayan en pratik kodlama.',
    rules: [
      { trigger: 'C-O-P', result: 'Karbon (C), Oksijen (O), Fosfor (P)', example: 'Yaşamın temel ametalleri.' },
      { trigger: 'H-A-S-A-N', result: 'Hidrojen (H), Kükürt (S), Azot (N)', example: 'Ametal atomları (A harfleri dolgudur).' },
      { trigger: '7A Halojenleri', result: 'Flor (F), Klor (Cl), Brom (Br), İyot (I)', example: 'Fikret Cilasız Burnunu Isırdı kodlaması.' }
    ],
    explanation: 'Periyodik tablodaki 118 elementten sadece bu 10-11 tanesi ametaldir. Bir element COP HASAN ve Halojenler içinde değilse ya metaldir ya da soygazdır.',
    pitfalls: [
      '⚠️ Hidrojen 1A grubunda yer almasına rağmen METAL DEĞİL, AMETALDİR!',
      '⚠️ İki ametal birleşirse kovalent bağ; metal ile ametal birleşirse iyonik bağ oluşur.'
    ]
  },
  {
    id: 'halojenler-7a',
    title: '7A Grubu (Halojenler) Kodlaması',
    code: 'Flor Klorun Burnunu Isırıp Attı',
    expansion: 'F (Flor) → Cl (Klor) → Br (Brom) → I (İyot) → At (Astat)',
    category: 'periodic_groups',
    examLevel: 'TYT + AYT',
    summary: 'Tuz yapıcılar anlamına gelen, elektronegatifliği en yüksek 7A grubu elementleri.',
    rules: [
      { trigger: 'Flor (F)', result: 'En elektronegatif element (4.0)', example: 'Bileşiklerinde daima sadece -1 alır. Gaz haldedir.' },
      { trigger: 'Klor (Cl)', result: 'Elektron ilgisi en yüksek element', example: 'Cl > F istisnası! Gaz haldedir.' },
      { trigger: 'Brom (Br)', result: 'Oda koşullarında tek SIVI ametal', example: 'Kızıl-kahve renkli sıvıdır.' },
      { trigger: 'İyot (I)', result: 'Oda koşullarında KATI ametal', example: 'Mor buharlaşan, süblimleşen katıdır.' }
    ],
    explanation: 'Aşağı doğru inildikçe London kuvvetleri artar; bu yüzden F2 ve Cl2 gaz, Br2 sıvı, I2 katıdır.',
    pitfalls: [
      '⚠️ Oda koşullarında sıvı olan tek ametal Brom dur (tek metal ise Cıva dır).'
    ]
  },
  {
    id: 'alkali-metaller-1a',
    title: '1A Grubu (Alkali Metaller) Kodlaması',
    code: 'Haydarpaşa Lisesinin Nankör Kimyacısı Rabianın Cesedini Fırlattı',
    expansion: 'H (Hidrojen) - Li (Lityum) - Na (Sodyum) - K (Potasyum) - Rb (Rubidyum) - Cs (Sezyum) - Fr (Fransiyum)',
    category: 'periodic_groups',
    examLevel: 'TYT + AYT',
    summary: 'En aktif metaller grubu (En baştaki Hidrojen hariç!).',
    rules: [
      { trigger: 'H', result: 'Hidrojen (Ametal istisnası!)', example: '1A nın tek ametalidir, +1 ve -1 alabilir.' },
      { trigger: 'Li, Na, K, Rb, Cs, Fr', result: 'Alkali Metaller (+1 değerlik)', example: 'Bıçakla kesilecek kadar yumuşaktırlar; soğuk suyla bile patlayarak H2 gazı çıkarırlar.' }
    ],
    explanation: '1A grubu metalleri periyodik tablonun en elektropozitif ve en aktif metalleridir. Tabiatta serbest halde bulunmazlar, daima bileşikleri halindedirler.',
    pitfalls: [
      '⚠️ 1A nın hepsi metaldir ifadesi YANLIŞTIR (Hidrojen ametaldir!).'
    ]
  },
  {
    id: 'toprak-alkali-2a',
    title: '2A Grubu (Toprak Alkali Metaller) Kodlaması',
    code: 'Beymen Mağazasından Ceket Alan Sarışın Baran',
    expansion: 'Be (Berilyum) - Mg (Magnezyum) - Ca (Kalsiyum) - Sr (Stronsiyum) - Ba (Baryum) - Ra (Radyum)',
    category: 'periodic_groups',
    examLevel: 'TYT + AYT',
    summary: 'Bileşiklerinde yalnızca +2 değerlik alan aktif metal grubu.',
    rules: [
      { trigger: 'Be (Berilyum)', result: '2A nın amfoter metalidir', example: 'Kovalent karakterli bağlar da kurabilir.' },
      { trigger: 'Mg, Ca, Ba', result: 'Klasik Toprak Alkali Metaller', example: 'CaCO3, Mg(OH)2, BaSO4 gibi yaygın bileşikler yaparlar.' }
    ],
    explanation: 'Bileşiklerinde daima +2 alırlar. İyonlaşma enerjileri 3A dan büyüktür (küresel simetri nedeniyle).',
    pitfalls: [
      '⚠️ Berilyum (Be) amfoterdir; hem asitle hem kuvvetli bazla tepkime verir.'
    ]
  },

  // ================= 5. ELEKTROKİMYA, GAZLAR & DİĞERLERİ =================
  {
    id: 'kimya-anot-katot',
    title: 'Elektrokimyada Anot ve Katot Olayları Kodlaması',
    code: 'K İ M Y A veya ANASI YAŞLI, KIZI İNCE',
    expansion: 'Katotta İndirgenme (Redüksiyon) | Anotta Yükseltgenme (Oksidasyon)',
    category: 'electrochemistry_gas',
    examLevel: 'AYT',
    summary: 'Galvanik pillerde ve elektroliz hücrelerinde hangi elektrotta ne olduğunu asla unutturmayan kodlama.',
    rules: [
      { trigger: 'K - İ', result: 'Katotta İndirgenme olur', example: 'Cu²⁺ + 2e⁻ -> Cu(k) (Katot kütlesi genellikle artar).' },
      { trigger: 'M', result: 'Metallik / Köprü', example: 'Tuz köprüsünde Anyonlar Anota, Katyonlar Katota akar.' },
      { trigger: 'Y - A', result: 'Yükseltgenme Anotta olur', example: 'Zn(k) -> Zn²⁺ + 2e⁻ (Anot çubuğu aşınır, kütlesi azalır).' }
    ],
    explanation: 'Alternatif kodlama: "ANOT = Aşınır (kütle azalır), KATOT = Kalınlaşır (kütle artar)". Elektronlar daima ANOT TAN KATOTA doğru dış devreden akar.',
    pitfalls: [
      '⚠️ Elektronlar çözeltiden değil DIŞ DEVREDEN (iletken telden) akar.',
      '⚠️ Tuz köprüsünde Anyonlar Anota, Katyonlar Katota gider.'
    ]
  },
  {
    id: 'ideal-gaz-denklemi',
    title: 'İdeal Gaz Denklemi Kodlaması',
    code: 'Paran Varsa Ne Rahat',
    expansion: 'P · V = n · R · T',
    category: 'electrochemistry_gas',
    examLevel: 'AYT',
    summary: 'Tüm gaz yasalarını tek formülde toplayan meşhur YKS kodlaması.',
    rules: [
      { trigger: 'P', result: 'Basınç (atm)', example: '76 cmHg = 1 atm = 760 mmHg' },
      { trigger: 'V', result: 'Hacim (Litre)', example: 'NK da 1 mol gaz 22.4 L' },
      { trigger: 'n', result: 'Mol Sayısı (mol)', example: 'n = m / MA' },
      { trigger: 'R', result: 'Rydberg İdeal Gaz Sabiti', example: '22.4 / 273 veya 0.082 L·atm/(mol·K)' },
      { trigger: 'T', result: 'Mutlak Sıcaklık (Kelvin!)', example: 'T = t(°C) + 273.15' }
    ],
    explanation: 'Yoğunluklu versiyonu: "Pisi Macit Daha Rahat" -> P · MA = d · R · T',
    pitfalls: [
      '⚠️ Sıcaklık her zaman Kelvin cinsinden alınmalıdır (Santigrat yazmak en büyük işlem hatasıdır!).'
    ]
  },
  {
    id: 'sabun-kodlamasi',
    title: 'Beyaz Sabun vs Arap Sabunu Kodlaması',
    code: 'Kıllı Arap vs Normal Sodyum',
    expansion: 'Potasyum (K) = Arap Sabunu (Yumuşak) | Sodyum (Na) = Beyaz Sabun (Sert)',
    category: 'compound_rules',
    examLevel: 'TYT',
    summary: 'Sert kalıp sabun ile yumuşak Arap sabunu arasındaki baz farkını saniyede ayırt etme kuralı.',
    rules: [
      { trigger: 'Sodyum (Na) ile yapılan sabun', result: 'Beyaz Sabun (Sert Sabun)', example: 'C17H35COONa (Sodyum stearat) - Katı kalıp el sabunudur.' },
      { trigger: 'Potasyum (K) ile yapılan sabun', result: 'Arap Sabunu (Yumuşak Sabun / Sıvı)', example: 'C17H35COOK (Potasyum stearat) - Halı/zemin temizliği ve sıvı sabun.' }
    ],
    explanation: 'İkisinde de apolar hidrokarbon kuyruk (kire tutunan hidrofob kısım) ve polar karboksilat baş (suya tutunan hidrofil kısım) bulunur.',
    pitfalls: [
      '⚠️ Sert sularda sabun köpürmez, Ca2+ ve Mg2+ ile çökelek verir; deterjan ise sert sularda bile köpürür.'
    ]
  }
];
