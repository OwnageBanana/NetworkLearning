// require('update-electron-app')({
//   logger: require('electron-log')
// })

const { app, BrowserWindow } = require('electron');

const path = require('path');
const glob = require('glob');
const url = require('url');

const debug = /--debug/.test(process.argv[2]);

if (process.mas) app.setName('Electron APIs');

let mainWindow = null;
let splashScreen = null;

function initialize() {
  makeSingleInstance()

  loadDemos()

  function createWindow() {
    const windowOptions = {
      minWidth: 1080,
      height: 700,
      width: 1250,
      title: app.getName(),
      webPreferences: {
        nodeIntegration: true
      }
    }

    mainWindow = new BrowserWindow(windowOptions)
    mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

    // Launch fullscreen with DevTools open, usage: npm run debug
    if (debug) {
      mainWindow.webContents.openDevTools();
      //mainWindow.maximize()
      require('devtron').install();
    }

    mainWindow.on('closed', () => {
      mainWindow = null
    })
  }

  app.on('ready', () => {
    createWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance() {
  if (process.mas) return

  app.requestSingleInstanceLock()

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

// Require each JS file in the main-process dir
function loadDemos() {
  const files = glob.sync(path.join(__dirname, 'main-process/**/*.js'))
  files.forEach((file) => { require(file) })
}

initialize()