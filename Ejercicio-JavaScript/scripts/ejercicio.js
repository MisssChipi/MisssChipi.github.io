function cambiarColor(){
    console.log(document.getElementsByClassName("album"));
    album=document.getElementsByClassName('album');
    album[0].style.backgroundColor="black";
    album[0].style.color="white";
    document.body.style.backgroundColor="#202021";
}
function cambiarTamano() {
    var imagen = document.getElementsByClassName("imagen");
    imagen[0].style.height="500px";
}
