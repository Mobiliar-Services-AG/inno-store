const PROXY_CONFIG = [
  {
    context: ['/config'],
    target: `http://localhost:4200/assets/app-config-local.json`,
    ignorePath: true,
  },
];
module.exports = PROXY_CONFIG;
