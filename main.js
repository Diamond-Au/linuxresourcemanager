const { app, BrowserWindow, Menu, MenuItem } = require('electron')
const { MenuItems } = require('./config/config')


function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  const items = MenuItems.map(item => {
    return new MenuItem(item)
  })

  const menu = new Menu();
  items.forEach(item => {
    menu.append(item)
  })
  win.setMenu(menu)
  win.loadFile('./index.html')
}



app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
