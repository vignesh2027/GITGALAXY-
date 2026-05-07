import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  base: '/GITGALAXY-/',
  plugins: [vue(), react()],
  resolve: {
    alias: { '@': resolve(__dirname, 'src') }
  },
  optimizeDeps: {
    include: ['three', 'gsap', 'animejs']
  },
  server: {
    port: 3000,
    host: true
  }
})
