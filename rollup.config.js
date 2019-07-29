import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';

export default [
  {
    input: 'src/index.ts',
    plugins: [
      terser(),
      resolve(),
      typescript({
        typescript: require('typescript'),
      })
    ],
    output: {
        file: 'umd/swapi-wrapper.js',
        format: 'umd',
        name: 'swapiWrapper',
        esModule: false
    }
  },
  {
    input: 'src/index.ts',
    plugins: [
      resolve(),
      typescript({
        typescript: require('typescript'),
      })
    ],
    output: {
      file: 'esm/index.js',
      format: 'esm'
    }
  }
];