module.exports = {
  apps : [{
    name: 'Embed-Slack',
    script: './app.js',
    env: {
      NODE_ENV: 'development',
      port: 3006
    },
    env_production: {
      NODE_ENV: 'production',
      port: 3006
    }
  }],
};
