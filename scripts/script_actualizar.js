document.getElementById('uploadForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = this;
    const formData = new FormData(form);
    const responseDiv = document.getElementById('response');
    const button = document.querySelector('.btn-upload');
    const spinner = button.querySelector('.spinner');
    const btnText = button.querySelector('.btn-text');
    const progressBar = document.getElementById('uploadProgress');
    const uploadStatus = document.getElementById('uploadStatus');

    // Reset UI
    spinner.style.display = 'inline-block';
    btnText.textContent = 'SUBIENDO...';
    button.disabled = true;
    responseDiv.textContent = '';
    responseDiv.className = '';
    progressBar.style.display = 'block';
    progressBar.value = 0;
    uploadStatus.textContent = '';

    try {
        const xhr = new XMLHttpRequest();

        // Configurar eventos de progreso
        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);
                progressBar.value = percent;
                uploadStatus.textContent = `Subiendo archivo... ${percent}%`;

                // Animación suave de la barra
                progressBar.style.transition = 'width 0.3s ease';
            }
        });

        xhr.upload.onload = () => {
            btnText.textContent = 'PROCESANDO...';
            uploadStatus.textContent = 'Archivo subido. Procesando datos...';

            // Barra de progreso al 100% (subida completada)
            progressBar.value = 100;
            progressBar.style.transition = 'none'; // Elimina animación para el último paso

            // Opcional: Cambiar color de la barra para "procesamiento"
            progressBar.classList.add('processing');
        };

        // Manejar respuesta
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                resetUI();

                if (xhr.status === 200) {
                    handleSuccessResponse(xhr);
                } else {
                    handleErrorResponse(xhr);
                }
            }
        };

        xhr.open('POST', 'procesar_csv.php', true);
        xhr.timeout = 60000; // 1 minuto timeout
        xhr.send(formData);

    } catch (error) {
        console.error('Error:', error);
        handleNetworkError();
    }

    function resetUI() {
        spinner.style.display = 'none';
        btnText.textContent = 'SUBIR ARCHIVO';
        button.disabled = false;
        progressBar.style.display = 'none';
        uploadStatus.textContent = '';
    }

    function handleSuccessResponse(xhr) {
        try {
            const response = JSON.parse(xhr.responseText);

            if (response.success) {
                // Construye el mensaje de éxito dinámicamente
                let successHTML = `
                    <h3>Resultado de la importación</h3>
                    <p><strong>Registros insertados:</strong> ${response.inserted}</p>
                `;

                if (response.errors > 0) {
                    successHTML += `<p><strong>Registros con errores:</strong> ${response.errors}</p>`;
                }

                successHTML += `<p>${response.message}</p>`;

                responseDiv.innerHTML = successHTML;
                responseDiv.className = 'show success';
                form.reset();
                document.querySelector('.file-label').textContent = 'Seleccionar archivo CSV';
            } else {
                // Manejo de errores del servidor (ej: validación fallida)
                responseDiv.textContent = response.message;
                responseDiv.className = 'show error';
            }
        } catch (e) {
            // Fallback para respuestas no JSON (por compatibilidad)
            console.error("Error parsing JSON:", e);
            const isSuccess = xhr.responseText.includes("Importación completada");
            responseDiv.innerHTML = xhr.responseText;
            responseDiv.className = isSuccess ? 'show success' : 'show error';
        }
    }

    function handleErrorResponse(xhr) {
        const errorMsg = xhr.status === 0 ?
            'Error de conexión. Verifique su red.' :
            `Error ${xhr.status}: ${xhr.statusText}`;

        responseDiv.textContent = errorMsg;
        responseDiv.className = 'show error';
    }

    function handleNetworkError() {
        responseDiv.textContent = 'Error de red. Por favor intente nuevamente.';
        responseDiv.className = 'show error';
        resetUI();
    }
});

// Manejo mejorado de selección de archivos
document.getElementById('inputGroupFile04').addEventListener('change', function (e) {
    const fileInput = this;
    const fileLabel = document.querySelector('.file-label');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];

        // Validar tamaño (ej: 10MB máximo para el ZIP)
        if (file.size > 10 * 1024 * 1024) { // 10MB
            fileLabel.textContent = 'Archivo demasiado grande (máx. 10MB)';
            fileLabel.style.color = 'var(--error-color)';
            fileInput.value = '';
            return;
        }

        // Validar extensión (.zip o .csv)
        if (!file.name.match(/\.(zip|csv)$/i)) {
            fileLabel.textContent = 'Solo se aceptan archivos ZIP o CSV';
            fileLabel.style.color = 'var(--error-color)';
            fileInput.value = '';
            return;
        }

        fileLabel.innerHTML = `📄 ${file.name}`;
        fileLabel.style.color = 'var(--primary-color)';
    } else {
        fileLabel.textContent = 'Seleccionar archivo CSV o ZIP';
        fileLabel.style.color = 'var(--muted-text)';
    }
});

// Implementar drag & drop
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('inputGroupFile04');
const fileName = document.getElementById('fileName');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, unhighlight, false);
});

function highlight() {
    dropZone.classList.add('highlight');
}

function unhighlight() {
    dropZone.classList.remove('highlight');
}

dropZone.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    if (files.length) {
        fileInput.files = files;
        updateFileName();
    }
}

function updateFileName() {
    if (fileInput.files.length) {
        fileName.textContent = fileInput.files[0].name;
    }
}