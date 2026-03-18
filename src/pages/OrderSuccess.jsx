import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ProductStatsContext } from "../context/ProductStatsContext";
import showAlert from "../utils/showAlert"; // ✅ ADD THIS
import { Link } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addRating } = useContext(ProductStatsContext);

  const orderData = location.state;

  const [ratings, setRatings] = useState({});

  if (!orderData) {
    return (
      <>
        <Navbar />
        <section className="order-success">
          <h2>No order found</h2>
          <button onClick={() => navigate("/")}>Go Home</button>
        </section>
        <Footer />
      </>
    );
  }

  const { items, payment, total } = orderData;

  // ⭐ HANDLE RATING (IMPROVED)
  const handleRating = (id, value) => {
    // ✅ PREVENT MULTIPLE CLICKS SPAM
    if (ratings[id]) {
      showAlert("You already rated this item!");
      return;
    }

    addRating(id, value); // 🔥 SAVE TO CONTEXT

    setRatings((prev) => ({
      ...prev,
      [id]: value,
    }));

    showAlert("⭐ Rating submitted!");
  };

  return (
    <>
      <Navbar />

      <section className="order-success">
        <h2>🎉 Order Placed Successfully!</h2>

        <h3>Payment Method: {payment}</h3>

        <h3>Your Items:</h3>

        <div className="order-items">
          {items.map((item) => (
            <div key={item.id} className="order-card">
              <img src={item.image} alt={item.name} />

              <h3>{item.name}</h3>

              <p>Quantity: {item.qty}</p>

              <p>Price: ${(item.price * item.qty).toFixed(2)}</p>

              {/* ⭐⭐⭐⭐⭐ INTERACTIVE STARS */}
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleRating(item.id, star)}
                    style={{
                      cursor: "pointer",
                      fontSize: "22px",
                      transition: "0.2s",
                      color: (ratings[item.id] || 0) >= star ? "gold" : "#ccc",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* ✅ SHOW USER RATING */}
              {ratings[item.id] && (
                <p className="user-rating">You rated: ⭐ {ratings[item.id]}</p>
              )}
            </div>
          ))}
        </div>

        <h2>Total Paid: ${total.toFixed(2)}</h2>

        <Link to="/" className="order-btn">
          ← Back to Home
        </Link>
      </section>

      <Footer />
    </>
  );
}

export default OrderSuccess;
