import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import showAlert from "../utils/showAlert";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    const user = {
      name: name,
      email: email,
      password: password,
    };

    localStorage.setItem("beancraft_account", JSON.stringify(user));

    showAlert("Account created successfully!");

    e.target.reset();

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <>
      <Navbar />

      <section className="login-body">
        <div className="login-container">
          <a href="/" className="close-login">
            ❌
          </a>

          <h2>Create Account</h2>

          <form onSubmit={handleSignup}>
            <input type="text" placeholder="Full Name" required />

            <input type="email" placeholder="Email" required />

            <input type="password" placeholder="Password" required />

            <button type="submit">Signup</button>
          </form>

          <p className="signup-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Signup;
