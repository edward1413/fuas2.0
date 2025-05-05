<?php
set_time_limit(0);
ini_set('memory_limit', '512M');
include 'conexion.php';
header('Content-Type: application/json; charset=utf-8');

$registrosInsertados = 0; // Inicializar contador de registros insertados
$errores = 0;            // Inicializar contador de errores

if (!class_exists('ZipArchive')) {
    echo json_encode(['success' => false, 'message' => 'El servidor no soporta ZIP']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

if (!isset($_FILES['file'])) {
    echo json_encode(['success' => false, 'message' => 'No se ha subido ningún archivo']);
    exit;
}

$maxFileSize = 10 * 1024 * 1024; // 10MB
$allowedExtensions = ['zip', 'csv'];

// Validar tipo de archivo
$fileExtension = strtolower(pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION));
if (!in_array($fileExtension, $allowedExtensions)) {
    echo json_encode(['success' => false, 'message' => 'Solo se aceptan archivos ZIP o CSV']);
    exit;
}

if ($_FILES['file']['size'] > $maxFileSize) {
    echo json_encode(['success' => false, 'message' => 'El archivo excede el tamaño máximo (10MB)']);
    exit;
}

$file = $_FILES['file']['tmp_name'];
$csvFile = null;

// Si es un ZIP, extraer el CSV
if ($fileExtension === 'zip') {
    $zip = new ZipArchive;
    if ($zip->open($file) === true) {
        // Buscar un archivo CSV dentro del ZIP
        for ($i = 0; $i < $zip->numFiles; $i++) {
            $filename = $zip->getNameIndex($i);
            if (pathinfo($filename, PATHINFO_EXTENSION) === 'csv') {
                $csvFile = sys_get_temp_dir() . '/' . basename($filename);
                $zip->extractTo(sys_get_temp_dir(), $filename);
                break;
            }
        }
        $zip->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'No se pudo abrir el archivo ZIP']);
        exit;
    }

    if (!$csvFile) {
        echo json_encode(['success' => false, 'message' => 'No se encontró ningún CSV dentro del ZIP']);
        exit;
    }
} else {
    $csvFile = $file; // Si ya es CSV, usarlo directamente
}

// Ahora procesas el CSV como antes...
try {
    $conexion->begin_transaction();
    $maxFileSize = 10 * 1024 * 1024; // 10MB
    $expectedColumns = 21; // Número de columnas esperadas en el CSV
    $tableName = "maestro_paciente";
    $batchSize = 1000; // <- Añade esta línea

    if (!$conexion->query("TRUNCATE TABLE $tableName")) {
        throw new Exception("Error al vaciar la tabla");
    }

    if (($handle = fopen($csvFile, "r")) === false) {
        throw new Exception("Error al abrir el CSV");
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
    echo json_encode([
        'success' => true,
        'message' => '¡Importación completada con éxito!',
        'inserted' => $registrosInsertados,
        'errors' => $errores
    ]);

} catch (Exception $e) {
    $conexion->rollback();
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
} finally {
    if ($fileExtension === 'zip' && $csvFile) {
        unlink($csvFile); // Eliminar el CSV temporal
    }
    $conexion->close();
}