export default function FilterSidebar({ filters, setFilters }) {
  const handleCategoryChange = (e) => {
    setFilters((prev) => ({ ...prev, category: e.target.value }));
  };

  const handlePriceChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [0, parseInt(e.target.value, 10)],
    }));
  };

  return (
    <div className="w-1/4 p-4 border-r">
      <h2 className="text-lg font-semibold">Filters</h2>
      <div className="mt-4">
        <label className="block text-sm font-medium">Category:</label>
        <select
          value={filters.category}
          onChange={handleCategoryChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="">All</option>
          <option value="Pain Relief">Pain Relief</option>
          <option value="Antibiotics">Antibiotics</option>
          <option value="Vitamins">Vitamins</option>
        </select>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium">Price Range:</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={filters.priceRange[1]}
          onChange={handlePriceChange}
          className="w-full"
        />
        <span className="block mt-2 text-gray-700">
          Up to ${filters.priceRange[1]}
        </span>
      </div>
    </div>
  );
}
