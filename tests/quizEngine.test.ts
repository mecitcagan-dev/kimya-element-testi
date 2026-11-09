import { describe, it, expect } from 'vitest';
import {
  evaluateAnswer,
  isNameCorrect,
  generateChoices,
  createQuestion,
  getTopicStandardItems
} from '../src/engine/quizEngine';
import { COMPOUNDS } from '../src/data/compounds';

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

    it('generates choices for all 16 topics without errors', () => {
      const topics = [
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
        'periodic_trends'
      ] as const;

      topics.forEach(t => {
        const items = getTopicStandardItems(t);
        expect(items.length).toBeGreaterThan(0);
        const q = createQuestion(items[0].id, t, false, {
          quiz: t,
          kind: 'range',
          total: 10,
          retry: true,
          mode: 'choice',
          includeCompoundType: false
        });
        const choices = generateChoices(q);
        expect(choices.length).toBeGreaterThanOrEqual(2);
        expect(choices).toContain(items[0].answer);
      });
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
