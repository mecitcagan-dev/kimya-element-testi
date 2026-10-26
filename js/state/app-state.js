// Uygulamanın paylaşılan çalışma durumu. Tek nesne: modüller bunu içe aktarıp okur ve yazar.

export const state = {
  view: 'setup',            // 'setup' | 'test' | 'result'
  session: null,            // aktif oturum (quiz/session.js oluşturur)
  current: null,            // sorulan soru: { el, retry, dir }
  qState: 'asking',         // 'asking' | 'feedback'
  picked: -1,               // seçili kategori indeksi, yoksa -1
  pickedName: null,         // seçenekli modda seçili ad, yoksa null
  choices: [],              // seçenekli modda sorunun 4 adı (ekrandaki sırayla)
  lastCfg: null,            // son başlatılan oturumun ayarı (Tekrar Başlat için)
  lastResult: null,         // son oturumun sonucu
  setupTab: 'element',      // kurulum sekmesi: 'element' | 'compound'
  tableShown: true,         // periyodik tablo görünür mü
  opts: { range: '1-36', count: 36, mode: 'type' },   // element kurulum seçimleri
  copts: { count: '18', dir: 'ad-formul' }            // bileşik kurulum seçimleri
};

// Bileşik testi mi? Kurulum ekranında seçili sekmeye, testte oturumun türüne bakar.
export const isCompound = () => (state.view === 'setup' ? state.setupTab : (state.session ? state.session.quiz : state.setupTab)) === 'compound';
