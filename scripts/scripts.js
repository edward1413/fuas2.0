import { convertirAMayusculas } from './funciones.js';

document.addEventListener('DOMContentLoaded', function () {
    // 1. LIMPIEZA INICIAL
    sessionStorage.removeItem('codigoCIE10');
    sessionStorage.removeItem('descripcionCIE10');
    sessionStorage.removeItem('codigoPrestacion');

    // 2. DESHABILITAR CAMPOS
    const codigoCIE10 = document.getElementById('codigo-cie10');
    const descripcionCIE10 = document.getElementById('descripcion-cie10');
    const buscarCIE10 = document.getElementById('buscar-cie10');
    const dateTime = document.getElementById('date-time'); // Esta es la variable correcta

    codigoCIE10.disabled = true;
    descripcionCIE10.disabled = true;
    buscarCIE10.disabled = true;
    dateTime.disabled = true;

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
    const codigoPrestacion = document.getElementById('codigo-prestacion');
    codigoPrestacion.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length > 3) this.value = this.value.slice(0, 3);
        if (this.value.length === 3) {
            this.dispatchEvent(new KeyboardEvent('keydown', {
                key: 'Enter', keyCode: 13, bubbles: true
            }));
        }
    });

    // 6. FLATPICKR - FECHA Y HORA
    const flatpickrInstance = flatpickr(dateTime, { // Usando la variable correcta 'dateTime'
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        time_24hr: true,
        locale: "es",
        allowInput: true,
        clickOpens: true
    });

    // 7. SWITCH DE FECHA/HORA
    document.getElementById('switchdatetime').addEventListener('change', function () {
        const fechaDeshabilitada = document.getElementById('fecha-deshabilitada');
        const fechaHabilitada = document.getElementById('fecha-habilitada');

        if (this.checked) {
            dateTime.disabled = false;
            flatpickrInstance._input.disabled = false;
            fechaDeshabilitada.style.display = 'none';
            fechaHabilitada.style.display = 'inline';
            
            // Forzar actualización del calendario
            if (flatpickrInstance.calendarContainer) {
                flatpickrInstance.redraw();
            }
        } else {
            flatpickrInstance.clear();
            dateTime.disabled = true;
            flatpickrInstance._input.disabled = true;
            fechaDeshabilitada.style.display = 'inline';
            fechaHabilitada.style.display = 'none';
        }
    });
});

// EVENTOS GLOBALES
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
        sessionStorage.removeItem('codigoCIE10');
        sessionStorage.removeItem('descripcionCIE10');
        
        codigoCIE10.disabled = true;
        descripcionCIE10.disabled = true;
        buscarCIE10.disabled = true;
        
        mensajeDeshabilitado.style.display = 'inline';
        mensajeHabilitado.style.display = 'none';
    }
});