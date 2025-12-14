import { useEffect, useState } from "react";
import api from "../../api/api";
import AdminNavbar from "../../components/Navbar";
import "./ManageSweets.css";

const ManageSweets = () => {
  const [sweets, setSweets] = useState([]);
  const [filteredSweets, setFilteredSweets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
  });
  const [searchForm, setSearchForm] = useState({
    name: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [restockForm, setRestockForm] = useState({
    id: "",
    quantity: "",
  });
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [viewMode, setViewMode] = useState("grid"); // grid or table
  const [sortBy, setSortBy] = useState("name"); // name, price, quantity
  const [sortOrder, setSortOrder] = useState("asc"); // asc or desc

  // Fetch all sweets
  const fetchSweets = async () => {
    try {
      setLoading(true);
      const res = await api.get("/sweets");
      setSweets(res.data);
      setFilteredSweets(res.data);
    } catch (error) {
      showMessage("Error loading sweets: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Search sweets
  const searchSweets = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (searchForm.name) params.append("name", searchForm.name);
      if (searchForm.category) params.append("category", searchForm.category);
      if (searchForm.minPrice) params.append("minPrice", searchForm.minPrice);
      if (searchForm.maxPrice) params.append("maxPrice", searchForm.maxPrice);

      const res = await api.get(`/sweets/search?${params.toString()}`);
      setFilteredSweets(res.data);
      showMessage(`Found ${res.data.length} result${res.data.length !== 1 ? 's' : ''}`, "success");
    } catch (error) {
      showMessage("Error searching sweets: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Reset search
  const resetSearch = () => {
    setSearchForm({
      name: "",
      category: "",
      minPrice: "",
      maxPrice: "",
    });
    setFilteredSweets(sweets);
    showMessage("Search filters cleared", "info");
  };

  // Sort sweets
  const handleSort = (field) => {
    const newOrder = sortBy === field && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(field);
    setSortOrder(newOrder);
    
    const sorted = [...filteredSweets].sort((a, b) => {
      if (field === "name" || field === "category") {
        return newOrder === "asc" 
          ? a[field].localeCompare(b[field])
          : b[field].localeCompare(a[field]);
      } else {
        return newOrder === "asc" 
          ? a[field] - b[field]
          : b[field] - a[field];
      }
    });
    
    setFilteredSweets(sorted);
  };

  // Add or Update sweet
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingId) {
        await api.put(`/sweets/${editingId}`, form);
        showMessage("Sweet updated successfully!", "success");
        setEditingId(null);
      } else {
        await api.post("/sweets", form);
        showMessage("Sweet added successfully!", "success");
      }
      setForm({ name: "", category: "", price: "", quantity: "", description: "" });
      fetchSweets();
    } catch (error) {
      showMessage("Error saving sweet: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Edit sweet
  const editSweet = (sweet) => {
    setForm({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
      description: sweet.description || "",
    });
    setEditingId(sweet.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cancel edit
  const cancelEdit = () => {
    setForm({ name: "", category: "", price: "", quantity: "", description: "" });
    setEditingId(null);
  };

  // Open delete modal
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // Delete sweet
  const deleteSweet = async () => {
    try {
      setLoading(true);
      await api.delete(`/sweets/${deleteId}`);
      showMessage("Sweet deleted successfully", "success");
      setShowDeleteModal(false);
      setDeleteId(null);
      fetchSweets();
    } catch (error) {
      showMessage("Error deleting sweet: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Restock sweet
  const handleRestock = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post(`/sweets/${restockForm.id}/restock?quantity=${restockForm.quantity}`);
      showMessage("Sweet restocked successfully!", "success");
      setShowRestockModal(false);
      setRestockForm({ id: "", quantity: "" });
      fetchSweets();
    } catch (error) {
      showMessage("Error restocking sweet: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Open restock modal
  const openRestockModal = (sweet) => {
    setRestockForm({ id: sweet.id, quantity: "" });
    setShowRestockModal(true);
  };

  // Show message
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 4000);
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  // Get low stock count
  const lowStockCount = filteredSweets.filter(s => s.quantity < 10).length;

  return (
    <>
      <AdminNavbar />
      
      <div className="manage-sweets-container">
        {/* Message Toast */}
        {message.text && (
          <div className={`toast toast-${message.type}`}>
            <div className="toast-icon">
              {message.type === "success" && "✓"}
              {message.type === "error" && "✕"}
              {message.type === "info" && "ℹ"}
            </div>
            <span>{message.text}</span>
          </div>
        )}

        {/* Page Header */}
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">Inventory Management</h1>
            <p className="page-subtitle">Manage your sweet products, pricing, and stock levels</p>
          </div>
        
        </div>

        {/* Add/Edit Form */}
        <div className="form-section">
          <div className="section-header">
            <h2 className="section-title">
              {editingId ? (
                <>
                  <span className="icon">✏️</span> Edit Product
                </>
              ) : (
                <>
                  <span className="icon">➕</span> Add New Product
                </>
              )}
            </h2>
            {editingId && (
              <button className="btn-text" onClick={cancelEdit}>
                Cancel Editing
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-grid">
              <div className="form-field">
                <label className="form-label">
                  Product Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Gulab Jamun"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-field">
                <label className="form-label">
                  Category <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Traditional"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  required
                />
              </div>

              <div className="form-field">
                <label className="form-label">
                  Price (₹) / kg<span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <span className="input-icon">₹</span>
                  <input
                    type="number"
                    step="0.01"
                    className="form-input with-icon"
                    placeholder="0.00"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">
                  Quantity <span className="required">*</span>
                </label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="0"
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                placeholder="Add product description (optional)"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows="3"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner"></span> Saving...
                  </>
                ) : (
                  <>
                    {editingId ? "Update Product" : "Add Product"}
                  </>
                )}
              </button>
              {editingId && (
                <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Search & Filter Section */}
        <div className="search-section">
          <div className="section-header">
            <h2 className="section-title">
              <span className="icon">🔍</span> Search & Filter
            </h2>
          </div>

          <form onSubmit={searchSweets} className="search-form">
            <div className="search-grid">
              <div className="form-field">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Search by name..."
                  value={searchForm.name}
                  onChange={(e) => setSearchForm({ ...searchForm, name: e.target.value })}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Filter by category..."
                  value={searchForm.category}
                  onChange={(e) => setSearchForm({ ...searchForm, category: e.target.value })}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Min Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-input"
                  placeholder="0"
                  value={searchForm.minPrice}
                  onChange={(e) => setSearchForm({ ...searchForm, minPrice: e.target.value })}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Max Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-input"
                  placeholder="1000"
                  value={searchForm.maxPrice}
                  onChange={(e) => setSearchForm({ ...searchForm, maxPrice: e.target.value })}
                />
              </div>
            </div>

            <div className="search-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="2"/>
                  <path d="M11 11L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Search Products
              </button>
              <button type="button" className="btn btn-secondary" onClick={resetSearch}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C9.84871 2 11.4996 2.89002 12.5355 4.27639" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 2V5H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Reset Filters
              </button>
            </div>
          </form>
        </div>

        {/* Products List Section */}
        <div className="products-section">
          <div className="section-header">
            <div className="header-left">
              <h2 className="section-title">
                <span className="icon">📦</span> All Products
              </h2>
              <span className="results-count">{filteredSweets.length} items</span>
            </div>
            <div className="header-right">
              <div className="sort-controls">
                <label className="sort-label">Sort by:</label>
                <select 
                  className="sort-select"
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    setSortBy(field);
                    setSortOrder(order);
                    handleSort(field);
                  }}
                >
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="price-asc">Price (Low-High)</option>
                  <option value="price-desc">Price (High-Low)</option>
                  <option value="quantity-asc">Stock (Low-High)</option>
                  <option value="quantity-desc">Stock (High-Low)</option>
                </select>
              </div>
              <div className="view-toggle">
                <button 
                  className={`toggle-btn ${viewMode === "grid" ? "active" : ""}`}
                  onClick={() => setViewMode("grid")}
                  title="Grid view"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="12" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="2" y="12" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="12" y="12" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </button>
                <button 
                  className={`toggle-btn ${viewMode === "table" ? "active" : ""}`}
                  onClick={() => setViewMode("table")}
                  title="Table view"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="2" y="3" width="16" height="3" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="2" y="9" width="16" height="3" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="2" y="15" width="16" height="3" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {loading && (
            <div className="loading-state">
              <div className="loading-spinner-large"></div>
              <p>Loading products...</p>
            </div>
          )}

          {!loading && filteredSweets.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>No Products Found</h3>
              <p>Try adjusting your search filters or add a new product to get started.</p>
            </div>
          )}

          {!loading && filteredSweets.length > 0 && (
            <>
              {viewMode === "grid" ? (
                <div className="products-grid">
                  {filteredSweets.map((sweet) => (
                    <div key={sweet.id} className="product-card">
                      <div className="product-header">
                        <div className="product-icon">🍬</div>
                        <span className={`stock-indicator ${sweet.quantity < 10 ? 'low' : 'good'}`}>
                          {sweet.quantity < 10 ? '⚠ Low Stock' : '✓ In Stock'}
                        </span>
                      </div>

                      <div className="product-body">
                        <h3 className="product-name">{sweet.name}</h3>
                        <span className="product-category">{sweet.category}</span>
                        {sweet.description && (
                          <p className="product-description">{sweet.description}</p>
                        )}
                      </div>

                      <div className="product-info">
                        <div className="info-item">
                          <span className="info-label">Price</span>
                          <span className="info-value price">₹{sweet.price}/kg</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Stock</span>
                          <span className={`info-value ${sweet.quantity < 10 ? 'low-stock' : ''}`}>
                            {sweet.quantity}
                          </span>
                        </div>
                      </div>

                      <div className="product-actions">
                        <button 
                          className="action-btn edit"
                          onClick={() => editSweet(sweet)}
                          disabled={loading}
                          title="Edit product"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M11.5 1.5L14.5 4.5L5 14H2V11L11.5 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Edit
                        </button>
                        <button 
                          className="action-btn restock"
                          onClick={() => openRestockModal(sweet)}
                          disabled={loading}
                          title="Restock product"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                          Restock
                        </button>
                        <button 
                          className="action-btn delete"
                          onClick={() => openDeleteModal(sweet.id)}
                          disabled={loading}
                          title="Delete product"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M2 4H14M6 4V2H10V4M6 7V12M10 7V12M3 4L4 14H12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="products-table-container">
                  <table className="products-table">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSweets.map((sweet) => (
                        <tr key={sweet.id}>
                          <td className="product-name-cell">
                            <div className="cell-content">
                              <span className="cell-icon">🍬</span>
                              <span className="cell-text">{sweet.name}</span>
                            </div>
                          </td>
                          <td>
                            <span className="category-tag">{sweet.category}</span>
                          </td>
                          <td className="price-cell">₹{sweet.price}</td>
                          <td>
                            <span className={`stock-badge ${sweet.quantity < 10 ? 'low' : 'good'}`}>
                              {sweet.quantity}
                            </span>
                          </td>
                          <td className="description-cell">
                            {sweet.description || "-"}
                          </td>
                          <td>
                            <div className="table-actions">
                              <button 
                                className="icon-btn edit"
                                onClick={() => editSweet(sweet)}
                                title="Edit"
                              >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                  <path d="M11.5 1.5L14.5 4.5L5 14H2V11L11.5 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </button>
                              <button 
                                className="icon-btn restock"
                                onClick={() => openRestockModal(sweet)}
                                title="Restock"
                              >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                  <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                              </button>
                              <button 
                                className="icon-btn delete"
                                onClick={() => openDeleteModal(sweet.id)}
                                title="Delete"
                              >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                  <path d="M2 4H14M6 4V2H10V4M6 7V12M10 7V12M3 4L4 14H12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>

        {/* Restock Modal */}
        {showRestockModal && (
          <div className="modal-overlay" onClick={() => setShowRestockModal(false)}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">
                  <span className="modal-icon">📦</span>
                  Restock Product
                </h3>
                <button 
                  className="modal-close"
                  onClick={() => setShowRestockModal(false)}
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleRestock}>
                <div className="modal-body">
                  <div className="form-field">
                    <label className="form-label">
                      Quantity to Add <span className="required">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="Enter quantity to add"
                      value={restockForm.quantity}
                      onChange={(e) => setRestockForm({ ...restockForm, quantity: e.target.value })}
                      required
                      min="1"
                      autoFocus
                    />
                    <p className="form-hint">Enter the number of units to add to current stock</p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner"></span> Restocking...
                      </>
                    ) : (
                      "Confirm Restock"
                    )}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowRestockModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
            <div className="modal-container danger" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">
                  <span className="modal-icon">⚠️</span>
                  Confirm Deletion
                </h3>
                <button 
                  className="modal-close"
                  onClick={() => setShowDeleteModal(false)}
                >
                  ✕
                </button>
              </div>
              <div className="modal-body">
                <p className="warning-text">
                  Are you sure you want to delete this product? This action cannot be undone.
                </p>
              </div>
              <div className="modal-footer">
                <button 
                  className="btn btn-danger" 
                  onClick={deleteSweet}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner"></span> Deleting...
                    </>
                  ) : (
                    "Delete Product"
                  )}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageSweets;