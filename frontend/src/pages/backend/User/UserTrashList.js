import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaTrashRestore, FaArrowLeft } from 'react-icons/fa';
import UserService from '../../../services/UserService';
import { Link } from 'react-router-dom';

const UserTrashList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await UserService.trash();
      setUsers(result.users);
    })();
  }, []);

  const handleRestore = async (id) => {
    const confirmRestore = window.confirm("Bạn có chắc chắn muốn phục hồi người dùng này?");
    if (confirmRestore) {
      const response = await UserService.restore(id);
      if (response.status) {
        setUsers(users.filter(user => user.id !== id));
      } else {
        alert(response.message);
      }
    }
  };

  const handleDeleteForever = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn người dùng này?");
    if (confirmDelete) {
      const response = await UserService.destroy(id);
      if (response.status) {
        setUsers(users.filter(user => user.id !== id));
      } else {
        alert(response.message);
      }
    }
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-red-500 flex items-center">
          <FaTrashAlt className="mr-2" /> Thùng rác Người dùng
        </h1>
        <div className="flex space-x-2">
          <Link to="/admin/users" className="bg-blue-500 text-white px-3 py-1 rounded inline-flex items-center">
            <FaArrowLeft className="mr-1" /> Quay lại danh sách
          </Link>
        </div>
      </div>

      <table className="min-w-full shadow-md rounded-lg bg-white border p-6">
        <thead>
          <tr className="bg-gray-100">
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
              <tr key={user.id} className="hover:bg-gray-100 transition-colors">
                  <td className="py-3 px-4 border text-center">
                    <div className="flex justify-center items-center">
                      <img src={user.image} alt={user.name} className="w-20 h-20 object-cover" />
                    </div>
                  </td>
                  <td className="py-2 px-4 border text-center">{user.fullname}</td>
                  <td className="py-2 px-4 border text-center">{user.email}</td>
                  <td className="py-2 px-4 border text-center">{user.phone}</td>
                  <td className="py-2 px-4 border text-center">{user.roles}</td>
                <td className="py-2 px-4 border text-center">
                  <button className="bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md" onClick={() => handleRestore(user.id)}>
                    <FaTrashRestore className="text-lg" />
                  </button>
                  <button className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md" onClick={() => handleDeleteForever(user.id)}>
                    <FaTrashAlt className="text-lg" />
                  </button>
                </td>
                <td className="py-2 px-4 border text-center">{user.id}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="py-4 text-center text-gray-600">
                Không có người dùng nào trong thùng rác.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTrashList;
