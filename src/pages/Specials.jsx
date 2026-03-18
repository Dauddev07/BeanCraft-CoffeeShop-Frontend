import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import menu from "../data/database";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ProductStatsContext } from "../context/ProductStatsContext";
import showAlert from "../utils/showAlert";

function Specials() {
  const { addToCart } = useContext(CartContext);

  // ✅ CONTEXT DATA
  const { getAvgRating, getTotalRatings } = useContext(ProductStatsContext);

  const specials = menu.filter((item) => item.category === "specials");

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

  // ✅ INCREASE QTY
  const increase = (id) => {
    setQty((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  // ✅ DECREASE QTY
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
        <h2>Specials</h2>

        <div className="menu-container">
          {specials.map((item) => {
            const avg = getAvgRating(item.id);
            const count = getTotalRatings(item.id);

            return (
              <div key={item.id} className="menu-item">
                <img src={item.image} alt={item.name} />

                <h3>{item.name}</h3>

                <p>${item.price}</p>

                {/* ⭐ RATING DISPLAY (SAFE + CLEAN) */}
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

                {/* Quantity Selector */}
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

                    // ✅ RESET QTY (better UX)
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

export default Specials;
