<?php
include '../conexion.php';
if (isset($_GET['codigo-prestacion'])) {
    $codigo_prestacion = $_GET['codigo-prestacion'];
    $sql = "SELECT codigo_prestacion, descripcion_prestacion FROM prestacion WHERE codigo_prestacion = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("s", $codigo_prestacion); 
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode(['success' => true, 'descripcion_prestacion' => $row['descripcion_prestacion']]);
    } else {
        echo json_encode(['success' => false]);
    }
    $stmt->close();
}
$conexion->close();
?>