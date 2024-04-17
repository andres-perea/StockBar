-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-04-2024 a las 18:25:56
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
  `precio` int(11) DEFAULT NULL,
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
(613512, 'Cerveza Corona', 6350, 5, 'Cerveza de 750ml', '', '2024-04-15 13:56:49', 7),
(861677, 'Cerverza Club Colombia', 16500, 65, 'Pack de 6 cervezas en lata de 300ml ', '', '2024-04-15 14:45:51', 8);

--
-- Disparadores `bebidas`
--
DELIMITER $$
CREATE TRIGGER `entrada` AFTER INSERT ON `bebidas` FOR EACH ROW BEGIN
    INSERT INTO entrada_productos (cantidad_entreda, fecha_entrada, precio_compra, producto_id)
    VALUES (NEW.cantidad, CURRENT_TIMESTAMP(), NEW.precio, NEW.id);
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
    INSERT INTO salida_productos (fecha_salida, cantidad_salida, motivo_salida, producto_id)
    VALUES (CURRENT_TIMESTAMP(), OLD.cantidad, 'salida', OLD.id);
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
  `cantidad_entreda` int(11) DEFAULT NULL,
  `fecha_entrada` timestamp NOT NULL DEFAULT current_timestamp(),
  `precio_compra` int(11) DEFAULT NULL,
  `historial_id` int(11) DEFAULT NULL,
  `producto_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `entrada_productos`
--

INSERT INTO `entrada_productos` (`id_entrada`, `cantidad_entreda`, `fecha_entrada`, `precio_compra`, `historial_id`, `producto_id`) VALUES
(1, 20, '2024-03-18 16:22:30', 15500, NULL, 6),
(2, 40, '2024-03-18 16:25:05', 20000, NULL, 7),
(3, 20, '2024-03-18 20:14:01', 14500, NULL, 8),
(4, 30, '2024-03-18 20:24:46', 20000, NULL, 9),
(5, 30, '2024-03-18 20:28:13', 21000, NULL, 10),
(6, 10, '2024-03-18 20:33:00', 15000, NULL, 11),
(7, 16, '2024-03-26 21:43:22', 15000, NULL, 12),
(8, 30, '2024-03-27 16:51:59', 14500, NULL, 13),
(9, 20, '2024-03-27 17:28:54', 32000, NULL, 14),
(10, 5, '2024-03-27 17:56:37', 3200, NULL, 15),
(11, 10, '2024-03-27 18:22:59', 4200, NULL, 16),
(12, 30, '2024-03-27 19:38:59', 3200, NULL, 17),
(13, 40, '2024-03-27 19:41:07', 2900, NULL, 18),
(14, 45, '2024-03-27 19:42:25', 3200, NULL, 19),
(15, 90, '2024-03-27 19:43:35', 12500, NULL, 20),
(16, 30, '2024-03-28 19:19:49', 21000, NULL, 21),
(17, 45, '2024-03-28 19:32:50', 4200, NULL, 22),
(18, 30, '2024-03-28 20:00:18', 6000, NULL, 23),
(19, 120, '2024-03-28 21:06:16', 19500, NULL, 24),
(20, 20, '2024-04-01 12:09:15', 45000, NULL, 25),
(21, 30, '2024-04-01 12:10:36', 75000, NULL, 26),
(22, 30, '2024-04-01 19:48:39', 15600, NULL, 27),
(23, 15, '2024-04-01 19:57:08', 65500, NULL, 28),
(24, 30, '2024-04-01 19:59:57', 75500, NULL, 29),
(25, 60, '2024-04-01 20:12:55', 16500, NULL, 31),
(26, 30, '2024-04-01 22:50:47', 4500, NULL, 32),
(27, 10, '2024-04-08 17:40:32', 73, NULL, 33),
(28, 15, '2024-04-08 17:41:34', 72500, NULL, 34),
(29, 20, '2024-04-08 18:07:33', 26550, NULL, 35),
(30, 40, '2024-04-08 18:09:14', 4600, NULL, 36),
(31, 30, '2024-04-08 18:10:47', 45750, NULL, 37),
(32, 20, '2024-04-15 13:43:28', 16500, NULL, 38),
(33, 30, '2024-04-15 13:48:34', 18500, NULL, 39),
(34, 10, '2024-04-15 13:56:49', 6350, NULL, 40),
(35, 65, '2024-04-15 14:45:51', 16500, NULL, 41);

--
-- Disparadores `entrada_productos`
--
DELIMITER $$
CREATE TRIGGER `historial_entrada` AFTER INSERT ON `entrada_productos` FOR EACH ROW BEGIN
    INSERT INTO historial_movimiento (tipo_movimiento, cantidad_movimiento, fecha_movimiento, hora_movimiento, producto_id)
    VALUES ('Entrada', NEW.cantidad_entreda, CURRENT_DATE(), CURRENT_TIME(), NEW.producto_id);
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
  `fecha_movimiento` date NOT NULL,
  `hora_movimiento` time DEFAULT NULL,
  `producto_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial_movimiento`
--

INSERT INTO `historial_movimiento` (`id_historial`, `tipo_movimiento`, `cantidad_movimiento`, `fecha_movimiento`, `hora_movimiento`, `producto_id`) VALUES
(1, 'entrada', '40', '2024-03-18', '11:25:05', 7),
(3, 'Entrada', '30', '2024-03-18', '15:24:46', 9),
(4, 'Entrada', '30', '2024-03-18', '15:28:13', 10),
(5, 'Entrada', '10', '2024-03-18', '15:33:00', 11),
(6, 'Entrada', '16', '2024-03-26', '16:43:22', 12),
(7, 'Entrada', '30', '2024-03-27', '11:51:59', 13),
(8, 'Salida', '30', '2024-03-27', '11:52:53', 13),
(9, 'Entrada', '20', '2024-03-27', '12:28:54', 14),
(10, 'Salida', '20', '2024-03-27', '12:51:19', 14),
(11, 'Entrada', '5', '2024-03-27', '12:56:37', 15),
(12, 'Entrada', '10', '2024-03-27', '13:22:59', 16),
(13, 'Salida', '5', '2024-03-27', '14:37:07', 15),
(14, 'Salida', '10', '2024-03-27', '14:38:13', 16),
(15, 'Entrada', '30', '2024-03-27', '14:38:59', 17),
(16, 'Salida', '30', '2024-03-27', '14:40:14', 17),
(17, 'Entrada', '40', '2024-03-27', '14:41:07', 18),
(18, 'Entrada', '45', '2024-03-27', '14:42:25', 19),
(19, 'Entrada', '90', '2024-03-27', '14:43:35', 20),
(20, 'Entrada', '30', '2024-03-28', '14:19:49', 21),
(21, 'Entrada', '45', '2024-03-28', '14:32:50', 22),
(22, 'Entrada', '30', '2024-03-28', '15:00:18', 23),
(23, 'Entrada', '120', '2024-03-28', '16:06:16', 24),
(24, 'Salida', '30', '2024-03-28', '16:06:48', 21),
(25, 'Salida', '120', '2024-03-31', '15:53:20', 24),
(26, 'Salida', '40', '2024-03-31', '16:13:10', 18),
(27, 'Entrada', '20', '2024-04-01', '07:09:15', 25),
(28, 'Entrada', '30', '2024-04-01', '07:10:36', 26),
(29, 'Entrada', '30', '2024-04-01', '14:48:39', 27),
(30, 'Entrada', '15', '2024-04-01', '14:57:08', 28),
(31, 'Entrada', '30', '2024-04-01', '14:59:57', 29),
(32, 'Salida', '30', '2024-04-01', '15:06:50', 27),
(33, 'Entrada', '60', '2024-04-01', '15:12:55', 31),
(34, 'Salida', '45', '2024-04-01', '15:26:09', 19),
(35, 'Salida', '90', '2024-04-01', '15:26:10', 20),
(36, 'Salida', '45', '2024-04-01', '15:26:11', 22),
(37, 'Salida', '30', '2024-04-01', '15:26:13', 23),
(38, 'Salida', '20', '2024-04-01', '15:26:14', 25),
(39, 'Salida', '30', '2024-04-01', '15:26:15', 26),
(40, 'Salida', '15', '2024-04-01', '15:26:16', 28),
(41, 'Salida', '30', '2024-04-01', '15:26:20', 29),
(42, 'Entrada', '30', '2024-04-01', '17:50:47', 32),
(43, 'Entrada', '10', '2024-04-08', '12:40:32', 33),
(44, 'Salida', '10', '2024-04-08', '12:41:10', 33),
(45, 'Entrada', '15', '2024-04-08', '12:41:34', 34),
(46, 'Entrada', '20', '2024-04-08', '13:07:33', 35),
(47, 'Entrada', '40', '2024-04-08', '13:09:14', 36),
(48, 'Entrada', '30', '2024-04-08', '13:10:47', 37),
(49, 'Salida', '5', '2024-04-11', '14:25:25', 32),
(50, 'Salida', '5', '2024-04-15', '07:46:47', 31),
(51, 'Entrada', '20', '2024-04-15', '08:43:28', 38),
(52, 'Entrada', '30', '2024-04-15', '08:48:34', 39),
(53, 'Entrada', '10', '2024-04-15', '08:56:49', 40),
(54, 'Salida', '5', '2024-04-15', '09:01:28', 31),
(55, 'Salida', '25', '2024-04-15', '09:01:52', 32),
(56, 'Salida', '15', '2024-04-15', '09:01:55', 34),
(57, 'Salida', '20', '2024-04-15', '09:01:59', 35),
(58, 'Salida', '40', '2024-04-15', '09:02:02', 36),
(59, 'Salida', '30', '2024-04-15', '09:02:05', 37),
(60, 'Salida', '20', '2024-04-15', '09:02:08', 38),
(61, 'Salida', '30', '2024-04-15', '09:02:11', 39),
(62, 'Salida', '5', '2024-04-15', '09:41:02', 40),
(63, 'Entrada', '65', '2024-04-15', '09:45:51', 41);

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salida_productos`
--

