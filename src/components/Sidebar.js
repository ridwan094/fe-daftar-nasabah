import React, { useState } from 'react';

export default function Sidebar({ currentTime, setShowDataNasabah, handleLogout, showButtons = true }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full md:w-64 p-6 flex flex-col items-center justify-between bg-blue-800">
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

        <p className="text-white text-center mt-2">{currentTime}</p>
        <hr className="my-4 w-full border-t-2 border-gray-200" />

        {/* Menu Navigasi */}
        {showButtons && (
          <div className={`${menuOpen ? 'block' : 'hidden'} md:block w-full`}>
            <ul className="mt-4 space-y-2 w-full">
              <li>
                <button
                  className="w-full p-2 rounded-lg text-center cursor-pointer bg-gray-300 text-black hover:bg-blue-600 border border-gray-400"
                  onClick={() => setShowDataNasabah((prev) => !prev)}
                >
                  Data Nasabah
                </button>
              </li>
              <li className="md:hidden">
                <button
                  className="w-full p-2 rounded-lg text-center cursor-pointer bg-red-500 text-white hover:bg-red-600 border border-red-400"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Logout Button untuk Desktop */}
      {showButtons && (
        <div className="w-full hidden md:block">
          <button
            className="w-full py-2 mt-4 rounded-md text-white bg-red-500 hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
