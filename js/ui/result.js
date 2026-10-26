// Sonuç ekranı: doğru yüzdesi, istatistik kutuları ve yanlış yapılan elementler veya bileşikler
import { BY_Z } from '../data/elements.js';
import { CMP_BY_Z } from '../data/compounds.js';
import { state } from '../state/app-state.js';
import { $, esc } from '../utils/dom.js';
import { formatFormula } from '../utils/text.js';

function missedItemHTML(m) {
  const el = BY_Z[m.z];
  const ok = m.resolved;
  const alt = el.names.length > 1
    ? `<span class="miss-meta">Ayrıca: ${esc(el.names.slice(1).join(', '))}</span>`
    : '';
  return `
      <li class="miss">
        <div class="miss-sym">${esc(el.s)}</div>
        <div>
          <div class="miss-top">
            <span class="miss-name">${esc(el.names[0])}</span>
            <span class="miss-meta">Atom no ${esc(el.z)}</span>
            ${alt}
            <span class="pill ${ok ? 'ok' : 'bad'}">${ok ? 'Tekrarda doğru' : 'Yanlış'}</span>
          </div>
          <div class="miss-line"><span class="k">Doğru tür:</span> ${esc(el.c)}</div>
          <div class="miss-line"><span class="k">Senin cevabın:</span> ${esc(m.typed)} &nbsp;·&nbsp; <span class="k">Seçtiğin tür:</span> ${esc(m.picked)}</div>
        </div>
      </li>`;
}

function compoundMissedHTML(m) {
  const c = CMP_BY_Z[m.z];
  const ok = m.resolved;
  return `
      <li class="miss is-compound">
        <div>
          <div class="miss-top">
            <span class="miss-name">${esc(c.disp)}</span>
            <span class="miss-meta">${esc(c.names[0])}</span>
            <span class="pill ${ok ? 'ok' : 'bad'}">${ok ? 'Tekrarda doğru' : 'Yanlış'}</span>
          </div>
          <div class="miss-line"><span class="k">Doğru tür:</span> ${esc(c.c)}</div>
          <div class="miss-line"><span class="k">Senin cevabın:</span> ${esc(formatFormula(m.typed))} &nbsp;·&nbsp; <span class="k">Seçtiğin tür:</span> ${esc(m.picked)}</div>
        </div>
      </li>`;
}

export function renderResult() {
  const r = state.lastResult;
  const n = r.answered;
  const pct = n ? Math.round((r.full / n) * 100) : 0;
  $('r-pct').textContent = `${pct}%`;
  $('r-sub').textContent = n
    ? `${n} sorudan ${r.full} tanesi tam doğru`
    : 'Bu oturumda henüz soru cevaplanmadı.';
  $('r-bar').style.width = `${pct}%`;
  $('r-name-label').textContent = r.quiz === 'compound' ? 'Cevap doğru' : 'İsim doğru';
  $('r-name').textContent = `${r.nameOk} / ${n}`;
  $('r-cat').textContent = `${r.catOk} / ${n}`;
  $('r-best').textContent = String(r.best);
  $('r-total').textContent = String(r.answers);
  const compound = r.quiz === 'compound';
  $('r-missed-title').textContent = r.missed.length
    ? `Yanlış yaptığın ${compound ? 'bileşikler' : 'elementler'} (${r.missed.length})`
    : `Yanlış yaptığın ${compound ? 'bileşik' : 'element'} yok`;
  $('r-missed').innerHTML = r.missed.length
    ? r.missed.map(compound ? compoundMissedHTML : missedItemHTML).join('')
    : `<li class="empty">${r.answers ? 'Harika! Bu testte hiç yanlış yapmadın.' : 'Henüz cevap verilmedi.'}</li>`;
  $('btn-missed').disabled = r.missed.length === 0;
}
