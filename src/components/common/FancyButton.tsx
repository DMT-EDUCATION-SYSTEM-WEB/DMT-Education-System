import React from 'react';

interface FancyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const FancyButton: React.FC<FancyButtonProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:from-pink-500 hover:to-yellow-400 focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
};

export default FancyButton;
