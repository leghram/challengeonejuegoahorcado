const root = document.getElementById("root");

const listaLetrasAbecedario = " abcdefghijklmnopqrstuvwxyz";

let listaPalabras = [
  "bug",
  "codigo",
  "html",
  "elemento",
  "javascript",
  "bit",
  "lenguaje",
];

let palabraRandomGlobal = "";
let letrasCompletadasPalabra = "";
let intentosFallidosPermitidos = 5;
let totalAciertos = 0;
let juegoIniciado = false;

function verificarCaracterLetraValida(letra) {
  let coincidencia = listaLetrasAbecedario.search(letra.toLowerCase());
  return coincidencia >= 0 ? true : false;
}

function buscarBtnIniciarJuego() {
  let btn = document.getElementById("iniciarJuego");
  btn.addEventListener("click", actionIniciarJuego);
}

function buscarBtnAgregarPalabra() {
  let btn = document.getElementById("agregarPalabra");
  btn.addEventListener("click", actionAddAreaToAddWord);
}

buscarBtnIniciarJuego();
buscarBtnAgregarPalabra();

function buscarBtnNuevoJuego() {
  intentosFallidosPermitidos = 5;
  totalAciertos = 0;
  letrasCompletadasPalabra = "";
  palabraRandomGlobal = "";
  let btn = document.getElementById("new-game");
  btn.addEventListener("click", actionIniciarJuego);
  insertarInputsInScreen();
}

function buscarBtnDesistir() {
  let btn = document.getElementById("desistir");
  btn.addEventListener("click", () => {
    actionDesistir();
  });
}

function buscarAreaInputs() {
  let btn = document.getElementById("space-inputs");
}

function buscarBtnCancelarAddWord() {
  let btn = document.getElementById("btn-cancelar-word");
  btn.addEventListener("click", () => {
    actionDesistir();
  });
}

function buscarBtnGuardarEmpezarWord() {
  let btn = document.getElementById("btn-guardar");
  let inputGuardarWord = document.getElementById("add-new-word");
  btn.addEventListener("click", () => {
    if (inputGuardarWord.value.length <= 8) {
      listaPalabras.push(inputGuardarWord.value);
      inputGuardarWord.value = "";
      actionIniciarJuego();
    } else {
      console.log("no cumple");
    }
  });
}

function verificarCondicionesPalabraNueva(word) {}

function actionAddAreaToAddWord() {
  root.innerHTML = `
  <div class="add-new-word-area">
  <div class="space--input-add-word">
    <input
      id="add-new-word"
      type="text"
      class="input-add-word"
      placeholder="escriba la palabra"
    />
  </div>
  <div class="botones-add-word">
    <p><span class="span-info">!</span>Max 8 characters</p>
    <div class="botones-add-new-word">
      <button id="btn-guardar">Guarda y Empezar</button>
      <button id='btn-cancelar-word'>Cancelar</button>
    </div>
  </div>
</div>
    `;
  buscarBtnCancelarAddWord();
  buscarBtnGuardarEmpezarWord();
}

function actionDesistir() {
  root.innerHTML = `
    <div class="botones-container">
    <button id="iniciarJuego">Iniciar Juego</button>
    <button id="agregarPalabra">Agregar Palabra</button>
  </div>
    `;
  intentosFallidosPermitidos = 5;
  totalAciertos = 0;
  letrasCompletadasPalabra = "";
  palabraRandomGlobal = "";
  juegoIniciado = false;
  buscarBtnIniciarJuego();
  buscarBtnAgregarPalabra();
}

function actionIniciarJuego() {
  intentosFallidosPermitidos = 5;
  root.innerHTML = `
  <div id="juego-init">
  <div id="game-space">
    <div id="ahorcado-space">
      <div id="ahorcado-base">

      </div>
      <div id="message-game"></div>
    </div>
    <div id='inputs-letras-completadas'>
      <div id="space-inputs"></div>
      <div id='letras-completadas'> </div>
    </div>
    
  </div>
  <div id="botones-game">
    <button id="new-game">Nuevo Juego</button>
    <button id="desistir">Desistir</button>
  </div>
</div>
    `;

  buscarBtnNuevoJuego();
  buscarBtnDesistir();
}

function generateRandomPosition() {
  let tamano = listaPalabras.length;
  return Math.floor(Math.random() * (tamano - 0));
}

