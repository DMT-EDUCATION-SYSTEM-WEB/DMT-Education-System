import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import authService from '../../../services/auth';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../../../store/slices/userSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const userData = await authService.login({ email, password });
            dispatch(loginAction(userData));
            history.push('/students/dashboard');
        } catch (err) {
            setError('Email hoặc mật khẩu không đúng');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-white px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-6">
                    <div className="mx-auto mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600 text-white text-lg font-bold">D</div>
                    <h2 className="text-2xl font-semibold text-gray-900">Đăng nhập DMT</h2>
                    <p className="text-sm text-gray-600">Chào mừng bạn quay lại hệ thống</p>
                </div>
                <div className="card">
                    {error && <p className="error mb-3">{error}</p>}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="form-label" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="form-label" htmlFor="password">Mật khẩu</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-full">Đăng nhập</button>
                    </form>
                    <p className="mt-4 text-sm text-center text-gray-600">
                        Quên mật khẩu? <a href="#" className="text-primary-700 hover:underline">Khôi phục</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;