import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  if (command === 'build') {
    // A production build must know where the live API is; otherwise it would silently call localhost
    const apiUrl = loadEnv(mode, process.cwd(), 'VITE_').VITE_API_BASE_URL || process.env.VITE_API_BASE_URL
    if (!apiUrl || apiUrl.includes('localhost') || apiUrl.includes('127.0.0.1')) {
      if (process.env.ALLOW_LOCAL_API !== 'true') {
        throw new Error(
          'VITE_API_BASE_URL must be set to the deployed backend (e.g. https://api.example.co.uk/api) ' +
          'before building for production. See .env.production.example. ' +
          'To build against a local backend anyway, set ALLOW_LOCAL_API=true.'
        )
      }
    }
  }

  return {
    plugins: [react()],
  }
})
