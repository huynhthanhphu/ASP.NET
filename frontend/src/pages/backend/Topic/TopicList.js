import React, { useState, useEffect } from 'react';
import { FaToggleOn, FaToggleOff, FaEye, FaEdit, FaTrashAlt, FaPlus, FaSync } from 'react-icons/fa';
import TopicService from '../../../services/TopicService'; // Đảm bảo bạn có dịch vụ tương ứng
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Khởi tạo useNavigate
  // Hàm gọi API để tải danh sách chủ đề
  const fetchTopics = async () => {
    setLoading(true);
    try {
      const result = await TopicService.index(); // Gọi API để lấy danh sách chủ đề
      setTopics(result.topic);
    } catch (error) {
      toast.error('Không thể tải danh sách chủ đề!');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTopics(); // Gọi hàm fetchTopics khi component mount
  }, []);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa chủ đề này?");
    if (confirmDelete) {
      try {
        const response = await TopicService.delete(id); // Gọi API xóa chủ đề
        if (response.status) {
          setTopics(topics.filter(topic => topic.id !== id));
          toast.success('Xóa chủ đề thành công!');
        } else {
          toast.error(response.message); // Hiển thị thông báo lỗi nếu có
        }
      } catch (error) {
        toast.error('Có lỗi xảy ra khi xóa chủ đề!');
      }
    }
  };
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await TopicService.status(id); // Gọi API cập nhật trạng thái
      if (response.status) {
        setTopics(topics.map(topic => 
          topic.id === id ? { ...topic, status: currentStatus === 1 ? 2 : 1 } : topic // Cập nhật trạng thái trong danh sách
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
    navigate(`/admin/topics/update/${id}`); // Điều hướng đến trang chỉnh sửa
  };
  const handleShow = (id) => {
    navigate(`/admin/topics/show/${id}`); // Điều hướng đến trang chỉnh sửa
  };
  return (
    <div className="container mx-auto mt-5 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-blue-400">Danh sách Chủ đề</h1>
        <div className="flex space-x-2">
          <Link to="/admin/add-topics" className="bg-green-500 text-white px-3 py-1 rounded inline-flex items-center text-sm">
            <FaPlus className="mr-1" />
            Thêm
          </Link>
          <Link to="/admin/topics/trash" className="bg-red-500 text-white px-3 py-1 rounded inline-flex items-center text-sm">
            <FaTrashAlt className="mr-1" />
            Thùng rác
          </Link>
          <button 
            onClick={fetchTopics} 
            className="bg-blue-500 text-white px-3 py-1 rounded inline-flex items-center text-sm"
          >
            <FaSync className="mr-1" />
            Tải lại
          </button>
        </div>
      </div>
      {loading ? (
        <p>Đang tải chủ đề, vui lòng chờ...</p> // Hiển thị thông báo tải khi đang fetch dữ liệu
      ) : (
        <table className="min-w-full shadow-md rounded-lg bg-white border p-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border"></th>
              <th className="py-2 px-4 border">Tên chủ đề</th>
              <th className="py-2 px-4 border">Slug</th>
              <th className="py-2 px-4 border">Mô tả</th>
              <th className="py-2 px-4 border">Chức năng</th>
              <th className="py-2 px-4 border">ID</th>
            </tr>
          </thead>
          <tbody>
            {topics.length > 0 ? (
              topics.map((topic) => (
                <tr key={topic.id}>
                  <td className="py-2 px-2 border text-center">
                    <input type="checkbox" />
                  </td>
                  <td className="py-2 px-4 border text-center">{topic.name}</td>
                  <td className="py-2 px-4 border text-center">{topic.slug}</td>
                  <td className="py-2 px-4 border text-center">{topic.description}</td>
                  <td className="py-2 px-4 border text-center w-48">
                    <button
                      className={`py-1 px-2 mx-0.5 text-white rounded-md ${topic.status === 1 ? 'bg-green-500' : 'bg-gray-500'}`}
                      onClick={() => handleToggleStatus(topic.id, topic.status)} // Gọi hàm khi nhấn nút
                    >
                      {topic.status === 1 ? <FaToggleOn className="text-lg" /> : <FaToggleOff className="text-lg" />}
                    </button>
                    <button 
                      className="bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md"
                      onClick={() => handleShow(topic.id)} // Gọi hàm khi nhấn nút chỉnh sửa
                    >
                      <FaEye className="text-lg" />
                    </button>
                    <button 
                      className="bg-yellow-500 py-1 px-2 mx-0.5 text-white rounded-md"
                      onClick={() => handleEdit(topic.id)} // Gọi hàm khi nhấn nút chỉnh sửa
                    >
                      <FaEdit className="text-lg" />
                    </button>
                    <button 
                      className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md"
                      onClick={() => handleDelete(topic.id)}
                    >
                      <FaTrashAlt className="text-lg" />
                    </button>
                  </td>
                  <td className="py-2 px-4 border text-center">{topic.id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">Không có chủ đề nào</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TopicList;
