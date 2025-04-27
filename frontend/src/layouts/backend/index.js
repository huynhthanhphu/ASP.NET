import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const BackendLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isManualOpen, setIsManualOpen] = useState(false);
  const [menuState, setMenuState] = useState({
    product: false,
    post: false,
    interface: false,
    member: false,
  });

  const handleSidebarToggle = () => {
    setIsSidebarOpen(prev => {
      setIsManualOpen(!prev);
      return !prev;
    });
  };

  const toggleMenu = (menu) => {
    setMenuState(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleMouseEnter = () => {
    if (!isManualOpen) setIsSidebarOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isManualOpen) setIsSidebarOpen(false);
  };

  const menuItems = [
    { 
      key: 'product',
      name: 'Sản phẩm', 
      icon: 'https://img.icons8.com/?size=80&id=31165&format=png', 
      subItems: [
        { name: 'Tất cả sản phẩm', path: '/admin/products', icon: 'https://img.icons8.com/?size=128&id=37601&format=png' },
        { name: 'Danh mục', path: '/admin/categories', icon: 'https://img.icons8.com/?size=128&id=37601&format=png' },
        { name: 'Thương hiệu', path: '/admin/brands', icon: 'https://img.icons8.com/?size=128&id=37601&format=png' }
      ] 
    },
    { 
      key: 'product-store',
      name: 'Kho sản phẩm', 
      icon: 'https://img.icons8.com/?size=96&id=77118&format=png', 
      path: '/admin/product-store'
    },
    { 
      key: 'product-sale',
      name: 'Giảm giá sản phẩm', 
      icon: 'https://cdn-icons-png.flaticon.com/128/15740/15740431.png', 
      path: '/admin/product-sale'
    },
    { 
      key: 'post',
      name: 'Bài viết', 
      icon: 'https://img.icons8.com/?size=80&id=38102&format=png', 
      subItems: [
        { name: 'Tất cả bài viết', path: '/admin/posts', icon: 'https://img.icons8.com/?size=128&id=37601&format=png' },
        { name: 'Chủ đề', path: '/admin/topics', icon: 'https://img.icons8.com/?size=128&id=37601&format=png' }
      ] 
    },
    { 
      key: 'order',
      name: 'Đơn hàng', 
      icon: 'https://img.icons8.com/?size=128&id=119194&format=png', 
      path: '/admin/order'
    },
    { 
      key: 'contact',
      name: 'Liên hệ', 
      icon: 'https://img.icons8.com/?size=80&id=37991&format=png',
      path: '/admin/contact' 
    },
    { 
      key: 'customer',
      name: 'Khách hàng', 
      icon: 'https://img.icons8.com/?size=192&id=Ku3cLD42vk_a&format=png',
      path: '/admin/customer'
    },
    { 
      key: 'interface',
      name: 'Giao diện', 
      icon: 'https://img.icons8.com/?size=80&id=30081&format=png', 
      subItems: [
        { name: 'Menu', path: '/admin/menus', icon: 'https://img.icons8.com/?size=128&id=37601&format=png' },
        { name: 'Banner', path: '/admin/banner', icon: 'https://img.icons8.com/?size=128&id=37601&format=png' }
      ] 
    },
    { 
      key: 'member',
      name: 'Thành viên', 
      icon: 'https://img.icons8.com/?size=96&id=sHhyuPYJ5otp&format=png', 
      subItems: [
        { name: 'Tất cả thành viên', path: '/admin/users', icon: 'https://img.icons8.com/?size=128&id=37601&format=png' },
        { name: 'Thêm thành viên', path: '/admin/add-user', icon: 'https://img.icons8.com/?size=128&id=37601&format=png' }
      ] 
    }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`bg-gray-800 text-white py-7 px-3 absolute inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-[75px]'
        } md:relative md:translate-x-0 transition duration-200 ease-in-out`}
      >
         <div className="flex justify-center items-center">
            <img
              src="https://img.icons8.com/?size=96&id=fjRztOzWupnB&format=png"
              alt="Admin"
              className={`transition-all duration-200 ${
                isSidebarOpen ? 'w-11 h-11' : 'w-11 h-11 mx-auto'
              }`}
            />
            {isSidebarOpen && <span className="ml-2 text-2xl text-blue-300 font-bold">Admin</span>}
          </div>
          {isSidebarOpen && (
            <div className="text-center mt-6 py-3 text-blue-300 rounded-lg shadow-md border-t-2 border-b-2 border-gray-500">
              <span className="font-bold italic text-lg tracking-wide">Huỳnh Thanh Phú</span>
            </div>
          )}
        <nav>
          {menuItems.map(item => (
            <div key={item.key}>
              {item.subItems && item.subItems.length > 0 ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.key)}
                    className="flex justify-between items-center w-full py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
                  >
                    <div className="flex items-center">
                      <img src={item.icon} alt={item.name} className="w-5 h-5 mr-2" />
                      {isSidebarOpen && <span>{item.name}</span>}
                    </div>
                    {isSidebarOpen && item.subItems.length > 0 && (
                      <svg
                        className={`w-4 h-4 transition-transform ${menuState[item.key] ? 'rotate-90' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </button>
                  {menuState[item.key] && (
                    <div className={`${isSidebarOpen ? 'ml-4' : 'ml-0'} space-y-2`}>
                      {item.subItems.map((sub, index) => (
                        <Link key={index} to={sub.path} className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                          <img src={sub.icon} alt={sub.name} className="w-5 h-5 mr-2" />
                          {isSidebarOpen && <span>{sub.name}</span>}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
                >
                  <img src={item.icon} alt={item.name} className="w-5 h-5 mr-2" />
                  {isSidebarOpen && <span>{item.name}</span>}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen">
        <Header handleSidebarToggle={handleSidebarToggle} />
        <div className="flex-1 overflow-y-auto h-full max-h-screen">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default BackendLayout;
