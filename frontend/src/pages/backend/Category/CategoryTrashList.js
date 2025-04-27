import React, { useState, useEffect } from 'react';
import { FaTrashRestore, FaTrashAlt } from 'react-icons/fa';
import CategoryService from '../../../services/CategoryService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const CategoryTrashList = () => {
  const [trashedCategories, setTrashedCategories] = useState([]);

  const fetchTrashedCategories = async () => {
    try {
      const result = await CategoryService.trash();
      setTrashedCategories(result.categorys); // Cập nhật danh sách
    } catch (error) {
      console.error("Lỗi khi tải danh mục trong thùng rác:", error);
      toast.error("Không thể tải danh mục đã bị xóa.");
    }
  };

  useEffect(() => {
    fetchTrashedCategories(); // Gọi hàm để lấy danh sách ban đầu
  }, []);

  const handleRestore = async (id) => {
    const confirmRestore = window.confirm("Bạn có chắc chắn muốn khôi phục danh mục này?");
    if (confirmRestore) {
      try {
        const response = await CategoryService.restore(id);
        if (response.status) {
          setTrashedCategories(trashedCategories.filter(category => category.id !== id));
          toast.success("Khôi phục danh mục thành công.");
        } else {
          toast.error(response.message || "Khôi phục thất bại.");
        }
      } catch (error) {
        console.error("Lỗi khi khôi phục danh mục:", error);
        toast.error("Có lỗi xảy ra khi khôi phục danh mục.");
      }
    }
  };

  const handlePermanentDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn danh mục này?");
    if (confirmDelete) {
      try {
        const response = await CategoryService.destroy(id);
        if (response.status) {
          toast.success("Danh mục đã được xóa vĩnh viễn.");
          await fetchTrashedCategories(); // Cập nhật lại danh sách sau khi xóa
        } else {
          toast.error(response.message || "Xóa thất bại.");
        }
      } catch (error) {
        console.error("Lỗi khi xóa vĩnh viễn danh mục:", error);
        toast.error("Có lỗi xảy ra khi xóa danh mục.");
      }
    }
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-red-500 flex items-center">
          <FaTrashAlt className="mr-2" /> Thùng rác Danh mục
        </h1>
        <Link to="/admin/categories" className="bg-blue-500 text-white px-3 py-1 rounded inline-flex items-center text-sm">
          Quay lại danh sách
        </Link>
      </div>
      <table className="min-w-full shadow-md rounded-lg bg-white border p-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border"></th>
            <th className="py-2 px-4 border">Hình</th>
            <th className="py-2 px-4 border">Tên danh mục</th>
            <th className="py-2 px-4 border">Slug</th>
            <th className="py-2 px-4 border">Parent ID</th>
            <th className="py-2 px-4 border">Chức năng</th>
            <th className="py-2 px-4 border">ID</th>
          </tr>
        </thead>
        <tbody>
          {trashedCategories && trashedCategories.length === 0 ? (
            <tr>
              <td colSpan="6" className="py-3 text-center text-gray-600">Không có danh mục nào trong thùng rác.</td>
            </tr>
          ) : (
            trashedCategories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-100 transition-colors">
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
                <td className="py-2 px-4 border text-center">
                  <button className="bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md" onClick={() => handleRestore(category.id)}>
                    <FaTrashRestore className="text-lg" />
                  </button>
                  <button className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md" onClick={() => handlePermanentDelete(category.id)}>
                    <FaTrashAlt className="text-lg" />
                  </button>
                </td>
                <td className="py-2 px-4 border text-center">{category.id}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTrashList;
