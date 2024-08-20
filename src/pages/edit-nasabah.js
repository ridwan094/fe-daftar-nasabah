import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from '../utils/axios';
import { toast, Toaster } from 'react-hot-toast';
import { getToken, getRole, setUserInfo } from '../utils/auth';

export default function EditNasabah() {
    const router = useRouter();
    const { id: queryId } = router.query;
    const [currentTime, setCurrentTime] = useState(new Date());
    const [user, setUser] = useState({
        username: '',
        email: '',
        no_telp: '',
        nik: '',
        alamat: '',
        jenis_kelamin: '',
        usia: '',
        password: ''
    });
    const [role, setRole] = useState('');
    const [id, setId] = useState(queryId || localStorage.getItem('userId'));

    useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);
    
        return () => clearInterval(intervalId);
      }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = getToken();
                const storedRole = getRole();
                setRole(storedRole);

                let userId = id;
                if (storedRole === 'Nasabah') {
                    userId = localStorage.getItem('userId');
                    setId(userId);
                }

                console.log('Role:', storedRole);
                console.log('Queried ID:', queryId);
                console.log('Stored User ID (for Nasabah):', localStorage.getItem('userId'));
                console.log('Final ID used for fetching:', userId);

                if (!userId) {
                    console.error('User ID is undefined.');
                    return;
                }

                let url = `http://localhost:3006/api/nasabah/${userId}`;

                console.log("Fetching data for nasabah URL: ", url);

                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data) {
                    setUser(response.data);
                }
            } catch (error) {
                console.error('Gagal memuat data nasabah:', error);
                toast.error('Gagal memuat data nasabah.');
            }
        };

        if (id) {
            fetchUserData();
        }
    }, [id]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const token = getToken();
            const userId = id;

            if (!userId) {
                console.error('User ID is undefined.');
                console.info('User ID is undefined.');
                return;
            }

            let url = `http://localhost:3006/api/nasabah/${userId}`;

            const updateUser = { ...user };
            if (!updateUser.password) {
                delete updateUser.password;
            }

            console.log("Payload yang dikirim: ", updateUser);
            console.info("Payload yang dikirim: ", updateUser);

            const response = await axios.put(url, updateUser, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('Response dari server:', response);
            console.info('Response dari server:', response);

            if (response.data) {
                if (role === 'Nasabah') {
                    setUserInfo(response.data);
                }

                toast.success('Data berhasil diperbarui!');
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('Gagal memperbarui data:', error);
            console.info('Gagal memperbarui data:', error);
            toast.error('Gagal memperbarui data.');
        }
    };

    const handleBack = () => {
        router.push('/dashboard');
    };

    return (
          <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
            <Toaster position="top-center" reverseOrder={false} />

            <div className="w-full md:w-64 bg-blue-800 p-6 flex flex-col items-center">
                <h2 className="text-xl font-bold text-white text-center">Bank Customer BRI</h2>
                <p className="text-white text-center mt-2">{currentTime.toLocaleTimeString()}</p>
                <hr className="my-4 w-full border-t-2 border-gray-200" />
            </div>

            <div className="flex-grow p-6">
                <h1 className="text-2xl font-bold mb-4">Edit Data Nasabah</h1>
                <div className="mt-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
                        <div className="col-span-1">
                            <label className="font-semibold">Username:</label>
                            <input
                                type="text"
                                name="username"
                                value={user.username}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="font-semibold">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="font-semibold">No. Telepon:</label>
                            <input
                                type="text"
                                name="no_telp"
                                value={user.no_telp}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="font-semibold">NIK:</label>
                            <input
                                type="text"
                                name="nik"
                                value={user.nik}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="font-semibold">Alamat:</label>
                            <input
                                type="text"
                                name="alamat"
                                value={user.alamat}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="font-semibold">Jenis Kelamin:</label>
                            <select
                                name="jenis_kelamin"
                                value={user.jenis_kelamin}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            >
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className="font-semibold">Usia:</label>
                            <input
                                type="number"
                                name="usia"
                                value={user.usia}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>
                        {role === 'Admin' && (
                            <div className="col-span-1">
                                <label className="font-semibold">Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    placeholder="Kosongkan jika tidak ingin mengubah"
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
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