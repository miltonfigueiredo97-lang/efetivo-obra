// EFETIVO DE OBRA – Apps Script v6
// Implantar → Nova implantação → App da Web → Qualquer pessoa → Executar como: Eu mesmo
//
// PASSO OBRIGATÓRIO DE SEGURANÇA:
// Projeto → Configurações → Propriedades do script → adicionar
//   propriedade: CHAVE_ACESSO   valor: (uma senha forte que você escolher)
// Depois digite a MESMA senha no app em Configurações → Chave de acesso.
// Sem isso, qualquer pessoa com a URL grava na sua planilha.

function _auth(key) {
  var esperada = PropertiesService.getScriptProperties().getProperty('CHAVE_ACESSO');
  if (!esperada) return true; // ainda não configurada: mantém compatibilidade
  return String(key || '') === String(esperada);
}

var ABA_FUNC   = '👷 Funcionários';
var ABA_EFET   = '📅 Efetivo Diário';
var ABA_REL    = '📊 Relatórios';
var ABA_ASSID  = '👷 Assiduidade';
var ABA_CFG    = '⚙️ Configurações';
var ABA_PROD   = '📐 Prod. Técnica';
var ABA_HE     = '⏰ Horas Extras';

function doGet(e) {
  try {
    var key = e && e.parameter && e.parameter.key;
    if (!_auth(key)) return _err('Chave de acesso invalida.');
    var sheetId = e && e.parameter && e.parameter.sheetId;
    if (!sheetId) return _ok({msg: 'API ativa.'});
    var ss = SpreadsheetApp.openById(sheetId);
    var state = _buildState(ss);
    return ContentService
      .createTextOutput(JSON.stringify({ok: true, state: state}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) { return _err(err); }
}

function doPost(e) {
  try {
    // Aceita tanto JSON no body quanto form field 'payload'
    var raw = '';
    if (e.postData && e.postData.contents) {
      raw = e.postData.contents;
    } else if (e.parameter && e.parameter.payload) {
      raw = e.parameter.payload;
    }
    var p = JSON.parse(raw);
    if (!_auth(p.key)) return _err('Chave de acesso invalida.');
    var ss = SpreadsheetApp.openById(p.sheetId || '');
    var act = p.action || '';

    if (act === 'saveWorkers')   { _saveWorkers(ss, p.workers);           return _ok({msg:'Funcionários salvos'}); }
    if (act === 'saveEfetivo')   { _saveEfetivo(ss, p); _syncAssid(ss, p); return _ok({msg:'Efetivo salvo'}); }
    if (act === 'saveRelatorio') { _saveRelatorio(ss, p);                  return _ok({msg:'Relatório salvo'}); }
    if (act === 'saveConfig')    { _saveConfig(ss, p);                     return _ok({msg:'Config salva'}); }
    if (act === 'saveProd')      { _saveProd(ss, p);                       return _ok({msg:'Produção salva'}); }
    if (act === 'saveHE')        { _saveHE(ss, p);                         return _ok({msg:'HE salvas'}); }
    if (act === 'deleteHE')      { _deleteHE(ss, p);                       return _ok({msg:'HE removida'}); }

    return _ok({msg: 'Ação desconhecida: ' + act});
  } catch(err) { return _err(err); }
}

function _buildState(ss) {
  var state = {
    workers: [], equipes: [], andares: [], tarefas: [], obras: [],
    dailyData: {}, historico: [], horasExtras: {}, producaoGeral: {}, producaoDiaria: {},
    gsUrl: '', gsSheetId: '', activeObra: ''
  };

  var shF = ss.getSheetByName(ABA_FUNC);
  if (shF && shF.getLastRow() > 3) {
    var rows = shF.getRange(4, 1, shF.getLastRow()-3, 7).getValues();
    rows.forEach(function(r) {
      if (!r[0] || !r[1]) return;
      state.workers.push({id: String(r[0]), nome: r[1], funcao: r[2], equipe: r[3], obra: r[4], ativo: r[5] !== 'NÃO'});
    });
  }

  var shC = ss.getSheetByName(ABA_CFG);
  if (shC && shC.getLastRow() > 4) {
    var cfgData = shC.getRange(5, 1, shC.getLastRow()-4, 8).getValues();
    var eqId = 1;
    cfgData.forEach(function(r) {
      if (r[0]) state.andares.push(String(r[0]).trim());
      if (r[2]) state.tarefas.push(_tarefaObj(String(r[2]).trim()));
      if (r[4]) {
        var parts = String(r[4]).split('|');
        if (parts.length >= 3) {
          // formato novo: id|nome|cor — preserva o id e nao quebra o vinculo
          state.equipes.push({id: parts[0].trim(), nome: parts[1].trim(), cor: parts[2] ? parts[2].trim() : '#8b92b0'});
          eqId++;
        } else {
          // formato antigo: nome|cor — id posicional, so ate a proxima gravacao
          state.equipes.push({id: 'eq'+(eqId++), nome: parts[0].trim(), cor: parts[1] ? parts[1].trim() : '#8b92b0'});
        }
      }
      if (r[6]) {
        var obra = String(r[6]).trim();
        if (obra && state.obras.indexOf(obra) === -1) state.obras.push(obra);
      }
    });
  }
  if (!state.obras.length) state.obras = ['Essence Residence'];
  if (!state.andares.length) state.andares = ['Térreo'];
  state.activeObra = state.obras[0];

  var shE = ss.getSheetByName(ABA_EFET);
  if (shE && shE.getLastRow() > 3) {
    var efRows = shE.getRange(4, 1, shE.getLastRow()-3, 9).getValues();
    efRows.forEach(function(r) {
      if (!r[0] || !r[2]) return;
      var dateStr = _toISO(r[0]);
      var obra = String(r[1]);
      var w = state.workers.find(function(x){ return x.nome === String(r[2]); });
      if (!w) return;
      if (!state.dailyData[obra]) state.dailyData[obra] = {};
      if (!state.dailyData[obra][dateStr]) state.dailyData[obra][dateStr] = {};
      state.dailyData[obra][dateStr][w.id] = {
        presente: String(r[5]) === 'SIM',
        andar: String(r[6] || ''),
        tarefas: r[7] ? String(r[7]).split('; ').filter(Boolean) : [],
        motivo: ''
      };
    });
  }

  // Producao Tecnica: le a ultima linha lancada de cada obra.
  // (No v5 esta aba era gravada mas nunca lida, entao as Informacoes Gerais
  //  voltavam vazias e sobrescreviam o que estava no aparelho.)
  var shP = ss.getSheetByName(ABA_PROD);
  if (shP && shP.getLastRow() > 3) {
    var pRows = shP.getRange(4, 1, shP.getLastRow()-3, 23).getValues();
    pRows.forEach(function(r) {
      var obra = String(r[1] || '').trim();
      if (!obra) return;
      state.producaoGeral[obra] = {
        areaAlv:   Number(r[2]) || 0,
        areaLaje:  Number(r[3]) || 0,
        volGraute: Number(r[4]) || 0,
        volArg:    Number(r[5]) || 0,
        volConc:   Number(r[6]) || 0,
        acoAlv:    Number(r[7]) || 0,
        acoLaje:   Number(r[8]) || 0,
        mestre:         String(r[16] || ''),
        engenheiro:     String(r[17] || ''),
        encarregado:    String(r[18] || ''),
        almoxarife:     String(r[19] || ''),
        assistente:     String(r[20] || ''),
        administrativo: String(r[21] || '')
      };
      var dISO = _toISO(r[0]);
      if (dISO) {
        if (!state.producaoDiaria[obra]) state.producaoDiaria[obra] = {};
        state.producaoDiaria[obra][dISO] = {
          alvEst: {vol: Number(r[10]) || 0, qtd: Number(r[11]) || 0},
          alvVed: {vol: Number(r[13]) || 0, qtd: Number(r[14]) || 0},
          concretagens: []
        };
      }
    });
  }

  var shR = ss.getSheetByName(ABA_REL);
  if (shR && shR.getLastRow() > 3) {
    var relRows = shR.getRange(4, 1, shR.getLastRow()-3, 5).getValues();
    relRows.forEach(function(r) {
      if (!r[0] || !r[3]) return;
      state.historico.push({data: _toISO(r[0]), obra: String(r[1]), total: Number(r[2])||0, texto: String(r[3])});
    });
    state.historico.reverse();
  }

  var shHE = ss.getSheetByName(ABA_HE);
  if (shHE && shHE.getLastRow() > 3) {
    var heRows = shHE.getRange(4, 1, shHE.getLastRow()-3, 8).getValues();
    // ID do lançamento: tudo antes do último '_' (ex: he123_w1 -> he123)
    var heMap = {}; // entryId -> entry
    heRows.forEach(function(r) {
      if (!r[0] || !r[1]) return;
      var rowId = String(r[0]);
      var obra = String(r[2]);
      // Extrair o entry ID (remove sufixo _wXXX)
      var entryId = rowId.replace(/_w\d+$/, '');
      var w = state.workers.find(function(x){ return x.nome === String(r[3]); });
      if (!heMap[entryId]) {
        heMap[entryId] = {
          id: entryId, data: _toISO(r[1]), tipo: String(r[6]||'60'),
          obra: obra, registros: []
        };
      }
      heMap[entryId].registros.push({
        wid: w ? w.id : '', nome: String(r[3]), funcao: String(r[4]),
        horas: Number(r[5])||0
      });
    });
    // Montar horasExtras agrupado por obra
    Object.values(heMap).forEach(function(entry) {
      var obra = entry.obra;
      if (!state.horasExtras[obra]) state.horasExtras[obra] = [];
      state.horasExtras[obra].push({id:entry.id, data:entry.data, tipo:entry.tipo, registros:entry.registros});
    });
    // Ordenar por data desc
    Object.keys(state.horasExtras).forEach(function(obra) {
      state.horasExtras[obra].sort(function(a,b){ return b.data.localeCompare(a.data); });
    });
  }

  return state;
}

function _saveWorkers(ss, workers) {
  var sh = _getOrCreate(ss, ABA_FUNC, ['ID','Nome','Função / Cargo','Equipe','Obra','Ativo','Timestamp'], 3);
  var last = sh.getLastRow();
  if (last > 3) sh.deleteRows(4, last-3);
  var ts = _ts();
  var rows = workers.map(function(w) {
    return [w.id, w.nome, w.funcao, w.equipe, w.obra, w.ativo===false?'NÃO':'SIM', ts];
  });
  if (rows.length) sh.getRange(4, 1, rows.length, 7).setValues(rows);
}

function _saveEfetivo(ss, p) {
  var sh = _getOrCreate(ss, ABA_EFET, ['Data','Obra','Nome','Função','Equipe','Presente','Andar / Local','Atividades','Timestamp'], 3);
  var last = sh.getLastRow();
  if (last > 3) {
    var vals = sh.getRange(4, 1, last-3, 2).getValues();
    for (var i = vals.length-1; i >= 0; i--) {
      if (_toISO(vals[i][0]) === p.data && String(vals[i][1]) === p.obra) sh.deleteRow(i+4);
    }
  }
  var ts = _ts(); var datePT = _toPT(p.data);
  var rows = (p.workers||[]).map(function(w) {
    return [datePT, p.obra, w.nome, w.funcao, w.equipe, w.presente?'SIM':'NÃO', w.andar||'–', (w.tarefas||[]).join('; ')||'–', ts];
  });
  if (rows.length) {
    var startRow = sh.getLastRow()+1;
    sh.getRange(startRow, 1, rows.length, 9).setValues(rows);
    for (var j = 0; j < rows.length; j++) {
      sh.getRange(startRow+j, 6).setFontColor(rows[j][5]==='SIM'?'#22c55e':'#ef4444').setFontWeight('bold');
    }
  }
}

function _saveRelatorio(ss, p) {
  var sh = _getOrCreate(ss, ABA_REL, ['Data','Obra','Total Trabalhadores','Texto Completo','Timestamp'], 3);
  sh.appendRow([_toPT(p.data), p.obra, p.total||0, p.texto, _ts()]);
  sh.setColumnWidth(4, 600);
}

function _syncAssid(ss, p) {
  if (!p.state) return;
  var sh = _getOrCreate(ss, ABA_ASSID, ['Nome','Função','Equipe','Obra','Dias Presentes','Total Registrado','Assiduidade %','Status'], 3);
  var last = sh.getLastRow();
  if (last > 3) sh.deleteRows(4, last-3);
  var state = p.state;
  var att = {};
  Object.keys(state.dailyData||{}).forEach(function(obra) {
    Object.keys(state.dailyData[obra]).forEach(function(date) {
      var dayMap = state.dailyData[obra][date];
      Object.keys(dayMap).forEach(function(wid) {
        if (!att[wid]) att[wid] = {dias:0, total:0};
        att[wid].total++;
        if (dayMap[wid].presente !== false) att[wid].dias++;
      });
    });
  });
  var rows = (state.workers||[]).map(function(w) {
    var a = att[w.id]||{dias:0,total:0};
    var pct = a.total > 0 ? Math.round(a.dias/a.total*100) : 100;
    var eq = (state.equipes||[]).find(function(e){return e.id===w.equipe;});
    var status = pct>=90?'✅ Regular':pct>=75?'⚠️ Atenção':'❌ Crítico';
    return [w.nome, w.funcao, eq?eq.nome:w.equipe, w.obra, a.dias, a.total, pct+'%', status];
  });
  if (rows.length) {
    sh.getRange(4, 1, rows.length, 8).setValues(rows);
    rows.forEach(function(r, i) {
      sh.getRange(i+4, 8).setFontColor(r[7].includes('Regular')?'#22c55e':r[7].includes('Atenção')?'#f59e0b':'#ef4444');
    });
  }
}

function _saveConfig(ss, p) {
  var sh = ss.getSheetByName(ABA_CFG);
  if (!sh) return;
  var last = sh.getLastRow();
  if (last > 4) sh.deleteRows(5, last-4);
  var andares = p.andares||[], tarefas = p.tarefas||[], equipes = p.equipes||[], obras = p.obras||[];
  var maxLen = Math.max(andares.length, tarefas.length, equipes.length, obras.length);
  for (var i = 0; i < maxLen; i++) {
    sh.appendRow([andares[i]||'','',_tarefaStr(tarefas[i]),'',equipes[i]?(equipes[i].id+'|'+equipes[i].nome+'|'+equipes[i].cor):'','',obras[i]||'','']);
  }
}

function _saveProd(ss, p) {
  var sh = _getOrCreate(ss, ABA_PROD,
    ['Data','Obra','Área Alv. Est. m²','Área Laje m²','Vol. Graute m³','Vol. Argamassa m³','Vol. Concreto m³',
     'Aço Alv. Est. kg','Aço Lajes kg','Alv. Est. Data Ref.','Alv. Est. m² Exec.','m²/Bloqueiro',
     'Alv. Ved. Data Ref.','Alv. Ved. m² Exec.','m²/Pedreiro','Concretagens',
     'Mestre','Engenheiro','Encarregado','Almoxarife','Assistente','Administrativo','Timestamp'], 3);
  var g=p.geral||{}, d=p.diario||{};
  sh.appendRow([_toPT(p.data),p.obra,g.areaAlv||0,g.areaLaje||0,g.volGraute||0,g.volArg||0,g.volConc||0,
    g.acoAlv||0,g.acoLaje||0,d.alvEst&&d.alvEst.dataRef||'',d.alvEst&&d.alvEst.exec||0,d.alvEst&&d.alvEst.m2porBloqueiro||0,
    d.alvVed&&d.alvVed.dataRef||'',d.alvVed&&d.alvVed.exec||0,d.alvVed&&d.alvVed.m2porPedreiro||0,d.concretagens||'',
    g.mestre||'',g.engenheiro||'',g.encarregado||'',g.almoxarife||'',g.assistente||'',g.administrativo||'',_ts()]);
}

function _saveHE(ss, p) {
  var sh = _getOrCreate(ss, ABA_HE, ['ID Lançamento','Data','Obra','Nome','Função','Horas','Tipo','Timestamp'], 3);
  (p.registros||[]).forEach(function(r) {
    sh.appendRow([r.id, _toPT(r.data), p.obra, r.nome, r.funcao, r.horas, r.tipo||'Normal', _ts()]);
  });
}

function _deleteHE(ss, p) {
  var sh = ss.getSheetByName(ABA_HE);
  if (!sh || sh.getLastRow() < 4) return;
  var vals = sh.getRange(4, 1, sh.getLastRow()-3, 1).getValues();
  for (var i = vals.length-1; i >= 0; i--) {
    if (String(vals[i][0]) === String(p.id)) sh.deleteRow(i+4);
  }
}

// Tarefas sao objetos {nome, equipes} no app. Na planilha viram uma unica
// celula "nome::eq1,eq2". Antes o objeto era gravado direto e virava
// "[object Object]", corrompendo o nome e perdendo o vinculo com as equipes.
function _tarefaStr(t) {
  if (!t) return '';
  if (typeof t === 'string') return t;
  var eqs = (t.equipes || []).join(',');
  return eqs ? (t.nome + '::' + eqs) : String(t.nome || '');
}
function _tarefaObj(s) {
  if (!s) return {nome: '', equipes: []};
  var p = String(s).split('::');
  return {nome: p[0].trim(), equipes: p[1] ? p[1].split(',').map(function(x){return x.trim();}).filter(Boolean) : []};
}

function _getOrCreate(ss, name, headers, headerRow) {
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    var hRow = sh.getRange(headerRow, 1, 1, headers.length);
    hRow.setValues([headers]);
    hRow.setFontWeight('bold').setBackground('#f0a500').setFontColor('#000000');
    sh.setFrozenRows(headerRow);
  }
  return sh;
}

function _toISO(val) {
  if (!val) return '';
  if (val instanceof Date) return Utilities.formatDate(val, 'America/Sao_Paulo', 'yyyy-MM-dd');
  var s = String(val);
  if (s.match(/^\d{4}-\d{2}-\d{2}/)) return s.substring(0,10);
  var p = s.split('/');
  if (p.length === 3) return p[2]+'-'+p[1]+'-'+p[0];
  return s;
}

function _toPT(iso) {
  if (!iso) return '';
  var p = String(iso).split('-');
  return p.length === 3 ? p[2]+'/'+p[1]+'/'+p[0] : iso;
}

function _ts() {
  return Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm');
}

function _ok(data)  { return ContentService.createTextOutput(JSON.stringify(Object.assign({ok:true},data))).setMimeType(ContentService.MimeType.JSON); }
function _err(e)    { return ContentService.createTextOutput(JSON.stringify({ok:false,error:e.toString()})).setMimeType(ContentService.MimeType.JSON); }
