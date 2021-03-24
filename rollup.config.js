import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';

const pkg = require('./package.json');
const input = 'src/index.ts';
const external = (id) => !id.startsWith('.') && !id.startsWith('/');

const cjsConfig = {
  input,
  output: {
    file: pkg.main,
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [typescript(), postcss()],
  external,
};

const esmConfig = {
  input,
  output: {
    file: pkg.module,
    format: 'es',
    sourcemap: true,
  },
  plugins: [typescript(), postcss()],
  external,
};

const dtsConfig = {
  input,
  output: {
    file: pkg.types,
    format: 'es',
  },
  plugins: [dts()],
};

export default [cjsConfig, esmConfig, dtsConfig];