function getWordFromList() {
  let position = generateRandomPosition();
  return listaPalabras[position];
}

function insertarInputsInScreen() {
  juegoIniciado = true;
  const areaInputs = document.getElementById("space-inputs");
  areaInputs.innerHTML = "";
  palabraRandomGlobal = getWordFromList();
  let cantidad = palabraRandomGlobal.length;
  let htmlTexto = "";
  for (let i = 0; i < cantidad; i++) {
    htmlTexto =
      htmlTexto +
      `<input class='element-input' id='${i}' type='text' disabled />`;
  }
  areaInputs.innerHTML = htmlTexto;
}

document.addEventListener(
  "keydown",
  (event) => {
    if (juegoIniciado) {
      let listInputsLetters = document.querySelectorAll(".element-input");
      let letrasRepetidas = letrasCompletadasPalabra.search(event.key);

      if (palabraRandomGlobal.search(event.key) < 0) {
        intentosFallidosPermitidos = intentosFallidosPermitidos - 1;
        controlarInputFallidos();
      }

      if (
        letrasRepetidas < 0 &&
        palabraRandomGlobal.length > 0 &&
        verificarCaracterLetraValida(event.key)
      ) {
        letrasCompletadasPalabra = letrasCompletadasPalabra + event.key;
        ponerLetrasCoincidentesInputs(listInputsLetters, event.key);
        escribirPalabrasCompletadas();
      }

      if (
        palabraRandomGlobal.length > 0 &&
        (palabraRandomGlobal.length == totalAciertos ||
          intentosFallidosPermitidos == 0)
      ) {
        enviarMensaje();
      }
    }
  },
  false
);

function ponerLetrasCoincidentesInputs(listaNodosInputs, letra) {
  const listaLetras = palabraRandomGlobal.split("");
  for (let i = 0; i < listaNodosInputs.length; i++) {
    if (listaLetras[i] === letra) {
      listaNodosInputs[i].value = letra.toUpperCase();
      totalAciertos = totalAciertos + 1;
    }
  }
}

function escribirPalabrasCompletadas() {
  if (palabraRandomGlobal.length > 0) {
    let letrasCompletadas = document.getElementById("letras-completadas");
    letrasCompletadas.innerHTML = letrasCompletadasPalabra.toUpperCase();
  }
}

function enviarMensaje() {
  let messageTag = document.getElementById("message-game");
  if (totalAciertos == palabraRandomGlobal.length) {
    messageTag.innerHTML =
      "<div class='green-color'>Ganaste, Felicidades!</div>";
  }
  if (intentosFallidosPermitidos == 0) {
    messageTag.innerHTML = "<div class='red-color'>Fin del Juego!</div>";
  }
  juegoIniciado = false;
}

function controlarInputFallidos() {
  let imagenGame = document.getElementById("ahorcado-base");
  if (intentosFallidosPermitidos == 4) {
    imagenGame.innerHTML = "<div class='partes-ahorcado' id='fallido1'></div>";
  }
  if (intentosFallidosPermitidos == 3) {
    imagenGame.innerHTML = `
        <div class='partes-ahorcado' id='fallido1'></div>
        <div class='partes-ahorcado' id='fallido2'></div>
    `;
  }
  if (intentosFallidosPermitidos == 2) {
    imagenGame.innerHTML = `
        <div class='partes-ahorcado' id='fallido1'></div>
        <div class='partes-ahorcado' id='fallido2'></div>
        <div class='partes-ahorcado' id='fallido3'></div>
    `;
  }
  if (intentosFallidosPermitidos == 1) {
    imagenGame.innerHTML = `
        <div class='partes-ahorcado' id='fallido1'></div>
        <div class='partes-ahorcado' id='fallido2'></div>
        <div class='partes-ahorcado' id='fallido3'></div>
        <div class='partes-ahorcado' id='fallido4'></div>
    `;
  }
  if (intentosFallidosPermitidos == 0) {
    imagenGame.innerHTML = `
        <div class='partes-ahorcado' id='fallido1'></div>
        <div class='partes-ahorcado' id='fallido2'></div>
        <div class='partes-ahorcado' id='fallido3'></div>
        <div class='partes-ahorcado' id='fallido4'></div>
        <div class='partes-ahorcado' id='fallido5'></div>
    `;
  }
}
