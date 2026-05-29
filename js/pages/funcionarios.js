/* ═══════════════════════════════════════════
   pages/producao.js
   ═══════════════════════════════════════════ */

const ProducaoPage = (() => {
  const FIELDS = [
    { id: 'pAreaAlv',       label: 'Área Alvenaria Estrutural (m2/andar)', placeholder: '554,75' },
    { id: 'pAreaLaje',      label: 'Área da Laje (m2)',                    placeholder: '557,58' },
    { id: 'pVolGraute',     label: 'Volume de Graute (m3/andar)',           placeholder: '17,67'  },
    { id: 'pVolArg',        label: 'Volume de Argamassa (m3/andar)',        placeholder: '1,89'   },
    { id: 'pVolConc',       label: 'Volume de Concreto (m3/andar)',         placeholder: '103,49' },
    { id: 'pAcoAlv',        label: 'Aço Alvenaria Estrutural (kg)',         placeholder: '2.789'  },
    { id: 'pAcoLaje',       label: 'Aço Lajes e Vigas (kg)',                placeholder: '4.051'  },
  ];

  function render() {
    const el = document.getElementById('producaoContent');
    el.innerHTML = `
      <div class="prod-section">
        <div class="prod-section-title">📐 Informações Gerais da Produção</div>
        <div class="prod-grid">
          ${FIELDS.map(f => `
            <div class="form-group">
              <label>${f.label}</label>
              <input class="form-input" id="${f.id}" placeholder="${f.placeholder}" style="font-family:'JetBrains Mono',monospace">
            </div>`).join('')}
        </div>
      </div>
      <div class="prod-section">
        <div class="prod-section-title">🧱 Produção de Alvenaria Estrutural</div>
        <div class="prod-grid">
          <div class="form-group"><label>Data de Referência</label><input class="form-input" type="date" id="pDataAlvEst"></div>
          <div></div>
          <div class="form-group"><label>m2 Executados</label><input class="form-input" type="number" id="pAlvEstM2" placeholder="0"></div>
          <div class="form-group"><label>m2 por Bloqueiro</label><input class="form-input" type="number" id="pAlvEstPor" placeholder="0"></div>
        </div>
      </div>
      <div class="prod-section">
        <div class="prod-section-title">🏗 Produção de Alvenaria de Vedação</div>
        <div class="prod-grid">
          <div class="form-group"><label>Data de Referência</label><input class="form-input" type="date" id="pDataAlvVed"></div>
          <div></div>
          <div class="form-group"><label>m2 Executados</label><input class="form-input" type="number" id="pAlvVedM2" placeholder="0"></div>
          <div class="form-group"><label>m2 por Pedreiro</label><input class="form-input" type="number" id="pAlvVedPor" placeholder="0"></div>
        </div>
      </div>
      <div class="prod-section">
        <div class="prod-section-title">🚧 Concretagens Programadas</div>
        <div class="form-group"><textarea class="form-input" id="pConcretagens" rows="3"
          placeholder="Descreva as concretagens programadas ou deixe em branco caso não haja."></textarea></div>
      </div>
      <div class="prod-section">
        <div class="prod-section-title">👷 Administração e Apoio</div>
        <div class="prod-grid">
          <div class="form-group"><label>Mestre de Obras</label><input class="form-input" id="pMestre" placeholder="Nome completo"></div>
          <div class="form-group"><label>Engenheiro de Obra</label><input class="form-input" id="pEngenheiro" placeholder="Nome completo"></div>
          <div class="form-group"><label>Encarregado Civil</label><input class="form-input" id="pEncarregado" placeholder="Nome completo"></div>
          <div class="form-group"><label>Almoxarife</label><input class="form-input" id="pAlmoxarife" placeholder="Nome completo"></div>
          <div class="form-group"><label>Assistente Engenharia</label><input class="form-input" id="pAssistente" placeholder="Nome completo"></div>
          <div class="form-group"><label>Administrativo de Obra</label><input class="form-input" id="pAdministrativo" placeholder="Nome completo"></div>
        </div>
      </div>
    `;
    loadFields();
  }

  function loadFields() {
    const p = State.get().producao[App.getDate()] || {};
    const map = {
      pAreaAlv: 'areaAlv', pAreaLaje: 'areaLaje', pVolGraute: 'volGraute',
      pVolArg: 'volArg', pVolConc: 'volConc', pAcoAlv: 'acoAlv', pAcoLaje: 'acoLaje',
      pDataAlvEst: 'dataAlvEst', pAlvEstM2: 'alvEstM2', pAlvEstPor: 'alvEstPor',
      pDataAlvVed: 'dataAlvVed', pAlvVedM2: 'alvVedM2', pAlvVedPor: 'alvVedPor',
      pConcretagens: 'concretagens',
      pMestre: 'mestre', pEngenheiro: 'engenheiro', pEncarregado: 'encarregado',
      pAlmoxarife: 'almoxarife', pAssistente: 'assistente', pAdministrativo: 'administrativo',
    };
    Object.entries(map).forEach(([elId, key]) => {
      const el = document.getElementById(elId);
      if (el) el.value = p[key] || '';
    });
  }

  function salvar() {
    const map = {
      areaAlv: 'pAreaAlv', areaLaje: 'pAreaLaje', volGraute: 'pVolGraute',
      volArg: 'pVolArg', volConc: 'pVolConc', acoAlv: 'pAcoAlv', acoLaje: 'pAcoLaje',
      dataAlvEst: 'pDataAlvEst', alvEstM2: 'pAlvEstM2', alvEstPor: 'pAlvEstPor',
      dataAlvVed: 'pDataAlvVed', alvVedM2: 'pAlvVedM2', alvVedPor: 'pAlvVedPor',
      concretagens: 'pConcretagens',
      mestre: 'pMestre', engenheiro: 'pEngenheiro', encarregado: 'pEncarregado',
      almoxarife: 'pAlmoxarife', assistente: 'pAssistente', administrativo: 'pAdministrativo',
    };
    const fields = {};
    Object.entries(map).forEach(([key, elId]) => {
      const el = document.getElementById(elId);
      if (el) fields[key] = el.value;
    });
    State.saveProducao(App.getDate(), fields);
    Utils.toast('Dados de produção salvos!', 'success');
  }

  return { render, loadFields, salvar };
})();


