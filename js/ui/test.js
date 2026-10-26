// Test ekranı: üst çubuk, soru, ad alanı, seçenekler, tür düğmeleri ve geri bildirim paneli
import { CATEGORIES } from '../data/elements.js';
import { COMPOUND_CATS } from '../data/compounds.js';
import { state } from '../state/app-state.js';
import { $, esc } from '../utils/dom.js';
import { squeeze, foldKey, formulaKey, formatFormula } from '../utils/text.js';
import { formulaAsk, answerText, catList, makeChoices, makeCompoundChoices } from '../quiz/answers.js';
import { ptAsk, ptReveal } from './periodic-table.js';

// Seçenekli mod düğmeleri klavyede Q W E R ile seçilir
export const OPT_KEYS = ['q', 'w', 'e', 'r'];

// Ad alanı ve uyarı kutusu (sayfada tek örnek)
export const nameInput = $('name-input');
const warnEl = $('warn');

let catButtons = [];
let optButtons = [];

export function showWarn(msg) {
  warnEl.textContent = msg;
  warnEl.hidden = false;
}

export function hideWarn() {
  warnEl.textContent = '';
  warnEl.hidden = true;
}

// Ad alanına odak yalnızca yazarak modunda; seçenekli modda alan yok, klavye açılmaz
export function focusName() {
  if (state.view === 'test' && state.session && state.session.mode === 'type') nameInput.focus({ preventScroll: true });
}

// Gönderilecek cevap: seçenekli modda seçili ad, yazarak modda alandaki metin
export const typedAnswer = () => (state.session.mode === 'choice' ? (state.pickedName || '') : nameInput.value);

// Formül yazılırken rakamları anında alt simgeye çevirir (yalnızca formül beklenen bileşik sorusunda)
function formatFormulaInput(ev) {
  if (ev && ev.isComposing) return;
  if (state.view !== 'test' || state.qState !== 'asking' || !state.session || state.session.quiz !== 'compound' || !formulaAsk(state.current)) return;
  const v = nameInput.value;
  const out = formatFormula(v);
  if (out === v) return;
  const a = nameInput.selectionStart;
  const b = nameInput.selectionEnd;
  nameInput.value = out;
  nameInput.setSelectionRange(a, b);
}

// ---------- Tür düğmeleri (oturumun türüne göre yeniden kurulur) ----------
function renderCatButtons(list, altBadges) {
  const grid = $('cat-grid');
  grid.innerHTML = '';
  catButtons = list.map((c, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'cat';
    b.style.setProperty('--rgb', c.rgb);
    b.setAttribute('aria-pressed', 'false');
    const badge = altBadges ? '⌥' + (i + 1) : String(i + 1);
    b.innerHTML = '<span class="dot" aria-hidden="true"></span><span class="cat-label"></span><kbd>' + badge + '</kbd>';
    b.querySelector('.cat-label').textContent = c.key;
    // Fareyle tıklamada odak düğmeye geçmesin; ad alanı odakta kalsın
    b.addEventListener('mousedown', ev => ev.preventDefault());
    b.addEventListener('click', () => {
      toggleCat(i);
      if (state.view === 'test' && state.qState === 'asking') focusName();
    });
    grid.appendChild(b);
    return b;
  });
}

// Oturum başında soru alanını türe göre kurar (element: 8 tür; bileşik: 4 tür, yazarak modunda ⌥ rozetleri)
export function setQuizUI() {
  const compound = state.session.quiz === 'compound';
  const typing = state.session.mode === 'type';
  renderCatButtons(compound ? COMPOUND_CATS : CATEGORIES, compound && typing);
  $('cat-keys').textContent = !compound ? '1–8 tuşları' : (typing ? '⌥1–4' : '1–4 tuşları');
}

function paintCats() {
  const answered = state.qState === 'feedback';
  const correct = answered && state.current ? catList().findIndex(c => c.key === state.current.el.c) : -1;
  catButtons.forEach((b, i) => {
    const on = state.picked === i;
    b.classList.toggle('on', on);
    b.classList.toggle('right', answered && i === correct);
    b.classList.toggle('wrong', answered && on && i !== correct);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
    b.disabled = answered;
  });
}

