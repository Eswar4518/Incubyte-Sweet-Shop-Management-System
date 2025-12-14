import React, { useState } from "react";
import { searchSweets, getAllSweets, Sweet } from "../../api/sweetsApi";

interface SweetSearchProps {
  onSearch: (sweets: Sweet[]) => void;
}

const SweetSearch: React.FC<SweetSearchProps> = ({ onSearch }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const hasFilters =
      name.trim() || category.trim() || minPrice.trim() || maxPrice.trim();

    const sweets = hasFilters
      ? await searchSweets(
          name || undefined,
          category || undefined,
          minPrice ? parseFloat(minPrice) : undefined,
          maxPrice ? parseFloat(maxPrice) : undefined
        )
      : await getAllSweets();

    onSearch(sweets);
  };

  const handleReset = async () => {
    setName("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    const sweets = await getAllSweets();
    onSearch(sweets);
  };

  return (
    <div className="bg-transparent rounded-xl p-6 mb-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold gradient-text mb-2">🔍 Find Your Perfect Sweet</h2>
        <p className="text-gray-600">Search by name, category, or price range</p>
      </div>
      <form onSubmit={handleSearch} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 flex items-center">
              🍭 Sweet Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input-enhanced"
              placeholder="e.g. Chocolate Cake"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 flex items-center">
              📂 Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-input-enhanced"
            >
              <option value="">All Categories</option>
              <option value="Chocolate">🍫 Chocolate</option>
              <option value="Candy">🍬 Candy</option>
              <option value="Cake">🎂 Cake</option>
              <option value="Cookie">🍪 Cookie</option>
              <option value="Ice Cream">🍦 Ice Cream</option>
              <option value="Pastry">🥐 Pastry</option>
            </select>
          </div>

          {/* Min Price */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 flex items-center">
              💰 Min Price (₹)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="form-input-enhanced"
              placeholder="0"
            />
          </div>

          {/* Max Price */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 flex items-center">
              💎 Max Price (₹)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="form-input-enhanced"
              placeholder="1000"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-8 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-100 font-bold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            🔄 Reset Filters
          </button>
          <button
            type="submit"
            className="btn-gradient px-8 py-3"
          >
            🔍 Search Sweets
          </button>
        </div>
      </form>
    </div>
  );
};

export default SweetSearch;
