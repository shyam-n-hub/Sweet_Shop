import { useEffect, useState } from "react";
import api from "../../api/api";
import SweetCard from "../../components/SweetCard";
import UserNavbar from "../../components/Navbar";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  // Fetch sweets with search filters
  const fetchSweets = async () => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams();
      if (search) params.append('name', search);
      if (category) params.append('category', category);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
      
      const endpoint = params.toString() 
        ? `/sweets/search?${params.toString()}`
        : '/sweets';
      
      const res = await api.get(endpoint);
      setSweets(res.data);
    } catch (error) {
      console.error("Error fetching sweets:", error);
      alert("Failed to fetch sweets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const purchaseSweet = async (id, quantity = 1) => {
    try {
      await api.post(`/sweets/${id}/purchase?quantity=${quantity}`);
      fetchSweets();
      alert(`Successfully purchased ${quantity} item(s)!`);
    } catch (error) {
      console.error("Error purchasing sweet:", error);
      alert(error.response?.data?.message || "Failed to purchase sweet. Please try again.");
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchSweets();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search, category, minPrice, maxPrice]);

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
  };

  const hasActiveFilters = search || category || minPrice || maxPrice;

  return (
    <div className="user-dashboard-premium">
      <UserNavbar />
      
      {/* Hero Banner */}
      <div className="dashboard-hero">
        <div className="hero-gradient-bg">
          <div className="gradient-orb-dash orb-dash-1"></div>
          <div className="gradient-orb-dash orb-dash-2"></div>
        </div>
        <div className="hero-content-dash">
          <div className="hero-badge-dash">
            <span className="badge-dot-dash"></span>
            Exclusive Collection
          </div>
          <h1 className="hero-title-dash">
            Explore Our Sweet
            <span className="title-highlight-dash"> Treasures</span>
          </h1>
          <p className="hero-subtitle-dash">
            Handcrafted with love, delivered with care
          </p>
        </div>
      </div>

      <div className="dashboard-main-container">
        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-bar-wrapper">
            <div className="search-input-group">
              <svg className="search-icon-dash" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                className="search-input-dash"
                placeholder="Search for your favorite sweets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button className="clear-search-icon" onClick={() => setSearch("")}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>

            <div className="search-actions">
              <button 
                className={`filter-toggle-btn-dash ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
                Filters
                {hasActiveFilters && <span className="filter-badge">{[search, category, minPrice, maxPrice].filter(Boolean).length}</span>}
              </button>

              <div className="view-mode-toggle">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List View"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="filters-panel-dash">
              <div className="filters-header">
                <h3>Filter Options</h3>
                {hasActiveFilters && (
                  <button className="clear-all-btn" onClick={clearFilters}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="1 4 1 10 7 10"></polyline>
                      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                    </svg>
                    Clear All
                  </button>
                )}
              </div>

              <div className="filters-grid">
                <div className="filter-group-dash">
                  <label className="filter-label">Category</label>
                  <div className="filter-select-wrapper">
                    <select 
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)}
                      className="filter-select-dash"
                    >
                      <option value="">All Categories</option>
                      <option value="Traditional">🏮 Traditional</option>
                      <option value="Modern">✨ Modern</option>
                      <option value="Chocolate">🍫 Chocolate</option>
                      <option value="Dry Fruits">🌰 Dry Fruits</option>
                    </select>
                  </div>
                </div>

                <div className="filter-group-dash">
                  <label className="filter-label">Price Range</label>
                  <div className="price-range-inputs">
                    <div className="price-input-wrapper">
                      <span className="currency-symbol">₹</span>
                      <input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="filter-input-dash"
                      />
                    </div>
                    <span className="price-separator">—</span>
                    <div className="price-input-wrapper">
                      <span className="currency-symbol">₹</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="filter-input-dash"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
            </div>
            <p className="loading-text">Fetching delicious sweets...</p>
          </div>
        ) : sweets.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3 className="empty-title">No Sweets Found</h3>
            <p className="empty-description">
              We couldn't find any sweets matching your criteria.
              <br />Try adjusting your filters or search terms.
            </p>
            {hasActiveFilters && (
              <button className="reset-filters-btn" onClick={clearFilters}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10"></polyline>
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                </svg>
                Reset All Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="results-header">
              <div className="results-info">
                <h2 className="results-count">
                  {sweets.length} {sweets.length === 1 ? 'Sweet' : 'Sweets'} Available
                </h2>
                <p className="results-subtext">
                  Discover our handcrafted collection
                </p>
              </div>
              
              {hasActiveFilters && (
                <div className="active-filters">
                  {search && (
                    <span className="filter-chip">
                      Search: "{search}"
                      <button onClick={() => setSearch("")}>×</button>
                    </span>
                  )}
                  {category && (
                    <span className="filter-chip">
                      {category}
                      <button onClick={() => setCategory("")}>×</button>
                    </span>
                  )}
                  {(minPrice || maxPrice) && (
                    <span className="filter-chip">
                      ₹{minPrice || '0'} - ₹{maxPrice || '∞'}
                      <button onClick={() => { setMinPrice(""); setMaxPrice(""); }}>×</button>
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className={`sweets-display ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
              {sweets.map((sweet) => (
                <SweetCard
                  key={sweet.id}
                  sweet={sweet}
                  onPurchase={purchaseSweet}
                  viewMode={viewMode}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;