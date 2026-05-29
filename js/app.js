/* app.js */
const App = (() => {
  let currentDate = Utils.todayStr();
  let currentObra = '';

  const PAGE_TITLES = {
    efetivo:'DO DIA', producao:'EXECUÇÃO', funcionarios:'EQUIPE',
    relatorios:'DESEMPENHO', historico:'HISTÓRICO',
    configuracoes:'CONFIG', integracao:'SHEETS',
  };

  function init() {
    State.load();
    currentDate = Utils.todayStr();
    currentObra = State.get().activeObra || State.get().obras[0];

    document.getElementById('datePicker').value = currentDate;
    document.getElementById('datePicker').addEventListener('change', e => setDate(e.target.value));

    _updateDateLabels();
    _rebuildObraSelects();
    _updateGSIndicator();
    EfetivoPage.init();
    _updateTopbar();
  }

  function showPage(id, el) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.bnav-item,.nav-item-d').forEach(n => n.classList.remove('active'));
    document.getElementById('page-' + id)?.classList.add('active');
    // highlight all matching nav elements
    document.querySelectorAll(`[data-page="${id}"]`).forEach(n => n.classList.add('active'));
    document.getElementById('topbarTitle').textContent = PAGE_TITLES[id] || id.toUpperCase();
    if (id==='relatorios')    RelatoriosPage.render();
    if (id==='historico')     HistoricoPage.render();
    if (id==='configuracoes') ConfigPage.render();
    if (id==='funcionarios')  FuncionariosPage.render();
    if (id==='integracao')    IntegracaoPage.render();
    if (id==='producao')      ProducaoPage.render();
  }

  function changeObra(v) {
    currentObra = v;
    State.get().activeObra = v;
    State.save();
    document.getElementById('obraLabel').textContent = v;
    document.getElementById('obraPill').textContent = v.length > 14 ? v.slice(0,13)+'…' : v;
    _renderObraOptions();
    EfetivoPage.render();
    _updateTopbar();
  }

  function openDrawer() {
    document.getElementById('drawer').classList.add('open');
    document.getElementById('drawerBackdrop').classList.add('open');
  }

  function closeDrawer() {
    document.getElementById('drawer').classList.remove('open');
    document.getElementById('drawerBackdrop').classList.remove('open');
  }

  function addObra() {
    const v = document.getElementById('newObraInput').value.trim();
    if (!v) return;
    State.addObra(v);
    document.getElementById('newObraInput').value = '';
    _rebuildObraSelects();
    _renderObraOptions();
  }

  function _renderObraOptions() {
    const s = State.get();
    const el = document.getElementById('obraOptions');
    if (!el) return;
    el.innerHTML = s.obras.map(o => `
      <div class="obra-option ${o===currentObra?'selected':''}" onclick="App.changeObra('${Utils.escapeHtml(o)}');Modals.close('modalObra')">
        <span>${Utils.escapeHtml(o)}</span>
        ${o===currentObra?'<span class="obra-option-check">✓</span>':''}
      </div>`).join('');
  }

  function _updateDateLabels() {
    const d = Utils.dateFromStr(currentDate);
    document.getElementById('weekdayLabel').textContent = Utils.weekdayOf(d);
  }

  function _updateTopbar() {
    const s = State.get();
    const workers = s.workers.filter(w => w.obra === currentObra);
    let presentes = 0;
    workers.forEach(w => { if (State.getDayData(w.id, currentDate).presente) presentes++; });

    document.getElementById('topbarPresentes').textContent = presentes;
    const bp = document.getElementById('bnavPresentes');
    if (bp) { bp.textContent = presentes; bp.style.display = presentes > 0 ? '' : 'none'; }
    const dp = document.getElementById('dNavPresentes');
    if (dp) dp.textContent = presentes;
    const dt = document.getElementById('dNavTotal');
    if (dt) dt.textContent = workers.length;

    const pill = document.getElementById('obraPill');
    if (pill) pill.textContent = currentObra.length > 14 ? currentObra.slice(0,13)+'…' : currentObra;
    const lbl = document.getElementById('obraLabel');
    if (lbl) lbl.textContent = currentObra;
    const fs = document.getElementById('funcSubtitle');
    if (fs) fs.textContent = `${workers.length} cadastrados · ${currentObra}`;
  }

  function _rebuildObraSelects() {
    const s = State.get();
    const opts = s.obras.map(o =>
      `<option value="${Utils.escapeHtml(o)}" ${o===currentObra?'selected':''}>${Utils.escapeHtml(o)}</option>`
    ).join('');
    ['obraSelectDesktop'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = opts;
    });
  }

  function _updateGSIndicator() {
    const s = State.get();
    ['gsIndicator','gsIndicatorDrawer'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.className = 'gs-indicator' + (s.gsUrl ? ' connected' : '');
    });
  }

  function getDate()  { return currentDate; }
  function getObra()  { return currentObra; }
  function setDate(d) {
    currentDate = d;
    _updateDateLabels();
    EfetivoPage.render();
    ProducaoPage.loadFields && ProducaoPage.loadFields();
  }

  function rebuildObraSelects() { _rebuildObraSelects(); _renderObraOptions(); }
  function updateTopbar()       { _updateTopbar(); }
  function updateGSIndicator()  { _updateGSIndicator(); }
  function renderObraOptions()  { _renderObraOptions(); }

  return { init, showPage, changeObra, openDrawer, closeDrawer, addObra,
           getDate, getObra, setDate, rebuildObraSelects, updateTopbar, updateGSIndicator, renderObraOptions };
})();

document.addEventListener('DOMContentLoaded', App.init);
