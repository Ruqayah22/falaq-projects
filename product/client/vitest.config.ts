import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/__mocks__/setup.ts",
    coverage: {
      exclude: [
        "src/main.tsx",
        "src/__mocks__",
        "src/__test__",
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
