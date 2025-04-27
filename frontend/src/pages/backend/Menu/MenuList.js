import React, { useState, useEffect } from 'react';
import { FaToggleOn, FaToggleOff, FaEdit, FaTrashAlt, FaPlus, FaSync, FaEye } from 'react-icons/fa';
import MenuService from '../../../services/MenuService'; // Dịch vụ gọi API
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MenuList = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [topics, setTopics] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const fetchMenus = async () => {
    setLoading(true);
    try {
      const result = await MenuService.index(); // Gọi API
      const filteredMenus = Array.isArray(result.list) ? result.list.filter(menu => menu.type === 'page') : [];
      const sortedMenus = filteredMenus.sort((a, b) => a.id - b.id); // Sắp xếp theo ID
      setMenus(sortedMenus);
      
      // Lưu các danh sách khác vào state
      setCategories(result.category ? result.category.sort((a, b) => a.id - b.id) : []);
      setBrands(result.brand ? result.brand.sort((a, b) => a.id - b.id) : []);
      setTopics(result.topic ? result.topic.sort((a, b) => a.id - b.id) : []);
      setPosts(result.post ? result.post.sort((a, b) => a.id - b.id) : []);
    } catch (error) {
      toast.error('Không thể tải danh sách menu!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus(); // Gọi hàm fetchMenus khi component mount
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa menu này?")) {
      try {
        const response = await MenuService.delete(id);
        if (response.status) {
          setMenus(prevMenus => prevMenus.filter(menu => menu.id !== id));
          toast.success('Xóa menu thành công!');
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error('Có lỗi xảy ra khi xóa menu!');
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await MenuService.status(id);
      if (response.status) {
        setMenus(prevMenus => 
          prevMenus.map(menu => 
            menu.id === id ? { ...menu, status: currentStatus === 1 ? 2 : 1 } : menu
          )
        );
        toast.success('Cập nhật trạng thái thành công!');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi cập nhật trạng thái!');
    }
  };
  const handleEdit = (id) => {
    navigate(`/admin/menu/update/${id}`);
  };
  const handleShow = (id) => {
    navigate(`/admin/menu/show/${id}`);
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-blue-400">Danh sách Menu</h1>
        <div className="flex space-x-2">
          <Link to="/admin/add-menu" className="bg-green-500 text-white px-3 py-1 rounded inline-flex items-center text-sm">
            <FaPlus className="mr-1" />
            Thêm
          </Link>
          <Link to="/admin/menus/trash" className="bg-red-500 text-white px-3 py-1 rounded inline-flex items-center text-sm">
            <FaTrashAlt className="mr-1" />
            Thùng rác
          </Link>
          <button 
            onClick={fetchMenus} 
            className="bg-blue-500 text-white px-3 py-1 rounded inline-flex items-center text-sm"
          >
            <FaSync className="mr-1" />
            Tải lại
          </button>
        </div>
      </div>
      {loading ? (
        <p>Đang tải menu, vui lòng chờ...</p>
      ) : (
        <>
          <table className="min-w-full shadow-md rounded-lg bg-white border p-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border"></th>
                <th className="py-2 px-4 border">Tên Menu</th>
                <th className="py-2 px-4 border">Link</th>
                <th className="py-2 px-4 border">Chức năng</th>
                <th className="py-2 px-4 border">ID</th>
              </tr>
            </thead>
            <tbody>
              {menus.length > 0 ? (
                menus.map((menu) => (
                  <tr key={menu.id}>
                    <td className="py-2 px-2 border text-center">
                      <input type="checkbox" />
                    </td>
                    <td className="py-2 px-4 border text-center">{menu.name}</td>
                    <td className="py-2 px-4 border text-center">{menu.link}</td>
                    <td className="py-2 px-4 border text-center w-48">
                      <button
                        className={`py-1 px-2 mx-0.5 text-white rounded-md ${menu.status === 1 ? 'bg-green-500' : 'bg-gray-500'}`}
                        onClick={() => handleToggleStatus(menu.id, menu.status)} 
                      >
                        {menu.status === 1 ? <FaToggleOn className="text-lg" /> : <FaToggleOff className="text-lg" />}
                      </button>
                      <button 
                        className="bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md"
                        onClick={() => handleShow(menu.id)} 
                      >
                        <FaEye className="text-lg" />
                      </button>
                      <button 
                        className="bg-yellow-500 py-1 px-2 mx-0.5 text-white rounded-md"
                        onClick={() => handleEdit(menu.id)} 
                      >
                        <FaEdit className="text-lg" />
                      </button>
                      <button 
                        className="bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md"
                        onClick={() => handleDelete(menu.id)}
                      >
                        <FaTrashAlt className="text-lg" />
                      </button>
                    </td>
                    <td className="py-2 px-4 border text-center">{menu.id}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">Không có menu nào</td>
                </tr>
              )}
            </tbody>
          </table>
          

  <h2 className="text-xl font-bold text-blue-400 mt-5">Danh sách Menu con</h2>
    {/* Hàng cho Categories và Brands */}
      <div className="flex space-x-4 mt-2">
        {/* Bảng cho Categories */}
        <div className="flex-1 shadow-md rounded-lg bg-white border p-6">
          <h3 className="text-lg font-bold text-blue-400">Danh sách Danh mục</h3>
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border text-center">ID</th>
                <th className="py-2 px-4 border text-center">Tên Danh mục</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.id}>
                    <td className="py-2 px-4 border text-center">{category.id}</td>
                    <td className="py-2 px-4 border text-center">{category.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-4">Không có danh mục nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bảng cho Brands */}
        <div className="flex-1 shadow-md rounded-lg bg-white border p-6">
          <h3 className="text-lg font-bold text-blue-400">Danh sách Thương hiệu</h3>
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border text-center">ID</th>
                <th className="py-2 px-4 border text-center">Tên Thương hiệu</th>
              </tr>
            </thead>
            <tbody>
              {brands.length > 0 ? (
                brands.map((brand) => (
                  <tr key={brand.id}>
                    <td className="py-2 px-4 border text-center">{brand.id}</td>
                    <td className="py-2 px-4 border text-center">{brand.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-4">Không có thương hiệu nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hàng cho Topics và Posts */}
      <div className="flex space-x-4 mt-4">
        {/* Bảng cho Topics */}
        <div className="flex-1 shadow-md rounded-lg bg-white border p-6">
          <h3 className="text-lg font-bold text-blue-400">Danh sách Chủ đề</h3>
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border text-center">ID</th>
                <th className="py-2 px-4 border text-center">Tên Chủ đề</th>
              </tr>
            </thead>
            <tbody>
              {topics.length > 0 ? (
                topics.map((topic) => (
                  <tr key={topic.id}>
                    <td className="py-2 px-4 border text-center">{topic.id}</td>
                    <td className="py-2 px-4 border text-center">{topic.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-4">Không có chủ đề nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bảng cho Posts */}
        <div className="flex-1 shadow-md rounded-lg bg-white border p-6">
          <h3 className="text-lg font-bold text-blue-400">Danh sách Bài viết</h3>
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border text-center">ID</th>
                <th className="py-2 px-4 border text-center">Tên Bài viết</th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.id}>
                    <td className="py-2 px-4 border text-center">{post.id}</td>
                    <td className="py-2 px-4 border text-center">{post.title}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-4">Không có bài viết nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
        </>
      )}
    </div>
  );
};

export default MenuList;
