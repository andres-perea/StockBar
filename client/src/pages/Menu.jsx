import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineSearch, MdShoppingCart, MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

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
    const existentItem = carrito.find((item) => item.codigo === bebida.codigo);
    if (existentItem) {
      const updatedCarrito = carrito.map((item) =>
        item.codigo === bebida.codigo
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
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
      item.codigo === bebida.codigo && item.cantidad > 1
        ? { ...item, cantidad: item.cantidad - 1 }
        : item
    );
    setCarrito(updatedCarrito.filter((item) => item.codigo !== bebida.codigo));
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
        codigo_producto: item.codigo,
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

  const navegation = useNavigate();
  const checkout = () => {
    navegation("/checkout");
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
              <div className="relative">
              <div className="relative">
                <input type="text" placeholder="Buscar" className="pl-10 pr-4 py-2 border rounded-lg w-full font-bold" />
                <MdOutlineSearch className="h-7 w-7 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-800 pointer-events-none justify-center" />
              </div>
            </div>

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
        <div className="col-span-1">
            <div className="flex grid flex flex-col h-full">
              <ul className="flex-1 overflow-y-auto ">
                
                {categorias.map((categoria, index) => (
                  <li className="p-2 text-center cursor-pointer odd:bg-white even:bg-slate-50 font-bold table-auto p-6 pb-4 transition duration-500 ease-in-out justify-center">
                    {categoria.nombre}
                    <div className="border-b border-gray-300"></div>
                  </li>
                ))}
              </ul>
            </div>
          <div className="col-span-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {bebidas.map((bebida) => (
                <div
                  key={bebida.codigo}
                  className="max-w-sm rounded overflow-hidden shadow-lg m-1"
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
                    <div className="font-semibold text-gray-500 text-base mb-2">
                      "{bebida.descripcion}"
                    </div>
                  </div>
                  <div className="px-6">
                    <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-l font-semibold text-gray-600 mr-2">
                      {categorias.find(
                        (categoria) => categoria.id === bebida.categoria_id
                      )?.nombre || "Sin categoria"}
                    </div>
                  </div>
                  <div className="px-6 py-4">
                    <div className="font-bold text-green-800 text-xl mb-2">
                      ${bebida.precio}
                    </div>
                    <button
                      onClick={() => agregarAlCarrito(bebida)}
                      className="bg-blue-800 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded transition duration-500 ease-in-out"
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              ))}
              </div>
            </div>
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
                  className="hover:bg-green-700 hover:scale-110 transition duration-400 bg-green-600 text-white font-bold p-2 m-2 mt-2"
                >
                  Realizar Pedido
                </button>
                <button
                  onClick={checkout}
                  className="hover:bg-green-700 hover:scale-110 transition duration-400 bg-green-600 text-white font-bold p-2 m-2 mt-2"
                >
                  Ver Carrito
                </button>
              </div>
            </div>
          </div>
        )}
    </>
  );
}

export default Menu;
