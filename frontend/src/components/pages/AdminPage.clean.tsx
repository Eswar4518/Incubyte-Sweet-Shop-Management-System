import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllSweets, Sweet } from "../../api/sweetsApi";
import SweetForm from "../Sweets/SweetForm";
import SweetList from "../Sweets/SweetList";
import UserManagement from "../Users/UserManagement";
import { useAuth } from "../../context/AuthContext";

const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"sweets" | "users">("sweets");

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async () => {
    setIsLoading(true);
    try {
      const data = await getAllSweets();
      setSweets(data);
    } catch (err) {
      console.error("Failed to load sweets", err);
    } finally {
      setIsLoading(false);
    }
  };

  const isAdmin = user?.role === "admin";
  if (!isAdmin) return <div>Access denied</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-black dark:bg-gray-900">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🛠️ Admin Dashboard
              </h1>
              <p className="mt-2 text-gray-900">
                Manage your sweet shop inventory
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/dashboard"
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                ← Back to Dashboard
              </Link>
              <button
                onClick={() => setShowForm(!showForm)}
                className={`px-6 py-3 font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg ${
                  showForm
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-gray-900"
                }`}
              >
                {showForm ? "❌ Cancel" : "➕ Add New Sweet"}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("sweets")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === "sweets"
                  ? "bg-gray-900 text-gray-300 hover:bg-gray-900"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-100"
              }`}
            >
              🍭 Sweet Management
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === "users"
                  ? "bg-gray-900 text-gray-300 hover:bg-gray-900"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-100"
              }`}
            >
              👥 User Management
            </button>
          </div>
        </div>

        {/* Sweet Management Tab */}
        {activeTab === "sweets" && (
          <>
            {/* Sweet Form */}
            {showForm && (
              <div className="flex justify-center mb-8">
                <SweetForm
                  onSuccess={() => {
                    loadSweets();
                    setShowForm(false);
                  }}
                />
              </div>
            )}
          </>
        )}

        {/* Sweet Management Content */}
        {activeTab === "sweets" && (
          <div className="text-gray-900 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                📦 Inventory Management
              </h2>
              <div className="text-gray-900">
                Total Sweets:{" "}
                <span className="font-bold text-purple-600">
                  {sweets.length}
                </span>
              </div>
            </div>

            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                  <p>Loading sweets...</p>
                </div>
              </div>
            )}

            {!isLoading && sweets.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🍭</div>
                <p className="text-lg">No sweets in inventory</p>
                <p>Add your first sweet using the form above!</p>
              </div>
            )}

            {!isLoading && sweets.length > 0 && (
              <SweetList
                initialSweets={sweets}
                showAdminControls={true}
                onPurchase={() => {}}
                onRestock={loadSweets}
              />
            )}
          </div>
        )}

        {/* User Management Content */}
        {activeTab === "users" && <UserManagement />}
      </div>
    </div>
  );
};

export default AdminPage;
