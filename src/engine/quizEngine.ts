import { TopicId, StandardQuizItem } from '../types/topics';
import { QuizConfig, QuestionItem, AnswerResult } from '../types/quiz';
import { ELEMENTS, ELEMENT_RANGES, ELEMENT_BY_Z } from '../data/elements';
import { COMPOUNDS, COMPOUND_BY_Z } from '../data/compounds';
import { POLYATOMIC_IONS, ionToQuizItem } from '../data/polyatomicIons';
import { SAFETY_PICTOGRAMS, pictogramToQuizItem } from '../data/safetyPictograms';
import { LAB_EQUIPMENT, labToQuizItem } from '../data/labEquipment';
import { INDICATORS, indicatorToQuizItem } from '../data/indicators';
import { ALCHEMISTS, alchemistToQuizItem } from '../data/alchemists';
import { VALENCE_METALS, valenceToQuizItem } from '../data/variableValence';
import { FUNCTIONAL_GROUPS, functionalGroupToQuizItem } from '../data/functionalGroups';
import { ORGANIC_COMMON, organicCommonToQuizItem } from '../data/organicCommon';
import { foldKey, nameMatches, formulaMatches, squeeze } from '../utils/text';
import { shuffle } from '../utils/random';

export const isFormulaAsk = (q: QuestionItem): boolean =>
  q.quiz === 'compound' && q.dir === 'ad-formul';

export function getTopicStandardItems(topicId: TopicId, dir = 'ad-formul'): StandardQuizItem[] {
  switch (topicId) {
    case 'element':
      return ELEMENTS.map(el => ({
        id: el.z,
        prompt: el.s,
        promptSub: `Atom No: ${el.z}`,
        answer: el.names[0],
        synonyms: el.names.slice(1),
        category: el.c,
        infoChips: [
          { label: 'Element', value: `${el.names[0]} (${el.s})` },
          { label: 'Atom No', value: String(el.z) },
          { label: 'Periyot / Grup', value: `${el.p}. Periyot, ${el.g}` },
          { label: 'Kategori', value: el.c }
        ],
        hint: `${el.p}. periyot, ${el.g} grubunda yer alan bir ${el.c.toLowerCase()}dır.`
      }));

    case 'compound': {
      const askFormula = dir === 'ad-formul';
      return COMPOUNDS.map(c => ({
        id: c.z,
        prompt: askFormula ? c.names[0] : c.disp,
        promptSub: askFormula ? 'Formülünü bulun' : 'Geleneksel adını bulun',
        answer: askFormula ? c.disp : c.names[0],
        synonyms: askFormula ? [c.f, c.disp] : c.names.slice(1),
        category: c.c,
        infoChips: [
          { label: 'Formül', value: c.disp },
          { label: 'Yaygın Ad', value: c.names.join(', ') },
          { label: 'Türü', value: c.c }
        ],
        hint: `Türü: ${c.c}`
      }));
    }

    case 'polyatomic': {
      const ionDir = dir === 'name-form' ? 'name-form' : 'form-name';
      return POLYATOMIC_IONS.map(ion => ionToQuizItem(ion, ionDir));
    }

    case 'safety':
      return SAFETY_PICTOGRAMS.map(pictogramToQuizItem);

    case 'lab':
      return LAB_EQUIPMENT.map(labToQuizItem);

    case 'indicators':
      return INDICATORS.map(indicatorToQuizItem);

    case 'alchemists':
      return ALCHEMISTS.map(alchemistToQuizItem);

    case 'valence':
      return VALENCE_METALS.map(valenceToQuizItem);

    case 'functional_groups':
      return FUNCTIONAL_GROUPS.map(functionalGroupToQuizItem);

    case 'organic_common': {
      const orgDir = dir === 'form-spec' ? 'form-spec' : 'spec-form';
      return ORGANIC_COMMON.map(c => organicCommonToQuizItem(c, orgDir));
    }

    default:
      return [];
  }
}

export const getAnswerText = (q: QuestionItem): string => q.standard.answer;

export const getQuestionPrompt = (q: QuestionItem): { text: string; sub?: string } => ({
  text: q.standard.prompt,
  sub: q.standard.promptSub
});

