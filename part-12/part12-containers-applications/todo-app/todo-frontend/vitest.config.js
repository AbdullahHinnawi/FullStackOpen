// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Enable global APIs like describe and it
    environment: 'jsdom',
    setupFiles: './src/tests/setupTests.js',
  },
});
