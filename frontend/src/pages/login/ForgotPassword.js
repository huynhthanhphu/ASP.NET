import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import httpAxios from "../../services/httpAxios";

const ForgotPassword = () => {
  // Lấy email từ localStorage nếu có, hoặc để trống
  const [email, setEmail] = useState(localStorage.getItem("reset_email") || "");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Hàm xử lý thay đổi email
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Hàm xử lý gửi yêu cầu quên mật khẩu
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Gửi yêu cầu đến API forgot-password
      const response = await httpAxios.post("/forgot-password", { email });

      if (response.status) {
        setMessage("Đã gửi yêu cầu thay đổi mật khẩu. Vui lòng kiểm tra email của bạn.");
        setError("");

        // Lấy link reset từ response của backend
        const resetLink = response.reset_link;

        // Chuyển hướng đến trang reset-password với token
        navigate(`/reset-password/${resetLink.split("/").pop()}`);
      } else {
        setError(response.message || "Đã có lỗi xảy ra!");
        setMessage("");
      }
    } catch (err) {
      setMessage("");
      if (err.response && err.response.data) {
        setError(err.response.message || "Đã có lỗi xảy ra!");
      } else {
        setError("Lỗi kết nối đến server!");
      }
    }
  };

  // Tự động lưu email vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem("reset_email", email);
  }, [email]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-400 to-purple-400">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-medium text-center text-gray-800 mb-8">Quên Mật Khẩu</h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {message && <p className="text-green-600 text-center mb-4">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-600 mb-2">Nhập email của bạn:</label>
            <input
              type="email"
              name="email"
              placeholder="Nhập email của bạn"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            Gửi yêu cầu
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
