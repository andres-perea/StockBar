-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-04-2024 a las 16:08:39
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
  `imagen` varchar(255) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `categoria_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bebidas`
--

INSERT INTO `bebidas` (`codigo`, `nombre`, `precio`, `cantidad`, `descripcion`, `imagen`, `fecha_creacion`, `categoria_id`) VALUES
(521981, 'vodka', 50000.00, 4, 'litro', 'server/controllers/img/vodka.png', '2024-04-25 13:20:37', 4),
(579560, 'Cerveza Aguila', 5650.00, 15, 'añañai', 'img/aguardiente.png', '2024-04-25 13:01:09', 7),
(625627, 'smirnoff ', 60000.00, 80, 'litro', 'img/aguardiente.png', '2024-04-25 13:17:12', 4);

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
(29, 4, '2024-04-25 13:20:37', 50000.00, 521981, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_movimiento`
--

CREATE TABLE `historial_movimiento` (
  `id_historial` int(11) NOT NULL,
  `tipo_movimiento` varchar(255) DEFAULT NULL,
  `cantidad_movimiento` varchar(255) DEFAULT NULL,
  `saldo` decimal(10,2) NOT NULL DEFAULT 0.00,
  `fecha_movimiento` date NOT NULL,
  `hora_movimiento` time DEFAULT NULL,
  `producto_codigo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial_movimiento`
--

INSERT INTO `historial_movimiento` (`id_historial`, `tipo_movimiento`, `cantidad_movimiento`, `saldo`, `fecha_movimiento`, `hora_movimiento`, `producto_codigo`) VALUES
(69, 'entrada', '40', 0.00, '2024-04-24', '07:39:19', 149642),
(70, 'entrada', '30', 0.00, '2024-04-24', '07:53:51', 413326),
(71, 'entrada', '30', 0.00, '2024-04-24', '08:14:06', 253023),
(72, 'entrada', '30', 0.00, '2024-04-24', '08:17:06', 843861),
(73, 'entrada', '30', 0.00, '2024-04-24', '08:18:38', 564123),
(74, 'entrada', '30', 0.00, '2024-04-24', '08:25:07', 867306),
(75, 'entrada', '20', 0.00, '2024-04-24', '08:49:43', 29536),
(76, 'entrada', '30', 0.00, '2024-04-25', '07:11:46', 401946),
(77, 'entrada', '30', 0.00, '2024-04-25', '07:16:09', 179716),
(78, 'entrada', '30', 109500.00, '2024-04-25', '07:21:27', 924569);

--
-- Disparadores `historial_movimiento`
--
DELIMITER $$
CREATE TRIGGER `actualizar_saldo_despues_insert` AFTER INSERT ON `historial_movimiento` FOR EACH ROW BEGIN
    DECLARE nuevo_saldo DECIMAL(10, 2);
    
    -- Obtener el saldo actual del producto
    SELECT saldo INTO nuevo_saldo
    FROM saldo_producto
    WHERE producto_codigo = NEW.producto_codigo
    ORDER BY id_historial DESC
    LIMIT 1;
    
    -- Actualizar el saldo
    IF nuevo_saldo IS NOT NULL THEN
        SET nuevo_saldo = nuevo_saldo + (NEW.cantidad_movimiento * (CASE WHEN NEW.tipo_movimiento = 'entrada' THEN 1 ELSE -1 END));
    ELSE
        SET nuevo_saldo = NEW.cantidad_movimiento * (CASE WHEN NEW.tipo_movimiento = 'entrada' THEN 1 ELSE -1 END);
    END IF;
    
    -- Actualizar la tabla de saldo
    INSERT INTO saldo_producto (producto_codigo, saldo)
    VALUES (NEW.producto_codigo, nuevo_saldo)
    ON DUPLICATE KEY UPDATE saldo = nuevo_saldo;
END
$$
DELIMITER ;

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
(12, 5, '2024-04-24 12:40:23', 149642);

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
-- Estructura de tabla para la tabla `saldo_producto`
--

CREATE TABLE `saldo_producto` (
  `producto_codigo` int(11) NOT NULL,
  `saldo` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(21, '08:00:27', 30, 'salida', 0, 924569, NULL);

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
(1, 'andresPerea', 'andres@gmail.com', '$2a$10$nyd1wkn56vXGkCGia4/2tOV6XikrcpXjmHVsq6zlbr7Pje99EFpBy');

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
-- Indices de la tabla `saldo_producto`
--
ALTER TABLE `saldo_producto`
  ADD PRIMARY KEY (`producto_codigo`);

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
  MODIFY `id_entrada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `historial_movimiento`
--
ALTER TABLE `historial_movimiento`
  MODIFY `id_historial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `salida_productos`
--
ALTER TABLE `salida_productos`
  MODIFY `id_salida` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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

--
-- Filtros para la tabla `saldo_producto`
--
ALTER TABLE `saldo_producto`
  ADD CONSTRAINT `saldo_producto_ibfk_1` FOREIGN KEY (`producto_codigo`) REFERENCES `bebidas` (`codigo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
