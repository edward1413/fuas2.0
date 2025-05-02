<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ACTUALIZAR USUARIOS</title>
    <link rel="stylesheet" href="styles/styles_actualizar.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="icon" type="image/png" href="imagenes/Logo.png">
</head>

<body>
    <div class="container-fluid">
        <!-- Título y subtítulo -->
        <header class="page-header">
            <h1>ACTUALIZAR USUARIOS</h1>
            <p class="subtitle">Sube un archivo CSV con los datos de los usuarios a actualizar</p>
        </header>

        <!-- Formulario de carga -->
        <form id="uploadForm" method="post" enctype="multipart/form-data" class="upload-container">
            <div class="form-group">
                <label for="inputGroupFile04" class="file-label">Seleccionar archivo CSV</label>
                <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="fileHelp" name="file"
                    accept=".csv" required>
                <small id="fileHelp" class="help-text">Solo se aceptan archivos .csv con un tamaño máximo de 5MB</small>
            </div>
            <button type="submit" class="btn-upload">
                <span class="spinner" aria-hidden="true"></span>
                <span class="btn-text">SUBIR ARCHIVO</span>
            </button>
            <!-- Barra de progreso -->
            <progress id="uploadProgress" value="0" max="100" style="width: 100%; display: none;"></progress>
            <p id="uploadStatus" class="help-text"></p>
        </form>

        <!-- Respuesta del servidor -->
        <div id="response" role="alert"></div>
    </div>

    <!-- Pie de página -->
    <footer class="site-footer">
        <div class="footer-content">
            <p><strong>Edward Rivera Moreno</strong> - Ingeniero de Sistemas</p>
            <p>Centro de Salud Mental Comunitario Dos de Junio</p>
            <p>
                <i class="bi bi-telephone-fill" style="color: #28a745;"></i> <strong>Fijo:</strong> (043) 700697
            </p>
            <div class="social-links">
                <a href="https://www.facebook.com/profile.php?id=100069548143051" target="_blank"><i
                        class="bi bi-facebook"></i> Facebook CSMC DOS DE JUNIO</a>
            </div>
            <p>&copy; 2025 Todos los derechos reservados.</p>
        </div>
    </footer>

    <script src="scripts/script_actualizar.js"></script>
</body>

</html>