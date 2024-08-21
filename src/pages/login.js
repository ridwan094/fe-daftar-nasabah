import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from '../utils/axios';
import { toast, Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { setToken, setUserId, setUserInfo, setRole } from '../utils/auth';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Logo from '../components/Logo';
import FormWrapper from '../components/FormWrapper';
import ForgotPasswordLink from '../components/ForgotPasswordLink';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
            <FormWrapper className="bg-white shadow-lg">
                <div
                    className="hidden lg:block lg:w-1/2 bg-cover"
                    style={{
                        backgroundImage: "url('https://i.pinimg.com/736x/aa/0e/67/aa0e67d2e759af6d677088e9160784d1.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                ></div>
                <div className="w-full p-8 lg:w-1/2">
                    <Logo className="mb-4" />
                    <p className="text-xl text-gray-600 text-center">Sign in to your account</p>
                    <form onSubmit={handleLogin}>
                        <TextInput
                            label="Username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mb-4"
                        />
                        <div className="relative">
                            <TextInput
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                showIcon={true}
                                icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                                onIconClick={togglePasswordVisibility}
                            />
                            <div className="text-xs text-gray-500 mt-2">
                                <ForgotPasswordLink />
                            </div>
                        </div>
                        <div className="mt-8">
                            <Button
                                type="submit"
                                label="Sign in"
                                className="bg-blue-500 text-white hover:bg-blue-600"
                            />
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
            </FormWrapper>
        </div>
    );
}
