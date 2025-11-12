# Troubleshooting - GitHub Pages

## Problema: Site não está funcionando em https://vindexinsanctirex.github.io/Hackathon-Infinity/

### ✅ Checklist de Verificação

#### 1. GitHub Pages está habilitado?
- Vá em **Settings** → **Pages** no seu repositório
- **Source** deve estar como "GitHub Actions" (não "Deploy from a branch")
- Se não estiver, mude para "GitHub Actions" e salve

#### 2. Workflow foi executado?
- Vá em **Actions** no seu repositório
- Verifique se há um workflow "Deploy to GitHub Pages" executado
- Se houver erros, clique nele para ver os detalhes

#### 3. Secret VITE_API_URL está configurado?
- Vá em **Settings** → **Secrets and variables** → **Actions**
- Verifique se existe um secret chamado `VITE_API_URL`
- O valor deve ser a URL do seu backend no Render (ex: `https://hackathon-infinity-backend.onrender.com`)
- **IMPORTANTE**: Não inclua barra no final da URL (ex: `https://...onrender.com` e não `https://...onrender.com/`)

#### 4. Backend está funcionando?
- Teste a URL do backend diretamente no navegador: `https://seu-backend.onrender.com/`
- Deve retornar: `{"status": "API Infinity School rodando!"}`
- Se não funcionar, verifique o deploy no Render

#### 5. CORS está configurado corretamente?
- No `backend/app.py`, linha 7, deve ter:
  ```python
  CORS(app, origins=["https://vindexinsanctirex.github.io", "http://localhost:5173"])
  ```

#### 6. Base path está correto?
- No `frontend/vite.config.js`, linha 7, deve ter:
  ```javascript
  base: '/Hackathon-Infinity/',
  ```
- **IMPORTANTE**: Deve terminar com `/` e começar com `/`

### 🔧 Soluções Comuns

#### Erro: "404 Not Found"
- Verifique se o `base` no `vite.config.js` está correto
- O nome do repositório deve ser exatamente `Hackathon-Infinity` (case-sensitive)

#### Erro: "Failed to fetch" ou CORS
- Verifique se a URL do backend está correta no secret `VITE_API_URL`
- Verifique se o CORS no backend inclui `https://vindexinsanctirex.github.io`
- Teste o backend diretamente no navegador

#### Erro: Workflow não executa
- Verifique se o arquivo está em `.github/workflows/deploy.yml` (na raiz, não em `frontend/.github/`)
- Faça um novo commit e push para triggerar o workflow

#### Site carrega mas API não funciona
- Abra o Console do navegador (F12)
- Verifique se há erros de CORS ou de conexão
- Verifique se a variável `VITE_API_URL` está sendo usada corretamente

### 🚀 Passos para Re-deploy

1. **Verifique o secret**:
   ```bash
   # No GitHub: Settings → Secrets → VITE_API_URL
   # Deve ser: https://seu-backend.onrender.com
   ```

2. **Force um novo deploy**:
   - Vá em **Actions** → **Deploy to GitHub Pages**
   - Clique em **Run workflow** → **Run workflow**

3. **Ou faça um commit vazio**:
   ```bash
   git commit --allow-empty -m "Trigger deploy"
   git push origin main
   ```

### 📝 Verificar se está funcionando

1. Acesse: https://vindexinsanctirex.github.io/Hackathon-Infinity/
2. Abra o Console do navegador (F12)
3. Tente fazer login
4. Verifique se há erros no console
5. Verifique a aba Network para ver se as requisições estão sendo feitas

### 🔗 Links Úteis

- [GitHub Actions Status](https://github.com/vindexinsanctirex/Hackathon-Infinity/actions)
- [GitHub Pages Settings](https://github.com/vindexinsanctirex/Hackathon-Infinity/settings/pages)
- [Render Dashboard](https://dashboard.render.com)

