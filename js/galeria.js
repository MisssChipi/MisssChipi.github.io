const contenedor_fotos = document.querySelector("#contenedor_galeria");


fetch("http://localhost:3000/galeria").then(recurso => recurso.json()).then(respuesta => {
    // console.log(respuesta);

    for(i=0;i<respuesta.length; i++){
        const arregloBytes = new Uint8Array(respuesta[i].img.data);
        const blob = new Blob([arregloBytes]);
        const imagen_src = URL.createObjectURL(blob);

        const nuevaImagen = document.createElement("img");
        nuevaImagen.src = imagen_src;
        contenedor_fotos.appendChild(nuevaImagen);  
        
        const currentId = respuesta[i].id;
        
        nuevaImagen.addEventListener("click",()=>{
            sessionStorage.setItem("id_foto_elegida",currentId);
            nuevaImagen.style = "width: 100%; aspect-ratio: auto;";
            window.location = "editar.html";            
        })
    }
}) 