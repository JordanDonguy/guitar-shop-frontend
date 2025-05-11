import { useState, useEffect } from "react";
import logo from "../assets/img/logo.png";
import { ShoppingCart, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from "./utils/api";
import { useAuth } from "./utils/AuthContext";

export default function Navbar() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate(); 

    // Handle logout
    const handleLogout = () => {
        fetch(`${BASE_URL}/auth/logout`, { method: 'POST', credentials: 'include' })
            .then(res => {
                if (res.ok) {
                    setUser(null); // Clear user info
                    navigate('/'); // Redirect to homepage after logout
                } else {
                    console.error('Logout failed');
                }
            })
            .catch(err => {
                console.error('Logout error:', err);
            });
    };


    return (
        <nav className="fixed z-10 flex w-full h-[80px] items-center justify-between px-[10%] bg-[rgba(240,253,250,0.75)] shadow-md backdrop-blur-sm">
            <div className="flex w-[110px] justify-between items-center">
                <img src={logo} className="w-[50px] h-[50px]" alt="shop logo"/>
                <h1 className="text-lg w-[50px]">Guitar Shop</h1>
            </div>

            <ul className="flex w-1/3 justify-between text-xl font-light px-[1vw]">
                <li><Link to="/" className="hover:text-teal-600">About</Link></li>
                <li><Link to="/products" className="hover:text-teal-600">Products</Link></li>
                <li><Link to="#" className="hover:text-teal-600">Services</Link></li>
                <li><Link to="#" className="hover:text-teal-600">Contact</Link></li>
            </ul>

            <form className="flex h-12 w-[25vw] pl-8 bg-gray-200 justify-between rounded-4xl">
                <label htmlFor="search"></label>
                <input id="search" name="search" type="text" className="w-full text-lg font-light focus:outline-none" placeholder="Search..." />
                <button type="submit" className="flex justify-center items-center w-16 h-12 rounded-4xl hover:cursor-pointer hover:bg-teal-100">
                    <Search />
                </button>
            </form>

            <Link to="#" className="filter">
                <ShoppingCart className="w-[40px] h-[40px] hover:text-teal-600 transition duration:100" />
            </Link>

            {/* Conditionally render Login, My Profile, and Logout links */}
            {user ? (
                <div className="flex items-center space-x-4">
                    <Link to="/user" className="w-25 h-10 flex justify-center items-center text-xl font-light border border-solid-black rounded-4xl hover:bg-teal-200">
                        My Profile
                    </Link>
                    <button onClick={handleLogout} className="w-25 h-10 flex justify-center items-center text-xl font-light border border-solid-black rounded-4xl hover:bg-teal-200">
                        Logout
                    </button>
                </div>
            ) : (
                <Link to="/auth/login" className="w-25 h-10 flex justify-center items-center text-xl font-light border border-solid-black rounded-4xl hover:bg-teal-200">
                    Login
                </Link>
            )}
        </nav>
    );
}
