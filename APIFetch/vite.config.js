import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Dog and UserList',
        short_name: 'UserList',
        description: 'A beautiful glassmorphism Dog and userList app',
        theme_color: '#10b981', // Emerald-500 to match your UI
        icons: [
          {
            src: 'pwa-192x192.png', // You'll need to add these images to your /public folder
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        display: 'standalone', // THIS removes the browser URL bar!
        background_color: '#ffffff'
      }
    })
  ],
})