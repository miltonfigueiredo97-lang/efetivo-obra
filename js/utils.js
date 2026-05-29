/* ═══════════════════════════════════════════
   utils.js – Funções utilitárias
   ═══════════════════════════════════════════ */

const Utils = (() => {
  const WEEKDAYS = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];
  const MONTHS   = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];

  function todayStr() {
    return new Date().toISOString().split('T')[0];
  }

  function dateFromStr(str) {
    return new Date(str + 'T12:00:00');
  }

  function formatPT(dateOrStr) {
    const d = typeof dateOrStr === 'string' ? dateFromStr(dateOrStr) : dateOrStr;
    return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()}`;
  }

  function formatLong(dateOrStr) {
    const d = typeof dateOrStr === 'string' ? dateFromStr(dateOrStr) : dateOrStr;
    return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} – ${WEEKDAYS[d.getDay()]}`;
  }

  function weekdayOf(dateOrStr) {
    const d = typeof dateOrStr === 'string' ? dateFromStr(dateOrStr) : dateOrStr;
    return WEEKDAYS[d.getDay()];
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function timeNow() {
    const d = new Date();
    return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  function uid() { return 'id_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7); }

  function toast(msg, type = 'success') {
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warn: '⚠️' };
    const container = document.getElementById('toastContainer');
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `<span>${icons[type] || '✅'}</span><span>${msg}</span>`;
    container.appendChild(t);
    setTimeout(() => t.remove(), 3300);
  }

  function copyToClipboard(text, successMsg = 'Copiado!') {
    navigator.clipboard.writeText(text)
      .then(() => toast(successMsg, 'success'))
      .catch(() => {
        // fallback
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        toast(successMsg, 'success');
      });
  }

  function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  return { todayStr, dateFromStr, formatPT, formatLong, weekdayOf, pad, timeNow, uid, toast, copyToClipboard, escapeHtml };
})();
