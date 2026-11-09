export interface PeriodicTrendItem {
  id: string;
  question: string;
  answer: string;
  category: 'İyonlaşma Enerjisi' | 'Elektron İlgisi & EN' | 'Atom Çapı' | 'Oksit & Asit Karakteri';
  examHighlight: string;
}

export const PERIODIC_TRENDS: PeriodicTrendItem[] = [
  {
    id: 'ei-istisnasi-cl-f',
    question: 'Periyodik sistemde elektron ilgisi en yüksek olan element hangisidir?',
    answer: 'Klor (Cl) — Flor değil!',
    category: 'Elektron İlgisi & EN',
    examHighlight: 'ÖSYM NİN EN SEVDİĞİ İSTİSNA: Genel kural sağa ve yukarı artsa da, Florun 2p orbitallerindeki yoğun itme nedeniyle Klorun elektron ilgisi Flordan daha büyüktür (Cl > F).'
  },
  {
    id: 'en-en-yuksek',
    question: 'Periyodik sistemde elektronegatifliği en yüksek olan element hangisidir?',
    answer: 'Flor (F) — Pauling ölçeğinde 4.0',
    category: 'Elektron İlgisi & EN',
    examHighlight: 'Elektronegatifliği en yüksek olan element Flordur (F). Bileşiklerinde SADECE -1 yükseltgenme basamağı alır.'
  },
  {
    id: 'soygaz-en',
    question: 'Soy gazların elektronegatiflik değeri genel olarak nasıldır?',
    answer: 'Tanımlanmaz / Yoktur (Bağ yapma eğilimleri yoktur)',
    category: 'Elektron İlgisi & EN',
    examHighlight: 'Elektronegatiflik kimyasal bağdaki elektronları çekme yeteneğidir. Standart koşullarda bağ yapmayan soy gazların elektronegatifliği yoktur.'
  },
  {
    id: 'ie-3-asagi-5-yukari',
    question: 'Aynı periyotta 1. İyonlaşma Enerjisi sıralaması nasıldır?',
    answer: '1A < 3A < 2A < 4A < 6A < 5A < 7A < 8A ("3 aşağı 5 yukarı")',
    category: 'İyonlaşma Enerjisi',
    examHighlight: '2A (ns2 tam dolu) ve 5A (ns2 np3 yarı dolu) grupları küresel simetri kararlılığına sahip olduğundan kendilerinden sonra gelen 3A ve 6A dan daha yüksek iyonlaşma enerjisine sahiptir.'
  },
  {
    id: 'cam-asindiran-asit',
    question: 'Zayıf asit olmasına rağmen cam ve porseleni (SiO2) aşındıran tek asit hangisidir?',
    answer: 'Hidroflorik Asit (HF)',
    category: 'Oksit & Asit Karakteri',
    examHighlight: 'HF zayıf bir asittir fakat SiO2 ile tepkimeye girip SiF4 gazı oluşturarak camı aşındırır. Bu yüzden plastik/teflon kaplarda saklanır.'
  },
  {
    id: 'hx-asitlik-kuvveti',
    question: 'Halojen asitlerinin (HF, HCl, HBr, HI) asitlik kuvveti sıralaması nasıldır?',
    answer: 'HF < HCl < HBr < HI (Aşağı doğru asitlik artar)',
    category: 'Oksit & Asit Karakteri',
    examHighlight: 'Grupta aşağı doğru yarıçap büyür, H-X bağı uzayıp zayıflar, H+ iyonu çözeltiye daha kolay verilir. Dolayısıyla HI en kuvvetli, HF zayıf asittir.'
  },
  {
    id: 'notr-oksitler',
    question: 'CO, NO ve N2O gazları ne tür oksitlerdir ve suyla tepkime verirler mi?',
    answer: 'Nötr Oksitlerdir — Su, asit ve bazla tepkime vermezler',
    category: 'Oksit & Asit Karakteri',
    examHighlight: 'Ametallerin oksijence fakir veya eşit olduğu oksitler (O sayısı <= Ametal) nötrdür. Asit yağmuru oluşturmazlar!'
  },
  {
    id: 'asidik-oksitler',
    question: 'CO2, SO2, SO3 ve N2O5 gazları suyla tepkimeye girdiğinde ne oluşturur?',
    answer: 'Asit Çözeltisi Oluştururlar (Asit Yağmuru)',
    category: 'Oksit & Asit Karakteri',
    examHighlight: 'Oksijence zengin ametal oksitleri asit anhidritleridir. Suyla tepkimeye girerek H2CO3, H2SO4 ve HNO3 oluştururlar.'
  },
  {
    id: 'amfoter-oksitler',
    question: 'Al2O3 ve ZnO gibi amfoter oksitler zayıf baz olan NH3 ile tepkime verir mi?',
    answer: 'Tepkime Vermezler! (Yalnızca kuvvetli bazlarla verirler)',
    category: 'Oksit & Asit Karakteri',
    examHighlight: 'Amfoter metaller ve oksitleri hem asitlerle hem de KUVVETLİ bazlarla tepkime verir; amonyak (NH3) gibi zayıf bazlarla tepkime vermezler.'
  },
  {
    id: 'izoelektronik-cap',
    question: 'İzoelektronik taneciklerde (7N3-, 8O2-, 9F-, 11Na+, 12Mg2+, 13Al3+) atom yarıçapı sıralaması nasıldır?',
    answer: 'N3- > O2- > F- > Na+ > Mg2+ > Al3+ (Proton sayısı arttıkça çap küçülür)',
    category: 'Atom Çapı',
    examHighlight: 'Elektron sayıları eşitken çekirdekteki proton sayısı ne kadar fazlaysa elektron başına düşen çekim kuvveti o kadar artar ve çap o kadar büzülür.'
  },
  {
    id: 'anyon-katyon-cap',
    question: 'Bir atom elektron verdiğinde (katyon) ve elektron aldığında (anyon) yarıçapı nasıl değişir?',
    answer: 'Elektron verince küçülür (Katyon < Nötr), elektron alınca büyür (Anyon > Nötr)',
    category: 'Atom Çapı',
    examHighlight: 'Örn: Fe3+ < Fe2+ < Fe ve Cl < Cl-. Elektron verilince birim elektron başına düşen çekim artar, katman büzülür.'
  },
  {
    id: 'ie-sicrama-kurali',
    question: 'İyonlaşma enerjisi tablosunda ardışık iki değer arasında en az kaç kat artış varsa grup numarası belirlenir?',
    answer: 'En az 3.5 — 4 Kat Sıçrama (Soy gaz kararlılığına ulaşıldığında)',
    category: 'İyonlaşma Enerjisi',
    examHighlight: 'Örneğin İE1=496, İE2=4562 (yaklaşık 9 kat sıçrama) olan bir element 1A grubundadır (valans elektron sayısı 1 dir).'
  }
];
