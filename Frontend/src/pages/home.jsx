import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/medicines")
      .then(({ data }) => setMedicines(data));
  }, []);

  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Search medicines..."
        className="border p-2 w-full mb-4"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredMedicines.map((medicine) => (
          <div
            key={medicine._id}
            className="p-4 border rounded shadow hover:shadow-lg"
          >
            <h2 className="text-lg font-bold">{medicine.name}</h2>
            <p className="text-gray-600">₹{medicine.price}</p>
            <button className="bg-blue-500 text-white px-4 py-1 rounded mt-2">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
