/* ═══════════════════════════════════════════════════════════════
   EFETIVO DE OBRA — configuração da integração com Google Sheets

   ATENÇÃO: este arquivo é público (GitHub Pages serve ele para
   qualquer visitante). NÃO coloque senha nem chave de acesso aqui.

   A chave de acesso (gsKey) é digitada uma vez por aparelho, em
   Configurações → Google Sheets, e fica só no localStorage daquele
   aparelho — nunca no repositório.
   ═══════════════════════════════════════════════════════════════ */
window.EFETIVO_CONFIG = {
  // URL da implantação do Apps Script (Implantar → App da Web)
  gsUrl: 'https://script.google.com/macros/s/AKfycbz2WSboxUbnfKM_hp_91DIu04b2WFWfHSXdj6RG2ITkyLq7W9eDAtVdpN3ogcFUa-JM/exec',

  // ID da planilha (o trecho entre /d/ e /edit na URL do Sheets)
  gsSheetId: '1Zilh_8iKHIaiXqOg8OwHW6HUUjVERxYuLzUA6LoC6rQ',
};
