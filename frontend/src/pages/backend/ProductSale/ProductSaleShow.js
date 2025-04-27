import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductSaleService from '../../../services/ProductSaleService';
import { FaArrowLeft } from 'react-icons/fa';

const ProductSaleShow = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [productData, setProductData] = useState({
        date_begin: '',
        date_end: '',
        price_sale: '',
        status: '1',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await ProductSaleService.show(id);
                if (response.status) {
                    const product = response.productsale;
                    setProductData({
                        date_begin: product.date_begin.split(' ')[0],
                        date_end: product.date_end.split(' ')[0],
                        price_sale: product.price_sale,
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
        navigate('/admin/product-sale');
    };

    if (loading) {
        return <p className="text-center mt-10">Đang tải...</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-12">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">Chi tiết Sản phẩm Giảm giá</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                <div className="flex flex-col space-y-1">
                    <span className="text-gray-500 font-semibold">Ngày bắt đầu:</span>
                    <span className="text-gray-800">{productData.date_begin}</span>
                </div>
                <div className="flex flex-col space-y-1">
                    <span className="text-gray-500 font-semibold">Ngày kết thúc:</span>
                    <span className="text-gray-800">{productData.date_end}</span>
                </div>
                <div className="flex flex-col space-y-1">
                    <span className="text-gray-500 font-semibold">Giá giảm:</span>
                    <span className="text-gray-800">{productData.price_sale}</span>
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

export default ProductSaleShow;