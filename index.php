<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CENTRO DE SALUD MENTAL COMUNITARIO DOS DE JUNIO</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="styles/styles.css">
    <link rel="icon" type="image/png" href="imagenes/favicon.png">
</head>

<body class="p-3">
    <div class="container-fluid">
        <div class="titulo-con-icono d-flex align-items-center justify-content-center mb-4">
            <img src="imagenes/favicon.png" alt="Ícono" class="me-3" style="width: 50px; height: auto;">
            <h1 class="text-center mb-0">CENTRO DE SALUD MENTAL COMUNITARIO DOS DE JUNIO</h1>
        </div>

        <h1 class="text-center mb-4">IMPRESIÓN DE FUAS</h1>

        <div class="row g-3">
            <!-- Columna izquierda - Paciente -->
            <div class="col-lg-6">
                <div class="card card-dark mb-3">
                    <div class="card-body">
                        <h2 class="section-title">BUSCAR PACIENTE</h2>
                        <input type="text" id="buscar-paciente" class="form-control form-control-sm"
                            placeholder="Ingrese los datos del usuario" autocomplete="off">
                        <div id="resultados-paciente" class="search-results d-none"></div>
                    </div>
                </div>

                <div id="form-paciente" class="card card-dark mb-3 d-none">
                    <div class="card-body compact-form">
                        <div class="row g-2">
                            <div class="col-lg-8">
                                <h2 class="section-title">DATOS DEL PACIENTE</h2>
                            </div>
                            <div class="col-lg-4 d-flex">
                                <input id="codigoAfiliado" class="form-check-input me-2" type="checkbox" checked>
                                <label class="form-check-label" for="codigoAfiliado">CÓDIGO DE AFILIADO</label>
                            </div>
                        </div>
                        <div class="row g-2">
                            <div class="col-md-4">
                                <label class="form-label">Nombres</label>
                                <input type="text" id="nombres-paciente" class="form-control form-control-sm" readonly>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">Apellido paterno</label>
                                <input type="text" id="apellido-paterno-paciente" class="form-control form-control-sm"
                                    readonly>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">Apellido materno</label>
                                <input type="text" id="apellido-materno-paciente" class="form-control form-control-sm"
                                    readonly>
                            </div>
                        </div>
                        <div class="row g-2 mt-1">
                            <div class="col-md-4">
                                <label class="form-label">Doc. Identidad</label>
                                <input type="text" id="documento-paciente" class="form-control form-control-sm"
                                    readonly>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">F. Nacimiento</label>
                                <input type="text" id="fecha-nacimiento-paciente" class="form-control form-control-sm"
                                    readonly>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">Edad</label>
                                <input type="text" id="edad-paciente" class="form-control form-control-sm" readonly>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Columna derecha - personal -->
            <div class="col-lg-6">
                <div class="card card-dark mb-3">
                    <div class="card-body">
                        <h2 class="section-title">BUSCAR PERSONAL</h2>
                        <input type="text" id="buscar-personal" class="form-control form-control-sm"
                            placeholder="Ingrese los datos del personal" autocomplete="off">
                        <div id="resultados-personal" class="search-results d-none"></div>
                    </div>
                </div>

                <div id="form-personal" class="card card-dark mb-3 d-none">
                    <div class="card-body compact-form">
                        <h2 class="section-title">DATOS DEL PERSONAL</h2>
                        <div class="row g-2">
                            <div class="col-md-3">
                                <label class="form-label">DNI</label>
                                <input type="text" id="documento-personal" class="form-control form-control-sm"
                                    readonly>
                            </div>
                            <div class="col-md-9">
                                <label class="form-label">Nombres</label>
                                <input type="text" id="nombres-completos-personal" class="form-control form-control-sm"
                                    readonly>
                            </div>
                        </div>
                        <div class="row g-2 mt-1">
                            <div class="col-md-4">
                                <label class="form-label">Profesión</label>
                                <input type="text" id="profesion-personal" class="form-control form-control-sm"
                                    readonly>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">Colegiatura</label>
                                <input type="text" id="colegiatura-personal" class="form-control form-control-sm"
                                    readonly>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">Especialidad</label>
                                <input type="text" id="numero-especialidad-personal"
                                    class="form-control form-control-sm" readonly>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Fila inferior - Opciones -->
        <div class="row g-3">
            <div class="col-md-6">
                <div class="card card-dark mb-3">
                    <div class="card-body">
                        <h2 class="section-title">PRESTACIÓN</h2>
                        <div class="row g-2">
                            <div class="col-md-3">
                                <input type="text" id="codigo-prestacion" class="form-control form-control-sm"
                                    placeholder="Código prestacional">
                            </div>
                            <div class="col-md-9">
                                <input type="text" id="descripcion-prestacion" class="form-control form-control-sm"
                                    placeholder="Prestación" readonly>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card card-dark">
                    <div class="card-body">
                        <h2 class="section-title">LUGAR DE ATENCIÓN</h2>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="lugar-atencion" id="intramural"
                                value="intramural" checked>
                            <label class="form-check-label" for="intramural">INTRAMURAL</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="lugar-atencion" id="extramural"
                                value="extramural">
                            <label class="form-check-label" for="extramural">EXTRAMURAL</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <div class="card card-dark">
                <div class="card-body">
                    <div class="row g-2">
                        <div class="col-md-2">
                            <label for="switchcie10" class="section-title">DIAGNÓSTICO</label>
                        </div>
                        <div class="col-md-1 form-check form-switch">
                            <input type="checkbox" class="form-check-input" id="switchcie10">
                        </div>
                        <div class="col-md-9">
                            <input type="text" id="buscar-cie10" class="form-control form-control-sm"
                                placeholder="Buscar el diagnóstico aquí" autocomplete="off">
                            <div id="resultado-cie10" class="search-results d-none"></div>
                        </div>
                    </div>
                    <div id="form-diagnostico" class="row g-2">
                        <div class="col-md-3">
                            <input type="text" id="codigo-cie10" class="form-control form-control-sm"
                                placeholder="Código CIE-10">
                        </div>
                        <div class="col-md-9">
                            <input type="text" id="descripcion-cie10" class="form-control form-control-sm"
                                placeholder="Diagnóstico" readonly>
                        </div>
                    </div>
                    <small id="mensaje-deshabilitado" class="text-danger">
                        <i class="fas fa-lock"></i> Los campos están deshabilitados.
                    </small>
                    <small class="text-muted" id="mensaje-habilitado" style="display: none;">
                        <i class="fas fa-unlock text-info"></i> Los campos están habilitados.</small>
                </div>

            </div>
        </div>

        <!-- Botón de imprimir -->
        <div class="text-center mt-4">
            <button id="btn-imprimir" type="button" class="btn btn-print" disabled>
                <i class="bi bi-printer-fill me-2"></i>IMPRIMIR
            </button>
        </div>
        <div class="text-center mt-4">
            <small id="mensaje-impresion" class="text-danger mensaje-impresion">
                <i class="fas fa-lock me-2"></i>Complete los datos del paciente y del personal que atiende.
            </small>

        </div>
    </div>

    <footer class="site-footer">
        <div class="footer-content">
            <div class="footer-brand">
                <img src="imagenes/favicon.png" alt="Logo CSMC" width="40">
                <p><strong>Centro de Salud Mental Comunitario<br>Dos de Junio</p></strong>
            </div>

            <div class="footer-contact">
                <p><i class="bi bi-geo-alt-fill"></i> Av. Los Incas Mz. L' - Lt. 2, Chimbote</p>
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
                <p><small>v2.1.1 | Última actualización: 06 Mayo 2025</small></p>
                <p>Ingeniero de sistemas - Edward Rivera Moreno</p>
            </div>
        </div>
    </footer>

    <!-- Bootstrap 5 JS  para el Bundle con el Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- Tus scripts personalizados -->
    <script type="module" src="scripts/scripts.js"></script>
    <script type="module" src="scripts/script_pacientes.js"></script>
    <script type="module" src="scripts/script_personal.js"></script>
    <script type="module" src="scripts/script_diagnostico.js"></script>
    <script src="scripts/script_prestacion.js"></script>
    <script src="scripts/script_imprimir.js"></script>
</body>

</html>