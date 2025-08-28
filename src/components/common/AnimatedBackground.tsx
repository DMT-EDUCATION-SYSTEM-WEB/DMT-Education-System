import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 animate-gradient bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-80">
      {/* Có thể thêm hiệu ứng particles hoặc hình ảnh động ở đây nếu muốn */}
    </div>
  );
};

export default AnimatedBackground;