/* ═══════════════════════════════════════════
   pages/funcionarios.js
   ═══════════════════════════════════════════ */

const FuncionariosPage = (() => {
  function render() {
    const s = State.get();
    const query = (document.getElementById('workerSearch')?.value || '').toLowerCase();
    let workers = s.workers;
    if (query) {
      workers = workers.filter(w =>
        w.nome.toLowerCase().includes(query) || w.funcao.toLowerCase().includes(query)
      );
    }
    const tbody = document.getElementById('fullWorkerList');
    if (!tbody) return;
    if (workers.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5"><div class="empty-state">Nenhum funcionário encontrado.</div></td></tr>`;
      return;
    }
    tbody.innerHTML = workers.map(w => {
      const eq = State.getEquipe(w.equipe);
      const cor = eq ? eq.cor : '#8b92b0';
      return `<tr>
        <td><div class="worker-name">${Utils.escapeHtml(w.nome)}</div></td>
        <td style="color:var(--text2);font-size:12px">${Utils.escapeHtml(w.funcao)}</td>
        <td><span class="team-badge" style="background:${cor}22;color:${cor};border:1px solid ${cor}44">${Utils.escapeHtml(eq ? eq.nome : w.equipe)}</span></td>
        <td style="color:var(--text2);font-size:12px">${Utils.escapeHtml(w.obra)}</td>
        <td>
          <div class="table-actions">
            <button class="icon-btn" title="Editar" onclick="Modals.openAddWorker('${w.id}')">✏️</button>
            <button class="icon-btn" title="Mover" onclick="Modals.openMove('${w.id}')">↗</button>
            <button class="icon-btn danger" title="Remover" onclick="FuncionariosPage.remove('${w.id}')">✕</button>
          </div>
        </td>
      </tr>`;
    }).join('');
    App.updateTopbar();
  }

  function saveWorker() {
    const nome   = document.getElementById('wName').value.trim();
    const funcao = document.getElementById('wRole').value.trim();
    const equipe = document.getElementById('wTeam').value;
    const obra   = document.getElementById('wObra').value;
    const editId = document.getElementById('wEditId').value;
    if (!nome || !funcao) { Utils.toast('Preencha nome e função.', 'warn'); return; }
    if (editId) {
      State.updateWorker(editId, { nome, funcao, equipe, obra });
      Utils.toast('Funcionário atualizado!', 'success');
    } else {
      State.addWorker({ nome, funcao, equipe, obra });
      Utils.toast(`${nome} adicionado!`, 'success');
    }
    Modals.close('modalAddWorker');
    render();
    EfetivoPage.render();
  }

  function remove(id) {
    const w = State.getWorker(id);
    if (!w) return;
    if (!confirm(`Remover "${w.nome}"? Esta ação não pode ser desfeita.`)) return;
    State.removeWorker(id);
    render();
    EfetivoPage.render();
    Utils.toast('Funcionário removido.', 'info');
  }

  function confirmMove() {
    const id   = document.getElementById('moveWorkerId').value;
    const obra = document.getElementById('moveObraSelect').value;
    State.updateWorker(id, { obra });
    Modals.close('modalMove');
    render();
    EfetivoPage.render();
    Utils.toast(`Movido para ${obra}.`, 'success');
  }

  function importWorkers() {
    const text  = document.getElementById('importText').value.trim();
    const obra  = document.getElementById('importObraSelect').value;
    const equipe= document.getElementById('importEquipeSelect').value;
    if (!text) { Utils.toast('Cole a lista de funcionários.', 'warn'); return; }
    const lines = text.split('\n').filter(l => l.trim());
    let count = 0;
    lines.forEach(line => {
      const parts = line.split(/–|-/).map(p => p.trim());
      const nome  = parts[0];
      const funcao= parts[1] || 'Ajudante';
      if (nome) { State.addWorker({ nome, funcao, equipe, obra }); count++; }
    });
    Modals.close('modalImport');
    render();
    EfetivoPage.render();
    Utils.toast(`${count} funcionários importados!`, 'success');
  }

  return { render, saveWorker, remove, confirmMove, importWorkers };
})();


