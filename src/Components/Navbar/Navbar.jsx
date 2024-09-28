import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { AuthContext } from "../../Context/AuthContext";
import { CountContext } from "../../Context/CountContext";

export default function Navbar() {
  let { isLogin, setIsLogin } = useContext(AuthContext);
  let {cartCount}=useContext(CountContext);
  function logout(){
    localStorage.removeItem('token')
    setIsLogin(false);
  }
  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="freShCart" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {isLogin ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    Cart
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/products">
                    Products
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link className="nav-link" to="/categories">
                    Categories
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/brands">
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/allorders">
                   Orders
                  </Link>
                </li>
              </ul>
            ) : null}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item cursor-pointer">

                <i className="fab fa-instagram mx-2"></i>
                <i className="fab fa-facebook mx-2"></i>
                <i className="fab fa-tiktok mx-2"></i>
                <i className="fab fa-twitter mx-2"></i>
                <i className="fab fa-linkedin mx-2"></i>
                <i className="fab fa-youtube mx-2"></i>
                {/* <Link className="text-decoration-none text-black" to="/cart">
                  <i class="fa-solid fa-cart-shopping"></i>
                  </Link> */}
                 
                  <i> {cartCount}</i>
              </li>
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0">
              {!isLogin ? (
                <>
                  {" "}
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              ) : null}
              {isLogin ? (
                <li className="nav-item">
                  <a onClick={logout} className="nav-link cursor-pointer">
                    Logout
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
