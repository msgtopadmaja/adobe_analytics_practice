import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetailPage.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  priceNumber: number;
  image: string;
  features: string[];
}

interface ProductDetailPageProps {
  onAddToCart?: (product: { id: number; name: string; price: number }) => void;
}

const products: Product[] = [
  {
    id: 1,
    name: "Adobe Web SDK Pro",
    description: "Professional web integration toolkit with advanced analytics",
    price: "$0/month",
    priceNumber: 0,
    image: "https://via.placeholder.com/300x200?text=Pro+Package",
    features: [
      "Advanced Analytics",
      "Real-time Tracking",
      "Custom Dashboards",
      "API Access",
      "Priority Support",
    ],
  },
  {
    id: 2,
    name: "Adobe Web SDK Standard",
    description: "Standard web integration for growing businesses",
    price: "$0/month",
    priceNumber: 0,
    image: "https://via.placeholder.com/300x200?text=Standard+Package",
    features: [
      "Basic Analytics",
      "Event Tracking",
      "Standard Reports",
      "Email Support",
    ],
  },
  {
    id: 3,
    name: "Adobe Web SDK Starter",
    description: "Lightweight solution for small projects",
    price: "$0/month",
    priceNumber: 0,
    image: "https://via.placeholder.com/300x200?text=Starter+Package",
    features: ["Page View Tracking", "Basic Reports", "Community Support"],
  },
];

function ProductDetailPage({ onAddToCart }: ProductDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === parseInt(id || "0"));

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="product-not-found">
          <h1>Product Not Found</h1>
          <p>The product you're looking for doesn't exist.</p>
          <button className="back-button" onClick={() => navigate("/products")}>
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddClick = () => {
    if (onAddToCart) {
      onAddToCart({
        id: product.id,
        name: product.name,
        price: product.priceNumber,
      });
    }
  };

  return (
    <div className="product-detail-page">
      <button className="back-button" onClick={() => navigate("/products")}>
        ← Back to Products
      </button>

      <div className="product-detail-container">
        <div className="product-detail-content">
          <h1>{product.name}</h1>
          <p className="product-detail-description">{product.description}</p>

          <div className="product-detail-price">{product.price}</div>

          <div className="product-detail-section">
            <h2>Features</h2>
            <ul className="product-detail-features">
              {product.features.map((feature, index) => (
                <li key={index}>
                  <span className="feature-icon">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="product-detail-section">
            <h2>About This Plan</h2>
            <p>
              This is a comprehensive solution designed to meet your analytics
              and tracking needs. Whether you're just starting out or scaling
              up, this plan provides the tools and support you need to succeed.
            </p>
          </div>

          <div className="product-detail-actions">
            <button className="add-to-cart-button" onClick={handleAddClick}>
              Add to Cart
            </button>
            <button
              className="view-all-plans-button"
              onClick={() => navigate("/products")}
            >
              View All Plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
