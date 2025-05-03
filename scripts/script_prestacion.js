// Añadir un evento 'keydown' al campo de entrada con id 'codigo-prestacion'
document.getElementById('codigo-prestacion').addEventListener('keydown', function (event) {
    // Verificar si la tecla presionada es 'Enter'
    if (event.key === 'Enter') {
        // Obtener el valor del campo de entrada
        var codigoPrestacion = this.value;
        // Verificar si el valor no está vacío
        if (codigoPrestacion.length > 0) {
            // Crear una nueva instancia de XMLHttpRequest
            var xhr = new XMLHttpRequest();
            // Configurar la solicitud AJAX: método GET, URL con el parámetro 'codigo-prestacion'
            xhr.open('GET', 'buscar/buscar_prestacion.php?codigo-prestacion=' + encodeURIComponent(codigoPrestacion), true);
            // Definir la función que se ejecutará cuando cambie el estado de la solicitud
            xhr.onreadystatechange = function () {
                // Verificar si la solicitud ha sido completada y el estado es 200 (OK)
                if (xhr.readyState == 4 && xhr.status == 200) {
                    // Parsear la respuesta JSON
                    var response = JSON.parse(xhr.responseText);
                    // Obtener el campo de entrada con id 'descripcion-prestacion'
                    var descripcionprestacion = document.getElementById('descripcion-prestacion');
                    // Verificar si la respuesta indica éxito
                    if (response.success) {
                        // Establecer el valor del campo de descripción con la descripción obtenida de la consulta de la columna descripcion_prestacion
                        descripcionprestacion.value = response.descripcion_prestacion;
                        sessionStorage.setItem('codigoPrestacion', codigoPrestacion); // Guardar el código de prestación en sessionStorage
                    } else {
                        // Si no se encontró el código, establecer un mensaje de error
                        descripcionprestacion.value = 'Código no encontrado';
                    }
                }
            };
            // Enviar la solicitud AJAX
            xhr.send();
        } else {
            // Si el valor del campo de entrada está vacío, limpiar el campo de descripción
            document.getElementById('descripcion-prestacion').value = '';
        }
    }
});