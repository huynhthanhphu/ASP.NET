import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PostService from '../../../services/PostService';
import TopicService from '../../../services/TopicService';
import { FaPlus, FaArrowLeft } from 'react-icons/fa';

const PostCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    topic_id: '',
    content: '',
    type: 'post', // Giá trị mặc định là 'post'
    thumbnail: null,
    status: '1'
  });
  const [topics, setTopics] = useState([]);
  const [previewImage, setPreviewImage] = useState(null); // Thêm để xem trước hình ảnh

  // Lấy danh sách các chủ đề từ API
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await TopicService.index();
        if (response.status) {
          setTopics(response.topic);
        } else {
          toast.error('Không thể tải chủ đề');
        }
      } catch (error) {
        console.error('Lỗi tải chủ đề:', error);
        toast.error('Lỗi khi tải chủ đề');
      }
    };
    fetchTopics();
  }, []);

  // Xử lý khi thay đổi giá trị input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Xử lý khi chọn file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      thumbnail: file
    }));

    // Cập nhật hình ảnh xem trước
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === 'thumbnail' && formData[key] instanceof File) {
        formDataToSend.append(key, formData[key], formData[key].name);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await PostService.insert(formDataToSend);
      if (response.status) {
        setShowConfirmDialog(true);
      } else {
        toast.error(response.message || 'Đã xảy ra lỗi');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Có lỗi xảy ra khi thêm bài viết: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Đóng dialog xác nhận
  const handleConfirmDialogClose = () => {
    setShowConfirmDialog(false);
    navigate('/admin/posts');
  };

  // Xử lý quay lại trang trước
  const handleGoBack = () => {
    navigate('/admin/posts');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">Thêm Bài Viết</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 flex flex-col justify-between">
          <div>
            <label htmlFor="title" className="block mb-1 font-medium">Tiêu đề</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1 font-medium">Mô tả</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="topic_id" className="block mb-1 font-medium">Danh mục</label>
            <select
              name="topic_id"
              id="topic_id"
              value={formData.topic_id}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            >
              <option value="">Chọn chủ đề</option>
              {topics && topics.length > 0 ? (
                topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))
              ) : (
                <option disabled>Không có chủ đề nào</option>
              )}
            </select>
          </div>
        </div>
        <div className="space-y-4 flex flex-col justify-between">
          <div>
            <label htmlFor="thumbnail" className="block mb-1 font-medium">Hình ảnh</label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
            {previewImage && (
              <div className="mt-2">
                <img src={previewImage} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
              </div>
            )}
          </div>
          <div>
            <label htmlFor="content" className="block mb-1 font-medium">Nội dung</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="type" className="block mb-1 font-medium">Loại bài viết</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="post">Bài viết</option>
              <option value="page">Trang</option>
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block mb-1 font-medium">Trạng thái</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="1">Xuất bản</option>
              <option value="2">Chưa xuất bản</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-2 col-span-2">
        <button
            onClick={handleSubmit}
            disabled={loading}
            className={`bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <FaPlus className="inline-block mr-2" /> {/* Biểu tượng cho nút Lưu */}
            {loading ? 'Đang xử lý...' : 'Lưu[thêm]'}
          </button>
          <button
            onClick={handleGoBack}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-yellow-300">
            <FaArrowLeft className="inline-block mr-2" /> {/* Biểu tượng cho nút Quay lại */}
            Quay lại danh sách
          </button>
        </div>
      </form>
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Thành công!</h3>
            <p>Bài viết đã được thêm thành công. Bạn có muốn tải lại trang?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={handleConfirmDialogClose}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Có
              </button>
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Không
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCreate;
