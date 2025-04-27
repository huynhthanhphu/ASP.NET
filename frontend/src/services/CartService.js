import httpAxios from "./httpAxios"; // Nếu bạn đang sử dụng cấu hình axios tùy chỉnh

const CartService = {
  // Lấy giỏ hàng của người dùng
  getCartByUserId: (userId) => {
    return httpAxios.get(`/cart/${userId}`); // Sử dụng httpAxios để gọi API
  },

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart: (userId, productId) => {
    return httpAxios.delete(`/cart/${userId}/remove/${productId}`); // Sử dụng httpAxios
  },

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateQuantity: (userId, productId, quantity) => {
    return httpAxios.put(`/cart/${userId}/update/${productId}`, { quantity }); // Sử dụng httpAxios
  }
};

export default CartService;
