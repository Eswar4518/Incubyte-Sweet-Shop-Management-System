import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllSweets, Sweet } from "../../api/sweetsApi";
import SweetList from "../Sweets/SweetList";
import SweetSearch from "../Sweets/SweetSearch";
import { useAuth } from "../../context/AuthContext";

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getAllSweets();
      setSweets(data);
    } catch (err: any) {
      setError("Failed to load sweets");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mt-24">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to Sweet Shop 🍬
        </h1>
        <p className="text-xl text-gray-600 mt-2">
          Browse our delicious collection of sweets
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <SweetSearch onSearch={(results) => setSweets(results)} />
      </div>

      {isLoading && (
        <div className="text-center text-gray-600">Loading sweets...</div>
      )}

      {error && <div className="error-alert">{error}</div>}

      {!isLoading && sweets.length === 0 && (
        <div className="text-center text-gray-600">No sweets found</div>
      )}

      {!isLoading && sweets.length > 0 && (
        <div className="max-w-7xl mx-auto">
          <SweetList initialSweets={sweets} onPurchase={loadSweets} />
        </div>
      )}

      {!isAuthenticated && (
        <div className="text-center mt-4">
          <Link to="/register" className="btn-primary">
            Create Account
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
