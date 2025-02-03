import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // para rodar os testes em ambiente de navegador
    setupFiles: './test.setup.ts', // se precisar de um arquivo de setup
  },
});
