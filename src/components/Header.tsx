import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

interface HeaderProps {
  cartCount?: number;
}

function Header({ cartCount = 0 }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <h1>Adobe SDK</h1>
        </div>

        <nav className={`header-nav ${isMenuOpen ? "active" : ""}`}>
          <Link
            to="/"
            className={`nav-link ${isActive("/") ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`nav-link ${isActive("/products") ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/cart"
            className={`nav-link cart-button ${
              isActive("/cart") ? "active" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="cart-icon">🛒</span>
            Cart
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </nav>

        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
