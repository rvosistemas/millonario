const{ app, BrowserWindow, Menu, webContents, ipcMain } = require('electron');

app.disableHardwareAcceleration();    
const url = require('url');
const path = require('path');

/* ------------------- para no recargar y ver los cambios ------------------- */

if(process.env.NODE_ENV !== 'production'){ // si esta en produccion ya no ejecuta electron reload
    require('electron-reload')(__dirname,{ //recarga el html
        electron: path.join(__dirname, '../node_modules','.bin', 'electron') //recarga el js
    })
}

let mainWindow // es una variable global, esto se hace ya que cuando se cierre la ventana libere recursos del pc
let newGameWindow

/* -------------------------------------------------------------------------- */
/*                              inicio de la app                              */
/* -------------------------------------------------------------------------- */

app.on(
    'ready',() => {

        mainWindow = new BrowserWindow({
            icon: path.join(__dirname, 'images/sitesaLogo.ico'),
            webPreferences: {
                nodeIntegration: true
            }
        });

        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'views/index.html'),
            protocol: 'file',
            slashes: true
        }))

        const iconUrl = url.format({
            pathname: path.join(__dirname, 'images/sitesaLogo.ico'),
            protocol: 'file',
            slashes: true
        })

        const mainMenu = Menu.buildFromTemplate(templateMenu);
        Menu.setApplicationMenu(mainMenu);

        mainWindow.on('closed',()=>{ // cuando la ventana principal se cierre quita toda la aplicacion
            app.quit();
        });

    }
);



/* -------------------------------------------------------------------------- */
/*                              ventana de juego                              */
/* -------------------------------------------------------------------------- */

function createNewGameWindow(){

    newGameWindow = new BrowserWindow({
        icon: path.join(__dirname, 'images/sitesaLogo.ico'),
        width: 1280, 
        height: 720,
        title: 'NUevo Juego',
        webPreferences: {
            nodeIntegration: true
        }
    });

    //newGameWindow.setMenu(null);// para que no aparezca menu en la ventana juego

    newGameWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/juego.html'),
        protocol: 'file',
        slashes: true
    }))

    newGameWindow.on('closed',()=>{ // para cerrar la ventana
        newGameWindow = null;
    });
}

/* -------------------------------------------------------------------------- */
/*                          ventana de instrucciones                          */
/* -------------------------------------------------------------------------- */

function createNewManualWindow(){

    newManualWindow = new BrowserWindow({
        icon: path.join(__dirname, 'images/sitesaLogo.ico'),
        width: 1280, 
        height: 720,
        title: 'Instrucciones',
        webPreferences: {
            nodeIntegration: true
        }
    });

    //newGameWindow.setMenu(null);// para que no aparezca menu en la ventana juego

    newManualWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/manual.html'),
        protocol: 'file',
        slashes: true
    }))

    newManualWindow.on('closed',()=>{ // para cerrar la ventana
        newManualWindow = null;
    });
}

/* -------------------------------------------------------------------------- */
/*                                   botones                                  */
/* -------------------------------------------------------------------------- */



/* -------------------------------------------------------------------------- */
/*                         comunicacion entre ventanas                        */
/* -------------------------------------------------------------------------- */

/*ipcMain.on('product:new', (e, newProduct) => {
    mainWindow.webContents.send('product:new', newProduct);
    newProductWindow.close();
});*/

ipcMain.on('invokeAction', function(event, data){
    var result = processData(data);
    event.sender.send('actionReply', result);
});

/* -------------------------------------------------------------------------- */
/*                                    menu                                    */
/* -------------------------------------------------------------------------- */

const templateMenu = [
    {
        label: 'Archivo',
        submenu: [
            {
                label: 'Nuevo Juego',
                accelerator: 'Ctrl+N',
                click(){
                    createNewGameWindow();
                }
            },
            /*{
                label: 'Remover todos los productos',
                accelerator: 'Ctrl+R',
                click(){
                    mainWindow.webContents.send('products:remove-all');
                }
            },*/
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

/* ------------------------- verfica si esta en mac ------------------------- */

if(process.platform === 'darwin'){
    templateMenu.unshift({
        label: app.getName()
    });
}

/* -------------------------------------------------------------------------- */
/*                 para ver las herramientas de desarrollador                 */
/* -------------------------------------------------------------------------- */

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