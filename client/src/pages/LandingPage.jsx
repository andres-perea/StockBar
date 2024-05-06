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

      {/* End section Hero */}
      {/* Main */}
      {/* End Main */}
    </>
  );
}

export default LandingPage;
