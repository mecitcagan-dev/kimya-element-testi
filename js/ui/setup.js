// Kurulum ekranı: sekmeler (Element | Bileşik), aralık, soru sayısı, yön ve cevap şekli seçimleri
import { BY_Z } from '../data/elements.js';
import { CMP_BY_Z } from '../data/compounds.js';
import { state } from '../state/app-state.js';
import { weakZs, weakCompoundIds } from '../state/stats.js';
import { $ } from '../utils/dom.js';
import { readStored, writeStored, KEYS } from '../utils/storage.js';

// Ad → Formül, Formül → Ad, Karışık
const DIRS = ['ad-formul', 'formul-ad', 'karisik'];

// Kayıtlı tercihleri okur (sekme, bileşik yönü, cevap şekli). Varsayılanlar state.js'de.
export function loadSetupPrefs() {
  // ---------- Sekme ve bileşik ayarları ----------
  // setupTab: kurulum ekranındaki test ('element' | 'compound'); son seçim tarayıcıda tutulur
  const savedTab = readStored(KEYS.tab);
  if (savedTab === 'element' || savedTab === 'compound') state.setupTab = savedTab;
  const savedDir = readStored(KEYS.compoundDirection);
  if (DIRS.includes(savedDir)) state.copts.dir = savedDir;

  // ---------- Cevap şekli: yazarak ('type') | seçenekli ('choice') ----------
  // Varsayılan: dokunmatik ekranda seçenekli. Kullanıcı bir kez açıkça seçince localStorage tercihi kullanılır.
  try {
    state.opts.mode = window.matchMedia('(pointer: coarse)').matches ? 'choice' : 'type';
  } catch (err) {
    state.opts.mode = 'type';
  }
  const savedMode = readStored(KEYS.answerMode);
  if (savedMode === 'type' || savedMode === 'choice') state.opts.mode = savedMode;
}

// Bileşik soru sayısı (Sonsuz için Infinity)
export const compoundTotal = () => (state.copts.count === 'inf' ? Infinity : Number(state.copts.count));

// "Yanlışları tekrar sor" onay kutusu
export const retryChecked = () => $('opt-retry').checked;

function markSeg(id, val) {
  $(id).querySelectorAll('button').forEach(b => {
    b.setAttribute('aria-pressed', b.dataset.val === val ? 'true' : 'false');
  });
}

// Kurulum sekmesi: seçili sekmenin alanlarını gösterir; başlığı, ipucunu ve sekme durumunu ayarlar
function syncTabUI() {
  const compound = state.setupTab === 'compound';
  document.querySelectorAll('#tabs [data-val]').forEach(b => {
    b.setAttribute('aria-selected', b.dataset.val === state.setupTab ? 'true' : 'false');
  });
  document.querySelectorAll('[data-quiz]').forEach(n => {
    n.hidden = n.dataset.quiz !== state.setupTab;
  });
  $('hero-title').textContent = compound ? 'Bileşik Testi' : 'Element Testi';
  $('hero-sub').textContent = compound
    ? 'Bileşiklerin formülünü, Türkçe adını ve türünü test et.'
    : 'İlk 36 elementin sembolünü, Türkçe adını ve kategorisini test et.';
  $('retry-hint').textContent = compound
    ? 'Yanlış cevapladığın bileşik 3–5 soru sonra yeniden sorulur.'
    : 'Yanlış cevapladığın element 3–5 soru sonra yeniden sorulur.';
  markSeg('seg-cdir', state.copts.dir);
  markSeg('seg-ccount', state.copts.count);
}

// Sekme değiştirir; remember açıksa tercih tarayıcıda saklanır
export function setTab(tab, remember) {
  state.setupTab = tab === 'compound' ? 'compound' : 'element';
  if (remember) writeStored(KEYS.tab, state.setupTab);
  renderSetup();
}

export function renderSetup() {
  syncTabUI();
  if (state.setupTab === 'compound') {
    const weakC = weakCompoundIds();
    $('btn-weak').disabled = weakC.length === 0;
    $('weak-hint').textContent = weakC.length
      ? 'Hata geçmişine göre en çok yanlış yaptığın bileşikler: ' + weakC.map(z => CMP_BY_Z[z].disp).join(', ')
      : 'Henüz hata kaydın yok. Birkaç test çözdükten sonra burada görünür.';
    return;
  }
  const weak = weakZs();
  $('btn-weak').disabled = weak.length === 0;
  $('weak-hint').textContent = weak.length
    ? 'Hata geçmişine göre en çok yanlış yaptığın elementler: ' + weak.map(z => BY_Z[z].s).join(', ')
    : 'Henüz hata kaydın yok. Birkaç test çözdükten sonra burada görünür.';
}

export function syncModeUI() {
  $('seg-mode').querySelectorAll('button').forEach(b => {
    b.setAttribute('aria-pressed', b.dataset.val === state.opts.mode ? 'true' : 'false');
  });
}

// remember: yalnızca kullanıcı açıkça seçtiğinde (tıklama veya X) tercih kaydedilir
export function setMode(mode, remember) {
  state.opts.mode = mode === 'choice' ? 'choice' : 'type';
  if (remember) writeStored(KEYS.answerMode, state.opts.mode);
  syncModeUI();
}

export function toggleMode() {
  setMode(state.opts.mode === 'choice' ? 'type' : 'choice', true);
}

function bindSeg(id, onPick) {
  const box = $(id);
  box.addEventListener('click', ev => {
    const b = ev.target.closest('button');
    if (!b || !box.contains(b)) return;
    box.querySelectorAll('button').forEach(x => {
      x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
    });
    onPick(b.dataset.val);
  });
}

// Kurulum ekranının seçim denetimleri ve sekme düğmeleri
export function initSetup() {
  bindSeg('seg-range', v => { state.opts.range = v; });
  bindSeg('seg-count', v => { state.opts.count = v === 'inf' ? Infinity : Number(v); });
  bindSeg('seg-mode', v => setMode(v, true));
  bindSeg('seg-ccount', v => { state.copts.count = v; });
  bindSeg('seg-cdir', v => {
    state.copts.dir = v;
    writeStored(KEYS.compoundDirection, v);
  });
  $('tabs').addEventListener('click', ev => {
    const b = ev.target.closest('button');
    if (b && b.dataset.val) setTab(b.dataset.val, true);
  });
}
