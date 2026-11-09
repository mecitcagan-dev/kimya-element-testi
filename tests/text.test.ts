import { describe, it, expect } from 'vitest';
import { formatFormula, formulaKey, foldKey, nameMatches, formulaMatches } from '../src/utils/text';

describe('text utils', () => {
  it('formats chemical formulas with sub numbers', () => {
    expect(formatFormula('H2O')).toBe('H₂O');
    expect(formatFormula('H2SO4')).toBe('H₂SO₄');
    expect(formatFormula('Ca(OH)2')).toBe('Ca(OH)₂');
    expect(formatFormula('CH3COOH')).toBe('CH₃COOH');
    expect(formatFormula('NaCl')).toBe('NaCl');
  });

  it('generates consistent formula keys', () => {
    expect(formulaKey('H₂O')).toBe('h2o');
    expect(formulaKey('H2O')).toBe('h2o');
    expect(formulaKey('Ca(OH)2')).toBe('caoh2');
    expect(formulaKey('ca(oh)₂')).toBe('caoh2');
    expect(foldKey('KÜKÜRT')).toBe('kukurt');
  });

  it('matches names with Turkish insensitive comparison', () => {
    const el = { names: ['Kükürt'] };
    expect(nameMatches('kukurt', el)).toBe(true);
    expect(nameMatches('KÜKÜRT', el)).toBe(true);
    expect(nameMatches('kükürt', el)).toBe(true);
    expect(nameMatches('Kükürt', el)).toBe(true);
    expect(nameMatches('Oksijen', el)).toBe(false);

    const nitrogen = { names: ['Azot', 'Nitrojen'] };
    expect(nameMatches('azot', nitrogen)).toBe(true);
    expect(nameMatches('nitrojen', nitrogen)).toBe(true);
  });

  it('matches formulas correctly', () => {
    const compound = { fk: 'h2so4' };
    expect(formulaMatches('H2SO4', compound)).toBe(true);
    expect(formulaMatches('H₂SO₄', compound)).toBe(true);
    expect(formulaMatches('h2so4', compound)).toBe(true);
    expect(formulaMatches('HCl', compound)).toBe(false);
  });
});
