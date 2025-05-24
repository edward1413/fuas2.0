// Importamos funciones externas desde 'funciones.js'
// highlightItem: Resalta el elemento seleccionado en la lista de búsqueda
// seleccionarPersonal: Maneja la selección de un diagnóstico al hacer clic o presionar Enter
// debounce: Retrasa la ejecución de la búsqueda para evitar llamadas excesivas al servidor
import { highlightItem, seleccionarPersonal, debounce } from './funciones.js';

// Esperamos a que el documento HTML esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function () {
    // Capturamos el input donde el usuario escribe el término de búsqueda
    const buscarPersonal = document.getElementById('buscar-personal');
    // Capturamos el contenedor donde se mostrarán los resultados de la búsqueda
    const resultadosPersonal = document.getElementById('resultados-personal');

    // Variables para manejar la selección de resultados en la lista desplegable
    let selectedIndex = -1;  // Índice del elemento seleccionado (-1 indica que nada está seleccionado)
    let currentResults = [];  // Almacena los elementos de los resultados obtenidos

    // Función para realizar la búsqueda con AJAX
    function realizarBusqueda(termino) {
        // Si el usuario ha escrito menos de 2 caracteres, ocultamos los resultados y no hacemos la búsqueda
        if (termino.length < 2) {
            resultadosPersonal.classList.add('d-none');  // Ocultamos el contenedor de resultados
            currentResults = []; // Limpiamos los resultados actuales
            selectedIndex = -1; // Reseteamos el índice
            return;  // Salimos de la función
        }

        // Hacemos una solicitud al servidor utilizando la API fetch para obtener los diagnósticos
        fetch(`php/buscar_personal.php?nombrePersonal=${encodeURIComponent(termino)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text(); // Convertimos la respuesta del servidor a texto
            })
            .then(data => {
                // console.log(data); // Verifica qué devuelve el PHP (descomentar para depurar)
                resultadosPersonal.innerHTML = data;  // Insertamos los resultados en el contenedor HTML
                
                // Capturamos los elementos de los resultados recién generados
                currentResults = resultadosPersonal.querySelectorAll('.search-item'); // Asegúrate que tu PHP genere items con esta clase
                
                if (currentResults.length > 0) {
                    resultadosPersonal.classList.remove('d-none');  // Mostramos los resultados solo si hay items
                    selectedIndex = 0;  // Seleccionamos automáticamente el primero en la lista
                    highlightItem(currentResults, selectedIndex);  // Resaltamos el primer resultado
                } else {
                    resultadosPersonal.classList.add('d-none'); // Ocultamos si no hay resultados después de la búsqueda
                    selectedIndex = -1;
                }
            })
            .catch(error => {
                console.error('Hubo un problema con la operación fetch:', error);
                resultadosPersonal.innerHTML = '<div class="list-group-item text-danger">Error al cargar resultados.</div>';
                resultadosPersonal.classList.remove('d-none');
                currentResults = [];
                selectedIndex = -1;
            });
    }

    // Escuchamos el evento "input" cuando el usuario escribe en el campo de búsqueda
    buscarPersonal.addEventListener('input', debounce(function () {
        realizarBusqueda(this.value);  // Llamamos a la función de búsqueda con el valor del input
    }, 300));  // Usamos 'debounce' para retrasar la búsqueda 300 ms y evitar sobrecarga de peticiones

    // Manejo de eventos de teclado en el input
    buscarPersonal.addEventListener('keydown', function (e) {
        // Capturamos nuevamente la lista de resultados (por si cambió dinámicamente)
        // currentResults ya se actualiza en realizarBusqueda, pero si no, sería necesario aquí.
        // Si currentResults está vacío y se presionan flechas, no hacer nada
        if (currentResults.length === 0 && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
            return;
        }

        switch (e.key) {
            case 'ArrowDown':  // Flecha abajo: mover selección hacia abajo
                e.preventDefault();  // Evitamos el desplazamiento del cursor dentro del input
                selectedIndex = Math.min(selectedIndex + 1, currentResults.length - 1);  // Aseguramos que no exceda el límite
                highlightItem(currentResults, selectedIndex);  // Resaltamos el nuevo elemento seleccionado
                break;
            case 'ArrowUp':  // Flecha arriba: mover selección hacia arriba
                e.preventDefault();  // Evitamos desplazamiento indeseado
                selectedIndex = Math.max(selectedIndex - 1, 0);  // Aseguramos que no sea menor que 0
                highlightItem(currentResults, selectedIndex);  // Resaltamos el nuevo elemento seleccionado
                break;
            case 'Enter':  // Si el usuario presiona Enter, seleccionamos el elemento resaltado
                e.preventDefault(); // Prevenir submit de formulario si el input está en uno
                if (selectedIndex >= 0 && selectedIndex < currentResults.length) { // Verificamos que el índice sea válido
                    seleccionarPersonal(currentResults[selectedIndex]);  // Llamamos a la función para seleccionar el Personal
                    // Opcional: ocultar resultados después de seleccionar con Enter
                    // resultadosPersonal.classList.add('d-none');
                    // buscarPersonal.value = ''; // Limpiar el input
                    // selectedIndex = -1;
                    // currentResults = [];
                }
                break;
            case 'Escape': // Ocultar resultados con la tecla Escape
                resultadosPersonal.classList.add('d-none');
                // buscarPersonal.value = ''; // Opcional: limpiar input con Escape
                selectedIndex = -1;
                currentResults = [];
                break;
        }
    });

    // Detectar clic en los resultados para seleccionar
    resultadosPersonal.addEventListener('click', function (event) {
        // Identificamos el elemento clickeado más cercano con la clase 'search-item'
        const item = event.target.closest('.search-item');
        if (!item) return;  // Si no se hace clic en un resultado válido, no hacemos nada
        
        seleccionarPersonal(item);  // Llamamos a la función para seleccionar el Personal
        // Opcional: ocultar resultados después de seleccionar con clic
        // resultadosPersonal.classList.add('d-none');
        // buscarPersonal.value = ''; // Limpiar el input
        // selectedIndex = -1;
        // currentResults = [];
    });

    // NUEVO: Escuchar clics en cualquier parte del documento para ocultar resultados
    document.addEventListener('click', function (event) {
        const isClickInsideInput = buscarPersonal.contains(event.target);
        const isClickInsideResults = resultadosPersonal.contains(event.target);
        const isResultsVisible = !resultadosPersonal.classList.contains('d-none');

        // Si el clic NO es dentro del input Y NO es dentro de los resultados Y los resultados están visibles
        if (!isClickInsideInput && !isClickInsideResults && isResultsVisible) {
            resultadosPersonal.classList.add('d-none'); // Ocultamos el contenedor de resultados
            buscarPersonal.value = ''; // Limpiamos el input de búsqueda
            
            // Reseteamos el estado de la selección
            selectedIndex = -1;
            currentResults = [];
        }
    });

    // Opcional: Mostrar resultados si el input tiene texto y obtiene foco (y no se hizo clic en un resultado)
    buscarPersonal.addEventListener('focus', function() {
        if (this.value.length >= 2 && currentResults.length > 0) { // O simplemente this.value.length >= 2 y rehacer la búsqueda
            // Si ya hay resultados en currentResults y el input tiene texto, mostrarlos
            // Esto es útil si el usuario hizo clic fuera y luego volvió al input sin cambiar el texto
            // resultadosPersonal.classList.remove('d-none');
            // O, si prefieres, puedes forzar una nueva búsqueda:
            realizarBusqueda(this.value);
        }
    });

});