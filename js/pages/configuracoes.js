/* ═══════════════════════════════════════════
   pages/configuracoes.js
   ═══════════════════════════════════════════ */

const ConfigPage = (() => {
  function render() {
    const s = State.get();
    const el = document.getElementById('configContent');

    el.innerHTML = `
      <div class="settings-grid">

        <!-- Andares -->
        <div class="settings-card">
          <div class="settings-card-title">🏢 Andares / Locais</div>
          <ul class="settings-list" id="cfgAndarList">
            ${s.andares.map((a, i) => `
              <li>
                <span class="item-text">${Utils.escapeHtml(a)}</span>
                <button class="icon-btn danger" style="width:22px;height:22px;font-size:11px"
                  onclick="ConfigPage.removeAndar(${i})">✕</button>
              </li>`).join('')}
          </ul>
          <div class="add-item-row">
            <input type="text" id="newAndar" placeholder="ex: 17º Pavimento">
            <button class="btn btn-accent" onclick="ConfigPage.addAndar()">Add</button>
          </div>
        </div>

        <!-- Tarefas -->
        <div class="settings-card">
          <div class="settings-card-title">⚒ Atividades</div>
          <ul class="settings-list" id="cfgTarefaList">
            ${s.tarefas.map((t, i) => `
              <li>
                <span class="item-text">${Utils.escapeHtml(t)}</span>
                <button class="icon-btn danger" style="width:22px;height:22px;font-size:11px"
                  onclick="ConfigPage.removeTarefa(${i})">✕</button>
              </li>`).join('')}
          </ul>
          <div class="add-item-row">
            <input type="text" id="newTarefa" placeholder="ex: Instalação hidráulica">
            <button class="btn btn-accent" onclick="ConfigPage.addTarefa()">Add</button>
          </div>
        </div>

        <!-- Equipes -->
        <div class="settings-card">
          <div class="settings-card-title">👥 Equipes</div>
          <ul class="settings-list" id="cfgEquipeList">
            ${s.equipes.map(e => `
              <li>
                <span class="color-dot" style="background:${e.cor}"></span>
                <span class="item-text">${Utils.escapeHtml(e.nome)}</span>
                <button class="icon-btn danger" style="width:22px;height:22px;font-size:11px"
                  onclick="ConfigPage.removeEquipe('${e.id}')">✕</button>
              </li>`).join('')}
          </ul>
          <div class="add-item-row">
            <input type="text" id="newEquipe" placeholder="ex: Elétrica">
            <input type="color" id="newEquipeCor" value="#22c55e">
            <button class="btn btn-accent" onclick="ConfigPage.addEquipe()">Add</button>
          </div>
        </div>

        <!-- Obras -->
        <div class="settings-card">
          <div class="settings-card-title">🏗 Obras</div>
          <ul class="settings-list" id="cfgObraList">
            ${s.obras.map((o, i) => `
              <li>
                <span class="item-text">${Utils.escapeHtml(o)}</span>
                ${i === 0
                  ? '<span style="font-size:10px;color:var(--text3)">principal</span>'
                  : `<button class="icon-btn danger" style="width:22px;height:22px;font-size:11px"
                      onclick="ConfigPage.removeObra('${Utils.escapeHtml(o)}')">✕</button>`}
              </li>`).join('')}
          </ul>
          <div class="add-item-row">
            <input type="text" id="newObra" placeholder="ex: Nova Obra 2025">
            <button class="btn btn-accent" onclick="ConfigPage.addObra()">Add</button>
          </div>
        </div>

      </div>`;
  }

  function addAndar() {
    const v = document.getElementById('newAndar').value.trim();
    if (!v) return;
    State.addAndar(v);
    document.getElementById('newAndar').value = '';
    render();
    EfetivoPage.render();
  }

  function removeAndar(i) {
    State.removeAndar(i);
    render();
    EfetivoPage.render();
  }

  function addTarefa() {
    const v = document.getElementById('newTarefa').value.trim();
    if (!v) return;
    State.addTarefa(v);
    document.getElementById('newTarefa').value = '';
    render();
    EfetivoPage.render();
  }

  function removeTarefa(i) {
    State.removeTarefa(i);
    render();
    EfetivoPage.render();
  }

  function addEquipe() {
    const nome = document.getElementById('newEquipe').value.trim();
    const cor  = document.getElementById('newEquipeCor').value;
    if (!nome) return;
    State.addEquipe({ nome, cor });
    document.getElementById('newEquipe').value = '';
    render();
    EfetivoPage.renderTeamFilters();
  }

  function removeEquipe(id) {
    State.removeEquipe(id);
    render();
    EfetivoPage.renderTeamFilters();
  }

  function addObra() {
    const v = document.getElementById('newObra').value.trim();
    if (!v) return;
    State.addObra(v);
    document.getElementById('newObra').value = '';
    App.rebuildObraSelect();
    render();
  }

  function removeObra(nome) {
    if (nome === App.getObra()) { Utils.toast('Não é possível remover a obra ativa.', 'warn'); return; }
    if (!confirm(`Remover a obra "${nome}"?`)) return;
    State.removeObra(nome);
    App.rebuildObraSelect();
    render();
  }

  return { render, addAndar, removeAndar, addTarefa, removeTarefa, addEquipe, removeEquipe, addObra, removeObra };
})();


