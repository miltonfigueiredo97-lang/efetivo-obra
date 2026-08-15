/* ═══════════════════════════════════════════════════════════════
   EFETIVO DE OBRA — núcleo compartilhado (desktop + mobile)
   Carregado por index.html e mobile.html antes do EfPage local.
   ═══════════════════════════════════════════════════════════════ */

/* ═══ STATE + PERSISTÊNCIA ═══ */
const State = (() => {
  const KEY = 'efetivo_v3';
  const DEF = {
    obras: ['Essence Residence'],
    andares: ['2º Subsolo','1º Subsolo','Térreo','1º Pavimento','2º Pavimento','3º Pavimento','4º Pavimento','5º Pavimento','6º Pavimento','7º Pavimento','8º Pavimento','9º Pavimento','10º Pavimento','11º Pavimento','12º Pavimento','13º Pavimento','14º Pavimento','15º Pavimento','16º Pavimento','Cobertura','Área Comum','Guarita'],
    tarefas: ['Alvenaria estrutural – Lado A','Alvenaria estrutural – Lado B','Alvenaria de vedação','Armação positiva','Assoalho','Pontos de graute do andar','Aéreo da hidráulica','Aranhas (instalações)','Operação de Bobcat','Operação da mini grua','Proteção periférica','Marcação da laje','Organização da área comum','Organização e paletamento de blocos','Produção de peças (solda)','Piso do estacionamento','Betoneira','Concretagem','Instalação elétrica','Pintura','Revestimento','Serviços gerais'],
    equipes: [
      {id:'eq1',nome:'Administração',cor:'#a855f7'},
      {id:'eq2',nome:'Alvenaria Estrutural',cor:'#f0a500'},
      {id:'eq3',nome:'Alvenaria de Vedação',cor:'#fb923c'},
      {id:'eq4',nome:'Armação / Ferragem',cor:'#ef4444'},
      {id:'eq5',nome:'Carpintaria',cor:'#22c55e'},
      {id:'eq6',nome:'Hidráulica',cor:'#3b82f6'},
      {id:'eq7',nome:'Elétrica',cor:'#eab308'},
      {id:'eq8',nome:'Geral',cor:'#8b92b0'},
    ],
    workers: [
      {id:'w1',nome:'Raimundo Gonçalo Coelho',funcao:'Mestre de Obras',equipe:'eq1',obra:'Essence Residence'},
      {id:'w2',nome:'Milton de Campos Figueiredo',funcao:'Engenheiro de Obra',equipe:'eq1',obra:'Essence Residence'},
      {id:'w3',nome:'Jordeano Rocha dos Santos',funcao:'Encarregado Civil',equipe:'eq1',obra:'Essence Residence'},
      {id:'w4',nome:'Wilson Robson de Souza',funcao:'Almoxarife',equipe:'eq1',obra:'Essence Residence'},
      {id:'w5',nome:'Vinicius Hideo Takemoto B. do Nascimento',funcao:'Assistente Engenharia',equipe:'eq1',obra:'Essence Residence'},
      {id:'w6',nome:'Cleber Ferreira Miranda',funcao:'Administrativo',equipe:'eq1',obra:'Essence Residence'},
      {id:'w7',nome:'Fabio Lopes dos Santos',funcao:'Ajudante',equipe:'eq8',obra:'Essence Residence'},
      {id:'w8',nome:'Jose Edigleuson Xavier dos Santos',funcao:'Ajudante',equipe:'eq8',obra:'Essence Residence'},
      {id:'w9',nome:'José Pereira da Silva Filho',funcao:'Ajudante',equipe:'eq8',obra:'Essence Residence'},
      {id:'w10',nome:'Lino dos Santos',funcao:'Ajudante',equipe:'eq8',obra:'Essence Residence'},
      {id:'w11',nome:'Juciel',funcao:'Pedreiro / Carpinteiro',equipe:'eq5',obra:'Essence Residence'},
      {id:'w12',nome:'Edson Ramos da Silva',funcao:'Operador de Bobcat',equipe:'eq8',obra:'Essence Residence'},
      {id:'w13',nome:'Edson Fernandes de Almeida',funcao:'Ajudante',equipe:'eq8',obra:'Essence Residence'},
      {id:'w14',nome:'Francisco dos Santos da Silva',funcao:'Ajudante',equipe:'eq8',obra:'Essence Residence'},
      {id:'w15',nome:'Lucas Dantas',funcao:'Soldador',equipe:'eq8',obra:'Essence Residence'},
      {id:'w16',nome:'Genival',funcao:'Pedreiro',equipe:'eq3',obra:'Essence Residence'},
      {id:'w17',nome:'Gildivan',funcao:'Ajudante',equipe:'eq3',obra:'Essence Residence'},
      {id:'w18',nome:'Gilvan Bispo',funcao:'Ajudante',equipe:'eq6',obra:'Essence Residence'},
      {id:'w19',nome:'Lucas Pereira',funcao:'Ajudante',equipe:'eq6',obra:'Essence Residence'},
      {id:'w20',nome:'Valmir da Conceição Barbosa',funcao:'Ajudante',equipe:'eq8',obra:'Essence Residence'},
      {id:'w21',nome:'Wagner (Brinco)',funcao:'Encanador',equipe:'eq6',obra:'Essence Residence'},
      {id:'w22',nome:'Ray Nascimento dos Santos',funcao:'Ajudante',equipe:'eq8',obra:'Essence Residence'},
      {id:'w23',nome:'Edson Fernandes de Morais',funcao:'Ajudante',equipe:'eq8',obra:'Essence Residence'},
      {id:'w24',nome:'Adalberto Ferreira da Silva',funcao:'Bloqueiro',equipe:'eq2',obra:'Essence Residence'},
      {id:'w25',nome:'Jose Vani',funcao:'Bloqueiro',equipe:'eq2',obra:'Essence Residence'},
      {id:'w26',nome:'Silvanildo João da Silva',funcao:'Bloqueiro',equipe:'eq2',obra:'Essence Residence'},
      {id:'w27',nome:'André Borges Evangelista',funcao:'Bloqueiro',equipe:'eq2',obra:'Essence Residence'},
      {id:'w28',nome:'Erivam de Jesus Lima',funcao:'Ajudante',equipe:'eq2',obra:'Essence Residence'},
      {id:'w29',nome:'José de Souza Silva',funcao:'Ajudante',equipe:'eq2',obra:'Essence Residence'},
      {id:'w30',nome:'Samuel Gonçalves Coelho',funcao:'Ajudante',equipe:'eq2',obra:'Essence Residence'},
      {id:'w31',nome:'Jorge Ramos Machado',funcao:'Ajudante',equipe:'eq2',obra:'Essence Residence'},
      {id:'w32',nome:'João Vitor da Silva',funcao:'Ajudante',equipe:'eq2',obra:'Essence Residence'},
      {id:'w33',nome:'Noel Brito',funcao:'Ajudante',equipe:'eq2',obra:'Essence Residence'},
      {id:'w34',nome:'Valdiano Alves Santana',funcao:'Ajudante',equipe:'eq2',obra:'Essence Residence'},
      {id:'w35',nome:'Guilherme Porfirio',funcao:'Armador (Segurança)',equipe:'eq4',obra:'Essence Residence'},
      {id:'w36',nome:'Ezequiel Pereira dos Santos',funcao:'Encanador',equipe:'eq6',obra:'Essence Residence'},
      {id:'w37',nome:'Eugenio Ribeiro de Souza',funcao:'Armador',equipe:'eq4',obra:'Essence Residence'},
      {id:'w38',nome:'Francisco Ramylo Nascimento Silva',funcao:'Armador',equipe:'eq4',obra:'Essence Residence'},
      {id:'w39',nome:'Junior Pereira',funcao:'Armador',equipe:'eq4',obra:'Essence Residence'},
      {id:'w40',nome:'Roniel Brito Gois',funcao:'Armador',equipe:'eq4',obra:'Essence Residence'},
      {id:'w41',nome:'Cleto de Souza Santos',funcao:'Carpinteiro',equipe:'eq5',obra:'Essence Residence'},
      {id:'w42',nome:'Genilson Soares Maciel',funcao:'Carpinteiro',equipe:'eq5',obra:'Essence Residence'},
      {id:'w43',nome:'Jose Amorim da Rocha',funcao:'Carpinteiro',equipe:'eq5',obra:'Essence Residence'},
      {id:'w44',nome:'Rodrigo Mendes da Silva',funcao:'Carpinteiro',equipe:'eq5',obra:'Essence Residence'},
      {id:'w45',nome:'Vagner Araujo de Morais',funcao:'Carpinteiro',equipe:'eq5',obra:'Essence Residence'},
      {id:'w46',nome:'Jose Ramalho da Silva',funcao:'Carpinteiro',equipe:'eq5',obra:'Essence Residence'},
      {id:'w47',nome:'Thiago da Silva',funcao:'Ajudante',equipe:'eq8',obra:'Essence Residence'},
    ],
    // dailyData[obra][date][wid] = {presente, andar, tarefas[], motivo}
    dailyData: {},
    // producao[obra] = {areaAlv, areaLaje, volGraute, volArg, volConc, acoAlv, acoLaje, mestre, engenheiro, encarregado, almoxarife, assistente, administrativo}
    producaoGeral: {},
    // producaoDiaria[obra][date] = {alvEst:{vol,qtd}, alvVed:{vol,qtd}, concretagens:[{local,volume}]}
    producaoDiaria: {},
    // horasExtras[obra] = [{id, data, registros:[{wid, horas}]}]
    horasExtras: {},
    historico: [],
    gsUrl: (window.EFETIVO_CONFIG||{}).gsUrl || '',
    gsSheetId: (window.EFETIVO_CONFIG||{}).gsSheetId || '',
    gsKey: '',
    activeObra: 'Essence Residence',
  };

  let d = {};

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      d = raw ? _merge(DEF, JSON.parse(raw)) : JSON.parse(JSON.stringify(DEF));
    } catch(e) { d = JSON.parse(JSON.stringify(DEF)); }
    // Garantir URL e ID sempre presentes
    if (!d.gsUrl) d.gsUrl = (window.EFETIVO_CONFIG||{}).gsUrl || '';
    if (!d.gsSheetId) d.gsSheetId = (window.EFETIVO_CONFIG||{}).gsSheetId || '';
    // Deduplicar andares e tarefas
    if (d.andares) d.andares = d.andares.filter(function(a,i){return d.andares.indexOf(a)===i;});
    // Normalizar tarefas antigas (strings) para objetos {nome, equipes}
    if (d.tarefas && d.tarefas.length > 0 && typeof d.tarefas[0] === 'string') {
      d.tarefas = d.tarefas.map(function(t){ return {nome:t, equipes:[]}; });
    }
  }

  function save(context) {
    try {
      localStorage.setItem(KEY, JSON.stringify(d));
      const el = document.getElementById('lastSaved');
      if (el) { const n=new Date(); el.textContent=String(n.getHours()).padStart(2,'0')+':'+String(n.getMinutes()).padStart(2,'0'); }
      _syncToSheets(context);
    } catch(e) {}
  }

  let _syncTimer = null;
  let _pendingCtx = {};
  function _syncToSheets(context) {
    if (context) _pendingCtx[context] = true;
    clearTimeout(_syncTimer);
    _syncTimer = setTimeout(async function() {
      const ctx = Object.assign({}, _pendingCtx);
      _pendingCtx = {};
      if (!d.gsUrl || !d.gsSheetId) return;
      if (ctx.workers) await Sheets.saveWorkers();
      if (ctx.config)  await Sheets.saveConfig();
      // CORREÇÃO: marcações de presença agora sobem sozinhas, sem depender
      // de o usuário clicar em "Salvar Relatório".
      if (ctx.efetivo && typeof App !== 'undefined') {
        await Sheets.saveEfetivo(App.date(), App.obra());
      }
      _dirty = false;
    }, 1500);
  }

  // Enquanto houver alteração local ainda não enviada, _loadFromSheets
  // não pode sobrescrever o localStorage.
  let _dirty = false;
  function isDirty() { return _dirty || Object.keys(_pendingCtx).length > 0; }

  function _merge(t, s) {
    const o = Object.assign({}, t);
    for (const k in s) {
      if (s[k] && typeof s[k]==='object' && !Array.isArray(s[k])) o[k] = _merge(t[k]||{}, s[k]);
      else o[k] = s[k];
    }
    return o;
  }

  function get() { return d; }

  function getDayData(obra, date, wid) {
    if (!d.dailyData[obra]) d.dailyData[obra] = {};
    if (!d.dailyData[obra][date]) d.dailyData[obra][date] = {};
    if (!d.dailyData[obra][date][wid]) d.dailyData[obra][date][wid] = {presente:true, andar:'', tarefas:[], motivo:''};
    return d.dailyData[obra][date][wid];
  }

  function setDayField(obra, date, wid, field, val) {
    getDayData(obra, date, wid)[field] = val;
    _dirty = true;
    save('efetivo');
  }

  function getEquipe(id) { return d.equipes.find(e=>e.id===id||e.nome===id); }
  function getWorker(id) { return d.workers.find(w=>w.id===id); }
  function addWorker(w) { w.id='w'+Date.now(); d.workers.push(w); save('workers'); return w; }
  function updateWorker(id,f) { const w=d.workers.find(x=>x.id===id); if(w) Object.assign(w,f); save('workers'); }
  function removeWorker(id) { d.workers=d.workers.filter(w=>w.id!==id); save('workers'); }
  function addObra(n) { if(!d.obras.includes(n)){d.obras.push(n);save('config');} }
  function removeObra(n) { d.obras=d.obras.filter(o=>o!==n); save('config'); }
  function addAndar(v) { d.andares.push(v); save('config'); }
  function removeAndar(i) { d.andares.splice(i,1); save('config'); }
  function addTarefa(v) { d.tarefas.push(typeof v==='string'?{nome:v,equipes:[]}:v); save('config'); }
  function removeTarefa(i) { d.tarefas.splice(i,1); save('config'); }
  function addEquipe(e) { e.id='eq'+Date.now(); d.equipes.push(e); save('config'); return e; }
  function removeEquipe(id) { d.equipes=d.equipes.filter(e=>e.id!==id); save('config'); }
  function addHistorico(h) { d.historico.unshift(h); if(d.historico.length>200) d.historico=d.historico.slice(0,200); save(); }

  // Horas extras
  function getHE(obra) { if(!d.horasExtras[obra]) d.horasExtras[obra]=[]; return d.horasExtras[obra]; }
  function addHE(obra, entry) { getHE(obra).unshift(entry); save(); }
  function removeHE(obra, id) { d.horasExtras[obra]=getHE(obra).filter(e=>e.id!==id); save(); }

  return { load,save,get, isDirty, getDayData,setDayField, getEquipe,getWorker,
    addWorker,updateWorker,removeWorker, addObra,removeObra,
    addAndar,removeAndar, addTarefa,removeTarefa, addEquipe,removeEquipe,
    addHistorico, getHE,addHE,removeHE };
})();

