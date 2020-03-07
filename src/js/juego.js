
var Excel = require('exceljs');
const Swal = require('sweetalert2');

var pSegundos;
var segundos;
var preguntas = [];

var cincuentaCincuenta;
var pista;
var masSegundos;

var audio1a5;
var audio6a10;
var audio11a15;
var audioCorrecta;
var audioIncorrecta;

var opca;
var opcb;
var opcc;
var opcd;
var pregunta;
var respuesta;
var pistaPregunta;
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

    habilitarOpciones();

    opca.addEventListener("click",verificarRespuesta,false);        
    opcb.addEventListener("click",verificarRespuesta,false);        
    opcc.addEventListener("click",verificarRespuesta,false);        
    opcd.addEventListener("click",verificarRespuesta,false);    

    /* --------------------------------- audios --------------------------------- */
    audio1a5 = document.getElementById("cancionPregunta1a5");
    audio6a10 = document.getElementById("cancionPregunta6a10");
    audio11a15 = document.getElementById("cancionPregunta11a15");
    audioCorrecta = document.getElementById("cancionCorrecta");
    audioIncorrecta = document.getElementById("cancionIncorrecta");

    audio1a5.play();
    audio6a10.pause();
    audio11a15.pause();
    audioCorrecta.pause();
    audioIncorrecta.pause();

    /* --------------------------------- ayudas --------------------------------- */
    cincuentaCincuenta = document.getElementById("cincuentaCincuenta");
    pista = document.getElementById("pista");
    masSegundos = document.getElementById("masSegundos");

    habilitarAyudas();

    cincuentaCincuenta.addEventListener("click",cincuenta,false);
    pista.addEventListener("click",obtenerPista,false);
    masSegundos.addEventListener("click",segundosMas,false);

    /* --------------------------------- botones -------------------------------- */
    btnOk = document.getElementById("btnOk");
    btnError = document.getElementById("btnError");
    btnSalir = document.getElementById("btnSalir");

    esconderBotones();

    btnOk.addEventListener("click",siguiente,false);
    btnError.addEventListener("click",reiniciar,false);
    btnSalir.addEventListener("click",salir,false);

    /* --------------------------------- alertas -------------------------------- */
    alertaOk = document.getElementById("alertaOk");
    alertaError = document.getElementById("alertaError");
    
    esconderAlertas();

    /* ---------------------------------- carga --------------------------------- */
    var contenedor = document.getElementById('contenedor_carga');
    contenedor.style.visibility = 'hidden';
    contenedor.style.opacity = '0';

    /* --------------------------- llamada a funciones -------------------------- */
    datosExcel();  

    /* ------------------------------- cronometro ------------------------------- */
    pSegundos = document.getElementById("segundos");
    iniciarCronometro();

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
        else{
            tiempoTerminado();
        }
    }
    pSegundos.textContent = segundos;
}

function iniciarCronometro(){
    pSegundos.textContent = 59;
    segundos = 59;
    setInterval(function(){
        cuentaRegresiva();
    },1000); 
}

function tiempoTerminado(){
    respuestaIncorrecta();
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
    pistaPregunta = preguntas[iterador].getCell(7).value; 

    if(i < 5){
        audio1a5.play();
        audio6a10.pause();
        audio11a15.pause();
        audioCorrecta.pause();
        audioIncorrecta.pause();
    }
    if(i >= 5 & i < 10){
        audio1a5.pause();
        audio6a10.play();
        audio11a15.pause();
        audioCorrecta.pause();
        audioIncorrecta.pause();
    }
    if(i>= 10){
        audio1a5.pause();
        audio6a10.pause();
        audio11a15.play();
        audioCorrecta.pause();
        audioIncorrecta.pause();
    }
    
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
             if(respuestaSeleccionada.target.id == respuesta){
                respuestaCorrecta();
            }else{
                console.log("respuesta incorrecta");
                respuestaIncorrecta();            
            }
        }
    })   
}

function respuestaCorrecta(){

    audio1a5.pause();
    audio6a10.pause();
    audio11a15.pause();
    audioCorrecta.play();
    audioIncorrecta.pause();

    Swal.fire(
        '!FELICIDADES!',
        'Ha contestado correctamente',
        'sucess'
    )

    console.log("respuesta correcta");
    alertaOk.style.visibility = 'visible';
    alertaOk.style.opacity = '1';
    btnOk.style.visibility = 'visible';
    btnOk.style.opacity = '1';
    iterador++;
    inhabilitarOpciones();
}

function respuestaIncorrecta(){

    audio1a5.pause();
    audio6a10.pause();
    audio11a15.pause();
    audioCorrecta.pause();
    audioIncorrecta.play();

    Swal.fire(
        '! HAS FALLADO !',
        'Se acabo el tiempo o has seleccionado la respuesta incorrecta',
        'error'
    )

    alertaError.style.visibility = 'visible';
    alertaError.style.opacity = '1';
    btnError.style.visibility = 'visible';
    btnError.style.opacity = '1';
    inhabilitarOpciones();
}

