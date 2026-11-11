import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to StudentHub 🎓</h1>
        <p>Your all-in-one platform for effortless student record management, tracking, and organization.</p>
        
        <div className="cta-buttons">
          <Link to="/students" className="primary-btn">Manage Students</Link>
          <Link to="/about" className="secondary-btn">Learn More</Link>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <h3>⚡ Fast Tracking</h3>
          <p>Instantly search, add, and remove students from your centralized database.</p>
        </div>
        <div className="feature-card">
          <h3>📊 Live Counts</h3>
          <p>Keep track of your total registered student numbers at a glance.</p>
        </div>
        <div className="feature-card">
          <h3>🔒 Secure & Clean</h3>
          <p>Built with React for a seamless, lightning-fast single-page experience.</p>
        </div>
      </div>
    </div>
  );
}

export default Home