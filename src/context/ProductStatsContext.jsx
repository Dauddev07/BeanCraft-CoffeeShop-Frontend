import { createContext, useState, useEffect } from "react";

export const ProductStatsContext = createContext();

export const ProductStatsProvider = ({ children }) => {
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem("productStats");
    return saved ? JSON.parse(saved) : {};
  });

  // ✅ SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("productStats", JSON.stringify(stats));
  }, [stats]);

  // ✅ RECORD ORDER
  const recordOrder = (items) => {
    setStats((prev) => {
      const updated = { ...prev };

      items.forEach((item) => {
        if (!updated[item.id]) {
          updated[item.id] = {
            ratings: [],
            totalQty: 0,
            orders: 0,
          };
        }

        updated[item.id].totalQty += item.qty;
        updated[item.id].orders += 1;
      });

      return updated;
    });
  };

  // ✅ ADD RATING
  const addRating = (id, rating) => {
    setStats((prev) => {
      const product = prev[id] || {
        ratings: [],
        totalQty: 0,
        orders: 0,
      };

      return {
        ...prev,
        [id]: {
          ...product,
          ratings: [...product.ratings, Number(rating)], // ✅ FIX HERE
        },
      };
    });
  };

  // ✅ GET AVERAGE RATING (FIXED NAME)
  const getAvgRating = (id) => {
    const product = stats[id];

    if (!product || product.ratings.length === 0) return 0;

    const sum = product.ratings.reduce((a, b) => a + b, 0);
    return sum / product.ratings.length; // return NUMBER
  };

  // ✅ GET TOTAL RATINGS
  const getTotalRatings = (id) => {
    return stats[id]?.ratings?.length || 0;
  };

  // ✅ BEST SELLER LOGIC (IMPROVED)
  const getBestSeller = () => {
    let best = null;
    let bestScore = 0;

    Object.keys(stats).forEach((id) => {
      const p = stats[id];

      const avgRating =
        p.ratings.length > 0
          ? p.ratings.reduce((a, b) => a + b, 0) / p.ratings.length
          : 0;

      const score =
        (p.totalQty || 0) * 1.5 + (p.orders || 0) * 2 + avgRating * 4;

      if (score > bestScore) {
        bestScore = score;
        best = id;
      }
    });

    return best;
  };

  return (
    <ProductStatsContext.Provider
      value={{
        stats,
        recordOrder,
        addRating,
        getAvgRating, // ✅ FIXED NAME
        getTotalRatings, // ✅ ADDED (safe usage)
        getBestSeller,
      }}
    >
      {children}
    </ProductStatsContext.Provider>
  );
};
