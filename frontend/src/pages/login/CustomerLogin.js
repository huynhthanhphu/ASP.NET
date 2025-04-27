import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import "toastr/build/toastr.min.css";

const CustomerLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("customer_token");
    const userId = localStorage.getItem("customer_id");

    if (token && userId) {
      navigate(`/customer/${userId}`);
    }
  }, [navigate]);

  // Reset password when component loads
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
      const response = await UserService.customer_login({
        email: formData.email,
        password: formData.password,
        remember: formData.remember,
      });

      if (response.status) {
        // Save the user details to localStorage after successful login
        localStorage.setItem("customer_token", response.token);
        localStorage.setItem("customer_id", response.user.id);
        localStorage.setItem("customer_name", response.user.name);
        localStorage.setItem("customer_email", response.user.email);
        localStorage.setItem("customer_phone", response.user.phone);
        localStorage.setItem("customer_address", response.user.address || '');

        // Reload the page to ensure the user is redirected correctly
        window.location.reload();
      } else {
        setError(response.message || "Login failed!");
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Email does not exist!");
      } else if (err.response && err.response.status === 401) {
        setError("Incorrect password!");
      } else {
        setError("An error occurred!");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-400 to-purple-400">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-medium text-center text-gray-800 mb-8">User Login</h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block text-gray-600 mb-2">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 mb-2">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
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
                Remember me
              </label>
            </div>
            <Link to="/forgot-password" className="text-green-500 hover:text-green-600">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            Login
          </button>
        </form>

        {/* "Don't have an account?" Section */}
        <div className="mt-6 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <Link
            to="/register"
            className="text-green-500 font-semibold hover:text-green-600 transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
