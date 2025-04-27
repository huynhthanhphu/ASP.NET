import React, { useState, useEffect } from 'react';
import { FaTrashRestore, FaTrashAlt } from 'react-icons/fa';
import MenuService from '../../../services/MenuService'; // Dịch vụ gọi API
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const MenuTrashList = () => {
  const [trashedMenus, setTrashedMenus] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await MenuService.trash(); // Gọi API để lấy danh sách menu đã xóa mềm
        setTrashedMenus(result.menu); // Giả sử response trả về có thuộc tính menus
      } catch (error) {
        console.error("Lỗi khi tải danh sách menu trong thùng rác:", error);
        toast.error("Không thể tải danh sách menu đã bị xóa.");
      }
    })();
  }, []);

  // Hàm khôi phục menu
  const handleRestore = async (id) => {
    const confirmRestore = window.confirm("Bạn có chắc chắn muốn phục hồi menu này?");
    if (confirmRestore) {
      try {
        const response = await MenuService.restore(id); // Gọi API phục hồi menu
        if (response.status) {
          setTrashedMenus(trashedMenus.filter(menu => menu.id !== id)); // Cập nhật lại danh sách menu
          toast.success("Khôi phục menu thành công.");
        } else {
          toast.error(response.message || "Khôi phục thất bại.");
        }
      } catch (error) {
        console.error("Lỗi khi khôi phục menu:", error);
        toast.error("Có lỗi xảy ra khi khôi phục menu.");
      }
    }
  };

  // Hàm xóa vĩnh viễn menu
  const handlePermanentDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn menu này?");
    if (confirmDelete) {
      try {
        const response = await MenuService.destroy(id); // Gọi API xóa vĩnh viễn menu
        if (response.status) {
          setTrashedMenus(trashedMenus.filter(menu => menu.id !== id)); // Cập nhật lại danh sách menu
          toast.success("Menu đã được xóa vĩnh viễn.");
        } else {
          toast.error(response.message || "Xóa thất bại.");
        }
      } catch (error) {
        console.error("Lỗi khi xóa vĩnh viễn menu:", error);
        toast.error("Có lỗi xảy ra khi xóa menu.");
      }
    }
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-red-500 flex items-center">
          <FaTrashAlt className="mr-2" /> Thùng rác Menu
        </h1>
        <Link to="/admin/menus" className="bg-blue-500 text-white px-3 py-1 rounded inline-flex items-center text-sm">
          Quay lại danh sách
        </Link>
      </div>
      <table className="min-w-full shadow-md rounded-lg bg-white border p-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border"></th>
            <th className="py-2 px-4 border">Tên Menu</th>
            <th className="py-2 px-4 border">Chức năng</th>
            <th className="py-2 px-4 border">ID</th>
          </tr>
        </thead>
        <tbody>
          {trashedMenus.length === 0 ? (
            <tr>
              <td colSpan="4" className="py-3 text-center text-gray-600">Không có menu nào trong thùng rác.</td>
            </tr>
          ) : (
            trashedMenus.map((menu) => (
              <tr key={menu.id} className="hover:bg-gray-100 transition-colors">
                <td className="py-2 px-2 border text-center">
                  <input type="checkbox" />
                </td>
                <td className="py-2 px-4 border text-center">{menu.name}</td>
                <td className="py-2 px-4 border text-center">
                  <button className="bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md" onClick={() => handleRestore(menu.id)}>
                    <FaTrashRestore className="text-lg" /> {/* Nút khôi phục */}
                  </button>
                  <button className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md" onClick={() => handlePermanentDelete(menu.id)}>
                    <FaTrashAlt className="text-lg" /> {/* Nút xóa vĩnh viễn */}
                  </button>
                </td>
                <td className="py-2 px-4 border text-center">{menu.id}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MenuTrashList;
