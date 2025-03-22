import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const LoginPanel: React.FC = () => {
    const { userType } = useParams();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username && password) {
        navigate('/home');
        }
    };

    return (
        <div className="h-screen flex items-center justify-center flex-col bg-gray-100">
            <p className=" pb-10 text-7xl"> {userType=='Admin' ? 'Admin Log in panel' : 'Editor Log in panel'} </p>

            <div className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <button
                onClick={handleLogin}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                Log In
                </button>
            </div>
        </div>
    );
};

export default LoginPanel;