// assets/javascript/scripts.js

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('El documento ha sido completamente cargado.');
    
    // Obtener el botón
    var mybutton = document.getElementById("backToTopBtn");

    // Mostrar el botón cuando se desplaza 20px desde la parte superior del documento
    window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    // Cuando el usuario hace clic en el botón, se desplaza hacia la parte superior del documento
    mybutton.onclick = function() {
        scrollToTop();
    };

    function scrollToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
});
// assets/javascript/scripts.js

document.addEventListener('DOMContentLoaded', function() {
    var h1Element = document.querySelector('h1');

    window.addEventListener('scroll', function() {
        var scrollPosition = window.scrollY;

        if (scrollPosition < 200) {
            h1Element.classList.remove('font-medium', 'font-bottom');
            h1Element.classList.add('font-top');
        } else if (scrollPosition >= 200 && scrollPosition < 400) {
            h1Element.classList.remove('font-top', 'font-bottom');
            h1Element.classList.add('font-medium');
        } else {
            h1Element.classList.remove('font-top', 'font-medium');
            h1Element.classList.add('font-bottom');
        }
    });
});

