import React, { useEffect, useState } from "react";
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
  FaCheckCircle,
  FaLaptopCode,
  FaLaptop,
  FaUserFriends,
  FaColumns,
  FaArrowRight,
  FaRegPlayCircle,
  FaLinkedin,
  FaBars,
  FaCommentAlt,
} from "react-icons/fa";
import {
  BsArchive,
  BsArrowDownLeftCircle,
  BsDatabaseUp,
  BsFileCheck,
  BsShieldCheck,
  BsTools,
} from "react-icons/bs";
import AOS from "aos";
import "aos/dist/aos.css";

function LandingPage() {
  useEffect(() => {
    AOS.init();
  }, []);

  const TeamMember = ({ name, role }) => {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hiden">
        <div className="p-4">
          <div className="text-center">
            <h4 className="text-x1 font-semibold mb-4">{name}</h4>
            <span className="text-sm text-gray-600">{role}</span>
          </div>
          <div className="flex justify-center mt-4">
            <a
              href=""
              className=" text-gray-500 rounded-lg place-content-center hover:text-gray-800 mr-4"
            >
              <i>
                {" "}
                <FaTwitter />
              </i>
            </a>
            <a
              href=""
              className=" text-gray-500 rounded hover:text-gray-800 mr-4"
            >
              <i>
                {" "}
                <FaFacebook />
              </i>
            </a>
            <a
              href=""
              className="text-gray-500 rounded  hover:text-gray-800 mr-4"
            >
              <i>
                {" "}
                <FaInstagram />
              </i>
            </a>
            <a
              href=""
              className="text-gray-500 rounded hover:text-gray-800 mr-4"
            >
              <i>
                {" "}
                <FaTelegram />
              </i>
            </a>
          </div>
        </div>
      </div>
    );
  };

  let [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* TopBar */}
      <div className="bg-zinc-800 py-2">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col sm:flex-row items-center font-sans text-stone-300 mb-2 md:mb-0">
            <div className="mr-4 flex items-center mb-2 sm:mb-0">
              <FaEnvelope className="mr-1" />
              <a href="">zonabar.2024@gmail.com</a>
            </div>
            <div className="flex items-center">
              <FaPhone className="mr-1" />
              <span>310 3892876</span>
            </div>
          </div>
          <div className="flex items-center">
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
      <header id="header">
        <nav className="bg-neutral-600 py-6 px-4 md:px-16 fixed w-full top-0 z-50 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center text-white">
              <h1 className="text-3xl font-bold font-sans">
                B<span className=" text-orange-300">M.</span>
              </h1>
            </div>
            {/* Menú desplegable */}
            <div className="relative md:hidden md:items-center md:static">
              <FaBars
                className="cursor-pointer text-white"
                size={24}
                onClick={() => setIsOpen(!isOpen)} // Cambia el estado de isOpen al hacer clic en el icono
              />
              {isOpen && (
                <div className="md:ml-8 text-xl md:my-0 my-7">
                  <a
                    href=""
                    className="text-gray-800 hover:text-gray-400 duration-500"
                  >
                    Inicio
                  </a>
                  <a
                    href=""
                    className="text-gray-800 hover:text-gray-400 duration-500"
                  >
                    Sobre Nosotros
                  </a>
                  <a
                    href=""
                    className="text-gray-800 hover:text-gray-400 duration-500"
                  >
                    Servicios
                  </a>
                  <a
                    href=""
                    className="text-gray-800 hover:text-gray-400 duration-500"
                  >
                    Portafolio
                  </a>
                  <a
                    href=""
                    className="text-gray-800 hover:text-gray-400 duration-500"
                  >
                    Equipo
                  </a>
                  <a
                    href=""
                    className="text-gray-800 hover:text-gray-400 duration-500"
                  >
                    Contactanos
                  </a>
                  <Link
                    to="/login"
                    className="text-gray-800 hover:text-gray-400 duration-500"
                  >
                    Iniciar Sesion
                  </Link>
                </div>
              )}
            </div>
            {/* Fin del menú desplegable */}
            <ul className="hidden md:flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-stone-300 font-semibold text-lg ">
              <li>
                <a
                  href=""
                  className="mx-2 hover:text-white duration-500 hover:underline underline-offset-8"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="mx-2 hover:text-white duration-500 hover:underline underline-offset-8"
                >
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="mx-2 hover:text-white duration-500 hover:underline underline-offset-8"
                >
                  Servicios
                </a>
              </li>
              <li>
                <a
                  href="/Menu"
                  className="mx-2 hover:text-white duration-500 hover:underline underline-offset-8"
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="mx-2 hover:text-white duration-500 hover:underline underline-offset-8"
                >
                  Equipo
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="mx-2 hover:text-white duration-500 hover:underline underline-offset-8"
                >
                  Contactanos
                </a>
              </li>
              <li>
                <Link
                  to="/login"
                  className="bg-orange-300 mr-0 lg:mr-2 mb-2 lg:mb-0 py-2 px-6 rounded-lg hover:bg-white hover:text-black text-center"
                >
                  Iniciar Sesion
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      {/* End Header */}
      {/* Section hero */}
      <section id="hero" className="bg-neutral-600 pt-16">
        <div className="container mx-auto relative px-4">
          <div className="row gy-5" data-aos="fade-up" data-aos-delay="600">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <div className="order-2 lg:order-1 flex flex-col justify-center text-left lg:px-12">
                <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold text-white pb-8">
                  Bienvenido a Bar
                  <span className="text-orange-300 ">Manage</span>
                </h2>
                <p className="text-base text-stone-300 font-sans">
                  Nuestro equipo de profesionales altamente capacitados y
                  comprometidos está siempre listo para brindar asistencia y
                  orientación en cada paso del proceso de inventario.
                </p>
                <div
                  className="flex flex-col lg:flex-row justify-center lg:justify-start mt-8"
                  data-aos="fade-up"
                  data-aos-delay="600"
                >
                  <Link
                    to="/register"
                    className="bg-neutral-500 text-white border-zinc-500 hover:border-zinc-200 duration-200 border-2 font-bold rounded-full mr-0 lg:mr-4 mb-4 lg:mb-0 py-4 px-12 text-center"
                  >
                    Empezar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto relative py-8 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
            <div
              className="relative py-16 px-8 bg-zinc-800 rounded-lg font-bold text-center text-white hover:bg-gray-400 hover:text-white duration-400 hover:shadow-lg"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="flex flex-col items-center justify-center ">
                <BsFileCheck className="mb-5 pt-2 text-5xl text-stone-300" />
                <h4 className="mb-4 text-2xl">Administracion de inventario</h4>
              </div>
            </div>
            <div
              className="relative py-16 px-8 bg-zinc-800 rounded-lg font-bold text-center text-white hover:bg-gray-400 hover:text-white duration-200"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="flex flex-col items-center justify-center">
                <BsArchive className="mb-5 pt-2 text-5xl text-stone-300" />
                <h4 className="mb-4 text-2xl">Gestion de stock</h4>
              </div>
            </div>
            <div
              className="relative py-16 px-8 bg-zinc-800 rounded-lg font-bold text-center text-white hover:bg-gray-400 hover:text-white duration-200"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="flex flex-col items-center justify-center">
                <BsShieldCheck className="mb-5 pt-2 text-5xl text-stone-300" />
                <h4 className="mb-4 text-2xl">Seguridad de la informacion</h4>
              </div>
            </div>
            <div
              className="relative py-16 px-8 bg-zinc-800 rounded-lg font-bold text-center text-white hover:bg-gray-400 hover:text-white duration-200"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="flex flex-col items-center justify-center">
                <BsTools className="mb-5 pt-2 text-5xl text-stone-300" />
                <h4 className="mb-4 text-2xl">Mantenimiento de stock</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End section Hero */}
      {/* Main */}
      {/* About Us Section */}
      <section id="about" className="bg-gray-100 py-16">
        <div
          className="container mx-auto px-4"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4 underline underline-offset-8">
              Sobre Nosotros
            </h2>
            <p className="text-base text-gray-500">
              En nuestra empresa de inventarios, combinamos experiencia,
              tecnología avanzada y un enfoque centrado en el cliente para
              brindar soluciones de inventario efectivas y confiables.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="col-span-1 lg:col-span-1">
              <h3 className="text-3xl font-semibold mb-4">
                UNA PLATAFORMA QUE SE ADAPTA A LAS NECESIDADES DEL CLIENTE
              </h3>
              <img
                src="./src/img/about.jpg"
                className="rounded-lg mb-4 img-fluid"
                alt=""
              />
              <p className="mb-4">
                Reconocemos la diversidad de las empresas y sus procesos.
                ZonaBAR se adapta a diferentes sectores y tamaños de negocio,
                ofreciendo opciones de personalización para satisfacer las
                necesidades específicas de cada cliente. Creemos que la
                verdadera eficiencia proviene de la adaptabilidad, y nuestro
                software está diseñado para crecer y evolucionar con su empresa.
              </p>
              <p className="mb-4">
                Lo que distingue a ZonaBAR es su compromiso con la innovación
                tecnológica. La empresa emplea tecnologías de vanguardia como
                inteligencia artificial, aprendizaje automático y análisis
                predictivo para proporcionar a sus clientes insights profundos
                sobre sus inventarios. El sistema inteligente de ZonaBAR no solo
                rastrea la cantidad de existencias, sino que también analiza
                patrones de demanda, prevé tendencias del mercado y sugiere
                estrategias de reabastecimiento, todo en tiempo real.
              </p>
            </div>
            <div className="col-span-1 lg:col-span-1">
              <div className="ps-0 lg:ps-5">
                <p className="italic mb-4">
                  Con su enfoque innovador y tecnología de vanguardia, ZonaBAR
                  está allanando el camino hacia un futuro donde la gestión de
                  inventarios se convierte en un activo estratégico clave para
                  el éxito empresarial.
                </p>
                <ul className="list-inside">
                  <li className="flex items-center mb-4">
                    <FaCheckCircle className="mr-3 text-2xl text-gray-600" />
                    Implementar cambios basados en la retroalimentación del
                    usuario para optimizar la experiencia del usuario y la
                    eficiencia operativa.
                  </li>
                  <li className="flex items-center mb-4">
                    <FaCheckCircle className="mr-3 text-2xl text-gray-600" />
                    Implementar funciones de análisis predictivo en tiempo real
                    para permitir a los usuarios tomar decisiones rápidas y
                    fundamentadas.
                  </li>
                  <li className="flex items-center mb-4">
                    <FaCheckCircle className="mr-3 text-2xl text-gray-600" />
                    Fortalecer las medidas de seguridad de datos para garantizar
                    la confidencialidad y la integridad de la información
                    almacenada en la plataforma.
                  </li>
                  <li className="flex items-center mb-4">
                    <FaCheckCircle className="mr-3 text-2xl text-gray-600" />
                    Desarrollar herramientas de analítica avanzada que permitan
                    a las empresas evaluar el rendimiento de su inventario en
                    comparación con los indicadores clave de desempeño (KPI).
                  </li>
                  <li className="flex items-center mb-4">
                    <FaCheckCircle className="mr-3 text-2xl text-gray-600" />
                    Investigar y desarrollar herramientas que ayuden a las
                    empresas a evaluar y mejorar la sostenibilidad de sus
                    prácticas de gestión de inventarios.
                  </li>
                </ul>
                <p className="mb-4">
                  Nuestra plataforma no solo simplifica la gestión de
                  inventarios, sino que la potencia con inteligencia y visión
                  estratégica. Al elegir ZonaBAR, las empresas eligen la
                  innovación y la eficiencia en cada nivel de su cadena de
                  suministro.
                </p>

                <div className="relative">
                  <img
                    src="./src/img/about-2.jpg"
                    className="rounded-lg"
                    alt=""
                  />
                  <a
                    href="https://www.youtube.com/watch?v=n1oUspMuUgk"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  >
                    <svg
                      className="w-16 h-16 text-white bg-gray-500 rounded-full p-4 transition duration-300 hover:bg-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 5v10l7-5z"
                        clipRule="evenodd"
                      />
                    </svg>
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
        <div
          className="container mx-auto"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <div className="flex justify-center">
            <div className="swiper-container">
              <div className="swiper-wrapper flex items-center">
                <div className="swiper-slide">
                  <img src="./src/img/about.jpg" className="img-fluid" alt="" />{" "}
                </div>
                <div className="swiper-slide">
                  <img src="./src/img/about.jpg" className="img-fluid" alt="" />{" "}
                </div>
                <div className="swiper-slide">
                  <img src="./src/img/about.jpg" className="img-fluid" alt="" />{" "}
                </div>
                <div className="swiper-slide">
                  <img src="./src/img/about.jpg" className="img-fluid" alt="" />{" "}
                </div>
                <div className="swiper-slide">
                  <img src="./src/img/about.jpg" className="img-fluid" alt="" />{" "}
                </div>
                <div className="swiper-slide">
                  <img src="./src/img/about.jpg" className="img-fluid" alt="" />{" "}
                </div>
                <div className="swiper-slide">
                  <img src="./src/img/about.jpg" className="img-fluid" alt="" />{" "}
                </div>
                <div className="swiper-slide">
                  <img src="./src/img/about.jpg" className="img-fluid" alt="" />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Clients Section */}
      {/* Our Services Section */}
      <section id="services" className=" bg-gray-100 py-16">
        <div
          className="container mx-auto"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <div className="section-header text-center pb-14">
            <h2 className=" text-4xl font-bold font-serif mb-4 underline underline-offset-8">
              Servicios
            </h2>
            <p className="text-base text-gray-500">
              Nos enfocamos en mejorar el servicio hacia nuestros clientes,
              demostrando que se está capacitado para ejercer todo tipo de
              software que sea solicitado
            </p>
          </div>
          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="col-span-1 lg:col-span-1 hover:">
              <div className="relative bg-white p-10 rounded-lg shadow-lg">
                <div className="mb-6 ">
                  <i className="text-5xl font-bold  text-black">
                    <BsDatabaseUp />
                  </i>
                </div>
                <h3 className="text-2xl font-semibold mb-5">
                  Optimizacion del espacio de almacenamiento
                </h3>
                <p className="mt-2">
                  Herramientas y algoritmos especializados para maximizar el uso
                  del espacio de almacenamiento, reduciendo costos y mejorando
                  la eficiencia logística.
                </p>
                <a
                  href="#"
                  className="readmore mt-4 inline-flex font-semibold text-gray-700 hover:text-gray-500"
                >
                  Leer más..{" "}
                  <i className="text-xl">
                    <FaArrowRight />
                  </i>
                </a>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-1">
              <div className="relative bg-white p-10 rounded-lg shadow-lg">
                <div className="mb-6">
                  <i className="text-5xl text-black">
                    <FaUserFriends />
                  </i>
                </div>
                <h3 className="text-2xl font-semibold mb-5">
                  Integracion de proveedores y clientes
                </h3>
                <p className="mt-2">
                  Desarrollo de funcionalidades que faciliten la comunicación y
                  colaboración entre la empresa, sus proveedores y clientes,
                  optimizando la cadena de suministro.
                </p>
                <a
                  href="#"
                  className="readmore mt-4 inline-flex font-semibold text-gray-700 hover:text-gray-500"
                >
                  Leer más..{" "}
                  <i className="text-xl">
                    <FaArrowRight />
                  </i>
                </a>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-1">
              <div className="relative bg-white p-10 rounded-lg shadow-lg">
                <div className="mb-6">
                  <i className="text-5xl text-black">
                    <FaLaptop />
                  </i>
                </div>
                <h3 className="text-2xl font-semibold mb-5">
                  Integración con Tecnologías Emergentes
                </h3>
                <p className="mt-2">
                  Exploración y desarrollo de capacidades de integración con
                  tecnologías emergentes, como IoT y realidad aumentada, para
                  mejorar la monitorización y la eficiencia.
                </p>
                <a
                  href="#"
                  className="readmore mt-4  inline-flex font-semibold text-gray-700 hover:text-gray-500"
                >
                  Leer más..{" "}
                  <i className="text-1xl ">
                    <FaArrowRight />
                  </i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Our Services Section */}
      {/*  team Section */}
      <section id="team" className=" py-16">
        <div
          className="container mx-auto px-8 place-content-center"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl font-serif font-bold mb-4 underline underline-offset-8">
              Nuestro Equipo
            </h2>
            <p className="text-base text-gray-500">
              Nos complace presentar a los que están detrás de este gran
              proceso, dando apoyo óptimo a nuestros clientes y siendo los que
              mantienen a flote esta idea de aportar con nuestro software!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <TeamMember
              name="Andres Perea"
              role="Desarrollo de base de datos"
            />
            <TeamMember name="Andres Villa" role="Desarrollador Back-end" />
            <TeamMember name="Andres Sanchez" role="Desarrollador Front-end" />
            <TeamMember name="Camilo Espinosa" role="Analista de software" />
          </div>
        </div>
      </section>
      {/* End team section */}
      {/* Portafolio Section */}
      <section id="portafolio" className="bg-gray-100 py-16">
        <div
          className="container mx-auto"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <div className="section-header text-center">
            <h2 className=" text-4xl font-serif font-bold mb-4 underline underline-offset-8">
              Portafolio
            </h2>
            <p className="text-base text-gray-500 mb-6">
              Encontramos algunos productos y/o marcas que estos distribuyen,
              para brindar una mejor asesoría al momento de mostrar sus
              productos
            </p>
          </div>

          <div
            className="portfolio-isotope"
            data-portfolio-filter="*"
            data-portfolio-layout="masonry"
            data-portfolio-sort="original-order"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div>
              <ul className="portfolio-flters flex justify-center mb-8">
                <li
                  data-filter="*"
                  className="cursor-pointer px-4 py-2 mx-1 rounded-lg border-2 hover:border-orange-500/50 transition duration-300"
                >
                  Todo
                </li>
                <li
                  data-filter=".filter-app"
                  className="cursor-pointer px-4 py-2 mx-1 rounded-lg border-2 hover:border-orange-500/50  transition duration-300"
                >
                  Aplicaciones
                </li>
                <li
                  data-filter=".filter-product"
                  className="cursor-pointer px-4 py-2 mx-1  rounded-lg border-2 hover:border-orange-500/50 transition duration-300"
                >
                  Productos
                </li>
                <li
                  data-filter=".filter-branding"
                  className="cursor-pointer px-4 py-2 mx-1  rounded-lg border-2 hover:border-orange-500/50 transition duration-300"
                >
                  Marcas
                </li>
                <li
                  data-filter=".filter-books"
                  className="cursor-pointer px-4 py-2 mx-1  rounded-lg border-2 hover:border-orange-500/50 transition duration-300"
                >
                  Librería
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 portfolio-container">
              <div className="portfolio-item filter-app">
                <div className="portfolio-wrap">
                  <a
                    href="./src/img/portfolio/app-1 (2).jpg"
                    className="glightbox"
                  >
                    <img
                      src="./img/portfolio/app-1.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </a>
                  <div className="container bg-white pb-6 text-center rounded-lg shadow-lg overflow-hiden">
                    <h4>
                      <a
                        href="#"
                        className="text-xl font-semibold text-gray-800 hover:text-orange-400 transition duration-300"
                        title="More Details"
                      >
                        Dashboards StockApp
                      </a>
                    </h4>
                    <p className="text-gray-600">
                      Diseño para ser utilizado en dispositivos móviles
                    </p>
                  </div>
                </div>
              </div>

              <div className="portfolio-item filter-app">
                <div className="portfolio-wrap">
                  <a
                    href="./src/img/portfolio/app-1 (2).jpg"
                    className="glightbox"
                  >
                    <img
                      src="./img/portfolio/app-1.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </a>
                  <div className="container bg-white pb-6 text-center rounded-lg shadow-lg overflow-hiden">
                    <h4>
                      <a
                        href="#"
                        className="text-xl font-semibold text-gray-800 hover:text-orange-400 transition duration-300"
                        title="More Details"
                      >
                        Dashboards StockApp
                      </a>
                    </h4>
                    <p className="text-gray-600">
                      Diseño para ser utilizado en dispositivos móviles
                    </p>
                  </div>
                </div>
              </div>

              <div className="portfolio-item filter-app">
                <div className="portfolio-wrap">
                  <a
                    href="./src/img/portfolio/app-1 (2).jpg"
                    className="glightbox"
                  >
                    <img
                      src="./img/portfolio/app-1.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </a>
                  <div className="container bg-white pb-6 text-center rounded-lg shadow-lg overflow-hiden">
                    <h4>
                      <a
                        href="#"
                        className="text-xl font-semibold text-gray-800 hover:text-orange-400 transition duration-300"
                        title="More Details"
                      >
                        Dashboards StockApp
                      </a>
                    </h4>
                    <p className="text-gray-600">
                      Diseño para ser utilizado en dispositivos móviles
                    </p>
                  </div>
                </div>
              </div>

              <div className="portfolio-item filter-app">
                <div className="portfolio-wrap">
                  <a
                    href="./src/img/portfolio/app-1 (2).jpg"
                    className="glightbox"
                  >
                    <img
                      src="./img/portfolio/app-1.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </a>
                  <div className="container bg-white pb-6 text-center rounded-lg shadow-lg overflow-hiden">
                    <h4>
                      <a
                        href="#"
                        className="text-xl font-semibold text-gray-800 hover:text-orange-400 transition duration-300"
                        title="More Details"
                      >
                        Dashboards StockApp
                      </a>
                    </h4>
                    <p className="text-gray-600">
                      Diseño para ser utilizado en dispositivos móviles
                    </p>
                  </div>
                </div>
              </div>

              <div className="portfolio-item filter-app">
                <div className="portfolio-wrap">
                  <a
                    href="./src/img/portfolio/app-1 (2).jpg"
                    className="glightbox"
                  >
                    <img
                      src="./img/portfolio/app-1.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </a>
                  <div className="container bg-white pb-6 text-center rounded-lg shadow-lg overflow-hiden">
                    <h4>
                      <a
                        href="#"
                        className="text-xl font-semibold text-gray-800 hover:text-orange-400 transition duration-300"
                        title="More Details"
                      >
                        Dashboards StockApp
                      </a>
                    </h4>
                    <p className="text-gray-600">
                      Diseño para ser utilizado en dispositivos móviles
                    </p>
                  </div>
                </div>
              </div>

              <div className="portfolio-item filter-app">
                <div className="portfolio-wrap">
                  <a
                    href="./src/img/portfolio/app-1 (2).jpg"
                    className="glightbox"
                  >
                    <img
                      src="./img/portfolio/app-1.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </a>
                  <div className="container bg-white pb-6 text-center rounded-lg shadow-lg overflow-hiden">
                    <h4>
                      <a
                        href="#"
                        className="text-xl font-semibold text-gray-800 hover:text-orange-400 transition duration-300"
                        title="More Details"
                      >
                        Dashboards StockApp
                      </a>
                    </h4>
                    <p className="text-gray-600">
                      Diseño para ser utilizado en dispositivos móviles
                    </p>
                  </div>
                </div>
              </div>

              <div className="portfolio-item filter-app">
                <div className="portfolio-wrap">
                  <a
                    href="./src/img/portfolio/app-1 (2).jpg"
                    className="glightbox"
                  >
                    <img
                      src="./img/portfolio/app-1.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </a>
                  <div className="container bg-white pb-6 text-center rounded-lg shadow-lg overflow-hiden">
                    <h4>
                      <a
                        href="#"
                        className="text-xl font-semibold text-gray-800 hover:text-orange-400 transition duration-300"
                        title="More Details"
                      >
                        Dashboards StockApp
                      </a>
                    </h4>
                    <p className="text-gray-600">
                      Diseño para ser utilizado en dispositivos móviles
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Portafolio Section */}
      {/*  faQ Section */}
      <section id="faq" className=" bg:gray-100 py-16">
        <div
          className="container mx-auto px-4"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
              <div className="px-2 py-4 lg:px-0">
                <h2 className="text-5xl font-semibold mb-4">
                  Preguntas más <br />
                  <span className="text-black-500 font-bold uppercase text-orange-300">
                    Frecuentes
                  </span>
                </h2>
                <p className="text-base text-gray-500 mb-6 ">
                  Muchas veces la gente nos pregunta muchas cosas que a veces es
                  complicado responder todas, aquí verán algunas que hemos
                  respondido y han sido relevantes para seguir mejorando como
                  empresa.
                </p>
              </div>
            </div>
            <div className="lg:col-span-1 my-4">
              <div className="bg-white dark:bg-slate-900 rounded-lg px-6 py-8 my-4 ring-1 ring-slate-900/5 shadow-xl">
                <div>
                  <span className="inline-flex items-center justify-center p-4 bg-orange-300 rounded-xl shadow-lg">
                    <FaCommentAlt />
                  </span>
                </div>
                <h3 className="text-slate-900 dark:text-white mt-5 text-base font-semibold tracking-tight">
                  ¿Cómo ZonaBAR garantiza la continuidad del negocio durante la
                  implementación del software?
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                  ZonaBAR ofrece servicios de consultoría en gestión de
                  inventario durante la implementación para asegurar una
                  transición sin problemas, junto con programas de capacitación
                  y soporte técnico para garantizar una adopción exitosa.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg px-6 py-8 my-4 ring-1 ring-slate-900/5 shadow-xl">
                <div>
                  <span className="inline-flex items-center justify-center p-4 bg-orange-300 rounded-xl shadow-lg">
                    <FaCommentAlt />
                  </span>
                </div>
                <h3 className="text-slate-900 dark:text-white mt-5 text-base font-semibold tracking-tight">
                  ¿Cómo se adapta ZonaBAR a las necesidades específicas de
                  diferentes tipos de empresas?
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                  ZonaBAR se destaca por su capacidad de personalización,
                  permitiendo a las empresas adaptar la plataforma a sus flujos
                  de trabajo únicos, ya sea una pequeña tienda boutique o una
                  cadena internacional de suministro.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg px-6 py-8 my-4 ring-1 ring-slate-900/5 shadow-xl">
                <div>
                  <span className="inline-flex items-center justify-center p-4 bg-orange-300 rounded-xl shadow-lg">
                    <FaCommentAlt />
                  </span>
                </div>
                <h3 className="text-slate-900 dark:text-white mt-5 text-base font-semibold tracking-tight">
                  ¿Cómo garantiza ZonaBAR la seguridad de los datos de sus
                  clientes?
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                  ZonaBAR implementa medidas de seguridad robustas, incluyendo
                  cifrado avanzado y autenticación, para garantizar la
                  confidencialidad e integridad de la información almacenada en
                  la plataforma.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End faQ section */}
      {/*  contact Section */}
      <section id="contact" className="contact bg-gray-100 py-16">
        <div
          className="container mx-auto"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="section-header text-center mb-10">
            <h2 className="text-4xl font-bold font-serif mb-4 underline underline-offset-8">
              Contacto
            </h2>
            <p className="text-gray-600">
              ¡Contáctanos o escríbenos un correo y responderemos tus dudas lo
              más rápido posible!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
            <div className="col-span-1 lg:col-span-1">
              <div className="info-container flex flex-col items-center justify-center bg-zinc-500 rounded-lg p-6 shadow-md ">
                <div className="info-item flex mb-4">
                  <i className="bi bi-geo-alt text-2xl text-blue-500 flex-shrink-0"></i>
                  <div className="form-control border border-orange-300 rounded-lg px-20 py-2 w-full bg-orange-300 focus:outline-none focus:border-blue-500 text-center ml-4">
                    <h4 className="text-xl font-semibold text-white">
                      Ubicación:
                    </h4>
                    <p className="text-white">
                      Complejo paloquemao - SENA (Por ahora)
                    </p>
                  </div>
                </div>

                <div className="info-item flex mb-4">
                  <i className="bi bi-envelope text-2xl text-blue-500 flex-shrink-0"></i>
                  <div className="form-control border border-orange-300 rounded-lg px-20 py-2 w-full bg-orange-300 focus:outline-none focus:border-blue-500 text-center ml-4">
                    <h4 className="text-xl font-semibold text-white">
                      Correo:
                    </h4>
                    <p className="text-white">zonabar@gmail.com</p>
                  </div>
                </div>

                <div className="info-item flex mb-4">
                  <i className="bi bi-phone text-2xl text-blue-500 flex-shrink-0"></i>
                  <div className="form-control border border-orange-300 rounded-lg px-20 py-2 w-full bg-orange-300 focus:outline-none focus:border-blue-500 text-center ml-4">
                    <h4 className="text-xl font-semibold text-white">Llama:</h4>
                    <p className="text-white">+1 5589 55488 55</p>
                  </div>
                </div>

                <div className="info-item flex">
                  <i className="bi bi-clock text-2xl text-blue-500 flex-shrink-0"></i>
                  <div className="form-control border border-orange-300 rounded-lg px-20 py-2 w-full bg-orange-300 focus:outline-none focus:border-blue-500 text-center ml-4">
                    <h4 className="text-xl font-semibold text-white">
                      Horario abierto
                    </h4>
                    <p className="text-white">Lunes - Viernes / 24hrs</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-1">
              <form
                action="forms/contact.php"
                method="post"
                role="form"
                className="php-email-form bg-white rounded-lg p-6 shadow-md"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className=" border border-gray-300 rounded-lg px-4 py-2 mb-2 w-full focus:outline-none focus:border-blue-500 text-center"
                      id="name"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className=" border border-gray-300 rounded-lg px-4 py-2 mb-2 w-full focus:outline-none focus:border-blue-500 text-center"
                      name="email"
                      id="email"
                      placeholder="Tu email"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className=" border border-gray-300 rounded-lg px-4 py-2 mb-2 w-full focus:outline-none focus:border-blue-500 text-center"
                    name="subject"
                    id="subject"
                    placeholder="Usuario (Opcional / si tienes)"
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500 text-center"
                    name="message"
                    rows="7"
                    placeholder="Mensaje"
                    required
                  ></textarea>
                </div>
                <div className="my-3 text-center">
                  {status === "loading" && (
                    <div className="loading">Cargando...</div>
                  )}
                  {status === "error" && (
                    <div className="error-message">
                      No se pudo enviar tu mensaje. Intenta de nuevo
                    </div>
                  )}
                  {status === "sent" && (
                    <div className="sent-message">
                      Tu mensaje ha sido enviado. ¡Gracias por confiar en
                      nosotros!
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-zinc-500 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:bg-blue-600"
                  >
                    Enviar mensaje
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* End contact section */}
      {/* End Main */}
      {/* Footer */}
      <footer id="footer" className="bg-neutral-600 text-white">
        <div className="container mx-auto py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <div>
                <Link to="/" className="flex items-center">
                  <span className="text-3xl font-bold">ZonaBAR</span>
                </Link>
                <p className="text-sm">Síguenos en nuestras redes</p>
                <div className="flex mt-4">
                  <a
                    href="#"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-white text-base mr-2"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-white text-base mr-2"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-white text-base mr-2"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-white text-base mr-2"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div>
                <h4 className="font-bold pb-2">Redirígete donde desees</h4>
                <ul>
                  <li>
                    <a href="#">Inicio</a>
                  </li>
                  <li>
                    <a href="#">Sobre nosotros</a>
                  </li>
                  <li>
                    <a href="#">Servicios</a>
                  </li>
                  <li>
                    <a href="#">Términos de servicios</a>
                  </li>
                  <li>
                    <a href="#">Política de privacidad</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-span-1">
              <div className="text-left">
                <h4 className="font-bold">Contactanos</h4>
                <p>
                  Complejo paloquemao <br />
                  SENA <br />
                  Bogotá - Colombia <br />
                  <br />
                  <strong>Teléfono:</strong> +1 5589 55488 55 <br />
                  <strong>Correo:</strong> stocksmart.2023@outlook.com <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* End Footer */}
    </>
  );
}

export default LandingPage;
