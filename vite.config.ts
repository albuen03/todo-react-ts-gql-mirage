import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/todo-react-ts-gql-mirage/',
  plugins: [react()]
});
