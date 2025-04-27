import React, { useState, useEffect } from 'react';
import { FaToggleOn, FaToggleOff, FaEye, FaEdit, FaTrashAlt, FaPlus,FaSync } from 'react-icons/fa';
import CategoryService from '../../../services/CategoryService';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate(); 

  const fetchCategorys = async () => {
    setLoading(true);
    try {
      const result = await CategoryService.index(); // Gọi API để lấy danh sách bài viết
      setCategories(result.categorys);
    } catch (error) {
      toast.error('Không thể tải danh sách bài viết!');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategorys(); // Gọi hàm fetchPosts khi component mount
  }, []);

  // Hàm xóa danh mục
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa danh mục này?");
    if (confirmDelete) {
      try {
        const response = await CategoryService.delete(id); // Gọi API xóa danh mục
        if (response.status) {
          // Cập nhật lại danh sách danh mục sau khi xóa
          setCategories(categories.filter(category => category.id !== id));
        } else {
          alert(response.message); // Hiển thị thông báo lỗi nếu có
        }
      } catch (error) {
        console.error("Có lỗi xảy ra khi xóa danh mục:", error);
      }
    }
  };
  // Thêm hàm handleToggleStatus
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await CategoryService.status(id); // Gọi API cập nhật trạng thái
      if (response.status) {
        setCategories(categories.map(category => 
          category.id === id ? { ...category, status: currentStatus === 1 ? 2 : 1 } : category // Cập nhật trạng thái trong danh sách
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
    navigate(`/admin/categories/update/${id}`); // Điều hướng đến trang chỉnh sửa
  };
  const handleShow = (id) => {
    navigate(`/admin/categories/show/${id}`); // Điều hướng đến trang chỉnh sửa
  };
  return (
    <div className="container mx-auto mt-5 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-blue-400">Danh sách Danh mục</h1>
        <div className="flex space-x-2">
          <Link to="/admin/add-category" className="bg-green-500 text-white px-3 py-1 rounded inline-flex items-center text-sm">
            <FaPlus className="mr-1" />
            Thêm
          </Link>
          <Link to="/admin/categories/trash" className="bg-red-500 text-white px-3 py-1 rounded inline-flex items-center text-sm">
            <FaTrashAlt className="mr-1" />
            Thùng rác
          </Link>
          <button 
            onClick={fetchCategorys} 
            className="bg-blue-500 text-white px-3 py-1 rounded inline-flex items-center text-sm"
          >
            <FaSync className="mr-1" />
            Tải lại
          </button>
        </div>
      </div>
      {loading ? ( // Hiển thị thông báo tải
        <div className="text-center py-4">
          <span>Đang tải danh mục, vui lòng chờ...</span>
        </div>
      ) : (
        <table className="min-w-full shadow-md rounded-lg bg-white border p-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border text-center"></th>
              <th className="py-2 px-4 border text-center">Hình</th>
              <th className="py-2 px-4 border text-center">Tên danh mục</th>
              <th className="py-2 px-4 border text-center">Slug</th>
              <th className="py-2 px-4 border text-center">Parent ID</th>
              <th className="py-2 px-4 border text-center">Chức năng</th>
              <th className="py-2 px-4 border text-center">ID</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category.id}>
                  <td className="py-2 px-2 border text-center">
                    <input type="checkbox" />
                  </td>
                  <td className="py-3 px-4 border text-center">
                    <div className="flex justify-center items-center">
                      <img src={category.image} alt={category.name} className="w-20 h-20 object-cover" />
                    </div>
                  </td>
                  <td className="py-2 px-4 border text-center">{category.name}</td>
                  <td className="py-2 px-4 border text-center">{category.slug}</td>
                  <td className="py-2 px-4 border text-center">{category.parent_id}</td>
                  <td className="py-2 px-4 border text-center w-48">
                  <button
                    className={`py-1 px-2 mx-0.5 text-white rounded-md ${category.status === 1 ? 'bg-green-500' : 'bg-gray-500'}`}
                    onClick={() => handleToggleStatus(category.id, category.status)} // Gọi hàm khi nhấn nút
                  >
                    {category.status === 1 ? <FaToggleOn className="text-lg" /> : <FaToggleOff className="text-lg" />}
                  </button>
                    <button 
                      className="bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md"
                      onClick={() => handleShow(category.id)} // Gọi hàm khi nhấn nút chỉnh sửa
                    >
                      <FaEye className="text-lg" />
                    </button>
                    <button 
                      className="bg-yellow-500 py-1 px-2 mx-0.5 text-white rounded-md"
                      onClick={() => handleEdit(category.id)} // Gọi hàm khi nhấn nút chỉnh sửa
                    >
                      <FaEdit className="text-lg" />
                    </button>
                    <button 
                      className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md"
                      onClick={() => handleDelete(category.id)}
                    >
                      <FaTrashAlt className="text-lg" />
                    </button>
                  </td>
                  <td className="py-2 px-4 border text-center">{category.id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">Không có danh mục nào</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CategoryList;
