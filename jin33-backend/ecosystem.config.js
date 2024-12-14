module.exports = {
  apps: [
    {
      name: 'jin33-backend',
      script: 'dist/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      },
      error_file: 'logs/pm2/error.log',
      out_file: 'logs/pm2/out.log',
      log_file: 'logs/pm2/combined.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      // 健康检查配置
      exp_backoff_restart_delay: 100,
      max_restarts: 10,
      min_uptime: '5s'
    }
  ],
  deploy: {
    production: {
      user: 'node',
      host: '0.0.0.0',
      ref: 'origin/main',
      repo: 'git@github.com:username/jin33-backend.git',
      path: '/var/www/jin33-backend',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }
}
