import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { getUserInfo, clearUserData } from '../utils/auth';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [nasabahData, setNasabahData] = useState([]);
  const [showDataNasabah, setShowDataNasabah] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);

  // Ambil role dari localStorage
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Fungsi untuk memuat data pengguna dari localStorage
  const loadData = () => {
    const userData = getUserInfo();
    setUser(userData);
  };

  // Fungsi untuk mengambil data nasabah dari API
  const fetchNasabahData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3006/api/nasabah/all', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setNasabahData(data);
    } catch (error) {
      console.error('Gagal mengambil data nasabah:', error);
      toast.error(`Gagal mengambil data nasabah: ${error.message}`);
    }
  };

  useEffect(() => {
    // Redirect based on role
    if (!role) {
      router.push('/login'); // Jika tidak ada role, redirect ke login
    } else if (role === 'Admin' || role === 'Operator') {
      loadData();
      fetchNasabahData();
    } else if (role === 'Nasabah') {
      loadData();
    } else {
      // Jika role tidak sesuai, redirect ke login
      router.push('/login');
    }
  }, [role]);

  const handleLogout = () => {
    clearUserData();
    router.push('/login');
  };

  const handleEdit = (id) => {
    console.log('Editing nasabah with ID: ', id);
    router.push(`/edit-nasabah?id=${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3006/api/nasabah/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success('Nasabah berhasil dihapus');
      fetchNasabahData();
    } catch (error) {
      console.error('Gagal menghapus nasabah:', error);
      toast.error(`Gagal menghapus nasabah: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Sidebar */}
      <div className="w-full md:w-64 bg-blue-800 p-6 flex flex-col items-center justify-between">
        <div className="w-full">
          {/* Tombol Hamburger untuk Mobile */}
          <div className="w-full flex justify-between items-center md:hidden">
            <h2 className="text-xl font-bold ml-8 text-white text-center flex-grow">Bank Customer BRI</h2>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white bg-blue-800 px-2 py-1 rounded-md opacity-50"
            >
              ☰
            </button>
          </div>

          {/* Header untuk Desktop */}
          <div className="hidden md:flex justify-center w-full">
            <h2 className="text-xl font-bold text-white text-center">Bank Customer BRI</h2>
          </div>

          <p className="text-white text-center mt-2">{currentTime.toLocaleTimeString()}</p>
          <hr className="my-4 w-full border-t-2 border-gray-200" />

          {/* Menu Navigasi */}
          <div className={`${menuOpen ? 'block' : 'hidden'} md:block w-full`}>
            <ul className="mt-4 space-y-2 w-full">
              <li
                className="bg-gray-300 p-2 rounded-lg text-center font-semibold cursor-pointer border border-gray-400 hover:bg-blue-600 transition-colors duration-200"
                onClick={() => {
                  setShowDataNasabah(!showDataNasabah);
                  toast.success(`Menampilkan Data ${role === 'Nasabah' ? 'Diri' : 'Nasabah'}`);
                }}
              >
                Data Nasabah
              </li>
              <li className="md:hidden bg-red-500 p-2 rounded-lg text-center font-semibold cursor-pointer border border-red-400 hover:bg-red-600 transition-colors duration-200"
                onClick={handleLogout}>
                Logout
              </li>
            </ul>
          </div>
        </div>

        {/* Logout Button untuk Desktop */}
        <div className="w-full hidden md:block">
          <button
            onClick={handleLogout}
            className="w-full py-2 mt-4 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 transition-transform duration-200 transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Konten */}
      <div className="flex-grow p-6 flex flex-col items-center md:items-start text-center md:text-left">
        {!showDataNasabah && (
          <h1 className="text-2xl font-bold mb-4 mt-2">Selamat datang di Dashboard, {user.username}</h1>
        )}
        {showDataNasabah && role === 'Admin' && (
          <div className="mt-2 w-full">
            <h2 className="text-xl font-semibold mb-2">Data Nasabah</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 mb-4">
                <thead className="hidden md:table-header-group">
                  <tr>
                    <th className="px-4 py-2 border">Username</th>
                    <th className="px-4 py-2 border">Email</th>
                    <th className="px-4 py-2 border">No. Telepon</th>
                    <th className="px-4 py-2 border">NIK</th>
                    <th className="px-4 py-2 border">Alamat</th>
                    <th className="px-4 py-2 border">Jenis Kelamin</th>
                    <th className="px-4 py-2 border">Usia</th>
                    <th className="px-4 py-2 border">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {nasabahData.map((nasabah) => (
                    <>
                      <tr key={nasabah.id} className="md:hidden block border-t border-gray-400 mb-4">
                        <td className="px-4 py-2">
                          <div className="flex flex-col">
                            <span className="font-semibold">Username:</span> {nasabah.username}
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex flex-col">
                            <span className="font-semibold">Email:</span> {nasabah.email}
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex flex-col">
                            <span className="font-semibold">No. Telepon:</span> {nasabah.no_telp}
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex flex-col">
                            <span className="font-semibold">NIK:</span> {nasabah.nik}
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex flex-col">
                            <span className="font-semibold">Alamat:</span> {nasabah.alamat}
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex flex-col">
                            <span className="font-semibold">Jenis Kelamin:</span> {nasabah.jenis_kelamin}
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex flex-col">
                            <span className="font-semibold">Usia:</span> {nasabah.usia}
                          </div>
                        </td>
                        <td className="px-4 py-2 flex space-x-2">
                          <button
                            className="bg-blue-500 text-white px-2 py-1 rounded-lg shadow-md hover:bg-blue-600"
                            onClick={() => handleEdit(nasabah.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white px-2 py-1 rounded-lg shadow-md hover:bg-red-600"
                            onClick={() => handleDelete(nasabah.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>

                      {/* Desktop view */}
                      <tr key={nasabah.id} className="hidden md:table-row mb-4">
                        <td className="px-4 py-2 border">{nasabah.username}</td>
                        <td className="px-4 py-2 border">{nasabah.email}</td>
                        <td className="px-4 py-2 border">{nasabah.no_telp}</td>
                        <td className="px-4 py-2 border">{nasabah.nik}</td>
                        <td className="px-4 py-2 border">{nasabah.alamat}</td>
                        <td className="px-4 py-2 border">{nasabah.jenis_kelamin}</td>
                        <td className="px-4 py-2 border">{nasabah.usia}</td>
                        <td className="px-4 py-2 border flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                          <button
                            className="bg-blue-500 text-white px-2 py-1 rounded-lg shadow-md hover:bg-blue-600"
                            onClick={() => handleEdit(nasabah.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white px-2 py-1 rounded-lg shadow-md hover:bg-red-600"
                            onClick={() => handleDelete(nasabah.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {showDataNasabah && role === 'Operator' && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Data Nasabah</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-400 mb-4">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border">Username</th>
                    <th className="px-4 py-2 border">Email</th>
                    <th className="px-4 py-2 border">No. Telepon</th>
                    <th className="px-4 py-2 border">NIK</th>
                    <th className="px-4 py-2 border">Alamat</th>
                    <th className="px-4 py-2 border">Jenis Kelamin</th>
                    <th className="px-4 py-2 border">Usia</th>
                  </tr>
                </thead>
                <tbody>
                  {nasabahData.map((nasabah) => (
                    <tr key={nasabah.id} className="mb-4">
                      <td className="px-4 py-2 border">{nasabah.username}</td>
                      <td className="px-4 py-2 border">{nasabah.email}</td>
                      <td className="px-4 py-2 border">{nasabah.no_telp}</td>
                      <td className="px-4 py-2 border">{nasabah.nik}</td>
                      <td className="px-4 py-2 border">{nasabah.alamat}</td>
                      <td className="px-4 py-2 border">{nasabah.jenis_kelamin}</td>
                      <td className="px-4 py-2 border">{nasabah.usia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {showDataNasabah && role === 'Nasabah' && (
          <div className="mt-2">
            <h2 className="text-2xl font-bold mb-4">Data Diri Anda</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <table className="table-auto w-full">
                <tbody>
                  <tr>
                    <td className="px-4 py-2 font-semibold text-gray-700">Username:</td>
                    <td className="px-4 py-2 text-gray-900">{user.username}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 font-semibold text-gray-700">Email:</td>
                    <td className="px-4 py-2 text-gray-900">{user.email}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold text-gray-700">No. Telepon:</td>
                    <td className="px-4 py-2 text-gray-900">{user.no_telp}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 font-semibold text-gray-700">NIK:</td>
                    <td className="px-4 py-2 text-gray-900">{user.nik}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold text-gray-700">Alamat:</td>
                    <td className="px-4 py-2 text-gray-900">{user.alamat}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 font-semibold text-gray-700">Jenis Kelamin:</td>
                    <td className="px-4 py-2 text-gray-900">{user.jenis_kelamin}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold text-gray-700">Usia:</td>
                    <td className="px-4 py-2 text-gray-900">{user.usia}</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-6 flex justify-center space-x-4">
                <button
                  onClick={() => setShowDataNasabah(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-500 transition-transform duration-200 transform hover:scale-105"
                >
                  Back
                </button>
                <button
                  onClick={() => handleEdit(user.userId)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-transform duration-200 transform hover:scale-105"
                >
                  Update Data
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
