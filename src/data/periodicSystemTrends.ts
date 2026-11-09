export type TrendDirectionKey =
  | 'soldan-saga'
  | 'yukaridan-asagiya'
  | 'sagdan-sola'
  | 'asagidan-yukariya';

export type TrendChangeType = 'Artar' | 'Genellikle Artar' | 'Azalır' | 'Genellikle Azalır' | 'Değişmez';

export interface PeriodicTrendProperty {
  id: string;
  name: string;
  category: 'Fiziksel Özellik' | 'Atomik Yapı' | 'Kimyasal Aktiflik & Bağ' | 'Asitlik & Bazlık';
  change: TrendChangeType;
  icon: string;
  scientificReason: string;
  exceptionOrWarning?: string;
  mnemonic?: string;
}

export interface DirectionalTrendGroup {
  key: TrendDirectionKey;
  title: string;
  arrow: string;
  subTitle: string;
  summary: string;
  properties: PeriodicTrendProperty[];
}

export const PERIODIC_DIRECTIONAL_TRENDS: Record<TrendDirectionKey, DirectionalTrendGroup> = {
  'soldan-saga': {
    key: 'soldan-saga',
    title: 'Soldan Sağa Doğru',
    arrow: '➡️',
    subTitle: 'Aynı Periyotta (1A → 8A Grubu)',
    summary: 'Proton sayısı ve çekirdek çekim gücü (Zeff) arttıkça elektronlar merkeze daha kuvvetli çekilir; çap büzülür, ametallik ve elektronegatiflik zirveye çıkar.',
    properties: [
      {
        id: 'cap-ss',
        name: 'Atom ve İyon Yarıçapı',
        category: 'Atomik Yapı',
        change: 'Azalır',
        icon: '⚪',
        scientificReason: 'Katman sayısı aynı kalırken çekirdekteki proton sayısı (Zeff) artar. Birim elektron başına düşen çekim kuvveti arttığı için elektron bulutu çekirdeğe yaklaşır ve çap büzülür.',
        exceptionOrWarning: 'Soy gazların kovalent yarıçapı ölçülemez, Van der Waals yarıçapları kıyaslanırken bu durum gözetilir.',
        mnemonic: 'Kardan Adam Kuralı: Kardan adam güneşte sağa doğru erir ve incelir (çap küçülür).'
      },
      {
        id: 'ie-ss',
        name: '1. İyonlaşma Enerjisi',
        category: 'Fiziksel Özellik',
        change: 'Genellikle Artar',
        icon: '⚡',
        scientificReason: 'Atom yarıçapı küçüldüğü ve çekirdek çekimi arttığı için dış katmandan bir elektron koparmak zorlaşır, gereken enerji yükselir.',
        exceptionOrWarning: '3 AŞAĞI 5 YUKARI KURALI: 2A (ns² tam dolu) ve 5A (ns² np³ yarı dolu) küresel simetri kararlılığına sahip olduğundan 3A ve 6A dan daha büyüktür (1A < 3A < 2A < 4A < 6A < 5A < 7A < 8A).',
        mnemonic: '3 aşağı 5 yukarı merdiveni.'
      },
      {
        id: 'en-ss',
        name: 'Elektronegatiflik',
        category: 'Kimyasal Aktiflik & Bağ',
        change: 'Artar',
        icon: '🧲',
        scientificReason: 'Çekirdek çekim gücü arttıkça atomun kimyasal bağdaki paylaşılan elektronları kendine çekme gücü artar. 7A daki Flor (F = 4.0) periyodik sistemin zirvesidir.',
        exceptionOrWarning: 'SOY GAZ TUZAĞI: Standart koşullarda bağ yapmayan 8A soy gazlarının (He, Ne, Ar...) elektronegatifliği TANIMLANMAZ/YOKTUR.',
        mnemonic: 'Flor (F) elektronegatifliğin kralıdır (4.0).'
      },
      {
        id: 'ei-ss',
        name: 'Elektron İlgisi',
        category: 'Fiziksel Özellik',
        change: 'Genellikle Artar',
        icon: '📥',
        scientificReason: 'Çap küçüldüğü için dışarıdan gelen bir elektronu çekirdek daha kolay çeker ve daha fazla enerji açığa çıkar.',
        exceptionOrWarning: 'KLOR > FLOR İSTİSNASI: 7A da Florun 2p orbitallerindeki yüksek elektron itmesi nedeniyle elektron ilgisi en yüksek element KLOR (Cl) dur.',
        mnemonic: 'Elektronegatiflikte Flor (F), Elektron İlgisinde Klor (Cl) liderdir.'
      },
      {
        id: 'ametalik-ss',
        name: 'Ametalik Karakter (Aktiflik)',
        category: 'Kimyasal Aktiflik & Bağ',
        change: 'Artar',
        icon: '🧪',
        scientificReason: 'Ametalik aktiflik elektron alma eğilimidir. Çap küçülüp elektronegatiflik arttıkça elektron alma isteği artar.',
        exceptionOrWarning: 'Soy gazlar reaksiyona girmeye istekli olmadığından ametal aktiflik değerlendirmesine katılmaz (en aktif ametal 7A daki Flor dur).'
      },
      {
        id: 'metalik-ss',
        name: 'Metalik Karakter (Elektropozitiflik)',
        category: 'Kimyasal Aktiflik & Bağ',
        change: 'Azalır',
        icon: '🪙',
        scientificReason: 'Metalik aktiflik kolay elektron verme eğilimidir. Çap küçüldüğü ve iyonlaşma enerjisi arttığı için elektron vermek zorlaşır.',
        exceptionOrWarning: '1A alkali metalleri periyotlarının en aktif metalleridir; sağa gidildikçe metallik zayıflar.'
      },
      {
        id: 'asit-oksit-ss',
        name: 'Oksitlerin Asitlik Karakteri',
        category: 'Asitlik & Bazlık',
        change: 'Artar',
        icon: '🍋',
        scientificReason: 'Ametalik özellik arttığı için ametal oksitlerin (CO2, SO3, N2O5) suyla tepkimeye girip asit oluşturma gücü artar.',
        exceptionOrWarning: 'NÖTR OKSİT TUZAĞI: Oksijence fakir/eşit ametal oksitleri (CO, NO, N2O) nötrdür, asit oluşturmaz!'
      },
      {
        id: 'baz-oksit-ss',
        name: 'Oksitlerin Bazlık Karakteri',
        category: 'Asitlik & Bazlık',
        change: 'Azalır',
        icon: '🧼',
        scientificReason: 'Metalik karakter azaldığından metal oksitlerin (Na2O, CaO) oluşturduğu bazik kuvvet sağa doğru zayıflar.',
        exceptionOrWarning: 'Al2O3 ve ZnO amfoter oksittir; hem asit hem kuvvetli bazla tepkime verir.'
      },
      {
        id: 'des-ss',
        name: 'Değerlik Elektron Sayısı',
        category: 'Atomik Yapı',
        change: 'Artar',
        icon: '🔢',
        scientificReason: 'A gruplarında grup numarası değerlik elektron sayısına eşittir (1A da 1, 2A da 2 ... 8A da 8).',
        exceptionOrWarning: 'Geçiş metallerinde (B grupları) değerlik elektronları d orbitallerini de kapsadığı için değişkenlik gösterebilir.'
      },
      {
        id: 'katman-ss',
        name: 'Katman (Periyot) Sayısı',
        category: 'Atomik Yapı',
        change: 'Değişmez',
        icon: '⭕',
        scientificReason: 'Aynı yatay sırada (periyotta) bulunulduğu için baş kuantum sayısı (katman sayısı) sabittir.',
        exceptionOrWarning: 'Örn: 3. periyottaki Na dan Ar a kadar tüm atomların temel halde 3 katmanı vardır.'
      },
      {
        id: 'cekirdek-yuku-ss',
        name: 'Çekirdek Yükü (Proton Sayısı)',
        category: 'Atomik Yapı',
        change: 'Artar',
        icon: '⚛️',
        scientificReason: 'Periyodik tablo atom numaralarına (artan proton sayısına) göre dizilmiştir; her adımda proton sayısı 1 artar.',
        exceptionOrWarning: 'Çekirdek yükü terimi "proton sayısı" demektir; iyon yüküyle karıştırılmamalıdır!'
      }
    ]
  },
  'yukaridan-asagiya': {
    key: 'yukaridan-asagiya',
    title: 'Yukarıdan Aşağıya Doğru',
    arrow: '⬇️',
    subTitle: 'Aynı Grupta (1. Periyot → 7. Periyot)',
    summary: 'Her basamakta yeni bir elektron katmanı açılır; atom yarıçapı devasa büyür, dış elektronlar çekirdekten uzaklaşarak kolayca koparılır (metalik güç tavan yapar).',
    properties: [
      {
        id: 'cap-ya',
        name: 'Atom ve İyon Yarıçapı',
        category: 'Atomik Yapı',
        change: 'Artar',
        icon: '⚪',
        scientificReason: 'Aşağı inildikçe her periyotta yeni bir enerji katmanı (yörünge) eklenir. Katman sayısı artışı çekirdek çekimindeki artıştan çok daha baskındır, bu yüzden çap net biçimde büyür.',
        exceptionOrWarning: 'Aynı gruptaki elementlerin iyon çapları da nötr atomları gibi aşağı doğru düzenli büyür.',
        mnemonic: 'Kardan Adam Kuralı: Kardan adamın alt gövdesi en büyüktür (aşağı doğru şişmanlar).'
      },
      {
        id: 'ie-ya',
        name: '1. İyonlaşma Enerjisi',
        category: 'Fiziksel Özellik',
        change: 'Azalır',
        icon: '⚡',
        scientificReason: 'Değerlik elektronları çekirdekten çok uzaklaşır ve aradaki iç katman elektronları (perdeleme etkisi) çekimi zayıflatır. Elektron koparmak çok kolaylaşır.',
        exceptionOrWarning: 'Grupta aşağı inildikçe istisnasız azalır; soldan sağdaki gibi 3 aşağı 5 yukarı zikzakları grupta görülmez.'
      },
      {
        id: 'en-ya',
        name: 'Elektronegatiflik',
        category: 'Kimyasal Aktiflik & Bağ',
        change: 'Azalır',
        icon: '🧲',
        scientificReason: 'Yarıçap büyüdüğü için çekirdeğin ortaklaşa kullanılan bağ elektronlarına uyguladığı çekim kuvveti zayıflar.',
        exceptionOrWarning: '7A da Flor (4.0) en yüksek iken Klor (3.0), Brom (2.8) ve İyot (2.5) şeklinde aşağı doğru hızla düşer.'
      },
      {
        id: 'ei-ya',
        name: 'Elektron İlgisi',
        category: 'Fiziksel Özellik',
        change: 'Genellikle Azalır',
        icon: '📥',
        scientificReason: 'Genişleyen hacim nedeniyle dışarıdan katmana giren elektron çekirdek tarafından daha az çekilir ve daha az enerji salınır.',
        exceptionOrWarning: 'EN BÜYÜK İSTİSNA: Cl (3. periyot) > F (2. periyot) dur! F den sonra Cl ye artar, ardından Br ve I ya doğru azalmaya devam eder.'
      },
      {
        id: 'metalik-ya',
        name: 'Metalik Karakter (Aktiflik)',
        category: 'Kimyasal Aktiflik & Bağ',
        change: 'Artar',
        icon: '🪙',
        scientificReason: 'Çap büyüyüp iyonlaşma enerjisi düştüğü için atomlar değerlik elektronlarını çok rahat verir. 1A nın en altındaki Fransiyum (Fr) en aktif metaldir.',
        exceptionOrWarning: 'Aktif metaller suyla bile alev çıkararak patlar; aşağı inildikçe suyla reaksiyon şiddeti katlanır (Cs ve Fr patlayıcıdır).'
      },
      {
        id: 'ametalik-ya',
        name: 'Ametalik Karakter (Aktiflik)',
        category: 'Kimyasal Aktiflik & Bağ',
        change: 'Azalır',
        icon: '🧪',
        scientificReason: 'Elektron alma isteği ve elektronegatiflik azaldığı için ametalik güç aşağı doğru zayıflar (Flor gaz iken İyot katıdır).',
        exceptionOrWarning: 'Ametal aktifliğinde soy gazlar dikkate alınmaz; periyodik sistemin en aktif ametali Flor (F) dur.'
      },
      {
        id: 'asit-hx-ya',
        name: 'Halojen Asitlerinin (HX) Kuvveti',
        category: 'Asitlik & Bazlık',
        change: 'Artar',
        icon: '🧪',
        scientificReason: 'Halojenin çapı büyüdükçe H-X bağı uzar ve bağ enerjisi düşer. H+ iyonu sulu çözeltiye çok daha kolay salınır. HF zayıf asit iken HI en kuvvetli asittir.',
        exceptionOrWarning: 'HF < HCl < HBr < HI. HF zayıf asittir ama camı aşındırır; HI süper asit kuvvetindedir.'
      },
      {
        id: 'baz-oksit-ya',
        name: 'Oksitlerin Bazlık Karakteri',
        category: 'Asitlik & Bazlık',
        change: 'Artar',
        icon: '🧼',
        scientificReason: 'Metalik aktiflik arttığı için metal oksitlerin ve hidroksitlerin suda çözünme ve baz oluşturma kuvveti artar (CsOH > KOH > NaOH > LiOH).',
        exceptionOrWarning: 'LiOH zayıf alkali iken CsOH en kuvvetli bazlardan biridir.'
      },
      {
        id: 'des-ya',
        name: 'Değerlik Elektron Sayısı',
        category: 'Atomik Yapı',
        change: 'Değişmez',
        icon: '🔢',
        scientificReason: 'Aynı gruptaki tüm elementlerin dış katman elektron dizilimi benzerdir (örn: 1A daima ns¹, 7A daima ns² np⁵).',
        exceptionOrWarning: 'HELYUM TUZAĞI: 8A daki Helyum (He) 2 elektrona sahiptir; gruptaki diğer soygazlar (Ne, Ar, Kr...) 8 değerlik elektronuna sahiptir!'
      },
      {
        id: 'katman-ya',
        name: 'Katman (Periyot) Sayısı',
        category: 'Atomik Yapı',
        change: 'Artar',
        icon: '⭕',
        scientificReason: 'Aşağı doğru her satır yeni bir periyottur (n=1, 2, 3, 4, 5, 6, 7).',
        exceptionOrWarning: 'Katman sayısı periyot numarasına eşittir.'
      },
      {
        id: 'cekirdek-yuku-ya',
        name: 'Çekirdek Yükü (Proton Sayısı)',
        category: 'Atomik Yapı',
        change: 'Artar',
        icon: '⚛️',
        scientificReason: 'Periyot atlandıkça soy gaz aralıkları (2, 8, 8, 18, 18, 32) kadar proton eklenir.',
        exceptionOrWarning: 'Aşağı doğru atom kütlesi ve nötron sayısı da hızla artar.'
      }
    ]
  },
  'sagdan-sola': {
    key: 'sagdan-sola',
    title: 'Sağdan Sola Doğru',
    arrow: '⬅️',
    subTitle: 'Aynı Periyotta (8A → 1A Grubu - Ters Yön)',
    summary: 'Soldan sağın tam tersidir: Çekirdek çekim gücü (Zeff) zayıflar, elektronlar serbestleşir, çap büyür ve metallik kuvvetlenir.',
    properties: [
      {
        id: 'cap-sl',
        name: 'Atom ve İyon Yarıçapı',
        category: 'Atomik Yapı',
        change: 'Artar',
        icon: '⚪',
        scientificReason: 'Proton sayısı azaldığı için çekirdeğin elektron bulutunu çekme gücü azalır, atom genişler.',
        exceptionOrWarning: '1A alkali metalleri periyotlarının en geniş yarıçaplı atomlarıdır.'
      },
      {
        id: 'metalik-sl',
        name: 'Metalik Karakter & Elektropozitiflik',
        category: 'Kimyasal Aktiflik & Bağ',
        change: 'Artar',
        icon: '🪙',
        scientificReason: 'İyonlaşma enerjisi düştüğü için elektron verme kolaylaşır.',
        exceptionOrWarning: '1A grubuna yaklaştıkça metalik parlaklık ve aktiflik zirveye ulaşır.'
      },
      {
        id: 'baz-oksit-sl',
        name: 'Oksitlerin Bazlık Karakteri',
        category: 'Asitlik & Bazlık',
        change: 'Artar',
        icon: '🧼',
        scientificReason: 'Metallerin oksitleri bazik karakterlidir (Na2O, K2O).',
        exceptionOrWarning: 'Ametal oksitlerinden metal oksitlerine geçiş olur.'
      },
      {
        id: 'ie-sl',
        name: '1. İyonlaşma Enerjisi',
        category: 'Fiziksel Özellik',
        change: 'Genellikle Azalır',
        icon: '⚡',
        scientificReason: 'Çap büyüdüğü için elektronu koparmak kolaylaşır.',
        exceptionOrWarning: '2A ve 5A küresel simetri tepecikleri tersten yaklaşırken de kendini hissettirir.'
      },
      {
        id: 'en-sl',
        name: 'Elektronegatiflik ve Elektron İlgisi',
        category: 'Kimyasal Aktiflik & Bağ',
        change: 'Azalır',
        icon: '🧲',
        scientificReason: 'Ametallik zayıfladığı için elektron çekme isteği düşer.',
        exceptionOrWarning: '1A metalleri elektron çekmek değil vermek ister.'
      }
    ]
  },
  'asagidan-yukariya': {
    key: 'asagidan-yukariya',
    title: 'Aşağıdan Yukarıya Doğru',
    arrow: '⬆️',
    subTitle: 'Aynı Grupta (7. Periyot → 1. Periyot - Ters Yön)',
    summary: 'Yukarıdan aşağının tam tersidir: Katmanlar eksilir, atom minyatürleşir, çekirdek dış elektronları sımsıkı yakalar; iyonlaşma enerjisi ve elektronegatiflik tavana vurur.',
    properties: [
      {
        id: 'ie-ay',
        name: '1. İyonlaşma Enerjisi',
        category: 'Fiziksel Özellik',
        change: 'Artar',
        icon: '⚡',
        scientificReason: 'Katman sayısı azaldığı için değerlik elektronları çekirdeğe çok yakındır, koparmak için devasa enerji gerekir.',
        exceptionOrWarning: 'Helyum (He) periyodik tablonun iyonlaşma enerjisi en yüksek elementidir (2372 kJ/mol).'
      },
      {
        id: 'en-ay',
        name: 'Elektronegatiflik',
        category: 'Kimyasal Aktiflik & Bağ',
        change: 'Artar',
        icon: '🧲',
        scientificReason: 'Atom küçüldükçe dış elektronları çekme potansiyeli artar. 7A nın tepesindeki Flor (F) elektronegatifliğin zirvesidir.',
        exceptionOrWarning: 'Soy gazlar hariç tutulur.'
      },
      {
        id: 'cap-ay',
        name: 'Atom ve İyon Yarıçapı',
        category: 'Atomik Yapı',
        change: 'Azalır',
        icon: '⚪',
        scientificReason: 'Her adımda bir katman eksilir (n=7 den n=1 e doğru).',
        exceptionOrWarning: 'Hidrojen ve Helyum sadece tek katmana (n=1) sahiptir.'
      },
      {
        id: 'ametalik-ay',
        name: 'Ametalik Karakter (Aktiflik)',
        category: 'Kimyasal Aktiflik & Bağ',
        change: 'Artar',
        icon: '🧪',
        scientificReason: 'Küçük çap elektron almayı kolaylaştırır. Halojenlerde en aktif ametal en tepedeki Flor dur.',
        exceptionOrWarning: 'Flor cam hariç neredeyse tüm maddelerle reaksiyona girer.'
      },
      {
        id: 'metalik-ay',
        name: 'Metalik Karakter (Aktiflik)',
        category: 'Kimyasal Aktiflik & Bağ',
        change: 'Azalır',
        icon: '🪙',
        scientificReason: 'Elektron koparmak zorlaştığı için metallerin aktifliği yukarı çıkıldıkça azalır (Li, Na dan daha az aktiftir).',
        exceptionOrWarning: '1A da yukarı çıktıkça metal-su tepkimesinin şiddeti azalır.'
      }
    ]
  }
};
