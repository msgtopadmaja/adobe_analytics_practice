import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Adobe Web SDK</h1>
          <p>Powerful analytics and tracking for your web applications</p>
          <button className="hero-button">Get Started</button>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Adobe Web SDK?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Advanced Analytics</h3>
            <p>
              Track user behavior and gain deep insights into your application
              usage patterns.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>
              Optimized performance with minimal impact on your application load
              times.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Reliable</h3>
            <p>Enterprise-grade security with 99.9% uptime guarantee.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛠️</div>
            <h3>Easy Integration</h3>
            <p>
              Simple API and comprehensive documentation for quick
              implementation.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Multi-Platform</h3>
            <p>
              Works seamlessly across web, mobile, and desktop applications.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>24/7 Support</h3>
            <p>Dedicated support team ready to help you succeed.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Choose your plan and start tracking today</p>
        <button className="cta-button">View Pricing Plans</button>
      </section>
    </div>
  );
}

export default HomePage;
