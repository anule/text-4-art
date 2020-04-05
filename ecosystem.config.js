module.exports = {
  apps: [
    {
      name: 'text-4-art',
      script: 'server.js',

      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      instances: 4,
      autorestart: true,
      watch: true,
      exec_mode: 'cluster',
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    production: {
      user: 'anule',
      host: '206.189.164.222',
      ref: 'origin/master',
      repo: 'git@github.com:anule/text-4-art.git',
      path: '/var/www/production',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
