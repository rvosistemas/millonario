var pSegundos;
var segundos;

function comenzar(){
    pSegundos = document.getElementById("segundos");
    pSegundos.textContent = 59;
    segundos = 59;
    setInterval(cuentaRegresiva,1000);
}

function cuentaRegresiva(){
    //segundos = 59;
    console.log(segundos);
    if (segundos > 0) {
        segundos=segundos-1;        
    }
    pSegundos.textContent = segundos;
}

window.addEventListener("load", comenzar, false);