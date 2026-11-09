import { describe, it, expect } from 'vitest';
import {
  evaluateAnswer,
  isNameCorrect,
  makeCompoundChoices,
  makeElementChoices,
  createQuestion
} from '../src/engine/quizEngine';
import { COMPOUNDS } from '../src/data/compounds';
import { ELEMENTS } from '../src/data/elements';

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

      // typed H2O, pickedCat is null
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

  describe('choice generation', () => {
    it('generates 4 unique compound choices including correct answer', () => {
      const choices = makeCompoundChoices(su, true); // askFormula = true
      expect(choices.length).toBe(4);
      expect(new Set(choices).size).toBe(4);
      expect(choices).toContain(su.disp);
    });

    it('generates 4 unique element choices including correct name', () => {
      const fe = ELEMENTS[25]; // Demir
      const choices = makeElementChoices(fe);
      expect(choices.length).toBe(4);
      expect(new Set(choices).size).toBe(4);
      expect(choices).toContain('Demir');
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