/* ═══ UTILS ═══ */
const Utils = (() => {
  const WD = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];
  const MS = ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
  const MN = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];

  function todayStr() { return new Date().toISOString().split('T')[0]; }
  function dateFrom(s) { return new Date(s+'T12:00:00'); }
  function pad(n) { return String(n).padStart(2,'0'); }
  function fmtPT(s) { const d=dateFrom(s); return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()}`; }
  function fmtLong(s) { const d=dateFrom(s); return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} – ${WD[d.getDay()]}`; }
  function weekday(s) { return WD[dateFrom(s).getDay()]; }
  function monthShort(s) { return MS[dateFrom(s).getMonth()]; }
  function isSunday(s) { return dateFrom(s).getDay()===0; }
  function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function toast(msg, type='success') {
    const icons={success:'✅',error:'❌',info:'ℹ️',warn:'⚠️'};
    const c=document.getElementById('toastContainer');
    if(!c) return;
    const t=document.createElement('div');
    t.className=`toast ${type}`;
    t.innerHTML=`<span>${icons[type]||'✅'}</span><span>${msg}</span>`;
    c.appendChild(t);
    setTimeout(()=>t.remove(),3300);
  }

  function copy(text, msg='Copiado!') {
    navigator.clipboard.writeText(text).then(()=>toast(msg)).catch(()=>{
      const ta=document.createElement('textarea');
      ta.value=text; document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta); toast(msg);
    });
  }

  return { todayStr,dateFrom,pad,fmtPT,fmtLong,weekday,monthShort,isSunday,esc,toast,copy };
})();

/* ═══ GOOGLE SHEETS ═══ */
const Sheets = (() => {
  const CODE = `// EFETIVO DE OBRA – Apps Script v6
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
      if (r[2]) state.tarefas.push(String(r[2]).trim());
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
    sh.appendRow([andares[i]||'','',tarefas[i]||'','',equipes[i]?(equipes[i].id+'|'+equipes[i].nome+'|'+equipes[i].cor):'','',obras[i]||'','']);
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
`;

  async function _post(payload) {
    const s = State.get();
    if (!s.gsUrl || !s.gsSheetId) return false;
    const body = JSON.stringify({...payload, sheetId: s.gsSheetId, key: s.gsKey || ''});
    // Tenta em modo 'cors' para conseguir LER a resposta e saber se gravou.
    // O Apps Script responde com CORS no redirect, e Content-Type text/plain
    // evita o preflight. Se o ambiente barrar, cai para no-cors (cego).
    try {
      const res = await fetch(s.gsUrl, {
        method: 'POST', mode: 'cors',
        headers: {'Content-Type': 'text/plain;charset=utf-8'},
        body
      });
      const json = await res.json();
      if (json.ok === false) {
        Utils.toast('Falha ao salvar: ' + (json.error || 'erro'), 'error');
        return false;
      }
      return true;
    } catch(e) {
      try {
        await fetch(s.gsUrl, {
          method: 'POST', mode: 'no-cors',
          headers: {'Content-Type': 'text/plain;charset=utf-8'},
          body
        });
        return true;
      } catch(e2) {
        Utils.toast('Sem conexão — salvo só neste aparelho.', 'warn');
        return false;
      }
    }
  }

  async function loadState() {
    const s = State.get();
    if (!s.gsUrl || !s.gsSheetId) return null;
    try {
      const res = await fetch(s.gsUrl + '?sheetId=' + s.gsSheetId + '&key=' + encodeURIComponent(s.gsKey||''), {method:'GET', mode:'cors'});
      const json = await res.json();
      return json.ok ? json.state : null;
    } catch(e) { return null; }
  }

  async function saveWorkers() {
    return _post({action:'saveWorkers', workers: State.get().workers});
  }

  async function saveEfetivo(date, obra) {
    const s = State.get();
    const dayMap = s.dailyData?.[obra]?.[date] || {};
    const workers = s.workers.filter(w => w.obra === obra).map(w => {
      const dd = dayMap[w.id] || {presente:true, andar:'', tarefas:[]};
      const eq = s.equipes.find(e => e.id === w.equipe);
      return {nome:w.nome, funcao:w.funcao, equipe:eq?eq.nome:w.equipe,
              presente:dd.presente!==false, andar:dd.andar||'', tarefas:dd.tarefas||[]};
    });
    return _post({action:'saveEfetivo', data:date, obra, workers, state:s});
  }

  async function saveRelatorio(date, obra, total, texto) {
    return _post({action:'saveRelatorio', data:date, obra, total, texto});
  }

  async function saveConfig() {
    const s = State.get();
    return _post({action:'saveConfig', andares:s.andares, tarefas:s.tarefas, equipes:s.equipes, obras:s.obras});
  }

  async function saveHE(obra, entries) {
    // entries é array de {id, data, tipo, registros:[{wid,nome,funcao,horas}]}
    // Flatten para linhas individuais para o Apps Script
    const rows = [];
    (entries||[]).forEach(function(entry) {
      (entry.registros||[]).forEach(function(r) {
        rows.push({id:entry.id+'_'+r.wid, data:entry.data, tipo:entry.tipo, nome:r.nome, funcao:r.funcao, horas:r.horas});
      });
    });
    return _post({action:'saveHE', obra, registros:rows});
  }

  async function deleteHE(id) {
    return _post({action:'deleteHE', id});
  }

  async function saveProd(date, obra, geral, diario) {
    return _post({action:'saveProd', data:date, obra, geral, diario});
  }

  async function ping(url, key) {
    try {
      const r = await fetch(url + '?ping=1&key=' + encodeURIComponent(key||''), {method:'GET', mode:'cors'});
      const j = await r.json();
      return j.ok === true;
    } catch { return false; }
  }

  return { CODE, loadState, saveWorkers, saveEfetivo, saveRelatorio, saveConfig, saveProd, saveHE, deleteHE, ping };
})();


