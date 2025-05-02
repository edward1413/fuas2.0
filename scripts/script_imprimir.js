document.getElementById("btn-imprimir").addEventListener("click", function () {
    const data = {
        nombres: document.getElementById("nombres_paciente").value,
        apellidoPaterno: document.getElementById("apellido_paterno_paciente").value,
        apellidoMaterno: document.getElementById("apellido_materno_paciente").value,
        fechaNacimiento: document.getElementById("fecha_nacimiento").value,
        numeroDocumento: document.getElementById("documento_paciente").value,
        genero: document.getElementById("genero-paciente").value,
        prestacion: document.getElementById("codigo_prestacion").value,
        codigoCIE10: document.getElementById("codigo_cie10").value,
        descripcionCIE10: document.getElementById("descripcion_cie10").value,
        profesionalNombre: document.getElementById("nombres_completos_personal").value,
        profesion: document.getElementById("profesion_personal").value,
        numeroColegiatura: document.getElementById("colegiatura_personal").value,
        especialidad: document.getElementById("especialidad").value,
        numeroEspecialidad: document.getElementById("numero_especialidad_personal").value,
        dni: document.getElementById("dni_personal").value,
        idProfesion: document.getElementById("id_profesion").value,
        lugarAtencion: document.querySelector('input[name="lugar_atencion"]:checked')?.id || '',
        tipoAtencion: document.querySelector('input[name="tipo_atencion"]:checked')?.id || '',
    };

    localStorage.setItem("datosFua", JSON.stringify(data));
    window.open("print-fua.html", "_blank");
});

