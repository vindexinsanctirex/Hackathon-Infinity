# Infinity School - Área do Colaborador

## 🚀 Tecnologias Usadas
- **React.js:** Framework principal do frontend.
- **Vite:** Ferramenta moderna de build e servidor de desenvolvimento para projetos web. Vite é muito mais rápido que o tradicional Create React App, pois faz o carregamento instantâneo dos arquivos e recarrega o app quase em tempo real durante o desenvolvimento.
- **HTML5 & CSS3**
- **JavaScript (ES6+)**
- **Python + Flask:** Backend para API REST.
- **SQLite:** Banco de dados local para persistência.
- **date-fns:** Manipulação de datas no calendário.

---

## 📄 Descrição do Projeto
Aplicativo web para organização e produtividade dos funcionários da Infinity School. Permite acesso rápido a links úteis, gerenciamento de tarefas, calendário interativo, notas rápidas, perfil do usuário, modo escuro/claro e notificações, tudo com identidade visual da Infinity School.

---

## 💻 Como Rodar Localmente

### 1. Pré-requisitos
- Python 3.10+
- Node.js 18+
- npm (já incluso no Node.js)

### 2. Backend (Flask)
```sh
pip install -r backend/requirements.txt
python backend/models.py
python backend/app.py
```
O backend ficará disponível em http://127.0.0.1:5000

### 3. Frontend (React + Vite)
```sh
cd frontend
npm install
npm run dev
```
O frontend ficará disponível em http://localhost:5173

---

## 🖼️ Prints/Tela de Cada Página
> **Adicione aqui prints das principais telas do app:**

- Login
- Dashboard
- Calendário
- Tarefas
- Notas Rápidas
- Perfil do Usuário

> **Dica:** Crie uma pasta `prints/` na raiz do projeto e salve as imagens com nomes como `login.png`, `dashboard.png`, etc.

---

## 🛠️ Explicação Técnica

### Fluxo do App
- O usuário faz login (simulado) e acessa o dashboard centralizado.
- Pode navegar para links úteis, calendário, tarefas, notas rápidas e perfil.
- Todas as ações são integradas ao backend Flask (API REST) e persistidas em SQLite.
- O frontend React consome a API, exibe notificações (toasts) e permite alternar entre modo escuro/claro.

### Organização de Pastas
```
/
├── backend/                # Backend Flask (API, banco de dados)
├── frontend/               # Frontend React
│   ├── src/                # Código-fonte do React (App.jsx, components, styles, etc)
│   ├── public/             # Arquivos públicos (favicon, etc)
│   ├── package.json        # Lista de dependências e scripts do frontend
│   ├── vite.config.js      # Configuração do Vite
│   └── ...
├── node_modules/           # (Gerada automaticamente pelo npm, NÃO versionar)
├── package.json            # (Se houver dependências na raiz)
├── README.md               # Este arquivo
└── ...
```

---

Desenvolvido para o Hackaton Infinity School. 
