<?php
include '../conexion.php';
if (isset($_GET['codigoCIE10'])) {
    $codigoCIE10 = $_GET['codigoCIE10'];
    $sql = "SELECT id_diagnostico, codigo_cie10, descripcion_cie10
            FROM diagnostico WHERE codigo_cie10 = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("s", $codigoCIE10);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode(['success' => true, 'descripcion_cie10' => $row['descripcion_cie10']]);
    } else {
        echo json_encode(['success' => false]);
    }
    $stmt->close();
}
$conexion->close();