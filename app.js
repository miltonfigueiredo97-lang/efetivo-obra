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
    // configPorObra[obra] = {andares:[], tarefas:[{nome,equipes}], equipes:[]}
    // Cada obra tem seus próprios andares, tarefas e equipes.
    configPorObra: {},
    cfgMigrado: false,
    // Fila de envio: guarda só a INTENÇÃO (ex.: 'efetivo:2026-08-15:Obra A').
    // O payload é montado na hora do envio, a partir do estado atual, então
    // reenviar é sempre seguro e a fila sobrevive a fechar o aplicativo.
    filaEnvio: [],
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
    let primeiraVez = false;
    try {
      const raw = localStorage.getItem(KEY);
      primeiraVez = !raw;
      d = raw ? _merge(DEF, JSON.parse(raw)) : JSON.parse(JSON.stringify(DEF));
    } catch(e) { d = JSON.parse(JSON.stringify(DEF)); primeiraVez = true; }
    // Aparelho novo começa VAZIO e espera a planilha. Antes ele nascia com os
    // 47 funcionários de exemplo; se a leitura falhasse, o usuário via a lista
    // errada e a primeira edição sobrescrevia a planilha real com o exemplo.
    if (primeiraVez) {
      d.workers = [];
      d.dailyData = {}; d.historico = []; d.horasExtras = {};
      d.producaoGeral = {}; d.producaoDiaria = {};
      d.configPorObra = {}; d.cfgMigrado = true;
      d.andares = []; d.tarefas = []; d.equipes = [];
    }
    // Garantir URL e ID sempre presentes
    if (!d.gsUrl) d.gsUrl = (window.EFETIVO_CONFIG||{}).gsUrl || '';
    if (!d.gsSheetId) d.gsSheetId = (window.EFETIVO_CONFIG||{}).gsSheetId || '';
    // Deduplicar andares e tarefas
    if (d.andares) d.andares = d.andares.filter(function(a,i){return d.andares.indexOf(a)===i;});
    // Normalizar TODAS as tarefas para {nome, equipes}. Antes só o primeiro
    // item era inspecionado, então uma lista mista (depois de sincronizar)
    // deixava strings soltas que quebravam a tela de configurações.
    if (d.tarefas) {
      d.tarefas = d.tarefas
        .map(function(t) {
          if (typeof t === 'string') {
            var p = t.split('::');
            return {nome: p[0].trim(), equipes: p[1] ? p[1].split(',').map(function(x){return x.trim();}).filter(Boolean) : []};
          }
          return {nome: String((t && t.nome) || ''), equipes: (t && t.equipes) || []};
        })
        .filter(function(t) { return t.nome && t.nome !== '[object Object]'; });
      // Deduplicar por nome, mantendo o primeiro (que traz as equipes)
      var vistos = {};
      d.tarefas = d.tarefas.filter(function(t) {
        if (vistos[t.nome]) return false;
        vistos[t.nome] = true; return true;
      });
    }
    _migrarConfig();
  }

  function save(context, extra) {
    try {
      localStorage.setItem(KEY, JSON.stringify(d));
      if (context) {
        if (context === 'efetivo') enfileirar('efetivo:' + (extra && extra.data) + ':' + (extra && extra.obra));
        else if (context === 'prod') enfileirar('prod:' + (extra && extra.data) + ':' + (extra && extra.obra));
        else if (context === 'he')   enfileirar('he:' + (extra && extra.obra));
        else enfileirar(context);
      }
      const el = document.getElementById('lastSaved');
      if (el) { const n=new Date(); el.textContent=String(n.getHours()).padStart(2,'0')+':'+String(n.getMinutes()).padStart(2,'0'); }
      _syncToSheets(context);
    } catch(e) {}
  }

  let _syncTimer = null;
  function _syncToSheets() {
    clearTimeout(_syncTimer);
    _syncTimer = setTimeout(function() {
      if (typeof Fila !== 'undefined') Fila.processar();
    }, 800);
  }

  // Enquanto houver item na fila, _loadFromSheets não pode sobrescrever
  // o localStorage: existe alteração local ainda não confirmada.
  let _dirty = false;
  function isDirty() { return (d.filaEnvio || []).length > 0; }

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
    save('efetivo', {data: date, obra: obra});
  }

  // ═══ CONFIG POR OBRA ═══
  // Cada obra tem andares/tarefas/equipes próprios. As listas globais viram
  // apenas o molde para obras novas e a migração da estrutura antiga.
  function _cfg(obra) {
    obra = obra || d.activeObra || (d.obras && d.obras[0]) || '';
    if (!d.configPorObra) d.configPorObra = {};
    if (!d.configPorObra[obra]) {
      // Obra nova nasce VAZIA. Só a migração inicial herda a lista antiga.
      d.configPorObra[obra] = {andares: [], tarefas: [], equipes: []};
    }
    const c = d.configPorObra[obra];
    if (!c.andares) c.andares = [];
    if (!c.tarefas) c.tarefas = [];
    if (!c.equipes) c.equipes = [];
    return c;
  }
  function andares(obra) { return _cfg(obra).andares; }
  function tarefas(obra) { return _cfg(obra).tarefas; }
  function equipes(obra) { return _cfg(obra).equipes; }

  // Roda uma vez: distribui a config global para todas as obras existentes.
  function _migrarConfig() {
    if (!d.configPorObra) d.configPorObra = {};
    if (d.cfgMigrado) return;
    // Só preenche obra que NUNCA teve config. Obra com lista vazia é uma
    // escolha do usuário (ele apagou), não um caso de migração — antes ela
    // era reabastecida com a lista global a cada carregamento.
    (d.obras || []).forEach(function(o) {
      if (!d.configPorObra[o]) {
        d.configPorObra[o] = {
          andares: JSON.parse(JSON.stringify(d.andares || [])),
          tarefas: JSON.parse(JSON.stringify(d.tarefas || [])),
          equipes: JSON.parse(JSON.stringify(d.equipes || []))
        };
      }
    });
    d.cfgMigrado = true;
    // Zera o legado para ele não poder mais servir de fonte a nada.
    d.andares = []; d.tarefas = []; d.equipes = [];
  }

  // Copia a configuração de uma obra para outra (setup rápido de obra nova).
  function copiarConfig(de, para) {
    const o = _cfg(de);
    d.configPorObra[para || d.activeObra] = JSON.parse(JSON.stringify(o));
    save('config');
  }

  // ═══ FILA DE ENVIO ═══
  function enfileirar(chave) {
    if (!d.filaEnvio) d.filaEnvio = [];
    if (d.filaEnvio.indexOf(chave) < 0) d.filaEnvio.push(chave);
    _gravarLocal();
  }
  function fila() { return d.filaEnvio || []; }
  function desenfileirar(chave) {
    d.filaEnvio = (d.filaEnvio || []).filter(function(x) { return x !== chave; });
    _gravarLocal();
  }
  function _gravarLocal() {
    try { localStorage.setItem(KEY, JSON.stringify(d)); } catch(e) {}
  }

  function getEquipe(id, obra) {
    const local = _cfg(obra).equipes.find(e=>e.id===id||e.nome===id);
    if (local) return local;
    // Fallback: equipe pode pertencer a outra obra (ex.: lista de funcionários)
    let achou = (d.equipes||[]).find(e=>e.id===id||e.nome===id);
    if (achou) return achou;
    Object.keys(d.configPorObra||{}).some(function(o){
      const e=(d.configPorObra[o].equipes||[]).find(x=>x.id===id||x.nome===id);
      if (e) { achou=e; return true; } return false;
    });
    return achou;
  }
  function getWorker(id) { return d.workers.find(w=>w.id===id); }
  function addWorker(w) { w.id='w'+Date.now(); d.workers.push(w); save('workers'); return w; }
  function updateWorker(id,f) { const w=d.workers.find(x=>x.id===id); if(w) Object.assign(w,f); save('workers'); }
  function removeWorker(id) { d.workers=d.workers.filter(w=>w.id!==id); save('workers'); }
  function addObra(n) { if(!d.obras.includes(n)){d.obras.push(n);save('config');} }
  function removeObra(n) { d.obras=d.obras.filter(o=>o!==n); save('config'); }
  function addAndar(v) { andares().push(v); save('config'); }
  function removeAndar(i) { andares().splice(i,1); save('config'); }
  // Reordena andares. A ordem manda no agrupamento do relatório do efetivo.
  function moverAndar(i, dir) {
    const a = andares(), j = i + dir;
    if (j < 0 || j >= a.length) return false;
    const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    save('config'); return true;
  }
  function ordenarAndares(ordem) {
    const a = andares();
    const novos = ordem.map(function(n){ return a[n]; }).filter(function(x){ return x !== undefined; });
    a.length = 0; novos.forEach(function(x){ a.push(x); });
    save('config');
  }
  function addTarefa(v) { tarefas().push(typeof v==='string'?{nome:v,equipes:[]}:v); save('config'); }
  function removeTarefa(i) { tarefas().splice(i,1); save('config'); }
  function addEquipe(e) { e.id='eq'+Date.now(); equipes().push(e); save('config'); return e; }
  function removeEquipe(id) { const c=_cfg(); c.equipes=c.equipes.filter(e=>e.id!==id); save('config'); }
  function addHistorico(h) { d.historico.unshift(h); if(d.historico.length>200) d.historico=d.historico.slice(0,200); save(); }

  // Horas extras
  function getHE(obra) { if(!d.horasExtras[obra]) d.horasExtras[obra]=[]; return d.horasExtras[obra]; }
  function addHE(obra, entry) { getHE(obra).unshift(entry); save(); }
  function removeHE(obra, id) { d.horasExtras[obra]=getHE(obra).filter(e=>e.id!==id); save(); }

  return { load,save,get, isDirty, getDayData,setDayField, getEquipe,getWorker,
    andares, tarefas, equipes, cfgObra:_cfg, copiarConfig,
    enfileirar, fila, desenfileirar,
    addWorker,updateWorker,removeWorker, addObra,removeObra,
    addAndar,removeAndar,moverAndar,ordenarAndares, addTarefa,removeTarefa, addEquipe,removeEquipe,
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
  function isSaturday(s) { return dateFrom(s).getDay()===6; }
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

  return { todayStr,dateFrom,pad,fmtPT,fmtLong,weekday,monthShort,isSunday,isSaturday,esc,toast,copy };
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
var ABA_CFGOB  = '⚙️ Config por Obra';
var SCRIPT_VERSAO = 7;   // o app confere este numero ao conectar

function doGet(e) {
  try {
    var key = e && e.parameter && e.parameter.key;
    if (!_auth(key)) return _err('Chave de acesso invalida.');
    var sheetId = e && e.parameter && e.parameter.sheetId;
    if (!sheetId) return _ok({msg: 'API ativa.', versao: SCRIPT_VERSAO});
    var ss = SpreadsheetApp.openById(sheetId);
    var state = _buildState(ss);
    return ContentService
      .createTextOutput(JSON.stringify({ok: true, versao: SCRIPT_VERSAO, state: state}))
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
    if (act === 'saveConfig')    { _saveConfig(ss, p); _saveConfigObra(ss, p);                     return _ok({msg:'Config salva'}); }
    if (act === 'saveProd')      { _saveProd(ss, p);                       return _ok({msg:'Produção salva'}); }
    if (act === 'saveHE')        { _saveHE(ss, p);                         return _ok({msg:'HE salvas'}); }
    if (act === 'deleteHE')      { _deleteHE(ss, p);                       return _ok({msg:'HE removida'}); }

    return _ok({msg: 'Ação desconhecida: ' + act});
  } catch(err) { return _err(err); }
}

function _buildState(ss) {
  var state = {
    workers: [], equipes: [], andares: [], tarefas: [], obras: [],
    dailyData: {}, historico: [], horasExtras: {}, producaoGeral: {}, producaoDiaria: {}, configPorObra: {},
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

  _lerConfigObra(ss, state);

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

function _saveConfigObra(ss, p) {
  var cfg = p.configPorObra || {};
  var sh = _getOrCreate(ss, ABA_CFGOB, ['Obra','Tipo','Valor'], 3);
  var last = sh.getLastRow();
  if (last > 3) sh.deleteRows(4, last-3);
  var rows = [];
  Object.keys(cfg).forEach(function(obra) {
    var c = cfg[obra] || {};
    (c.andares || []).forEach(function(a) { if (a) rows.push([obra, 'andar', a]); });
    (c.tarefas || []).forEach(function(t) { var v=_tarefaStr(t); if (v) rows.push([obra, 'tarefa', v]); });
    (c.equipes || []).forEach(function(e) { if (e && e.nome) rows.push([obra, 'equipe', e.id+'|'+e.nome+'|'+e.cor]); });
  });
  if (rows.length) sh.getRange(4, 1, rows.length, 3).setValues(rows);
}

function _lerConfigObra(ss, state) {
  var sh = ss.getSheetByName(ABA_CFGOB);
  if (!sh || sh.getLastRow() < 4) return;
  var rows = sh.getRange(4, 1, sh.getLastRow()-3, 3).getValues();
  rows.forEach(function(r) {
    var obra = String(r[0]||'').trim(), tipo = String(r[1]||'').trim(), val = String(r[2]||'').trim();
    if (!obra || !tipo || !val) return;
    if (!state.configPorObra[obra]) state.configPorObra[obra] = {andares:[], tarefas:[], equipes:[]};
    var c = state.configPorObra[obra];
    if (tipo === 'andar')  c.andares.push(val);
    if (tipo === 'tarefa') c.tarefas.push(_tarefaObj(val));
    if (tipo === 'equipe') {
      var p2 = val.split('|');
      c.equipes.push(p2.length >= 3
        ? {id:p2[0].trim(), nome:p2[1].trim(), cor:p2[2].trim()}
        : {id:'eq'+(c.equipes.length+1), nome:p2[0].trim(), cor:p2[1]||'#8b92b0'});
    }
  });
}

function _saveConfig(ss, p) {
  // Era o unico gravador que usava getSheetByName: se a aba nao existisse
  // (renomeada ou apagada), a lista de obras deixava de ser salva em silencio.
  var sh = _getOrCreate(ss, ABA_CFG, ['Andar / Local','','Tarefa','','Equipe','','Obra',''], 4);
  var last = sh.getLastRow();
  if (last > 4) sh.deleteRows(5, last-4);
  // Esta aba guarda apenas a lista de obras. Andares, tarefas e equipes
  // ficam em ABA_CFGOB, separados por obra: gravar aqui a config da obra
  // ativa fazia dela o molde de todas as outras.
  var obras = p.obras||[];
  for (var i = 0; i < obras.length; i++) {
    sh.appendRow(['','','','','','',obras[i]||'','']);
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
`;

  async function _post(payload) {
    const s = State.get();
    if (!s.gsUrl || !s.gsSheetId) return false;
    // TRAVA: enquanto este aparelho não tiver lido a planilha com sucesso,
    // ele não grava nada. Sem isso, um aparelho que falhou na leitura ficava
    // com os dados padrão e, na primeira edição, sobrescrevia a planilha
    // inteira (saveWorkers/saveEfetivo/saveConfigObra apagam e regravam).
    if (!Sync.podeGravar()) {
      Sync.avisarBloqueio();
      return false;
    }
    const body = JSON.stringify({...payload, sheetId: s.gsSheetId, key: s.gsKey || ''});
    // POST direto em no-cors. O modo cors SEMPRE falhava aqui: o Apps Script
    // responde o POST com um redirect que o navegador bloqueia. Cada gravação
    // gastava ~2s numa tentativa fadada a falhar e ainda disparava toast de
    // erro — mesmo com o dado chegando à planilha pelo fallback.
    try {
      await fetch(s.gsUrl, {
        method: 'POST', mode: 'no-cors',
        headers: {'Content-Type': 'text/plain;charset=utf-8'},
        body
      });
      // no-cors não deixa ler a resposta; a confirmação é feita uma única
      // vez pela Fila, no fim do lote, via _confirmar().
      return true;
    } catch(e) {
      Utils.toast('Sem conexão — a alteração ficou na fila e será reenviada.', 'warn');
      return false;
    }
  }

  // Confere por leitura se a última gravação surtiu efeito. GET funciona em
  // cors normalmente, então aqui dá para ler a resposta.
  async function _confirmar(payload) {
    payload = payload || {};
    const s = State.get();
    try {
      const res = await fetch(s.gsUrl + '?sheetId=' + s.gsSheetId + '&key=' + encodeURIComponent(s.gsKey||''),
                              {method:'GET', mode:'cors'});
      const json = await res.json();
      if (json.ok === false) {
        // A planilha respondeu mas recusou (ex.: chave errada): erro real.
        Utils.toast('Planilha recusou: ' + (json.error||'erro'), 'error');
        return false;
      }
      const st = (json && json.state) || {};
      if (payload.action === 'saveWorkers')
        return (st.workers||[]).length === (payload.workers||[]).length;
      if (payload.action === 'saveConfig') {
        const remoto = Object.keys(st.configPorObra||{}).sort().join(',');
        const local  = Object.keys(payload.configPorObra||{})
          .filter(o => { const c=payload.configPorObra[o]||{};
            return (c.andares||[]).length||(c.tarefas||[]).length||(c.equipes||[]).length; })
          .sort().join(',');
        return remoto === local || local === '';
      }
      return true;  // demais ações: POST sem exceção = aceito
    } catch(e) {
      // Sem leitura não há como confirmar; mantém na fila para reenvio.
      return false;
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

  // Envia TUDO que existe neste aparelho para a planilha. Necessário porque
  // as gravações são disparadas por alteração: dados já existentes antes da
  // planilha estar pronta nunca subiam sozinhos.
  async function enviarTudo(onProgresso) {
    const s = State.get();
    const passos = [
      ['Funcionários', () => saveWorkers()],
      ['Configuração das obras', () => saveConfig()],
    ];
    Object.keys(s.horasExtras || {}).forEach(function(obra) {
      const lista = s.horasExtras[obra] || [];
      if (lista.length) passos.push(['Horas extras – ' + obra, () => saveHE(obra, lista)]);
    });
    Object.keys(s.producaoGeral || {}).forEach(function(obra) {
      passos.push(['Produção – ' + obra, () => saveProd(App.date(), obra,
        s.producaoGeral[obra] || {}, (s.producaoDiaria||{})[obra]?.[App.date()] || {})]);
    });
    Object.keys(s.dailyData || {}).forEach(function(obra) {
      Object.keys(s.dailyData[obra] || {}).forEach(function(data) {
        passos.push(['Efetivo ' + Utils.fmtPT(data) + ' – ' + obra, () => saveEfetivo(data, obra)]);
      });
    });

    let okCount = 0, falhas = 0;
    for (let i = 0; i < passos.length; i++) {
      if (onProgresso) onProgresso(i + 1, passos.length, passos[i][0]);
      const r = await passos[i][1]();
      if (r === false) falhas++; else okCount++;
      await new Promise(res => setTimeout(res, 350));  // respeita a cota do Apps Script
    }
    return {total: passos.length, ok: okCount, falhas};
  }

  async function saveWorkers() {
    return _post({action:'saveWorkers', workers: State.get().workers});
  }

  async function saveEfetivo(date, obra) {
    const s = State.get();
    const dayMap = s.dailyData?.[obra]?.[date] || {};
    const workers = s.workers.filter(w => w.obra === obra).map(w => {
      const dd = dayMap[w.id] || {presente:true, andar:'', tarefas:[]};
      const eq = State.getEquipe(w.equipe, obra);
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
    // Só a lista de obras é global. Andares/tarefas/equipes vão em
    // configPorObra — antes a config da obra ativa era gravada na aba global
    // e virava o molde de todas as outras.
    return _post({action:'saveConfig', configPorObra:s.configPorObra||{}, obras:s.obras});
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

  return { CODE, loadState, enviarTudo, confirmar:_confirmar, saveWorkers, saveEfetivo, saveRelatorio, saveConfig, saveProd, saveHE, deleteHE, ping };
})();


/* ═══ VERSÕES / NOTAS DA VERSÃO ═══
   Toda atualização entra aqui no topo. Formato:
   {v, data, titulo, notas:[{tipo, texto}]}
   tipo: 'novo' | 'correcao' | 'melhoria' | 'seguranca'
*/
const Versoes = (() => {
  const LISTA = [
    {
      v: '1.5.2',
      data: '2026-08-15',
      titulo: 'O aplicativo avisa quando o Apps Script da planilha está velho',
      notas: [
        {tipo:'novo', texto:'O Apps Script agora declara a própria versão, e o aplicativo confere a cada leitura. Se o script publicado no Google for mais antigo que o esperado, uma faixa laranja avisa na hora, com atalho para as Configurações.'},
        {tipo:'melhoria', texto:'O teste de conexão informa o número exato da versão do script publicado.'},
        {tipo:'melhoria', texto:'Verificado o circuito completo — aplicativo, Apps Script e planilha — com o cenário relatado: transferir um funcionário de obra no computador e abrir o celular limpo. Com o script atualizado, a mudança chega.'},
      ]
    },
    {
      v: '1.5.1',
      data: '2026-08-15',
      titulo: 'Gravação rápida, sem falsos erros, e atualização automática',
      notas: [
        {tipo:'correcao', texto:'Toda gravação tentava primeiro um modo de envio que o Google sempre rejeita: perdia uns 2 segundos por item e ainda mostrava mensagem de falha — mesmo com o dado chegando na planilha. Era a causa da demora e dos falsos erros.'},
        {tipo:'correcao', texto:'A confirmação passa a ser feita por leitura, uma única vez por lote, em vez de tentar ler a resposta do envio.'},
        {tipo:'correcao', texto:'O aplicativo só lia a planilha ao abrir. Um celular que ficasse aberto nunca via o que outro aparelho salvou. Agora relê ao voltar para o aplicativo e a cada minuto.'},
      ]
    },
    {
      v: '1.5.0',
      data: '2026-08-15',
      titulo: 'Tudo vai para a planilha sozinho e ordem dos andares',
      notas: [
        {tipo:'novo', texto:'Cada ação agora vai sozinha para a planilha assim que você salva: funcionário, configuração, efetivo, produção e horas extras. Não é mais preciso enviar nada à mão.'},
        {tipo:'novo', texto:'Se a planilha não responder, a alteração entra numa fila e o aplicativo insiste a cada 15 segundos até conseguir. A fila fica guardada, então fechar o aplicativo no meio não perde nada.'},
        {tipo:'novo', texto:'Indicador permanente na tela mostrando "salvo" ou quantas alterações ainda estão esperando a planilha.'},
        {tipo:'novo', texto:'Os andares podem ser reordenados com as setas em Configurações. A ordem define como o relatório do efetivo agrupa os andares.'},
        {tipo:'melhoria', texto:'A leitura da planilha só sobrescreve o aparelho quando a fila está vazia, garantindo que nada pendente seja perdido.'},
      ]
    },
    {
      v: '1.4.1',
      data: '2026-08-15',
      titulo: 'Botão para enviar tudo de uma vez para a planilha',
      notas: [
        {tipo:'novo', texto:'Botão "Enviar tudo para a planilha" em Configurações. As gravações só aconteciam quando algo era alterado, então dados cadastrados antes da planilha estar pronta nunca subiam sozinhos e não apareciam nos outros aparelhos.'},
        {tipo:'melhoria', texto:'O envio mostra o progresso item a item e informa quantos foram gravados e quantos falharam.'},
        {tipo:'melhoria', texto:'O teste de conexão passa a distinguir Apps Script desatualizado de configuração ainda não enviada, e avisa quantas obras existem neste aparelho aguardando envio.'},
      ]
    },
    {
      v: '1.4.0',
      data: '2026-08-15',
      titulo: 'Sincronização entre aparelhos e proteção contra sobrescrita',
      notas: [
        {tipo:'correcao', texto:'Quando a leitura da planilha falhava, o aplicativo não avisava nada e mostrava a lista de exemplo. Em outro celular parecia que os dados não tinham sido salvos.'},
        {tipo:'correcao', texto:'Pior: ao editar qualquer coisa nesse estado, o aparelho enviava a lista de exemplo e apagava os dados reais da planilha. Agora nenhum aparelho grava antes de conseguir ler a planilha ao menos uma vez.'},
        {tipo:'correcao', texto:'Aparelho novo começa vazio e espera a planilha, em vez de nascer com os funcionários de exemplo.'},
        {tipo:'novo', texto:'Faixa vermelha fixa no topo quando não há conexão com a planilha, avisando que nada está sendo salvo, com botão para tentar de novo.'},
        {tipo:'novo', texto:'O botão Testar agora faz um diagnóstico completo: diz quantos funcionários e obras existem na planilha, e aponta a causa provável quando falha, como chave de acesso errada ou implantação não publicada.'},
        {tipo:'melhoria', texto:'A mensagem de sincronização passa a informar quantos funcionários vieram da planilha.'},
      ]
    },
    {
      v: '1.3.3',
      data: '2026-08-15',
      titulo: 'Aba de configurações criada automaticamente',
      notas: [
        {tipo:'correcao', texto:'Se a aba de Configurações da planilha fosse renomeada ou apagada, a lista de obras deixava de ser salva sem nenhum aviso. Agora a aba é recriada automaticamente, como todas as outras.'},
        {tipo:'melhoria', texto:'Verificação completa da planilha: gravar e reler configuração de duas obras, exclusão, funcionários, efetivo e horas extras, partindo de uma planilha sem nenhuma aba.'},
      ]
    },
    {
      v: '1.3.2',
      data: '2026-08-15',
      titulo: 'Configuração por obra: exclusões e edições agora ficam',
      notas: [
        {tipo:'correcao', texto:'Excluir um andar, tarefa ou equipe não valia: a sincronização unia as listas dos dois lados, então o item voltava e as obras acabavam com o mesmo conteúdo. Agora a configuração de cada obra é substituída pelo último estado salvo.'},
        {tipo:'correcao', texto:'Uma obra com a lista vazia era reabastecida com a lista antiga a cada carregamento, desfazendo o que tinha sido apagado.'},
        {tipo:'correcao', texto:'A marca de que a migração já rodou se perdia na volta da planilha, fazendo a migração recomeçar depois de cada sincronização.'},
        {tipo:'melhoria', texto:'As listas antigas são zeradas após a migração, para não voltarem a servir de fonte para nenhuma obra.'},
      ]
    },
    {
      v: '1.3.1',
      data: '2026-08-15',
      titulo: 'Correção de campos e cartões sem formatação',
      notas: [
        {tipo:'correcao', texto:'Os campos de URL, ID da planilha e chave de acesso apareciam desalinhados e cortados: usavam nomes de classe que não existiam no CSS e ficavam sem formatação nenhuma.'},
        {tipo:'correcao', texto:'Os cartões de desempenho tinham o mesmo problema, incluindo os contadores de faltas recém-criados.'},
        {tipo:'correcao', texto:'O seletor de local no efetivo também usava uma classe inexistente, nas duas versões.'},
        {tipo:'melhoria', texto:'Os cartões de desempenho passam a se ajustar à largura da tela, em vez de ficarem presos em quatro colunas.'},
      ]
    },
    {
      v: '1.3.0',
      data: '2026-08-15',
      titulo: 'Faltas de sábado contadas à parte',
      notas: [
        {tipo:'novo', texto:'O desempenho separa faltas de sábado das faltas em dia útil, com dois totais no topo da tela.'},
        {tipo:'novo', texto:'Cada funcionário mostra quantas faltas foram em sábado, quantas em dia útil, e o aproveitamento só dos sábados.'},
        {tipo:'novo', texto:'No detalhe dia a dia, sábados aparecem destacados e as faltas em sábado ficam marcadas em vermelho.'},
      ]
    },
    {
      v: '1.2.1',
      data: '2026-08-15',
      titulo: 'Configuração realmente separada por obra',
      notas: [
        {tipo:'correcao', texto:'Obras diferentes apareciam com a mesma configuração: a planilha gravava andares, tarefas e equipes da obra ativa numa lista global, e essa lista virava o molde de todas as outras. Agora só a lista de obras é global.'},
        {tipo:'correcao', texto:'Obra nova passa a começar com a configuração vazia, em vez de herdar a de outra obra.'},
        {tipo:'novo', texto:'Botão para copiar andares, tarefas e equipes de outra obra, para montar uma obra nova rapidamente quando a estrutura for parecida.'},
        {tipo:'melhoria', texto:'Conferido que todo dado de trabalho vai para a planilha: efetivo, funcionários, obras, configuração, produção, horas extras e relatórios. Só ficam no aparelho a chave de acesso, a obra selecionada e a preferência de layout.'},
      ]
    },
    {
      v: '1.2.0',
      data: '2026-08-15',
      titulo: 'Assiduidade detalhada, edição de horas extras e lista mais enxuta',
      notas: [
        {tipo:'novo', texto:'Clique na porcentagem de assiduidade para ver, dia a dia, quando o funcionário veio e quando faltou, com local, atividades e motivo da falta.'},
        {tipo:'novo', texto:'Lançamentos de horas extras já salvos podem ser editados pelo botão de lápis: dá para corrigir data, tipo e as horas de cada um.'},
        {tipo:'melhoria', texto:'Relatório de horas extras refeito: tabela alinhada com 60%, 100% e total por funcionário, linha de totais e o detalhe de cada dia.'},
        {tipo:'correcao', texto:'A assiduidade contava como falta um registro sem marcação definida, divergindo da tela do efetivo, que o considerava presente.'},
        {tipo:'correcao', texto:'O cálculo de altura da lista de funcionários nas horas extras tinha uma conta malformada e podia cortar a lista. Agora o dimensionamento é do próprio layout.'},
        {tipo:'melhoria', texto:'Lista de funcionários no desktop em duas colunas, cards mais baixos e botões menores, que aparecem ao passar o mouse.'},
      ]
    },
    {
      v: '1.1.0',
      data: '2026-08-15',
      titulo: 'Cada obra com seus próprios dados',
      notas: [
        {tipo:'correcao', texto:'A tela de Funcionários mostrava gente de todas as obras ao mesmo tempo, ignorando a obra selecionada. Agora lista apenas a obra ativa.'},
        {tipo:'novo', texto:'Andares, tarefas e equipes passam a ser de cada obra. Antes eram uma lista única, repetida em todas.'},
        {tipo:'melhoria', texto:'A configuração que já existia foi copiada para cada obra cadastrada, então nada precisa ser redigitado.'},
        {tipo:'correcao', texto:'O navegador guardava a versão antiga do programa em cache e o número da versão aparecia desatualizado. Cada versão agora força o download do arquivo novo.'},
        {tipo:'novo', texto:'A planilha ganhou a aba "Config por Obra" para guardar a configuração separada de cada uma.'},
      ]
    },
    {
      v: '1.0.2',
      data: '2026-08-15',
      titulo: 'Escolha de layout entre desktop e mobile',
      notas: [
        {tipo:'correcao', texto:'O desktop abria a versão mobile e não havia volta: o mobile nunca redirecionava de: agora quem abre a versão mobile numa tela grande volta sozinho para o desktop.'},
        {tipo:'melhoria', texto:'A escolha de layout fica salva no aparelho. Use o link "mobile" no rodapé do desktop, ou "Versão desktop" no menu do celular, para forçar um dos dois.'},
        {tipo:'melhoria', texto:'A detecção passou a considerar tela de toque, não só a largura: uma janela estreita no computador não joga mais para o mobile.'},
      ]
    },
    {
      v: '1.0.1',
      data: '2026-08-15',
      titulo: 'Revisão geral do sistema',
      notas: [
        {tipo:'correcao', texto:'Tarefas eram gravadas na planilha como "[object Object]": o nome era corrompido e o vínculo com as equipes se perdia a cada sincronização. Agora usam o formato nome::equipes.'},
        {tipo:'correcao', texto:'Lixo de sincronizações anteriores é descartado e tarefas duplicadas são unificadas, mantendo a que tem equipes associadas.'},
        {tipo:'correcao', texto:'Só a primeira tarefa da lista era normalizada; listas mistas deixavam itens quebrados na tela de configurações.'},
        {tipo:'correcao', texto:'Tarefas passam a ser preservadas no merge, como os demais cadastros.'},
        {tipo:'correcao', texto:'A obra selecionada voltava sozinha para a primeira da lista a cada sincronização.'},
        {tipo:'melhoria', texto:'Versão agora aparece no cabeçalho, em todas as telas: um toque abre estas notas. Antes só era visível dentro do menu.'},
        {tipo:'correcao', texto:'O mobile tinha dois botões de sincronizar idênticos no cabeçalho; um foi removido.'},
      ]
    },
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

/* ═══ FILA DE ENVIO ═══
   Toda alteração entra na fila e só sai de lá quando a planilha confirma.
   A fila fica no localStorage, então fechar o app no meio não perde nada. */
const Fila = (() => {
  let _rodando = false;
  let _timerRetry = null;

  async function _enviarItem(chave) {
    const p = chave.split(':');
    if (chave === 'workers') return Sheets.saveWorkers();
    if (chave === 'config')  return Sheets.saveConfig();
    if (p[0] === 'efetivo')  return Sheets.saveEfetivo(p[1], p.slice(2).join(':'));
    if (p[0] === 'he')       { const o = p.slice(1).join(':');
                               return Sheets.saveHE(o, (State.get().horasExtras || {})[o] || []); }
    if (p[0] === 'prod')     { const o = p.slice(2).join(':'), dt = p[1], s = State.get();
                               return Sheets.saveProd(dt, o, (s.producaoGeral||{})[o] || {},
                                 ((s.producaoDiaria||{})[o] || {})[dt] || {}); }
    return true;  // chave desconhecida: descarta
  }

  async function processar() {
    if (_rodando) return;
    const s = State.get();
    if (!s.gsUrl || !s.gsSheetId) return;
    if (!Sync.podeGravar()) { _agendarRetry(); _pintar(); return; }
    _rodando = true;
    try {
      let falhou = false;
      // Cópia: a fila pode receber itens novos durante o envio.
      const itens = State.fila().slice();
      const enviados = [];
      for (const chave of itens) {
        _pintar(chave);
        let r;
        try { r = await _enviarItem(chave); } catch(e) { r = false; }
        if (r === false) { falhou = true; break; }   // para e tenta tudo depois
        enviados.push(chave);
        await new Promise(res => setTimeout(res, 250));
      }
      // Uma única confirmação por lote: o POST em no-cors não expõe a
      // resposta, então conferimos por GET que a planilha continua acessível
      // e aceitando. Só então os itens saem da fila.
      if (enviados.length && !falhou) {
        _pintar('confirmando…');
        const okConf = await Sheets.confirmar();
        if (okConf) enviados.forEach(function(c) { State.desenfileirar(c); });
        else falhou = true;
      }
      if (falhou || State.fila().length) _agendarRetry();
    } finally {
      _rodando = false;
      _pintar();
    }
  }

  function _agendarRetry() {
    clearTimeout(_timerRetry);
    _timerRetry = setTimeout(processar, 15000);   // insiste a cada 15s
  }

  // Indicador permanente: quantos itens ainda não chegaram à planilha.
  function _pintar(atual) {
    const n = State.fila().length;
    document.querySelectorAll('[data-fila]').forEach(function(el) {
      if (!n) { el.textContent = 'salvo'; el.style.color = 'var(--gn)'; el.title = 'Tudo na planilha'; }
      else    { el.textContent = n + ' na fila'; el.style.color = 'var(--ac)';
                el.title = (atual ? 'Enviando: ' + atual : n + ' alteração(ões) aguardando a planilha'); }
    });
  }

  function pendentes() { return State.fila().length; }
  function atualizarIndicador() { _pintar(); }

  return { processar, pendentes, atualizarIndicador };
})();

/* ═══ SINCRONIZAÇÃO: ESTADO E DIAGNÓSTICO ═══ */
const Sync = (() => {
  let _leituraOk = false;      // já leu a planilha com sucesso nesta sessão?
  let _ultimoErro = '';
  let _ultimaLeitura = null;
  let _avisado = false;
  let _scriptAntigo = false;
  let _scriptVersao = null;

  function marcarLeituraOk(qtd) {
    _leituraOk = true; _ultimoErro = ''; _ultimaLeitura = new Date();
    _avisado = false;
    _pintarBarra();
    // Assim que a planilha responde, tudo que estava preso na fila sobe.
    if (typeof Fila !== 'undefined') setTimeout(Fila.processar, 100);
  }
  function marcarErro(msg) {
    _leituraOk = false; _ultimoErro = String(msg || 'erro desconhecido');
    _pintarBarra();
  }
  function marcarScriptAntigo(v) { _scriptAntigo = true; _scriptVersao = v; _pintarBarra(); }
  function marcarScriptOk() { _scriptAntigo = false; _pintarBarra(); }
  function scriptAntigo() { return _scriptAntigo; }
  function podeGravar() { return _leituraOk; }
  function leituraOk()  { return _leituraOk; }
  function erro()       { return _ultimoErro; }
  function ultimaLeitura() { return _ultimaLeitura; }

  function avisarBloqueio() {
    if (_avisado) return;
    _avisado = true;
    Utils.toast('Não salvo: sem conexão com a planilha. Suas alterações estão só neste aparelho.', 'error');
  }

  // Faixa fixa no topo enquanto a planilha não responder.
  function _pintarBarra() {
    let el = document.getElementById('syncBanner');
    if (_leituraOk && !_scriptAntigo) { if (el) el.remove(); return; }
    if (!el) {
      el = document.createElement('div');
      el.id = 'syncBanner';
      el.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:9999;background:#7f1d1d;color:#fff;'
        + 'font-size:12px;padding:8px 14px;display:flex;align-items:center;gap:10px;justify-content:center;'
        + 'font-family:DM Sans,sans-serif;box-shadow:0 2px 10px rgba(0,0,0,.4)';
      document.body.appendChild(el);
    }
    if (_scriptAntigo) {
      el.style.background = '#7c2d12';
      el.innerHTML = '<span>⚠️ <strong>O Apps Script da planilha está desatualizado'
        + (_scriptVersao === undefined ? '' : ' (v' + (_scriptVersao||'?') + ')') + '.</strong> '
        + 'Alterações feitas aqui podem não chegar aos outros aparelhos. '
        + 'Abra Configurações → Ver código Script, copie e republique.</span>'
        + '<button onclick="App.showPage(\'configuracoes\')" style="background:#fff;color:#7c2d12;border:none;'
        + 'padding:4px 12px;border-radius:6px;font-weight:700;cursor:pointer;font-size:12px">Abrir Configurações</button>';
      return;
    }
    el.innerHTML = '<span>⚠️ <strong>Sem conexão com a planilha.</strong> '
      + 'Nada será salvo e outros aparelhos não verão estas alterações.'
      + (_ultimoErro ? ' <span style="opacity:.8">(' + Utils.esc(_ultimoErro) + ')</span>' : '')
      + '</span>'
      + '<button onclick="App.syncNow()" style="background:#fff;color:#7f1d1d;border:none;padding:4px 12px;'
      + 'border-radius:6px;font-weight:700;cursor:pointer;font-size:12px">Tentar de novo</button>';
  }

  // Diagnóstico detalhado para o botão Testar.
  async function diagnosticar() {
    const s = State.get();
    const linhas = [];
    if (!s.gsUrl)     linhas.push('❌ URL do Web App não configurada.');
    if (!s.gsSheetId) linhas.push('❌ ID da planilha não configurado.');
    if (linhas.length) return {ok:false, texto:linhas.join('\n')};
    try {
      const res = await fetch(s.gsUrl + '?sheetId=' + s.gsSheetId + '&key=' + encodeURIComponent(s.gsKey||''),
                              {method:'GET', mode:'cors'});
      const json = await res.json();
      if (json.ok === false) {
        const e = String(json.error||'');
        if (/chave/i.test(e)) return {ok:false, texto:'❌ Chave de acesso incorreta ou não preenchida.\nPreencha o campo "Chave de acesso" com a mesma senha da propriedade CHAVE_ACESSO do Apps Script.'};
        return {ok:false, texto:'❌ A planilha respondeu com erro:\n' + e};
      }
      const st = json.state || {};
      const nCfg = Object.keys(st.configPorObra || {}).length;
      // Script antigo nem cria o campo; script novo cria vazio. Isso separa
      // "Apps Script desatualizado" de "configuração ainda não enviada".
      const scriptAntigo = (json.versao === undefined || json.versao < 7) || (st.configPorObra === undefined);
      let txt = '✅ Conectado.\n' +
        'Funcionários na planilha: ' + (st.workers||[]).length + '\n' +
        'Obras: ' + (st.obras||[]).join(', ') + '\n' +
        'Obras com configuração própria: ' + nCfg + '\n';
      if (scriptAntigo) {
        txt += '\n❌ O Apps Script publicado é ANTIGO (versão ' + (json.versao===undefined?'sem número':json.versao) + ', o app precisa da 7).\n'
             + 'Republique o script atualizado (procure por ABA_CFGOB no código).';
      } else if (nCfg === 0) {
        const local = Object.keys(State.get().configPorObra || {}).length;
        txt += '\n✅ O Apps Script está atualizado.\n';
        txt += local
          ? '⚠️ Você tem ' + local + ' obra(s) configurada(s) neste aparelho que nunca foram enviadas.\n'
            + 'Use o botão "Enviar tudo para a planilha" logo abaixo.'
          : 'Nenhuma configuração cadastrada ainda.';
      }
      return {ok:true, texto: txt};
    } catch(e) {
      return {ok:false, texto:'❌ Não consegui falar com a planilha.\n' + e.message +
        '\n\nCausas comuns: URL de implantação errada, implantação não publicada como "Qualquer pessoa", ou sem internet.'};
    }
  }

  return {marcarLeituraOk, marcarErro, marcarScriptAntigo, marcarScriptOk, scriptAntigo, podeGravar, leituraOk, erro, ultimaLeitura, avisarBloqueio, diagnosticar};
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
    document.getElementById('wTeam').innerHTML=State.equipes().map(e=>`<option value="${e.id}">${e.nome}</option>`).join('');
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
    document.getElementById('impEquipe').innerHTML=State.equipes().map(e=>`<option value="${e.id}">${e.nome}</option>`).join('');
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
    // Só os funcionários da obra ativa — antes listava todas as obras juntas.
    let ws=s.workers.filter(w=>w.obra===App.obra());
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
    // Faltas contadas separando sábado de dia de semana.
    const att={};
    if(s.dailyData[obra]) {
      Object.entries(s.dailyData[obra]).forEach(([d,dayMap])=>{
        const sab=Utils.isSaturday(d);
        Object.entries(dayMap).forEach(([wid,dd])=>{
          if(!att[wid]) att[wid]={dias:0,total:0,faltaSab:0,faltaSem:0,totalSab:0,presSab:0};
          att[wid].total++;
          if(sab) att[wid].totalSab++;
          if(dd.presente!==false){ att[wid].dias++; if(sab) att[wid].presSab++; }
          else if(sab) att[wid].faltaSab++;
          else att[wid].faltaSem++;
        });
      });
    }
    const totFaltaSab=Object.values(att).reduce((a,x)=>a+x.faltaSab,0);
    const totFaltaSem=Object.values(att).reduce((a,x)=>a+x.faltaSem,0);
    const hoje=ws.filter(w=>{ const dd=s.dailyData[obra]?.[date]?.[w.id]; return !dd||dd.presente; }).length;
    const rel=s.historico.filter(h=>h.obra===obra).length;
    const avg=ws.length?Math.round(ws.reduce((sum,w)=>{const a=att[w.id];return sum+(a&&a.total?a.dias/a.total*100:100);},0)/ws.length):0;
    const el=document.getElementById('statContent');
    if(!el) return;
    el.innerHTML=`
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-label">Funcionários</div><div class="stat-value">${ws.length}</div></div>
        <div class="stat-card"><div class="stat-label">Hoje</div><div class="stat-value" style="color:var(--gn)">${hoje}</div></div>
        <div class="stat-card"><div class="stat-label">Faltas em Sábado</div><div class="stat-value" style="color:${totFaltaSab?'var(--rd)':'var(--gn)'}">${totFaltaSab}</div></div>
        <div class="stat-card"><div class="stat-label">Faltas Dia Útil</div><div class="stat-value" style="color:${totFaltaSem?'var(--ac)':'var(--gn)'}">${totFaltaSem}</div></div>
        <div class="stat-card"><div class="stat-label">Assiduidade</div><div class="stat-value" style="color:${avg>=90?'var(--gn)':avg>=75?'var(--ac)':'var(--rd)'}">${avg}%</div></div>
      </div>
      <div class="att-list">
        ${ws.map(w=>{
          const a=att[w.id]||{dias:0,total:0,faltaSab:0,faltaSem:0,totalSab:0,presSab:0};
          const pct=a.total?Math.round(a.dias/a.total*100):100;
          const pctSab=a.totalSab?Math.round(a.presSab/a.totalSab*100):null;
          const selos=[
            a.faltaSab?`<span style="background:var(--rdd);color:var(--rd);padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700">${a.faltaSab} falta${a.faltaSab>1?'s':''} SÁB</span>`:'',
            a.faltaSem?`<span style="background:var(--acd);color:var(--ac);padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700">${a.faltaSem} falta${a.faltaSem>1?'s':''} útil</span>`:'',
            (!a.faltaSab&&!a.faltaSem&&a.total)?`<span style="background:var(--gnd);color:var(--gn);padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700">sem faltas</span>`:'',
            pctSab!==null?`<span style="background:var(--sf3);color:var(--t2);padding:2px 8px;border-radius:10px;font-size:10px;font-family:'JetBrains Mono',monospace">sáb ${a.presSab}/${a.totalSab}</span>`:''
          ].filter(Boolean).join(' ');
          const cls=pct>=90?'good':pct>=75?'warn':'danger';
          const cor=pct>=90?'var(--gn)':pct>=75?'var(--ac)':'var(--rd)';
          const eq=State.getEquipe(w.equipe); const ecor=eq?eq.cor:'#8b92b0';
          return `<div class="att-card">
            <div class="att-top">
              <div class="att-info">
                <div class="att-name">${Utils.esc(w.nome)}</div>
                <div class="att-role"><span class="team-badge" style="background:${ecor}22;color:${ecor};border:1px solid ${ecor}44">${Utils.esc(eq?eq.nome:w.equipe)}</span> ${Utils.esc(w.funcao)}</div>
              </div>
              <div onclick="StatPage.verDias('${w.id}')" title="Ver dias de presença e falta" style="font-family:'Bebas Neue',sans-serif;font-size:26px;color:${cor};cursor:pointer;padding:2px 8px;border-radius:8px;border:1px solid transparent" onmouseover="this.style.borderColor='${cor}';this.style.background='${cor}18'" onmouseout="this.style.borderColor='transparent';this.style.background='none'">${pct}%</div>
            </div>
            <div class="bar-wrap"><div class="bar-bg"><div class="bar-fill ${cls}" style="width:${pct}%"></div></div><span style="font-size:10px;color:var(--t3);font-family:'JetBrains Mono',monospace">${a.dias}/${a.total}</span></div>
            ${selos?`<div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:8px">${selos}</div>`:''}
          </div>`;
        }).join('')}
      </div>`;
  }
  // Detalhe de assiduidade: lista dia a dia quem veio e quem faltou.
  function verDias(wid) {
    const s=State.get(), obra=App.obra();
    const w=State.getWorker(wid); if(!w) return;
    const dd=s.dailyData?.[obra]||{};
    const dias=Object.keys(dd).filter(d=>dd[d][wid]).sort((a,b)=>b.localeCompare(a));
    const pres=dias.filter(d=>dd[d][wid].presente!==false);
    const falt=dias.filter(d=>dd[d][wid].presente===false);
    const faltSab=falt.filter(Utils.isSaturday);
    const faltSem=falt.filter(d=>!Utils.isSaturday(d));
    const sabs=dias.filter(Utils.isSaturday);
    const presSab=sabs.filter(d=>dd[d][wid].presente!==false);
    const pct=dias.length?Math.round(pres.length/dias.length*100):100;
    const cor=pct>=90?'var(--gn)':pct>=75?'var(--ac)':'var(--rd)';

    const linhas = dias.length ? dias.map(d=>{
      const r=dd[d][wid], veio=r.presente!==false;
      const sab = Utils.isSaturday(d);
      const det = veio
        ? [r.andar||'', (r.tarefas||[]).join(', ')].filter(Boolean).join(' · ')
        : (r.motivo||'Sem justificativa');
      return `<div style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-bottom:1px solid var(--bd);${sab&&!veio?'background:rgba(239,68,68,.07)':''}">
        <span style="font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--t2);min-width:78px">${Utils.fmtPT(d)}</span>
        <span style="font-size:10px;min-width:78px;${sab?'color:var(--ac);font-weight:700':'color:var(--t3)'}">${Utils.weekday(d)}</span>
        <span style="font-size:11px;font-weight:700;padding:2px 9px;border-radius:10px;min-width:60px;text-align:center;
          background:${veio?'var(--gnd)':'var(--rdd)'};color:${veio?'var(--gn)':'var(--rd)'}">${veio?'VEIO':'FALTOU'}</span>
        <span style="flex:1;font-size:11px;color:var(--t3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${Utils.esc(det)}</span>
      </div>`;
    }).join('') : '<div class="empty">Nenhum dia registrado para este funcionário.</div>';

    document.getElementById('histDetailTitle').innerHTML =
      `${Utils.esc(w.nome)} <span style="font-size:12px;color:var(--t3);font-weight:400">· ${Utils.esc(w.funcao)}</span>`;
    document.getElementById('histDetailText').innerHTML = `
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
        <span class="pill green">${pres.length} presenças</span>
        <span class="pill red">${faltSab.length} faltas SÁBADO</span>
        <span class="pill orange">${faltSem.length} faltas dia útil</span>
        <span class="pill" style="background:var(--sf3);color:var(--t2)">sábados ${presSab.length}/${sabs.length}</span>
        <span class="pill" style="background:${cor}22;color:${cor}">${pct}%</span>
      </div>
      <div style="border:1px solid var(--bd);border-radius:var(--rs);overflow:hidden">${linhas}</div>`;
    Modals.open('modalHistDetail');
  }

  return {render, verDias};
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
        State.andares().map((a,i,arr)=>`<div class="settings-item">
            <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--t3);min-width:22px">${i+1}</span>
            <span style="flex:1">${Utils.esc(a)}</span>
            <button class="icon-btn" title="Subir" ${i===0?'disabled style="opacity:.25"':''} onclick="CfgPage.moverAndar(${i},-1)">↑</button>
            <button class="icon-btn" title="Descer" ${i===arr.length-1?'disabled style="opacity:.25"':''} onclick="CfgPage.moverAndar(${i},1)">↓</button>
            <button class="icon-btn danger" title="Remover" onclick="CfgPage.rmAndar(${i})">✕</button>
          </div>`).join(''),
        `<div class="add-item-row"><input id="newAndar" placeholder="ex: 17º Pavimento"><button class="btn btn-accent" onclick="CfgPage.addAndar()">Add</button></div>`)}
      ${blk('⚒ Atividades',
        State.tarefas().map((t,i)=>itmTarefa(t,i,State.equipes())).join(''),
        `<div class="add-item-row"><input id="newTarefa" placeholder="ex: Instalação elétrica"><button class="btn btn-accent" onclick="CfgPage.addTarefa()">Add</button></div>`)}
      ${blk('👥 Equipes',
        State.equipes().map(e=>`<div class="settings-item"><span class="color-dot" style="background:${e.cor}"></span><span style="flex:1">${Utils.esc(e.nome)}</span><button class="icon-btn danger" onclick="CfgPage.rmEquipe('${e.id}')">✕</button></div>`).join(''),
        `<div class="add-item-row"><input id="newEquipe" placeholder="Nova equipe"><input type="color" id="newEquipeCor" value="#22c55e" style="width:40px;padding:3px;border-radius:6px;border:1px solid var(--bd2);cursor:pointer;background:none"><button class="btn btn-accent" onclick="CfgPage.addEquipe()">Add</button></div>`)}
      ${blk('🏗 Obras',
        s.obras.map((o,i)=>`<div class="settings-item"><span style="flex:1">${Utils.esc(o)}</span>${i===0?'<span style="font-size:10px;color:var(--t3)">principal</span>':`<button class="icon-btn danger" onclick="CfgPage.rmObra('${Utils.esc(o)}')">✕</button>`}</div>`).join(''),
        `<div class="add-item-row"><input id="newObra" placeholder="Nova obra"><button class="btn btn-accent" onclick="CfgPage.addObra()">Add</button></div>`)}
      ${blk('📋 Copiar configuração de outra obra',
        s.obras.filter(o=>o!==App.obra()).length
          ? `<div style="font-size:11px;color:var(--t3);margin-bottom:8px;line-height:1.5">Traz andares, tarefas e equipes da obra escolhida para <strong>${Utils.esc(App.obra())}</strong>, substituindo o que existe aqui.</div>
             <div class="add-item-row">
               <select class="form-input" id="cfgCopiarDe" style="flex:1">${s.obras.filter(o=>o!==App.obra()).map(o=>`<option value="${Utils.esc(o)}">${Utils.esc(o)}</option>`).join('')}</select>
               <button class="btn btn-accent" onclick="CfgPage.copiarDe()">Copiar</button>
             </div>`
          : `<div style="font-size:11px;color:var(--t3)">Só existe uma obra cadastrada.</div>`,
        '')}
      ${blk('🔗 Google Sheets',
        `<div class="form-group"><label>URL do Web App</label><input class="form-input" id="gsUrl" placeholder="https://script.google.com/macros/s/…/exec" value="${Utils.esc(s.gsUrl)}" style="font-size:11px;font-family:'JetBrains Mono',monospace"></div>
         <div class="form-group"><label>ID da Planilha</label><input class="form-input" id="gsSheetId" placeholder="1BxiMVs0XRA5…" value="${Utils.esc(s.gsSheetId)}" style="font-family:'JetBrains Mono',monospace"></div>
         <div class="form-group"><label>Chave de acesso</label><input class="form-input" type="password" id="gsKey" placeholder="digite uma vez neste aparelho" value="${Utils.esc(s.gsKey||'')}" style="font-family:'JetBrains Mono',monospace">
           <div style="font-size:10px;color:var(--t3);margin-top:4px;line-height:1.5">Fica salva só neste aparelho. Nunca colocar no código — o site é público.</div></div>
         <div style="display:flex;gap:8px;margin-top:6px">
           <button class="btn btn-accent" onclick="CfgPage.saveGS()">Salvar</button>
           <button class="btn btn-ghost" onclick="CfgPage.testGS()">Testar</button>
           <button class="btn btn-ghost" onclick="CfgPage.showScript()">Ver código Script</button>
         </div>
         <div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--bd)">
           <button class="btn btn-accent" style="width:100%;background:var(--gn);color:#062b12"
             onclick="CfgPage.enviarTudo()">⬆ Enviar tudo para a planilha</button>
           <div style="font-size:10px;color:var(--t3);margin-top:6px;line-height:1.5">
             Envia funcionários, configuração de cada obra, efetivos, produção e horas extras
             deste aparelho. Use ao configurar a planilha pela primeira vez ou depois de
             atualizar o Apps Script.</div>
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
    const t=State.tarefas()[i];
    const nome=typeof t==='string'?t:t.nome;
    const novo=prompt('Editar atividade:',nome);
    if(!novo||!novo.trim()||novo.trim()===nome) return;
    if(typeof t==='string') State.tarefas()[i]={nome:novo.trim(),equipes:[]};
    else t.nome=novo.trim();
    State.save('config');
    render();
  }
  function setTarefaEqs(i, sel) {
    const s = State.get();
    const t = State.tarefas()[i];
    if (!t) return;
    const eqs = Array.from(sel.selectedOptions).map(o=>o.value);
    if (typeof t === 'string') State.tarefas()[i] = {nome:t, equipes:eqs};
    else t.equipes = eqs;
    State.save('config');
  }
  function toggleTarefaEq(i, eqNome) {
    const s = State.get();
    const t = State.tarefas()[i];
    if (!t) return;
    if (typeof t === 'string') State.tarefas()[i] = {nome:t, equipes:[eqNome]};
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
  function moverAndar(i,dir){
    if(!State.moverAndar(i,dir)) return;
    render();
    if(typeof EfPage!=='undefined') EfPage.render();
  }

  async function enviarTudo(){
    if (!Sync.leituraOk()) { Utils.toast('Conecte-se à planilha antes de enviar.','error'); return; }
    const s=State.get();
    const nObras=Object.keys(s.configPorObra||{}).length;
    if(!confirm('Enviar para a planilha:\n\n• '+s.workers.length+' funcionários\n• '+nObras+' obra(s) configurada(s)\n• efetivos, produção e horas extras\n\nIsto substitui o conteúdo correspondente na planilha. Continuar?')) return;
    const t=document.getElementById('histDetailTitle');
    const c=document.getElementById('histDetailText');
    if(t) t.textContent='Enviando para a planilha';
    if(c) c.textContent='Preparando…';
    Modals.open('modalHistDetail');
    const r=await Sheets.enviarTudo(function(i,total,nome){
      if(c) c.textContent='['+i+'/'+total+'] '+nome;
    });
    if(c) c.textContent = r.falhas
      ? '⚠️ Enviado com falhas.\n\nEnviados: '+r.ok+' de '+r.total+'\nFalharam: '+r.falhas+'\n\nTente novamente; se persistir, verifique a chave de acesso.'
      : '✅ Tudo enviado.\n\n'+r.ok+' de '+r.total+' itens gravados na planilha.\n\nAbra o app em outro aparelho e toque em Sync para confirmar.';
    Utils.toast(r.falhas?'Envio com falhas':'Envio concluído', r.falhas?'warn':'success');
  }

  function copiarDe(){
    const de=document.getElementById('cfgCopiarDe')?.value;
    if(!de) return;
    if(!confirm(`Substituir a configuração de "${App.obra()}" pela de "${de}"?`)) return;
    State.copiarConfig(de, App.obra());
    render();
    if(typeof EfPage!=='undefined') EfPage.render();
    Utils.toast('Configuração copiada de '+de,'success');
  }

  function saveGS(){const s=State.get();s.gsUrl=document.getElementById('gsUrl').value.trim();s.gsSheetId=document.getElementById('gsSheetId').value.trim();const k=document.getElementById('gsKey');if(k)s.gsKey=k.value.trim();State.save();Utils.toast('Salvo!','success');App.updateGSIndicator();}
  async function testGS(){
    saveGS();
    Utils.toast('Testando…','info');
    const r = await Sync.diagnosticar();
    document.getElementById('histDetailTitle').textContent = r.ok ? 'Conexão OK' : 'Problema na conexão';
    document.getElementById('histDetailText').textContent = r.texto;
    Modals.open('modalHistDetail');
  }
  function showScript(){document.getElementById('scriptCode').textContent=Sheets.CODE;Modals.open('modalScript');}
  return {render,addAndar,rmAndar,addTarefa,rmTarefa,editTarefa,setTarefaEqs,toggleTarefaEq,addEquipe,rmEquipe,addObra,rmObra,saveGS,testGS,showScript, copiarDe, enviarTudo, moverAndar};
})();

/* ═══ HORAS EXTRAS PAGE ═══ */
const HEPage = (() => {
  let _sel = [];
  let _editId = null;   // lançamento sendo editado (null = novo)

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
            <button class="icon-btn" title="Editar lançamento" onclick="HEPage.editar('${e.id}')">✎</button>
            <button class="icon-btn danger" title="Remover" onclick="HEPage.remove('${e.id}')">✕</button></div></div>
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
    _sel=[]; _editId=null;
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
  }

  // Abre um lançamento já salvo direto na etapa de horas, preenchido.
  function editar(id){
    const s=State.get(), obra=App.obra();
    const e=((s.horasExtras&&s.horasExtras[obra])||[]).find(x=>x.id===id);
    if(!e){Utils.toast('Lançamento não encontrado.','error');return;}
    _editId=id;
    _sel=(e.registros||[]).map(r=>r.wid).filter(Boolean);
    document.getElementById('heDate').value=e.data;
    document.getElementById('heTipo').value=String(e.tipo||'60');
    _montarStep2((e.registros||[]).reduce((m,r)=>{m[r.wid]=r.horas;return m;},{}));
    document.getElementById('heStep1Wrap').style.display='none';
    document.getElementById('heStep2Wrap').style.display='flex';
    document.getElementById('heStep2Wrap').style.flexDirection='column';
    document.getElementById('heModalTitle').textContent='Editar '+Utils.fmtPT(e.data);
    document.getElementById('heBtnLancar').style.display='none';
    document.getElementById('heBtnSalvar').style.display='block';
    Modals.open('modalHE');
    document.getElementById('modalHE').style.display='flex';
  }

  function _montarStep2(valores){
    valores=valores||{};
    document.getElementById('heStep2').innerHTML=_sel.map(wid=>{
      const w=State.getWorker(wid);
      const v=valores[wid]!==undefined?valores[wid]:'';
      return `<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--bd)">
        <div style="flex:1"><div style="font-size:14px;font-weight:600">${w?Utils.esc(w.nome):'?'}</div>
        <div style="font-size:11px;color:var(--t3)">${w?Utils.esc(w.funcao):''}</div></div>
        <input type="number" id="heh-${wid}" min="0" max="24" step="0.5" placeholder="h" value="${v}"
          style="width:70px;background:var(--sf2);border:1px solid var(--bd2);color:var(--t1);font-family:JetBrains Mono,monospace;font-size:16px;padding:8px;border-radius:8px;outline:none;text-align:center"></div>`;
    }).join('');
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
    _montarStep2();
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
    const entry={id:_editId||('he'+Date.now()),data:date,tipo,registros};
    if(_editId){
      // Regrava por cima: remove as linhas antigas antes de reenviar.
      const i=s.horasExtras[obra].findIndex(x=>x.id===_editId);
      if(i>=0) s.horasExtras[obra][i]=entry; else s.horasExtras[obra].unshift(entry);
      Sheets.deleteHE(_editId);
    } else {
      s.horasExtras[obra].unshift(entry);
    }
    s.horasExtras[obra].sort((a,b)=>String(b.data||'').localeCompare(String(a.data||'')));
    State.save();
    Sheets.saveHE(obra,[entry]);
    Modals.close('modalHE');
    const editou=!!_editId; _editId=null;
    render();
    Utils.toast(editou?'✅ Lançamento atualizado!':'✅ Lançamento salvo!','success');
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
    const nomes=[...new Set([...Object.keys(map60),...Object.keys(map100)])]
      .sort((x,y)=>x.localeCompare(y,'pt-BR'));
    const t60=Object.values(map60).reduce((a,b)=>a+b,0);
    const t100=Object.values(map100).reduce((a,b)=>a+b,0);
    const larg=Math.min(38,Math.max(...nomes.map(n=>n.length),12));

    let txt='*RELATÓRIO DE HORAS EXTRAS*\n';
    txt+=`${obra}\n${mes?_fmtMes(mes):'Todo o período'}\n`;
    txt+=`${filtered.length} lançamento(s) · ${nomes.length} funcionário(s)\n\n`;

    txt+='```\n';
    txt+='FUNCIONÁRIO'.padEnd(larg)+'   60%    100%   TOTAL\n';
    txt+='─'.repeat(larg+24)+'\n';
    nomes.forEach(n=>{
      const a60=map60[n]||0, a100=map100[n]||0;
      txt+=(n.length>larg?n.slice(0,larg-1)+'…':n).padEnd(larg)
         + String(a60?a60+'h':'–').padStart(6)
         + String(a100?a100+'h':'–').padStart(8)
         + String((a60+a100)+'h').padStart(8) + '\n';
    });
    txt+='─'.repeat(larg+24)+'\n';
    txt+='TOTAL'.padEnd(larg)+String(t60+'h').padStart(6)+String(t100+'h').padStart(8)+String((t60+t100)+'h').padStart(8)+'\n';
    txt+='```\n\n';

    txt+='*DETALHE POR DIA*\n';
    filtered.slice().sort((x,y)=>String(x.data).localeCompare(String(y.data))).forEach(e=>{
      const p100=Utils.isSunday(e.data)||e.tipo==='100';
      const tot=(e.registros||[]).reduce((a,r)=>a+Number(r.horas||0),0);
      txt+=`\n*${Utils.fmtPT(e.data)}* – ${Utils.weekday(e.data)} · ${p100?'100%':'60%'} · ${tot}h\n`;
      (e.registros||[]).slice()
        .sort((a,b)=>String(a.nome||'').localeCompare(String(b.nome||''),'pt-BR'))
        .forEach(r=>{ txt+=`• ${r.nome||'?'} – ${r.horas}h\n`; });
    });

    document.getElementById('previewText').textContent=txt;
    Modals.open('modalPreview');
  }

  return {render,openStep1,editar,toggleSel,selectAll,goStep2,setTodosIgual,saveAdd,remove,gerarRelatorio};
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

  const eqAdm = State.equipes(obra).find(function(e){ return e.nome === 'Administra\u00e7\u00e3o'; });
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

  const _ac = State.andares(obra);
  const andaresCfg = _ac.filter(function(a,i){ return _ac.indexOf(a)===i; });
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
    Fila.atualizarIndicador();
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
    // Lê a planilha ao abrir…
    _loadFromSheets();
    // …ao voltar para o app (troca de aba/app no celular)…
    document.addEventListener('visibilitychange', function() {
      if (!document.hidden) _loadFromSheets();
    });
    // …e periodicamente, para receber o que outros aparelhos salvaram.
    // O guard de fila (isDirty) impede sobrescrever alterações pendentes.
    setInterval(function() { _loadFromSheets(); }, 60000);
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

  // Mescla {obra:{andares,tarefas,equipes}} sem perder o que só existe local.
  // A config de cada obra é substituída por inteiro pelo que veio da
  // planilha — que é sempre o último estado salvo por algum aparelho.
  // Antes isto unia as listas, então excluir um andar/tarefa/equipe nunca
  // valia: o item voltava no sync seguinte e as obras ficavam idênticas.
  // Alterações locais ainda não enviadas não chegam aqui: State.isDirty()
  // bloqueia o carregamento remoto até o envio terminar.
  function _mergeCfgObra(local, remote) {
    const out = JSON.parse(JSON.stringify(remote || {}));
    Object.keys(local || {}).forEach(function(obra) {
      if (!out[obra]) out[obra] = local[obra];   // obra que só existe aqui
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
    if (!s.gsUrl || !s.gsSheetId) { Sync.marcarErro('planilha não configurada'); return; }
    // Não puxa por cima de alterações locais que ainda não subiram.
    if (!force && State.isDirty()) return;
    try {
      const res = await fetch(s.gsUrl + '?sheetId=' + s.gsSheetId + '&key=' + encodeURIComponent(s.gsKey||''), {method:'GET', mode:'cors'});
      const json = await res.json();
      // Script sem número de versão ou com número menor = publicado é antigo.
      const VERSAO_MINIMA = 7;
      if (json.ok && (json.versao === undefined || json.versao < VERSAO_MINIMA)) {
        Sync.marcarScriptAntigo(json.versao);
      } else if (json.ok) {
        Sync.marcarScriptOk();
      }
      if (!json.ok || !json.state) {
        Sync.marcarErro(json.error || 'resposta inválida da planilha');
        return;
      }
      const sheetState = json.state;
      // Preservar gsUrl e gsSheetId locais
      sheetState.gsUrl = s.gsUrl;
      sheetState.gsSheetId = s.gsSheetId;
      sheetState.gsKey = s.gsKey || '';
      // O Apps Script não conhece este campo; sem preservá-lo a migração
      // voltava a rodar depois de cada sincronização.
      sheetState.cfgMigrado = s.cfgMigrado === true;
      // A obra ativa é escolha do aparelho. O Apps Script devolve sempre a
      // primeira da lista, o que trocava a obra selecionada a cada sync.
      if (s.activeObra && (sheetState.obras||[]).indexOf(s.activeObra) >= 0) {
        sheetState.activeObra = s.activeObra;
      }
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
      sheetState.tarefas = _mergeLista(local.tarefas, sheetState.tarefas, 'nome');
      // Config por obra: mescla obra a obra, item a item.
      sheetState.configPorObra = _mergeCfgObra(local.configPorObra, sheetState.configPorObra);
      sheetState.horasExtras    = _mergeById(local.horasExtras,      sheetState.horasExtras);

      localStorage.setItem('efetivo_v3', JSON.stringify(sheetState));
      State.load();
      if (typeof EfPage !== 'undefined') EfPage.render();
      if (typeof FuncPage !== 'undefined' && document.getElementById('funcList')?.offsetParent !== null) FuncPage.render();
      Sync.marcarLeituraOk();
      Utils.toast('Sincronizado: ' + (sheetState.workers||[]).length + ' funcionários', 'success');
    } catch(e) {
      Sync.marcarErro(e && e.message ? e.message : 'sem conexão');
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
