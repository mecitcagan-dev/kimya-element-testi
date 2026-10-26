// Uygulama başlangıcı: tercihleri ve istatistikleri yükler, ekranları çizer, düğmeleri bağlar
import { state } from './state/app-state.js';
import { loadStats, loadCompoundStats } from './state/stats.js';
import { $ } from './utils/dom.js';
import { initSetup, loadSetupPrefs, renderSetup, syncModeUI } from './ui/setup.js';
import { showView } from './ui/screens.js';
import { buildPeriodicTable, loadTablePref, syncTableUI, toggleTable, setTableShown } from './ui/periodic-table.js';
import { initTest, focusName } from './ui/test.js';
import { startFromSetup, startWeakFromSetup, restartSession, startMissed, submitAnswer, advance, finishSession } from './quiz/session.js';
import { initKeys } from './quiz/keys.js';

// Uygulamayı kurar. Sıra önemlidir: önce veriler yüklenir, sonra tablo ve düğmeler, en son ilk çizim.
export function init() {
  loadStats();
  loadCompoundStats();
  loadSetupPrefs();
  loadTablePref();
  buildPeriodicTable();
  initTest();
  initKeys();
  initSetup();
  bindButtons();
  syncTableUI();
  syncModeUI();
  renderSetup();
}

function bindButtons() {
  $('btn-start').addEventListener('click', () => startFromSetup());
  $('btn-weak').addEventListener('click', () => startWeakFromSetup());
  $('btn-submit').addEventListener('click', () => submitAnswer());
  $('btn-next').addEventListener('click', () => advance());
  $('btn-finish').addEventListener('click', () => {
    if (state.view === 'test') finishSession();
  });
  // Tablo düğmesi: odak ad alanında kalsın, tıklamadan sonra da alana dönsün
  $('btn-table').addEventListener('mousedown', ev => ev.preventDefault());
  $('btn-table').addEventListener('click', () => {
    toggleTable();
    if (state.view === 'test' && state.qState === 'asking') focusName();
  });
  $('opt-table').addEventListener('change', () => setTableShown($('opt-table').checked));
  $('btn-restart').addEventListener('click', () => restartSession());
  $('btn-missed').addEventListener('click', () => startMissed());
  $('btn-setup').addEventListener('click', () => showView('setup'));
}
