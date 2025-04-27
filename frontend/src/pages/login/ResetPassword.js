import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import httpAxios from "../../services/httpAxios";

const ResetPassword = () => {
  const { token } = useParams(); // Token từ URL
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra xem mật khẩu và mật khẩu xác nhận có khớp không
    if (password !== passwordConfirm) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      // Gửi dữ liệu đến API với cả password và password_confirmation
      const response = await httpAxios.post(`/reset-password/${token}`, {
        password,
        password_confirmation: passwordConfirm,
      });

      // Kiểm tra phản hồi từ API
      if (response.status) {
        setMessage("Mật khẩu đã được thay đổi thành công!");
        setIsSuccess(true);
      } else {
        setError(response.message || "Đã có lỗi xảy ra!");
      }
    } catch (err) {
      setError("Đã có lỗi xảy ra!");
      setMessage("");
    }
  };

  const handleConfirm = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-400 to-purple-400">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-medium text-center text-gray-800 mb-8">Đặt lại mật khẩu</h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {message && <p className="text-green-600 text-center mb-4">{message}</p>}

        {!isSuccess ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-600 mb-2">Nhập mật khẩu mới:</label>
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu mới"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
                value={password}
                onChange={handleChangePassword}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-600 mb-2">Xác nhận mật khẩu:</label>
              <input
                type="password"
                name="password_confirm"
                placeholder="Xác nhận mật khẩu"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
                value={passwordConfirm}
                onChange={handleChangePasswordConfirm}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              Đặt lại mật khẩu
            </button>
          </form>
        ) : (
          <div className="text-center">
            <button
              onClick={handleConfirm}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              Đồng ý
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
