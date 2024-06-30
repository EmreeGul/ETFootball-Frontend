import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      include: ['src/components/__tests__/**/*.{test,spec}.{ts,tsx}'], // Definiere das Muster für Testdateien
      root: fileURLToPath(new URL('./', import.meta.url))
    }
  })
)
