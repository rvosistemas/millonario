
var Excel = require('exceljs');
const Swal = require('sweetalert2');

var pSegundos;
var segundos;
var preguntas = [];

var cincuentaCincuenta;
var cambiarPregunta;
var masSegundos;

var opca;
var opcb;
var opcc;
var opcd;
var pregunta;
var respuesta;
var iterador;

var btnOk;
var btnError;
var btnSalir;

var alertaOk;
var alertaError;

function comenzar(){

    /* -------------------------------- opciones -------------------------------- */
    opca = document.getElementById("a");
    opcb = document.getElementById("b");
    opcc = document.getElementById("c");
    opcd = document.getElementById("d");
    pregunta = document.getElementById("pregunta");

    opca.addEventListener("click",verificarRespuesta,false);        
    opcb.addEventListener("click",verificarRespuesta,false);        
    opcc.addEventListener("click",verificarRespuesta,false);        
    opcd.addEventListener("click",verificarRespuesta,false);     
    /* --------------------------------- ayudas --------------------------------- */
    cincuentaCincuenta = document.getElementById("cincuentaCincuenta");
    cambiarPregunta = document.getElementById("cambiarPregunta");
    masSegundos = document.getElementById("masSegundos");

    cincuentaCincuenta.addEventListener("click",cincuentaCincuenta,false);
    //cincuentaCincuenta.style.pointerEvents = "auto";

    cambiarPregunta.addEventListener("click",cambiarPregunta,false);
    //cambiarPregunta.style.pointerEvents = "auto";

    masSegundos.addEventListener("click",masSegundos,false);
    //masSegundos.style.pointerEvents = "auto";

    /* --------------------------------- botones -------------------------------- */
    btnOk = document.getElementById("btnOk");
    btnOk.style.visibility = 'hidden';
    btnOk.style.opacity = '0';
    btnOk.addEventListener("click",siguiente,false);

    btnError = document.getElementById("btnError");
    btnError.style.visibility = 'hidden';
    btnError.style.opacity = '0';
    btnError.addEventListener("click",reiniciar,false);

    btnSalir = document.getElementById("btnSalir");
    btnSalir.addEventListener("click",salir,false);

    /* --------------------------------- alertas -------------------------------- */
    alertaOk = document.getElementById("alertaOk");
    alertaOk.style.visibility = 'hidden';
    alertaOk.style.opacity = '0';

    alertaError = document.getElementById("alertaError");
    alertaError.style.visibility = 'hidden';
    alertaError.style.opacity = '0';

    /* ---------------------------------- carga --------------------------------- */
    var contenedor = document.getElementById('contenedor_carga');
    contenedor.style.visibility = 'hidden';
    contenedor.style.opacity = '0';

    /* ------------------------------- cronometro ------------------------------- */
    pSegundos = document.getElementById("segundos");
    pSegundos.textContent = 59;
    segundos = 59;

    /* --------------------------- llamada a funciones -------------------------- */
    datosExcel();
    setInterval(function(){
        cuentaRegresiva();
    },1000);   
}

/* -------------------------------------------------------------------------- */
/*                                 cronometro                                 */
/* -------------------------------------------------------------------------- */

function cuentaRegresiva(){
    //console.log(segundos);
    if(alertaOk.style.visibility == "hidden" && alertaError.style.visibility == "hidden"){
        if (segundos > 0) {
            segundos=segundos-1;        
        }
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
        cargarPreguntas(0); // carga la primer pregunta
        return console.log("carga de preguntas exitosa");
    }).catch(error => {
        console.error('Algo salio mal al leer excel', error);
    });
}

/* -------------------------------------------------------------------------- */
/*                             funciones preguntas                            */
/* -------------------------------------------------------------------------- */

function cargarPreguntas(i){
    
    iterador = i; //iterador

    //console.log(preguntas[i].getCell(1).value);         
    opca.innerHTML = preguntas[iterador].getCell(1).value;
    opcb.innerHTML = preguntas[iterador].getCell(2).value;
    opcc.innerHTML = preguntas[iterador].getCell(3).value;
    opcd.innerHTML = preguntas[iterador].getCell(4).value;
    pregunta.innerHTML = preguntas[iterador].getCell(5).value;
    respuesta = preguntas[iterador].getCell(6).value; 
    
}

function verificarRespuesta(respuestaSeleccionada){
    //console.log(r.target.id);
    Swal.fire({
        title: 'Ultima palagra?',
        text: "No puede revetir si te equivocas!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI, Ultima palabra!',
        cancelButtonText: 'escoger otra opcion'
    }).then((result) => {
        if (result.value) {
            /*Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )*/
             if(respuestaSeleccionada.target.id == respuesta){
                console.log("respuesta correcta");
                alertaOk.style.visibility = 'visible';
                alertaOk.style.opacity = '1';
                btnOk.style.visibility = 'visible';
                btnOk.style.opacity = '1';
                iterador++;
            }else{
                console.log("respuesta incorrecta");
                alertaError.style.visibility = 'visible';
                alertaError.style.opacity = '1';
                btnError.style.visibility = 'visible';
                btnError.style.opacity = '1';
            }
        }
    })   
}

/* -------------------------------------------------------------------------- */
/*                                   ayudas                                   */
/* -------------------------------------------------------------------------- */
function cincuentaCincuenta(){
    console.log("50 y 50");
    //cincuentaCincuenta.style.pointerEvents = "none";
    segundos+=30;
}

function cambiarPregunta(){
    cambiarPregunta.style.pointerEvents = "none";

}

function masSegundos(){
    masSegundos.style.pointerEvents = "none";
}

/* -------------------------------------------------------------------------- */
/*                                   botones                                  */
/* -------------------------------------------------------------------------- */
function siguiente(){
    cargarPreguntas(iterador);
    alertaOk = document.getElementById("alertaOk");
    alertaOk.style.visibility = 'hidden';
    alertaOk.style.opacity = '0';

    pSegundos.textContent = 59;
    segundos = 59;
    setInterval(function(){
        cuentaRegresiva();
    },1000);

}

function reiniciar(){
    Swal.fire({
        title: 'Desea Reinciar del juego?',
        text: "Estas seguro perderas todo el progreso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            location.reload();
        }
    }) 
}

function salir(){
    Swal.fire({
        title: 'Desea salir del juego?',
        text: "Estas seguro perderas todo el progreso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            window.close();
        }
    })     
}


window.addEventListener("load", comenzar, false);