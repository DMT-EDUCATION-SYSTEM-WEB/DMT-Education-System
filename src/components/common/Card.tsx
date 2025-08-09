import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padded?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', padded = true, ...rest }) => {
  return (
    <div className={`card ${className}`} {...rest}>
      <div className={padded ? 'space-y-3' : ''}>{children}</div>
    </div>
  );
};

export default Card;