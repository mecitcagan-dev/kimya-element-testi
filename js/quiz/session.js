// Oturum akışı: oturum kurma, soru sırası (çekme, tekrar kuyruğu, sonsuz ve zayıf mod), cevap ve bitiş.
import { BY_Z, RANGES } from '../data/elements.js';
import { CMP_BY_Z, COMPOUNDS } from '../data/compounds.js';
import { state } from '../state/app-state.js';
import { weakZs, weakCompoundIds, recordStats, recordCStats } from '../state/stats.js';
import { randInt, shuffle } from '../utils/random.js';
import { squeeze } from '../utils/text.js';
import { formulaAsk, catList, isNameCorrect } from './answers.js';
import { compoundTotal, retryChecked } from '../ui/setup.js';
import { showView } from '../ui/screens.js';
import { setQuizUI, renderTopbar, renderQuestion, lockQuestion, renderFeedback, showWarn, focusName, typedAnswer } from '../ui/test.js';
import { renderResult } from '../ui/result.js';

function zsFor(cfg) {
  if (cfg.quiz === 'compound') {
    if (cfg.kind === 'weak') return weakCompoundIds();
    if (cfg.kind === 'list') return cfg.zs.slice();
    return COMPOUNDS.map(c => c.z);
  }
  if (cfg.kind === 'weak') return weakZs();
  if (cfg.kind === 'list') return cfg.zs.slice();
  const [a, b] = RANGES[cfg.range] || RANGES['1-36'];
  const out = [];
  for (let z = a; z <= b; z++) out.push(z);
  return out;
}

function startSession(cfg) {
  state.lastCfg = cfg;
  state.session = {
    quiz: cfg.quiz === 'compound' ? 'compound' : 'element',
    dir: cfg.quiz === 'compound' ? cfg.dir : null,   // bileşik: ad-formul | formul-ad | karisik
    pool: zsFor(cfg),
    deck: [],
    lastDrawn: -1,
    total: cfg.total,
    retry: !!cfg.retry,
    freshAsked: 0,       // sorulan yeni (tekrar olmayan) soru sayısı
    freshAnswered: 0,    // cevaplanan yeni soru sayısı (skor için)
    fullCorrect: 0,
    nameCorrect: 0,
    catCorrect: 0,
    streak: 0,
    bestStreak: 0,
    answers: 0,          // tekrarlar dahil tüm cevaplar
    questionNo: 0,       // gösterilen toplam soru (konum)
    retryQueue: [],      // { z, due }
    missed: new Map(),   // z -> { z, typed, picked, resolved }
    mode: cfg.mode === 'choice' ? 'choice' : 'type'   // bu oturumun cevap şekli (sonuç ve tekrarda korunur)
  };
  state.current = null;
  state.qState = 'asking';
  state.picked = -1;
  state.pickedName = null;
  state.choices = [];
  showView('test');
  setQuizUI();
  renderTopbar();
  presentNext();
}

// Kurulum ekranındaki "Testi Başlat" düğmesi
export function startFromSetup() {
  const { opts, copts } = state;
  const retry = retryChecked();
  if (state.setupTab === 'compound') {
    startSession({ quiz: 'compound', kind: 'range', total: compoundTotal(), retry, mode: opts.mode, dir: copts.dir });
    return;
  }
  startSession({ kind: 'range', range: opts.range, total: opts.count, retry, mode: opts.mode });
}

// Kurulum ekranındaki "Zayıf noktalarım" düğmesi
export function startWeakFromSetup() {
  const { opts, copts } = state;
  if (state.setupTab === 'compound') {
    if (!weakCompoundIds().length) return;
    startSession({ quiz: 'compound', kind: 'weak', total: compoundTotal(), retry: retryChecked(), mode: opts.mode, dir: copts.dir });
    return;
  }
  if (!weakZs().length) return;
  startSession({ kind: 'weak', total: opts.count, retry: retryChecked(), mode: opts.mode });
}

// Sonuç ekranı: "Tekrar Başlat" (aynı ayarlarla yeni oturum)
export function restartSession() {
  if (state.lastCfg) startSession(state.lastCfg);
}

// Sonuç ekranı: "Sadece yanlışları çalış"
export function startMissed() {
  const lastCfg = state.lastCfg;
  const lastResult = state.lastResult;
  if (!lastResult || !lastResult.missedZs.length || !lastCfg) return;
  startSession({ quiz: lastCfg.quiz, dir: lastCfg.dir, kind: 'list', zs: lastResult.missedZs.slice(), total: lastCfg.total, retry: lastCfg.retry, mode: lastCfg.mode });
}

// Soru yönü: "Karışık" ise her soruda rastgele
const questionDir = () => (state.session.dir === 'karisik' ? (Math.random() < 0.5 ? 'ad-formul' : 'formul-ad') : state.session.dir);

function drawFresh() {
  const s = state.session;
  if (!s.deck.length) {
    s.deck = shuffle(s.pool.slice());
    const n = s.deck.length;
    // Yeniden karıştırmada aynı element arka arkaya gelmesin
    if (n > 1 && s.deck[n - 1] === s.lastDrawn) {
      [s.deck[0], s.deck[n - 1]] = [s.deck[n - 1], s.deck[0]];
    }
  }
  s.lastDrawn = s.deck.pop();
  return s.lastDrawn;
}

