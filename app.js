let numeroSecreto = 0; 
let intentos = 0;
let listaDeNumerosSorteados = [];
let numeroMaximo = 10;
let intentoMaximo = 3;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);
    intentos++; 

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento("p", `Acertaste el número en ${intentos} ${(intentos === 1) ? "vez" : "veces"}.`);
        document.getElementById("reiniciar").removeAttribute("disabled");
        document.getElementById("intentar").setAttribute("disabled", "true");
    } else {
        if (numeroDeUsuario < numeroSecreto) {
            asignarTextoElemento("p", "El número secreto es mayor.");
        } else {
            asignarTextoElemento("p", "El número secreto es menor.");
        }
        
        if (intentos >= intentoMaximo) {
            asignarTextoElemento("p", `Ya intentaste el número máximo de veces. El número secreto era ${numeroSecreto}. El juego se reiniciará.`);
            document.getElementById("reiniciar").removeAttribute("disabled");
            document.getElementById("intentar").setAttribute("disabled", "true");
            return; // Evitar agregar el número secreto a la lista si se alcanzaron los intentos máximos
        } else {
            limpiarCaja();
        }
    }
    return;
}

function limpiarCaja() {
    document.querySelector("#valorUsuario").value = '';
}

function generarNumeroSecreto() {
    if (listaDeNumerosSorteados.length >= numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles.');
        return null; // Retorna null si ya se sortearon todos los números
    }

    let numeroGenerado;
    do {
        numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    } while (listaDeNumerosSorteados.includes(numeroGenerado));

    console.log(numeroGenerado);
    listaDeNumerosSorteados.push(numeroGenerado);
    return numeroGenerado;
}

function condicionesIniciales() {
    asignarTextoElemento("h1", "Juego del número secreto");
    asignarTextoElemento("p", `Indica un número del 1 al ${numeroMaximo}.`);
    numeroSecreto = generarNumeroSecreto();
    if (numeroSecreto === null) {
        asignarTextoElemento("p", 'Juego terminado. Ya se sortearon todos los números posibles.');
        document.getElementById("intentar").setAttribute("disabled", "true");
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        intentos = 0; // Inicializa los intentos en 0
        document.getElementById("intentar").removeAttribute("disabled");
    }
}

function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

condicionesIniciales();
