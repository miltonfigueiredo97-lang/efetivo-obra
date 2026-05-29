/* funcionarios.js + relatorios + historico + producao */

/* ── FUNCIONÁRIOS ── */
const FuncionariosPage = (() => {
  function render() {
    const s = State.get();
    const obra = App.getObra();
    const q = (document.getElementById('workerSearch')?.value||'').toLowerCase();
    let workers = s.workers;
    if (q) workers = workers.filter(w => w.nome.toLowerCase().includes(q) || w.funcao.toLowerCase().includes(q));

    const list = document.getElementById('funcList');
    if (!list) return;
    if (!workers.length) {
      list.innerHTML = `<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span>Nenhum funcionário encontrado.</span></div>`;
      return;
    }
    list.innerHTML = workers.map(w => {
      const eq = State.getEquipe(w.equipe);
      const cor = eq ? eq.cor : '#8b92b0';
      return `<div class="func-card">
        <div class="func-info">
          <div class="func-name">${Utils.escapeHtml(w.nome)}</div>
          <div class="func-meta">
            <span class="team-badge" style="background:${cor}22;color:${cor};border:1px solid ${cor}44;font-size:10px;padding:2px 7px">${Utils.escapeHtml(eq?eq.nome:w.equipe)}</span>
            &nbsp;${Utils.escapeHtml(w.funcao)} · ${Utils.escapeHtml(w.obra)}
          </div>
        </div>
        <div class="func-actions">
          <button class="icon-btn" onclick="Modals.openAddWorker('${w.id}')">✏️</button>
          <button class="icon-btn" onclick="Modals.openMove('${w.id}')">↗</button>
          <button class="icon-btn danger" onclick="FuncionariosPage.remove('${w.id}')">✕</button>
        </div>
      </div>`;
    }).join('');
    App.updateTopbar();
  }

  function saveWorker() {
    const nome   = document.getElementById('wName').value.trim();
    const funcao = document.getElementById('wRole').value.trim();
    const equipe = document.getElementById('wTeam').value;
    const obra   = document.getElementById('wObra').value;
    const editId = document.getElementById('wEditId').value;
    if (!nome||!funcao) { Utils.toast('Preencha nome e função.','warn'); return; }
    if (editId) { State.updateWorker(editId,{nome,funcao,equipe,obra}); Utils.toast('Atualizado!','success'); }
    else { State.addWorker({nome,funcao,equipe,obra}); Utils.toast(`${nome} adicionado!`,'success'); }
    Modals.close('modalAddWorker');
    render(); EfetivoPage.render();
  }

  function remove(id) {
    const w = State.getWorker(id);
    if (!w||!confirm(`Remover "${w.nome}"?`)) return;
    State.removeWorker(id); render(); EfetivoPage.render();
    Utils.toast('Removido.','info');
  }

  function confirmMove() {
    const id   = document.getElementById('moveWorkerId').value;
    const obra = document.getElementById('moveObraSelect').value;
    State.updateWorker(id,{obra});
    Modals.close('modalMove'); render(); EfetivoPage.render();
    Utils.toast(`Movido para ${obra}.`,'success');
  }

  function importWorkers() {
    const text  = document.getElementById('importText').value.trim();
    const obra  = document.getElementById('importObraSelect').value;
    const equipe= document.getElementById('importEquipeSelect').value;
    if (!text) { Utils.toast('Cole a lista.','warn'); return; }
    let count = 0;
    text.split('\n').filter(l=>l.trim()).forEach(line => {
      const parts = line.split(/–|-/).map(p=>p.trim());
      const nome = parts[0]; const funcao = parts[1]||'Ajudante';
      if (nome) { State.addWorker({nome,funcao,equipe,obra}); count++; }
    });
    Modals.close('modalImport'); render(); EfetivoPage.render();
    Utils.toast(`${count} funcionários importados!`,'success');
  }

  return { render, saveWorker, remove, confirmMove, importWorkers };
})();

