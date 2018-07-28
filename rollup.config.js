import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const processShim = '\0process-shim';

const prod = process.env.PRODUCTION;
const mode = prod ? 'production' : 'development';

const output = [
  {
    file: pkg.main,
    format: 'cjs',
  },
  {
    file: pkg.module,
    format: 'esm',
  },
];

const plugins = [
  // Unlike Webpack and Browserify, Rollup doesn't automatically shim Node
  // builtins like `process`. This ad-hoc plugin creates a 'virtual module'
  // which includes a shim containing just the parts the bundle needs.
  {
    resolveId(importee) {
      if (importee === processShim) return importee;
      return null;
    },
    load(id) {
      if (id === processShim) return 'export default { argv: [], env: {} }';
      return null;
    },
  },
  babel({
    exclude: 'node_modules/**',
    plugins: ['external-helpers'],
  }),
  external(),
  resolve(),
  commonjs(),
  replace({
    'process.env.NODE_ENV': JSON.stringify(prod ? 'production' : 'development'),
  }),
];

if (prod) {
  plugins.push(terser());
}

export default {
  input: 'src/index.js',
  output,
  plugins,
};
