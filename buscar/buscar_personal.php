<?php
include '../conexion.php'; // Conexión a la base de datos

$nombrePersonal = isset($_GET['nombrePersonal']) ? trim($_GET['nombrePersonal']) : '';

if (!empty($nombrePersonal)) {
    $nombresArray = explode(' ', $nombrePersonal);

    $conditions = [];
    foreach ($nombresArray as $term) {
        $conditions[] = "(numero_documento_personal LIKE ? OR nombres_personal LIKE ? OR apellido_paterno_personal LIKE ? OR apellido_materno_personal LIKE ?)";
    }

    $query = "SELECT mp.id_tipo_documento_personal, mp.numero_documento_personal, mp.nombres_personal,
                mp.apellido_paterno_personal, mp.apellido_materno_personal,
                p.descripcion, mp.id_profesion, mp.numero_colegiatura,
                mp.especialidad, mp.numero_especialidad
              FROM maestro_personal mp
              JOIN profesion p ON mp.id_profesion = p.id_profesion
              WHERE " . implode(' AND ', $conditions) . " LIMIT 10";

    if ($stmt = $conexion->prepare($query)) {
        $params = [];
        foreach ($nombresArray as $term) {
            $likeTerm = "%" . $term . "%";
            $params = array_merge($params, array_fill(0, 4, $likeTerm));
        }

        $types = str_repeat('s', count($params));
        $stmt->bind_param($types, ...$params);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows > 0) {
            while ($fila = $resultado->fetch_assoc()) {
                $longitudDocumento = ($fila['id_tipo_documento_personal'] == 2) ? 8 : 9;
                $numeroDocumentoPersonal = str_pad($fila['numero_documento_personal'], $longitudDocumento, '0', STR_PAD_LEFT);

                // Añade `data-*` para los nuevos campos: fecha_nacimiento_personal y genero_personal
                echo '<div class="search-item" 
                        data-dni-personal="' . htmlspecialchars($numeroDocumentoPersonal) . '" 
                        data-nombres-personal="' . htmlspecialchars($fila['nombres_personal']) . '"
                        data-apellido-paterno-personal="' . htmlspecialchars($fila['apellido_paterno_personal']) . '"
                        data-apellido-materno-personal="' . htmlspecialchars($fila['apellido_materno_personal']) . '"
                        data-id-profesion="' . htmlspecialchars($fila['id_profesion']) . '"
                        data-profesion="' . htmlspecialchars($fila['descripcion']) . '"
                        data-numero-colegiatura="' . htmlspecialchars($fila['numero_colegiatura']) . '"
                        data-especialidad="' . htmlspecialchars($fila['especialidad']) . '"
                        data-numero-especialidad="' . htmlspecialchars($fila['numero_especialidad']) . '">
                        <div id="resultado-nombres-personal" class="fw-bold">' .
                    htmlspecialchars($fila['nombres_personal']) . ' ' .
                    htmlspecialchars($fila['apellido_paterno_personal']) . ' ' .
                    htmlspecialchars($fila['apellido_materno_personal']) . '</div>' .
                    '<div class="small fw-bold">Número de documento: </div>' .
                    '<div id="resultado-documento-personal" class="small">' . htmlspecialchars($numeroDocumentoPersonal) . '</div>' .
                    '</div>';
            }
        } else {
            echo '<div class="search-item text-muted">No se encontraron resultados.</div>';
        }

        $stmt->close();
    } else {
        echo '<div class="search-item text-danger">Error en la consulta.</div>';
    }
} else {
    echo '<div class="search-item text-info">Escribe al menos dos letras para buscar.</div>';
}