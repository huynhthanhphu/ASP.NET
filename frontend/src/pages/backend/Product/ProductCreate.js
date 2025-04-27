import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductService from '../../../services/ProductService';
import CategoryService from '../../../services/CategoryService';
import BrandService from '../../../services/BrandService';
import { FaPlus, FaArrowLeft } from 'react-icons/fa';

const ProductCreate = () => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    salePrice: '',
    quantity: '',
    categoryId: '',
    brandId: '',
    description: '',
    imageUrl: '',
    status: '1',
  });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const result = await CategoryService.index();
        setCategories(result.categories || []);
      } catch (error) {
        toast.error('Không thể tải danh mục');
      } finally {
        setLoading(false);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await BrandService.index();
        if (response.status) {
          setBrands(response.brands || []);
        } else {
          toast.error('Không thể tải thương hiệu');
        }
      } catch (error) {
        console.error('Lỗi tải thương hiệu:', error);
        toast.error('Lỗi khi tải thương hiệu');
      }
    };

    fetchCategories();
    fetchBrands();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageUrl: file }));
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('salePrice', formData.salePrice);
    formDataToSend.append('quantity', formData.quantity);
    formDataToSend.append('categoryId', formData.categoryId);
    formDataToSend.append('brandId', formData.brandId);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('status', formData.status);
    formDataToSend.append('imageUrl', formData.imageUrl);

    try {
      const response = await ProductService.insert(formDataToSend);
      if (response) {
        toast.success('Tải lên thành công!');
        setShowConfirmDialog(true);
      } else {
        toast.error('Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Lỗi khi tải lên:', error);
      toast.error('Có lỗi xảy ra khi tải lên');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDialogClose = () => {
    setShowConfirmDialog(false);
    navigate('/admin/products');
  };

  const handleGoBack = () => {
    navigate('/admin/products');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">Thêm Sản phẩm</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Các input: name, price, salePrice, quantity, category, brand, status */}
          {[
            { label: 'Tên sản phẩm', id: 'name', type: 'text' },
            { label: 'Giá sản phẩm', id: 'price', type: 'number' },
            { label: 'Giá giảm', id: 'salePrice', type: 'number' },
            { label: 'Số lượng', id: 'quantity', type: 'number' },
          ].map(({ label, id, type }) => (
            <div key={id}>
              <label htmlFor={id} className="block mb-1 font-medium">{label}</label>
              <input
                type={type}
                id={id}
                name={id}
                value={formData[id]}
                onChange={handleInputChange}
                required={id !== 'salePrice'}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <div>
            <label htmlFor="categoryId" className="block mb-1 font-medium">Danh mục</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="">Chọn danh mục</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="brandId" className="block mb-1 font-medium">Thương hiệu</label>
            <select
              name="brandId"
              value={formData.brandId}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="">Chọn thương hiệu</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
              ))}
            </select>
          </div>

        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="description" className="block mb-1 font-medium">Mô tả</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block mb-1 font-medium">Hình ảnh</label>
            <input
              type="file"
              name="imageUrl"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-2 w-full h-32 object-cover rounded"
              />
            )}
          </div>

          <div className="flex justify-end space-x-2 col-span-2">
            <button
              type="submit"
              disabled={loading}
              className={`bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <FaPlus className="inline-block mr-2" />
              {loading ? 'Đang xử lý...' : 'Lưu [thêm]'}
            </button>
            <button
              type="button"
              onClick={handleGoBack}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              <FaArrowLeft className="inline-block mr-2" />
              Trở lại
            </button>
          </div>
        </div>
      </form>

      {/* ✅ Hộp thoại xác nhận thành công */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <h3 className="text-lg font-semibold mb-4 text-green-600">Thêm sản phẩm thành công!</h3>
            <p className="mb-4">Bạn đã thêm sản phẩm mới thành công.</p>
            <button
              onClick={handleConfirmDialogClose}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCreate;
