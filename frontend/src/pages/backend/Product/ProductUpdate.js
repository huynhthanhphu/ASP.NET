import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductService from '../../../services/ProductService';
import CategoryService from '../../../services/CategoryService';
import BrandService from '../../../services/BrandService';

const ProductUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [previewImage, setPreviewImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category_id: '',
        brand_id: '',
        content: '',
        description: '',
        images: [],
        status: '1',
    });

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await ProductService.show(id);
                if (response.status) {
                    const product = response.product;
                    setFormData({
                        name: product.name,
                        price: product.price,
                        category_id: product.category_id,
                        brand_id: product.brand_id,
                        content: product.content,
                        description: product.description,
                        status: product.status.toString(),
                    });
                    if (product.images && product.images.length > 0) {
                        setPreviewImage(product.images[0].thumbnail); // Chỉ thiết lập nếu có hình ảnh
                    } else {
                        setPreviewImage('default-image-url.jpg'); // Hoặc một hình ảnh mặc định nếu không có hình ảnh
                    }
                } else {
                    toast.error('Không thể tải thông tin sản phẩm');
                }
            } catch (error) {
                console.error('Lỗi khi tải thông tin sản phẩm:', error);
                toast.error('Có lỗi xảy ra khi tải thông tin sản phẩm');
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prev) => ({ ...prev, images: files }));
        setPreviewImage(URL.createObjectURL(files[0])); // Show the first image as preview
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const dataToSend = new FormData();
        for (const key in formData) {
            if (key === 'images') {
                // Thêm tất cả các tệp hình ảnh vào FormData
                for (let i = 0; i < formData.images.length; i++) {
                    dataToSend.append('thumbnail[]', formData.images[i]); // Sử dụng thumbnail[] để gửi nhiều tệp
                }
            } else {
                dataToSend.append(key, formData[key]);
            }
        }
    
        try {
            const response = await ProductService.update(id, dataToSend);
            if (response.status) {
                toast.success('Cập nhật sản phẩm thành công!');
                setShowConfirmDialog(true);
            } else {
                toast.error(`Cập nhật không thành công: ${response.message}`);
            }
        } catch (error) {
            console.error('Lỗi khi gửi biểu mẫu:', error);
            toast.error(`Có lỗi xảy ra khi cập nhật sản phẩm: ${error.message || error}`);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmDialogClose = () => {
        setShowConfirmDialog(false);
        navigate('/admin/products');
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold">Cập nhật Sản phẩm</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 mt-4">
                <div>
                    <label htmlFor="name">Tên sản phẩm</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                    <label htmlFor="price">Giá</label>
                    <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} required className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                    <label htmlFor="category_id">Danh mục</label>
                    <select id="category_id" name="category_id" value={formData.category_id} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2">
                        <option value="">Chọn danh mục</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="brand_id">Thương hiệu</label>
                    <select id="brand_id" name="brand_id" value={formData.brand_id} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2">
                        <option value="">Chọn thương hiệu</option>
                        {brands.map(brand => (
                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="description">Mô tả</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required className="w-full border border-gray-300 rounded px-3 py-2" rows="3" />
                </div>
                <div>
                    <label htmlFor="content">Nội dung</label>
                    <textarea id="content" name="content" value={formData.content} onChange={handleInputChange} required className="w-full border border-gray-300 rounded px-3 py-2" rows="3" />
                </div>
                <div>
                    <label htmlFor="images">Hình ảnh</label>
                    {previewImage && <img src={previewImage} alt="Preview" className="w-full h-32 object-cover mb-2" />}
                    <input type="file" id="images" name="images" onChange={handleFileChange} multiple className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                    <label htmlFor="status">Trạng thái</label>
                    <select id="status" name="status" value={formData.status} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2">
                        <option value="1">Xuất bản</option>
                        <option value="2">Chưa xuất bản</option>
                    </select>
                </div>
                <div className="col-span-2 flex justify-end space-x-2 mt-4">
                    <button type="submit" disabled={loading} className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {loading ? 'Đang xử lý...' : 'Lưu [Cập nhật]'}
                    </button>
                    <button type="button" onClick={() => navigate('/admin/products')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        Quay lại danh sách
                    </button>
                </div>
            </form>

            {showConfirmDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold">Cập nhật thành công</h2>
                        <p>Sản phẩm đã được cập nhật thành công.</p>
                        <div className="flex justify-end mt-4">
                            <button onClick={handleConfirmDialogClose} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">OK</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductUpdate;
