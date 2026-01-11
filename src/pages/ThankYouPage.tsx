import { useNavigate } from "react-router-dom";
import "./ThankYouPage.css";

function ThankYouPage() {
  const navigate = useNavigate();

  return (
    <div className="thank-you-page">
      <div className="thank-you-container">
        <div className="success-icon">✓</div>
        <h1>Thank You!</h1>
        <p className="success-message">Your payment was successful</p>

        <div className="order-details">
          <div className="detail-item">
            <span className="label">Order Status:</span>
            <span className="value success">Confirmed</span>
          </div>
          <div className="detail-item">
            <span className="label">Receipt:</span>
            <span className="value">Check your email for receipt</span>
          </div>
        </div>

        <div className="thank-you-message">
          <h2>What's Next?</h2>
          <ul>
            <li>📧 A confirmation email has been sent to your email address</li>
            <li>📦 Your subscription is now active</li>
            <li>🎉 Welcome to Adobe Web SDK!</li>
            <li>💡 Check your email for setup instructions</li>
          </ul>
        </div>

        <div className="thank-you-actions">
          <button className="home-button" onClick={() => navigate("/")}>
            Back to Home
          </button>
          <button
            className="products-button"
            onClick={() => navigate("/products")}
          >
            Browse More Products
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThankYouPage;
