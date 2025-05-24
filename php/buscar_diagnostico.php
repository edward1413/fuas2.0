<?php
include '../conexion.php'; // Conexión a la base de datos

$codigoCIE10 = isset($_GET['codigoCIE10']) ? trim($_GET['codigoCIE10']) : '';

if (!empty($codigoCIE10)) {
    $nombresArray = explode(' ', $codigoCIE10);

    $conditions = [];
    foreach ($nombresArray as $term) {
        $conditions[] = "(codigo_cie10 LIKE ? OR descripcion_cie10 LIKE ?)";
    }

    $query = "SELECT codigo_cie10, descripcion_cie10 
            FROM diagnostico 
            WHERE " . implode(' AND ', $conditions) . " LIMIT 10";

    if ($stmt = $conexion->prepare($query)) {
        $params = [];
        foreach ($nombresArray as $term) {
            $likeTerm = "%" . $term . "%";
            $params = array_merge($params, array_fill(0, 2, $likeTerm));
        }

        $types = str_repeat('s', count($params));
        $stmt->bind_param($types, ...$params);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows > 0) {
            while ($fila = $resultado->fetch_assoc()) {
                echo '<div class="search-item" data-codigo="' . htmlspecialchars($fila['codigo_cie10']) . '">' .
                    '<div id="resultado-descripcion-cie10" class="fw-bold">' . 
                    htmlspecialchars($fila['descripcion_cie10']) . '</div>' .
                    '<div class="small fw-bold">CIE-10: </div>' .
                    '<div id="resultado-codigo-cie10" class="small">' . htmlspecialchars($fila['codigo_cie10']) . '</div>' .
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