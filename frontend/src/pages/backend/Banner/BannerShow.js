import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BannerService from '../../../services/BannerService';
import { FaArrowLeft } from 'react-icons/fa';

const BannerShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await BannerService.show(id);
        if (response.status) {
          setBanner(response.banner);
        } else {
          toast.error(response.message || 'Không tìm thấy dữ liệu');
        }
      } catch (error) {
        console.error('Error fetching banner:', error);
        toast.error('Lỗi khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, [id]);

  const handleGoBack = () => {
    navigate('/admin/banner');
  };

  if (loading) {
    return <p className="text-center mt-10">Đang tải...</p>;
  }

  if (!banner) {
    return <p className="text-center mt-10 text-red-500">Không tìm thấy dữ liệu</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-12">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">Chi tiết Banner</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Tên banner:</span>
          <span className="text-gray-800">{banner.name}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Liên kết:</span>
          <a href={banner.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            {banner.link}
          </a>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Mô tả:</span>
          <span className="text-gray-800">{banner.description}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Vị trí:</span>
          <span className="text-gray-800">{banner.position}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Thứ tự sắp xếp:</span>
          <span className="text-gray-800">{banner.sort_order}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Trạng thái:</span>
          <span className={`font-semibold ${banner.status === 1 ? 'text-green-500' : 'text-gray-500'}`}>
            {banner.status === 1 ? 'Xuất bản' : 'Chưa xuất bản'}
          </span>
        </div>
        {banner.image && (
          <div className="col-span-2 flex justify-center mt-6">
            <img
              src={banner.image}
              alt={banner.name}
              className="w-auto h-auto object-cover rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
      <div className="flex justify-end mt-10">
        <button
          onClick={handleGoBack}
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <FaArrowLeft className="mr-2" /> Quay lại danh sách
        </button>
      </div>
    </div>
  );
};

export default BannerShow;
