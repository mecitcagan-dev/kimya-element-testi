import { StandardQuizItem } from '../types/topics';

export interface LabEquipmentData {
  id: number;
  name: string;
  synonyms: string[];
  shape: string;
  function: string;
  precision: 'Hassas' | 'Kaba / Yaklaşık' | 'Nitel / Destek';
}

export const LAB_EQUIPMENT: LabEquipmentData[] = [
  {
    id: 1,
    name: 'Beherglas',
    synonyms: ['Beher'],
    shape: 'Silindirik gövdeli, düz tabanlı, ağız kısmında akıtma oluğu bulunan cam kap.',
    function: 'Çözelti hazırlama, maddeleri karıştırma, aktarma ve ısıtma işlemlerinde kullanılır.',
    precision: 'Kaba / Yaklaşık'
  },
  {
    id: 2,
    name: 'Erlenmayer',
    synonyms: ['Erlen'],
    shape: 'Konik gövdeli, düz tabanlı ve dar silindirik boyunlu cam kap.',
    function: 'Titrasyon işleminde, çözelti saklamada ve çalkalama esnasında sıvının sıçramasını önlemede kullanılır.',
    precision: 'Kaba / Yaklaşık'
  },
  {
    id: 3,
    name: 'Dereceli Silindir (Mezür)',
    synonyms: ['Mezür', 'Dereceli silindir'],
    shape: 'Üzerinde mililitre cinsinden hacim çizgileri bulunan dik silindirik cam boru.',
    function: 'Sıvıların hacmini yaklaşık olarak ölçmek ve başka bir kaba aktarmak için kullanılır.',
    precision: 'Kaba / Yaklaşık'
  },
  {
    id: 4,
    name: 'Balon Joje',
    synonyms: ['Ölçü balonu'],
    shape: 'Armut/küre gövdeli, uzun ve dar boyunlu, boynunda tek bir kalibrasyon çizgisi olan hassas kap.',
    function: 'Belirli derişimde (molaritede) çok hassas çözeltiler hazırlamak ve saklamak için kullanılır.',
    precision: 'Hassas'
  },
  {
    id: 5,
    name: 'Büret',
    synonyms: [],
    shape: 'Alt ucunda hassas akış kontrol musluğu bulunan, milimetrik dereceli uzun cam boru.',
    function: 'Titrasyon işlemlerinde harcanan asit veya baz hacmini damla damla çok hassas ölçmek için kullanılır.',
    precision: 'Hassas'
  },
  {
    id: 6,
    name: 'Pipet',
    synonyms: ['Puarli pipet'],
    shape: 'Çok dar ve ince kalibreli cam boru; puar yardımıyla sıvı çekilir.',
    function: 'Çok küçük hacimlerdeki sıvıları yüksek hassasiyetle ölçüp aktarmak için kullanılır.',
    precision: 'Hassas'
  },
  {
    id: 7,
    name: 'Ayırma Hunisi',
    synonyms: [],
    shape: 'Geniş gövdeli, alt kısmında musluğu olan armut biçiminde cam alet.',
    function: 'Birbiriyle karışmayan heterojen sıvı-sıvı karışımlarını (zeytinyağı-su gibi) yoğunluk farkıyla ayırır.',
    precision: 'Kaba / Yaklaşık'
  },
  {
    id: 8,
    name: 'Cam Balon',
    synonyms: ['Kaynatma balonu'],
    shape: 'Küre şeklinde gövdesi ve silindirik boynu olan cam kap.',
    function: 'Kimyasal tepkimeleri yürütmek, sıvıları kaynatmak ve damıtma düzeneklerinde kullanılır.',
    precision: 'Kaba / Yaklaşık'
  },
  {
    id: 9,
    name: 'Soğutucu (Liebig)',
    synonyms: ['Liebig soğutucu', 'Geri soğutucu'],
    shape: 'İç içe geçmiş iki cam borudan oluşan, dış borusundan soğuk su dolaştırılan alet.',
    function: 'Damıtma işleminde buharlaşan gaz halindeki maddenin yoğuşarak sıvılaşmasını sağlar.',
    precision: 'Nitel / Destek'
  },
  {
    id: 10,
    name: 'Havan ve Tokmak',
    synonyms: ['Havan'],
    shape: 'Porselen veya akik taşından yapılmış çanak ve tokmağı.',
    function: 'Katı maddeleri ezerek, ufalayarak ve öğüterek toz haline getirmek (temas yüzeyini artırmak) için kullanılır.',
    precision: 'Nitel / Destek'
  },
  {
    id: 11,
    name: 'Kroze',
    synonyms: ['Porselen kroze'],
    shape: 'Derin fincana benzeyen, yüksek ısıya dayanıklı porselen kapaklı kap.',
    function: 'Yüksek sıcaklıktaki kül etme fırınlarında katı maddeleri kavurmak ve yakmak için kullanılır.',
    precision: 'Nitel / Destek'
  },
  {
    id: 12,
    name: 'Spatül',
    synonyms: ['Kimya kaşığı'],
    shape: 'Metal veya porselenden yapılmış kaşık ve yassı uçlu alet.',
    function: 'Katı veya toz kimyasalları şişelerinden almak ve terazi kefesine koymak için kullanılır.',
    precision: 'Nitel / Destek'
  },
  {
    id: 13,
    name: 'Saat Camı',
    synonyms: [],
    shape: 'İçbükey dairesel cam yüzey.',
    function: 'Az miktardaki katıların tartımında ve sıvıların yavaşça buharlaştırılmasında kullanılır.',
    precision: 'Nitel / Destek'
  },
  {
    id: 14,
    name: 'Baget',
    synonyms: ['Cam çubuk'],
    shape: 'Katı cam çubuk.',
    function: 'Çözeltileri manuel karıştırmak ve süzme sırasında sıvı akışını yönlendirmek için kullanılır.',
    precision: 'Nitel / Destek'
  },
  {
    id: 15,
    name: 'Sacayak ve Amyant Tel',
    synonyms: ['Sacayak'],
    shape: 'Üç metal ayak üzerine konan ortası seramik/amyant kaplı metal tel örgü.',
    function: 'Isıtma esnasında beheri taşımak ve alevin ısısını kabın tabanına homojen dağıtmak için kullanılır.',
    precision: 'Nitel / Destek'
  },
  {
    id: 16,
    name: 'Ayırma Hunisi & Normal Huni',
    synonyms: ['Huni'],
    shape: 'Geniş konik ağızlı ve dar borulu cam/plastik alet.',
    function: 'Dar ağızlı kaplara sıvı aktarırken veya süzgeç kağıdı yerleştirerek süzme işleminde kullanılır.',
    precision: 'Nitel / Destek'
  },
  {
    id: 17,
    name: 'Termometre',
    synonyms: [],
    shape: 'İçinde cıva veya renklendirilmiş alkol bulunan dereceli kılcal cam boru.',
    function: 'Kimyasal süreçlerde ve çözeltilerde sıcaklık değerini ölçmek için kullanılır.',
    precision: 'Hassas'
  },
  {
    id: 18,
    name: 'Deney Tüpü',
    synonyms: ['Test tüpü'],
    shape: 'İnce, uzun, tabanı yarım küre biçiminde cam tüp.',
    function: 'Küçük miktarlardaki kimyasal maddelerin nitel tepkimelerini ve renk değişimlerini gözlemlemek için kullanılır.',
    precision: 'Nitel / Destek'
  }
];

export function labToQuizItem(lab: LabEquipmentData): StandardQuizItem {
  return {
    id: lab.id,
    prompt: lab.function,
    promptSub: `${lab.shape} (${lab.precision})`,
    answer: lab.name,
    synonyms: lab.synonyms,
    category: lab.precision,
    infoChips: [
      { label: 'Malzeme Adı', value: lab.name },
      { label: 'Hassasiyet', value: lab.precision },
      { label: 'Temel Görevi', value: lab.function },
      { label: 'Görünümü', value: lab.shape }
    ],
    hint: lab.shape
  };
}
