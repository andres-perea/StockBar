const db = require("../db");

const Items = {
  buscar: (query, callback) => {
    const sql = `
        SELECT 
            c.nombre AS categoria,
            b.nombre AS nombre_producto,
            b.precio AS precio,
            b.cantidad AS cantidad_inventario,
            COALESCE(SUM(p.cantidad), 0) AS cantidad_vendida,
            b.descripcion
        FROM bebidas b
        INNER JOIN categorias c ON b.categoria_id = c.id
        LEFT JOIN pedidos p ON b.codigo = p.codigo_producto
        WHERE b.nombre LIKE ?
        GROUP BY b.codigo
        ORDER BY c.nombre, b.nombre
    `;
    db.query(sql, [`%${query}%`], callback);
  },
};

module.exports = Items;
