import { app, BrowserWindow } from 'electron'
import path from 'node:path'

import './api/index.js' // Iniciar la API

// Configuracion
import config from './config.json' with { type: 'json' }
const width = config.window.width
const height = config.window.height
const apiURL = config.window.url

// Funcion para crear la ventana
const createWindow = () => {
    const win = new BrowserWindow({
      width,
      height,
      webPreferences: {
        preload: path.join(process.cwd(), 'src/web/public/js/preload.js')
      }
    })

    win.loadURL('http://localhost:3000')
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