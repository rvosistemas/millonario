
var Excel = require('exceljs');

var pSegundos;
var segundos;
var preguntasFaciles = [];
var preguntasNormales = [];
var preguntasDificiles = [];

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
        /*var row = worksheet.getRow(5);
        row.getCell(1).value = 7; // A5's value set to 7
        row.commit();
        return workbook.xlsx.writeFile('new.xlsx');
        var row = worksheet.getRow(1);
        //var row;
        console.log(row);*/
        var rows = [];
        for (let i = 2; i <=16; i++) {
            rows[i-2] = worksheet.getRow(i); 
        }
        /*for (let i = 1; i < 16; i++) {
            for (let j = 0; j < array.length; j++) {
                preguntasFaciles[i] = row.getCell(i).value;
                
            } 
        }*/
        for (let i = 0; i <15; i++) {
            //console.log(preguntasFaciles[i]); 
            console.log(rows[i]); 
        }
        return console.log("carga de preguntas exitosa");
    }).catch(error => {
        console.error('Algo salio mal al leer excel', error);
    });
}

/* -------------------------------------------------------------------------- */
/*                             funciones preguntas                            */
/* -------------------------------------------------------------------------- */

function cargarPreguntas(){

}

window.addEventListener("load", comenzar, false);