/* ═══ VERSÕES / NOTAS DA VERSÃO ═══
   Toda atualização entra aqui no topo. Formato:
   {v, data, titulo, notas:[{tipo, texto}]}
   tipo: 'novo' | 'correcao' | 'melhoria' | 'seguranca'
*/
const Versoes = (() => {
  const LISTA = [
    {
      v: '1.0.0',
      data: '2026-08-15',
      titulo: 'Primeira versão estável',
      notas: [
        {tipo:'novo', texto:'Efetivo diário: presença, andar/local, atividades e motivo de falta por funcionário.'},
        {tipo:'novo', texto:'Cadastro de funcionários com equipes, funções e importação por lista.'},
        {tipo:'novo', texto:'Relatório de execução: áreas, volumes de graute/argamassa/concreto, aço e concretagens programadas.'},
        {tipo:'novo', texto:'Gerador de texto do efetivo formatado para WhatsApp, agrupado por andar.'},
        {tipo:'novo', texto:'Horas extras em duas etapas, com tipos de 60% e 100%.'},
        {tipo:'novo', texto:'Desempenho e assiduidade por funcionário.'},
        {tipo:'novo', texto:'Histórico de relatórios gerados.'},
        {tipo:'novo', texto:'Suporte a múltiplas obras com seleção de obra ativa.'},
        {tipo:'novo', texto:'Sincronização com Google Sheets via Apps Script.'},
        {tipo:'novo', texto:'Esta página de notas da versão.'},

        {tipo:'correcao', texto:'Marcações de presença não são mais apagadas ao recarregar: a sincronização agora faz merge em vez de sobrescrever, e cada marcação sobe sozinha em 1,5s.'},
        {tipo:'correcao', texto:'Botão "Gerar Relatório" chamava um método inexistente e falhava em silêncio — o relatório nunca chegava à planilha.'},
        {tipo:'correcao', texto:'Novas obras não eram salvas na planilha e sumiam no recarregamento.'},
        {tipo:'correcao', texto:'Equipes criadas pelo app perdiam o vínculo com seus funcionários após sincronizar, porque o ID não era gravado na planilha.'},
        {tipo:'correcao', texto:'Informações Gerais de produção eram zeradas a cada sincronização: a planilha gravava a aba de produção mas nunca a lia de volta.'},
        {tipo:'correcao', texto:'Cadastros criados offline ou logo antes de fechar o app não eram mais perdidos.'},
        {tipo:'correcao', texto:'Falhas de gravação agora avisam na tela; antes toda gravação era reportada como sucesso.'},
        {tipo:'correcao', texto:'Setas de ordenação das colunas no desktop não atualizavam ao clicar.'},
        {tipo:'correcao', texto:'Itens sem estilo no mobile por classes de CSS inexistentes.'},

        {tipo:'seguranca', texto:'Acesso à planilha protegido por chave, guardada apenas no aparelho e nunca no código.'},
        {tipo:'seguranca', texto:'URL e ID da planilha movidos para config.js e removidos das respostas da API.'},

        {tipo:'melhoria', texto:'Código de desktop e mobile unificado em app.js: 4.506 linhas passaram a 3.183, sem duplicação.'},
      ]
    },
  ];

  const ICONE = {novo:'✨', correcao:'🔧', melhoria:'⚡', seguranca:'🔒'};
  const ROTULO = {novo:'Novo', correcao:'Correção', melhoria:'Melhoria', seguranca:'Segurança'};
  const COR = {novo:'var(--gn)', correcao:'var(--ac)', melhoria:'var(--bl)', seguranca:'#a855f7'};

  function atual() { return LISTA[0].v; }
  function lista() { return LISTA; }

  let _aberta = LISTA[0].v;

  function toggle(v) {
    _aberta = (_aberta === v) ? null : v;
    render();
  }

  function render() {
    const el = document.getElementById('verContent');
    if (!el) return;
    el.innerHTML = LISTA.map(function(rel) {
      const aberta = _aberta === rel.v;
      const grupos = {};
      rel.notas.forEach(function(n) { (grupos[n.tipo] = grupos[n.tipo] || []).push(n.texto); });

      const corpo = !aberta ? '' :
        '<div style="padding:0 16px 16px">' +
        ['novo','correcao','melhoria','seguranca'].filter(function(t){return grupos[t];}).map(function(t) {
          return '<div style="margin-top:14px">' +
            '<div style="font-size:11px;letter-spacing:1.2px;color:' + COR[t] + ';margin-bottom:7px;font-weight:600">' +
              ICONE[t] + ' ' + ROTULO[t].toUpperCase() + ' · ' + grupos[t].length +
            '</div>' +
            grupos[t].map(function(txt) {
              return '<div style="display:flex;gap:9px;padding:6px 0;font-size:13px;color:var(--t2);line-height:1.55">' +
                     '<span style="color:' + COR[t] + ';flex-shrink:0">•</span><span>' + Utils.esc(txt) + '</span></div>';
            }).join('') +
          '</div>';
        }).join('') + '</div>';

      return '<div style="background:var(--sf);border:1px solid ' + (aberta?'var(--bd2)':'var(--bd)') + ';border-radius:var(--r);margin-bottom:12px;overflow:hidden">' +
        '<div onclick="Versoes.toggle(\'' + rel.v + '\')" style="padding:14px 16px;cursor:pointer;display:flex;align-items:center;gap:12px">' +
          '<div style="font-family:\'Bebas Neue\',sans-serif;font-size:22px;color:var(--ac);line-height:1;letter-spacing:1px">v' + rel.v + '</div>' +
          '<div style="flex:1;min-width:0">' +
            '<div style="font-size:13px;font-weight:600;color:var(--t1)">' + Utils.esc(rel.titulo) + '</div>' +
            '<div style="font-size:11px;color:var(--t3);font-family:\'JetBrains Mono\',monospace;margin-top:2px">' +
              Utils.fmtPT(rel.data) + ' · ' + rel.notas.length + ' alterações</div>' +
          '</div>' +
          '<span style="color:var(--t3);font-size:13px;transition:transform .15s;display:inline-block;transform:rotate(' + (aberta?'90':'0') + 'deg)">▸</span>' +
        '</div>' + corpo +
      '</div>';
    }).join('');
  }

  return { render, toggle, atual, lista };
})();

/* ═══ MODALS ═══ */
const Modals = (() => {
  function open(id) {
    document.getElementById('modalBackdrop').classList.add('open');
    document.querySelectorAll('.modal').forEach(m=>m.style.display='none');
    const m=document.getElementById(id);
    if(m) m.style.display = id==='modalHE' ? 'flex' : 'block';
    if(id==='modalObra') _renderObraOpts();
  }
  function close(id) {
    const m=document.getElementById(id);
    if(m) m.style.display='none';
    if(!Array.from(document.querySelectorAll('.modal')).some(m=>m.style.display!=='none'))
      document.getElementById('modalBackdrop').classList.remove('open');
  }
  function closeAll(e) {
    if(e&&e.target!==document.getElementById('modalBackdrop')) return;
    document.querySelectorAll('.modal').forEach(m=>m.style.display='none');
    document.getElementById('modalBackdrop').classList.remove('open');
  }
  function _renderObraOpts() {
    const s=State.get(); const obra=App.obra();
    document.getElementById('obraOptions').innerHTML=s.obras.map(o=>`
      <div class="obra-option ${o===obra?'selected':''}" onclick="App.setObra('${Utils.esc(o)}');Modals.close('modalObra')">
        <span>${Utils.esc(o)}</span>${o===obra?'<span>✓</span>':''}
      </div>`).join('');
  }
  function openWorker(wid) {
    const s=State.get();
    document.getElementById('wTeam').innerHTML=s.equipes.map(e=>`<option value="${e.id}">${e.nome}</option>`).join('');
    document.getElementById('wObra').innerHTML=s.obras.map(o=>`<option value="${Utils.esc(o)}" ${o===App.obra()?'selected':''}>${Utils.esc(o)}</option>`).join('');
    if(wid) {
      const w=State.getWorker(wid);
      document.getElementById('mwTitle').textContent='Editar Funcionário';
      document.getElementById('wEditId').value=wid;
      document.getElementById('wName').value=w.nome;
      document.getElementById('wRole').value=w.funcao;
      document.getElementById('wTeam').value=w.equipe;
      document.getElementById('wObra').value=w.obra;
    } else {
      document.getElementById('mwTitle').textContent='Novo Funcionário';
      document.getElementById('wEditId').value='';
      document.getElementById('wName').value='';
      document.getElementById('wRole').value='';
    }
    open('modalWorker');
  }
  function openMove(wid) {
    const s=State.get(); const w=State.getWorker(wid);
    document.getElementById('mvWid').value=wid;
    document.getElementById('mvName').textContent=w?w.nome:'';
    document.getElementById('mvObra').innerHTML=s.obras.filter(o=>o!==w?.obra).map(o=>`<option value="${Utils.esc(o)}">${Utils.esc(o)}</option>`).join('');
    open('modalMove');
  }
  function openImport() {
    const s=State.get();
    document.getElementById('impObra').innerHTML=s.obras.map(o=>`<option value="${Utils.esc(o)}" ${o===App.obra()?'selected':''}>${Utils.esc(o)}</option>`).join('');
    document.getElementById('impEquipe').innerHTML=s.equipes.map(e=>`<option value="${e.id}">${e.nome}</option>`).join('');
    document.getElementById('impText').value='';
    open('modalImport');
  }
  return {open,close,closeAll,openWorker,openMove,openImport};
})();

/* ═══ FUNCIONÁRIOS PAGE ═══ */
const FuncPage = (() => {
  function render() {
    const s=State.get();
    const q=(document.getElementById('funcSearch')?.value||'').toLowerCase();
    const sort=document.getElementById('funcSort')?.value||'nome';
    let ws=[...s.workers];
    if(q) ws=ws.filter(w=>w.nome.toLowerCase().includes(q)||w.funcao.toLowerCase().includes(q));
    ws.sort((a,b)=>{
      if(sort==='nome_z') return String(b.nome||'').localeCompare(String(a.nome||''),'pt-BR');
      if(sort==='cargo') return String(a.funcao||'').localeCompare(String(b.funcao||''),'pt-BR');
      if(sort==='equipe') { const ea=(State.getEquipe(a.equipe)||{}).nome||''; const eb=(State.getEquipe(b.equipe)||{}).nome||''; return ea.localeCompare(eb,'pt-BR'); }
      if(sort==='obra') return String(a.obra||'').localeCompare(String(b.obra||''),'pt-BR');
      return String(a.nome||'').localeCompare(String(b.nome||''),'pt-BR');
    });
    const el=document.getElementById('funcList');
    if(!el) return;
    if(!ws.length){el.innerHTML=`<div class="empty">Nenhum funcionário encontrado.</div>`;return;}
    el.innerHTML=ws.map(w=>{
      const eq=State.getEquipe(w.equipe);
      const cor=eq?eq.cor:'#8b92b0';
      return `<div class="func-card">
        <div class="func-info">
          <div class="func-name">${Utils.esc(w.nome)}</div>
          <div class="func-meta"><span class="team-badge" style="background:${cor}22;color:${cor};border:1px solid ${cor}44">${Utils.esc(eq?eq.nome:w.equipe)}</span> ${Utils.esc(w.funcao)} · ${Utils.esc(w.obra)}</div>
        </div>
        <div class="func-actions">
          <button class="icon-btn" onclick="Modals.openWorker('${w.id}')">✏️</button>
          <button class="icon-btn" onclick="Modals.openMove('${w.id}')">↗</button>
          <button class="icon-btn danger" onclick="FuncPage.remove('${w.id}')">✕</button>
        </div>
      </div>`;
    }).join('');
  }
  function save() {
    const nome=document.getElementById('wName').value.trim();
    const funcao=document.getElementById('wRole').value.trim();
    const equipe=document.getElementById('wTeam').value;
    const obra=document.getElementById('wObra').value;
    const eid=document.getElementById('wEditId').value;
    if(!nome||!funcao){Utils.toast('Preencha nome e função.','warn');return;}
    if(eid) State.updateWorker(eid,{nome,funcao,equipe,obra});
    else State.addWorker({nome,funcao,equipe,obra});
    Modals.close('modalWorker');
    render();
    if(typeof EfPage!=='undefined') EfPage.render();
    Utils.toast(eid?'Atualizado!':'Adicionado!','success');
  }
  function remove(id) {
    const w=State.getWorker(id);
    if(!w||!confirm(`Remover "${w.nome}"?`)) return;
    State.removeWorker(id); render();
    if(typeof EfPage!=='undefined') EfPage.render();
    Utils.toast('Removido.','info');
  }
  function confirmMove() {
    const id=document.getElementById('mvWid').value;
    const obra=document.getElementById('mvObra').value;
    State.updateWorker(id,{obra});
    Modals.close('modalMove'); render();
    if(typeof EfPage!=='undefined') EfPage.render();
    Utils.toast('Movido.','success');
  }
  function importW() {
    const text=document.getElementById('impText').value.trim();
    const obra=document.getElementById('impObra').value;
    const equipe=document.getElementById('impEquipe').value;
    if(!text){Utils.toast('Cole a lista.','warn');return;}
    let n=0;
    text.split('\n').filter(l=>l.trim()).forEach(line=>{
      const p=line.split(/–|-/).map(x=>x.trim());
      if(p[0]){State.addWorker({nome:p[0],funcao:p[1]||'Ajudante',equipe,obra});n++;}
    });
    Modals.close('modalImport'); render();
    if(typeof EfPage!=='undefined') EfPage.render();
    Utils.toast(`${n} importados!`,'success');
  }
  return {render,save,remove,confirmMove,importW};
})();

