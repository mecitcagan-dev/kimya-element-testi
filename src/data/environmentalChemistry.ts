import { StandardQuizItem } from '../types/topics';

export type EnvironmentalCategory =
  | 'Sera Gazları'
  | 'Ozon Tabakası'
  | 'Asit Yağmurları & Nötr Oksitler'
  | 'Su Sertliği & Arıtım'
  | 'Su ve Toprak Kirleticileri';

export interface EnvironmentalChemistryItem {
  id: string;
  prompt: string;
  promptSub: string;
  answer: string;
  distractors: [string, string, string];
  synonyms?: string[];
  category: EnvironmentalCategory;
  species: string;
  impact: string;
  examHighlight: string;
}

export const ENVIRONMENTAL_CHEMISTRY: EnvironmentalChemistryItem[] = [
  // 1. SERA GAZLARI (3 madde)
  {
    id: 'env-sera-co2',
    prompt: 'Fosil yakıtların (kömür, petrol, doğalgaz) yanması ve ormansızlaşma sonucu artan, insan kaynaklı küresel ısınmaya en büyük katkıyı yapan sera gazı hangisidir?',
    promptSub: 'İnsan kaynaklı başat sera gazı',
    answer: 'Karbondioksit (CO₂)',
    distractors: ['Karbonmonoksit (CO)', 'Kükürt dioksit (SO₂)', 'Azot gazı (N₂)'],
    synonyms: ['CO2', 'karbondioksit'],
    category: 'Sera Gazları',
    species: 'CO₂',
    impact: 'Yeryüzünden yansıyan kızılötesi (IR) ışınları tutarak atmosferi ısıtır',
    examHighlight: 'CO₂ hem doğal döngüde yer alır hem de insan kaynaklı sera etkisinde en yüksek paya sahiptir; ancak asit yağmurlarının (pH < 5) birincil sebebi değildir.'
  },
  {
    id: 'env-sera-h2o',
    prompt: 'Atmosferdeki DOĞAL sera etkisinden en yüksek oranda (~%60) sorumlu olan gaz hangisidir?',
    promptSub: 'Doğal sera gazları sıralaması',
    answer: 'Su buharı (H₂O)',
    distractors: ['Karbondioksit (CO₂)', 'Metan (CH₄)', 'Kükürt trioksit (SO₃)'],
    synonyms: ['H2O', 'su buhari'],
    category: 'Sera Gazları',
    species: 'H₂O (gaz/buhar)',
    impact: 'Doğal sera etkisinin ana bileşeni (hidrolojik döngü)',
    examHighlight: 'MEB Müfredat Detayı: Başlıca sera gazları H₂O buharı, CO₂, CH₄, N₂O, O₃ ve CFC’lerdir. O₂ ve N₂ sera gazı DEĞİLDİR!'
  },
  {
    id: 'env-sera-ch4-n2o',
    prompt: 'Çeltik tarlaları, hayvancılık ve çöplüklerden salınan CH₄ ile azotlu gübrelerden salınan N₂O ve yer seviyesindeki O₃ gazlarının ortak çevresel etkisi nedir?',
    promptSub: 'Yüksek ısınma potansiyelli sera gazları',
    answer: 'Güçlü sera gazlarıdır (Küresel ısınmayı artırırlar)',
    distractors: [
      'Asit yağmuru oluştururlar (Nötr oksit değillerdir)',
      'Sert sularda kireç taşı tortusu oluştururlar',
      'Kandaki hemoglobini doğrudan felç ederler'
    ],
    category: 'Sera Gazları',
    species: 'CH₄, N₂O, Troposferik O₃',
    impact: 'Küresel ısınma ve iklim değişikliği (GWP değerleri CO₂’den çok yüksektir)',
    examHighlight: 'Metan (CH₄) molekülü CO₂’ye kıyasla ~28–36 kat, N₂O ise ~300 kat daha güçlü ısı tutma potansiyeline sahiptir.'
  },

  // 2. OZON TABAKASI (2 madde)
  {
    id: 'env-ozon-cfc',
    prompt: 'Buzdolabı, klima, sprey itici gazı ve köpük üretiminde kullanılmış olan, stratosfere ulaşıp UV ışınlarıyla Cl• radikali vererek ozon tabakasını incelten gazlar hangileridir?',
    promptSub: 'Montreal Protokolü ile yasaklanan gaz sınıfı',
    answer: 'Kloroflorokarbonlar (CFC / Freonlar)',
    distractors: ['Kükürt oksitler (SO₂, SO₃)', 'Karbon oksitler (CO, CO₂)', 'Soy gazlar (Ar, He)'],
    synonyms: ['CFC', 'kloroflorokarbon', 'freon'],
    category: 'Ozon Tabakası',
    species: 'CFC (örn. CF₂Cl₂)',
    impact: 'Tek bir Cl• radikali katalitik döngüyle ~100.000 ozon (O₃) molekülünü parçalar',
    examHighlight: 'CFC gazları hem stratosferdeki koruyucu ozon tabakasını inceltir hem de çok güçlü birer sera gazıdır.'
  },
  {
    id: 'env-ozon-halon-uv',
    prompt: 'Stratosferdeki ozon (O₃) tabakasının canlılar için temel görevi nedir ve yangın söndürücülerdeki hangi grup gaz ozonu klordan bile hızlı parçalar?',
    promptSub: 'Ozonun koruyucu rolü & Halonlar',
    answer: 'Zararlı UV-B ve UV-C ışınlarını tutar — Br içeren Halonlar',
    distractors: [
      'Kızılötesi ışınları yansıtır — Metan (CH₄)',
      'Asit yağmurlarını nötralleştirir — Kükürt dioksit (SO₂)',
      'Atmosfer basıncını dengeler — Karbonmonoksit (CO)'
    ],
    category: 'Ozon Tabakası',
    species: 'Stratosferik O₃ & Halonlar',
    impact: 'UV filtreleme bozulursa cilt kanseri ve katarakt artar; halondaki Br çok yıkıcıdır',
    examHighlight: 'ÖSYM AYRIMI: Stratosferdeki ozon UV’den koruyan "iyi ozon", yer seviyesindeki (troposferik) ozon ise fotokimyasal sis ve sera gazı olan "kötü ozon"dur.'
  },

  // 3. ASİT YAĞMURLARI & NÖTR OKSİTLER (5 madde)
  {
    id: 'env-asit-sox',
    prompt: 'Kömür ve petrol gibi fosil yakıtların yanmasıyla oluşup havadaki su buharıyla H₂SO₄ (sülfürik asit) oluşturarak asit yağmuruna yol açan gazlar hangileridir?',
    promptSub: 'Asidik ametal oksitler (SOx)',
    answer: 'SO₂ ve SO₃ (Kükürt dioksit ve Kükürt trioksit)',
    distractors: ['CO ve NO', 'CH₄ ve N₂O', 'CFC ve O₃'],
    synonyms: ['SO2', 'SO3', 'SO2 ve SO3'],
    category: 'Asit Yağmurları & Nötr Oksitler',
    species: 'SO₂, SO₃ → H₂SO₄',
    impact: 'Asit yağmurları (pH < 5), solunum yolu tahrişi, toprak/göl asitleşmesi',
    examHighlight: 'Oksijence zengin ametal oksitler (SO₂, SO₃, NO₂) asidik oksittir; su ile tepkimeye girerek kuvvetli asit oluştururlar.'
  },
  {
    id: 'env-asit-no2',
    prompt: 'Motorlu taşıt egzozları ve termik santrallerde yüksek sıcaklıkta oluşup yağmur suyunda kezzap (HNO₃) meydana getiren kahverengi asit yağmuru gazı hangisidir?',
    promptSub: 'Azot oksit kaynaklı asit yağmuru',
    answer: 'Azot dioksit (NO₂)',
    distractors: ['Azot monoksit (NO)', 'Diazot monoksit (N₂O)', 'Karbonmonoksit (CO)'],
    synonyms: ['NO2', 'azot dioksit'],
    category: 'Asit Yağmurları & Nötr Oksitler',
    species: 'NO₂ → HNO₃',
    impact: 'Yağmurda nitrik asit (HNO₃) oluşturur; fotokimyasal sisin de bileşenidir',
    examHighlight: 'NO₂ asidik oksit iken, NO ve N₂O oksijen sayısı azot sayısından büyük olmadığı için NÖTR oksittir!'
  },
  {
    id: 'env-notr-oksit-tuzak',
    prompt: 'Aşağıdaki gazlardan hangileri NÖTR OKSİT oldukları için suyla doğrudan asit oluşturmaz ve ASİT YAĞMURU YAPMAZ?',
    promptSub: 'ÖSYM TYT/AYT EN BÜYÜK TUZAĞI',
    answer: 'CO, NO ve N₂O',
    distractors: ['SO₂, SO₃ ve NO₂', 'CO₂, SO₂ ve NO₂', 'SO₃, N₂O₅ ve P₂O₅'],
    synonyms: ['CO ve NO', 'CO, NO', 'CO, NO, N2O'],
    category: 'Asit Yağmurları & Nötr Oksitler',
    species: 'CO, NO, N₂O (Nötr oksitler)',
    impact: 'Suyla, asitlerle ve bazlarla tepkime vermezler',
    examHighlight: 'ALTIN KURAL: Ametale bağlı oksijen sayısı ametal sayısına eşit veya küçükse (CO, NO, N₂O) NÖTR OKSİTTİR ve asit yağmuru YAPMAZ! (En sık sorulan tuzak: CO)'
  },
  {
    id: 'env-asit-yikim',
    prompt: 'Normal yağmurun pH’ı ~5,6 iken pH < 5,0 olan asit yağmurları mermer ve kireç taşından (CaCO₃) yapılmış tarihi eserleri nasıl tahrip eder?',
    promptSub: 'Asit–karbonat tepkimesi ve ekolojik hasar',
    answer: 'CaCO₃ ile tepkimeye girip CO₂ çıkararak taşı eritir/aşındırır',
    distractors: [
      'CaCO₃ ile bazik tabaka oluşturup mermeri sertleştirir',
      'Yalnızca ozon tabakasını incelterek eserlere UV çarpmasına yol açar',
      'Suda çözünmeyen plastik tabaka oluşturur'
    ],
    category: 'Asit Yağmurları & Nötr Oksitler',
    species: 'H₂SO₄ / HNO₃ + CaCO₃',
    impact: 'Tarihi eser aşınması, metal korozyonu, toprakta Al³⁺ çözünmesi ve balık ölümleri',
    examHighlight: 'CaCO₃(k) + H₂SO₄ → CaSO₄ + H₂O + CO₂(g). Ayrıca metalleri (Fe, Zn vb.) aşındırarak H₂ gazı çıkarır.'
  },
  {
    id: 'env-co-zehirlenme',
    prompt: 'Kömür veya doğalgazın yetersiz oksijenle eksik yanması sonucu oluşan, kokusuz olduğu için "sessiz katil" denilen ve hemoglobine O₂’den ~250 kat sıkı bağlanan gaz hangisidir?',
    promptSub: 'Soba ve baca zehirlenmesi mekanizması',
    answer: 'Karbonmonoksit (CO)',
    distractors: ['Karbondioksit (CO₂)', 'Kükürt dioksit (SO₂)', 'Metan (CH₄)'],
    synonyms: ['CO', 'karbonmonoksit'],
    category: 'Asit Yağmurları & Nötr Oksitler',
    species: 'CO → Karboksihemoglobin (COHb)',
    impact: 'Kandaki oksijen taşınmasını bloke ederek boğulmaya (hipoksi) neden olur',
    examHighlight: 'CO nötr oksittir, asit yağmuru yapmaz; fakat hemoglobine geri dönüşümsüz bağlanarak ölümcül zehirlenmeye yol açar.'
  },

  // 4. SU SERTLİĞİ & ARITIM (6 madde)
  {
    id: 'env-sert-su-iyonlar',
    prompt: 'Suda sertliğe neden olan başlıca katyonlar hangileridir ve sert su içmek insan sağlığına zararlı mıdır?',
    promptSub: 'Sert su tanımı & ÖSYM sağlık tuzağı',
    answer: 'Ca²⁺ ve Mg²⁺ iyonları — Sağlığa zararlı değildir (mineral kaynağıdır)',
    distractors: [
      'Na⁺ ve K⁺ iyonları — Böbrek yetmezliği yapar, zehirlidir',
      'Ca²⁺ ve Mg²⁺ iyonları — İçilmesi zehirli ve kanserojendir',
      'Pb²⁺ ve Hg²⁺ iyonları — Sabunun köpürmesini artırır'
    ],
    category: 'Su Sertliği & Arıtım',
    species: 'Ca²⁺ ve Mg²⁺',
    impact: 'Sabun sarfiyatı artar, çaydanlık/rezistanslarda kireç taşı (CaCO₃) oluşturup enerji kaybına yol açar',
    examHighlight: 'ÖSYM TUZAĞI: Sert sular acımtırak lezzetli olsa da SAĞLIĞA ZARARLI DEĞİLDİR! Sorun yalnızca temizlikte sabun israfı ve tesisatta kireçlenmedir.'
  },
  {
    id: 'env-gecici-sertlik',
    prompt: 'Hangi iyon/bileşiklerden kaynaklanan su sertliğine "Geçici Sertlik" denir ve yalnızca KAYNATARAK giderilebilir mi?',
    promptSub: 'Bikarbonat sertliği',
    answer: 'HCO₃⁻ kaynaklıdır [Ca(HCO₃)₂, Mg(HCO₃)₂] — Evet, kaynatmakla giderilir',
    distractors: [
      'SO₄²⁻ ve Cl⁻ kaynaklıdır — Hayır, kaynatmakla giderilemez',
      'HCO₃⁻ kaynaklıdır — Hayır, yalnızca iyon değiştirici reçine gerekir',
      'Na⁺ ve CO₃²⁻ kaynaklıdır — Evet, soğutularak giderilir'
    ],
    category: 'Su Sertliği & Arıtım',
    species: 'Ca(HCO₃)₂, Mg(HCO₃)₂ (HCO₃⁻)',
    impact: 'Kaynatılınca Ca(HCO₃)₂ → CaCO₃(k)↓ + H₂O + CO₂(g) tepkimesiyle kireç dibe çöker',
    examHighlight: 'Geçici sertlik bikarbonat (HCO₃⁻) iyonundan kaynaklanır; ısıtıldığında çözünmeyen CaCO₃ çöker ve süzülünce su yumuşar.'
  },
  {
    id: 'env-kalici-sertlik',
    prompt: 'CaSO₄, MgSO₄, CaCl₂ gibi bileşiklerin yol açtığı KALICI SERTLİK neden kaynatmakla giderilemez ve hangi kimyasalla yumuşatılır?',
    promptSub: 'Sülfat ve klorür sertliği',
    answer: 'Sülfat/klorür tuzları ısıtmayla çökmez — Çamaşır sodası (Na₂CO₃) ile giderilir',
    distractors: [
      'Bikarbonat içerdiği için çökmez — Yemek tuzu (NaCl) ile giderilir',
      'Isıtılınca gaz olup uçar — Sadece süzme ile giderilir',
      'Sabunla tepkime vermediği için çökmez — Tuz ruhu (HCl) ile giderilir'
    ],
    category: 'Su Sertliği & Arıtım',
    species: 'CaSO₄, MgSO₄, CaCl₂, MgCl₂',
    impact: 'Kaynatma kalıcı sertliği gideremez; kimyasal çöktürme veya reçine şarttır',
    examHighlight: 'Kalıcı sertlikteki Ca²⁺ iyonları suya çamaşır sodası (Na₂CO₃) eklenerek CaCO₃ halinde çöktürülür veya iyon değiştirici reçineden geçirilir.'
  },
  {
    id: 'env-recine-ters-ozmoz',
    prompt: 'Ev tipi ve endüstriyel su yumuşatma cihazlarında sert sudaki Ca²⁺ ve Mg²⁺ iyonlarını yakalayıp yerine suya zararsız Na⁺ iyonu bırakan sistem nedir?',
    promptSub: 'Modern sertlik giderme teknolojisi',
    answer: 'İyon değiştirici reçine (Zeolit)',
    distractors: ['Koagülasyon (Şap ekleme)', 'Klorlama', 'Havalandırma (Aerasyon)'],
    synonyms: ['iyon degistirici recine', 'zeolit'],
    category: 'Su Sertliği & Arıtım',
    species: 'R–Na reçine (Ca²⁺ ↔ 2 Na⁺)',
    impact: 'Hem geçici hem kalıcı sertliği giderir; tuzlu su (NaCl) ile tazelenir',
    examHighlight: 'Ters ozmoz (Reverse Osmosis) ise yüksek basınçla suyu yarı geçirgen zardan geçirerek tüm tuz ve iyonları tutan bir diğer arıtma yöntemidir.'
  },
  {
    id: 'env-aritma-koagulasyon',
    prompt: 'Şehir içme suyu arıtımında suya şap [Al₂(SO₄)₃] eklenerek asılı duran kolloidal kil taneciklerinin çökeltilmesi ve sonrasında mikropların yok edilmesi aşamaları nelerdir?',
    promptSub: 'Şebeke suyu arıtım basamakları',
    answer: 'Koagülasyon (Pıhtılaştırma) ve Klorlama / Ozonlama (Dezenfeksiyon)',
    distractors: [
      'Ters ozmoz ve Sabunlaştırma',
      'Ayrımsal damıtma ve Elektroliz',
      'Ötrofikasyon ve Biyoakümülasyon'
    ],
    category: 'Su Sertliği & Arıtım',
    species: 'Şap [Al₂(SO₄)₃], Cl₂ / NaClO / O₃, Aktif karbon',
    impact: 'Ham su sırasıyla havalandırma → koagülasyon → çökeltme → süzme → dezenfeksiyon → aktif karbon adsorpsiyonundan geçer',
    examHighlight: 'Klorlama boru hattı boyunca kalıntı dezenfeksiyon sağlar; aktif karbon filtresi ise istenmeyen tat, koku ve organik kirleticileri adsorbe eder.'
  },
  {
    id: 'env-otofikasyon',
    prompt: 'Deterjanlardaki fosfat (PO₄³⁻) ve gübrelerdeki nitrat (NO₃⁻) iyonlarının göllere karışmasıyla oluşan alg patlaması, oksijen tükenmesi ve balık ölümleri sürecine ne denir?',
    promptSub: 'Sucul ekosistem çöküşü',
    answer: 'Ötrofikasyon',
    distractors: ['Biyoakümülasyon', 'Koagülasyon', 'Kriyoskopi'],
    synonyms: ['otrofikasyon'],
    category: 'Su Sertliği & Arıtım',
    species: 'PO₄³⁻ ve NO₃⁻ fazlalığı → BOİ artışı, O₂ tükenmesi',
    impact: 'Güneş ışığı kesilir, ayrıştırıcı bakteriler sudaki çözünmüş O₂’yi tüketir, göl bataklığa döner',
    examHighlight: 'ÖSYM KLASİĞİ: Ötrofikasyonda temel tetikleyici ikili deterjanlardaki FOSFAT ve tarım gübrelerindeki NİTRAT iyonlarıdır.'
  },

  // 5. SU VE TOPRAK KİRLETİCİLERİ (6 madde)
  {
    id: 'env-agir-hg',
    prompt: 'Oda koşullarında sıvı olan, floresan lamba ve pillerde bulunan, sularda metilcıva halinde balıklarda birikerek Minamata sinir hastalığına yol açan ağır metal hangisidir?',
    promptSub: 'Su ve besin zinciri ağır metali',
    answer: 'Cıva (Hg)',
    distractors: ['Kurşun (Pb)', 'Kadmiyum (Cd)', 'Krom (Cr)'],
    synonyms: ['Hg', 'civa'],
    category: 'Su ve Toprak Kirleticileri',
    species: 'Hg (Cıva)',
    impact: 'Merkezi sinir sistemi, beyin ve böbrek hasarı; yüksek biyobirikim',
    examHighlight: 'Cıva suda bakterilerce metilcıvaya dönüşür ve balık yiyen canlıların sinir sisteminde geri dönüşümsüz hasar bırakır.'
  },
  {
    id: 'env-agir-pb',
    prompt: 'Akülerde, eski tip benzinlerde ve boyalarda bulunan; çocuklarda öğrenme güçlüğü/zeka geriliğine ve kanda hemoglobin sentezini bozarak anemiye yol açan ağır metal hangisidir?',
    promptSub: 'Akü ve endüstriyel ağır metal kirletici',
    answer: 'Kurşun (Pb)',
    distractors: ['Cıva (Hg)', 'Kadmiyum (Cd)', 'Magnezyum (Mg)'],
    synonyms: ['Pb', 'kursun'],
    category: 'Su ve Toprak Kirleticileri',
    species: 'Pb (Kurşun)',
    impact: 'Sinir sistemi hasarı, kansızlık (anemi), böbrek yetmezliği',
    examHighlight: 'Kurşunlu akü atıklarının toprağa ve suya sızması en tehlikeli kurşun kirliliği kaynaklarındandır.'
  },
  {
    id: 'env-agir-cd-cr',
    prompt: 'Ni–Cd pillerde ve sigara dumanında bulunup kemik erimesine (Itai–Itai hastalığı) yol açan ağır metal ile deri tabaklamada kullanılan kanserojen Cr(VI) hangi gruptadır?',
    promptSub: 'Piller ve sanayi atığı ağır metalleri',
    answer: 'Kadmiyum (Cd) ve Krom(VI) — Ağır metaller',
    distractors: [
      'Sodyum (Na) ve Potasyum (K) — Alkali metaller',
      'Kalsiyum (Ca) ve Magnezyum (Mg) — Sertlik iyonları',
      'Azot (N) ve Fosfor (P) — Ötrofikasyon elementleri'
    ],
    category: 'Su ve Toprak Kirleticileri',
    species: 'Cd (Kadmiyum), Cr(VI), As (Arsenik)',
    impact: 'Kemik kırılganlığı, böbrek hasarı, DNA hasarı ve kanser riski',
    examHighlight: 'Ağır metaller (Hg, Pb, Cd, Cr, As) doğada parçalanmaz ve canlı dokularından atılamaz.'
  },
  {
    id: 'env-biyoakumulasyon',
    prompt: 'Ağır metallerin (Hg, Pb, Cd) ve kalıcı tarım ilaçlarının (DDT) doğada parçalanamayıp besin zincirinin üst basamaklarına çıkıldıkça dokularda katlanarak artması nedir?',
    promptSub: 'Ekolojik toksisite kavramı',
    answer: 'Biyoakümülasyon (Biyobirikim)',
    distractors: ['Ötrofikasyon', 'Flotasyon', 'Pastörizasyon'],
    synonyms: ['biyoakumulasyon', 'biyobirikim'],
    category: 'Su ve Toprak Kirleticileri',
    species: 'Hg, Pb, Cd, DDT',
    impact: 'Besin piramidinin en tepesindeki yırtıcı canlılar ve insanlarda en yüksek zehir derişimine ulaşır',
    examHighlight: 'ÖSYM AYRIMI: Gübre/fosfat fazlalığıyla alg patlaması → Ötrofikasyon; ağır metal/pestisitlerin besin zincirinde birikmesi → Biyoakümülasyon.'
  },
  {
    id: 'env-plastik-mikroplastik',
    prompt: 'Sentetik plastiklerin toprak ve su kirliliğindeki en kritik uzun vadeli sorunu nedir ve yakılarak yok edilmeye çalışıldığında ne risk oluşur?',
    promptSub: 'Polimer kirliliği ve mikroplastikler',
    answer: 'Yüzlerce yıl bozunmaz, <5 mm mikroplastik olur; yakılınca zehirli gazlar (HCl, CO, dioksin) çıkar',
    distractors: [
      'Birkaç haftada bakterilerce çözünür; yalnızca su sertliğini artırır',
      'Toprağı nötralleştirerek bitki verimini kalıcı olarak yükseltir',
      'Yakıldığında yalnızca zararsız su buharı ve oksijen üretir'
    ],
    category: 'Su ve Toprak Kirleticileri',
    species: 'Mikroplastikler (< 5 mm), Ftalat, BPA',
    impact: 'Mikroplastikler sucul canlıların sindirimine ve insan besin zincirine girer; endokrin bozucu etki yapar',
    examHighlight: 'Plastik atıkları yakmak çözüm değildir; özellikle PVC gibi klorlu plastikler yakıldığında ölümcül dioksin ve HCl gazı salar. Geri dönüşüm esastır.'
  },
  {
    id: 'env-piller',
    prompt: 'Bitmiş pillerin evsel çöplere veya doğaya atılmasının kesinlikle yasak olmasının ve özel atık pil kutularında toplanmasının temel kimyasal sebebi nedir?',
    promptSub: 'Tehlikeli atık yönetimi',
    answer: 'İçerdikleri ağır metaller (Hg, Pb, Cd, Li) ve asidik/bazik elektrolitlerin su ve toprağı zehirlemesi',
    distractors: [
      'İçlerindeki su buharının küresel ısınmayı başlatması',
      'Çöp kutularında yalnızca CO₂ gazı oluşturması',
      'İçerdikleri Ca²⁺ iyonlarının geçici su sertliğini artırması'
    ],
    category: 'Su ve Toprak Kirleticileri',
    species: 'Hg, Pb, Cd, Ni, Li içeren pil elektrolitleri',
    impact: 'Tek bir kalem pil dahi metrekarelerce toprağı ve yeraltı suyunu uzun yıllar kirletebilir',
    examHighlight: 'Piller ağır metal ve toksik kimyasal içerdiğinden evsel atıktan ayrı toplanıp geri dönüşüme gönderilmelidir.'
  }
];

export function environmentalChemistryToQuizItem(item: EnvironmentalChemistryItem): StandardQuizItem {
  return {
    id: item.id,
    prompt: item.prompt,
    promptSub: item.promptSub,
    answer: item.answer,
    distractors: item.distractors,
    synonyms: item.synonyms,
    category: item.category,
    infoChips: [
      { label: 'Kategori', value: item.category },
      { label: 'Kimyasal Tür', value: item.species },
      { label: 'Çevresel Etki', value: item.impact },
      { label: 'ÖSYM Notu', value: item.examHighlight }
    ],
    hint: item.examHighlight
  };
}
