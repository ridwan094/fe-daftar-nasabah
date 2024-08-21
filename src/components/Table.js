import React from 'react';
import Button from './Button';

export default function Table({ nasabahData, handleEdit, handleDelete }) {
    return (
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
                        <React.Fragment key={nasabah.id}>
                            {/* Tampilan Mobile */}
                            <tr className="block md:hidden mb-4">
                                <td className="px-4 py-2 border flex flex-col">
                                    <span className="font-semibold">Username:</span> {nasabah.username}
                                </td>
                                <td className="px-4 py-2 border flex flex-col">
                                    <span className="font-semibold">Email:</span> {nasabah.email}
                                </td>
                                <td className="px-4 py-2 border flex flex-col">
                                    <span className="font-semibold">No. Telepon:</span> {nasabah.no_telp}
                                </td>
                                <td className="px-4 py-2 border flex flex-col">
                                    <span className="font-semibold">NIK:</span> {nasabah.nik}
                                </td>
                                <td className="px-4 py-2 border flex flex-col">
                                    <span className="font-semibold">Alamat:</span> {nasabah.alamat}
                                </td>
                                <td className="px-4 py-2 border flex flex-col">
                                    <span className="font-semibold">Jenis Kelamin:</span> {nasabah.jenis_kelamin}
                                </td>
                                <td className="px-4 py-2 border flex flex-col">
                                    <span className="font-semibold">Usia:</span> {nasabah.usia}
                                </td>
                                <td className="px-4 py-2 border flex justify-center space-x-2">
                                    <Button
                                        label="Edit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                                        onClick={() => handleEdit(nasabah.id)}
                                    />
                                    <Button
                                        label="Delete"
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
                                        onClick={() => handleDelete(nasabah.id)}
                                    />
                                </td>
                            </tr>

                            {/* Tampilan Desktop */}
                            <tr className="hidden md:table-row">
                                <td className="px-4 py-2 border">{nasabah.username}</td>
                                <td className="px-4 py-2 border">{nasabah.email}</td>
                                <td className="px-4 py-2 border">{nasabah.no_telp}</td>
                                <td className="px-4 py-2 border">{nasabah.nik}</td>
                                <td className="px-4 py-2 border">{nasabah.alamat}</td>
                                <td className="px-4 py-2 border">{nasabah.jenis_kelamin}</td>
                                <td className="px-4 py-2 border">{nasabah.usia}</td>
                                <td className="px-4 py-2 border flex justify-center space-x-2">
                                    <Button
                                        label="Edit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                                        onClick={() => handleEdit(nasabah.id)}
                                    />
                                    <Button
                                        label="Delete"
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
                                        onClick={() => handleDelete(nasabah.id)}
                                    />
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
