import React from "react";
import "../index.css";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaPhone,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaCheck,
  FaArchive,
  FaShieldVirus,
  FaTools,
  FaPlayCircle,
} from "react-icons/fa";

function LandingPage() {
  return (
    <>
      {/* TopBar */}
      <div className="bg-zinc-800 py-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center text-stone-300">
            <div className="mr-4 flex items-center">
              <FaEnvelope className="mr-1" />
              <a href="">zonabar.2024@gmail.com</a>
            </div>
            <div className="flex items-center">
              <FaPhone className="mr-1" />
              <span>310 3892876</span>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <a href="#" className="text-stone-300 mr-2">
              <FaTwitter />
            </a>
            <a href="#" className="text-stone-300 mr-2">
              <FaFacebook />
            </a>
            <a href="#" className="text-stone-300 mr-2">
              <FaInstagram />
            </a>
            <a href="#" className="text-stone-300 mr-2">
              <FaTelegram />
            </a>
          </div>
        </div>
      </div>
      {/* End TopBar */}
      {/* Header */}
      <div className="bg-zinc-500 py-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center text-white">
            <h1 className="text-2xl font-bold">
              Zona<span className=" text-zinc-400">BAR.</span>
            </h1>
          </Link>
          <nav className="fle items-center">
            <ul className="flex space-x-4 text-stone-300">
              <li>
                <a href="">Incio</a>
              </li>
              <li>
                <a href="">Sobre Nosotros</a>
              </li>
              <li>
                <a href="">Servicios</a>
              </li>
              <li>
                <a href="">Portafolio</a>
              </li>
              <li>
                <a href="">Equipo</a>
              </li>
              <li>
                <a href="">Contactanos</a>
              </li>
              <li>
                <Link to="/login">Iniciar Sesion</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* End Header */}
      {/* Section hero */}
      <section className="bg-zinc-500 py-10">
        <div className="container mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
            <div className="lg:order-1 flex flex-col justify-center text-center lg:text-left">
              <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-white">
                Bienvenido a ZonaBAR
              </h2>
              <p className="text-lg lg:text-l mb-6 text-zinc-400">
                Nuestro equipo de profesionales altamente capacitados y
                comprometidos está siempre listo para brindar asistencia y
                orientación en cada paso del proceso de inventario.
              </p>
              <div className="flex justify-center lg:justify-start">
                <Link
                  to="/registro"
                  className="bg-zinc-500 border border-white text-white py-4 px-8 rounded-full shadow-md mr-4"
                >
                  Empezar
                </Link>
                <a
                  href="https://www.youtube.com/watch?v=n1oUspMuUgk"
                  className="flex items-center bg-zinc-500 border-0 text-white py-4 px-8"
                >
                  <i className="">
                    <FaPlayCircle />
                  </i>
                  <span className="ml-2"> Ver video</span>
                </a>
              </div>
            </div>
            <div className="lg:order-1">
              <img
                src="./src/img/hero-img.svg"
                className="img-fluid"
                alt=""
                data-aos-delay="100"
              />
            </div>
          </div>
        </div>
        <div className="relative mt-14">
          <div className="container mx-auto">
            <div className="grid grid-cold-1 lg:grid-cols-4 gap-4">
              <div className="col-span-1 lg:col-span-1 bg-neutral-800 hover:bg-zinc-400 hover:text-white ease-out duration-300 relative px-24 py-14 rounded-lg mx-2">
                <div className="text-stone-300 text-4xl md:text-5xl flex justify-center px-8 py-4">
                  <FaCheck />
                </div>
                <h2 className="text-white text-lg md:text-2xl text-center font-bold mt-4">
                  Administracion de inventario
                </h2>
              </div>
              <div className="col-span-1 lg:col-span-1 bg-neutral-800 hover:bg-zinc-400 hover:text-white ease-out duration-300 relative px-24 py-14 rounded-lg mx-2">
                <div className="text-stone-300 text-4xl md:text-5xl flex justify-center px-8 py-4">
                  <FaArchive />
                </div>
                <h2 className="text-white text-lg md:text-2xl text-center font-bold mt-4">
                  Gestion de stock
                </h2>
              </div>
              <div className="col-span-1 lg:col-span-1 bg-neutral-800 hover:bg-zinc-400 hover:text-white ease-out duration-300 relative px-24 py-14 rounded-lg mx-2">
                <div className="text-stone-300 text-4xl md:text-5xl flex justify-center px-8 py-4">
                  <FaShieldVirus />
                </div>
                <h2 className="text-white text-lg md:text-2xl text-center font-bold mt-4">
                  Seguridad de datos
                </h2>
              </div>
              <div className="col-span-1 lg:col-span-1 bg-neutral-800 hover:bg-zinc-400 hover:text-white ease-out duration-300 relative px-24 py-14 rounded-lg mx-2">
                <div className="text-stone-300 text-4xl md:text-5xl flex justify-center px-8 py-4">
                  <FaTools />
                </div>
                <h2 className="text-white text-lg md:text-2xl text-center font-bold mt-4">
                  Mantenimiento de stock
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End section Hero */}
      {/* Main */}
      {/* End Main */}
    </>
  );
}

export default LandingPage;
