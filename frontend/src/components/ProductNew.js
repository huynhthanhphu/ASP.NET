import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import ProductService from '../services/ProductService'; // Đường dẫn đến service
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'; // Thêm icon
import ProductGridNew from './ProductGridNew';

const ProductNew = () => {
  const [newProducts, setNewProducts] = useState([]); // Khởi tạo newProducts là một mảng rỗng
  const [loading, setLoading] = useState(true); // Thêm state để theo dõi quá trình loading
  const [currentIndex, setCurrentIndex] = useState(0); // State cho chỉ số sản phẩm hiện tại

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const products = await ProductService.newProducts(8); // Giờ trả về trực tiếp danh sách
        console.log(products);
        setNewProducts(Array.isArray(products) ? products : []);
      } catch (error) {
        console.error("Failed to fetch new products", error);
        setNewProducts([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNewProducts();
  }, []);

  const productsPerPage = 4; // Số lượng sản phẩm mỗi trang
  const totalPages = Math.ceil(newProducts.length / productsPerPage); // Tính tổng số trang

  const nextProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const prevProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  // Lấy các sản phẩm hiển thị dựa trên chỉ số trang hiện tại
  const displayedProducts = newProducts.slice(
    currentIndex * productsPerPage,
    currentIndex * productsPerPage + productsPerPage
  );

  // Bổ sung sản phẩm để đảm bảo luôn có đủ 4 sản phẩm trên mỗi trang
  if (displayedProducts.length < productsPerPage) {
    const missingItems = productsPerPage - displayedProducts.length;
    displayedProducts.push(...newProducts.slice(0, missingItems));
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-center font-sofia italic font-normal text-3xl mb-4 py-2 rounded-lg"style={{ fontFamily: 'Dancing Script' }}>
        🏷️ Sản phẩm mới nhất
      </h2>
      <div className="relative flex items-center">
        <button
          onClick={prevProduct}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200 z-10">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mx-10">
          {loading ? (
            <div className="col-span-full text-center py-10">
              <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-10 h-10 animate-spin mx-auto" />
              <p className="mt-2 text-gray-500">Đang tải sản phẩm...</p>
            </div>
          ) : displayedProducts.length > 0 ? (
            displayedProducts.map((product, index) => (
              <div key={product?.id ||index} className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <ProductItem product={product} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">Không có sản phẩm nào được tìm thấy.</p>
            </div>
          )}
        </div>

        <button
          onClick={nextProduct}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200 z-10">
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
      <ProductGridNew />
    </div>
  );
};

export default ProductNew;
