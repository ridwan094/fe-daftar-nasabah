import React from 'react';

export default function ForgotPasswordLink({ className }) {
  return (
    <div className={`flex justify-between ${className}`}>
      <a href="/forgot-password" className="text-xs">Forgot password?</a>
    </div>
  );
}
