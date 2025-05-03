<?php
include '../conexion.php'; // Conexión a la base de datos

$nombrePaciente = isset($_GET['nombrePaciente']) ? trim($_GET['nombrePaciente']) : '';

if (!empty($nombrePaciente)) {
    $nombresArray = explode(' ', $nombrePaciente);

    $conditions = [];
    foreach ($nombresArray as $term) {
        $conditions[] = "(numero_documento_paciente LIKE ? OR nombres_paciente LIKE ? OR apellido_paterno_paciente LIKE ? OR apellido_materno_paciente LIKE ?)";
    }

    // Se hace la búsqueda en la tabla maestro_paciente de lo datos del paciente a obtener
    $query = "SELECT id_tipo_documento_paciente, numero_documento_paciente,
                nombres_paciente, apellido_paterno_paciente, apellido_materno_paciente,
                fecha_nacimiento_paciente, genero_paciente
              FROM maestro_paciente 
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
                $longitudDocumento = ($fila['id_tipo_documento_paciente'] == 1) ? 8 : 9;
                $numeroDocumentoPaciente = str_pad($fila['numero_documento_paciente'], $longitudDocumento, '0', STR_PAD_LEFT);

                // Añade `data-*` para los nuevos campos: fecha_nacimiento_paciente y genero_paciente
                echo '<div class="search-item" 
                        data-dni-paciente="' . htmlspecialchars($numeroDocumentoPaciente) . '" 
                        data-tipo-documento-paciente="' . htmlspecialchars($fila['id_tipo_documento_paciente']) . '" 
                        data-nombres-paciente="' . htmlspecialchars($fila['nombres_paciente']) . '"
                        data-apellido-paterno-paciente="' . htmlspecialchars($fila['apellido_paterno_paciente']) . '"
                        data-apellido-materno-paciente="' . htmlspecialchars($fila['apellido_materno_paciente']) . '"
                        data-fecha-nacimiento-paciente="' . htmlspecialchars($fila['fecha_nacimiento_paciente']) . '"
                        data-genero-paciente="' . htmlspecialchars($fila['genero_paciente']) . '">
                        <div id="resultado-nombres-paciente" class="fw-bold">' .
                    htmlspecialchars($fila['nombres_paciente']) . ' ' .
                    htmlspecialchars($fila['apellido_paterno_paciente']) . ' ' .
                    htmlspecialchars($fila['apellido_materno_paciente']) . '</div>' .
                    '<div class="small fw-bold">Número de documento: </div>' .
                    '<div id="resultado-documento-paciente" class="small">' . htmlspecialchars($numeroDocumentoPaciente) . '</div>' .
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