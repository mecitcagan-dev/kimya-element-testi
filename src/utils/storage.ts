// localStorage erişimi: try/catch koruması ve geriye dönük uyumluluk

export const KEYS = {
  stats: 'elementTesti.v1',                              // element hata istatistiği
  compounds: 'elementTesti.compounds.v1',                // bileşik hata istatistiği
  tab: 'elementTesti.tab',                               // son kurulum sekmesi ('element' | 'compound')
  compoundDirection: 'elementTesti.compoundDirection',   // bileşik soru yönü ('ad-formul' | 'formul-ad' | 'karisik')
  answerMode: 'elementTesti.answerMode',                 // cevap şekli: 'type' | 'choice'
  showTable: 'elementTesti.showTable',                   // periyodik tablo görünürlüğü
  compoundIncludeType: 'elementTesti.compoundIncludeType', // bileşikte tür sorulsun mu? ('true' | 'false')
  theme: 'elementTesti.theme'                            // UI teması ('dark' | 'light')
} as const;

export function readStored(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStored(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* localStorage kapalı veya erişilemezse sessizce devam et */
  }
}
