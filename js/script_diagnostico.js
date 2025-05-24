// Importamos funciones externas desde 'funciones.js'
// highlightItem: Resalta el elemento seleccionado en la lista de búsqueda
// seleccionarCIE10: Maneja la selección de un diagnóstico al hacer clic o presionar Enter
// debounce: Retrasa la ejecución de la búsqueda para evitar llamadas excesivas al servidor
import { highlightItem, seleccionarCIE10, debounce } from './funciones.js';

// Esperamos a que el documento HTML esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function () {
    // PARTE 1: BÚSQUEDA DINÁMICA PARA #buscar-cie10
    //--------------------------------------------------
    const buscarCIE10 = document.getElementById('buscar-cie10');
    const resultadosCIE10 = document.getElementById('resultado-cie10');

    let selectedIndex = -1;
    let currentResults = [];

    function realizarBusqueda(termino) {
        const terminoLimpio = termino.trim(); // Limpiar espacios

        if (terminoLimpio.length < 2) { // Usar terminoLimpio
            // CORRECCIÓN IMPORTANTE AQUÍ:
            if (resultadosCIE10) { // Verificar que el elemento exista
                resultadosCIE10.classList.add('d-none');
            }
            currentResults = [];
            selectedIndex = -1;
            return;
        }

        // Usar terminoLimpio para la búsqueda
        fetch(`php/buscar_diagnostico.php?codigoCIE10=${encodeURIComponent(terminoLimpio)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                if (resultadosCIE10) {
                    resultadosCIE10.innerHTML = data;
                    currentResults = resultadosCIE10.querySelectorAll('#resultado-cie10 .search-item');

                    if (currentResults.length > 0) {
                        resultadosCIE10.classList.remove('d-none');
                        selectedIndex = 0; // Seleccionar el primero por defecto
                        highlightItem(currentResults, selectedIndex);
                    } else {
                        // Si no hay items de resultado, pero PHP podría haber devuelto un mensaje (ej. "No se encontraron...")
                        // Si el mensaje NO es un .search-item, ocultamos. O si queremos mostrar el mensaje de PHP:
                        if (data.trim() !== '' && !data.includes('search-item')) { 
                            // Si solo hay un mensaje de texto sin ser un item, igual se muestra
                            resultadosCIE10.classList.remove('d-none');
                        } else if (currentResults.length === 0) { // Si no hay NADA o no hay items
                             resultadosCIE10.classList.add('d-none');
                        }
                        selectedIndex = -1;
                    }
                }
            })
            .catch(error => {
                console.error('Error en fetch para buscarCIE10:', error);
                if (resultadosCIE10) {
                    resultadosCIE10.innerHTML = '<div class="list-group-item text-danger">Error al cargar diagnósticos.</div>';
                    resultadosCIE10.classList.remove('d-none');
                }
                currentResults = [];
                selectedIndex = -1;
            });
    }

    if (buscarCIE10) { // Asegurarse de que el input exista
        buscarCIE10.addEventListener('input', debounce(function () {
            realizarBusqueda(this.value);
        }, 300));

        buscarCIE10.addEventListener('keydown', function (e) {
            // currentResults ya se actualiza en realizarBusqueda
            // Pero si no hay resultados, las flechas no deberían hacer nada
            if (currentResults.length === 0 && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
                return;
            }

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    selectedIndex = Math.min(selectedIndex + 1, currentResults.length - 1);
                    highlightItem(currentResults, selectedIndex);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    selectedIndex = Math.max(selectedIndex - 1, 0);
                    highlightItem(currentResults, selectedIndex);
                    break;
                case 'Enter':
                    e.preventDefault(); // Prevenir submit si está en un form
                    if (selectedIndex >= 0 && selectedIndex < currentResults.length) { // Chequeo de índice válido
                        seleccionarCIE10(currentResults[selectedIndex]);
                        // Opcional: Ocultar y limpiar después de seleccionar con Enter
                        // if(resultadosCIE10) resultadosCIE10.classList.add('d-none');
                        // buscarCIE10.value = '';
                        // currentResults = [];
                        // selectedIndex = -1;
                    }
                    break;
                case 'Escape': // Añadido para cerrar con Escape
                    if(resultadosCIE10) resultadosCIE10.classList.add('d-none');
                    // buscarCIE10.value = ''; // Opcional
                    currentResults = [];
                    selectedIndex = -1;
                    break;
            }
        });

        // Opcional: Listener para foco (si quieres que se muestren/busquen resultados al volver al input)
        buscarCIE10.addEventListener('focus', function() {
            if (this.value.trim().length >= 2) { // Usar trim aquí también
                realizarBusqueda(this.value);
            }
        });
    }

    if (resultadosCIE10) { // Asegurarse de que el contenedor de resultados exista
        resultadosCIE10.addEventListener('click', function (event) {
            const item = event.target.closest('.search-item');
            if (!item) return;
            seleccionarCIE10(item);
            // Opcional: Ocultar y limpiar después de seleccionar con clic
            // if(resultadosCIE10) resultadosCIE10.classList.add('d-none');
            // if(buscarCIE10) buscarCIE10.value = '';
            // currentResults = [];
            // selectedIndex = -1;
        });
    }

    // --- INICIO: CÓDIGO PARA OCULTAR AL HACER CLIC FUERA (PARA BUSCAR-CIE10) ---
    document.addEventListener('click', function (event) {
        // Verificar que los elementos buscarCIE10 y resultadosCIE10 existan en la página
        if (!buscarCIE10 || !resultadosCIE10) {
            return;
        }

        const isClickInsideInput = buscarCIE10.contains(event.target);
        const isClickInsideResults = resultadosCIE10.contains(event.target);
        const isResultsVisible = !resultadosCIE10.classList.contains('d-none');

        // Si el clic NO es dentro del input Y NO es dentro de los resultados Y los resultados están visibles
        if (!isClickInsideInput && !isClickInsideResults && isResultsVisible) {
            resultadosCIE10.classList.add('d-none'); // Ocultamos el contenedor de resultados
            buscarCIE10.value = ''; // Limpiamos el input de búsqueda

            // Reseteamos el estado de la selección
            selectedIndex = -1;
            currentResults = [];
        }
    });
    // --- FIN: CÓDIGO PARA OCULTAR AL HACER CLIC FUERA ---


    // PARTE 2: LÓGICA PARA #codigo-cie10 (BÚSQUEDA DIRECTA POR CÓDIGO)
    // Esta parte permanece igual ya que no usa el dropdown de búsqueda dinámica.
    //--------------------------------------------------
    const codigoCIE10_directInput = document.getElementById('codigo-cie10'); // Renombrado para evitar conflicto de nombres
    const descripcionCIE10_directInput = document.getElementById('descripcion-cie10');  // Renombrado para evitar conflicto

    function limpiarDatosCIE10_direct() { // Renombrado
        if (descripcionCIE10_directInput) descripcionCIE10_directInput.value = '';
        sessionStorage.removeItem('codigoCIE10');
        sessionStorage.removeItem('descripcionCIE10');
    }

    function buscarDiagnostico_direct(codigo) { // Renombrado
        codigo = codigo.trim();
        if (!descripcionCIE10_directInput) return;

        // Cambiado a >=3, usualmente los códigos CIE10 principales tienen al menos 3 caracteres
        if (codigo.length >= 3) { 
            var xhr = new XMLHttpRequest();
            // Este PHP 'php/buscar_cie10.php' debe ser diferente al de la búsqueda dinámica
            // o capaz de manejar ambos tipos de peticiones (búsqueda por término vs. búsqueda exacta por código)
            xhr.open('GET', 'php/buscar_cie10.php?codigoCIE10=' + encodeURIComponent(codigo), true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        try {
                            var response = JSON.parse(xhr.responseText); // Asumimos que este PHP devuelve JSON
                            if (response.success && response.descripcion_cie10) {
                                descripcionCIE10_directInput.value = response.descripcion_cie10;
                                sessionStorage.setItem('codigoCIE10', codigo);
                                sessionStorage.setItem('descripcionCIE10', response.descripcion_cie10);
                            } else {
                                descripcionCIE10_directInput.value = 'Código no encontrado';
                                // No limpiar sessionStorage aquí para que el usuario vea el código que intentó
                            }
                        } catch (e) {
                            console.error("Error al parsear JSON de buscar_cie10.php:", e, xhr.responseText);
                            descripcionCIE10_directInput.value = 'Error en respuesta del servidor.';
                        }
                    } else {
                        console.error("Error en XHR para buscar_cie10.php: ", xhr.status, xhr.statusText);
                        descripcionCIE10_directInput.value = 'Error de conexión.';
                    }
                }
            };
            xhr.send();
        } else {
            // Si el código es muy corto, solo limpia la descripción visualmente
            descripcionCIE10_directInput.value = '';
        }
    }

    if (codigoCIE10_directInput) { // Asegurarse de que este input exista
        codigoCIE10_directInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevenir submit
                buscarDiagnostico_direct(this.value);
            }
        });

        codigoCIE10_directInput.addEventListener('input', function () {
            if (this.value.length === 0) {
                limpiarDatosCIE10_direct();
            } else if (this.value.length < 3) { // Ajustar a la longitud mínima para búsqueda directa
                if (descripcionCIE10_directInput) descripcionCIE10_directInput.value = '';
            }
        });

        codigoCIE10_directInput.addEventListener('change', function () {
            if (this.value.length === 0) {
                limpiarDatosCIE10_direct();
            }
            // Podrías llamar a buscarDiagnostico_direct(this.value) aquí también si el valor es válido
        });
    }
});