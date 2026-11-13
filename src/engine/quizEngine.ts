import { TopicId, StandardQuizItem } from '../types/topics';
import { ElementData, CompoundData } from '../types/chemistry';
import { QuizConfig, QuestionItem, AnswerResult } from '../types/quiz';
import { TOPIC_MAP } from '../data/topics';
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
import { SOLIDS } from '../data/solids';
import { INTERACTIONS } from '../data/interactions';
import { VSEPR_MOLECULES } from '../data/vsepr';
import { METAL_REACTIONS } from '../data/metalReactions';
import { ORGANIC_TESTS } from '../data/organicTests';
import { PERIODIC_TRENDS } from '../data/periodicTrends';
import { COMPOUND_NAMING_ITEMS, compoundNamingToQuizItem } from '../data/compoundNaming';
import { MIXTURES_SEPARATION, mixtureSeparationToQuizItem } from '../data/mixturesSeparation';
import { EVERYDAY_CHEMISTRY, everydayChemistryToQuizItem } from '../data/everydayChemistry';
import { ENVIRONMENTAL_CHEMISTRY, environmentalChemistryToQuizItem } from '../data/environmentalChemistry';
import { QUANTUM_ORBITALS, quantumOrbitalToQuizItem } from '../data/quantumOrbitals';
import { GASES_AND_SOLUTIONS, gasesSolutionsToQuizItem } from '../data/gasesAndSolutions';
import { KINETICS_EQUILIBRIUM, kineticsEquilibriumToQuizItem } from '../data/kineticsEquilibrium';
import { ELECTROCHEMISTRY_AND_ORGANIC, electrochemistryOrganicToQuizItem } from '../data/electrochemistryAndOrganic';
import { foldKey, formulaKey, nameMatches, formulaMatches, squeeze } from '../utils/text';
import { shuffle } from '../utils/random';

