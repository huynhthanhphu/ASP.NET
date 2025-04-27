import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../../../services/ProductService';
import ProductItem from '../../../components/ProductItem';

const ProductCategory = () => {
  const { id: categoryid } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      setLoading(true);
      try {
        const response = await ProductService.productCategory(categoryid, limit);
        if (Array.isArray(response)) {
          setProducts(response);
        } else {
          console.error('Invalid response format:', response);
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [categoryid]);

  const indexOfLastProduct = currentPage * limit;
  const indexOfFirstProduct = indexOfLastProduct - limit;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(products.length / limit);

  // Lấy tên danh mục từ sản phẩm đầu tiên (nếu có)
  const categoryName = currentProducts.length > 0 ? currentProducts[0].category?.name : '';

  return (
    <div className="container mx-auto px-4">
      <h1 className="icon-text text-center font-sofia italic font-bold text-4xl mb-1 py-2" style={{ fontFamily: 'Dancing Script' }}>
        {categoryName || 'Danh mục sản phẩm'}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-10">
            <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-10 h-10 animate-spin mx-auto" />
            <p className="mt-2 text-gray-500">Đang tải sản phẩm...</p>
          </div>
        ) : currentProducts.length > 0 ? (
          currentProducts.map(product => (
            <div key={product.id} className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <ProductItem product={product} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">Không có sản phẩm nào được tìm thấy.</p>
          </div>
        )}
      </div>

      {/* Phân trang */}
      <div className="flex justify-center mt-6">
        <nav className="flex items-center">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-l-md transition-colors duration-300 border border-blue-500 ${
              currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-500 hover:bg-blue-100'
            }`}
          >
            &laquo;
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 mx-1 rounded-md transition-colors duration-300 border border-blue-500 ${
                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-blue-100'
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-r-md transition-colors duration-300 border border-blue-500 ${
              currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-500 hover:bg-blue-100'
            }`}
          >
            &raquo;
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ProductCategory;
