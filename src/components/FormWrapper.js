import React from 'react';

export default function FormWrapper({ children, className }) {
  return (
    <div className={`flex rounded-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl ${className}`}>
      {children}
    </div>
  );
}
