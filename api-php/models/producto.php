<?php
require_once './config/database.php';

class Producto
{

    private $conn;

    public function __construct()
    {
        $this->conn = Database::conectar();
    }

    public function obtenerProductos($plataforma, $tipoProducto, $categoria)
    {
        if ($tipoProducto == "") {
            if ($plataforma && $categoria) {

            } elseif ($plataforma) {

            } elseif ($categoria) {

            } else {

            }

        } else {

        }
    }
}
?>