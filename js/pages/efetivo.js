/* efetivo.js */
const EfetivoPage = (() => {
  let activeTeam = 'all';
  let sortCol    = null;    // 'nome' | 'equipe' | 'andar' | 'presente'
  let sortDir    = 'asc';   // 'asc' | 'desc'

  function init() { render(); }

  /* ── FILTRO DE EQUIPE ── */
  function setTeamFilter(team) {
    activeTeam = team;
    document.querySelectorAll('.filter-chip').forEach(c =>
      c.classList.toggle('active', c.dataset.team === team));
    renderList();
  }

  /* ── ORDENAÇÃO POR COLUNA ── */
  function setSort(col) {
    if (sortCol === col) {
      sortDir = sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      sortCol = col;
      sortDir = 'asc';
    }
    renderList();
    _updateSortHeaders();
  }

  function _sortWorkers(workers) {
    if (!sortCol) return workers;
    const date = App.getDate();
    const s = State.get();
    return [...workers].sort((a, b) => {
      let va, vb;
      if (sortCol === 'nome') {
        va = a.nome.toLowerCase();
        vb = b.nome.toLowerCase();
      } else if (sortCol === 'equipe') {
        const ea = State.getEquipe(a.equipe);
        const eb = State.getEquipe(b.equipe);
        va = (ea ? ea.nome : a.equipe).toLowerCase();
        vb = (eb ? eb.nome : b.equipe).toLowerCase();
      } else if (sortCol === 'andar') {
        const ia = s.andares.indexOf(State.getDayData(a.id, date).andar);
        const ib = s.andares.indexOf(State.getDayData(b.id, date).andar);
        va = ia === -1 ? 999 : ia;
        vb = ib === -1 ? 999 : ib;
      } else if (sortCol === 'presente') {
        va = State.getDayData(a.id, date).presente ? 0 : 1;
        vb = State.getDayData(b.id, date).presente ? 0 : 1;
      }
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ?  1 : -1;
      return 0;
    });
  }

  function _updateSortHeaders() {
    document.querySelectorAll('th[data-col]').forEach(th => {
      const col = th.dataset.col;
      const arrow = th.querySelector('.sort-arrow');
      if (!arrow) return;
      if (col === sortCol) {
        arrow.textContent = sortDir === 'asc' ? ' ↑' : ' ↓';
        th.style.color = 'var(--accent)';
      } else {
        arrow.textContent = ' ↕';
        th.style.color = '';
      }
    });
  }

  /* ── RENDER ── */
  function render() {
    renderTeamFilters();
    renderList();
    updateSummary();
  }

  function renderTeamFilters() {
    const s = State.get();
    const wrap = document.getElementById('teamFilters');
    if (!wrap) return;
    const teams = [{ id: 'all', nome: 'Todos' }, ...s.equipes];
    wrap.innerHTML = teams.map(t =>
      `<div class="filter-chip ${activeTeam === t.id ? 'active' : ''}" data-team="${t.id}"
         onclick="EfetivoPage.setTeamFilter('${t.id}')">${t.nome}</div>`
    ).join('');
  }

  function renderList() {
    const s = State.get();
    const date = App.getDate();
    const obra = App.getObra();

    let workers = s.workers.filter(w => w.obra === obra);
    if (activeTeam !== 'all') workers = workers.filter(w => w.equipe === activeTeam);
    workers = _sortWorkers(workers);

    /* ── MOBILE: cards ── */
    const list = document.getElementById('workerList');
    if (list) {
      if (!workers.length) {
        list.innerHTML = `<div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
          <span>Nenhum funcionário.<br>Toque em <strong>+ Add</strong> para cadastrar.</span>
        </div>`;
        updateSummary(); return;
      }
      const andarOpts = ['', ...s.andares].map(a =>
        `<option value="${Utils.escapeHtml(a)}">${Utils.escapeHtml(a) || '— Selecionar local —'}</option>`
      ).join('');

      list.innerHTML = workers.map(w => {
        const dd = State.getDayData(w.id, date);
        const eq = State.getEquipe(w.equipe);
        const cor = eq ? eq.cor : '#8b92b0';
        const absent = !dd.presente;
        const tags = (dd.tarefas || []).map(t =>
          `<span class="activity-tag">${Utils.escapeHtml(t)}<button onclick="EfetivoPage.removeTag('${w.id}','${t.replace(/'/g, "\\'")}')">×</button></span>`
        ).join('');
        const tarefaOpts = s.tarefas.filter(t => !(dd.tarefas || []).includes(t))
          .map(t => `<option value="${Utils.escapeHtml(t)}">${Utils.escapeHtml(t)}</option>`).join('');
        const andarSel = andarOpts.replace(
          `value="${Utils.escapeHtml(dd.andar)}"`,
          `value="${Utils.escapeHtml(dd.andar)}" selected`
        );
        return `<div class="worker-card ${absent ? 'absent' : ''}" id="wcard-${w.id}">
          <div class="worker-card-top">
            <label class="presence-toggle">
              <input type="checkbox" ${dd.presente ? 'checked' : ''}
                onchange="EfetivoPage.togglePresence('${w.id}',this.checked)">
              <span class="presence-slider"></span>
            </label>
            <div class="worker-info">
              <div class="worker-name">${Utils.escapeHtml(w.nome)}</div>
              <div class="worker-role">${Utils.escapeHtml(w.funcao)}</div>
            </div>
            <span class="team-badge" style="background:${cor}22;color:${cor};border:1px solid ${cor}44">
              ${Utils.escapeHtml(eq ? eq.nome : w.equipe)}
            </span>
            <div class="worker-card-actions">
              <button class="icon-btn" onclick="Modals.openAddWorker('${w.id}')">✏️</button>
              <button class="icon-btn danger" onclick="FuncionariosPage.remove('${w.id}')">✕</button>
            </div>
          </div>
          <div class="worker-card-body ${absent ? 'hidden' : ''}" id="wbody-${w.id}">
            <div>
              <div class="field-label">Andar / Local</div>
              <select class="inline-select" onchange="EfetivoPage.setAndar('${w.id}',this.value)">${andarSel}</select>
            </div>
            <div>
              <div class="field-label">Atividades</div>
              <div class="activity-tags" id="tags-${w.id}">${tags}</div>
              <div class="add-activity-row">
                <select class="inline-select" id="actsel-${w.id}">
                  <option value="">+ Adicionar atividade</option>${tarefaOpts}
                </select>
                <button class="add-btn" onclick="EfetivoPage.addTag('${w.id}')">+</button>
              </div>
            </div>
          </div>
        </div>`;
      }).join('');
    }

    /* ── DESKTOP: table ── */
    const tbody = document.getElementById('workerTableBody');
    if (tbody) {
      if (!workers.length) {
        tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state" style="padding:32px">
          Nenhum funcionário para esta obra/equipe.
        </div></td></tr>`;
        updateSummary(); return;
      }
      const andarOpts2 = ['', ...s.andares].map(a =>
        `<option value="${Utils.escapeHtml(a)}">${Utils.escapeHtml(a) || '— Selecionar local —'}</option>`
      ).join('');

      tbody.innerHTML = workers.map(w => {
        const dd = State.getDayData(w.id, date);
        const eq = State.getEquipe(w.equipe);
        const cor = eq ? eq.cor : '#8b92b0';
        const absent = !dd.presente;
        const tags = (dd.tarefas || []).map(t =>
          `<span class="activity-tag" style="margin:2px">${Utils.escapeHtml(t)}<button onclick="EfetivoPage.removeTag('${w.id}','${t.replace(/'/g, "\\'")}')">×</button></span>`
        ).join('');
        const tarefaOpts = s.tarefas.filter(t => !(dd.tarefas || []).includes(t))
          .map(t => `<option value="${Utils.escapeHtml(t)}">${Utils.escapeHtml(t)}</option>`).join('');
        const andarSel = andarOpts2.replace(
          `value="${Utils.escapeHtml(dd.andar)}"`,
          `value="${Utils.escapeHtml(dd.andar)}" selected`
        );
        return `<tr id="wrow-${w.id}" class="${absent ? 'absent' : ''}">
          <td>
            <label class="presence-toggle">
              <input type="checkbox" ${dd.presente ? 'checked' : ''}
                onchange="EfetivoPage.togglePresence('${w.id}',this.checked)">
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
              onchange="EfetivoPage.setAndar('${w.id}',this.value)"
              style="min-width:160px">${andarSel}</select>
          </td>
          <td>
            <div style="display:flex;flex-wrap:wrap;gap:3px;margin-bottom:5px" id="tags-${w.id}">${tags}</div>
            ${!absent ? `<div style="display:flex;gap:5px;align-items:center">
              <select class="inline-select" id="actsel-${w.id}" style="min-width:180px">
                <option value="">+ Adicionar atividade</option>${tarefaOpts}
              </select>
              <button class="add-btn" style="width:32px;height:32px;font-size:16px;flex-shrink:0"
                onclick="EfetivoPage.addTag('${w.id}')">+</button>
            </div>` : ''}
          </td>
          <td>
            <div style="display:flex;gap:4px">
              <button class="icon-btn" title="Editar" onclick="Modals.openAddWorker('${w.id}')">✏️</button>
              <button class="icon-btn" title="Mover" onclick="Modals.openMove('${w.id}')">↗</button>
              <button class="icon-btn danger" title="Remover" onclick="FuncionariosPage.remove('${w.id}')">✕</button>
            </div>
          </td>
        </tr>`;
      }).join('');
    }

    updateSummary();
    App.updateTopbar();
    _updateSortHeaders();
  }

  function togglePresence(wid, checked) {
    State.setDayField(wid, 'presente', checked);
    // mobile card
    const card = document.getElementById('wcard-' + wid);
    const body = document.getElementById('wbody-' + wid);
    if (card) card.classList.toggle('absent', !checked);
    if (body) body.classList.toggle('hidden', !checked);
    // desktop row
    const row = document.getElementById('wrow-' + wid);
    if (row) {
      row.classList.toggle('absent', !checked);
      row.querySelectorAll('select').forEach(s => s.disabled = !checked);
    }
    updateSummary();
    App.updateTopbar();
  }

  function setAndar(wid, val) { State.setDayField(wid, 'andar', val); }

  function addTag(wid) {
    const sel = document.getElementById('actsel-' + wid);
    if (!sel || !sel.value) return;
    const tarefa = sel.value;
    const dd = State.getDayData(wid, App.getDate());
    const tarefas = [...(dd.tarefas || [])];
    if (!tarefas.includes(tarefa)) {
      tarefas.push(tarefa);
      State.setDayField(wid, 'tarefas', tarefas);
    }
    const tagsEl = document.getElementById('tags-' + wid);
    if (tagsEl) tagsEl.innerHTML = tarefas.map(t =>
      `<span class="activity-tag" style="margin:2px">${Utils.escapeHtml(t)}<button onclick="EfetivoPage.removeTag('${wid}','${t.replace(/'/g, "\\'")}')">×</button></span>`
    ).join('');
    const opt = sel.querySelector(`option[value="${CSS.escape(tarefa)}"]`);
    if (opt) opt.remove();
    else { const opts = Array.from(sel.options).find(o => o.value === tarefa); if (opts) opts.remove(); }
    sel.value = '';
  }

  function removeTag(wid, tarefa) {
    const dd = State.getDayData(wid, App.getDate());
    const tarefas = (dd.tarefas || []).filter(t => t !== tarefa);
    State.setDayField(wid, 'tarefas', tarefas);
    const tagsEl = document.getElementById('tags-' + wid);
    if (tagsEl) tagsEl.innerHTML = tarefas.map(t =>
      `<span class="activity-tag" style="margin:2px">${Utils.escapeHtml(t)}<button onclick="EfetivoPage.removeTag('${wid}','${t.replace(/'/g, "\\'")}')">×</button></span>`
    ).join('');
    const sel = document.getElementById('actsel-' + wid);
    if (sel) { const opt = document.createElement('option'); opt.value = tarefa; opt.textContent = tarefa; sel.appendChild(opt); }
  }

  function updateSummary() {
    const s = State.get();
    const date = App.getDate();
    const obra = App.getObra();
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
    const presentes = workers.filter(w => State.getDayData(w.id, date).presente);

    let txt = `EFETIVO – ${obra.toUpperCase()}\n`;
    txt += `Data: ${Utils.formatLong(d)}\n`;
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
      txt += `Produção de Alvenaria Estrutural – ${ref}:\n* ${p.alvEstM2 || 0} m2 executados\n* ${p.alvEstPor || 0} m2 por bloqueiro\n`;
    }
    if (p.alvVedM2 !== undefined && p.alvVedM2 !== '') {
      const ref = p.dataAlvVed ? Utils.formatPT(p.dataAlvVed) : '–';
      txt += `Produção de Alvenaria de Vedação – ${ref}:\n* ${p.alvVedM2 || 0} m2 executados\n* ${p.alvVedPor || 0} m2 por pedreiro\n`;
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

    const byAndar = {};
    presentes.forEach(w => {
      const dd = State.getDayData(w.id, date);
      const andar = dd.andar || 'SEM LOCAL DEFINIDO';
      if (!byAndar[andar]) byAndar[andar] = { tarefas: new Set(), workers: [] };
      byAndar[andar].workers.push(w);
      (dd.tarefas || []).forEach(t => byAndar[andar].tarefas.add(t));
    });
    const ordered = [
      ...s.andares.filter(a => byAndar[a]),
      ...Object.keys(byAndar).filter(a => !s.andares.includes(a)),
    ];
    ordered.forEach(andar => {
      const grp = byAndar[andar];
      txt += `${andar.toUpperCase()}\n`;
      if (grp.tarefas.size > 0) { txt += `Atividades:\n`; grp.tarefas.forEach(t => { txt += `* ${t}\n`; }); }
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
    Utils.copyToClipboard(buildReportText(), 'Copiado! Cole no WhatsApp.');
  }

  async function gerar() {
    const s = State.get();
    const date = App.getDate();
    const obra = App.getObra();
    const texto = buildReportText();
    const workers = s.workers.filter(w => w.obra === obra);
    const presentes = workers.filter(w => State.getDayData(w.id, date).presente);
    State.addHistorico({ ts: Date.now(), data: date, obra, texto, total: presentes.length });
    workers.forEach(w => State.updateAttendance(w.id, State.getDayData(w.id, date).presente));
    document.getElementById('previewText').textContent = texto;
    Modals.open('modalPreview');
    Utils.toast('Relatório salvo!', 'success');
    if (s.gsUrl) {
      await Sheets.send(date, obra, texto, workers.map(w => ({
        nome: w.nome, funcao: w.funcao,
        equipe: (State.getEquipe(w.equipe) || {}).nome || w.equipe,
        presente: State.getDayData(w.id, date).presente,
        andar: State.getDayData(w.id, date).andar,
        tarefas: (State.getDayData(w.id, date).tarefas || []).join('; '),
      })));
    }
    App.updateTopbar();
  }

  return {
    init, render, renderList, renderTeamFilters,
    setTeamFilter, setSort,
    togglePresence, setAndar, addTag, removeTag,
    updateSummary, buildReportText, preview, copyReport, gerar,
  };
})();
