import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md space-y-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">403</h1>
          <p className="mt-2 text-lg font-semibold text-gray-800">Không có quyền truy cập</p>
          <p className="mt-2 text-sm text-gray-600">Bạn không có quyền xem trang này. Vui lòng quay lại hoặc đăng nhập bằng tài khoản có quyền phù hợp.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">Trang chủ</Link>
          <Link to="/login" className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
