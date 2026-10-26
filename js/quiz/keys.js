// Klavye: tek merkezi dinleyici. Tuş önce e.key (Türkçe küçük harfe çevrilmiş) ile, olmazsa e.code
// (fiziksel konum) ile tanınır; ne yapılacağı ekrana ve oturum durumuna göre actionFor'da seçilir.
import { state, isCompound } from '../state/app-state.js';
import { $ } from '../utils/dom.js';
import { setTab, toggleMode } from '../ui/setup.js';
import { toggleTable } from '../ui/periodic-table.js';
import { toggleCat, toggleOption, focusName, nameInput, OPT_KEYS } from '../ui/test.js';
import { submitAnswer, advance, finishSession } from './session.js';

const LETTER_KEYS = ['q', 'w', 'e', 'a', 's', 'd', 'f', 'r', 'z', 'y', 'g', 't', 'x', 'h', 'j', 'k'];

function keyOf(e) {
  const key = e.key || '';
  const code = e.code || '';
  if (key === 'Enter' || code === 'Enter' || code === 'NumpadEnter') return 'enter';
  if (key === 'Escape' || key === 'Esc') return 'esc';
  if (key === ' ' || code === 'Space') return 'space';
  if (/^[0-8]$/.test(key)) return key;
  const num = /^(?:Digit|Numpad)([0-8])$/.exec(code);
  if (num) return num[1];
  const lower = key.toLocaleLowerCase('tr');
  if (LETTER_KEYS.includes(lower)) return lower;
  const phys = /^Key([A-Z])$/.exec(code);
  if (phys && LETTER_KEYS.includes(phys[1].toLowerCase())) return phys[1].toLowerCase();
  return '';
}

const segPick = (id, val) => () => $(id).querySelector(`[data-val="${val}"]`).click();
const clickIf = id => () => {
  const b = $(id);
  if (b && !b.disabled) b.click();
};

// Kurulum ekranı (element sekmesi)
const SETUP_KEYS = {
  q: segPick('seg-range', '1-18'),
  w: segPick('seg-range', '19-36'),
  e: segPick('seg-range', '1-36'),
  a: segPick('seg-count', '10'),
  s: segPick('seg-count', '20'),
  d: segPick('seg-count', '36'),
  f: segPick('seg-count', 'inf'),
  x: () => toggleMode(),
  r: () => $('opt-retry').click(),
  z: clickIf('btn-weak'),
  enter: clickIf('btn-start')
};

// Bileşik sekmesi: aralık (Q W E) yok; H J K yön, A S D F sayı
const COMPOUND_SETUP_KEYS = {
  h: segPick('seg-cdir', 'ad-formul'),
  j: segPick('seg-cdir', 'formul-ad'),
  k: segPick('seg-cdir', 'karisik'),
  a: segPick('seg-ccount', '10'),
  s: segPick('seg-ccount', '20'),
  d: segPick('seg-ccount', '18'),
  f: segPick('seg-ccount', 'inf'),
  x: () => toggleMode(),
  r: () => $('opt-retry').click(),
  z: clickIf('btn-weak'),
  enter: clickIf('btn-start')
};

// Sonuç ekranı
const RESULT_KEYS = {
  enter: clickIf('btn-restart'),
  t: clickIf('btn-restart'),
  y: clickIf('btn-missed'),
  g: clickIf('btn-setup')
};

// Bu ekranda tuşun yapacağı iş; yoksa null
function actionFor(k) {
  if (!k) return null;
  const compound = isCompound();
  if (k === '0') return compound ? null : toggleTable;   // periyodik tablo: element testinde her ekranda açar/kapatır
  if (state.view === 'setup') {
    if (k === '1') return () => setTab('element', true);
    if (k === '2') return () => setTab('compound', true);
    return (compound ? COMPOUND_SETUP_KEYS : SETUP_KEYS)[k] || null;
  }
  if (state.view === 'result') return RESULT_KEYS[k] || null;
  if (state.view !== 'test') return null;
  if (state.qState === 'asking') {
    // Bileşik yazarak modunda rakamlar yazı alanına gider; tür için Alt+1–4 (keydown'da)
    if (compound) {
      if (state.session.mode === 'choice' && /^[1-4]$/.test(k)) return () => toggleCat(Number(k) - 1);
    } else if (/^[1-8]$/.test(k)) {
      return () => toggleCat(Number(k) - 1);
    }
    if (k === 'enter') return () => submitAnswer();
    if (k === 'esc') return () => finishSession();
    // Seçenekli modda Q W E R: 1.–4. seçenek (yazı alanı yok, harf girişi de olmaz)
    const oi = OPT_KEYS.indexOf(k);
    if (state.session.mode === 'choice' && oi >= 0) return () => toggleOption(oi);
    return null;
  }
  // Geri bildirim: Enter veya Space = Sonraki, Esc = Bitir
  if (k === 'enter' || k === 'space') return () => advance();
  if (k === 'esc') return () => finishSession();
  return null;
}

// Belgede tek keydown dinleyicisi (uygulama açılırken bir kez eklenir)
export function initKeys() {
  document.addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey || e.isComposing) return;

    // Alt+1–4: bileşik yazarak modunda tür seçimi (Option+rakam sembol yazmasın); diğer Alt kombinasyonları yok
    if (e.altKey) {
      const alt = /^(?:Digit|Numpad)([1-4])$/.exec(e.code || '');
      if (alt && state.view === 'test' && state.qState === 'asking' && state.session.quiz === 'compound' && state.session.mode === 'type') {
        e.preventDefault();
        if (!e.repeat) toggleCat(Number(alt[1]) - 1);
        focusName();
      }
      return;
    }

    const run = actionFor(keyOf(e));
    const printable = (e.key || '').length === 1;
    if (run) {
      e.preventDefault(); // düğme tıklaması, sayfa kaydırma veya harf girişi olmasın
      if (!e.repeat) run(); // basılı tutmada eylem bir kez çalışır
    }

    // Soru sorulurken ad alanı odakta kalsın: odak dışarıdaysa tuş (ve harf) alana gider
    if ((run || printable) && state.view === 'test' && state.qState === 'asking' && document.activeElement !== nameInput) {
      focusName();
    }
  });
}
