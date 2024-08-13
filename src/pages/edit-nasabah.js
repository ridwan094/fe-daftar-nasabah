import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from '../utils/axios';
import { toast, Toaster } from 'react-hot-toast';

export default function EditNasabah() {
    const router = useRouter();
    const [user, setUser] = useState({
        username: '',
        email: '',
        no_telp: '',
        nik: '',
        alamat: '',
        jenis_kelamin: '',
        usia: ''
    });

    useEffect(() => {
        const userData = {
            userId: localStorage.getItem('userId'),
            username: localStorage.getItem('username'),
            email: localStorage.getItem('email'),
            no_telp: localStorage.getItem('no_telp'),
            nik: localStorage.getItem('nik'),
            alamat: localStorage.getItem('alamat'),
            jenis_kelamin: localStorage.getItem('jenis_kelamin'),
            usia: localStorage.getItem('usia'),
        };
        setUser(userData);
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const userId = user.userId;
            const response = await axios.put(`http://localhost:3002/api/nasabah/${user.userId}`, {
                username: user.username,
                email: user.email,
                no_telp: user.no_telp,
                nik: user.nik,
                alamat: user.alamat,
                jenis_kelamin: user.jenis_kelamin,
                usia: user.usia,
            });

            if (response.data) {
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('no_telp', response.data.no_telp);
                localStorage.setItem('nik', response.data.nik);
                localStorage.setItem('alamat', response.data.alamat);
                localStorage.setItem('jenis_kelamin', response.data.jenis_kelamin);
                localStorage.setItem('usia', response.data.usia);

                toast.success('Data berhasil diperbarui!');
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('Update error:', error);
            toast.error('Gagal memperbarui data.');
        }
    };

    const handleBack = () => {
        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            <Toaster position="top-center" reverseOrder={false} />

            {/* Sidebar */}
            <div className="w-64 bg-blue-800 p-6 flex flex-col items-center">
                <h2 className="text-xl font-bold text-white text-center">Bank Customer BRI</h2>
                <hr className="my-4 w-full border-t-2 border-gray-200" />
                <div className="w-full">
                    <ul className="mt-4 space-y-2 w-full">
                        <li
                            className="bg-gray-300 p-2 rounded-lg text-center font-semibold border border-gray-400"
                        >
                            Data Nasabah
                        </li>
                    </ul>
                </div>
                <div className="mt-auto w-full">
                    <button
                        onClick={() => router.push('/login')}
                        className="w-full py-2 mt-4 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 transition-transform duration-200 transform hover:scale-105"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow p-6">
                <h1 className="text-2xl font-bold mb-4">Edit Data Nasabah</h1>
                <div className="mt-4">
                    <table className="table-auto border-collapse border border-gray-400 w-full">
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-semibold">Username:</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="text"
                                        name="username"
                                        value={user.username}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-semibold">Email:</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-semibold">No. Telepon:</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="text"
                                        name="no_telp"
                                        value={user.no_telp}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-semibold">NIK:</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="text"
                                        name="nik"
                                        value={user.nik}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-semibold">Alamat:</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="text"
                                        name="alamat"
                                        value={user.alamat}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-semibold">Jenis Kelamin:</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <select
                                        name="jenis_kelamin"
                                        value={user.jenis_kelamin}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    >
                                        <option value="Laki-laki">Laki-laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-semibold">Usia:</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="number"
                                        name="usia"
                                        value={user.usia}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex justify-end space-x-4 mt-4">
                        <button
                            onClick={handleBack}
                            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-500 transition-transform duration-200 transform hover:scale-105"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleUpdate}
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition-transform duration-200 transform hover:scale-105"
                        >
                            Update Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
