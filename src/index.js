const { app, BrowserWindow } = require('electron')
const path = require('node:path')

require('./api/index.js') // Iniciar la API

const { window, url } = require('./config.json')

// Funcion para crear la ventana
const createWindow = () => {
    const win = new BrowserWindow({
      width: window.width,
      height: window.height,
      webPreferences: {
        preload: path.join(__dirname, 'web/public/js/preload.js')
      }
    })
  
    win.loadURL(url)
}

// Iniciar la ventana
app.whenReady().then(() => {
    createWindow()

    // Condicion para que no se creen mas de una ventana
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Terminar el proceso de la aplicacion cuando se cierren todas las ventanas
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})