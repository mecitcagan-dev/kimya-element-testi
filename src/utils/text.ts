// Metin karşılaştırma, Türkçe normalizasyon ve bileşik formülü biçimlendirici

export const squeeze = (s: unknown): string =>
  String(s == null ? '' : s).replace(/\s+/g, ' ').trim();

// Türkçe büyük/küçük harf + aksan silme karşılaştırma anahtarı
export const foldKey = (s: unknown): string =>
  squeeze(s)
    .toLocaleLowerCase('tr')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'i');

export const nameMatches = (typed: string, el: { names: string[] }): boolean => {
  const key = foldKey(typed);
  return key.length > 0 && el.names.some(n => foldKey(n) === key);
};

// Harf veya parantezden sonraki rakamları Unicode alt simgeye dönüştürür (H2O -> H₂O, Ca(OH)2 -> Ca(OH)₂)
export const formatFormula = (s: unknown): string =>
  String(s == null ? '' : s).replace(
    /([A-Za-z)₀-₉])([0-9₀-₉]+)/g,
    (_, p: string, run: string) =>
      p + run.replace(/[0-9]/g, d => String.fromCharCode(0x2080 + Number(d)))
  );

// Karşılaştırma anahtarı: alt simgeleri düz rakama çevirir, parantez ve boşlukları atar, küçük harfe indirger
export const formulaKey = (s: unknown): string =>
  String(s == null ? '' : s)
    .replace(/[₀-₉]/g, ch => String(ch.charCodeAt(0) - 0x2080))
    .replace(/[\s()]/g, '')
    .toLowerCase();

export const formulaMatches = (typed: string, c: { fk: string }): boolean => {
  const key = formulaKey(typed);
  return key.length > 0 && key === c.fk;
};
