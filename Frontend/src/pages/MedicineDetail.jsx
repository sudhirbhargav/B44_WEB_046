import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";

export default function MedicineDetail() {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const { addToCart } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/medicines/${id}`)
      .then(({ data }) => setMedicine(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!medicine) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold">{medicine.name}</h1>
      <p className="text-gray-600">{medicine.description}</p>
      <p className="text-blue-500 font-bold">${medicine.price}</p>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
        onClick={() => addToCart(medicine._id)}
      >
        Add to Cart
      </button>
    </div>
  );
}
