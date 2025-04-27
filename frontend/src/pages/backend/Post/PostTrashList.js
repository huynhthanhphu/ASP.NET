import React, { useState, useEffect } from 'react';
import { FaTrashRestore, FaTrashAlt } from 'react-icons/fa';
import PostService from '../../../services/PostService'; // Đảm bảo đường dẫn đúng
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const PostTrashList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bài viết đã bị xóa khi component được mount
  useEffect(() => {
    const fetchTrashedPosts = async () => {
        setLoading(true);
        try {
            const response = await PostService.trash();
            setPosts(response.post); // Cập nhật danh sách bài viết đã xóa
        } catch (error) {
            console.error("Lỗi khi tải danh sách bài viết đã bị xóa:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchTrashedPosts();
}, []);

  // Hàm khôi phục bài viết
  const handleRestore = async (id) => {
    const confirmRestore = window.confirm("Bạn có chắc chắn muốn khôi phục bài viết này?");
    if (confirmRestore) {
      try {
        const response = await PostService.restore(id); // Gọi API khôi phục bài viết
        if (response.status) { // Kiểm tra phản hồi từ API
          setPosts(posts.filter(post => post.id !== id)); // Xóa bài viết khỏi danh sách hiện tại
          toast.success('Khôi phục bài viết thành công!');
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error('Có lỗi xảy ra khi khôi phục bài viết!');
      }
    }
  };

  // Hàm xóa vĩnh viễn bài viết
  const handlePermanentDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn bài viết này?");
    if (confirmDelete) {
      try {
        const response = await PostService.destroy(id); // Gọi API xóa vĩnh viễn bài viết
        if (response.status) { // Kiểm tra phản hồi từ API
          setPosts(posts.filter(post => post.id !== id)); // Xóa bài viết khỏi danh sách hiện tại
          toast.success('Xóa vĩnh viễn bài viết thành công!');
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error('Có lỗi xảy ra khi xóa vĩnh viễn bài viết!');
      }
    }
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-blue-400">Danh sách Bài viết trong Thùng rác</h1>
        <Link to="/admin/posts" className="bg-blue-500 text-white px-3 py-1 rounded inline-flex items-center text-sm">
          Trở về danh sách
        </Link>
      </div>
      {loading ? (
        <p>Đang tải bài viết, vui lòng chờ...</p>
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
                      <img src={post.thumbnail} alt={post.thumbnail} className="w-20 h-20 object-cover" />
                    </div>
                  </td>
                  <td className="py-2 px-4 border text-center">{post.title}</td>
                  <td className="py-2 px-4 border text-center">{post.topicname}</td>
                  <td className="py-2 px-4 border text-center">{post.content}</td>
                  <td className="py-2 px-4 border text-center w-48">
                    <button 
                      className="bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md"
                      onClick={() => handleRestore(post.id)}>
                      <FaTrashRestore className="text-lg" />
                    </button>
                    <button 
                      className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md"
                      onClick={() => handlePermanentDelete(post.id)}>
                      <FaTrashAlt className="text-lg" />
                    </button>
                  </td>
                  <td className="py-2 px-1 border text-center">{post.id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-2 px-4 border text-center">Không có bài viết nào trong thùng rác.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PostTrashList;
