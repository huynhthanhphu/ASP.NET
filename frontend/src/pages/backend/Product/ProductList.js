import React, { useState, useEffect } from 'react';
import ProductService from '../../../services/ProductService'; // Đảm bảo đường dẫn đúng
import { FaToggleOn, FaToggleOff, FaEye, FaEdit, FaTrashAlt, FaPlus, FaSync } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Sử dụng toastify để hiển thị thông báo

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Biến trạng thái loading
  const [error, setError] = useState(null); // Biến trạng thái lỗi
  const navigate = useNavigate();

  // Hàm lấy danh sách sản phẩm
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await ProductService.index();
      console.log('API result:', result); // Kiểm tra dữ liệu API
      
      // Kiểm tra nếu result có sản phẩm
      if (Array.isArray(result) && result.length > 0) {
        const sortedProducts = result.sort((a, b) => a.id - b.id);
        setProducts(sortedProducts);
      } else {
        setError('Không có sản phẩm để hiển thị!');
        toast.error('Không có sản phẩm để hiển thị!');
      }
    } catch (error) {
      console.error('Error fetching products:', error); // Log lỗi API
      setError('Không thể tải sản phẩm!');
      toast.error('Không thể tải danh sách sản phẩm!');
    } finally {
      setLoading(false);
    }
  };
  
  

  useEffect(() => {
    fetchProducts(); // Gọi hàm fetchProducts khi component mount
  }, []);

  // Hàm xử lý toggle trạng thái sản phẩm
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await ProductService.status(id); // Gọi API cập nhật trạng thái
      if (response.status) {
        setProducts(products.map(product =>
          product.id === id ? { ...product, status: currentStatus === 1 ? 2 : 1 } : product
        ));
        toast.success('Cập nhật trạng thái thành công!');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi cập nhật trạng thái!');
    }
  };

  // Hàm xử lý khi bấm vào thùng rác (soft delete sản phẩm)
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm('Bạn có chắc chắn muốn đưa sản phẩm vào thùng rác không?');
      if (confirmDelete) {
        const response = await ProductService.delete(id); // Gọi API để xóa sản phẩm
        if (response && response.success) {
          // Cập nhật lại danh sách sản phẩm
          const updatedProducts = products.filter((product) => product.id !== id);
          const sortedProducts = updatedProducts.sort((a, b) => a.id - b.id); // Sắp xếp lại sau khi xóa
          setProducts(sortedProducts);
          toast.success('Sản phẩm đã được đưa vào thùng rác');
        } else {
          toast.error('Không thể đưa sản phẩm vào thùng rác');
        }
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi xóa sản phẩm');
    }
  };

  const handleTrashClick = () => {
    navigate('/admin/products/trash'); // Chuyển hướng đến trang thùng rác
  };

  const handleEdit = (id) => {
    navigate(`/admin/product/update/${id}`); // Điều hướng đến trang chỉnh sửa
  };

  const handleShow = (id) => {
    navigate(`/admin/product/show/${id}`); // Điều hướng đến trang chi tiết sản phẩm
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-blue-400">Danh sách Sản phẩm</h1>
        <div className="flex space-x-2">
          <Link to="/admin/add-product" className="bg-green-500 text-white px-3 py-1 rounded inline-flex items-center text-sm">
            <FaPlus className="mr-1" />
            Thêm
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

      {error && (
        <div className="text-red-500 text-center mb-4">{error}</div>
      )}

      {loading ? ( // Hiển thị thông báo tải khi đang fetch dữ liệu
        <div className="text-center py-4">
          <p>Đang tải sản phẩm, vui lòng chờ...</p>
        </div>
      ) : (
        <table className="min-w-full shadow-md rounded-lg bg-white border p-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border"></th>
              <th className="py-2 px-4 border">Hình</th>
              <th className="py-2 px-4 border">Tên sản phẩm</th>
              <th className="py-2 px-4 border">Danh mục</th>
              <th className="py-2 px-4 border">Thương hiệu</th>
              <th className="py-2 px-4 border">Giá</th>
              <th className="py-2 px-4 border">Chức năng</th>
              <th className="py-2 px-4 border">ID</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td className="py-2 px-2 border text-center">
                    <input type="checkbox" />
                  </td>
                  <td className="py-3 px-4 border text-center">
                    <div className="flex justify-center items-center">
                      {product.imageUrl && product.imageUrl.trim() !== '' ? (
                        <img src={product.imageUrl} alt={product.name} className="w-20 h-20 object-cover" />
                      ) : (
                        <span>Không có hình ảnh</span>
                      )}
                    </div>
                  </td>

                  <td className="py-2 px-4 border text-center">{product.name}</td>
                  <td className="py-2 px-4 border text-center">{product.category?.name || 'Chưa phân loại'}</td>
                  <td className="py-2 px-4 border text-center">{product.brand?.name || 'Không rõ thương hiệu'}</td>
                  <td className="py-2 px-4 border text-center">
                    {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                  </td>

                  <td className="py-2 px-4 border text-center w-48">
                    <button
                      className={`py-1 px-2 mx-0.5 text-white rounded-md ${product.status === 1 ? 'bg-green-500' : 'bg-gray-500'}`}
                      onClick={() => handleToggleStatus(product.id, product.status)} // Gọi hàm khi nhấn nút
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
                      onClick={() => handleDelete(product.id)} // Thêm sự kiện xóa
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
                <td colSpan="8" className="text-center py-4">Không có sản phẩm nào</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
