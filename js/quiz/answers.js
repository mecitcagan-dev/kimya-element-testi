// Cevap değerlendirme ve seçenekli mod çeldiricileri (element ve bileşik). DOM kullanmaz.
import { CATEGORIES, ELEMENTS } from '../data/elements.js';
import { COMPOUNDS, COMPOUND_CATS } from '../data/compounds.js';
import { foldKey, nameMatches, formulaMatches } from '../utils/text.js';
import { shuffle } from '../utils/random.js';
import { state } from '../state/app-state.js';

// Bileşikte soru adı mı, cevap formül mü (Ad → Formül: soru adı, cevap formül)
export const formulaAsk = cur => !!cur && cur.dir === 'ad-formul';

// Doğru cevap metni: element için ad; bileşikte soruya göre formül veya ad
export const answerText = cur => (formulaAsk(cur) ? cur.el.disp : cur.el.names[0]);

// Oturumun tür listesi: element için 8 kategori, bileşik için 4 tür
export const catList = () => (state.session && state.session.quiz === 'compound' ? COMPOUND_CATS : CATEGORIES);

// Ad doğru mu? Seçenekli modda seçilen ad birebir karşılaştırılır; yazarak modda ad veya formül anahtarıyla bakılır
export const isNameCorrect = (cur, typed, choice) => (choice
  ? typed === answerText(cur)
  : (formulaAsk(cur) ? formulaMatches(typed, cur.el) : nameMatches(typed, cur.el)));

// Seçenekli mod: doğru ad + 3 çeldirici (başka elementlerin adları, tekrarsız, her soruda yeniden).
// Yaklaşık yarısında çeldiricilerin en fazla ikisi aynı kategoriden seçilir (zorluk için).
export function makeChoices(el) {
  const others = shuffle(ELEMENTS.filter(x => x !== el));
  const used = new Set([el.names[0]]);
  const extra = [];
  const take = x => {
    if (extra.length < 3 && !used.has(x.names[0])) {
      used.add(x.names[0]);
      extra.push(x.names[0]);
    }
  };
  if (Math.random() < 0.5) others.filter(x => x.c === el.c).slice(0, 2).forEach(take);
  others.forEach(take);
  return shuffle([el.names[0], ...extra]);
}

// Bileşik, seçenekli mod: doğru cevap + 3 çeldirici (diğer bileşiklerin cevapları, tekrarsız).
// Yaklaşık yarısında çeldiricilerin en fazla ikisi aynı türden seçilir (element testiyle aynı mantık).
export function makeCompoundChoices(c, formula) {
  const ans = x => (formula ? x.disp : x.names[0]);
  const key = x => (formula ? x.fk : foldKey(x.names[0]));
  const others = shuffle(COMPOUNDS.filter(x => x !== c));
  const used = new Set([key(c)]);
  const extra = [];
  const take = x => {
    if (extra.length < 3 && !used.has(key(x))) {
      used.add(key(x));
      extra.push(ans(x));
    }
  };
  if (Math.random() < 0.5) others.filter(x => x.c === c.c).slice(0, 2).forEach(take);
  others.forEach(take);
  return shuffle([ans(c), ...extra]);
}
