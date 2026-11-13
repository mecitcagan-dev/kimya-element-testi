import { StandardQuizItem } from '../types/topics';

export type SeparationCategory =
  | 'Kaynama Noktası Farkı'
  | 'Yoğunluk Farkı'
  | 'Çözünürlük Farkı'
  | 'Tanecik Boyutu Farkı'
  | 'Manyetik & Hal Değişim Farkı'
  | 'ÖSYM Tuzakları';

export interface MixtureSeparationItem {
  id: string;
  prompt: string;
  promptSub: string;
  answer: string;
  distractors: [string, string, string];
  synonyms?: string[];
  category: SeparationCategory;
  propertyDiff: string;
  mixtureType: string;
  examples: string;
  examHighlight: string;
}

export const MIXTURES_SEPARATION: MixtureSeparationItem[] = [
  // 1. KAYNAMA NOKTASI FARKI
  {
    id: 'sep-ayrimsal-damitma',
    prompt: 'Etil alkol – su (kolonya) veya ham petrol gibi birbiri içinde çözünen sıvı-sıvı homojen karışımlar hangi yöntemle ayrılır?',
    promptSub: 'Sıvı–sıvı homojen karışım ayırma',
    answer: 'Ayrımsal Damıtma',
    distractors: ['Basit Damıtma', 'Ayırma Hunisi', 'Ayrımsal Kristallendirme'],
    synonyms: ['ayrimsal damitma', 'fraksiyonlu damitma'],
    category: 'Kaynama Noktası Farkı',
    propertyDiff: 'Kaynama noktası farkı',
    mixtureType: 'Sıvı–sıvı homojen (çözelti)',
    examples: 'Alkol–su, ham petrol (benzin, motorin, LPG), sıvılaştırılmış hava',
    examHighlight: 'Sıvı–sıvı homojen karışımlarda fraksiyon kolonu kullanılarak kaynama noktası farkıyla ayrılır. Kaynama noktası düşük olan sıvı önce buharlaşıp toplanır.'
  },
  {
    id: 'sep-basit-damitma',
    prompt: 'Tuzlu su veya şekerli sudan hem saf suyu hem de katıyı ayrı ayrı elde etmek için hangi yöntem kullanılır?',
    promptSub: 'Katı–sıvı homojen karışım ayırma',
    answer: 'Basit Damıtma (Destilasyon)',
    distractors: ['Ayrımsal Damıtma', 'Süzme (Filtrasyon)', 'Buharlaştırma'],
    synonyms: ['basit damitma', 'destilasyon'],
    category: 'Kaynama Noktası Farkı',
    propertyDiff: 'Kaynama noktası farkı (katı uçucu değil)',
    mixtureType: 'Katı–sıvı homojen (çözelti)',
    examples: 'Tuzlu su, şekerli su (hem çözücü hem çözünen elde edilir)',
    examHighlight: 'ÖSYM AYRIMI: Sadece katıyı almak istiyorsak buharlaştırma yeterlidir; ancak su buharını yoğunlaştırıp SAF SUYU da geri kazanmak için Basit Damıtma gerekir.'
  },
  {
    id: 'sep-ham-petrol',
    prompt: 'Ham petrolün rafinerilerde LPG, benzin, gazyağı, motorin ve asfalta ayrıştırılmasında temel alınan özellik farkı nedir?',
    promptSub: 'Endüstriyel ayırma prensibi',
    answer: 'Kaynama noktası farkı (Ayrımsal damıtma)',
    distractors: ['Yoğunluk farkı (Ayırma hunisi)', 'Çözünürlük farkı (Özütleme)', 'Tanecik boyutu farkı (Süzme)'],
    synonyms: ['kaynama noktasi farki', 'ayrimsal damitma'],
    category: 'Kaynama Noktası Farkı',
    propertyDiff: 'Kaynama noktası farkı',
    mixtureType: 'Sıvı–sıvı homojen (hidrokarbon karışımı)',
    examples: 'Ham petrol rafinasyonu',
    examHighlight: 'Karbon sayısı arttıkça hidrokarbonların London kuvvetleri ve kaynama noktaları yükselir; rafineri kulesinde yüksek kaynama noktalı bileşenler alt raflarda yoğunlaşır.'
  },
  {
    id: 'sep-buharlastirma',
    prompt: 'Deniz suyundan veya tuzlu göllerden yalnızca sofra tuzu (NaCl) elde etmek için uygulanan en ekonomik yöntem hangisidir?',
    promptSub: 'Çözücüyü uzaklaştırarak katı eldesi',
    answer: 'Buharlaştırma',
    distractors: ['Diyaliz', 'Ayırma Hunisi', 'Flotasyon (Yüzdürme)'],
    synonyms: ['buharlastirma'],
    category: 'Kaynama Noktası Farkı',
    propertyDiff: 'Kaynama noktası / uçuculuk farkı',
    mixtureType: 'Katı–sıvı homojen (çözelti)',
    examples: 'Tuz gölünden tuz eldesi, pekmez/salça kaynatma',
    examHighlight: 'Buharlaştırmada sıvı atmosfere kaçar, yalnızca uçucu olmayan katı kalır. Sıvı da lazımsa basit damıtma yapılır.'
  },

  // 2. YOĞUNLUK FARKI
  {
    id: 'sep-ayirma-hunisi',
    prompt: 'Zeytinyağı–su veya benzin–su gibi birbiri içinde çözünmeyen sıvı–sıvı heterojen karışımlar (emülsiyon) nasıl ayrılır?',
    promptSub: 'Sıvı–sıvı heterojen karışım ayırma',
    answer: 'Ayırma Hunisi (Yoğunluk farkı)',
    distractors: ['Ayrımsal Damıtma (Kaynama noktası)', 'Süzme (Tanecik boyutu)', 'Özütleme (Çözünürlük)'],
    synonyms: ['ayirma hunisi', 'yogunluk farki'],
    category: 'Yoğunluk Farkı',
    propertyDiff: 'Yoğunluk (özkütle) farkı',
    mixtureType: 'Sıvı–sıvı heterojen (emülsiyon)',
    examples: 'Zeytinyağı–su, mazot–su, karbon tetraklorür (CCl₄)–su',
    examHighlight: 'Yoğunluğu büyük olan sıvı (örneğin su, d=1 g/cm³; zeytinyağı d=0,9 g/cm³) altta toplanır ve musluk açılarak ilk olarak alt faz alınır.'
  },
  {
    id: 'sep-flotasyon',
    prompt: 'Madencilikte sülfürlü cevherlerin (CuS, PbS, ZnS) köpürtülerek kayaçlardan ayrılıp zenginleştirilmesi hangi yöntemdir?',
    promptSub: 'Yüzdürme ile ayırma',
    answer: 'Flotasyon (Yüzdürme)',
    distractors: ['Koagülasyon (Pıhtılaştırma)', 'Diyaliz', 'Ekstraksiyon (Özütleme)'],
    synonyms: ['flotasyon', 'yuzdurme'],
    category: 'Yoğunluk Farkı',
    propertyDiff: 'Yoğunluk farkı ve ıslanabilirlik',
    mixtureType: 'Katı–katı veya katı–sıvı heterojen',
    examples: 'Sülfürlü maden cevherlerinin zenginleştirilmesi, talaş–kum karışımına su ekleme',
    examHighlight: 'Talaş–kum karışımına su eklendiğinde yoğunluğu sudan küçük olan talaş yüzerken (flotasyon), yoğun kum dibe batar (çöktürme).'
  },
  {
    id: 'sep-dekantasyon',
    prompt: 'Çamurlu su veya zeytin posası–su gibi karışımlarda katı dibe çöktükten sonra üstteki berrak sıvının bulandırılmadan başka kaba alınması nedir?',
    promptSub: 'Dinlendirme sonrası sıvıyı alma',
    answer: 'Dekantasyon (Aktarma)',
    distractors: ['Ekstraksiyon (Özütleme)', 'Ayrımsal Damıtma', 'Eleme'],
    synonyms: ['dekantasyon', 'aktarma'],
    category: 'Yoğunluk Farkı',
    propertyDiff: 'Yoğunluk farkı (yerçekimiyle çökme)',
    mixtureType: 'Katı–sıvı heterojen (süspansiyon)',
    examples: 'Çamurlu suyun dinlendirilmesi, haşlanmış makarnanın suyunu süzme/aktarma, zeytinyağı posası ayrımı',
    examHighlight: 'Dekantasyon katı parçacıkların dibe çökmesiyle başlar; katının yoğunluğu sıvıdan büyük olmalıdır.'
  },
  {
    id: 'sep-santrifuj',
    prompt: 'Süzgeç kağıdından geçebilen kan hücrelerinin plazmadan veya sütteki yağ kremasının sütten hızlıca ayrılmasında hangi yöntem kullanılır?',
    promptSub: 'Yüksek hızda döndürerek çökeltme',
    answer: 'Santrifüjleme',
    distractors: ['Ayırma Hunisi', 'Basit Damıtma', 'Eleme'],
    synonyms: ['santrifujleme', 'santrifuj'],
    category: 'Yoğunluk Farkı',
    propertyDiff: 'Yoğunluk farkı (merkezkaç etkisi)',
    mixtureType: 'Kolloid / ince süspansiyon',
    examples: 'Kan plazması ve alyuvarların ayrılması, sütten krema eldesi',
    examHighlight: 'Yerçekimiyle çökmeyen koloidal ve çok küçük tanecikler yüksek devirli santrifüjde yoğunluk farkıyla tüp dibinde toplanır.'
  },
  {
    id: 'sep-savurma',
    prompt: 'Tarlada harman sırasında buğday tanelerinin saman ve kavuzdan rüzgar yardımıyla ayrılması hangi özellik farkına dayanır?',
    promptSub: 'Geleneksel katı–katı ayırma',
    answer: 'Yoğunluk farkı (Savurma)',
    distractors: ['Tanecik boyutu farkı (Eleme)', 'Çözünürlük farkı', 'Mıknatıslanma'],
    synonyms: ['savurma', 'yogunluk farki'],
    category: 'Yoğunluk Farkı',
    propertyDiff: 'Yoğunluk farkı',
    mixtureType: 'Katı–katı heterojen (adi karışım)',
    examples: 'Buğday–saman ayrımı',
    examHighlight: 'Rüzgar akımı yoğunluğu ve kütlesi küçük olan hafif samanı uzağa taşırken ağır buğday taneleri yakına düşer.'
  },

  // 3. ÇÖZÜNÜRLÜK FARKI
  {
    id: 'sep-ekstraksiyon',
    prompt: 'Çayın sıcak suda demlenmesi, şeker pancarından şeker eldesi veya söğüt kabuğundan aspirin etken maddesinin alınması hangi yöntemdir?',
    promptSub: 'Uygun çözücü ile bileşen çekme',
    answer: 'Ekstraksiyon (Özütleme / Çekme)',
    distractors: ['Koagülasyon (Pıhtılaştırma)', 'Ayrımsal Damıtma', 'Dekantasyon (Aktarma)'],
    synonyms: ['ekstraksiyon', 'ozutleme', 'cekme'],
    category: 'Çözünürlük Farkı',
    propertyDiff: 'Çözünürlük farkı',
    mixtureType: 'Katı–sıvı veya sıvı–sıvı karışım',
    examples: 'Çay demleme, bitkilerden parfüm esansı/ilaç eldesi, peynirin tuzunun suda alınması, şeker pancarından şeker',
    examHighlight: 'ÖSYM FAVORİSİ: Karışımdaki bir bileşeni dışarıdan eklenen uygun bir çözücüde çözerek ortamdan alma işlemidir. Söğüt ağacından salisilik asit (aspirin) eldesi klasik örnektir.'
  },
  {
    id: 'sep-ayrimsal-kristallendirme',
    prompt: 'Suda çözünürlükleri sıcaklıkla farklı değişen iki katının (örneğin tuz–şeker veya KNO₃–NaCl) aynı çözücüde soğutularak sırayla çöktürülmesi nedir?',
    promptSub: 'Katı–katı karışımı çözünürlükle ayırma',
    answer: 'Ayrımsal Kristallendirme',
    distractors: ['Ayrımsal Damıtma', 'Flotasyon (Yüzdürme)', 'Basit Kristallendirme'],
    synonyms: ['ayrimsal kristallendirme'],
    category: 'Çözünürlük Farkı',
    propertyDiff: 'Çözünürlüğün sıcaklıkla değişim farkı',
    mixtureType: 'Katı–katı karışım (ikisi de çözücüde çözünür)',
    examples: 'Yemek tuzu (NaCl)–şeker veya potasyum nitrat (KNO₃)–NaCl karışımı',
    examHighlight: 'Sıcaklığı düşürüldüğünde çözünürlüğü hızlı azalan katı (örn. KNO₃ veya şeker) ilk önce kristallenip çökerken diğeri çözeltide kalır.'
  },
  {
    id: 'sep-kristallendirme',
    prompt: 'Doygun sıcak şekerli su çözeltisi soğutularak şekerin saf katı kristaller halinde dibe çöktürülmesi işlemine ne ad verilir?',
    promptSub: 'Tek katıyı sıcaklıkla çöktürme',
    answer: 'Kristallendirme',
    distractors: ['Diyaliz', 'Koagülasyon', 'Dekantasyon'],
    synonyms: ['kristallendirme'],
    category: 'Çözünürlük Farkı',
    propertyDiff: 'Çözünürlüğün sıcaklıkla değişimi',
    mixtureType: 'Katı–sıvı homojen (çözelti)',
    examples: 'Şeker şerbetinden akide/kristal şeker eldesi, bakır(II) sülfat kristallendirmesi',
    examHighlight: 'Endotermik çözünen katıların sıcak doygun çözeltisi soğutulduğunda çözünürlük azaldığı için fazla katı saf kristal olarak ayrılır.'
  },
  {
    id: 'sep-tuz-kum',
    prompt: 'Yemek tuzu (NaCl) ve kum (SiO₂) karışımına su eklenip karıştırıldıktan sonra süzülüp buharlaştırılması hangi özellik farkından yararlanır?',
    promptSub: 'Seçici çözme + süzme kombinasyonu',
    answer: 'Çözünürlük farkı',
    distractors: ['Kaynama noktası farkı', 'Yoğunluk farkı', 'Manyetik özellik farkı'],
    synonyms: ['cozunurluk farki'],
    category: 'Çözünürlük Farkı',
    propertyDiff: 'Çözünürlük farkı (biri çözünür, diğeri çözünmez)',
    mixtureType: 'Katı–katı heterojen karışım',
    examples: 'Tuz–kum, şeker–naftalin, iyot–tuz (alkol veya CCl₄ ile)',
    examHighlight: 'Tuz suda çözünürken kum çözünmez. Süzme ile kum ayrılır, süzüntü buharlaştırılarak tuz elde edilir.'
  },

  // 4. TANECİK BOYUTU FARKI
  {
    id: 'sep-diyaliz',
    prompt: 'Böbrek yetmezliği olan hastalarda kandaki küçük boyutlu metabolik atıkların (üre vb.) yarı geçirgen zardan geçirilip proteinlerin kanda tutulması nedir?',
    promptSub: 'Kolloid karışımdan küçük molekülleri ayırma',
    answer: 'Diyaliz (Tanecik boyutu farkı)',
    distractors: ['Koagülasyon (Kolloid çöktürme)', 'Santrifüjleme (Yoğunluk farkı)', 'Ekstraksiyon (Çözünürlük farkı)'],
    synonyms: ['diyaliz', 'tanecik boyutu farki'],
    category: 'Tanecik Boyutu Farkı',
    propertyDiff: 'Tanecik boyutu farkı (yarı geçirgen zar)',
    mixtureType: 'Kolloid (kan)',
    examples: 'Hemodiyaliz makineleriyle kan temizliği',
    examHighlight: 'Kolloid tanecikleri (kan proteinleri ve hücreler) normal süzgeç kağıdından geçer ama yarı geçirgen diyaliz zarından geçemez; küçük moleküllü üre ve tuzlar zardan geçer.'
  },
  {
    id: 'sep-koagulasyon',
    prompt: 'İçme suyu arıtımında suya şap [Al₂(SO₄)₃] eklenerek kendi kendine çökmeyen negatif yüklü kolloid kirlerin pıhtılaştırılıp dibe çöktürülmesi nedir?',
    promptSub: 'Kolloid yüklerini nötrleyip çöktürme',
    answer: 'Koagülasyon (Pıhtılaştırma)',
    distractors: ['Diyaliz', 'Flotasyon (Yüzdürme)', 'Ayrımsal Kristallendirme'],
    synonyms: ['koagulasyon', 'pihtilastirma'],
    category: 'Tanecik Boyutu Farkı',
    propertyDiff: 'Kolloid taneciklerin yük nötralizasyonu / birleşip büyümesi',
    mixtureType: 'Kolloid / bulanık ham su',
    examples: 'Şehir içme suyu arıtımında şap ile bulandırıcı kil kolloidlerinin çöktürülmesi',
    examHighlight: 'Suda asılı kalan negatif kolloid tanecikler birbirini ittiği için çökemez; Al³⁺ gibi çok yüklü katyonlar (şap) tanecikleri birleştirip ağır floklara dönüştürür.'
  },
  {
    id: 'sep-suzme',
    prompt: 'Tebeşir tozu–su süspansiyonunu ayırmada veya fabrika bacalarındaki tozları/maskelerdeki partikülleri tutmada kullanılan temel yöntem nedir?',
    promptSub: 'Katı–sıvı ve katı–gaz heterojen ayırma',
    answer: 'Süzme (Filtrasyon)',
    distractors: ['Eleme', 'Diyaliz', 'Ayırma Hunisi'],
    synonyms: ['suzme', 'filtrasyon'],
    category: 'Tanecik Boyutu Farkı',
    propertyDiff: 'Tanecik boyutu farkı',
    mixtureType: 'Katı–sıvı (süspansiyon) veya katı–gaz (aerosol)',
    examples: 'Tebeşir tozu–su, Türk kahvesi, toz maskesi, araba hava filtresi',
    examHighlight: 'Süzme hem katı–sıvı süspansiyonlarda hem de katı–gaz aerosollerde (baca/maske filtresi) kullanılır; çözeltileri ve kolloidleri normal süzgeç kağıdıyla ayıramaz.'
  },
  {
    id: 'sep-eleme',
    prompt: 'İnşaatlarda kum–çakıl veya mutfakta un–kepek gibi farklı büyüklükteki katı–katı karışımları ayırmak için hangi yöntem uygulanır?',
    promptSub: 'Katı–katı tanecik boyutu ayrımı',
    answer: 'Eleme',
    distractors: ['Süzme (Filtrasyon)', 'Dekantasyon (Aktarma)', 'Savurma'],
    synonyms: ['eleme'],
    category: 'Tanecik Boyutu Farkı',
    propertyDiff: 'Tanecik boyutu farkı',
    mixtureType: 'Katı–katı heterojen karışım',
    examples: 'Kum–çakıl, un–kepek, kömür eleme',
    examHighlight: 'Katı–katı heterojen karışımlarda gözenek çapı uygun elek kullanılarak küçük taneciklerin alta geçmesi sağlanır.'
  },

  // 5. MANYETİK & HAL DEĞİŞİM FARKI
  {
    id: 'sep-miknatis-elementler',
    prompt: 'Mıknatıslanma ile ayırma yöntemi yalnızca hangi üç metali içeren heterojen karışımlara uygulanabilir?',
    promptSub: 'Ferromanyetik elementler',
    answer: 'Demir (Fe), Nikel (Ni) ve Kobalt (Co)',
    distractors: ['Bakır (Cu), Gümüş (Ag) ve Altın (Au)', 'Alüminyum (Al), Çinko (Zn) ve Magnezyum (Mg)', 'Sodyum (Na), Potasyum (K) ve Kalsiyum (Ca)'],
    synonyms: ['fe ni co', 'demir nikel kobalt'],
    category: 'Manyetik & Hal Değişim Farkı',
    propertyDiff: 'Mıknatıslanma (manyetik özellik) farkı',
    mixtureType: 'Katı–katı heterojen (toz/talaş)',
    examples: 'Demir tozu–kükürt tozu, nikel tozu–kum, kobalt–talaş',
    examHighlight: 'ÖSYM KLASİĞİ: Bakır (Cu), Alüminyum (Al), Altın (Au) ve Kükürt (S) mıknatıs tarafından ÇEKİLMEZ; yalnızca Fe, Ni ve Co çekilir.'
  },
  {
    id: 'sep-elektriklenme',
    prompt: 'Karabiber–tuz karışımına yün kumaşa sürtülmüş plastik tarak yaklaştırıldığında karabiberin tarakla çekilmesi hangi özelliğe dayanır?',
    promptSub: 'Elektrostatik ayırma',
    answer: 'Elektriklenme (Elektrostatik çekim)',
    distractors: ['Mıknatıslanma', 'Yoğunluk farkı', 'Çözünürlük farkı'],
    synonyms: ['elektriklenme', 'elektrostatik'],
    category: 'Manyetik & Hal Değişim Farkı',
    propertyDiff: 'Elektrik yükünden etkilenme farkı',
    mixtureType: 'Katı–katı veya katı–gaz heterojen',
    examples: 'Karabiber–tuz ayrımı, kağıt–tuz ayrımı, baca tozlarını tutan Cottrell elektrostatik filtresi',
    examHighlight: 'Hafif ve kolay kutuplanabilen karabiber veya baca külü tanecikleri yüklü cisim/elektrot tarafından çekilir.'
  },
  {
    id: 'sep-erime-noktasi',
    prompt: 'Lehim (Sn–Pb) veya pirinç (Cu–Zn) gibi metal alaşımlarının bileşenlerine ayrıştırılmasında hangi özellik farkından yararlanılır?',
    promptSub: 'Katı–katı homojen alaşım ayırma',
    answer: 'Erime noktası farkı',
    distractors: ['Mıknatıslanma farkı', 'Süzme (Tanecik boyutu)', 'Ayırma hunisi (Yoğunluk)'],
    synonyms: ['erime noktasi farki'],
    category: 'Manyetik & Hal Değişim Farkı',
    propertyDiff: 'Erime noktası farkı',
    mixtureType: 'Katı–katı homojen (alaşım)',
    examples: 'Lehim (Kalay 232 °C – Kurşun 327 °C), metal hurdalarının ayrılması',
    examHighlight: 'Alaşım ısıtıldığında erime noktası düşük olan metal önce sıvılaşarak ortamdan akıtılır.'
  },

  // 6. ÖSYM TUZAKLARI
  {
    id: 'sep-tuzak-alasim-miknatis',
    prompt: 'Demir (Fe) ve bakır (Cu) metallerinin eritilip karıştırılmasıyla oluşturulan homojen ALAŞIM mıknatısla ayrılabilir mi?',
    promptSub: 'ÖSYM Manyetik Ayırma Tuzağı',
    answer: 'Hayır, alaşımlar homojen olduğundan mıknatısla ayrılamaz',
    distractors: [
      'Evet, mıknatıs demiri çekip bakırdan ayırır',
      'Evet, yalnızca sıvı haldeyken mıknatısla ayrılır',
      'Evet, çünkü bakır da ferromanyetiktir'
    ],
    category: 'ÖSYM Tuzakları',
    propertyDiff: 'Homojen metalik yapı vs heterojen toz karışımı',
    mixtureType: 'Katı–katı homojen (alaşım)',
    examples: 'Fe–Cu alaşımı ayrılmaz (erime noktası farkı gerekir); Fe tozu + Cu tozu ayrılır',
    examHighlight: 'DEV ÖSYM TUZAĞI: Demir tozu + bakır tozu (heterojen) mıknatısla ayrılır; ancak Fe–Cu alaşımı (homojen) mıknatısla AYRILMAZ!'
  },
  {
    id: 'sep-tuzak-fe-ni-miknatis',
    prompt: 'Demir (Fe) tozu ile nikel (Ni) tozunun bulunduğu heterojen bir karışım yalnızca mıknatıs yaklaştırılarak birbirinden ayrılabilir mi?',
    promptSub: 'ÖSYM İki Ferromanyetik Metal Tuzağı',
    answer: 'Hayır, her ikisi de mıknatısla çekildiği için ayrılamaz',
    distractors: [
      'Evet, mıknatıs yalnızca demiri çeker',
      'Evet, nikel ametal olduğu için çekilmez',
      'Evet, ancak yüksek sıcaklıkta ayrılır'
    ],
    category: 'ÖSYM Tuzakları',
    propertyDiff: 'Her iki bileşen de ferromanyetik (Fe, Ni, Co)',
    mixtureType: 'Katı–katı heterojen (Fe + Ni)',
    examples: 'Demir tozu + Nikel tozu veya Demir + Kobalt karışımı',
    examHighlight: 'Fe, Ni ve Co metallerinin üçü de mıknatısla çekilir. Bu yüzden Fe+Ni karışımına mıknatıs tutulursa ikisi birden gelir, ayrılma gerçekleşmez!'
  },
  {
    id: 'sep-tuzak-kolloid-suzme',
    prompt: 'Süt ve kan gibi kolloid karışımlar normal süzgeç kağıdından süzülerek bileşenlerine ayrılabilir mi?',
    promptSub: 'ÖSYM Kolloid ve Süzme Tuzağı',
    answer: 'Hayır, tanecikleri (1–1000 nm) süzgeç kağıdından geçer',
    distractors: [
      'Evet, süzgeç kağıdında sadece sıvı kısım geçer',
      'Evet, süspansiyonlardan daha iri tanecikli oldukları için kalırlar',
      'Hayır, çünkü kolloidler homojen çözeltilerdir'
    ],
    category: 'ÖSYM Tuzakları',
    propertyDiff: 'Tanecik boyutu (1–1000 nm) süzgeç gözeneklerinden küçüktür',
    mixtureType: 'Kolloid (heterojen)',
    examples: 'Kan (diyaliz/santrifüj ile ayrılır), süt (santrifüj ile ayrılır)',
    examHighlight: 'Kolloidler heterojendir ve Tyndall ışığını saçar; ancak tanecikleri normal süzgeç kağıdından geçtiği için süzme ile değil diyaliz, santrifüj veya koagülasyon ile ayrılır.'
  },
  {
    id: 'sep-tuzak-kolonya-ayirma-hunisi',
    prompt: 'Kolonya (etil alkol–su) karışımı yoğunlukları farklı olduğu için ayırma hunisi ile bileşenlerine ayrılabilir mi?',
    promptSub: 'ÖSYM Homojen Sıvı Karışım Tuzağı',
    answer: 'Hayır, birbiri içinde çözündüğü için Ayrımsal Damıtma gerekir',
    distractors: [
      'Evet, yoğunluğu küçük olan alkol üstten ayrılır',
      'Evet, suyu alta alıp alkolü ayırma hunisinde bırakabiliriz',
      'Hayır, yalnızca basit damıtma ile ayrılabilir'
    ],
    category: 'ÖSYM Tuzakları',
    propertyDiff: 'Homojen çözünme (tek faz) -> kaynama noktası farkı gerekir',
    mixtureType: 'Sıvı–sıvı homojen (çözelti)',
    examples: 'Alkol–su (etanol 78 °C, su 100 °C), aseton–su',
    examHighlight: 'Ayırma hunisi yalnızca birbiri içinde ÇÖZÜNMEYEN sıvı–sıvı heterojen karışımlarda (zeytinyağı–su) kullanılır. Alkol ve su hidrojen bağıyla homojen çözünür.'
  }
];

export function mixtureSeparationToQuizItem(item: MixtureSeparationItem): StandardQuizItem {
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
      { label: 'Özellik Farkı', value: item.propertyDiff },
      { label: 'Karışım Türü', value: item.mixtureType },
      { label: 'Örnekler', value: item.examples },
      { label: 'ÖSYM Notu', value: item.examHighlight }
    ],
    hint: item.examHighlight
  };
}
