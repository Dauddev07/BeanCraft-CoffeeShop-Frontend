import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { ProductStatsContext } from "../context/ProductStatsContext";
import showAlert from "../utils/showAlert";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart } =
    useContext(CartContext);

  const { recordOrder } = useContext(ProductStatsContext);

  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");

  // ✅ NEW: Prevent unwanted redirect during order
  const [isOrdering, setIsOrdering] = useState(false);

  // ✅ HANDLE EMPTY CART (ONLY WHEN NOT ORDERING)
  useEffect(() => {
    if (cart.length === 0 && !isOrdering) {
      showAlert("Your cart is empty");

      navigate("/");

      setTimeout(() => {
        const section = document.getElementById("categories");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    }
  }, [cart, isOrdering, navigate]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const gst = subtotal < 40 ? subtotal * 0.1 : 0;
  const total = subtotal + gst;

  const placeOrder = () => {
    if (!paymentMethod) {
      showAlert("Please select a payment method");
      return;
    }

    if (cart.length === 0) {
      showAlert("Your cart is empty");
      return;
    }

    const orderItems = [...cart];

    // ✅ IMPORTANT FIX
    setIsOrdering(true);

    // ✅ RECORD ORDER DATA
    recordOrder(orderItems);

    // ✅ NAVIGATE TO SUCCESS PAGE
    navigate("/order-success", {
      state: {
        items: orderItems,
        payment: paymentMethod,
        total: total,
      },
    });

    // ✅ CLEAR CART AFTER NAVIGATION
    clearCart();
  };

  return (
    <>
      <Navbar />

      <section className="cart-page">
        <h2>Your Cart</h2>

        <div id="cartItems">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />

              <div>
                <h3>{item.name}</h3>

                <p>${item.price}</p>

                <div className="cart-qty">
                  <button onClick={() => decreaseQty(item.id)}>-</button>

                  <span>{item.qty}</span>

                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>

                <p>Total: ${(item.price * item.qty).toFixed(2)}</p>

                <button
                  onClick={() => {
                    removeFromCart(item.id);
                    showAlert(item.name + " removed from cart");
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div id="checkoutBox">
          <div id="totalPrice">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>GST (10% if &lt; $40): ${gst.toFixed(2)}</p>
            <h3>Total: ${total.toFixed(2)}</h3>
          </div>

          <div className="payment-options">
            <h4>Select Payment Method</h4>

            <label>
              <input
                type="radio"
                name="payment"
                value="Online Payment"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Online Payment
            </label>

            <label>
              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>
          </div>

          <button className="order-btn" onClick={placeOrder}>
            Place Order
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Cart;
