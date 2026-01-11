import { useNavigate } from "react-router-dom";
import "./CartPage.css";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartPageProps {
  items?: CartItem[];
  onCheckout?: () => void;
  onRemoveItem?: (productId: number) => void;
  onUpdateQuantity?: (productId: number, quantity: number) => void;
}

function CartPage({
  items = [],
  onCheckout,
  onRemoveItem,
  onUpdateQuantity,
}: CartPageProps) {
  const navigate = useNavigate();
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (onUpdateQuantity) {
      onUpdateQuantity(productId, newQuantity);
    }
  };

  const handleRemove = (productId: number) => {
    if (onRemoveItem) {
      onRemoveItem(productId);
    }
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Start adding products to your cart to get started</p>
          <button className="continue-shopping-button">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <section className="cart-items">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>
                      <div className="quantity-control">
                        <button
                          className="qty-btn"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="qty-input"
                          min="1"
                        />
                        <button
                          className="qty-btn"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        className="remove-button"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="cart-summary">
            <div className="summary-card">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Items ({itemCount}):</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="summary-row">
                <span>Tax:</span>
                <span>${(totalPrice * 0.1).toFixed(2)}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${(totalPrice * 1.1).toFixed(2)}</span>
              </div>
              <button
                className="checkout-button"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
              <button
                className="continue-button"
                onClick={() => navigate("/products")}
              >
                Continue Shopping
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default CartPage;
