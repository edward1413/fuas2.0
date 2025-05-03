import { convertirAMayusculas } from './funciones.js';
// Espera a que el contenido del DOM (estructura HTML) se cargue completamente
// antes de ejecutar el código dentro de la función.
document.addEventListener('DOMContentLoaded', function () {
    ////////////////////////////
    /// JS PARA DIAGNOSTICOS ///
    ////////////////////////////
    // Obtiene una referencia al elemento del DOM con el ID "codigo-cie10"
    // y lo almacena en la variable codigoCIE10.
    var codigoCIE10 = document.getElementById('codigo-cie10');
    // Agrega un evento 'input' al campo de entrada. Este evento se dispara cada vez 
    // que el valor del campo cambia (por ejemplo, cuando el usuario escribe o pega texto).
    codigoCIE10.addEventListener('input', function () {
        // Limita la longitud del texto ingresado a un máximo de 4 caracteres.
        // Si el usuario intenta ingresar más de 4, solo se mantienen los primeros 4.
        if (this.value.length > 4) {
            this.value = this.value.slice(0, 4); // Corta el texto hasta el carácter 4
        }
        // Si ya tiene 3 dígitos, disparar automáticamente el evento "Enter"
        if (this.value.length === 4) {
            // Crear un evento de teclado simulando "Enter"
            var enterEvent = new KeyboardEvent('keydown', {  // Crear un nuevo evento de teclado
                // Definir el tipo de evento como 'keydown' (tecla presionada hacia abajo)
                key: 'Enter', // Especificar la tecla como 'Enter'
                keyCode: 13, // Código de la tecla 'Enter'
                which: 13, // Código de la tecla 'Enter' (deprecated, pero a veces usado)
                bubbles: true // Permitir que el evento burbujee (propague) hacia arriba en el DOM
            });

            // Disparar el evento en el campo
            this.dispatchEvent(enterEvent);
        }
    });

    ///////////////////////////
    //// JS PARA PRESTACION ///
    ///////////////////////////
    //creamos una variable para almacenar lo que se escribirá en codigo-prestacion del index.php, y que solo se ingrese 3 números
    var codigoPrestacion = document.getElementById('codigo-prestacion');
    //agregamos un input al campo de la entrada
    codigoPrestacion.addEventListener('input', function () {
        //limitamos a solo numeros
        this.value = this.value.replace(/[^0-9]/g, '');
        //limitamos la longitud a 3 caracteres
        if (this.value.length > 3) { // Comprueba si la longitud del valor actual del elemento (this.value) es mayor que 3.
            this.value = this.value.slice(0, 3); // Si la condición anterior es verdadera, esta línea actualiza el valor del elemento.
            // .slice(0, 3) crea una nueva cadena que contiene solo los primeros 3 caracteres del valor original (desde el índice 0 hasta el índice 2).
            // Esta nueva cadena se asigna de nuevo a this.value, truncando el valor a un máximo de 3 caracteres.
        }
        // Si ya tiene 3 dígitos, disparar automáticamente el evento "Enter"
        if (this.value.length === 3) {
            // Crear un evento de teclado simulando "Enter"
            var enterEvent = new KeyboardEvent('keydown', {  // Crear un nuevo evento de teclado
                // Definir el tipo de evento como 'keydown' (tecla presionada hacia abajo)
                key: 'Enter', // Especificar la tecla como 'Enter'
                keyCode: 13, // Código de la tecla 'Enter'
                which: 13, // Código de la tecla 'Enter' (deprecated, pero a veces usado)
                bubbles: true // Permitir que el evento burbujee (propague) hacia arriba en el DOM
            });

            // Disparar el evento en el campo
            this.dispatchEvent(enterEvent);
        }
    })
});

// Escuchar cambios en el switch
document.getElementById('switchcie10').addEventListener('change', function () {
    const codigoCIE10 = document.getElementById('codigo-cie10');
    const descripcionCIE10 = document.getElementById('descripcion-cie10');
    const buscarCIE10 = document.getElementById('buscar-cie10');
    const mensajeDeshabilitado = document.getElementById('mensaje-deshabilitado');
    const mensajeHabilitado = document.getElementById('mensaje-habilitado');


    if (this.checked) {
        codigoCIE10.disabled = false;
        descripcionCIE10.disabled = false;
        buscarCIE10.disabled = false;
        mensajeDeshabilitado.style.display = 'none';
        mensajeHabilitado.style.display = 'inline';
    } else {
        codigoCIE10.value = '';
        descripcionCIE10.value = '';
        buscarCIE10.value = '';

        codigoCIE10.disabled = true;
        descripcionCIE10.disabled = true;
        buscarCIE10.disabled = true;

        mensajeDeshabilitado.style.display = 'inline';
        mensajeHabilitado.style.display = 'none';
    }

});

// Deshabilitar los campos al cargar la página
document.getElementById('codigo-cie10').disabled = true;
document.getElementById('descripcion-cie10').disabled = true;
document.getElementById('buscar-cie10').disabled = true;

// Aplica la función al id del index.php
convertirAMayusculas('buscar-paciente');
convertirAMayusculas('buscar-personal');
convertirAMayusculas('buscar-cie10');
convertirAMayusculas('codigo-cie10');