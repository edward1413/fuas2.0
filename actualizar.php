<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ACTUALIZAR USUARIOS | CSMC DDOS DE JUNIO</title>
    <meta name="description" content="Sistema de actualización masiva de usuarios">

    <!-- Preload critical resources -->
    <link rel="preload" href="styles/styles_actualizar.css" as="style">
    <link rel="preload" href="scripts/script_actualizar.js" as="script">

    <!-- CSS -->
    <link rel="stylesheet" href="styles/styles_actualizar.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="imagenes/favicon.png">
    <link rel="apple-touch-icon" href="imagenes/favicon.png">

    <!-- Preconnect to external domains -->
    <link rel="preconnect" href="https://cdn.jsdelivr.net">
</head>

<body>
    <div class="container-fluid">
        <!-- Encabezado con logo -->
        <header class="page-header">
            <div class="header-logo">
                <img src="imagenes/favicon.png" alt="Logo CSMC" width="60">
            </div>
            <div>
                <h1>ACTUALIZAR USUARIOS</h1>
                <p class="subtitle">Sube un archivo CSV o ZIP con los datos de los usuarios a actualizar</p>
            </div>
        </header>

        <!-- Formulario de carga mejorado -->
        <form id="uploadForm" method="post" enctype="multipart/form-data" class="upload-container">
            <div class="drag-drop-area" id="dropZone">
                <div class="form-group">
                    <label for="inputGroupFile04" class="file-label">
                        <i class="bi bi-cloud-arrow-up-fill"></i>
                        <span id="fileName">Seleccionar archivo CSV o ZIP</span>
                    </label>
                    <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="fileHelp"
                        name="file" accept=".csv, .zip" required aria-label="Seleccionar archivo CSV o ZIP">
                    <small id="fileHelp" class="help-text">
                        <i class="bi bi-info-circle"></i> Archivos .csv o .zip hasta 5MB.
                    </small>
                </div>
            </div>

            <button type="submit" class="btn-upload" aria-live="polite">
                <span class="spinner" aria-hidden="true"></span>
                <span class="btn-text">SUBIR ARCHIVO</span>
            </button>

            <!-- Feedback visual -->
            <div class="upload-feedback">
                <progress id="uploadProgress" value="0" max="100" aria-label="Progreso de carga"></progress>
                <p id="uploadStatus" class="help-text"></p>
            </div>
        </form>

        <!-- Respuesta del servidor con más estructura -->
        <div id="response" role="alert" aria-atomic="true"></div>

    </div>

    <!-- Pie de página mejorado -->
    <footer class="site-footer">
        <div class="footer-content">
            <div class="footer-brand">
                <img src="imagenes/favicon.png" alt="Logo CSMC" width="40">
                <p><strong>Centro de Salud Mental Comunitario<br>Dos de Junio</p></strong>
            </div>

            <div class="footer-contact">
                <p><i class="bi bi-geo-alt-fill"></i> Av. Los Incas Mz. I - Lt. 2, Chimbote</p>
                <p><i class="bi bi-telephone-fill"></i> <strong>Fijo:</strong> (043) 700697</p>
                <p><i class="bi bi-envelope-fill"></i> csmcdosdejunio2020@gmail.com</p>
            </div>

            <div class="footer-social">
                <a href="https://www.facebook.com/profile.php?id=100069548143051" target="_blank"
                    aria-label="Facebook CSMC"><i class="bi bi-facebook"></i> Facebook CSMC DOS DE JUNIO
                </a>
            </div>

            <div class="footer-legal">
                <p>&copy; 2025 CSMC Dos de Junio. Todos los derechos reservados.</p>
                <p><small>v2.1.0 | Última actualización: Mayo 2025</small></p>
                <p>Ingeniero de sistemas - Edward Rivera Moreno</p>
            </div>
        </div>
    </footer>

    <!-- JavaScript con carga diferida -->
    <script src="scripts/script_actualizar.js" defer></script>
</body>

</html>