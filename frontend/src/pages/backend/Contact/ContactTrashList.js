import React, { useState, useEffect } from 'react';
import { FaTrashRestore, FaTrashAlt } from 'react-icons/fa';
import ContactService from '../../../services/ContactService';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ContactTrashList = () => {
  const [trashedContacts, setTrashedContacts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await ContactService.trash(); // Gọi API để lấy danh sách liên hệ đã xóa mềm
        setTrashedContacts(result.contact); // Giả sử response trả về có thuộc tính contacts
      } catch (error) {
        console.error("Lỗi khi tải danh sách liên hệ trong thùng rác:", error);
        toast.error("Không thể tải danh sách liên hệ đã bị xóa.");
      }
    })();
  }, []);

  // Hàm khôi phục liên hệ
  const handleRestore = async (id) => {
    const confirmRestore = window.confirm("Bạn có chắc chắn muốn phục hồi liên hệ này?");
    if (confirmRestore) {
      try {
        const response = await ContactService.restore(id); // Gọi API phục hồi liên hệ
        if (response.status) {
          setTrashedContacts(trashedContacts.filter(contact => contact.id !== id)); // Cập nhật lại danh sách liên hệ
          toast.success("Khôi phục liên hệ thành công.");
        } else {
          toast.error(response.message || "Khôi phục thất bại.");
        }
      } catch (error) {
        console.error("Lỗi khi khôi phục liên hệ:", error);
        toast.error("Có lỗi xảy ra khi khôi phục liên hệ.");
      }
    }
  };

  // Hàm xóa vĩnh viễn liên hệ
  const handlePermanentDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn liên hệ này?");
    if (confirmDelete) {
      try {
        const response = await ContactService.destroy(id); // Gọi API xóa vĩnh viễn liên hệ
        if (response.status) {
          setTrashedContacts(trashedContacts.filter(contact => contact.id !== id)); // Cập nhật lại danh sách liên hệ
          toast.success("Liên hệ đã được xóa vĩnh viễn.");
        } else {
          toast.error(response.message || "Xóa thất bại.");
        }
      } catch (error) {
        console.error("Lỗi khi xóa vĩnh viễn liên hệ:", error);
        toast.error("Có lỗi xảy ra khi xóa liên hệ.");
      }
    }
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-red-500 flex items-center">
          <FaTrashAlt className="mr-2" /> Thùng rác Liên hệ
        </h1>
        <Link to="/admin/contact" className="bg-blue-500 text-white px-3 py-1 rounded inline-flex items-center text-sm">
          Quay lại danh sách
        </Link>
      </div>
      <table className="min-w-full shadow-md rounded-lg bg-white border p-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border"></th>
            <th className="py-2 px-4 border">Tên</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Tên người dùng</th>
              <th className="py-2 px-4 border">Số điện thoại</th>
              <th className="py-2 px-4 border">Chức vụ</th>
              <th className="py-2 px-4 border">Chức năng</th>
            <th className="py-2 px-4 border">ID</th>
          </tr>
        </thead>
        <tbody>
          {trashedContacts.length === 0 ? (
            <tr>
              <td colSpan="7" className="py-3 text-center text-gray-600">Không có liên hệ nào trong thùng rác.</td>
            </tr>
          ) : (
            trashedContacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-100 transition-colors">
                <td className="py-2 px-2 border text-center">
                  <input type="checkbox" />
                </td>
                <td className="py-2 px-4 border text-center">{contact.name}</td>
                  <td className="py-2 px-4 border text-center">
                    {contact.email.replace(/^(.{2})(.*)(@.*)$/, (match, p1, p2, p3) => `${p1}***${p3}`)}
                  </td>
                  <td className="py-2 px-4 border text-center">{contact.username}</td>
                  <td className="py-2 px-4 border text-center">{contact.phone}</td>
                  <td className="py-2 px-4 border text-center">{contact.title}</td>
                <td className="py-2 px-4 border text-center">
                  <button className="bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md" onClick={() => handleRestore(contact.id)}>
                    <FaTrashRestore className="text-lg" />
                  </button>
                  <button className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md" onClick={() => handlePermanentDelete(contact.id)}>
                    <FaTrashAlt className="text-lg" />
                  </button>
                </td>
                <td className="py-2 px-4 border text-center">{contact.id}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTrashList;
