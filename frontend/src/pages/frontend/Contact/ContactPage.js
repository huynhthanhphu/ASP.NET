import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Toast from 'react-simple-toasts';
import ContactService from '../../../services/ContactService';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Kiểm tra các trường không để trống
    if (!name || !email || !phone || !message) {
      alert("Vui lòng điền tất cả các trường.");
      return;
    }
  
    // Lấy user_id từ localStorage
    const userId = localStorage.getItem("customer_id");
    const contactData = {
      name,
      email,
      phone,
      title: 'Liên hệ từ khách hàng',
      content: message,
      replay_id: userId,
      user_id: userId,
      status: 1,
    };
  
    try {
      const response = await ContactService.insert(contactData);
      if (response.status) {
        Toast('Tin nhắn của bạn đã được gửi thành công!');
        // Reset form
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        Toast('Không thể gửi tin nhắn. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Lỗi khi gửi tin nhắn:', error);
      Toast('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };
  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-6xl mx-auto my-10">
      <h1 className="text-4xl text-center font-bold text-black mb-6" style={{ fontFamily: 'Dancing Script' }}>
        Liên Hệ Chúng Tôi
      </h1>
      <div className="mt-10 text-center flex flex-col md:flex-row justify-around">
        <div className="flex items-center space-x-2 mb-2">
          <FaMapMarkerAlt className="text-blue-600" />
          <span className="text-black text-2xl font-semibold">198 Đỗ Xuân Hợp, Tp.HCM</span>
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <FaPhone className="text-blue-600" />
          <span className="text-black text-2xl font-semibold">+84 123 456 789</span>
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <FaEnvelope className="text-blue-600" />
          <span className="text-black text-2xl font-semibold">email@example.com</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full h-100">
          <iframe
            title="Bản đồ vị trí"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8152180678266!2d105.80819901483003!3d21.039336685940962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b56e98d289%3A0xd65554a5b2ada14a!2s198%20%C4%90%E1%BB%97%20Xu%C3%A2n%20H%E1%BB%A3p!5e0!3m2!1svi!2s!4v1684782260841!5m2!1svi!2s"
            className="w-full h-full border-0 rounded-md shadow-md"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
        <div className="w-full">
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div>
              <label htmlFor="name" className="block text-black font-medium mb-2">Tên của bạn</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-md py-2 px-4 w-full"
                placeholder="Nhập tên của bạn"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-black font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-md py-2 px-4 w-full"
                placeholder="Nhập email của bạn"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-black font-medium mb-2">Số điện thoại</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border rounded-md py-2 px-4 w-full"
                placeholder="Nhập số điện thoại của bạn"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-black font-medium mb-2">Tin nhắn</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border rounded-md py-2 px-4 w-full h-32"
                placeholder="Nhập tin nhắn của bạn"
                required
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
              Gửi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
