// Función que agrega un evento de entrada para convertir el texto a mayúsculas
export function convertirAMayusculas(id) {
    // Obtiene el elemento por su ID y le agrega un evento de escucha
    document.getElementById(id).addEventListener('input', function () {
        // Convierte el valor ingresado a mayúsculas
        this.value = this.value.toUpperCase();
    });
}

// Función para resaltar el elemento seleccionado en la lista de búsqueda
export function highlightItem(items, index) {
    if (items.length === 0 || index < 0) return;
    items.forEach(item => item.classList.remove('active'));
    const selectedItem = items[index];
    selectedItem.classList.add('active');
    ajustarScroll(selectedItem.parentNode, selectedItem);
}

export function seleccionarCIE10(item) {
    // Obtiene el código del diagnóstico desde el atributo de datos del elemento seleccionado
    const codigoCIE10 = item.querySelector('#resultado-codigo-cie10').innerText;
    const descripcionCIE10 = item.querySelector('#resultado-descripcion-cie10').innerText;

    // Asigna los valores al formulario
    document.getElementById('codigo-cie10').value = codigoCIE10;
    document.getElementById('descripcion-cie10').value = descripcionCIE10;

    // Llama a la función para limpiar y ocultar resultados
    limpiarOcultar();
}

export function seleccionarPaciente(item) {
    // Extraer los datos del atributo `data-*`
    const numeroDocumentoPaciente = item.getAttribute('data-dni-paciente');
    const nombresPaciente = item.getAttribute('data-nombres-paciente');
    const apellidoPaternoPaciente = item.getAttribute('data-apellido-paterno-paciente');
    const apellidoMaternoPaciente = item.getAttribute('data-apellido-materno-paciente');
    const fechaNacimientoPaciente = item.getAttribute('data-fecha-nacimiento-paciente');

    // Asignar valores a los campos del formulario
    document.getElementById('nombres-paciente').value = nombresPaciente;
    document.getElementById('apellido-paterno-paciente').value = apellidoPaternoPaciente;
    document.getElementById('apellido-materno-paciente').value = apellidoMaternoPaciente;
    document.getElementById('documento-paciente').value = numeroDocumentoPaciente;
    document.getElementById('fecha-nacimiento-paciente').value = fechaNacimientoPaciente;

    // Calcular y asignar la edad (opcional)
    if (fechaNacimientoPaciente) {
        const edad = calcularEdad(fechaNacimientoPaciente);
        document.getElementById('edad-paciente').value = edad;
    }

    document.getElementById('form-paciente').classList.remove('d-none');
    // Limpiar y ocultar resultados
    limpiarOcultar();
}

// Función para calcular la edad a partir de la fecha de nacimiento
export function calcularEdad(fechaNacimientoPaciente) {
    const hoy = new Date();
    const fecha = new Date(fechaNacimientoPaciente);
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const mes = hoy.getMonth() - fecha.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
        edad--;
    }

    return edad;
}

export function seleccionarPersonal(item) {
    // Extraer los datos del atributo `data-*`
    const numeroDocumentoPersonal = item.getAttribute('data-dni-personal');
    const nombresPersonal = item.getAttribute('data-nombres-personal')?.trim() || '';
    const apellidoPaternoPersonal = item.getAttribute('data-apellido-paterno-personal')?.trim() || '';
    const apellidoMaternoPersonal = item.getAttribute('data-apellido-materno-personal')?.trim() || '';
    const profesionPersonal = item.getAttribute('data-profesion')?.trim() || '';
    const colegiaturaPersonal = item.getAttribute('data-numero-colegiatura')?.trim() || '';
    const especialidadPersonal = item.getAttribute('data-especialidad')?.trim() || '';

    // Concatenar nombre completo (ignorando campos vacíos)
    const nombresCompletoPersonal = [nombresPersonal, apellidoPaternoPersonal, apellidoMaternoPersonal]
        .filter(part => part !== '') // Eliminar partes vacías
        .join(' '); // Unir con espacios

    // Asignar valores a los campos del formulario
    document.getElementById('nombres-completos-personal').value = nombresCompletoPersonal;
    document.getElementById('documento-personal').value = numeroDocumentoPersonal;
    document.getElementById('profesion-personal').value = profesionPersonal;
    document.getElementById('colegiatura-personal').value = colegiaturaPersonal;
    document.getElementById('numero-especialidad-personal').value = especialidadPersonal;


    document.getElementById('form-personal').classList.remove('d-none');
    // Limpiar y ocultar resultados
    limpiarOcultar();
}


// Función para limpiar campos y ocultar resultados de búsqueda
export function limpiarOcultar() {
    // Limpia los campos de entrada relacionados con la búsqueda
    document.getElementById('buscar-cie10').value = '';
    document.getElementById('buscar-paciente').value = '';
    document.getElementById('buscar-personal').value = '';

    // Oculta los contenedores de resultados de búsqueda
    document.getElementById('resultado-cie10').classList.add('d-none');
    document.getElementById('resultados-paciente').classList.add('d-none');
    document.getElementById('resultados-personal').classList.add('d-none');
}

// Función para ajustar el scroll del contenedor
export function ajustarScroll(container, selectedItem) {
    const { offsetTop, offsetHeight } = selectedItem;
    const { clientHeight, scrollTop } = container;

    if (offsetTop + offsetHeight > scrollTop + clientHeight) {
        container.scrollTop = offsetTop + offsetHeight - clientHeight;
    } else if (offsetTop < scrollTop) {
        container.scrollTop = offsetTop;
    }
}

// Función debounce para evitar múltiples solicitudes al servidor
export function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}