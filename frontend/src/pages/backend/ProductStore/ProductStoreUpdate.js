import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductStoreService from '../../../services/ProductStoreService';

const ProductStoreUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [productData, setProductData] = useState({
        qty: '',
        price_root: '',
        status: '1', // mặc định trạng thái là "hoạt động"
    });
    const [loading, setLoading] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

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
            }
        };

        fetchProductData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const dataToSend = new FormData();
        dataToSend.append('qty', productData.qty);
        dataToSend.append('price_root', productData.price_root);
        dataToSend.append('status', productData.status);

        try {
            const response = await ProductStoreService.update(id, dataToSend);
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
        navigate('/admin/product-store'); // Điều hướng về danh sách sản phẩm trong kho
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold">Cập nhật Sản phẩm trong kho</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 mt-4">
                <div>
                    <label htmlFor="qty">Số lượng</label>
                    <input
                        type="number"
                        id="qty"
                        name="qty"
                        value={productData.qty}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label htmlFor="price_root">Giá gốc</label>
                    <input
                        type="number"
                        id="price_root"
                        name="price_root"
                        value={productData.price_root}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label htmlFor="status">Trạng thái</label>
                    <select
                        id="status"
                        name="status"
                        value={productData.status}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                        <option value="1">Hoạt động</option>
                        <option value="0">Ngừng hoạt động</option>
                    </select>
                </div>
                <div className="col-span-2 flex justify-end space-x-2 mt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Đang xử lý...' : 'Lưu [Cập nhật]'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/product-store')}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
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
                            <button onClick={handleConfirmDialogClose} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Đồng ý</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductStoreUpdate;
