import React, { useEffect } from "react";
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
  FaDatabase,
  FaLaptopCode,
  FaLaptop,
  FaUserFriends,
  FaColumns,
  FaArrowRightArrowLeft,
  FaArrowRight,
  FaRegPlayCircle
} from "react-icons/fa";
import { BsArchive, BsFileCheck, BsShieldCheck, BsTools } from "react-icons/bs";
import AOS from "aos";
import "aos/dist/aos.css";

function LandingPage() {
  useEffect(() => {
    AOS.init();
  }, []);

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
      <header id="header">
        <div className="bg-neutral-600 py-6 px-16">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="flex items-center text-white">
              <h1 className="text-2xl font-bold">
                Zona<span className=" text-zinc-400">BAR.</span>
              </h1>
            </Link>
            <nav className="fle items-center">
              <ul className="flex space-x-4 text-stone-300 font-bold text-sm mx-6">
                <li>
                  <a href="" className="mx-2">
                    Incio
                  </a>
                </li>
                <li>
                  <a href="" className="mx-2">
                    Sobre Nosotros
                  </a>
                </li>
                <li>
                  <a href="" className="mx-2">
                    Servicios
                  </a>
                </li>
                <li>
                  <a href="" className="mx-2">
                    Portafolio
                  </a>
                </li>
                <li>
                  <a href="" className="mx-2">
                    Equipo
                  </a>
                </li>
                <li>
                  <a href="" className="mx-2">
                    Contactanos
                  </a>
                </li>
                <li>
                  <Link to="/login">Iniciar Sesion</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      {/* End Header */}
      {/* Section hero */}
      <section id="hero" className="bg-neutral-600 py-16">
        <div className="container mx-auto relative">
          <div className="row gy-5" data-aos="fade-in">
            <div className="grid grid-cols-2 gap-2">
              <div className=" order-2 lg:order-1 flex flex-col justify-center text- left lg:px-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white pb-8">
                  Bienvenido a ZonaBAR
                </h2>
                <p className="text-base text-stone-300">
                  Nuestro equipo de profesionales altamente capacitados y
                  comprometidos está siempre listo para brindar asistencia y
                  orientación en cada paso del proceso de inventario.
                </p>
                <div className="flex justify-center lg:justify-start mt-8">
                  <a
                    href="/register"
                    className="bg-neutral-500 text-white border-zinc-500 hover:border-zinc-200 duration-200 border-2 font-bold py-2 px-4 rounded-full mr-4 py-4 px-10"
                  >
                    Empezar
                  </a>
                  <a
                    href="https://www.youtube.com/watch?v=n1oUspMuUgk"
                    className="flex items-center text-white font-bold hover:text-white duration-200 py-2 px-4"
                  >
                    <FaRegPlayCircle className="text-stone-300 text-3xl pr-2" />
                    <span>Ver video</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto relative py-8">
          <div className="grid grid-cols-4 gap-6 justify-center">
            <div className="relative py-16 px-8 bg-zinc-800 rounded-lg font-bold text-center text-white hover:bg-gray-400 hover:text-white duration-200">
              <div className="flex flex-col items-center justify-center">
                <BsFileCheck className="mb-5 pt-2 text-5xl text-stone-300" />
                <h4 className="mb-4 text-2xl">Administracion de inventario</h4>
              </div>
            </div>
            <div className="relative py-16 px-8 bg-zinc-800 rounded-lg font-bold text-center text-white hover:bg-gray-400 hover:text-white duration-200">
              <div className="flex flex-col items-center justify-center">
                <BsArchive className="mb-5 pt-2 text-5xl text-stone-300" />
                <h4 className="mb-4 text-2xl">Gestion de stock</h4>
              </div>
            </div>
            <div className="relative py-16 px-8 bg-zinc-800 rounded-lg font-bold text-center text-white hover:bg-gray-400 hover:text-white duration-200">
              <div className="flex flex-col items-center justify-center">
                <BsShieldCheck className="mb-5 pt-2 text-5xl text-stone-300" />
                <h4 className="mb-4 text-2xl">Seguridad de la informacion</h4>
              </div>
            </div>
            <div className="relative py-16 px-8 bg-zinc-800 rounded-lg font-bold text-center text-white hover:bg-gray-400 hover:text-white duration-200">
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
        <div className="container mx-auto px-4" data-aos="fade-up">
          <div className="text-center mb-12">
            <h2 className=" text-3xl font-semibold mb-4 underline underline-offset-8">
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
                className="rounded-lg mb-4img-fluid"
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
        <div className="container mx-auto" data-aos="zoom-out">
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
                  <span
                    data-purecounter-start="0"
                    data-purecounter-end="010"
                    data-purecounter-duration="1"
                    className="font-bold text-2xl text-gray-500"
                  >
                    <p className="ml-2">
                      <strong>Clientes felices</strong>Lorem ipsum dolor sit
                      amet consectetur.
                    </p>
                  </span>
                </div>
                <div className="stats-items flex items-center">
                  <span
                    data-purecounter-start="0"
                    data-purecounter-end="010"
                    data-purecounter-duration="1"
                    className="font-bold text-2xl text-gray-500"
                  >
                    <p className="ml-2">
                      <strong>Proyectos</strong>Lorem ipsum dolor sit amet
                      consectetur.
                    </p>
                  </span>
                </div>
                <div className="stats-items flex items-center">
                  <span
                    data-purecounter-start="0"
                    data-purecounter-end="010"
                    data-purecounter-duration="1"
                    className="font-bold text-2xl text-gray-500"
                  >
                    <p>
                      <strong>Horas de Soporte</strong>Lorem ipsum dolor sit
                      amet consectetur.
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>



        </div>

      </section>
      {/* End Counter Section */}
      {/* Our Services Section */}
      <section id="services" className=" bg-gray-100 py-16">
      <div className="container mx-auto" data-aos="fade-up">

        <div className="section-header text-center">
          <h2 className="text-3xl font-semibold">Servicios</h2>
          <p>Nos enfocamos en mejorar el servicio hacia nuestros clientes, demostrando que se está capacitado para ejercer todo tipo de software que sea solicitado</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="100">

        <div className="col-span-1 lg:col-span-1">
            <div className="service-item relative bg-white p-6 rounded-lg shadow-lg">
              <div className="text-blue-800">
                <i className="text-3xl"><FaDatabase /></i>
              </div>
              <h3 className="text-xl font-semibold mt-4">Optimizacion del espacio de almacenamiento</h3>
              <p className="mt-2">Herramientas y algoritmos especializados para maximizar el uso del espacio de almacenamiento, reduciendo costos y mejorando la eficiencia logística.</p>
              <a href="#" className="readmore mt-4 inline-block">Leer más.. <i className="text-xl"><FaArrowRight /></i></a>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-1">
            <div className="service-item relative bg-white p-6 rounded-lg shadow-lg">
              <div className="text-blue-800">
                <i className="text-3xl"><FaUserFriends /></i>
              </div>
              <h3 className="text-xl font-semibold mt-4">Integracion de proveedores y clientes</h3>
              <p className="mt-2">Desarrollo de funcionalidades que faciliten la comunicación y colaboración entre la empresa, sus proveedores y clientes, optimizando la cadena de suministro.</p>
              <a href="#" className="readmore mt-4 inline-block">Leer más.. <i className="text-xl"><FaArrowRight /></i></a>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-1">
            <div className="service-item relative bg-white p-6 rounded-lg shadow-lg">
              <div className="text-blue-800">
                <i className="text-3xl"><FaColumns /></i>
              </div>
              <h3 className="text-xl font-semibold mt-4">Desarrollo de dashboards personalizados</h3>
              <p className="mt-2">Creación de paneles de control personalizados que permitan a los usuarios visualizar de manera clara y concisa los indicadores clave de rendimiento relacionados con el inventario.</p>
              <a href="#" className="readmore mt-4 inline-block">Leer más.. <i className="text-xl"><FaArrowRight /></i></a>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-1">
            <div className="service-item relative bg-white p-6 rounded-lg shadow-lg">
              <div className="text-blue-800">
                <i className="text-3xl"><FaLaptopCode /></i>
              </div>
              <h3 className="text-xl font-semibold mt-4">Desarrollo de Plataforma de Gestión de Inventario</h3>
              <p className="mt-2">Creación y mantenimiento de una plataforma integral para la gestión eficiente de inventarios, desde la entrada de productos hasta la venta final.</p>
              <a href="#" className="readmore mt-4 inline-block">Leer más.. <i className="text-xl"><FaArrowRight /></i></a>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-1">
            <div className="service-item relative bg-white p-6 rounded-lg shadow-lg">
              <div className="text-blue-800">
                <i className="text-3xl"><FaLaptop /></i>
              </div>
              <h3 className="text-xl font-semibold mt-4">Integración con Tecnologías Emergentes</h3>
              <p className="mt-2">Exploración y desarrollo de capacidades de integración con tecnologías emergentes, como IoT y realidad aumentada, para mejorar la monitorización y la eficiencia.</p>
              <a href="#" className="readmore mt-4 inline-block">Leer más.. <i className="text-1xl "><FaArrowRight /></i></a>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-1">
            <div className="service-item relative bg-white p-6 rounded-lg shadow-lg">
              <div className=" text-blue-800">
                <i className="text-3xl"><FaArrowRightArrowLeft /></i>
              </div>
              <h3 className="text-xl font-semibold mt-4">Gestión de Devoluciones Automatizada</h3>
              <p className="mt-2">Desarrollo de funciones específicas para gestionar eficientemente el proceso de devoluciones, minimizando el impacto en el inventario y mejorando la experiencia del cliente.</p>
              <a href="#" className="readmore mt-4 inline-block">Leer más.. <i className="text-xl"><FaArrowRight /></i></a>
            </div>
          </div>

        </div>
 
      </div>
      </section>
      {/* End Our Services Section */}
      {/* Portafolio Section */}
      <section id="portafolio" className="bg-gray-100 py-16">
        <div className="container mx-auto" data-aos="fade-up">

<div className="section-header text-center">
  <h2 className="text-3xl font-semibold">Portafolio</h2>
  <p>Encontramos algunos productos y/o marcas que estos distribuyen, para brindar una mejor asesoría al momento de mostrar sus productos</p>
</div>

<div className="portfolio-isotope" data-portfolio-filter="*" data-portfolio-layout="masonry" data-portfolio-sort="original-order" data-aos="fade-up" data-aos-delay="100">

  <div>
    <ul className="portfolio-flters flex justify-center mb-8">
      <li data-filter="*" className="cursor-pointer px-4 py-2 mx-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition duration-300">Todo</li>
      <li data-filter=".filter-app" className="cursor-pointer px-4 py-2 mx-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition duration-300">Aplicaciones</li>
      <li data-filter=".filter-product" className="cursor-pointer px-4 py-2 mx-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition duration-300">Productos</li>
      <li data-filter=".filter-branding" className="cursor-pointer px-4 py-2 mx-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition duration-300">Marcas</li>
      <li data-filter=".filter-books" className="cursor-pointer px-4 py-2 mx-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition duration-300">Librería</li>
    </ul>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 portfolio-container">

    <div className="portfolio-item filter-app">
      <div className="portfolio-wrap">
        <a href="./src/img/portfolio/app-1 (2).jpg" className="glightbox"><img src="./img/portfolio/app-1.jpg" className="img-fluid" alt="" /></a>
        <div className="portfolio-info">
          <h4><a href="#" className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition duration-300" title="More Details">Dashboards StockApp</a></h4>
          <p className="text-gray-600">Diseño para ser utilizado en dispositivos móviles</p>
        </div>
      </div>
    </div>

    <div className="portfolio-item filter-app">
      <div className="portfolio-wrap">
        <a href="./src/img/portfolio/app-1 (2).jpg" className="glightbox"><img src="./img/portfolio/app-1.jpg" className="img-fluid" alt="" /></a>
        <div className="portfolio-info">
          <h4><a href="#" className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition duration-300" title="More Details">Dashboards StockApp</a></h4>
          <p className="text-gray-600">Diseño para ser utilizado en dispositivos móviles</p>
        </div>
      </div>
    </div>

    <div className="portfolio-item filter-app">
      <div className="portfolio-wrap">
        <a href="./src/img/portfolio/app-1 (2).jpg" className="glightbox"><img src="./img/portfolio/app-1.jpg" className="img-fluid" alt="" /></a>
        <div className="portfolio-info">
          <h4><a href="#" className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition duration-300" title="More Details">Dashboards StockApp</a></h4>
          <p className="text-gray-600">Diseño para ser utilizado en dispositivos móviles</p>
        </div>
      </div>
    </div>

    <div className="portfolio-item filter-app">
      <div className="portfolio-wrap">
        <a href="./src/img/portfolio/app-1 (2).jpg" className="glightbox"><img src="./img/portfolio/app-1.jpg" className="img-fluid" alt="" /></a>
        <div className="portfolio-info">
          <h4><a href="#" className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition duration-300" title="More Details">Dashboards StockApp</a></h4>
          <p className="text-gray-600">Diseño para ser utilizado en dispositivos móviles</p>
        </div>
      </div>
    </div>

    <div className="portfolio-item filter-app">
      <div className="portfolio-wrap">
        <a href="./src/img/portfolio/app-1 (2).jpg" className="glightbox"><img src="./img/portfolio/app-1.jpg" className="img-fluid" alt="" /></a>
        <div className="portfolio-info">
          <h4><a href="#" className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition duration-300" title="More Details">Dashboards StockApp</a></h4>
          <p className="text-gray-600">Diseño para ser utilizado en dispositivos móviles</p>
        </div>
      </div>
    </div>

    <div className="portfolio-item filter-app">
      <div className="portfolio-wrap">
        <a href="./src/img/portfolio/app-1 (2).jpg" className="glightbox"><img src="./img/portfolio/app-1.jpg" className="img-fluid" alt="" /></a>
        <div className="portfolio-info">
          <h4><a href="#" className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition duration-300" title="More Details">Dashboards StockApp</a></h4>
          <p className="text-gray-600">Diseño para ser utilizado en dispositivos móviles</p>
        </div>
      </div>
    </div>

    <div className="portfolio-item filter-app">
      <div className="portfolio-wrap">
        <a href="./src/img/portfolio/app-1 (2).jpg" className="glightbox"><img src="./img/portfolio/app-1.jpg" className="img-fluid" alt="" /></a>
        <div className="portfolio-info">
          <h4><a href="#" className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition duration-300" title="More Details">Dashboards StockApp</a></h4>
          <p className="text-gray-600">Diseño para ser utilizado en dispositivos móviles</p>
        </div>
      </div>
    </div>

  </div>

</div>

</div>
      </section>
      {/* End Portafolio Section */}
      {/* End Main */}
    </>
  );
};

export default LandingPage;
