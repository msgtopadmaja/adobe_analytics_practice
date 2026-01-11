import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ThankYouPage from "./pages/ThankYouPage";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const CART_STORAGE_KEY = "adobeWebSDK_cart";

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Load cart from localStorage on initial mount
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product: {
    id: number;
    name: string;
    price: number;
  }) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // If item exists, increase quantity
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If new item, add it with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  return (
    <Router>
      <div className="app">
        <Header cartCount={cartItems.length} />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/products"
              element={<ProductPage onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/products/:id"
              element={<ProductDetailPage onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/cart"
              element={
                <CartPage
                  items={cartItems}
                  onRemoveItem={handleRemoveFromCart}
                  onUpdateQuantity={handleUpdateQuantity}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <CheckoutPage
                  items={cartItems}
                  onPaymentSuccess={() => setCartItems([])}
                />
              }
            />
            <Route path="/thank-you" element={<ThankYouPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
