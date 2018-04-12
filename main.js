const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');
const shell = require('electron').shell;
const ipc = require('electron').ipcMain;

let win;

function createWindow(){
    win = new BrowserWindow({ width: 800, height: 600 });
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // win.webContents.openDevTools();
    win.on('closed', () => {
        win = null
    })

    var menu = Menu.buildFromTemplate([
        {
            label: 'Menu',
            submenu:[
                { label: 'Adjust Notification Value'},
                { 
                    label: 'Market Cap',
                    click(){
                        shell.openExternal('http://coinmarketcap.com')
                    }
                },
                { type: 'separator'},
                { 
                    label: 'Exit',
                    click(){
                        app.quit()
                    }
                }
            ]
        },{
            label:'Info'
        }
    ])
    Menu.setApplicationMenu(menu);
  
}

app.on('ready', createWindow);

ipc.on('update-notify-value', function(event, arg){
    win.webContents.send('targetPriceVal', arg)
})



