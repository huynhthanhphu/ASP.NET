import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserService from '../../../services/UserService';

const ProfileUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [currentImage, setCurrentImage] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        fullname: '',
        gender: '',
        phone: '',
        address: '',
        roles: '',
        image: '',
        status: '1'
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await UserService.show(id);
                if (response.status) {
                    const userData = response.user;
                    setFormData({
                        name: userData.name,
                        email: userData.email,
                        fullname: userData.fullname,
                        gender: userData.gender,
                        phone: userData.phone,
                        address: userData.address,
                        status: userData.status.toString(),
                    });
                    setCurrentImage(userData.image);
                } else {
                    toast.error('Failed to load user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                toast.error('Error loading user data');
            }
        };

        fetchUserData();
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
            image: file,
        }));
        setCurrentImage(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formDataToSend = new FormData();
        for (const key in formData) {
            if (key === 'image') {
                if (formData[key] instanceof File) {
                    formDataToSend.append(key, formData[key], formData[key].name);
                }
            } else {
                formDataToSend.append(key, formData[key]);
            }
        }

        try {
            const response = await UserService.update(id, formDataToSend);
            if (response.status) {
                toast.success('Cập nhật người dùng thành công!');
                setShowConfirmDialog(true);
            } else {
                toast.error(`Cập nhật không thành công: ${response.message}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(`Có lỗi xảy ra khi cập nhật người dùng: ${error.message || error}`);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmDialogClose = () => {
        setShowConfirmDialog(false);
        navigate(`/customer/${id}`);
    };

    const handleGoBack = () => {
        navigate(`/customer/${id}`);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 mb-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-700">Cập nhật Người Dùng</h2>
                <div className="space-x-4">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`bg-blue-500 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Đang xử lý...' : 'Lưu Cập nhật'}
                    </button>
                    <button
                        onClick={handleGoBack}
                        className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg transition-all duration-300 hover:bg-gray-400"
                    >
                        Quay lại danh sách
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">Tên</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="fullname" className="block text-sm font-medium text-gray-600 mb-2">Họ và tên</label>
                        <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-600 mb-2">Giới tính</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Chọn giới tính</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-2">Số điện thoại</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-600 mb-2">Địa chỉ</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-600 mb-2">Hình ảnh</label>
                        {currentImage && (
                            <div className="mb-4">
                                <img src={currentImage} alt="Current user" className="w-32 h-32 object-cover rounded-full mb-2" />
                            </div>
                        )}
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleFileChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </form>

            {showConfirmDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-lg font-semibold mb-3 text-center text-green-600">Cập nhật thành công</h2>
                        <p className="mb-3 text-center text-gray-700">Người dùng đã được cập nhật thành công. Bạn có muốn tải lại trang?</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={handleConfirmDialogClose}
                                className="bg-blue-500 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-blue-600"
                            >
                                Đồng ý
                            </button>
                            <button
                                onClick={() => setShowConfirmDialog(false)}
                                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg transition-all duration-300 hover:bg-gray-400"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileUpdate;

