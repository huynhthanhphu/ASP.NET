import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import TopicService from '../../../services/TopicService';

const TopicUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        sort_order: '',
        status: '1'
    });

    useEffect(() => {
        const fetchTopicData = async () => {
            try {
                const response = await TopicService.show(id);
                if (response.status) {
                    const topicData = response.topic;
                    setFormData({
                        name: topicData.name,
                        description: topicData.description,
                        sort_order: topicData.sort_order,
                        status: topicData.status.toString(),
                    });
                } else {
                    toast.error('Failed to load topic data');
                }
            } catch (error) {
                console.error('Error fetching topic data:', error);
                toast.error('Error loading topic data');
            }
        };

        fetchTopicData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await TopicService.update(id, formData);
            if (response.status) {
                toast.success('Cập nhật topic thành công!');
                setShowConfirmDialog(true);
            } else {
                toast.error(`Cập nhật không thành công: ${response.message}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(`Có lỗi xảy ra khi cập nhật topic: ${error.message || error}`);
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
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Cập nhật Chủ đề</h2>
                <div className="space-x-2">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Đang xử lý...' : 'Lưu [cập nhật]'}
                    </button>
                    <button
                        onClick={handleGoBack}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Quay lại danh sách
                    </button>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-1">Tên chủ đề</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block mb-1">Mô tả</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            rows="3"
                            required
                        />
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="status" className="block mb-1">Trạng thái</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        >
                            <option value="1">Xuất bản</option>
                            <option value="2">Chưa xuất bản</option>
                        </select>
                    </div>
                </div>
            </form>

            {showConfirmDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-3">Cập nhật thành công</h2>
                        <p className="mb-3">Chủ đề đã được cập nhật thành công. Bạn có muốn tải lại trang?</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={handleConfirmDialogClose}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TopicUpdate;
