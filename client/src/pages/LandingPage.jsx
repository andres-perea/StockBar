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
import { MdClose } from "react-icons/md";

function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }
  useEffect(() => {
    AOS.init();
  }, []);

  const TeamMember = ({ name, role }) => {
    return (
      <div className="bg-stone-600 rounded-lg shadow-lg overflow-hiden">
        <div className="p-4">
          <div className="text-center">
            <h4 className="text-x1 font-bold text-gray-300 mb-4">{name}</h4>
            <span className="text-sm text-gray-200 font-semibold">{role}</span>
          </div>
          <div className="flex justify-center mt-4">
            <a
              href=""
              className=" text-yellow-400 rounded-lg place-content-center hover:text-gray-800 mr-4"
            >
              <i>
                {" "}
                <FaTwitter />
              </i>
            </a>
            <a
              href=""
              className=" text-yellow-400 rounded hover:text-gray-800 mr-4"
            >
              <i>
                {" "}
                <FaFacebook />
              </i>
            </a>
            <a
              href=""
              className="text-yellow-400 rounded  hover:text-gray-800 mr-4"
            >
              <i>
                {" "}
                <FaInstagram />
              </i>
            </a>
            <a
              href=""
              className="text-yellow-400 rounded hover:text-gray-800 mr-4"
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

  
  return (
    <>
      {/* Header */}
      <header id="header">
        <nav className="bg-stone-900 py-6 px-4 md:px-16 fixed w-full top-0 z-50 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center text-white">
              <h1 className="text-3xl font-bold font-sans">
                B<span className=" text-yellow-300">M.</span>
              </h1>
            </div>
            {/* Menú desplegable */}
            <div className="relative md:hidden md:items-center md:static">
              <FaBars
                className="cursor-pointer text-yellow-300 font-bold mr-10"
                size={24}
                onClick={toggleMenu}
              />
              {isOpen && (
                <div className="fixed z-50 top-0 right-0 md:left-auto md:right-0 w-64 bg-stone-900 text-center p-8 h-screen transition duration-200 translate-x-0">
                    <MdClose onClick={closeMenu} className="text-yellow-300 text-lg cursor-pointer" />
                <div className="flex flex-col items-center justify-center font-bold text-lg h-full space-y-4">
                  <a
                    href="#"
                    className="text-yellow-300 hover:text-yellow-400 duration-500 block w-full"
                  >
                    Inicio
                  </a>
                  <a
                    href="#about"
                    className="text-yellow-300 hover:text-yellow-400 duration-500 block w-full"
                  >
                    Sobre Nosotros
                  </a>
                  <a
                    href="#services"
                    className="text-yellow-300 hover:text-yellow-400 duration-500 block w-full"
                  >
                    Servicios
                  </a>
                  <a
                    href="#portafolio"
                    className="text-yellow-300 hover:text-yellow-400 duration-500 block w-full"
                  >
                    Portafolio
                  </a>
                  <a
                    href="#team"
                    className="text-yellow-300 hover:text-yellow-400 duration-500 block w-full"
                  >
                    Equipo
                  </a>
                  <a
                    href="#contact"
                    className="text-yellow-300 hover:text-yellow-400 duration-500 block w-full"
                  >
                    Contactanos
                  </a>
                  <Link
                    to="/login"
                    className="text-yellow-300 hover:text-yellow-400 duration-500 block w-full"
                  >
                    Iniciar Sesión
                  </Link>
                </div>
              </div>
              
              )}
            </div>
            {/* Fin del menú desplegable */}
            <ul className="hidden md:flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-stone-300 font-semibold text-lg ">
              <li>
                <a
                  href="#"
                  className="mx-2 hover:text-yellow-300 duration-500 hover:underline underline-offset-8"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="mx-2 hover:text-yellow-300 duration-500 hover:underline underline-offset-8"
                >
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="mx-2 hover:text-yellow-300 duration-500 hover:underline underline-offset-8"
                >
                  Servicios
                </a>
              </li>
              <Link to="/menu" className="mx-2 hover:text-yellow-300 duration-500 hover:underline underline-offset-8">
                  Menu
              </Link>          
              <li>
                <a
                  href="#team"
                  className="mx-2 hover:text-yellow-300 duration-500 hover:underline underline-offset-8"
                >
                  Equipo
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="mx-2 hover:text-yellow-300 duration-500 hover:underline underline-offset-8"
                >
                  Contactanos
                </a>
              </li>
              <li>
                <Link
                  to="/login"
                  className="bg-yellow-300 text-black  mr-0 lg:mr-2 mb-2 lg:mb-0 py-2 px-6 rounded-lg hover:bg-white hover:text-black text-center duration-200"
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
      <section id="hero" className="bg-stone-900 mt-6 pt-16">
        <div className="container mx-auto relative px-4 my-4">          
          <div className="row gy-5" data-aos="fade-up" data-aos-delay="300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <div className="order-2 lg:order-1 flex flex-col justify-center text-left lg:px-12">
                <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold text-white pb-8">
                  Bienvenido a Bar
                  <span className="text-yellow-300 ">Manage</span>
                </h2>
                <p className="text-base text-stone-200 font-semibold font-sans">
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
                    to="/registro"
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
              className="relative py-16 px-8 bg-stone-600 rounded-lg font-bold text-center text-white hover:bg-gray-400 hover:text-white duration-400 hover:shadow-lg"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="flex flex-col items-center justify-center ">
                <BsFileCheck className="mb-5 pt-2 text-5xl text-stone-300" />
                <h4 className="mb-4 text-2xl">Administracion de inventario</h4>
              </div>
            </div>
            <div
              className="relative py-16 px-8 bg-stone-600 rounded-lg font-bold text-center text-white hover:bg-gray-400 hover:text-white duration-200"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="flex flex-col items-center justify-center">
                <BsArchive className="mb-5 pt-2 text-5xl text-stone-300" />
                <h4 className="mb-4 text-2xl">Gestion de stock</h4>
              </div>
            </div>
            <div
              className="relative py-16 px-8 bg-stone-600 rounded-lg font-bold text-center text-white hover:bg-gray-400 hover:text-white duration-200"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="flex flex-col items-center justify-center">
                <BsShieldCheck className="mb-5 pt-2 text-5xl text-stone-300" />
                <h4 className="mb-4 text-2xl">Seguridad de la informacion</h4>
              </div>
            </div>
            <div
              className="relative py-16 px-8 bg-stone-600 rounded-lg font-bold text-center text-white hover:bg-gray-400 hover:text-white duration-200"
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
      <section id="about" className="bg-stone-800 py-16">
        <div
          className="container mx-auto px-4"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl text-white font-serif font-bold mb-4 underline underline-offset-8">
              Sobre Nosotros
            </h2>
            <p className="text-base text-gray-300 font-semibold" >
              En nuestra empresa de inventarios, combinamos experiencia,
              tecnología avanzada y un enfoque centrado en el cliente para
              brindar soluciones de inventario efectivas y confiables.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="col-span-1 lg:col-span-1">
              <h3 className="text-3xl text-white font-bold mb-4">
                UNA PLATAFORMA QUE SE ADAPTA A LAS NECESIDADES DEL CLIENTE
              </h3>
              <img
                src="./src/img/bar.jpg"
                className="rounded-lg mb-4 img-fluid "
                alt=""
              />
              <p className="mb-4 text-white">
                Reconocemos la diversidad de las empresas y sus procesos.
                BarManage se adapta a diferentes sectores y tamaños de negocio,
                ofreciendo opciones de personalización para satisfacer las
                necesidades específicas de cada cliente. Creemos que la
                verdadera eficiencia proviene de la adaptabilidad, y nuestro
                software está diseñado para crecer y evolucionar con su empresa.
              </p>
              <p className="mb-4 text-white">
                Lo que distingue a BarManage es su compromiso con la innovación
                tecnológica. La empresa emplea tecnologías de vanguardia como
                inteligencia artificial, aprendizaje automático y análisis
                predictivo para proporcionar a sus clientes insights profundos
                sobre sus inventarios. El sistema inteligente de BarManage no solo
                rastrea la cantidad de existencias, sino que también analiza
                patrones de demanda, prevé tendencias del mercado y sugiere
                estrategias de reabastecimiento, todo en tiempo real.
              </p>
            </div>
            <div className="col-span-1 lg:col-span-1 text-white">
              <div className="ps-0 lg:ps-5">
                <p className="italic mb-4">
                  Con su enfoque innovador y tecnología de vanguardia, BarManage
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
                  estratégica. Al elegir BarManage, las empresas eligen la
                  innovación y la eficiencia en cada nivel de su cadena de
                  suministro.
                </p>

                <div className="relative">
                  <img
                    src="./src/img/bar2.jpg"
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
      <section id="clients" className="bg-stone-800 py-16">
        <div
          className="container mx-auto"
          data-aos="fade-up"
          data-aos-delay="300"
        >
        </div>
      </section>
      {/* End Clients Section */}
      {/* Our Services Section */}
      <section id="services" className=" bg-stone-900 py-16">
        <div
          className="container mx-auto"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="section-header text-center pb-14">
            <h2 className=" text-4xl font-bold text-white font-serif mb-4 underline underline-offset-8">
              Servicios
            </h2>
            <p className="text-base text-gray-300 font-semibold">
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
              <div className="relative bg-stone-600 p-10 rounded-lg shadow-lg">
                <div className="mb-6 ">
                  <i className="text-5xl font-bold text-white">
                    <BsDatabaseUp />
                  </i>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-5">
                  Optimizacion del espacio de almacenamiento
                </h3>
                <p className="mt-2 text-white font-semibold">
                  Herramientas y algoritmos especializados para maximizar el uso
                  del espacio de almacenamiento, reduciendo costos y mejorando
                  la eficiencia logística.
                </p>
                <a
                  href="#"
                  className="readmore mt-4 inline-flex font-semibold text-stone-400 hover:text-yellow-400 duration-300"
                >
                  Leer más..{" "}
                  <i className="text-xl">
                    <FaArrowRight />
                  </i>
                </a>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-1">
              <div className="relative bg-stone-600 p-10 rounded-lg shadow-lg">
                <div className="mb-6 ">
                  <i className="text-5xl font-bold text-white">
                    <FaUserFriends />
                  </i>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-5">
                  Integracion de proveedores y clientes
                </h3>
                <p className="mt-2 text-white font-semibold">
                  Desarrollo de funcionalidades que faciliten la comunicación y
                  colaboración entre la empresa, sus proveedores y clientes,
                  optimizando la cadena de suministro.
                </p>
                <a
                  href="#"
                  className="readmore mt-4 inline-flex font-semibold text-stone-400 hover:text-yellow-400 duration-300"
                >
                  Leer más..{" "}
                  <i className="text-xl">
                    <FaArrowRight />
                  </i>
                </a>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-1">
              <div className="relative bg-stone-600 p-10 rounded-lg shadow-lg">
                <div className="mb-6">
                  <i className="text-5xl text-white font-bold">
                    <FaLaptop />
                  </i>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-5">
                  Integración con Tecnologías Emergentes
                </h3>
                <p className="mt-2 font-semibold text-white">
                  Exploración y desarrollo de capacidades de integración con
                  tecnologías emergentes, como IoT y realidad aumentada, para
                  mejorar la monitorización y la eficiencia.
                </p>
                <a
                  href="#"
                  className="readmore mt-4  inline-flex font-semibold text-stone-400 hover:text-yellow-400 duration-300"
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
      <section id="team" className="bg-stone-800 py-16">
        <div
          className="container mx-auto px-8 place-content-center"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl font-serif text-white font-bold mb-4 underline underline-offset-8">
              Nuestro Equipo
            </h2>
            <p className="text-base text-gray-300 font-semibold">
              Nos complace presentar a los que están detrás de este gran
              proceso, dando apoyo óptimo a nuestros clientes y siendo los que
              mantienen a flote esta idea de aportar con nuestro software!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <TeamMember name="Andres Perea" role="Desarrollo de base de datos" />
            <TeamMember name="Andres Villa" role="Desarrollador Back-end" />
            <TeamMember name="Andres Sanchez" role="Desarrollador Front-end" />
            <TeamMember name="Camilo Espinosa" role="Analista de software" />
          </div>
        </div>
      </section>
      {/* End team section */}
      {/* Portafolio Section */}
      <section id="portafolio" className="bg-stone-900 py-16">
        <div
          className="container mx-auto"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="section-header text-center">
            <h2 className=" text-4xl font-serif font-bold mb-4 text-white underline underline-offset-8">
              menú
            </h2>
            <p className="text-base text-gray-300 font-semibold mb-6">
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
                  className="cursor-pointer px-4 py-2 mx-1 rounded-lg border-2 hover:bg-yellow-400  hover:text-black font-semibold text-white transition duration-300"
                >
                  Todo
                </li>
                <li
                  data-filter=".filter-app"
                  className="cursor-pointer px-4 py-2 mx-1 rounded-lg border-2  hover:bg-yellow-400  hover:text-black font-semibold text-white  transition duration-300"
                >
                Cerveceria
                </li>
                <li
                  data-filter=".filter-product"
                  className="cursor-pointer px-4 py-2 mx-1  rounded-lg border-2  hover:bg-yellow-400  hover:text-black font-semibold text-white transition duration-300"
                >
                  Licores
                </li>
                <li
                  data-filter=".filter-books"
                  className="cursor-pointer px-4 py-2 mx-1  rounded-lg border-2  hover:bg-yellow-400  hover:text-black font-semibold text-white transition duration-300"
                >
                  Internacional
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
                      src="./src/img/menu.png"
                      className="img-fluid rounded"
                      alt=""
                    />
                  </a>
                  <div className="container bg-stone-600 pb-6 text-center shadow-lg overflow-hiden ">
                    <h4>
                      <a
                        href="#"
                        className="text-xl font-bold text-gray-300 hover:text-yellow-400 transition duration-300"
                        title="More Details"
                      >
                        Cervezas Nacionales
                      </a>
                    </h4>
                    <p className="text-gray-200 font-semibold">
                      Existe un amplio catalogo de cervezas nacionales
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
                      src="./src/img/menu2.png"
                      className="img-fluid rounded"
                      alt=""
                    />
                  </a>
                  <div className="container bg-stone-600 pb-6 text-center shadow-lg overflow-hiden">
                    <h4>
                      <a
                        href="#"
                        className="text-xl font-bold text-gray-300 hover:text-yellow-400 transition duration-300"
                        title="More Details"
                      >
                       Licores 
                      </a>
                    </h4>
                    <p className="text-gray-200 font-semibold">
                      Tendran variedad de licores de buena calidad
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
                  <div className="container bg-stone-600 pb-6 text-center shadow-lg overflow-hiden">
                    <h4>
                      <a
                        href="#"
                        className="text-xl font-bold text-gray-300 hover:text-yellow-400 transition duration-300"
                        title="More Details"
                      >
                        Entradas
                      </a>
                    </h4>
                    <p className="text-gray-200 font-semibold">
                    Buenas entradas de cualquier tipo
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Portafolio Section */}
      {/*  faQ Section */}
      <section id="faq" className=" bg-stone-800 py-16">
        <div
          className="container mx-auto px-4"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
              <div className="px-2 py-4 lg:px-0">
                <h2 className="text-5xl font-semibold text-white mb-4">
                  Preguntas más <br />
                  <span className="text-black-500 font-bold uppercase text-yellow-300">
                    Frecuentes
                  </span>
                </h2>
                <p className="text-base text-gray-300 mb-6 ">
                  Muchas veces la gente nos pregunta muchas cosas que a veces es
                  complicado responder todas, aquí verán algunas que hemos
                  respondido y han sido relevantes para seguir mejorando como
                  empresa.
                </p>
              </div>
            </div>
            <div className="lg:col-span-1 my-4">
              <div className="bg-stone-600 dark:bg-slate-900 rounded-lg px-6 py-8 my-4 ring-1 ring-slate-900/5 shadow-xl">
                <div>
                  <span className="inline-flex items-center justify-center p-4 bg-yellow-300 rounded-xl shadow-lg">
                    <FaCommentAlt />
                  </span>
                </div>
                <h3 className="text-gray-200 mt-5 text-base font-semibold tracking-tight">
                  ¿Cómo BarManage garantiza la continuidad del negocio durante la
                  implementación del software?
                </h3>
                <p className="text-gray-300 mt-2 text-sm">
                  BarManage ofrece servicios de consultoría en gestión de
                  inventario durante la implementación para asegurar una
                  transición sin problemas, junto con programas de capacitación
                  y soporte técnico para garantizar una adopción exitosa.
                </p>
              </div>
              <div className="bg-stone-600 dark:bg-slate-900 rounded-lg px-6 py-8 my-4 ring-1 ring-slate-900/5 shadow-xl">
                <div>
                  <span className="inline-flex items-center justify-center p-4 bg-yellow-300 rounded-xl shadow-lg">
                    <FaCommentAlt />
                  </span>
                </div>
                <h3 className="text-gray-300 mt-5 text-base font-semibold tracking-tight">
                  ¿Cómo se adapta BarManage a las necesidades específicas de
                  diferentes tipos de empresas?
                </h3>
                <p className="text-gray-200 mt-2 text-sm">
                  BarManage se destaca por su capacidad de personalización,
                  permitiendo a las empresas adaptar la plataforma a sus flujos
                  de trabajo únicos, ya sea una pequeña tienda boutique o una
                  cadena internacional de suministro.
                </p>
              </div>
              <div className="bg-stone-600 rounded-lg px-6 py-8 my-4 ring-1 ring-slate-900/5 shadow-xl">
                <div>
                  <span className="inline-flex items-center justify-center p-4 bg-yellow-300 rounded-xl shadow-lg">
                    <FaCommentAlt />
                  </span>
                </div>
                <h3 className="text-gray-300 mt-5 text-base font-semibold tracking-tight">
                  ¿Cómo garantiza BarManage la seguridad de los datos de sus
                  clientes?
                </h3>
                <p className="text-gray-200 mt-2 text-sm">
                  BarManage implementa medidas de seguridad robustas, incluyendo
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
      <section id="contact" className="bg-stone-900 py-16">
        <div
          className="container mx-auto"
          data-aos="fade-up"
          data-aos-delay="300"
        >

          <div className="section-header text-center mb-10">
            <h2 className="text-4xl font-bold font-serif mb-4 underline text-white underline-offset-8">
              Contacto
            </h2>
            <p className="text-gray-200">
              ¡Contáctanos o escríbenos un correo y responderemos tus dudas lo
              más rápido posible!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
            <div className="col-span-1 lg:col-span-1">
              <div className="info-container flex flex-col items-center justify-center bg-stone-500 rounded-lg p-6 shadow-md ">
                <div className="info-item flex mb-4">
                  <i className="bi bi-geo-alt text-2xl text-blue-500 flex-shrink-0"></i>
                  <div className="form-control border border-yellow-300 rounded-lg px-20 py-2 w-full bg-yellow-300 focus:outline-none focus:border-blue-500 text-center ml-4">
                    <h4 className="text-2xl font-semibold text-white">
                      Ubicación:
                    </h4>
                    <p className="text-xl text-white">
                      SENA
                    </p>
                  </div>
                </div>

                <div className="info-item flex mb-4">
                  <i className="bi bi-envelope text-2xl text-blue-500 flex-shrink-0"></i>
                  <div className="form-control border border-yellow-300 rounded-lg px-20 py-2 w-full bg-yellow-300 focus:outline-none focus:border-blue-500 text-center ml-4">
                    <h4 className="text-2xl font-semibold text-white">
                      Correo:
                    </h4>
                    <p className="text-xl text-white">BarManage@gmail.com</p>
                  </div>
                </div>

                <div className="info-item flex mb-4">
                  <i className="bi bi-phone text-2xl text-blue-500 flex-shrink-0"></i>
                  <div className="form-control border border-yellow-300 rounded-lg px-20 py-2 w-full bg-yellow-300 focus:outline-none focus:border-blue-500 text-center ml-4">
                    <h4 className="text-xl font-semibold text-white">Llama:</h4>
                    <p className="text-white">+1 5589 55488 55</p>
                  </div>
                </div>

                <div className="info-item flex">
                  <i className="bi bi-clock text-2xl text-blue-500 flex-shrink-0"></i>
                  <div className="form-control border border-yellow-300 rounded-lg px-20 py-2 w-full bg-yellow-300 focus:outline-none focus:border-blue-500 text-center ml-4">
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
      <footer id="footer" className="bg-stone-800 text-black">
        <div className="container mx-auto py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <div>
                <Link to="/" className="flex items-center">
                  <span className="text-3xl font-bold text-gray-200">BarManage</span>
                </Link>
                <p className="text-sm text-yellow-300">Síguenos en nuestras redes</p>
                <div className="flex mt-4">
                  <a
                    href="#"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-white text-yellow-300 text-base mr-2"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-10 h-10 rounded-full text-yellow-300 border border-white text-base mr-2"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-10 h-10 rounded-full border text-yellow-300 border-white text-base mr-2"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-10 h-10 rounded-full text-yellow-300 border border-white text-base mr-2"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-span-1 text-white">
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
            <div className="col-span-1 text-white">
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
