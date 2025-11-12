// Configuração da URL da API
// Em produção, use a variável de ambiente VITE_API_URL
// Em desenvolvimento, usa localhost por padrão
// Para GitHub Pages, configure VITE_API_URL no GitHub Actions ou use o backend em produção
export const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