export function toggleCat(i) {
  if (state.view !== 'test' || state.qState !== 'asking') return;
  state.picked = state.picked === i ? -1 : i;
  hideWarn();
  paintCats();
}

// ---------- Seçenek düğmeleri (seçenekli mod; klavyede Q W E R) ----------
function buildOptionButtons() {
  return OPT_KEYS.map((k, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'opt';
    b.setAttribute('aria-pressed', 'false');
    b.innerHTML = '<span class="opt-label"></span><kbd class="kb-key" aria-hidden="true">' + k.toUpperCase() + '</kbd>';
    // Fareyle tıklamada odak düğmeye geçmesin; seçenekli modda ad alanı yoktur
    b.addEventListener('mousedown', ev => ev.preventDefault());
    b.addEventListener('click', () => toggleOption(i));
    $('q-choices').appendChild(b);
    return b;
  });
}

function paintOpts() {
  const answered = state.qState === 'feedback';
  const right = answered && state.current ? answerText(state.current) : null;
  optButtons.forEach((b, i) => {
    const name = state.choices[i];
    const on = state.pickedName !== null && name === state.pickedName;
    b.classList.toggle('on', on);
    b.classList.toggle('right', answered && name === right);
    b.classList.toggle('wrong', answered && on && name !== right);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
    b.disabled = answered;
  });
}

// Seçenekli mod: bir seçenek seçilir; seçili olana tekrar basılırsa seçim kalkar
export function toggleOption(i) {
  if (state.view !== 'test' || state.qState !== 'asking' || state.session.mode !== 'choice') return;
  const name = state.choices[i];
  if (!name) return;
  state.pickedName = state.pickedName === name ? null : name;
  hideWarn();
  paintOpts();
}

// ---------- Soru çizimi ----------
export function renderTopbar() {
  const s = state.session;
  if (!s) return;
  const finite = Number.isFinite(s.total);
  $('t-progress').textContent = finite ? `${s.freshAnswered}/${s.total}` : `${s.freshAnswered} / ∞`;
  $('t-score').textContent = String(s.fullCorrect);
  $('t-streak').textContent = String(s.streak);
  $('t-bar').style.width = finite && s.total > 0
    ? `${Math.min(100, (s.freshAnswered / s.total) * 100)}%`
    : '0%';
}

export function renderQuestion() {
  const choice = state.session.mode === 'choice';
  const compound = state.session.quiz === 'compound';
  const askFormula = formulaAsk(state.current);
  // Bileşikte soru numarası yoktur; element testinde atom numarası gösterilir
  $('q-num').textContent = compound ? '' : String(state.current.el.z);
  $('q-symbol').textContent = !compound ? state.current.el.s : (askFormula ? state.current.el.names[0] : state.current.el.disp);
  $('q-symbol').className = 'q-symbol' + (!compound ? '' : (askFormula ? ' is-name' : ' is-formula'));
  $('q-tag').hidden = !state.current.retry;
  // Yazarak: metin alanı. Seçenekli: metin alanı gizli ve devre dışı; yerine 4 seçenek gelir.
  const answerLabel = !compound ? 'Elementin Türkçe adı'
    : (askFormula ? 'Bileşiğin formülü' : 'Bileşiğin Türkçe adı');
  nameInput.value = '';
  nameInput.placeholder = answerLabel;
  $('name-label').textContent = answerLabel;
  nameInput.hidden = choice;
  nameInput.disabled = choice;
  $('q-choices').hidden = !choice;
  $('q-choices').setAttribute('aria-label', compound ? 'Bileşik seçenekleri' : 'Element adı seçenekleri');
  if (!compound) {
    $('name-flow').textContent = choice
      ? 'İsmi seç (Q, W, E, R) → 1–8 ile türü seç → Enter'
      : 'İsmi yaz → 1–8 ile türü seç → Enter';
  } else {
    $('name-flow').textContent = `${askFormula ? 'Formülü' : 'Adı'} ${choice ? 'seç (Q, W, E, R)' : 'yaz'} → ${choice ? '1–4' : '⌥1–4'} ile türü seç → Enter`;
  }
  state.pickedName = null;
  state.choices = choice ? (compound ? makeCompoundChoices(state.current.el, askFormula) : makeChoices(state.current.el)) : [];
  optButtons.forEach((b, i) => { b.querySelector('.opt-label').textContent = state.choices[i] || ''; });
  hideWarn();
  $('feedback').hidden = true;
  $('btn-submit').hidden = false;
  paintCats();
  paintOpts();
  renderTopbar();
  if (!compound) ptAsk(state.current.el.z);
  window.scrollTo(0, 0);
  focusName();
}

