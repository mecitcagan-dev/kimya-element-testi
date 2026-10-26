// DOM yardımcıları: kimlikle eleman bulma ve HTML kaçışı

export const $ = id => document.getElementById(id);

// Metni HTML içine güvenle koymak için kaçış karakterleri
export const esc = s => String(s).replace(/[&<>"']/g, c => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));
