import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/users/signup", data);
      navigate("/login");
    } catch (err) {
      setError("Email already exists");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">Signup</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          {...register("name")}
          placeholder="Name"
          className="border p-2 w-full mb-2"
        />
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-2"
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2"
        />
        <button className="bg-green-500 text-white p-2 rounded w-full">
          Signup
        </button>
      </form>
    </div>
  );
}
