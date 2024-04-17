import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineSearch, MdShoppingCart, MdClose } from "react-icons/md";

function Menu() {
  const [bebidas, setBebidas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/bebidas")
      .then((response) => {
        setBebidas(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    axios.get("http://localhost:3000/categorias/").then((response) => {
      setCategorias(response.data);
    });
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      let totalPrice = 0;
      carrito.forEach((item) => {
        totalPrice += item.precio * item.cantidad;
      });
      setTotal(totalPrice);
    };
    calculateTotal();
  }, [carrito]);

  const agregarAlCarrito = (bebida) => {
    const existentItem = carrito.find((item) => item.id === bebida.id);
    if (existentItem) {
      const updatedCarrito = carrito.map((item) =>
        item.id === bebida.id ? { ...item, cantidad: item.cantidad + 1 } : item
      );
      setCarrito(updatedCarrito);
    } else {
      setCarrito([...carrito, { ...bebida, cantidad: 1 }]);
    }
    setShowCartNotification(true);

    setTimeout(() => {
      setShowCartNotification(false);
    }, 3000);
  };

  const eliminarDelCarrito = (bebida) => {
    const updatedCarrito = carrito.map((item) =>
      item.id === bebida.id && item.cantidad > 1
        ? { ...item, cantidad: item.cantidad - 1 }
        : item
    );
    setCarrito(updatedCarrito.filter((item) => item.id !== bebida.id));
  };

  const toggleCarrito = () => {
    setShowCart(!showCart);
  };

  const realizarPedido = () => {
    if (carrito.length === 0) {
      console.error(
        "No se puede realizar un pedido sin elementos en el carrito."
      );
      return;
    }

    // Calcular el total antes de realizar el pedido
    const pedidoTotal = carrito.reduce(
      (accumulator, item) => accumulator + item.precio * item.cantidad,
      0
    );

    // Crear un objeto con los detalles del pedido
    const pedido = {
      detalles: carrito.map((item) => ({
        bebida_id: item.id,
        cantidad: item.cantidad,
      })),
      total: pedidoTotal,
    };

    axios
      .post("http://localhost:3000/pedidos", pedido)
      .then((response) => {
        console.log("Pedido realizado con éxito:", response.data);
        setCarrito([]);
        setShowCart(false);
      })
      .catch((error) => {
        console.error("Error al realizar el pedido:", error);
      });
  };

  return (
    <>
      <div className="">
        <header className="bg-gray-200">
          <div className="container mx-auto flex items-center justify-between p-4">
            {/* Logo */}
            <div className="text-xl text-black font-bold">
              <a href="/" className="hover:text-gray-900">
                StockBar
              </a>
            </div>
            {/* Botón de búsqueda y carrito */}
            <div className="flex space-x-4">
              <button className="text-black hover:scale-110 transition duration-400">
                <MdOutlineSearch className="h-7 w-7" />
              </button>
              <button
                onClick={toggleCarrito}
                className="text-black hover:scale-110 transition duration-400"
              >
                <MdShoppingCart className="h-7 w-7" />
              </button>
              {showCartNotification && (
                <div className="fixed bottom-10 right-10 bg-gray-900 text-white px-4 py-2 rounded">
                  Producto agregado al carrito
                </div>
              )}
            </div>
          </div>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {bebidas.map((bebida) => (
            <div
              key={bebida.id}
              className="max-w-sm rounded overflow-hidden shadow-lg m-2"
            >
              {/* Imagen producto */}
              <img
                className="w-full"
                src="https://via.placeholder.com/350x150"
                alt="Placeholder"
              />
              <div className="px-6 py-2">
                <div className="font-bold text-xl mb-2">{bebida.nombre}</div>
              </div>
              <div className="px-6 py-2">
                <div className="font-bold text-base mb-2">"{bebida.descripcion}"</div>
              </div>
              <div className="px-6">
                <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-l font-semibold text-gray-700 mr-2">
                  {categorias.find(
                    (categoria) => categoria.id === bebida.categoria_id
                  )?.nombre || "Sin categoria"}
                </div>
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-green-800 text-xl mb-2">${bebida.precio}</div>
                <button
                  onClick={() => agregarAlCarrito(bebida)}
                  className="bg-blue-800 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Contenedor flotante del carrito */}
      {showCart && (
        <div className="fixed right-0 top-0 bg-white shadow-lg w-80 mt-16 p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Carrito de Compras</h2>
            <button
              onClick={toggleCarrito}
              className="text-red-600 hover:text-red-800"
            >
              <MdClose />
            </button>
          </div>
          <div className="mt-4">
            {carrito.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 max-w-sm bg-white rounded overflow-hidden shadow-lg p-2 m-2"
              >
                <div className="col-span-2 p-2">
                  <p className="font-bold">{item.nombre}</p>
                  <p>${item.precio}</p>
                </div>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => agregarAlCarrito(item)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  >
                    +
                  </button>
                  <span className="mx-2">{item.cantidad}</span>
                  <button
                    onClick={() => eliminarDelCarrito(item)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
            <div className="border-b border-gray-900"></div>
            <div className="max-w-sm bg-white rounded overflow-hidden shadow-lg p-2 m-2">
              <p className="font-bold">Total a Pagar: ${total}</p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={realizarPedido}
                className="hover:bg-green-700 hover:scale-110 transition duration-400 bg-green-600 text-white font-bold p-2 mt-2"
              >
                Realizar Pedido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Menu;
