import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import ProductService from '../services/ProductService'; 
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'; 
import ImageModel from './ImageModel';

const ProductSale = () => {
  const [productSale, setProductSale] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProductSale = async () => {
      try {
        const response = await ProductService.productSale(8); // Gọi API để lấy 8 sản phẩm
        if (response && Array.isArray(response.products)) {
          setProductSale(response.products);
        } else {
          console.error('Invalid response format', response);
          setProductSale([]);
        }
      } catch (error) {
        console.error("Failed to fetch sale products", error);
        setProductSale([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductSale();
  }, []);

  const productsPerPage = 4;
  const totalPages = Math.ceil(productSale.length / productsPerPage);

  const nextProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const prevProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  const displayedProducts = productSale.slice(
    currentIndex * productsPerPage,
    currentIndex * productsPerPage + productsPerPage
  );
  
  // Nếu trang cuối cùng có ít hơn 4 sản phẩm, lấy các sản phẩm từ đầu danh sách bù vào
  if (displayedProducts.length < productsPerPage) {
    const missingItems = productsPerPage - displayedProducts.length;
    displayedProducts.push(...productSale.slice(0, missingItems));
  }

  return (
    <div className="container mx-auto px-4 mt-6">
      <div className="relative overflow-hidden bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 p-4 rounded-lg shadow-lg mb-4">
        <h2 className="icon-text text-center font-sofia italic font-bold text-2xl mb-1 py-2 whitespace-nowrap animate-marquee text-white">
          🌟 Ưu đãi đặc biệt hôm nay! Nhanh tay chốt deal 🚀 Hot Deal! Giá hời 🌟
        </h2>
      </div>
      <h2 className="text-center font-sofia italic font-normal text-3xl mb-4 py-2 rounded-lg"style={{ fontFamily: 'Dancing Script' }}>
        🏷️ Sản phẩm giảm giá
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
                            displayedProducts.map((product) => (
                              product.price_sale && product.price && product.price_sale < product.price ? (
                                <div key={product.id} className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                  <ProductItem product={product} />
                                </div>
                        ) : null
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
      <ImageModel />
    </div>
  );
};

export default ProductSale;