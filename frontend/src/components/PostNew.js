import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import PostService from '../services/PostService'; // Đảm bảo import đúng

const PostNew = ({ limit }) => {
  const [articles, setArticles] = useState([]); // Khởi tạo articles là một mảng rỗng
  const [loading, setLoading] = useState(true); // Thêm state để theo dõi quá trình loading
  const [currentIndex, setCurrentIndex] = useState(0); // State cho chỉ số bài viết hiện tại
  const articlesPerPage = 4; // Số lượng bài viết hiển thị mỗi trang
  const descriptionLimit = 100; // Giới hạn ký tự cho mô tả

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await PostService.fetchNewPosts(8); // Gọi API để lấy bài viết theo limit
        console.log(response); // Kiểm tra dữ liệu nhận được

        // Kiểm tra xem response có chứa posts hay không và là một mảng
        if (response && Array.isArray(response.posts)) {
          setArticles(response.posts);
        } else {
          console.error('Invalid response format', response);
          setArticles([]); // Đặt mảng rỗng nếu dữ liệu không hợp lệ
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setArticles([]); // Đặt mảng rỗng trong trường hợp có lỗi
      } finally {
        setLoading(false); // Đặt loading là false sau khi hoàn tất
      }
    };

    loadPosts();
  }, [limit]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + articlesPerPage >= articles.length ? 0 : prevIndex + articlesPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(articles.length - articlesPerPage, 0) : prevIndex - articlesPerPage
    );
  };

  // Logic hiển thị bài viết
  const displayedArticles = articles.slice(
    currentIndex,
    currentIndex + articlesPerPage
  );

  // Nếu trang cuối cùng có ít hơn articlesPerPage bài viết, lấy các bài viết từ đầu danh sách bù vào
  if (displayedArticles.length < articlesPerPage) {
    const missingItems = articlesPerPage - displayedArticles.length;
    displayedArticles.push(...articles.slice(0, missingItems));
  }

  // Hàm cắt ngắn mô tả
  const truncateDescription = (description) => {
    if (description.length > descriptionLimit) {
      return description.substring(0, descriptionLimit) + '...';
    }
    return description;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto p-4">
      {loading ? (
        <div className="text-center py-10">
          <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-10 h-10 animate-spin mx-auto" />
          <p className="mt-2 text-gray-500">Đang tải bài viết mới...</p>
        </div>
      ) : (
        <>
          <div className="flex">
            {displayedArticles.map((article) => (
              <div key={article.id} className="w-1/4 px-2 flex">
                <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
                  <img
                    src={article.thumbnail || './images/post/baiviet04.webp'}
                    alt="img"
                    className="w-full h-48 object-cover" // Đặt chiều cao cố định cho hình ảnh
                  />
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{truncateDescription(article.description)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow">
            <ChevronLeftIcon className="w-6 h-6"/>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow">
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  );
};

export default PostNew;
