import React, { useState, useEffect } from 'react';
import { FaToggleOn, FaToggleOff, FaEye, FaEdit, FaTrashAlt, FaPlus, FaSync } from 'react-icons/fa';
import PostService from '../../../services/PostService'; // Đảm bảo bạn có dịch vụ tương ứng
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Hàm gọi API để tải danh sách bài viết
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const result = await PostService.index(); // Gọi API để lấy danh sách bài viết
      setPosts(result.posts);
    } catch (error) {
      toast.error('Không thể tải danh sách bài viết!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(); // Gọi hàm fetchPosts khi component mount
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa bài viết này?");
    if (confirmDelete) {
      try {
        const response = await PostService.delete(id); // Gọi API xóa bài viết
        if (response.status) {
          setPosts(posts.filter(post => post.id !== id));
          toast.success('Xóa bài viết thành công!');
        } else {
          toast.error(response.message); // Hiển thị thông báo lỗi nếu có
        }
      } catch (error) {
        toast.error('Có lỗi xảy ra khi xóa bài viết!');
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await PostService.status(id); // Gọi API cập nhật trạng thái
      if (response.status) {
        setPosts(posts.map(post => 
          post.id === id ? { ...post, status: currentStatus === 1 ? 2 : 1 } : post // Cập nhật trạng thái trong danh sách
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
    navigate(`/admin/posts/update/${id}`); // Điều hướng đến trang chỉnh sửa
  };
  const handleShow = (id) => {
    navigate(`/admin/posts/show/${id}`); // Điều hướng đến trang chỉnh sửa
  };
  return (
    <div className="container mx-auto mt-5 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-blue-400">Danh sách Bài viết</h1>
        <div className="flex space-x-2">
          <Link to="/admin/add-posts" className="bg-green-500 text-white px-3 py-1 rounded inline-flex items-center text-sm">
            <FaPlus className="mr-1" />
            Thêm
          </Link>
          <Link to="/admin/posts/trash" className="bg-red-500 text-white px-3 py-1 rounded inline-flex items-center text-sm">
            <FaTrashAlt className="mr-1" />
            Thùng rác
          </Link>
          <button 
            onClick={fetchPosts} 
            className="bg-blue-500 text-white px-3 py-1 rounded inline-flex items-center text-sm"
          >
            <FaSync className="mr-1" />
            Tải lại
          </button>
        </div>
      </div>
      {loading ? (
        <p>Đang tải bài viết, vui lòng chờ...</p> // Hiển thị thông báo tải khi đang fetch dữ liệu
      ) : (
        <table className="min-w-full shadow-md rounded-lg bg-white border p-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border"></th>
              <th className="py-2 px-4 border">Hình</th>
              <th className="py-2 px-4 border">Tiêu đề</th>
              <th className="py-2 px-4 border">Chủ đề</th>
              <th className="py-2 px-4 border">Nội dung</th>
              <th className="py-2 px-4 border">Chức năng</th>
              <th className="py-2 px-4 border">ID</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post.id}>
                  <td className="py-2 px-2 border text-center">
                    <input type="checkbox" />
                  </td>
                  <td className="py-3 px-4 border text-center">
                    <div className="flex justify-center items-center">
                      <img src={post.thumbnail} alt={post.title} className="w-20 h-20 object-cover" />
                    </div>
                  </td>
                  <td className="py-2 px-4 border text-center">{post.title}</td>
                  <td className="py-2 px-4 border text-center">{post.topicname}</td>
                  <td className="py-2 px-4 border text-center">{post.content}</td>
                  <td className="py-2 px-4 border text-center w-48">
                    <button
                      className={`py-1 px-2 mx-0.5 text-white rounded-md ${post.status === 1 ? 'bg-green-500' : 'bg-gray-500'}`}
                      onClick={() => handleToggleStatus(post.id, post.status)} // Gọi hàm khi nhấn nút
                    >
                      {post.status === 1 ? <FaToggleOn className="text-lg" /> : <FaToggleOff className="text-lg" />}
                    </button>
                    <button 
                      className="bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md"
                      onClick={() => handleShow(post.id)} // Gọi hàm khi nhấn nút chỉnh sửa
                    >
                      <FaEye className="text-lg" />
                    </button>
                    <button 
                      className="bg-yellow-500 py-1 px-2 mx-0.5 text-white rounded-md"
                      onClick={() => handleEdit(post.id)} // Gọi hàm khi nhấn nút chỉnh sửa
                    >
                      <FaEdit className="text-lg" />
                    </button>
                    <button 
                      className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md"
                      onClick={() => handleDelete(post.id)}
                    >
                      <FaTrashAlt className="text-lg" />
                    </button>
                  </td>
                  <td className="py-2 px-4 border text-center">{post.id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">Không có bài viết nào</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PostList;
