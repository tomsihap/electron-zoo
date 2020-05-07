const { app, BrowserWindow, Menu } = require('electron');

function createWindow() {

    const winIndex = new BrowserWindow({
        width: 1024,
        height: 768,
        maxWidth: 1024,
        minWidth: 1024,
        maxHeight: 768,
        minHeight: 768,
        webPreferences: {
            nodeIntegration: true
        }
    });

    winIndex.loadFile('app/index/index.html');
}

/**
 * Ajout du menu "Quitter"
 */
let menu = Menu.buildFromTemplate([{
    label: 'Menu',
    submenu: [{
        label: 'Quitter',
        click() {
            app.quit()
        }
    }]
}])
Menu.setApplicationMenu(menu);

app.whenReady().then(createWindow);