function takeRetry(index) {
  const r = state.session.retryQueue.splice(index, 1)[0];
  return { z: r.z, retry: true };
}

function pickNext() {
  const s = state.session;
  const pos = s.questionNo + 1;

  // 1) Vakti gelmiş tekrar (en erken olan önce)
  let idx = -1;
  s.retryQueue.forEach((r, i) => {
    if (r.due <= pos && (idx < 0 || r.due < s.retryQueue[idx].due)) idx = i;
  });
  if (idx >= 0) return takeRetry(idx);

  // 2) Sıradaki yeni soru
  if (s.pool.length && s.freshAsked < s.total) {
    s.freshAsked++;
    return { z: drawFresh(), retry: false };
  }

  // 3) Yeni soru kalmadıysa bekleyen tekrarlar hemen sorulur
  if (s.retryQueue.length) {
    idx = 0;
    s.retryQueue.forEach((r, i) => {
      if (r.due < s.retryQueue[idx].due) idx = i;
    });
    return takeRetry(idx);
  }

  return null;
}

// Cevaplanacak soru kaldı mı? (geri bildirimde "Sonraki" veya "Sonuçları Gör" yazısı için)
export function hasMoreQuestions() {
  const s = state.session;
  return (s.pool.length > 0 && s.freshAsked < s.total) || s.retryQueue.length > 0;
}

function presentNext() {
  const nxt = pickNext();
  if (!nxt) {
    finishSession();
    return;
  }
  state.session.questionNo++;
  const compound = state.session.quiz === 'compound';
  state.current = {
    el: compound ? CMP_BY_Z[nxt.z] : BY_Z[nxt.z],
    retry: nxt.retry,
    dir: compound ? questionDir() : null
  };
  state.qState = 'asking';
  state.picked = -1;
  state.pickedName = null;
  renderQuestion();
}

// Geri bildirimden sonraki soruya geçer (Enter, Space veya "Sonraki")
export function advance() {
  if (state.view !== 'test' || state.qState !== 'feedback') return;
  presentNext();
}

// "Gönder": cevabı değerlendirir, sayaçları ve istatistikleri günceller, geri bildirimi gösterir
export function submitAnswer() {
  if (state.view !== 'test' || state.qState !== 'asking' || !state.current) return;

  // Seçenekli modda cevap, seçili seçeneğin adıdır; yazarak modda yazılan metin
  const choice = state.session.mode === 'choice';
  const compound = state.session.quiz === 'compound';
  const typed = typedAnswer();
  const hasName = squeeze(typed).length > 0;
  const hasCat = state.picked >= 0;
  if (!hasName || !hasCat) {
    const verb = choice ? 'seçin' : 'yazın';
    const what = !compound ? 'elementin adını'
      : (formulaAsk(state.current) ? 'bileşiğin formülünü' : 'bileşiğin adını');
    showWarn(!hasName && !hasCat ? `Lütfen ${what} ${verb} ve bir tür seçin.`
      : !hasName ? `Lütfen ${what} ${verb}.`
      : 'Lütfen bir tür seçin.');
    focusName();
    return;
  }

  const s = state.session;
  const el = state.current.el;
  const pickedKey = catList()[state.picked].key;
  const nameOk = isNameCorrect(state.current, typed, choice);
  const catOk = pickedKey === el.c;
  const full = nameOk && catOk;

  s.answers++;
  if (!state.current.retry) {
    s.freshAnswered++;
    if (nameOk) s.nameCorrect++;
    if (catOk) s.catCorrect++;
    if (full) s.fullCorrect++;
  }
  s.streak = full ? s.streak + 1 : 0;
  s.bestStreak = Math.max(s.bestStreak, s.streak);

  if (compound) recordCStats(el, nameOk, catOk);
  else recordStats(el, nameOk, catOk);

  if (!full) {
    if (!s.missed.has(el.z)) {
      s.missed.set(el.z, { z: el.z, typed: squeeze(typed), picked: pickedKey, resolved: false });
    }
    if (s.retry) {
      s.retryQueue.push({ z: el.z, due: s.questionNo + randInt(3, 5) });
    }
  }
  if (s.missed.has(el.z)) s.missed.get(el.z).resolved = full;

  state.qState = 'feedback';
  lockQuestion();
  renderFeedback(el, typed, nameOk, catOk, pickedKey, hasMoreQuestions());
}

// Oturumu bitirir ve sonuç ekranını gösterir (Esc, "Bitir" veya sorular tükenince)
export function finishSession() {
  const s = state.session;
  const missed = Array.from(s.missed.values());
  state.lastResult = {
    quiz: s.quiz,
    answered: s.freshAnswered,
    full: s.fullCorrect,
    nameOk: s.nameCorrect,
    catOk: s.catCorrect,
    best: s.bestStreak,
    answers: s.answers,
    missed,
    missedZs: missed.map(m => m.z)
  };
  state.current = null;
  state.qState = 'asking';
  showView('result');
  renderResult();
}
