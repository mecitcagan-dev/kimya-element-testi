export interface PeriodicTrendItem {
  id: string;
  question: string;
  answer: string;
  distractors: string[];
  category: 'Soldan Sağa' | 'Yukarıdan Aşağıya' | 'Sağdan Sola' | 'Aşağıdan Yukarıya' | 'ÖSYM İstisnaları';
  examHighlight: string;
}

export const PERIODIC_TRENDS: PeriodicTrendItem[] = [
  // 1. SOLDAN SAĞA (Aynı Periyotta)
  {
    id: 'ss-artan-en',
    question: '➡️ Soldan sağa doğru (aynı periyotta) gidildikçe aşağıdakilerden hangisi ARTAR?',
    answer: 'Elektronegatiflik',
    distractors: ['Atom Yarıçapı', 'Metalik Karakter', 'Oksitlerin Bazlık Kuvveti'],
    category: 'Soldan Sağa',
    examHighlight: 'Proton sayısı ve çekirdek çekimi arttıkça bağ elektronlarını çekme gücü artar. 7A daki Flor (4.0) zirvedir (soy gazlar hariç).'
  },
  {
    id: 'ss-artan-ie',
    question: '➡️ Soldan sağa doğru (aynı periyotta) gidildikçe aşağıdakilerden hangisi GENELLİKLE ARTAR?',
    answer: '1. İyonlaşma Enerjisi (3 aşağı 5 yukarı ile)',
    distractors: ['Atom Yarıçapı', 'Metalik Aktiflik', 'Elektropozitiflik'],
    category: 'Soldan Sağa',
    examHighlight: 'Çap küçüldüğü için elektron koparmak zorlaşır. 2A ve 5A küresel simetri tepecikleri oluşturur (1A < 3A < 2A < 4A < 6A < 5A < 7A < 8A).'
  },
  {
    id: 'ss-artan-ametalik',
    question: '➡️ Soldan sağa doğru (aynı periyotta) gidildikçe aşağıdakilerden hangisi ARTAR?',
    answer: 'Ametalik Karakter & Ametal Oksit Asitliği',
    distractors: ['Metalik Karakter', 'Atom Yarıçapı', 'Oksitlerin Bazlığı'],
    category: 'Soldan Sağa',
    examHighlight: 'Elektron alma isteği arttığı için ametallik güçlenir. CO2 ve SO3 gibi asit anhidriti oksitler oluşur.'
  },
  {
    id: 'ss-azalan-cap',
    question: '➡️ Soldan sağa doğru (aynı periyotta) gidildikçe aşağıdakilerden hangisi AZALIR?',
    answer: 'Atom ve İyon Yarıçapı (Çap büzülür)',
    distractors: ['Elektronegatiflik', 'İyonlaşma Enerjisi', 'Proton Sayısı'],
    category: 'Soldan Sağa',
    examHighlight: 'Kardan Adam Kuralı: Katman sayısı aynı kalırken çekirdeğin proton çekimi (Zeff) arttığından atom büzülür ve çap küçülür.'
  },
  {
    id: 'ss-azalan-metalik',
    question: '➡️ Soldan sağa doğru (aynı periyotta) gidildikçe aşağıdakilerden hangisi AZALIR?',
    answer: 'Metalik Karakter & Elektropozitiflik',
    distractors: ['Elektronegatiflik', 'Ametalik Karakter', 'Değerlik Elektron Sayısı'],
    category: 'Soldan Sağa',
    examHighlight: 'Elektron vermek zorlaştığı için metalik aktiflik zayıflar; 1A metallerinden 7A ametallerine geçilir.'
  },
  {
    id: 'ss-degismez-katman',
    question: '➡️ Soldan sağa doğru (aynı periyotta) gidildikçe aşağıdakilerden hangisi DEĞİŞMEZ?',
    answer: 'Katman (Periyot) Sayısı',
    distractors: ['Atom Yarıçapı', 'Değerlik Elektron Sayısı', 'Elektronegatiflik'],
    category: 'Soldan Sağa',
    examHighlight: 'Aynı periyotta bulunulduğu için temel enerji düzeyi (baş kuantum sayısı) sabittir.'
  },

  // 2. SAĞDAN SOLA (Geriye Doğru)
  {
    id: 'sl-artan-cap',
    question: '⬅️ Sağdan sola doğru gidildikçe aşağıdakilerden hangisi ARTAR?',
    answer: 'Atom ve İyon Yarıçapı',
    distractors: ['Elektronegatiflik', '1. İyonlaşma Enerjisi', 'Ametalik Karakter'],
    category: 'Sağdan Sola',
    examHighlight: 'Proton çekim kuvveti zayıfladığı için elektron bulutu gevşer ve çap büyür. 1A periyodun en geniş çaplı atomlarıdır.'
  },
  {
    id: 'sl-artan-metalik',
    question: '⬅️ Sağdan sola doğru gidildikçe aşağıdakilerden hangisi ARTAR?',
    answer: 'Metalik Karakter & Oksitlerin Bazlığı',
    distractors: ['Elektronegatiflik', 'Ametalik Karakter', 'Asitlik Kuvveti'],
    category: 'Sağdan Sola',
    examHighlight: 'İyonlaşma enerjisi düştüğü için elektron verme isteği artar; Na2O ve K2O gibi kuvvetli bazik oksitler oluşur.'
  },
  {
    id: 'sl-azalan-en',
    question: '⬅️ Sağdan sola doğru gidildikçe aşağıdakilerden hangisi AZALIR?',
    answer: 'Elektronegatiflik & Elektron İlgisi',
    distractors: ['Atom Yarıçapı', 'Metalik Karakter', 'Oksitlerin Bazlığı'],
    category: 'Sağdan Sola',
    examHighlight: 'Ametallik zayıfladığı için elektron çekme gücü düşer; metaller elektron çekmek değil vermek ister.'
  },

  // 3. YUKARIDAN AŞAĞIYA (Aynı Grupta)
  {
    id: 'ya-artan-cap',
    question: '⬇️ Yukarıdan aşağıya doğru (aynı grupta) inildikçe aşağıdakilerden hangisi ARTAR?',
    answer: 'Atom ve İyon Yarıçapı (Yeni katman eklenir)',
    distractors: ['1. İyonlaşma Enerjisi', 'Elektronegatiflik', 'Ametalik Karakter'],
    category: 'Yukarıdan Aşağıya',
    examHighlight: 'Her satırda yeni bir enerji katmanı açıldığı için kardan adamın alt gövdesi gibi çap devasa büyür.'
  },
  {
    id: 'ya-artan-metalik',
    question: '⬇️ Yukarıdan aşağıya doğru (aynı grupta) inildikçe aşağıdakilerden hangisi ARTAR?',
    answer: 'Metalik Karakter & Aktiflik (Fr en aktiftir)',
    distractors: ['1. İyonlaşma Enerjisi', 'Elektronegatiflik', 'Ametalik Karakter'],
    category: 'Yukarıdan Aşağıya',
    examHighlight: 'Çap büyüyüp dış elektronlar çekirdekten uzaklaştığı için elektron vermek çok kolaylaşır. 1A daki Fransiyum ve Sezyum en aktif metallerdir.'
  },
  {
    id: 'ya-artan-asit-hx',
    question: '⬇️ Yukarıdan aşağıya doğru (aynı grupta) inildikçe aşağıdakilerden hangisi ARTAR?',
    answer: 'Halojen Asitlerinin Kuvveti (HI > HBr > HCl > HF)',
    distractors: ['Elektronegatiflik', '1. İyonlaşma Enerjisi', 'Ametalik Aktiflik'],
    category: 'Yukarıdan Aşağıya',
    examHighlight: 'Çap büyüdükçe H-X bağı uzayıp zayıflar; H+ iyonu sulu çözeltiye daha kolay salınır. HF zayıf asit iken HI en kuvvetlidir.'
  },
  {
    id: 'ya-azalan-ie',
    question: '⬇️ Yukarıdan aşağıya doğru (aynı grupta) inildikçe aşağıdakilerden hangisi AZALIR?',
    answer: '1. İyonlaşma Enerjisi',
    distractors: ['Atom Yarıçapı', 'Katman Sayısı', 'Metalik Karakter'],
    category: 'Yukarıdan Aşağıya',
    examHighlight: 'Değerlik elektronları çekirdekten çok uzaklaştığı ve iç katmanlarca perdelendiği için koparmak çok kolaylaşır.'
  },
  {
    id: 'ya-azalan-en',
    question: '⬇️ Yukarıdan aşağıya doğru (aynı grupta) inildikçe aşağıdakilerden hangisi AZALIR?',
    answer: 'Elektronegatiflik (Flor en yüksektir)',
    distractors: ['Atom Yarıçapı', 'Katman Sayısı', 'Metalik Karakter'],
    category: 'Yukarıdan Aşağıya',
    examHighlight: '7A da Flor (4.0) en yüksek iken Klor (3.0), Brom (2.8) ve İyot (2.5) şeklinde aşağı doğru düzenli düşer.'
  },
  {
    id: 'ya-azalan-ametalik',
    question: '⬇️ Yukarıdan aşağıya doğru (aynı grupta) inildikçe aşağıdakilerden hangisi AZALIR?',
    answer: 'Ametalik Karakter & Aktiflik',
    distractors: ['Atom Yarıçapı', 'Metalik Aktiflik', 'Proton Sayısı'],
    category: 'Yukarıdan Aşağıya',
    examHighlight: 'Elektron alma isteği zayıflar. 7A nın tepesindeki Flor gaz ve aşırı aktif iken en alttaki İyot katıdır.'
  },
  {
    id: 'ya-degismez-des',
    question: '⬇️ Yukarıdan aşağıya doğru (aynı grupta) inildikçe aşağıdakilerden hangisi DEĞİŞMEZ?',
    answer: 'Değerlik Elektron Sayısı (He hariç)',
    distractors: ['Katman Sayısı', 'Atom Yarıçapı', 'İyonlaşma Enerjisi'],
    category: 'Yukarıdan Aşağıya',
    examHighlight: 'Aynı gruptaki elementlerin dış orbital dizilimi benzerdir. İstisna: 8A da Helyum 2, altındakiler 8 değerlik elektronuna sahiptir.'
  },

  // 4. AŞAĞIDAN YUKARIYA (Yukarı Doğru)
  {
    id: 'ay-artan-ie',
    question: '⬆️ Aşağıdan yukarıya doğru çıkıldıkça aşağıdakilerden hangisi ARTAR?',
    answer: '1. İyonlaşma Enerjisi (He tablonun zirvesidir)',
    distractors: ['Atom Yarıçapı', 'Katman Sayısı', 'Metalik Aktiflik'],
    category: 'Aşağıdan Yukarıya',
    examHighlight: 'Katman azaldığı için elektron çekirdeğe çok yakındır. Helyum (2372 kJ/mol) periyodik tablonun iyonlaşma enerjisi en yüksek elementidir.'
  },
  {
    id: 'ay-artan-en',
    question: '⬆️ Aşağıdan yukarıya doğru çıkıldıkça aşağıdakilerden hangisi ARTAR?',
    answer: 'Elektronegatiflik (F 4.0 zirvedir)',
    distractors: ['Atom Yarıçapı', 'Metalik Karakter', 'Oksitlerin Bazlığı'],
    category: 'Aşağıdan Yukarıya',
    examHighlight: 'Küçük atom çapı bağ elektronlarını daha kuvvetle çeker. Flor (F) 4.0 değeriyle periyodik sistemin en elektronegatif atomudur.'
  },
  {
    id: 'ay-azalan-cap',
    question: '⬆️ Aşağıdan yukarıya doğru çıkıldıkça aşağıdakilerden hangisi AZALIR?',
    answer: 'Atom Yarıçapı & Katman Sayısı',
    distractors: ['İyonlaşma Enerjisi', 'Elektronegatiflik', 'Ametalik Karakter'],
    category: 'Aşağıdan Yukarıya',
    examHighlight: 'Her satırda bir katman eksilir (7. periyottan 1. periyota doğru). Çap küçülür.'
  },

  // 5. ÖSYM ÖZEL İSTİSNA VE KURALLARI
  {
    id: 'istisna-cl-f',
    question: '🔍 7A grubunda yukarıdan aşağı inildikçe elektron ilgisi Flor\'dan Klor\'a nasıl değişir?',
    answer: 'İstisnai olarak Artar (Cl > F dir!)',
    distractors: ['Düzenli Azalır', 'Değişmez', 'Sıfıra İner'],
    category: 'ÖSYM İstisnaları',
    examHighlight: 'ÖSYM NİN EN SEVDİĞİ İSTİSNA: Florun 2p orbitallerindeki yüksek itme nedeniyle elektron ilgisi en yüksek element Klor (Cl) dur.'
  },
  {
    id: 'istisna-kuresel-simetri',
    question: '🔍 Aynı periyotta 1. İyonlaşma Enerjisinde 2A ve 5A gruplarının 3A ve 6A dan yüksek olmasının nedeni nedir?',
    answer: 'Küresel Simetri Kararlılığı (3 aşağı 5 yukarı)',
    distractors: ['Atom çapının küçük olması', 'Elektron ilgisinin sıfır olması', 'Değerlik elektron sayısının az olması'],
    category: 'ÖSYM İstisnaları',
    examHighlight: '2A (ns² tam dolu) ve 5A (ns² np³ yarı dolu) küresel simetriye sahiptir ve elektron koparmak komşularından daha zordur.'
  },
  {
    id: 'istisna-hf-cam',
    question: '🔍 Zayıf asit olmasına rağmen camı ve porseleni (SiO2) aşındıran tek asit hangisidir?',
    answer: 'Hidroflorik Asit (HF)',
    distractors: ['Tuz Ruhu (HCl)', 'Kezzap (HNO3)', 'Zaç Yağı (H2SO4)'],
    category: 'ÖSYM İstisnaları',
    examHighlight: 'HF zayıf asittir ancak SiO2 ile SiF4 gazı oluşturarak camı aşındırır; bu yüzden teflon ve plastik kaplarda saklanır.'
  }
];
