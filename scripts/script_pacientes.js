// Importamos funciones externas desde 'funciones.js'
// highlightItem: Resalta el elemento seleccionado en la lista de búsqueda
// seleccionarPaciente: Maneja la selección de un diagnóstico al hacer clic o presionar Enter
// debounce: Retrasa la ejecución de la búsqueda para evitar llamadas excesivas al servidor
import { highlightItem, seleccionarPaciente, debounce } from './funciones.js';

// Esperamos a que el documento HTML esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function () {
    // Capturamos el input donde el usuario escribe el término de búsqueda
    const buscarPaciente = document.getElementById('buscar-paciente');
    // Capturamos el contenedor donde se mostrarán los resultados de la búsqueda
    const resultadosPaciente = document.getElementById('resultados-paciente');

    // Variables para manejar la selección de resultados en la lista desplegable
    let selectedIndex = -1;  // Índice del elemento seleccionado (-1 indica que nada está seleccionado)
    let currentResults = [];  // Almacena los elementos de los resultados obtenidos

    // Función para realizar la búsqueda con AJAX
    function realizarBusqueda(termino) {
        // Si el usuario ha escrito menos de 2 caracteres, ocultamos los resultados y no hacemos la búsqueda
        if (termino.length < 2) {
            resultadosPaciente.classList.add('d-none');  // Ocultamos el contenedor de resultados
            return;  // Salimos de la función
        }

        // Hacemos una solicitud al servidor utilizando la API fetch para obtener los diagnósticos
        fetch(`buscar/buscar_paciente.php?nombrePaciente=${encodeURIComponent(termino)}`)
            .then(response => response.text())  // Convertimos la respuesta del servidor a texto
            .then(data => {
                console.log(data); // Verifica qué devuelve el PHP
                resultadosPaciente.innerHTML = data;  // Insertamos los resultados en el contenedor HTML
                resultadosPaciente.classList.remove('d-none');  // Mostramos los resultados

                // Capturamos los elementos de los resultados recién generados
                currentResults = document.querySelectorAll('#resultados-paciente .search-item');
                selectedIndex = -1;  // Reiniciamos el índice de selección

                // Si hay resultados, seleccionamos automáticamente el primero en la lista
                if (currentResults.length > 0) {
                    selectedIndex = 0;
                    highlightItem(currentResults, selectedIndex);  // Resaltamos el primer resultado
                }
            });
    }

    // Escuchamos el evento "input" cuando el usuario escribe en el campo de búsqueda
    buscarPaciente.addEventListener('input', debounce(function () {
        realizarBusqueda(this.value);  // Llamamos a la función de búsqueda con el valor del input
    }, 300));  // Usamos 'debounce' para retrasar la búsqueda 300 ms y evitar sobrecarga de peticiones

    // Manejo de eventos de teclado en el input
    buscarPaciente.addEventListener('keydown', function (e) {
        // Capturamos nuevamente la lista de resultados
        currentResults = document.querySelectorAll('#resultados-paciente .search-item');

        // Detectamos la tecla presionada
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
                if (selectedIndex >= 0) {
                    seleccionarPaciente(currentResults[selectedIndex]);  // Llamamos a la función para seleccionar el diagnóstico
                }
                break;
        }
    });

    // Detectar clic en los resultados para seleccionar
    resultadosPaciente.addEventListener('click', function (event) {
        // Identificamos el elemento clickeado más cercano con la clase 'search-item'
        const item = event.target.closest('.search-item');
        if (!item) return;  // Si no se hace clic en un resultado válido, no hacemos nada
        seleccionarPaciente(item);  // Llamamos a la función para seleccionar el diagnóstico
    });
});