import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Coffees from "./pages/Coffees";
import Sweets from "./pages/Sweets";
import Specials from "./pages/Specials";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import OrderSuccess from "./pages/OrderSuccess";
function App() {
  return (
    <BrowserRouter>
      <div id="alertBox" className="alert-box"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coffees" element={<Coffees />} />
        <Route path="/sweets" element={<Sweets />} />
        <Route path="/specials" element={<Specials />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
