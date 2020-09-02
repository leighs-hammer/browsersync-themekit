#!/usr/bin/env node

const { exec, execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const inquirer = require('inquirer')

const {argv} = require('yargs')
const startBrowserSync = require('../lib/bs')
const CONSTANTS = require('../constants')
const configPath = path.resolve(CONSTANTS.filePath)
const packageName = CONSTANTS.packageName

// run enquirer and write a config
if(argv && (argv.new || argv.n)) {

  if(fs.existsSync(configPath)) {
    console.log(chalk.red(`
    A config file exists please edit the file rather than creating a new one :) 
    ${chalk.blue(configPath)}

    Run ' ${CONSTANTS.packageName} -h ' for help
    `))
    return null
  }

  const setupQuestions = [
    
    // {
    //   type: 'list',
    //   name: 'useEnv',
    //   message: 'What type of config file do you want to use?',
    //   default: 0,
    //   choices : [
    //     {message: '.json - stand alone config', value: 'json'}, 
    //     {message: '.env - shared env variables', value: 'env'}
    //   ]
    // },

    {
      type: 'input',
      name: 'port',
      default: 3000,
      message: 'Do you want to start browser-sync on a different port by default?',
    },

    {
      type: 'list',
      name: 'scriptLocation',
      default: 'head',
      message: 'where do you want browsersync to inject the script code?',
      choices: [
        {message: '<head> - most reliable', value: 'head'},
        {message: '<body> - can be fragile with some JS', value: 'body'},
      ]
    },
    
    {
      type: 'input',
      name: 'reloadDelay',
      default: 1500,
      message: 'Would you like to set a custom relod delay, can help with the timing of reloads. ( default 1.5 seconds )'
    },
    
    {
      type: 'input',
      name: 'notifyFile',
      default: './src/theme/tmp/theme.update',
      message: 'Where do you set your themekit notify file for browsersync to watch?  ( default ./src/theme/tmp/theme.update )'
    },
    
    {
      type: 'input',
      name: 'shop',
      default: false,
      message: 'what is the permanent domain of the store ( somestore.myshopify.com)?'
    },

    {
      type: 'input',
      name: 'themeId',
      default: false,
      message: 'What is your development theme ID?'
    },

  ]

  return inquirer.prompt(setupQuestions)
    .then(a => {
      fs.writeFileSync(configPath, 
        JSON.stringify(a, null, 2)
      )
      console.log(`
        ${chalk.green(`
        !!!!!!!!!!!!!!!!!!!!! All good to go !!!!!!!!!!!!!!!!!!!
        
        Config file written successfully: 
        ${chalk.blue(configPath)}
        Edit this file to amend any of the config you may require

        
        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        `)}
    
      `)
      inquirer.prompt([{
        type: 'confirm',
        name: 'start',
        message: "would you like to start browsersync now?",
        default: false,
      }]).then(confirm => {
        if (confirm.start) {
          return startBrowserSync()
        }
      })
    })



}

// run using config
if(argv && (argv.config || argv.c)) {
  
  if(fs.existsSync(configPath)) {
    return startBrowserSync()
  } else {
    console.log(chalk.red(`!!!!!!!!!!!!!!!!!!!!! Browser Sync Config Error !!!!!!!!!!!!!!!!!!!`))
    console.log(`
    The config file does not exist here:
    ${chalk.blue(configPath)}
    Maybe you are looking for another option`)

    console.log(`
    to create a config file run, '${chalk.black.bgCyan(` ${packageName } -n `)}', 
    
    alternately run '${chalk.black.bgCyan(` ${packageName } -e `)}' to use your ${chalk.blue('.env')}
    
    Run ' ${CONSTANTS.packageName} -h ' for help
    `)
    return console.log(chalk.red(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`))
  }
}

// no arguments
if(argv && (argv.help || argv.h)) {
  console.log(`
  ${chalk.blue('|||============================ HELP =============================|||')}
  
  You can create a new config or start browsersync
  
  ${CONSTANTS.packageName} -n  OR --new ( Creates a new config file )
  ${CONSTANTS.packageName} -c OR --config ( Start browsersync using the configuration)
  
  ${chalk.blue('|||===============================================================|||')}
  
  `)
}

return startBrowserSync()
