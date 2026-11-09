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
  },
  {
    id: 'yon-cap-soldan-saga',
    question: 'Aynı periyotta SOLDAN SAĞA doğru gidildikçe atom yarıçapı nasıl değişir?',
    answer: 'Azalır (Katman aynıyken proton çekimi arttığı için büzülür)',
    category: 'Atom Çapı',
    examHighlight: 'Kardan Adam Kuralı: Sağa doğru erir ve incelir. 1A periyodun en büyük, 7A/8A en küçük çaplısıdır.'
  },
  {
    id: 'yon-cap-yukaridan-asagiya',
    question: 'Aynı grupta YUKARIDAN AŞAĞIYA doğru inildikçe atom yarıçapı nasıl değişir?',
    answer: 'Artar (Her periyotta yeni bir elektron katmanı eklenir)',
    category: 'Atom Çapı',
    examHighlight: 'Kardan Adam Kuralı: Kardan adamın alt gövdesi en büyüktür. Katman artışı çekirdek çekiminden çok daha baskındır.'
  },
  {
    id: 'yon-en-soldan-saga',
    question: 'Aynı periyotta SOLDAN SAĞA doğru elektronegatiflik nasıl değişir?',
    answer: 'Artar (Flor 4.0 zirvedir, soy gazlar hariç)',
    category: 'Elektron İlgisi & EN',
    examHighlight: 'Çekirdek çekim gücü arttıkça bağ elektronlarını çekme gücü artar. 8A soy gazlarında elektronegatiflik tanımlanmaz.'
  },
  {
    id: 'yon-ie-yukaridan-asagiya',
    question: 'Aynı grupta YUKARIDAN AŞAĞIYA doğru 1. İyonlaşma Enerjisi nasıl değişir?',
    answer: 'Azalır (Çap büyüdüğü için dış elektronlar çok kolay kopar)',
    category: 'İyonlaşma Enerjisi',
    examHighlight: 'Çekirdekten uzaklaşan ve iç katmanlarca perdelenen değerlik elektronunu koparmak için daha az enerji gerekir.'
  },
  {
    id: 'yon-metalik-yukaridan-asagiya',
    question: 'Aynı grupta YUKARIDAN AŞAĞIYA doğru metalik aktiflik (elektron verme kolaylığı) nasıl değişir?',
    answer: 'Artar (Fransiyum ve Sezyum en aktif metallerdir)',
    category: 'Oksit & Asit Karakteri',
    examHighlight: 'Metaller elektron vererek reaksiyona girer. Çap büyüdükçe elektron vermek kolaylaşır, metalik reaktivite tavan yapar.'
  },
  {
    id: 'yon-ametalik-soldan-saga',
    question: 'Aynı periyotta SOLDAN SAĞA doğru ametalik aktiflik (elektron alma isteği) nasıl değişir?',
    answer: 'Artar (Flor periyodun ve tablonun en aktif ametalidir)',
    category: 'Oksit & Asit Karakteri',
    examHighlight: 'Çap küçüldükçe dışarıdan elektron yakalama isteği artar. 7A halojenleri periyotlarının en aktif ametalleridir.'
  },
  {
    id: 'yon-katman-des-periyot',
    question: 'Aynı periyotta SOLDAN SAĞA doğru değerlik elektron sayısı ve katman sayısı nasıl değişir?',
    answer: 'Değerlik elektron sayısı artar (1 den 8 e), Katman sayısı DEĞİŞMEZ',
    category: 'Atom Çapı',
    examHighlight: 'Aynı periyottaki tüm elementlerin baş kuantum (katman) sayısı eşittir; periyot numarası katman sayısını verir.'
  },
  {
    id: 'yon-des-grup',
    question: 'Aynı grupta YUKARIDAN AŞAĞIYA doğru değerlik elektron sayısı nasıl değişir?',
    answer: 'Değişmez (İstisna: He 2, gruptaki diğerleri 8 dir)',
    category: 'Atom Çapı',
    examHighlight: 'HELYUM TUZAĞI: 8A daki Helyum 2 değerlik elektronuna sahiptir; altındaki Ne, Ar, Kr ise 8 elektrona sahiptir.'
  }
];