/* ═══ DESEMPENHO PAGE ═══ */
const StatPage = (() => {
  function render() {
    const s=State.get(); const obra=App.obra(); const date=App.date();
    const ws=s.workers.filter(w=>w.obra===obra);
    const att={};
    if(s.dailyData[obra]) {
      Object.entries(s.dailyData[obra]).forEach(([d,dayMap])=>{
        Object.entries(dayMap).forEach(([wid,dd])=>{
          if(!att[wid]) att[wid]={dias:0,total:0};
          att[wid].total++;
          if(dd.presente) att[wid].dias++;
        });
      });
    }
    const hoje=ws.filter(w=>{ const dd=s.dailyData[obra]?.[date]?.[w.id]; return !dd||dd.presente; }).length;
    const rel=s.historico.filter(h=>h.obra===obra).length;
    const avg=ws.length?Math.round(ws.reduce((sum,w)=>{const a=att[w.id];return sum+(a&&a.total?a.dias/a.total*100:100);},0)/ws.length):0;
    const el=document.getElementById('statContent');
    if(!el) return;
    el.innerHTML=`
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-lbl">Funcionários</div><div class="stat-val">${ws.length}</div></div>
        <div class="stat-card"><div class="stat-lbl">Hoje</div><div class="stat-val" style="color:var(--gn)">${hoje}</div></div>
        <div class="stat-card"><div class="stat-lbl">Relatórios</div><div class="stat-val">${rel}</div></div>
        <div class="stat-card"><div class="stat-lbl">Assiduidade</div><div class="stat-val" style="color:${avg>=90?'var(--gn)':avg>=75?'var(--ac)':'var(--rd)'}">${avg}%</div></div>
      </div>
      <div class="att-list">
        ${ws.map(w=>{
          const a=att[w.id]||{dias:0,total:0};
          const pct=a.total?Math.round(a.dias/a.total*100):100;
          const cls=pct>=90?'good':pct>=75?'warn':'danger';
          const cor=pct>=90?'var(--gn)':pct>=75?'var(--ac)':'var(--rd)';
          const eq=State.getEquipe(w.equipe); const ecor=eq?eq.cor:'#8b92b0';
          return `<div class="att-card">
            <div class="att-top">
              <div class="att-info">
                <div class="att-name">${Utils.esc(w.nome)}</div>
                <div class="att-role"><span class="team-badge" style="background:${ecor}22;color:${ecor};border:1px solid ${ecor}44">${Utils.esc(eq?eq.nome:w.equipe)}</span> ${Utils.esc(w.funcao)}</div>
              </div>
              <div style="font-family:'Bebas Neue',sans-serif;font-size:26px;color:${cor}">${pct}%</div>
            </div>
            <div class="bar-wrap"><div class="bar-bg"><div class="bar-fill ${cls}" style="width:${pct}%"></div></div><span style="font-size:10px;color:var(--t3);font-family:'JetBrains Mono',monospace">${a.dias}/${a.total}</span></div>
          </div>`;
        }).join('')}
      </div>`;
  }
  return {render};
})();

/* ═══ HISTÓRICO PAGE ═══ */
const HistPage = (() => {
  let cur='';
  function render() {
    const s=State.get(); const obra=App.obra();
    const hist=s.historico.filter(h=>h.obra===obra);
    const el=document.getElementById('histContent');
    if(!el) return;
    if(!hist.length){el.innerHTML=`<div class="empty">Nenhum relatório gerado ainda.</div>`;return;}
    el.innerHTML=`<div class="hist-list">${hist.map((h,i)=>`
      <div class="hist-card" onclick="HistPage.open(${i})">
        <div><div style="font-family:'Bebas Neue',sans-serif;font-size:30px;color:var(--ac)">${Utils.pad(Utils.dateFrom(h.data).getDate())}</div>
          <div style="font-size:10px;color:var(--t3)">${Utils.monthShort(h.data)}</div></div>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:600">${Utils.esc(h.obra)}</div>
          <div style="font-size:11px;color:var(--t3)">${Utils.weekday(h.data)}</div>
          <div style="font-size:12px;color:var(--t2);font-family:'JetBrains Mono',monospace;margin-top:4px">👷 ${h.total}</div>
        </div>
        <div style="color:var(--t3);font-size:20px">›</div>
      </div>`).join('')}</div>`;
  }
  function open(i) {
    const s=State.get(); const obra=App.obra();
    const hist=s.historico.filter(h=>h.obra===obra);
    const h=hist[i]; if(!h) return;
    cur=h.texto;
    document.getElementById('histDetailTitle').textContent=`Efetivo – ${Utils.fmtPT(h.data)}`;
    document.getElementById('histDetailText').textContent=h.texto;
    Modals.open('modalHistDetail');
  }
  function copyCur() { Utils.copy(cur,'Copiado!'); }
  return {render,open,copyCur};
})();

/* ═══ CONFIG PAGE ═══ */
const CfgPage = (() => {
  function render() {
    const s=State.get();
    const el=document.getElementById('cfgContent');
    if(!el) return;
    el.innerHTML=`
      ${blk('🏢 Andares / Locais',
        s.andares.map((a,i)=>itm(a,`CfgPage.rmAndar(${i})`)).join(''),
        `<div class="add-item-row"><input id="newAndar" placeholder="ex: 17º Pavimento"><button class="btn btn-accent" onclick="CfgPage.addAndar()">Add</button></div>`)}
      ${blk('⚒ Atividades',
        s.tarefas.map((t,i)=>itmTarefa(t,i,s.equipes)).join(''),
        `<div class="add-item-row"><input id="newTarefa" placeholder="ex: Instalação elétrica"><button class="btn btn-accent" onclick="CfgPage.addTarefa()">Add</button></div>`)}
      ${blk('👥 Equipes',
        s.equipes.map(e=>`<div class="settings-item"><span class="color-dot" style="background:${e.cor}"></span><span style="flex:1">${Utils.esc(e.nome)}</span><button class="icon-btn danger" onclick="CfgPage.rmEquipe('${e.id}')">✕</button></div>`).join(''),
        `<div class="add-item-row"><input id="newEquipe" placeholder="Nova equipe"><input type="color" id="newEquipeCor" value="#22c55e" style="width:40px;padding:3px;border-radius:6px;border:1px solid var(--bd2);cursor:pointer;background:none"><button class="btn btn-accent" onclick="CfgPage.addEquipe()">Add</button></div>`)}
      ${blk('🏗 Obras',
        s.obras.map((o,i)=>`<div class="settings-item"><span style="flex:1">${Utils.esc(o)}</span>${i===0?'<span style="font-size:10px;color:var(--t3)">principal</span>':`<button class="icon-btn danger" onclick="CfgPage.rmObra('${Utils.esc(o)}')">✕</button>`}</div>`).join(''),
        `<div class="add-item-row"><input id="newObra" placeholder="Nova obra"><button class="btn btn-accent" onclick="CfgPage.addObra()">Add</button></div>`)}
      ${blk('🔗 Google Sheets',
        `<div class="form-g"><label>URL do Web App</label><input class="finput" id="gsUrl" placeholder="https://script.google.com/macros/s/…/exec" value="${Utils.esc(s.gsUrl)}" style="font-size:11px;font-family:'JetBrains Mono',monospace"></div>
         <div class="form-g"><label>ID da Planilha</label><input class="finput" id="gsSheetId" placeholder="1BxiMVs0XRA5…" value="${Utils.esc(s.gsSheetId)}" style="font-family:'JetBrains Mono',monospace"></div>
         <div class="form-g"><label>Chave de acesso</label><input class="finput" type="password" id="gsKey" placeholder="digite uma vez neste aparelho" value="${Utils.esc(s.gsKey||'')}" style="font-family:'JetBrains Mono',monospace">
           <div style="font-size:10px;color:var(--t3);margin-top:4px;line-height:1.5">Fica salva só neste aparelho. Nunca colocar no código — o site é público.</div></div>
         <div style="display:flex;gap:8px;margin-top:6px">
           <button class="btn btn-accent" onclick="CfgPage.saveGS()">Salvar</button>
           <button class="btn btn-ghost" onclick="CfgPage.testGS()">Testar</button>
           <button class="btn btn-ghost" onclick="CfgPage.showScript()">Ver código Script</button>
         </div>`,
        '')}
    `;
  }
  function blk(title,body,footer) {
    return `<div class="settings-section"><div class="settings-section-title">${title}</div><div class="settings-section-body">${body}${footer}</div></div>`;
  }
  function itm(text,fn) {
    return `<div class="settings-item"><span style="flex:1">${Utils.esc(text)}</span><button class="icon-btn danger" style="width:24px;height:24px;font-size:11px" onclick="${fn}">✕</button></div>`;
  }
  function itmTarefa(t, i, equipes) {
    const nome = typeof t==='string' ? t : (t.nome||'');
    const eqsVinc = typeof t==='string' ? [] : (t.equipes||[]);
    const chips = equipes.map(e => {
      const sel = eqsVinc.includes(e.nome);
      return `<span onclick="CfgPage.toggleTarefaEq(${i},'${Utils.esc(e.nome)}')" style="cursor:pointer;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:600;border:1px solid ${sel?e.cor+'88':'var(--bd2)'};background:${sel?e.cor+'22':'transparent'};color:${sel?e.cor:'var(--t3)'};transition:all .15s">${Utils.esc(e.nome)}</span>`;
    }).join('');
    return `<div class="settings-item" style="flex-direction:column;align-items:flex-start;gap:6px;padding:10px 12px">
      <div style="display:flex;width:100%;align-items:center;gap:8px">
        <span style="flex:1;font-size:13px">${Utils.esc(nome)}</span>
        <button class="icon-btn" style="width:24px;height:24px;font-size:11px;flex-shrink:0" onclick="CfgPage.editTarefa(${i})">✏️</button>
      <button class="icon-btn danger" style="width:24px;height:24px;font-size:11px;flex-shrink:0" onclick="CfgPage.rmTarefa(${i})">✕</button>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:4px">${chips || '<span style="font-size:10px;color:var(--t3)">Global (todas as equipes)</span>'}</div>
    </div>`;
  }
  function addAndar(){const v=document.getElementById('newAndar').value.trim();if(!v)return;State.addAndar(v);document.getElementById('newAndar').value='';render();if(typeof EfPage!=='undefined')EfPage.renderFilters();}
  function rmAndar(i){State.removeAndar(i);render();if(typeof EfPage!=='undefined')EfPage.renderFilters();}
  function addTarefa(){const v=document.getElementById('newTarefa').value.trim();if(!v)return;State.addTarefa(v);document.getElementById('newTarefa').value='';render();}
  function rmTarefa(i){State.removeTarefa(i);render();}
  function editTarefa(i){
    const s=State.get();
    const t=s.tarefas[i];
    const nome=typeof t==='string'?t:t.nome;
    const novo=prompt('Editar atividade:',nome);
    if(!novo||!novo.trim()||novo.trim()===nome) return;
    if(typeof t==='string') s.tarefas[i]={nome:novo.trim(),equipes:[]};
    else t.nome=novo.trim();
    State.save('config');
    render();
  }
  function setTarefaEqs(i, sel) {
    const s = State.get();
    const t = s.tarefas[i];
    if (!t) return;
    const eqs = Array.from(sel.selectedOptions).map(o=>o.value);
    if (typeof t === 'string') s.tarefas[i] = {nome:t, equipes:eqs};
    else t.equipes = eqs;
    State.save('config');
  }
  function toggleTarefaEq(i, eqNome) {
    const s = State.get();
    const t = s.tarefas[i];
    if (!t) return;
    if (typeof t === 'string') s.tarefas[i] = {nome:t, equipes:[eqNome]};
    else {
      const idx = t.equipes.indexOf(eqNome);
      if (idx >= 0) t.equipes.splice(idx,1);
      else t.equipes.push(eqNome);
    }
    State.save('config');
    render();
  }
  function addEquipe(){const n=document.getElementById('newEquipe').value.trim();const c=document.getElementById('newEquipeCor').value;if(!n)return;State.addEquipe({nome:n,cor:c});document.getElementById('newEquipe').value='';render();if(typeof EfPage!=='undefined')EfPage.renderFilters();}
  function rmEquipe(id){State.removeEquipe(id);render();if(typeof EfPage!=='undefined')EfPage.renderFilters();}
  function addObra(){const v=document.getElementById('newObra').value.trim();if(!v)return;State.addObra(v);document.getElementById('newObra').value='';render();App.rebuildObraSelects();}
  function rmObra(n){if(n===App.obra()){Utils.toast('Não pode remover a obra ativa.','warn');return;}if(!confirm(`Remover "${n}"?`))return;State.removeObra(n);render();App.rebuildObraSelects();}
  function saveGS(){const s=State.get();s.gsUrl=document.getElementById('gsUrl').value.trim();s.gsSheetId=document.getElementById('gsSheetId').value.trim();const k=document.getElementById('gsKey');if(k)s.gsKey=k.value.trim();State.save();Utils.toast('Salvo!','success');App.updateGSIndicator();}
  async function testGS(){const url=document.getElementById('gsUrl').value.trim();const key=(document.getElementById('gsKey')||{}).value||'';if(!url){Utils.toast('Configure a URL.','warn');return;}Utils.toast('Testando…','info');const ok=await Sheets.ping(url,key.trim());ok?Utils.toast('Conectado!','success'):Utils.toast('Falhou — confira URL e chave.','error');}
  function showScript(){document.getElementById('scriptCode').textContent=Sheets.CODE;Modals.open('modalScript');}
  return {render,addAndar,rmAndar,addTarefa,rmTarefa,editTarefa,setTarefaEqs,toggleTarefaEq,addEquipe,rmEquipe,addObra,rmObra,saveGS,testGS,showScript};
})();

