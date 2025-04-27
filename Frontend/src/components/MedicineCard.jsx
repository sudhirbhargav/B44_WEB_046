import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function MedicineCard({ medicine }) {
  const { user, addToCart } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart(medicine._id);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <h3 className="text-lg font-bold">{medicine.name}</h3>
      <p className="text-gray-600">{medicine.category}</p>
      <p className="text-blue-500 font-bold">${medicine.price}</p>
      <button
        onClick={handleAddToCart}
        className="bg-green-500 text-white px-4 py-2 rounded mt-2 hover:bg-green-600"
      >
        Add to Cart
      </button>
    </div>
  );
}
