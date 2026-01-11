import { Link } from "react-router-dom";
import "./ProductPage.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  priceNumber: number;
  image: string;
  features: string[];
}

interface ProductPageProps {
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

function ProductPage({ onAddToCart }: ProductPageProps) {
  const handleAddClick = (product: Product) => {
    if (onAddToCart) {
      onAddToCart({
        id: product.id,
        name: product.name,
        price: product.priceNumber,
      });
    }
  };

  return (
    <div className="product-page">
      <header className="products-header">
        <h1>Our Products</h1>
        <p>Choose the perfect plan for your needs</p>
      </header>

      <section className="products-container">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="product-card-link"
          >
            <div className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-content">
                <h2>{product.name}</h2>
                <p className="product-description">{product.description}</p>
                <div className="product-price">{product.price}</div>

                <ul className="product-features">
                  {product.features.map((feature, index) => (
                    <li key={index}>
                      <span className="feature-icon">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className="product-button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddClick(product);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className="comparison-section">
        <h2>Feature Comparison</h2>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Starter</th>
              <th>Standard</th>
              <th>Pro</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Page View Tracking</td>
              <td className="yes">✓</td>
              <td className="yes">✓</td>
              <td className="yes">✓</td>
            </tr>
            <tr>
              <td>Event Tracking</td>
              <td className="no">✗</td>
              <td className="yes">✓</td>
              <td className="yes">✓</td>
            </tr>
            <tr>
              <td>Custom Dashboards</td>
              <td className="no">✗</td>
              <td className="no">✗</td>
              <td className="yes">✓</td>
            </tr>
            <tr>
              <td>API Access</td>
              <td className="no">✗</td>
              <td className="no">✗</td>
              <td className="yes">✓</td>
            </tr>
            <tr>
              <td>Priority Support</td>
              <td className="no">✗</td>
              <td className="no">✗</td>
              <td className="yes">✓</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default ProductPage;
