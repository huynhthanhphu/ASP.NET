import React, { useState } from 'react';

const Notfound = () => {
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  const moveButton = () => {
    const maxX = window.innerWidth - 200; // 200 là ước tính chiều rộng của nút
    const maxY = window.innerHeight - 50; // 50 là ước tính chiều cao của nút
    
    setButtonPosition({
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY)
    });
  };

  const handleClick = () => {
    alert('Gotcha! Bạn đã bắt được nút này. Quay lại trang chủ nào!');
    // Trong thực tế, bạn sẽ chuyển hướng người dùng đến trang chủ ở đây
    // window.location.href = '/';
  };
  return (

    <div className="flex items-center justify-center h-screen">
    
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          style={{
            position: 'absolute',
            left: `${buttonPosition.x}px`,
            top: `${buttonPosition.y}px`
          }}
          onMouseEnter={moveButton}
          onClick={handleClick}>
          Quay lại trang chủ
        </button>
    </div>
  );
};

export default Notfound;
