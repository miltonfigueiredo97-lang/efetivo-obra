/* ═══════════════════════════════════════════
   pages/efetivo.js – Página principal do dia
   ═══════════════════════════════════════════ */

const EfetivoPage = (() => {
  let activeTeam = 'all';

  function init() {
    document.getElementById('datePicker').addEventListener('change', onDateChange);
    render();
  }

  function onDateChange() {
    const val = document.getElementById('datePicker').value;
    App.setDate(val);
  }

  function setTeamFilter(team) {
    activeTeam = team;
    renderTeamFilters();
    renderTable();
  }

  function renderTeamFilters() {
    const s = State.get();
    const wrap = document.getElementById('teamFilters');
    const teams = [{ id: 'all', nome: 'Todos', cor: '#8b92b0' }, ...s.equipes];
    wrap.innerHTML = teams.map(t => `
      <div class="filter-chip ${activeTeam === t.id ? 'active' : ''}" onclick="EfetivoPage.setTeamFilter('${t.id}')">
        ${t.nome}
      </div>
    `).join('');
  }

  function render() {
    renderTeamFilters();
    renderTable();
    updateSummary();
  }

  function renderTable() {
    const s = State.get();
    const date = App.getDate();
    const obra = App.getObra();

    let workers = s.workers.filter(w => w.obra === obra);
    if (activeTeam !== 'all') {
      workers = workers.filter(w => w.equipe === activeTeam);
    }

    const tbody = document.getElementById('workerTableBody');

    if (workers.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6"><div class="empty-state">
        Nenhum funcionário para esta obra/equipe.<br>
        <button class="btn btn-ghost" style="margin-top:12px" onclick="Modals.openAddWorker()">+ Adicionar funcionário</button>
      </div></td></tr>`;
      return;
    }

    const andarOpts = ['', ...s.andares]
      .map(a => `<option value="${Utils.escapeHtml(a)}">${Utils.escapeHtml(a) || '— Selecionar local —'}</option>`)
      .join('');

    tbody.innerHTML = workers.map(w => {
      const dd = State.getDayData(w.id, date);
      const eq = State.getEquipe(w.equipe);
      const cor = eq ? eq.cor : '#8b92b0';
      const absent = !dd.presente;
      const selTarefas = dd.tarefas || [];

      const actTags = selTarefas.map(t =>
        `<span class="activity-tag">${Utils.escapeHtml(t)}<button onclick="EfetivoPage.removeTag('${w.id}','${t.replace(/'/g,"\\'")}')" title="Remover">×</button></span>`
      ).join('');

      const tarefaOpts = s.tarefas
        .filter(t => !selTarefas.includes(t))
        .map(t => `<option value="${Utils.escapeHtml(t)}">${Utils.escapeHtml(t)}</option>`)
        .join('');

      const andarSelected = andarOpts.replace(`value="${Utils.escapeHtml(dd.andar)}"`, `value="${Utils.escapeHtml(dd.andar)}" selected`);

      return `
      <tr id="row-${w.id}" class="${absent ? 'absent' : ''}">
        <td>
          <label class="presence-toggle" title="${absent ? 'Marcar presente' : 'Marcar ausente'}">
            <input type="checkbox" ${dd.presente ? 'checked' : ''}
              onchange="EfetivoPage.togglePresence('${w.id}', this.checked)">
            <span class="presence-slider"></span>
          </label>
        </td>
        <td>
          <div class="worker-name">${Utils.escapeHtml(w.nome)}</div>
          <div class="worker-role">${Utils.escapeHtml(w.funcao)}</div>
        </td>
        <td>
          <span class="team-badge" style="background:${cor}22;color:${cor};border:1px solid ${cor}44">
            ${Utils.escapeHtml(eq ? eq.nome : w.equipe)}
          </span>
        </td>
        <td>
          <select class="inline-select" ${absent ? 'disabled' : ''}
            onchange="EfetivoPage.setAndar('${w.id}', this.value)">
            ${andarSelected}
          </select>
        </td>
        <td>
          <div class="activity-tags" id="tags-${w.id}">${actTags}</div>
          ${!absent ? `
          <div class="add-activity-wrap" id="addact-${w.id}">
            <select class="inline-select" id="actsel-${w.id}">
              <option value="">+ Adicionar atividade</option>
              ${tarefaOpts}
            </select>
            <button class="add-activity-btn" onclick="EfetivoPage.addTag('${w.id}')" title="Adicionar">+</button>
          </div>` : ''}
        </td>
        <td>
          <div class="table-actions">
            <button class="icon-btn" title="Editar" onclick="Modals.openAddWorker('${w.id}')">✏️</button>
            <button class="icon-btn" title="Mover de obra" onclick="Modals.openMove('${w.id}')">↗</button>
            <button class="icon-btn danger" title="Remover" onclick="FuncionariosPage.remove('${w.id}')">✕</button>
          </div>
        </td>
      </tr>`;
    }).join('');
  }

  function togglePresence(workerId, checked) {
    State.setDayField(workerId, 'presente', checked);
    const row = document.getElementById('row-' + workerId);
    if (row) {
      row.classList.toggle('absent', !checked);
      row.querySelectorAll('select:not(.presence-toggle select)').forEach(s => s.disabled = !checked);
      const addact = document.getElementById('addact-' + workerId);
      if (addact) addact.style.display = checked ? '' : 'none';
    }
    updateSummary();
    App.updateTopbar();
  }

  function setAndar(workerId, valor) {
    State.setDayField(workerId, 'andar', valor);
  }

  function addTag(workerId) {
    const sel = document.getElementById('actsel-' + workerId);
    if (!sel || !sel.value) return;
    const tarefa = sel.value;
    const dd = State.getDayData(workerId, App.getDate());
    const tarefas = dd.tarefas || [];
    if (!tarefas.includes(tarefa)) {
      tarefas.push(tarefa);
      State.setDayField(workerId, 'tarefas', tarefas);
    }
    // Re-render just this worker's tags
    const s = State.get();
    const newTarefas = (State.getDayData(workerId, App.getDate()).tarefas || []);
    const tagsEl = document.getElementById('tags-' + workerId);
    if (tagsEl) {
      tagsEl.innerHTML = newTarefas.map(t =>
        `<span class="activity-tag">${Utils.escapeHtml(t)}<button onclick="EfetivoPage.removeTag('${workerId}','${t.replace(/'/g,"\\'")}')">×</button></span>`
      ).join('');
    }
    // Update select options
    const remaining = s.tarefas.filter(t => !newTarefas.includes(t));
    sel.innerHTML = `<option value="">+ Adicionar atividade</option>` + remaining.map(t =>
      `<option value="${Utils.escapeHtml(t)}">${Utils.escapeHtml(t)}</option>`
    ).join('');
    sel.value = '';
  }

  function removeTag(workerId, tarefa) {
    const dd = State.getDayData(workerId, App.getDate());
    const tarefas = (dd.tarefas || []).filter(t => t !== tarefa);
    State.setDayField(workerId, 'tarefas', tarefas);
    // Re-render tags
    const s = State.get();
    const tagsEl = document.getElementById('tags-' + workerId);
    if (tagsEl) {
      tagsEl.innerHTML = tarefas.map(t =>
        `<span class="activity-tag">${Utils.escapeHtml(t)}<button onclick="EfetivoPage.removeTag('${workerId}','${t.replace(/'/g,"\\'")}')">×</button></span>`
      ).join('');
    }
    // Restore option in select
    const sel = document.getElementById('actsel-' + workerId);
    if (sel) {
      const opt = document.createElement('option');
      opt.value = tarefa;
      opt.textContent = tarefa;
      sel.appendChild(opt);
    }
  }

  function updateSummary() {
    const s = State.get();
    const obra = App.getObra();
    const date = App.getDate();
    const workers = s.workers.filter(w => w.obra === obra);
    let presentes = 0;
    workers.forEach(w => { if (State.getDayData(w.id, date).presente) presentes++; });
    const ausentes = workers.length - presentes;
    document.getElementById('pillPresentes').textContent = `${presentes} presentes`;
    document.getElementById('pillAusentes').textContent  = `${ausentes} ausentes`;
    document.getElementById('pillTotal').textContent     = `${workers.length} total`;
  }

  function buildReportText() {
    const s = State.get();
    const date = App.getDate();
    const obra = App.getObra();
    const p = s.producao[date] || {};
    const d = Utils.dateFromStr(date);

    const workers = s.workers.filter(w => w.obra === obra);

    let txt = '';
    txt += `EFETIVO – ${obra.toUpperCase()}\n`;
    txt += `Data: ${Utils.formatLong(d)}\n`;

    // Produção
    txt += `INFORMAÇÕES IMPORTANTES DA PRODUÇÃO\n`;
    if (p.areaAlv)   txt += `* Área de Alvenaria Estrutural: ${p.areaAlv} m2/andar\n`;
    if (p.areaLaje)  txt += `* Área da Laje: ${p.areaLaje} m2\n`;
    if (p.volGraute) txt += `* Volume de Graute: ${p.volGraute} m3/andar\n`;
    if (p.volArg)    txt += `* Volume de Argamassa: ${p.volArg} m3/andar\n`;
    if (p.volConc)   txt += `* Volume de Concreto: ${p.volConc} m3/andar\n`;
    if (p.acoAlv)    txt += `* Aço Alvenaria Estrutural: ${p.acoAlv} kg\n`;
    if (p.acoLaje)   txt += `* Aço Lajes e Vigas: ${p.acoLaje} kg\n`;

    if (p.alvEstM2 !== undefined && p.alvEstM2 !== '') {
      const ref = p.dataAlvEst ? Utils.formatPT(p.dataAlvEst) : '–';
      txt += `Produção de Alvenaria Estrutural – ${ref}:\n`;
      txt += `* ${p.alvEstM2 || 0} m2 executados\n`;
      txt += `* ${p.alvEstPor || 0} m2 por bloqueiro\n`;
    }
    if (p.alvVedM2 !== undefined && p.alvVedM2 !== '') {
      const ref = p.dataAlvVed ? Utils.formatPT(p.dataAlvVed) : '–';
      txt += `Produção de Alvenaria de Vedação – ${ref}:\n`;
      txt += `* ${p.alvVedM2 || 0} m2 executados\n`;
      txt += `* ${p.alvVedPor || 0} m2 por pedreiro\n`;
    }

    txt += `CONCRETAGENS PROGRAMADAS\n`;
    txt += p.concretagens ? `* ${p.concretagens}\n` : `* Não há concretagens programadas registradas nos dados atuais.\n`;

    txt += `ADMINISTRAÇÃO E APOIO\n`;
    if (p.mestre)         txt += `* Mestre de Obras – ${p.mestre}\n`;
    if (p.engenheiro)     txt += `* Engenheiro de Obra – ${p.engenheiro}\n`;
    if (p.encarregado)    txt += `* Encarregado Civil – ${p.encarregado}\n`;
    if (p.almoxarife)     txt += `* Almoxarife – ${p.almoxarife}\n`;
    if (p.assistente)     txt += `* Assistente Engenharia – ${p.assistente}\n`;
    if (p.administrativo) txt += `* Administrativo de Obra – ${p.administrativo}\n`;

    // Group presentes by andar
    const presentes = workers.filter(w => State.getDayData(w.id, date).presente);
    const byAndar = {};

    presentes.forEach(w => {
      const dd = State.getDayData(w.id, date);
      const andar = dd.andar || 'SEM LOCAL DEFINIDO';
      if (!byAndar[andar]) byAndar[andar] = { tarefas: new Set(), workers: [] };
      byAndar[andar].workers.push(w);
      (dd.tarefas || []).forEach(t => byAndar[andar].tarefas.add(t));
    });

    // Order by state.andares order
    const ordered = [
      ...s.andares.filter(a => byAndar[a]),
      ...Object.keys(byAndar).filter(a => !s.andares.includes(a)),
    ];

    ordered.forEach(andar => {
      const grp = byAndar[andar];
      if (!grp) return;
      txt += `${andar.toUpperCase()}\n`;
      if (grp.tarefas.size > 0) {
        txt += `Atividades:\n`;
        grp.tarefas.forEach(t => { txt += `* ${t}\n`; });
      }
      txt += `Mão de obra:\n`;
      grp.workers.forEach(w => { txt += `* ${w.nome} – ${w.funcao}\n`; });
    });

    txt += `\nTOTAL DE TRABALHADORES EM OBRA: ${presentes.length}\n`;
    return txt;
  }

  function preview() {
    document.getElementById('previewText').textContent = buildReportText();
    Modals.open('modalPreview');
  }

  function copyReport() {
    Utils.copyToClipboard(buildReportText(), 'Texto copiado! Cole no WhatsApp.');
  }

  async function gerar() {
    const s = State.get();
    const date = App.getDate();
    const obra = App.getObra();
    const texto = buildReportText();
    const workers = s.workers.filter(w => w.obra === obra);
    const presentes = workers.filter(w => State.getDayData(w.id, date).presente);

    // Save history
    State.addHistorico({
      ts: Date.now(),
      data: date,
      obra,
      texto,
      total: presentes.length,
    });

    // Update attendance
    workers.forEach(w => {
      State.updateAttendance(w.id, State.getDayData(w.id, date).presente);
    });

    // Preview + copy
    document.getElementById('previewText').textContent = texto;
    Modals.open('modalPreview');
    Utils.toast('Relatório salvo no histórico!', 'success');

    // Send to Sheets
    if (s.gsUrl) {
      await Sheets.send(date, obra, texto, workers.map(w => ({
        nome: w.nome,
        funcao: w.funcao,
        equipe: (State.getEquipe(w.equipe) || {}).nome || w.equipe,
        presente: State.getDayData(w.id, date).presente,
        andar: State.getDayData(w.id, date).andar,
        tarefas: (State.getDayData(w.id, date).tarefas || []).join('; '),
      })));
    }

    App.updateTopbar();
  }

  return { init, render, renderTable, renderTeamFilters, setTeamFilter, onDateChange, togglePresence, setAndar, addTag, removeTag, updateSummary, buildReportText, preview, copyReport, gerar };
})();
