import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    };

    return (
        <form onSubmit={handleSearch} className="flex h-12 w-[25vw] pl-8 bg-gray-200 justify-between rounded-4xl">
            <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-lg font-light focus:outline-none" 
                placeholder="Search..." />
            <button type="submit" className="flex justify-center items-center w-16 h-12 rounded-4xl hover:cursor-pointer hover:bg-teal-100">
                <Search />
            </button>
        </form>
    )
}
