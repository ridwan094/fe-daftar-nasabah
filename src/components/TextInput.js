import React from 'react';

export default function TextInput({ label, type, value, onChange, placeholder, showIcon, icon, onIconClick, className }) {
  return (
    <div className={`relative ${className}`}>
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <input
        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
      {showIcon && (
        <span onClick={onIconClick} className="absolute right-3 top-10 cursor-pointer">
          {icon}
        </span>
      )}
    </div>
  );
}
