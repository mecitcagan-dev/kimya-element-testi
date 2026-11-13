import { describe, it, expect } from 'vitest';
import {
  evaluateAnswer,
  isNameCorrect,
  isFormulaAsk,
  generateChoices,
  createQuestion,
  getTopicStandardItems,
  getPoolIds
} from '../src/engine/quizEngine';
import {
  COVALENT_NAMING_CATEGORIES,
  IONIC_NAMING_CATEGORIES
} from '../src/data/compoundNaming';
import { COMPOUNDS } from '../src/data/compounds';
import { ALL_TOPICS } from '../src/data/topics';
import { TopicId } from '../src/types/topics';

describe('quizEngine', () => {
  const su = COMPOUNDS[0]; // H2O, Su, Oksit
  const hcl = COMPOUNDS[1]; // HCl, Tuz ruhu, Asit
  const h2so4 = COMPOUNDS[2]; // H2SO4, Zaç yağı, Asit

  describe('evaluateAnswer in compound without type (türsüz mod)', () => {
    it('accepts correct formula in ad-formul direction without requiring category', () => {
      const q = createQuestion(su.z, 'compound', false, {
        quiz: 'compound',
        kind: 'range',
        total: 10,
        retry: true,
        mode: 'type',
        dir: 'ad-formul',
        includeCompoundType: false // Türsüz!
      });

      const res = evaluateAnswer(q, 'H2O', null, false);
      expect(res.nameOk).toBe(true);
      expect(res.catOk).toBe(true);
      expect(res.full).toBe(true);
      expect(res.includeType).toBe(false);
    });

    it('accepts correct Turkish name in formul-ad direction without category', () => {
      const q = createQuestion(hcl.z, 'compound', false, {
        quiz: 'compound',
        kind: 'range',
        total: 10,
        retry: true,
        mode: 'type',
        dir: 'formul-ad',
        includeCompoundType: false
      });

      const res = evaluateAnswer(q, 'tuz ruhu', null, false);
      expect(res.nameOk).toBe(true);
      expect(res.catOk).toBe(true);
      expect(res.full).toBe(true);
    });

    it('fails when formula/name is wrong in türsüz mod', () => {
      const q = createQuestion(h2so4.z, 'compound', false, {
        quiz: 'compound',
        kind: 'range',
        total: 10,
        retry: true,
        mode: 'type',
        dir: 'ad-formul',
        includeCompoundType: false
      });

      const res = evaluateAnswer(q, 'HCl', null, false);
      expect(res.nameOk).toBe(false);
      expect(res.full).toBe(false);
    });
  });

  describe('evaluateAnswer with type required (türlü mod)', () => {
    it('requires both correct answer and correct category', () => {
      const q = createQuestion(h2so4.z, 'compound', false, {
        quiz: 'compound',
        kind: 'range',
        total: 10,
        retry: true,
        mode: 'type',
        dir: 'ad-formul',
        includeCompoundType: true // Türlü!
      });

      // Correct formula, wrong category
      const resMixed = evaluateAnswer(q, 'H2SO4', 'Baz', false);
      expect(resMixed.nameOk).toBe(true);
      expect(resMixed.catOk).toBe(false);
      expect(resMixed.full).toBe(false);

      // Correct formula, correct category
      const resFull = evaluateAnswer(q, 'H2SO4', 'Asit', false);
      expect(resFull.nameOk).toBe(true);
      expect(resFull.catOk).toBe(true);
      expect(resFull.full).toBe(true);
    });
  });

  describe('choice generation for any topic', () => {
    it('generates 4 unique choices for compound topic', () => {
      const q = createQuestion(su.z, 'compound', false, {
        quiz: 'compound',
        kind: 'range',
        total: 10,
        retry: true,
        mode: 'choice',
        dir: 'ad-formul',
        includeCompoundType: false
      });
      const choices = generateChoices(q);
      expect(choices.length).toBe(4);
      expect(new Set(choices).size).toBe(4);
      expect(choices).toContain(su.disp);
    });

    it('generates 4 unique choices for polyatomic ions', () => {
      const q = createQuestion(1, 'polyatomic', false, {
        quiz: 'polyatomic',
        kind: 'range',
        total: 10,
        retry: true,
        mode: 'choice',
        includeCompoundType: false
      });
      const choices = generateChoices(q);
      expect(choices.length).toBe(4);
      expect(new Set(choices).size).toBe(4);
      expect(choices).toContain('Amonyum');
    });

    it('has 24 topics total (8 tyt_ayt, 8 tyt, 8 ayt) and generates 4 distinct choices for every TopicId', () => {
      const topics: TopicId[] = [
        'element',
        'compound',
        'polyatomic',
        'safety',
        'lab',
        'indicators',
        'alchemists',
        'valence',
        'functional_groups',
        'organic_common',
        'solids',
        'interactions',
        'vsepr',
        'metal_reactions',
        'organic_tests',
        'periodic_trends',
        'compound_naming',
        'mixtures_separation',
        'everyday_chemistry',
        'environmental_chemistry',
        'quantum_orbitals',
        'gases_solutions',
        'kinetics_equilibrium',
        'electrochemistry_organic'
      ];

      expect(ALL_TOPICS.length).toBe(24);
      expect(ALL_TOPICS.filter(t => t.examCategory === 'tyt_ayt').length).toBe(8);
      expect(ALL_TOPICS.filter(t => t.examCategory === 'tyt').length).toBe(8);
      expect(ALL_TOPICS.filter(t => t.examCategory === 'ayt').length).toBe(8);
      expect(new Set(ALL_TOPICS.map(t => t.id))).toEqual(new Set(topics));

      topics.forEach(t => {
        const items = getTopicStandardItems(t);
        expect(items.length).toBeGreaterThan(0);

        items.forEach(item => {
          const q = createQuestion(item.id, t, false, {
            quiz: t,
            kind: 'range',
            total: 10,
            retry: true,
            mode: 'choice',
            includeCompoundType: false
          });
          const choices = generateChoices(q);
          expect(choices.length).toBe(4);
          expect(new Set(choices).size).toBe(4);
          expect(choices).toContain(q.standard.answer);
        });
      });
    });
  });

  describe('compound_naming bidirectional support', () => {
    it('supports form-name direction (formula -> IUPAC name) with type toggle disabled', () => {
      const items = getTopicStandardItems('compound_naming', 'form-name');
      expect(items.length).toBeGreaterThanOrEqual(45);

      const mg3n2 = items.find(i => i.id === 'ionic-mg3n2');
      expect(mg3n2).toBeDefined();

      const q = createQuestion('ionic-mg3n2', 'compound_naming', false, {
        quiz: 'compound_naming',
        kind: 'range',
        total: 20,
        retry: true,
        mode: 'type',
        dir: 'form-name',
        includeCompoundType: true // Should stay false because hasTypeToggle is false
      });

      expect(isFormulaAsk(q)).toBe(false);
      expect(q.includeType).toBe(false);
      expect(q.standard.prompt).toBe('Mg₃N₂');
      expect(q.standard.answer).toBe('Magnezyum nitrür');

      expect(evaluateAnswer(q, 'Magnezyum nitrür', null, false).full).toBe(true);
      expect(evaluateAnswer(q, 'magnezyum nitrur', null, false).full).toBe(true);
      expect(evaluateAnswer(q, 'Magnezyum(II) nitrür', null, false).full).toBe(false);

      const choices = generateChoices(q);
      expect(choices.length).toBe(4);
      expect(new Set(choices).size).toBe(4);
      expect(choices).toContain('Magnezyum nitrür');
    });

    it('supports name-form direction (IUPAC name -> formula) accepting ASCII and Unicode subscripts', () => {
      const q = createQuestion('ionic-mg3n2', 'compound_naming', false, {
        quiz: 'compound_naming',
        kind: 'range',
        total: 20,
        retry: true,
        mode: 'type',
        dir: 'name-form',
        includeCompoundType: false
      });

      expect(isFormulaAsk(q)).toBe(true);
      expect(q.standard.prompt).toBe('Magnezyum nitrür');
      expect(q.standard.answer).toBe('Mg₃N₂');

      // ASCII and Unicode inputs both accepted
      expect(evaluateAnswer(q, 'Mg3N2', null, false).full).toBe(true);
      expect(evaluateAnswer(q, 'Mg₃N₂', null, false).full).toBe(true);
      expect(evaluateAnswer(q, 'Mg2N3', null, false).full).toBe(false);

      // Choice mode exact match
      const choices = generateChoices(q);
      expect(choices.length).toBe(4);
      expect(new Set(choices).size).toBe(4);
      expect(choices).toContain('Mg₃N₂');
      expect(evaluateAnswer(q, 'Mg₃N₂', null, true).full).toBe(true);
      expect(evaluateAnswer(q, 'Mg3N2', null, true).full).toBe(false);
    });

    it('resolves karisik direction to form-name or name-form for compound_naming', () => {
      const q = createQuestion('ionic-cao', 'compound_naming', false, {
        quiz: 'compound_naming',
        kind: 'range',
        total: 20,
        retry: true,
        mode: 'choice',
        dir: 'karisik',
        includeCompoundType: false
      });

      expect(['form-name', 'name-form']).toContain(q.dir);
      const expectedAnswer = q.dir === 'name-form' ? 'CaO' : 'Kalsiyum oksit';
      expect(q.standard.answer).toBe(expectedAnswer);
      expect(evaluateAnswer(q, expectedAnswer, null, true).full).toBe(true);
    });

    it('filters compound_naming pools by selected namingCategories (only ionic, only covalent, or combined)', () => {
      const allIds = getPoolIds({
        quiz: 'compound_naming',
        kind: 'range',
        total: 20,
        retry: true,
        mode: 'choice',
        dir: 'form-name',
        includeCompoundType: false
      });
      expect(allIds.length).toBe(69);

      const ionicIds = getPoolIds({
        quiz: 'compound_naming',
        kind: 'range',
        total: 20,
        retry: true,
        mode: 'choice',
        dir: 'form-name',
        includeCompoundType: false,
        namingCategories: IONIC_NAMING_CATEGORIES
      });
      expect(ionicIds.length).toBe(42);
      expect(ionicIds.some(id => String(id).startsWith('cov-'))).toBe(false);

      const covalentIds = getPoolIds({
        quiz: 'compound_naming',
        kind: 'range',
        total: 16,
        retry: true,
        mode: 'choice',
        dir: 'form-name',
        includeCompoundType: false,
        namingCategories: COVALENT_NAMING_CATEGORIES
      });
      expect(covalentIds.length).toBe(16);
      expect(covalentIds.every(id => String(id).startsWith('cov-'))).toBe(true);
    });
  });

  describe('isNameCorrect in choice mode', () => {
    it('checks exact string match in choice mode', () => {
      const q = createQuestion(su.z, 'compound', false, {
        quiz: 'compound',
        kind: 'range',
        total: 10,
        retry: true,
        mode: 'choice',
        dir: 'ad-formul',
        includeCompoundType: false
      });

      expect(isNameCorrect(q, 'H₂O', true)).toBe(true);
      expect(isNameCorrect(q, 'HCl', true)).toBe(false);
    });
  });
});
