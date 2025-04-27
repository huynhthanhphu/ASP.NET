import React, { useEffect, useState } from 'react';
import ProductService from '../../../services/ProductService';
import ProductItem from '../../../components/ProductItem';
import { Link } from 'react-router-dom';
import { Grid, List } from 'lucide-react';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await ProductService.productAll();
      if (Array.isArray(response)) {
        setProducts(response); // ❗ Sửa ở đây, không cần .products
      } else {
        setProducts([]);
      }
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Pagination
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1 className="text-center text-4xl font-sofia italic font-bold mb-8 mt-8 py-2" style={{ fontFamily: 'Dancing Script' }}>
        Danh sách sản phẩm
      </h1>

      <div className="container mx-auto px-4 mt-8 mb-8 max-w-6xl">
        {/* Nút chuyển chế độ hiển thị */}
        <div className="flex justify-end items-center mb-6 space-x-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              title="Hiển thị dạng lưới"
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              title="Hiển thị dạng danh sách"
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        {loading ? (
          <div className="text-center py-4">Đang tải sản phẩm...</div>
        ) : currentProducts.length === 0 ? (
          <div className="text-center py-4">Không tìm thấy sản phẩm nào.</div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <div key={product.id} className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <ProductItem product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {currentProducts.map((product) => (
              <div key={product.id} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex">
                <div className="w-1/4">
                  <Link to={`/product_detail/${product.slug}`} className="text-black no-underline">
                    <img
                      src={product.images[0]?.thumbnail || '/images/product/default.jpg'}
                      alt={product.name}
                      className="w-24 h-24 object-contain transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                  </Link>
                </div>
                <div className="w-3/4 ml-[-90px] flex flex-col justify-between">
                  <div>
                    <Link to={`/product_detail/${product.slug}`} className="text-black no-underline hover:text-black">
                      {product.name}
                    </Link>
                    <p className="text-gray-500">{product.description}</p>
                  </div>
                  <div className="mt-2 justify-between">
                    <span className="text-red-600 font-bold">
                      {product.price_sale ? product.price_sale.toLocaleString() : product.price.toLocaleString()}<sup>đ</sup>
                    </span>
                    {product.price_sale && (
                      <del className="ml-2 text-gray-500 text-sm">
                        {product.price.toLocaleString()}<sup>đ</sup>
                      </del>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Phân trang */}
        <div className="flex justify-center mt-6">
          <nav className="flex items-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-l-md transition-colors duration-300 border border-blue-500 ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-500 hover:bg-blue-100'}`}
            >
              &laquo;
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 mx-1 rounded-md transition-colors duration-300 border border-blue-500 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-blue-100'}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-r-md transition-colors duration-300 border border-blue-500 ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-500 hover:bg-blue-100'}`}
            >
              &raquo;
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
