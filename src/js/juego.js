
var Excel = require('exceljs');

var pSegundos;
var segundos;
var preguntas = [];

function comenzar(){
    pSegundos = document.getElementById("segundos");
    pSegundos.textContent = 59;
    segundos = 59;
    datosExcel();
    //setInterval(cuentaRegresiva,1000);   
}

/* -------------------------------------------------------------------------- */
/*                                 cronometro                                 */
/* -------------------------------------------------------------------------- */

function cuentaRegresiva(){
    //segundos = 59;
    console.log(segundos);
    if (segundos > 0) {
        segundos=segundos-1;        
    }
    pSegundos.textContent = segundos;
}

/* -------------------------------------------------------------------------- */
/*                               funciones excel                              */
/* -------------------------------------------------------------------------- */
function datosExcel(){
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile('src/files/preguntas.xlsx')
    .then(function() {
        var worksheet = workbook.getWorksheet(1);
        preguntas = [];
        for (let i = 2; i <=16; i++) {
            preguntas[i-2] = worksheet.getRow(i); 
        }
        /*for (let i = 0; i < 15; i++) {
            for (let j = 1; j <= 6; j++) {
                console.log(preguntas[i].getCell(j).value);    
            } 
        }*/
        cargarPreguntas();
        return console.log("carga de preguntas exitosa");
    }).catch(error => {
        console.error('Algo salio mal al leer excel', error);
    });
}

/* -------------------------------------------------------------------------- */
/*                             funciones preguntas                            */
/* -------------------------------------------------------------------------- */

function cargarPreguntas(){
    var opc1 = document.getElementById("opc1");
    var opc2 = document.getElementById("opc2");
    var opc3 = document.getElementById("opc3");
    var opc4 = document.getElementById("opc4");
    var pregunta = document.getElementById("pregunta");
    var respuesta;
    for (let i = 0; i < preguntas.length; i++) {
        console.log(preguntas[i].getCell(1).value);         
        opc1.innerHTML = preguntas[i].getCell(1).value;
        opc2.innerHTML = preguntas[i].getCell(2).value;
        opc3.innerHTML = preguntas[i].getCell(3).value;
        opc4.innerHTML = preguntas[i].getCell(4).value;
        pregunta.innerHTML = preguntas[i].getCell(5).value;
        respuesta = preguntas[i].getCell(6).value;   
    }
}

window.addEventListener("load", comenzar, false);