export const isNameCorrect = (q: QuestionItem, typed: string, isChoiceMode: boolean): boolean => {
  const clean = squeeze(typed);
  if (!clean) return false;

  if (isChoiceMode) {
    return clean === q.standard.answer;
  }

  // Elementler
  if (q.quiz === 'element') {
    const el = ELEMENT_BY_Z[Number(q.id)];
    return el ? nameMatches(clean, el) : foldKey(clean) === foldKey(q.standard.answer);
  }

  // Bileşikler
  if (q.quiz === 'compound') {
    const c = COMPOUND_BY_Z[Number(q.id)];
    if (c) {
      return isFormulaAsk(q) ? formulaMatches(clean, c) : nameMatches(clean, c);
    }
  }

  // Genel eşleşme: ana cevap veya eş anlamlılar
  const targetKey = foldKey(q.standard.answer);
  if (foldKey(clean) === targetKey) return true;

  if (q.standard.synonyms && q.standard.synonyms.length > 0) {
    return q.standard.synonyms.some(s => foldKey(s) === foldKey(clean));
  }

  return false;
};

export const evaluateAnswer = (
  q: QuestionItem,
  typed: string,
  pickedCatKey: string | null,
  isChoiceMode: boolean
): AnswerResult => {
  const nameOk = isNameCorrect(q, typed, isChoiceMode);
  const correctText = q.standard.answer;
  const correctCat = q.standard.category || '';

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

export const generateChoices = (q: QuestionItem): string[] => {
  const items = getTopicStandardItems(q.quiz, q.dir);
  const currentAnswer = q.standard.answer;
  const others = shuffle(items.filter(x => x.answer !== currentAnswer));

  const used = new Set<string>([currentAnswer]);
  const extra: string[] = [];

  // Aynı kategoriden olanlara öncelik vererek çeldirici zorluğunu artır
  if (q.standard.category) {
    const sameCat = others.filter(x => x.category === q.standard.category);
    sameCat.slice(0, 2).forEach(x => {
      if (!used.has(x.answer) && extra.length < 3) {
        used.add(x.answer);
        extra.push(x.answer);
      }
    });
  }

  // Geriye kalan çeldiricileri ekle
  others.forEach(x => {
    if (!used.has(x.answer) && extra.length < 3) {
      used.add(x.answer);
      extra.push(x.answer);
    }
  });

  return shuffle([currentAnswer, ...extra]);
};

export const getPoolIds = (cfg: QuizConfig, weakIdsList: (number | string)[] = []): (number | string)[] => {
  if (cfg.kind === 'weak') return weakIdsList.slice();
  if (cfg.kind === 'list' && cfg.zs) return cfg.zs.slice();

  if (cfg.quiz === 'element') {
    const rangeKey = (cfg.range || '1-36') as '1-18' | '19-36' | '1-36';
    const [start, end] = ELEMENT_RANGES[rangeKey];
    const ids: number[] = [];
    for (let z = start; z <= end; z++) ids.push(z);
    return ids;
  }

  const items = getTopicStandardItems(cfg.quiz, cfg.dir || 'ad-formul');
  return items.map(item => item.id);
};

export const createQuestion = (
  id: number | string,
  quiz: TopicId,
  retry: boolean,
  cfg: QuizConfig
): QuestionItem => {
  // Yönü belirle
  let dir = cfg.dir || 'ad-formul';
  if (dir === 'karisik') {
    if (quiz === 'compound') dir = Math.random() < 0.5 ? 'ad-formul' : 'formul-ad';
    else if (quiz === 'polyatomic') dir = Math.random() < 0.5 ? 'form-name' : 'name-form';
    else if (quiz === 'organic_common') dir = Math.random() < 0.5 ? 'spec-form' : 'form-spec';
  }

  const items = getTopicStandardItems(quiz, dir);
  const standard = items.find(x => x.id === id) || items[0];

  let rawData: any = standard;
  if (quiz === 'element') rawData = ELEMENT_BY_Z[Number(id)];
  else if (quiz === 'compound') rawData = COMPOUND_BY_Z[Number(id)];

  const includeType = quiz === 'compound'
    ? cfg.includeCompoundType
    : Boolean(standard.category && cfg.includeCompoundType);

  return {
    id,
    data: rawData,
    standard,
    quiz,
    retry,
    dir,
    includeType
  };
};
