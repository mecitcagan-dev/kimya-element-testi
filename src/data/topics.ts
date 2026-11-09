import { TopicDefinition, TopicId } from '../types/topics';
import { ELEMENT_CATEGORIES } from './elements';
import { COMPOUND_CATEGORIES } from './compounds';
import { ION_CATEGORIES } from './polyatomicIons';

export const ALL_TOPICS: TopicDefinition[] = [
  // ========== 1. TYT + AYT (Ortak Temel Konular) ==========
  {
    id: 'element',
    title: 'İlk 36 Element',
    examCategory: 'tyt_ayt',
    icon: '⚛️',
    tag: 'TYT + AYT',
    badgeColor: '#e5484d',
    description: 'İlk 36 elementin sembollerini, adlarını, atom numaralarını ve kategorilerini test et.',
    defaultCount: 36,
    hasRangeSelector: true,
    hasPeriodicTable: true,
    categories: ELEMENT_CATEGORIES
  },
  {
    id: 'compound',
    title: 'Yaygın Bileşikler',
    examCategory: 'tyt_ayt',
    icon: '🧪',
    tag: 'TYT + AYT',
    badgeColor: '#e5484d',
    description: 'Zaç yağı, kezzap, yemek sodası gibi 23 yaygın bileşiğin formüllerini, geleneksel adlarını ve türlerini test et.',
    defaultCount: 18,
    hasTypeToggle: true,
    typeToggleLabel: 'Bileşik Türü (Asit/Baz/Tuz/Oksit)',
    directions: [
      { id: 'ad-formul', label: 'Ad → Formül', keyBadge: 'H' },
      { id: 'formul-ad', label: 'Formül → Ad', keyBadge: 'J' },
      { id: 'karisik', label: 'Karışık', keyBadge: 'K' }
    ],
    categories: COMPOUND_CATEGORIES
  },
  {
    id: 'polyatomic',
    title: 'Çok Atomlu İyonlar (Kökler)',
    examCategory: 'tyt_ayt',
    icon: '⚡',
    tag: 'TYT + AYT',
    badgeColor: '#e5484d',
    description: 'Amonyum, sülfat, nitrat, fosfat gibi köklerin formüllerini, adlarını ve elektrik yüklerini (+1, -1, -2, -3) test et.',
    defaultCount: 20,
    directions: [
      { id: 'form-name', label: 'Formül → İyon Adı', keyBadge: 'H' },
      { id: 'name-form', label: 'Ad → Formül & Yük', keyBadge: 'J' },
      { id: 'karisik', label: 'Karışık', keyBadge: 'K' }
    ],
    categories: ION_CATEGORIES
  },
  {
    id: 'safety',
    title: 'Güvenlik Piktogramları',
    examCategory: 'tyt_ayt',
    icon: '⚠️',
    tag: 'TYT + AYT',
    badgeColor: '#e5484d',
    description: 'Yanıcı, yakıcı, korozif, toksik ve radyoaktif gibi 9 resmi GHS kimya tehlike piktogramını ve anlamlarını test et.',
    defaultCount: 9
  },
  {
    id: 'periodic_trends',
    title: 'Periyodik Özellikler & İstisnalar',
    examCategory: 'tyt_ayt',
    icon: '📈',
    tag: 'TYT + AYT',
    badgeColor: '#e5484d',
    description: 'Cl > F elektron ilgisi istisnası, 3 aşağı 5 yukarı kuralı, F in elektronegatifliği, HF cam aşındırması ve oksit türlerini test et.',
    defaultCount: 12
  },
  {
    id: 'metal_reactions',
    title: 'Metaller & Gaz Çıkışları',
    examCategory: 'tyt_ayt',
    icon: '🔥',
    tag: 'TYT + AYT',
    badgeColor: '#e5484d',
    description: 'Cu, Ag, Zn, Fe metallerinin asit ve bazlarla tepkimelerini; NO2, NO, SO2, H2 veya CO2 gazı çıkış kurallarını test et.',
    defaultCount: 16
  },

  // ========== 2. TYT (Temel Yeterlilik Konuları) ==========
  {
    id: 'lab',
    title: 'Laboratuvar Malzemeleri',
    examCategory: 'tyt',
    icon: '🔬',
    tag: 'TYT',
    badgeColor: '#30a46c',
    description: 'Beherglas, erlenmayer, mezür, büret, pipet, ayırma hunisi gibi laboratuvar araçlarının şekil ve işlevlerini test et.',
    defaultCount: 15
  },
  {
    id: 'indicators',
    title: 'Asit-Baz İndikatörleri',
    examCategory: 'tyt',
    icon: '🎨',
    tag: 'TYT',
    badgeColor: '#30a46c',
    description: 'Turnusol, fenolftalein, metil oranj gibi indikatörlerin asit, nötr ve bazik çözeltilerde aldıkları renkleri test et.',
    defaultCount: 8
  },
  {
    id: 'alchemists',
    title: 'Simyacılar ve Keşifleri',
    examCategory: 'tyt',
    icon: '📜',
    tag: 'TYT',
    badgeColor: '#30a46c',
    description: 'Democritus, Aristo, Cabir bin Hayyan, Ebubekir er-Razi, Robert Boyle ve Lavoisier’in kimya bilimine katkılarını test et.',
    defaultCount: 7
  },
  {
    id: 'solids',
    title: 'Katı Türleri & Kristal Yapılar',
    examCategory: 'tyt',
    icon: '💎',
    tag: 'TYT',
    badgeColor: '#30a46c',
    description: 'Kuru buz (moleküler), elmas/grafit (kovalent), NaCl (iyonik), demir (metalik) ve cam (amorf) katı sınıflandırmalarını test et.',
    defaultCount: 18
  },
  {
    id: 'interactions',
    title: 'Kimyasal Türler Arası Etkileşimler',
    examCategory: 'tyt',
    icon: '🔗',
    tag: 'TYT',
    badgeColor: '#30a46c',
    description: 'Hidrojen bağı, dipol-dipol, iyon-dipol ve London kuvvetleri eşleştirmelerini, çözünme ve kaynama noktası mantığını test et.',
    defaultCount: 16
  },

  // ========== 3. AYT (Alan Yeterlilik Konuları) ==========
  {
    id: 'valence',
    title: 'Değişken Değerlikli Metaller',
    examCategory: 'ayt',
    icon: '🧮',
    tag: 'AYT',
    badgeColor: '#7950f2',
    description: 'Demir, bakır, cıva, kalay, kurşun ve manganın aldığı yükleri; çinko ve gümüş gibi sabit değerlik tuzaklarını test et.',
    defaultCount: 10
  },
  {
    id: 'functional_groups',
    title: 'Organik Fonksiyonel Gruplar',
    examCategory: 'ayt',
    icon: '🧬',
    tag: 'AYT',
    badgeColor: '#7950f2',
    description: 'Alkol, eter, aldehit, keton, karboksilik asit, ester, amin ve amitlerin grup yapılarını, genel formüllerini ve soneklerini test et.',
    defaultCount: 13
  },
  {
    id: 'organic_common',
    title: 'Yaygın Organik Bileşikler',
    examCategory: 'ayt',
    icon: '🌿',
    tag: 'AYT',
    badgeColor: '#7950f2',
    description: 'Asetilen, glikol, gliserin, formaldehit, aseton, fenol ve anilin gibi kritik organik bileşiklerin formül ve özelliklerini test et.',
    defaultCount: 18,
    directions: [
      { id: 'spec-form', label: 'Özel Ad → Formül / Sınıf', keyBadge: 'H' },
      { id: 'form-spec', label: 'Formül → Özel Ad', keyBadge: 'J' },
      { id: 'karisik', label: 'Karışık', keyBadge: 'K' }
    ]
  },
  {
    id: 'vsepr',
    title: 'VSEPR & Molekül Geometrisi',
    examCategory: 'ayt',
    icon: '📐',
    tag: 'AYT',
    badgeColor: '#7950f2',
    description: 'AX2, AX3, AX2E, AX4, AX3E, AX2E2 formüllerini; doğrusal, düzlem üçgen, kırık doğru, sp-sp2-sp3 ve bağ açılarını test et.',
    defaultCount: 16
  },
  {
    id: 'organic_tests',
    title: 'Organik Reaksiyonlar & Ayıraçlar',
    examCategory: 'ayt',
    icon: '🧪',
    tag: 'AYT',
    badgeColor: '#7950f2',
    description: 'Tollens (gümüş aynası), Fehling (Cu2O çökeleği), Bromlu su rengi giderme, 1°/2°/3° alkol yükseltgenmesi ve tautomeriyi test et.',
    defaultCount: 14
  }
];

export const TOPIC_MAP = new Map<TopicId, TopicDefinition>(
  ALL_TOPICS.map(t => [t.id, t])
);
