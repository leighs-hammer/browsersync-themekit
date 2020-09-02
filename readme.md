[![Known Vulnerabilities](https://snyk.io/test/github/leighs-hammer/browsersync-themekit/badge.svg?targetFile=package.json)](https://snyk.io/test/github/leighs-hammer/browsersync-themekit?targetFile=package.json)

## NOTES: 

1. This package is not supported by either Shopify or Browser-sync this is purely a helper for people needing livereload while developing shopify themes. 
2. This package has browsersync as a dependency not a peer dependency, this is to allow running via `npx`

# TLDR
  1. Install browsersync & this wrapper `npm install browsersync-themekit --save-dev`
  2. Create a config `npx browsersync-themekit -n`
  3. Enter your details
  4. Browsersync can now be started watching the notify file you specified. 

# Usage

This package is designed to be used in conjunction with your dev environment, so should be able to bolt along side a themekit only env as well as somethign more advanced.
You can use this directly from node scripts and I would suggest running a package like [npm run all](https://www.npmjs.com/package/npm-run-all) which make creating a single 
script trigger multiple tasks in parallel eg: `npm run dev` which starts compilation, themekit and browsersync. 

## Installation and setup

1. Install browsersync & this wrapper `npm install browsersync-themekit --save-dev`

This will install the wrapper and also browser-sync or you can implicitly install browser-sync in your project or gloablly. `npm install browser-sync --save` if you need it in other places. 
This is to make this portable. 

2. Add a config file to your build kit. -> `npx browsersync-themekit -n`

  **2.1** Follow the steps, it will ask for your themeId, and shop domain. The shop is required, if you opt out of the themeId it will just load the main published theme. If a themeId is provided it will load the preview of that theme when started. 

  **2.2** The setup will ask you to provide a path to a notfiy file theme kit has this as an option and it makes a chang to this file once it is updated. you can [find out more](https://shopify.github.io/themekit/faq/) under the section about liveReloading.

  The rest of the questions purely give you some options but sane defaults are in place. 

3. Once a config is in place at the root of your project it will be called: `browsersync-themekit-config.json` you can either start it straight away or tie it into the rest of your tools. 

## Run it

If you have a `browsersync-themekit-config.json` setup in your folder, you can start it up by adding a script to your `package.json`

*package.json*

```
{
  "scripts: {
    "bsync": "browsersync-themekit"
  }
}
```
you can now run that directly `npm run bsync`

However you are likely to want to link this up with other scripts, such as your themekit start command and compilers for CSS and JS. 
I would achieve this withe the help of: [npm run all](https://www.npmjs.com/package/npm-run-all)


## Roadmap (stuff I am lookign at)

1. Extend the cli to allow values to be surfaced from .env files
2. Extend cli with additional flags for shop and theme id