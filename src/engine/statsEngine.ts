import { ElementData, CompoundData } from '../types/chemistry';
import { ELEMENTS } from '../data/elements';
import { COMPOUNDS } from '../data/compounds';
import { KEYS, readStored, writeStored } from '../utils/storage';

export interface ElementStatItem {
  seen: number;
  nameWrong: number;
  catWrong: number;
}

export interface CompoundStatItem {
  seen: number;
  answerWrong: number;
  catWrong: number;
}

const WEAK_LIMIT = 10;

const toCount = (v: unknown): number => {
  const n = Math.floor(Number(v));
  return Number.isFinite(n) && n > 0 ? n : 0;
};

// ---------- Element İstatistikleri ----------
let elementStats: Record<string, ElementStatItem> = {};

export function loadElementStats(): Record<string, ElementStatItem> {
  elementStats = {};
  try {
    const raw = readStored(KEYS.stats);
    const obj = raw ? JSON.parse(raw) : null;
    if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
      Object.keys(obj).forEach(sym => {
        const v = obj[sym];
        if (v && typeof v === 'object') {
          elementStats[sym] = {
            seen: toCount(v.seen),
            nameWrong: toCount(v.nameWrong),
            catWrong: toCount(v.catWrong)
          };
        }
      });
    }
  } catch {
    elementStats = {};
  }
  return elementStats;
}

export function saveElementStats(): void {
  writeStored(KEYS.stats, JSON.stringify(elementStats));
}

export function recordElementResult(el: ElementData, nameOk: boolean, catOk: boolean): void {
  if (Object.keys(elementStats).length === 0) {
    loadElementStats();
  }
  const st = elementStats[el.s] || { seen: 0, nameWrong: 0, catWrong: 0 };
  st.seen += 1;
  if (!nameOk) st.nameWrong += 1;
  if (!catOk) st.catWrong += 1;
  elementStats[el.s] = st;
  saveElementStats();
}

export function getWeakElementZs(): number[] {
  if (Object.keys(elementStats).length === 0) {
    loadElementStats();
  }
  return ELEMENTS
    .map(el => {
      const st = elementStats[el.s];
      const m = st ? st.nameWrong + st.catWrong : 0;
      return { z: el.z, m };
    })
    .filter(x => x.m > 0)
    .sort((a, b) => b.m - a.m || a.z - b.z)
    .slice(0, WEAK_LIMIT)
    .map(x => x.z);
}

// ---------- Bileşik İstatistikleri ----------
let compoundStats: Record<string, CompoundStatItem> = {};

export function loadCompoundStats(): Record<string, CompoundStatItem> {
  compoundStats = {};
  try {
    const raw = readStored(KEYS.compounds);
    const obj = raw ? JSON.parse(raw) : null;
    if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
      Object.keys(obj).forEach(fk => {
        const v = obj[fk];
        if (v && typeof v === 'object') {
          compoundStats[fk] = {
            seen: toCount(v.seen),
            answerWrong: toCount(v.answerWrong),
            catWrong: toCount(v.catWrong)
          };
        }
      });
    }
  } catch {
    compoundStats = {};
  }
  return compoundStats;
}

export function saveCompoundStats(): void {
  writeStored(KEYS.compounds, JSON.stringify(compoundStats));
}

export function recordCompoundResult(
  c: CompoundData,
  answerOk: boolean,
  catOk: boolean,
  includeType: boolean
): void {
  if (Object.keys(compoundStats).length === 0) {
    loadCompoundStats();
  }
  const st = compoundStats[c.fk] || { seen: 0, answerWrong: 0, catWrong: 0 };
  st.seen += 1;
  if (!answerOk) st.answerWrong += 1;
  if (includeType && !catOk) st.catWrong += 1;
  compoundStats[c.fk] = st;
  saveCompoundStats();
}

export function getWeakCompoundZs(): number[] {
  if (Object.keys(compoundStats).length === 0) {
    loadCompoundStats();
  }
  return COMPOUNDS
    .map(c => {
      const st = compoundStats[c.fk];
      const m = st ? st.answerWrong + st.catWrong : 0;
      return { z: c.z, m };
    })
    .filter(x => x.m > 0)
    .sort((a, b) => b.m - a.m || a.z - b.z)
    .slice(0, WEAK_LIMIT)
    .map(x => x.z);
}
