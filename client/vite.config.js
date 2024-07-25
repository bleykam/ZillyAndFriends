import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import path from 'path';





// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  assetsInclude: ['**/*.gltf','**/*.jpg' ],

  esbuild: {
    jsxInject: `import React from 'react'`,
  },
 
  preview: {
    port: 5175,
    },
    test: {
      environment: 'jsdom',
      browser: {
        enabled: true,
        name: 'firefox', // browser name is required
      },
    },
  
})


