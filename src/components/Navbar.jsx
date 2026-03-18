import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import showAlert from "../utils/showAlert";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { cart, clearCart } = useContext(CartContext);

  const navigate = useNavigate();

  const user = localStorage.getItem("beancraft_user");

  const handleLogout = () => {
    localStorage.removeItem("beancraft_user");

    clearCart();

    showAlert("You have been logged out");

    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  // Scroll to Home section
  const goToSection = (id) => {
    navigate("/");

    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <header>
      <nav className="navbar">
        <h1 className="logo">☕ BeanCraft</h1>

        <div className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/">🏠 Home</Link>
          </li>

          <li>
            <span
              onClick={() => goToSection("about")}
              style={{ cursor: "pointer" }}
            >
              ℹ️ About
            </span>
          </li>

          <li>
            <span
              onClick={() => goToSection("categories")}
              style={{ cursor: "pointer" }}
            >
              📋 Menu
            </span>
          </li>

          <li>
            <span
              onClick={() => goToSection("contact")}
              style={{ cursor: "pointer" }}
            >
              📞 Contact
            </span>
          </li>

          <li>
            {user ? (
              <span onClick={handleLogout} style={{ cursor: "pointer" }}>
                🚪 Logout
              </span>
            ) : (
              <Link to="/login">🔐 Login</Link>
            )}
          </li>
        </ul>

        <div
          className="floating-cart"
          onClick={() => {
            if (cart.length === 0) {
              showAlert("Your cart is empty");
            } else {
              navigate("/cart");
            }
          }}
          style={{ cursor: "pointer" }}
        >
          🛒
          {cart.length > 0 && (
            <span className="cart-count">
              {cart.reduce((sum, item) => sum + item.qty, 0)}
            </span>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
