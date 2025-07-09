import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      exclude: ['src/main.tsx', ...coverageConfigDefaults.exclude],
    }
  },
})