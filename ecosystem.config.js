module.exports = {
  apps: [
    {
      name: 'app',
      script: 'node dist/server.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
