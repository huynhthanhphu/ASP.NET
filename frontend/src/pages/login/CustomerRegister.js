import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import "toastr/build/toastr.min.css";
import toastr from "toastr";

const CustomerRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    fullname: "",
    password: "",
    confirmPassword: "",
    gender: "male",
    phone: "",
    address: "",
    image: null,
    status: 1,
    roles: "customer",
  });
  const [error, setError] = useState("");

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Handle registration submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Check password confirmation
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    // Check for phone number and address
    if (!formData.phone || !formData.address) {
      setError("Số điện thoại và địa chỉ không được để trống!");
      return;
    }

    // Prepare data for submission
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await UserService.customer_register(formDataToSend);
      if (response.status) {
        toastr.success(response.message, "Thành công");
        navigate("/dang-nhap");
      } else {
        toastr.error(response.message, "Lỗi");
      }
    } catch (err) {
      setError("Đã có lỗi xảy ra khi đăng ký!");
      console.error(err);
    }
  };

  // Form UI
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-400 to-purple-400">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-2xl mt-8 mb-8">
        <h2 className="text-3xl font-medium text-center text-gray-800 mb-8" style={{ fontFamily: 'Dancing Script' }}>
          Đăng Ký Người Dùng
        </h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleRegister} className="grid grid-cols-2 gap-6">
          {/* User Name */}
          <InputField
            label="Tên người dùng"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          {/* Email */}
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Full Name */}
          <InputField
            label="Họ và tên"
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
          />

          {/* Password */}
          <InputField
            label="Mật khẩu"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          {/* Confirm Password */}
          <InputField
            label="Xác nhận mật khẩu"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {/* Phone Number */}
          <InputField
            label="Số điện thoại"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          {/* Address */}
          <InputField
            label="Địa chỉ"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          {/* Image Upload */}
          <div className="mb-6 col-span-2">
            <label className="block text-gray-600 mb-2">Hình ảnh:</label>
            <div className="flex justify-center items-center">
              <div className="w-32 h-32 border-4 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-100">
                {formData.image ? (
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-400">Chưa chọn ảnh</span>
                )}
              </div>
            </div>
            <input
              type="file"
              name="image"
              className="mt-2"
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Đăng Ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Input Field Component
const InputField = ({ label, type, name, value, onChange }) => (
  <div>
    <label className="block text-gray-600 mb-2">{label}:</label>
    <input
      type={type}
      name={name}
      placeholder={`Nhập ${label.toLowerCase()}`}
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default CustomerRegister;