/* ═══════════════════════════════════════════
   pages/integracao.js
   ═══════════════════════════════════════════ */

const IntegracaoPage = (() => {
  function render() {
    const s = State.get();
    const el = document.getElementById('integracaoContent');
    el.innerHTML = `
      <div class="integration-card">
        <div class="integration-card-title">🔗 Configuração da Planilha</div>
        <div class="form-group">
          <label>URL do Google Apps Script (Web App Deploy)</label>
          <input class="form-input" id="gsUrl" type="text"
            style="font-family:'JetBrains Mono',monospace;font-size:11px"
            placeholder="https://script.google.com/macros/s/AKfyc.../exec"
            value="${Utils.escapeHtml(s.gsUrl)}">
        </div>
        <div class="form-group">
          <label>ID da Planilha Google Sheets</label>
          <input class="form-input" id="gsSheetId" type="text"
            style="font-family:'JetBrains Mono',monospace;font-size:12px"
            placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms"
            value="${Utils.escapeHtml(s.gsSheetId)}">
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-accent" onclick="IntegracaoPage.salvar()">Salvar configuração</button>
          <button class="btn btn-ghost" onclick="IntegracaoPage.testar()">Testar conexão</button>
        </div>
        ${s.gsUrl ? `<p style="font-size:11px;color:var(--green);margin-top:10px">✅ URL configurada – envio automático ativo</p>` : ''}
      </div>

      <div class="integration-card">
        <div class="integration-card-title">📋 Como configurar passo a passo</div>
        <ol class="steps-list">
          <li>Abra o <a href="https://docs.google.com/spreadsheets/create" target="_blank">Google Sheets</a> e crie uma planilha nova. Copie o <strong>ID</strong> da URL (entre /d/ e /edit).</li>
          <li>Acesse o <a href="https://script.google.com" target="_blank">Google Apps Script</a> e clique em <strong>Novo Projeto</strong>.</li>
          <li>Apague o código existente e cole o código gerado pelo botão abaixo. Salve o projeto.</li>
          <li>Clique em <strong>Implantar → Nova implantação</strong>. Tipo: <em>Aplicativo da Web</em>. Executar como: <em>eu mesmo</em>. Acesso: <em>Qualquer pessoa</em>.</li>
          <li>Autorize as permissões solicitadas pelo Google.</li>
          <li>Copie a <strong>URL do Web App</strong> gerada e cole no campo acima junto com o ID da planilha. Salve.</li>
        </ol>
        <button class="btn btn-ghost" style="margin-top:4px" onclick="IntegracaoPage.showScript()">
          Ver código Apps Script
        </button>
      </div>

      <div class="integration-card">
        <div class="integration-card-title">📊 Estrutura da Planilha</div>
        <p style="font-size:12px;color:var(--text2);line-height:1.8">
          O Apps Script criará automaticamente as seguintes abas:<br>
          <strong style="color:var(--accent)">Efetivo</strong> – Um registro por funcionário por dia (data, obra, nome, função, presente, andar, atividades)<br>
          <strong style="color:var(--accent)">Relatórios</strong> – O texto completo de cada efetivo gerado<br>
          <strong style="color:var(--accent)">Assiduidade</strong> – Resumo de presença por funcionário
        </p>
      </div>
    `;
  }

  function salvar() {
    const url = document.getElementById('gsUrl').value.trim();
    const id  = document.getElementById('gsSheetId').value.trim();
    State.get().gsUrl     = url;
    State.get().gsSheetId = id;
    State.save();
    App.updateGSIndicator();
    Utils.toast('Configuração salva!', 'success');
    render();
  }

  async function testar() {
    const url = document.getElementById('gsUrl').value.trim();
    if (!url) { Utils.toast('Configure a URL primeiro.', 'warn'); return; }
    Utils.toast('Testando conexão…', 'info');
    const ok = await Sheets.ping(url);
    ok ? Utils.toast('Conexão OK!', 'success') : Utils.toast('Falha na conexão. Verifique a URL.', 'error');
  }

  function showScript() {
    document.getElementById('appsScriptCode').textContent = Sheets.APPS_SCRIPT_CODE;
    Modals.open('modalAppsScript');
  }

  function copyScript() {
    Utils.copyToClipboard(Sheets.APPS_SCRIPT_CODE, 'Código copiado!');
  }

  return { render, salvar, testar, showScript, copyScript };
})();
