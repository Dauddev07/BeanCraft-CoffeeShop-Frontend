import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import menu from "../data/database";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Category() {
  const { type } = useParams();
  const { addToCart } = useContext(CartContext);

  const items = menu.filter((item) => item.category === type);

  return (
    <>
      <Navbar />

      <section className="menu">
        <h2>{type} Menu</h2>

        <div className="menu-container">
          {items.length === 0 ? (
            <p>No items available.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="menu-item">
                <img src={item.image} alt={item.name} loading="lazy" />

                <h3>{item.name}</h3>

                <p>${item.price}</p>

                <button
                  className="add-cart-btn"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Category;
