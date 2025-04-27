import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import TopicService from '../../../services/TopicService';
import { FaArrowLeft } from 'react-icons/fa';

const TopicShow = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [topic, setTopic] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopicData = async () => {
            try {
                const response = await TopicService.show(id);
                if (response.status) {
                    setTopic(response.topic);
                } else {
                    toast.error('Không thể tải thông tin chủ đề');
                }
            } catch (error) {
                console.error('Lỗi khi tải thông tin chủ đề:', error);
                toast.error('Có lỗi xảy ra khi tải thông tin chủ đề');
            } finally {
                setLoading(false);
            }
        };

        fetchTopicData();
    }, [id]);

    const handleGoBack = () => {
        navigate('/admin/topics');
    };

    if (loading) return <p className="text-center mt-10">Đang tải...</p>;
    if (!topic) return <p className="text-center mt-10 text-red-500">Không tìm thấy chủ đề.</p>;

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-12">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">Thông tin Chủ đề</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                <div className="flex flex-col space-y-1">
                    <span className="text-gray-500 font-semibold">Tên chủ đề:</span>
                    <span className="text-gray-800">{topic.name}</span>
                </div>
                <div className="flex flex-col space-y-1">
                    <span className="text-gray-500 font-semibold">Mô tả:</span>
                    <span className="text-gray-800">{topic.description}</span>
                </div>
                <div className="flex flex-col space-y-1">
                    <span className="text-gray-500 font-semibold">Sắp xếp:</span>
                    <span className="text-gray-800">{topic.sort_order}</span>
                </div>
                <div className="flex flex-col space-y-1">
                    <span className="text-gray-500 font-semibold">Trạng thái:</span>
                    <span className={`font-semibold ${topic.status === '1' ? 'text-green-500' : 'text-gray-500'}`}>
                        {topic.status === '1' ? 'Xuất bản' : 'Chưa xuất bản'}
                    </span>
                </div>
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

export default TopicShow;
