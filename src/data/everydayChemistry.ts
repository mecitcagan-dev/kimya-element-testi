import { StandardQuizItem } from '../types/topics';

export type EverydayChemistryCategory =
  | 'Polimerler'
  | 'Sabun ve Deterjan'
  | 'Hijyen ve Temizlik'
  | 'Gıda ve Yağlar'
  | 'İlaç Formları';

export interface EverydayChemistryItem {
  id: string;
  prompt: string;
  promptSub: string;
  answer: string;
  distractors: [string, string, string];
  synonyms?: string[];
  category: EverydayChemistryCategory;
  keyFact: string;
  chemicalDetail: string;
  examHighlight: string;
}

export const EVERYDAY_CHEMISTRY: EverydayChemistryItem[] = [
  // 1. POLİMERLER (8 madde)
  {
    id: 'ev-poly-pe',
    prompt: 'Etilen (CH₂=CH₂) monomerinin katılma polimerleşmesiyle üretilen, poşet, oyuncak, çöp torbası ve boru yapımında kullanılan polimer hangisidir?',
    promptSub: 'En yaygın sentetik katılma polimeri',
    answer: 'Polietilen (PE)',
    distractors: ['Polietilen tereftalat (PET)', 'Polivinil klorür (PVC)', 'Polistiren (PS)'],
    synonyms: ['PE', 'polietilen'],
    category: 'Polimerler',
    keyFact: 'LDPE (poşet, streç film) ve HDPE (oyuncak, deterjan şişesi, boru)',
    chemicalDetail: 'Monomer: Etilen (CH₂=CH₂) | Tür: Katılma | Kod: 2 ve 4',
    examHighlight: 'Monomeri en basit alken olan etilendir; çift bağın açılmasıyla oluşan katılma polimeridir.'
  },
  {
    id: 'ev-poly-pet',
    prompt: 'Su ve meşrubat şişelerinin üretiminde kullanılan, tereftalik asit ile etilen glikolün kondenzasyon polimeri hangisidir?',
    promptSub: 'İçecek şişesi & polyester lif polimeri',
    answer: 'Polietilen tereftalat (PET)',
    distractors: ['Polietilen (PE)', 'Polipropilen (PP)', 'Polistiren (PS)'],
    synonyms: ['PET', 'PETE', 'polietilen tereftalat'],
    category: 'Polimerler',
    keyFact: 'Su/meşrubat şişeleri, sentetik tekstil elyafı (polar kumaş), geri dönüşüm kodu 1',
    chemicalDetail: 'Monomer: Tereftalik asit + Etilen glikol | Tür: Kondenzasyon (H₂O çıkar)',
    examHighlight: 'ÖSYM AYRIMI: PE katılma polimeri iken, PET ester bağıyla oluşan bir KONDENZASYON polimeridir.'
  },
  {
    id: 'ev-poly-pvc',
    prompt: 'Kapı–pencere profilleri, tesisat boruları ve elektrik kablo kaplamalarında kullanılan, kloroeten (vinil klorür) monomerli polimer hangisidir?',
    promptSub: 'Aleve dirençli yapı polimeri',
    answer: 'Polivinil klorür (PVC)',
    distractors: ['Polietilen (PE)', 'Polistiren (PS)', 'Politetrafloroetilen (PTFE)'],
    synonyms: ['PVC', 'polivinil klorur'],
    category: 'Polimerler',
    keyFact: 'Pencere profili, su borusu, kablo yalıtımı, tıbbi kan torbası',
    chemicalDetail: 'Monomer: Vinil klorür (CH₂=CHCl) | Tür: Katılma | Kod: 3',
    examHighlight: 'Yapısındaki klor atomu sayesinde kendiliğinden alev almaz; ancak yakıldığında zehirli HCl ve dioksin gazı açığa çıkar.'
  },
  {
    id: 'ev-poly-ptfe',
    prompt: 'Yanmaz–yapışmaz tava ve tencere kaplamalarında kullanılan Teflon polimerinin kimyasal adı ve monomeri nedir?',
    promptSub: 'Sürtünmesi en düşük, ısıya ve kimyasallara inert polimer',
    answer: 'Politetrafloroetilen (PTFE) — Tetrafloroeten (CF₂=CF₂)',
    distractors: [
      'Polivinil klorür (PVC) — Vinil klorür',
      'Polistiren (PS) — Stiren',
      'Polipropilen (PP) — Propen'
    ],
    synonyms: ['PTFE', 'teflon', 'politetrafloroetilen'],
    category: 'Polimerler',
    keyFact: 'Yanmaz–yapışmaz tava/tencere, kimyasal conta, Gore-Tex membran',
    chemicalDetail: 'Monomer: CF₂=CF₂ | Tür: Katılma Polimeri',
    examHighlight: 'ÖSYM TUZAĞI: Teflon (PTFE) kondenzasyon değil, tetrafloroetenin ikili bağının açıldığı bir KATILMA polimeridir. C–F bağları çok sağlamdır.'
  },
  {
    id: 'ev-poly-ps',
    prompt: 'Tek kullanımlık köpük bardak–tabak, yumurta viyolü ve binalarda strafor ısı yalıtım köpüğü olarak kullanılan polimer hangisidir?',
    promptSub: 'Stiren (fenileten) monomerli köpük polimer',
    answer: 'Polistiren (PS)',
    distractors: ['Polipropilen (PP)', 'Polietilen tereftalat (PET)', 'Polivinil klorür (PVC)'],
    synonyms: ['PS', 'polistiren', 'strafor'],
    category: 'Polimerler',
    keyFact: 'Tek kullanımlık bardak/tabak, strafor ısı yalıtımı, ambalaj köpüğü',
    chemicalDetail: 'Monomer: Stiren (CH₂=CH–C₆H₅) | Tür: Katılma | Kod: 6',
    examHighlight: 'İçine gaz enjekte edilerek genleştirildiğinde hafif ısı yalıtım köpüğü (strafor / EPS) halini alır.'
  },
  {
    id: 'ev-poly-kevlar',
    prompt: 'Kurşun geçirmez yelek, askeri miğfer, kesilmez eldiven ve yanmaz itfaiye giysisi yapımında kullanılan, çelikten ~5 kat dayanıklı polimer hangisidir?',
    promptSub: 'Yüksek mukavemetli aromatik poliamit (aramid)',
    answer: 'Kevlar',
    distractors: ['Teflon (PTFE)', 'Polipropilen (PP)', 'Kauçuk'],
    synonyms: ['kevlar'],
    category: 'Polimerler',
    keyFact: 'Kurşun geçirmez yelek, halat, uçak gövdesi, itfaiyeci kıyafeti',
    chemicalDetail: 'Monomer: Diamin + Diklorür | Tür: Kondenzasyon (HCl çıkar)',
    examHighlight: 'Zincirler arası yoğun hidrojen bağları sayesinde olağanüstü çekme dayanımına sahiptir; kondenzasyon polimerleşmesiyle üretilir.'
  },
  {
    id: 'ev-poly-kaucuk',
    prompt: 'Araç lastiği, ayakkabı tabanı, conta ve eldiven yapımında kullanılan, izopren monomerinden oluşan elastik polimer hangisidir?',
    promptSub: 'Doğal veya sentetik elastik polimer',
    answer: 'Kauçuk (Poliizopren)',
    distractors: ['Kevlar', 'Polietilen (PE)', 'Polistiren (PS)'],
    synonyms: ['kaucuk', 'poliizopren'],
    category: 'Polimerler',
    keyFact: 'Araç lastiği, silgi, esnek hortum ve conta',
    chemicalDetail: 'Monomer: İzopren | Tür: Katılma | Kükürtle vulkanizasyon yapılır',
    examHighlight: 'Ham doğal kauçuk sıcakta yumuşayıp soğukta sertleşir; kükürtle ısıtma (vulkanizasyon) işlemi kauçuğa dayanıklı elastikiyet kazandırır.'
  },
  {
    id: 'ev-poly-pp',
    prompt: 'Şişe kapakları, mikrodalga fırına dayanıklı saklama kapları, cerrahi maskeler ve oto tamponlarında kullanılan yüksek erime noktalı polimer hangisidir?',
    promptSub: 'Bükülme/yorulma direnci yüksek katılma polimeri',
    answer: 'Polipropilen (PP)',
    distractors: ['Polietilen tereftalat (PET)', 'Polistiren (PS)', 'Polivinil klorür (PVC)'],
    synonyms: ['PP', 'polipropilen'],
    category: 'Polimerler',
    keyFact: 'Şişe kapakları, mikrodalga kapları, halat, tek kullanımlık şırınga/maske',
    chemicalDetail: 'Monomer: Propen (CH₂=CH–CH₃) | Tür: Katılma | Kod: 5',
    examHighlight: 'Erime noktası (~160 °C) yüksek olduğundan sıcak gıdalarla ve bulaşık makinesiyle uyumludur.'
  },

  // 2. SABUN VE DETERJAN (5 madde)
  {
    id: 'ev-beyaz-sabun',
    prompt: 'Bitkisel veya hayvansal yağların SODYUM HİDROKSİT (NaOH / sud kostik) ile tepkimesinden elde edilen sert kalıp sabun hangisidir?',
    promptSub: 'Yağ asidinin sodyum tuzu',
    answer: 'Beyaz Sabun (Sert Sabun — C₁₇H₃₅COONa)',
    distractors: [
      'Arap Sabunu (Yumuşak Sabun — C₁₇H₃₅COOK)',
      'Sentetik Deterjan (Sodyum lauril sülfat)',
      'Çamaşır Sodası (Na₂CO₃)'
    ],
    synonyms: ['beyaz sabun', 'sert sabun', 'sodyum stearat'],
    category: 'Sabun ve Deterjan',
    keyFact: 'Yağ + NaOH → Gliserin + 3 Beyaz Sabun',
    chemicalDetail: 'Sodyum stearat / palmitat (katı kalıp, el-vücut temizliği)',
    examHighlight: 'ÖSYM TUZAĞI: NaOH (sodyum) SERT/beyaz sabunu, KOH (potasyum) ise YUMUŞAK/Arap sabunu verir!'
  },
  {
    id: 'ev-arap-sabunu',
    prompt: 'Yağların POTASYUM HİDROKSİT (KOH / potas kostik) ile sabunlaşması sonucu oluşan, suda daha hızlı çözünen yumuşak/jel sabun hangisidir?',
    promptSub: 'Yağ asidinin potasyum tuzu',
    answer: 'Arap Sabunu (Yumuşak Sabun — C₁₇H₃₅COOK)',
    distractors: [
      'Beyaz Sabun (Sert Sabun — C₁₇H₃₅COONa)',
      'Sodyum Dodesil Benzen Sülfonat (Deterjan)',
      'Sodyum Hipoklorit (NaClO)'
    ],
    synonyms: ['arap sabunu', 'yumusak sabun', 'potasyum stearat'],
    category: 'Sabun ve Deterjan',
    keyFact: 'Yağ + KOH → Gliserin + 3 Arap Sabunu',
    chemicalDetail: 'Potasyum stearat (macunsu/sıvı, ahşap/halı/zemin temizliği)',
    examHighlight: 'Arap sabunu beyaz sabuna göre suda daha kolay çözünür ve sıvı/jel el sabunlarının da temelini oluşturur.'
  },
  {
    id: 'ev-sabun-sert-su',
    prompt: 'Sabunun sert sularda (Ca²⁺ ve Mg²⁺ içeren) köpürmeyip çökelek oluşturmasına karşılık doğaya etkisinin az olmasının temel nedeni nedir?',
    promptSub: 'Sabun vs Deterjan karşılaştırması',
    answer: 'Yağ asidi tuzu olması (Ca/Mg ile çöker ama biyobozunurdur)',
    distractors: [
      'Petrol türevi sülfonat içermesi (sert suda çöker, doğada parçalanmaz)',
      'Yapısında benzen halkası bulundurması',
      'Fosfat katkısı sayesinde ötrofikasyon yapması'
    ],
    category: 'Sabun ve Deterjan',
    keyFact: 'Doğal yağ kaynaklıdır, biyobozunur; fakat sert suda kalsiyum stearat çökeltisi yapar',
    chemicalDetail: '2 R–COO⁻ + Ca²⁺ → (R–COO)₂Ca(k) ↓ (sabun taşı)',
    examHighlight: 'Sabun doğal ve biyobozunur olduğu için çevre dostudur, cildi daha az tahriş eder; ancak sert ve soğuk sularda verimi düşer.'
  },
  {
    id: 'ev-deterjan',
    prompt: 'Petrol türevlerinden üretilen, yapısında sülfat (–OSO₃⁻) veya sülfonat (–SO₃⁻) grubu taşıyan ve SERT/SOĞUK sularda bile iyi köpüren temizlik maddesi hangisidir?',
    promptSub: 'Sentetik yüzey aktif temizleyici',
    answer: 'Deterjan',
    distractors: ['Beyaz Sabun', 'Arap Sabunu', 'Kireç Kaymağı'],
    synonyms: ['deterjan', 'sentetik deterjan'],
    category: 'Sabun ve Deterjan',
    keyFact: 'Sert sularda Ca²⁺/Mg²⁺ ile çökmez; soğuk suda da etkilidir; çevre kirliliği yapar',
    chemicalDetail: 'Sodyum lauril sülfat (SLS) / Alkil benzen sülfonat (SDBS)',
    examHighlight: 'Deterjanlar benzen halkası nedeniyle biyolojik olarak zor parçalanır ve içerdikleri fosfat katkıları göllerde ötrofikasyona yol açar.'
  },
  {
    id: 'ev-hidrofil-hidrofob',
    prompt: 'Sabun ve deterjan moleküllerinin temizleme mekanizmasında KİRE ve SUYA tutunan kısımlar aşağıdakilerden hangisidir?',
    promptSub: 'Amfifilik molekül yapısı (ÖSYM TYT klasiği)',
    answer: 'Hidrofob (apolar) kuyruk kire; Hidrofil (polar) baş suya tutunur',
    distractors: [
      'Hidrofil (polar) baş kire; Hidrofob (apolar) kuyruk suya tutunur',
      'Hem baş hem kuyruk apolar olduğu için yalnızca kire tutunur',
      'Kireç iyonları kire, sodyum iyonları yağa kovalent bağlanır'
    ],
    category: 'Sabun ve Deterjan',
    keyFact: 'Apolar hidrokarbon kuyruk → Yağlı kir (London) | Polar iyonik baş → Su (İyon-dipol/H bağı)',
    chemicalDetail: 'Kir etrafında küresel misel oluşumu ile emülsiyonlaşma',
    examHighlight: 'KODLAMA: "Kuyruk Kire (Hidrofob/Apolar)", "Baş Banyo Suyuna (Hidrofil/Polar)". Öğrencilerin en sık ters çevirdiği TYT sorusudur.'
  },

  // 3. HİJYEN VE TEMİZLİK (4 madde)
  {
    id: 'ev-camasir-suyu',
    prompt: 'Kuvvetli bazik ve yükseltgen özelliği sayesinde beyazlatma (ağartma) ve dezenfeksiyon amacıyla kullanılan çamaşır suyunun formülü nedir?',
    promptSub: 'Yaygın evsel ağartıcı ve dezenfektan',
    answer: 'Sodyum hipoklorit (NaClO)',
    distractors: ['Kalsiyum hipoklorit [Ca(ClO)₂]', 'Sodyum karbonat (Na₂CO₃)', 'Sodyum bikarbonat (NaHCO₃)'],
    synonyms: ['NaClO', 'NaOCl', 'sodyum hipoklorit', 'camasir suyu'],
    category: 'Hijyen ve Temizlik',
    keyFact: 'Renkli lekelerin çift bağlarını yükseltgeyerek ağartır, mikropları öldürür',
    chemicalDetail: 'Formül: NaClO | Sulu çözeltisi kuvvetli BAZİKTİR (pH ≈ 11–13)',
    examHighlight: 'Çamaşır suyu renkli giysilerin rengini soldurur ve yalnızca dezenfeksiyon/ağartma gereken yüzeylerde tek başına kullanılmalıdır.'
  },
  {
    id: 'ev-camasir-tuzruhu-tuzak',
    prompt: 'Çamaşır suyu (NaClO) ile Tuz ruhu (HCl) temizlik sırasında karıştırıldığında açığa çıkan ölümcül zehirli gaz hangisidir?',
    promptSub: 'ÖSYM TYT hayati güvenlik sorusu',
    answer: 'Klor gazı (Cl₂)',
    distractors: ['Karbonmonoksit (CO)', 'Kükürt dioksit (SO₂)', 'Amonyak gazı (NH₃)'],
    synonyms: ['Cl2', 'klor', 'klor gazi'],
    category: 'Hijyen ve Temizlik',
    keyFact: 'NaClO + 2 HCl → NaCl + Cl₂(g) ↑ + H₂O',
    chemicalDetail: 'Sarı-yeşil keskin kokulu boğucu gaz',
    examHighlight: 'Çamaşır suyu bazik, tuz ruhu asidiktir; kesinlikle nötralleşip zararsız hale gelmezler, aksine solunum yollarını yakan zehirli Cl₂ gazı çıkar!'
  },
  {
    id: 'ev-kirec-kaymagi',
    prompt: 'Sönmüş kireçten [Ca(OH)₂] klor gazı geçirilerek üretilen, yüzme havuzlarının ve meyve-sebzelerin dezenfeksiyonunda kullanılan katı madde hangisidir?',
    promptSub: 'Granül/tablet formdaki klorlu dezenfektan',
    answer: 'Kireç kaymağı — Ca(ClO)₂ (Kalsiyum hipoklorit)',
    distractors: [
      'Çamaşır suyu — NaClO (Sodyum hipoklorit)',
      'Çamaşır sodası — Na₂CO₃ (Sodyum karbonat)',
      'Sönmemiş kireç — CaO (Kalsiyum oksit)'
    ],
    synonyms: ['Ca(ClO)2', 'kirec kaymagi', 'kalsiyum hipoklorit'],
    category: 'Hijyen ve Temizlik',
    keyFact: 'Havuz suyu klorlama, içme suyu ve gıda yüzey hijyeni',
    chemicalDetail: 'Formül: Ca(ClO)₂ (veya CaOCl₂) | Katı beyaz toz/tablet',
    examHighlight: 'Çamaşır suyu NaClO sıvı çözelti iken; kireç kaymağı Ca(ClO)₂ katı toz/tablet haldedir ve özellikle havuzlarda kullanılır.'
  },
  {
    id: 'ev-camasir-sodasi',
    prompt: 'Sert sulardaki Ca²⁺ ve Mg²⁺ iyonlarını karbonat halinde çöktürerek suyu yumuşatan ve temizliğe yardımcı olan bazik tuz hangisidir?',
    promptSub: 'Su yumuşatıcı temizlik maddesi',
    answer: 'Çamaşır sodası — Na₂CO₃ (Sodyum karbonat)',
    distractors: [
      'Yemek sodası — NaHCO₃ (Sodyum bikarbonat)',
      'Çamaşır suyu — NaClO (Sodyum hipoklorit)',
      'Sud kostik — NaOH (Sodyum hidroksit)'
    ],
    synonyms: ['Na2CO3', 'camasir sodasi', 'sodyum karbonat'],
    category: 'Hijyen ve Temizlik',
    keyFact: 'Kalıcı sertlikteki Ca²⁺ iyonunu CaCO₃ şeklinde çöktürerek sabunun köpürmesini sağlar',
    chemicalDetail: 'Ca²⁺(suda) + Na₂CO₃(suda) → CaCO₃(k) ↓ + 2 Na⁺(suda)',
    examHighlight: 'Çamaşır sodası (Na₂CO₃) ile yemek sodasını (NaHCO₃) karıştırmayın; çamaşır sodası yağ çözücü ve sertlik giderici olarak kullanılır.'
  },

  // 4. GIDA VE YAĞLAR (6 madde)
  {
    id: 'ev-pastorizasyon',
    prompt: 'Sütün yaklaşık 72–75 °C’de 15–20 saniye ısıtılıp hızla soğutulmasıyla yalnızca hastalık yapıcı bakterilerin öldürüldüğü, buzdolabında 3–5 gün dayanan işlem nedir?',
    promptSub: 'Günlük süt koruma yöntemi',
    answer: 'Pastörizasyon',
    distractors: ['UHT (Ultra Yüksek Sıcaklık)', 'Liyofilizasyon (Dondurarak kurutma)', 'Hidrojenasyon'],
    synonyms: ['pastorizasyon'],
    category: 'Gıda ve Yağlar',
    keyFact: '72–75 °C (15–20 sn) → Besin değeri ve doğal tat büyük ölçüde korunur',
    chemicalDetail: 'Sporlar tamamen ölmediği için buzdolabında saklanmalıdır',
    examHighlight: 'Pastörizasyonda yararlı bakterilerin bir kısmı kalabilir ve vitamin kaybı çok azdır; raf ömrü kısadır (günlük süt).'
  },
  {
    id: 'ev-uht',
    prompt: 'Sütün 135–150 °C’de 2–5 saniye gibi çok kısa sürede ısıtılarak tüm mikroorganizma ve sporların yok edildiği, oda sıcaklığında aylarca saklanabilen yöntem nedir?',
    promptSub: 'Uzun ömürlü süt sterilizasyonu',
    answer: 'UHT (Ultra High Temperature)',
    distractors: ['Pastörizasyon', 'Fermantasyon', 'Ekstraksiyon'],
    synonyms: ['UHT', 'ultra high temperature'],
    category: 'Gıda ve Yağlar',
    keyFact: '135–150 °C (2–5 sn) → Tam sterilizasyon, açılmadan oda sıcaklığında 4–6 ay dayanır',
    chemicalDetail: 'Yüksek ısı nedeniyle besin/vitamin kaybı pastörizasyona göre biraz daha fazladır',
    examHighlight: 'ÖSYM KARŞILAŞTIRMASI: Pastörizasyon (72 °C, soğuk zincir, kısa raf ömrü) vs UHT (140 °C, oda sıcaklığı, uzun raf ömrü).'
  },
  {
    id: 'ev-emulgator',
    prompt: 'Mayonez, dondurma veya krem gibi gıda ve kozmetiklerde su ile yağ fazlarının birbirinden ayrılmasını önleyip homojen görünüm sağlayan katkı maddesi nedir?',
    promptSub: 'Faz ayrışmasını önleyici katkı',
    answer: 'Emülgatör (Emülsiyonlaştırıcı)',
    distractors: ['Antioksidan', 'Koruyucu (Antimikrobiyal)', 'Tatlandırıcı'],
    synonyms: ['emulgator', 'emulsiyonlastirici'],
    category: 'Gıda ve Yağlar',
    keyFact: 'Su ve yağ damlacıklarını bir arada tutar (örn. yumurta sarısındaki lesitin)',
    chemicalDetail: 'Hem polar (suyu seven) hem apolar (yağı seven) uçlar içerir',
    examHighlight: 'TYT 2023 kazanımı: Mayonezdeki sirke (su bazlı) ve sıvı yağın ayrılmamasını yumurta sarısındaki doğal emülgatör lesitin sağlar.'
  },
  {
    id: 'ev-koruyucu-antioksidan',
    prompt: 'Hazır gıdalarda yağların havadaki O₂ ile acılaşmasını önleyen katkı ile mikroorganizma üremesini engelleyen katkı ikilisi sırasıyla hangileridir?',
    promptSub: 'Gıda katkı maddelerinin görev ayrımı',
    answer: 'Antioksidan (O₂/acılaşma önleyici) — Koruyucu (Mikrop/küf önleyici)',
    distractors: [
      'Emülgatör (O₂ önleyici) — Renklendirici (Mikrop önleyici)',
      'Koruyucu (O₂ önleyici) — Emülgatör (Mikrop önleyici)',
      'Stabilizör (O₂ önleyici) — Lezzet artırıcı (Mikrop önleyici)'
    ],
    category: 'Gıda ve Yağlar',
    keyFact: 'Antioksidan: C vit., E vit., BHA/BHT | Koruyucu: Sodyum benzoat, potasyum sorbat, nitrit',
    chemicalDetail: 'Antioksidan oksidasyonu durdurur; koruyucu raf ömrünü mikrobiyolojik bozulmaya karşı uzatır',
    examHighlight: 'Sınavda karıştırılan ayrım: Hava ile bozulma/acılaşma → Antioksidan; bakteri/küf/mantar üremesi → Koruyucu.'
  },
  {
    id: 'ev-zeytinyagi',
    prompt: 'Isıl ve kimyasal işlem görmeden yalnızca mekanik soğuk sıkımla üretilen, serbest asitliği %0,8’in altındaki en kaliteli zeytinyağı ile rafine+sızma karışımı yağlar hangileridir?',
    promptSub: 'Zeytinyağı sınıflandırması',
    answer: 'Naturel Sızma (en saf) — Riviera (Rafine + Sızma harmanı)',
    distractors: [
      'Riviera (en saf) — Naturel Sızma (Rafine + Sızma harmanı)',
      'Rafine (en saf) — Margarin (Soğuk sıkım harmanı)',
      'Winterize yağ (en saf) — Naturel Sızma (Kimyasal harman)'
    ],
    category: 'Gıda ve Yağlar',
    keyFact: 'Sızma: salata/çiğ tüketim | Rafine: asit ve kokusu kimyasalla giderilmiş | Riviera: yemek ve kızartma',
    chemicalDetail: 'Riviera ≈ %80–90 Rafine + %10–20 Naturel Sızma zeytinyağı',
    examHighlight: 'ÖSYM TUZAĞI: Riviera en saf yağ DEĞİLDİR! En saf ve işlenmemiş olan Naturel Sızma zeytinyağıdır; Riviera bir karışımdır.'
  },
  {
    id: 'ev-margarin',
    prompt: 'Doymamış bitkisel sıvı yağların katalizör eşliğinde hidrojen gazı (H₂) ile doyurulması sonucu elde edilen katı yağ hangisidir?',
    promptSub: 'Hidrojenasyon tepkimesi ürünü',
    answer: 'Margarin',
    distractors: ['Tereyağı', 'Riviera zeytinyağı', 'Gliserin'],
    synonyms: ['margarin'],
    category: 'Gıda ve Yağlar',
    keyFact: 'Sıvı yağ + H₂ (Ni katalizörü) → Margarin (Katı yağ)',
    chemicalDetail: 'Kısmi hidrojenasyonda sağlık için zararlı TRANS yağlar oluşabilir',
    examHighlight: 'Tereyağı hayvansal sütten doğal yolla elde edilirken; margarin bitkisel sıvı yağların çift bağlarının hidrojenle doyurulmasıyla üretilir.'
  },

  // 5. İLAÇ FORMLARI (3 madde)
  {
    id: 'ev-ilac-igne',
    prompt: 'Etken maddenin doğrudan kana veya dokuya verilmesi nedeniyle vücutta emilimi ve tedavi edici etkisi EN HIZLI olan sıvı ilaç formu hangisidir?',
    promptSub: 'Parenteral steril ilaç formu',
    answer: 'İğne (Ampul / Enjeksiyon)',
    distractors: ['Şurup', 'Tablet (Hap)', 'Merhem'],
    synonyms: ['igne', 'ampul', 'enjeksiyon'],
    category: 'İlaç Formları',
    keyFact: 'Damar içi (IV) veya kas içi (IM) uygulanır; sindirim sistemine uğramaz',
    chemicalDetail: 'Kesinlikle steril ve izotonik çözelti olmalıdır',
    examHighlight: 'Ağızdan alınan hap ve şuruplar sindirim yolundan emilirken, iğne (ampul) doğrudan dolaşıma geçtiği için etkisi en hızlıdır.'
  },
  {
    id: 'ev-ilac-surup-suspansiyon',
    prompt: 'Yüksek şeker oranı (%60+) sayesinde doğal koruyuculuk kazanan sıvı ilaç formu ile kullanılmadan önce MUTLAKA çalkalanması gereken heterojen sıvı form hangileridir?',
    promptSub: 'Şurup vs Süspansiyon farkı',
    answer: 'Şurup (Homojen çözelti) — Süspansiyon (Çalkalanmalı heterojen)',
    distractors: [
      'Süspansiyon (Homojen çözelti) — Şurup (Çalkalanmalı heterojen)',
      'Damla (Homojen çözelti) — Tablet (Çalkalanmalı heterojen)',
      'Merhem (Homojen çözelti) — Ampul (Çalkalanmalı heterojen)'
    ],
    category: 'İlaç Formları',
    keyFact: 'Şuruptaki yoğun şeker ozmotik basınçla bakteri üremesini engeller',
    chemicalDetail: 'Süspansiyonda çözünmeyen katı etken madde dibe çöker',
    examHighlight: 'Süspansiyon formundaki antibiyotik ve ateş düşürücüler çalkalanmazsa her kaşıkta eşit doz alınamaz.'
  },
  {
    id: 'ev-ilac-hap-merhem',
    prompt: 'Acı tadı gizlemek için şekerle kaplanmış katı ilaç formu ile cilt yüzeyinde yağ bazlı koruyucu tabaka oluşturan yarı katı form hangileridir?',
    promptSub: 'Katı (Draje/Kapsül) vs Yarı katı (Merhem) formlar',
    answer: 'Draje (Katı kaplı hap) — Merhem (Yağlı yarı katı)',
    distractors: [
      'Ampul (Katı kaplı hap) — Şurup (Yağlı yarı katı)',
      'Merhem (Katı kaplı hap) — Tablet (Yağlı yarı katı)',
      'Süspansiyon (Katı kaplı hap) — Damla (Yağlı yarı katı)'
    ],
    category: 'İlaç Formları',
    keyFact: 'Kapsül/Draje: mide asidinden koruma ve kolay yutma | Merhem: uzun süre ciltte kalma',
    chemicalDetail: 'Krem su-yağ emülsiyonu iken merhemin yağ oranı çok daha yüksektir',
    examHighlight: 'İlaçların farklı formlarda üretilme nedenleri: doğru dozaj, mide asidinden koruma, acı tadı maskeleme ve hedef bölgeye hızlı/yavaş ulaşım.'
  }
];

export function everydayChemistryToQuizItem(item: EverydayChemistryItem): StandardQuizItem {
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
      { label: 'Doğru Yanıt', value: item.answer },
      { label: 'Temel Özellik', value: item.keyFact },
      { label: 'Kimyasal Detay', value: item.chemicalDetail },
      { label: 'ÖSYM Notu', value: item.examHighlight }
    ],
    hint: item.examHighlight
  };
}
