import { defineConfig } from 'vite';
import litCss from 'vite-plugin-lit-css';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  root: '.',
  build: {
    target: 'esnext'
  },
  plugins: [svgLoader(), litCss({
    // your global and rel="stylesheet" styles must be excluded
    exclude: './src/index.css'
  })]
});
