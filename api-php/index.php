<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    exit(0);
}
require_once './controllers/controladorUsuario.php';
require_once './controllers/controladorMostrarProducto.php';

$ruta = trim($_GET['ruta'] ?? '');

switch ($ruta) {
    case 'registrar':
        ControladorUsuario::registrar();
        break;
    case 'login':
        ControladorUsuario::login();
        break;
    case 'obtenerProductosDesc':
        ControladorMostrarProducto::productosMasVendidos();
        break;
    case 'obtenerProductosTendencias':
        ControladorMostrarProducto::productosTendencias();
        break;
    case 'obtenerProductosExclusivos':
        ControladorMostrarProducto::productosExclusivos();
        break;
    default:
        echo json_encode(["mensaje" => "Ruta no encontrada.", "ruta_solicitada" => $ruta]);
        break;
}
