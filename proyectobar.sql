-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-04-2024 a las 17:18:45
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
(613512, 'Cerveza Corona', 2500, 25, 'Cerveza de 750ml', '', '2024-04-15 13:56:49', 5),
(814428, 'Cerveza Aguila', 4250, 5, 'Cerveza de 50ml', '', '2024-04-17 12:30:41', 7);

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
  `precio_compra` int(11) DEFAULT NULL,
  `producto_codigo` int(11) DEFAULT NULL,
  `historial_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `entrada_productos`
--

INSERT INTO `entrada_productos` (`id_entrada`, `cantidad_entrada`, `fecha_entrada`, `precio_compra`, `producto_codigo`, `historial_id`) VALUES
(1, 30, '2024-04-17 15:06:20', 60000, 748955, NULL),
(2, 20, '2024-04-18 13:36:37', 32000, 303065, NULL);

--
-- Disparadores `entrada_productos`
--
DELIMITER $$
CREATE TRIGGER `actualizar_saldo_entrada` AFTER INSERT ON `entrada_productos` FOR EACH ROW BEGIN
    DECLARE nuevo_saldo DECIMAL(10, 2);
    
    -- Obtener el saldo anterior del producto
    SELECT COALESCE(saldo, 0.00) INTO nuevo_saldo
    FROM historial_movimiento
    WHERE producto_codigo = NEW.producto_codigo
    ORDER BY id_historial DESC
    LIMIT 1;
    
    -- Calcular el nuevo saldo
    SET nuevo_saldo = nuevo_saldo + (NEW.cantidad_entrada * NEW.precio_compra);
    
    -- Insertar el nuevo registro en historial_movimiento
    INSERT INTO historial_movimiento (tipo_movimiento, cantidad_movimiento, saldo, fecha_movimiento, hora_movimiento, producto_codigo)
    VALUES ('ingreso', NEW.cantidad_entrada, nuevo_saldo, NEW.fecha_entrada, NEW.precio_compra, NEW.producto_codigo);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `registrar_movimiento_entrada` AFTER INSERT ON `entrada_productos` FOR EACH ROW BEGIN
    DECLARE saldo_anterior DECIMAL(10, 2);
    DECLARE nuevo_saldo DECIMAL(10, 2);

    -- Obtener el saldo anterior del producto
    SELECT saldo INTO saldo_anterior FROM historial_movimiento WHERE producto_codigo = NEW.producto_codigo ORDER BY id_historial DESC LIMIT 1;

    -- Calcular el nuevo saldo
    SET nuevo_saldo = saldo_anterior + (NEW.cantidad_entrada * NEW.precio_compra);

    -- Insertar el nuevo registro en historial_movimiento
    INSERT INTO historial_movimiento (tipo_movimiento, cantidad_movimiento, saldo, fecha_movimiento, hora_movimiento, producto_codigo)
    VALUES ('ingreso', NEW.cantidad_entrada, nuevo_saldo, DATE(NOW()), TIME(NOW()), NEW.producto_codigo);
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
  `fecha_movimiento` date NOT NULL,
  `hora_movimiento` time DEFAULT NULL,
  `producto_codigo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Disparadores `historial_movimiento`
--
DELIMITER $$
CREATE TRIGGER `actualizar_saldo_despues_insert` AFTER INSERT ON `historial_movimiento` FOR EACH ROW BEGIN
    DECLARE nuevo_saldo DECIMAL(10, 2);

    IF NEW.tipo_movimiento = 'ingreso' THEN
        SET nuevo_saldo = (SELECT saldo + CAST(NEW.cantidad_movimiento AS DECIMAL(10, 2)) FROM historial_movimiento WHERE id_historial = NEW.id_historial - 1);
    ELSE
        SET nuevo_saldo = (SELECT saldo - CAST(NEW.cantidad_movimiento AS DECIMAL(10, 2)) FROM historial_movimiento WHERE id_historial = NEW.id_historial - 1);
    END IF;

    UPDATE historial_movimiento SET saldo = nuevo_saldo WHERE id_historial = NEW.id_historial;
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
(11, 5, '2024-04-17 13:22:31', 861677);

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
(7, '08:43:32', 20, 'salida', 0, 303065, NULL);

--
-- Disparadores `salida_productos`
--
DELIMITER $$
CREATE TRIGGER `actualizar_saldo_salida` AFTER INSERT ON `salida_productos` FOR EACH ROW BEGIN
    DECLARE nuevo_saldo DECIMAL(10, 2);
    
    -- Obtener el saldo anterior del producto
    SELECT COALESCE(saldo, 0.00) INTO nuevo_saldo
    FROM historial_movimiento
    WHERE producto_codigo = NEW.producto_codigo
    ORDER BY id_historial DESC
    LIMIT 1;
    
    -- Calcular el nuevo saldo
    SET nuevo_saldo = nuevo_saldo - (NEW.cantidad_salida * NEW.precio_venta);
    
    -- Insertar el nuevo registro en historial_movimiento
    INSERT INTO historial_movimiento (tipo_movimiento, cantidad_movimiento, saldo, fecha_movimiento, hora_movimiento, producto_codigo)
    VALUES ('salida', NEW.cantidad_salida, nuevo_saldo, NEW.fecha_salida, NEW.precio_venta, NEW.producto_codigo);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `registrar_movimiento_salida` AFTER INSERT ON `salida_productos` FOR EACH ROW BEGIN
    DECLARE saldo_anterior DECIMAL(10, 2);
    DECLARE nuevo_saldo DECIMAL(10, 2);

    -- Obtener el saldo anterior del producto
    SELECT saldo INTO saldo_anterior FROM historial_movimiento WHERE producto_codigo = NEW.producto_codigo ORDER BY id_historial DESC LIMIT 1;

    -- Calcular el nuevo saldo
    SET nuevo_saldo = saldo_anterior - (NEW.cantidad_salida * NEW.precio_venta);

    -- Insertar el nuevo registro en historial_movimiento
    INSERT INTO historial_movimiento (tipo_movimiento, cantidad_movimiento, saldo, fecha_movimiento, hora_movimiento, producto_codigo)
    VALUES ('salida', NEW.cantidad_salida, nuevo_saldo, DATE(NOW()), TIME(NOW()), NEW.producto_codigo);
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
  ADD KEY `producto_codigo` (`producto_codigo`),
  ADD KEY `fk_nombre_historial_id` (`historial_id`);

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
  MODIFY `id_entrada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `historial_movimiento`
--
ALTER TABLE `historial_movimiento`
  MODIFY `id_historial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `salida_productos`
--
ALTER TABLE `salida_productos`
  MODIFY `id_salida` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
