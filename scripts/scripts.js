import { convertirAMayusculas } from './funciones.js';

// Único DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    // 1. LIMPIEZA INICIAL
    sessionStorage.removeItem('codigoCIE10');
    sessionStorage.removeItem('descripcionCIE10');
    sessionStorage.removeItem('codigoPrestacion');
    sessionStorage.removeItem('codigoPrestacion');

    // 2. DESHABILITAR CAMPOS (solo aquí)
    const codigoCIE10 = document.getElementById('codigo-cie10');
    const descripcionCIE10 = document.getElementById('descripcion-cie10');
    const buscarCIE10 = document.getElementById('buscar-cie10');

    codigoCIE10.disabled = true;
    descripcionCIE10.disabled = true;
    buscarCIE10.disabled = true;

    // 3. CONVERSIÓN A MAYÚSCULAS
    convertirAMayusculas('buscar-paciente');
    convertirAMayusculas('buscar-personal');
    convertirAMayusculas('buscar-cie10');
    convertirAMayusculas('codigo-cie10');

    // 4. LÓGICA DE DIAGNÓSTICOS
    codigoCIE10.addEventListener('input', function () {
        if (this.value.length > 4) this.value = this.value.slice(0, 4);
        if (this.value.length === 4) {
            this.dispatchEvent(new KeyboardEvent('keydown', {
                key: 'Enter', keyCode: 13, bubbles: true
            }));
        }
        if (this.value.length === 0) {
            descripcionCIE10.value = '';
            sessionStorage.removeItem('codigoCIE10');
            sessionStorage.removeItem('descripcionCIE10');
        }
    });

    // 5. LÓGICA DE PRESTACIÓN
    //creamos una variable para almacenar lo que se escribirá en codigo-prestacion del index.php, y que solo se ingrese 3 números
    const codigoPrestacion = document.getElementById('codigo-prestacion');
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
            // Disparar el evento en el campo
            this.dispatchEvent(new KeyboardEvent('keydown', {
                key: 'Enter', // Especificar la tecla como 'Enter'
                keyCode: 13, // Código de la tecla 'Enter'
                bubbles: true // Permitir que el evento burbujee (propague) hacia arriba en el DOM
            }));
        }
    })
});

// 7. EVENTOS GLOBALES (fuera de DOMContentLoaded)
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
        codigoCIE10.value = ''; // Limpiar el campo de código CIE10
        sessionStorage.removeItem('codigoCIE10'); // Limpiar el valor almacenado en sessionStorage
        descripcionCIE10.value = ''; // Limpiar el campo de descripción CIE10
        sessionStorage.removeItem('descripcionCIE10'); // Limpiar el valor almacenado en sessionStorage
        buscarCIE10.value = ''; // Limpiar el campo de búsqueda CIE10

        codigoCIE10.disabled = true; // Deshabilitar el campo de código CIE10
        descripcionCIE10.disabled = true;
        buscarCIE10.disabled = true;

        mensajeDeshabilitado.style.display = 'inline';
        mensajeHabilitado.style.display = 'none';
    }

});