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
  FaCheckCircle,
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
      {/* About Us Section */}
      <section id="about" className="bg-gray-100 py-16">
        <div className="container mx-auto px-4"  data-aos="fade-up">

          <div className="text-center mb-12">
            <h2 className=" text-3xl font-semibold mb-4 underline underline-offset-8">Sobre Nosotros</h2>
            <p className="text-base text-gray-500">En nuestra empresa de inventarios, combinamos experiencia, tecnología avanzada y un enfoque centrado en el cliente para brindar soluciones de inventario efectivas y confiables.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="col-span-1 lg:col-span-1">
              <h3 className="text-3xl font-semibold mb-4">UNA PLATAFORMA QUE SE ADAPTA A LAS NECESIDADES DEL CLIENTE</h3>
              <img src="./src/img/about.jpg" className="rounded-lg mb-4img-fluid" alt=""  />
              <p className="mb-4">Reconocemos la diversidad de las empresas y sus procesos. ZonaBAR se adapta a diferentes sectores y tamaños de negocio, ofreciendo opciones de personalización para satisfacer las necesidades específicas de cada cliente. Creemos que la verdadera eficiencia proviene de la adaptabilidad, y nuestro software está diseñado para crecer y evolucionar con su empresa.</p>
              <p className="mb-4">Lo que distingue a ZonaBAR es su compromiso con la innovación tecnológica. La empresa emplea tecnologías de vanguardia como inteligencia artificial, aprendizaje automático y análisis predictivo para proporcionar a sus clientes insights profundos sobre sus inventarios. El sistema inteligente de ZonaBAR no solo rastrea la cantidad de existencias, sino que también analiza patrones de demanda, prevé tendencias del mercado y sugiere estrategias de reabastecimiento, todo en tiempo real.</p>
            </div>
            <div className="col-span-1 lg:col-span-1">
              <div className="ps-0 lg:ps-5">
                <p className="italic mb-4">Con su enfoque innovador y tecnología de vanguardia, ZonaBAR está allanando el camino hacia un futuro donde la gestión de inventarios se convierte en un activo estratégico clave para el éxito empresarial.</p>
                <ul className="list-inside">
                <li className="flex items-center mb-4"><FaCheckCircle className="mr-3 text-2xl text-gray-600" />Implementar cambios basados en la retroalimentación del usuario para optimizar la experiencia del usuario y la eficiencia operativa.</li>
                <li className="flex items-center mb-4"><FaCheckCircle className="mr-3 text-2xl text-gray-600" />Implementar funciones de análisis predictivo en tiempo real para permitir a los usuarios tomar decisiones rápidas y fundamentadas.</li>
                <li className="flex items-center mb-4"><FaCheckCircle className="mr-3 text-2xl text-gray-600" />Fortalecer las medidas de seguridad de datos para garantizar la confidencialidad y la integridad de la información almacenada en la plataforma.</li>
                <li className="flex items-center mb-4"><FaCheckCircle className="mr-3 text-2xl text-gray-600" />Desarrollar herramientas de analítica avanzada que permitan a las empresas evaluar el rendimiento de su inventario en comparación con los indicadores clave de desempeño (KPI).</li>
                <li className="flex items-center mb-4"><FaCheckCircle className="mr-3 text-2xl text-gray-600" />Investigar y desarrollar herramientas que ayuden a las empresas a evaluar y mejorar la sostenibilidad de sus prácticas de gestión de inventarios.</li>
              </ul>
                <p className="mb-4">Nuestra plataforma no solo simplifica la gestión de inventarios, sino que la potencia con inteligencia y visión estratégica. Al elegir ZonaBAR, las empresas eligen la innovación y la eficiencia en cada nivel de su cadena de suministro.</p>

                <div className="relative">
                  <img src="./src/img/about-2.jpg" className="rounded-lg" alt="" />
                  <a href="https://www.youtube.com/watch?v=n1oUspMuUgk" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> 
                    <svg className="w-16 h-16 text-white bg-gray-500 rounded-full p-4 transition duration-300 hover:bg-gray-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 5v10l7-5z" clipRule="evenodd"/></svg>
                   </a>
                </div>
              </div>
            </div>

          </div>


        </div>
        </section>
      {/* End About Us Section */}
      {/* Clients Section*/}
      <section id="clients" className="bg-gray-100 py-16">
        <div className="container mx-auto" data-aos="zoom-out">

          <div className="flex justify-center">
            <div className="swiper-container">
              <div className="swiper-wrapper flex items-center">
                <div className="swiper-slide"><img src="./src/img/about.jpg" className="img-fluid" alt="" /> </div>
                <div className="swiper-slide"><img src="./src/img/about.jpg" className="img-fluid" alt="" /> </div>
                <div className="swiper-slide"><img src="./src/img/about.jpg" className="img-fluid" alt="" /> </div>
                <div className="swiper-slide"><img src="./src/img/about.jpg" className="img-fluid" alt="" /> </div>
                <div className="swiper-slide"><img src="./src/img/about.jpg" className="img-fluid" alt="" /> </div>
                <div className="swiper-slide"><img src="./src/img/about.jpg" className="img-fluid" alt="" /> </div>
                <div className="swiper-slide"><img src="./src/img/about.jpg" className="img-fluid" alt="" /> </div>
                <div className="swiper-slide"><img src="./src/img/about.jpg" className="img-fluid" alt="" /> </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Clients Section */}
      {/* Counter Section*/}
        <section id="stats-counter" className="bg-gray-100 py-16">
          <div className="container mx-auto" data-aos="fade-up">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

              <div className="col-span-1 lg:col-span-1">
                <img src="" className="img-fluid" alt="" />
              </div>

              <div className="col-span-1 lg:col-span-1">
                <div className="grid grid-rows-3 gap-4">
                  <div className="stats-items flex items-center">
                    <span data-purecounter-start="0" data-purecounter-end="010" data-purecounter-duration="1" className="font-bold text-2xl text-gray-500"><p className="ml-2"><strong>Clientes felices</strong>Lorem ipsum dolor sit amet consectetur.</p></span>
                  </div>
                  <div className="stats-items flex items-center">
                    <span data-purecounter-start="0" data-purecounter-end="010" data-purecounter-duration="1" className="font-bold text-2xl text-gray-500"><p className="ml-2"><strong>Proyectos</strong>Lorem ipsum dolor sit amet consectetur.</p></span>
                  </div>
                  <div className="stats-items flex items-center">
                    <span data-purecounter-start="0" data-purecounter-end="010" data-purecounter-duration="1" className="font-bold text-2xl text-gray-500"><p><strong>Horas de Soporte</strong>Lorem ipsum dolor sit amet consectetur.</p></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>
      {/* End Counter Section */}
      {/* End Main */}
    </>
  );
}

export default LandingPage;
