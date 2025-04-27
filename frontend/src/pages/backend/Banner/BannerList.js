import React, { useState, useEffect } from 'react';
import { FaToggleOn, FaToggleOff, FaEye, FaEdit, FaTrashAlt, FaPlus, FaSync } from 'react-icons/fa';
import BannerService from '../../../services/BannerService';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from 'react-toastify';

const BannerList = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const result = await BannerService.index();
      setBanners(result.banners);
    } catch (error) {
      toast.error('Không thể tải danh sách banner!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa banner này?");
    if (confirmDelete) {
      const response = await BannerService.delete(id);
      if (response.status) {
        setBanners(banners.filter(banner => banner.id !== id));
        toast.success('Xóa banner thành công!');
      } else {
        toast.error(response.message);
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await BannerService.status(id);
      if (response.status) {
        setBanners(banners.map(banner => 
          banner.id === id ? { ...banner, status: currentStatus === 1 ? 2 : 1 } : banner
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
    navigate(`/admin/banner/update/${id}`); // Điều hướng đến trang chỉnh sửa
  };

 const handleShow = (id) => {
    navigate(`/admin/banner/show/${id}`); // Điều hướng đến trang chỉnh sửa
  };
  return (
    <div className="container mx-auto mt-5 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-blue-400">Danh sách Banner</h1>
        <div className="flex space-x-2">
          <Link to="/admin/add-banner" className="bg-green-500 text-white px-3 py-1 rounded inline-flex items-center text-sm">
            <FaPlus className="mr-1" />
            Thêm
          </Link>
          <Link to="/admin/banner/trash" className="bg-red-500 text-white px-3 py-1 rounded inline-flex items-center text-sm">
            <FaTrashAlt className="mr-1" />
            Thùng rác
          </Link>
          <button 
            onClick={fetchBanners} 
            className="bg-blue-500 text-white px-3 py-1 rounded inline-flex items-center text-sm"
          >
            <FaSync className="mr-1" />
            Tải lại
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <p>Đang tải banner, vui lòng chờ...</p>
        </div>
      ) : (
        <table className="min-w-full shadow-md rounded-lg bg-white border p-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border"></th>
              <th className="py-2 px-4 border">Hình</th>
              <th className="py-2 px-4 border">Tên banner</th>
              <th className="py-2 px-4 border">Link</th>
              <th className="py-2 px-4 border">Vị trí</th>
              <th className="py-2 px-4 border">Mô tả</th>
              <th className="py-2 px-4 border">Chức năng</th>
              <th className="py-2 px-4 border">ID</th>
            </tr>
          </thead>
          <tbody>
            {banners.length > 0 ? (
              banners.map((banner) => (
                <tr key={banner.id}>
                  <td className="py-2 px-2 border text-center">
                    <input type="checkbox" />
                  </td>
                  <td className="py-3 px-4 border text-center">
                    <div className="flex justify-center items-center">
                      <img src={banner.image} alt={banner.name} className="w-20 h-20 object-cover" />
                    </div>
                  </td>
                  <td className="py-2 px-4 border text-center">{banner.name}</td>
                  <td className="py-2 px-4 border text-center">{banner.link}</td>
                  <td className="py-2 px-4 border text-center">{banner.position}</td>
                  <td className="py-2 px-4 border text-center">{banner.description}</td>
                  <td className="py-2 px-4 border text-center w-48">
                    <button
                      className={`py-1 px-2 mx-0.5 text-white rounded-md ${banner.status === 1 ? 'bg-green-500' : 'bg-gray-500'}`}
                      onClick={() => handleToggleStatus(banner.id, banner.status)}
                    >
                      {banner.status === 1 ? <FaToggleOn className="text-lg" /> : <FaToggleOff className="text-lg" />}
                    </button>
                    <button 
                      className="bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md"
                      onClick={() => handleShow(banner.id)} // Gọi hàm khi nhấn nút chỉnh sửa
                    >
                      <FaEye className="text-lg" />
                    </button>
                    <button 
                      className="bg-yellow-500 py-1 px-2 mx-0.5 text-white rounded-md"
                      onClick={() => handleEdit(banner.id)} // Gọi hàm khi nhấn nút chỉnh sửa
                    >
                      <FaEdit className="text-lg" />
                    </button>
                    <button 
                      className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md"
                      onClick={() => handleDelete(banner.id)}>
                      <FaTrashAlt className="text-lg" />
                    </button>
                  </td>
                  <td className="py-2 px-4 border text-center">{banner.id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">Không có banner nào</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BannerList;
