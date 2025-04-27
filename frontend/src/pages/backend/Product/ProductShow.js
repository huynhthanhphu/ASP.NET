import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductService from '../../../services/ProductService';
import CategoryService from '../../../services/CategoryService';
import BrandService from '../../../services/BrandService';
import { FaArrowLeft } from 'react-icons/fa';

const ProductShow = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [descriptionExpanded, setDescriptionExpanded] = useState(false);
    const [contentExpanded, setContentExpanded] = useState(false);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await ProductService.show(id);
                if (response.status) {
                    setProduct(response.product);
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

        const fetchCategoriesAndBrands = async () => {
            try {
                const [categoryResponse, brandResponse] = await Promise.all([
                    CategoryService.index(),
                    BrandService.index(),
                ]);
                setCategories(categoryResponse.categorys || []);
                setBrands(brandResponse.brands || []);
            } catch (error) {
                console.error('Lỗi khi tải danh mục và thương hiệu:', error);
                toast.error('Không thể tải danh mục hoặc thương hiệu');
            }
        };

        fetchProductData();
        fetchCategoriesAndBrands();
    }, [id]);

    const handleGoBack = () => {
        navigate('/admin/products');
    };

    if (loading) return <p className="text-center mt-10">Đang tải...</p>;
    if (!product) return <p className="text-center mt-10 text-red-500">Không tìm thấy sản phẩm.</p>;

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-12">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">Thông tin Sản phẩm</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                <div className="flex flex-col space-y-1">
                    <span className="text-gray-500 font-semibold">Tên sản phẩm:</span>
                    <span className="text-gray-800">{product.name}</span>
                </div>
                <div className="flex flex-col space-y-1">
                    <span className="text-gray-500 font-semibold">Giá:</span>
                    <span className="text-gray-800">{product.price}</span>
                </div>
                <div className="flex flex-col space-y-1">
                    <span className="text-gray-500 font-semibold">Danh mục:</span>
                    <span className="text-gray-800">{categories.find(cat => cat.id === product.category_id)?.name || 'N/A'}</span>
                </div>
                <div className="flex flex-col space-y-1">
                    <span className="text-gray-500 font-semibold">Thương hiệu:</span>
                    <span className="text-gray-800">{brands.find(brand => brand.id === product.brand_id)?.name || 'N/A'}</span>
                </div>
                <div className="flex flex-col space-y-1">
                    <span className="text-gray-500 font-semibold">Mô tả:</span>
                    <span className="text-gray-800">
                        {descriptionExpanded ? product.description : `${product.description.slice(0, 100)}...`}
                    </span>
                    <button onClick={() => setDescriptionExpanded(!descriptionExpanded)} className="text-blue-500 hover:underline">
                        {descriptionExpanded ? 'Thu gọn' : 'Xem thêm'}
                    </button>
                </div>
                <div className="flex flex-col space-y-1">
                    <span className="text-gray-500 font-semibold">Nội dung:</span>
                    <span className="text-gray-800">
                        {contentExpanded ? product.content : `${product.content.slice(0, 100)}...`}
                    </span>
                    <button onClick={() => setContentExpanded(!contentExpanded)} className="text-blue-500 hover:underline">
                        {contentExpanded ? 'Thu gọn' : 'Xem thêm'}
                    </button>
                </div>
                <div className="flex flex-col space-y-1">
                <span className="text-gray-500 font-semibold">Trạng thái:</span>
                <span className={`font-semibold ${product.status === 1 ? 'text-green-500' : 'text-gray-500'}`}>
                    {product.status === 1 ? 'Xuất bản' : 'Chưa xuất bản'}
                </span>
                </div>
                {product.images.length > 0 && (
                    <div className="col-span-2 flex justify-center mt-6">
                        <img
                            src={product.images[0].thumbnail}
                            alt={product.name}
                            className="w-auto h-auto object-cover rounded-lg shadow-md"
                        />
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

export default ProductShow;
