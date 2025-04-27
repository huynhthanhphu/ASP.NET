import React, { useState, useEffect } from 'react';
import { FaTrashRestore, FaTrashAlt } from 'react-icons/fa';
import BrandService from '../../../services/BrandService';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const BrandTrashList = () => {
  const [trashedBrands, setTrashedBrands] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await BrandService.getTrashed(); // Gọi API để lấy danh sách thương hiệu đã xóa mềm
        setTrashedBrands(result.brands); // Giả sử response trả về có thuộc tính brands
      } catch (error) {
        console.error("Lỗi khi tải danh sách thương hiệu trong thùng rác:", error);
        toast.error("Không thể tải danh sách thương hiệu đã bị xóa.");
      }
    })();
  }, []);

  // Hàm khôi phục thương hiệu
  const handleRestore = async (id) => {
    const confirmRestore = window.confirm("Bạn có chắc chắn muốn phục hồi thương hiệu này?");
    if (confirmRestore) {
      try {
        const response = await BrandService.restore(id); // Gọi API phục hồi brand
        if (response.status) {
          setTrashedBrands(trashedBrands.filter(brand => brand.id !== id)); // Cập nhật lại danh sách brand
          toast.success("Khôi phục thương hiệu thành công.");
        } else {
          toast.error(response.message || "Khôi phục thất bại.");
        }
      } catch (error) {
        console.error("Lỗi khi khôi phục thương hiệu:", error);
        toast.error("Có lỗi xảy ra khi khôi phục thương hiệu.");
      }
    }
  };

  // Hàm xóa vĩnh viễn thương hiệu
  const handlePermanentDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn thương hiệu này?");
    if (confirmDelete) {
      try {
        const response = await BrandService.destroy(id); // Gọi API xóa vĩnh viễn thương hiệu
        if (response.status) {
          setTrashedBrands(trashedBrands.filter(brand => brand.id !== id)); // Cập nhật lại danh sách thương hiệu
          toast.success("Thương hiệu đã được xóa vĩnh viễn.");
        } else {
          toast.error(response.message || "Xóa thất bại.");
        }
      } catch (error) {
        console.error("Lỗi khi xóa vĩnh viễn thương hiệu:", error);
        toast.error("Có lỗi xảy ra khi xóa thương hiệu.");
      }
    }
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-red-500 flex items-center">
          <FaTrashAlt className="mr-2" /> Thùng rác Thương hiệu
        </h1>
        <Link to="/admin/brands" className="bg-blue-500 text-white px-3 py-1 rounded inline-flex items-center text-sm">
          Quay lại danh sách
        </Link>
      </div>
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
          {trashedBrands.length === 0 ? (
            <tr>
              <td colSpan="7" className="py-3 text-center text-gray-600">Không có thương hiệu nào trong thùng rác.</td>
            </tr>
          ) : (
            trashedBrands.map((brand) => ( // Bỏ dấu { } quanh trashedBrands.map
              <tr key={brand.id} className="hover:bg-gray-100 transition-colors">
                <td className="py-2 px-2 border text-center">
                  <input type="checkbox" />
                </td>
                <td className="py-3 px-4 border text-center">
                  <div className="flex justify-center items-center">
                    <img src={brand.image} alt={brand.name} className="w-20 h-20 object-cover rounded" />
                  </div>
                </td>
                <td className="py-2 px-4 border text-center">{brand.name}</td>
                <td className="py-2 px-4 border text-center">{brand.slug}</td>
                <td className="py-2 px-4 border text-center">{brand.description}</td>
                <td className="py-2 px-4 border text-center">
                  <button className="bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md" onClick={() => handleRestore(brand.id)}>
                    <FaTrashRestore className="text-lg" /> {/* Nút khôi phục */}
                  </button>
                  <button className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md" onClick={() => handlePermanentDelete(brand.id)}>
                    <FaTrashAlt className="text-lg" /> {/* Nút xóa vĩnh viễn */}
                  </button>
                </td>
                <td className="py-2 px-4 border text-center">{brand.id}</td>
              </tr>
            ))
          )}
          </tbody>
        </table>
    </div>
  );
};

export default BrandTrashList;
