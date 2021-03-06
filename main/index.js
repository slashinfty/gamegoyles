const { app, BrowserWindow, shell } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
        title: 'Gamegoyles Hub',
        height: 970,
        width: 1300,
        maximizable: false,
        resizable: false,
        backgroundColor: '#000'
    });

    win.setMenu(null);
    win.loadFile('./public/index.html');
    
    // Links open in external browser
    win.webContents.on('new-window', (e, url) => {
        e.preventDefault();
        shell.openExternal(url);
    });

    // Uncomment next line if you need to use dev console
    win.webContents.openDevTools({ mode: 'detach' });
}

app.allowRendererProcessReuse = false;

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});