function habilitarOpciones(){
    opca.style.pointerEvents = "auto";
    opcb.style.pointerEvents = "auto";
    opcc.style.pointerEvents = "auto";
    opcd.style.pointerEvents = "auto";
}

function inhabilitarOpciones(){
    opca.style.pointerEvents = "none";
    opcb.style.pointerEvents = "none";
    opcc.style.pointerEvents = "none";
    opcd.style.pointerEvents = "none";
}    

/* -------------------------------------------------------------------------- */
/*                                   ayudas                                   */
/* -------------------------------------------------------------------------- */
function cincuenta(){
    Swal.fire({
        title: 'Desea usar la ayuda cincuenta cincuenta?',
        text: "Estas seguro o segura, no podra usarla de nuevo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            quitarPreguntas();
            cincuentaCincuenta.style.pointerEvents = "none";
            cincuentaCincuenta.style.backgroundColor = "red";
        }
    }) 
}

function obtenerPista(){
    Swal.fire({
        title: 'Desea usar la ayuda y obtener una pista?',
        text: "Estas seguro o segura, no podra usarla de nuevo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            Swal.fire(
                'La pista es la siguiente:',
                pistaPregunta,
                'info'
            )
            pista.style.pointerEvents = "none";
            pista.style.backgroundColor = "red";
        }
    }) 
}

function segundosMas(){
    Swal.fire({
        title: 'Desea usar la ayuda y obtener 30 segundos mas?',
        text: "Estas seguro o segura, no podra usarla de nuevo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            masSegundos.style.pointerEvents = "none";
            masSegundos.style.backgroundColor = "red";
            segundos+=30;
        }
    }) 
}

function habilitarAyudas(){
    cincuentaCincuenta.style.pointerEvents = "auto";
    pista.style.pointerEvents = "auto";
    masSegundos.style.pointerEvents = "auto";

    cincuentaCincuenta.style.backgroundColor = "blue";
    pista.style.backgroundColor = "blue";
    masSegundos.style.backgroundColor = "blue";
}

function quitarPreguntas() {
    console.log(respuesta);
    var res;

    switch (respuesta) {
        case 'a':
            res = 1;
            break;
        case 'b':
            res = 2;
            break;
        case 'c':
            res = 3;
            break;
        case 'd':
            res = 4;
            break;
        default:
            console.log("error al agregar numero a la opcion");
            break;
    }

    var aleatorio;
    var aleatorio2;
    do{
        aleatorio = Math.floor(Math.random() * (5 - 1)) + 1;
        aleatorio2 = Math.floor(Math.random() * (5 - 1)) + 1;
    }while(aleatorio == res || aleatorio2 == res || aleatorio == aleatorio2);

    console.log(res,aleatorio,aleatorio2);
    switch (aleatorio) {
        case 1:
            opca.innerHTML = "";
            opca.style.pointerEvents = "none";
            break;
        case 2:
            opcb.innerHTML = "";
            opcb.style.pointerEvents = "none";
            break;
        case 3:
            opcc.innerHTML = "";
            opcc.style.pointerEvents = "none";
            break;
        case 4:
            opcd.innerHTML = "";
            opcd.style.pointerEvents = "none";  
            break;
        default:
            console.log("error al devolver de numero a letra");
            break;
    }
    switch (aleatorio2) {
        case 1:
            opca.innerHTML = "";
            opca.style.pointerEvents = "none";
            break;
        case 2:
            opcb.innerHTML = "";
            opcb.style.pointerEvents = "none";
            break;
        case 3:
            opcc.innerHTML = "";
            opcc.style.pointerEvents = "none";
            break;
        case 4:
            opcd.innerHTML = "";
            opcd.style.pointerEvents = "none";  
            break;
        default:
            console.log("error al devolver de numero a letra");
            break;
    }   
}

/* -------------------------------------------------------------------------- */
/*                                   botones                                  */
/* -------------------------------------------------------------------------- */
function esconderBotones(){
    btnOk.style.visibility = 'hidden';
    btnError.style.visibility = 'hidden';

    btnOk.style.opacity = '0';
    btnError.style.opacity = '0';
}

function siguiente(){
    cargarPreguntas(iterador);
    alertaOk = document.getElementById("alertaOk");
    alertaOk.style.visibility = 'hidden';
    alertaOk.style.opacity = '0';
    if(iterator < 15){
        Swal.fire(
            '!FELICIDADES HA GANADO !',
            'A logrado contestar todas las preguntas satisfactoriamente',
            'sucess'
        )
    }else{
        habilitarAyudas();
        habilitarOpciones();
        esconderAlertas();
        esconderBotones();
        iniciarCronometro();
    }
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

/* -------------------------------------------------------------------------- */
/*                                   alertas                                  */
/* -------------------------------------------------------------------------- */
function esconderAlertas(){
    alertaOk.style.visibility = 'hidden';
    alertaError.style.visibility = 'hidden';

    alertaOk.style.opacity = '0';
    alertaError.style.opacity = '0';
}

window.addEventListener("load", comenzar, false);