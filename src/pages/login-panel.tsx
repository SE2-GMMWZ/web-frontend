import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider.tsx';

export const LoginPanel: React.FC = () => {
  const { userType } = useParams();
  const { login, isLoading, error } = useAuth();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="h-screen flex items-center justify-center flex-col bg-gray-100 p-4">
      <p className="pb-10 text-4xl md:text-7xl text-center font-semibold">
        {userType === 'Admin' ? 'Admin Log In Panel' : 'Editor Log In Panel'}
      </p>

      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={() => login(email, password)}
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Logging in…' : 'Log In'}
        </button>
      </div>
    </div>
  );
};

export default LoginPanel;

