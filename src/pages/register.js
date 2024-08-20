import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from '../utils/axios';
import { Toaster, toast } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Register() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);  // State for password visibility
    const [email, setEmail] = useState('');
    const [noTelp, setNoTelp] = useState('');
    const [nik, setNik] = useState('');
    const [alamat, setAlamat] = useState('');
    const [jenisKelamin, setJenisKelamin] = useState('');
    const [usia, setUsia] = useState('');
    const [error, setError] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3006/api/nasabah/register', {
                username,
                password,
                email,
                no_telp: noTelp,
                nik,
                alamat,
                jenis_kelamin: jenisKelamin,
                usia,
            });

            if (response.data) {
                toast.success('Registrasi berhasil! Silakan login.');
                router.push('/login');
            } else {
                throw new Error('Registrasi gagal');
            }
        } catch (error) {
            console.error('Register error:', error);
            toast.error('Registrasi gagal. Silakan periksa data Anda.');
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Toaster position="top-center" reverseOrder={false} />
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full space-y-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                    <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Create Register Nasabah
                    </h2>
                </div>

                <form className="space-y-6" onSubmit={handleRegister}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                style={{ borderWidth: '2px' }}
                            />
                        </div>

                        <div className="mb-4 relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                style={{ borderWidth: '2px' }}
                            />
                            <span
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-9 cursor-pointer"
                            >
                                {showPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}
                            </span>
                        </div>


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

                        <div className="mb-4">
                            <label htmlFor="noTelp" className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                            <input
                                id="noTelp"
                                name="noTelp"
                                type="text"
                                value={noTelp}
                                onChange={(e) => setNoTelp(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                style={{ borderWidth: '2px' }}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="nik" className="block text-sm font-medium text-gray-700">NIK</label>
                            <input
                                id="nik"
                                name="nik"
                                type="text"
                                value={nik}
                                onChange={(e) => setNik(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                style={{ borderWidth: '2px' }}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">Alamat</label>
                            <input
                                id="alamat"
                                name="alamat"
                                type="text"
                                value={alamat}
                                onChange={(e) => setAlamat(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                style={{ borderWidth: '2px' }}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="jenisKelamin" className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
                            <select
                                id="jenisKelamin"
                                name="jenisKelamin"
                                value={jenisKelamin}
                                onChange={(e) => setJenisKelamin(e.target.value)}
                                required
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                style={{ borderWidth: '2px' }}
                            >
                                <option value="">Pilih Jenis Kelamin</option>
                                <option value="L">Laki-laki</option>
                                <option value="P">Perempuan</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="usia" className="block text-sm font-medium text-gray-700">Usia</label>
                            <input
                                id="usia"
                                name="usia"
                                type="number"
                                value={usia}
                                onChange={(e) => setUsia(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm no-spin"
                                style={{ borderWidth: '2px' }}
                            />
                        </div>
                    </div>

                    {error && <p className="mt-4 text-red-600">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Create account
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <a href="/login" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                        Already have an account? Sign in
                    </a>
                </div>
            </div>
        </div>
    );
}
