var ipc = require('electron').ipcRenderer;

var audioInicio;

function comenzar(){
    audioInicio = document.getElementById("cancionInicio");
    audioInicio.play();
}

function pagActiva(){
    audioInicio.play();
}

function pagInactiva(){
    audioInicio.pause();
}

window.addEventListener("load", comenzar, false);
window.addEventListener("focus", pagActiva, false);
window.addEventListener("blur", pagInactiva, false);
