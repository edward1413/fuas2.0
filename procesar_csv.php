<?php
set_time_limit(0); // Sin límite de tiempo
ini_set('memory_limit', '512M'); // Aumenta límite de memoria si es necesario

include 'conexion.php';
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    die("<div class='error'>Método no permitido</div>");
}

if (!isset($_FILES['file'])) {
    die("<div class='error'>No se ha subido ningún archivo</div>");
}

$maxFileSize = 5 * 1024 * 1024; // 5MB
$expectedColumns = 21;
$tableName = "maestro_paciente";
$allowedMimeTypes = ['text/csv', 'text/plain', 'application/csv', 'application/vnd.ms-excel'];

if ($_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    die("<div class='error'>Error al subir el archivo: " . $_FILES['file']['error'] . "</div>");
}

if ($_FILES['file']['size'] > $maxFileSize) {
    die("<div class='error'>El archivo excede el tamaño máximo permitido de 5MB</div>");
}

if (!in_array($_FILES['file']['type'], $allowedMimeTypes)) {
    die("<div class='error'>Tipo de archivo no permitido. Solo se aceptan archivos CSV</div>");
}

$file = $_FILES['file']['tmp_name'];
$registrosInsertados = 0;
$errores = 0;
$batchSize = 1000;

$conexion->begin_transaction();

try {
    // Vaciar tabla
    if (!$conexion->query("TRUNCATE TABLE $tableName")) {
        throw new Exception("Error al vaciar la tabla: " . $conexion->error);
    }

    if (($handle = fopen($file, "r")) === FALSE) {
        throw new Exception("Error al abrir el archivo");
    }

    // Saltar encabezado
    fgetcsv($handle, 1000, ",");

    $values = [];

    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        if (count($data) != $expectedColumns) {
            $errores++;
            continue;
        }

        $data = array_map(function ($item) {
            return trim(iconv('Windows-1252', 'UTF-8//IGNORE', $item));
        }, $data);


        $data = array_map([$conexion, 'real_escape_string'], $data);

        foreach ($data as &$value) {
            $value = is_numeric($value) ? $value : "'" . $value . "'";
        }

        $values[] = "(" . implode(",", $data) . ")";
        $registrosInsertados++;

        if (count($values) >= $batchSize) {
            $query = "INSERT INTO $tableName (
                id_paciente, id_tipo_documento_paciente, numero_documento_paciente,
                apellido_paterno_paciente, apellido_materno_paciente, nombres_paciente,
                fecha_nacimiento_paciente, genero_paciente, id_etnia, historia_clinica, ficha_familiar,
                ubigeo_nacimiento, ubigeo_reniec, domicilio_reniec, ubigeo_declarado,
                domicilio_declarado, referencia_domicilio, id_pais, id_establecimiento,
                fecha_alta, fecha_modificacion
            ) VALUES " . implode(",", $values);

            if (!$conexion->query($query)) {
                $errores += count($values);
            }

            $values = []; // limpiar lote
        }
    }

    // Insertar los últimos registros si quedan
    if (!empty($values)) {
        $query = "INSERT INTO $tableName (
            id_paciente, id_tipo_documento_paciente, numero_documento_paciente,
            apellido_paterno_paciente, apellido_materno_paciente, nombres_paciente,
            fecha_nacimiento_paciente, genero_paciente, id_etnia, historia_clinica, ficha_familiar,
            ubigeo_nacimiento, ubigeo_reniec, domicilio_reniec, ubigeo_declarado,
            domicilio_declarado, referencia_domicilio, id_pais, id_establecimiento,
            fecha_alta, fecha_modificacion
        ) VALUES " . implode(",", $values);

        if (!$conexion->query($query)) {
            $errores += count($values);
        }
    }

    fclose($handle);
    $conexion->commit();

    // Prepara los datos para la respuesta (en formato JSON)
    $response = [
        'success' => true,
        'message' => '¡Importación completada con éxito!',
        'inserted' => $registrosInsertados,
        'errors' => $errores
    ];

    header('Content-Type: application/json'); // Cambia el content-type a JSON
    echo json_encode($response); // Envía los datos como JSON

} catch (Exception $e) {
    $conexion->rollback();
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'Error en la importación: ' . $e->getMessage()
    ]);
}