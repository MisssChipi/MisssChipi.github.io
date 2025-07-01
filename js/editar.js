let densidad = "@#%+^-`";
let columnas, filas;
let canvas;



var galeria_bar = document.querySelector("#galeria_bar");
const contenedor_efecto_galeria = document.querySelector("#contenedor_efecto_galeria");
const elemento_esconder = document.querySelector("#elemento_esconder");
const boton_esconder = document.querySelector("#boton_esconder");

const contenedor_efecto = document.querySelector("#ascii_editar");
const color_efecto = document.querySelector("#input_color");
const input_opacidad = document.querySelector("#input_opacidad");
const color_fondo = document.querySelector("#input_color_fondo");
const tamano_texto = document.querySelector("#input_tamano");
const input_densidad = document.querySelector("#input_densidad");
let escala = input_densidad.value;

const input_brillo = document.querySelector("#input_brillo");
const input_contraste = document.querySelector("#input_contraste");
const input_linea = document.querySelector("#input_linea");
const input_grosor = document.querySelector("#input_peso");
const input_caracteres = document.querySelector("#input_caracteres");
const input_tipografia = document.querySelector("#input_tipografia");

let imagenOriginal;
let imagen;


let tipografia = "Roboto Mono";
let jetBrains;
function preload(){
  jetBrains = loadFont("fonts/JetBrainsMono[wght].ttf");
}

// console.log(sessionStorage.getItem("id_foto_elegida"));
const idImagen = sessionStorage.getItem("id_foto_elegida");

function setup() {
    // console.log("setup");

    
    const url = `http://localhost:3000/imagen/${idImagen}`;
    const urlprueba = `http://localhost:3000/imagen_original/${idImagen}`;
    fetch(urlprueba).then(respuesta => {
        if (respuesta.ok){
            // console.log(respuesta);
            // console.log("url valida");
            loadImage(urlprueba, img => {
                imagenOriginal = img;
                imagenOriginal.loadPixels();
            
                imagen = imagenOriginal.get();
                imagen.resize(columnas, filas);
                imagen.loadPixels();
            
                console.log("Imagen cargada desde el servidor.");
            }, err => {
            console.error("Error al cargar imagen desde el servidor:", err);
            }); 
            
            const urlEfecto = `http://localhost:3000/efecto/${idImagen}`;
            
            fetch(urlEfecto).then(respuesta => {
                
                if (respuesta.ok){
                    // console.log(respuesta);
                    respuesta.json().then(efecto => {
                        ef = efecto.efecto;
                        
                        input_brillo.value = ef.brillo;
                        input_contraste.value = ef.contraste;
                        input_caracteres.value = ef.caracteres+" ";
                        input_densidad.value = ef.densidad;
                        ajustarDensidad();
                        input_grosor.value = ef.peso;
                        input_opacidad.value = ef.opacidad;
                        tamano_texto.value = ef.tamaño;
                        input_tipografia.value = ef.tipografia;
                        color_efecto.value = ef.color;
                        color_fondo.value = ef.color_fondo;
                        input_linea.value = ef.linea;
                        // console.log(ef);
                    })
                }
            })
            // console.log(input_densidad.value);

        } else{
            // console.log("url invalida");
            loadImage(url, img => {
                imagenOriginal = img;
                imagenOriginal.loadPixels();
            
                imagen = imagenOriginal.get();
                imagen.resize(columnas, filas);
                imagen.loadPixels();
            
                console.log("Imagen cargada desde el servidor.");
                }, err => {
                console.error("Error al cargar imagen desde el servidor:", err);
                });
        }
    })

    

  actualizarCanvas();
  const ancho = contenedor_efecto.clientWidth;
  const alto = (4 / 6) * ancho;

  columnas = floor(ancho / escala);
  filas = floor(alto / escala);

  canvas = createCanvas(columnas * escala, filas * escala);
  canvas.parent("ascii_editar");

  

  noStroke();
}

