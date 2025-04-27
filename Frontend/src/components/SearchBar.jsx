import { useState } from "react";

export default function SearchBar({ filters, setFilters }) {
  const [query, setQuery] = useState(filters.search);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: e.target.value }));
    }, 300);
  };

  return (
    <input
      type="text"
      placeholder="Search medicines..."
      value={query}
      onChange={handleSearch}
      className="w-full p-2 border rounded-md"
    />
  );
}
