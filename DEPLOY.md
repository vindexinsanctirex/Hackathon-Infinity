# Guia de Deploy - GitHub Pages

Este guia explica como fazer deploy do frontend React no GitHub Pages e do backend Flask em um serviço de hospedagem.

## 📋 Pré-requisitos

- Conta no GitHub
- Conta em um serviço de hospedagem para o backend (Render, Railway, Heroku, etc.)

## 🚀 Opção 1: GitHub Pages (Frontend) + Render/Railway (Backend)

### Passo 1: Deploy do Backend (Flask)

#### Usando Render (Recomendado - Grátis):

1. Acesse [render.com](https://render.com) e crie uma conta
2. Clique em "New +" → "Web Service"
3. Conecte seu repositório GitHub
4. Configure:
   - **Name**: `hackathon-infinity-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `cd backend && pip install -r requirements.txt`
   - **Start Command**: `cd backend && python app.py`
5. Adicione variáveis de ambiente se necessário
6. Clique em "Create Web Service"
7. **Copie a URL do serviço** (ex: `https://hackathon-infinity-backend.onrender.com`)

#### Usando Railway:

1. Acesse [railway.app](https://railway.app) e crie uma conta
2. Clique em "New Project" → "Deploy from GitHub repo"
3. Selecione seu repositório
4. Configure o serviço para usar a pasta `backend`
5. Railway detectará automaticamente o Python e instalará as dependências
6. **Copie a URL do serviço**

### Passo 2: Configurar GitHub Actions para Deploy do Frontend

1. No GitHub, vá em **Settings** → **Secrets and variables** → **Actions**
2. Adicione um novo secret:
   - **Name**: `VITE_API_URL`
   - **Value**: A URL do seu backend (ex: `https://hackathon-infinity-backend.onrender.com`)

3. O workflow já está configurado em `.github/workflows/deploy.yml`

4. No GitHub, vá em **Settings** → **Pages**
   - **Source**: Selecione "GitHub Actions"
   - Salve

5. Faça push para a branch `main`:
   ```bash
   git add .
   git commit -m "Configure deploy"
   git push origin main
   ```

6. O GitHub Actions irá:
   - Buildar o frontend
   - Fazer deploy no GitHub Pages
   - A URL será: `https://vindexinsanctirex.github.io/Hackathon-Infinity/`

### Passo 3: Atualizar CORS no Backend

No arquivo `backend/app.py`, certifique-se de que o CORS está configurado para aceitar requisições do GitHub Pages:

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["https://vindexinsanctirex.github.io", "http://localhost:5173"])
```

## 🚀 Opção 2: Vercel (Frontend) + Render (Backend)

### Frontend no Vercel:

1. Acesse [vercel.com](https://vercel.com) e crie uma conta
2. Clique em "Add New Project"
3. Conecte seu repositório GitHub
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Environment Variables**:
     - `VITE_API_URL`: URL do seu backend
5. Clique em "Deploy"

### Backend no Render:

Siga os passos da Opção 1, Passo 1.

## 🚀 Opção 3: Netlify (Frontend) + Railway (Backend)

### Frontend no Netlify:

1. Acesse [netlify.com](https://netlify.com) e crie uma conta
2. Clique em "Add new site" → "Import an existing project"
3. Conecte seu repositório GitHub
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
   - **Environment variables**:
     - `VITE_API_URL`: URL do seu backend
5. Clique em "Deploy site"

## 📝 Notas Importantes

1. **CORS**: Certifique-se de que o backend permite requisições do domínio do frontend
2. **Variáveis de Ambiente**: Use variáveis de ambiente para a URL da API em produção
3. **Base Path**: O Vite está configurado com `base: '/Hackathon-Infinity/'` para GitHub Pages
4. **Banco de Dados**: O SQLite funciona localmente, mas em produção considere usar PostgreSQL (Render oferece grátis)

## 🔧 Troubleshooting

- **Erro 404 no GitHub Pages**: Verifique se o `base` no `vite.config.js` está correto
- **CORS Error**: Adicione a URL do frontend nas origens permitidas no backend
- **API não conecta**: Verifique se a variável `VITE_API_URL` está configurada corretamente

## 📚 Recursos

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Vite Deploy Guide](https://vitejs.dev/guide/static-deploy.html)

