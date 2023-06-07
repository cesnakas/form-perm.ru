// const path = require('path')
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig ({
  root: path.resolve(__dirname, './src'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@img': path.resolve(__dirname, './src/img')
    }
  },
  server: {
    port: 8080,
    hot: true
  },
  build: {
    outDir: '../dist',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/[name]-[hash:10].js',
        assetFileNames: ({name}) => {
          // Fonts
          if (/\.(ttf|eot|woff|woff2)$/.test(name ?? '')) {
            return 'assets/fonts/[name][extname]'
          }
          // Styles
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash:10][extname]'
          }
          // Images
          if (/\.(gif|jpeg|jpg|png|svg)$/.test(name ?? '')) {
            return 'assets/images/[name][extname]'
          }
          // Default ref: https://rollupjs.org/guide/en/#outputassetfilenames
          return 'assets/[name]-[hash:10][extname]'
        }
      }
    },
    emptyOutDir: true
  }
})
