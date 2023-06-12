let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivoId = null;

let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");

let AciertaAudio = new Audio('https://gustavofl1.github.io/Juego-de-Memoria/Sound/Acierta.wav');
let GanadorAudio = new Audio('https://gustavofl1.github.io/Juego-de-Memoria/Sound/Ganador.wav');
let ErrorAudio = new Audio('https://gustavofl1.github.io/Juego-de-Memoria/Sound/Error.wav');
let PierdeAudio = new Audio('https://gustavofl1.github.io/Juego-de-Memoria/Sound/Pierde.wav');
let ClickAudio = new Audio('https://gustavofl1.github.io/Juego-de-Memoria/Sound/Click.wav');

// Generación de números aleatorios
let number = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
number = number.sort(() => { return Math.random() - 0.5 });
console.log(number);


function contarTiempo() {
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer == 0) {
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            PierdeAudio.play();
        }
    }, 1000);
}

function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./imagen/${number[i]}.png" alt="">`;
        tarjetaBloqueada.disabled = true;
    }
}
function restart() {
    location.reload();
}

function destapar(id) {

    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }
    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if (tarjetasDestapadas == 1) {
        // Mostrar primer botón
        tarjeta1 = document.getElementById(id);
        primerResultado = number[id]
        tarjeta1.innerHTML = `<img src="./imagen/${primerResultado}.png" alt="">`;
        ClickAudio.play();

        // Deshabilitar primer botón
        tarjeta1.disabled = true;
    }
    else if (tarjetasDestapadas == 2) {
        // Mostrar segundo número
        tarjeta2 = document.getElementById(id);
        segundoResultado = number[id];
        tarjeta2.innerHTML = `<img src="./imagen/${segundoResultado}.png" alt="">`;

        // Deshabilitar segundo botón
        tarjeta2.disabled = true;

        // Incrementar movimiento
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado) {
            tarjetasDestapadas = 0;

            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            AciertaAudio.play();
            if (aciertos == 8) {
                GanadorAudio.play();
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
                mostrarTiempo.innerHTML = `¡Fantástico! Sólo demoraste: ${timerInicial - timer} segundos`
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`
            }
        } else {
            ErrorAudio.play();
            setTimeout(() => {
                tarjeta1.innerHTML = " ";
                tarjeta2.innerHTML = " ";
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 800);
        }
    }
}