/* ═══ HORAS EXTRAS PAGE ═══ */
const HEPage = (() => {
  let _sel = [];

  function render() {
    const s=State.get(), obra=App.obra();
    const entries=(s.horasExtras&&s.horasExtras[obra])||[];
    const el=document.getElementById('heContent');
    if(!el) return;
    const meses=[...new Set(entries.map(e=>e.data.substring(0,7)))].sort().reverse();
    const mesSel=document.getElementById('heMesFiltro')?.value||(meses[0]||'');
    const filtradas=mesSel?entries.filter(e=>e.data.startsWith(mesSel)):entries;
    const mesOpts=meses.map(m=>`<option value="${m}" ${m===mesSel?'selected':''}>${_fmtMes(m)}</option>`).join('');
    let html=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px">
      <div><div style="font-family:Bebas Neue,sans-serif;font-size:28px;letter-spacing:1px">HORAS EXTRAS</div>
      <div style="font-size:11px;color:var(--t3)">${Utils.esc(obra)}</div></div>
      <button class="btn btn-accent" onclick="HEPage.openStep1()">+ Lançar Dia</button></div>`;
    if(meses.length) html+=`<div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">
      <label style="font-size:12px;color:var(--t3)">Mês:</label>
      <select id="heMesFiltro" class="form-input" style="flex:1;font-size:12px" onchange="HEPage.render()">
        <option value="">Todos</option>${mesOpts}</select>
      <button class="btn btn-ghost" style="font-size:11px;padding:6px 10px" onclick="HEPage.gerarRelatorio()">📋 Relatório</button></div>`;
    if(!filtradas.length){
      html+=`<div style="padding:40px 0;text-align:center;color:var(--t3)">Nenhum lançamento. Clique em <strong>+ Lançar Dia</strong>.</div>`;
    } else {
      html+=`<div style="display:flex;flex-direction:column;gap:10px">`;
      filtradas.forEach(e=>{
        const p100=Utils.isSunday(e.data)||e.tipo==='100';
        const tipoLabel=p100
          ?`<span style="background:rgba(239,68,68,.15);color:#ef4444;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700">100% Feriado/Dom.</span>`
          :`<span style="background:rgba(240,165,0,.15);color:var(--ac);padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700">60% Normal</span>`;
        if (!e.registros) return;
        const total=(e.registros||[]).reduce((s,r)=>s+Number(r.horas),0);
        let rows=(e.registros||[]).map(r=>{
          const w=State.getWorker(r.wid);
          return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;padding:5px 0;border-bottom:1px solid var(--bd)">
            <span>${w?Utils.esc(w.nome):'?'}</span>
            <span style="font-family:JetBrains Mono,monospace;color:var(--ac);font-weight:700">${r.horas}h</span></div>`;
        }).join('');
        html+=`<div style="background:var(--sf);border:1px solid var(--bd);border-radius:var(--r);padding:16px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
            <div><span style="font-family:Bebas Neue,sans-serif;font-size:20px;color:var(--ac)">${Utils.fmtPT(e.data)}</span>
            <div style="margin-top:4px;display:flex;gap:6px;align-items:center">${tipoLabel}
            <span style="font-size:11px;color:var(--t3)">${Utils.weekday(e.data)}</span></div></div>
            <div style="display:flex;align-items:center;gap:10px">
            <span style="font-family:JetBrains Mono,monospace;font-size:14px;color:var(--ac);font-weight:700">${total}h</span>
            <button class="icon-btn danger" onclick="HEPage.remove('${e.id}')">✕</button></div></div>
          <div style="display:flex;flex-direction:column">${rows}</div></div>`;
      });
      html+=`</div>`;
    }
    el.innerHTML=html;
  }

  function _fmtMes(ym){
    const ms=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    const [y,m]=ym.split('-'); return (ms[parseInt(m)-1]||m)+'/'+y;
  }

  function openStep1(){
    _sel=[];
    const s=State.get(), obra=App.obra();
    const ws=s.workers.filter(w=>w.obra===obra).sort((a,b)=>String(a.nome||'').localeCompare(String(b.nome||''),'pt-BR'));
    document.getElementById('heDate').value=App.date();
    document.getElementById('heTipo').value='60';
    document.getElementById('heStep1').innerHTML=ws.map(w=>{
      const eq=State.getEquipe(w.equipe), cor=eq?eq.cor:'#8b92b0';
      return `<div class="he-row" id="hesel-${w.id}" onclick="HEPage.toggleSel('${w.id}')" style="cursor:pointer;border:1px solid var(--bd);border-radius:8px;padding:12px;display:flex;align-items:center;gap:12px;transition:all .15s">
        <div id="hecheck-${w.id}" style="width:24px;height:24px;border-radius:6px;border:2px solid var(--bd2);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:14px"></div>
        <div style="flex:1"><div style="font-size:14px;font-weight:600">${Utils.esc(w.nome)}</div>
        <div style="font-size:11px;color:var(--t3)">${Utils.esc(w.funcao)}</div></div>
        <span style="background:${cor}22;color:${cor};border:1px solid ${cor}44;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:600">${Utils.esc(eq?eq.nome:w.equipe)}</span></div>`;
    }).join('');
    document.getElementById('heStep1Wrap').style.display='flex';
    document.getElementById('heStep2Wrap').style.display='none';
    document.getElementById('heStep2Wrap').style.flexDirection='column';
    document.getElementById('heModalTitle').textContent='Selecionar Funcionários';
    document.getElementById('heBtnLancar').style.display='block';
    document.getElementById('heBtnSalvar').style.display='none';
    Modals.open('modalHE');
    document.getElementById('modalHE').style.display='flex';
    // Definir altura do scroll após modal abrir
    setTimeout(()=>{
      const scr=document.getElementById('heListScroll');
      const modal=document.getElementById('modalHE');
      if(scr&&modal){
        const used=modal.querySelector('.modal-header').offsetHeight
          +(modal.querySelector('[style*="heDate"]')||modal.querySelectorAll('[style*="flex-shrink:0"]')[1])?.offsetHeight||60
          +50+60; // titulo+data+filtro+footer
        scr.style.maxHeight=(window.innerHeight*0.75-used)+'px';
        scr.style.overflowY='scroll';
      }
    },50);
  }

  function toggleSel(wid){
    const idx=_sel.indexOf(wid);
    const el=document.getElementById('hesel-'+wid);
    const chk=document.getElementById('hecheck-'+wid);
    if(idx>=0){
      _sel.splice(idx,1);
      if(el){el.style.background='';el.style.borderColor='var(--bd)';}
      if(chk){chk.innerHTML='';chk.style.background='';chk.style.borderColor='var(--bd2)';}
    } else {
      _sel.push(wid);
      if(el){el.style.background='var(--acd)';el.style.borderColor='var(--ac)';}
      if(chk){chk.innerHTML='✓';chk.style.background='var(--ac)';chk.style.borderColor='var(--ac)';chk.style.color='#000';}
    }
  }

  function selectAll(){
    const s=State.get(), obra=App.obra();
    _sel=[];
    s.workers.filter(w=>w.obra===obra).forEach(w=>{
      _sel.push(w.id);
      const el=document.getElementById('hesel-'+w.id);
      const chk=document.getElementById('hecheck-'+w.id);
      if(el){el.style.background='var(--acd)';el.style.borderColor='var(--ac)';}
      if(chk){chk.innerHTML='✓';chk.style.background='var(--ac)';chk.style.borderColor='var(--ac)';chk.style.color='#000';}
    });
  }

  function goStep2(){
    if(!_sel.length){Utils.toast('Selecione ao menos um funcionário.','warn');return;}
    document.getElementById('heStep2').innerHTML=_sel.map(wid=>{
      const w=State.getWorker(wid);
      return `<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--bd)">
        <div style="flex:1"><div style="font-size:14px;font-weight:600">${w?Utils.esc(w.nome):'?'}</div>
        <div style="font-size:11px;color:var(--t3)">${w?Utils.esc(w.funcao):''}</div></div>
        <input type="number" id="heh-${wid}" min="0.5" max="24" step="0.5" placeholder="h"
          style="width:70px;background:var(--sf2);border:1px solid var(--bd2);color:var(--t1);font-family:JetBrains Mono,monospace;font-size:16px;padding:8px;border-radius:8px;outline:none;text-align:center"></div>`;
    }).join('');
    document.getElementById('heStep1Wrap').style.display='none';
    document.getElementById('heStep2Wrap').style.display='flex';
    document.getElementById('heStep2Wrap').style.flexDirection='column';
    document.getElementById('heModalTitle').textContent=`Lançar Horas (${_sel.length} func.)`;
    document.getElementById('heBtnLancar').style.display='none';
    document.getElementById('heBtnSalvar').style.display='block';
  }

  function setTodosIgual(){
    const val=document.getElementById('heTodosH').value;
    if(!val){Utils.toast('Informe o valor.','warn');return;}
    _sel.forEach(wid=>{const inp=document.getElementById('heh-'+wid);if(inp)inp.value=val;});
  }

  function saveAdd(){
    const s=State.get(), obra=App.obra();
    const date=document.getElementById('heDate').value;
    const tipo=document.getElementById('heTipo').value||'60';
    if(!date){Utils.toast('Selecione a data.','warn');return;}
    const registros=_sel.map(wid=>{
      const w=State.getWorker(wid);
      const hi=document.getElementById('heh-'+wid);
      return hi&&hi.value&&Number(hi.value)>0?{wid,horas:Number(hi.value),nome:w?w.nome:'',funcao:w?w.funcao:''}:null;
    }).filter(Boolean);
    if(!registros.length){Utils.toast('Informe as horas de ao menos um funcionário.','warn');return;}
    if(!s.horasExtras)s.horasExtras={};
    if(!s.horasExtras[obra])s.horasExtras[obra]=[];
    const entry={id:'he'+Date.now(),data:date,tipo,registros};
    s.horasExtras[obra].unshift(entry);
    State.save();
    Sheets.saveHE(obra,[entry]);
    Modals.close('modalHE');
    render();
    Utils.toast('✅ Lançamento salvo!','success');
  }

  function remove(id){
    if(!confirm('Remover este lançamento?'))return;
    const s=State.get(), obra=App.obra();
    if(s.horasExtras&&s.horasExtras[obra]) s.horasExtras[obra]=s.horasExtras[obra].filter(e=>e.id!==id);
    State.save(); Sheets.deleteHE(id); render();
  }

  function gerarRelatorio(){
    const s=State.get(), obra=App.obra();
    const mes=document.getElementById('heMesFiltro')?.value;
    const entries=(s.horasExtras&&s.horasExtras[obra])||[];
    const filtered=mes?entries.filter(e=>e.data.startsWith(mes)):entries;
    if(!filtered.length){Utils.toast('Nenhum lançamento.','warn');return;}
    const map60={}, map100={};
    filtered.forEach(e=>{
      const p100=Utils.isSunday(e.data)||e.tipo==='100';
      e.registros.forEach(r=>{
        const w=State.getWorker(r.wid);
        const nome=r.nome||(w?w.nome:'?');
        if(p100){map100[nome]=(map100[nome]||0)+Number(r.horas);}
        else{map60[nome]=(map60[nome]||0)+Number(r.horas);}
      });
    });
    const nomes=[...new Set([...Object.keys(map60),...Object.keys(map100)])].sort();
    let txt=`⏰ RELATÓRIO DE HORAS EXTRAS\n${mes?_fmtMes(mes):'Todo o período'}\nObra: ${obra}\n\n`;
    nomes.forEach(n=>{
      const p=[]; if(map60[n])p.push(`${map60[n]}h (60%)`); if(map100[n])p.push(`${map100[n]}h (100%)`);
      txt+=`${n}: ${p.join(' + ')}\n`;
    });
    document.getElementById('previewText').textContent=txt;
    Modals.open('modalPreview');
  }

  return {render,openStep1,toggleSel,selectAll,goStep2,setTodosIgual,saveAdd,remove,gerarRelatorio};
})();