export const isFormulaAsk = (q: QuestionItem): boolean =>
  (q.quiz === 'compound' && q.dir === 'ad-formul') ||
  (q.quiz === 'compound_naming' && q.dir === 'name-form');

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

    case 'solids':
      return SOLIDS.map(s => ({
        id: s.id,
        prompt: `${s.name} (${s.formula})`,
        promptSub: 'Katı sınıfı nedir?',
        answer: s.solidType,
        category: s.solidType,
        infoChips: [
          { label: 'Madde', value: `${s.name} [${s.formula}]` },
          { label: 'Katı Türü', value: s.solidType },
          { label: 'Bağ / Etkileşim', value: s.bonding },
          { label: 'İletkenlik', value: s.conductivity },
          { label: 'Erime Noktası', value: s.meltingPoint },
          { label: 'ÖSYM Notu', value: s.examHighlight }
        ],
        hint: `Bağ Türü: ${s.bonding}. ${s.examHighlight}`
      }));

    case 'interactions':
      return INTERACTIONS.map(item => ({
        id: item.id,
        prompt: item.pair,
        promptSub: 'Tanecikler arası baskın etkileşim türü nedir?',
        answer: item.dominantInteraction,
        category: item.dominantInteraction,
        infoChips: [
          { label: 'Çift', value: item.pair },
          { label: 'Baskın Etkileşim', value: item.dominantInteraction },
          { label: 'Çözünürlük', value: item.dissolution },
          { label: 'ÖSYM Notu', value: item.examHighlight }
        ],
        hint: `${item.dissolution}. ${item.examHighlight}`
      }));

    case 'vsepr':
      return VSEPR_MOLECULES.map(mol => ({
        id: mol.id,
        prompt: `${mol.name} (${mol.formula})`,
        promptSub: 'VSEPR formülü ve molekül geometrisi nedir?',
        answer: `${mol.vsepr} — ${mol.geometry}`,
        category: mol.geometry,
        infoChips: [
          { label: 'Molekül', value: `${mol.formula} (${mol.name})` },
          { label: 'VSEPR Kodu', value: mol.vsepr },
          { label: 'Geometri', value: mol.geometry },
          { label: 'Hibritleşme', value: mol.hybridization },
          { label: 'Bağ Açısı', value: mol.bondAngle },
          { label: 'Polarite', value: mol.polarity },
          { label: 'ÖSYM Notu', value: mol.examHighlight }
        ],
        hint: `Merkez atom ${mol.hybridization} hibriti yapar, bağ açısı ${mol.bondAngle}. ${mol.polarity}.`
      }));

    case 'metal_reactions':
      return METAL_REACTIONS.map(rx => ({
        id: rx.id,
        prompt: rx.reactants,
        promptSub: 'Tepkime sonucu hangi gaz açığa çıkar?',
        answer: rx.gasProduced,
        category: rx.metalClass,
        infoChips: [
          { label: 'Tepkime', value: rx.reactants },
          { label: 'Açığa Çıkan Gaz', value: rx.gasProduced },
          { label: 'Metal Sınıfı', value: rx.metalClass },
          { label: 'Denklem', value: rx.equation },
          { label: 'ÖSYM Notu', value: rx.examHighlight }
        ],
        hint: `Metal Sınıfı: ${rx.metalClass}. Denklem: ${rx.equation}`
      }));

    case 'organic_tests':
      return ORGANIC_TESTS.map(t => ({
        id: t.id,
        prompt: t.reactants,
        promptSub: 'Ayıraç veya reaksiyon sonucu ne gözlenir?',
        answer: t.result,
        category: t.reactionType,
        infoChips: [
          { label: 'Reaktifler', value: t.reactants },
          { label: 'Gözlem / Sonuç', value: t.result },
          { label: 'Tepkime Türü', value: t.reactionType },
          { label: 'ÖSYM Notu', value: t.examHighlight }
        ],
        hint: `${t.reactionType}. ${t.examHighlight}`
      }));

    case 'periodic_trends':
      return PERIODIC_TRENDS.map(p => ({
        id: p.id,
        prompt: p.question,
        promptSub: `Konu: ${p.category}`,
        answer: p.answer,
        distractors: p.distractors,
        category: p.category,
        infoChips: [
          { label: 'Kategori', value: p.category },
          { label: 'Doğru Özellik', value: p.answer },
          { label: 'ÖSYM Notu', value: p.examHighlight }
        ],
        hint: p.examHighlight
      }));

    case 'compound_naming': {
      const namingDir = dir === 'name-form' ? 'name-form' : 'form-name';
      return COMPOUND_NAMING_ITEMS.map(item => compoundNamingToQuizItem(item, namingDir));
    }

    case 'mixtures_separation':
      return MIXTURES_SEPARATION.map(mixtureSeparationToQuizItem);

    case 'everyday_chemistry':
      return EVERYDAY_CHEMISTRY.map(everydayChemistryToQuizItem);

    case 'environmental_chemistry':
      return ENVIRONMENTAL_CHEMISTRY.map(environmentalChemistryToQuizItem);

    case 'quantum_orbitals':
      return QUANTUM_ORBITALS.map(quantumOrbitalToQuizItem);

    case 'gases_solutions':
      return GASES_AND_SOLUTIONS.map(gasesSolutionsToQuizItem);

    case 'kinetics_equilibrium':
      return KINETICS_EQUILIBRIUM.map(kineticsEquilibriumToQuizItem);

    case 'electrochemistry_organic':
      return ELECTROCHEMISTRY_AND_ORGANIC.map(electrochemistryOrganicToQuizItem);

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

  // Sistematik Bileşik Adlandırma (formül yazımında alt simge ve parantez esnekliği)
  if (q.quiz === 'compound_naming' && isFormulaAsk(q)) {
    const typedFormula = formulaKey(clean);
    if (typedFormula.length > 0 && typedFormula === formulaKey(q.standard.answer)) {
      return true;
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
  const currentAnswer = q.standard.answer;
  const used = new Set<string>([currentAnswer]);
  const extra: string[] = [];

  // 1. Eğer soruya özel tanımlı çeldiriciler varsa önce onları kullan
  if (q.standard.distractors && q.standard.distractors.length > 0) {
    shuffle(q.standard.distractors).forEach(d => {
      if (!used.has(d) && extra.length < 3) {
        used.add(d);
        extra.push(d);
      }
    });
  }

  const items = getTopicStandardItems(q.quiz, q.dir);
  const others = shuffle(items.filter(x => x.answer !== currentAnswer));

  // 2. Aynı kategoriden olanlara öncelik vererek çeldirici zorluğunu artır
  if (extra.length < 3 && q.standard.category) {
    const sameCat = others.filter(x => x.category === q.standard.category);
    sameCat.slice(0, 2).forEach(x => {
      if (!used.has(x.answer) && extra.length < 3) {
        used.add(x.answer);
        extra.push(x.answer);
      }
    });
  }

  // 3. Geriye kalan çeldiricileri ekle
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
    else if (quiz === 'polyatomic' || quiz === 'compound_naming') {
      dir = Math.random() < 0.5 ? 'form-name' : 'name-form';
    } else if (quiz === 'organic_common') {
      dir = Math.random() < 0.5 ? 'spec-form' : 'form-spec';
    }
  }

  const items = getTopicStandardItems(quiz, dir);
  const standard = items.find(x => x.id === id) || items[0];

  let rawData: ElementData | CompoundData | StandardQuizItem = standard;
  if (quiz === 'element') rawData = ELEMENT_BY_Z[Number(id)];
  else if (quiz === 'compound') rawData = COMPOUND_BY_Z[Number(id)];

  const topicDef = TOPIC_MAP.get(quiz);
  const supportsCategoryQuestion =
    quiz === 'element' ||
    quiz === 'compound' ||
    quiz === 'polyatomic' ||
    Boolean(topicDef?.hasTypeToggle);
  const includeType =
    quiz === 'compound'
      ? cfg.includeCompoundType
      : supportsCategoryQuestion && Boolean(standard.category && cfg.includeCompoundType);

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
