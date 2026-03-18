import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import showAlert from "../utils/showAlert";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    const savedUser = JSON.parse(localStorage.getItem("beancraft_account"));

    if (!savedUser) {
      showAlert("Please create an account first");
      return;
    }

    if (email !== savedUser.email || password !== savedUser.password) {
      showAlert("Invalid email or password");
      return;
    }

    showAlert("Login successful!");

    localStorage.setItem("beancraft_user", "loggedin");

    e.target.reset();

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <>
      <Navbar />

      <section className="login-body hero">
        <div className="login-container">
          <a href="/" className="close-login">
            ❌
          </a>

          <h2>Login</h2>

          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" required />

            <input type="password" placeholder="Password" required />

            <button type="submit">Login</button>
          </form>

          <p className="signup-link">
            Don't have an account? <a href="/signup">Signup</a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Login;
