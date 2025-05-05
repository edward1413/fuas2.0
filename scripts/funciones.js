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

    /// Solo guardar en sessionStorage si hay valores
    if (codigoCIE10.trim() !== '') {
        sessionStorage.setItem('codigoCIE10', codigoCIE10);
        sessionStorage.setItem('descripcionCIE10', descripcionCIE10);
    } else {
        sessionStorage.removeItem('codigoCIE10');
        sessionStorage.removeItem('descripcionCIE10');
    }

    // Llama a la función para limpiar y ocultar resultados
    limpiarOcultar();
}

export function seleccionarPaciente(item) {
    // Limpiar primero (por si acaso hay datos previos)
    limpiarDatosPaciente();

    // Extraer los datos del atributo `data-*`
    const tipoDocumentoPaciente = item.getAttribute('data-tipo-documento-paciente');
    const numeroDocumentoPaciente = item.getAttribute('data-dni-paciente');
    const nombresPaciente = item.getAttribute('data-nombres-paciente');
    const apellidoPaternoPaciente = item.getAttribute('data-apellido-paterno-paciente');
    const apellidoMaternoPaciente = item.getAttribute('data-apellido-materno-paciente');
    const fechaNacimientoPaciente = item.getAttribute('data-fecha-nacimiento-paciente');
    const nombresSeparados = nombresPaciente.trim().split(' ');
    const generoPaciente = item.getAttribute('data-genero-paciente');

    // Asignar valores a los campos del formulario
    document.getElementById('documento-paciente').value = numeroDocumentoPaciente;
    document.getElementById('nombres-paciente').value = nombresPaciente;
    document.getElementById('apellido-paterno-paciente').value = apellidoPaternoPaciente;
    document.getElementById('apellido-materno-paciente').value = apellidoMaternoPaciente;
    document.getElementById('fecha-nacimiento-paciente').value = fechaNacimientoPaciente;

    // Guardar el valor del tipo de documento en sessionStorage
    sessionStorage.setItem('tipoDocumentoPaciente', tipoDocumentoPaciente);
    sessionStorage.setItem('numeroDocumentoPaciente', numeroDocumentoPaciente);
    sessionStorage.setItem('primerNombrePaciente', nombresSeparados[0]);
    sessionStorage.setItem('otrosNombresPaciente', nombresSeparados.slice(1).join(' '));
    sessionStorage.setItem('apellidoPaternoPaciente', apellidoPaternoPaciente);
    sessionStorage.setItem('apellidoMaternoPaciente', apellidoMaternoPaciente);
    sessionStorage.setItem('fechaNacimientoPaciente', fechaNacimientoPaciente);
    sessionStorage.setItem('generoPaciente', generoPaciente);

    // Calcular y asignar la edad (opcional)
    if (fechaNacimientoPaciente) {
        const edad = calcularEdad(fechaNacimientoPaciente);
        document.getElementById('edad-paciente').value = edad;
    }

    document.getElementById('form-paciente').classList.remove('d-none');
    limpiarOcultar();
}

export function limpiarDatosPaciente() {
    // Limpiar campos del formulario
    document.getElementById('documento-paciente').value = '';
    document.getElementById('nombres-paciente').value = '';
    document.getElementById('apellido-paterno-paciente').value = '';
    document.getElementById('apellido-materno-paciente').value = '';
    document.getElementById('fecha-nacimiento-paciente').value = '';
    document.getElementById('edad-paciente').value = '';

    // Limpiar sessionStorage
    sessionStorage.removeItem('tipoDocumentoPaciente');
    sessionStorage.removeItem('numeroDocumentoPaciente');
    sessionStorage.removeItem('primerNombrePaciente');
    sessionStorage.removeItem('otrosNombresPaciente');
    sessionStorage.removeItem('apellidoPaternoPaciente');
    sessionStorage.removeItem('apellidoMaternoPaciente');
    sessionStorage.removeItem('fechaNacimientoPaciente');
    sessionStorage.removeItem('generoPaciente');
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
    const idProfesion = item.getAttribute('data-id-profesion')?.trim() || '';
    const profesionPersonal = item.getAttribute('data-profesion')?.trim() || '';
    const colegiaturaPersonal = item.getAttribute('data-numero-colegiatura')?.trim() || '';
    const especialidadPersonal = item.getAttribute('data-especialidad')?.trim() || '';
    const numeroEspecialidad = item.getAttribute('data-numero-especialidad')?.trim() || '';

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

    // Guardar el valor del tipo de documento en sessionStorage
    sessionStorage.setItem('numeroDocumentoPersonal', numeroDocumentoPersonal);
    sessionStorage.setItem('nombresCompletoPersonal', nombresCompletoPersonal);
    sessionStorage.setItem('colegiaturaPersonal', colegiaturaPersonal);
    sessionStorage.setItem('idProfesion', idProfesion);
    sessionStorage.setItem('especialidadPersonal', especialidadPersonal);
    sessionStorage.setItem('numeroEspecialidad', numeroEspecialidad);

    // Ocultar el formulario de búsqueda de personal
    document.getElementById('form-personal').classList.remove('d-none');
    // Limpiar y ocultar resultados
    limpiarOcultar();

    // 👇 Mapeo de idProfesion a códigos
    const profesionCodigos = {
        "1": "056",
        "6": "061",
        "8": "906",
        "9": "200"
    };

    // 👇 Lógica corregida para buscar prestación
    if (profesionCodigos.hasOwnProperty(idProfesion)) {
        const codigoIdProfesion = profesionCodigos[idProfesion];
        const codigoPrestacionInput = document.getElementById('codigo-prestacion');

        // Asignar valor y disparar búsqueda
        codigoPrestacionInput.value = codigoIdProfesion;
        buscarPrestacion(codigoIdProfesion); // Esto asume que buscarPrestacion() está definida/importada
    }
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

// Agrega esto donde manejas el evento de borrado (input o keydown)
export function limpiarDatosCIE10() {
    document.getElementById('descripcion-cie10').value = '';
    sessionStorage.removeItem('codigoCIE10');
    sessionStorage.removeItem('descripcionCIE10');
}

// Ejemplo de uso en evento input:
document.getElementById('codigo-cie10').addEventListener('input', function () {
    if (this.value.trim() === '') {
        limpiarDatosCIE10();
    }
});

// Función para verificar el estado de los formularios
export function actualizarEstadoBotonImprimir() {
    const formPaciente = document.getElementById('form-paciente');
    const formPersonal = document.getElementById('form-personal');
    const btnImprimir = document.getElementById('btn-imprimir');
    const mensajeImpresion = document.getElementById('mensaje-impresion');

    // Verificar si ambos formularios están visibles
    const ambosVisibles = !formPaciente.classList.contains('d-none') &&
                            !formPersonal.classList.contains('d-none');

    // Habilitar/deshabilitar botón
    btnImprimir.disabled = !ambosVisibles;

    // Ocultar mensaje cuando ambos formularios son visibles, mostrarlo en caso contrario
    mensajeImpresion.classList.toggle('visible', !ambosVisibles);
}

// Observar cambios en los formularios
const observer = new MutationObserver(actualizarEstadoBotonImprimir);

// Configurar qué observar
const config = { attributes: true, attributeFilter: ['class'] };

// Comenzar a observar ambos formularios
observer.observe(document.getElementById('form-paciente'), config);
observer.observe(document.getElementById('form-personal'), config);

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    actualizarEstadoBotonImprimir();

    // También puedes llamar a esta función cuando:
    // - Selecciones un paciente
    // - Selecciones personal
    // - Cierres formularios
});