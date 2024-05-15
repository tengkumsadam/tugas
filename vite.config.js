<<<<<<< HEAD
=======
import { fileURLToPath, URL } from 'node:url'

>>>>>>> 29656b2da38b30a6b3b069681e93197d8214ab09
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
<<<<<<< HEAD
  plugins: [vue()],
=======
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
>>>>>>> 29656b2da38b30a6b3b069681e93197d8214ab09
})
