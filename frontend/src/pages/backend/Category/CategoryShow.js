import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoryService from '../../../services/CategoryService';
import { FaArrowLeft } from 'react-icons/fa';

const CategoryShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await CategoryService.show(id);
        if (response.status) {
          setCategory(response.category);
        } else {
          toast.error(response.message || 'Không tìm thấy dữ liệu');
        }
      } catch (error) {
        console.error('Error fetching category:', error);
        toast.error('Lỗi khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  const handleGoBack = () => {
    navigate('/admin/categories');
  };

  if (loading) {
    return <p className="text-center mt-10">Đang tải...</p>;
  }

  if (!category) {
    return <p className="text-center mt-10 text-red-500">Không tìm thấy dữ liệu</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-12">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">Chi tiết Danh mục</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Tên danh mục:</span>
          <span className="text-gray-800">{category.name}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Mô tả:</span>
          <span className="text-gray-800">{category.description}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 font-semibold">Thứ tự sắp xếp:</span>
          <span className="text-gray-800">{category.sort_order}</span>
        </div>
        <div className="flex flex-col space-y-1">
        <span className="text-gray-500 font-semibold">Trạng thái:</span>
          <span className={`font-semibold ${category.status === 1 ? 'text-green-500' : 'text-gray-500'}`}>
            {category.status === 1 ? 'Xuất bản' : 'Chưa xuất bản'}
          </span>
        </div>
        {category.image && (
          <div className="col-span-2 flex justify-center mt-6">
            <img
              src={category.image}
              alt={category.name}
              className="w-auto h-auto object-cover rounded-lg shadow-md"
            />
          </div>
        )}
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

export default CategoryShow;