document.addEventListener('DOMContentLoaded', function () {

    console.log("scripts_imprimir.js cargado correctamente");
    const btn = document.getElementById("btn-imprimir");

    if (btn) {
        btn.addEventListener("click", function () {
            // Oculta todas las X y la fecha/hora
            document.querySelectorAll("#print-marks .x-mark").forEach(el => el.style.display = "none");

            const lugarAtencion = document.querySelector('input[name="lugar_atencion"]:checked')?.value;
            if (lugarAtencion === "intramural") {
                document.getElementById("x-intramural").style.display = "block";
            } else if (lugarAtencion === "extramural") {
                document.getElementById("x-extramural").style.display = "block";
            }

            // Obtener fecha y hora actual
            const now = new Date();
            const dia = String(now.getDate()).padStart(2, '0');
            const mes = String(now.getMonth() + 1).padStart(2, '0'); // +1 porque enero es 0
            const anio = String(now.getFullYear());
            const hora = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');

            // Mostrar fecha y hora
            document.getElementById("fecha-dia").textContent = dia;
            document.getElementById("fecha-mes").textContent = mes;
            document.getElementById("fecha-anio").textContent = anio;
            document.getElementById("hora-impresion").textContent = hora;

            document.getElementById("fecha-dia").style.display = "block";
            document.getElementById("fecha-mes").style.display = "block";
            document.getElementById("fecha-anio").style.display = "block";
            document.getElementById("hora-impresion").style.display = "block";

            // Mostrar fecha de nacimiento separada
            const fechaNacimiento = document.getElementById("fecha_nacimiento").value.trim();
            if (fechaNacimiento) {
                const [anioNac, mesNac, diaNac] = fechaNacimiento.split("-"); // Formato esperado: YYYY-MM-DD

                // Asegúrate de tener elementos en tu HTML donde mostrar estos valores
                document.getElementById("fecha-nacimiento-dia").textContent = diaNac;
                document.getElementById("fecha-nacimiento-mes").textContent = mesNac;
                document.getElementById("fecha-nacimiento-anio").textContent = anioNac;

                document.getElementById("fecha-nacimiento-dia").style.display = "block";
                document.getElementById("fecha-nacimiento-mes").style.display = "block";
                document.getElementById("fecha-nacimiento-anio").style.display = "block";
            }

            // Obtener datos del paciente
            const nombresPaciente = document.getElementById("nombres_paciente").value.trim();
            const apellidoPaterno = document.getElementById("apellido_paterno_paciente").value.trim();
            const apellidoMaterno = document.getElementById("apellido_materno_paciente").value.trim();

            // Obtener y mostrar prestacion
            const prestacion = document.getElementById("codigo_prestacion").value.trim();
            document.getElementById("prestacion-fua").textContent = prestacion;
            document.getElementById("prestacion-fua").style.display = "block";

            // Obtener y mostrar CODIGO CIE10
            const codigoCIE10 = document.getElementById("codigo_cie10").value.trim();
            document.getElementById("codigo-cie10").textContent = codigoCIE10;
            document.getElementById("codigo-cie10").style.display = "block";

            // Obtener y mostrar DESCRIPCION CIE10
            const descripcionCIE10 = document.getElementById("descripcion_cie10").value.trim();
            document.getElementById("descripcion-cie10").textContent = descripcionCIE10;
            document.getElementById("descripcion-cie10").style.display = "block";

            // Separar primer nombre y otros nombres
            let primerNombre = "", otrosNombres = "";
            if (nombresPaciente.includes(" ")) {
                const partes = nombresPaciente.split(" ");
                primerNombre = partes[0];
                otrosNombres = partes.slice(1).join(" ");
            } else {
                primerNombre = nombresPaciente;
                otrosNombres = "";
            }

            // Mostrar datos en sus posiciones
            document.getElementById("primer-nombre").textContent = primerNombre;
            document.getElementById("otros-nombres").textContent = otrosNombres;
            document.getElementById("apellido-paterno").textContent = apellidoPaterno;
            document.getElementById("apellido-materno").textContent = apellidoMaterno;

            document.getElementById("primer-nombre").style.display = "block";
            document.getElementById("otros-nombres").style.display = "block";
            document.getElementById("apellido-paterno").style.display = "block";
            document.getElementById("apellido-materno").style.display = "block";

            // Ahora el tipo de documento
            const tipoDocumentoID = document.getElementById("id_tipo_documento_paciente").value.trim();
            const numeroDocumento = document.getElementById("documento_paciente").value.trim();

            // GENERO PACIENTE
            const genero = document.getElementById("genero-paciente").value.trim();
            const generoMarca = document.getElementById("genero-paciente-marca");

            // Oculta cualquier contenido anterior
            generoMarca.textContent = '';
            generoMarca.style.display = "none";

            // Establece posición según el género
            if (genero === "M") {
                generoMarca.textContent = "X";
                generoMarca.style.top = "9cm";
                generoMarca.style.left = "2.5cm";
                generoMarca.style.position = "absolute";
                generoMarca.style.display = "block";
            } else if (genero === "F") {
                generoMarca.textContent = "X";
                generoMarca.style.top = "9.3cm";
                generoMarca.style.left = "2.5cm";
                generoMarca.style.position = "absolute";
                generoMarca.style.display = "block";
            }

            // Profesional
            const nombreProfesional = document.getElementById("nombres_completos_personal").value.trim();
            const colegiatura = document.getElementById("colegiatura_personal").value.trim();
            const profesion = document.getElementById("profesion_personal").value.trim();

            document.getElementById("numero-documento-duplicado").textContent = numeroDocumento;
            document.getElementById("numero-documento-duplicado").style.display = "block";

            // Obtener el número de RNE y el DNI del profesional
            const rneProfesional = document.getElementById("especialidad_personal").value.trim();
            const dniProfesional = document.getElementById("dni_personal").value.trim();

            // Mostrar el número de RNE y el DNI
            document.getElementById("rne-profesional").textContent = rneProfesional;
            document.getElementById("dni-profesional").textContent = dniProfesional;

            // Asegurarte de que se muestren en pantalla
            document.getElementById("rne-profesional").style.display = "block";
            document.getElementById("dni-profesional").style.display = "block";


            // Mostrar en hoja paciente
            document.getElementById("tipo-documento").textContent = tipoDocumentoID;
            document.getElementById("numero-documento").textContent = numeroDocumento;

            // Mostrar en hoja profesional
            document.getElementById("nombre-profesional").textContent = nombreProfesional;
            document.getElementById("colegiatura-profesional").textContent = colegiatura;
            document.getElementById("profesion-profesional").textContent = profesion;


            document.getElementById("tipo-documento").style.display = "block";
            document.getElementById("numero-documento").style.display = "block";
            document.getElementById("nombre-profesional").style.display = "block";
            document.getElementById("colegiatura-profesional").style.display = "block";
            document.getElementById("profesion-profesional").style.display = "block";

            // Siempre marcar "X" en citado en la posición deseada
            document.getElementById("citado-fua").textContent = "X";
            document.getElementById("citado-fua").style.display = "block";
            document.getElementById("atencion-directa").textContent = "X";
            document.getElementById("atencion-directa").style.display = "block";
            document.getElementById("de-la-ipress").textContent = "X";
            document.getElementById("de-la-ipress").style.display = "block";
            document.getElementById("atencion-ambulatoria").textContent = "X";
            document.getElementById("atencion-ambulatoria").style.display = "block";

            // ETNIA
            document.getElementById("etnia").style.display = "block";

            console.log("Todo listo, imprimiendo...");
            window.print();
        });
    }
});