const { app, BrowserWindow, session } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    focusable: false,
    transparent: true,
    frame: false,
    fullscreen: false,
    alwaysOnTop: false,
    skipTaskbar: true,
    enableLargerThanScreen: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      nodeIntegrationInWorker: true,
    }
  })

  //win.loadFile('index.html')
  //clear cache
  session.defaultSession.clearCache();
  win.loadURL('http://127.0.0.1:5000')
}

app.whenReady().then(() => {
    createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})