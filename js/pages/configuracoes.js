/* configuracoes.js + integracao */

const ConfigPage = (() => {
  function render() {
    const s = State.get();
    document.getElementById('configContent').innerHTML = `
      ${block('🏢 Andares / Locais', s.andares.map((a,i)=>item(a,`ConfigPage.removeAndar(${i})`)).join(''),
        `<div class="add-item-row"><input type="text" id="newAndar" placeholder="ex: 17º Pavimento"><button class="btn btn-accent" onclick="ConfigPage.addAndar()">Add</button></div>`)}
      ${block('⚒ Atividades', s.tarefas.map((t,i)=>item(t,`ConfigPage.removeTarefa(${i})`)).join(''),
        `<div class="add-item-row"><input type="text" id="newTarefa" placeholder="ex: Instalação elétrica"><button class="btn btn-accent" onclick="ConfigPage.addTarefa()">Add</button></div>`)}
      ${block('👥 Equipes', s.equipes.map(e=>itemColor(e.cor,e.nome,`ConfigPage.removeEquipe('${e.id}')`)).join(''),
        `<div class="add-item-row"><input type="text" id="newEquipe" placeholder="Nova equipe"><input type="color" id="newEquipeCor" value="#22c55e"><button class="btn btn-accent" onclick="ConfigPage.addEquipe()">Add</button></div>`)}
      ${block('🏗 Obras', s.obras.map((o,i)=>item(o, i>0?`ConfigPage.removeObra('${Utils.escapeHtml(o)}')`:null, i===0?'<span style="font-size:10px;color:var(--text3)">principal</span>':'')).join(''),
        `<div class="add-item-row"><input type="text" id="newObra" placeholder="Nova obra"><button class="btn btn-accent" onclick="ConfigPage.addObra()">Add</button></div>`)}
    `;
  }

  function block(title, body, footer) {
    return `<div class="settings-section">
      <div class="settings-section-header">
        <span class="settings-section-title">${title}</span>
      </div>
      <div class="settings-section-body">${body}${footer}</div>
    </div>`;
  }

  function item(text, removeFn, extra='') {
    return `<div class="settings-item">
      <span style="flex:1">${Utils.escapeHtml(text)}</span>
      ${extra}
      ${removeFn ? `<button class="icon-btn danger" style="width:26px;height:26px;font-size:12px" onclick="${removeFn}">✕</button>` : ''}
    </div>`;
  }

  function itemColor(cor, text, removeFn) {
    return `<div class="settings-item">
      <span class="color-dot" style="background:${cor}"></span>
      <span style="flex:1">${Utils.escapeHtml(text)}</span>
      <button class="icon-btn danger" style="width:26px;height:26px;font-size:12px" onclick="${removeFn}">✕</button>
    </div>`;
  }

  function addAndar()  { const v=document.getElementById('newAndar').value.trim(); if(!v)return; State.addAndar(v); document.getElementById('newAndar').value=''; render(); EfetivoPage.render(); }
  function removeAndar(i) { State.removeAndar(i); render(); EfetivoPage.render(); }
  function addTarefa() { const v=document.getElementById('newTarefa').value.trim(); if(!v)return; State.addTarefa(v); document.getElementById('newTarefa').value=''; render(); EfetivoPage.render(); }
  function removeTarefa(i) { State.removeTarefa(i); render(); EfetivoPage.render(); }
  function addEquipe() {
    const nome=document.getElementById('newEquipe').value.trim();
    const cor=document.getElementById('newEquipeCor').value;
    if(!nome)return; State.addEquipe({nome,cor}); document.getElementById('newEquipe').value=''; render(); EfetivoPage.renderTeamFilters();
  }
  function removeEquipe(id) { State.removeEquipe(id); render(); EfetivoPage.renderTeamFilters(); }
  function addObra()  {
    const v=document.getElementById('newObra').value.trim(); if(!v)return;
    State.addObra(v); document.getElementById('newObra').value='';
    App.rebuildObraSelects(); render();
  }
  function removeObra(nome) {
    if(nome===App.getObra()){Utils.toast('Não pode remover a obra ativa.','warn');return;}
    if(!confirm(`Remover "${nome}"?`))return;
    State.removeObra(nome); App.rebuildObraSelects(); render();
  }

  return { render, addAndar, removeAndar, addTarefa, removeTarefa, addEquipe, removeEquipe, addObra, removeObra };
})();

/* ── INTEGRAÇÃO ── */
const IntegracaoPage = (() => {
  function render() {
    const s = State.get();
    document.getElementById('integracaoContent').innerHTML = `
      <div class="int-card">
        <div class="int-card-title">🔗 Configuração</div>
        <div class="form-group">
          <label>URL do Web App (Apps Script)</label>
          <input class="form-input" id="gsUrl" type="text" style="font-size:11px;font-family:'JetBrains Mono',monospace"
            placeholder="https://script.google.com/macros/s/…/exec" value="${Utils.escapeHtml(s.gsUrl)}">
        </div>
        <div class="form-group">
          <label>ID da Planilha</label>
          <input class="form-input" id="gsSheetId" type="text" style="font-size:12px;font-family:'JetBrains Mono',monospace"
            placeholder="1BxiMVs0XRA5…" value="${Utils.escapeHtml(s.gsSheetId)}">
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-accent btn-full" onclick="IntegracaoPage.salvar()">Salvar</button>
          <button class="btn btn-ghost" onclick="IntegracaoPage.testar()">Testar</button>
        </div>
        ${s.gsUrl?`<p style="font-size:11px;color:var(--green);margin-top:10px">✅ Integração ativa</p>`:''}
      </div>
      <div class="int-card">
        <div class="int-card-title">📋 Como configurar</div>
        <ol class="steps-list">
          <li>Crie uma planilha em <a href="https://sheets.google.com" target="_blank">sheets.google.com</a> e copie o ID da URL.</li>
          <li>Acesse <a href="https://script.google.com" target="_blank">script.google.com</a> → Novo projeto.</li>
          <li>Apague o código existente e cole o código abaixo.</li>
          <li>Clique em Implantar → Nova implantação → Aplicativo da Web → Acesso: Qualquer pessoa.</li>
          <li>Copie a URL gerada e cole no campo acima junto com o ID da planilha.</li>
        </ol>
        <button class="btn btn-ghost btn-full" style="margin-top:8px" onclick="IntegracaoPage.showScript()">Ver código Apps Script</button>
      </div>
    `;
  }

  function salvar() {
    State.get().gsUrl = document.getElementById('gsUrl').value.trim();
    State.get().gsSheetId = document.getElementById('gsSheetId').value.trim();
    State.save(); App.updateGSIndicator();
    Utils.toast('Configuração salva!','success'); render();
  }

  async function testar() {
    const url = document.getElementById('gsUrl').value.trim();
    if (!url) { Utils.toast('Configure a URL primeiro.','warn'); return; }
    Utils.toast('Testando…','info');
    const ok = await Sheets.ping(url);
    ok ? Utils.toast('Conexão OK!','success') : Utils.toast('Falha. Verifique a URL.','error');
  }

  function showScript() {
    document.getElementById('appsScriptCode').textContent = Sheets.APPS_SCRIPT_CODE;
    Modals.open('modalAppsScript');
  }

  function copyScript() { Utils.copyToClipboard(Sheets.APPS_SCRIPT_CODE,'Código copiado!'); }

  return { render, salvar, testar, showScript, copyScript };
})();