/* ═══════════════════════════════════════════
   pages/relatorios.js
   ═══════════════════════════════════════════ */

const RelatoriosPage = (() => {
  function render() {
    const s = State.get();
    const obra = App.getObra();
    const att  = s.attendance || {};
    const workers = s.workers.filter(w => w.obra === obra);
    const historico = s.historico.filter(h => h.obra === obra);

    const totalRel = historico.length;
    const avgAss = workers.length === 0 ? 0 : Math.round(
      workers.reduce((sum, w) => {
        const a = att[w.id];
        return sum + (a && a.total > 0 ? (a.dias / a.total) * 100 : 100);
      }, 0) / workers.length
    );

    const today = App.getDate();
    const presente = workers.filter(w => State.getDayData(w.id, today).presente).length;

    const el = document.getElementById('relatoriosContent');
    el.innerHTML = `
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">Funcionários</div>
          <div class="stat-value">${workers.length}</div>
          <div class="stat-desc">cadastrados na obra</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Hoje</div>
          <div class="stat-value" style="color:var(--green)">${presente}</div>
          <div class="stat-desc">presentes agora</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Relatórios</div>
          <div class="stat-value">${totalRel}</div>
          <div class="stat-desc">gerados para esta obra</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Assiduidade média</div>
          <div class="stat-value" style="color:${avgAss >= 90 ? 'var(--green)' : avgAss >= 75 ? 'var(--accent)' : 'var(--red)'}">${avgAss}%</div>
          <div class="stat-desc">média geral da equipe</div>
        </div>
      </div>
      <div class="card table-card">
        <table class="data-table">
          <thead><tr>
            <th>Funcionário</th>
            <th>Função</th>
            <th>Equipe</th>
            <th>Presenças</th>
            <th>Total</th>
            <th>Assiduidade</th>
          </tr></thead>
          <tbody>
            ${workers.length === 0
              ? `<tr><td colspan="6"><div class="empty-state">Sem dados registrados.</div></td></tr>`
              : workers.map(w => {
                  const a = att[w.id] || { dias: 0, total: 0 };
                  const pct = a.total > 0 ? Math.round((a.dias / a.total) * 100) : 100;
                  const cls = pct >= 90 ? 'good' : pct >= 75 ? 'warn' : 'danger';
                  const eq = State.getEquipe(w.equipe);
                  const cor = eq ? eq.cor : '#8b92b0';
                  return `<tr>
                    <td><div class="worker-name">${Utils.escapeHtml(w.nome)}</div></td>
                    <td style="font-size:12px;color:var(--text2)">${Utils.escapeHtml(w.funcao)}</td>
                    <td><span class="team-badge" style="background:${cor}22;color:${cor};border:1px solid ${cor}44">${Utils.escapeHtml(eq ? eq.nome : w.equipe)}</span></td>
                    <td style="font-family:'JetBrains Mono',monospace;color:var(--green)">${a.dias}</td>
                    <td style="font-family:'JetBrains Mono',monospace;color:var(--text3)">${a.total}</td>
                    <td>
                      <div class="bar-wrap">
                        <div class="bar-bg"><div class="bar-fill ${cls}" style="width:${pct}%"></div></div>
                        <span class="bar-pct">${pct}%</span>
                      </div>
                    </td>
                  </tr>`;
                }).join('')
            }
          </tbody>
        </table>
      </div>
    `;
  }
  return { render };
})();


