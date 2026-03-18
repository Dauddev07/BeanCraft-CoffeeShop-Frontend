import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { ProductStatsContext } from "../context/ProductStatsContext";
import menu from "../data/database";

function Home() {
  const { stats } = useContext(ProductStatsContext);

  // 🔥 GET BEST SELLERS (CLEAN + SAFE)
  const getBestProducts = () => {
    return Object.entries(stats)
      .map(([id, data]) => {
        const product = menu.find((item) => item.id === Number(id));
        if (!product) return null;

        const ratings = data.ratings || [];

        const avgRating =
          ratings.length > 0
            ? ratings.reduce((a, b) => a + b, 0) / ratings.length
            : 0;

        const score =
          (data.totalQty || 0) * 1.5 + (data.orders || 0) * 2 + avgRating * 4;

        return {
          ...product,
          score,
          avgRating,
          reviewCount: ratings.length,
        };
      })
      .filter((item) => item && item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  };

  const bestProducts = getBestProducts();

  // ✅ FIX CATEGORY ROUTE
  const getRoute = (category) => {
    if (category === "coffee") return "/coffees";
    if (category === "sweets") return "/sweets";
    if (category === "specials") return "/specials";
    return "/";
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>Fresh Coffee Everyday</h1>
          <p>Start your day with the best coffee.</p>

          <a href="#categories" className="shop-btn">
            Order Now
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section">
        <div className="about-content">
          <h2>About BeanCraft</h2>
          <p>
            BeanCraft is a modern coffee shop serving handcrafted coffee and
            desserts.
          </p>
        </div>
      </section>

      {/* 🏆 BEST SELLERS */}
      {bestProducts.length > 0 && (
        <section className="best-sellers">
          <h2>🔥 Best Sellers</h2>

          <div className="menu-container">
            {bestProducts.map((item) => (
              <Link
                to={getRoute(item.category)} // ✅ FIXED ROUTING
                key={item.id}
                className="menu-item"
              >
                <img src={item.image} alt={item.name} />

                <h3>{item.name}</h3>

                <p>${item.price}</p>

                {/* ⭐ CLEAN RATING */}
                <p className="rating">
                  {item.avgRating > 0 ? (
                    <>
                      ⭐ {item.avgRating.toFixed(1)} ({item.reviewCount}{" "}
                      {item.reviewCount === 1 ? "review" : "reviews"})
                    </>
                  ) : (
                    "No ratings yet"
                  )}
                </p>

                <span className="badge">🔥 Popular</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CATEGORIES */}
      <section id="categories" className="categories-section">
        <h2>Categories</h2>

        <div className="categories-container">
          <Link to="/coffees" className="category-card">
            <img src="/images/Coffee image.jpg" alt="Coffee" />
            <h3>Coffees</h3>
          </Link>

          <Link to="/sweets" className="category-card">
            <img src="/images/Sweets image.jpg" alt="Sweets" />
            <h3>Sweets</h3>
          </Link>

          <Link to="/specials" className="category-card">
            <img src="/images/special image.jpg" alt="Specials" />
            <h3>Specials</h3>
          </Link>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact">
        <h2>Contact Us</h2>

        <div className="contact-container">
          <div className="contact-card">
            <h3>📍Lahore, Pakistan</h3>
            <p>123 Coffee Street</p>
          </div>

          <div className="contact-card">
            <h3>📞 Phone</h3>
            <p>+92 327 6058089</p>
          </div>

          <div className="contact-card">
            <h3>✉ Email</h3>
            <p>Dauddev@gmail.com</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
