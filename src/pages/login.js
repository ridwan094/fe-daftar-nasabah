import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from '../utils/axios';
import { toast, Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { setToken, setUserId, setUserInfo, setRole } from '../utils/auth';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3006/api/login', { username, password });
            if (response.data.token) {
                setToken(response.data.token);
                setUserId(response.data.userId);
                setRole(response.data.role);
                setUserInfo({
                    username: response.data.username,
                    email: response.data.email,
                    no_telp: response.data.no_telp,
                    nik: response.data.nik,
                    alamat: response.data.alamat,
                    jenis_kelamin: response.data.jenis_kelamin,
                    usia: response.data.usia,
                });

                toast.success(`Login berhasil! Selamat datang, ${response.data.username}.`);
                router.push('/dashboard');
            }
        } catch (err) {
            toast.error('Login gagal. Silakan periksa kredensial Anda.');
        }
    };

    return (
        <div className="py-16">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                <div
                    className="hidden lg:block lg:w-1/2 bg-cover"
                    style={{
                        backgroundImage: "url('https://i.pinimg.com/736x/aa/0e/67/aa0e67d2e759af6d677088e9160784d1.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                ></div>
                <div className="w-full p-8 lg:w-1/2">
                    <img
                        src="https://jasalogocepat.com/wp-content/uploads/2023/09/logo-bri-png-transparan-jasalogocepat-01.png"
                        alt="Logo BRI"
                        className='h-12 w-auto justify-center mx-auto'
                    />
                    <p className="text-xl text-gray-600 text-center">Sign in to your account</p>
                    <form onSubmit={handleLogin}>
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                            <input
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                style={{ borderWidth: '2px' }}
                            />
                        </div>
                        <div className="mt-4 relative"> {/* Tambahkan relative untuk posisikan icon */}
                            <div className="flex justify-between">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                <a href="/forgot-password" className="text-xs text-gray-500">Forgot password?</a>
                            </div>
                            <input
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type={showPassword ? 'text' : 'password'} // Tipe input berubah berdasarkan state
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{ borderWidth: '2px' }}
                            />
                            <span onClick={togglePasswordVisibility} className="absolute right-3 top-10 cursor-pointer">
                                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Icon mata berubah */}
                            </span>
                        </div>
                        {error && <p className="mt-4 text-red-600">{error}</p>}
                        <div className="mt-8">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 md:w-1/4"></span>
                        <div className="text-xs text-gray-500 uppercase flex items-center justify-between w-full">
                            <span>Don't have an account?</span>
                            <a href="/register" className="text-red-500 font-bold ml-1">Sign up</a>
                        </div>
                        <span className="border-b w-1/5 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </div>
    );
}