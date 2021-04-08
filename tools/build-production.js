const Bundler = require('parcel-bundler')
const path = require('path')
const config = require('../config')
const { exec } = require("child_process");

const runCommand = (cmd) => {
  console.log(`> ${cmd}`)
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`${stderr}`);
        return;
    }
    console.log(`${stdout}`);
  });
}

const copy = (from, to) => {
  runCommand(`cp -r ${from} ${to}`)
}

const remove = (path) => {
  runCommand(`rm -r ${path}`)
}

const bundle = async (entryPoint) => {
  // Entrypoint file location
  const www = path.join(config.appRoot, './www/')
  const inDir = path.join(www, entryPoint)
  const inFile = path.join(inDir, 'index.html')
  const outDir = path.join(config.deployRoot, entryPoint)
  const outFile = path.join(outDir, 'index.html')
  const cacheDir = path.join('.cache', entryPoint)
  
  // Bundler options
  const options = {
    outDir: outDir.toString(), // The out directory to put the build files in, defaults to dist
    outFile: outFile.toString(), // The name of the outputFile
    publicUrl: './', // The url to server on, defaults to dist
    watch: false, // whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
    cache: false, // Enabled or disables caching, defaults to true
    cacheDir: cacheDir.toString(), // The directory cache gets put in, defaults to .cache
    minify: true, // Minify files, enabled if process.env.NODE_ENV === 'production'
    target: 'browser', // browser/node/electron, defaults to browser
    https: false, // Server files over https or http, defaults to false
    logLevel: 3, // 3 = log everything, 2 = log warnings & errors, 1 = log errors
    // hmrPort: 0, // The port the hmr socket runs on, defaults to a random free port (0 in node.js resolves to a random free port)
    sourceMaps: false, // Enable or disable sourcemaps, defaults to enabled (not supported in minified builds yet)
    // hmrHostname: '', // A hostname for hot module reload, default to ''
    detailedReport: true // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
  }

  console.log('options:')
  console.log(options)

  // Initialises a bundler using the entrypoint location and options provided
  const bundler = new Bundler(inFile.toString(), options)

  // Run the bundler, this returns the main bundle
  // Use the events if you're using watch mode as this promise will only trigger once and not for every rebuild
  await bundler.bundle(() => {
    console.log('....DONE')
  })
}

const translate = () => {
  // Only translates top level index.html
  runCommand(`static-i18n -l en -i en -i de --allow-html --files index.html --locales-path ${config.localesRoot} --output-dir ${config.buildRoot} ${config.buildRoot}`)
}

const run = async () => {
  await bundle('./')
  await bundle('./de')
  await bundle('./de/about')
  await bundle('./about/de')
  await bundle('./privacy-policy/de')
  await bundle('./privacy-policy/en')
  await bundle('./terms-and-conditions/de')
  await bundle('./terms-and-conditions/en')
}

run()