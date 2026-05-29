# ⚒ Efetivo de Obra

Sistema de gestão de efetivo de obras com deploy no **GitHub Pages** e integração com **Google Sheets**.

## 🚀 Deploy no GitHub Pages

### 1. Criar repositório no GitHub

1. Acesse [github.com](https://github.com) → **New repository**
2. Nome: `efetivo-obra` (pode ser privado)
3. **NÃO** inicialize com README (você vai subir os arquivos)
4. Clique em **Create repository**

### 2. Subir os arquivos

```bash
# No terminal, dentro da pasta do projeto:
git init
git add .
git commit -m "feat: sistema efetivo de obra v2"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/efetivo-obra.git
git push -u origin main
```

### 3. Ativar GitHub Pages

1. No repositório → **Settings** → **Pages**
2. Source: **GitHub Actions**
3. O workflow em `.github/workflows/deploy.yml` vai rodar automaticamente
4. Após ~1 minuto, o site estará em: `https://SEU_USUARIO.github.io/efetivo-obra`

> **Dica:** Se quiser deixar o repositório **privado** mas o site público, o GitHub Pages de contas gratuitas exige repositório público. Para repo privado, use GitHub Pro ou uma conta de organização.

---

## 📊 Integração Google Sheets

### 1. Criar a planilha

1. Acesse [docs.google.com/spreadsheets](https://docs.google.com/spreadsheets) → crie uma planilha nova
2. Copie o **ID** da URL: `docs.google.com/spreadsheets/d/**ID_AQUI**/edit`

### 2. Configurar Apps Script

1. Acesse [script.google.com](https://script.google.com) → **Novo projeto**
2. Apague o código existente
3. No sistema (aba Google Sheets), clique em **"Ver código Apps Script"**
4. Copie e cole no editor do Apps Script
5. Salve o projeto (Ctrl+S)

### 3. Publicar o Web App

1. Clique em **Implantar** → **Nova implantação**
2. Tipo: **Aplicativo da Web**
3. Executar como: **Eu mesmo**
4. Acesso: **Qualquer pessoa**
5. Clique em **Implantar** e autorize as permissões
6. Copie a **URL do Web App** gerada

### 4. Configurar no sistema

1. No sistema, acesse **Google Sheets** na barra lateral
2. Cole a URL do Web App
3. Cole o ID da planilha
4. Clique em **Salvar configuração**

A partir daí, ao clicar em **"Gerar & Enviar Relatório"**, os dados são salvos automaticamente nas abas:
- **Efetivo** – registro individual de cada funcionário
- **Relatórios** – texto completo do efetivo
- **Assiduidade** – presença acumulada de cada funcionário

---

## 📁 Estrutura do projeto

```
efetivo-obra/
├── index.html              # Página principal
├── css/
│   └── main.css            # Estilos
├── js/
│   ├── state.js            # Gerenciamento de dados (localStorage)
│   ├── utils.js            # Funções utilitárias
│   ├── sheets.js           # Integração Google Sheets
│   ├── modals.js           # Gerenciador de modais
│   ├── app.js              # Controlador principal
│   └── pages/
│       ├── efetivo.js      # Página do efetivo diário
│       ├── producao.js     # Relatório de execução
│       ├── funcionarios.js # CRUD de funcionários + relatórios + histórico
│       ├── configuracoes.js# Configurações + integração
│       └── (stubs)         # Arquivos de referência
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI/CD automático GitHub Pages
└── README.md
```

---

## 💡 Funcionalidades

| Função | Descrição |
|--------|-----------|
| ✅ Efetivo diário | Marque presença, andar e atividades de cada funcionário |
| 📋 Relatório WhatsApp | Gera texto formatado pronto para copiar e colar |
| 📊 Google Sheets | Envia dados automaticamente para sua planilha |
| 👷 Gestão de funcionários | Adicione, edite, mova entre obras, importe listas |
| 📈 Desempenho | Acompanhe assiduidade de toda a equipe |
| 📅 Histórico | Consulte e copie relatórios anteriores |
| ⚙️ Configurações | Customize andares, atividades, equipes e obras |
| 💾 Offline | Todos os dados ficam no navegador (localStorage) |

---

## 🔄 Atualizar após mudanças

Qualquer `git push` para a branch `main` dispara o deploy automático:

```bash
git add .
git commit -m "update: descrição da mudança"
git push
```

---

## 📞 Suporte

Dados salvos localmente no navegador do dispositivo usado. Para backup, use a integração com Google Sheets.
