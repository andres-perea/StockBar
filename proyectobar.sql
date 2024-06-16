-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-06-2024 a las 05:34:29
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
(935695, 'Cerveza Poker', 6350.00, 5, 'hhh', 'cervezaPoker.jfif', '2024-06-16 02:08:41', 10);

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
(10, 'Energizantes');

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
(39, 50, '2024-05-29 15:12:05', 4000.00, 944867, NULL),
(40, 30, '2024-05-29 15:14:25', 3250.00, 845910, NULL),
(41, 50, '2024-06-16 02:08:41', 6350.00, 935695, NULL);

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
  `saldo` decimal(10,2) DEFAULT 0.00,
  `fecha_movimiento` datetime NOT NULL,
  `producto_codigo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial_movimiento`
--

INSERT INTO `historial_movimiento` (`id_historial`, `tipo_movimiento`, `cantidad_movimiento`, `saldo`, `fecha_movimiento`, `producto_codigo`) VALUES
(110, 'Entrada al inventario', '50', 50.00, '2024-05-29 10:12:05', 944867),
(111, 'Salida del inventario', '10', 40.00, '2024-05-29 10:12:51', 944867),
(112, 'Entrada al inventario', '30', 30.00, '2024-05-29 10:14:25', 845910),
(113, 'Salida del inventario', '15', 15.00, '2024-05-29 10:15:04', 845910),
(114, 'Salida del inventario', '40', 0.00, '2024-06-12 08:35:55', 944867),
(115, 'Salida del inventario', '15', 0.00, '2024-06-12 23:17:43', 845910),
(116, 'Entrada al inventario', '50', 50.00, '2024-06-15 21:08:41', 935695),
(117, 'Salida del inventario', '5', 45.00, '2024-06-15 21:32:38', 935695),
(118, 'Salida del inventario', '10', 35.00, '2024-06-15 21:43:54', 935695),
(119, 'Salida del inventario', '30', 5.00, '2024-06-15 21:47:15', 935695);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fecha_pedido` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `nombre_cliente` varchar(100) NOT NULL,
  `mesa_reserva` enum('1','2','3','4','5','6','7','8','9','10') NOT NULL,
  `codigo_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id_pedido`, `cantidad`, `fecha_pedido`, `nombre_cliente`, `mesa_reserva`, `codigo_producto`) VALUES
(24, 10, '2024-05-29 15:12:51', '', '1', 944867),
(25, 15, '2024-05-29 15:15:04', '', '1', 845910),
(26, 5, '2024-06-16 02:32:38', 'g', '8', 935695),
(27, 10, '2024-06-16 02:43:54', 'Fede', '4', 935695),
(28, 30, '2024-06-16 02:47:15', 'Oscar', '2', 935695);

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
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id` int(11) NOT NULL,
  `nombre_cliente` varchar(100) NOT NULL,
  `numero_mesa` enum('1','2','3','4','5','6','7','8','9','10') NOT NULL,
  `fecha_hora_reserva` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id`, `nombre_cliente`, `numero_mesa`, `fecha_hora_reserva`) VALUES
(2, 'Tifanny Lopez', '5', '2024-06-12 22:44:50'),
(3, 'Tifanny Lopez', '5', '2024-06-12 23:33:40'),
(4, 'Tifanny Lopez', '5', '2024-06-12 23:35:10');

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
(49, '10:12:51', 10, 'Venta realizada', 0, 944867, NULL),
(50, '10:15:04', 15, 'Venta realizada', 0, 845910, NULL),
(51, '08:35:55', 40, 'salida', 0, 944867, NULL),
(52, '23:17:43', 15, 'salida', 0, 845910, NULL),
(53, '21:32:38', 5, 'Venta realizada', 0, 935695, NULL),
(54, '21:43:54', 10, 'Venta realizada', 0, 935695, NULL),
(55, '21:47:15', 30, 'Venta realizada', 0, 935695, NULL);

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
(8, 'andresSanchez', 'andres@gmail.com', '$2a$10$rupwnL1lVHESpW/CHpRLNuwOQ94Aqk4YrrZleWfgTXsQJlgXg10cm'),
(9, 'andresSanchez', 'andres@gmail.com', '$2a$10$gOH6jX/JQb.GcHu27e7xiubIb3YWdzldyntzKoISSxEU7T7GxoKVK'),
(10, 'andresSanchez', 'andres@gmail.com', '$2a$10$K3a1on2tSQ05VHPMeoaC0u8Q9FguOfsS5vztSaYK8PiCnm3sAZ52u'),
(11, 'andresSanchez', 'andres@gmail.com', '$2a$10$kFfRLw13CuufxOyObnEjxuhBehkoISvzVOkaVY3PSkpTaMGD5R0qG'),
(12, 'andres villa', 'villa@gmail.com', '$2a$10$3nlCP6FdWO4H3IGTPYalJ.v.pIQ8Zg6BlX1t15Nwj5pDXid8TYqJq'),
(14, 'andresPerea', 'andresperea1003@gmail.com', '$2a$10$6T3kR/WM2NOXJXnB9h88Iug8IhaiTS2/sRBGKqK9wj/Fb2eEEM6Om');

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
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `entrada_productos`
--
ALTER TABLE `entrada_productos`
  MODIFY `id_entrada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `historial_movimiento`
--
ALTER TABLE `historial_movimiento`
  MODIFY `id_historial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `salida_productos`
--
ALTER TABLE `salida_productos`
  MODIFY `id_salida` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

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
