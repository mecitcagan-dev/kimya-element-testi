// Rastgele yardımcılar (Math.random tabanlı)

export const randInt = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

// Diziyi yerinde karıştırır (Fisher-Yates) ve aynı diziyi döndürür
export const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
