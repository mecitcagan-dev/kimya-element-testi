import { StandardQuizItem } from '../types/topics';

export type QuantumCategory =
  | 'Kuantum Sayıları & Orbitaller'
  | 'Aufbau, Pauli & Hund'
  | 'Küresel Simetri & İyonlar'
  | 'Periyodik Yer & Blok'
  | 'Manyetik Özellikler';

export interface QuantumOrbitalItem {
  id: string;
  question: string;
  answer: string;
  distractors: [string, string, string];
  category: QuantumCategory;
  examHighlight: string;
}

export const QUANTUM_ORBITALS: QuantumOrbitalItem[] = [
  // 1. KUANTUM SAYILARI & ORBİTAL SAYILARI
  {
    id: 'qo-bas-kuantum',
    question: 'Baş kuantum sayısı (n) elektronun hangi temel özelliğini belirler?',
    answer: 'Enerji düzeyini (kabuğu) ve çekirdeğe ortalama uzaklığını',
    distractors: [
      'Orbitalin uzaydaki yönelimini',
      'Orbitalin geometrik şeklini',
      'Elektronun kendi eksenindeki dönme yönünü'
    ],
    category: 'Kuantum Sayıları & Orbitaller',
    examHighlight: 'n = 1, 2, 3, 4... tam sayı değerleri alır (K, L, M, N kabukları). n arttıkça orbitalin büyüklüğü ve enerjisi artar.'
  },
  {
    id: 'qo-acisal-momentum',
    question: 'Açısal momentum (ikincil) kuantum sayısı ℓ = 2 olan orbital türü ve orbital sayısı aşağıdakilerden hangisidir?',
    answer: 'd orbitali — 5 adet orbital (en fazla 10 e⁻)',
    distractors: [
      'p orbitali — 3 adet orbital (en fazla 6 e⁻)',
      'f orbitali — 7 adet orbital (en fazla 14 e⁻)',
      's orbitali — 1 adet orbital (en fazla 2 e⁻)'
    ],
    category: 'Kuantum Sayıları & Orbitaller',
    examHighlight: 'ℓ değerleri: s→0 (1 orbital), p→1 (3 orbital), d→2 (5 orbital), f→3 (7 orbital). Her orbital en fazla 2 zıt spinli elektron alır.'
  },
  {
    id: 'qo-ml-sayisi',
    question: 'n = 3, ℓ = 1 kuantum sayılarına sahip bir elektron için manyetik kuantum sayısı (mℓ) hangi değerleri alabilir?',
    answer: '-1, 0, +1 (3p orbitalleri)',
    distractors: [
      '-2, -1, 0, +1, +2',
      'Yalnızca 0',
      '-1/2 ve +1/2'
    ],
    category: 'Kuantum Sayıları & Orbitaller',
    examHighlight: 'mℓ değerleri -ℓ ile +ℓ arasındaki tüm tam sayılardır (2ℓ + 1 adet). ℓ = 1 (p) için mℓ ∈ {-1, 0, +1} olur.'
  },
  {
    id: 'qo-orbital-sekilleri',
    question: 'Küresel simetrik olan ve çekirdekten her doğrultuda aynı elektron yoğunluğunu gösteren orbital türü hangisidir?',
    answer: 's orbitali (ℓ = 0)',
    distractors: [
      'p orbitali (ℓ = 1, ikili lob)',
      'd orbitali (ℓ = 2, dörtlü yonca)',
      'f orbitali (ℓ = 3)'
    ],
    category: 'Kuantum Sayıları & Orbitaller',
    examHighlight: 's orbitalleri küresel (yönsüz) şekle sahiptir. p orbitalleri x, y, z eksenlerinde iki loplu (pₓ, pᵧ, p_z) şekildedir.'
  },
  {
    id: 'qo-spin-kuantum',
    question: 'Bir orbitaldeki iki elektrondan her birinin kendi ekseni etrafındaki dönme yönünü belirten kuantum sayısı hangisidir?',
    answer: 'Spin kuantum sayısı (ms = +1/2 veya -1/2)',
    distractors: [
      'Manyetik kuantum sayısı (mℓ)',
      'Baş kuantum sayısı (n)',
      'Açısal momentum kuantum sayısı (ℓ)'
    ],
    category: 'Kuantum Sayıları & Orbitaller',
    examHighlight: 'ms yalnızca +1/2 ve -1/2 değerlerini alır; aynı orbitaldeki iki elektronun spinleri daima zıttır.'
  },
  {
    id: 'qo-imkansiz-orbital',
    question: 'Temel enerji düzeyine göre aşağıdaki orbital gösterimlerinden hangisi kuantum kurallarına göre VAR OLAMAZ?',
    answer: '2d ve 3f orbitalleri',
    distractors: [
      '3d ve 4f orbitalleri',
      '2p ve 4s orbitalleri',
      '4d ve 5p orbitalleri'
    ],
    category: 'Kuantum Sayıları & Orbitaller',
    examHighlight: 'ℓ en fazla n - 1 olabilir! n = 2 iken ℓ = 0, 1 (s, p) olabilir; 2d (ℓ=2) imkânsızdır. Aynı şekilde 1p ve 3f yoktur.'
  },
  {
    id: 'qo-katman-kapasite',
    question: 'Baş kuantum sayısı n = 3 olan temel enerji düzeyinde toplam kaç orbital ve en fazla kaç elektron bulunur?',
    answer: '9 orbital (n²) ve en fazla 18 elektron (2n²)',
    distractors: [
      '4 orbital ve en fazla 8 elektron',
      '16 orbital ve en fazla 32 elektron',
      '6 orbital ve en fazla 12 elektron'
    ],
    category: 'Kuantum Sayıları & Orbitaller',
    examHighlight: 'n. katmanda toplam n² orbital (n=3 için 3s:1 + 3p:3 + 3d:5 = 9) ve maksimum 2n² elektron (18) yer alır.'
  },

  // 2. AUFBAU, MADELUNG (n+ℓ), PAULİ & HUND
  {
    id: 'qo-madelung-enerji',
    question: 'Çok elektronlu bir atomda 4s, 3d ve 4p orbitallerinin enerji sıralaması (Madelung-Kletchkowski n + ℓ kuralına göre) nasıldır?',
    answer: '4s < 3d < 4p',
    distractors: [
      '3d < 4s < 4p',
      '4s < 4p < 3d',
      '4p < 3d < 4s'
    ],
    category: 'Aufbau, Pauli & Hund',
    examHighlight: 'n+ℓ değerleri: 4s (4+0=4), 3d (3+2=5), 4p (4+1=5). n+ℓ eşit olduğunda n küçük olanın (3d) enerjisi daha düşüktür!'
  },
  {
    id: 'qo-pauli-ilkesi',
    question: 'Bir atomdaki iki elektronun dört kuantum sayısının (n, ℓ, mℓ, ms) aynı anda eşit olamayacağını belirten ilke hangisidir?',
    answer: 'Pauli Dışlama İlkesi',
    distractors: [
      'Hund Kuralı',
      'Aufbau İlkesi',
      'Heisenberg Belirsizlik İlkesi'
    ],
    category: 'Aufbau, Pauli & Hund',
    examHighlight: 'Pauli ilkesine göre aynı orbitalde en fazla 2 elektron bulunabilir ve bunların ms (spin) değerleri zıt olmak zorundadır.'
  },
  {
    id: 'qo-hund-kurali',
    question: 'Eş enerjili orbitallere (örneğin 2pₓ, 2pᵧ, 2p_z) elektronların önce birer birer ve aynı spinli olarak yerleşmesini zorunlu kılan kural hangisidir?',
    answer: 'Hund Kuralı',
    distractors: [
      'Pauli Dışlama İlkesi',
      'Madelung (n + ℓ) Kuralı',
      'De Broglie Dalga Eşitliği'
    ],
    category: 'Aufbau, Pauli & Hund',
    examHighlight: 'ÖSYM TUZAĞI: Eş enerjili p orbitallerine elektronlar tek tek koyulurken tümünün spini yukarı (+1/2) veya tümününki aşağı (-1/2) olabilir; önemli olan paralel olmalarıdır.'
  },
  {
    id: 'qo-uyarilmis-hal',
    question: '₆C atomunun 1s² 2s² 2pₓ¹ 2pᵧ¹ yerine 1s² 2s² 2pₓ¹ 3s¹ şeklindeki dizilimi neyi ifade eder?',
    answer: 'Uyarılmış hal (kararsız, yüksek enerjili)',
    distractors: [
      'Temel hal küresel simetri',
      'Pauli ilkesine aykırı imkânsız durum',
      'Hund kuralı ihlali ama temel hal'
    ],
    category: 'Aufbau, Pauli & Hund',
    examHighlight: 'Elektronun daha yüksek enerjili üst bir orbitale (2p yerine 3s) geçmesi uyarılma (absorpsiyon) sonucudur; kararsızdır, ışıyarak temel hale döner.'
  },

  // 3. KÜRESEL SİMETRİ & İYONLAR
  {
    id: 'qo-cr-istisnasi',
    question: '₂₄Cr (Krom) atomunun TEMEL HAL elektron dizilimi aşağıdakilerden hangisidir?',
    answer: '[Ar] 4s¹ 3d⁵ (Küresel simetri)',
    distractors: [
      '[Ar] 4s² 3d⁴',
      '[Ar] 4s⁰ 3d⁶',
      '[Ar] 4s² 3d⁵'
    ],
    category: 'Küresel Simetri & İyonlar',
    examHighlight: 'ÖSYM KLASİĞİ: ₂₄Cr atomunda 4s² 3d⁴ yerine kendiliğinden 4s¹ 3d⁵ dizilimi oluşur. Bu bir UYARILMA DEĞİL, küresel simetri sağlayan TEMEL HALDİR!'
  },
  {
    id: 'qo-cu-istisnasi',
    question: '₂₉Cu (Bakır) atomunun TEMEL HAL elektron dizilimi aşağıdakilerden hangisidir?',
    answer: '[Ar] 4s¹ 3d¹⁰ (Küresel simetri)',
    distractors: [
      '[Ar] 4s² 3d⁹',
      '[Ar] 4s⁰ 3d¹¹',
      '[Ar] 4s² 3d¹⁰'
    ],
    category: 'Küresel Simetri & İyonlar',
    examHighlight: '₂₉Cu temel halde [Ar] 4s¹ 3d¹⁰ dizilimine sahiptir (3d tam dolu, 4s yarı dolu). Bu nedenle s orbitalinde 1 elektron bulunur ve küresel simetriktir.'
  },
  {
    id: 'qo-kuresel-simetri-sarti',
    question: 'Bir atomun elektron diziliminde küresel simetri özelliği gösterebilmesi için son orbital türü nasıl olmalıdır?',
    answer: 'Son orbital tam dolu (s², p⁶, d¹⁰, f¹⁴) veya yarı dolu (s¹, p³, d⁵, f⁷) olmalıdır',
    distractors: [
      'Yalnızca tam dolu (s², p⁶, d¹⁰) olmalıdır',
      'Tüm elektronları çiftleşmiş olmalıdır',
      'En az 1 adet eşleşmemiş p elektronu içermelidir'
    ],
    category: 'Küresel Simetri & İyonlar',
    examHighlight: '1A (s¹), 2A (s²), 5A (p³), 8A (p⁶) ve Cr/Cu gibi yarı/tam dolu d⁵, d¹⁰ sonlu atomlar küresel simetrik yük dağılımına sahiptir.'
  },
  {
    id: 'qo-katyon-fe2',
    question: '₂₆Fe²⁺ katyonunun temel hal elektron dizilimi aşağıdakilerden hangisidir?',
    answer: '[Ar] 3d⁶ (4s² elektronları önce kopar)',
    distractors: [
      '[Ar] 4s² 3d⁴',
      '[Ar] 4s¹ 3d⁵',
      '[Ar] 3d⁸'
    ],
    category: 'Küresel Simetri & İyonlar',
    examHighlight: 'ÖSYM TUZAĞI: Geçiş metallerinden elektron koparılırken 3d yerine daima baş kuantum sayısı (n) en büyük olan en dış kabuktan, yani önce 4s’ten koparılır!'
  },
  {
    id: 'qo-katyon-ti2',
    question: '₂₂Ti²⁺ ve ₂₁Sc³⁺ iyonlarının temel hal elektron dizilimleri sırasıyla nasıl sonlanır?',
    answer: '₂₂Ti²⁺: [Ar] 3d²,  ₂₁Sc³⁺: [Ar] 3p⁶',
    distractors: [
      '₂₂Ti²⁺: [Ar] 4s²,  ₂₁Sc³⁺: [Ar] 4s⁰ 3d⁰ (yanlış)',
      '₂₂Ti²⁺: [Ar] 4s¹ 3d¹,  ₂₁Sc³⁺: [Ar] 3d¹',
      '₂₂Ti²⁺: [Ar] 3d⁴,  ₂₁Sc³⁺: [Ar] 3d³'
    ],
    category: 'Küresel Simetri & İyonlar',
    examHighlight: '₂₂Ti ([Ar] 4s² 3d²) iki elektron verdiğinde 4s² boşalır ve [Ar] 3d² kalır. ₂₁Sc³⁺ ise 4s² ve 3d¹ elektronlarını vererek Ar soygaz düzenine ulaşır.'
  },
  {
    id: 'qo-izoelektronik-tuzak',
    question: '₂₀Ca atomu ([Ar] 4s²) ile ₂₂Ti²⁺ iyonu ([Ar] 3d²) eşit sayıda (20) elektron taşımalarına rağmen izoelektronik midir?',
    answer: 'Hayır! Elektron sayıları aynı (20) olsa da elektron dizilimleri farklıdır',
    distractors: [
      'Evet, elektron sayıları eşit olan tüm tanecikler izoelektroniktir',
      'Evet, çünkü ikisinin de değerlik elektron sayısı 2’dir',
      'Hayır, çünkü nötr bir atom ile katyon asla izoelektronik olamaz'
    ],
    category: 'Küresel Simetri & İyonlar',
    examHighlight: 'ÖSYM TUZAĞI: İzoelektroniklik için hem elektron sayısı HEM elektron dizilimi aynı olmalıdır! ₂₀Ca ([Ar] 4s²) ile ₂₂Ti²⁺ ([Ar] 3d²) 20 e⁻ taşır ama dizilimleri farklı olduğundan izoelektronik DEĞİLDİR.'
  },

  // 4. PERİYODİK YER & BLOK BULMA
  {
    id: 'qo-blok-bulma',
    question: 'Temel hal elektron dizilimi ... 4s² 3d³ ile biten ₂₃V elementinin periyodik sistemdeki yeri ve bloğu nedir?',
    answer: '4. Periyot, 5B grubu — d bloğu (Geçiş metali)',
    distractors: [
      '3. Periyot, 5A grubu — p bloğu',
      '4. Periyot, 3B grubu — d bloğu',
      '4. Periyot, 5A grubu — s bloğu'
    ],
    category: 'Periyodik Yer & Blok',
    examHighlight: 'En büyük baş kuantum sayısı = Periyot (4). Son orbital d olduğu için d bloğu (B grubu). 4s² + 3d³ = 5 değerlik e⁻ → 5B.'
  },
  {
    id: 'qo-8b-gruplari',
    question: 'Elektron dizilimi ns² (n-1)d⁶, d⁷ veya d⁸ ile biten elementler hangi grupta yer alır?',
    answer: 'Hepsi 8B grubundadır (Toplamları 8, 9, 10 → 8B)',
    distractors: [
      'Sırasıyla 8B, 9B ve 10B gruplarında',
      'Sırasıyla 6B, 7B ve 8B gruplarında',
      'Hepsi 2B grubundadır'
    ],
    category: 'Periyodik Yer & Blok',
    examHighlight: 'IUPAC 8, 9 ve 10. sütunların (Fe, Co, Ni) tamamı geleneksel sistemde 8B grubudur. Toplam 11 ise 1B (Cu), 12 ise 2B (Zn) olur.'
  },
  {
    id: 'qo-helyum-istisnasi',
    question: 'Temel hal dizilimi 1s² ile bitmesine rağmen 2A grubunda DEĞİL, 8A grubunda yer alan istisna element hangisidir?',
    answer: '₂He (Helyum — s bloğunda görünse de değerlik/özellik olarak 8A soygazdır)',
    distractors: [
      '₄Be (Berilyum — 2A grubu)',
      '₁₀Ne (Neon — 2p⁶ ile biter)',
      '₁H (Hidrojen — 1s¹)'
    ],
    category: 'Periyodik Yer & Blok',
    examHighlight: 'ÖSYM İSTİSNASI: ₂He dizilimi 1s² ile biter (s bloğu dizilimi) ancak ilk kabuğu tam doldurduğu ve tepkimeye girmediği için 8A grubunun en tepesindedir!'
  },
  {
    id: 'qo-p-blogu-grup',
    question: 'Temel hal dizilimi 1s² 2s² 2p⁶ 3s² 3p⁴ ile biten ₁₆S atomunun bloğu, periyodu ve grubu nedir?',
    answer: 'p bloğu — 3. Periyot, 6A (16. Grup)',
    distractors: [
      'p bloğu — 3. Periyot, 4A (14. Grup)',
      's bloğu — 3. Periyot, 6A (16. Grup)',
      'p bloğu — 3. Periyot, 6B grubu'
    ],
    category: 'Periyodik Yer & Blok',
    examHighlight: 'Son orbital p ise grup numarası en dış s ve p elektronlarının toplamıdır: 3s² + 3p⁴ = 6 → 6A (IUPAC 16. grup).'
  },

  // 5. MANYETİK ÖZELLİKLER
  {
    id: 'qo-paramanyetik-vs-diyamanyetik',
    question: 'Temel hal elektron diziliminde en az 1 adet eşleşmemiş (tek) elektron bulunduran atom veya iyonlar hangi manyetik özelliği gösterir?',
    answer: 'Paramanyetik (Mıknatıs tarafından zayıfça çekilir)',
    distractors: [
      'Diyamanyetik (Mıknatıs tarafından hafifçe itilir)',
      'İzoelektronik',
      'İzoton'
    ],
    category: 'Manyetik Özellikler',
    examHighlight: 'Eşleşmemiş elektron varsa → Paramanyetik (ör. ₇N, ₈O, ₂₄Cr, ₂₆Fe²⁺). Tüm elektronlar çiftleşmişse → Diyamanyetik (ör. ₂He, ₄Be, ₁₀Ne, ₃₀Zn).'
  },
  {
    id: 'qo-cr-paramanyetik-sayisi',
    question: '₂₄Cr ([Ar] 4s¹ 3d⁵) atomunda temel halde kaç adet eşleşmemiş elektron bulunur?',
    answer: '6 adet (4s’te 1 + 3d’de 5 tek elektron — güçlü paramanyetik)',
    distractors: [
      '4 adet (3d⁴ yapısından dolayı)',
      '5 adet (yalnızca 3d⁵ elektronları)',
      '0 adet (diyamanyetik)'
    ],
    category: 'Manyetik Özellikler',
    examHighlight: 'Küresel simetri sonucu ₂₄Cr atomunda 4s’teki 1 ve 3d’deki 5 orbitalin tamamı yarı doludur; toplam 6 eşleşmemiş elektron taşır.'
  }
];

export function quantumOrbitalToQuizItem(item: QuantumOrbitalItem): StandardQuizItem {
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
