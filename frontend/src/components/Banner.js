import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import BannerService from '../services/BannerService'; // Import BannerService để gọi API

const Banner = () => {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    // Gọi API để lấy danh sách hình ảnh khi component mount
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await BannerService.slider_list();
                if (Array.isArray(response)) {
                    const imageUrls = response
                        .filter(banner => banner.imageUrl && banner.imageUrl !== "")
                        .map(banner => banner.imageUrl);
                    setImages(imageUrls.slice(0, 3));
                }
            } catch (error) {
                console.error('Lỗi khi tải banner:', error);
            }
        };
        fetchImages();
    }, []);
    
    // Hàm chuyển đến slide tiếp theo
    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };
    // Hàm quay lại slide trước
    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };
    // Hàm chuyển đến slide được chỉ định
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };
    // Tự động chuyển slide sau mỗi 5 giây
    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    },); // Không cần thêm 'images' vào mảng dependencies
    // Kiểm tra nếu không có hình ảnh nào
    if (images.length === 0) {
        return <div>No images available.</div>; // Thay đổi thông báo khi không có hình ảnh
    }
    return (
        <div className="relative w-full h-64 sm:h-80 lg:h-96 mb-1 overflow-hidden">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                    <img
                        src={image} // Hiển thị hình ảnh từ API
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover"/>
                </div>
            ))}
            <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full">
                <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full">
                <ChevronRightIcon className="h-6 w-6" />
            </button>
            <div className="absolute bottom-4 left-0 right-0">
                <div className="flex items-center justify-center gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentIndex === index ? 'bg-white' : 'bg-white/50'}`}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;