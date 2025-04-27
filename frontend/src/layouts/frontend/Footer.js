import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    // Dữ liệu cứng cho menu
    const menuList = [
        { id: 1, name: 'Trang chủ', link: '/' },
        { id: 2, name: 'Giới thiệu', link: '/gioi-thieu' },
        { id: 3, name: 'Sản phẩm', link: '/san-pham' },
        { id: 4, name: 'Bài viết', link: '/bai-viet' },
        { id: 5, name: 'Liên hệ', link: '/lien-he' }
    ];

    return (
        <footer className="footer bg-gray-50 text-black py-5">
            <div className="mx-auto px-4">
                <p className="footer-thank font-['Sofia'] font-italic text-6xl font-bold text-center mb-10" style={{ fontFamily: 'Dancing Script' }}>Thank You</p>
                <div className="footer-main border-b border-gray-300 flex flex-wrap justify-between">
                    <div className="flex-1 min-w-[200px] mb-8 px-3">
                        <h5 className="title-footer font-bold mb-3">Chúng tôi là ai?</h5>
                        <ul className="space-y-1">
                            <li>Công ty TNHH thời trang ChupapiHouse</li>
                            <li>ChupapiHouse đang trong giai đoạn phát triển mạnh với nhiều mặt hàng phong phú giá cả cạnh tranh, mong muốn đem đến chất lượng tốt nhất cho khách hàng.</li>
                            <li>Địa chỉ: 222/4 Chùa Bộc, Đống Đa, Hà Nội</li>
                            <li>Điện thoại:
                                <a className="phone hover:text-orange-500" href="tel:19000969">1900 0969</a>
                                <br />Email:
                                <a className="email hover:text-orange-500" href="mailto:support@gmail.com">support@gmail.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Phần Chính sách */}
                    <div className="flex-1 min-w-[200px] mb-8 px-10">
                        <h5 className="font-bold mb-3">Chính sách</h5>
                        <ul className="space-y-1">
                            {menuList.map((menu, index) => (
                                <li key={index}>
                                    <Link to={menu.link} className="hover:text-orange-500">
                                        {menu.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex-1 min-w-[200px] mb-8 px-3">
                        <h5 className="title-footer font-bold mb-3">Hỗ trợ</h5>
                        <ul className="space-y-1 footer-menu">
                            <li><Link to="#" className="hover:text-orange-500">Chính sách giao hàng</Link></li>
                            <li><Link to="#" className="hover:text-orange-500">Chính sách bảo mật</Link></li>
                            <li><Link to="#" className="hover:text-orange-500">Chính sách đổi trả</Link></li>
                            <li><Link to="#" className="hover:text-orange-500">Chính sách thanh toán</Link></li>
                        </ul>
                    </div>

                    <div className="flex-1 min-w-[200px] mb-8 px-4">
                        <h5 className="title-footer font-bold mb-3 px-3">Dịch vụ hỗ trợ</h5>
                        <img src="/images/payment.webp" alt="payment" className="w-auto h-auto" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
                    <div>
                        <h5 className="title-footer font-bold mb-6 px-3">Mạng xã hội</h5>
                        <div className="social flex gap-4">
                            <a href="https://www.facebook.com/profile.php?id=100034685322168" className="social-button facebook border border-danger rounded-full p-2 hover:bg-danger hover:text-white" title="Facebook">
                                <i className="fa-brands fa-facebook-f text-blue-600"></i>
                            </a>
                            <a href="https://www.instagram.com/__phusz.1901/" className="social-button instagram border border-danger rounded-full p-2 hover:bg-danger hover:text-white" title="Instagram">
                                <i className="fa-brands fa-instagram text-pink-500"></i>
                            </a>
                            <a href="https://google.com.vn" className="social-button google border border-danger rounded-full p-2 hover:bg-danger hover:text-white" title="Google">
                                <i className="fa-brands fa-google text-blue-600"></i>
                            </a>
                            <a href="https://www.youtube.com/@_HuynhThanhPhu_A" className="social-button youtube border border-danger rounded-full p-2 hover:bg-danger hover:text-white" title="Youtube">
                                <i className="fa-brands fa-youtube text-red-600"></i>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h5 className="title-footer font-bold mb-6">Nhập tin khuyến mãi</h5>
                        <div className="input-group">
                            <input type="text" className="flex-1 px-2 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-danger" placeholder="Nhập email của bạn" />
                            <button className="bg-danger text-white rounded-r-md px-4 py-2 bg-red-600">ĐĂNG KÝ</button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
