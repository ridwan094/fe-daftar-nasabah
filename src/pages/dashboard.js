import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { removeToken } from '../utils/auth';
import { toast, Toaster } from 'react-hot-toast';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [showDataNasabah, setShowDataNasabah] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const loadData = () => {
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
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = () => {
    removeToken();
    localStorage.clear();
    router.push('/login');
  };

  const handleEdit = () => {
    router.push('/edit-nasabah');
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 p-6 flex flex-col items-center">
        <h2 className="text-xl font-bold text-white text-center">Bank Customer BRI</h2>
        <p className="text-white text-center mt-2">
          {currentTime.toLocaleTimeString()}
        </p>
        <hr className="my-4 w-full border-t-2 border-gray-200" />
        <div className="w-full">
          <ul className="mt-4 space-y-2 w-full">
            <li
              className="bg-gray-300 p-2 rounded-lg text-center font-semibold cursor-pointer border border-gray-400 hover:bg-gray-400 transition-colors duration-200"
              onClick={() => {
                loadData();
                setShowDataNasabah(!showDataNasabah);
                toast.success(`Menampilkan Data Nasabah`);
              }}
            >
              Data Nasabah
            </li>
          </ul>
        </div>
        <div className="mt-auto w-full">
          <button
            onClick={handleLogout}
            className="w-full py-2 mt-4 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 transition-transform duration-200 transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6">
        {!showDataNasabah && (
          <h1 className="text-2xl font-bold mb-4">
            Welcome to Dashboard, {user.username}
          </h1>
        )}
        {showDataNasabah && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Data Nasabah</h2>
            <table className="table-auto border-collapse border border-gray-400 w-full">
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Username:</td>
                  <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Email:</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">No. Telepon:</td>
                  <td className="border border-gray-300 px-4 py-2">{user.no_telp}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">NIK:</td>
                  <td className="border border-gray-300 px-4 py-2">{user.nik}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Alamat:</td>
                  <td className="border border-gray-300 px-4 py-2">{user.alamat}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Jenis Kelamin:</td>
                  <td className="border border-gray-300 px-4 py-2">{user.jenis_kelamin}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Usia:</td>
                  <td className="border border-gray-300 px-4 py-2">{user.usia}</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-6">
              <button 
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-transform duration-200 transform hover:scale-105"
              >
                Edit Data
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
