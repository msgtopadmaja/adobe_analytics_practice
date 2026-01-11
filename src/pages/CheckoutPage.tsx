import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./CheckoutPage.css";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface CheckoutPageProps {
  items: CartItem[];
  onPaymentSuccess?: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

function CheckoutPage({ items, onPaymentSuccess }: CheckoutPageProps) {
  const navigate = useNavigate();

  useEffect(() => {
    // Load Razorpay script on component mount
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onerror = () => {
      console.error("Failed to load Razorpay script");
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, []);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = totalPrice * 0.1;
  const finalTotal = totalPrice + tax;

  const handleRazorpayPayment = () => {
    if (!window.Razorpay) {
      alert(
        "Razorpay is not available. Please refresh the page and try again."
      );
      return;
    }

    const options = {
      key: "rzp_test_S2WXUM5XnAoKly", // Your Razorpay Key ID
      amount: 0, // Amount in paise (0 for testing)
      currency: "INR",
      name: "Adobe Web SDK",
      description: "Purchase Adobe Web SDK Plans",
      handler: (response: RazorpayResponse) => {
        // Payment successful
        console.log("Payment successful:", response);
        alert(
          "Payment successful! Payment ID: " + response.razorpay_payment_id
        );
        if (onPaymentSuccess) {
          onPaymentSuccess();
        }
        navigate("/thank-you");
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#007bff",
      },
      modal: {
        ondismiss: () => {
          console.log("Payment modal closed");
        },
      },
      notes: {
        note_key_1: "Test payment for Adobe Web SDK",
      },
    };

    try {
      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", (response: any) => {
        console.error("Payment failed:", response);
        alert("Payment failed! Error: " + response.error.description);
      });
      razorpay.open();
    } catch (error) {
      console.error("Error creating Razorpay instance:", error);
      alert("Failed to initialize payment. Please try again.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <h1>Checkout</h1>
        <div className="checkout-empty">
          <p>Your cart is empty. Add items before checkout.</p>
          <button
            className="back-shopping-button"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-container">
        <section className="checkout-items">
          <h2>Order Items</h2>
          <div className="items-list">
            {items.map((item) => (
              <div key={item.id} className="checkout-item">
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="checkout-summary">
          <div className="summary-card">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total">
              <span>Total Amount:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>

            <button className="pay-button" onClick={handleRazorpayPayment}>
              Pay with Razorpay
            </button>

            <button className="back-button" onClick={() => navigate("/cart")}>
              Back to Cart
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CheckoutPage;
