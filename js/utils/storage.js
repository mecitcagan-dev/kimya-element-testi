// localStorage erişimi: tüm okuma ve yazmalar burada try/catch ile yapılır.
// Depolama yoksa (gizli mod, engelli site verisi) uygulama varsayılanlarla çalışmaya devam eder.

// Depolama anahtarları (değerler değişmez; eski kayıtlar bu adlarla okunur)
export const KEYS = {
  stats: 'elementTesti.v1',                              // element hata istatistiği
  compounds: 'elementTesti.compounds.v1',                // bileşik hata istatistiği
  tab: 'elementTesti.tab',                               // son kurulum sekmesi
  compoundDirection: 'elementTesti.compoundDirection',   // bileşik soru yönü
  answerMode: 'elementTesti.answerMode',                 // cevap şekli: yazarak | seçenekli
  showTable: 'elementTesti.showTable'                    // periyodik tablo görünürlüğü
};

// Değeri okur; hata varsa veya kayıt yoksa null döner
export function readStored(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (err) {
    return null;
  }
}

// Değeri yazar; depolama yoksa sessizce geçer
export function writeStored(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (err) {
    /* depolama yoksa uygulama yine çalışır */
  }
}
