import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import menu from "../data/database";
import { useState } from "react";

function Admin() {
  const [products, setProducts] = useState(menu);

  const deleteProduct = (id) => {
    const updatedProducts = products.filter((item) => item.id !== id);
    setProducts(updatedProducts);
  };

  return (
    <>
      <Navbar />

      <section className="menu">
        <h2>Admin Panel</h2>

        <div className="menu-container">
          {products.map((item) => (
            <div key={item.id} className="menu-item">
              <img src={item.image} alt={item.name} />

              <h3>{item.name}</h3>

              <p>${item.price}</p>

              <p>Category: {item.category}</p>

              <button
                style={{ background: "#e74c3c" }}
                onClick={() => deleteProduct(item.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Admin;