// Cevap verildikten sonra: giriş kilitlenir, seçimler kilitlenir, sayaçlar güncellenir
export function lockQuestion() {
  nameInput.disabled = true;
  hideWarn();
  paintCats();
  paintOpts();
  renderTopbar();
}

// ---------- Geri bildirim paneli ----------
function setIcon(node, ok) {
  node.textContent = ok ? '✓' : '✗';
  node.className = 'fb-icon ' + (ok ? 'ok' : 'no');
}

// hasMore: "Sonraki" mi yoksa "Sonuçları Gör" mü yazılacağı (oturumda soru kalıp kalmadığı)
export function renderFeedback(el, typed, nameOk, catOk, pickedKey, hasMore) {
  const full = nameOk && catOk;
  const any = nameOk || catOk;
  const fb = $('feedback');
  const compound = state.session.quiz === 'compound';
  const askFormula = formulaAsk(state.current);
  const right = answerText(state.current);
  const said = compound ? formatFormula(squeeze(typed)) : squeeze(typed);
  const same = askFormula ? formulaKey(typed) === formulaKey(right) : foldKey(typed) === foldKey(right);
  fb.classList.remove('good', 'mixed', 'bad');
  fb.classList.add(full ? 'good' : (any ? 'mixed' : 'bad'));
  $('fb-title').textContent = full ? 'Doğru!' : (any ? 'Kısmen doğru' : 'Yanlış');

  // İsim satırı (bileşikte cevap formül veya addır)
  setIcon($('fb-name-icon'), nameOk);
  $('fb-name-label').textContent = !compound ? 'İsim' : (askFormula ? 'Formül' : 'Ad');
  $('fb-name-val').textContent = nameOk ? right : 'Doğru cevap: ' + right;
  const nameLines = [];
  if (!nameOk || !same) nameLines.push('Senin cevabın: “' + said + '”');
  if (el.names.length > 1) nameLines.push('Ayrıca kabul edilir: ' + el.names.slice(1).join(', '));
  $('fb-name-sub').innerHTML = nameLines.map(esc).join('<br>');

  // Tür satırı
  setIcon($('fb-cat-icon'), catOk);
  $('fb-cat-val').textContent = catOk ? el.c : 'Doğru cevap: ' + el.c;
  $('fb-cat-sub').textContent = catOk ? '' : 'Seçtiğin tür: ' + pickedKey;

  // Bilgi kutuları
  const chips = compound
    ? [['Formül', el.disp], ['Ad', el.names[0]], ['Kategori', el.c]]
    : [['Atom numarası', el.z], ['Periyot', el.p], ['Grup', el.g], ['Kategori', el.c]];
  $('fb-info').innerHTML = chips.map(([label, value]) =>
    `<div class="chip"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`
  ).join('');

  $('next-label').textContent = hasMore ? 'Sonraki' : 'Sonuçları Gör';
  hideWarn();
  $('btn-submit').hidden = true;
  fb.hidden = false;
  if (!compound) ptReveal(full);
  // Tablo açıksa onu, gizliyse geri bildirim panelini görünüme getir
  (state.tableShown && !compound ? $('pt-view') : fb).scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

// ---------- Olaylar ve başlangıç ----------
// Test ekranının düğmeleri ve ad alanı; uygulama açılırken bir kez çağrılır
export function initTest() {
  renderCatButtons(CATEGORIES, false);
  optButtons = buildOptionButtons();
  nameInput.addEventListener('input', ev => {
    hideWarn();
    formatFormulaInput(ev);
  });
}
