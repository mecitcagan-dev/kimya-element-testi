export interface OrganicTestItem {
  id: string;
  reactants: string;
  result: string;
  reactionType: 'Ayıraç / Tanıma Testi' | 'Yükseltgenme' | 'Katılma Reaksiyonu' | 'Su Katılması & Tautomeri';
  examHighlight: string;
}

export const ORGANIC_TESTS: OrganicTestItem[] = [
  {
    id: 'aldehit-tollens',
    reactants: 'Aldehit (R-CHO) + Tollens Ayıracı [Ag(NH3)2]+',
    result: 'Gümüş Aynası Oluşur (Ag+ -> Ag metaline indirgenir)',
    reactionType: 'Ayıraç / Tanıma Testi',
    examHighlight: 'Aldehit karboksilik aside yükseltgenirken gümüş iyonları metalik gümüşe indirgenip tüp çeperinde gümüş aynası yapar.'
  },
  {
    id: 'keton-tollens',
    reactants: 'Keton (R-CO-R) + Tollens Ayıracı',
    result: 'Tepkime Vermez (Yükseltgenemez)',
    reactionType: 'Ayıraç / Tanıma Testi',
    examHighlight: 'Ketonlar karbonil karbonunda H taşımadığı için Tollens ve Fehling ile yükseltgenme tepkimesi VERMEZ.'
  },
  {
    id: 'formik-asit-tollens',
    reactants: 'Karınca Asidi (Formik Asit: HCOOH) + Tollens / Fehling',
    result: 'Gümüş Aynası ve Kırmızı Çökelek Verir!',
    reactionType: 'Ayıraç / Tanıma Testi',
    examHighlight: 'EN BÜYÜK ÖSYM TUZAĞI: Formik asit bir karboksilik asit olmasına rağmen yapısında aldehit grubu (-CHO) taşıdığından Tollens ve Fehling ile tepkime verir!'
  },
  {
    id: 'uc-alkin-tollens',
    reactants: 'Uç Alkin (R-C≡CH) + Amonyaklı AgNO3 (Tollens)',
    result: 'Beyaz Çökelek Oluşur (Asit-Baz Yer Değiştirme)',
    reactionType: 'Ayıraç / Tanıma Testi',
    examHighlight: 'ÖSYM TUZAĞI: Bu tepkime bir REDOKS DEĞİLDİR; asidik uç hidrojenin Ag+ ile yer değiştirmesidir. Gümüş aynası değil BEYAZ ÇÖKELEK oluşur.'
  },
  {
    id: 'ic-alkin-tollens',
    reactants: 'İç Alkin (R-C≡C-R) + Tollens Ayıracı',
    result: 'Tepkime Vermez',
    reactionType: 'Ayıraç / Tanıma Testi',
    examHighlight: 'İç alkinlerde üçlü bağ karbonlarına bağlı hidrojen bulunmadığından Tollens veya Fehling ile beyaz/kırmızı çökelek VERMEZLER.'
  },
  {
    id: 'aldehit-fehling',
    reactants: 'Alifatik Aldehit + Fehling Ayıracı (Bazik Cu2+ tartrat)',
    result: 'Kırmızı Cu2O Çökeleği Oluşur',
    reactionType: 'Ayıraç / Tanıma Testi',
    examHighlight: 'Cu2+ iyonları Cu+ iyonuna indirgenerek kiremit kırmızısı bakır(I) oksit (Cu2O) çökeleği oluşturur.'
  },
  {
    id: 'alken-bromlu-su',
    reactants: 'Alken (C=C) + Bromlu Su (Br2 / CCl4)',
    result: 'Kızıl-Kahve Renk Giderilir (Pi Bağına Katılma)',
    reactionType: 'Katılma Reaksiyonu',
    examHighlight: 'Karbonlar arası pi bağı içeren doymamış hidrokarbonlar (alken ve alkin) elektrofilik katılmayla bromlu suyun rengini giderir.'
  },
  {
    id: 'benzen-bromlu-su',
    reactants: 'Benzen (C6H6) + Bromlu Su',
    result: 'Renk Giderilmez (Tepkime Yok)',
    reactionType: 'Katılma Reaksiyonu',
    examHighlight: 'Benzen halkasında 3 adet pi bağı bulunmasına rağmen rezonans kararlılığı nedeniyle katılma tepkimesi vermez ve bromlu suyun rengini GİDERMEZ.'
  },
  {
    id: 'primer-alkol-yukseltgenme',
    reactants: 'Primer (1°) Alkol (R-CH2-OH) + [O] (KMnO4 / K2Cr2O7)',
    result: '2 Basamak Yükseltgenir: Aldehit -> Karboksilik Asit',
    reactionType: 'Yükseltgenme',
    examHighlight: '1° alkoller 1 basamak yükseltgenirse aldehit, 2 basamak yükseltgenirse karboksilik asit oluşturur.'
  },
  {
    id: 'sekonder-alkol-yukseltgenme',
    reactants: 'Sekonder (2°) Alkol (R2-CH-OH) + [O]',
    result: '1 Basamak Yükseltgenerek Keton Oluşturur',
    reactionType: 'Yükseltgenme',
    examHighlight: '2° alkoller yalnızca 1 basamak yükseltgenebilir ve keton verir. Ketonlar daha fazla yükseltgenemez.'
  },
  {
    id: 'tersiyer-alkol-yukseltgenme',
    reactants: 'Tersiyer (3°) Alkol (R3-C-OH) + [O]',
    result: 'Yükseltgenmez! (Tepkime Yok)',
    reactionType: 'Yükseltgenme',
    examHighlight: 'OH ın bağlı olduğu alfa karbonunda kopabilecek hidrojen atomu bulunmadığı için 3° alkoller yükseltgenme vermez.'
  },
  {
    id: 'asetilen-su-katilmasi',
    reactants: 'Asetilen (C2H2) + Su (H2O / H2SO4, HgSO4)',
    result: 'Asetaldehit (Aldehit) Oluşur (Enol-Keto Tautomerisi)',
    reactionType: 'Su Katılması & Tautomeri',
    examHighlight: 'ÖSYM AYRIMI: Alkinlere su katıldığında SADECE 2 karbonlu asetilen ALDEHİT verir; diğer tüm alkinler KETОN verir!'
  },
  {
    id: 'propin-su-katilmasi',
    reactants: 'Propin (CH3-C≡CH) + Su (H2O)',
    result: 'Aseton (Keton) Oluşur (Markovnikov Yönelimi)',
    reactionType: 'Su Katılması & Tautomeri',
    examHighlight: '3 ve daha fazla karbonlu alkinlere su katıldığında Markovnikov kuralı ve tautomeri sonucu daima keton elde edilir.'
  },
  {
    id: 'baeyer-testi',
    reactants: 'Alken + Seyreltik Bazik KMnO4 (Baeyer Ayıracı)',
    result: 'Mor Renk Kaybolur, Kahverengi MnO2 Çöker (Diol Oluşur)',
    reactionType: 'Ayıraç / Tanıma Testi',
    examHighlight: 'Alkenlerin ılımlı yükseltgenmesiyle komşu diol (glikol) oluşur; mor permanganat rengi kaybolur.'
  }
];
