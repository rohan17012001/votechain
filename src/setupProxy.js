const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://votechain.pythonanywhere.com/',
      changeOrigin: true,
    })
  );
};