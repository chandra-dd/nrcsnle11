// next.config.mjs
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
  webpack(config) {
    // Add a rule to load mp3 files
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/media',
          outputPath: 'static/media',
          name: '[name].[hash].[ext]',
        },
      },
    });
    return config;
  },
};

export default nextConfig;
