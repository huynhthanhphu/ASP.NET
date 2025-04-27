import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, MenuIcon, XIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryService from '../services/CategoryService';

const Menu = () => {
    const [openSubmenu, setOpenSubmenu] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await CategoryService.index();
                console.log('Categories fetched:', res); // Kiểm tra dữ liệu trả về
                if (Array.isArray(res)) {
                    setCategories(res);
                }
            } catch (error) {
                console.error('Lỗi khi tải danh mục:', error);
            }
        };
    
        fetchCategories();
    }, []);
    

    const toggleSubmenu = () => setOpenSubmenu(prev => !prev);
    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
    const closeMenu = () => {
        setIsMobileMenuOpen(false);
        setOpenSubmenu(false);
    };

    return (
        <nav className="bg-white shadow-md py-2 relative">
            <div className="container mx-auto flex justify-center items-center">
                <div className="hidden md:flex space-x-8">
                    <Link to="/" className="text-gray-700 hover:text-black font-semibold">Trang chủ</Link>
                    <Link to="/gioi-thieu" className="text-gray-700 hover:text-black font-semibold">Giới thiệu</Link>

                    <div className="relative flex items-center space-x-1">
                        <Link to="/san-pham" className="text-gray-700 hover:text-black font-semibold">Sản phẩm</Link>
                        <button onClick={toggleSubmenu} className="text-gray-700 hover:text-black focus:outline-none">
                            <ChevronDownIcon className="h-4 w-4" />
                        </button>

                        {openSubmenu && (
                            <div className="absolute bg-white shadow-lg rounded-md mt-8 w-48 z-10">
                                {categories.map(category => (
                                    <Link
                                        key={category.id}
                                        to={`/danh-muc/${category.id}`}
                                        className="block px-4 py-2 text-gray-600 hover:bg-blue-100"
                                        onClick={closeMenu}
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link to="/bai-viet" className="text-gray-700 hover:text-black font-semibold">Bài viết</Link>
                    <Link to="/lien-he" className="text-gray-700 hover:text-black font-semibold">Liên hệ</Link>
                </div>

                <button
                    className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
                    onClick={toggleMobileMenu}
                >
                    {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                </button>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden bg-white shadow-lg rounded-md p-4 mt-2 absolute w-full z-10">
                    <ul className="space-y-2">
                        <li><Link to="/" className="block text-gray-700" onClick={closeMenu}>Trang chủ</Link></li>
                        <li><Link to="/gioi-thieu" className="block text-gray-700" onClick={closeMenu}>Giới thiệu</Link></li>
                        <li className="relative">
                            <div className="flex items-center justify-between">
                                <Link to="/san-pham" className="text-gray-700" onClick={closeMenu}>Sản phẩm</Link>
                                <button onClick={toggleSubmenu} className="text-gray-700 focus:outline-none">
                                    <ChevronDownIcon className="h-4 w-4 ml-2" />
                                </button>
                            </div>
                            {openSubmenu && (
                                <ul className="pl-4 mt-2 space-y-1">
                                    {categories.map(category => (
                                        <li key={category.id}>
                                            <Link
                                                to={`/danh-muc/${category.id}`}
                                                className="block text-gray-600"
                                                onClick={closeMenu}
                                            >
                                                {category.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                        <li><Link to="/bai-viet" className="block text-gray-700" onClick={closeMenu}>Bài viết</Link></li>
                        <li><Link to="/lien-he" className="block text-gray-700" onClick={closeMenu}>Liên hệ</Link></li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Menu;
