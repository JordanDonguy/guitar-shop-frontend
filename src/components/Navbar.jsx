import { useState, useEffect } from "react";
import logo from "../assets/img/logo.png";
import { ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from "./utils/api";
import { useAuth } from "./utils/AuthContext";
import { User } from 'lucide-react';
import { LogOut } from 'lucide-react';
import SearchBar from "./SearchBar";

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
        <nav className="fixed z-10 flex w-full h-[100px] items-center justify-between px-[10%] bg-[rgba(240,253,250,0.75)] shadow-md backdrop-blur-sm">
            <div className="flex w-[110px] justify-between items-center">
                <img src={logo} className="w-[50px] h-[50px]" alt="shop logo" />
                <h1 className="text-lg w-[50px]">Guitar Shop</h1>
            </div>

            <ul className="flex w-1/3 justify-between text-xl font-light px-[1vw]">
                <li><Link to="/" className="hover:text-teal-600">About</Link></li>
                <li><Link to="/products" className="hover:text-teal-600">Products</Link></li>
                <li><Link to="#" className="hover:text-teal-600">Services</Link></li>
                <li><Link to="#" className="hover:text-teal-600">Contact</Link></li>
            </ul>

            <SearchBar />

            <div className="flex justify-between w-50">
                <Link to="/cart" className="filter">
                    <ShoppingCart className="w-[40px] h-[40px] hover:text-teal-600 transition duration:100" />
                </Link>
                {/* Conditionally render Login, My Profile, and Logout links */}
                {user ? (
                    <Link to="/user" className="">
                        <User className="w-[40px] h-[40px] hover:text-teal-600 transition duration:100" />
                    </Link>
                ) : (
                    <Link to="/auth/login" className="w-25 h-10 flex justify-center items-center text-xl font-light border-1 border-black rounded-4xl hover:bg-teal-200">
                        Login
                    </Link>
                )}
                {user ? (
                    <button onClick={handleLogout} className="hover:cursor-pointer">
                        <LogOut className="w-[40px] h-[40px] hover:text-teal-600 transition duration:100" />
                    </button>
                ) : <div></div>}
            </div>
        </nav>
    );
}
