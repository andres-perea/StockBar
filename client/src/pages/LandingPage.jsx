import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { IoBeer, IoClose, IoMenu } from "react-icons/io5";
import { Carousel } from "flowbite-react";

function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (Window.scrollY > 100) {
                setIsSticky(true);
            }
            else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.addEventListener('scroll', handleScroll);
        }
    });


    const navItems = [
        { link: "Inicio", path: "inicio" },
        { link: "Nosotros", path: "nosotros" },
        { link: "Menu", path: "menu" },
        { link: "Contacto", path: "contacto" },
    ];

    return (
        <>
            <div className="bg-gray-300">
                {/* Navbar*/}
                <header className='w-full bg-white md:bg-transparent fixed top-0 left-0 right-0'>
                    <nav className={`py-4 lg:px-14 ${isSticky ? "sticky top-0 left-0 right-0 border-b bg-white duration-300" : ""}`}>
                        <div className='flex justify-between items-center text-base gap-8'>
                            <div>
                                <IoBeer className='w-10 h-10 inline-block items-center text-gray-700' />
                                <span className='text-gray-600 font-bold text-2x1'>ZonaBAR</span>
                            </div>

                            <ul className='md:flex space-x-12 hidden'>
                                {
                                    navItems.map(({ link, path }) => <Link to={path} spy={true} smooth={true} offset={-100} key={path} className='block text-base text-gray-900 hover:text-gray-600 first:font-medium'>{link}</Link>)
                                }
                            </ul>
                            {/* Boton para el login */}
                            <div className='space-x-12 hidden lg:flex items-center'>
                                <a href="/" className='hidden lg:flex items-center text-gray-600 hover:text-gray-900'>Iniciar Sesion</a>
                                <button className='bg-gray-500 text-white py-2 px-4 transition-all duration-300 rounded-lg hover:bg-gray-900'>Registrarse</button>
                            </div>
                            {/* Responsivo */}

                            <div className='md:hidden'>
                                <button onClick={toggleMenu} className='text-gray-500 focus:outline-none focus:text-gray-500'>
                                    {
                                        isMenuOpen ? (<IoClose className='h-6 w-6' />) : (<IoMenu className='h-6 w-6' />)
                                    }
                                </button>
                            </div>
                        </div>
                    </nav>
                    {/* Navegador responsivo para celulares */}
                    <div className={`space-y-4 px-4 mt-16 py-7 bg-gray-600 ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
                        {
                            navItems.map(({ link, path }) => <Link to={path} spy={true} smooth={true} offset={-100} key={path} className='block text-base text-white hover:text-gray-200 first:font-medium'>{link}</Link>)
                        }
                    </div>
                </header>
            
            {/* Inicio */}   
            <div className="bg-white">
             <div className="px-4 lg:px-14 max-w-screen-2x1 mx-auto min-h-screen h-screen">
             <Carousel className="w-full mx-auto">
                <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
                    <div>
                        <img src="" alt="" />
                    </div>
                    <div className="md:w-1/2">
                        <h1 className="text-5x1 font-semibold mb-4 text-gray-500 md:w-3/4 leading-snug">Lorem ipsum dolor <span>sit amet consectetur.</span></h1>
                    </div>
                </div>

             </Carousel>
             </div>
            </div>          
      </div>
        </>
    )
}


export default LandingPage;