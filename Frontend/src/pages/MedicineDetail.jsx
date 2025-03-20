import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MedicineDetail() {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/medicines/${id}`)
      .then(({ data }) => setMedicine(data));
  }, [id]);

  if (!medicine) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{medicine.name}</h1>
      <p className="text-gray-600">Price: ₹{medicine.price}</p>
      <button className="bg-green-500 text-white px-4 py-2 mt-2">
        Add to Cart
      </button>
    </div>
  );
}
