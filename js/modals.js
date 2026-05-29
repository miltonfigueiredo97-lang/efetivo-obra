/* ═══════════════════════════════════════════
   modals.js – Gerenciador de modais
   ═══════════════════════════════════════════ */

const Modals = (() => {
  function open(id) {
    document.getElementById('modalBackdrop')?.classList.add('open');
    document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'block';
  }

  function close(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'none';
    // If no modal visible, close backdrop
    const anyVisible = Array.from(document.querySelectorAll('.modal'))
      .some(m => m.style.display !== 'none');
    if (!anyVisible) document.getElementById('modalBackdrop')?.classList.remove('open');
  }

  function closeAll(event) {
    if (event && event.target !== document.getElementById('modalBackdrop')) return;
    document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
    document.getElementById('modalBackdrop')?.classList.remove('open');
  }

  function openAddWorker(workerId) {
    const s = State.get();
    // populate equipes
    document.getElementById('wTeam').innerHTML = s.equipes.map(e =>
      `<option value="${e.id}">${e.nome}</option>`
    ).join('');
    // populate obras
    document.getElementById('wObra').innerHTML = s.obras.map(o =>
      `<option value="${o}" ${o === App.getObra() ? 'selected' : ''}>${o}</option>`
    ).join('');

    if (workerId) {
      const w = State.getWorker(workerId);
      document.getElementById('modalAddWorkerTitle').textContent = 'Editar Funcionário';
      document.getElementById('wEditId').value = workerId;
      document.getElementById('wName').value  = w.nome;
      document.getElementById('wRole').value  = w.funcao;
      document.getElementById('wTeam').value  = w.equipe;
      document.getElementById('wObra').value  = w.obra;
    } else {
      document.getElementById('modalAddWorkerTitle').textContent = 'Novo Funcionário';
      document.getElementById('wEditId').value = '';
      document.getElementById('wName').value   = '';
      document.getElementById('wRole').value   = '';
    }
    open('modalAddWorker');
  }

  function openMove(workerId) {
    const s = State.get();
    const w = State.getWorker(workerId);
    document.getElementById('moveWorkerId').value  = workerId;
    document.getElementById('moveWorkerName').textContent = w ? w.nome : '';
    document.getElementById('moveObraSelect').innerHTML = s.obras
      .filter(o => o !== (w?.obra))
      .map(o => `<option value="${o}">${o}</option>`)
      .join('');
    open('modalMove');
  }

  function openImport() {
    const s = State.get();
    document.getElementById('importObraSelect').innerHTML = s.obras.map(o =>
      `<option value="${o}" ${o === App.getObra() ? 'selected' : ''}>${o}</option>`
    ).join('');
    document.getElementById('importEquipeSelect').innerHTML = s.equipes.map(e =>
      `<option value="${e.id}">${e.nome}</option>`
    ).join('');
    document.getElementById('importText').value = '';
    open('modalImport');
  }

  return { open, close, closeAll, openAddWorker, openMove, openImport };
})();
