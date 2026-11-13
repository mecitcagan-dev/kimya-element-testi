import { StandardQuizItem } from '../types/topics';

export type ElectroOrganicCategory =
  | 'Galvanik Pil & Aktiflik'
  | 'Standart Potansiyel & Derişim Pili'
  | 'Elektroliz & Katodik Koruma'
  | 'IUPAC Adlandırma'
  | 'Hibritleşme & Sigma-Pi Bağları'
  | 'İzomerlik & Organik Tepkimeler';

export interface ElectrochemistryOrganicItem {
  id: string;
  question: string;
  answer: string;
  distractors: [string, string, string];
  category: ElectroOrganicCategory;
  examHighlight: string;
}

export const ELECTROCHEMISTRY_AND_ORGANIC: ElectrochemistryOrganicItem[] = [
  // 1. GALVANİK PİL & AKTİFLİK (KİMYA KODLAMASI)
  {
    id: 'eo-kimya-kodlamasi',
    question: 'Elektrokimyasal pillerde (ve elektrolizde) anot ve katot yarı hücrelerinde gerçekleşen olayları hatırlatan "KİMYA" kodlaması neyi ifade eder?',
    answer: 'Katotta İndirgenme — Yükseltgenme Anotta gerçekleşir',
    distractors: [
      'Katotta Yükseltgenme — İndirgenme Anotta gerçekleşir',
      'Katot daima pozitif, Anot daima negatiftir (elektroliz dahil)',
      'Katyonlar Anota, Anyonlar Katota göç eder'
    ],
    category: 'Galvanik Pil & Aktiflik',
    examHighlight: 'KİMYA kuralı hem galvanik piller hem de elektroliz hücreleri için EVRENSELDİR: Katotta daima İndirgenme, Anotta daima Yükseltgenme olur!'
  },
  {
    id: 'eo-aktif-metal-anot',
    question: 'İki metal elektrottan oluşan bir galvanik pilde hangi elektrot ANOT, hangisi KATOT olarak çalışır?',
    answer: 'Yükseltgenme potansiyeli (E°_yüks) büyük olan aktif metal ANOT; diğeri KATOT olur',
    distractors: [
      'İndirgenme potansiyeli büyük olan aktif metal ANOT olur',
      'Kütlesi büyük olan metal daima ANOT olur',
      'Soy metaller (Cu, Ag, Au) aktif metallere karşı daima ANOT olur'
    ],
    category: 'Galvanik Pil & Aktiflik',
    examHighlight: 'Aktiflik = elektron verme (yükseltgenme) isteği. E°_yüks büyük olan metal elektron verip aşınır (Anot kütlesi zamanla AZALIR).'
  },
  {
    id: 'eo-elektron-ve-tuz-koprusu',
    question: 'Çalışmakta olan bir galvanik pilde dış devrede elektronların akış yönü ile tuz köprüsündeki iyonların hareket yönü nasıldır?',
    answer: 'Dış devrede e⁻: Anot → Katot;  Tuz köprüsünde: Anyonlar → Anota, Katyonlar → Katota',
    distractors: [
      'Dış devrede e⁻: Katot → Anot;  Tuz köprüsünde: Anyonlar → Katota',
      'Dış devrede e⁻: Anot → Katot;  Tuz köprüsünde: Katyonlar → Anota',
      'Elektronlar tuz köprüsü üzerinden Katota geçer'
    ],
    category: 'Galvanik Pil & Aktiflik',
    examHighlight: 'Kodlama: "Anyonlar Anota, Katyonlar Katota!" Tuz köprüsünden ASLA elektron geçmez; yük denkliği iyon göçüyle sağlanır.'
  },
  {
    id: 'eo-katot-h-iyonu-tuzagi',
    question: 'Zn | Zn²⁺(1M) || H⁺(1M) | Cu pilinde katot kabında Cu²⁺ yerine sadece H⁺ iyonları varsa katotta ne gerçekleşir ve Cu çubuğun kütlesi nasıl değişir?',
    answer: 'Katotta 2 H⁺ + 2 e⁻ → H₂(g) çıkışı olur; Cu elektrodun kütlesi DEĞİŞMEZ',
    distractors: [
      'Cu çubuk aşınarak kütlesi azalır',
      'Katotta H⁺ indirgenip Cu çubuk üzerinde metalik katı birikir',
      'Tepkime gerçekleşmez, pil potansiyeli 0 V olur'
    ],
    category: 'Galvanik Pil & Aktiflik',
    examHighlight: 'EN BÜYÜK ÖSYM TUZAĞI: Katot kabında çözeltide hangi katyon varsa o indirgenir! HCl çözeltisinde Cu²⁺ yoksa Cu çubuk sadece iletkendir; H₂ gazı çıkar ve Cu çubuğun kütlesi SABİT kalır.'
  },
  {
    id: 'eo-pil-sicaklik-etkisi',
    question: 'İstemli çalışan tüm galvanik piller ekzotermik (Pil tepkimesi ⇌ Ürünler + Isı) olduğuna göre pilin bulunduğu ortamın sıcaklığı artırılırsa pil potansiyeli (E_pil) nasıl değişir?',
    answer: 'Denge girenlere kayacağı için E_pil AZALIR',
    distractors: [
      'Tanecikler hızlanacağı için E_pil ARTAR',
      'Sıcaklık E°_pil değerini değiştirmez',
      'Endotermik olduğu için E_pil artar'
    ],
    category: 'Galvanik Pil & Aktiflik',
    examHighlight: 'Pil tepkimeleri istemli ve ekzotermiktir (ΔG < 0, ΔH < 0). Le Chatelier’ye göre pil tepkimesini ürünlere kaydıran her etki E_pil’i ARTIRIR, girenlere kaydıran (T↑ gibi) her etki E_pil’i AZALTIR.'
  },

  // 2. STANDART POTANSİYEL & DERİŞİM PİLİ
  {
    id: 'eo-yari-tepkime-carpilmasi',
    question: 'Net pil denklemini denkleştirmek için bir yarı tepkime 2 ile çarpılırsa o yarı tepkimenin standart elektrot potansiyeli (E°) nasıl değişir?',
    answer: 'DEĞİŞMEZ (E° yoğun/intansif bir özelliktir, katsayıyla çarpılmaz!)',
    distractors: [
      '2 ile çarpılır (2 · E°)',
      'Karesi alınır (E°²)',
      '2’ye bölünür (E° / 2)'
    ],
    category: 'Standart Potansiyel & Derişim Pili',
    examHighlight: 'ALTIN KURAL: Yarı tepkime ters çevrilirse E°’nin işareti değişir; AMA herhangi bir katsayı ile çarpılırsa E° KESİNLİKLE ÇARPILMAZ! (ΔH’tan farklıdır!)'
  },
  {
    id: 'eo-derisim-pili',
    question: 'Her iki kabında da aynı elektrot ve aynı iyon bulunan [ör: Cu | Cu²⁺(0,01 M) || Cu²⁺(1 M) | Cu] bir derişim pilinde anot ve katot nasıl belirlenir?',
    answer: 'Derişimi SEYRELTİK olan kap ANOT, DERİŞİK olan kap KATOT olur',
    distractors: [
      'Derişimi yüksek olan kap ANOT, seyreltik olan KATOT olur',
      'Elektrotlar aynı olduğu için pil çalışmaz (E_pil = 0 V)',
      'Hacmi küçük olan kap ANOT olur'
    ],
    category: 'Standart Potansiyel & Derişim Pili',
    examHighlight: 'Nernst Eşitliği: E_pil = E°_pil - (0,0592/n)·log([Anot]/[Katot]). Derişim pilinde E°_pil = 0’dır; derişimler eşitlendiği an pil durur (seyreltik olan yükseltgenip derişimini artırır → Anot).'
  },
  {
    id: 'eo-nernst-su-ekleme',
    question: 'Zn | Zn²⁺(1M) || Cu²⁺(1M) | Cu standart pilinde ANOT kabına (Zn²⁺) saf su eklenirse pil potansiyeli (E_pil) nasıl değişir?',
    answer: '[Zn²⁺] azalır → Denge ürünlere kayar → E_pil ARTAR',
    distractors: [
      'E_pil AZALIR',
      'Saf su elektrolit olmadığı için E_pil DEĞİŞMEZ',
      'Pil ters yönde çalışmaya başlar'
    ],
    category: 'Standart Potansiyel & Derişim Pili',
    examHighlight: 'Zn(k) + Cu²⁺(aq) ⇌ Zn²⁺(aq) + Cu(k). Anota su eklemek [Zn²⁺]’yi düşürür → ürünlere kayar → E_pil↑. Katota su eklemek [Cu²⁺]’yi düşürür → girenlere kayar → E_pil↓.'
  },
  {
    id: 'eo-metal-kap-asinma',
    question: 'Bir metal kaşık başka bir metalin katyonunu içeren çözeltiye daldırıldığında çözeltideki iyonun indirgenme potansiyeli kaşığınkinden BÜYÜKSE ne olur?',
    answer: 'Tepkime kendiliğinden gerçekleşir; metal kaşık yükseltgenerek AŞINIR (çözünür)',
    distractors: [
      'Tepkime gerçekleşmez, kaşık saklama kabı olarak uygundur',
      'Çözeltideki iyon yükselir, kaşık kütlesi azalmaz',
      'Sadece sıcaklık düşer'
    ],
    category: 'Standart Potansiyel & Derişim Pili',
    examHighlight: 'Bir çözeltiyi bir metal kapta saklayabilmek için kap metalinin çözeltideki katyondan DAHA PASİF olması gerekir (aktif kap aşınır ve delinir!).'
  },

  // 3. ELEKTROLİZ & KATODİK KORUMA
  {
    id: 'eo-elektroliz-yonleri',
    question: 'Elektroliz (elektrolitik) hücresi ile galvanik pil arasındaki en temel kutup ve istemlilik farkı nedir?',
    answer: 'Elektroliz istemsizdir (ΔG > 0, dış elektrikle yürür); Anot (+) ve Katot (-) kutuptur (Galvanikte Anot -, Katot +)',
    distractors: [
      'Elektrolizde katotta yükseltgenme, anotta indirgenme olur',
      'Elektrolizde dış devrede elektronlar katottan anota gider',
      'Elektroliz istemli bir tepkimedir'
    ],
    category: 'Elektroliz & Katodik Koruma',
    examHighlight: 'Değişmeyen tek şey KİMYA ve e⁻ yönüdür (Anotta yükseltgenme, Katotta indirgenme; e⁻ Anot→Katot). Değişen: Galvanikte Anot(-)/Katot(+), Elektrolizde Anot(+)/Katot(-) olur!'
  },
  {
    id: 'eo-suyun-elektrolizi-hofmann',
    question: 'Hofmann voltametresinde (az miktar H₂SO₄ eklenmiş) suyun elektrolizinde katotta ve anotta hangi gazlar, hangi hacim oranında toplanır?',
    answer: 'Katotta 2 hacim H₂(g), Anotta 1 hacim O₂(g) toplanır',
    distractors: [
      'Katotta 1 hacim O₂(g), Anotta 2 hacim H₂(g)',
      'Katotta 1 hacim H₂(g), Anotta 1 hacim O₂(g)',
      'Katotta 2 hacim O₂(g), Anotta 1 hacim H₂(g)'
    ],
    category: 'Elektroliz & Katodik Koruma',
    examHighlight: 'H₂O(s) → H₂(g) + ½ O₂(g). H⁺ katotta indirgenip H₂ verir (2V); OH⁻ anotta yükseltgenip O₂ verir (1V). Katot tüpündeki gaz hacmi daima anotun 2 katıdır!'
  },
  {
    id: 'eo-faraday-esitligi',
    question: 'Seri bağlı elektroliz kaplarından eşit süre akım geçirildiğinde katotlarda toplanan metallerin mol sayıları arasında nasıl bir ilişki vardır?',
    answer: 'Devreden geçen elektron mol sayısı (Q / 96500) eşittir; toplanan mol n_metal = n_e⁻ / z (tesir değerliği)',
    distractors: [
      'Toplanan metallerin gram kütleleri her zaman eşittir',
      'Toplanan mol sayıları eşittir (tesir değerliğinden bağımsız)',
      'Toplanan kütle tesir değerliği (z) ile doğru orantılıdır'
    ],
    category: 'Elektroliz & Katodik Koruma',
    examHighlight: '1 Faraday = 1 mol e⁻ = 96500 Coulomb. m = (Mₐ · I · t) / (96500 · z). Örn: 2 mol e⁻ ile 2 mol Ag⁺ (z=1), 1 mol Cu²⁺ (z=2), 2/3 mol Al³⁺ (z=3) toplanır.'
  },
  {
    id: 'eo-katodik-koruma',
    question: 'Toprak altındaki demir (Fe) boruları veya gemi gövdelerini paslanmaktan (korozyondan) korumak için bağlanan "kurban elektrot" hangi özelliğe sahip olmalıdır?',
    answer: 'Korunacak metalden (Fe) DAHA AKTİF (E°_yüks daha büyük) bir metal olmalıdır (örn. Mg, Zn)',
    distractors: [
      'Demirden daha pasif (soy) bir metal olmalıdır (örn. Cu, Ag)',
      'Demir ile aynı indirgenme potansiyeline sahip olmalıdır',
      'Elektrik akımını iletmeyen bir ametal olmalıdır'
    ],
    category: 'Elektroliz & Katodik Koruma',
    examHighlight: 'Kurban elektrot (Mg veya Zn) demirden daha aktif olduğu için kendisi ANOT olup aşınmayı üstlenir; demir boruyu ise KATOT yaparak korozyondan korur.'
  },
  {
    id: 'eo-sulu-cozelti-elektroliz-sirasi',
    question: 'İçinde birden fazla katyon (Ag⁺, Cu²⁺, H⁺, Na⁺) ve anyon (I⁻, Br⁻, OH⁻, SO₄²⁻) bulunan sulu çözelti elektroliz edildiğinde anotta ve katotta ilk kim açığa çıkar?',
    answer: 'Katotta indirgenme potansiyeli en büyük (en pasif) katyon; Anotta yükseltgenme potansiyeli en büyük anyon',
    distractors: [
      'Katotta en aktif metal (Na⁺); Anotta en zor yükseltgenen SO₄²⁻',
      'Katotta ve anotta sadece suyun iyonları',
      'Her zaman derişimi en büyük olan iyonlar'
    ],
    category: 'Elektroliz & Katodik Koruma',
    examHighlight: 'KISAYOL: Aktiflik sırası Na > H > Cu > Ag ise katotta ilk önce en pasif olan Ag⁺ (sonra Cu²⁺, sonra H₂) çıkar; anyonlarda ise halojenler (I⁻, Br⁻, Cl⁻) genellikle OH⁻’tan önce yükseltgenir, F⁻ ve SO₄²⁻/NO₃⁻ ise OH⁻’tan sonra (yerine O₂ çıkar).'
  },

  // 4. ORGANİK IUPAC ADLANDIRMA
  {
    id: 'eo-iupac-temel-kural',
    question: 'Doymamış bir hidrokarbon (alken veya alkin) IUPAC sistemine göre adlandırılırken ana zincir seçimi ve numaralandırma nasıl yapılır?',
    answer: 'Çift/üçlü bağı içeren en uzun C zinciri seçilir ve numaralandırmaya çoklu bağa en yakın uçtan başlanır (eşitlikte ikili bağ > üçlü bağ)',
    distractors: [
      'Çoklu bağı içermese bile mutlak en uzun C zinciri seçilir',
      'Dallanmaya (metil/etil) en yakın uç her zaman çoklu bağdan önceliklidir',
      'Eşit uzaklıkta üçlü bağa ikili bağdan öncelik verilir'
    ],
    category: 'IUPAC Adlandırma',
    examHighlight: 'ÖSYM TUZAĞI: Hem ikili (=) hem üçlü (≡) bağ uçlara EŞİT mesafedeyse numaralandırma İKİLİ BAĞA (alkene) yakın uçtan başlar; son ek daima "-en-in" şeklinde biter!'
  },
  {
    id: 'eo-iupac-fonksiyonel-oncelik',
    question: 'Organik bileşiklerde IUPAC adlandırmada fonksiyonel grup sonekleri ve öncelik sırası (yüksekten düşüğe) eşleştirmelerinden hangisi doğrudur?',
    answer: '-COOH (-oik asit) > -CHO (-al) > -CO- (-on) > -OH (-ol) > -NH₂',
    distractors: [
      '-OH (-ol) > -CHO (-al) > -COOH (-oik asit) > -CO- (-on)',
      '-CO- (-al) > -CHO (-on) > -OH (-ol)',
      'Ester (-oik asit) > Karboksilik asit (-oat)'
    ],
    category: 'IUPAC Adlandırma',
    examHighlight: 'Sonekler: Karboksilik asit (-oik asit), Ester (-oat), Aldehit (-al), Keton (-on), Alkol (-ol). Öncelikli grup son eki alır; altta kalan -OH "hidroksi", -NH₂ "amino", -CO- "okso" öneki olur.'
  },
  {
    id: 'eo-iupac-ester-adlandirma',
    question: 'CH₃–COO–CH₂CH₃ ester bileşiğinin IUPAC (sistematik) adı nedir?',
    answer: 'Etil etanoat (önce alkolden gelen alkil, sonra asitten gelen -oat)',
    distractors: [
      'Metil propanoat',
      'Etil metanoat',
      'Propil asetat'
    ],
    category: 'IUPAC Adlandırma',
    examHighlight: 'Ester (R₁–COO–R₂) adlandırılırken önce oksijene bağlı R₂ alkil grubu (Etil), ardından karbonil tarafının asit kökü "-oat" ekiyle (etanoat) okunur.'
  },
  {
    id: 'eo-iupac-sek-ter-onekleri',
    question: 'Alkil ve dallanma adlarında kullanılan "izo-", "neo-", "sek-" ve "ter-" öneklerinden hangileri alfabetik sıralamaya DAHİL EDİLİR?',
    answer: 'izo- ve neo- alfabetik sıraya DAHİL edilir; sek- ve ter- (tireli olanlar) DAHİL EDİLMEZ',
    distractors: [
      'Hiçbiri alfabetik sıraya dahil edilmez',
      'Hepsi alfabetik sıraya dahil edilir',
      'sek- ve ter- dahil edilir, izo- dahil edilmez'
    ],
    category: 'IUPAC Adlandırma',
    examHighlight: 'ÖSYM AYRINTISI: di-, tri-, tetra-, sek-, tert- önekleri alfabetik sırayı etkilemez! Örneğin izopropil "i" harfiyle, sek-bütil "b" harfiyle sıralanır.'
  },

  // 5. HİBRİTLEŞME & SİGMA-Pİ BAĞLARI
  {
    id: 'eo-karbon-hibritleme',
    question: 'Karbon atomunun yaptığı kovalent bağ türüne göre hibritleşme türleri (sp³, sp², sp) nasıl belirlenir?',
    answer: '4 tekli bağ: sp³;  1 ikili + 2 tekli bağ: sp²;  1 üçlü + 1 tekli (veya 2 ikili) bağ: sp',
    distractors: [
      '2 ikili bağ yapan karbon sp² hibritleşmesi yapar',
      'Üçlü bağ yapan karbon sp³ hibritleşmesi yapar',
      'Tekli bağ yapan karbon hibritleşme yapmaz'
    ],
    category: 'Hibritleşme & Sigma-Pi Bağları',
    examHighlight: 'KISA YOL: Hibritleşme = (Karbonun σ bağ sayısı + ortaklanmamış e⁻ çifti) → 4 ise sp³, 3 ise sp², 2 ise sp! Örn: CO₂’deki C (O=C=O) 2 sigma bağı yaptığı için sp hibritleşmesi yapar!'
  },
  {
    id: 'eo-sigma-pi-kurallari',
    question: 'İki atom arasında oluşan tekli, ikili ve üçlü kovalent bağlardaki sigma (σ) ve pi (π) bağ sayıları nasıldır?',
    answer: 'Tekli bağ: 1σ;  İkili bağ: 1σ + 1π;  Üçlü bağ: 1σ + 2π',
    distractors: [
      'İkili bağ: 2σ;  Üçlü bağ: 3σ',
      'İkili bağ: 1σ + 2π;  Üçlü bağ: 2σ + 1π',
      'Pi bağı oluşmadan sigma bağı oluşabilir ve iki atom arasında 2 sigma olabilir'
    ],
    category: 'Hibritleşme & Sigma-Pi Bağları',
    examHighlight: 'İki atom arasında kurulan İLK bağ daima σ (sigma) bağıdır (hibrit veya s/p uç uca örtüşmesi). Sonraki bağlar hibritleşmeye katılmayan p orbitallerinin yan yana örtüşmesiyle oluşan π (pi) bağlarıdır.'
  },
  {
    id: 'eo-acik-zincir-sigma-sayisi',
    question: 'Açık zincirli (halkasız) bir organik molekülde toplam sigma (σ) bağ sayısı pratik olarak nasıl bulunur?',
    answer: 'Toplam atom sayısı - 1  (Halkalı yapıda: toplam atom sayısı + halka sayısı - 1)',
    distractors: [
      'Toplam atom sayısı + 1',
      'Yalnızca karbon atomu sayısı - 1',
      'Toplam elektron sayısı / 2'
    ],
    category: 'Hibritleşme & Sigma-Pi Bağları',
    examHighlight: 'Örn: CH₃–CH=CH–C≡CH (C₅H₆ → toplam 11 atom, açık zincir): σ sayısı = 11 - 1 = 10 σ; π sayısı ise 1 (ikili) + 2 (üçlü) = 3 π bağıdır!'
  },
  {
    id: 'eo-hibrit-ve-s-karakteri',
    question: 'sp³, sp² ve sp hibrit orbitallerinin % s karakteri ve bağ uzunluğu sıralaması nasıldır?',
    answer: '% s karakteri: sp (%50) > sp² (%33,3) > sp³ (%25);  Bağ uzunluğu: sp³ (C–C) > sp² (C=C) > sp (C≡C)',
    distractors: [
      '% s karakteri: sp³ > sp² > sp;  Bağ uzunluğu: sp > sp² > sp³',
      'Tüm hibrit orbitallerinin % s karakteri %25’tir',
      'Üçlü bağ en uzun ve en zayıf bağdır'
    ],
    category: 'Hibritleşme & Sigma-Pi Bağları',
    examHighlight: 's karakteri arttıkça orbital çekirdeğe yaklaşır; bu yüzden C≡C (sp) bağı en kısa, en sağlam ve uç hidrojeni en asidik olan bağdır (109,5° → 120° → 180°).'
  },

  // 6. İZOMERLİK & ORGANİK TEPKİMELER
  {
    id: 'eo-cis-trans-sarti',
    question: 'Bir alken molekülünde geometrik (cis-trans) izomerliğin görülebilmesi için ikili bağ karbonlarının (C=C) sağlaması gereken şart nedir?',
    answer: 'İkili bağdaki her bir karbon atomuna bağlı iki grup birbirinden FARKLI olmalıdır (a ≠ b ve x ≠ y)',
    distractors: [
      'Molekülde en az 4 farklı atom türü bulunmalıdır',
      'Aynı karbona iki özdeş grup (ör. =CH₂) bağlı olmalıdır',
      'Tüm alkinlerde de cis-trans izomerliği görülür'
    ],
    category: 'İzomerlik & Organik Tepkimeler',
    examHighlight: 'ÖSYM TUZAĞI: 1-büten (CH₂=CH–CH₂CH₃) veya propen gibi uç alkenlerde C1 karbonuna iki adet H bağlı olduğu için cis-trans izomerliği YOKTUR! Sikloalkanlarda da halkadaki iki farklı C’de sübstitüent varsa cis-trans görülebilir.'
  },
  {
    id: 'eo-fonksiyonel-grup-izomerleri',
    question: 'Aynı karbon sayısına sahip hangi organik bileşik sınıfları birbirinin "fonksiyonel grup izomeri"dir?',
    answer: 'Alkol–Eter (CₙH₂ₙ₊₂O),  Aldehit–Keton (CₙH₂ₙO),  Karboksilik Asit–Ester (CₙH₂ₙO₂)',
    distractors: [
      'Alkol–Aldehit,  Eter–Keton,  Alkan–Alken',
      'Karboksilik Asit–Alkol,  Ester–Eter',
      'Alkin–Alkan,  Aldehit–Karboksilik Asit'
    ],
    category: 'İzomerlik & Organik Tepkimeler',
    examHighlight: 'UNUTMA: Metanol (1C alkol) ve Metanal/Formaldehit (1C aldehit), Propanon/Aseton (en küçük keton 3C), Formik asit (1C asit) için aynı karbonlu eter/keton/ester izomeri YOKTUR! (Eter ≥2C, Keton ≥3C, Ester ≥2C).'
  },
  {
    id: 'eo-alken-sikloalkan-izomeri',
    question: 'Genel formülü CₙH₂ₙ (n ≥ 3) olan açık zincirli monoalkenler hangi sınıf bileşiklerle yapı izomeridir?',
    answer: 'Sikloalkanlar ile (aynı C sayısında)',
    distractors: [
      'Alkinler ile (CₙH₂ₙ₋₂)',
      'Doymuş alkanlar ile (CₙH₂ₙ₊₂)',
      'Alkadienler ile (CₙH₂ₙ₋₂)'
    ],
    category: 'İzomerlik & Organik Tepkimeler',
    examHighlight: 'Aynı genel formüle sahip çiftler: Monoalken ↔ Sikloalkan (CₙH₂ₙ);  Alkin ↔ Alkadien ↔ Sikloalken (CₙH₂ₙ₋₂).'
  },
  {
    id: 'eo-markovnikov-kurali',
    question: 'Asimetrik bir alkene (ör. propen: CH₃–CH=CH₂) HCl veya H₂O katılırken Markovnikov Kuralına göre H⁺ nereye bağlanır?',
    answer: 'İkili bağ karbonlarından HİDROJENİ ÇOK OLANA (zengin daha zengin olur) H⁺, hidrojeni az olana Cl⁻/OH⁻ bağlanır',
    distractors: [
      'Hidrojeni az olana H⁺, hidrojeni çok olana Cl⁻ bağlanır',
      'Her zaman zincirin ortasındaki karbona H⁺ bağlanır',
      'Katılma sadece eşit sayıda hidrojen varsa gerçekleşir'
    ],
    category: 'İzomerlik & Organik Tepkimeler',
    examHighlight: 'Markovnikov ana ürün: CH₃–CH=CH₂ + HCl → CH₃–CH(Cl)–CH₃ (2-kloropropan). Daha kararlı karbokatyon ara ürünü üzerinden yürür.'
  },
  {
    id: 'eo-zaitsev-kurali',
    question: 'Alkollerden su çekilmesi (H₂SO₄, 170 °C) veya alkil halojenürlerden HX ayrılması sırasında alken oluşurken Zaitsev Kuralı ne der?',
    answer: 'Çift bağın çevresinde en çok alkil grubu taşıyan (daha sübstitüe, hidrojeni az karbonun H kaybettiği) alken ANA ÜRÜN olur',
    distractors: [
      'Her zaman en uçtaki (en az sübstitüe) alken ana ürün olur',
      'Yalnızca alkin elde edilir',
      'Hidrojeni en çok olan yan karbondan H kopar'
    ],
    category: 'İzomerlik & Organik Tepkimeler',
    examHighlight: 'Örn: 2-bütanol’den su çekilirken (H₂SO₄/ısı) 1-büten yerine daha kararlı olan 2-büten (ana ürün) oluşur ("Fakirden alınır" — Zaitsev).'
  },
  {
    id: 'eo-esterlesme-hidroliz',
    question: 'Bir karboksilik asit (R–COOH) ile bir alkolün (R’–OH) asit katalizörlüğünde denge tepkimesiyle ester ve su oluşturmasına ne ad verilir?',
    answer: 'Esterleşme (Kondenzasyon) — Tersine ise Ester Hidrolizi denir',
    distractors: [
      'Sabunlaşma (Bazik ortamda geri dönüşümsüz)',
      'Katılma Tepkimesi',
      'Polimerleşme'
    ],
    category: 'İzomerlik & Organik Tepkimeler',
    examHighlight: 'ÖSYM AYRINTISI: Esterleşmede kopan –OH grubu karboksilik asitten, –H atomu ise alkolden gelir! Esterin NaOH/KOH ile tepkimesi ise "Sabunlaşma"dır (tuz + alkol).'
  },
  {
    id: 'eo-alkol-etilen-oksidasyon-ayrinti',
    question: 'Aynı karbon sayılı etanol (CH₃CH₂OH) ve dimetil eterin (CH₃–O–CH₃) kaynama noktaları neden farklıdır?',
    answer: 'Etanol molekülleri arasında HİDROJEN BAĞI varken dimetil eterde yalnızca dipol-dipol ve London kuvvetleri vardır',
    distractors: [
      'Dimetil eterin mol kütlesi daha küçüktür',
      'Dimetil eterde hidrojen bağı daha kuvvetlidir',
      'Etanol apolar bir moleküldür'
    ],
    category: 'İzomerlik & Organik Tepkimeler',
    examHighlight: 'Etanol 78 °C’de kaynarken izomeri dimetil eter -24 °C’de gazdır! Çünkü O–H bağı yalnızca alkolde vardır (eterde H oksijene direkt bağlı değildir).'
  },
  {
    id: 'eo-alkol-siniflandirma',
    question: '2-metil-2-propanol [(CH₃)₃C–OH] bileşiği kaçıncı sınıf alkoldür ve KMnO₄ ile yükseltgenebilir mi?',
    answer: 'Tersiyer (3°) alkoldür ve yükseltgenme tepkimesi VERMEZ',
    distractors: [
      'Sekonder (2°) alkoldür ve ketona yükseltgenir',
      'Primer (1°) alkoldür ve aldehite yükseltgenir',
      'Tersiyer (3°) alkoldür ve karboksilik aside yükseltgenir'
    ],
    category: 'İzomerlik & Organik Tepkimeler',
    examHighlight: '–OH’ın bağlı olduğu karbonda 2 H varsa 1° (aldehit→asit), 1 H varsa 2° (keton), hiç H yoksa 3° alkoldür ve yükseltgenmez!'
  }
];

export function electrochemistryOrganicToQuizItem(item: ElectrochemistryOrganicItem): StandardQuizItem {
  return {
    id: item.id,
    prompt: item.question,
    promptSub: `Konu: ${item.category}`,
    answer: item.answer,
    distractors: item.distractors,
    category: item.category,
    infoChips: [
      { label: 'Kategori', value: item.category },
      { label: 'Doğru Cevap', value: item.answer },
      { label: 'ÖSYM Notu', value: item.examHighlight }
    ],
    hint: item.examHighlight
  };
}
