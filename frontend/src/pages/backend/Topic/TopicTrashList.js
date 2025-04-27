import React, { useState, useEffect } from 'react';
import { FaTrashRestore, FaTrashAlt, } from 'react-icons/fa';
import TopicService from '../../../services/TopicService'; // Đảm bảo bạn có dịch vụ tương ứng
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const TopicTrashList = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hàm gọi API để tải danh sách chủ đề đã xóa
  const fetchTopics = async () => {
    setLoading(true);
    try {
      const result = await TopicService.trash(); // Gọi API để lấy danh sách chủ đề đã xóa
      setTopics(result.topic);
    } catch (error) {
      toast.error('Không thể tải danh sách chủ đề đã xóa!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics(); // Gọi hàm fetchTopics khi component mount
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn chủ đề này?");
    if (confirmDelete) {
      try {
        const response = await TopicService.destroy(id); // Gọi API xóa vĩnh viễn chủ đề
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

  const handleRestore = async (id) => {
    const confirmRestore = window.confirm("Bạn có chắc chắn muốn khôi phục chủ đề này?");
    if (confirmRestore) {
      try {
        const response = await TopicService.restore(id); // Gọi API khôi phục chủ đề
        if (response.status) {
          fetchTopics(); // Tải lại danh sách sau khi khôi phục thành công
          toast.success('Khôi phục chủ đề thành công!');
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error('Có lỗi xảy ra khi khôi phục chủ đề!');
      }
    }
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-red-400">Danh sách Thùng rác Chủ đề</h1>
        <div className="flex space-x-2">
        <Link to="/admin/topics" className="bg-blue-500 text-white px-3 py-1 rounded inline-flex items-center text-sm">
          Quay lại danh sách
        </Link>
        </div>
      </div>
      {loading ? (
        <p>Đang tải chủ đề, vui lòng chờ...</p>
      ) : (
        <table className="min-w-full shadow-md rounded-lg bg-white border p-6">
          <thead>
            <tr className="bg-gray-100">
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
                  <td className="py-2 px-4 border text-center">{topic.name}</td>
                  <td className="py-2 px-4 border text-center">{topic.slug}</td>
                  <td className="py-2 px-4 border text-center">{topic.description}</td>
                  <td className="py-2 px-4 border text-center w-48">
                    <button 
                      className="bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md"
                      onClick={() => handleRestore(topic.id)}
                    >
                      <FaTrashRestore className="text-lg" />
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
                <td colSpan="5" className="text-center py-4">Không có chủ đề nào trong thùng rác</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TopicTrashList;
