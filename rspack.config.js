const path = require('path');
const { DefinePlugin, CopyRspackPlugin } = require('@rspack/core');

// Load .env.local if it exists
try { require('dotenv').config({ path: '.env.local' }); } catch {}

/** @type {import('@rspack/core').Configuration} */
module.exports = {
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
    // Replace process.env.* at build time — makes them available in browser
    new DefinePlugin({
      'process.env.OPENAI_API_KEY':    JSON.stringify(process.env.OPENAI_API_KEY ?? ''),
      'process.env.OPENAI_MODEL':      JSON.stringify(process.env.OPENAI_MODEL ?? 'gpt-4o-mini'),
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
