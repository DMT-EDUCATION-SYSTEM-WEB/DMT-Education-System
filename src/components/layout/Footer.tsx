import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white text-gray-600 border-t">
            <div className="container mx-auto px-4 py-6 text-center">
                <p>&copy; {new Date().getFullYear()} Trung tâm DMT. Tất cả quyền được bảo lưu.</p>
                <div className="mt-2 space-x-2 text-sm">
                    <a href="/privacy-policy" className="hover:text-primary-700">Chính sách bảo mật</a>
                    <span className="text-gray-300">|</span>
                    <a href="/terms-of-service" className="hover:text-primary-700">Điều khoản dịch vụ</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;