import { useState } from "react";
import { useAuth } from "../providers/AuthProvider.tsx";

export default function Login() {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-screen flex flex-col items-center justify-center px-4 bg-white">
      <p className="text-5xl md:text-5xl text-center font-semibold mb-16">
        Log in to access your panel
      </p>

      <div className="flex flex-col items-center gap-4 w-full max-w-md text-xl">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-black rounded-xl px-6 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-black rounded-xl px-6 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-black"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={() => login(email, password)}
          disabled={isLoading}
          className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
        >
          {isLoading ? "Logging in…" : "Log In"}
        </button>
      </div>
    </div>
  );
};
