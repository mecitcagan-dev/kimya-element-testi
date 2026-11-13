import { TopicId } from '../../types/topics';

export type AnimationSceneId =
  | 'galvanic_cell'
  | 'electrolysis'
  | 'equilibrium_collision'
  | 'gas_laws'
  | 'hydration_polarity'
  | 'bohr_orbital'
  | 'colligative_osmosis'
  | 'acid_base_titration';

export type AnimationExamBadge = 'TYT' | 'AYT' | 'TYT + AYT';

export interface AnimationCatalogItem {
  id: AnimationSceneId;
  title: string;
  shortTitle: string;
  examBadge: AnimationExamBadge;
  icon: string;
  topicId: TopicId;
  summary: string;
  osymTakeaway: string;
}

export const ANIMATION_CATALOG: readonly AnimationCatalogItem[] = [
  {
    id: 'galvanic_cell',
    title: 'Daniell Pili & Elektron Akışı',
    shortTitle: 'Daniell Pili',
    examBadge: 'AYT',
    icon: '🔋',
    topicId: 'electrochemistry_organic',
    summary:
      'Zn anot çubuğunun aşınmasını, dış devrede e⁻ akışını, Cu katot kaplamasını ve tuz köprüsündeki iyon göçünü canlı izle.',
    osymTakeaway:
      'KİMYA kuralı: Katotta indirgenme, anotta yükseltgenme olur. Tuz köprüsü çıkarılırsa pil anında durur (Epil = 0 V).'
  },
  {
    id: 'electrolysis',
    title: 'Elektroliz & Hofmann Voltametresi',
    shortTitle: 'Elektroliz',
    examBadge: 'AYT',
    icon: '⚡',
    topicId: 'electrochemistry_organic',
    summary:
      'Suyun elektrolizinde katotta 2V H₂ ve anotta V O₂ gazı toplanmasını, erimiş NaCl elektrolizinde kutup dönüşümünü gözlemle.',
    osymTakeaway:
      'Elektrolizde kutup işaretleri pilin TERSİDİR: Anot (+), Katot (-)! Suyun elektrolizinde katotta anottaki hacmin 2 katı H₂ birikir.'
  },
  {
    id: 'equilibrium_collision',
    title: 'Kimyasal Denge & Le Chatelier',
    shortTitle: 'Denge & Çarpışma',
    examBadge: 'AYT',
    icon: '⚖️',
    topicId: 'kinetics_equilibrium',
    summary:
      'N₂ + 3H₂ ⇌ 2NH₃ + Isı sisteminde sıcaklık, hacim, madde ekleme ve katalizör etkisinin molekül hızına ve denge yönüne etkisini gör.',
    osymTakeaway:
      'Kc değerini YALNIZCA sıcaklık değiştirir. Katalizör ileri ve geri hızı eşit artırır; denge yönünü ve verimi değiştirmez.'
  },
  {
    id: 'gas_laws',
    title: 'Gaz Yasaları & Graham Difüzyonu',
    shortTitle: 'Gazlar & Difüzyon',
    examBadge: 'AYT',
    icon: '🎈',
    topicId: 'gases_solutions',
    summary:
      'Pistonlu kapta P–V–T ilişkisini ve aynı sıcaklıkta H₂ (M=2) ile O₂/SO₂ moleküllerinin yayılma hızı farkını canlı karşılaştır.',
    osymTakeaway:
      'Gaz yasalarında sıcaklık daima Kelvin (T = °C + 273) alınır. Difüzyon hızı √M ile ters, √T ile doğru orantılıdır.'
  },
  {
    id: 'hydration_polarity',
    title: 'Polarite, Hidrojen Bağı & Hidratasyon',
    shortTitle: 'Hidratasyon & H-Bağı',
    examBadge: 'TYT',
    icon: '🧲',
    topicId: 'interactions',
    summary:
      'NaCl kristalinin su dipolleri tarafından δ⁻/δ⁺ yönelimiyle çözünmesini, H₂O hidrojen bağlarını ve yağ–su ayrımını incele.',
    osymTakeaway:
      'Benzer benzeri çözer: İyonik/polar maddeler suda hidratasyonla çözünür; apolar yağ molekülleri ise H₂O ile etkileşemez.'
  },
  {
    id: 'bohr_orbital',
    title: 'Bohr Atom Modeli & Kuantum Orbitalleri',
    shortTitle: 'Bohr & Orbitaller',
    examBadge: 'TYT + AYT',
    icon: '🌀',
    topicId: 'quantum_orbitals',
    summary:
      'Elektronların enerji soğurarak (absorpsiyon) üst katmana çıkışını, foton yayarak (emisyon) dönüşünü ve s/p/d orbital şekillerini gör.',
    osymTakeaway:
      'Uyarılmış hal kararsızdır; elektron temel hale dönerken enerji farkına eşit foton yayar. p orbitalleri 3 yönelimli (px, py, pz) papyon biçimindedir.'
  },
  {
    id: 'colligative_osmosis',
    title: 'Koligatif Özellikler & Ozmoz',
    shortTitle: 'Koligatif & Ozmoz',
    examBadge: 'TYT + AYT',
    icon: '💧',
    topicId: 'gases_solutions',
    summary:
      'Tuzlu suda yüzey taneciklerinin buharlaşmayı nasıl engellediğini, Van’t Hoff tanecik sayısını (i) ve yarı geçirgen zarda ozmozu izle.',
    osymTakeaway:
      'Uçucu olmayan çözünen buhar basıncını düşürür, kaynama noktasını yükseltir, donma noktasını düşürür. Ozmozda su seyreltikten derişiğe geçer.'
  },
  {
    id: 'acid_base_titration',
    title: 'Asit–Baz Nötralleşme & Titrasyon',
    shortTitle: 'Titrasyon Eğrisi',
    examBadge: 'TYT + AYT',
    icon: '🧪',
    topicId: 'gases_solutions',
    summary:
      'Büretten damlayan NaOH ile HCl çözeltisindeki iyonların H₂O oluşturmasını, fenolftalein renk dönüşümünü ve pH S-eğrisini takip et.',
    osymTakeaway:
      'Eşdeğerlik noktasında n(H⁺) = n(OH⁻) olur; kuvvetli asit–kuvvetli baz titrasyonunda bu noktada pH = 7’dir ve eğri dik yükselir.'
  }
] as const;

export const ANIMATION_CATALOG_MAP: Record<AnimationSceneId, AnimationCatalogItem> = {
  galvanic_cell: ANIMATION_CATALOG[0],
  electrolysis: ANIMATION_CATALOG[1],
  equilibrium_collision: ANIMATION_CATALOG[2],
  gas_laws: ANIMATION_CATALOG[3],
  hydration_polarity: ANIMATION_CATALOG[4],
  bohr_orbital: ANIMATION_CATALOG[5],
  colligative_osmosis: ANIMATION_CATALOG[6],
  acid_base_titration: ANIMATION_CATALOG[7]
};
