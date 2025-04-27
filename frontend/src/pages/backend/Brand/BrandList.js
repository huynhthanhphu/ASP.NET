import React, { useState, useEffect } from 'react';
import { FaToggleOn, FaToggleOff, FaEye, FaEdit, FaTrashAlt, FaPlus,FaSync } from 'react-icons/fa';
import BrandService from '../../../services/BrandService';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BrandList = () => {
  const [brands, setBrands] = useState([]); // Khởi tạo danh sách thương hiệu
  const [loading, setLoading] = useState(true); // Trạng thái tải
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const result = await BrandService.index(); // Gọi API để lấy danh sách bài viết
      setBrands(result.brands);
    } catch (error) {
      toast.error('Không thể tải danh sách bài viết!');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBrands(); // Gọi hàm fetchPosts khi component mount
  }, []);

  // Hàm xóa thương hiệu
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa thương hiệu này?");
    if (confirmDelete) {
      try {
        const response = await BrandService.delete(id); // Gọi API xóa thương hiệu
        if (response.status) {
          // Cập nhật lại danh sách thương hiệu sau khi xóa
          setBrands(brands.filter(brand => brand.id !== id));
        } else {
          alert(response.message); // Hiển thị thông báo lỗi nếu có
        }
      } catch (error) {
        console.error("Có lỗi xảy ra khi xóa thương hiệu:", error);
      }
    }
  };
  // Hàm xử lý toggle trạng thái thương hiệu
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await BrandService.status(id); // Gọi API cập nhật trạng thái
      if (response.status) {
        setBrands(brands.map(brand => 
          brand.id === id ? { ...brand, status: currentStatus === 1 ? 2 : 1 } : brand // Cập nhật trạng thái trong danh sách
        ));
        toast.success('Cập nhật trạng thái thành công!');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi cập nhật trạng thái!');
    }
  };
  const handleEdit = (id) => {
    navigate(`/admin/brand/update/${id}`); // Điều hướng đến trang chỉnh sửa
  };
  const handleShow = (id) => {
    navigate(`/admin/brand/show/${id}`); // Điều hướng đến trang chỉnh sửa
  };
  return (
    <div className="container mx-auto mt-5 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-blue-400">Danh sách Thương hiệu</h1>
        <div className="flex space-x-2">
          <Link to="/admin/add-brand" className="bg-green-500 text-white px-3 py-1 rounded inline-flex items-center text-sm">
            <FaPlus className="mr-1" />
            Thêm
          </Link>
          <Link to="/admin/brands/trash" className="bg-red-500 text-white px-3 py-1 rounded inline-flex items-center text-sm">
            <FaTrashAlt className="mr-1" />
            Thùng rác
          </Link>
          <button 
            onClick={fetchBrands} 
            className="bg-blue-500 text-white px-3 py-1 rounded inline-flex items-center text-sm"
          >
            <FaSync className="mr-1" />
            Tải lại
          </button>
        </div>
      </div>
      {loading ? ( // Hiển thị thông báo tải nếu đang tải
        <div className="text-center py-4">
          <p>Đang tải thương hiệu, vui lòng chờ...</p>
        </div>
      ) : (
        <table className="min-w-full shadow-md rounded-lg bg-white border p-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border"></th>
              <th className="py-2 px-4 border">Hình</th>
              <th className="py-2 px-4 border">Tên thương hiệu</th>
              <th className="py-2 px-4 border">Slug</th>
              <th className="py-2 px-4 border">Mô tả</th>
              <th className="py-2 px-4 border">Chức năng</th>
              <th className="py-2 px-4 border">ID</th>
            </tr>
          </thead>
          <tbody>
            {brands.length > 0 ? (
              brands.map((brand) => (
                <tr key={brand.id}>
                  <td className="py-2 px-2 border text-center">
                    <input type="checkbox" />
                  </td>
                  <td className="py-3 px-4 border text-center">
                    <div className="flex justify-center items-center">
                      <img src={brand.image} alt={brand.name} className="w-20 h-20 object-cover" />
                    </div>
                  </td>
                  <td className="py-2 px-4 border text-center">{brand.name}</td>
                  <td className="py-2 px-4 border text-center">{brand.slug}</td>
                  <td className="py-2 px-4 border text-center">{brand.description}</td>
                  <td className="py-2 px-4 border text-center w-48">
                  <button
                    className={`py-1 px-2 mx-0.5 text-white rounded-md ${brand.status === 1 ? 'bg-green-500' : 'bg-gray-500'}`}
                    onClick={() => handleToggleStatus(brand.id, brand.status)} // Gọi hàm khi nhấn nút
                  >
                    {brand.status === 1 ? <FaToggleOn className="text-lg" /> : <FaToggleOff className="text-lg" />}
                  </button>
                  <button 
                      className="bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md"
                      onClick={() => handleShow(brand.id)} // Gọi hàm khi nhấn nút chỉnh sửa
                    >
                      <FaEye className="text-lg" />
                    </button>
                    <button 
                      className="bg-yellow-500 py-1 px-2 mx-0.5 text-white rounded-md"
                      onClick={() => handleEdit(brand.id)} // Gọi hàm khi nhấn nút chỉnh sửa
                    >
                      <FaEdit className="text-lg" />
                    </button>
                    <button 
                      className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md"
                      onClick={() => handleDelete(brand.id)}
                    >
                      <FaTrashAlt className="text-lg" />
                    </button>
                  </td>
                  <td className="py-2 px-4 border text-center">{brand.id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">Không có thương hiệu nào</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BrandList;
