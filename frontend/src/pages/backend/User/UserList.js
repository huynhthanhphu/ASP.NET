import React, { useState, useEffect } from 'react';
import { FaToggleOn, FaToggleOff, FaEye, FaEdit, FaTrashAlt, FaPlus, FaSync } from 'react-icons/fa';
import UserService from '../../../services/UserService'; // Đảm bảo bạn đã tạo dịch vụ UserService
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserList = () => {
  const [users, setUsers] = useState([]); // Khởi tạo danh sách người dùng
  const [loading, setLoading] = useState(true); // Trạng thái tải
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const result = await UserService.index(); // Gọi API để lấy danh sách người dùng
      setUsers(result.users);
    } catch (error) {
      toast.error('Không thể tải danh sách người dùng!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Gọi hàm fetchUsers khi component mount
  }, []);

  // Hàm xóa người dùng
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa người dùng này?");
    if (confirmDelete) {
      try {
        const response = await UserService.delete(id); // Gọi API xóa người dùng
        if (response.status) {
          // Cập nhật lại danh sách người dùng sau khi xóa
          setUsers(users.filter(user => user.id !== id));
        } else {
          alert(response.message); // Hiển thị thông báo lỗi nếu có
        }
      } catch (error) {
        console.error("Có lỗi xảy ra khi xóa người dùng:", error);
      }
    }
  };

  // Hàm xử lý toggle trạng thái người dùng
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await UserService.status(id); // Gọi API cập nhật trạng thái
      if (response.status) {
        setUsers(users.map(user => 
          user.id === id ? { ...user, status: currentStatus === 1 ? 2 : 1 } : user // Cập nhật trạng thái trong danh sách
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
    navigate(`/admin/user/update/${id}`); // Điều hướng đến trang chỉnh sửa
  };

  const handleShow = (id) => {
    navigate(`/admin/user/show/${id}`); // Điều hướng đến trang hiển thị
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-blue-400">Danh sách Người dùng</h1>
        <div className="flex space-x-2">
          <Link to="/admin/add-user" className="bg-green-500 text-white px-3 py-1 rounded inline-flex items-center text-sm">
            <FaPlus className="mr-1" />
            Thêm
          </Link>
          <Link to="/admin/users/trash" className="bg-red-500 text-white px-3 py-1 rounded inline-flex items-center text-sm">
            <FaTrashAlt className="mr-1" />
            Thùng rác
          </Link>
          <button 
            onClick={fetchUsers} 
            className="bg-blue-500 text-white px-3 py-1 rounded inline-flex items-center text-sm"
          >
            <FaSync className="mr-1" />
            Tải lại
          </button>
        </div>
      </div>
      {loading ? ( // Hiển thị thông báo tải nếu đang tải
        <div className="text-center py-4">
          <p>Đang tải người dùng, vui lòng chờ...</p>
        </div>
      ) : (
        <table className="min-w-full shadow-md rounded-lg bg-white border p-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border"></th>
              <th className="py-2 px-4 border">Hình</th>
              <th className="py-2 px-4 border">Tên</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Điện thoại</th>
              <th className="py-2 px-4 border">Chức vụ</th>
              <th className="py-2 px-4 border">Chức năng</th>
              <th className="py-2 px-4 border">ID</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-2 border text-center">
                    <input type="checkbox" />
                  </td>
                  <td className="py-3 px-4 border text-center">
                    <div className="flex justify-center items-center">
                      <img src={user.image} alt={user.name} className="w-20 h-20 object-cover" />
                    </div>
                  </td>
                  <td className="py-2 px-4 border text-center">{user.fullname}</td>
                  <td className="py-2 px-4 border text-center">{user.email}</td>
                  <td className="py-2 px-4 border text-center">{user.phone}</td>
                  <td className="py-2 px-4 border text-center">{user.roles}</td>
                  <td className="py-2 px-4 border text-center w-48">
                    <button
                      className={`py-1 px-2 mx-0.5 text-white rounded-md ${user.status === 1 ? 'bg-green-500' : 'bg-gray-500'}`}
                      onClick={() => handleToggleStatus(user.id, user.status)} // Gọi hàm khi nhấn nút
                    >
                      {user.status === 1 ? <FaToggleOn className="text-lg" /> : <FaToggleOff className="text-lg" />}
                    </button>
                    <button 
                      className="bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md"
                      onClick={() => handleShow(user.id)} // Gọi hàm khi nhấn nút hiển thị
                    >
                      <FaEye className="text-lg" />
                    </button>
                    <button 
                      className="bg-yellow-500 py-1 px-2 mx-0.5 text-white rounded-md"
                      onClick={() => handleEdit(user.id)} // Gọi hàm khi nhấn nút chỉnh sửa
                    >
                      <FaEdit className="text-lg" />
                    </button>
                    <button 
                      className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md"
                      onClick={() => handleDelete(user.id)}
                    >
                      <FaTrashAlt className="text-lg" />
                    </button>
                  </td>
                  <td className="py-2 px-4 border text-center">{user.id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">Không có người dùng nào</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
