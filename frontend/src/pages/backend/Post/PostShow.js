import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PostService from '../../../services/PostService';
import TopicService from '../../../services/TopicService';
import { FaArrowLeft } from 'react-icons/fa';

const PostShow = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [postData, setPostData] = useState(null);
    const [topics, setTopics] = useState([]);
    const [descriptionExpanded, setDescriptionExpanded] = useState(false);
    const [contentExpanded, setContentExpanded] = useState(false);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await PostService.show(id);
                if (response.status) {
                    setPostData(response.post);
                } else {
                    toast.error('Không tải được dữ liệu bài viết');
                }
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu bài viết:', error);
                toast.error('Lỗi khi tải dữ liệu bài viết');
            } finally {
                setLoading(false);
            }
        };

        const fetchTopics = async () => {
            try {
                const topicResponse = await TopicService.index();
                setTopics(topicResponse.topic || []);
            } catch (error) {
                console.error('Lỗi khi tải chủ đề', error);
                toast.error('Không thể tải chủ đề');
            }
        };

        fetchTopics();
        fetchPostData();
    }, [id]);

    const handleGoBack = () => {
        navigate('/admin/posts');
    };

    if (loading) return <p className="text-center mt-10">Đang tải...</p>;
    if (!postData) return <p className="text-center mt-10 text-red-500">Không tìm thấy bài viết.</p>;

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-12">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">Chi tiết bài viết</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                <div className="flex flex-col space-y-1">
                    <span className="text-gray-500 font-semibold">Tiêu đề:</span>
                    <span className="text-gray-800">{postData.title}</span>
                </div>
                <div className="flex flex-col space-y-1">
                    <span className="text-gray-500 font-semibold">Mô tả:</span>
                    <span className="text-gray-800">
                        {descriptionExpanded ? postData.description : `${postData.description.slice(0, 100)}...`}
                    </span>
                    <button onClick={() => setDescriptionExpanded(!descriptionExpanded)} className="text-blue-500 hover:underline">
                        {descriptionExpanded ? 'Thu gọn' : 'Xem thêm'}
                    </button>
                </div>
                <div className="flex flex-col space-y-1">
                    <span className="text-gray-500 font-semibold">Chủ đề:</span>
                    <span className="text-gray-800">{topics.find(topic => topic.id === postData.topic_id)?.name || 'Chưa có chủ đề'}</span>
                </div>
                <div className="flex flex-col space-y-1">
                    <span className="text-gray-500 font-semibold">Nội dung:</span>
                    <span className="text-gray-800">
                        {contentExpanded ? postData.content : `${postData.content.slice(0, 100)}...`}
                    </span>
                    <button onClick={() => setContentExpanded(!contentExpanded)} className="text-blue-500 hover:underline">
                        {contentExpanded ? 'Thu gọn' : 'Xem thêm'}
                    </button>
                </div>
                <div className="flex flex-col space-y-1">
                <span className="text-gray-500 font-semibold">Trạng thái:</span>
                <span className={`font-semibold ${postData.status === 1 ? 'text-green-500' : 'text-gray-500'}`}>
                    {postData.status === 1 ? 'Xuất bản' : 'Chưa xuất bản'}
                </span>
                </div>
                {postData.thumbnail && (
                    <div className="flex justify-center mt-6">
                        <img src={postData.thumbnail} alt="Thumbnail" className="w-auto h-auto object-cover rounded-lg shadow-md" />
                    </div>
                )}
            </div>
            <div className="flex justify-end mt-10">
                <button
                    onClick={handleGoBack}
                    className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    <FaArrowLeft className="mr-2" /> Quay lại danh sách
                </button>
            </div>
        </div>
    );
};

export default PostShow;
