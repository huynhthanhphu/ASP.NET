import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [user, setUser] = useState({
    name: localStorage.getItem('customer_name'),
    email: localStorage.getItem('customer_email'),
    phone: localStorage.getItem('customer_phone'),
    address: localStorage.getItem('customer_address') || '', // Default to empty if not available
  });
  const [address, setAddress] = useState(user.address);
  const [loading, setLoading] = useState(false);

  // Calculate total amount
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Handle placing the order
  const handlePlaceOrder = async () => {
    if (!user || !address || cart.length === 0) {
      alert("Incomplete information or empty cart.");
      return;
    }

    setLoading(true);

    const orderData = {
      user_id: localStorage.getItem('customer_id'),
      email: user.email,
      name: user.name,
      phone: user.phone,
      address: user.address,  // Send address input by user
      cart,
      total_amount: totalAmount,
    };

    try {
      const response = await axios.post('/api/orders', orderData);
      if (response.data.success) {
        alert("Order placed successfully!");
        localStorage.removeItem('cart');
        navigate('/orders'); // Redirect to orders page
      } else {
        alert("Order failed. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-center text-2xl font-semibold mb-4">Confirm Order</h2>

      <div className="mb-4">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>

        {/* Address input field */}
        <div>
          <label htmlFor="address" className="block text-sm font-semibold mb-2">Address</label>
          <input 
            type="text"
            id="address"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-2">Total: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}</h3>

      <button
        className={`px-6 py-2 bg-blue-500 text-white rounded ${loading ? 'opacity-50' : 'hover:bg-blue-600'}`}
        onClick={handlePlaceOrder}
        disabled={loading}
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
};

export default CheckoutPage;
