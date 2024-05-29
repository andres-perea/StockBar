-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-05-2024 a las 18:07:02
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectobar`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `nueva_salida_producto` ()   BEGIN
    DECLARE codigo INT;
    DECLARE cantidad INT;

    -- Obtener el id de la bebida y la cantidad del nuevo pedido
    SELECT NEW.codigo, NEW.cantidad INTO codigo, cantidad;

    -- Insertar un registro en la tabla de salida_productos
    INSERT INTO salida_productos (fecha_salida, cantidad_salida, motivo_salida, producto_id)
    VALUES (NOW(), cantidad, 'Venta realizada', codigo);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bebidas`
--

CREATE TABLE `bebidas` (
  `codigo` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `descripcion` varchar(255) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `categoria_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bebidas`
--

INSERT INTO `bebidas` (`codigo`, `nombre`, `precio`, `cantidad`, `descripcion`, `imagen`, `fecha_creacion`, `categoria_id`) VALUES
(396201, 'Cerveza Red', 4550.00, 24, 'a', 'img/Desarrollo web.jpg', '2024-05-02 12:26:35', 4),

(528745, 'Cerveza Club Colombia', 6050.00, 29, 'Cerveza en lata hecha en colombia', 'img/Desarrollo de software de gestiÃ³n empresarial.jpg', '2024-05-20 15:19:23', 7),
(579560, 'Cerveza Aguila', 5650.00, 14, 'añañai', 'img/aguardiente.png', '2024-04-25 13:01:09', 7),
(625627, 'smirnoff ', 60000.00, 77, 'litro', 'img/aguardiente.png', '2024-04-25 13:17:12', 4),
(664371, 'Cerveza Corona', 3650.00, 9, 'Ñ', 'img/aguardiente.png', '2024-05-02 12:19:55', 7),
(696013, 'Aguardiente Antioqueño', 12500.00, 9, 'Aguardiente creado en las altas montañas de medellin', 'img/aguardiente.png', '2024-05-20 15:26:48', 4),
(893832, 'Whisky norteño', 21000.00, 20, 'ñl', 'img/aguardiente.png', '2024-05-20 16:03:43', 5),
(987891, 'Cerveza Poker', 4550.00, 24, 'a', 'img/Desarrollo web.jpg', '2024-05-02 12:42:23', 4);

--
-- Disparadores `bebidas`
--
DELIMITER $$
CREATE TRIGGER `eliminar_producto_cantidad_cero` AFTER UPDATE ON `bebidas` FOR EACH ROW BEGIN
    IF NEW.cantidad = 0 THEN
        DELETE FROM bebidas WHERE codigo = NEW.codigo;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `entrada` AFTER INSERT ON `bebidas` FOR EACH ROW BEGIN
    INSERT INTO entrada_productos (cantidad_entrada, fecha_entrada, precio_compra, producto_codigo)
    VALUES (NEW.cantidad, CURRENT_TIMESTAMP(), NEW.precio, NEW.codigo);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `generar_codigo` BEFORE INSERT ON `bebidas` FOR EACH ROW BEGIN
    DECLARE nuevo_codigo INT;
    SET nuevo_codigo = FLOOR(RAND() * 1000000); -- Generar un número aleatorio de 6 dígitos
    
    -- Verificar si el código generado ya existe en la tabla
    WHILE EXISTS (SELECT 1 FROM bebidas WHERE codigo = nuevo_codigo) DO
        SET nuevo_codigo = FLOOR(RAND() * 1000000);
    END WHILE;
    
    -- Asignar el nuevo código generado al nuevo registro
    SET NEW.codigo = nuevo_codigo;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `salida` AFTER DELETE ON `bebidas` FOR EACH ROW BEGIN
    INSERT INTO salida_productos (fecha_salida, cantidad_salida, motivo_salida, producto_codigo)
    VALUES (CURRENT_TIMESTAMP(), OLD.cantidad, 'salida', OLD.codigo);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`) VALUES
(4, 'Picantico'),
(5, 'Fuertesss'),
(7, 'Lo Mejorcito'),
(8, 'Las sixpack');

--
-- Disparadores `categorias`
--
DELIMITER $$
CREATE TRIGGER `after_delete_categoria` AFTER DELETE ON `categorias` FOR EACH ROW BEGIN
  UPDATE bebidas
  SET categoria_id = NULL
  WHERE categoria_id = OLD.id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrada_productos`
--

CREATE TABLE `entrada_productos` (
  `id_entrada` int(11) NOT NULL,
  `cantidad_entrada` int(11) DEFAULT NULL,
  `fecha_entrada` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `precio_compra` decimal(10,2) DEFAULT NULL,
  `producto_codigo` int(11) DEFAULT NULL,
  `historial_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `entrada_productos`
--

INSERT INTO `entrada_productos` (`id_entrada`, `cantidad_entrada`, `fecha_entrada`, `precio_compra`, `producto_codigo`, `historial_id`) VALUES
(1, 30, '2024-04-17 15:06:20', 60000.00, 748955, NULL),
(2, 20, '2024-04-18 13:36:37', 32000.00, 303065, NULL),
(14, 50, '2024-04-22 16:20:10', 10.00, 264698, NULL),
(16, 40, '2024-04-24 12:39:19', 2650.00, 149642, NULL),
(17, 30, '2024-04-24 12:53:51', 12500.00, 413326, NULL),
(18, 30, '2024-04-24 13:14:06', 3550.00, 253023, NULL),
(19, 30, '2024-04-24 13:17:06', 3550.00, 843861, NULL),
(20, 30, '2024-04-24 13:18:38', 3550.00, 564123, NULL),
(21, 30, '2024-04-24 13:25:07', 3550.00, 867306, NULL),
(22, 20, '2024-04-24 13:49:43', 32500.00, 29536, NULL),
(23, 30, '2024-04-25 12:11:46', 25000.00, 401946, NULL),
(24, 30, '2024-04-25 12:16:09', 3650.00, 179716, NULL),
(26, 30, '2024-04-25 12:21:27', 3650.00, 924569, NULL),
(27, 15, '2024-04-25 13:01:09', 5650.00, 579560, NULL),
(28, 80, '2024-04-25 13:17:12', 60000.00, 625627, NULL),
(29, 4, '2024-04-25 13:20:37', 50000.00, 521981, NULL),
(30, 10, '2024-05-02 12:19:55', 3650.00, 664371, NULL),
(31, 25, '2024-05-02 12:26:35', 4550.00, 396201, NULL),
(32, 25, '2024-05-02 12:42:23', 4550.00, 987891, NULL),
(33, 30, '2024-05-20 15:19:23', 6050.00, 528745, NULL),
(34, 10, '2024-05-20 15:26:48', 12500.00, 696013, NULL),
(35, 30, '2024-05-20 16:03:43', 21000.00, 893832, NULL);

--
-- Disparadores `entrada_productos`
--
DELIMITER $$
CREATE TRIGGER `after_insert_entrada_productos` AFTER INSERT ON `entrada_productos` FOR EACH ROW BEGIN
    INSERT INTO historial_movimiento (
        tipo_movimiento, 
        cantidad_movimiento, 
        saldo, 
        fecha_movimiento, 
        producto_codigo
    ) 
    VALUES (
        'Entrada al inventario', 
        NEW.cantidad_entrada, 
        NEW.cantidad_entrada, 
        NEW.fecha_entrada, 
        NEW.producto_codigo
    );
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_movimiento`
--

CREATE TABLE `historial_movimiento` (
  `id_historial` int(11) NOT NULL,
  `tipo_movimiento` varchar(255) DEFAULT NULL,
  `cantidad_movimiento` varchar(255) DEFAULT NULL,
  `saldo` decimal(10,2) NOT NULL DEFAULT 0.00,
  `fecha_movimiento` datetime NOT NULL,
  `producto_codigo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial_movimiento`
--

INSERT INTO `historial_movimiento` (`id_historial`, `tipo_movimiento`, `cantidad_movimiento`, `saldo`, `fecha_movimiento`, `producto_codigo`) VALUES
(69, 'entrada', '40', 0.00, '2024-04-24 00:00:00', 149642),
(70, 'entrada', '30', 0.00, '2024-04-24 00:00:00', 413326),
(71, 'entrada', '30', 0.00, '2024-04-24 00:00:00', 253023),
(72, 'entrada', '30', 0.00, '2024-04-24 00:00:00', 843861),
(73, 'entrada', '30', 0.00, '2024-04-24 00:00:00', 564123),
(74, 'entrada', '30', 0.00, '2024-04-24 00:00:00', 867306),
(75, 'entrada', '20', 0.00, '2024-04-24 00:00:00', 29536),
(76, 'entrada', '30', 0.00, '2024-04-25 00:00:00', 401946),
(77, 'entrada', '30', 0.00, '2024-04-25 00:00:00', 179716),
(78, 'entrada', '30', 109500.00, '2024-04-25 00:00:00', 924569),
(79, 'Entrada', '10', 0.00, '2024-05-20 10:26:48', 696013),
(80, 'Salida', '1', -1.00, '2024-05-20 10:36:37', 396201),
(82, 'Salida', '1', -1.00, '2024-05-20 10:36:37', 528745),
(84, 'Salida', '1', -1.00, '2024-05-20 10:36:37', 579560),
(86, 'Salida', '1', -1.00, '2024-05-20 10:36:37', 664371),
(88, 'Salida', '1', -1.00, '2024-05-20 10:36:37', 696013),
(90, 'Salida', '1', -1.00, '2024-05-20 10:36:37', 987891),
(92, 'Entrada al inventario', '30', 30.00, '2024-05-20 11:03:43', 893832),
(93, 'Salida del inventario', '10', 20.00, '2024-05-20 11:04:02', 893832);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fecha_pedido` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `codigo_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id_pedido`, `cantidad`, `fecha_pedido`, `codigo_producto`) VALUES
(1, 1, '2024-04-17 12:18:42', 861677),
(2, 5, '2024-04-17 12:33:33', 613512),
(3, 5, '2024-04-17 12:36:05', 613512),
(4, 5, '2024-04-17 12:40:45', 814428),
(5, 15, '2024-04-17 12:42:00', 861677),
(10, 5, '2024-04-17 13:19:00', 861677),
(11, 5, '2024-04-17 13:22:31', 861677),
(12, 5, '2024-04-24 12:40:23', 149642),
(13, 3, '2024-05-02 12:01:50', 625627),
(14, 1, '2024-05-20 15:36:37', 396201),
(15, 1, '2024-05-20 15:36:37', 528745),
(16, 1, '2024-05-20 15:36:37', 579560),
(17, 1, '2024-05-20 15:36:37', 664371),
(18, 1, '2024-05-20 15:36:37', 696013),
(19, 1, '2024-05-20 15:36:37', 987891),
(20, 10, '2024-05-20 16:04:02', 893832);

--
-- Disparadores `pedidos`
--
DELIMITER $$
CREATE TRIGGER `after_pedido_insert` AFTER INSERT ON `pedidos` FOR EACH ROW BEGIN
    DECLARE codigo_producto INT;
    DECLARE cantidad INT;

    -- Obtener el id de la bebida y la cantidad del nuevo pedido
    SELECT NEW.codigo_producto, NEW.cantidad INTO codigo_producto, cantidad;

    -- Insertar un registro en la tabla de salida_productos
    INSERT INTO salida_productos (fecha_salida, cantidad_salida, motivo_salida, producto_codigo)
    VALUES (NOW(), cantidad, 'Venta realizada', codigo_producto);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `restar_cantidad_bebida` AFTER INSERT ON `pedidos` FOR EACH ROW BEGIN
    -- Actualizar la cantidad en la tabla de bebidas
    UPDATE bebidas
    SET cantidad = cantidad - NEW.cantidad
    WHERE codigo = NEW.codigo_producto;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salida_productos`
--

CREATE TABLE `salida_productos` (
  `id_salida` int(11) NOT NULL,
  `fecha_salida` time DEFAULT NULL,
  `cantidad_salida` int(11) DEFAULT NULL,
  `motivo_salida` varchar(255) DEFAULT NULL,
  `precio_venta` int(11) NOT NULL,
  `producto_codigo` int(11) DEFAULT NULL,
  `historial_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `salida_productos`
--

INSERT INTO `salida_productos` (`id_salida`, `fecha_salida`, `cantidad_salida`, `motivo_salida`, `precio_venta`, `producto_codigo`, `historial_id`) VALUES
(1, '08:19:00', 5, 'Venta realizada', 0, 861677, NULL),
(2, '08:22:31', 5, 'Venta realizada', 0, 861677, NULL),
(5, '08:33:13', 40, 'salida', 0, 861677, NULL),
(6, '10:34:39', 30, 'salida', 0, 748955, NULL),
(7, '08:43:32', 20, 'salida', 0, 303065, NULL),
(8, '11:22:34', 25, 'salida', 0, 264698, NULL),
(9, '07:40:23', 5, 'Venta realizada', 0, 149642, NULL),
(10, '07:54:58', 30, 'salida', 0, 413326, NULL),
(11, '08:18:24', 30, 'salida', 0, 843861, NULL),
(12, '08:18:31', 30, 'salida', 0, 253023, NULL),
(13, '08:18:33', 35, 'salida', 0, 149642, NULL),
(14, '08:25:04', 30, 'salida', 0, 564123, NULL),
(15, '08:54:19', 30, 'salida', 0, 867306, NULL),
(16, '08:00:06', 20, 'salida', 0, 29536, NULL),
(17, '08:00:15', 30, 'salida', 0, 179716, NULL),
(18, '08:00:18', 30, 'salida', 0, 401946, NULL),
(19, '08:00:21', 25, 'salida', 0, 613512, NULL),
(20, '08:00:24', 5, 'salida', 0, 814428, NULL),
(21, '08:00:27', 30, 'salida', 0, 924569, NULL),
(22, '07:01:50', 3, 'Venta realizada', 0, 625627, NULL),
(23, '10:36:37', 1, 'Venta realizada', 0, 396201, NULL),
(24, '10:36:37', 1, 'Venta realizada', 0, 528745, NULL),
(25, '10:36:37', 1, 'Venta realizada', 0, 579560, NULL),
(26, '10:36:37', 1, 'Venta realizada', 0, 664371, NULL),
(27, '10:36:37', 1, 'Venta realizada', 0, 696013, NULL),
(28, '10:36:37', 1, 'Venta realizada', 0, 987891, NULL),
(29, '11:04:02', 10, 'Venta realizada', 0, 893832, NULL);

--
-- Disparadores `salida_productos`
--
DELIMITER $$
CREATE TRIGGER `after_salida_productos_insert` AFTER INSERT ON `salida_productos` FOR EACH ROW BEGIN
    DECLARE new_saldo DECIMAL(10,2);

    -- Obtener el saldo actual del producto
    SELECT saldo INTO new_saldo
    FROM historial_movimiento
    WHERE producto_codigo = NEW.producto_codigo
    ORDER BY fecha_movimiento DESC
    LIMIT 1;

    -- Calcular el nuevo saldo después de la salida
    SET new_saldo = new_saldo - NEW.cantidad_salida;

    -- Insertar el registro en la tabla historial_movimiento
    INSERT INTO historial_movimiento (
        tipo_movimiento,
        cantidad_movimiento,
        saldo,
        fecha_movimiento,
        producto_codigo
    ) VALUES (
        'Salida del inventario',
        NEW.cantidad_salida,
        new_saldo,
        NOW(),
        NEW.producto_codigo
    );
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombreUsuario` varchar(255) DEFAULT NULL,
  `correoElectronico` varchar(255) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombreUsuario`, `correoElectronico`, `contrasena`) VALUES
(1, 'andresPerea', 'andres@gmail.com', '$2a$10$nyd1wkn56vXGkCGia4/2tOV6XikrcpXjmHVsq6zlbr7Pje99EFpBy'),
(8, 'andresSanchez', 'andres@gmail.com', '$2a$10$rupwnL1lVHESpW/CHpRLNuwOQ94Aqk4YrrZleWfgTXsQJlgXg10cm'),
(9, 'andresSanchez', 'andres@gmail.com', '$2a$10$gOH6jX/JQb.GcHu27e7xiubIb3YWdzldyntzKoISSxEU7T7GxoKVK'),
(10, 'andresSanchez', 'andres@gmail.com', '$2a$10$K3a1on2tSQ05VHPMeoaC0u8Q9FguOfsS5vztSaYK8PiCnm3sAZ52u'),
(11, 'andresSanchez', 'andres@gmail.com', '$2a$10$kFfRLw13CuufxOyObnEjxuhBehkoISvzVOkaVY3PSkpTaMGD5R0qG'),
(12, 'andres villa', 'villa@gmail.com', '$2a$10$3nlCP6FdWO4H3IGTPYalJ.v.pIQ8Zg6BlX1t15Nwj5pDXid8TYqJq');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bebidas`
--
ALTER TABLE `bebidas`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `fk_categoria_id` (`categoria_id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `entrada_productos`
--
ALTER TABLE `entrada_productos`
  ADD PRIMARY KEY (`id_entrada`),
  ADD KEY `producto_codigo` (`producto_codigo`),
  ADD KEY `fk_historial_id` (`historial_id`);

--
-- Indices de la tabla `historial_movimiento`
--
ALTER TABLE `historial_movimiento`
  ADD PRIMARY KEY (`id_historial`),
  ADD KEY `producto_id` (`producto_codigo`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `codigo_producto` (`codigo_producto`);

--
-- Indices de la tabla `salida_productos`
--
ALTER TABLE `salida_productos`
  ADD PRIMARY KEY (`id_salida`),
  ADD KEY `fk_nombre_historial` (`historial_id`),
  ADD KEY `salida_productos_ibfk_1` (`producto_codigo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `entrada_productos`
--
ALTER TABLE `entrada_productos`
  MODIFY `id_entrada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `historial_movimiento`
--
ALTER TABLE `historial_movimiento`
  MODIFY `id_historial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `salida_productos`
--
ALTER TABLE `salida_productos`
  MODIFY `id_salida` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bebidas`
--
ALTER TABLE `bebidas`
  ADD CONSTRAINT `fk_nombre_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`);

--
-- Filtros para la tabla `entrada_productos`
--
ALTER TABLE `entrada_productos`
  ADD CONSTRAINT `fk_historial_id` FOREIGN KEY (`historial_id`) REFERENCES `historial_movimiento` (`id_historial`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
