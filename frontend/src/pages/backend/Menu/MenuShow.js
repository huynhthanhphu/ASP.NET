import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import MenuService from '../../../services/MenuService';
import { FaArrowLeft } from 'react-icons/fa';

const MenuShow = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await MenuService.show(id);
        if (response.status) {
          setMenuData(response.menu);
        } else {
          toast.error(response.message || 'Không tìm thấy dữ liệu');
        }
      } catch (error) {
        console.error('Error fetching menu:', error);
        toast.error('Lỗi khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, [id]);

  const handleGoBack = () => {
    navigate('/admin/menus');
  };

  if (loading) {
    return <p className="text-center mt-10">Đang tải...</p>;
  }

  if (!menuData) {
    return <p className="text-center mt-10 text-red-500">Không tìm thấy dữ liệu</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-12">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">Chi tiết Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Tên menu:</span>
          <span className="text-gray-800">{menuData.name}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Link:</span>
          <span className="text-gray-800">{menuData.link}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Trạng thái:</span>
          <span className={`font-semibold ${menuData.status === 1 ? 'text-green-500' : 'text-gray-500'}`}>
            {menuData.status === 1 ? 'Xuất bản' : 'Chưa xuất bản'}
          </span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Thứ tự sắp xếp:</span>
          <span className="text-gray-800">{menuData.sort_order}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Loại:</span>
          <span className="text-gray-800">{menuData.type === 'page' ? 'Trang' : 'Khác'}</span>
        </div>
      </div> 

      {menuData.image && (
        <div className="col-span-2 flex justify-center mt-6">
          <img
            src={menuData.image}
            alt={menuData.name}
            className="w-auto h-auto object-cover rounded-lg shadow-md"
          />
        </div>
      )}

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

export default MenuShow;
