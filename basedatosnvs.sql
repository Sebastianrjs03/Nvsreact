-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-05-2025 a las 15:09:06
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `basedatosnvs`
--
CREATE DATABASE IF NOT EXISTS `basedatosnvs` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `basedatosnvs`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

DROP TABLE IF EXISTS `administrador`;
CREATE TABLE `administrador` (
  `idAdministrador` int(5) NOT NULL,
  `documentoAdministrador` varchar(11) NOT NULL,
  `pf_fk_tdoc` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`idAdministrador`, `documentoAdministrador`, `pf_fk_tdoc`) VALUES
(1, '1234567890', 'CC'),
(2, '2345678901', 'CE'),
(3, '3456789012', 'TI'),
(4, '4567890123', 'CC'),
(5, '5678901234', 'CE'),
(6, '6789012345', 'TI'),
(7, '7890123456', 'CC'),
(8, '678909687', 'TI'),
(9, '7890193455', 'CE'),
(10, '8901234567', 'CE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aux_genero`
--

DROP TABLE IF EXISTS `aux_genero`;
CREATE TABLE `aux_genero` (
  `fk_pk_juego` int(5) NOT NULL,
  `fk_pk_genero` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `aux_genero`
--

INSERT INTO `aux_genero` (`fk_pk_juego`, `fk_pk_genero`) VALUES
(8, 'Accion'),
(8, 'Carreras'),
(8, 'Mundo Abierto'),
(8, 'Shooter'),
(9, 'Accion'),
(9, 'Aventura'),
(9, 'Lucha'),
(9, 'Survival Horror'),
(10, 'Accion'),
(10, 'Battle Royale'),
(10, 'Estrategia'),
(10, 'Mundo Abierto'),
(10, 'Shooter'),
(11, 'Accion'),
(11, 'Estrategia'),
(11, 'Mundo Abierto'),
(12, 'Accion'),
(12, 'Aventura'),
(12, 'Estrategia'),
(12, 'Mundo Abierto'),
(13, 'Aventura'),
(13, 'Deportes'),
(14, 'Aventura'),
(14, 'Estrategia'),
(14, 'Rol '),
(15, 'Aventura'),
(15, 'Lucha'),
(15, 'Survival Horror'),
(16, 'Accion'),
(16, 'Aventura'),
(16, 'Lucha'),
(16, 'Shooter'),
(17, 'Accion'),
(17, 'Aventura'),
(17, 'Mundo Abierto'),
(17, 'Shooter'),
(18, 'Aventura'),
(18, 'Estrategia'),
(18, 'Rol ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aux_marca`
--

DROP TABLE IF EXISTS `aux_marca`;
CREATE TABLE `aux_marca` (
  `fk_pk_producto` int(5) NOT NULL,
  `fk_pk_marca` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `aux_marca`
--

INSERT INTO `aux_marca` (`fk_pk_producto`, `fk_pk_marca`) VALUES
(2, 'PlayStation'),
(3, 'PlayStation'),
(4, 'Xbox'),
(5, 'Xbox'),
(6, 'Xbox'),
(7, 'Nintendo'),
(8, 'PlayStation'),
(8, 'Xbox'),
(9, 'PlayStation'),
(9, 'Xbox'),
(10, 'PlayStation'),
(10, 'Xbox'),
(11, 'PlayStation'),
(11, 'Xbox'),
(12, 'PlayStation'),
(12, 'Xbox'),
(13, 'PlayStation'),
(13, 'Xbox'),
(14, 'PlayStation'),
(15, 'PlayStation'),
(15, 'Xbox'),
(16, 'PlayStation'),
(17, 'PlayStation'),
(18, 'PlayStation'),
(18, 'Xbox');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aux_plataforma`
--

DROP TABLE IF EXISTS `aux_plataforma`;
CREATE TABLE `aux_plataforma` (
  `idJuego` int(5) NOT NULL,
  `idPlataforma` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `aux_plataforma`
--

INSERT INTO `aux_plataforma` (`idJuego`, `idPlataforma`) VALUES
(8, 'PlayStation'),
(8, 'Xbox'),
(9, 'PlayStation'),
(10, 'PlayStation'),
(10, 'Xbox'),
(11, 'PlayStation'),
(11, 'Xbox'),
(12, 'PlayStation'),
(13, 'PlayStation'),
(13, 'Xbox'),
(14, 'PlayStation'),
(14, 'Xbox'),
(15, 'PlayStation'),
(16, 'PlayStation'),
(16, 'Xbox'),
(17, 'PlayStation'),
(17, 'Xbox'),
(18, 'PlayStation'),
(18, 'Xbox');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificacion`
--

DROP TABLE IF EXISTS `calificacion`;
CREATE TABLE `calificacion` (
  `idCliente` int(5) NOT NULL,
  `idProducto` int(5) NOT NULL,
  `numeroCalificacion` float NOT NULL,
  `comentarioCalificacion` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `calificacion`
--

INSERT INTO `calificacion` (`idCliente`, `idProducto`, `numeroCalificacion`, `comentarioCalificacion`) VALUES
(11, 6, 70, 'me considero una persona bastante exigente con las consolas por lo tanto es buena consola pero no de'),
(11, 12, 80, 'Es un juego de mundo abierto increíble solo que las armas podrían ser mas creativas'),
(11, 17, 100, 'Un juego de espias bastante cauteloso en cuanto a detalles y cinemáticas ademas de muy bien articula'),
(11, 18, 5, 'como estas\r\n'),
(12, 6, 100, 'Excelente producto debido a su retrocompatibilidad con los juegos de las consolas anteriores sencill'),
(12, 12, 90, 'Me sucede un problema al querer comprar en la tienda se me queda en negro  '),
(12, 17, 60, 'me gusta hitman pero este juego esta mal en cuanto a quien es hitman, no es el típico que sale a mat'),
(13, 3, 80, 'Esperaba mas por su precio'),
(13, 8, 90, 'Gran juego y bastante mejorado en comparación de sus antecesores con sus nuevas mecánicas que me enc'),
(13, 13, 100, 'Me gusta mucho el modo de juego  carrera pero presiento que la historia podría profundizar un poco m'),
(13, 18, 80, 'Bastante parecido pero le falta un poco para ser buena.'),
(14, 3, 70, 'grtaficos muy malos, su fluidez va muy lento y el procesador tiene errores la nota por nostalgia.'),
(14, 8, 60, 'no tiene una historia clara solo es un juego donde puedes hacer lo que quieras pero no llega a mas '),
(14, 13, 80, 'Lo mismo de todos los años solo implementan pequeñas cosas '),
(14, 18, 60, 'Me falta historia de harry y hermaiony es algo irreal que los personajes principales sean tan ignora'),
(15, 4, 90, 'muy versatil en sus juegos ademas de un diseño muy bonito'),
(15, 14, 70, 'No tiene nada que ver con la historia principal pero es una muy buena versión de la historia y muy b'),
(16, 4, 100, 'estilo de la consola muy parecido a la 360 me gusta mucho ha durado 2 años conmigo y ni un fallo'),
(16, 14, 90, 'soy muy fan de la serie y creo que el juego representa muy bien su esencia eso que lo caracteriza'),
(17, 5, 60, 'muy pequeña ademas de el ventilador es muy poco estetico pero su potencia lo saca un poco adelante'),
(17, 10, 80, 'Es demasiado pesado por lo tanto mi almacenamiento solo lo abarca este juego ademas de sus constante'),
(17, 15, 100, 'Increible como mejoraron el visual es una joya del terror'),
(18, 5, 90, 'muy razonable su precio, muy bueno su calidad y fluidez grafica con pocos bugs hasta el momento '),
(18, 10, 90, 'Es un juego demasiado completo con sus gráficos y modos de juego complementarios pero considero que '),
(18, 15, 80, 'cambiaron un poco la historia y sus graficos son mejores pero agregaron sustos muy predecibles algo '),
(19, 7, 80, 'Es muy interesante la propuesta sobre los controles de esta forma es un poco incomodo pero innovador'),
(19, 11, 100, 'Soy un gran seguidor de este modo de vida por lo tanto me diento identificado con el estilo de vida '),
(19, 16, 100, 'Mucha nostalgia y una entrega bastante completa con una historia muy buena '),
(20, 7, 100, 'excelente consola debido a su doble uso la puedo llevar a cualquier parte inclusive si voy de viaje,'),
(20, 11, 60, 'no me gusto la historia debido a vacíos argumentales sin justificar y perdidas en el hilo conductor '),
(20, 16, 70, 'La historia se centra ahora en el hijo queria volver a ver a kratos en accion.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificacionfinal`
--

DROP TABLE IF EXISTS `calificacionfinal`;
CREATE TABLE `calificacionfinal` (
  `idProducto` int(5) NOT NULL,
  `totalCalificacion` float NOT NULL,
  `PromedioAceptacion` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `calificacionfinal`
--

INSERT INTO `calificacionfinal` (`idProducto`, `totalCalificacion`, `PromedioAceptacion`) VALUES
(2, 190, 9.5),
(3, 150, 7.5),
(4, 190, 9.5),
(5, 150, 7.5),
(6, 170, 8.5),
(7, 180, 9),
(8, 150, 7.5),
(9, 150, 7.5),
(10, 170, 8.5),
(11, 160, 8),
(12, 170, 8.5),
(13, 180, 9),
(14, 160, 8),
(15, 180, 9),
(16, 170, 8.5),
(17, 160, 8),
(18, 140, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `caracteristicasconsola`
--

DROP TABLE IF EXISTS `caracteristicasconsola`;
CREATE TABLE `caracteristicasconsola` (
  `idConsola` int(5) NOT NULL,
  `color` varchar(20) NOT NULL,
  `tipoControles` varchar(20) NOT NULL,
  `controlesIncluidos` varchar(20) NOT NULL,
  `controlesSoporta` varchar(20) NOT NULL,
  `tipoProcesador` varchar(100) NOT NULL,
  `resolucion` varchar(30) NOT NULL,
  `fuenteAlimentacion` varchar(100) NOT NULL,
  `opcionConectividad` varchar(200) NOT NULL,
  `tipoPuertos` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `caracteristicasconsola`
--

INSERT INTO `caracteristicasconsola` (`idConsola`, `color`, `tipoControles`, `controlesIncluidos`, `controlesSoporta`, `tipoProcesador`, `resolucion`, `fuenteAlimentacion`, `opcionConectividad`, `tipoPuertos`) VALUES
(2, '', '', '', '', '', '', 'Entrada: 110-240V AC, 50/60Hz\r\nConsumo: ~165W en uso ', 'Wi-Fi\r\nBluetooth: 2.1 \r\nEthernet', 'Puerto de salida HDMI™ (salida HDR compatible)\r\n2x USB 3.1\r\nHDMI 1.4 \r\nPuerto AUX (para la PlayStation Camera)'),
(3, '', '', '', '', '', '', 'Entrada: 100-240V AC, 50/60Hz\r\nConsumo: ~350W (máximo)', 'Wi-Fi: Wi-Fi 6\r\nBluetooth: 5.1\r\nEthernet: 2.5GBASE-T', '2x USB 3.1 Gen 2\r\n1x USB 3.2 Gen 1 (frontal)\r\n1x USB-C (frontal)\r\nHDMI 2.1 (soporta 4K a 120Hz)\r\nPuerto Ethernet RJ-45\r\nPuerto de expansión SSD M.2'),
(4, '', '', '', '', '', '', 'Entrada: 100-240V AC, 50/60Hz\r\nConsumo: ~120W ', 'Wi-Fi: wifi 5\r\nBluetooth: No compatible\r\nEthernet: BASE-T', '3x USB 3.0\r\nHDMI 1.4 (entrada y salida)\r\nSalida óptica de audio\r\nPuerto IR Blaster\r\nPuerto Ethernet RJ-45\r\n'),
(5, '', '', '', '', '', '', 'Entrada: 100-240V AC, 50/60Hz\r\nConsumo: ~100W', 'Wi-Fi: wifi 5\r\nBluetooth: 5.0\r\nEthernet: BASE-T', '3x USB 3.1 Gen 1\r\nHDMI 2.1 (soporta 1440p a 120Hz)\r\nPuerto de expansión para almacenamiento\r\nPuerto Ethernet RJ-45'),
(6, '', '', '', '', '', '', 'Entrada: 100-240V AC, 50/60Hz\r\nConsumo: ~200W (máximo)', 'Wi-Fi: wifi 6\r\nBluetooth: 5.0 \r\nEthernet: BASE-T', '3x USB 3.1 Gen 1\r\nHDMI 2.1 (soporta 4K a 120Hz)\r\nPuerto de expansión para almacenamiento \r\nPuerto Ethernet RJ-45'),
(7, '', '', '', '', '', '', 'Entrada: 100-240V AC, 50/60Hz\r\nSalida: 15V, 2.6A (modo dock), 5V, 1.5A (modo portátil)', 'Wi-Fi: wifi 5\r\nBluetooth: 4.1 \r\nEthernet: No tiene de forma nativa, pero se puede usar adaptador USB-LAN', '1x USB 3.0 (en el dock)\r\n2x USB 2.0 (en el dock)\r\nHDMI (en el dock)\r\nRanura para tarjetas microSD (expansión de almacenamiento)\r\nPuerto de audio 3.5mm (en la consola portátil)');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

DROP TABLE IF EXISTS `cliente`;
CREATE TABLE `cliente` (
  `idCliente` int(5) NOT NULL,
  `direccion` varchar(20) NOT NULL,
  `complemento` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`idCliente`, `direccion`, `complemento`) VALUES
(11, 'cr 98', 'apart: 302 bloque c'),
(12, 'Calle 2', 'Apto 202'),
(13, 'Calle 3', 'Casa 3'),
(14, 'Calle 4', 'Apto 404'),
(15, 'Calle 5', 'Casa 5'),
(16, 'Calle 6', 'Apto 606'),
(17, 'Calle 7', 'Apto 707'),
(18, 'Calle 8', 'Casa 8'),
(19, 'Calle 9', 'Apto 909'),
(20, 'Calle 10', 'Casa 10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consola`
--

DROP TABLE IF EXISTS `consola`;
CREATE TABLE `consola` (
  `idConsola` int(5) NOT NULL,
  `sobreConsola` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `consola`
--

INSERT INTO `consola` (`idConsola`, `sobreConsola`) VALUES
(2, 'Es parte de la octava generación de consolas y una sucesora de la popular PlayStation 3. La PS4 destaca por su potente hardware, accesibilidad y amplio catálogo de videojuegos, lo que la convierte en una de las consolas más vendidas de la historia.'),
(3, 'Como sucesora de la popular PlayStation 4, la PS5 trae una serie de mejoras significativas en rendimiento, gráficos y experiencia de usuario, diseñadas para ofrecer una jugabilidad inmersiva y sin precedentes.'),
(4, 'Es una consola de videojuegos de octava generación lanzada por Microsoft en noviembre de 2013. Tiene un diseño rectangular, generalmente en color negro mate, con bordes afilados y líneas limpias, que le dan un aspecto moderno y minimalista.'),
(5, 'Es una consola de videojuegos de novena generación lanzada por Microsoft en noviembre de 2020. Es la versión más asequible y compacta de la familia de consolas Xbox Series, diseñada para ofrecer una experiencia de próxima generación a un precio más bajo,tiene un diseño minimalista y compacto.'),
(6, 'Es la consola de videojuegos más potente de la familia Xbox, lanzada por Microsoft en noviembre de 2020 como parte de la novena generación de consolas. Está diseñada para ofrecer una experiencia de juego de alto rendimiento con gráficos de vanguardia y tiempos de carga rápidos.'),
(7, 'Es una consola híbrida lanzada por Nintendo en marzo de 2017. Su principal característica distintiva es la capacidad de funcionar tanto como consola de sobremesa conectada a una TV y como consola portátil.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallefactura`
--

DROP TABLE IF EXISTS `detallefactura`;
CREATE TABLE `detallefactura` (
  `fk_pk_Factura` int(5) NOT NULL,
  `fk_pk_Producto` int(5) NOT NULL,
  `cantidadProducto` int(5) NOT NULL,
  `valorUnitarioProducto` float NOT NULL,
  `ivaProducto` float NOT NULL,
  `totalProducto` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detallefactura`
--

INSERT INTO `detallefactura` (`fk_pk_Factura`, `fk_pk_Producto`, `cantidadProducto`, `valorUnitarioProducto`, `ivaProducto`, `totalProducto`) VALUES
(2, 3, 2, 1000000, 190000, 1190000),
(3, 2, 1, 800000, 152000, 952000),
(3, 5, 1, 1300000, 171000, 1471000),
(4, 4, 1, 700000, 133000, 833000),
(5, 11, 1, 200000, 38000, 238000),
(5, 17, 1, 320000, 60800, 380600),
(6, 14, 1, 190000, 36100, 2261000),
(6, 18, 1, 160000, 30400, 190400),
(7, 10, 1, 200000, 38000, 238000),
(7, 11, 1, 200000, 38000, 238000),
(7, 16, 1, 275000, 52250, 327250),
(8, 9, 1, 600000, 114000, 714000),
(8, 12, 1, 400000, 76000, 476000),
(9, 10, 1, 200000, 38000, 238000),
(9, 13, 1, 210000, 39900, 249900),
(10, 10, 1, 200000, 38000, 238000),
(10, 15, 1, 330000, 62700, 392700),
(10, 16, 2, 275000, 52250, 327250),
(10, 17, 1, 320000, 60800, 380600),
(12, 17, 1, 320000, 60800, 380800),
(13, 8, 2, 300000, 57000, 357000),
(13, 9, 1, 600000, 114000, 714000),
(13, 10, 1, 200000, 38000, 238000),
(13, 11, 1, 200000, 38000, 238000),
(13, 12, 1, 400000, 76000, 476000),
(14, 3, 1, 1000000, 190000, 1190000),
(14, 10, 1, 200000, 38000, 238000),
(14, 13, 1, 210000, 39900, 249900),
(14, 14, 1, 190000, 36100, 226100),
(15, 12, 1, 400000, 76000, 476000),
(15, 16, 2, 275000, 52250, 327250),
(16, 4, 1, 700000, 133000, 833000),
(16, 8, 1, 300000, 57000, 357000),
(16, 9, 1, 600000, 114000, 714000),
(17, 4, 1, 700000, 133000, 833000),
(17, 18, 1, 160000, 30400, 190400),
(18, 11, 1, 200000, 38000, 238000),
(18, 12, 1, 400000, 76000, 476000),
(18, 13, 1, 210000, 39900, 249900),
(18, 14, 1, 190000, 36100, 226100),
(18, 16, 1, 275000, 52250, 327250),
(19, 8, 1, 300000, 57000, 357000),
(19, 9, 1, 600000, 114000, 714000),
(19, 10, 1, 200000, 38000, 238000),
(20, 4, 1, 700000, 133000, 833000),
(20, 10, 1, 200000, 38000, 238000),
(20, 11, 1, 200000, 38000, 238000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `envios`
--

DROP TABLE IF EXISTS `envios`;
CREATE TABLE `envios` (
  `fk_pk_Factura` int(5) NOT NULL,
  `tiempoEstimado` varchar(20) NOT NULL,
  `observaciones` varchar(50) NOT NULL,
  `idEstadoEnvio` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `envios`
--

INSERT INTO `envios` (`fk_pk_Factura`, `tiempoEstimado`, `observaciones`, `idEstadoEnvio`) VALUES
(2, '2 horas y 10 minutos', '2 cajas fragiles', 'Entregado'),
(3, '2 horas', '3 cajas grandes ', 'Pendiente'),
(4, '5 horas ', '1 caja mediana ', 'Pendiente'),
(5, '3 horas y 30 minutos', '1 caja mediana ', 'Entregado'),
(6, '1 hora y 20 minutos', 'caja pequeña ', 'Entregado'),
(7, '30 minutos', 'caja mediana', 'Entregado'),
(8, '2 horas y 45 minutos', '2 cajas medianas ', 'Entregado'),
(9, '6 horas y 10 minutos', 'caja pequeña y fragil', 'Pendiente'),
(10, '5 horas y 5 minutos', '2 cajas medianas y 1 caja pequeña', 'Pendiente'),
(12, '7 horas y 50 minutos', 'caja pequeña ', 'Pendiente'),
(13, '4 horas ', '4 cajas medianas ', 'Pendiente'),
(14, '2 horas y 30 minutos', '3 cajas medianas y 1 pequeña ', 'Entregado'),
(15, '6 horas', '2 cajas medianas', 'Entregado'),
(16, '6 horas y 10 minutos', '3 cajas medianas y 1 pequeña ', 'Pendiente'),
(17, '5 horas y 20 minutos', '1 caja grande y 1 pequeña', 'Pendiente'),
(18, '8 horas y 20 minutos', '3 cajas medianas', 'Entregado'),
(19, '1 hora y 50 minutos', '3 cajas medianas y 1 pequeña', 'Entregado'),
(20, '7 horas y 59 minutos', '3 cajas medianas y 1 pequeña ', 'Entregado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadoenvio`
--

DROP TABLE IF EXISTS `estadoenvio`;
CREATE TABLE `estadoenvio` (
  `idEstadoEnvio` varchar(20) NOT NULL,
  `estadoEnvio` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estadoenvio`
--

INSERT INTO `estadoenvio` (`idEstadoEnvio`, `estadoEnvio`) VALUES
('Entregado', 1),
('Pendiente', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

DROP TABLE IF EXISTS `factura`;
CREATE TABLE `factura` (
  `idFactura` int(5) NOT NULL,
  `fechaFactura` date NOT NULL,
  `iva` float NOT NULL,
  `base` float NOT NULL,
  `totalCompra` float NOT NULL,
  `idCliente` int(5) NOT NULL,
  `idFormaPago` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`idFactura`, `fechaFactura`, `iva`, `base`, `totalCompra`, `idCliente`, `idFormaPago`) VALUES
(2, '2024-09-09', 0.19, 2000000, 2380000, 12, 'PSE'),
(3, '2024-09-17', 0.19, 2100000, 2499000, 13, 'PSE'),
(4, '2024-04-17', 0.19, 700000, 833000, 14, 'Mercado Pago'),
(5, '2024-04-25', 0.19, 520000, 618800, 15, 'PSE'),
(6, '2024-05-24', 0.19, 350000, 416500, 16, 'PSE'),
(7, '2024-09-18', 0.19, 675000, 801250, 17, 'PSE'),
(8, '2024-03-15', 0.19, 1000000, 1190000, 18, 'PSE'),
(9, '2024-09-12', 0.19, 410000, 487900, 19, 'PSE'),
(10, '2024-09-18', 0.19, 1400000, 1666000, 20, 'Mercado Pago'),
(12, '2024-08-14', 0.19, 320000, 380600, 12, 'PSE'),
(13, '2024-05-07', 0.19, 2000000, 2380000, 13, 'Mercado Pago'),
(14, '2024-09-17', 0.19, 1600000, 1904000, 14, 'PSE'),
(15, '2024-09-26', 0.19, 950000, 1130500, 15, 'Mercado Pago'),
(16, '2024-09-11', 0.19, 1600000, 1904000, 16, 'PSE'),
(17, '2024-09-10', 0.19, 860000, 1023400, 17, 'PSE'),
(18, '2024-01-09', 0.19, 1275000, 1517250, 18, 'Mercado Pago'),
(19, '2024-04-10', 0.19, 1100000, 1309000, 19, 'PSE'),
(20, '2024-09-18', 0.19, 1100000, 1309000, 20, 'PSE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formapago`
--

DROP TABLE IF EXISTS `formapago`;
CREATE TABLE `formapago` (
  `idFormaPago` varchar(20) NOT NULL,
  `estadoMetodoPago` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `formapago`
--

INSERT INTO `formapago` (`idFormaPago`, `estadoMetodoPago`) VALUES
('Mercado Pago', 1),
('PSE', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `generojuego`
--

DROP TABLE IF EXISTS `generojuego`;
CREATE TABLE `generojuego` (
  `idGeneroJuego` varchar(20) NOT NULL,
  `estadoGeneroJuego` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `generojuego`
--

INSERT INTO `generojuego` (`idGeneroJuego`, `estadoGeneroJuego`) VALUES
('Accion', 1),
('Aventura', 1),
('Battle Royale', 1),
('Carreras', 1),
('Deportes', 1),
('Estrategia', 1),
('Lucha', 1),
('Mundo Abierto', 1),
('Plataformas', 1),
('Rol ', 1),
('Shooter', 1),
('Survival Horror', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juego`
--

DROP TABLE IF EXISTS `juego`;
CREATE TABLE `juego` (
  `idJuego` int(5) NOT NULL,
  `anoLanzamineto` date NOT NULL,
  `descripcionJuego` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `juego`
--

INSERT INTO `juego` (`idJuego`, `anoLanzamineto`, `descripcionJuego`) VALUES
(8, '2014-09-04', ''),
(9, '2018-05-10', ''),
(10, '2019-10-25', ''),
(11, '2018-10-26', ''),
(12, '2020-07-17', ''),
(13, '2024-05-02', ''),
(14, '2022-09-17', ''),
(15, '2023-11-16', ''),
(16, '2020-04-23', ''),
(17, '2023-03-22', ''),
(18, '2023-02-16', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

DROP TABLE IF EXISTS `marca`;
CREATE TABLE `marca` (
  `idMarca` varchar(20) NOT NULL,
  `estado_marca` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `marca`
--

INSERT INTO `marca` (`idMarca`, `estado_marca`) VALUES
('Nintendo', 1),
('PlayStation', 1),
('Xbox', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plataforma`
--

DROP TABLE IF EXISTS `plataforma`;
CREATE TABLE `plataforma` (
  `idPlataforma` varchar(20) NOT NULL,
  `estadoPlataforma` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `plataforma`
--

INSERT INTO `plataforma` (`idPlataforma`, `estadoPlataforma`) VALUES
('Nintendo Switch', 1),
('PlayStation', 1),
('Xbox', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto` (
  `idProducto` int(5) NOT NULL,
  `nombreProducto` varchar(50) NOT NULL,
  `precioProducto` float NOT NULL,
  `descuentoProducto` int(2) NOT NULL,
  `totalProducto` int(11) NOT NULL,
  `garantiaProducto` varchar(40) NOT NULL,
  `idTipoProducto` varchar(20) NOT NULL,
  `idAdministrador_crear` int(5) NOT NULL,
  `stock` int(5) NOT NULL,
  `ventaProducto` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProducto`, `nombreProducto`, `precioProducto`, `descuentoProducto`, `totalProducto`, `garantiaProducto`, `idTipoProducto`, `idAdministrador_crear`, `stock`, `ventaProducto`) VALUES
(2, 'PlayStation 4', 800000, 0, 800000, '1 año', 'Consola', 1, 1, 20),
(3, 'PlayStation 5', 2000000, 10, 1800000, '6 meses', 'Consola', 2, 0, 10),
(4, 'Xbox One', 700000, 0, 700000, '1 año', 'Consola', 3, 2, 10),
(5, 'Xbox Series S', 900000, 5, 855000, '9 meses', 'Consola', 4, 2, 20),
(6, 'Xbox Series X', 1300000, 0, 1170000, '1 año', 'Consola', 5, 2, 10),
(7, 'Nintendo Switch', 1800000, 0, 1800000, '1 año', 'Consola', 6, 2, 5),
(8, 'Grand Theft Auto V', 300000, 20, 240000, '6 meses', 'Videojuego', 7, 2, 50),
(9, 'Dark Soul REMASTERED', 200000, 50, 100000, '1 año', 'Videojuego', 8, 2, 10),
(10, 'Call of Duty Modern Warfare', 200000, 0, 200000, '1 año', 'Videojuego', 9, 2, 50),
(11, 'Red Dead Redemtiption II', 200000, 2, 294000, '1 año', 'Videojuego', 10, 2, 100),
(12, 'Ghost of Tsushima', 320000, 0, 320000, '3 meses', 'Videojuego', 1, 2, 20),
(13, 'EA Sports F1 24', 210000, 30, 180000, '2 años', 'Videojuego', 2, 2, 5),
(14, 'South Park: Snow Day!', 190000, 0, 190000, '1 año', 'Videojuego', 3, 2, 20),
(15, 'The Outlast Trials Deluxe Edition', 330000, 80, 66000, '1 año', 'Videojuego', 4, 2, 30),
(16, 'God of War', 275000, 0, 275000, '6 meses', 'Videojuego', 5, 2, 200),
(17, 'Hitman World of Assassination', 180000, 0, 180000, '1 año', 'Videojuego', 6, 2, 4),
(18, 'Hodwarts Legacy', 250000, 10, 225000, '1 año', 'Videojuego', 7, 3, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `idRol` int(5) NOT NULL,
  `descRol` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`idRol`, `descRol`) VALUES
(1, 'Usuario'),
(2, 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `soporte`
--

DROP TABLE IF EXISTS `soporte`;
CREATE TABLE `soporte` (
  `idCliente` int(5) NOT NULL,
  `fecha` date NOT NULL,
  `pqrs` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `soporte`
--

INSERT INTO `soporte` (`idCliente`, `fecha`, `pqrs`) VALUES
(11, '2024-09-01', 'Solicitud de cambio de contraseña.'),
(12, '2024-09-02', 'Reclamo por productos defectuosos.'),
(13, '2024-09-03', 'Consulta sobre horarios de atención.'),
(14, '2024-09-04', 'Sugerencia para mejorar el servicio.'),
(15, '2024-09-05', 'Solicitud de reembolso por pago erróneo.'),
(16, '2024-09-06', 'Pregunta sobre disponibilidad de productos.'),
(17, '2024-09-07', 'Reclamo por servicio no prestado.'),
(18, '2024-09-08', 'Solicitud de información sobre promociones.'),
(19, '2024-09-09', 'Comentario sobre la atención al cliente.'),
(20, '2024-09-10', 'Solicitud de actualización de datos personales.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoproducto`
--

DROP TABLE IF EXISTS `tipoproducto`;
CREATE TABLE `tipoproducto` (
  `idTipoProducto` varchar(20) NOT NULL,
  `estado_tipopro` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipoproducto`
--

INSERT INTO `tipoproducto` (`idTipoProducto`, `estado_tipopro`) VALUES
('Consola', 1),
('Videojuego', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_documento`
--

DROP TABLE IF EXISTS `tipo_documento`;
CREATE TABLE `tipo_documento` (
  `t_doc` varchar(10) NOT NULL,
  `desc_tdoc` varchar(30) NOT NULL,
  `estado_tdoc` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_documento`
--

INSERT INTO `tipo_documento` (`t_doc`, `desc_tdoc`, `estado_tdoc`) VALUES
('CC', 'Cedula Ciudadania', 1),
('CE', 'Cedula Extranjeria', 1),
('TI', 'Tarjeta de Identidad', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `idUsuario` int(5) NOT NULL,
  `nombreUsuario` varchar(50) NOT NULL,
  `senombreUsuario` varchar(20) DEFAULT NULL,
  `apellidoUsuario` varchar(20) NOT NULL,
  `seapellidoUsuario` varchar(20) DEFAULT NULL,
  `correoUsuario` varchar(50) NOT NULL,
  `celularUsuario` varchar(50) NOT NULL,
  `contrasenaUsuario` text NOT NULL,
  `idRol` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nombreUsuario`, `senombreUsuario`, `apellidoUsuario`, `seapellidoUsuario`, `correoUsuario`, `celularUsuario`, `contrasenaUsuario`, `idRol`) VALUES
(1, 'Juan', 'Carlos', 'Pérez', 'López', 'juan@example.com', '1234567890', '$2y$10$kPEtAFemKTkifeheX32iaOGauW0mAoiC3Evl5r7i222wYahHz0/yu', 1),
(2, 'Andrey ', 'Dilan', 'Bohorquez', 'RIveros', 'RIverosAlgo@gmail.com', '3017820766', 'jsaddnsajdkas', 1),
(3, 'Luis', 'Fernando', 'Gómez', 'Hernández', 'luis.gomez@hotmail.com', '3456789012', 'password789', 1),
(4, 'Marta', 'Isabel', 'López', 'Fernández', 'marta.lopez@hotmail.com', '4567890123', 'password101', 1),
(5, 'Jorge', 'Andrés', 'Martínez', 'Ríos', 'jorge.martinez@yahoo.com', '5678901234', 'password102', 1),
(6, 'Carla', 'Beatriz', 'Vásquez', 'Arias', 'carla.vasquez@outlook.com', '6789012345', 'password103', 1),
(7, 'Pedro', 'Antonio', 'Jiménez', 'Castro', 'pedro.jimenez@gmail.com', '7890123456', 'password104', 1),
(8, 'Laura', 'Alejandra', 'Reyes', 'Salazar', 'laura.reyes@hotmail.com', '8901234567', 'password105', 1),
(9, 'Santiago', 'David', 'Valencia', 'Mendoza', 'santiago.valencia@hotmail.com', '9012345678', 'password106', 1),
(10, 'kevin', 'STIVEN', 'muñoz ', 'castelllanos', 'ksmc825@gmail.com', '3017820766', 'P?V??????$?W?^?:', 2),
(11, 'Ricardo', 'Ariel', 'Córdoba', 'Bermúdez', 'ricardo.cordoba@hotmail.com', '1234567890', 'password108', 1),
(12, 'Verónica', 'Johana', 'Cano', 'Aldana', 'veronica.cano@yahoo.com', '2345678901', 'password109', 1),
(13, 'Oscar', 'Iván', 'García', 'Lozano', 'oscar.garcia@outlook.com', '3456789012', 'password110', 1),
(14, 'Daniela', 'Paola', 'Rincón', 'Múnera', 'daniela.rincon@gmail.com', '4567890123', 'password111', 1),
(15, 'Andrés', 'Felipe', 'Ortiz', 'Vega', 'andres.ortiz@outlook.com', '5678901234', 'password112', 1),
(16, 'Natalia', 'Marcela', 'García', 'Cuervo', 'natalia.garcia@gmail.com', '6789012345', 'password113', 1),
(17, 'Héctor', 'Alejandro', 'Bermúdez', 'Pérez', 'hector.bermudez@hotmail.com', '7890123456', 'password114', 1),
(18, 'Catalina', 'Márquez', 'Torres', 'Beltrán', 'catalina.marquez@gmail.com', '8901234567', 'password115', 1),
(19, 'Ana', 'María', 'Rodríguez', 'Martínez', 'ana.rodriguez@gmail.com', '2345678901', 'password456', 1),
(20, 'Isabel', 'Cristina', 'Salcedo', 'Suárez', 'isabel.salcedo@gmail.com', '0123456789', 'password107', 1),
(21, 'Laura', 'Camila', 'Lopez', 'Ardila', 'laura@mail.com', '3223381072', '$2y$10$fFZVjYLzT/5Hgdm.d6wMsuLdPvlYjvkG4YT6/CilKuZLx20bGijGO', 1),
(22, 'Laura', 'Camila', 'Lopez', 'Ardila', 'laura@mail.com', '3223381072', '$2y$10$RS.Oaen16GjkwXsgk3bn/Ofug.ppw.CslLmuSnCKUImuyX.FlgcQa', 1),
(26, 'Yojan', 'Sebastián ', 'Rojas ', 'Garzón ', 'sebastianrjs03@gmail.com', '3223381072', '$2y$10$7IZoKmYKp5jr/hLZM8VcFe2x2g5MwFhaj.8aBoDYuZgnMqcsr6.6a', 1),
(27, 'Laura', 'Camila', 'Lopez', 'Ardila', 'laura@mail.com', '3223381072', '$2y$10$EYkDptrYKajW9VvFQgGGAuEWFtJK7kqtmPBfPKHsZjkY.ylSvwvjC', 1),
(30, 'Hola', 'Na', 'Hs', 'Je', 'prueba@gmail.com', '3135', '$2y$10$f.yN8XYyLC2AGsgAm1YjRO/mc9EAI1Y94ZYwzLGoHI8EAQO4DA2Qm', 1),
(31, 'Laura', 'Camila', 'Lopez', 'Ardila', 'lauritaaaa@mail.com', '3223381072', '$2y$10$HEU7y5BZ7rPbpAzwif3jYu2QHAbBYkaRMNDGLvhbB6Y7GKb1vPOCi', 1),
(32, 'Milena ', 'Sandra ', 'Garzón ', 'Garcia', 'garmilena79@gmail.com', '3004183671', '$2y$10$qFt42JrwbCctmK3V8HkRAe678wAVO46jpq/qzXWvjpVgl1cLGaPNq', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`idAdministrador`,`pf_fk_tdoc`),
  ADD UNIQUE KEY `idAdministrador` (`idAdministrador`),
  ADD KEY `administrador_ibfk_2` (`pf_fk_tdoc`);

--
-- Indices de la tabla `aux_genero`
--
ALTER TABLE `aux_genero`
  ADD PRIMARY KEY (`fk_pk_juego`,`fk_pk_genero`),
  ADD KEY `aux_genero` (`fk_pk_genero`),
  ADD KEY `fk_pk_juego` (`fk_pk_juego`);

--
-- Indices de la tabla `aux_marca`
--
ALTER TABLE `aux_marca`
  ADD PRIMARY KEY (`fk_pk_producto`,`fk_pk_marca`),
  ADD KEY `aux_marca` (`fk_pk_marca`),
  ADD KEY `fk_pk_producto` (`fk_pk_producto`);

--
-- Indices de la tabla `aux_plataforma`
--
ALTER TABLE `aux_plataforma`
  ADD PRIMARY KEY (`idJuego`,`idPlataforma`),
  ADD KEY `idPlataforma` (`idPlataforma`);

--
-- Indices de la tabla `calificacion`
--
ALTER TABLE `calificacion`
  ADD PRIMARY KEY (`idCliente`,`idProducto`),
  ADD KEY `idProducto` (`idProducto`),
  ADD KEY `idCliente` (`idCliente`);

--
-- Indices de la tabla `calificacionfinal`
--
ALTER TABLE `calificacionfinal`
  ADD PRIMARY KEY (`idProducto`),
  ADD UNIQUE KEY `idProducto_2` (`idProducto`);

--
-- Indices de la tabla `caracteristicasconsola`
--
ALTER TABLE `caracteristicasconsola`
  ADD KEY `idConsola` (`idConsola`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idCliente`);

--
-- Indices de la tabla `consola`
--
ALTER TABLE `consola`
  ADD PRIMARY KEY (`idConsola`),
  ADD UNIQUE KEY `idConsola` (`idConsola`);

--
-- Indices de la tabla `detallefactura`
--
ALTER TABLE `detallefactura`
  ADD PRIMARY KEY (`fk_pk_Factura`,`fk_pk_Producto`),
  ADD KEY `fk_pk_Producto` (`fk_pk_Producto`),
  ADD KEY `fk_pk_Factura` (`fk_pk_Factura`);

--
-- Indices de la tabla `envios`
--
ALTER TABLE `envios`
  ADD PRIMARY KEY (`fk_pk_Factura`),
  ADD UNIQUE KEY `fk_pk_Factura` (`fk_pk_Factura`),
  ADD KEY `idEstadoEnvio` (`idEstadoEnvio`);

--
-- Indices de la tabla `estadoenvio`
--
ALTER TABLE `estadoenvio`
  ADD PRIMARY KEY (`idEstadoEnvio`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`idFactura`,`idCliente`) USING BTREE,
  ADD KEY `idFormaPago` (`idFormaPago`),
  ADD KEY `idCliente` (`idCliente`);

--
-- Indices de la tabla `formapago`
--
ALTER TABLE `formapago`
  ADD PRIMARY KEY (`idFormaPago`);

--
-- Indices de la tabla `generojuego`
--
ALTER TABLE `generojuego`
  ADD PRIMARY KEY (`idGeneroJuego`);

--
-- Indices de la tabla `juego`
--
ALTER TABLE `juego`
  ADD PRIMARY KEY (`idJuego`),
  ADD UNIQUE KEY `idJuego` (`idJuego`);

--
-- Indices de la tabla `marca`
--
ALTER TABLE `marca`
  ADD PRIMARY KEY (`idMarca`);

--
-- Indices de la tabla `plataforma`
--
ALTER TABLE `plataforma`
  ADD PRIMARY KEY (`idPlataforma`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idProducto`,`idAdministrador_crear`),
  ADD KEY `producto_ibfk_1` (`idAdministrador_crear`),
  ADD KEY `producto_ibfk_2` (`idTipoProducto`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `soporte`
--
ALTER TABLE `soporte`
  ADD PRIMARY KEY (`idCliente`);

--
-- Indices de la tabla `tipoproducto`
--
ALTER TABLE `tipoproducto`
  ADD PRIMARY KEY (`idTipoProducto`);

--
-- Indices de la tabla `tipo_documento`
--
ALTER TABLE `tipo_documento`
  ADD PRIMARY KEY (`t_doc`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `roles_fk` (`idRol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `idAdministrador` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `consola`
--
ALTER TABLE `consola`
  MODIFY `idConsola` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `idFactura` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `juego`
--
ALTER TABLE `juego`
  MODIFY `idJuego` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `idRol` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD CONSTRAINT `administrador_ibfk_2` FOREIGN KEY (`pf_fk_tdoc`) REFERENCES `tipo_documento` (`t_doc`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `administrador_ibfk_3` FOREIGN KEY (`idAdministrador`) REFERENCES `usuario` (`idUsuario`);

--
-- Filtros para la tabla `aux_genero`
--
ALTER TABLE `aux_genero`
  ADD CONSTRAINT `aux_genero` FOREIGN KEY (`fk_pk_genero`) REFERENCES `generojuego` (`idGeneroJuego`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `aux_juego` FOREIGN KEY (`fk_pk_juego`) REFERENCES `juego` (`idJuego`);

--
-- Filtros para la tabla `aux_marca`
--
ALTER TABLE `aux_marca`
  ADD CONSTRAINT `aux_marca` FOREIGN KEY (`fk_pk_marca`) REFERENCES `marca` (`idMarca`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `aux_producto` FOREIGN KEY (`fk_pk_producto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `aux_plataforma`
--
ALTER TABLE `aux_plataforma`
  ADD CONSTRAINT `aux_plataforma_ibfk_1` FOREIGN KEY (`idJuego`) REFERENCES `juego` (`idJuego`) ON DELETE CASCADE,
  ADD CONSTRAINT `aux_plataforma_ibfk_2` FOREIGN KEY (`idPlataforma`) REFERENCES `plataforma` (`idPlataforma`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `calificacion`
--
ALTER TABLE `calificacion`
  ADD CONSTRAINT `calificacion_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `calificacion_ibfk_3` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `calificacionfinal`
--
ALTER TABLE `calificacionfinal`
  ADD CONSTRAINT `calificacionfinal_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `caracteristicasconsola`
--
ALTER TABLE `caracteristicasconsola`
  ADD CONSTRAINT `caracteristicasconsola_ibfk_1` FOREIGN KEY (`idConsola`) REFERENCES `consola` (`idConsola`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `usuario` (`idUsuario`);

--
-- Filtros para la tabla `consola`
--
ALTER TABLE `consola`
  ADD CONSTRAINT `consola_ibfk_1` FOREIGN KEY (`idConsola`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detallefactura`
--
ALTER TABLE `detallefactura`
  ADD CONSTRAINT `detallefactura_ibfk_1` FOREIGN KEY (`fk_pk_Factura`) REFERENCES `factura` (`idFactura`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detallefactura_ibfk_2` FOREIGN KEY (`fk_pk_Producto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `envios`
--
ALTER TABLE `envios`
  ADD CONSTRAINT `envios_ibfk_1` FOREIGN KEY (`fk_pk_Factura`) REFERENCES `factura` (`idFactura`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `envios_ibfk_2` FOREIGN KEY (`idEstadoEnvio`) REFERENCES `estadoenvio` (`idEstadoEnvio`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_ibfk_2` FOREIGN KEY (`idFormaPago`) REFERENCES `formapago` (`idFormaPago`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `factura_ibfk_3` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `juego`
--
ALTER TABLE `juego`
  ADD CONSTRAINT `juego_ibfk_1` FOREIGN KEY (`idJuego`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`idAdministrador_crear`) REFERENCES `administrador` (`idAdministrador`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`idTipoProducto`) REFERENCES `tipoproducto` (`idTipoProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `soporte`
--
ALTER TABLE `soporte`
  ADD CONSTRAINT `soporte_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `roles_fk` FOREIGN KEY (`idRol`) REFERENCES `roles` (`idRol`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
