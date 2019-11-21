import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',

  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'restful-resource',
  },

  plugins: [
    alias({
      resolve: ['', '.mjs', '.js', '.ts'],
    }),

    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),

    typescript({
      abortOnError: false,
      exclude: ['**/*.test.ts', 'test/**/*', 'dist/**/*'],
    }),

    terser(),
  ],
};
