import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from '../utils/axios';
import { toast, Toaster } from 'react-hot-toast';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/nasabah/forgot-password', { email });
            if (response.data) {
                toast.success(`Link reset password telah dikirim ke ${email}.`);

                router.push({
                    pathname: '/reset-password',
                    query: { token: response.data.token, email: email },
                });
            }
        } catch (error) {
            console.error('Forgot password error:', error);
            toast.error('Gagal mengirim link reset password. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full space-y-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                    <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Forgot Password" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Forgot Password
                    </h2>
                </div>

                <form className="space-y-6" onSubmit={handleForgotPassword}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                style={{ borderWidth: '2px' }}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                        <button
                            onClick={() => router.push('/login')}
                            className="group relative w-full flex justify-center py-2 px-4 border border-gray-400 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 mt-4"
                        >
                            Back to Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
