import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { name, surname, email, phone, password, passwordConfirm } = formData;

    if (!name || !surname || !email || !phone || !password || !passwordConfirm) {
      setError("Please fill out all fields.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          surname,
          email,
          phone,
          password,
          role: "user",
          id: ""
        }),
      });

      if (!res.ok) throw new Error("Failed to register user");

      setSuccess(true);
      setTimeout(() => navigate("/login/editor"), 1500);
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center px-4 bg-white">
      <h1 className="text-5xl md:text-6xl font-semibold mb-10 text-center">
        Editor Registration
      </h1>

      <div className="w-full max-w-xl flex flex-col gap-5 text-lg">
        <input
          type="text"
          name="name"
          placeholder="First Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-black rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="text"
          name="surname"
          placeholder="Last Name"
          value={formData.surname}
          onChange={handleChange}
          className="w-full border border-black rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-black rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-black rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-black rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          value={formData.passwordConfirm}
          onChange={handleChange}
          className="w-full border border-black rounded-xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-black"
        />

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">Registered! Redirecting...</p>}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>

        <button
          onClick={() => navigate("/login/editor")}
          className="text-sm underline text-center text-gray-600 hover:text-black"
        >
          Already have an account? Log in
        </button>
      </div>
    </div>
  );
}
