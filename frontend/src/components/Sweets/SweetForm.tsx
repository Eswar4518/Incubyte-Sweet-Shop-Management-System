import React, { useState } from 'react';
import { createSweet, updateSweet } from '../../api/sweetsApi';

/**
 * SweetForm Component
 * 
 * This component provides an admin form to create or update sweet products.
 * It handles:
 * - Form validation for required fields (name, price, quantity)
 * - Price must be greater than 0
 * - Quantity must be a non-negative integer
 * - Submit handler that calls the backend API to save the sweet
 * - Success/error feedback to the user
 * - Reset functionality to clear the form
 * 
 * Used in: Admin dashboard pages
 */

interface SweetFormProps {
  // Optional callback when sweet is successfully created/updated
  onSuccess?: () => void;
  // Optional initial sweet data for edit mode
  initialData?: {
    id?: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
    description?: string;
    image?: string;
  };
}

const SweetForm: React.FC<SweetFormProps> = ({ onSuccess, initialData }) => {
  // Form state - manages all input fields for the sweet product
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || '',
    price: initialData?.price || '',
    quantity: initialData?.quantity || '',
    description: initialData?.description || '',
    image: initialData?.image || '',
  });

  // UI state - manages loading, success, and error messages
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  /**
   * Validates form data before submission
   * Rules:
   * - Name must not be empty and at least 2 characters
   * - Price must be greater than 0
   * - Quantity must be a non-negative integer
   */
  const validateForm = (): boolean => {
    // Check if name is provided and has minimum length
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setMessage({
        type: 'error',
        text: 'Sweet name must be at least 2 characters long',
      });
      return false;
    }

    // Check if category is provided
    if (!formData.category.trim()) {
      setMessage({
        type: 'error',
        text: 'Category is required',
      });
      return false;
    }

    // Check if price is a valid positive number
    const price = parseFloat(formData.price.toString());
    if (isNaN(price) || price <= 0) {
      setMessage({
        type: 'error',
        text: 'Price must be greater than 0',
      });
      return false;
    }

    // Check if quantity is a valid non-negative integer
    const quantity = parseInt(formData.quantity.toString(), 10);
    if (isNaN(quantity) || quantity < 0) {
      setMessage({
        type: 'error',
        text: 'Quantity must be a non-negative number',
      });
      return false;
    }

    return true;
  };

  /**
   * Handles form input changes
   * Updates the formData state with the new value from the input field
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Handles form submission
   * Validates the form and sends data to the backend API
   * Shows success/error message based on the response
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate before submitting
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Prepare the data in the format expected by the backend
      const sweetData = {
        name: formData.name.trim(),
        category: formData.category.trim(),
        price: parseFloat(formData.price.toString()),
        quantity: parseInt(formData.quantity.toString(), 10),
        description: formData.description.trim() || undefined,
        image: formData.image.trim() || undefined,
      };

      // Send data to backend API
      if (initialData?.id) {
        await updateSweet(initialData.id, sweetData);
      } else {
        await createSweet(sweetData);
      }

      // Show success message
      setMessage({
        type: 'success',
        text: `Sweet "${formData.name}" ${initialData?.id ? 'updated' : 'created'} successfully!`,
      });

      // Reset form after successful submission
      setFormData({
        name: '',
        category: '',
        price: '',
        quantity: '',
        description: '',
        image: '',
      });

      // Call the optional success callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      // Handle error from backend
      const errorMessage =
        error.response?.data?.message || 'Failed to create sweet';
      setMessage({
        type: 'error',
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Resets the form to initial state
   * Clears all input fields and messages
   */
  const handleReset = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      quantity: '',
      description: '',
      image: '',
    });
    setMessage(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form Title */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {initialData?.id ? '✏️ Edit Sweet' : '🍭 Create New Sweet'}
        </h2>
        <p className="text-gray-900 mt-2">Fill in the details below to add a delicious sweet to your inventory</p>
      </div>

      {/* Success/Error Message Display */}
      {message && (
        <div
          className={`p-4 rounded-md text-sm font-medium ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-400'
              : 'bg-red-100 text-red-800 border border-red-400'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Sweet Name Input Field */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-bold text-gray-900 flex items-center">
          🏷️ Sweet Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Chocolate Cake, Strawberry Tart"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white shadow-sm"
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Input Field */}
        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-bold text-gray-900 flex items-center">
            📂 Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Chocolate, Candy, Cake"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white shadow-sm"
            disabled={isLoading}
          />
        </div>

        {/* Price Input Field */}
        <div className="space-y-2">
          <label htmlFor="price" className="block text-sm font-bold text-gray-900 flex items-center">
            💰 Price (₹)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white shadow-sm"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Quantity Input Field */}
      <div className="space-y-2">
        <label htmlFor="quantity" className="block text-sm font-bold text-gray-900 flex items-center">
          📦 Initial Quantity
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="0"
          min="0"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white shadow-sm"
          disabled={isLoading}
        />
      </div>

      {/* Image URL Input Field */}
      <div className="space-y-2">
        <label htmlFor="image" className="block text-sm font-bold text-gray-900 flex items-center">
          🖼️ Image URL (Optional)
        </label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/sweet-image.jpg"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white shadow-sm"
          disabled={isLoading}
        />
      </div>

      {/* Description Input Field */}
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-bold text-gray-900 flex items-center">
          📝 Description (Optional)
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your sweet product... (e.g., Rich chocolate cake with vanilla frosting)"
          rows={4}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white shadow-sm resize-none"
          disabled={isLoading}
        />
      </div>

      {/* Form Action Buttons */}
      <div className="flex gap-4 pt-6">
        {/* Submit Button - creates or updates the sweet */}
        <button
          type="submit"
          className="flex-1 bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-gray-900 font-bold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            `${initialData?.id ? '✏️ Update Sweet' : '🍭 Create Sweet'}`
          )}
        </button>

        {/* Reset Button - clears all form fields */}
        <button
          type="button"
          onClick={handleReset}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          disabled={isLoading}
        >
          🔄 Reset
        </button>
      </div>
      </form>
    </div>
  );
};

export default SweetForm;
