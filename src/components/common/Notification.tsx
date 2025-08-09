import React from 'react';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type = 'info', onClose }) => {
  const bgColor = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700'
  }[type];

  return (
    <div className={`border-l-4 p-4 ${bgColor}`} role="alert">
      <div className="flex">
        <div className="flex-1">
          <p>{message}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-2">
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Notification;
