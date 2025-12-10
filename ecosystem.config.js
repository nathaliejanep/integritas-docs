module.exports = {
  apps: [
    {
      name: 'integritas-docs',
      script: 'npm',
      args: 'start',
      cwd: '/srv/apps/integritas-docs/',
      interpreter: 'none',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        NODE_ENV: 'production',
        PORT: 4000, // matches "next start -p 4000"
      },
    },
  ],
};
