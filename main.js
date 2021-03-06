const { app, BrowserWindow, Menu, MenuItem } = require('electron')
const { MenuItems } = require('./config/config')
const { Emitter } = require('./utils/events')


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

  win.loadFile('./tem/source/index.html')
  win.webContents.openDevTools();

  // source page
  Emitter.on('source', function () {
    win.loadFile('./tem/source/index.html');
  })

  // memory page
  Emitter.on('innerMemory', function () {
    win.loadFile('./tem/innermemory/index.html')
  })

  // informatin page
  Emitter.on('information', function () {
    win.loadFile('./tem/versionInfomation/index.html')
  })
  // disk infomation
  Emitter.on('disk', function () {
    win.loadFile('./tem/diskInformation/index.html')
  })

  Emitter.on('process', function () {
    win.loadFile('./tem/process/index.html')

  })
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
