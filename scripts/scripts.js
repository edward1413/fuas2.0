import { convertirAMayusculas } from './funciones.js';
// Espera a que el contenido del DOM (estructura HTML) se cargue completamente
// antes de ejecutar el código dentro de la función.
document.addEventListener('DOMContentLoaded', function () {
    ////////////////////////////
    /// JS PARA DIAGNOSTICOS ///
    ////////////////////////////
    // Obtiene una referencia al elemento del DOM con el ID "codigo-cie10"
    // y lo almacena en la variable inputCIE10.
    var inputCIE10 = document.getElementById('codigo-cie10');
    // Agrega un evento 'input' al campo de entrada. Este evento se dispara cada vez 
    // que el valor del campo cambia (por ejemplo, cuando el usuario escribe o pega texto).
    inputCIE10.addEventListener('input', function () {
        // Limita la longitud del texto ingresado a un máximo de 4 caracteres.
        // Si el usuario intenta ingresar más de 4, solo se mantienen los primeros 4.
        if (this.value.length > 4) {
            this.value = this.value.slice(0, 4); // Corta el texto hasta el carácter 4
        }
    });

    ///////////////////////////
    //// JS PARA PRESTACION ///
    ///////////////////////////
    //creamos una variable para almacenar lo que se escribirá en codigo-prestacion del index.php, y que solo se ingrese 3 números
    var codigoPrestacion = document.getElementById('codigo-prestacion');
    //agregamos un input al campo de la entrada
    codigoPrestacion.addEventListener('input', function () {
        //limitamos la longitud a 3 caracteres
        if (this.value.length > 3) { // Comprueba si la longitud del valor actual del elemento (this.value) es mayor que 3.
            this.value = this.value.slice(0, 3); // Si la condición anterior es verdadera, esta línea actualiza el valor del elemento.
            // .slice(0, 3) crea una nueva cadena que contiene solo los primeros 3 caracteres del valor original (desde el índice 0 hasta el índice 2).
            // Esta nueva cadena se asigna de nuevo a this.value, truncando el valor a un máximo de 3 caracteres.
        }
        //limitamos a solo numeros
        this.value = this.value.replace(/[^0-9]/g, '');
    })
});

// Aplica la función al id del index.php
convertirAMayusculas('buscar-paciente');
convertirAMayusculas('buscar-personal');
convertirAMayusculas('buscar-cie10');
convertirAMayusculas('codigo-cie10');