import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import ProductService from '../services/ProductService'; 
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'; 


const ProductBestseller = () => {
  const [productBestseller, setProductBestseller] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProductBestseller = async () => {
      try {
        const response = await ProductService.productBestseller(8); // Gọi API để lấy 8 sản phẩm
        if (response && Array.isArray(response.products)) {
          setProductBestseller(response.products);
        } else {
          console.error('Invalid response format', response);
          setProductBestseller([]);
        }
      } catch (error) {
        console.error("Failed to fetch bestseller products", error);
        setProductBestseller([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductBestseller();
  }, []);

  const productsPerPage = 4; // Số sản phẩm hiển thị mỗi trang
  const totalPages = Math.ceil(productBestseller.length / productsPerPage); // Tổng số trang sản phẩm

  const nextProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const prevProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  const displayedProducts = productBestseller.slice(
    currentIndex * productsPerPage,
    currentIndex * productsPerPage + productsPerPage
  );

  // Nếu trang cuối cùng có ít hơn 4 sản phẩm, lấy các sản phẩm từ đầu danh sách bù vào
  if (displayedProducts.length < productsPerPage) {
    const missingItems = productsPerPage - displayedProducts.length;
    displayedProducts.push(...productBestseller.slice(0, missingItems));
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-center font-sofia italic font-normal text-3xl mb-4 py-2 rounded-lg "style={{ fontFamily: 'Dancing Script' }}>
        🏷️ Sản phẩm được mua nhiều nhất
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
              <div key={product?.id || index} className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                {product ? <ProductItem product={product} /> : <div className="h-40 bg-gray-200 animate-pulse" />} {/* Hiển thị placeholder nếu không có sản phẩm */}
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
    </div>
  );
};

export default ProductBestseller;
