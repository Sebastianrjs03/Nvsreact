<?php 
    require_once './models/mostrarProducto.php';

    class ControladorMostrarProducto {

        public static function productosEconomicos() {

            $producto = new MostrarProducto();

            $plataforma = isset($_GET['plataforma']) ? explode(',', $_GET['plataforma'] ) : [];
            $genero = $_GET['genero'] ?? null;
            $tipoProducto = trim($_GET['tipoProducto'] ?? null);

            $producto = $producto->productosEconomicos($plataforma, $tipoProducto, $genero);

            echo json_encode($producto);
        }


    }


?>