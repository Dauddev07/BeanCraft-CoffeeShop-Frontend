import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import menu from "../data/database";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ProductStatsContext } from "../context/ProductStatsContext";
import showAlert from "../utils/showAlert";

function Sweets() {
  const { addToCart } = useContext(CartContext);

  // ✅ GET BOTH FUNCTIONS
  const { getAvgRating, getTotalRatings } = useContext(ProductStatsContext);

  const sweets = menu.filter((item) => item.category === "sweets");

  const [qty, setQty] = useState({});

  // ✅ LOGIN CHECK
  const checkLogin = () => {
    const user = localStorage.getItem("beancraft_user");

    if (!user) {
      showAlert("Please login first to add items to cart");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);

      return false;
    }

    return true;
  };

  // ✅ INCREASE
  const increase = (id) => {
    setQty((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  // ✅ DECREASE
  const decrease = (id) => {
    setQty((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  return (
    <>
      <Navbar />

      <section className="menu">
        <h2>Sweets</h2>

        <div className="menu-container">
          {sweets.map((item) => {
            const avg = getAvgRating(item.id);
            const count = getTotalRatings(item.id);

            return (
              <div key={item.id} className="menu-item">
                <img src={item.image} alt={item.name} />

                <h3>{item.name}</h3>

                <p>${item.price}</p>

                {/* ⭐ IMPROVED RATING */}
                <p className="rating">
                  {avg > 0 ? (
                    <>
                      ⭐ {avg.toFixed(1)} ({count}{" "}
                      {count === 1 ? "review" : "reviews"})
                    </>
                  ) : (
                    "No ratings yet"
                  )}
                </p>

                {/* Quantity */}
                <div className="qty-box">
                  <button onClick={() => decrease(item.id)}>-</button>

                  <span>{qty[item.id] || 1}</span>

                  <button onClick={() => increase(item.id)}>+</button>
                </div>

                {/* Add to Cart */}
                <button
                  className="add-cart-btn"
                  onClick={() => {
                    if (!checkLogin()) return;

                    const quantity = qty[item.id] || 1;

                    for (let i = 0; i < quantity; i++) {
                      addToCart(item);
                    }

                    showAlert(quantity + " " + item.name + " added to cart");

                    // ✅ RESET QTY
                    setQty((prev) => ({ ...prev, [item.id]: 1 }));
                  }}
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Sweets;
