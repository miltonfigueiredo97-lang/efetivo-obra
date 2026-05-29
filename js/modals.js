/* modals.js */
const Modals = (() => {
  function open(id) {
    document.getElementById('modalBackdrop')?.classList.add('open');
    document.querySelectorAll('.modal').forEach(m => m.style.display='none');
    const m = document.getElementById(id);
    if (m) m.style.display='block';
    if (id==='modalObra') App.renderObraOptions();
  }

  function close(id) {
    const m = document.getElementById(id);
    if (m) m.style.display='none';
    const any = Array.from(document.querySelectorAll('.modal')).some(m=>m.style.display!=='none');
    if (!any) document.getElementById('modalBackdrop')?.classList.remove('open');
  }

  function closeAll(e) {
    if (e && e.target !== document.getElementById('modalBackdrop')) return;
    document.querySelectorAll('.modal').forEach(m=>m.style.display='none');
    document.getElementById('modalBackdrop')?.classList.remove('open');
  }

  function openAddWorker(wid) {
    const s = State.get();
    document.getElementById('wTeam').innerHTML = s.equipes.map(e=>`<option value="${e.id}">${e.nome}</option>`).join('');
    document.getElementById('wObra').innerHTML = s.obras.map(o=>`<option value="${Utils.escapeHtml(o)}" ${o===App.getObra()?'selected':''}>${Utils.escapeHtml(o)}</option>`).join('');
    if (wid) {
      const w = State.getWorker(wid);
      document.getElementById('modalAddWorkerTitle').textContent='Editar Funcionário';
      document.getElementById('wEditId').value=wid;
      document.getElementById('wName').value=w.nome;
      document.getElementById('wRole').value=w.funcao;
      document.getElementById('wTeam').value=w.equipe;
      document.getElementById('wObra').value=w.obra;
    } else {
      document.getElementById('modalAddWorkerTitle').textContent='Novo Funcionário';
      document.getElementById('wEditId').value='';
      document.getElementById('wName').value='';
      document.getElementById('wRole').value='';
    }
    open('modalAddWorker');
  }

  function openMove(wid) {
    const s = State.get();
    const w = State.getWorker(wid);
    document.getElementById('moveWorkerId').value=wid;
    document.getElementById('moveWorkerName').textContent=w?w.nome:'';
    document.getElementById('moveObraSelect').innerHTML=s.obras
      .filter(o=>o!==(w?.obra))
      .map(o=>`<option value="${Utils.escapeHtml(o)}">${Utils.escapeHtml(o)}</option>`).join('');
    open('modalMove');
  }

  function openImport() {
    const s = State.get();
    document.getElementById('importObraSelect').innerHTML=s.obras.map(o=>`<option value="${Utils.escapeHtml(o)}" ${o===App.getObra()?'selected':''}>${Utils.escapeHtml(o)}</option>`).join('');
    document.getElementById('importEquipeSelect').innerHTML=s.equipes.map(e=>`<option value="${e.id}">${e.nome}</option>`).join('');
    document.getElementById('importText').value='';
    open('modalImport');
  }

  return { open, close, closeAll, openAddWorker, openMove, openImport };
})();
