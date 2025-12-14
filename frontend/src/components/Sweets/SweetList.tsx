import React, { useEffect, useState } from "react";
import SweetCard from "./SweetCard";
import {
  Sweet,
  getAllSweets,
  searchSweets,
  deleteSweet as apiDeleteSweet,
} from "../../api/sweetsApi";
import { useAuth } from "../../context/AuthContext";
// import { useCart } from "../../context/CartContext";

interface SweetListProps {
  filter?: string;
  onPurchase?: (sweet: Sweet) => void;
  onRestock?: () => void;
  showAdminControls?: boolean;
  initialSweets?: Sweet[];
}

const SweetList: React.FC<SweetListProps> = ({
  filter,
  onPurchase,
  onRestock,
  showAdminControls = false,
  initialSweets,
}) => {
  const [sweets, setSweets] = useState<Sweet[]>(initialSweets || []);
  const [isLoading, setIsLoading] = useState<boolean>(!initialSweets?.length);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  // const { addToCart } = useCart();



  const fetchSweets = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let data: Sweet[] = [];
      if (filter && filter.trim().length > 0) {
        data = await searchSweets(filter, undefined, undefined, undefined);
      } else {
        data = await getAllSweets();
      }
      setSweets(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load sweets");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialSweets && initialSweets.length > 0) {
      setSweets(initialSweets);
      setIsLoading(false);
      setError(null);
      return;
    }
    fetchSweets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, initialSweets]);

  const handleDelete = async (sweetId: string) => {
    if (!window.confirm("Are you sure you want to delete this sweet?")) return;
    try {
      await apiDeleteSweet(sweetId);
      setSweets((prev) => prev.filter((s) => (s._id || s.id) !== sweetId));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete sweet");
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading sweets...</div>;
  }
  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }
  if (sweets.length === 0) {
    return <div className="text-center py-8">No sweets available</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sweets.map((sweet) => (
        <SweetCard
          key={sweet._id || sweet.id}
          sweet={sweet}
          onPurchase={() => onPurchase?.(sweet)}
          onDelete={() => handleDelete(sweet._id || sweet.id || "")}
          onRestock={onRestock}
          showAdminControls={showAdminControls && user?.role === "admin"}
        />
      ))}
    </div>
  );
};

export default SweetList;