/* ── RELATÓRIOS / DESEMPENHO ── */
const RelatoriosPage = (() => {
  function render() {
    const s = State.get();
    const obra = App.getObra();
    const att  = s.attendance || {};
    const workers = s.workers.filter(w => w.obra === obra);
    const date = App.getDate();
    const hoje = workers.filter(w => State.getDayData(w.id, date).presente).length;
    const totalRel = s.historico.filter(h => h.obra === obra).length;
    const avgAss = workers.length === 0 ? 0 : Math.round(
      workers.reduce((sum,w) => {
        const a = att[w.id];
        return sum + (a&&a.total>0 ? (a.dias/a.total)*100 : 100);
      }, 0) / workers.length);

    const el = document.getElementById('relatoriosContent');
    el.innerHTML = `
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-label">Funcionários</div><div class="stat-value">${workers.length}</div><div class="stat-desc">na obra</div></div>
        <div class="stat-card"><div class="stat-label">Hoje</div><div class="stat-value" style="color:var(--green)">${hoje}</div><div class="stat-desc">presentes</div></div>
        <div class="stat-card"><div class="stat-label">Relatórios</div><div class="stat-value">${totalRel}</div><div class="stat-desc">gerados</div></div>
        <div class="stat-card"><div class="stat-label">Assiduidade</div>
          <div class="stat-value" style="color:${avgAss>=90?'var(--green)':avgAss>=75?'var(--accent)':'var(--red)'}">${avgAss}%</div>
          <div class="stat-desc">média equipe</div>
        </div>
      </div>
      <div class="att-list">
        ${workers.length===0
          ? `<div class="empty-state"><span>Sem dados registrados ainda.</span></div>`
          : workers.map(w => {
              const a = att[w.id]||{dias:0,total:0};
              const pct = a.total>0 ? Math.round((a.dias/a.total)*100) : 100;
              const cls = pct>=90?'good':pct>=75?'warn':'danger';
              const cor = pct>=90?'var(--green)':pct>=75?'var(--accent)':'var(--red)';
              const eq = State.getEquipe(w.equipe);
              const ecor = eq?eq.cor:'#8b92b0';
              return `<div class="att-card">
                <div class="att-top">
                  <div class="att-info">
                    <div class="att-name">${Utils.escapeHtml(w.nome)}</div>
                    <div class="att-role">
                      <span class="team-badge" style="background:${ecor}22;color:${ecor};border:1px solid ${ecor}44;font-size:10px;padding:2px 7px">${Utils.escapeHtml(eq?eq.nome:w.equipe)}</span>
                      &nbsp;${Utils.escapeHtml(w.funcao)}
                    </div>
                  </div>
                  <div class="att-pct" style="color:${cor}">${pct}%</div>
                </div>
                <div class="bar-wrap">
                  <div class="bar-bg"><div class="bar-fill ${cls}" style="width:${pct}%"></div></div>
                  <span class="bar-label">${a.dias}/${a.total}</span>
                </div>
              </div>`;
            }).join('')
        }
      </div>
      <div style="height:20px"></div>`;
  }
  return { render };
})();

/* ── HISTÓRICO ── */
const HistoricoPage = (() => {
  let currentDetail = '';
  function render() {
    const s = State.get();
    const obra = App.getObra();
    const hist = s.historico.filter(h => h.obra === obra);
    const el = document.getElementById('historicoContent');
    if (!hist.length) {
      el.innerHTML = `<div class="empty-state" style="padding:60px 20px">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:48px;height:48px;opacity:.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span>Nenhum relatório gerado ainda.</span>
      </div>`;
      return;
    }
    el.innerHTML = `<div class="hist-list">
      ${hist.map((h,i) => {
        const d = Utils.dateFromStr(h.data);
        return `<div class="hist-card" onclick="HistoricoPage.openDetail(${i})">
          <div class="hist-date-block">
            <div class="hist-day">${String(d.getDate()).padStart(2,'0')}</div>
            <div class="hist-month">${['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'][d.getMonth()]}</div>
          </div>
          <div class="hist-info">
            <div class="hist-obra">${Utils.escapeHtml(h.obra)}</div>
            <div class="hist-weekday">${Utils.weekdayOf(h.data)}</div>
            <div class="hist-total">👷 ${h.total} trabalhadores</div>
          </div>
          <div class="hist-arrow">›</div>
        </div>`;
      }).join('')}
    </div><div style="height:20px"></div>`;
  }
  function openDetail(i) {
    const s = State.get();
    const hist = s.historico.filter(h => h.obra === App.getObra());
    const h = hist[i];
    if (!h) return;
    currentDetail = h.texto;
    document.getElementById('historicoDetailTitle').textContent = `Efetivo – ${Utils.formatPT(h.data)}`;
    document.getElementById('historicoDetailText').textContent = h.texto;
    Modals.open('modalHistorico');
  }
  function copyDetail() { Utils.copyToClipboard(currentDetail,'Copiado!'); }
  return { render, openDetail, copyDetail };
})();

