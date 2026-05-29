/* ═══════════════════════════════════════════
   sheets.js – Integração Google Sheets
   ═══════════════════════════════════════════ */

const Sheets = (() => {

  const APPS_SCRIPT_CODE = `// ═══════════════════════════════════════════════════════════════
// EFETIVO DE OBRA – Google Apps Script
// Cole este código em script.google.com → Novo Projeto
// Depois: Implantar → Nova implantação → Aplicativo da Web
//   Executar como: Eu mesmo
//   Acesso: Qualquer pessoa
// ═══════════════════════════════════════════════════════════════

const SHEET_ID = ''; // Cole o ID da sua planilha aqui (opcional, pode vir no payload)

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const sheetId = payload.sheetId || SHEET_ID;
    const ss = SpreadsheetApp.openById(sheetId);

    // ── Aba: Efetivo (um registro por funcionário por dia) ──
    let shEfetivo = ss.getSheetByName('Efetivo');
    if (!shEfetivo) {
      shEfetivo = ss.insertSheet('Efetivo');
      shEfetivo.appendRow([
        'Data', 'Obra', 'Nome', 'Função', 'Equipe',
        'Presente', 'Andar / Local', 'Atividades', 'Timestamp'
      ]);
      shEfetivo.getRange(1, 1, 1, 9).setFontWeight('bold').setBackground('#f0a500').setFontColor('#000000');
      shEfetivo.setFrozenRows(1);
    }

    if (payload.workers && Array.isArray(payload.workers)) {
      payload.workers.forEach(w => {
        shEfetivo.appendRow([
          payload.data,
          payload.obra,
          w.nome,
          w.funcao,
          w.equipe || '',
          w.presente ? 'SIM' : 'NÃO',
          w.andar || '',
          w.tarefas || '',
          new Date().toISOString(),
        ]);
      });
    }

    // ── Aba: Relatórios (texto completo) ──
    let shRel = ss.getSheetByName('Relatórios');
    if (!shRel) {
      shRel = ss.insertSheet('Relatórios');
      shRel.appendRow(['Data', 'Obra', 'Total Trabalhadores', 'Texto Completo', 'Timestamp']);
      shRel.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#f0a500').setFontColor('#000000');
      shRel.setFrozenRows(1);
      shRel.setColumnWidth(4, 600);
    }
    shRel.appendRow([
      payload.data,
      payload.obra,
      payload.total || 0,
      payload.texto || '',
      new Date().toISOString(),
    ]);

    // ── Aba: Assiduidade (resumo atualizado) ──
    if (payload.workers) {
      let shAss = ss.getSheetByName('Assiduidade');
      if (!shAss) {
        shAss = ss.insertSheet('Assiduidade');
        shAss.appendRow(['Nome', 'Função', 'Equipe', 'Obra', 'Dias Presentes', 'Total Registrado', 'Assiduidade %']);
        shAss.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#f0a500').setFontColor('#000000');
        shAss.setFrozenRows(1);
      }

      // Rebuild assiduidade from Efetivo sheet
      const efData = shEfetivo.getDataRange().getValues();
      const attMap = {};
      efData.slice(1).forEach(row => {
        const nome = row[2], presente = row[5] === 'SIM';
        if (!nome) return;
        if (!attMap[nome]) attMap[nome] = { funcao: row[3], equipe: row[4], obra: row[1], dias: 0, total: 0 };
        attMap[nome].total++;
        if (presente) attMap[nome].dias++;
      });

      shAss.clearContents();
      shAss.appendRow(['Nome', 'Função', 'Equipe', 'Obra', 'Dias Presentes', 'Total Registrado', 'Assiduidade %']);
      shAss.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#f0a500').setFontColor('#000000');
      Object.entries(attMap).forEach(([nome, a]) => {
        const pct = a.total > 0 ? Math.round((a.dias / a.total) * 100) : 100;
        shAss.appendRow([nome, a.funcao, a.equipe, a.obra, a.dias, a.total, pct + '%']);
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, msg: 'Dados salvos com sucesso.' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Ping para testar conexão
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, msg: 'Efetivo de Obra API ativa.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
`;

  async function send(date, obra, texto, workers) {
    const s = State.get();
    if (!s.gsUrl) return false;

    const payload = {
      data: date,
      obra,
      texto,
      total: workers.filter(w => w.presente).length,
      sheetId: s.gsSheetId,
      workers,
    };

    try {
      await fetch(s.gsUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      Utils.toast('Dados enviados ao Google Sheets!', 'success');
      return true;
    } catch (err) {
      Utils.toast('Erro ao enviar para Google Sheets: ' + err.message, 'error');
      return false;
    }
  }

  async function ping(url) {
    try {
      const res = await fetch(url, { method: 'GET', mode: 'cors' });
      const json = await res.json();
      return json.ok === true;
    } catch {
      return false;
    }
  }

  return { send, ping, APPS_SCRIPT_CODE };
})();
