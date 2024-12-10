const dotenv = require('dotenv');

dotenv.config({ path: './.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_REF = 'origin/master',
  DEPLOY_REP,
  DEPLOY_PATH,
} = process.env;

module.exports = {
  apps: [{
    name: 'mesto',
    script: 'dist/app.ts',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REP,
      path: DEPLOY_PATH,
      'pre-deploy': `bash scripts/deployEnv.sh ${DEPLOY_USER}@${DEPLOY_HOST} ${DEPLOY_PATH}`,
      'post-deploy': 'cd backend && npm ci && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};