import React, { useState, useEffect } from 'react';
import ProductStoreService from '../../../services/ProductStoreService'; // Đảm bảo đường dẫn đúng
import { FaTrashAlt, FaTrashRestore,FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ProductStoreTrashList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchProducts = async () => {
    setLoading(true);
    try {
      const result = await ProductStoreService.trash();
      if (Array.isArray(result.product_store)) {
        setProducts(result.product_store);
      } else {
        toast.error('Dữ liệu không hợp lệ!');
      }
    } catch (error) {
      toast.error('Không thể tải danh sách sản phẩm!');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts(); // Gọi hàm fetchProducts khi component mount
  }, []);

  const handleRestore = async (id) => {
    const confirmRestore = window.confirm("Bạn có chắc chắn muốn phục hồi sản phẩm này?");
    if (confirmRestore) {
      const response = await ProductStoreService.restore(id);
      if (response.status) {
        setProducts(products.filter(product => product.id !== id));
      } else {
        alert(response.message);
      }
    }
  };

  const handleDeleteForever = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn product này?");
    if (confirmDelete) {
      const response = await ProductStoreService.destroy(id);
      if (response.status) {
        setProducts(products.filter(product => product.id !== id));
      } else {
        alert(response.message);
      }
    }
  };
  return (
    <div className="container mx-auto mt-5 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-red-500 flex items-center">
          <FaTrashAlt className="mr-2" /> Thùng rác kho
        </h1>
        <div className="flex space-x-2">
          <Link to="/admin/product-store" className="bg-blue-500 text-white px-3 py-1 rounded inline-flex items-center">
            <FaArrowLeft className="mr-1" /> Quay lại danh sách
          </Link>
        </div>
      </div>
      {loading ? (
        <div className="text-center py-4">
          <p>Đang tải sản phẩm, vui lòng chờ...</p>
        </div>
      ) : (
        <table className="min-w-full shadow-md rounded-lg bg-white border p-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Hình</th>
              <th className="py-2 px-4 border">Tên sản phẩm</th>
              <th className="py-2 px-4 border">Giá gốc</th>
              <th className="py-2 px-4 border">Số lượng</th>
              <th className="py-2 px-4 border">Chức năng</th>
              <th className="py-2 px-4 border">ID</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.product_id}>
                  <td className="py-3 px-4 border text-center">
                    <div className="flex justify-center items-center">
                      {Array.isArray(product.product.images) && product.product.images.length > 0 ? (
                        <img src={product.product.images[0].thumbnail} alt={product.product.name} className="w-20 h-20 object-cover" />
                      ) : (
                        <span>Không có hình ảnh</span>
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-4 border text-center">{product.product.name}</td>
                  <td className="py-2 px-4 border text-center">{product.price_root}</td>
                  <td className="py-2 px-4 border text-center">{product.qty}</td>
                  <td className="py-2 px-4 border text-center">
                  <button className="bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md" onClick={() => handleRestore(product.id)}>
                    <FaTrashRestore className="text-lg" />
                  </button>
                  <button className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md" onClick={() => handleDeleteForever(product.id)}>
                    <FaTrashAlt className="text-lg" />
                  </button>
                  </td>
                  <td className="py-2 px-4 border text-center">{product.id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">Không có sản phẩm nào</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

  export default ProductStoreTrashList;