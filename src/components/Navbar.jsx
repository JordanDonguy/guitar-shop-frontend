import logo from "../assets/img/logo.png";
import { ShoppingCart, Search } from 'lucide-react';

export default function Navbar() {
    return (
        <nav class="fixed z-10 flex w-full h-[80px] items-center justify-between px-[10%] bg-[rgba(240,253,250,0.75)] shadow-md backdrop-blur-sm">
            <div class="flex w-[110px] justify-between items-center">
                <img src={logo} class="w-[50px] h-[50px]" alt="shop logo"/>
                <h1 class="text-lg w-[50px]">Guitar Shop</h1>
            </div>

            <ul class="flex w-1/3 justify-between text-xl font-light px-[1vw]">
                <li><a href="#" class="hover:text-teal-600">About</a></li>
                <li><a href="#" class="hover:text-teal-600">Products</a></li>
                <li><a href="#" class="hover:text-teal-600">Services</a></li>
                <li><a href="#" class="hover:text-teal-600">Contact</a></li>
            </ul>

            <form class="flex h-12 w-[25vw] pl-8 bg-gray-200 justify-between rounded-4xl">
                <label for="search"></label>
                <input id="search" name="search" type="text" class="w-full text-lg font-light focus:outline-none" placeholder="Search..." />
                <button type="submit" class="flex justify-center items-center w-16 h-12 rounded-4xl hover:cursor-pointer hover:bg-teal-100">
                    <Search />
                </button>
            </form>

            <a href="#" class="filter">
                <ShoppingCart class="w-[40px] h-[40px] hover:text-teal-600 transition duration:100" />
            </a>

            <a href="#" class="w-25 h-10 flex justify-center items-center text-xl font-light border border-solid-black rounded-4xl hover:bg-teal-200">Login</a>
        </nav>
    )
}
