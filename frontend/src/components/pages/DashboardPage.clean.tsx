import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import SweetList from "../Sweets/SweetList";
import SweetSearch from "../Sweets/SweetSearch";
import PurchaseModal from "../Sweets/PurchaseModal";
import { Sweet, purchaseSweet } from "../../api/sweetsApi";

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [filteredSweets, setFilteredSweets] = useState<Sweet[]>([]);
  const [selectedSweet, setSelectedSweet] = useState<Sweet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 mt-24">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome, {user?.username || user?.email}!
              </h1>
              <p className= "text-gray-900 text-lg">
                Browse and purchase your favorite sweets
              </p>
              {isAdmin && (
                <p className="text-blue-600 font-semibold mt-2">
                  ✓ Admin access enabled
                </p>
              )}
            </div>

            {isAdmin && (
              <Link
                to="/admin"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Go to Admin Panel
              </Link>
            )}
          </div>
        </div>

        <div className="mb-8">
          <SweetSearch
            onSearch={(results: Sweet[]) => setFilteredSweets(results)}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <SweetList
            filter=""
            initialSweets={filteredSweets}
            showAdminControls={isAdmin}
            onPurchase={(sweet) => {
              setSelectedSweet(sweet);
              setIsModalOpen(true);
            }}
            onRestock={() => {
              // Refresh sweets list after restock
              window.location.reload();
            }}
          />
        </div>

        <div className="mt-8 text-center text-gray-900 text-sm">
          <p>
            Questions or need help? Contact our support team at{" "}
            <span className="font-semibold">support@sweetshop.com</span>
          </p>
        </div>
      </div>

      <PurchaseModal
        sweet={selectedSweet}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSweet(null);
        }}
        onConfirm={async () => {
          if (!selectedSweet) return;
          setIsPurchasing(true);
          try {
            await purchaseSweet(selectedSweet._id || selectedSweet.id || "");
            const updatedSweets = filteredSweets.map(s => 
              (s._id || s.id) === (selectedSweet._id || selectedSweet.id) 
                ? { ...s, quantity: s.quantity - 1 }
                : s
            );
            setFilteredSweets(updatedSweets);
            setIsModalOpen(false);
            setSelectedSweet(null);
            alert(`🎉 Successfully purchased ${selectedSweet.name}!`);
          } catch (error: any) {
            alert(`❌ ${error.response?.data?.message || "Purchase failed"}`);
          } finally {
            setIsPurchasing(false);
          }
        }}
        isLoading={isPurchasing}
      />
    </div>
  );
};

export default DashboardPage;
