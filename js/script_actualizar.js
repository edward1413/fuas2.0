// Configuración global
const CONFIG = {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedExtensions: ['csv', 'zip'],
    uploadTimeout: 120000, // 2 minutos
    apiEndpoint: 'procesar_csv.php'
};

// Elementos del DOM
const elements = {
    form: document.getElementById('uploadForm'),
    fileInput: document.getElementById('inputGroupFile04'),
    dropZone: document.getElementById('dropZone'),
    fileName: document.getElementById('fileName'),
    fileInfo: document.getElementById('fileInfo'),
    fileDetails: document.getElementById('fileDetails'),
    responseDiv: document.getElementById('response'),
    button: document.querySelector('.btn-upload'),
    spinner: document.querySelector('.spinner'),
    btnText: document.querySelector('.btn-text'),
    progressBar: document.getElementById('uploadProgress'),
    uploadStatus: document.getElementById('uploadStatus')
};

// Clase para manejar validaciones
class FileValidator {
    static validate(file) {
        const errors = [];

        if (file.size > CONFIG.maxFileSize) {
            errors.push(`El archivo es demasiado grande. Máximo ${CONFIG.maxFileSize / (1024 * 1024)}MB`);
        }

        const extension = file.name.split('.').pop().toLowerCase();
        if (!CONFIG.allowedExtensions.includes(extension)) {
            errors.push(`Formato no válido. Solo se aceptan: ${CONFIG.allowedExtensions.join(', ')}`);
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}

// Clase para manejar la UI
class UIManager {
    static showFileInfo(file) {
        const sizeFormatted = (file.size / 1024 / 1024).toFixed(2);
        elements.fileDetails.textContent = `${file.name} (${sizeFormatted} MB)`;
        elements.fileInfo.classList.add('show');
        elements.dropZone.classList.add('validation-success');
    }

    static hideFileInfo() {
        elements.fileInfo.classList.remove('show');
        elements.dropZone.classList.remove('validation-success', 'validation-error');
    }

    static showError(message) {
        elements.fileName.textContent = message;
        elements.dropZone.classList.add('validation-error');
        this.hideFileInfo();
    }

    static resetFileDisplay() {
        elements.fileName.textContent = 'Arrastra tu archivo aquí o haz clic para seleccionar';
        elements.dropZone.classList.remove('validation-success', 'validation-error');
        this.hideFileInfo();
    }

    static updateUploadProgress(percent) {
        elements.progressBar.value = percent;
        elements.uploadStatus.textContent = `Subiendo archivo... ${percent}%`;
    }

    static setLoadingState(isLoading, text = 'SUBIENDO...') {
        elements.spinner.style.display = isLoading ? 'inline-block' : 'none';
        elements.btnText.textContent = isLoading ? text : 'SUBIR ARCHIVO';
        elements.button.disabled = isLoading;
        elements.progressBar.style.display = isLoading ? 'block' : 'none';

        if (!isLoading) {
            elements.uploadStatus.textContent = '';
        }
    }

    static showResponse(content, type = 'success') {
        elements.responseDiv.innerHTML = content;
        elements.responseDiv.className = `show ${type}`;
        elements.responseDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Manejador de eventos del formulario
elements.form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    UIManager.setLoadingState(true);
    elements.responseDiv.className = '';

    try {
        const response = await uploadFile(formData);
        handleUploadResponse(response);
    } catch (error) {
        console.error('Error:', error);
        UIManager.showResponse('Error de red. Por favor intente nuevamente.', 'error');
    } finally {
        UIManager.setLoadingState(false);
    }
});

// Función para subir archivo con XMLHttpRequest
function uploadFile(formData) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);
                UIManager.updateUploadProgress(percent);
            }
        });

        xhr.upload.onload = () => {
            UIManager.setLoadingState(true, 'PROCESANDO...');
            elements.uploadStatus.textContent = 'Archivo subido. Procesando datos...';
            elements.progressBar.value = 100;
        };

        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            } else {
                reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
            }
        };

        xhr.onerror = () => reject(new Error('Error de conexión'));
        xhr.ontimeout = () => reject(new Error('Tiempo de espera agotado'));

        xhr.open('POST', CONFIG.apiEndpoint, true);
        xhr.timeout = CONFIG.uploadTimeout;
        xhr.send(formData);
    });
}

// Manejo de respuesta del servidor
function handleUploadResponse(responseText) {
    try {
        const response = JSON.parse(responseText);

        if (response.success) {
            let successHTML = `
                        <h3><i class="bi bi-check-circle-fill"></i> Importación Completada</h3>
                        <p><strong>Registros procesados:</strong> ${response.inserted || 0}</p>
                    `;

            if (response.errors > 0) {
                successHTML += `<p><strong>Registros con errores:</strong> ${response.errors}</p>`;
            }

            successHTML += `<p>${response.message}</p>`;

            UIManager.showResponse(successHTML, 'success');
            elements.form.reset();
            UIManager.resetFileDisplay();
        } else {
            UIManager.showResponse(`<h3><i class="bi bi-exclamation-triangle-fill"></i> Error</h3><p>${response.message}</p>`, 'error');
        }
    } catch (e) {
        // Fallback para respuestas no JSON
        const isSuccess = responseText.includes("Importación completada") || responseText.includes("éxito");
        UIManager.showResponse(responseText, isSuccess ? 'success' : 'error');
    }
}

// Manejo de selección de archivos
elements.fileInput.addEventListener('change', function (e) {
    const file = this.files[0];

    if (file) {
        const validation = FileValidator.validate(file);

        if (validation.isValid) {
            UIManager.showFileInfo(file);
        } else {
            UIManager.showError(validation.errors[0]);
            this.value = '';
        }
    } else {
        UIManager.resetFileDisplay();
    }
});

// Drag & Drop functionality
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    elements.dropZone.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    elements.dropZone.addEventListener(eventName, () => {
        elements.dropZone.classList.add('highlight');
    }, false);
});

['dragleave', 'drop'].forEach(eventName => {
    elements.dropZone.addEventListener(eventName, () => {
        elements.dropZone.classList.remove('highlight');
    }, false);
});

elements.dropZone.addEventListener('drop', function (e) {
    const files = e.dataTransfer.files;

    if (files.length > 0) {
        elements.fileInput.files = files;

        const file = files[0];
        const validation = FileValidator.validate(file);

        if (validation.isValid) {
            UIManager.showFileInfo(file);
        } else {
            UIManager.showError(validation.errors[0]);
            elements.fileInput.value = '';
        }
    }
}, false);

// Hacer clic en el área de drop para abrir selector
elements.dropZone.addEventListener('click', () => {
    elements.fileInput.click();
});