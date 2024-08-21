import React from 'react';

export default function Button({ label, onClick, type = 'button', className }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`font-bold py-2 px-4 w-full rounded ${className}`}
    >
      {label}
    </button>
  );
}
