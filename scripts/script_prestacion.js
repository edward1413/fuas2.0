// Obtener los elementos una sola vez
const codigoPrestacion = document.getElementById('codigo-prestacion');
const descripcionPrestacion = document.getElementById('descripcion-prestacion');

// Función para buscar la prestación (reutilizable)
function buscarPrestacion(codigo) {
    if (codigo.length > 0) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'buscar/buscar_prestacion.php?codigo-prestacion=' + encodeURIComponent(codigo), true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) { 
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    descripcionPrestacion.value = response.descripcion_prestacion;
                    sessionStorage.setItem('codigoPrestacion', codigo);
                } else {
                    descripcionPrestacion.value = 'Código no encontrado';
                }
            }
        };
        xhr.send();
    } else {
        descripcionPrestacion.value = '';
        sessionStorage.removeItem('codigoPrestacion');
    }
}

// Evento para Enter (como lo tenías)
codigoPrestacion.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        buscarPrestacion(this.value);
    }
});

// Nuevo evento para detectar cuando se borra el contenido
codigoPrestacion.addEventListener('input', function () {
    if (this.value.length === 0) {
        descripcionPrestacion.value = '';
        sessionStorage.removeItem('codigoPrestacion');
    }
});

// También puedes agregar el evento 'change' por si acaso
codigoPrestacion.addEventListener('change', function () {
    if (this.value.length === 0) {
        descripcionPrestacion.value = '';
        sessionStorage.removeItem('codigoPrestacion');
    }
});