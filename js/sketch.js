let video;
let densidad = "@#%+^-`";
let columnas, filas;
let canvas;

// DOM
const nav = document.querySelector("#nav");
const input_imagen = document.querySelector("#input_imagen");
const boton_play = document.querySelector("#boton_play");
const boton_pausa = document.querySelector("#boton_pausa");
const contenedor = document.querySelector("#contenedor");
const contenedor_efecto =document.querySelector("#contenedor_efecto");
const ascii = document.querySelector("#ascii");
const pantalla_completa = document.querySelector("#fullscreen");
const body = document.querySelector("body");
const detalles_efectos = document.querySelector("#detalles_efectos");
const formulario = document.querySelector("#formulario");
const formulario_input = formulario.querySelectorAll(".formulario_input");

// efecto
const color_efecto = document.querySelector("#input_color");
const input_opacidad = document.querySelector("#input_opacidad");
const color_fondo = document.querySelector("#input_color_fondo");
const tamano_texto = document.querySelector("#input_tamano");
const input_densidad = document.querySelector("#input_densidad");
const input_brillo = document.querySelector("#input_brillo");
const input_contraste = document.querySelector("#input_contraste");
const input_linea = document.querySelector("#input_linea");
const input_grosor = document.querySelector("#input_peso");
const input_caracteres = document.querySelector("#input_caracteres");
const input_tipografia = document.querySelector("#input_tipografia");


let escala = input_densidad.value;


let tipografia = "Roboto Mono";
let jetBrains;
function preload(){
  jetBrains = loadFont("fonts/JetBrainsMono[wght].ttf");
}

function setup() {
  actualizarCanvas();
  noStroke();
}

function draw() {
  video.loadPixels();

  //tipografia
  if(input_tipografia.value == 1){
    tipografia = "Roboto Mono";
  } else if (input_tipografia.value == 2){
    tipografia = "JetBrains Mono";
  } else if(input_tipografia.value == 3){
    tipografia = "Doto";
  } else if(input_tipografia.value == 4){
    tipografia = "Martian Mono";
  } else if(input_tipografia.value == 5){
    tipografia = "Ballet";
  } else if(input_tipografia.value == 6){
    tipografia = "Noto Sans Symbols 2";
  } else if(input_tipografia.value == 8){
    tipografia = "Yarndings 12";
  } 

  drawingContext.font = `${input_grosor.value} ${escala * tamano_texto.value}px '${tipografia}'`;

  const nuevaEscala = input_densidad.value;
  densidad = input_caracteres.value;

  if(nuevaEscala !== escala){
    escala = nuevaEscala;
    actualizarCanvas();
    return;
  }
  
  background(color_fondo.value);

  for (let j = 0; j < filas; j++) {
    for (let i = 0; i < columnas; i++) {
      const pixelIndex = (i + j * columnas) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      let avg = ((r + g + b) / 3);

      //brillo
      avg = avg * input_brillo.value;
      //contraste
      avg = ((avg - 128)* input_contraste.value) + 128;

      avg = constrain(avg, 0, 255);

      const len = densidad.length;
      const charIndex = floor(map(avg, 0, 255, 0, len - 1));
      const c = densidad.charAt(charIndex);

      const hex = color_efecto.value;
      const alpha = input_opacidad.value;
      const color_con_alpha = color(hex);
      color_con_alpha.setAlpha(alpha);
      fill(color_con_alpha);
      
      text(c, i * escala, j * escala * 1);
    }
  }
}




function actualizarCanvas(contenedor = ascii) {
  const ancho = contenedor.clientWidth;
  console.log(contenedor.clientWidth);
  let alto;
  alto = (4 / 6)* ancho;

  columnas = floor(ancho / escala);
  filas = floor(alto / escala);

  if (!canvas) {
    canvas = createCanvas(columnas * escala, filas * escala);
    canvas.parent("ascii");
  } else {
    resizeCanvas(columnas * escala, filas * escala);
  }

  if (!video) {
    video = createCapture(VIDEO);
    video.hide();
  }

  video.size(columnas, filas);
  textSize(escala);

  escondido = false;
}

function reanudar(){
  video.elt.play();
  boton_pausa.style.backgroundColor = "#0D0D0D";
  boton_play.style.backgroundColor = "#FF40F2";
}
function pausar(){
  boton_pausa.style.backgroundColor = "#FF40F2";
  boton_play.style.backgroundColor = "#0D0D0D";
  video.elt.pause();
}
function descargar(){
  saveCanvas('ascii', 'png');
}
let pantallaCompleta = false;
function cambiarAPantallaCompleta(){
  if(pantallaCompleta){
    pantallaCompleta= false;
    
    pantalla_completa.innerHTML = "maximizar pantalla";

    contenedor.style.display = "flex";
    contenedor.style.flexDirection = "row";

    contenedor_efecto.style.width = "66%";
    nav.style.display = "flex";
    nav.style.flexDirection = "row";

    detalles_efectos.style.width = "34%";
    detalles_efectos.style.position = "static";

    formulario.style.display = "block";
    detalles_efectos.style.opacity = "1";
    // formulario.style.flexWrap = "wrap";
    actualizarCanvas();

  } else {
    console.log("pantalla completa");
    pantallaCompleta=true;

    contenedor.style.display = "block";
    contenedor.style.width = "100%";
    contenedor_efecto.style.width = "100%";
    nav.style.display = "none";
    detalles_efectos.style.width = "25%";
    pantalla_completa.innerHTML = "minimizar pantalla";

    // formulario.style.display = "flex";
    // formulario.style.flexWrap = "wrap";
    // formulario.style.
    // formulario.style.padding = "0px";
    detalles_efectos.style.opacity = ".1";
    // detalles_efectos.style.hover.backgroundColor = "black";

    detalles_efectos.style.position = "absolute";
    detalles_efectos.style.top = "50px";
    detalles_efectos.style.right = "0px";
    detalles_efectos.style.cursor = "move";
    detalles_efectos.style.zIndex="10";
    detalles_efectos.style.transition = ".5s";
    
    actualizarCanvas();
    
  }

  let tiempoResize;
  window.addEventListener("resize", () => {
    clearTimeout(tiempoResize);
    tiempoResize = setTimeout(() => {
      actualizarCanvas();
    }, 200); // espera 200ms después del último cambio
  });

  
  

}

