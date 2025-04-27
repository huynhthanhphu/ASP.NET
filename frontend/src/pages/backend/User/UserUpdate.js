import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserService from '../../../services/UserService';

const UserUpdate = () => {
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
                        roles: userData.roles,
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
        navigate('/admin/users');
    };

    const handleGoBack = () => {
        navigate('/admin/users');
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Cập nhật Người Dùng</h2>
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
                        <label htmlFor="name" className="block mb-1">Tên</label>
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
                        <label htmlFor="email" className="block mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="fullname" className="block mb-1">Họ và tên</label>
                        <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="gender" className="block mb-1">Giới tính</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
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
                        <label htmlFor="phone" className="block mb-1">Số điện thoại</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block mb-1">Địa chỉ</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="roles" className="block mb-1">Vai trò</label>
                        <input
                            type="text"
                            id="roles"
                            name="roles"
                            value={formData.roles}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="image" className="block mb-1">Hình ảnh</label>
                        {currentImage && (
                            <img src={currentImage} alt="Current user" className="w-full h-32 object-cover mb-2" />
                        )}
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleFileChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="status" className="block mb-1">Trạng thái</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        >
                            <option value="1">Kích hoạt</option>
                            <option value="0">Vô hiệu hóa</option>
                        </select>
                    </div>
                </div>
            </form>

            {showConfirmDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-3">Cập nhật thành công</h2>
                        <p className="mb-3">Người dùng đã được cập nhật thành công. Bạn có muốn tải lại trang?</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={handleConfirmDialogClose}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Đồng ý
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserUpdate;
