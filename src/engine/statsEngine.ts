import { ElementData, CompoundData } from '../types/chemistry';
import { TopicId } from '../types/topics';
import { ELEMENTS } from '../data/elements';
import { COMPOUNDS } from '../data/compounds';
import { getTopicStandardItems } from './quizEngine';
import { KEYS, readStored, writeStored } from '../utils/storage';

export interface StatItem {
  seen: number;
  wrong: number;
  catWrong: number;
}

const WEAK_LIMIT = 10;

const toCount = (v: unknown): number => {
  const n = Math.floor(Number(v));
  return Number.isFinite(n) && n > 0 ? n : 0;
};

// Genel konu istatistikleri deposu: topicId -> { itemId -> StatItem }
const topicStatsCache: Record<string, Record<string, StatItem>> = {};

function getStorageKeyForTopic(topicId: TopicId): string {
  if (topicId === 'element') return KEYS.stats;
  if (topicId === 'compound') return KEYS.compounds;
  return `elementTesti.topic.${topicId}.v1`;
}

export function loadTopicStats(topicId: TopicId): Record<string, StatItem> {
  if (topicStatsCache[topicId]) {
    return topicStatsCache[topicId];
  }
  const key = getStorageKeyForTopic(topicId);
  const result: Record<string, StatItem> = {};
  try {
    const raw = readStored(key);
    const obj = raw ? JSON.parse(raw) : null;
    if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
      Object.keys(obj).forEach(k => {
        const v = obj[k];
        if (v && typeof v === 'object') {
          result[k] = {
            seen: toCount(v.seen),
            wrong: toCount(v.wrong ?? v.nameWrong ?? v.answerWrong),
            catWrong: toCount(v.catWrong)
          };
        }
      });
    }
  } catch {
    // Depolama hatasında boş başlat
  }
  topicStatsCache[topicId] = result;
  return result;
}

export function saveTopicStats(topicId: TopicId): void {
  const data = topicStatsCache[topicId];
  if (data) {
    writeStored(getStorageKeyForTopic(topicId), JSON.stringify(data));
  }
}

export function recordTopicResult(
  topicId: TopicId,
  itemId: string | number,
  answerOk: boolean,
  catOk: boolean,
  includeType: boolean
): void {
  const stats = loadTopicStats(topicId);
  const key = String(itemId);
  const st = stats[key] || { seen: 0, wrong: 0, catWrong: 0 };
  st.seen += 1;
  if (!answerOk) st.wrong += 1;
  if (includeType && !catOk) st.catWrong += 1;
  stats[key] = st;
  saveTopicStats(topicId);
}

export function getWeakTopicIds(topicId: TopicId): (number | string)[] {
  if (topicId === 'element') return getWeakElementZs();
  if (topicId === 'compound') return getWeakCompoundZs();

  const stats = loadTopicStats(topicId);
  const items = getTopicStandardItems(topicId);

  return items
    .map(item => {
      const st = stats[String(item.id)];
      const m = st ? st.wrong + st.catWrong : 0;
      return { id: item.id, m };
    })
    .filter(x => x.m > 0)
    .sort((a, b) => b.m - a.m)
    .slice(0, WEAK_LIMIT)
    .map(x => x.id);
}

// ---------- Geriye Dönük Uyumluluk (Element ve Bileşik) ----------
export function loadElementStats() {
  return loadTopicStats('element');
}

export function recordElementResult(el: ElementData, nameOk: boolean, catOk: boolean): void {
  recordTopicResult('element', el.s, nameOk, catOk, true);
}

export function getWeakElementZs(): number[] {
  const stats = loadTopicStats('element');
  return ELEMENTS
    .map(el => {
      const st = stats[el.s];
      const m = st ? st.wrong + st.catWrong : 0;
      return { z: el.z, m };
    })
    .filter(x => x.m > 0)
    .sort((a, b) => b.m - a.m || a.z - b.z)
    .slice(0, WEAK_LIMIT)
    .map(x => x.z);
}

export function loadCompoundStats() {
  return loadTopicStats('compound');
}

export function recordCompoundResult(
  c: CompoundData,
  answerOk: boolean,
  catOk: boolean,
  includeType: boolean
): void {
  recordTopicResult('compound', c.fk, answerOk, catOk, includeType);
}

export function getWeakCompoundZs(): number[] {
  const stats = loadTopicStats('compound');
  return COMPOUNDS
    .map(c => {
      const st = stats[c.fk];
      const m = st ? st.wrong + st.catWrong : 0;
      return { z: c.z, m };
    })
    .filter(x => x.m > 0)
    .sort((a, b) => b.m - a.m || a.z - b.z)
    .slice(0, WEAK_LIMIT)
    .map(x => x.z);
}
