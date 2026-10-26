// Periyodik tablo (1–4. periyot, 18 sütun): çizim, soru halkası, geri bildirim parıltısı ve görünürlük
import { ELEMENTS, CATEGORIES, PT_COL, PT_GROUPS } from '../data/elements.js';
import { state, isCompound } from '../state/app-state.js';
import { $, esc } from '../utils/dom.js';
import { readStored, writeStored, KEYS } from '../utils/storage.js';

// Atom numarası → tablo hücresi
const ptCellOf = {};
let ptAskedZ = null;

// Tabloyu DOM'a kurar (bir kez, başlangıçta)
export function buildPeriodicTable() {
  const ptView = $('pt-view');
  const ptStage = $('pt-stage');

  PT_GROUPS.forEach((g, i) => {
    const s = document.createElement('span');
    s.className = 'pt-gl';
    s.style.gridColumn = String(i + 2);
    s.style.gridRow = '1';
    s.textContent = g;
    ptStage.appendChild(s);
  });
  [1, 2, 3, 4].forEach(p => {
    const s = document.createElement('span');
    s.className = 'pt-pl';
    s.style.gridColumn = '1';
    s.style.gridRow = String(p + 1);
    s.textContent = String(p);
    ptStage.appendChild(s);
  });
  ELEMENTS.forEach(el => {
    const cat = CATEGORIES.find(c => c.key === el.c);
    const d = document.createElement('div');
    d.className = 'pt-cell';
    d.style.gridColumn = String(PT_COL[el.z] + 1);
    d.style.gridRow = String(el.p + 1);
    d.style.setProperty('--rgb', cat.rgb);
    d.innerHTML = `<span class="pt-num">${el.z}</span><span class="pt-sym">${esc(el.s)}</span>`;
    ptStage.appendChild(d);
    ptCellOf[el.z] = d;
  });

  // Tabloya tıklamak odağı ad alanından almasın
  ptView.addEventListener('mousedown', ev => ev.preventDefault());
}

// Yeni soru: tablo nötr; sorulan hücre yalnızca halkayla işaretli
export function ptAsk(z) {
  if (ptCellOf[ptAskedZ]) ptCellOf[ptAskedZ].classList.remove('cur', 'ok', 'bad');
  ptAskedZ = z;
  ptCellOf[z].classList.add('cur');
  $('pt-stage').classList.remove('is-fb');
}

// Cevap sonrası: kategori renkleri açılır; sorulan hücre yeşil/kırmızı parıltıyla öne çıkar
export function ptReveal(full) {
  const cell = ptCellOf[ptAskedZ];
  if (!cell) return;
  cell.classList.add(full ? 'ok' : 'bad');
  $('pt-stage').classList.add('is-fb');
}

// ---------- Periyodik tablo görünürlüğü (0 tuşu; tercih localStorage'da) ----------
// Varsayılan: göster. Depolama okunamazsa da göster.
export function loadTablePref() {
  state.tableShown = readStored(KEYS.showTable) !== '0';
}

function saveTablePref() {
  writeStored(KEYS.showTable, state.tableShown ? '1' : '0');
}

// Kartı ve denetimleri tercihe göre günceller. Gizliyken hücre sınıfları (soru halkası,
// geri bildirim) korunur; yeniden gösterilince tablo o anki durumuyla görünür.
export function syncTableUI() {
  const off = isCompound();   // bileşik testinde periyodik tablo yok: kart ve düğme gizli
  $('pt-card').hidden = !state.tableShown || off;
  $('btn-table').hidden = off;
  $('table-label').textContent = state.tableShown ? 'Tabloyu gizle' : 'Tabloyu göster';
  $('btn-table').setAttribute('aria-expanded', state.tableShown ? 'true' : 'false');
  $('opt-table').checked = state.tableShown;
}

export function setTableShown(on) {
  state.tableShown = !!on;
  syncTableUI();
  saveTablePref();
}

export const toggleTable = () => setTableShown(!state.tableShown);
