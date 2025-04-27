import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ContactService from '../../../services/ContactService';
import { FaArrowLeft } from 'react-icons/fa';

const ContactShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await ContactService.show(id); // Gọi API để lấy thông tin liên hệ
        if (response.status) {
          setContact(response.contact);
        } else {
          toast.error(response.message || 'Không tìm thấy dữ liệu');
        }
      } catch (error) {
        console.error('Error fetching contact:', error);
        toast.error('Lỗi khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  const handleGoBack = () => {
    navigate('/admin/contact'); // Điều hướng về danh sách liên hệ
  };

  if (loading) {
    return <p className="text-center mt-10">Đang tải...</p>;
  }

  if (!contact) {
    return <p className="text-center mt-10 text-red-500">Không tìm thấy dữ liệu</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-12">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">Chi tiết Liên hệ</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Tên:</span>
          <span className="text-gray-800">{contact.name}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Email:</span>
          <span className="text-gray-800">{contact.email}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Số điện thoại:</span>
          <span className="text-gray-800">{contact.phone}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Chức vụ:</span>
          <span className="text-gray-800">{contact.title}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Trạng thái:</span>
          <span className={`font-semibold ${contact.status === 1 ? 'text-green-500' : 'text-gray-500'}`}>
            {contact.status === 1 ? 'Đang hoạt động' : 'Ngưng hoạt động'}
          </span>
        </div>
      </div>
      <div className="flex justify-end mt-10">
        <button
          onClick={handleGoBack}
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <FaArrowLeft className="mr-2" /> Quay lại danh sách
        </button>
      </div>
    </div>
  );
};

export default ContactShow;
