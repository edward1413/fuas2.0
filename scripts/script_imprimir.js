// Escucha el clic en el botón con id "btn-imprimir"
document.getElementById('btn-imprimir').addEventListener('click', function () {

    // Crea un iframe oculto donde se cargará el contenido para imprimir
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.top = '-9999px';
    iframe.style.left = '-9999px';
    iframe.src = 'print-fua.html'; // Ruta del archivo HTML que contiene el diseño del FUA
    document.body.appendChild(iframe); // Añade el iframe al cuerpo del documento

    // Espera a que el iframe termine de cargar
    iframe.onload = function () {
        // Obtiene la ventana y el documento dentro del iframe
        const iframeWindow = iframe.contentWindow;
        const iframeDocument = iframe.contentDocument || iframeWindow.document;

        // Verifica que el contenedor con id "print-marks" exista
        const printMarks = iframeDocument.getElementById('print-marks');
        if (!printMarks) {
            console.error("El elemento #print-marks no se encontró en print-fua.html");
            return;
        }

        // 👉 FECHA Y HORA ACTUALES DE IMPRESION
        const now = new Date();
        const dia = String(now.getDate()).padStart(2, '0');          // Día con dos dígitos
        const mes = String(now.getMonth() + 1).padStart(2, '0');     // Mes con dos dígitos (0 = enero)
        const anio = String(now.getFullYear());                      // Año en formato completo
        const hora = String(now.getHours()).padStart(2, '0');        // Hora con dos dígitos
        const minuto = String(now.getMinutes()).padStart(2, '0');    // Minuto con dos dígitos

        // Inserta la fecha en los elementos del iframe
        iframeDocument.getElementById('dia-atencion').textContent = dia;
        iframeDocument.getElementById('mes-atencion').textContent = mes;
        iframeDocument.getElementById('anio-atencion').textContent = anio;

        // Inserta la hora en el elemento correspondiente
        iframeDocument.getElementById('hora-impresion').textContent = `${hora}:${minuto}`;

        // 👉 MARCAR INTRAMURAL / EXTRAMURAL SEGÚN LO SELECCIONADO
        const selectedLugar = document.querySelector('input[name="lugar-atencion"]:checked').value;

        const xIntramural = iframeDocument.getElementById('x-intramural');
        const xExtramural = iframeDocument.getElementById('x-extramural');

        if (selectedLugar === 'intramural') {
            xIntramural.textContent = 'X';   // Mostrar X en intramural
            xExtramural.textContent = '';    // Limpiar extramural
        } else if (selectedLugar === 'extramural') {
            xIntramural.textContent = '';    // Limpiar intramural
            xExtramural.textContent = 'X';   // Mostrar X en extramural
        }

        // 👉 DATOS DEL PACIENTE
        // Obtener el tipo de documento del paciente desde sessionStorage
        const tipoDocumentoPaciente = sessionStorage.getItem('tipoDocumentoPaciente');
        if (tipoDocumentoPaciente) {
            const valorImpresion = (tipoDocumentoPaciente === '1') ? '2' : '3'; // lógica de conversión
            const campoTipoDoc = iframeDocument.getElementById('tipo-documento-paciente');
            if (campoTipoDoc) {
                campoTipoDoc.textContent = valorImpresion;
            }
        }

        // Obtener los datos del paciente desde sessionStorage
        iframeDocument.getElementById('primer-nombre-paciente').textContent = sessionStorage.getItem('primerNombrePaciente') || '';
        iframeDocument.getElementById('otros-nombres-paciente').textContent = sessionStorage.getItem('otrosNombresPaciente') || '';
        iframeDocument.getElementById('apellido-paterno-paciente').textContent = sessionStorage.getItem('apellidoPaternoPaciente') || '';
        iframeDocument.getElementById('apellido-materno-paciente').textContent = sessionStorage.getItem('apellidoMaternoPaciente') || '';
        iframeDocument.getElementById('numero-documento-paciente').textContent = sessionStorage.getItem('numeroDocumentoPaciente') || '';
        iframeDocument.getElementById('numero-historia-clinica').textContent = sessionStorage.getItem('numeroDocumentoPaciente') || '';

        // Fecha de nacimiento del paciente
        const fechaNacimiento = sessionStorage.getItem('fechaNacimientoPaciente');
        if (fechaNacimiento) {
            const [anioNac, mesNac, diaNac] = fechaNacimiento.split('-'); // Asume formato YYYY-MM-DD

            // Asignar día, mes y año a los elementos del iframe
            iframeDocument.getElementById('fecha-nacimiento-dia').textContent = diaNac;
            iframeDocument.getElementById('fecha-nacimiento-mes').textContent = mesNac;
            iframeDocument.getElementById('fecha-nacimiento-anio').textContent = anioNac;
        }

        // Obetener el género del paciente desde sessionStorage
        const generoPaciente = sessionStorage.getItem('generoPaciente');
        if (generoPaciente) {
            const generoPacienteM = iframeDocument.getElementById('genero-paciente-m');
            const generoPacienteF = iframeDocument.getElementById('genero-paciente-f');
            if (generoPaciente === 'M') {
                generoPacienteM.textContent = 'X';   // Mostrar X en masculino
                generoPacienteF.textContent = '';     // Limpiar femenino
            } else if (generoPaciente === 'F') {
                generoPacienteM.textContent = '';     // Limpiar masculino
                generoPacienteF.textContent = 'X';    // Mostrar X en femenino
            }
        }

        // 👉 CÓDIGO DE PRESTACIÓN 
        iframeDocument.getElementById('prestacion-fua').textContent = sessionStorage.getItem('codigoPrestacion') || '';

        // 👉 CÓDIGO Y DESCRIPCIÓN DIAGNOSTICO
        iframeDocument.getElementById('codigo-cie10').textContent = sessionStorage.getItem('codigoCIE10') || '';
        iframeDocument.getElementById('descripcion-cie10').textContent = sessionStorage.getItem('descripcionCIE10') || '';

        // 👉 IMPRIMIR
        iframeWindow.focus();
        iframeWindow.print();

        // 👉 LIMPIAR IFRAME DESPUES
        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 100);
    };
});
