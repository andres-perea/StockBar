import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import {IoBeer, IoList, IoArrowForward} from "react-icons/io5";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleScroll = () => {
            if(Window.scrollY > 100){
                setIsSticky(true);
            }
            else{
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return() => {
         window.addEventListener('scroll', handleScroll)   
        }
    });


    const navItems =[
        {link: "Inicio", path: "inicio"},
        {link: "Nosotros", path: "nosotros"},
        {link: "Menu", path: "menu"},
        {link: "Contacto", path: "contacto"},
    ];

  return (
    <header className='w-full bg-white md:bg-transparent fixed top-0 left-0 right-0'>
        <nav>
            <div className='flex text-4x2 cursor-pointer items-center gap-2'>
            <IoBeer className='w-9 h-10 text-gray-700'/> 
            <span className='text-gray-600 font-bold text-2x1'>ZonaBAR</span>
            </div>


            <ul className='md:flex space-x-12 hidden'>
                {
                    navItems.map(({link, path}) => <Link to={path} spy={true} smooth={true} offset={-100} key={path} className='block text-base text-gray-900 hover:text-gray-600 first:font-medium'>{link}</Link> ) 
                }
            </ul>
        </nav>
    </header>
 
  );
};

export default Header;