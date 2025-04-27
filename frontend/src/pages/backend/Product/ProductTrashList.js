import React, { useState, useEffect } from 'react';
import ProductService from '../../../services/ProductService'; // Đảm bảo đường dẫn đúng
import { FaTrashAlt, FaTrashRestore } from 'react-icons/fa'; // Thêm biểu tượng khôi phục
import { toast } from 'react-toastify'; // Import toast từ react-toastify
import { Link } from 'react-router-dom';

const ProductTrashList = () => {
  const [trashedProducts, setTrashedProducts] = useState([]);

  useEffect(() => {
    const fetchTrashedProducts = async () => {
      const result = await ProductService.trash(); // Gọi dịch vụ để lấy sản phẩm đã bị xóa
      setTrashedProducts(result.products); // Đảm bảo bạn đã đặt 'products' đúng trong dữ liệu trả về
    };
    fetchTrashedProducts();
  }, []);

  // Hàm xử lý khôi phục sản phẩm
  const handleRestore = async (id) => {
    try {
      const confirmRestore = window.confirm('Bạn có chắc chắn muốn khôi phục sản phẩm này không?');
      if (confirmRestore) {
        await ProductService.restore(id); // Gọi API để khôi phục sản phẩm
        setTrashedProducts(trashedProducts.filter((product) => product.id !== id)); // Cập nhật danh sách sản phẩm sau khi khôi phục
        toast.success('Sản phẩm đã được khôi phục thành công'); // Hiển thị thông báo thành công
      }
    } catch (error) {
      console.error('Lỗi khi khôi phục sản phẩm:', error);
      toast.error('Có lỗi xảy ra khi khôi phục sản phẩm');
    }
  };

  // Hàm xử lý xóa vĩnh viễn sản phẩm
  const handleDeleteForever = async (id) => {
    try {
      const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa vĩnh viễn sản phẩm này không?');
      if (confirmDelete) {
        await ProductService.destroy(id); // Gọi API để xóa vĩnh viễn sản phẩm
        setTrashedProducts(trashedProducts.filter((product) => product.id !== id)); // Cập nhật danh sách sản phẩm sau khi xóa
        toast.success('Sản phẩm đã được xóa vĩnh viễn thành công'); // Hiển thị thông báo thành công
      }
    } catch (error) {
      console.error('Lỗi khi xóa vĩnh viễn sản phẩm:', error);
      toast.error('Có lỗi xảy ra khi xóa vĩnh viễn sản phẩm');
    }
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-red-500 flex items-center">
          <FaTrashAlt className="mr-2" /> Thùng rác Sản phẩm
        </h1>
        <Link to="/admin/products" className="bg-blue-500 text-white px-3 py-1 rounded inline-flex items-center text-sm">
          Quay lại danh sách
        </Link>
      </div>

      <table className="min-w-full shadow-md rounded-lg bg-white border mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">Hình</th>
            <th className="py-2 px-4 border">Tên sản phẩm</th>
            <th className="py-2 px-4 border">Danh mục</th>
            <th className="py-2 px-4 border">Thương hiệu</th>
            <th className="py-2 px-4 border">Giá</th>
            <th className="py-2 px-4 border">Chức năng</th>
            <th className="py-2 px-4 border">ID</th>
          </tr>
        </thead>
        <tbody>
          {trashedProducts.length === 0 ? (
            <tr>
              <td colSpan="7" className="py-3 text-center text-gray-600">Không có sản phẩm nào trong thùng rác.</td>
            </tr>
          ) : (
            trashedProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="py-3 px-4 border text-center">
                  <div className="flex justify-center items-center">
                    {product.images.length > 0 ? (
                      <img src={product.images[0].thumbnail} alt={product.name} className="w-20 h-20 object-cover" />
                    ) : (
                      <span>Không có hình ảnh</span>
                    )}
                  </div>
                </td>
                <td className="py-2 px-4 border text-center">{product.name}</td>
                <td className="py-2 px-4 border text-center">{product.catname}</td>
                <td className="py-2 px-4 border text-center">{product.brandname}</td>
                <td className="py-2 px-4 border text-center">{product.price}</td>
                <td className="py-2 px-4 border text-center">
                  <button 
                    onClick={() => handleRestore(product.id)} 
                    className="bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md"
                  >
                    <FaTrashRestore className="text-lg" />
                  </button>
                  <button 
                    onClick={() => handleDeleteForever(product.id)} 
                    className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md"
                  >
                    <FaTrashAlt className="text-lg" />
                  </button>
                </td>
                <td className="py-2 px-4 border text-center">{product.id}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTrashList;
