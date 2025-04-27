import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TopicService from '../../../services/TopicService';
import { FaPlus, FaArrowLeft } from 'react-icons/fa'; // Import biểu tượng

const TopicCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sort_order: '',
    status: '1'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Tạo FormData và thêm dữ liệu từ form
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('sort_order', formData.sort_order);
    formDataToSend.append('status', formData.status);
  
    try {
      // Gửi FormData tới API
      const response = await TopicService.insert(formDataToSend);
      if (response.status) {
        setShowConfirmDialog(true);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Có lỗi xảy ra khi thêm thương hiệu');
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleConfirmDialogClose = () => {
    setShowConfirmDialog(false);
    navigate('/admin/topics');
  };

  const handleGoBack = () => {
    navigate('/admin/topics');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">Thêm Chủ Đề</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">Tên chủ đề</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required />
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
              required />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="status" className="block mb-1 font-medium">Trạng thái</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-3">Thêm chủ đề thành công</h2>
            <p className="mb-3">Chủ đề đã được thêm thành công. Bạn có muốn tải lại trang?</p>
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

export default TopicCreate;
