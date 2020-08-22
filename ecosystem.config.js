module.exports = {
  apps: [
    {
      name: 'app',
      script: 'node dist/server.js',
      instances: 'max',
      exec_mode: 'cluster',
    },
  ],
};
