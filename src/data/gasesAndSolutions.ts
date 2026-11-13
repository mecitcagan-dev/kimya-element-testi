import { StandardQuizItem } from '../types/topics';

export type GasesSolutionsCategory =
  | 'Gaz Yasaları & İdeal Gaz'
  | 'Graham Difüzyon Yasası'
  | 'Su Üstünde Gaz & Buhar Basıncı'
  | 'Gerçek Gazlar & Joule-Thomson'
  | 'Koligatif Özellikler & Van’t Hoff'
  | 'Tuz Sınıfları & Hidroliz';

export interface GasesSolutionsItem {
  id: string;
  question: string;
  answer: string;
  distractors: [string, string, string];
  category: GasesSolutionsCategory;
  examHighlight: string;
}

export const GASES_AND_SOLUTIONS: GasesSolutionsItem[] = [
  // 1. GAZ YASALARI & KELVİN ZORUNLULUĞU
  {
    id: 'gs-boyle-yasasi',
    question: 'Sabit sıcaklık (T) ve sabit mol sayısında (n) bir gazın basıncı (P) ile hacmi (V) arasındaki ilişkiyi veren yasa hangisidir?',
    answer: 'Boyle Yasası (P·V = sabit — Ters orantı)',
    distractors: [
      'Charles Yasası (V/T = sabit — Doğru orantı)',
      'Gay-Lussac Yasası (P/T = sabit — Doğru orantı)',
      'Avogadro Yasası (V/n = sabit — Doğru orantı)'
    ],
    category: 'Gaz Yasaları & İdeal Gaz',
    examHighlight: 'Boyle Yasası: P₁·V₁ = P₂·V₂. Sıcaklık ve mol sabitken basınç 2 katına çıkarılırsa hacim yarıya iner (hiperbolik grafik).'
  },
  {
    id: 'gs-charles-gay-lussac',
    question: 'Sabit basınçta (P) ve sabit molde (n) hacim-sıcaklık ilişkisini inceleyen yasa ile sabit hacimde (V) basınç-sıcaklık ilişkisini inceleyen yasa sırasıyla hangileridir?',
    answer: 'Charles Yasası (V-T) ve Gay-Lussac Yasası (P-T)',
    distractors: [
      'Boyle Yasası (V-T) ve Avogadro Yasası (P-T)',
      'Gay-Lussac Yasası (V-T) ve Charles Yasası (P-T)',
      'Graham Yasası (V-T) ve Dalton Yasası (P-T)'
    ],
    category: 'Gaz Yasaları & İdeal Gaz',
    examHighlight: 'Charles: V₁/T₁ = V₂/T₂ (sabit P, n). Gay-Lussac: P₁/T₁ = P₂/T₂ (sabit V, n). Avogadro: V₁/n₁ = V₂/n₂ (sabit P, T).'
  },
  {
    id: 'gs-kelvin-zorunlulugu',
    question: '27 °C sıcaklıktaki ideal bir gazın sabit hacimde basıncını 2 katına çıkarmak için sıcaklık kaç °C yapılmalıdır?',
    answer: '327 °C (Mutlak sıcaklık T = 300 K → 600 K olmalıdır)',
    distractors: [
      '54 °C (27 °C’nin iki katı)',
      '273 °C',
      '600 °C'
    ],
    category: 'Gaz Yasaları & İdeal Gaz',
    examHighlight: 'ÖSYM’NİN EN KLASİK TUZAĞI: Gaz yasalarında tüm hesaplamalar mutlaka KELVİN (T = °C + 273) üzerinden yapılır! 27 °C = 300 K; iki katı 600 K = 327 °C’dir.'
  },
  {
    id: 'gs-avogadro-yasasi',
    question: 'Aynı sıcaklık ve basınçtaki tüm ideal gazların eşit hacimlerinde eşit sayıda tanecik (mol) bulunduğunu ifade eden yasa hangisidir?',
    answer: 'Avogadro Yasası (V₁/n₁ = V₂/n₂)',
    distractors: [
      'Dalton Kısmi Basınçlar Yasası',
      'Boyle-Mariotte Yasası',
      'Henry Çözünürlük Yasası'
    ],
    category: 'Gaz Yasaları & İdeal Gaz',
    examHighlight: 'Normal koşullarda (0 °C, 1 atm) 1 mol ideal gaz türü ne olursa olsun 22,4 L; oda koşullarında (25 °C, 1 atm) 24,5 L hacim kaplar.'
  },
  {
    id: 'gs-ideal-gaz-yogunluk',
    question: 'İdeal gaz denkleminden (P·V = n·R·T) türetilen gaz özkütlesi (d) formülü aşağıdakilerden hangisidir?',
    answer: 'P·Mₐ = d·R·T',
    distractors: [
      'P·d = Mₐ·R·T',
      'V·Mₐ = d·R·T',
      'P·V = d·Mₐ·T'
    ],
    category: 'Gaz Yasaları & İdeal Gaz',
    examHighlight: 'Kodlama: "Pijama Daha Rahat" (P·Mₐ = d·R·T). Sabit P ve T’de bir gazın yoğunluğu mol kütlesi (Mₐ) ile doğru orantılıdır.'
  },
  {
    id: 'gs-dalton-kismi-basinc',
    question: 'Sabit hacim ve sıcaklıktaki bir gaz karışımında herhangi bir X gazının kısmi basıncı (P_X) nasıl hesaplanır?',
    answer: 'P_X = P_toplam · X_mol_kesri   (X_mol_kesri = n_X / n_toplam)',
    distractors: [
      'P_X = P_toplam · (m_X / m_toplam)',
      'P_X = P_toplam / n_X',
      'P_X = P_toplam · √(M_X)'
    ],
    category: 'Gaz Yasaları & İdeal Gaz',
    examHighlight: 'Dalton Kısmi Basınçlar Yasası: Bir gazın kısmi basıncı kütlesiyle değil, MOL SAYISI (mol kesri) ile doğru orantılıdır!'
  },

  // 2. GRAHAM DİFÜZYON YASASI
  {
    id: 'gs-graham-formulu',
    question: 'Graham Difüzyon Yasasına göre iki gazın ortalama difüzyon hızlarının oranı (v₁ / v₂) mol kütleleri (M) ve mutlak sıcaklıkları (T) ile nasıl ilişkilidir?',
    answer: 'v₁ / v₂ = √(M₂ / M₁) · √(T₁ / T₂)',
    distractors: [
      'v₁ / v₂ = (M₂ / M₁) · (T₁ / T₂)',
      'v₁ / v₂ = √(M₁ / M₂) · √(T₂ / T₁)',
      'v₁ / v₂ = (M₁ / M₂)² · (T₁ / T₂)'
    ],
    category: 'Graham Difüzyon Yasası',
    examHighlight: 'Gazların ortalama kinetik enerjisi sadece mutlak sıcaklığa (T) bağlıdır. Aynı sıcaklıkta hafif gaz daha hızlıdır (hız, √Mₐ ile ters orantılıdır).'
  },
  {
    id: 'gs-graham-he-ch4',
    question: 'Aynı sıcaklıkta ₂He (Mₐ = 4 g/mol) gazının difüzyon hızı, CH₄ (Mₐ = 16 g/mol) gazının difüzyon hızının kaç katıdır?',
    answer: '2 katıdır (√(16/4) = √4 = 2)',
    distractors: [
      '4 katıdır',
      '1/2 katıdır',
      '√2 katıdır'
    ],
    category: 'Graham Difüzyon Yasası',
    examHighlight: 'v(He) / v(CH₄) = √(16 / 4) = 2. Aynı uzunluktaki bir borudan CH₄’ün çıkması 20 saniye sürüyorsa He gazı 10 saniyede çıkar (süre hızla ters orantılıdır).'
  },
  {
    id: 'gs-graham-so2-o2',
    question: 'SO₂ (Mₐ = 64 g/mol) ve O₂ (Mₐ = 32 g/mol) gazları aynı sıcaklıktayken hız oranları ve efüzyon süreleri arasındaki ilişki nedir?',
    answer: 'O₂, SO₂’den √2 kat hızlıdır; aynı delikten çıkış süresi daha kısadır',
    distractors: [
      'SO₂, O₂’den 2 kat hızlıdır',
      'O₂, SO₂’den 2 kat hızlıdır',
      'Aynı sıcaklıkta hızları eşittir'
    ],
    category: 'Graham Difüzyon Yasası',
    examHighlight: 'v(O₂)/v(SO₂) = √(64/32) = √2. Hız ile efüzyon/difüzyon süresi ters orantılıdır: t(SO₂) / t(O₂) = v(O₂) / v(SO₂) = √2.'
  },
  {
    id: 'gs-graham-sicaklik-etkisi',
    question: 'CH₄ (Mₐ = 16 g/mol) gazının sıcaklığı T iken SO₂ (Mₐ = 64 g/mol) gazının difüzyon hızının CH₄’e eşit olabilmesi için SO₂’nin mutlak sıcaklığı kaç T olmalıdır?',
    answer: '4T (√(16/64) · √(T_SO₂/T) = 1 → T_SO₂ = 4T)',
    distractors: [
      '2T',
      '8T',
      'T/4'
    ],
    category: 'Graham Difüzyon Yasası',
    examHighlight: 'Mₐ oranı 4 kat (64/16 = 4) olduğundan hızların eşitlenmesi için ağır olan SO₂ gazının mutlak sıcaklığı (Kelvin) 4 katına çıkarılmalıdır.'
  },

  // 3. SU ÜSTÜNDE GAZ TOPLAMA & BUHAR BASINCI
  {
    id: 'gs-buhar-basinci-3s',
    question: 'Bir sıvının denge buhar basıncı yalnızca hangi 3 faktöre (3S Kuralı) bağlıdır?',
    answer: 'Sıcaklık, Sıvının cinsi (moleküller arası çekim) ve Saflık (çözünen madde)',
    distractors: [
      'Sıcaklık, Kabın hacmi ve Dış basınç',
      'Sıvı miktarı, Yüzey alanı ve Kabın şekli',
      'Pistonun konumu, Sıcaklık ve Gaz basıncı'
    ],
    category: 'Su Üstünde Gaz & Buhar Basıncı',
    examHighlight: '3S KURALI (Sıcaklık, Sıvının cinsi, Saflık): Buhar basıncı kabın hacmine, pistonun itilip çekilmesine, dış basınca veya sıvı miktarına BAĞLI DEĞİLDİR!'
  },
  {
    id: 'gs-su-ustunde-gaz-piston',
    question: 'Sabit sıcaklıkta su üzerinde toplanan ideal bir gaz (He) bulunan pistonlu kapta piston aşağı itilerek gaz hacmi yarıya indirilirse toplam basınç ve suyun buhar basıncı nasıl değişir?',
    answer: 'P(He) iki katına çıkar, P(H₂O buhar) DEĞİŞMEZ',
    distractors: [
      'Hem P(He) hem P(H₂O buhar) iki katına çıkar',
      'P_toplam = 2 · (P_He + P_buhar) olur',
      'P(He) yarıya düşer, P(H₂O buhar) artar'
    ],
    category: 'Su Üstünde Gaz & Buhar Basıncı',
    examHighlight: 'ÖSYM’NİN FAVORİ SORUSU: P_toplam = P_gaz + P_buhar. Sıcaklık sabit olduğundan hacim yarıya inse bile bir miktar buhar yoğuşur ve P_buhar SABİT kalır; P_gaz ise 2 katına çıkar!'
  },
  {
    id: 'gs-kaynama-buhar-basinci',
    question: 'Aynı dış basınç altındaki açık kaplarda kaynamakta olan saf su (100 °C), etil alkol (78 °C) ve tuzlu suyun (102 °C) buhar basınçları arasındaki ilişki nedir?',
    answer: 'Üçünün de buhar basıncı birbirine EŞİTTİR (Dış basınca eşit)',
    distractors: [
      'Tuzlu su > Saf su > Etil alkol',
      'Etil alkol > Saf su > Tuzlu su',
      'Saf su > Tuzlu su > Etil alkol'
    ],
    category: 'Su Üstünde Gaz & Buhar Basıncı',
    examHighlight: 'TANIM GEREĞİ: Kaynama, sıvının buhar basıncının dış basınca (P₀) eşit olduğu andır. Aynı ortamda kaynayan TÜM sıvıların buhar basınçları eşittir!'
  },

  // 4. GERÇEK GAZLAR & JOULE-THOMSON
  {
    id: 'gs-gercek-gaz-ideallesme',
    question: 'Gerçek bir gazın ideal gaz davranışına en fazla yaklaşabilmesi için hangi koşullar sağlanmalıdır?',
    answer: 'Yüksek sıcaklık, Düşük basınç, Küçük mol kütlesi ve Apolar yapı',
    distractors: [
      'Düşük sıcaklık, Yüksek basınç, Polar yapı',
      'Yüksek basınç, Büyük mol kütlesi, Düşük sıcaklık',
      'Kritik sıcaklığın altında yüksek basınç'
    ],
    category: 'Gerçek Gazlar & Joule-Thomson',
    examHighlight: 'Gaz tanecikleri birbirinden ne kadar uzak ve etkileşimleri ne kadar zayıfsa (Yüksek T, Düşük P, apolar küçük molekül: H₂, He) o kadar idealdir.'
  },
  {
    id: 'gs-kritik-sicaklik-sivilasma',
    question: 'Basınç uygulanarak hiçbir şekilde sıvılaştırılamayan bir akışkan hakkında ne söylenebilir?',
    answer: 'Kritik sıcaklığın (T_k) üzerindedir (Gaz haldedir, buhar değildir)',
    distractors: [
      'Üçlü nokta sıcaklığının altındadır',
      'Normal kaynama noktasının altındadır',
      'Yüksek basınçta her sıcaklıkta sıvılaşır'
    ],
    category: 'Gerçek Gazlar & Joule-Thomson',
    examHighlight: 'Kritik sıcaklığın altında basınçla sıvılaşabilen akışkana BUHAR, kritik sıcaklığın üstünde basınçla sıvılaşamayan akışkana GAZ denir.'
  },
  {
    id: 'gs-joule-thomson',
    question: 'Yüksek basınçtaki bir gazın küçük bir delikten hızla genleştirilerek soğumasını sağlayan ve buzdolabı/klima sistemlerinde kullanılan olay hangisidir?',
    answer: 'Joule-Thomson Olayı',
    distractors: [
      'Graham Difüzyonu',
      'Osmotik Basınç',
      'Sublimasyon Dengesi'
    ],
    category: 'Gerçek Gazlar & Joule-Thomson',
    examHighlight: 'Genleşen gerçek gaz tanecikleri birbirinden uzaklaşırken aralarındaki çekim kuvvetlerini yenmek için kendi kinetik enerjisini harcar ve ortamı soğutur (soğutucu akışkanlar).'
  },

  // 5. KOLİGATİF ÖZELLİKLER & VAN'T HOFF
  {
    id: 'gs-vant-hoff-tanecik',
    question: 'Suda tamamen çözündüğü varsayılan Glikoz (C₆H₁₂O₆), NaCl, CaCl₂ ve Al₂(SO₄)₃ maddelerinin Van’t Hoff tanecik sayıları (i) sırasıyla kaçtır?',
    answer: 'Glikoz: 1, NaCl: 2, CaCl₂: 3, Al₂(SO₄)₃: 5',
    distractors: [
      'Glikoz: 24, NaCl: 2, CaCl₂: 3, Al₂(SO₄)₃: 5',
      'Glikoz: 1, NaCl: 2, CaCl₂: 2, Al₂(SO₄)₃: 2',
      'Glikoz: 1, NaCl: 1, CaCl₂: 3, Al₂(SO₄)₃: 4'
    ],
    category: 'Koligatif Özellikler & Van’t Hoff',
    examHighlight: 'Koligatif özellikler çözünenin cinsine değil toplam tanecik (iyon/molekül) derişimine (m · i) bağlıdır! Glikoz moleküler çözünür (i=1); Al₂(SO₄)₃ → 2 Al³⁺ + 3 SO₄²⁻ (i=5).'
  },
  {
    id: 'gs-kaynama-noktasi-yukselmesi',
    question: 'Eşit molaliteli (1 m) sulu çözeltilerden hangisinin aynı ortamdaki kaynama noktası en yüksektir, donma noktası en düşüktür?',
    answer: '1 m Al(NO₃)₃ çözeltisi (Toplam 4 m iyon)',
    distractors: [
      '1 m KNO₃ çözeltisi (2 m iyon)',
      '1 m MgCl₂ çözeltisi (3 m iyon)',
      '1 m Sakkaroz (C₁₂H₂₂O₁₁) çözeltisi (1 m molekül)'
    ],
    category: 'Koligatif Özellikler & Van’t Hoff',
    examHighlight: 'ΔT_k = K_k · m · i ve ΔT_d = K_d · m · i. Toplam iyon derişimi (m · i) arttıkça kaynama noktası yükselir, donma noktası alçalır ve buhar basıncı düşer.'
  },
  {
    id: 'gs-doymamis-tuzlu-su-kaynama',
    question: '1 atm basınçta ısıtılan DOYMAMIŞ tuzlu su çözeltisi kaynarken sıcaklığı (T) ve buhar basıncı (P_buhar) nasıl değişir?',
    answer: 'T zamanla ARTAR (doygun olana kadar), P_buhar ise 1 atm’de SABİT kalır',
    distractors: [
      'Saf su gibi hem T hem P_buhar sabit kalır',
      'T sabit kalır, P_buhar zamanla artar',
      'T azalır, P_buhar artar'
    ],
    category: 'Koligatif Özellikler & Van’t Hoff',
    examHighlight: 'ÖSYM GRAFİK SORUSU: Doymamış tuzlu su kaynadıkça su buharlaşır, derişim artar, bu yüzden kaynama noktası T yükselmeye devam eder! Doygun hale gelip tuz çökmeye başlayınca T sabitlenir.'
  },
  {
    id: 'gs-osmoz-ters-osmoz',
    question: 'Yarı geçirgen zar üzerinden çözücü moleküllerinin derişik çözeltiden seyreltik çözeltiye geçmesini sağlayan su arıtım yöntemi hangisidir?',
    answer: 'Ters Osmoz (Derişik tarafa osmotik basınçtan büyük basınç uygulanır)',
    distractors: [
      'Doğal Osmoz (Seyreltikten derişiğe geçiş)',
      'Basit Damıtma',
      'Fraksiyonlu Kristallendirme'
    ],
    category: 'Koligatif Özellikler & Van’t Hoff',
    examHighlight: 'Normal osmozda su seyreltikten derişiğe geçer; ters osmozda (deniz suyundan içme suyu eldesi) derişik tarafa dış basınç uygulanarak saf su seyreltik tarafa geçirilir.'
  },
  {
    id: 'gs-raoult-yasasi',
    question: 'Uçucu olmayan bir katı suda çözündüğünde oluşan çözeltinin buhar basıncı neden saf suyunkinden düşük olur?',
    answer: 'Yüzeydeki su moleküllerinin oranı azaldığı için (Raoult Yasası: P_çöz = P₀_su · X_su)',
    distractors: [
      'Çözeltinin kütlesi arttığı için',
      'Katının buhar basıncı negatif olduğu için',
      'Suyun molar kütlesi büyüdüğü için'
    ],
    category: 'Koligatif Özellikler & Van’t Hoff',
    examHighlight: 'Raoult Yasası: P_çözelti = P°_çözücü · X_çözücü (mol kesri). Çözünen tanecikler su molekülleriyle etkileşerek buharlaşmayı zorlaştırır.'
  },

  // 6. TUZ SINIFLARI & HİDROLİZ
  {
    id: 'gs-notr-tuz-hidroliz',
    question: 'Kuvvetli asit (HCl) ile kuvvetli bazın (NaOH) tepkimesinden oluşan NaCl tuzunun sulu çözeltisinin pH özelliği ve hidroliz durumu nedir?',
    answer: 'Nötrdür (25 °C’de pH = 7), hiçbir iyonu hidroliz OLMAZ',
    distractors: [
      'Asidiktir, Cl⁻ iyonu hidroliz olur',
      'Baziktir, Na⁺ iyonu hidroliz olur',
      'Nötrdür ama hem Na⁺ hem Cl⁻ hidroliz olur'
    ],
    category: 'Tuz Sınıfları & Hidroliz',
    examHighlight: 'KURAL: Yalnızca ZAYIF asit veya ZAYIF bazdan gelen iyonlar suyla tepkimeye girer (hidroliz olur)! Kuvvetliden gelenler (Na⁺, K⁺, Cl⁻, NO₃⁻) hidroliz olmaz.'
  },
  {
    id: 'gs-asidik-tuz-nh4cl',
    question: 'NH₄Cl (Nişadır) tuzunun sulu çözeltisi neden asidik (pH < 7) özellik gösterir?',
    answer: 'Zayıf bazdan (NH₃) gelen katyonu NH₄⁺ hidroliz olup H₃O⁺ oluşturduğu için',
    distractors: [
      'Kuvvetli asitten gelen Cl⁻ hidroliz olduğu için',
      'NH₄Cl yapısında serbest HCl bulunduğu için',
      'Hem NH₄⁺ hem Cl⁻ eşit oranda hidroliz olduğu için'
    ],
    category: 'Tuz Sınıfları & Hidroliz',
    examHighlight: 'NH₄Cl: Kuvvetli asit (HCl) + Zayıf baz (NH₃) → Asidik tuz. Hidroliz denklemi: NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺.'
  },
  {
    id: 'gs-bazik-tuz-ch3coona',
    question: 'CH₃COONa (Sodyum asetat) ve NaHCO₃ tuzlarının sulu çözeltilerinin bazik (pH > 7) olmasının nedeni nedir?',
    answer: 'Zayıf asitten gelen anyonları (CH₃COO⁻, HCO₃⁻) su ile hidroliz olup OH⁻ ürettiği için',
    distractors: [
      'Na⁺ katyonunun suyla H₂ gazı çıkarması nedeniyle',
      'Kuvvetli asit tuzları oldukları için',
      'Zayıf bazdan gelen katyonları hidroliz olduğu için'
    ],
    category: 'Tuz Sınıfları & Hidroliz',
    examHighlight: 'Zayıf asit (CH₃COOH, H₂CO₃) + Kuvvetli baz (NaOH) → Bazik tuz! Hidroliz: CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻.'
  },
  {
    id: 'gs-tampon-cozelti',
    question: 'Az miktarda asit veya baz eklendiğinde pH değişimine karşı direnç gösteren "Tampon Çözelti" nasıl hazırlanır?',
    answer: 'Zayıf asit + onun eşlenik (konjuge) bazının tuzu (örn. CH₃COOH / CH₃COONa) veya zayıf baz + konjuge asidinin tuzu (NH₃ / NH₄Cl)',
    distractors: [
      'Kuvvetli asit + kuvvetli bazın nötr tuzu (HCl / NaCl)',
      'Yalnızca saf su + NaCl',
      'İki farklı kuvvetli asidin karışımı'
    ],
    category: 'Tuz Sınıfları & Hidroliz',
    examHighlight: 'ÖSYM KONTROLÜ: Kuvvetli asit/bazdan (ör. HCl + NaCl) tampon çözelti YAPILAMAZ! Mutlaka zayıf eşlenik çift gerekir (kanımızdaki H₂CO₃ / HCO₃⁻ sistemi gibi).'
  }
];

export function gasesSolutionsToQuizItem(item: GasesSolutionsItem): StandardQuizItem {
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
