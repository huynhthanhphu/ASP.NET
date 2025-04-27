import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaTrashRestore,FaArrowLeft } from 'react-icons/fa';
import BannerService from '../../../services/BannerService';
import { Link } from 'react-router-dom';

const BannerTrashList = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await BannerService.trash();
      setBanners(result.banners);
    })();
  }, []);

  const handleRestore = async (id) => {
    const confirmRestore = window.confirm("Bạn có chắc chắn muốn phục hồi banner này?");
    if (confirmRestore) {
      const response = await BannerService.restore(id);
      if (response.status) {
        setBanners(banners.filter(banner => banner.id !== id));
      } else {
        alert(response.message);
      }
    }
  };

  const handleDeleteForever = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn banner này?");
    if (confirmDelete) {
      const response = await BannerService.destroy(id);
      if (response.status) {
        setBanners(banners.filter(banner => banner.id !== id));
      } else {
        alert(response.message);
      }
    }
  };

  // const handleRestoreAll = async () => {
  //   const confirmRestoreAll = window.confirm("Bạn có chắc chắn muốn phục hồi tất cả banner?");
  //   if (confirmRestoreAll) {
  //     const response = await BannerService.restore(); // Gọi API phục hồi tất cả banner
  //     if (response.status) {
  //       setBanners([]); // Xóa tất cả banner trong state
  //     } else {
  //       alert(response.message);
  //     }
  //   }
  // };

  // const handleDeleteAllForever = async () => {
  //   const confirmDeleteAll = window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn tất cả banner?");
  //   if (confirmDeleteAll) {
  //     const response = await BannerService.destroy(); // Gọi API xóa vĩnh viễn tất cả banner
  //     if (response.status) {
  //       setBanners([]); // Xóa tất cả banner trong state
  //     } else {
  //       alert(response.message);
  //     }
  //   }
  // };

  return (
    <div className="container mx-auto mt-5 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-red-500 flex items-center">
          <FaTrashAlt className="mr-2" /> Thùng rác Banner
        </h1>
        <div className="flex space-x-2">
          {/* <button 
            className="bg-green-500 text-white px-3 py-1 rounded flex items-center"
            onClick={handleRestoreAll}
          >
            <FaUndo className="mr-1" /> Khôi phục tất cả
          </button>
          <button 
            className="bg-red-500 text-white px-3 py-1 rounded flex items-center"
            onClick={handleDeleteAllForever}
          >
            <FaTrashAlt className="mr-1" /> Đổ rác tất cả
          </button> */}
          <Link to="/admin/banner" className="bg-blue-500 text-white px-3 py-1 rounded inline-flex items-center">
            <FaArrowLeft className="mr-1" /> Quay lại danh sách
          </Link>
        </div>
      </div>

      <table className="min-w-full shadow-md rounded-lg bg-white border p-6">
        <thead>
          <tr className="bg-gray-100">
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
              <tr key={banner.id} className="hover:bg-gray-100 transition-colors">
                <td className="py-3 px-4 border text-center">
                  <div className="flex justify-center items-center">
                    <img src={banner.image} alt={banner.name} className="w-20 h-20 object-cover rounded" />
                  </div>
                </td>
                <td className="py-2 px-4 border text-center">{banner.name}</td>
                <td className="py-2 px-4 border text-center">{banner.link}</td>
                <td className="py-2 px-4 border text-center">{banner.position}</td>
                <td className="py-2 px-4 border text-center">{banner.description}</td>
                <td className="py-2 px-4 border text-center">
                  <button className="bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md" onClick={() => handleRestore(banner.id)}>
                    <FaTrashRestore className="text-lg" />
                  </button>
                  <button className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md" onClick={() => handleDeleteForever(banner.id)}>
                    <FaTrashAlt className="text-lg" />
                  </button>
                </td>
                <td className="py-2 px-4 border text-center">{banner.id}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="py-4 text-center text-gray-600">
                Không có banner nào trong thùng rác.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BannerTrashList;
