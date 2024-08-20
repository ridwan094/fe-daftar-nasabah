import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from '../utils/axios';
import { toast, Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false); // State untuk toggle visibilitas password baru
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State untuk toggle visibilitas konfirmasi password
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { token, email } = router.query; // Mengambil token dan email dari query parameter

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error('Password dan Konfirmasi Password tidak cocok.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('/nasabah/reset-password', { token, email, newPassword });
            if (response.data) {
                toast.success('Password berhasil direset.');
                router.push('/login');
            }
        } catch (error) {
            console.error('Reset password error:', error);
            toast.error('Gagal mereset password. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full space-y-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                    <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Reset Password" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Reset Password
                    </h2>
                </div>

                <form className="space-y-6" onSubmit={handleResetPassword}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4 relative">
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                            <div className="relative">
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type={showNewPassword ? "text" : "password"} // Tipe input berubah sesuai toggle
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    style={{ borderWidth: '2px' }}
                                />
                                <div
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                                    onClick={toggleNewPasswordVisibility}
                                >
                                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </div>

                        <div className="mb-4 relative">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"} // Tipe input berubah sesuai toggle
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    style={{ borderWidth: '2px' }}
                                />
                                <div
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
