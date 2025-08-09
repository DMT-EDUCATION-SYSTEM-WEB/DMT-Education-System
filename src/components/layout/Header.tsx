import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary-600 text-white text-sm font-bold">D</span>
                    <h1 className="text-lg font-semibold text-gray-900">DMT Education</h1>
                </div>
                <nav className="hidden md:block">
                    <ul className="flex items-center gap-6 text-sm text-gray-700">
                        <li>
                            <NavLink exact to="/" activeClassName="active" className="hover:text-primary-700">Trang chủ</NavLink>
                        </li>
                        <li>
                            <NavLink to="/students/dashboard" activeClassName="active" className="hover:text-primary-700">Học sinh</NavLink>
                        </li>
                        <li>
                            <NavLink to="/courses/catalog" activeClassName="active" className="hover:text-primary-700">Khóa học</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/dashboard" activeClassName="active" className="hover:text-primary-700">Quản trị</NavLink>
                        </li>
                        <li>
                            <NavLink to="/support/tickets" activeClassName="active" className="hover:text-primary-700">Hỗ trợ</NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="flex items-center gap-3">
                    <NavLink to="/login" className="btn btn-outline" activeClassName="active">Đăng nhập</NavLink>
                </div>
            </div>
        </header>
    );
};

export default Header;