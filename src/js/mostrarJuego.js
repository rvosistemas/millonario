/*const { ipcRenderer } = require('electron');

        const productos = document.querySelector('#productos');

        ipcRenderer.on('product:new',(e, newProduct) => {
            const newProductTemplate = `
                <div class="col-xs-4 p-2">
                    <div class="card text-center">
                        <div class="card-header">
                            <h5 class="card-title">${newProduct.nombre}</h5>
                        </div>
                        <div class="card-body">
                            ${newProduct.descripcion}
                            <hr/>
                            ${newProduct.precio}
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-danger btn-sm">
                                BORRAR
                            </button>
                        </div>
                    </div>    
                </div>    
            `;
            productos.innerHTML += newProductTemplate;
            const btns = document.querySelectorAll('.btn.btn-danger');  
            btns.forEach(btn => {
                btn.addEventListener('click', e => {
                    e.target.parentElement.parentElement.parentElement.remove();
                });
            });  
        });

        ipcRenderer.on('products:remove-all', (e) => {
            productos.innerHTML = '';
        });*/