/* ── PRODUÇÃO ── */
const ProducaoPage = (() => {
  function render() {
    const el = document.getElementById('producaoContent');
    el.innerHTML = `
      <div class="prod-section">
        <div class="prod-section-title">📐 Informações Gerais</div>
        <div class="prod-grid">
          <div class="form-group"><label>Área Alv. Estrutural (m2/andar)</label><input class="form-input" id="pAreaAlv" placeholder="554,75" style="font-family:'JetBrains Mono',monospace"></div>
          <div class="form-group"><label>Área da Laje (m2)</label><input class="form-input" id="pAreaLaje" placeholder="557,58" style="font-family:'JetBrains Mono',monospace"></div>
          <div class="form-group"><label>Volume Graute (m3/andar)</label><input class="form-input" id="pVolGraute" placeholder="17,67" style="font-family:'JetBrains Mono',monospace"></div>
          <div class="form-group"><label>Volume Argamassa (m3/andar)</label><input class="form-input" id="pVolArg" placeholder="1,89" style="font-family:'JetBrains Mono',monospace"></div>
          <div class="form-group"><label>Volume Concreto (m3/andar)</label><input class="form-input" id="pVolConc" placeholder="103,49" style="font-family:'JetBrains Mono',monospace"></div>
          <div class="form-group"><label>Aço Alv. Estrutural (kg)</label><input class="form-input" id="pAcoAlv" placeholder="2.789" style="font-family:'JetBrains Mono',monospace"></div>
          <div class="form-group"><label>Aço Lajes e Vigas (kg)</label><input class="form-input" id="pAcoLaje" placeholder="4.051" style="font-family:'JetBrains Mono',monospace"></div>
        </div>
      </div>
      <div class="prod-section">
        <div class="prod-section-title">🧱 Alvenaria Estrutural</div>
        <div class="prod-grid">
          <div class="form-group"><label>Data Referência</label><input class="form-input" type="date" id="pDataAlvEst"></div>
          <div></div>
          <div class="form-group"><label>m2 Executados</label><input class="form-input" type="number" id="pAlvEstM2" placeholder="0"></div>
          <div class="form-group"><label>m2 por Bloqueiro</label><input class="form-input" type="number" id="pAlvEstPor" placeholder="0"></div>
        </div>
      </div>
      <div class="prod-section">
        <div class="prod-section-title">🏗 Alvenaria de Vedação</div>
        <div class="prod-grid">
          <div class="form-group"><label>Data Referência</label><input class="form-input" type="date" id="pDataAlvVed"></div>
          <div></div>
          <div class="form-group"><label>m2 Executados</label><input class="form-input" type="number" id="pAlvVedM2" placeholder="0"></div>
          <div class="form-group"><label>m2 por Pedreiro</label><input class="form-input" type="number" id="pAlvVedPor" placeholder="0"></div>
        </div>
      </div>
      <div class="prod-section">
        <div class="prod-section-title">🚧 Concretagens Programadas</div>
        <div class="form-group"><textarea class="form-input" id="pConcretagens" rows="3" placeholder="Descreva ou deixe em branco."></textarea></div>
      </div>
      <div class="prod-section">
        <div class="prod-section-title">👷 Administração e Apoio</div>
        <div class="prod-grid">
          <div class="form-group"><label>Mestre de Obras</label><input class="form-input" id="pMestre"></div>
          <div class="form-group"><label>Engenheiro</label><input class="form-input" id="pEngenheiro"></div>
          <div class="form-group"><label>Encarregado Civil</label><input class="form-input" id="pEncarregado"></div>
          <div class="form-group"><label>Almoxarife</label><input class="form-input" id="pAlmoxarife"></div>
          <div class="form-group"><label>Assistente Eng.</label><input class="form-input" id="pAssistente"></div>
          <div class="form-group"><label>Administrativo</label><input class="form-input" id="pAdministrativo"></div>
        </div>
      </div>`;
    loadFields();
  }

  const MAP = {
    pAreaAlv:'areaAlv',pAreaLaje:'areaLaje',pVolGraute:'volGraute',pVolArg:'volArg',
    pVolConc:'volConc',pAcoAlv:'acoAlv',pAcoLaje:'acoLaje',
    pDataAlvEst:'dataAlvEst',pAlvEstM2:'alvEstM2',pAlvEstPor:'alvEstPor',
    pDataAlvVed:'dataAlvVed',pAlvVedM2:'alvVedM2',pAlvVedPor:'alvVedPor',
    pConcretagens:'concretagens',pMestre:'mestre',pEngenheiro:'engenheiro',
    pEncarregado:'encarregado',pAlmoxarife:'almoxarife',pAssistente:'assistente',
    pAdministrativo:'administrativo',
  };

  function loadFields() {
    const p = State.get().producao[App.getDate()]||{};
    Object.entries(MAP).forEach(([id,key]) => { const el=document.getElementById(id); if(el) el.value=p[key]||''; });
  }

  function salvar() {
    const fields = {};
    Object.entries(MAP).forEach(([id,key]) => { const el=document.getElementById(id); if(el) fields[key]=el.value; });
    State.saveProducao(App.getDate(), fields);
    Utils.toast('Dados de produção salvos!','success');
  }

  return { render, loadFields, salvar };
})();
