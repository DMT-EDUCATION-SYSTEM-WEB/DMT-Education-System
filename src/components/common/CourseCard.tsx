import React from 'react';

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  onClick?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  image,
  onClick,
}) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group"
      onClick={onClick}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover group-hover:brightness-90 transition duration-300"
      />
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition">
          {title}
        </h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-md transition transform hover:scale-110 hover:from-pink-500 hover:to-yellow-500 focus:outline-none">
          Đăng ký ngay
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
