const bs = require('browser-sync').create();
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const configPath = path.resolve('./browsersync-themekit-config.json')
const packageName = "browsersync-themekit-cli"

const startBrowserSync = () => {

  if(!fs.existsSync(configPath)) {
    return console.log(chalk.red(`
      !!!!!!!!!!!!!!!!!!!!! Browser Sync Config Error !!!!!!!!!!!!!!!!!!!
      
      No config exists please run ' npx ${packageName} -n ' to create a new one.

      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      
    `))
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
// run validation
  return  bs.init({
    https: true,
    proxy: `${config.shop}?preview_theme_id=${config.themeId}`,
    files: config.notifyFile,
    watch: true,
    reloadDelay: config.reloadDelay,
    snippetOptions: {
      rule: {
          match: /<\/head>/i,
          fn: function (snippet, match) {
              return snippet + match;
          }
      }
  }
  })

}

module.exports = startBrowserSync



// let envConfig = require('dotenv').config();

// if (envConfig.error) {
//   console.error(envConfig.error);
//   process.exit();
// }

// if (!process.env.SHOPIFY_DEV_ENV) {
//   console.log('Something is wrong with your config. Double check it.');
//   process.exit();
// }

// const store = process.env[`SHOPIFY_${process.env.SHOPIFY_DEV_ENV}_STORE`]
// const themeId = process.env[`SHOPIFY_${process.env.SHOPIFY_DEV_ENV}_THEME_ID`]
// const url = `https://${store}?preview_theme_id=${themeId}`;
