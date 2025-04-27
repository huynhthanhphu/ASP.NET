import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductStoreService from '../../../services/ProductStoreService';
import { FaArrowLeft } from 'react-icons/fa';

const ProductStoreShow = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [productData, setProductData] = useState({
        qty: '',
        price_root: '',
        status: '1', // default status is "active"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await ProductStoreService.show(id);
                if (response.status) {
                    const product = response.productStore;
                    setProductData({
                        qty: product.qty,
                        price_root: product.price_root,
                        status: product.status.toString(),
                    });
                } else {
                    toast.error('Không thể tải thông tin sản phẩm');
                }
            } catch (error) {
                console.error('Lỗi khi tải thông tin sản phẩm:', error);
                toast.error('Có lỗi xảy ra khi tải thông tin sản phẩm');
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [id]);

    const handleGoBack = () => {
        navigate('/admin/product-store');
    };

    if (loading) {
        return <p className="text-center mt-10">Đang tải...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-12">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">Chi tiết Sản phẩm trong kho</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                <div className="flex flex-col space-y-1">
                    <span className="text-gray-500 font-semibold">Số lượng:</span>
                    <span className="text-gray-800">{productData.qty}</span>
                </div>
                <div className="flex flex-col space-y-1">
                    <span className="text-gray-500 font-semibold">Giá gốc:</span>
                    <span className="text-gray-800">{productData.price_root}</span>
                </div>
                <div className="flex flex-col space-y-1">
                    <span className="text-gray-500 font-semibold">Trạng thái:</span>
                    <span className={`font-semibold ${productData.status === '1' ? 'text-green-500' : 'text-gray-500'}`}>
                        {productData.status === '1' ? 'Hoạt động' : 'Ngừng hoạt động'}
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

export default ProductStoreShow;
