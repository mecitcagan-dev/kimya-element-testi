// Ekran geçişi: üç bölümden (kurulum, test, sonuç) yalnızca birini gösterir
import { state } from '../state/app-state.js';
import { $ } from '../utils/dom.js';
import { renderSetup } from './setup.js';
import { syncTableUI } from './periodic-table.js';

export function showView(name) {
  state.view = name;
  $('view-setup').hidden = name !== 'setup';
  $('view-test').hidden = name !== 'test';
  $('view-result').hidden = name !== 'result';
  if (name === 'setup') renderSetup();
  syncTableUI();
  window.scrollTo(0, 0);
}
