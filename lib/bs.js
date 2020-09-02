const bs = require('browser-sync').create();
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const CONSTANTS = require('../constants');
const configPath = path.resolve(CONSTANTS.filePath)
const packageName = CONSTANTS.packageName

const startBrowserSync = () => {

  if(!fs.existsSync(configPath)) {
    return console.log(chalk.red(`
      !!!!!!!!!!!!!!!!!!!!! Browser Sync Config Error !!!!!!!!!!!!!!!!!!!
      
      No config exists please run ' npx ${packageName} -n ' to create a new one.

      Run ' ${CONSTANTS.packageName} -h ' for help

      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      
    `))
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))

  if(!config.shop ) {
    return console.log( chalk.red(`
      !!!!!!!!!!!!!!!!!!!!! Browser Sync Config Error !!!!!!!!!!!!!!!!!!!
        
      Your config does not include a shop value, please enter the 
      X.myshopify.com domain of the store you are working on.

      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    `))
  }
// run validation
  return  bs.init({
    https: true,
    proxy: `https://${config.shop.replace('https://', '').replace('http://', '')}?${config.themeId ? `preview_theme_id=${config.themeId}` : ``}`,
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
