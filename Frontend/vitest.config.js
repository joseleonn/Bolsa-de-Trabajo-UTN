import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    files: "./src/__test__/**/*.test.jsx", // This is the path to your test files
    environment: "jsdom",
    globals: true,
  },
});
