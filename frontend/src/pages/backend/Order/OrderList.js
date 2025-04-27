import React, { useState, useEffect } from 'react';
import { FaToggleOn, FaToggleOff, FaEye, FaEdit, FaTrashAlt, FaSync } from 'react-icons/fa';
import OrderService from '../../../services/OrderService';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const OrderList = () => {
  const [orders, setOrders] = useState([]); // List of orders
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Function to fetch orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const result = await OrderService.index(); // Call API to get order list
      setOrders(result.order);
    } catch (error) {
      toast.error('Failed to load orders!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(); // Fetch orders on component mount
  }, []);

  // Function to delete an order
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (confirmDelete) {
      try {
        const response = await OrderService.delete(id);
        if (response.status) {
          setOrders(orders.filter(order => order.id !== id)); // Update order list after deletion
          toast.success('Order deleted successfully!');
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Error deleting order:", error);
        toast.error('An error occurred while deleting the order!');
      }
    }
  };

  // Function to toggle order status
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await OrderService.status(id);
      if (response.status) {
        setOrders(orders.map(order => 
          order.id === id ? { ...order, status: currentStatus === 1 ? 2 : 1 } : order
        ));
        toast.success('Order status updated successfully!');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('An error occurred while updating order status!');
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/order/update/${id}`); // Navigate to edit order page
  };

  const handleShow = (id) => {
    navigate(`/admin/order/show/${id}`); // Navigate to view order page
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-blue-400">Order List</h1>
        <div className="flex space-x-2">
          <Link to="/admin/order/trash" className="bg-red-500 text-white px-3 py-1 rounded inline-flex items-center text-sm">
            <FaTrashAlt className="mr-1" />
            Thùng rác
          </Link>
          <button 
            onClick={fetchOrders} 
            className="bg-blue-500 text-white px-3 py-1 rounded inline-flex items-center text-sm"
          >
            <FaSync className="mr-1" />
            Tải lại
          </button>
        </div>
      </div>
      {loading ? (
        <div className="text-center py-4">
          <p>Loading orders, please wait...</p>
        </div>
      ) : (
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
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="py-2 px-2 border text-center">
                    <input type="checkbox" />
                  </td>
                  <td className="py-2 px-4 border text-center">{order.username}</td>
                  <td className="py-2 px-4 border text-center">{order.name}</td>
                  <td className="py-2 px-4 border text-center">{order.email}</td>
                  <td className="py-2 px-4 border text-center">{order.phone}</td>
                  <td className="py-2 px-4 border text-center">{order.address}</td>
                  <td className="py-2 px-4 border text-center w-48">
                  <button
                        className={`py-1 px-2 mx-0.5 text-white rounded-md ${order.status === 1 ? 'bg-green-500' : 'bg-gray-500'}`}
                        onClick={() => handleToggleStatus(order.id, order.status)} 
                      >
                        {order.status === 1 ? <FaToggleOn className="text-lg" /> : <FaToggleOff className="text-lg" />}
                      </button>
                      <button 
                        className="bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md"
                        onClick={() => handleShow(order.id)} 
                      >
                        <FaEye className="text-lg" />
                      </button>
                      <button 
                        className="bg-yellow-500 py-1 px-2 mx-0.5 text-white rounded-md"
                        onClick={() => handleEdit(order.id)} 
                      >
                        <FaEdit className="text-lg" />
                      </button>
                      <button 
                        className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md"
                        onClick={() => handleDelete(order.id)}
                      >
                        <FaTrashAlt className="text-lg" />
                      </button>
                  </td>
                  <td className="py-2 px-4 border text-center">{order.id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderList;
