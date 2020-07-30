module.exports = {
  apps : [{
    name: 'Embed-Slack'
    script: 'server.js',
    env: {
      NODE_ENV: 'production',
      port: 3006;
    }
  }],
};
