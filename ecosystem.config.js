module.exports = {
  apps : [{
    name: 'Embed-Slack'
    script: 'app.js',
    env: {
      NODE_ENV: 'production',
      port: 3006;
    }
  }],
};
