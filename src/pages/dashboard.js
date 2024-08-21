// pages/dashboard.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast, Toaster } from 'react-hot-toast';
import { getUserInfo, clearUserData } from '../utils/auth';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [nasabahData, setNasabahData] = useState([]);
  const [showDataNasabah, setShowDataNasabah] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const loadData = () => {
    const userData = getUserInfo();
    setUser(userData);
  };

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
    if (!role) {
      router.push('/login');
    } else if (role === 'Admin' || role === 'Operator') {
      loadData();
      fetchNasabahData();
    } else if (role === 'Nasabah') {
      loadData();
    } else {
      router.push('/login');
    }
  }, [role]);

  const handleLogout = () => {
    clearUserData();
    router.push('/login');
  };

  const handleEdit = (id) => {
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

      {/* Menggunakan Sidebar dengan showButtons yang dikontrol */}
      <Sidebar
        currentTime={currentTime.toLocaleTimeString()}
        setShowDataNasabah={setShowDataNasabah}
        handleLogout={handleLogout}
        showButtons={!router.query.id} // Menyembunyikan tombol saat sedang melakukan update nasabah
      />

      <div className="flex-grow p-6 flex flex-col items-center md:items-start text-center md:text-left">
        {!showDataNasabah && (
          <h1 className="text-2xl font-bold mb-4 mt-2">Selamat datang di Dashboard, {user.username}</h1>
        )}
        {showDataNasabah && role === 'Admin' && (
          <div className="mt-2 w-full">
            <h2 className="text-xl font-semibold mb-2">Data Nasabah</h2>
            <Table
              nasabahData={nasabahData}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>
        )}
        {showDataNasabah && role === 'Operator' && (
          <div className="mt-2 w-full">
            <h2 className="text-xl font-semibold mb-2">Data Nasabah</h2>
            <Table
              nasabahData={nasabahData}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
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
