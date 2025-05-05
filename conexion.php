<?php
// =============================
// Configuración general
// =============================

if (!defined('ROOT_PATH')) {
    define('ROOT_PATH', __DIR__);
}

if (!defined('BASE_URL')) {
    define('BASE_URL', 'http://' . $_SERVER['HTTP_HOST'] . '/fuas_csmcddj/');
}

// =============================
// Configuración de base de datos
// =============================

if (!defined('DB_HOST')) {
    define('DB_HOST', 'localhost');
}

if (!defined('DB_USER')) {
    define('DB_USER', 'fua_user');
}

if (!defined('DB_PASS')) {
    define('DB_PASS', '340860');
}

if (!defined('DB_NAME')) {
    define('DB_NAME', 'impresion_fuas');
}

// =============================
// Manejo de sesiones
// =============================

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// =============================
// Conexión a la base de datos
// =============================

$conexion = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Establecer codificación de caracteres
$conexion->set_charset("utf8mb4");

// Verificar la conexión
if ($conexion->connect_error) {
    die("Error de conexión a la base de datos: " . $conexion->connect_error);
}

// =============================
// Manejo de errores
// =============================

if ($_SERVER['HTTP_HOST'] === 'localhost') {
    // Mostrar errores en desarrollo
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    // Silenciar errores en producción y loguearlos
    error_reporting(0);
    ini_set('display_errors', 0);
    ini_set('log_errors', 1);
    ini_set('error_log', ROOT_PATH . '/logs/error_log.txt');
}
?>