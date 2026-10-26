// Hata istatistikleri (localStorage, try/catch ile). Element ve bileşik ayrı anahtarlarda tutulur.
import { ELEMENTS } from '../data/elements.js';
import { COMPOUNDS } from '../data/compounds.js';
import { KEYS, readStored, writeStored } from '../utils/storage.js';

const WEAK_LIMIT = 10;

// Sayı alanını güvenle okur: geçersiz veya negatif değerler 0 sayılır
const toCount = v => {
  const n = Math.floor(Number(v));
  return Number.isFinite(n) && n > 0 ? n : 0;
};

// ---------- Element istatistiği ----------
let stats = {};

export function loadStats() {
  stats = {};
  try {
    const raw = readStored(KEYS.stats);
    const obj = raw ? JSON.parse(raw) : null;
    if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
      Object.keys(obj).forEach(sym => {
        const v = obj[sym];
        if (v && typeof v === 'object') {
          stats[sym] = { seen: toCount(v.seen), nameWrong: toCount(v.nameWrong), catWrong: toCount(v.catWrong) };
        }
      });
    }
  } catch (err) {
    stats = {};
  }
}

function saveStats() {
  writeStored(KEYS.stats, JSON.stringify(stats));
}

export function recordStats(el, nameOk, catOk) {
  const st = stats[el.s] || { seen: 0, nameWrong: 0, catWrong: 0 };
  st.seen += 1;
  if (!nameOk) st.nameWrong += 1;
  if (!catOk) st.catWrong += 1;
  stats[el.s] = st;
  saveStats();
}

const mistakesOf = el => {
  const st = stats[el.s];
  return st ? st.nameWrong + st.catWrong : 0;
};

// En çok yanlış yapılan elementlerin atom numaraları (en fazla WEAK_LIMIT)
export function weakZs() {
  return ELEMENTS
    .map(el => ({ z: el.z, m: mistakesOf(el) }))
    .filter(x => x.m > 0)
    .sort((a, b) => (b.m - a.m) || (a.z - b.z))
    .slice(0, WEAK_LIMIT)
    .map(x => x.z);
}

// ---------- Bileşik istatistiği (ayrı anahtar) ----------
let cstats = {};

export function loadCompoundStats() {
  cstats = {};
  try {
    const raw = readStored(KEYS.compounds);
    const obj = raw ? JSON.parse(raw) : null;
    if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
      Object.keys(obj).forEach(k => {
        const v = obj[k];
        if (v && typeof v === 'object') {
          cstats[k] = { seen: toCount(v.seen), answerWrong: toCount(v.answerWrong), catWrong: toCount(v.catWrong) };
        }
      });
    }
  } catch (err) {
    cstats = {};
  }
}

function saveCStats() {
  writeStored(KEYS.compounds, JSON.stringify(cstats));
}

export function recordCStats(c, answerOk, catOk) {
  const st = cstats[c.fk] || { seen: 0, answerWrong: 0, catWrong: 0 };
  st.seen += 1;
  if (!answerOk) st.answerWrong += 1;
  if (!catOk) st.catWrong += 1;
  cstats[c.fk] = st;
  saveCStats();
}

const cMistakes = c => {
  const st = cstats[c.fk];
  return st ? st.answerWrong + st.catWrong : 0;
};

// En çok yanlış yapılan bileşiklerin sıra numaraları (en fazla WEAK_LIMIT)
export function weakCompoundIds() {
  return COMPOUNDS
    .map(c => ({ z: c.z, m: cMistakes(c) }))
    .filter(x => x.m > 0)
    .sort((a, b) => (b.m - a.m) || (a.z - b.z))
    .slice(0, WEAK_LIMIT)
    .map(x => x.z);
}
