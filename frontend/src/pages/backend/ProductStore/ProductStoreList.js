import React, { useState, useEffect } from 'react';
import ProductStoreService from '../../../services/ProductStoreService'; // Đảm bảo đường dẫn đúng
import { FaEye, FaEdit, FaTrashAlt, FaPlus, FaSync, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Không import useNavigate
import { toast } from 'react-toastify';

const ProductStoreList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const result = await ProductStoreService.index(); // Gọi API để lấy danh sách sản phẩm
      // Kiểm tra nếu kết quả hợp lệ và là mảng
      if (Array.isArray(result.product_store)) {
        setProducts(result.product_store); // Cập nhật sản phẩm từ phản hồi
      } else {
        toast.error('Dữ liệu không hợp lệ!');
      }
    } catch (error) {
      toast.error('Không thể tải danh sách sản phẩm!');
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (id) => {
    navigate(`/admin/product-store/update/${id}`); // Điều hướng đến trang chỉnh sửa
  };
  const handleShow = (id) => {
    navigate(`/admin/product-store/show/${id}`); // Điều hướng đến trang chỉnh sửa
  };

  // Hàm xử lý toggle trạng thái sản phẩm
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await ProductStoreService.status(id); // Gọi API cập nhật trạng thái
      if (response.status) {
        setProducts(products.map(product =>
          product.product_id === id ? { ...product, status: currentStatus === 1 ? 2 : 1 } : product // Cập nhật trạng thái trong danh sách
        ));
        toast.success('Cập nhật trạng thái thành công!');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi cập nhật trạng thái!');
    }
  };

  useEffect(() => {
    fetchProducts(); // Gọi hàm fetchProducts khi component mount
  }, []);

  // Hàm xử lý khi bấm vào thùng rác (soft delete sản phẩm)
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
    if (confirmDelete) {
      const response = await ProductStoreService.delete(id);
      if (response.status) {
        setProducts(products.filter(product => product.id !== id));
        toast.success('Xóa product thành công!');
      } else {
        toast.error(response.message);
      }
    }
  };

  const handleTrashClick = () => {
    navigate('/admin/product-store/trash'); // Chuyển hướng đến trang thùng rác
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-blue-400">Kho sản phẩm</h1>
        <div className="flex space-x-2">
          <Link to="/admin/product-store/create" className="bg-green-500 text-white px-3 py-1 rounded inline-flex items-center text-sm">
            <FaPlus className="mr-1" />
            Nhập kho sản phẩm
          </Link>
          <button 
            onClick={handleTrashClick} 
            className="bg-red-500 text-white px-3 py-1 rounded inline-flex items-center text-sm"
          >
            <FaTrashAlt className="mr-1" />
            Thùng rác
          </button>
          <button 
            onClick={fetchProducts} 
            className="bg-blue-500 text-white px-3 py-1 rounded inline-flex items-center text-sm"
          >
            <FaSync className="mr-1" />
            Tải lại
          </button>
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
                    <button
                      className={`py-1 px-2 mx-0.5 text-white rounded-md ${product.status === 1 ? 'bg-green-500' : 'bg-gray-500'}`}
                      onClick={() => handleToggleStatus(product.product_id, product.status)} // Gọi hàm khi nhấn nút
                    >
                      {product.status === 1 ? <FaToggleOn className="text-lg" /> : <FaToggleOff className="text-lg" />}
                    </button>
                    <button 
                      className="bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md"
                      onClick={() => handleShow(product.id)} // Gọi hàm khi nhấn nút chỉnh sửa
                    >
                      <FaEye className="text-lg" />
                    </button>
                    <button 
                      className="bg-yellow-500 py-1 px-2 mx-0.5 text-white rounded-md"
                      onClick={() => handleEdit(product.id)} // Gọi hàm khi nhấn nút chỉnh sửa
                    >
                      <FaEdit className="text-lg" />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)} 
                      className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md"
                    >
                      <FaTrashAlt className="text-lg" />
                    </button>
                  </td>
                  <td className="py-2 px-4 border text-center">{product.id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">Không có sản phẩm nào</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductStoreList;
