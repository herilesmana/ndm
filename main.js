const { app, BrowserWindow, screen } = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
    let display = screen.getPrimaryDisplay()
    let width = display.bounds.width
    let height = display.bounds.height

    // Create the browser window.
    win = new BrowserWindow({
        width: 400,
        height: 300,
        x: width - 400,
        y: height - 400,
        webPreferences: {
            nodeIntegration: true
        },
        icon: path.join(__dirname, 'assets/icons/png/24x24.png'),
        title: 'Network Device Monitoring',
        backgroundColor: '#ffffff',
        frame: false,
        resizable: false,
    })

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'web/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    // win.webContents.openDevTools()

    // Emit the event when the window is ready to be shown
    win.once('ready-to-show', () => {
        win.show()
    })

    // Emit the event when the window is closed
    win.on('closed', () => {
        win = null
    })
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)


// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})


app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})
