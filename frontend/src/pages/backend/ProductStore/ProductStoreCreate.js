import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductStoreService from '../../../services/ProductStoreService';
import ProductService from '../../../services/ProductService';
import { FaPlus, FaArrowLeft } from 'react-icons/fa';

const ProductStoreCreate = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [formData, setFormData] = useState({
    product_id: '',
    price_root: '',
    qty: '',
    status: '1',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.index();
        if (response.status) {
          setProducts(response.products);
        } else {
          toast.error('Không thể tải sản phẩm');
        }
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm:', error);
        toast.error('Lỗi khi tải sản phẩm');
      }
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await ProductStoreService.insert(formData);
      
      if (response && response.status) {
        setShowConfirmDialog(true);
        toast.success('Thêm sản phẩm thành công!');
      } else {
        if (response) {
          toast.error(response.message || 'Có lỗi xảy ra khi thêm sản phẩm');
        }
      }
    } catch (error) {
      console.error('Lỗi khi gửi biểu mẫu:', error);
      toast.error('Có lỗi xảy ra khi thêm sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDialogClose = () => {
    setShowConfirmDialog(false);
    navigate('/admin/product-store');
  };

  const handleGoBack = () => {
    navigate('/admin/product-store');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">Thêm Sản Phẩm Vào Kho</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="product_id" className="block mb-1 font-medium">Chọn sản phẩm có sẵn</label>
            <select
              id="product_id"
              name="product_id"
              value={formData.product_id}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">--Chọn sản phẩm--</option>
              {products.length > 0 ? (
                products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))
              ) : (
                <option value="">Không có sản phẩm</option>
              )}
            </select>
          </div>

          <div>
            <label htmlFor="price_root" className="block mb-1 font-medium">Giá nhập</label>
            <input
              type="number"
              id="price_root"
              name="price_root"
              value={formData.price_root}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="qty" className="block mb-1 font-medium">Số lượng</label>
            <input
              type="number"
              id="qty"
              name="qty"
              value={formData.qty}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 col-span-2">
          <button
            type="submit"
            disabled={loading}
            className={`bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <FaPlus className="inline-block mr-2" />
            {loading ? 'Đang xử lý...' : 'Lưu'}
          </button>
          <button
            type="button"
            onClick={handleGoBack}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <FaArrowLeft className="inline-block mr-2" />
            Quay lại
          </button>
        </div>
      </form>

      {showConfirmDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-3">Nhập sản phẩm thành công!</h2>
          <p className="mb-3">Sản phẩm đã được nhập thêm thành công. Bạn có muốn tải lại trang?</p>
          <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={handleConfirmDialogClose}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Có
              </button>
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Không
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductStoreCreate;
