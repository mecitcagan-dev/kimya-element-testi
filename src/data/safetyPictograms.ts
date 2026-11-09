import { StandardQuizItem } from '../types/topics';

export interface SafetyPictogramData {
  id: number;
  symbol: string;         // Unicode veya görsel ikon
  title: string;          // Piktogram adı
  synonyms: string[];
  hazard: string;         // Tehlike tanımı
  examples: string;       // Örnek kimyasallar
  precaution: string;     // Alınacak güvenlik önlemi
}

export const SAFETY_PICTOGRAMS: SafetyPictogramData[] = [
  {
    id: 1,
    symbol: '🔥',
    title: 'Yanıcı',
    synonyms: ['Kolay Alevlenir', 'Alevlenebilir'],
    hazard: 'Isı, kıvılcım veya alevle temas ettiğinde kolayca tutuşur ve yangına neden olur.',
    examples: 'Alkol, eter, aseton, benzen, tiner, lpg',
    precaution: 'Açık alevden, kıvılcımdan ve ısı kaynaklarından uzak tutulmalıdır.'
  },
  {
    id: 2,
    symbol: '⭕🔥',
    title: 'Yakıcı (Oksitleyici)',
    synonyms: ['Oksitleyici', 'Yakıcı Madde'],
    hazard: 'Kendisi yanmasa bile oksijen vererek diğer maddelerin yanmasını şiddetlendirir.',
    examples: 'Oksijen tüpü, hidrojen peroksit (H₂O₂), potasyum klorat (KClO₃), nitrik asit',
    precaution: 'Yanıcı ve parlayıcı maddelerle kesinlikle bir arada depolanmamalıdır.'
  },
  {
    id: 3,
    symbol: '🧪✋',
    title: 'Korozif (Aşındırıcı)',
    synonyms: ['Aşındırıcı', 'Aşındırıcı Madde'],
    hazard: 'Canlı dokularla ve metallerle temas ettiğinde kimyasal yanıklara ve aşınmaya yol açar.',
    examples: 'Derişik sülfürik asit (H₂SO₄), hidroklorik asit (HCl), sodyum hidroksit (NaOH)',
    precaution: 'Eldiven, önlük ve koruyucu gözlük kullanılmalı, buharı solunmamalıdır.'
  },
  {
    id: 4,
    symbol: '☠️',
    title: 'Toksik (Zehirli)',
    synonyms: ['Zehirli', 'Akut Toksisite'],
    hazard: 'Ağız, solunum veya deri yoluyla vücuda girdiğinde ölüme veya ağır zehirlenmeye yol açar.',
    examples: 'Siyanür (HCN, KCN), cıva (Hg), arsenik (As), karbonmonoksit (CO)',
    precaution: 'Çeker ocak altında çalışılmalı, kesinlikle tadına bakılmamalı ve solunmamalıdır.'
  },
  {
    id: 5,
    symbol: '⚠️',
    title: 'Tahriş Edici',
    synonyms: ['Zararlı', 'Sağlığa Zararlı'],
    hazard: 'Ciltte, gözde veya solunum yollarında kızarıklık, kaşıntı ve alerjik reaksiyon yapar.',
    examples: 'Çamaşır suyu (NaOCl), seyreltik asit/bazlar, amonyak buharı',
    precaution: 'Cilt ve göz temasından kaçınılmalı, ortam iyice havalandırılmalıdır.'
  },
  {
    id: 6,
    symbol: '🐟🌲',
    title: 'Çevreye Zararlı (Ekotoksik)',
    synonyms: ['Ekotoksik', 'Doğaya Zararlı'],
    hazard: 'Su ve toprak ortamındaki canlılara uzun süreli ve kalıcı toksik zarar verir.',
    examples: 'Ağır metaller (Pb, Cd, Hg), böcek ilaçları (pestisitler), deterjan atıkları',
    precaution: 'Lavaboya veya çöpe doğrudan dökülmemeli, kimyasal atık toplama kabına atılmalıdır.'
  },
  {
    id: 7,
    symbol: '💥',
    title: 'Patlayıcı',
    synonyms: ['Patlayıcı Madde'],
    hazard: 'Kıvılcım, ısı, darbe veya sürtünme etkisiyle aniden büyük bir gaz ve şok dalgasıyla patlar.',
    examples: 'TNT (trinitrotoluen), nitrogliserin, barut',
    precaution: 'Darbe, sürtünme ve ısı kaynaklarından tamamen izole edilmelidir.'
  },
  {
    id: 8,
    symbol: '☢️',
    title: 'Radyoaktif',
    synonyms: ['Radyoaktif Madde'],
    hazard: 'Görünmez radyasyon yayarak hücre yapısını bozar, kansere ve genetik hasara yol açar.',
    examples: 'Uranyum, toryum, radyum, tıbbi görüntüleme izotopları (Tc-99m)',
    precaution: 'Kurşun zırhlı kaplarda saklanmalı ve özel dozimetre ile yaklaşılmalıdır.'
  },
  {
    id: 9,
    symbol: '👤⚡',
    title: 'Ciddi Sağlık Tehlikesi (Kanserojen)',
    synonyms: ['Kanserojen', 'Mutajen'],
    hazard: 'Kanser, solunum yetmezliği, üreme bozukluğu veya organ hasarına sebep olur.',
    examples: 'Benzen, asbest lifleri, formaldehit, katran',
    precaution: 'Solunması kesinlikle engellenmeli, çeker ocak ve tam filtreli maske kullanılmalıdır.'
  }
];

export function pictogramToQuizItem(p: SafetyPictogramData): StandardQuizItem {
  return {
    id: p.id,
    prompt: `${p.symbol} ${p.title}`,
    promptSub: 'Bu güvenlik piktogramının temel tehlike anlamı ve kuralları nedir?',
    answer: p.title,
    synonyms: p.synonyms,
    infoChips: [
      { label: 'Piktogram', value: `${p.symbol} ${p.title}` },
      { label: 'Tehlike', value: p.hazard },
      { label: 'Örnek Maddeler', value: p.examples },
      { label: 'Önlem', value: p.precaution }
    ],
    hint: p.hazard
  };
}
