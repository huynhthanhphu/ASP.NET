import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserService from '../../../services/UserService';
import { FaArrowLeft } from 'react-icons/fa';

const UserShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await UserService.show(id);
        if (response.status) {
          setUser(response.user);
        } else {
          toast.error('Không thể tải thông tin người dùng');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Lỗi khi tải thông tin người dùng');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleGoBack = () => {
    navigate('/admin/users');
  };

  if (loading) {
    return <p className="text-center mt-10">Đang tải...</p>;
  }

  if (!user) {
    return <p className="text-center mt-10 text-red-500">Không tìm thấy người dùng.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-12">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">Chi tiết Người Dùng</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Tên:</span>
          <span className="text-gray-800">{user.name}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Email:</span>
          <span className="text-gray-800">{user.email}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Họ và tên:</span>
          <span className="text-gray-800">{user.fullname}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Giới tính:</span>
          <span className="text-gray-800">
            {user.gender === 'male' ? 'Nam' : user.gender === 'female' ? 'Nữ' : 'Khác'}
          </span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Số điện thoại:</span>
          <span className="text-gray-800">{user.phone}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Địa chỉ:</span>
          <span className="text-gray-800">{user.address}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Vai trò:</span>
          <span className="text-gray-800">{user.roles}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Trạng thái:</span>
          <span className={`font-semibold ${user.status === 1 ? 'text-green-500' : 'text-gray-500'}`}>
            {user.status === 1 ? 'Xuất bản' : 'Chưa xuất bản'}
          </span>
        </div>
        {user.image && (
          <div className="col-span-2 flex justify-center mt-6">
            <img
              src={user.image}
              alt={user.name}
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

export default UserShow;
