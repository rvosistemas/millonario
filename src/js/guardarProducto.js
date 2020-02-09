const { ipcRenderer } = require('electron');

const form = document.querySelector('form');

form.addEventListener('submit', e =>{
    
    const nombreProducto = document.querySelector('#nombre').value;
    const precioProducto = document.querySelector('#precio').value;
    const descripcionProducto = document.querySelector('#descripcion').value;

    const newProduct = {
        nombre: nombreProducto,
        precio: precioProducto,
        descripcion: descripcionProducto
    };
    //console.log(newProduct);
    ipcRenderer.send('product:new', newProduct);

    e.preventDefault();

});