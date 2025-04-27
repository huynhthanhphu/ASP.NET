import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PostService from '../../../services/PostService';
import TopicService from '../../../services/TopicService';

const PostUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [preview, setPreview] = useState(''); // Để xem trước ảnh

    const [formData, setFormData] = useState({
        title: '',
        type:'post',
        topic_id: '',
        description: '',
        content: '',
        status: '1',
        thumbnail: '',
    });
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await PostService.show(id);
                if (response.status) {
                    const postData = response.post;
                    setFormData({
                        title: postData.title,
                        type: postData.type,
                        topic_id: postData.topic_id.toString(), // Thêm topic_id
                        description: postData.description,
                        content: postData.content,
                        status: postData.status.toString(),
                    });
                    setPreview(postData.thumbnail);
                } else {
                    toast.error('Không tải được dữ liệu bài viết');
                }
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu bài viết:', error);
                toast.error('Lỗi khi tải dữ liệu bài viết');
            }
        };
        const fetchTopics = async () => {
            try {
                const [topicResponse] = await Promise.all([
                    TopicService.index(),
                ]);
               
                setTopics(topicResponse.topic || []);
            } catch (error) {
                console.error('Lỗi khi tải chủ đề', error);
                toast.error('Không thể tải chủ đề');
            }
        };

       
        fetchTopics();
        fetchPostData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevState) => ({
            ...prevState,
            thumbnail: file,
        }));
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = new FormData();
        Object.keys(formData).forEach((key) => {
            form.append(key, formData[key]);
        });

        try {
            const response = await PostService.update(id, form);
            if (response.status) {
                toast.success('Cập nhật bài viết thành công!');
                setShowConfirmDialog(true);
            } else {
                toast.error(`Cập nhật thất bại: ${response.message}`);
            }
        } catch (error) {
            console.error('Lỗi khi gửi biểu mẫu:', error);
            toast.error(`Lỗi cập nhật bài viết: ${error.message || error}`);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmDialogClose = () => {
        setShowConfirmDialog(false);
        navigate('/admin/posts');
    };

    const handleGoBack = () => {
        navigate('/admin/posts');
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Cập nhật bài viết</h2>
                <div className="space-x-2">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Đang xử lý...' : 'Lưu [Cập nhật]'}
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
                        <label htmlFor="title" className="block mb-1">Tiêu đề bài viết</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
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
                    <div>
                        <label htmlFor="content" className="block mb-1">Nội dung</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
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
                    <div>
                    <label htmlFor="topic_id">Chủ đề</label>
                    <select id="topic_id" name="topic_id" value={formData.topic_id} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2">
                        <option value="">Chọn chủ đề</option>
                        {topics.map(topic => (
                            <option key={topic.id} value={topic.id}>{topic.name}</option>
                        ))}
                    </select>
                </div>
                    <div>
                    {preview && <img src={preview} alt="Preview" className="w-full h-[93px] object-cover mb-2" />}
                        <label htmlFor="thumbnail" className="block mb-1">Ảnh đại diện</label>
                        <input
                            type="file"
                            id="thumbnail"
                            name="thumbnail"
                            onChange={handleFileChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        
                </div>
                </div>
            </form>

            {showConfirmDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-3">Cập nhật thành công</h2>
                        <p className="mb-3">Bài viết đã được cập nhật thành công. Bạn có muốn làm mới trang?</p>
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

export default PostUpdate;
