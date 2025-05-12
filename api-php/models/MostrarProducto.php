<?php
require_once './config/database.php';

class MostrarProducto
{

    private $conn;

    public function __construct()
    {
        $this->conn = Database::conectar();
    }

    public function productosEconomicos($plataforma, $tipoProducto, $genero)
    {
        if ($tipoProducto === 'Videojuego') {
            if (!empty($plataforma) && !empty($genero)) {


                $placeholder = implode(',', array_fill(0, count($plataforma), '?'));

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
             AND ge.idGeneroJuego = ?
             AND p.stock > 0
             ORDER BY precioProducto ASC
		     LIMIT 3 
             ";

                $stmt = $this->conn->prepare($sql);

                $params = array_merge($plataforma, [$genero]);
                $stmt->execute($params);
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            } elseif (!empty($plataforma)) {

                $placeholder = implode(',', array_fill(0, count($plataforma), '?'));

                
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
             WHERE pl.idPlataforma IN ($placeholder)
             AND p.stock > 0
             ORDER BY precioProducto ASC
		     LIMIT 3
            ";

                $stmt = $this->conn->prepare($sql);
                
                $params = array_merge($plataforma);
                $stmt->execute($params);
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            } elseif (!empty($genero)) {
                $sql = "
            SELECT 
             p.idProducto,
             p.precioProducto,
             p.nombreProducto,
             ge.idGeneroJuego AS generojuego
             FROM producto p
             JOIN juego j ON p.idProducto = j.idJuego
             JOIN aux_genero ag ON j.idJuego = ag.fk_pk_juego
             JOIN generojuego ge ON ag.fk_pk_genero = ge.idGeneroJuego
             WHERE ge.idGeneroJuego = :genero
             AND p.stock > 0
             ORDER BY precioProducto ASC
		     LIMIT 3
                ";

                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(":genero", $genero, PDO::PARAM_STR);
                $stmt->execute();
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            } else {
                $sql = "
             SELECT 
             idProducto,
             precioProducto,
             nombreProducto
             FROM producto 
             WHERE idTipoProducto = 'Videojuego'
             AND stock > 0
             ORDER BY precioProducto ASC
		     LIMIT 3
             ";

             $stmt = $this->conn->prepare($sql);
             $stmt->execute();
             return $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
        } else {
            echo "error penesote$tipoProducto";
        }
    }
}
