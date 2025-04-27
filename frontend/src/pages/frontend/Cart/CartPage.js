import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, Plus, Minus } from 'lucide-react';

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    const storedSelectedItems = JSON.parse(localStorage.getItem('selectedItems'));
    
    if (storedSelectedItems && storedSelectedItems.length <= cart.length) {
      const newSelections = cart.map((_, i) => storedSelectedItems[i] ?? true);
      setSelectedItems(newSelections);
    } else {
      setSelectedItems(cart.map(() => true));
    }
  }, [cart]);
  useEffect(() => {
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
  }, [selectedItems]);

  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    const updatedSelectedItems = [...selectedItems];
    updatedSelectedItems.splice(index, 1);
    setSelectedItems(updatedSelectedItems);
    localStorage.setItem('selectedItems', JSON.stringify(updatedSelectedItems));
    window.location.reload();
  };

  const handleQuantityChange = (index, change) => {
    const updatedCart = [...cart];
    const newQuantity = updatedCart[index].quantity + change;
    if (newQuantity >= 1) {
      updatedCart[index].quantity = newQuantity;
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const totalAmount = cart.reduce((sum, item, index) => {
    if (selectedItems[index]) {
      return sum + item.price * item.quantity;
    }
    return sum;
  }, 0);

  return (
    <div className="container mx-auto px-4 py-1">
      <h2 className="icon-text text-center font-sofia italic text-5xl mb-1 py-3"style={{ fontFamily: 'Dancing Script' }}>Giỏ hàng</h2>
      {cart.length > 0 ? (
        <div className="overflow-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-2 py-2 border-b text-center">Chọn</th>
                <th className="px-2 py-2 border-b">Hình</th>
                <th className="px-1 py-2 border-b">Tên sản phẩm</th>
                <th className="px-2 py-2 border-b">Size</th>
                <th className="px-2 py-2 border-b">Số lượng</th>
                <th className="px-2 py-2 border-b">Giá</th>
                <th className="px-2 py-2 border-b">Thành tiền</th>
                <th className="px-2 py-2 border-b">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td className="px-2 py-1 text-center">
                    <input 
                      type="checkbox" 
                      className="form-checkbox" 
                      checked={selectedItems[index]} 
                      onChange={(e) => {
                        const updatedSelectedItems = [...selectedItems];
                        updatedSelectedItems[index] = e.target.checked;
                        setSelectedItems(updatedSelectedItems);
                      }}
                    />
                  </td>
                  <td className="px-2 py-1 text-center">
                    <img 
                      src={item.image || '/path/to/default-image.jpg'} 
                      alt={item.name} 
                      className="w-24 h-24 object-contain"
                    />
                  </td>
                  <td className="px-2 py-1 text-left">{item.name}</td>
                  <td className="px-2 py-1 text-center">{item.size}</td>
                  <td className="px-2 py-1 text-center">
                    <div className="flex items-center justify-center">
                      <button
                        className="p-1 hover:text-black transition"
                        onClick={() => handleQuantityChange(index, -1)}>
                        <Minus size={16} />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="p-1 hover:text-black transition"
                        onClick={() => handleQuantityChange(index, 1)}>
                        <Plus size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="px-2 py-1 text-center">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                  </td>
                  <td className="px-2 py-1 text-center">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
                  </td>
                  <td className="px-2 py-1 text-center">
                    <button
                      className="text-red-500 hover:text-red-600 transition"
                      onClick={() => handleRemoveFromCart(index)}>
                      <XCircle size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className=" border-t">
              <tr>
                <td colSpan="6" className="px-2 py-2 text-right font-semibold">Tổng cộng:</td>
                <td className="px-2 py-1 text-center font-semibold">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">Giỏ hàng trống.</p>
      )}
      <div className="flex justify-end mt-6">
        <button
          className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
          onClick={handleCheckout}>
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default CartPage;