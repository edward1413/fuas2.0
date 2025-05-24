document.addEventListener('DOMContentLoaded', function () {
    const btnLimpiar = document.getElementById('btn-limpiar');

    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', function () {
            // 1. Limpiar campos de texto y readonly
            const inputsToClear = [
                // Paciente
                'buscar-paciente',
                'nombres-paciente',
                'apellido-paterno-paciente',
                'apellido-materno-paciente',
                'documento-paciente',
                'fecha-nacimiento-paciente',
                'edad-paciente',
                // Personal
                'buscar-personal',
                'documento-personal',
                'nombres-completos-personal',
                'profesion-personal',
                'colegiatura-personal',
                'numero-especialidad-personal',
                // Prestación
                'codigo-prestacion',
                'descripcion-prestacion',
                // Diagnóstico (búsqueda dinámica y entrada directa)
                'buscar-cie10',
                'codigo-cie10',
                'descripcion-cie10',
                // Fecha y Hora
                'date-time'
            ];

            inputsToClear.forEach(id => {
                const inputElement = document.getElementById(id);
                if (inputElement) {
                    inputElement.value = '';
                }
            });

            // 2. Resetear checkboxes y radios a su estado por defecto
            const codigoAfiliadoCheckbox = document.getElementById('codigoAfiliado');
            if (codigoAfiliadoCheckbox) {
                codigoAfiliadoCheckbox.checked = true; // Asumiendo que el default es 'checked'
            }

            const intramuralRadio = document.getElementById('intramural');
            if (intramuralRadio) {
                intramuralRadio.checked = true; // Asumiendo que 'intramural' es el default
            }
            // El radio 'extramural' se desmarcará automáticamente si 'intramural' se marca.

            // 3. Resetear Switches y su UI asociada
            // Switch Fecha y Hora
            const switchDateTime = document.getElementById('switchdatetime');
            if (switchDateTime) {
                switchDateTime.checked = false; // Asumiendo que el default es deshabilitado
                // Disparar el evento 'change' para que se actualice la UI y Flatpickr
                const eventChangeDateTime = new Event('change');
                switchDateTime.dispatchEvent(eventChangeDateTime);
                // Si Flatpickr tiene una instancia global 'flatpickrInstance', también podrías hacer fp.clear()
                const dateTimeInput = document.getElementById('date-time');
                if(dateTimeInput._flatpickr) { // _flatpickr es la instancia usual
                    dateTimeInput._flatpickr.clear();
                }
            }

            // Switch CIE10
            const switchCIE10 = document.getElementById('switchcie10');
            if (switchCIE10) {
                switchCIE10.checked = false; // Asumiendo que el default es deshabilitado
                // Disparar el evento 'change' para que se actualice la UI
                const eventChangeCIE10 = new Event('change');
                switchCIE10.dispatchEvent(eventChangeCIE10);
            }

            // 4. Ocultar contenedores de resultados de búsqueda
            const resultContainersToHide = [
                'resultados-paciente',
                'resultados-personal',
                'resultado-cie10' // Para la búsqueda dinámica de CIE10
            ];
            resultContainersToHide.forEach(id => {
                const container = document.getElementById(id);
                if (container) {
                    container.classList.add('d-none');
                    // También limpiar su contenido por si acaso
                    const listGroup = container.querySelector('.list-group');
                    if(listGroup) listGroup.innerHTML = '';
                }
            });

            // 5. Ocultar formularios de datos de paciente y personal (si se muestran después de buscar)
            const formsToHide = ['form-paciente', 'form-personal'];
            formsToHide.forEach(id => {
                const formElement = document.getElementById(id);
                if (formElement && !formElement.classList.contains('d-none')) { // Solo si está visible
                    // Aquí decides si ocultarlos o no. Si siempre están visibles y solo se pueblan,
                    // la limpieza de inputs ya los vaciará. Si se muestran/ocultan con JS,
                    // entonces sí deberías ocultarlos.
                    // formElement.classList.add('d-none'); // Descomentar si es necesario
                }
            });
            
            // 6. Limpiar sessionStorage
            const sessionStorageKeysToClear = [
                'tipoDocumentoPaciente',
                'primerNombrePaciente',
                'otrosNombresPaciente',
                'apellidoPaternoPaciente',
                'apellidoMaternoPaciente',
                'numeroDocumentoPaciente',
                'fechaNacimientoPaciente',
                'generoPaciente',
                'codigoPrestacion', // De script_prestacion.js
                'descripcionPrestacion', // De script_prestacion.js
                'codigoCIE10', // De script_diagnostico.js (búsqueda directa y dinámica)
                'descripcionCIE10', // De script_diagnostico.js (búsqueda directa y dinámica)
                'numeroDocumentoPersonal',
                'nombresCompletoPersonal',
                'colegiaturaPersonal',
                'idProfesion', // Asegúrate que este es el nombre correcto de la key
                'especialidadPersonal',
                'numeroEspecialidad' // Asegúrate que este es el nombre correcto de la key
            ];

            sessionStorageKeysToClear.forEach(key => {
                sessionStorage.removeItem(key);
            });

            // 7. (Opcional) Enfocar el primer campo de búsqueda
            const primerInput = document.getElementById('buscar-paciente');
            if (primerInput) {
                primerInput.focus();
            }

            console.log('Formulario y sessionStorage limpiados.');
        });
    }
});