import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BrandService from '../../../services/BrandService';
import { FaArrowLeft } from 'react-icons/fa';

const BrandShow = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const [brand, setBrand] = useState(null); // Trạng thái thương hiệu
  const [loading, setLoading] = useState(true); // Trạng thái tải

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await BrandService.show(id); // Gọi API để lấy thông tin thương hiệu
        if (response.status) {
          setBrand(response.brand); // Lưu thông tin thương hiệu vào trạng thái
        } else {
          toast.error(response.message || 'Không tìm thấy dữ liệu');
        }
      } catch (error) {
        console.error('Error fetching brand:', error);
        toast.error('Lỗi khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchBrand(); // Gọi hàm lấy thương hiệu khi component mount
  }, [id]);

  const handleGoBack = () => {
    navigate('/admin/brands'); // Điều hướng quay lại danh sách thương hiệu
  };

  if (loading) {
    return <p className="text-center mt-10">Đang tải...</p>; // Hiển thị thông báo tải
  }

  if (!brand) {
    return <p className="text-center mt-10 text-red-500">Không tìm thấy dữ liệu</p>; // Hiển thị nếu không tìm thấy dữ liệu
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-semibold mb-8 text-center text-blue-600">Chi tiết Thương hiệu</h2>
      <div className="grid grid-cols-2 gap-6 text-lg">
        <div className="flex flex-col">
          <span className="font-semibold text-gray-600">Tên thương hiệu:</span>
          <span className="text-gray-800">{brand.name}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-600">Slug:</span>
          <span className="text-gray-800">{brand.slug}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-600">Mô tả:</span>
          <span className="text-gray-800">{brand.description}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-600">ID:</span>
          <span className="text-gray-800">{brand.id}</span>
        </div>
        <div className="col-span-2 flex justify-center mt-4">
          <img
            src={brand.image}
            alt={brand.name}
            className="w-auto h-auto object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <button
          onClick={handleGoBack}
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <FaArrowLeft className="mr-2" /> Quay lại danh sách
        </button>
      </div>
    </div>
  );
};

export default BrandShow;
