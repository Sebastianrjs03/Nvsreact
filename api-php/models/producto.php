<?php
require_once './config/database.php';

class Producto
{

    private $conn;

    public function __construct()
    {
        $this->conn = Database::conectar();
    }

    public function obtenerProductos($plataforma, $tipoProducto, $genero)
    {
        if ($tipoProducto == "Videojuego") {
            if ($plataforma && $genero) {
              
            $placeholder = "Hola";    


             $sql = "
             SELECT 
             p.idProducto,
             p.precioProducto,
             p.nombreProducto,
             pl.idPlataforma AS plataforma,
             ge.idGeneroJuego AS generojuego
             FROM producto p
             JOIN juego j ON p.idProducto = j.idJuego
             JOIN aux_plataforma ap ON j.idJuego = ap.idJuego
             JOIN plataforma pl ON ap.idPlataforma = pl.idPlataforma
             JOIN aux_genero ag ON j.idJuego = ag.fk_pk_juego
             JOIN generojuego ge ON ag.fk_pk_genero = ge.idGeneroJuego
             WHERE pl.idPlataforma IN ($placeholder)
             AND ge.idGeneroJuego = :genero
             AND p.stock > 0
             
             ";

            } elseif ($plataforma) {

                $sql = "
            SELECT 
             p.idProducto,
             p.precioProducto,
             p.nombreProducto,
             pl.idPlataforma AS plataforma
             FROM producto p
             JOIN juego j ON p.idProducto = j.idJuego
             JOIN aux_plataforma ap ON j.idJuego = ap.idJuego
             JOIN plataforma pl ON ap.idPlataforma = pl.idPlataforma
             WHERE pl.idPlataforma = :plataforma
             AND p.stock > 0
            ";

            $stmt = $this->conn->prepare($sql);
            $stmt-> bindParam(":plataforma", $plataforma, PDO::PARAM_STR);

            } elseif ($genero) {
                
            } else {
                $mensaje = ("Hola") ? $sql = "": $sql = "";
            }

        } else {

        }

    }


 
}
?>