/* ═══ GERADOR DE TEXTO DO EFETIVO ═══ */
function buildReportText(obra, date) {
  const s = State.get();
  const ws = s.workers.filter(w => w.obra === obra);
  const dayMap = s.dailyData?.[obra]?.[date] || {};
  const presentes = ws.filter(w => { const dd=dayMap[w.id]; return !dd||dd.presente; });
  const ausentes  = ws.filter(w => { const dd=dayMap[w.id]; return dd&&!dd.presente; });

  let txt = '*' + obra.toUpperCase() + ' \u2013 ' + Utils.fmtLong(date) + '*\n\n';

  const pg = s.producaoGeral?.[obra] || {};
  txt += '*INFORMA\u00c7\u00d5ES GERAIS*\n';
  if (pg.areaAlv)   txt += '\u2022 \u00c1rea Alv. Estrutural: ' + pg.areaAlv + ' m\u00b2/andar\n';
  if (pg.areaLaje)  txt += '\u2022 \u00c1rea da Laje: ' + pg.areaLaje + ' m\u00b2\n';
  if (pg.volGraute) txt += '\u2022 Volume de Graute: ' + pg.volGraute + ' m\u00b3/andar\n';
  if (pg.volArg)    txt += '\u2022 Volume de Argamassa: ' + pg.volArg + ' m\u00b3/andar\n';
  if (pg.volConc)   txt += '\u2022 Volume de Concreto: ' + pg.volConc + ' m\u00b3/andar\n';
  if (pg.acoAlv)    txt += '\u2022 A\u00e7o Alv. Estrutural: ' + pg.acoAlv + ' kg\n';
  if (pg.acoLaje)   txt += '\u2022 A\u00e7o Lajes e Vigas: ' + pg.acoLaje + ' kg\n';
  txt += '\n';

  const pd = s.producaoDiaria?.[obra]?.[date] || {};
  txt += '*INFORMA\u00c7\u00d5ES SOBRE PRODU\u00c7\u00c3O*\n';
  if (pd.alvEst && pd.alvEst.vol) {
    const m2 = pd.alvEst.qtd ? (pd.alvEst.vol/pd.alvEst.qtd).toFixed(2) : '\u2014';
    txt += '\u2022 Alv. Estrutural: ' + pd.alvEst.vol + ' m\u00b2';
    if (pd.alvEst.qtd) txt += ' | ' + pd.alvEst.qtd + ' func. | ' + m2 + ' m\u00b2/func.';
    txt += '\n';
  }
  if (pd.alvVed && pd.alvVed.vol) {
    const m2v = pd.alvVed.qtd ? (pd.alvVed.vol/pd.alvVed.qtd).toFixed(2) : '\u2014';
    txt += '\u2022 Alv. de Veda\u00e7\u00e3o: ' + pd.alvVed.vol + ' m\u00b2';
    if (pd.alvVed.qtd) txt += ' | ' + pd.alvVed.qtd + ' func. | ' + m2v + ' m\u00b2/func.';
    txt += '\n';
  }
  txt += '\n';

  txt += '*CONCRETAGENS PROGRAMADAS*\n';
  const conc = pd.concretagens || [];
  if (conc.length) conc.forEach(function(c){ txt += '\u2022 ' + (c.data?Utils.fmtPT(c.data)+' \u2013 ':'') + c.local + ' \u2013 ' + c.volume + ' m\u00b3\n'; });
  else txt += '\u2022 N\u00e3o h\u00e1 concretagens programadas.\n';
  txt += '\n';

  const eqAdm = s.equipes.find(function(e){ return e.nome === 'Administra\u00e7\u00e3o'; });
  const admId = eqAdm ? eqAdm.id : 'eq1';
  const admPresentes = presentes.filter(function(w){ return w.equipe === admId; });
  if (admPresentes.length) {
    txt += '*ADMINISTRA\u00c7\u00c3O E OPERACIONAL*\n';
    admPresentes.sort(function(a,b){ return String(a.nome||'').localeCompare(String(b.nome||''),'pt-BR'); }).forEach(function(w){
      txt += '\u2022 ' + w.nome + ' \u2013 ' + w.funcao + '\n';
      const dd = dayMap[w.id] || {};
      (dd.tarefas||[]).sort(function(a,b){ return String(a||'').localeCompare(String(b||''),'pt-BR'); }).forEach(function(t){ txt += '  \u25e6 ' + t + '\n'; });
    });
    txt += '\n';
  }

  const nonAdm = presentes.filter(function(w){ return w.equipe !== admId; });
  const byAndar = {};
  nonAdm.forEach(function(w){
    const dd = dayMap[w.id] || {};
    const andarRaw = dd.andar || '';
    // Chave é exatamente o que foi selecionado (ex: "Cobertura, Atico" vira um grupo só)
    const andares = andarRaw ? andarRaw.split(',').map(function(a){return a.trim();}).filter(Boolean) : [];
    const chave = andares.length ? andares.join(', ') : 'SEM LOCAL DEFINIDO';
    if (!byAndar[chave]) byAndar[chave] = { tarefas: [], workers: [] };
    byAndar[chave].workers.push(w);
    (dd.tarefas||[]).forEach(function(t){ if(!byAndar[chave].tarefas.includes(t)) byAndar[chave].tarefas.push(t); });
  });

  const andaresCfg = s.andares.filter(function(a,i){ return s.andares.indexOf(a)===i; });
  const _seen = {};
  const ordered = andaresCfg.filter(function(a){ return byAndar[a]; })
    .concat(Object.keys(byAndar).filter(function(a){ return !andaresCfg.includes(a); }).sort())
    .filter(function(a){ if(_seen[a]) return false; _seen[a]=true; return true; });

  ordered.forEach(function(andar){
    const grp = byAndar[andar];
    txt += '*' + andar.toUpperCase() + '*\n';
    const tf = grp.tarefas.slice().sort(function(a,b){ return String(a||'').localeCompare(String(b||''),'pt-BR'); });
    if (tf.length) {
      txt += '*Tarefas:*\n';
      tf.forEach(function(t){ txt += '\u2022 ' + t + '\n'; });
    }
    txt += '*Funcion\u00e1rios:*\n';
    grp.workers.sort(function(a,b){ return String(a.nome||'').localeCompare(String(b.nome||''),'pt-BR'); })
      .forEach(function(w){ txt += '\u2022 ' + w.nome + ' \u2013 ' + w.funcao + '\n'; });
    txt += '\n';
  });

  txt += '*TOTAL DE FUNCION\u00c1RIOS: ' + presentes.length + '*\n';
  if (ausentes.length) {
    txt += '\n*FALTANTES*\n';
    ausentes.sort(function(a,b){ return String(a.nome||'').localeCompare(String(b.nome||''),'pt-BR'); }).forEach(function(w){
      const dd = dayMap[w.id] || {};
      txt += '\u2022 ' + w.nome + ' \u2013 ' + (dd.motivo||'Sem justificativa') + '\n';
    });
  }
  return txt;
}