/* ═══════════════════════════════════════════
   pages/historico.js
   ═══════════════════════════════════════════ */

const HistoricoPage = (() => {
  let currentDetail = '';

  function render() {
    const s = State.get();
    const obra = App.getObra();
    const historico = s.historico.filter(h => h.obra === obra);

    const el = document.getElementById('historicoContent');
    if (historico.length === 0) {
      el.innerHTML = `<div class="empty-state" style="padding:60px 20px">
        <div style="font-size:40px;margin-bottom:12px;opacity:.3">📋</div>
        Nenhum relatório gerado ainda para esta obra.
      </div>`;
      return;
    }

    el.innerHTML = `<div class="historico-grid">
      ${historico.map((h, i) => `
        <div class="historico-card" onclick="HistoricoPage.openDetail(${i})">
          <div class="historico-card-date">${Utils.formatPT(h.data)}</div>
          <div class="historico-card-obra">${Utils.weekdayOf(h.data)} · ${h.obra}</div>
          <div class="historico-card-total">👷 ${h.total} trabalhadores</div>
          <div style="font-size:10px;color:var(--text3);margin-top:6px;font-family:'JetBrains Mono',monospace">
            ${new Date(h.ts).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      `).join('')}
    </div>`;
  }

  function openDetail(index) {
    const s = State.get();
    const obra = App.getObra();
    const historico = s.historico.filter(h => h.obra === obra);
    const h = historico[index];
    if (!h) return;
    currentDetail = h.texto;
    document.getElementById('historicoDetailTitle').textContent = `Efetivo – ${Utils.formatPT(h.data)}`;
    document.getElementById('historicoDetailText').textContent = h.texto;
    Modals.open('modalHistorico');
  }

  function copyDetail() {
    Utils.copyToClipboard(currentDetail, 'Copiado!');
  }

  return { render, openDetail, copyDetail };
})();
