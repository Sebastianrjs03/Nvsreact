<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

require_once './controllers/controladorUsuario.php';

$ruta = trim($_GET['ruta'] ?? '');

switch ($ruta) {
    case 'registrar':
        ControladorUsuario::registrar();
        break;
    case 'login':
        ControladorUsuario::login();
        break;
    default:
        var_dump($_GET['ruta']);
        echo json_encode(["mensaje" => "Ruta no encontrada.",  "ruta_solicitada" => $ruta]);
        break;
}
