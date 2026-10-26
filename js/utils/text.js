// Metin karşılaştırma ve bileşik formülü biçimleme yardımcıları

export const squeeze = s => String(s == null ? '' : s).replace(/\s+/g, ' ').trim();

// Türkçe büyük/küçük harf + aksan silme karşılaştırma anahtarı
export const foldKey = s => squeeze(s)
  .toLocaleLowerCase('tr')
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '')
  .replace(/ı/g, 'i')
  .replace(/İ/g, 'i');

export const nameMatches = (typed, el) => {
  const key = foldKey(typed);
  return key.length > 0 && el.names.some(n => foldKey(n) === key);
};

// ---------- Bileşik formülleri ----------
// Gösterim: harf veya kapanış parantezinden sonraki rakamlar alt simge olur (H2O → H₂O).
// Her rakam tek karakterle değiştiği için metnin uzunluğu ve imleç konumu korunur.
export const formatFormula = s => String(s == null ? '' : s).replace(
  /([A-Za-z)₀-₉])([0-9₀-₉]+)/g,
  (m, p, run) => p + run.replace(/[0-9]/g, d => String.fromCharCode(0x2080 + Number(d)))
);

// Karşılaştırma anahtarı: alt simgeler düz rakam olur, boşluk ve parantez atılır, küçük harfe çevrilir
export const formulaKey = s => String(s == null ? '' : s)
  .replace(/[₀-₉]/g, ch => String(ch.charCodeAt(0) - 0x2080))
  .replace(/[\s()]/g, '')
  .toLowerCase();

export const formulaMatches = (typed, c) => {
  const key = formulaKey(typed);
  return key.length > 0 && key === c.fk;
};
