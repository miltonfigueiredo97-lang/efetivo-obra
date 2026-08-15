# Efetivo de Obra

Controle diário de efetivo, produção e horas extras em obra, com sincronização
para Google Sheets. Roda como site estático (GitHub Pages), sem servidor.

## Arquivos

| Arquivo | Papel |
|---|---|
| `config.js` | URL do Apps Script e ID da planilha. **Público — sem senhas.** |
| `app.js` | Núcleo compartilhado: State, Utils, Sheets, Modals e todas as páginas exceto o Efetivo. |
| `index.html` | Layout desktop + `EfPage` em tabela com ordenação por coluna. |
| `mobile.html` | Layout mobile + `EfPage` em cards com busca. |

`index.html` redireciona para `mobile.html` abaixo de 768px de largura.

## Configuração inicial (uma vez)

1. Na planilha do Google, abra **Extensões → Apps Script**.
2. No app, vá em **Configurações → Ver código Script**, copie e cole no editor.
3. No Apps Script: **Configurações do projeto → Propriedades do script → Adicionar**
   - Propriedade: `CHAVE_ACESSO`
   - Valor: uma senha forte que você escolher
4. **Implantar → Nova implantação → App da Web**
   - Executar como: *Eu mesmo*
   - Quem pode acessar: *Qualquer pessoa*
5. Copie a URL gerada para `config.js` (campo `gsUrl`).
6. Em cada aparelho que for usar o app: **Configurações → Chave de acesso** →
   digite a mesma senha do passo 3 → **Salvar** → **Testar**.

A chave fica no `localStorage` daquele aparelho e **nunca** vai para o repositório.
Sem ela, o Apps Script rejeita leitura e escrita.

## Segurança

Este site é público: qualquer pessoa lê o código-fonte servido pelo GitHub Pages.
Por isso:

- **Nunca** coloque a chave de acesso no `config.js` ou em qualquer arquivo do repo.
- Se a URL de uma implantação vazar, crie uma **nova implantação** (gera URL nova)
  em vez de reutilizar a antiga — URLs antigas continuam válidas.
- URLs e senhas que já foram commitadas continuam no histórico do Git mesmo após
  serem removidas dos arquivos. Nesse caso, troque a credencial, não só o arquivo.

## Sincronização

- Marcar presença, andar ou tarefa grava no `localStorage` na hora e sobe para a
  planilha após 1,5s (debounce).
- Ao abrir o app, ele puxa o estado da planilha e faz **merge**: dias que existem
  só no aparelho são preservados. Se houver alteração pendente de envio, o load
  remoto é adiado para não sobrescrever.
- O botão **Sync** força a leitura da planilha, ignorando esse adiamento.

## Desenvolvimento

Não há build. Para testar local:

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

Ao mexer em algo compartilhado entre desktop e mobile, edite **`app.js`**.
Só a `EfPage` é duplicada, de propósito — as duas versões têm interações
diferentes (ordenação por coluna vs. busca em cards).