input_imagen.addEventListener("change", (event) => {
    const archivo = event.target.files[0];
    if (archivo) {
      const url = URL.createObjectURL(archivo);
      loadImage(url, img => {
        imagenOriginal = img;          // Guardas la imagen original
        imagenOriginal.loadPixels();
  
        // Inicialmente redimensionas la copia para el efecto ASCII
        imagen = imagenOriginal.get(); // Haces una copia
        imagen.resize(columnas, filas);
        imagen.loadPixels();
      });
    }
});

function draw() {
    // console.log(input_densidad.value);
if (!imagen || !imagen.pixels || imagen.pixels.length === 0) return;

  imagen.loadPixels();

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

  
  densidad = input_caracteres.value;

  
  
  background(color_fondo.value);
  
  for (let j = 0; j < filas; j++) {
    for (let i = 0; i < columnas; i++) {
      const pixelIndex = (i + j * columnas) * 4;
      const r = imagen.pixels[pixelIndex + 0];
      const g = imagen.pixels[pixelIndex + 1];
      const b = imagen.pixels[pixelIndex + 2];
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
      
      text(c, i * escala, j * escala * input_linea.value);
    }
  }
}



function actualizarCanvas(contenedor = contenedor_efecto) {
  const ancho = contenedor.clientWidth;
  const alto = (4 / 6) * ancho;

  columnas = floor(ancho / escala);
  filas = floor(alto / escala);

  if (!canvas) {
    canvas = createCanvas(columnas * escala, filas * escala);
    canvas.parent("ascii_editar");
  } else {
    resizeCanvas(columnas * escala, filas * escala);
  }
  
  textSize(escala);
  if (imagen) {
    imagen.resize(columnas, filas);
    imagen.loadPixels();
  }
  
}
function actualizarImagenRedimensionada() {
    if (!imagenOriginal) return;
    imagen = imagenOriginal.get();  // Copia fresca de la original
    imagen.resize(columnas, filas);
    imagen.loadPixels();
}

input_densidad.addEventListener("input", () => {
    ajustarDensidad();
});
function ajustarDensidad(){
    escala = parseInt(input_densidad.value);
    actualizarCanvas(); // ajusta canvas, columnas, filas
    actualizarImagenRedimensionada();
    // console.log(input_densidad.value);
}
  

function descargar(){
  saveCanvas('ascii_editar', 'png');
}


function guardar_edicion(){
    
    // Capturar imagen actual del canvas
    const captura = canvas.elt.toDataURL("image/png");
    const base64 = captura.split(",")[1];

    // Obtener los valores actuales del efecto
    const efecto = {
        brillo: document.querySelector("#input_brillo").value,
        contraste: document.querySelector("#input_contraste").value,
        color: document.querySelector("#input_color").value,
        opacidad: document.querySelector("#input_opacidad").value,
        densidad: document.querySelector("#input_densidad").value,
        caracteres: document.querySelector("#input_caracteres").value,
        tamaño: document.querySelector("#input_tamano").value,
        linea: document.querySelector("#input_linea").value,
        peso: document.querySelector("#input_peso").value,
        tipografia: document.querySelector("#input_tipografia").value,
        color_fondo: document.querySelector("#input_color_fondo").value
    };

    // Enviar al servidor con PUT
    fetch(`http://localhost:3000/actualizar_imagen/${idImagen}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
        objeto_imagen: base64,
        efecto: efecto
        })
    })
    .then(res => {
        if (res.ok) {
          console.log("Imagen actualizada correctamente.");
        } else {
          console.error("Error al actualizar imagen.");
        }
    });
}
function eliminar(){
    alert("¿seguro que quieres eliminar esta imagen?")
    fetch(`http://localhost:3000/eliminar/${idImagen}`, {
        method: "DELETE"
      })
      .then(res => {
        if (res.ok) {
          console.log("Imagen eliminada correctamente.");
          // Redireccionar o actualizar la interfaz
          window.location = "galeria.html";
        } else {
          console.error("Error al eliminar imagen");
        }
      });
}