<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CENTRO DE SALUD MENTAL COMUNITARIO DOS DE JUNIO</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <link rel="stylesheet" type="text/css" href="https://npmcdn.com/flatpickr/dist/themes/dark.css">
    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
    <link rel="icon" href="img/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="css/estilos.css">
</head>

<body>
    <div class="container-fluid">
        <header class="modern-header fade-in">
            <div class="d-flex align-items-center justify-content-center gap-3">
                <img src="img/favicon.png" alt="Logotipo del Centro de Salud Mental Comunitario Dos de Junio"
                    class="me-sm-3 mb-2 mb-sm-0" style="width: 60px; height: auto;">
                <div>
                    <h1>CENTRO DE SALUD MENTAL COMUNITARIO DOS DE JUNIO</h1>
                    <p class="text-center subtitle mb-0">SISTEMA DE IMPRESION DE FUAS</p>
                </div>
            </div>
        </header>
        <main>
            <!-- Sección de búsqueda de paciente y personal -->
            <div class="row g-4 mb-3">
                <!-- Paciente -->
                <div class="col-lg-6">
                    <div class="modern-card paciente-card fade-in">
                        <div class="modern-card-header">
                            <h3><i class="bi bi-person-badge me-2"></i>BUSCAR PACIENTE</h3>
                        </div>
                        <div class="modern-card-body">
                            <div class="form-group position-relative">
                                <input type="text" id="buscar-paciente" class="modern-input"
                                    placeholder="Ingrese DNI, nombres o apellidos del paciente" autocomplete="off">
                                <div id="resultados-paciente" class="search-results d-none"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Datos del paciente -->
                    <div id="form-paciente" class="modern-card mt-3 d-none fade-in">
                        <div class="modern-card-header form-grid">
                            <div class="row">
                                <div class="col-md-7">
                                    <h3><i class="bi bi-journal-text me-2"></i>DATOS DEL PACIENTE</h3>
                                </div>
                                <div class="col-md-1">
                                    <label class="modern-switch">
                                        <input type="checkbox" id="codigoAfiliado" checked>
                                        <span class="switch-slider"></span>
                                    </label>
                                </div>
                                <div class="col-md-4">
                                    <h3>
                                        <label for="codigoAfiliado">Código de Afiliado</label>
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div class="modern-card-body">
                            <div class="form-grid form-grid-3">
                                <div class="form-group">
                                    <label class="form-label">Nombres</label>
                                    <input type="text" id="nombres-paciente" class="modern-input" readonly>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Apellido Paterno</label>
                                    <input type="text" id="apellido-paterno-paciente" class="modern-input" readonly>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Apellido Materno</label>
                                    <input type="text" id="apellido-materno-paciente" class="modern-input" readonly>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Documento de Identidad</label>
                                    <input type="text" id="documento-paciente" class="modern-input" readonly>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Fecha de Nacimiento</label>
                                    <input type="text" id="fecha-nacimiento-paciente" class="modern-input" readonly>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Edad</label>
                                    <input type="text" id="edad-paciente" class="modern-input" readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Personal -->
                <div class="col-lg-6">
                    <div class="modern-card personal-card fade-in">
                        <div class="modern-card-header">
                            <h3><i class="bi bi-person-video3 me-2"></i>BUSCAR PERSONAL</h3>
                        </div>
                        <div class="modern-card-body">
                            <div class="form-group position-relative">
                                <input type="text" id="buscar-personal" class="modern-input"
                                    placeholder="Ingrese DNI o nombres del personal" autocomplete="off">
                                <div id="resultados-personal" class="search-results d-none"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Datos del personal -->
                    <div id="form-personal" class="modern-card mt-3 d-none fade-in">
                        <div class="modern-card-header">
                            <h3><i class="bi bi-person-workspace me-2"></i>DATOS DEL PERSONAL</h3>
                        </div>
                        <div class="modern-card-body">
                            <div class="form-grid">
                                <div class="row">
                                    <div class="col-md-3">
                                        <label class="form-label">DNI</label>
                                        <input type="text" id="documento-personal" class="modern-input" readonly>
                                    </div>
                                    <div class="col-md-9">
                                        <label class="form-label">Nombres Completos</label>
                                        <input type="text" id="nombres-completos-personal" class="modern-input"
                                            readonly>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <label class="form-label">Profesión</label>
                                        <input type="text" id="profesion-personal" class="modern-input" readonly>
                                    </div>
                                    <div class="col-md-4">
                                        <label class="form-label">Colegiatura</label>
                                        <input type="text" id="colegiatura-personal" class="modern-input" readonly>
                                    </div>
                                    <div class="col-md-4">
                                        <label class="form-label">Especialidad</label>
                                        <input type="text" id="numero-especialidad-personal" class="modern-input"
                                            readonly>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sección de prestación y configuraciones -->
            <div class="row g-4 mb-3">
                <!-- Prestación -->
                <div class="col-md-5">
                    <div class="modern-card fade-in">
                        <div class="modern-card-header">
                            <h3><i class="bi bi-card-checklist me-2"></i>PRESTACIÓN</h3>
                        </div>
                        <div class="modern-card-body">
                            <div class="form-grid form-grid-2" style="grid-template-columns: 120px 1fr;">
                                <div class="form-group">
                                    <input type="text" id="codigo-prestacion" class="modern-input" placeholder="Código"
                                        required>
                                </div>
                                <div class="form-group">
                                    <input type="text" id="descripcion-prestacion" class="modern-input"
                                        placeholder="Descripción de la prestación" readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Lugar de atención -->
                <div class="col-md-3">
                    <div class="modern-card fade-in">
                        <div class="modern-card-header">
                            <h3><i class="bi bi-geo-alt me-2"></i>LUGAR DE ATENCIÓN</h3>
                        </div>
                        <div class="modern-card-body">
                            <div class="modern-radio-group">
                                <label class="modern-radio">
                                    <input type="radio" name="lugar-atencion" id="intramural" value="intramural"
                                        checked>
                                    <span class="radio-label">Intramural</span>
                                </label>
                                <label class="modern-radio">
                                    <input type="radio" name="lugar-atencion" id="extramural" value="extramural">
                                    <span class="radio-label">Extramural</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Fecha y hora -->
                <div class="col-md-4">
                    <div class="modern-card fade-in">
                        <div class="modern-card-header form-grid">
                            <div class="row">
                                <div class="col-md-5">
                                    <h3>
                                        <label for="switchdatetime"><i class="bi bi-calendar-event me-2"></i>FECHA Y
                                            HORA</label>
                                    </h3>
                                </div>
                                <div class="col-md-1">
                                    <label class="modern-switch">
                                        <input type="checkbox" id="switchdatetime">
                                        <span class="switch-slider"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="modern-card-body row">
                            <div class="col-md-6 pr-0">
                                <input type="text" id="date-time" class="modern-input"
                                    placeholder="Seleccionar fecha y hora" disabled>
                            </div>
                            <div class="col-md-6">
                                <div class="status-indicator status-disabled" id="fecha-deshabilitada">
                                    <i class="bi bi-lock-fill"></i>
                                    <span>Fecha deshabilitada</span>
                                </div>
                                <div class="status-indicator status-enabled" id="fecha-habilitada"
                                    style="display: none;">
                                    <i class="bi bi-unlock-fill"></i>
                                    <span>Fecha habilitada</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Diagnóstico -->
            <div class="modern-card mb-3 fade-in">
                <div class="modern-card-header form-grid">
                    <div class="row">
                        <div class="col-md-2">
                            <h3>
                                <label for="switchcie10"><i class="bi bi-clipboard2-pulse me-2"></i>DIAGNÓSTICO</label>
                            </h3>
                        </div>
                        <div class="col-md-1">
                            <label class="modern-switch">
                                <input type="checkbox" id="switchcie10">
                                <span class="switch-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modern-card-body">
                    <div class="form-group position-relative mb-3">
                        <input type="text" id="buscar-cie10" class="modern-input"
                            placeholder="Buscar diagnóstico CIE-10..." autocomplete="off" disabled>
                        <div id="resultado-cie10" class="search-results d-none"></div>
                    </div>

                    <div class="form-grid form-grid-2" style="grid-template-columns: 150px 1fr;">
                        <div class="form-group" style="margin-bottom: 0.5rem;">
                            <input type="text" id="codigo-cie10" class="modern-input" placeholder="Código" disabled>
                        </div>
                        <div class="form-group">
                            <input type="text" id="descripcion-cie10" class="modern-input"
                                placeholder="Descripción del diagnóstico" readonly disabled>
                        </div>
                    </div>

                    <div class="status-indicator status-disabled" id="mensaje-deshabilitado">
                        <i class="bi bi-lock-fill"></i>
                        <span>Los campos están deshabilitados</span>
                    </div>
                    <div class="status-indicator status-enabled" id="mensaje-habilitado" style="display: none;">
                        <i class="bi bi-unlock-fill"></i>
                        <span>Los campos están habilitados</span>
                    </div>
                </div>
            </div>

            <!-- Botones de acción -->
            <div class="text-center">
                <button id="btn-imprimir1" type="button" class="modern-btn btn-primary me-3">
                    <i class="bi bi-printer-fill"></i>
                    Imprimir A4
                </button>
                <button id="btn-imprimir2" type="button" class="modern-btn btn-success me-3">
                    <i class="bi bi-printer-fill"></i>
                    Imprimir Nuevo
                </button>
                <button id="btn-limpiar" type="button" class="modern-btn btn-warning">
                    <i class="bi bi-eraser-fill"></i>
                    Limpiar
                </button>
            </div>
        </main>
    </div>

    <!-- Footer moderno -->
    <footer class="site-footer form-grid">
        <div class="footer-content row">
            <div class="footer-brand col-md-3">
                <img src="img/favicon.png" alt="Logo CSMC" width="40">
                <p><strong>Centro de Salud Mental Comunitario<br>Dos de Junio</strong></p>
            </div>
            <div class="footer-contact col-md-3">
                <p><i class="bi bi-geo-alt-fill"></i> Av. Los Incas Mz. I - Lt. 2, Chimbote</p>
                <p><i class="bi bi-telephone-fill"></i> <strong>Fijo: </strong> (043) 700697</p>
                <p><i class="bi bi-envelope-fill"></i> csmcdosdejunio2020@gmail.com</p>
            </div>

            <div class="footer-social col-md-3">
                <a href="https://www.facebook.com/profile.php?id=100069548143051" target="_blank"
                    aria-label="Facebook CSMC"><i class="bi bi-facebook"></i> Facebook CSMC DOS DE JUNIO
                </a>
            </div>

            <div class="footer-legal col-md-3">
                <p>&copy; 2025 CSMC Dos de Junio. Todos los derechos reservados.</p>
                <p><small>v3.1 | Última actualización: Mayo 2025</small></p>
                <p>Ingeniero de sistemas - Edward Rivera Moreno</p>
            </div>
        </div>
    </footer>

    <!-- Bootstrap 5 JS  para el Bundle con el Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- JS de Flatpickr -->
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    <!-- Traducción al español -->
    <script src="https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/es.js"></script>
    <!-- Tus scripts personalizados -->
    <script type="module" src="js/scripts.js"></script>
    <script type="module" src="js/script_pacientes.js"></script>
    <script type="module" src="js/script_personal.js"></script>
    <script type="module" src="js/script_diagnostico.js"></script>
    <script src="js/script_prestacion.js"></script>
    <script src="js/script_imprimir_a4.js"></script>
    <script src="js/script_imprimir_new.js"></script>
    <script src="js/script_limpiar.js"></script>
</body>

</html>