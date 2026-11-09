import { describe, it, expect, beforeEach } from 'vitest';
import {
  loadElementStats,
  recordElementResult,
  getWeakElementZs,
  loadCompoundStats,
  recordCompoundResult,
  getWeakCompoundZs
} from '../src/engine/statsEngine';
import { ELEMENTS } from '../src/data/elements';
import { COMPOUNDS } from '../src/data/compounds';

describe('statsEngine', () => {
  beforeEach(() => {
    // Clear localStorage mockup
    window.localStorage.clear();
  });

  it('records element mistakes and returns weak elements', () => {
    loadElementStats();
    const h = ELEMENTS[0]; // Hidrojen (z: 1)
    const he = ELEMENTS[1]; // Helyum (z: 2)

    recordElementResult(h, false, false);
    recordElementResult(h, false, true);
    recordElementResult(he, true, true);

    const weak = getWeakElementZs();
    expect(weak).toContain(1);
    expect(weak).not.toContain(2);
  });

  it('records compound mistakes and handles türsüz mode', () => {
    loadCompoundStats();
    const su = COMPOUNDS[0]; // H2O (z: 1)
    recordCompoundResult(su, false, true, false); // includeType = false

    const weak = getWeakCompoundZs();
    expect(weak).toContain(1);
  });
});
