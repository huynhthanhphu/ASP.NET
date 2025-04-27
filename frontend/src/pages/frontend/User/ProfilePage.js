import React, { useEffect, useState } from "react";
import UserService from "../../../services/UserService";
import { useParams, useNavigate } from "react-router-dom";
import { MailIcon, PhoneIcon, MapPinIcon, EditIcon } from "lucide-react";

const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getUserId = () => localStorage.getItem("customer_id");

  useEffect(() => {
    const storedUserId = getUserId();
    if (!storedUserId) {
      navigate("/dang-nhap");
    } else {
      const fetchUserData = async () => {
        try {
          const response = await UserService.customer_profile(id);
          if (response.status) {
            setUser(response.user);
          } else {
            setError(response.message);
          }
        } catch (err) {
          setError("Có lỗi xảy ra khi tải dữ liệu.");
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [id, navigate]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl text-center font-bold text-black mb-6" style={{ fontFamily: 'Dancing Script' }}>Thông tin người dùng</h1>
      <div className="bg-gradient-to-r bg-gray-400 p-8 rounded-lg shadow-xl text-white mb-8">
        <div className="flex items-center">
          <img
            src={user.image || "/path/to/default-image.jpg"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-md"
          />
          <div className="ml-8">
            <h1 className="text-4xl font-bold">{user.fullname}</h1>
            <p className="text-lg italic">{user.roles.toUpperCase()}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center">
            <MailIcon className="w-6 h-6 mr-3 text-white" />
            <p className="text-lg"><strong>Email:</strong> {user.email}</p>
          </div>

          <div className="flex items-center">
            <PhoneIcon className="w-6 h-6 mr-3 text-white" />
            <p className="text-lg"><strong>Phone:</strong> {user.phone}</p>
          </div>
          
          <div className="flex items-center mt-6">
            <MapPinIcon className="w-6 h-6 mr-3 text-white" />
            <p className="text-lg"><strong>Địa chỉ:</strong> {user.address || "Chưa cập nhật"}</p>
          </div>

          <div className="flex items-center ">
            <EditIcon className="w-6 h-6 mr-3 text-white" />
            <button
              onClick={() => navigate(`/customer/update/${id}`)}
              className="text-lg font-semibold text-white underline hover:text-blue-200"
            >
              Cập nhật thông tin
            </button>
          </div>

          
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md text-gray-800">
          <h3 className="text-2xl font-semibold mb-4">Thông tin khác</h3>
          <ul className="list-disc list-inside">
            <li><strong>ID Người dùng:</strong> {user.id}</li>
            <li><strong>Ngày tham gia:</strong> {new Date(user.created_at).toLocaleDateString()}</li>
            <li><strong>Cập nhật lần cuối:</strong> {new Date(user.updated_at).toLocaleDateString()}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
