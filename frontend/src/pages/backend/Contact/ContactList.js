import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaEye, FaSync, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import ContactService from '../../../services/ContactService'; // Dịch vụ API cho liên hệ
import { toast } from 'react-toastify';
import { Link, useNavigate,} from 'react-router-dom';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Hàm gọi API để tải danh sách liên hệ
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const result = await ContactService.index(); // Gọi API để lấy danh sách liên hệ
      setContacts(result.contact);
    } catch (error) {
      toast.error('Không thể tải danh sách liên hệ!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(); // Gọi hàm fetchContacts khi component mount
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa liên hệ này?");
    if (confirmDelete) {
      try {
        const response = await ContactService.delete(id); // Gọi API xóa liên hệ
        if (response.status) {
          setContacts(contacts.filter(contact => contact.id !== id));
          toast.success('Xóa liên hệ thành công!');
        } else {
          toast.error(response.message); // Hiển thị thông báo lỗi nếu có
        }
      } catch (error) {
        toast.error('Có lỗi xảy ra khi xóa liên hệ!');
      }
    }
  };
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await ContactService.status(id); // Gọi API cập nhật trạng thái
      if (response.status) {
        setContacts(contacts.map(contact => 
          contact.id === id ? { ...contact, status: currentStatus === 1 ? 2 : 1 } : contact // Cập nhật trạng thái trong danh sách
        ));
        toast.success('Cập nhật trạng thái thành công!');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi cập nhật trạng thái!');
    }
  };
  const handleShow = (id) => {
    navigate(`/admin/contact/show/${id}`); // Điều hướng đến trang chỉnh sửa
  };
  return (
    <div className="container mx-auto mt-5 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-blue-400">Danh sách Liên hệ</h1>
        <div className="flex space-x-2">
          <Link to="/admin/contact/trash" className="bg-red-500 text-white px-3 py-1 rounded inline-flex items-center text-sm">
            <FaTrashAlt className="mr-1" />
            Thùng rác
          </Link>
          <button 
            onClick={fetchContacts} 
            className="bg-blue-500 text-white px-3 py-1 rounded inline-flex items-center text-sm"
          >
            <FaSync className="mr-1" />
            Tải lại
          </button>
      </div>
      </div>
      {loading ? (
        <p>Đang tải liên hệ, vui lòng chờ...</p> // Hiển thị thông báo tải khi đang fetch dữ liệu
      ) : (
        <table className="min-w-full shadow-md rounded-lg bg-white border p-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Tên</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Số điện thoại</th>
              <th className="py-2 px-4 border">Chức vụ</th>
              <th className="py-2 px-4 border">Chức năng</th>
              <th className="py-2 px-4 border">ID</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr key={contact.id}>
                  <td className="py-2 px-4 border text-center">{contact.name}</td>
                  <td className="py-2 px-4 border text-center">
                    {contact.email.replace(/^(.{2})(.*)(@.*)$/, (match, p1, p2, p3) => `${p1}***${p3}`)}
                  </td>
                  <td className="py-2 px-4 border text-center">{contact.phone}</td>
                  <td className="py-2 px-4 border text-center">{contact.title}</td>
                  <td className="py-2 px-4 border text-center w-48">
                  <button
                      className={`py-1 px-2 mx-0.5 text-white rounded-md ${contact.status === 1 ? 'bg-green-500' : 'bg-gray-500'}`}
                      onClick={() => handleToggleStatus(contact.id, contact.status)} // Gọi hàm khi nhấn nút
                    >
                      {contact.status === 1 ? <FaToggleOn className="text-lg" /> : <FaToggleOff className="text-lg" />}
                    </button>
                    <button 
                      className="bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md"
                      onClick={() => handleShow(contact.id)} // Gọi hàm khi nhấn nút chỉnh sửa
                    >
                      <FaEye className="text-lg" />
                    </button>
                    <button 
                      className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md"
                      onClick={() => handleDelete(contact.id)}
                    >
                      <FaTrashAlt className="text-lg" />
                    </button>
                  </td>
                  <td className="py-2 px-4 border text-center">{contact.id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">Không có liên hệ nào</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContactList;
