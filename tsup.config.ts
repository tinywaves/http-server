import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/cli.ts',
  ],
  outDir: 'dist',
  shims: true,
  format: ['cjs', 'esm'],
  clean: true,
  dts: true,
  minify: true,
});
