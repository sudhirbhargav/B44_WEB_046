import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users/signup", form);
      navigate("/login");
    } catch (err) {
      console.info("-------------------------------");
      console.info("err => ", err);
      console.info("-------------------------------");
      setError("Failed to register. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-80"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Signup</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          className="w-full p-2 mb-3 border rounded"
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 mb-3 border rounded"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 mb-3 border rounded"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Signup
        </button>
      </form>
    </div>
  );
}
