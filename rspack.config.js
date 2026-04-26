const path = require('path');
const { DefinePlugin, CopyRspackPlugin } = require('@rspack/core');

// Load .env.local if it exists
try { require('dotenv').config({ path: '.env.local' }); } catch {}

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('@rspack/core').Configuration} */
module.exports = {
  // Source maps: full maps in dev, none in production (prevents source exposure)
  devtool: isProd ? false : 'cheap-module-source-map',

  entry: './src/main.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js',
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      // TypeScript & TSX via built-in Rspack transformer
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
            },
          },
        },
      },
      // CSS → PostCSS → Tailwind
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new (require('@rspack/core').HtmlRspackPlugin)({
      template: './index.html',
      title: 'LRN Guide — Developer Learning Platform',
    }),
    new CopyRspackPlugin({
      patterns: [{ from: 'public', to: '.' }],
    }),
    // Only inject safe public vars — NEVER put API keys here (they end up in the browser bundle)
    new DefinePlugin({
      'process.env.SUPABASE_URL':      JSON.stringify(process.env.SUPABASE_URL ?? ''),
      'process.env.SUPABASE_ANON_KEY': JSON.stringify(process.env.SUPABASE_ANON_KEY ?? ''),
    }),
  ],
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    open: true,
    static: { directory: path.resolve(__dirname, 'public') },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
