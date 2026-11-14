/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,           // позволяет не импортировать describe, it, expect в каждый файл
    environment: 'jsdom',    // включает эмулятор браузера
    setupFiles: './src/setupTests.ts', // файл для первичной настройки (создадим ниже)
  },
});