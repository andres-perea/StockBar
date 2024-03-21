import React from "react";

function Sidebar() {
  return (
    <div className="bg-gray-800 h-full left-0 top-0 overflow-y-auto">
      <nav className="mt-6">
        <a
          href="#"
          className="block py-2 px-4 text-gray-400 hover:bg-gray-700 hover:text-white"
        >
          Dashboard
        </a>
        <a
          href="#"
          className="block py-2 px-4 text-gray-400 hover:bg-gray-700 hover:text-white"
        >
          Usuarios
        </a>
        <a
          href="#"
          className="block py-2 px-4 text-gray-400 hover:bg-gray-700 hover:text-white"
        >
          Configuración
        </a>
        {/* Puedes agregar más enlaces de navegación según sea necesario */}
      </nav>
    </div>
  );
}

export default Sidebar;