/* ═══ PRODUÇÃO PAGE ═══ */
const ProdPage = (() => {
  function render() {
    const s=State.get(); const obra=App.obra(); const date=App.date();
    const pg=s.producaoGeral?.[obra]||{};
    const pd=s.producaoDiaria?.[obra]?.[date]||{};
    const el=document.getElementById('prodContent');
    if(!el) return;
    const conc=pd.concretagens||[];

    el.innerHTML=`
      <!-- Informações Gerais fixas por obra -->
      <div class="prod-section">
        <div class="prod-section-title">📐 Informações Gerais da Obra <span style="font-size:11px;color:var(--t3)">(salvo por obra, não muda todo dia)</span></div>
        <div class="prod-grid">
          <div class="form-group"><label>Área Alv. Estrutural (m²/andar)</label><input class="form-input" id="pgAreaAlv" value="${Utils.esc(pg.areaAlv||'')}" placeholder="554,75"></div>
          <div class="form-group"><label>Área da Laje (m²)</label><input class="form-input" id="pgAreaLaje" value="${Utils.esc(pg.areaLaje||'')}" placeholder="557,58"></div>
          <div class="form-group"><label>Vol. Graute (m³/andar)</label><input class="form-input" id="pgVolGraute" value="${Utils.esc(pg.volGraute||'')}" placeholder="17,67"></div>
          <div class="form-group"><label>Vol. Argamassa (m³/andar)</label><input class="form-input" id="pgVolArg" value="${Utils.esc(pg.volArg||'')}" placeholder="1,89"></div>
          <div class="form-group"><label>Vol. Concreto (m³/andar)</label><input class="form-input" id="pgVolConc" value="${Utils.esc(pg.volConc||'')}" placeholder="103,49"></div>
          <div class="form-group"><label>Aço Alv. Estrutural (kg)</label><input class="form-input" id="pgAcoAlv" value="${Utils.esc(pg.acoAlv||'')}" placeholder="2.789"></div>
          <div class="form-group"><label>Aço Lajes e Vigas (kg)</label><input class="form-input" id="pgAcoLaje" value="${Utils.esc(pg.acoLaje||'')}" placeholder="4.051"></div>
        </div>
        <button class="btn btn-accent" onclick="ProdPage.saveGeral()" style="margin-top:10px">Salvar Informações Gerais</button>
      </div>

      <!-- Produção do dia -->
      <div class="prod-section">
        <div class="prod-section-title">📅 Produção do Dia — ${Utils.fmtPT(date)}</div>

        <div style="font-size:13px;font-weight:600;color:var(--t2);margin-bottom:8px">🧱 Alvenaria Estrutural</div>
        <div class="prod-grid" style="margin-bottom:12px">
          <div class="form-group"><label>Volume executado (m²)</label><input class="form-input" type="number" id="pdAlvEstVol" value="${pd.alvEst?.vol||''}" placeholder="0" oninput="ProdPage.calcAlvEst()"></div>
          <div class="form-group"><label>Nº de funcionários</label><input class="form-input" type="number" id="pdAlvEstQtd" value="${pd.alvEst?.qtd||''}" placeholder="0" oninput="ProdPage.calcAlvEst()"></div>
          <div class="form-group"><label>m² por funcionário (auto)</label><input class="form-input" id="pdAlvEstM2" readonly style="opacity:.6;background:var(--sf3)" value="${pd.alvEst?.vol&&pd.alvEst?.qtd?(pd.alvEst.vol/pd.alvEst.qtd).toFixed(2):''}"></div>
        </div>

        <div style="font-size:13px;font-weight:600;color:var(--t2);margin-bottom:8px">🏗 Alvenaria de Vedação</div>
        <div class="prod-grid" style="margin-bottom:12px">
          <div class="form-group"><label>Volume executado (m²)</label><input class="form-input" type="number" id="pdAlvVedVol" value="${pd.alvVed?.vol||''}" placeholder="0" oninput="ProdPage.calcAlvVed()"></div>
          <div class="form-group"><label>Nº de funcionários</label><input class="form-input" type="number" id="pdAlvVedQtd" value="${pd.alvVed?.qtd||''}" placeholder="0" oninput="ProdPage.calcAlvVed()"></div>
          <div class="form-group"><label>m² por funcionário (auto)</label><input class="form-input" id="pdAlvVedM2" readonly style="opacity:.6;background:var(--sf3)" value="${pd.alvVed?.vol&&pd.alvVed?.qtd?(pd.alvVed.vol/pd.alvVed.qtd).toFixed(2):''}"></div>
        </div>

        <button class="btn btn-accent" onclick="ProdPage.saveDaily()" style="margin-bottom:16px">Salvar Produção do Dia</button>
      </div>

      <!-- Concretagens — separado -->
      <div class="prod-section">
        <div class="prod-section-title">🚧 Concretagens Programadas — ${Utils.fmtPT(date)}</div>
        <div id="concList" style="display:flex;flex-direction:column;gap:8px;margin-bottom:10px">
          ${conc.map((c,i)=>`
            <div style="display:flex;gap:8px;align-items:center;background:var(--sf2);border:1px solid var(--bd2);border-radius:var(--rs);padding:10px 12px">
              <div style="display:flex;flex-direction:column;gap:6px;flex:1">
                <input class="form-input" value="${Utils.esc(c.data||'')}" type="date" placeholder="Data" style="max-width:180px" onchange="ProdPage.updConc(${i},'data',this.value)">
                <input class="form-input" value="${Utils.esc(c.local||'')}" placeholder="Local (ex: 14º Pavimento)" onchange="ProdPage.updConc(${i},'local',this.value)">
                <input class="form-input" type="number" value="${c.volume||''}" placeholder="Volume (m³)" style="max-width:160px;font-family:'JetBrains Mono',monospace" onchange="ProdPage.updConc(${i},'volume',this.value)">
              </div>
              <button class="icon-btn danger" onclick="ProdPage.rmConc(${i})">✕</button>
            </div>`).join('')}
        </div>
        <button class="btn btn-ghost" onclick="ProdPage.addConc()">+ Adicionar concretagem</button>
        <button class="btn btn-accent" onclick="ProdPage.saveConc()" style="margin-top:8px">💾 Salvar Concretagens</button>
      </div>
    `;
  }

  function calcAlvEst(){const v=Number(document.getElementById('pdAlvEstVol').value),q=Number(document.getElementById('pdAlvEstQtd').value);document.getElementById('pdAlvEstM2').value=v&&q?(v/q).toFixed(2):'';}
  function calcAlvVed(){const v=Number(document.getElementById('pdAlvVedVol').value),q=Number(document.getElementById('pdAlvVedQtd').value);document.getElementById('pdAlvVedM2').value=v&&q?(v/q).toFixed(2):'';}

  function saveGeral(){
    const s=State.get();const obra=App.obra();
    if(!s.producaoGeral)s.producaoGeral={};
    s.producaoGeral[obra]={
      areaAlv:document.getElementById('pgAreaAlv').value,
      areaLaje:document.getElementById('pgAreaLaje').value,
      volGraute:document.getElementById('pgVolGraute').value,
      volArg:document.getElementById('pgVolArg').value,
      volConc:document.getElementById('pgVolConc').value,
      acoAlv:document.getElementById('pgAcoAlv').value,
      acoLaje:document.getElementById('pgAcoLaje').value,
    };
    State.save();
    const _s=State.get(),_o=App.obra(),_d=App.date();
    Sheets.saveProd(_d,_o,_s.producaoGeral?.[_o]||{},_s.producaoDiaria?.[_o]?.[_d]||{});
    Utils.toast('✅ Informações gerais salvas!','success');
    const _btn1=document.querySelector('[onclick="ProdPage.saveGeral()"]');if(_btn1){const _t=_btn1.textContent;_btn1.textContent='✅ Salvo!';_btn1.disabled=true;setTimeout(()=>{_btn1.textContent=_t;_btn1.disabled=false;},2000);}
  }

  function _getDailyData(){
    const s=State.get();const obra=App.obra();const date=App.date();
    if(!s.producaoDiaria)s.producaoDiaria={};
    if(!s.producaoDiaria[obra])s.producaoDiaria[obra]={};
    if(!s.producaoDiaria[obra][date])s.producaoDiaria[obra][date]={concretagens:[]};
    return s.producaoDiaria[obra][date];
  }

  function saveDaily(){
    const pd=_getDailyData();
    const _alvEstVol=Number(document.getElementById('pdAlvEstVol').value)||0;
    const _alvEstQtd=Number(document.getElementById('pdAlvEstQtd').value)||0;
    const _alvVedVol=Number(document.getElementById('pdAlvVedVol').value)||0;
    const _alvVedQtd=Number(document.getElementById('pdAlvVedQtd').value)||0;
    pd.alvEst={vol:_alvEstVol,qtd:_alvEstQtd,exec:_alvEstVol,m2porBloqueiro:_alvEstQtd?(_alvEstVol/_alvEstQtd).toFixed(2):0};
    pd.alvVed={vol:_alvVedVol,qtd:_alvVedQtd,exec:_alvVedVol,m2porPedreiro:_alvVedQtd?(_alvVedVol/_alvVedQtd).toFixed(2):0};
    State.save();
    const _s2=State.get(),_o2=App.obra(),_d2=App.date();
    Sheets.saveProd(_d2,_o2,_s2.producaoGeral?.[_o2]||{},_s2.producaoDiaria?.[_o2]?.[_d2]||{});
    Utils.toast('✅ Produção do dia salva!','success');
    const _btn2=document.querySelector('[onclick="ProdPage.saveDaily()"]');if(_btn2){const _t=_btn2.textContent;_btn2.textContent='✅ Salvo!';_btn2.disabled=true;setTimeout(()=>{_btn2.textContent=_t;_btn2.disabled=false;},2000);}
  }

  function addConc(){const pd=_getDailyData();if(!pd.concretagens)pd.concretagens=[];pd.concretagens.push({data:'',local:'',volume:''});State.save();render();}
  function rmConc(i){const pd=_getDailyData();pd.concretagens?.splice(i,1);State.save();render();}
  function updConc(i,field,val){const pd=_getDailyData();if(pd.concretagens?.[i])pd.concretagens[i][field]=val;State.save();}

  function saveConc(){
    const _s3=State.get(),_o3=App.obra(),_d3=App.date();
    State.save();
    Sheets.saveProd(_d3,_o3,_s3.producaoGeral?.[_o3]||{},_s3.producaoDiaria?.[_o3]?.[_d3]||{});
    Utils.toast('✅ Concretagens salvas!','success');
    const _btn3=document.querySelector('[onclick="ProdPage.saveConc()"]');if(_btn3){const _t=_btn3.textContent;_btn3.textContent='✅ Salvo!';_btn3.disabled=true;setTimeout(()=>{_btn3.textContent=_t;_btn3.disabled=false;},2000);}
  }
  return {render,calcAlvEst,calcAlvVed,saveGeral,saveDaily,addConc,rmConc,updConc,saveConc};
})();



