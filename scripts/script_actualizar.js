document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = this;
    const formData = new FormData(form);
    const responseDiv = document.getElementById('response');
    const button = document.querySelector('.btn-upload');
    const spinner = button.querySelector('.spinner');
    const btnText = button.querySelector('.btn-text');
    const progressBar = document.getElementById('uploadProgress');
    const uploadStatus = document.getElementById('uploadStatus');

    // Reset
    spinner.style.display = 'inline-block';
    btnText.textContent = 'SUBIENDO...';
    button.disabled = true;
    responseDiv.innerHTML = '';
    responseDiv.className = '';
    progressBar.style.display = 'block';
    progressBar.value = 0;
    uploadStatus.textContent = '';

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', function (e) {
        if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            progressBar.value = percent;
            uploadStatus.textContent = `Subiendo archivo... ${percent}%`;
        }
    });

    xhr.upload.onload = function () {
        // Subida completa, ahora el servidor está procesando
        btnText.textContent = 'PROCESANDO...';
        uploadStatus.textContent = 'Archivo subido. Procesando datos...';
    };

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            spinner.style.display = 'none';
            btnText.textContent = 'SUBIR ARCHIVO';
            button.disabled = false;
            progressBar.style.display = 'none';
            uploadStatus.textContent = '';

            if (xhr.status === 200) {
                responseDiv.innerHTML = xhr.responseText;
                responseDiv.className = xhr.responseText.includes("Importación completada") ? 'show success' : 'show error';
            } else {
                responseDiv.innerHTML = "Error al subir el archivo. Por favor intente nuevamente.";
                responseDiv.className = 'show error';
            }
        }
    };

    xhr.open('POST', 'procesar_csv.php');
    xhr.send(formData);
});
