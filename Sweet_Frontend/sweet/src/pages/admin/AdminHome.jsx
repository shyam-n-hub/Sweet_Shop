import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/Navbar";
import api from "../../api/api";
import "./AdminHome.css";

const AdminHome = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalSweets: 0,
    lowStock: 0,
    totalCategories: 0,
    totalValue: 0,
  });
  const [recentSweets, setRecentSweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/sweets");
      const sweets = res.data;

      const totalSweets = sweets.length;
      const lowStock = sweets.filter(s => s.quantity < 10).length;
      const categories = [...new Set(sweets.map(s => s.category))];
      const totalValue = sweets.reduce((sum, s) => sum + (s.price * s.quantity), 0);

      setStats({
        totalSweets,
        lowStock,
        totalCategories: categories.length,
        totalValue: totalValue.toFixed(2),
      });

      setRecentSweets(sweets.slice(0, 5));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: "Manage Sweets",
      description: "Add, edit, or delete sweets from inventory",
      icon: "🍬",
      path: "/admin/manage-sweets",
      gradient: "linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)",
    },
    {
      title: "View Orders",
      description: "Check customer orders and order history",
      icon: "📦",
      path: "/admin/orders",
      gradient: "linear-gradient(135deg, #FBBF24 0%, #D97706 100%)",
    },
    {
      title: "Inventory Report",
      description: "View detailed inventory and stock reports",
      icon: "📊",
      path: "/admin/reports",
      gradient: "linear-gradient(135deg, #F59E0B 0%, #B45309 100%)",
    },
    {
      title: "User Management",
      description: "Manage user accounts and permissions",
      icon: "👥",
      path: "/admin/users",
      gradient: "linear-gradient(135deg, #FB923C 0%, #F97316 100%)",
    },
  ];

  return (
    <>
      <AdminNavbar />
      
      <div className="admin-home-container">
        {/* Hero Header */}
        <div className="hero-header">
          <div className="hero-content">
            <div className="hero-badge">Admin Portal</div>
            <h1 className="hero-title">
              Welcome to <span className="gradient-text">Sweet Spot</span>
            </h1>
            <p className="hero-subtitle">
              Your comprehensive dashboard for managing inventory, orders, and business insights
            </p>
          </div>
          <div className="hero-decoration">
            <div className="floating-icon">🍭</div>
            <div className="floating-icon delay-1">🍬</div>
            <div className="floating-icon delay-2">🍫</div>
          </div>
        </div>

        {/* Stats Dashboard */}
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading dashboard insights...</p>
          </div>
        ) : (
          <div className="stats-container">
            <div className="stat-card stat-1">
              <div className="stat-icon-wrapper">
                <div className="stat-icon">🍭</div>
              </div>
              <div className="stat-details">
                <p className="stat-label">Total Products</p>
                <h3 className="stat-value">{stats.totalSweets}</h3>
                <div className="stat-trend positive">
                  <span>↗</span> Active inventory
                </div>
              </div>
              <div className="stat-glow"></div>
            </div>

            <div className="stat-card stat-2">
              <div className="stat-icon-wrapper warning">
                <div className="stat-icon">⚠️</div>
              </div>
              <div className="stat-details">
                <p className="stat-label">Low Stock Alert</p>
                <h3 className="stat-value">{stats.lowStock}</h3>
                <div className="stat-trend warning">
                  <span>!</span> Needs attention
                </div>
              </div>
              <div className="stat-glow warning"></div>
            </div>

            <div className="stat-card stat-3">
              <div className="stat-icon-wrapper">
                <div className="stat-icon">📑</div>
              </div>
              <div className="stat-details">
                <p className="stat-label">Categories</p>
                <h3 className="stat-value">{stats.totalCategories}</h3>
                <div className="stat-trend positive">
                  <span>✓</span> Well organized
                </div>
              </div>
              <div className="stat-glow"></div>
            </div>

            <div className="stat-card stat-4">
              <div className="stat-icon-wrapper success">
                <div className="stat-icon">💰</div>
              </div>
              <div className="stat-details">
                <p className="stat-label">Total Value</p>
                <h3 className="stat-value">₹{stats.totalValue}</h3>
                <div className="stat-trend positive">
                  <span>↗</span> Inventory worth
                </div>
              </div>
              <div className="stat-glow success"></div>
            </div>
          </div>
        )}

        {/* Quick Actions Section */}
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Quick Actions</h2>
            <p className="section-subtitle">Navigate to key management areas</p>
          </div>
          
          <div className="actions-grid">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="action-card"
                onClick={() => navigate(action.path)}
              >
                <div className="action-gradient" style={{ background: action.gradient }}></div>
                <div className="action-content">
                  <div className="action-icon-large">{action.icon}</div>
                  <h3 className="action-title">{action.title}</h3>
                  <p className="action-description">{action.description}</p>
                  
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Sweets Section */}
        {!loading && recentSweets.length > 0 && (
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">Recent Inventory</h2>
              <p className="section-subtitle">Latest products in your catalog</p>
            </div>
            
            <div className="recent-sweets-grid">
              {recentSweets.map((sweet) => (
                <div key={sweet.id} className="sweet-card">
                  <div className="sweet-header">
                    <div className="sweet-icon">🍬</div>
                    <span className={`stock-badge ${sweet.quantity < 10 ? 'low' : 'good'}`}>
                      {sweet.quantity < 10 ? 'Low Stock' : 'In Stock'}
                    </span>
                  </div>
                  <div className="sweet-body">
                    <h4 className="sweet-name">{sweet.name}</h4>
                    <span className="sweet-category">{sweet.category}</span>
                  </div>
                  <div className="sweet-footer">
                    <div className="sweet-price">
                      <span className="price-label">Price</span>
                      <span className="price-value">₹{sweet.price}</span>
                    </div>
                    <div className="sweet-quantity">
                      <span className="quantity-label">Stock</span>
                      <span className="quantity-value">{sweet.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="view-all-container">
              <button className="view-all-button" onClick={() => navigate("/admin/manage-sweets")}>
                <span>View All Products</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Feature Cards */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3 className="feature-title">Smart Inventory</h3>
            <p className="feature-description">
              Advanced tracking system with real-time updates and automated low stock alerts
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Lightning Fast</h3>
            <p className="feature-description">
              Optimized performance ensures all changes reflect instantly across the platform
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3 className="feature-title">Bank-Grade Security</h3>
            <p className="feature-description">
              Enterprise-level authentication and encryption protect your sensitive data
            </p>
          </div>
        </div>
        <section className="final-cta">
        <div className="cta-container">
          
          <h2 className="cta-title">
            Ready to Customize New Sweets!
          </h2>
          <p className="cta-description">
            Join over 10,000 happy customers who trust Sweet Spot for their sweet cravings
          </p>
          
          <div className="cta-trust-badges">
            <div className="trust-badge">
              <span>✓</span> ADD Product
            </div>
            <div className="trust-badge">
              <span>✓</span> UPDATE Stock
            </div>
            <div className="trust-badge">
              <span>✓</span> DELETE Product
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default AdminHome;