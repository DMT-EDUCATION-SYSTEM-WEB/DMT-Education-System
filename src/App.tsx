import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50">
      {/* Header Navigation */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-red-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 bg-gradient-to-r from-red-400 to-rose-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DMT</span>
                </div>
                <span className="ml-2 text-lg font-bold text-gray-800">DMT Education</span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#home" className="text-gray-600 hover:text-red-500 px-3 py-2 text-sm font-medium transition">Trang chủ</a>
              <a href="#courses" className="text-gray-600 hover:text-red-500 px-3 py-2 text-sm font-medium transition">Khóa học</a>
              <a href="#teachers" className="text-gray-600 hover:text-red-500 px-3 py-2 text-sm font-medium transition">Giảng viên</a>
              <a href="#achievements" className="text-gray-600 hover:text-red-500 px-3 py-2 text-sm font-medium transition">Thành tựu</a>
              <a href="#contact" className="text-gray-600 hover:text-red-500 px-3 py-2 text-sm font-medium transition">Liên hệ</a>
            </nav>
            <div className="flex items-center space-x-3">
              <button className="text-gray-600 hover:text-red-500 px-3 py-2 text-sm font-medium transition">
                Đăng nhập
              </button>
              <button className="bg-gradient-to-r from-red-400 to-rose-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-red-500 hover:to-rose-600 transition shadow-md">
                Đăng ký ngay
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden py-16 lg:py-20">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-left">
              <div className="mb-5">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">
                  <span className="mr-2">🎓</span>
                  Học viện hàng đầu Việt Nam
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-5">
                <span className="text-red-500">DMT Education</span><br />
                Học viện Đào tạo<br />
                <span className="text-rose-500">Tư duy & Sáng tạo</span>
              </h1>
              <p className="text-base text-gray-600 mb-6 leading-relaxed">
                Phương pháp giáo dục tiên tiến, giúp học sinh phát triển tư duy logic, 
                sáng tạo và kỹ năng giải quyết vấn đề một cách hiệu quả.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-gradient-to-r from-red-400 to-rose-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-500 hover:to-rose-600 transition shadow-lg text-sm">
                  Khám phá phương pháp
                </button>
                <button className="border-2 border-red-200 text-red-600 px-6 py-3 rounded-xl font-semibold hover:border-red-300 hover:bg-red-50 transition text-sm">
                  Xem khóa học
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-5 transform rotate-2 hover:rotate-0 transition-transform">
                    <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                      <span className="text-red-500 text-lg">📚</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">Học Online</h3>
                    <p className="text-xs text-gray-600">Học mọi lúc, mọi nơi</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-5 transform -rotate-2 hover:rotate-0 transition-transform">
                    <div className="h-10 w-10 bg-rose-100 rounded-lg flex items-center justify-center mb-3">
                      <span className="text-rose-500 text-lg">👥</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">Học Offline</h3>
                    <p className="text-xs text-gray-600">Tương tác trực tiếp</p>
                  </div>
                </div>
                <div className="space-y-3 mt-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-5 transform rotate-1 hover:rotate-0 transition-transform">
                    <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                      <span className="text-green-500 text-lg">🏆</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">Chứng chỉ</h3>
                    <p className="text-xs text-gray-600">Được công nhận</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-5 transform -rotate-1 hover:rotate-0 transition-transform">
                    <div className="h-10 w-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
                      <span className="text-yellow-500 text-lg">⚡</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">Tư duy nhanh</h3>
                    <p className="text-xs text-gray-600">Phát triển logic</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section id="teachers" className="py-14 bg-gradient-to-br from-red-50 to-rose-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              Đội ngũ giảng viên
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Các chuyên gia giáo dục hàng đầu với nhiều năm kinh nghiệm và tâm huyết
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Teacher 1 */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="relative mb-4">
                <div className="h-20 w-20 bg-gradient-to-br from-red-400 to-rose-500 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-white text-xl font-bold">TS</span>
                </div>
                <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">TS. Nguyễn Minh Hùng</h3>
              <p className="text-red-500 font-medium text-sm mb-2">Chuyên gia Toán học</p>
              <p className="text-gray-600 text-sm mb-3">15+ năm kinh nghiệm, Tiến sĩ Toán học ĐH Quốc gia</p>
              <div className="flex justify-center space-x-1 mb-3">
                {[1,2,3,4,5].map(star => (
                  <span key={star} className="text-yellow-400 text-sm">⭐</span>
                ))}
              </div>
              <div className="text-xs text-gray-500">
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full mr-1">Toán THPT</span>
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full">Logic</span>
              </div>
            </div>

            {/* Teacher 2 */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="relative mb-4">
                <div className="h-20 w-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-white text-xl font-bold">TH</span>
                </div>
                <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">ThS. Trần Hồng Linh</h3>
              <p className="text-rose-500 font-medium text-sm mb-2">Chuyên gia Ngữ văn</p>
              <p className="text-gray-600 text-sm mb-3">12+ năm kinh nghiệm, Thạc sĩ Văn học ĐH Sư phạm</p>
              <div className="flex justify-center space-x-1 mb-3">
                {[1,2,3,4,5].map(star => (
                  <span key={star} className="text-yellow-400 text-sm">⭐</span>
                ))}
              </div>
              <div className="text-xs text-gray-500">
                <span className="bg-rose-100 text-rose-700 px-2 py-1 rounded-full mr-1">Văn THCS</span>
                <span className="bg-rose-100 text-rose-700 px-2 py-1 rounded-full">Sáng tạo</span>
              </div>
            </div>

            {/* Teacher 3 */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="relative mb-4">
                <div className="h-20 w-20 bg-gradient-to-br from-pink-400 to-red-500 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-white text-xl font-bold">CN</span>
                </div>
                <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">CN. Lê Quốc Nam</h3>
              <p className="text-pink-500 font-medium text-sm mb-2">Chuyên gia Tiếng Anh</p>
              <p className="text-gray-600 text-sm mb-3">10+ năm kinh nghiệm, Cử nhân Cambridge, IELTS 8.5</p>
              <div className="flex justify-center space-x-1 mb-3">
                {[1,2,3,4,5].map(star => (
                  <span key={star} className="text-yellow-400 text-sm">⭐</span>
                ))}
              </div>
              <div className="text-xs text-gray-500">
                <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full mr-1">IELTS</span>
                <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full">Speaking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Achievements Section */}
      <section id="achievements" className="py-14 bg-white/70 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              Thành tựu học sinh nổi bật
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Những học sinh xuất sắc đã đạt được nhiều thành tích đáng tự hào
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Achievement 1 */}
            <div className="text-center">
              <div className="relative mb-4">
                <div className="h-16 w-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl">🏅</span>
                </div>
                <div className="absolute -top-1 -right-1 h-6 w-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Nguyễn Minh Anh</h3>
              <p className="text-red-500 font-medium text-sm mb-2">Giải Nhất Olympic Toán</p>
              <p className="text-gray-600 text-xs">Lớp 12A1 - 2024</p>
            </div>

            {/* Achievement 2 */}
            <div className="text-center">
              <div className="relative mb-4">
                <div className="h-16 w-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mx-auto flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl">💻</span>
                </div>
                <div className="absolute -top-1 -right-1 h-6 w-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Lê Quang Huy</h3>
              <p className="text-red-500 font-medium text-sm mb-2">Giải Nhì Tin học trẻ</p>
              <p className="text-gray-600 text-xs">Lớp 11B2 - 2024</p>
            </div>

            {/* Achievement 3 */}
            <div className="text-center">
              <div className="relative mb-4">
                <div className="h-16 w-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mx-auto flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl">🌟</span>
                </div>
                <div className="absolute -top-1 -right-1 h-6 w-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Trần Thị Mai</h3>
              <p className="text-red-500 font-medium text-sm mb-2">IELTS 8.5</p>
              <p className="text-gray-600 text-xs">Lớp 10A3 - 2024</p>
            </div>

            {/* Achievement 4 */}
            <div className="text-center">
              <div className="relative mb-4">
                <div className="h-16 w-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl">📖</span>
                </div>
                <div className="absolute -top-1 -right-1 h-6 w-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🏆</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Phạm Văn Nam</h3>
              <p className="text-red-500 font-medium text-sm mb-2">Giải Văn học trẻ QG</p>
              <p className="text-gray-600 text-xs">Lớp 9A1 - 2024</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-gradient-to-r from-red-100 to-rose-100 rounded-xl p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">98%</div>
              <div className="text-sm text-gray-600">Tỷ lệ đỗ đại học</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">150+</div>
              <div className="text-sm text-gray-600">Giải thưởng học thuật</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">5000+</div>
              <div className="text-sm text-gray-600">Học sinh tốt nghiệp</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">15+</div>
              <div className="text-sm text-gray-600">Năm kinh nghiệm</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-14 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-100 to-rose-100 rounded-3xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Truy cập hệ thống</h3>
              <p className="text-gray-600">Đăng nhập để trải nghiệm đầy đủ các tính năng</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-md mx-auto">
              <button className="bg-gradient-to-r from-red-400 to-rose-500 text-white px-4 py-3 rounded-xl font-semibold hover:from-red-500 hover:to-rose-600 transition shadow-lg text-sm">
                <div className="flex items-center justify-center">
                  <span className="mr-2">👨‍🎓</span>
                  Học sinh
                </div>
              </button>
              <button className="bg-gradient-to-r from-rose-400 to-pink-500 text-white px-4 py-3 rounded-xl font-semibold hover:from-rose-500 hover:to-pink-600 transition shadow-lg text-sm">
                <div className="flex items-center justify-center">
                  <span className="mr-2">👩‍🏫</span>
                  Giảng viên
                </div>
              </button>
              <button className="bg-gradient-to-r from-pink-400 to-red-500 text-white px-4 py-3 rounded-xl font-semibold hover:from-pink-500 hover:to-red-600 transition shadow-lg text-sm">
                <div className="flex items-center justify-center">
                  <span className="mr-2">⚙️</span>
                  Quản trị
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-gradient-to-r from-red-400 to-rose-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DMT</span>
                </div>
                <span className="ml-2 text-lg font-bold">DMT Education</span>
              </div>
              <p className="text-gray-400 mb-4 text-sm">
                Học viện Đào tạo Tư duy & Sáng tạo hàng đầu Việt Nam.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4">Liên kết nhanh</h3>
              <ul className="space-y-2">
                <li><a href="#courses" className="text-gray-400 hover:text-white transition text-sm">Khóa học</a></li>
                <li><a href="#teachers" className="text-gray-400 hover:text-white transition text-sm">Giảng viên</a></li>
                <li><a href="#achievements" className="text-gray-400 hover:text-white transition text-sm">Thành tựu</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition text-sm">Liên hệ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4">Thông tin liên hệ</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>📍 123 Đường ABC, Q.1, TP.HCM</li>
                <li>📞 (028) 1234 5678</li>
                <li>✉️ info@dmteducation.vn</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 DMT Education. Bảo lưu mọi quyền.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;