import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BannerService from '../../../services/BannerService';

const BannerUpdate = () => {
    const navigate = useNavigate();
    const [banners, setBanners] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [currentImage, setCurrentImage] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        link: '',
        description: '',
        position: 'slideshow',
        sort_order: '',
        image: '',
        status: '1'
    });

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await BannerService.index();
                if (response.status) {
                    setBanners(response.banners);
                } else {
                    toast.error('Failed to load banners');
                }
            } catch (error) {
                console.error('Error fetching banners:', error);
                toast.error('Error loading banners');
            }
        };

        const fetchBannerData = async () => {
            try {
                const response = await BannerService.show(id);
                if (response.status) {
                    const bannerData = response.banner;
                    setFormData({
                        name: bannerData.name,
                        link: bannerData.link,
                        description: bannerData.description,
                        position: bannerData.position,
                        sort_order: bannerData.sort_order,
                        status: bannerData.status.toString(),
                    });
                    setCurrentImage(bannerData.image);
                } else {
                    toast.error('Failed to load banner data');
                }
            } catch (error) {
                console.error('Error fetching banner data:', error);
                toast.error('Error loading banner data');
            }
        };

        fetchBanners();
        fetchBannerData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Lấy tệp đầu tiên
        setFormData((prevState) => ({
            ...prevState,
            image: file // Lưu tệp duy nhất vào `image`
        }));
        setCurrentImage(URL.createObjectURL(file)); // Hiển thị hình ảnh đầu tiên
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formDataToSend = new FormData();
        for (const key in formData) {
            if (key === 'image') {
                if (formData[key] instanceof File) {
                    formDataToSend.append(key, formData[key], formData[key].name); // Thêm ảnh mới nếu có
                } else if (currentImage) {
                    formDataToSend.append('image', currentImage); // Giữ nguyên ảnh cũ nếu có
                } else if (!currentImage && !(formData[key] instanceof File)) {
                    // Nếu banner không có ảnh và không thêm ảnh mới, có thể bỏ qua hoặc để rỗng.
                    formDataToSend.append('image', ''); // Để trống nếu không có ảnh mới và cũng không có ảnh cũ
                }
            } else {
                formDataToSend.append(key, formData[key]); // Cập nhật các trường khác
            }
        }
        try {
            const response = await BannerService.update(id, formDataToSend);
            // Kiểm tra phản hồi từ API
            if (response.status) {
                toast.success('Cập nhật banner thành công!');
                setShowConfirmDialog(true);
            } else {
                toast.error(`Cập nhật không thành công: ${response.message}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(`Có lỗi xảy ra khi cập nhật banner: ${error.message || error}`);
        } finally {
            setLoading(false);
        }
    };
    

    const handleConfirmDialogClose = () => {
        setShowConfirmDialog(false);
        navigate('/admin/banner');
    };

    const handleGoBack = () => {
        navigate('/admin/banner');
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Cập nhật Banner</h2>
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
                        <label htmlFor="name" className="block mb-1">Tên banner</label>
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
                        <label htmlFor="link" className="block mb-1">Liên kết</label>
                        <input
                            type="text"
                            id="link"
                            name="link"
                            value={formData.link}
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
                        <label htmlFor="sort_order" className="block mb-1">Thứ tự sắp xếp</label>
                        <select
                            id="sort_order"
                            name="sort_order"
                            value={formData.sort_order}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                        >
                            <option value="">Chọn vị trí</option>
                            {banners.map((banner) => (
                                <option key={banner.id} value={banner.sort_order}>
                                    {banner.sort_order} {banner.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="position" className="block mb-1">Chức năng</label>
                        <select
                            id="position"
                            name="position"
                            value={formData.position}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        >
                            <option value="slideshow">Trình chiếu</option>
                            <option value="ads">Quảng cáo</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="image" className="block mb-1">Hình</label>
                        {currentImage && (
                            <img src={currentImage}alt="Current banner" className="w-full h-32 object-cover mb-2" />
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
                        <p className="mb-3">Banner đã được cập nhật thành công. Bạn có muốn tải lại trang?</p>
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

export default BannerUpdate;
