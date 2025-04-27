import React, { useEffect, useState } from "react";
import { PhoneIcon, ShoppingBagIcon } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../../components/Menu";

const Header = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Hàm lấy số lượng sản phẩm trong giỏ hàng
  const getCartItemCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Hàm lấy thông tin người dùng từ localStorage
  const getUser = () => {
    try {
      const customerName = localStorage.getItem("customer_name");
      const customerId = localStorage.getItem("customer_id");
      return customerName && customerId ? { fullname: customerName, id: customerId } : null;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
      return null;
    }
  };
  
  useEffect(() => {
    setCartItemCount(getCartItemCount());
    const storedUser = getUser();
    if (storedUser) {
      setUser(storedUser);
    }  
  }, 
  []);

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("customer_token");
    localStorage.removeItem("customer_id");
    localStorage.removeItem("customer_name");
    setUser(null);
    navigate("/");
  };
  

  const handleUserClick = () => {
    if (!user) {
      navigate("/dang-nhap");
    } else {
      navigate(`/customer/${user.id}`);
    }
  };

  return (
    <>
      <header className="bg-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center -mx-4">
            {/* Logo */}
            <div className="w-full sm:w-1/6 px-4 mb-4 sm:mb-0">
              <Link to="/">
                <img
                  src="/images/logo.png"
                  alt="logo"
                  className="logo-fluid"
                  width="90"
                  height="60"
                />
              </Link>
            </div>

            {/* Tìm kiếm */}
            <div className="w-full sm:w-1/3 px-4 mb-4 mt-3 sm:mb-0">
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-3 pr-10 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Tìm kiếm..."
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                </span>
              </div>
            </div>

            {/* Liên hệ và giỏ hàng */}
            <div className="w-full sm:w-1/2 px-4">
              <div className="flex flex-wrap justify-between items-center text-sm">
                <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                  <Link to="tel:1900 0969" className="flex items-center text-gray-600 hover:text-gray-800">
                    <PhoneIcon className="h-4 w-4 mr-1" />
                    1900 0969
                  </Link>
                  <span className="text-gray-300">|</span>

                  {/* Hiển thị tên người dùng nếu đã đăng nhập, nếu chưa thì hiển thị ĐĂNG NHẬP và ĐĂNG KÝ */}
                {user ? (
                  <>
                  <button
                    onClick={handleUserClick}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    {user.fullname.toUpperCase()}
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    ĐĂNG XUẤT
                  </button>
                  </>
                ) : (
                  <>
                    <Link to="/dang-nhap" className="text-gray-600 hover:text-gray-800">
                      ĐĂNG NHẬP
                    </Link>
                    <span className="text-gray-300">|</span>
                    <Link to="/dang-ky" className="text-gray-600 hover:text-gray-800">
                      ĐĂNG KÝ
                    </Link>
                  </>
                )}
                </div>

                {/* Giỏ hàng */}
                <div className="border px-3 py-1">
                  <Link to="/gio-hang" className="relative inline-block">
                    <ShoppingBagIcon className="h-7 w-7 text-gray-800" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  </Link>
                </div>
              </div>
              <p className="text-red-500 text-xs">
                ĐỔI SIZE ĐỔI MẪU THOẢI MÁI TRONG 3 NGÀY
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Gọi component Menu */}
      <Menu />
    </>
  );
};

export default Header;
