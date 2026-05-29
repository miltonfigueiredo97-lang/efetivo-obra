/* ═══════════════════════════════════════════
   state.js – Dados globais e persistência
   ═══════════════════════════════════════════ */

const State = (() => {
  const STORAGE_KEY = 'efetivo_v2';

  const DEFAULT = {
    obras: ['Essence Residence'],
    andares: [
      '2º Subsolo','1º Subsolo','Térreo',
      '1º Pavimento','2º Pavimento','3º Pavimento','4º Pavimento',
      '5º Pavimento','6º Pavimento','7º Pavimento','8º Pavimento',
      '9º Pavimento','10º Pavimento','11º Pavimento','12º Pavimento',
      '13º Pavimento','14º Pavimento','15º Pavimento','16º Pavimento',
      'Cobertura','Área Comum','Guarita',
    ],
    tarefas: [
      'Alvenaria estrutural – Lado A',
      'Alvenaria estrutural – Lado B',
      'Alvenaria de vedação',
      'Armação positiva',
      'Assoalho',
      'Pontos de graute do andar',
      'Aéreo da hidráulica',
      'Aranhas (instalações)',
      'Operação de Bobcat',
      'Operação da mini grua',
      'Proteção periférica',
      'Marcação da laje',
      'Organização da área comum',
      'Organização e paletamento de blocos',
      'Produção de peças (solda)',
      'Piso do estacionamento',
      'Betoneira',
      'Concretagem',
      'Instalação elétrica',
      'Pintura',
      'Revestimento',
      'Serviços gerais',
    ],
    equipes: [
      { id: 'eq1', nome: 'Administração',        cor: '#a855f7' },
      { id: 'eq2', nome: 'Alvenaria Estrutural',  cor: '#f0a500' },
      { id: 'eq3', nome: 'Alvenaria de Vedação',  cor: '#fb923c' },
      { id: 'eq4', nome: 'Armação / Ferragem',    cor: '#ef4444' },
      { id: 'eq5', nome: 'Carpintaria',           cor: '#22c55e' },
      { id: 'eq6', nome: 'Hidráulica',            cor: '#3b82f6' },
      { id: 'eq7', nome: 'Elétrica',              cor: '#eab308' },
      { id: 'eq8', nome: 'Geral',                 cor: '#8b92b0' },
    ],
    workers: [
      // Administração e Apoio
      { id: 'w1',  nome: 'Raimundo Gonçalo Coelho',                    funcao: 'Mestre de Obras',      equipe: 'eq1', obra: 'Essence Residence' },
      { id: 'w2',  nome: 'Milton de Campos Figueiredo',                funcao: 'Engenheiro de Obra',   equipe: 'eq1', obra: 'Essence Residence' },
      { id: 'w3',  nome: 'Jordeano Rocha dos Santos',                  funcao: 'Encarregado Civil',    equipe: 'eq1', obra: 'Essence Residence' },
      { id: 'w4',  nome: 'Wilson Robson de Souza',                     funcao: 'Almoxarife',           equipe: 'eq1', obra: 'Essence Residence' },
      { id: 'w5',  nome: 'Vinicius Hideo Takemoto B. do Nascimento',   funcao: 'Assistente Engenharia',equipe: 'eq1', obra: 'Essence Residence' },
      { id: 'w6',  nome: 'Cleber Ferreira Miranda',                    funcao: 'Administrativo',       equipe: 'eq1', obra: 'Essence Residence' },
      // 2º Subsolo
      { id: 'w7',  nome: 'Fabio Lopes dos Santos',                     funcao: 'Ajudante',             equipe: 'eq8', obra: 'Essence Residence' },
      { id: 'w8',  nome: 'Jose Edigleuson Xavier dos Santos',          funcao: 'Ajudante',             equipe: 'eq8', obra: 'Essence Residence' },
      { id: 'w9',  nome: 'José Pereira da Silva Filho',                funcao: 'Ajudante',             equipe: 'eq8', obra: 'Essence Residence' },
      { id: 'w10', nome: 'Lino dos Santos',                            funcao: 'Ajudante',             equipe: 'eq8', obra: 'Essence Residence' },
      { id: 'w11', nome: 'Juciel',                                     funcao: 'Pedreiro / Carpinteiro',equipe: 'eq5',obra: 'Essence Residence' },
      // 1º Subsolo
      { id: 'w12', nome: 'Edson Ramos da Silva',                       funcao: 'Operador de Bobcat',   equipe: 'eq8', obra: 'Essence Residence' },
      { id: 'w13', nome: 'Edson Fernandes de Almeida',                 funcao: 'Ajudante',             equipe: 'eq8', obra: 'Essence Residence' },
      { id: 'w14', nome: 'Francisco dos Santos da Silva',              funcao: 'Ajudante',             equipe: 'eq8', obra: 'Essence Residence' },
      { id: 'w15', nome: 'Lucas Dantas',                               funcao: 'Soldador',             equipe: 'eq8', obra: 'Essence Residence' },
      // 5º Pavimento
      { id: 'w16', nome: 'Genival',                                    funcao: 'Pedreiro',             equipe: 'eq3', obra: 'Essence Residence' },
      { id: 'w17', nome: 'Gildivan',                                   funcao: 'Ajudante',             equipe: 'eq3', obra: 'Essence Residence' },
      { id: 'w18', nome: 'Gilvan Bispo',                               funcao: 'Ajudante',             equipe: 'eq6', obra: 'Essence Residence' },
      { id: 'w19', nome: 'Lucas Pereira',                              funcao: 'Ajudante',             equipe: 'eq6', obra: 'Essence Residence' },
      // 6º Pavimento
      { id: 'w20', nome: 'Valmir da Conceição Barbosa',                funcao: 'Ajudante',             equipe: 'eq8', obra: 'Essence Residence' },
      { id: 'w21', nome: 'Wagner (Brinco)',                            funcao: 'Encanador',            equipe: 'eq6', obra: 'Essence Residence' },
      // 11º
      { id: 'w22', nome: 'Ray Nascimento dos Santos',                  funcao: 'Ajudante',             equipe: 'eq8', obra: 'Essence Residence' },
      // 12º
      { id: 'w23', nome: 'Edson Fernandes de Morais',                  funcao: 'Ajudante',             equipe: 'eq8', obra: 'Essence Residence' },
      // 14º
      { id: 'w24', nome: 'Adalberto Ferreira da Silva',                funcao: 'Bloqueiro',            equipe: 'eq2', obra: 'Essence Residence' },
      { id: 'w25', nome: 'Jose Vani',                                  funcao: 'Bloqueiro',            equipe: 'eq2', obra: 'Essence Residence' },
      { id: 'w26', nome: 'Silvanildo João da Silva',                   funcao: 'Bloqueiro',            equipe: 'eq2', obra: 'Essence Residence' },
      { id: 'w27', nome: 'André Borges Evangelista',                   funcao: 'Bloqueiro',            equipe: 'eq2', obra: 'Essence Residence' },
      { id: 'w28', nome: 'Erivam de Jesus Lima',                       funcao: 'Ajudante',             equipe: 'eq2', obra: 'Essence Residence' },
      { id: 'w29', nome: 'José de Souza Silva',                        funcao: 'Ajudante',             equipe: 'eq2', obra: 'Essence Residence' },
      { id: 'w30', nome: 'Samuel Gonçalves Coelho',                    funcao: 'Ajudante',             equipe: 'eq2', obra: 'Essence Residence' },
      { id: 'w31', nome: 'Jorge Ramos Machado',                        funcao: 'Ajudante',             equipe: 'eq2', obra: 'Essence Residence' },
      { id: 'w32', nome: 'João Vitor da Silva',                        funcao: 'Ajudante',             equipe: 'eq2', obra: 'Essence Residence' },
      { id: 'w33', nome: 'Noel Brito',                                 funcao: 'Ajudante',             equipe: 'eq2', obra: 'Essence Residence' },
      { id: 'w34', nome: 'Valdiano Alves Santana',                     funcao: 'Ajudante',             equipe: 'eq2', obra: 'Essence Residence' },
      { id: 'w35', nome: 'Guilherme Porfirio',                         funcao: 'Armador (Segurança)',  equipe: 'eq4', obra: 'Essence Residence' },
      { id: 'w36', nome: 'Ezequiel Pereira dos Santos',                funcao: 'Encanador',            equipe: 'eq6', obra: 'Essence Residence' },
      // 15º
      { id: 'w37', nome: 'Eugenio Ribeiro de Souza',                   funcao: 'Armador',              equipe: 'eq4', obra: 'Essence Residence' },
      { id: 'w38', nome: 'Francisco Ramylo Nascimento Silva',          funcao: 'Armador',              equipe: 'eq4', obra: 'Essence Residence' },
      { id: 'w39', nome: 'Junior Pereira',                             funcao: 'Armador',              equipe: 'eq4', obra: 'Essence Residence' },
      { id: 'w40', nome: 'Roniel Brito Gois',                          funcao: 'Armador',              equipe: 'eq4', obra: 'Essence Residence' },
      { id: 'w41', nome: 'Cleto de Souza Santos',                      funcao: 'Carpinteiro',          equipe: 'eq5', obra: 'Essence Residence' },
      { id: 'w42', nome: 'Genilson Soares Maciel',                     funcao: 'Carpinteiro',          equipe: 'eq5', obra: 'Essence Residence' },
      { id: 'w43', nome: 'Jose Amorim da Rocha',                       funcao: 'Carpinteiro',          equipe: 'eq5', obra: 'Essence Residence' },
      { id: 'w44', nome: 'Rodrigo Mendes da Silva',                    funcao: 'Carpinteiro',          equipe: 'eq5', obra: 'Essence Residence' },
      { id: 'w45', nome: 'Vagner Araujo de Morais',                    funcao: 'Carpinteiro',          equipe: 'eq5', obra: 'Essence Residence' },
      { id: 'w46', nome: 'Jose Ramalho da Silva',                      funcao: 'Carpinteiro',          equipe: 'eq5', obra: 'Essence Residence' },
      { id: 'w47', nome: 'Thiago da Silva',                            funcao: 'Ajudante',             equipe: 'eq8', obra: 'Essence Residence' },
    ],
    // dailyData[date][workerId] = { presente, andar, tarefas[] }
    dailyData: {},
    // producao[date] = { campos... }
    producao: {},
    // attendance[workerId] = { dias, total }
    attendance: {},
    // historico[]: { ts, data, obra, texto, total }
    historico: [],
    // Google Sheets config
    gsUrl: '',
    gsSheetId: '',
    // UI state
    activeObra: 'Essence Residence',
    activeTeamFilter: 'all',
  };

  let data = {};

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        data = deepMerge(DEFAULT, parsed);
      } else {
        data = JSON.parse(JSON.stringify(DEFAULT));
      }
    } catch (e) {
      console.warn('State load error', e);
      data = JSON.parse(JSON.stringify(DEFAULT));
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      const el = document.getElementById('lastSaved');
      if (el) el.textContent = 'Salvo ' + Utils.timeNow();
    } catch (e) {
      console.warn('State save error', e);
    }
  }

  function deepMerge(target, source) {
    const out = Object.assign({}, target);
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        out[key] = deepMerge(target[key] || {}, source[key]);
      } else {
        out[key] = source[key];
      }
    }
    return out;
  }

  function get() { return data; }

  function getDayData(workerId, date) {
    const d = date || App.currentDate;
    if (!data.dailyData[d]) data.dailyData[d] = {};
    if (!data.dailyData[d][workerId]) {
      data.dailyData[d][workerId] = { presente: true, andar: '', tarefas: [] };
    }
    return data.dailyData[d][workerId];
  }

  function setDayField(workerId, field, value, date) {
    const d = getDayData(workerId, date);
    d[field] = value;
    save();
  }

  function getEquipe(idOrNome) {
    return data.equipes.find(e => e.id === idOrNome || e.nome === idOrNome);
  }

  function getWorker(id) {
    return data.workers.find(w => w.id === id);
  }

  function addWorker(w) {
    w.id = 'w' + Date.now();
    data.workers.push(w);
    save();
    return w;
  }

  function updateWorker(id, fields) {
    const w = data.workers.find(x => x.id === id);
    if (w) Object.assign(w, fields);
    save();
  }

  function removeWorker(id) {
    data.workers = data.workers.filter(w => w.id !== id);
    save();
  }

  function addObra(nome) {
    if (!data.obras.includes(nome)) { data.obras.push(nome); save(); }
  }

  function removeObra(nome) {
    data.obras = data.obras.filter(o => o !== nome);
    save();
  }

  function addAndar(v) { data.andares.push(v); save(); }
  function removeAndar(i) { data.andares.splice(i, 1); save(); }

  function addTarefa(v) { data.tarefas.push(v); save(); }
  function removeTarefa(i) { data.tarefas.splice(i, 1); save(); }

  function addEquipe(e) { e.id = 'eq' + Date.now(); data.equipes.push(e); save(); return e; }
  function removeEquipe(id) { data.equipes = data.equipes.filter(e => e.id !== id); save(); }

  function saveProducao(date, fields) {
    data.producao[date] = Object.assign(data.producao[date] || {}, fields);
    save();
  }

  function addHistorico(entry) {
    data.historico.unshift(entry);
    if (data.historico.length > 200) data.historico = data.historico.slice(0, 200);
    save();
  }

  function updateAttendance(workerId, presente) {
    if (!data.attendance[workerId]) data.attendance[workerId] = { dias: 0, total: 0 };
    data.attendance[workerId].total++;
    if (presente) data.attendance[workerId].dias++;
    save();
  }

  function resetAttendanceForDate(date, obraWorkers) {
    // Called when re-generating a report for an existing date (avoid double-counting)
    // This is a simple approach – for production you'd track per-date
  }

  return {
    load, save, get,
    getDayData, setDayField,
    getEquipe, getWorker,
    addWorker, updateWorker, removeWorker,
    addObra, removeObra,
    addAndar, removeAndar,
    addTarefa, removeTarefa,
    addEquipe, removeEquipe,
    saveProducao,
    addHistorico,
    updateAttendance,
  };
})();