CREATE TABLE `salida_productos` (
  `id_salida` int(11) NOT NULL,
  `fecha_salida` time DEFAULT NULL,
  `cantidad_salida` int(11) DEFAULT NULL,
  `motivo_salida` varchar(255) NOT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `historial_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `salida_productos`
--

INSERT INTO `salida_productos` (`id_salida`, `fecha_salida`, `cantidad_salida`, `motivo_salida`, `producto_id`, `historial_id`) VALUES
(10, '15:29:06', 0, '', 10, NULL),
(11, '15:33:52', 10, 'salida', 11, NULL),
(12, '11:47:52', 16, 'salida', 12, NULL),
(13, '11:52:53', 30, 'salida', 13, NULL),
(14, '12:51:19', 20, 'salida', 14, NULL),
(15, '14:37:07', 5, 'salida', 15, NULL),
(16, '14:38:13', 10, 'salida', 16, NULL),
(17, '14:40:14', 30, 'salida', 17, NULL),
(18, '16:06:48', 30, 'salida', 21, NULL),
(19, '15:53:20', 120, 'salida', 24, NULL),
(20, '16:13:10', 40, 'salida', 18, NULL),
(21, '15:06:50', 30, 'salida', 27, NULL),
(22, '15:26:09', 45, 'salida', 19, NULL),
(23, '15:26:10', 90, 'salida', 20, NULL),
(24, '15:26:11', 45, 'salida', 22, NULL),
(25, '15:26:13', 30, 'salida', 23, NULL),
(26, '15:26:14', 20, 'salida', 25, NULL),
(27, '15:26:15', 30, 'salida', 26, NULL),
(28, '15:26:16', 15, 'salida', 28, NULL),
(29, '15:26:20', 30, 'salida', 29, NULL),
(30, '12:41:10', 10, 'salida', 33, NULL),
(31, '14:25:25', 5, 'Venta realizada', 32, NULL),
(32, '07:46:47', 5, 'Venta realizada', 31, NULL),
(33, '09:01:28', 5, 'salida', 31, NULL),
(34, '09:01:52', 25, 'salida', 32, NULL),
(35, '09:01:55', 15, 'salida', 34, NULL),
(36, '09:01:59', 20, 'salida', 35, NULL),
(37, '09:02:02', 40, 'salida', 36, NULL),
(38, '09:02:05', 30, 'salida', 37, NULL),
(39, '09:02:08', 20, 'salida', 38, NULL),
(40, '09:02:11', 30, 'salida', 39, NULL),
(41, '09:41:02', 5, 'Venta realizada', 40, NULL);

--
-- Disparadores `salida_productos`
--
DELIMITER $$
CREATE TRIGGER `historial_salida` AFTER INSERT ON `salida_productos` FOR EACH ROW BEGIN
    INSERT INTO historial_movimiento (tipo_movimiento, cantidad_movimiento, fecha_movimiento, hora_movimiento, producto_id)
    VALUES ('Salida', NEW.cantidad_salida, CURRENT_DATE(), CURRENT_TIME(), NEW.producto_id);
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
  ADD KEY `producto_id` (`producto_id`),
  ADD KEY `historial_id` (`historial_id`);

--
-- Indices de la tabla `historial_movimiento`
--
ALTER TABLE `historial_movimiento`
  ADD PRIMARY KEY (`id_historial`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD KEY `codigo_producto` (`codigo_producto`);

--
-- Indices de la tabla `salida_productos`
--
ALTER TABLE `salida_productos`
  ADD PRIMARY KEY (`id_salida`),
  ADD KEY `producto_id` (`producto_id`),
  ADD KEY `historial_id` (`historial_id`);

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
  MODIFY `id_historial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT de la tabla `salida_productos`
--
ALTER TABLE `salida_productos`
  MODIFY `id_salida` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`codigo_producto`) REFERENCES `bebidas` (`codigo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
