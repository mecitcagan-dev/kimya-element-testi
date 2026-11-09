// Test motoru: soru oluşturma, seçenek üretme ve cevap değerlendirme (DOM'dan bağımsız)
import { ElementData, CompoundData } from '../types/chemistry';
import { QuizConfig, QuestionItem, AnswerResult } from '../types/quiz';
import { ELEMENTS, ELEMENT_RANGES, ELEMENT_BY_Z } from '../data/elements';
import { COMPOUNDS, COMPOUND_BY_Z } from '../data/compounds';
import { foldKey, nameMatches, formulaMatches, squeeze } from '../utils/text';
import { shuffle } from '../utils/random';

export const isFormulaAsk = (q: QuestionItem): boolean =>
  q.quiz === 'compound' && q.dir === 'ad-formul';

export const getAnswerText = (q: QuestionItem): string => {
  if (q.quiz === 'compound') {
    const c = q.data as CompoundData;
    return isFormulaAsk(q) ? c.disp : c.names[0];
  }
  return q.data.names[0];
};

export const getQuestionPrompt = (q: QuestionItem): { text: string; sub?: string } => {
  if (q.quiz === 'compound') {
    const c = q.data as CompoundData;
    return isFormulaAsk(q)
      ? { text: c.names[0], sub: 'Formülünü bulun' }
      : { text: c.disp, sub: 'Türkçe yaygın adını bulun' };
  }
  const el = q.data as ElementData;
  return { text: el.s, sub: `Atom No: ${el.z}` };
};

export const isNameCorrect = (q: QuestionItem, typed: string, isChoiceMode: boolean): boolean => {
  const clean = squeeze(typed);
  if (!clean) return false;

  if (isChoiceMode) {
    return clean === getAnswerText(q);
  }

  if (isFormulaAsk(q)) {
    return formulaMatches(clean, q.data as CompoundData);
  }

  return nameMatches(clean, q.data);
};

export const evaluateAnswer = (
  q: QuestionItem,
  typed: string,
  pickedCatKey: string | null,
  isChoiceMode: boolean
): AnswerResult => {
  const nameOk = isNameCorrect(q, typed, isChoiceMode);
  const correctText = getAnswerText(q);
  const correctCat = q.data.c;

  if (!q.includeType) {
    return {
      nameOk,
      catOk: true,
      full: nameOk,
      correctText,
      userText: squeeze(typed),
      correctCat,
      userCat: '',
      includeType: false
    };
  }

  const catOk = pickedCatKey === correctCat;
  return {
    nameOk,
    catOk,
    full: nameOk && catOk,
    correctText,
    userText: squeeze(typed),
    correctCat,
    userCat: pickedCatKey || '',
    includeType: true
  };
};

export const makeElementChoices = (el: ElementData): string[] => {
  const others = shuffle(ELEMENTS.filter(x => x.z !== el.z));
  const used = new Set<string>([el.names[0]]);
  const extra: string[] = [];

  const take = (x: ElementData) => {
    if (extra.length < 3 && !used.has(x.names[0])) {
      used.add(x.names[0]);
      extra.push(x.names[0]);
    }
  };

  // Yaklaşık yarısında çeldiricilerin en fazla 2'si aynı kategoriden seçilir
  if (Math.random() < 0.5) {
    others.filter(x => x.c === el.c).slice(0, 2).forEach(take);
  }
  others.forEach(take);

  return shuffle([el.names[0], ...extra]);
};

export const makeCompoundChoices = (c: CompoundData, askFormula: boolean): string[] => {
  const getAns = (x: CompoundData) => (askFormula ? x.disp : x.names[0]);
  const getKey = (x: CompoundData) => (askFormula ? x.fk : foldKey(x.names[0]));

  const others = shuffle(COMPOUNDS.filter(x => x.z !== c.z));
  const used = new Set<string>([getKey(c)]);
  const extra: string[] = [];

  const take = (x: CompoundData) => {
    const k = getKey(x);
    if (extra.length < 3 && !used.has(k)) {
      used.add(k);
      extra.push(getAns(x));
    }
  };

  if (Math.random() < 0.5) {
    others.filter(x => x.c === c.c).slice(0, 2).forEach(take);
  }
  others.forEach(take);

  return shuffle([getAns(c), ...extra]);
};

export const generateChoices = (q: QuestionItem): string[] => {
  if (q.quiz === 'compound') {
    return makeCompoundChoices(q.data as CompoundData, isFormulaAsk(q));
  }
  return makeElementChoices(q.data as ElementData);
};

export const getPoolZs = (cfg: QuizConfig, weakZsList: number[] = []): number[] => {
  if (cfg.quiz === 'compound') {
    if (cfg.kind === 'weak') return weakZsList.slice();
    if (cfg.kind === 'list' && cfg.zs) return cfg.zs.slice();
    return COMPOUNDS.map(c => c.z);
  }

  if (cfg.kind === 'weak') return weakZsList.slice();
  if (cfg.kind === 'list' && cfg.zs) return cfg.zs.slice();

  const [start, end] = ELEMENT_RANGES[cfg.range || '1-36'];
  const zs: number[] = [];
  for (let z = start; z <= end; z++) {
    zs.push(z);
  }
  return zs;
};

export const resolveQuestionDirection = (cfgDir?: QuizConfig['dir']): 'ad-formul' | 'formul-ad' => {
  if (cfgDir === 'formul-ad') return 'formul-ad';
  if (cfgDir === 'karisik') return Math.random() < 0.5 ? 'ad-formul' : 'formul-ad';
  return 'ad-formul';
};

export const createQuestion = (
  z: number,
  quiz: 'element' | 'compound',
  retry: boolean,
  cfg: QuizConfig
): QuestionItem => {
  const data = quiz === 'compound' ? COMPOUND_BY_Z[z] : ELEMENT_BY_Z[z];
  const dir = quiz === 'compound' ? resolveQuestionDirection(cfg.dir) : 'ad-formul';
  const includeType = quiz === 'compound' ? cfg.includeCompoundType : true;

  return {
    data,
    quiz,
    retry,
    dir,
    includeType
  };
};
