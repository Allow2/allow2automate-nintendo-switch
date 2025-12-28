import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' }
  ],
  plugins: [
    nodeResolve(),
    json(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: /node_modules/,
      presets: ['@babel/preset-env']
    })
  ],
  external: ['axios', 'uuid', 'events']
};
