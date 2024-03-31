-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-04-2024 a las 01:15:01
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bebidas`
--

CREATE TABLE `bebidas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bebidas`
--

INSERT INTO `bebidas` (`id`, `nombre`, `precio`, `cantidad`, `fecha_creacion`) VALUES
(19, 'Ron Caldas', 25000, 45, '2024-03-27 19:42:25'),
(20, 'Aguardiente Antioqueño', 12500, 90, '2024-03-27 19:43:35'),
(22, 'Cerveza Red', 3500, 45, '2024-03-28 19:32:50'),
(23, 'Cerveza Corona', 6000, 30, '2024-03-28 20:00:18');

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
CREATE TRIGGER `salida` AFTER DELETE ON `bebidas` FOR EACH ROW BEGIN
    INSERT INTO salida_productos (fecha_salida, cantidad_salida, motivo_salida, producto_id)
    VALUES (CURRENT_TIMESTAMP(), OLD.cantidad, 'salida', OLD.id);
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
(19, 120, '2024-03-28 21:06:16', 19500, NULL, 24);

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
(26, 'Salida', '40', '2024-03-31', '16:13:10', 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `fecha_pedido` date DEFAULT NULL,
  `cantidad_pedido` date DEFAULT NULL,
  `producto_id` int(11) DEFAULT NULL
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
(20, '16:13:10', 40, 'salida', 18, NULL);

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
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `producto_id` (`producto_id`);

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
-- AUTO_INCREMENT de la tabla `bebidas`
--
ALTER TABLE `bebidas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `entrada_productos`
--
ALTER TABLE `entrada_productos`
  MODIFY `id_entrada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `historial_movimiento`
--
ALTER TABLE `historial_movimiento`
  MODIFY `id_historial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `salida_productos`
--
ALTER TABLE `salida_productos`
  MODIFY `id_salida` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

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
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `bebidas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
