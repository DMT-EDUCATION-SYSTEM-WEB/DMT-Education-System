import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
  };

  const demoAccounts = [
    { role: 'Admin', email: 'admin@dmt.edu.vn', password: 'admin123' },
    { role: 'Giáo viên', email: 'teacher@dmt.edu.vn', password: 'teacher123' },
    { role: 'Học sinh', email: 'student@dmt.edu.vn', password: 'student123' },
    { role: 'Phụ huynh', email: 'parent@dmt.edu.vn', password: 'parent123' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Login Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">DMT</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Đăng nhập
            </h1>
            <p className="text-gray-600">
              Trung tâm Giáo dục DMT
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Nhập email của bạn"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12"
                  placeholder="Nhập mật khẩu"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200"
            >
              Đăng nhập
            </button>
          </form>

          {/* Forgot Password */}
          <div className="text-center mt-6">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
              Quên mật khẩu?
            </a>
          </div>
        </div>

        {/* Demo Accounts Card */}
        <div className="mt-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Tài khoản demo
          </h3>
          <div className="space-y-3">
            {demoAccounts.map((account, index) => (
              <div 
                key={index}
                onClick={() => {
                  setEmail(account.email);
                  setPassword(account.password);
                }}
                className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">{account.role}</span>
                  <span className="text-sm text-gray-500">Click để điền</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {account.email}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
