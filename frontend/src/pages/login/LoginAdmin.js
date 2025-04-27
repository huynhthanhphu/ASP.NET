import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginService from "../../services/LoginService"; // import đúng service
import "toastr/build/toastr.min.css";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("admin_token")) {
      navigate("/admin");
    }
  }, [navigate]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, password: "" }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await LoginService.login({
        username: formData.username,
        password: formData.password,
        remember: formData.remember,
      });

      if (response.token) {
        localStorage.setItem("admin_token", response.token);
        navigate("/admin");
      } else {
        setError("Đăng nhập thất bại!");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Sai thông tin đăng nhập!");
      } else {
        setError("Đã có lỗi xảy ra!");
      }
    }
  };

  const handleForgotPassword = () => {
    localStorage.setItem("reset_email", formData.username);
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-400 to-purple-400">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-medium text-center text-gray-800 mb-8">Đăng Nhập</h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block text-gray-600 mb-2">Tên đăng nhập:</label>
            <input
              type="text"
              name="username"
              placeholder="Nhập tên đăng nhập"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 mb-2">Mật khẩu:</label>
            <input
              type="password"
              name="password"
              placeholder="Nhập mật khẩu"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                checked={formData.remember}
                onChange={handleChange}
              />
              <label htmlFor="remember" className="ml-2 text-gray-600">
                Nhớ mật khẩu
              </label>
            </div>
            <Link
              to="/forgot-password"
              onClick={handleForgotPassword}
              className="text-green-500 hover:text-green-600"
            >
              Quên mật khẩu?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            Đăng Nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
