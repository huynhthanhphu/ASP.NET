import React, { useState, useEffect } from 'react';
import { FaTrashRestore, FaTrashAlt } from 'react-icons/fa';
import OrderService from '../../../services/OrderService'; // Dịch vụ gọi API
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const OrderTrashList = () => {
  const [trashedorders, setTrashedorders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await OrderService.trash(); // Gọi API để lấy danh sách order đã xóa mềm
        setTrashedorders(result.order); // Giả sử response trả về có thuộc tính orders
      } catch (error) {
        console.error("Lỗi khi tải danh sách order trong thùng rác:", error);
        toast.error("Không thể tải danh sách order đã bị xóa.");
      }
    })();
  }, []);

  // Hàm khôi phục order
  const handleRestore = async (id) => {
    const confirmRestore = window.confirm("Bạn có chắc chắn muốn phục hồi order này?");
    if (confirmRestore) {
      try {
        const response = await OrderService.restore(id); // Gọi API phục hồi order
        if (response.status) {
          setTrashedorders(trashedorders.filter(order => order.id !== id)); // Cập nhật lại danh sách order
          toast.success("Khôi phục order thành công.");
        } else {
          toast.error(response.message || "Khôi phục thất bại.");
        }
      } catch (error) {
        console.error("Lỗi khi khôi phục order:", error);
        toast.error("Có lỗi xảy ra khi khôi phục order.");
      }
    }
  };

  // Hàm xóa vĩnh viễn order
  const handlePermanentDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn order này?");
    if (confirmDelete) {
      try {
        const response = await OrderService.destroy(id); // Gọi API xóa vĩnh viễn order
        if (response.status) {
          setTrashedorders(trashedorders.filter(order => order.id !== id)); // Cập nhật lại danh sách order
          toast.success("order đã được xóa vĩnh viễn.");
        } else {
          toast.error(response.message || "Xóa thất bại.");
        }
      } catch (error) {
        console.error("Lỗi khi xóa vĩnh viễn order:", error);
        toast.error("Có lỗi xảy ra khi xóa order.");
      }
    }
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-red-500 flex items-center">
          <FaTrashAlt className="mr-2" /> Thùng rác order
        </h1>
        <Link to="/admin/order" className="bg-blue-500 text-white px-3 py-1 rounded inline-flex items-center text-sm">
          Quay lại danh sách
        </Link>
      </div>
      <table className="min-w-full shadow-md rounded-lg bg-white border p-6">
        <thead>
          <tr className="bg-gray-100">
              <th className="py-2 px-4 border"></th>
              <th className="py-2 px-4 border">Tên khách hàng</th>
              <th className="py-2 px-4 border">Đơn hàng</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Số điện thoại</th>
              <th className="py-2 px-4 border">Địa chỉ</th>
              <th className="py-2 px-4 border">Chức năng</th>
              <th className="py-2 px-4 border">ID</th>
          </tr>
        </thead>
        <tbody>
          {trashedorders.length === 0 ? (
            <tr>
              <td colSpan="7" className="py-3 text-center text-gray-600">Không có order nào trong thùng rác.</td>
            </tr>
          ) : (
            trashedorders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-100 transition-colors">
                <td className="py-2 px-2 border text-center">
                  <input type="checkbox" />
                </td>
                  <td className="py-2 px-4 border text-center">{order.username}</td>
                  <td className="py-2 px-4 border text-center">{order.name}</td>
                  <td className="py-2 px-4 border text-center">{order.email}</td>
                  <td className="py-2 px-4 border text-center">{order.phone}</td>
                  <td className="py-2 px-4 border text-center">{order.address}</td>
                <td className="py-2 px-4 border text-center">
                  <button className="bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md" onClick={() => handleRestore(order.id)}>
                    <FaTrashRestore className="text-lg" /> {/* Nút khôi phục */}
                  </button>
                  <button className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md" onClick={() => handlePermanentDelete(order.id)}>
                    <FaTrashAlt className="text-lg" /> {/* Nút xóa vĩnh viễn */}
                  </button>
                </td>
                <td className="py-2 px-4 border text-center">{order.id}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTrashList;
