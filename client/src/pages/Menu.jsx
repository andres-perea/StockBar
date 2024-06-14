import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MdOutlineSearch,
  MdShoppingCart,
  MdOutlineShoppingCart,
  MdClose,
  MdCheck,
  MdNoDrinks,
} from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Menu() {
  const [bebidas, setBebidas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [total, setTotal] = useState(0);
  const [nombreCliente, setNombreCliente] = useState("");
  const [mesaReserva, setMesaReserva] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleConfirm = () => {
    onSubmit(nombreCliente, mesaReserva);
    closeModal();
  };

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

  const showNotification = () => {
    setShowCartNotification(true);
    setTimeout(() => {
      setShowCartNotification(false);
    }, 3000);
  };

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
    showNotification();
  };

  const eliminarDelCarrito = (bebida) => {
    const updatedCarrito = carrito.map((item) =>
      item.codigo === bebida.codigo && item.cantidad > 1
        ? { ...item, cantidad: item.cantidad - 1 }
        : item
    );
    setCarrito(updatedCarrito.filter((item) => item.cantidad > 0));
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

    const pedidoTotal = carrito.reduce(
      (accumulator, item) => accumulator + item.precio * item.cantidad,
      0
    );

    const pedido = {
      detalles: carrito.map((item) => ({
        codigo_producto: item.codigo,
        cantidad: item.cantidad,
        nombre_cliente: nombreCliente,
        mesa_reserva: mesaReserva,
      })),
      total: pedidoTotal,
    };

    axios
      .post("http://localhost:3000/pedidos", pedido)
      .then((response) => {
        console.log("Pedido realizado con éxito:", response.data);
        toast.success("Pedido realizado con éxito");
        setCarrito([]);
        setShowCart(false);
      })
      .catch((error) => {
        console.error("Error al realizar el pedido:", error);
      });
  };

  const Modal = ({ isOpen, closeModal, onSubmit, nombreCliente, setNombreCliente, mesaReserva, setMesaReserva }) => {
    return (
      <>
        {/* Fondo oscuro para el modal */}
        <div
          className={`fixed inset-0 bg-black opacity-50 ${
            isOpen ? "block" : "hidden"
          }`}
          onClick={closeModal}
        ></div>
  
        {/* Contenedor del modal */}
        <div
          className={`fixed inset-0 flex items-center justify-center ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="bg-white rounded-lg p-8 w-1/2">
            {/* Contenido del modal */}
            <h2 className="text-xl font-bold mb-4">Confirmar Pedido</h2>
            {/* Formulario para nombre de cliente y mesa */}
            <form className="mt-4">
              <label className="block mb-2">
                Nombre Cliente:
                <input
                  type="text"
                  value={nombreCliente}
                  onChange={(e) => setNombreCliente(e.target.value)}
                  className="border-gray-300 border rounded px-2 py-1 w-full mt-1"
                  required
                />
              </label>
              <label className="block mb-2">
                Seleccione la mesa:
                <select
                  onChange={(e) => setMesaReserva(e.target.value)}
                  value={mesaReserva}
                  className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="0">. . .</option>
                  <option value="1">Mesa 1</option>
                  <option value="2">Mesa 2</option>
                  <option value="3">Mesa 3</option>
                  <option value="4">Mesa 4</option>
                  <option value="5">Mesa 5</option>
                  <option value="6">Mesa 6</option>
                  <option value="7">Mesa 7</option>
                  <option value="8">Mesa 8</option>
                  <option value="9">Mesa 9</option>
                  <option value="10">Mesa 10</option>
                </select>
              </label>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="bg-yellow-300 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded"
                  onClick={realizarPedido}
                >
                  Confirmar Pedido
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  };
  
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <header className="bg-stone-800">
          <div className="container mx-auto flex items-center justify-between p-4">
            <div className="text-xl text-yellow-300 font-bold">
              <a href="/" className="hover:text-gray-900">
                StockBar
              </a>
            </div>
            <div className="flex space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar"
                  className="pl-10 pr-4 py-2 border rounded-lg w-full font-bold"
                />
                <MdOutlineSearch className="h-7 w-7 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-800 pointer-events-none" />
              </div>
              <button
                onClick={toggleCarrito}
                className="text-yellow-300 hover:scale-110 transition duration-400"
              >
                <MdShoppingCart className="h-7 w-7" />
              </button>
              {showCartNotification && (
                <div className="fixed bottom-10 right-10 bg-stone-800 text-white px-4 py-2 rounded flex items-center">
                  <MdCheck className="text-green-500 mr-2" />
                  Producto agregado al carrito
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="flex-grow container mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {bebidas.map((bebida) => (
              <div
                key={bebida.codigo}
                className="max-w-xs rounded overflow-hidden shadow-lg"
              >
                <div className="flex justify-center items-center">
                  {bebida.imagen && bebida.nombre && (
                    <img
                      className="w-1/2 h-auto"
                      src={`http://localhost:3000/img/${bebida.imagen}`}
                      alt={bebida.nombre}
                    />
                  )}
                </div>
                <div className="px-4 py-2">
                  <div className="font-bold text-xl mb-2">{bebida.nombre}</div>
                  <div className="text-gray-700 text-base mb-2">
                    {bebida.descripcion}
                  </div>
                  <div className="text-gray-500 text-base mb-2">
                    {categorias.find(
                      (categoria) => categoria.id === bebida.categoria_id
                    )?.nombre || "Sin categoria"}
                  </div>
                  <div className="text-green-800 font-bold text-xl mb-2">
                    ${bebida.precio}
                  </div>
                  <button
                    onClick={() => agregarAlCarrito(bebida)}
                    className="w-full bg-yellow-300 hover:bg-stone-800 text-white font-bold py-2 px-4 rounded transition duration-500 ease-in-out flex items-center justify-center space-x-2"
                  >
                    <span>Agregar</span> <MdOutlineShoppingCart />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      {showCart && (
        <div className="fixed right-0 top-0 bg-stone-900 shadow-lg w-80 h-full p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-yellow-300">
              Carrito de Compras
            </h2>
            <button
              onClick={toggleCarrito}
              className="text-red-600 hover:text-red-800"
            >
              <MdClose />
            </button>
          </div>
          {carrito.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-4">
              <div>
                <p className="font-bold text-white">{item.nombre}</p>
                <p className="text-white">${item.precio}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => agregarAlCarrito(item)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                  +
                </button>
                <span className="mx-2 text-white">{item.cantidad}</span>
                <button
                  onClick={() => eliminarDelCarrito(item)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  -
                </button>
              </div>
            </div>
          ))}
          <div className="border-t border-gray-300 pt-4 mt-4">
            <p className="font-bold text-lg text-yellow-300">
              Total a Pagar: ${total}
            </p>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-yellow-300 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded transition duration-400"
            >
              Continuar
            </button>
            <Modal isOpen={modalOpen} closeModal={() => setModalOpen(false)} onSubmit={handleConfirm}
            nombreCliente={nombreCliente}
            setNombreCliente={setNombreCliente}
            mesaReserva={mesaReserva}
            setMesaReserva={setMesaReserva}>
              <h2 className="text-xl font-bold mb-4">Confirmar Pedido</h2>
            </Modal>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
}

export default Menu;
