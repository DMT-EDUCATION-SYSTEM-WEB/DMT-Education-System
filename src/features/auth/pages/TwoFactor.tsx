import React, { useState } from 'react';

const TwoFactor: React.FC = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulate API call for 2FA verification
        try {
            // Replace with actual API call
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (code === '123456') {
                        resolve('Success');
                    } else {
                        reject(new Error('Invalid code'));
                    }
                }, 1000);
            });
            // Handle successful verification
            alert('Two-Factor Authentication successful!');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Two-Factor Authentication</h1>
            <form onSubmit={handleSubmit} className="w-80">
                <div className="mb-4">
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                        Enter the code sent to your device:
                    </label>
                    <input
                        type="text"
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className={`w-full bg-blue-500 text-white font-bold py-2 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Verifying...' : 'Verify'}
                </button>
            </form>
        </div>
    );
};

export default TwoFactor;