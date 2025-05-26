import React from 'react';
import { Link, Outlet } from 'react-router';

export default function Navbar() {
  return (
    <>
        <div className="fixed w-full z-50 bg-white shadow-md p-4">
        <ul className="flex flex-col md:flex-row gap-4 justify-around items-center text-gray-700 text-sm font-medium">
            <img src="../assets/CVMLogo.png" alt='CVM Logo'/>
            <li className="hover:text-blue-600 transition-colors">
                <Link 
                    to={"/HomePage"} 
                    className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors inline-block"
                >
                    HomePage
                </Link>
            </li>
            <li className="hover:text-blue-600 transition-colors">
                <Link 
                    to={"/UploadMaterial"} 
                    className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors inline-block"
                >
                    Upload Material
                </Link>
            </li>
            <li className="hover:text-blue-600 transition-colors">
                <Link 
                    to={"/Feedback"} 
                    className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors inline-block"
                >
                    Feedback
                </Link>
            </li>
            <li className="hover:text-red-600 transition-colors">
                <Link 
                    to={"/"} 
                    className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors inline-block"
                >
                    Logout
                </Link>
            </li>
        </ul>
        
    </div>
    <Outlet />
    </>
    
  )
}