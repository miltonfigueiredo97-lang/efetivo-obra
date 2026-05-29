/* ═══════════════════════════════════════════
   app.js – Controlador principal
   ═══════════════════════════════════════════ */

const App = (() => {
  let currentDate = Utils.todayStr();
  let currentObra = 'Essence Residence';
  let sidebarVisible = true;

  const PAGE_TITLES = {
    efetivo:       'EFETIVO DO DIA',
    producao:      'RELATÓRIO DE EXECUÇÃO',
    funcionarios:  'FUNCIONÁRIOS',
    relatorios:    'DESEMPENHO & PRESENÇA',
    historico:     'HISTÓRICO DE EFETIVOS',
    configuracoes: 'CONFIGURAÇÕES',
    integracao:    'GOOGLE SHEETS',
  };

  function init() {
    State.load();
    currentDate = Utils.todayStr();
    currentObra = State.get().activeObra || State.get().obras[0] || 'Essence Residence';

    // Date picker
    const dp = document.getElementById('datePicker');
    dp.value = currentDate;
    _updateDateLabels();

    // Obra selector
    _rebuildObraSelect();

    // GS indicator
    _updateGSIndicator();

    // Render first page
    EfetivoPage.init();
    _updateTopbar();
  }

  function showPage(id, el) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('page-' + id)?.classList.add('active');
    if (el) el.classList.add('active');
    document.getElementById('topbarTitle').textContent = PAGE_TITLES[id] || id.toUpperCase();

    // Lazy render
    if (id === 'relatorios')    RelatoriosPage.render();
    if (id === 'historico')     HistoricoPage.render();
    if (id === 'configuracoes') ConfigPage.render();
    if (id === 'funcionarios')  FuncionariosPage.render();
    if (id === 'integracao')    IntegracaoPage.render();
    if (id === 'producao')      ProducaoPage.render();
  }

  function changeObra(valor) {
    currentObra = valor;
    State.get().activeObra = valor;
    State.save();
    document.getElementById('obraLabel').textContent = valor;
    EfetivoPage.render();
    _updateTopbar();
  }

  function toggleSidebar() {
    sidebarVisible = !sidebarVisible;
    const sb = document.getElementById('sidebar');
    const mw = document.querySelector('.main-wrapper');
    if (sidebarVisible) {
      sb.classList.remove('hidden');
      mw.classList.remove('expanded');
    } else {
      sb.classList.add('hidden');
      mw.classList.add('expanded');
    }
  }

  function _updateDateLabels() {
    const d = Utils.dateFromStr(currentDate);
    document.getElementById('weekdayLabel').textContent = Utils.weekdayOf(d);
    document.getElementById('topbarDate').textContent   = Utils.formatPT(d);
    _updateTopbar();
  }

  function _updateTopbar() {
    const s = State.get();
    const workers = s.workers.filter(w => w.obra === currentObra);
    let presentes = 0;
    workers.forEach(w => {
      if (State.getDayData(w.id, currentDate).presente) presentes++;
    });
    document.getElementById('topbarPresentes').textContent = presentes;
    document.getElementById('navCountPresentes').textContent = presentes;
    document.getElementById('navCountTotal').textContent = workers.length;
  }

  function _rebuildObraSelect() {
    const s = State.get();
    const sel = document.getElementById('obraSelect');
    sel.innerHTML = s.obras.map(o =>
      `<option value="${o}" ${o === currentObra ? 'selected' : ''}>${o}</option>`
    ).join('');
    document.getElementById('obraLabel').textContent = currentObra;
  }

  function _updateGSIndicator() {
    const s = State.get();
    const ind = document.getElementById('gsIndicator');
    if (ind) ind.className = 'gs-indicator' + (s.gsUrl ? ' connected' : '');
  }

  // Exposed helpers
  function getDate()  { return currentDate; }
  function getObra()  { return currentObra; }
  function setDate(d) {
    currentDate = d;
    _updateDateLabels();
    EfetivoPage.render();
    ProducaoPage.loadFields();
  }

  function rebuildObraSelect() { _rebuildObraSelect(); }
  function updateTopbar()      { _updateTopbar(); }
  function updateGSIndicator() { _updateGSIndicator(); }

  return { init, showPage, changeObra, toggleSidebar, getDate, getObra, setDate, rebuildObraSelect, updateTopbar, updateGSIndicator };
})();

// Bootstrap
document.addEventListener('DOMContentLoaded', App.init);
