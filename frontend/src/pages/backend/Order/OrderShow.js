import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import OrderService from '../../../services/OrderService';
import { FaArrowLeft } from 'react-icons/fa';

const OrderShow = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [orderData, setOrderData] = useState({
    id: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    name: '',
    status: '1',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await OrderService.show(id);
        if (response.status) {
          const order = response.order;
          setOrderData({
            id: order.id,
            username: order.username,
            email: order.email,
            phone: order.phone,
            address: order.address,
            name: order.name,
            status: order.status.toString(),
          });
        } else {
          toast.error('Không thể tải thông tin đơn hàng');
        }
      } catch (error) {
        console.error('Lỗi khi tải thông tin đơn hàng:', error);
        toast.error('Có lỗi xảy ra khi tải thông tin đơn hàng');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [id]);

  const handleGoBack = () => {
    navigate('/admin/order');
  };

  const handleToggleStatus = async () => {
    const newStatus = orderData.status === '1' ? '2' : '1';
    try {
      const response = await OrderService.status(id);
      if (response.status) {
        setOrderData((prevData) => ({
          ...prevData,
          status: newStatus,
        }));
        toast.success('Cập nhật trạng thái đơn hàng thành công!');
      } else {
        toast.error(response.message || 'Lỗi khi cập nhật trạng thái');
      }
    } catch (error) {
      toast.error('Lỗi khi cập nhật trạng thái đơn hàng!');
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Đang tải...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-12">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">Chi tiết Đơn hàng</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">ID Đơn hàng:</span>
          <span className="text-gray-800">{orderData.id}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Tên khách hàng:</span>
          <span className="text-gray-800">{orderData.username}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Email:</span>
          <span className="text-gray-800">{orderData.email}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Số điện thoại:</span>
          <span className="text-gray-800">{orderData.phone}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Địa chỉ:</span>
          <span className="text-gray-800">{orderData.address}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Tên đơn hàng:</span>
          <span className="text-gray-800">{orderData.name}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Trạng thái:</span>
          <span
            className={`font-semibold ${orderData.status === '1' ? 'text-green-500' : 'text-gray-500'}`}
            onClick={handleToggleStatus}
            style={{ cursor: 'pointer' }}
          >
            {orderData.status === '1' ? 'Hoạt động' : 'Ngừng hoạt động'}
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

export default OrderShow;
