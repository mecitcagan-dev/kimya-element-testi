import { StandardQuizItem } from '../types/topics';

export type KineticsEquilibriumCategory =
  | 'Entalpi & Potansiyel Enerji'
  | 'Katalizör & Aktivasyon Enerjisi'
  | 'Tepkime Hızı & Mekanizma'
  | 'Kimyasal Denge (Kc / Kp)'
  | 'Le Chatelier İlkesi';

export interface KineticsEquilibriumItem {
  id: string;
  question: string;
  answer: string;
  distractors: [string, string, string];
  category: KineticsEquilibriumCategory;
  examHighlight: string;
}

export const KINETICS_EQUILIBRIUM: KineticsEquilibriumItem[] = [
  // 1. ENTALPİ & POTANSİYEL ENERJİ DİYAGRAMLARI
  {
    id: 'ke-deltah-aktivasyon',
    question: 'Bir tepkimenin entalpi değişimi (ΔH), ileri aktifleşme enerjisi (Eₐᵢ) ve geri aktifleşme enerjisi (Eₐg) cinsinden nasıl hesaplanır?',
    answer: 'ΔH = Eₐᵢ - Eₐg  (veya ΣH_ürün - ΣH_giren)',
    distractors: [
      'ΔH = Eₐg - Eₐᵢ',
      'ΔH = Eₐᵢ + Eₐg',
      'ΔH = ΣH_giren - ΣH_ürün'
    ],
    category: 'Entalpi & Potansiyel Enerji',
    examHighlight: 'Eₐᵢ > Eₐg ise ΔH > 0 (endotermik); Eₐᵢ < Eₐg ise ΔH < 0 (ekzotermik). İleri ve geri aktivasyon enerjileri daima POZİTİFTİR (Eₐ > 0)!'
  },
  {
    id: 'ke-ea-pozitif',
    question: 'Ekzotermik bir tepkimede ΔH < 0 olmasına rağmen ileri ve geri aktifleşme enerjilerinin (Eₐᵢ ve Eₐg) işareti için ne doğrudur?',
    answer: 'Her ikisi de daima POZİTİFTİR (Eₐᵢ > 0 ve Eₐg > 0)',
    distractors: [
      'Ekzotermik tepkimede Eₐᵢ negatiftir',
      'Ekzotermik tepkimede Eₐg sıfırdır',
      'ΔH negatifse Eₐᵢ ile Eₐg zıt işaretlidir'
    ],
    category: 'Entalpi & Potansiyel Enerji',
    examHighlight: 'ÖSYM TUZAĞI: Aktifleşmiş kompleksin enerjisi daima hem girenlerden hem ürünlerden yüksektir. Bu yüzden Eₐᵢ ve Eₐg asla sıfır veya negatif olamaz!'
  },
  {
    id: 'ke-min-enerji-kararlilik',
    question: 'Endotermik (ΔH > 0) ve ekzotermik (ΔH < 0) tepkimelerde "minimum enerjili olma eğilimi" ve yüksek/düşük sıcaklıkta kararlılık nasıldır?',
    answer: 'Minimum enerji daima ısının yazıldığı taraftadır (Endo: girenler, Ekzo: ürünler); düşük sıcaklıkta minimum enerjili taraf kararlıdır',
    distractors: [
      'Minimum enerji daima ürünler tarafındadır',
      'Endotermik tepkimelerde yüksek sıcaklıkta girenler daha kararlıdır',
      'Ekzotermik tepkimelerde düşük sıcaklıkta girenler daha kararlıdır'
    ],
    category: 'Entalpi & Potansiyel Enerji',
    examHighlight: 'KURAL: Isı ne taraftaysa minimum enerji o taraftadır! Düşük T’de düşük enerjili (minimum enerji) taraf, yüksek T’de ise yüksek enerjili taraf kararlıdır.'
  },
  {
    id: 'ke-hess-yasasi',
    question: 'Hess Yasasına göre bir kimyasal tepkime denklemi ters çevrilir ve 2 ile çarpılırsa ΔH değeri nasıl değişir?',
    answer: 'İşareti değişir ve 2 ile çarpılır (ΔH_yeni = -2 · ΔH)',
    distractors: [
      'İşareti değişir ama büyüklüğü sabit kalır',
      'Üssü alınır (ΔH⁻²)',
      'Sadece 2’ye bölünür'
    ],
    category: 'Entalpi & Potansiyel Enerji',
    examHighlight: 'Entalpi bir hal fonksiyonudur ve madde miktarına bağlıdır: denklem ters çevrilirse ΔH → -ΔH, n ile çarpılırsa ΔH → n·ΔH; tepkimeler toplanırsa ΔH’lar toplanır.'
  },

  // 2. KATALİZÖR & AKTİVASYON ENERJİSİ
  {
    id: 'ke-katalizor-ea-deltah',
    question: 'Pozitif bir katalizör kimyasal bir tepkimede Eₐᵢ, Eₐg ve ΔH değerlerini nasıl etkiler?',
    answer: 'Eₐᵢ ve Eₐg’yi EŞİT miktarda düşürür; ancak ΔH’ı DEĞİŞTİRMEZ',
    distractors: [
      'Yalnızca Eₐᵢ’yi düşürür ve ΔH’ı küçültür',
      'Eₐᵢ’yi düşürüp Eₐg’yi artırır',
      'Aktifleşme enerjisini değiştirmez, sadece molekül kinetik enerjisini artırır'
    ],
    category: 'Katalizör & Aktivasyon Enerjisi',
    examHighlight: 'ÖSYM’NİN EN ÇOK SORDUĞU BİLGİ: Katalizör giren ve ürün enerjilerine dokunmaz; tepe noktasını (aktifleşmiş kompleksi) aşağı çeker. ΔH = Eₐᵢ - Eₐg farkı sabit kalır!'
  },
  {
    id: 'ke-katalizor-denge-verim',
    question: 'Denge halindeki bir tepkimeye uygun bir katalizör eklendiğinde hız sabiti (k), denge sabiti (Kc), dengeye ulaşma süresi ve ürün verimi nasıl değişir?',
    answer: 'k_i ve k_g artar, dengeye ulaşma süresi kısalır; AMA Kc, denge yönü ve verim DEĞİŞMEZ',
    distractors: [
      'Kc büyür ve ürün verimi artar',
      'Yalnızca k_i artar, denge ürünlere kayar',
      'Denge yönü değişmez ama verim artar'
    ],
    category: 'Katalizör & Aktivasyon Enerjisi',
    examHighlight: 'Katalizör ileri ve geri hız sabitlerini (k_i ve k_g) aynı oranda artırır; bu yüzden Kc = k_i / k_g oranı, denge derişimleri ve % verim asla değişmez!'
  },
  {
    id: 'ke-k-hiz-sabitini-etkileyenler',
    question: 'Bir tepkimedeki hız sabiti (k) hangi faktörlerle değişir? (TSK Kodlaması)',
    answer: 'Temas yüzeyi (heterojenlerde), Sıcaklık, Katalizör (ve Tepkime cinsi)',
    distractors: [
      'Girenlerin derişimi, Basınç ve Hacim',
      'Yalnızca sıcaklık',
      'Derişim ve sıcaklık'
    ],
    category: 'Katalizör & Aktivasyon Enerjisi',
    examHighlight: 'Kodlama: TSK (Temas yüzeyi, Sıcaklık, Katalizör)! Tepkimeye madde eklemek veya hacmi değiştirmek derişimi değiştirerek HIZI değiştirir ama k HIZ SABİTİNİ DEĞİŞTİRMEZ!'
  },
  {
    id: 'ke-sicaklik-etkisi-hiz',
    question: 'Sıcaklık artırıldığında hem endotermik hem ekzotermik tepkimelerin hızının artmasının temel nedeni nedir?',
    answer: 'Eşik enerjisini (Eₐ) aşan tanecik sayısının ve birim zamandaki etkin çarpışma sayısının artması (Eₐ değişmez!)',
    distractors: [
      'Aktifleşme enerjisinin (Eₐ) düşmesi',
      'Yalnızca endotermik tepkimelerin hızlanması',
      'Katalizör etkisiyle ΔH’ın küçülmesi'
    ],
    category: 'Katalizör & Aktivasyon Enerjisi',
    examHighlight: 'ÖSYM TUZAĞI: Sıcaklık artışı aktifleşme enerjisini (Eₐ) DÜŞÜRMEZ! Sadece Eₐ’yı aşabilecek kinetik enerjiye sahip tanecik yüzdesini artırır.'
  },

  // 3. TEPKİME HIZI & MEKANİZMA
  {
    id: 'ke-hiz-bagintisi-faz',
    question: 'Homojen/heterojen bir tepkimenin hız bağıntısında hangi fiziksel hallerdeki maddelerin derişimi yer alabilir?',
    answer: 'Yalnızca Gaz (g) ve Suda Çözünmüş (suda / aq) maddeler',
    distractors: [
      'Gaz, Sıvı ve Suda çözünmüş maddeler',
      'Katı, Sıvı, Gaz ve Suda tüm maddeler',
      'Yalnızca Gazlar'
    ],
    category: 'Tepkime Hızı & Mekanizma',
    examHighlight: 'Saf katı (k) ve saf sıvıların (s) derişimi sabit olduğu için ne hız bağıntısına ne de Kc/Kp denge bağıntısına yazılmaz!'
  },
  {
    id: 'ke-mekanizmali-yavas-basamak',
    question: 'Çok basamaklı (mekanizmalı) bir tepkimede deneysel hız bağıntısı ve hız sabiti (k) hangi basamağa göre belirlenir?',
    answer: 'En yüksek aktifleşme enerjili (Eₐᵢ en büyük) olan YAVAŞ basamağın girenlerine göre',
    distractors: [
      'Net tepkime denklemindeki girenlere göre',
      'En hızlı basamağın ürünlerine göre',
      'En düşük aktifleşme enerjili basamağa göre'
    ],
    category: 'Tepkime Hızı & Mekanizma',
    examHighlight: 'Bir zincir en zayıf halkası kadar güçlüdür; mekanizmalı tepkimede hızı belirleyen basamak Eₐᵢ değeri en büyük (en yavaş) olan basamaktır.'
  },
  {
    id: 'ke-molekulerite-vs-derece',
    question: 'Mekanizmalı bir tepkimede "tepkime derecesi (mertebesi)" ile "molekülerite" arasındaki fark nedir?',
    answer: 'Tepkime derecesi hız bağıntısındaki üslerin toplamıdır (yavaş basamaktan); molekülerite ise NET tepkime denklemindeki giren katsayıları toplamıdır',
    distractors: [
      'İkisi de daima net tepkimeden bulunur ve birbirine eşittir',
      'Molekülerite yavaş basamaktan, derece net tepkimeden bulunur',
      'Derece yalnızca ürünlerin katsayıları toplamıdır'
    ],
    category: 'Tepkime Hızı & Mekanizma',
    examHighlight: 'ÖSYM AYRIMI: Ara ürün ve katalizör hız bağıntısında/net tepkimede nasıl elenir? İlk basamakta üretilip sonra harcanan = ARA ÜRÜN; ilk basamakta girip sonda değişmeden çıkan = KATALİZÖR.'
  },
  {
    id: 'ke-ara-urun-katalizor',
    question: '1. Adım: X + Y → Z + K (Yavaş),  2. Adım: Z + M → N + X (Hızlı) mekanizmasında X ve Z sırasıyla nedir?',
    answer: 'X: Katalizör,  Z: Ara ürün',
    distractors: [
      'X: Ara ürün,  Z: Katalizör',
      'Her ikisi de ara üründür',
      'X: Net tepkime ürünü,  Z: Katalizör'
    ],
    category: 'Tepkime Hızı & Mekanizma',
    examHighlight: 'X önce girmiş (1. adım) sonra değişmeden çıkmıştır (2. adım) → Katalizör. Z önce oluşmuş (1. adım) sonra tüketilmiştir (2. adım) → Ara ürün.'
  },

  // 4. KİMYASAL DENGE (Kc / Kp)
  {
    id: 'ke-kc-sadece-sicaklik',
    question: 'Bir tepkimenin derişimler cinsinden denge sabitinin (Kc) sayısal değerini YALNIZCA hangi etken değiştirir?',
    answer: 'Sıcaklık (T)',
    distractors: [
      'Basınç ve Hacim değişimi',
      'Katalizör eklenmesi',
      'Ortama madde eklenmesi veya çıkarılması'
    ],
    category: 'Kimyasal Denge (Kc / Kp)',
    examHighlight: 'ALTIN KURAL: Kc, Kp, Ka, Kb, Ksu ve Kçç gibi TÜM denge sabitlerinin sayısal değerini YALNIZCA SICAKLIK değiştirir! Derişim, basınç veya katalizör K’yı değiştirmez.'
  },
  {
    id: 'ke-kp-kc-iliskisi',
    question: 'Kısmi basınçlar türünden denge sabiti (Kp) ile derişimler türünden denge sabiti (Kc) arasındaki bağıntı nedir?',
    answer: 'Kp = Kc · (R · T)^Δn   [Δn = n_gaz(ürün) - n_gaz(giren)]',
    distractors: [
      'Kc = Kp · (R · T)^Δn',
      'Kp = Kc · (R · T)^(-Δn)',
      'Kp = Kc · R · T   (her zaman)'
    ],
    category: 'Kimyasal Denge (Kc / Kp)',
    examHighlight: 'Kodlama: "Köpek Kaçırtan" (Kp = Kc·(RT)^Δn). Sadece GAZ fazındaki mol sayıları farkı Δn’ye alınır! Δn = 0 ise Kp = Kc olur.'
  },
  {
    id: 'ke-denge-kesri-qc',
    question: 'Herhangi bir t anında hesaplanan yalancı denge kesri Qc ile Kc karşılaştırıldığında Qc > Kc bulunursa sistem dengeye ulaşmak için hangi yöne ilerler?',
    answer: 'Girenler (sol) yönüne ilerler (v_geri > v_ileri)',
    distractors: [
      'Ürünler (sağ) yönüne ilerler (v_ileri > v_geri)',
      'Sistem zaten dengededir',
      'Sıcaklık artırılmadıkça tepkime ilerlemez'
    ],
    category: 'Kimyasal Denge (Kc / Kp)',
    examHighlight: 'Qc = [Ürün]/[Giren]. Qc > Kc ise ürünler gereğinden fazladır; sistem azaltmak için sola (girenlere) kayar. Qc < Kc ise sağa (ürünlere) kayar; Qc = Kc ise dengededir.'
  },
  {
    id: 'ke-denge-carpilmasi',
    question: 'Bir denge tepkimesi ters çevrilip 1/2 ile çarpılırsa yeni denge sabiti Kc’ nasıl ifade edilir?',
    answer: 'Kc’ = 1 / √Kc = (Kc)^(-1/2)',
    distractors: [
      'Kc’ = -1/2 · Kc',
      'Kc’ = √Kc',
      'Kc’ = 1 / (2 · Kc)'
    ],
    category: 'Kimyasal Denge (Kc / Kp)',
    examHighlight: 'Hess’ten FARKI: Denge denklemi ters çevrilirse Kc → 1/Kc; n ile çarpılırsa üs olur (Kc → Kc^n); tepkimeler toplanırsa Kc’ler ÇARPILIR!'
  },
  {
    id: 'ke-sicaklik-kc-yon',
    question: 'Endotermik (ΔH > 0) ve Ekzotermik (ΔH < 0) bir denge tepkimesinde sıcaklık artırıldığında Kc değeri nasıl değişir?',
    answer: 'Endotermikte Kc ARTAR (sağa kayar); Ekzotermikte Kc AZALIR (sola kayar)',
    distractors: [
      'Her iki durumda da Kc artar',
      'Endotermikte azalır, ekzotermikte artar',
      'Sıcaklık Kc’yi değiştirmez, sadece dengeye gelme hızını artırır'
    ],
    category: 'Kimyasal Denge (Kc / Kp)',
    examHighlight: 'Endotermikte ısı girenlerdedir (Isı + G ⇌ Ü): T↑ ise sağa kayar ve Kc↑. Ekzotermikte ısı ürünlerdedir (G ⇌ Ü + Isı): T↑ ise sola kayar ve Kc↓.'
  },

  // 5. LE CHATELIER İLKESİ
  {
    id: 'ke-hacim-azalmasi',
    question: 'N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g) dengesinde sabit sıcaklıkta kabın hacmi küçültülürse (basınç artırılırsa) denge hangi yöne kayar?',
    answer: 'Gaz mol sayısının az olduğu ürünler (NH₃) yönüne kayar; tüm gazların derişimi başlangıca göre artar',
    distractors: [
      'Gaz mol sayısının çok olduğu girenler yönüne kayar',
      'Denge yönü değişmez',
      'NH₃ derişimi artar ama N₂ ve H₂ derişimi başlangıcın altına düşer'
    ],
    category: 'Le Chatelier İlkesi',
    examHighlight: 'Hacim azalırsa (V↓ → P↑) tüm gaz derişimleri aniden artar; sistem basıncı azaltmak için gaz molü az olan tarafa (4 mol → 2 mol) kayar. Kc değişmez!'
  },
  {
    id: 'ke-sabit-hacim-inert-gaz',
    question: 'Sabit hacimli kapalı bir kapta dengedeki N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g) sistemine sabit sıcaklıkta He (inert) gazı eklenirse denge nasıl etkilenir?',
    answer: 'Toplam basınç artar ancak kısmi basınçlar/derişimler değişmediği için denge KAYMAZ',
    distractors: [
      'Gaz mol sayısının az olduğu ürünlere kayar',
      'Gaz mol sayısının çok olduğu girenlere kayar',
      'Kc değeri küçülür'
    ],
    category: 'Le Chatelier İlkesi',
    examHighlight: 'ÖSYM TUZAĞI: Sabit HACİMDE inert gaz (He, Ne) eklemek toplam P’yi artırsa da tepkimedeki gazların P_i ve [M_i] değerini değiştirmez → Denge BOZULMAZ!'
  },
  {
    id: 'ke-sabit-basinc-inert-gaz',
    question: 'İdeal pistonlu (sabit basınçlı) bir kapta dengedeki N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g) sistemine sabit sıcaklıkta He (inert) gazı eklenirse denge nereye kayar?',
    answer: 'Hacim büyüdüğü için kısmi basınçlar düşer ve denge gaz mol sayısının ÇOK olduğu girenlere kayar',
    distractors: [
      'Sabit basınçta da denge kaymaz',
      'Gaz mol sayısının az olduğu ürünlere kayar',
      'Yalnızca NH₃ derişimi artar'
    ],
    category: 'Le Chatelier İlkesi',
    examHighlight: 'Sabit BASINÇTA (pistonlu kap) He eklenirse piston yukarı çıkar (V↑). Tepkime gazlarının kısmi basıncı düşer; sistem gaz molü çok olan tarafa (4 mol yönüne) kayar!'
  },
  {
    id: 'ke-saf-kati-sivi-ekleme',
    question: 'CaCO₃(k) ⇌ CaO(k) + CO₂(g) heterojen dengesinde sabit sıcaklık ve hacimde kaba bir miktar CaCO₃(k) katısı eklenirse denge ve CO₂ derişimi nasıl değişir?',
    answer: 'Denge yönü DEĞİŞMEZ, CO₂(g) derişimi ve Kp sabit kalır',
    distractors: [
      'Denge ürünlere kayar, CO₂ basıncı artar',
      'Denge girenlere kayar, CaO kütlesi azalır',
      'Kc değeri büyür'
    ],
    category: 'Le Chatelier İlkesi',
    examHighlight: 'Saf katıların ve saf sıvıların derişimi (d/Mₐ) sabittir; miktarını artırmak veya azaltmak dengeyi ASLA kaydırmaz (yeter ki kapta her iki katıdan da bulunsun).'
  },
  {
    id: 'ke-gaz-ekleme-tam-telafi-olmaz',
    question: 'Sabit hacim ve sıcaklıkta PCl₅(g) ⇌ PCl₃(g) + Cl₂(g) dengesine bir miktar Cl₂(g) eklenip sistem yeniden dengeye ulaştığında [Cl₂] başlangıca göre nasıl olur?',
    answer: 'Denge girenlere kaysa da eklenen Cl₂’nin tamamı harcanamadığı için yeni [Cl₂] başlangıca göre ARTMIS olur',
    distractors: [
      'Sistem etkiyi tamamen yok edeceği için [Cl₂] başlangıç değerine döner',
      'Başlangıcın altına düşer',
      'Kc küçüldüğü için [PCl₅] azalır'
    ],
    category: 'Le Chatelier İlkesi',
    examHighlight: 'LE CHATELIER PRENSİBİ: Denge dış etkiyi tamamen yok edemez, sadece AZALTIR! Eklenen maddenin derişimi yeni dengede ilk halinden daima yüksektir (heterojen tek gazlı CaCO₃ hariç).'
  },
  {
    id: 'ke-kcc-ortak-iyon',
    question: 'Az çözünen AgCl(k) ⇌ Ag⁺(aq) + Cl⁻(aq) katısının dengedeki çözeltisine aynı sıcaklıkta NaCl katısı eklenirse AgCl’nin çözünürlüğü ve Kçç değeri nasıl değişir?',
    answer: 'Ortak iyon (Cl⁻) etkisiyle denge sola kayar, çözünürlük AZALIR; sıcaklık sabit olduğu için Kçç DEĞİŞMEZ',
    distractors: [
      'Hem çözünürlük hem Kçç azalır',
      'Çözünürlük artar, Kçç değişmez',
      'NaCl tam çözündüğü için AgCl çözünürlüğünü etkilemez'
    ],
    category: 'Le Chatelier İlkesi',
    examHighlight: 'Ortak iyon derişimi arttıkça çözünürlük daima AZALIR; fakat Kçç yalnızca sıcaklıkla değiştiği için sabit kalır!'
  },
  {
    id: 'ke-kcc-cozunurluk-endotermik',
    question: 'Çözünmesi endotermik olan bir tuzun (Tuz(k) + Isı ⇌ İyonlar) doymuş sulu çözeltisi ısıtılırsa (dipte katısı yokken vs varken) Kçç nasıl değişir?',
    answer: 'Endotermik olduğu için sıcaklık artışıyla Kçç ARTAR (dipte katı varsa daha çok çözünür)',
    distractors: [
      'Çözünürlük azalır, Kçç düşer',
      'Kçç sıcaklıkla değişmez',
      'Gazlar gibi ısındıkça çözünürlüğü azalır'
    ],
    category: 'Le Chatelier İlkesi',
    examHighlight: 'Tüm gazların suda çözünmesi ekzotermiktir (T↑ ile çözünürlük↓). Katıların çoğu endotermik çözünür (T↑ ile Kçç↑), fakat istisna ekzotermik katılarda T↑ ile Kçç↓.'
  }
];

export function kineticsEquilibriumToQuizItem(item: KineticsEquilibriumItem): StandardQuizItem {
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
