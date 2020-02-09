const{ app, BrowserWindow, Menu, ipcMain } = require('electron');

const url = require('url');
const path = require('path');

if(process.env.NODE_ENV !== 'production'){ // si esta en produccion ya no ejecuta electron reload
    require('electron-reload')(__dirname,{ //recarga el html
        electron: path.join(__dirname, '../node_modules','.bin', 'electron') //recarga el js
    })
}

let mainWindow // es una variable global, esto se hace ya que cuando se cierre la ventana libere recursos del pc
let newProductWindow

app.on(
    'ready',() => {

        mainWindow = new BrowserWindow({
            webPreferences: {
                nodeIntegration: true
            }
        });
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'views/index.html'),
            protocol: 'file',
            slashes: true
        }))

        const mainMenu = Menu.buildFromTemplate(templateMenu);
        Menu.setApplicationMenu(mainMenu);

        mainWindow.on('closed',()=>{ // cuando la ventana principal se cierre quita toda la aplicacion
            app.quit();
        });

    }
);

function createNewProductWindow(){

    newProductWindow = new BrowserWindow({
        width: 400, 
        height: 330,
        title: 'Agregar Nuevo Producto',
        webPreferences: {
            nodeIntegration: true
        }
    });

    //newProductWindow.setMenu(null);

    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/new-product.html'),
        protocol: 'file',
        slashes: true
    }))

    newProductWindow.on('closed',()=>{ // cuando la ventana principal se cierre quita toda la aplicacion
        newProductWindow = null;
    });

}

ipcMain.on('product:new', (e, newProduct) => {
    mainWindow.webContents.send('product:new', newProduct);
    newProductWindow.close();
});

const templateMenu = [
    {
        label: 'Archivo',
        submenu: [
            {
                label: 'Nuevo Producto',
                accelerator: 'Ctrl+N',
                click(){
                    createNewProductWindow();
                }
            },
            {
                label: 'Remover todos los productos',
                accelerator: 'Ctrl+R',
                click(){
                    mainWindow.webContents.send('products:remove-all');
                }
            },
            {
                label: 'Salir',
                        accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q', // mira que plataforma es mac, win o linux 'darwin' es el identificador de mac
                        click(){
                            app.quit();
                        }
            }
        ]
    }

];

if(process.platform === 'darwin'){
    templateMenu.unshift({
        label: app.getName()
    });
}

if(process.env.NODE_ENV !== 'production'){
    templateMenu.push({
        label: 'DevTools',
        submenu:[
            {
                label: 'Mostrar/Ocultar dev Tools',
                accelerator: 'Ctrl+D',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload' 
            }
        ]
    });
}