/* ═══ APP CORE ═══ */
const App = (() => {
  let _date = Utils.todayStr();
  let _obra = '';

  function init() {
    State.load();
    document.querySelectorAll('[data-versao]').forEach(function(el){ el.textContent='v'+Versoes.atual(); });
    // Garantir URL e ID do Sheets em qualquer dispositivo
    (function(){
      const s = State.get();
      if (!s.gsUrl) { s.gsUrl = (window.EFETIVO_CONFIG||{}).gsUrl || ''; State.save(); }
      if (!s.gsSheetId) { s.gsSheetId = (window.EFETIVO_CONFIG||{}).gsSheetId || ''; State.save(); }
    })();
    _date = Utils.todayStr();
    _obra = State.get().activeObra || State.get().obras[0];
    document.getElementById('datePicker').value = _date;
    document.getElementById('datePicker').addEventListener('change', e => {
      _date = e.target.value;
      document.getElementById('weekdayLabel').textContent = Utils.weekday(_date);
      if (typeof EfPage !== 'undefined') EfPage.render();
    });
    document.getElementById('weekdayLabel').textContent = Utils.weekday(_date);
    rebuildObraSelects();
    updateGSIndicator();
    if (typeof EfPage !== 'undefined') EfPage.render();
    _updateTopbar();
    // Try to load fresh state from Sheets (cross-device sync)
    _loadFromSheets();
  }

  // Estrutura {obra: {data: ...}} — mantém a data local quando a planilha
  // ainda não conhece aquele dia.
  function _mergeByDate(local, remote) {
    const out = JSON.parse(JSON.stringify(remote || {}));
    Object.keys(local || {}).forEach(function(obra) {
      if (!out[obra]) out[obra] = {};
      Object.keys(local[obra] || {}).forEach(function(data) {
        if (!out[obra][data]) out[obra][data] = local[obra][data];
      });
    });
    return out;
  }

  // Estrutura {obra: [{id, ...}]} — une por id, sem duplicar.
  function _mergeById(local, remote) {
    const out = JSON.parse(JSON.stringify(remote || {}));
    Object.keys(local || {}).forEach(function(obra) {
      if (!out[obra]) out[obra] = [];
      const ids = out[obra].map(function(e) { return e.id; });
      (local[obra] || []).forEach(function(e) {
        if (ids.indexOf(e.id) < 0) out[obra].push(e);
      });
      out[obra].sort(function(a, b) { return String(b.data||'').localeCompare(String(a.data||'')); });
    });
    return out;
  }

  // Une listas de objetos por chave, preservando o que só existe local.
  function _mergeLista(local, remote, chave) {
    const out = (remote || []).slice();
    const ids = out.map(function(x) { return x[chave]; });
    (local || []).forEach(function(x) {
      if (ids.indexOf(x[chave]) < 0) out.push(x);
    });
    return out;
  }

  // Une listas de strings sem duplicar, mantendo a ordem do remoto.
  function _mergeSimples(local, remote) {
    const out = (remote || []).slice();
    (local || []).forEach(function(v) { if (out.indexOf(v) < 0) out.push(v); });
    return out;
  }

  // Estrutura {obra: {campo: valor}} — mantém o local quando o remoto vem vazio.
  function _mergePorObra(local, remote) {
    const out = JSON.parse(JSON.stringify(remote || {}));
    Object.keys(local || {}).forEach(function(obra) {
      const rem = out[obra];
      if (!rem || Object.keys(rem).length === 0) out[obra] = local[obra];
    });
    return out;
  }

  // Lista de relatórios — une por data+obra, preservando os que ainda não
  // subiram, e mantém ordem cronológica decrescente.
  function _mergeHistorico(local, remote) {
    const out = (remote || []).slice();
    const chaves = out.map(function(h) { return h.data + '|' + h.obra; });
    (local || []).forEach(function(h) {
      if (chaves.indexOf(h.data + '|' + h.obra) < 0) out.push(h);
    });
    out.sort(function(a, b) { return String(b.data||'').localeCompare(String(a.data||'')); });
    return out.slice(0, 200);
  }

  async function _loadFromSheets(force) {
    const s = State.get();
    if (!s.gsUrl || !s.gsSheetId) return;
    // Não puxa por cima de alterações locais que ainda não subiram.
    if (!force && State.isDirty()) return;
    try {
      const res = await fetch(s.gsUrl + '?sheetId=' + s.gsSheetId + '&key=' + encodeURIComponent(s.gsKey||''), {method:'GET', mode:'cors'});
      const json = await res.json();
      if (!json.ok || !json.state) return;
      const sheetState = json.state;
      // Preservar gsUrl e gsSheetId locais
      sheetState.gsUrl = s.gsUrl;
      sheetState.gsSheetId = s.gsSheetId;
      sheetState.gsKey = s.gsKey || '';
      // Normalizar horasExtras: agrupar linhas individuais em lançamentos
      if (sheetState.horasExtras) {
        Object.keys(sheetState.horasExtras).forEach(function(obra) {
          const entries = sheetState.horasExtras[obra];
          const needsGrouping = entries.length > 0 && !entries[0].registros;
          if (needsGrouping) {
            const map = {};
            entries.forEach(function(e) {
              const entryId = e.id.replace(/_w[^_]+$/, '');
              if (!map[entryId]) map[entryId] = {id:entryId, data:e.data, tipo:e.tipo||'60', registros:[]};
              map[entryId].registros.push({wid:e.wid, nome:e.nome, funcao:e.funcao, horas:e.horas});
            });
            sheetState.horasExtras[obra] = Object.values(map).sort(function(a,b){return b.data.localeCompare(a.data);});
          }
        });
      }
      // CORREÇÃO CRÍTICA: antes isto sobrescrevia o localStorage inteiro,
      // apagando qualquer marcação feita e ainda não enviada à planilha.
      // Agora dias/lançamentos que só existem localmente são preservados.
      const local = State.get();
      sheetState.dailyData      = _mergeByDate(local.dailyData,      sheetState.dailyData);
      sheetState.producaoDiaria = _mergeByDate(local.producaoDiaria, sheetState.producaoDiaria);
      // O Apps Script nunca lê a aba de Produção de volta (producaoGeral vem
      // sempre vazio), então aqui o local é a única fonte: só aceita o remoto
      // se ele realmente trouxer conteúdo.
      sheetState.producaoGeral = _mergePorObra(local.producaoGeral, sheetState.producaoGeral);
      sheetState.historico     = _mergeHistorico(local.historico, sheetState.historico);
      // Cadastros: o remoto manda, mas itens criados aqui e ainda não
      // enviados (offline, ou dentro da janela de 1,5s) não podem sumir.
      sheetState.workers = _mergeLista(local.workers, sheetState.workers, 'id');
      sheetState.equipes = _mergeLista(local.equipes, sheetState.equipes, 'id');
      sheetState.obras   = _mergeSimples(local.obras,   sheetState.obras);
      sheetState.andares = _mergeSimples(local.andares, sheetState.andares);
      sheetState.horasExtras    = _mergeById(local.horasExtras,      sheetState.horasExtras);

      localStorage.setItem('efetivo_v3', JSON.stringify(sheetState));
      State.load();
      if (typeof EfPage !== 'undefined') EfPage.render();
      if (typeof FuncPage !== 'undefined' && document.getElementById('funcList')?.offsetParent !== null) FuncPage.render();
      Utils.toast('Dados sincronizados!', 'info');
    } catch(e) {
      // No internet or sheets not configured - use localStorage
    }
  }

  function obra() { return _obra; }
  function date() { return _date; }

  function setObra(v) {
    _obra = v; State.get().activeObra = v; State.save();
    rebuildObraSelects();
    document.getElementById('obraLabel').textContent = v;
    const pill = document.getElementById('obraPill');
    if (pill) pill.textContent = v.length > 14 ? v.slice(0,13)+'…' : v;
    _updateTopbar();
    if (typeof EfPage !== 'undefined') EfPage.render();
  }

  function showPage(id, el) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('[data-page]').forEach(n => n.classList.remove('active'));
    document.getElementById('page-' + id)?.classList.add('active');
    document.querySelectorAll(`[data-page="${id}"]`).forEach(n => n.classList.add('active'));
    const titles = {
      efetivo:'DO DIA', producao:'EXECUÇÃO', funcionarios:'EQUIPE',
      relatorios:'DESEMPENHO', historico:'HISTÓRICO',
      configuracoes:'CONFIG', horasextras:'HORAS EXTRAS', versoes:'NOTAS DA VERSÃO'
    };
    document.getElementById('topbarTitle').textContent = titles[id] || id.toUpperCase();
    if (id==='relatorios')   StatPage.render();
    if (id==='historico')    HistPage.render();
    if (id==='configuracoes') CfgPage.render();
    if (id==='funcionarios') FuncPage.render();
    if (id==='horasextras')  HEPage.render();
    if (id==='versoes')      Versoes.render();
    if (id==='producao' && typeof ProdPage !== 'undefined') ProdPage.render();
  }

  function openDrawer() {
    document.getElementById('drawer')?.classList.add('open');
    document.getElementById('drawerBg')?.classList.add('open');
  }
  function closeDrawer() {
    document.getElementById('drawer')?.classList.remove('open');
    document.getElementById('drawerBg')?.classList.remove('open');
  }

  function addObra() {
    const v = document.getElementById('newObraInput').value.trim();
    if (!v) return;
    State.addObra(v);
    document.getElementById('newObraInput').value = '';
    rebuildObraSelects();
    Modals._renderObraOpts?.() || document.getElementById('obraOptions')?.querySelector('.obra-option');
  }

  function rebuildObraSelects() {
    const s = State.get();
    const opts = s.obras.map(o => `<option value="${Utils.esc(o)}" ${o===_obra?'selected':''}>${Utils.esc(o)}</option>`).join('');
    ['obraSelectDesktop'].forEach(id => { const el=document.getElementById(id); if(el) el.innerHTML=opts; });
    const lbl = document.getElementById('obraLabel'); if(lbl) lbl.textContent = _obra;
    const pill = document.getElementById('obraPill'); if(pill) pill.textContent = _obra.length>14?_obra.slice(0,13)+'…':_obra;
  }

  function _updateTopbar() {
    const s = State.get();
    const ws = s.workers.filter(w => w.obra === _obra);
    const dayMap = s.dailyData?.[_obra]?.[_date] || {};
    const presentes = ws.filter(w => { const dd=dayMap[w.id]; return !dd||dd.presente; }).length;
    ['topbarPresentes','dNavPresentes'].forEach(id => { const el=document.getElementById(id); if(el) el.textContent=presentes; });
    const dnt = document.getElementById('dNavTotal'); if(dnt) dnt.textContent=ws.length;
    const bnav = document.getElementById('bnavBadge');
    if(bnav) { bnav.textContent=presentes; bnav.style.display=presentes>0?'':'none'; }
    ['pillPresentes','pillAusentes','pillTotal'].forEach((id,i)=>{
      const el=document.getElementById(id); if(!el) return;
      if(i===0) el.textContent=`${presentes} presentes`;
      if(i===1) el.textContent=`${ws.length-presentes} ausentes`;
      if(i===2) el.textContent=`${ws.length} total`;
    });
  }

  function updateTopbar() { _updateTopbar(); }

  function updateGSIndicator() {
    const s = State.get();
    ['gsInd','gsIndDrawer'].forEach(id => {
      const el=document.getElementById(id);
      if(el) el.className='gs-ind'+(s.gsUrl?' on':'');
    });
  }

  async function syncNow() { await _loadFromSheets(true); }

  return { init, obra, date, setObra, showPage, openDrawer, closeDrawer,
           addObra, rebuildObraSelects, updateTopbar, updateGSIndicator, syncNow };
})();

document.addEventListener('click', function(){
  document.querySelectorAll('[id^=adrop-]').forEach(function(x){x.style.display='none';});
});
document.addEventListener('DOMContentLoaded', App.init);
