import React, { useState } from 'react';
import { Link } from "react-router-dom"
import {IoBeer, IoList, IoArrowForward} from "react-icons/io5";

const Header = () => {
    let Links =[
        {name: 'Inicio', link:'/'},
        {name: 'Nosotros', link:'/'},
        {name: 'Menu', link:'./Menu'},
        {name: 'Contacto', link:'/'},
        
    ]

    let [isOpen, setisOpen] =useState(false)
  return (
    <div className='shadow-sm w-full fixed top-0 left-0 ' >
        <div className='md:px-10 py-4 px-7 md:flex justify-between items-center bg-white '>
            {/*Logo*/}
            <div className='flex text-4x2 cursor-pointer items-center gap-2'>
            <IoBeer className='w-9 h-10 text-gray-700'/>
            <span className='font-bold text-gray-600'> ZonaBAR</span> 
            </div>

            {/*Responsivo Menu Icon*/}
            <div onClick={() => setisOpen(!isOpen)} className='w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden'>
                {
                   isOpen ? <IoArrowForward /> : <IoList /> 
                }

            </div>
            {/* Navbar*/}
            <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 translate-all duration-500 erase-in ${isOpen ? 'top-12 ': 'top-[-490px]'}`}>
                {
                    Links.map(link => (
                    <li className=' font-semibold my-7 md:my-0 md:ml-8 hover:underline underline-offset-8'>
                        <a href="/">{link.name}</a>
                    </li>))
                }
            <Link to="/">
                <button className='btn py-1 px-3 md:ml-8  text-sm font-semibold rounded-full border border-gray-400 hover:text-white hover:bg-gray-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 md:static'>Iniciar Sesion</button>
            </Link>
            </ul>
        </div>

        <section>
            
        </section>
    </div>
  )
}

export default Header;