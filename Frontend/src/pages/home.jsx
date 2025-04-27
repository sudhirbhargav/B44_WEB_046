import { useState, useEffect } from "react";
import axios from "axios";
import MedicineCard from "../components/MedicineCard";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";

export default function Home() {
  const [medicines, setMedicines] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    priceRange: [0, 1000],
    sortBy: "price",
    order: "asc",
  });

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const params = new URLSearchParams(filters);
        const { data } = await axios.get(
          `http://localhost:5000/medicines?${params.toString()}`
        );
        setMedicines(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMedicines();
  }, [filters]);

  return (
    <div className="flex">
      <FilterSidebar filters={filters} setFilters={setFilters} />
      <div className="flex-1 p-4">
        <SearchBar filters={filters} setFilters={setFilters} />
        <div className="mb-4">
          <label className="mr-2 font-semibold">Sort By:</label>
          <select
            value={filters.sortBy}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, sortBy: e.target.value }))
            }
            className="p-2 border rounded-md"
          >
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
          <button
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                order: prev.order === "asc" ? "desc" : "asc",
              }))
            }
            className="ml-2 p-2 bg-blue-500 text-white rounded-md"
          >
            {filters.order === "asc" ? "⬆️" : "⬇️"}
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {medicines.map((medicine) => (
            <MedicineCard key={medicine._id} medicine={medicine} />
          ))}
        </div>
      </div>
    </div>
  );
}
