import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserHome.css';
import Navbar from "../../components/Navbar";

const UserHome = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="user-home-portfolio">
      <Navbar />
      
      {/* Hero Section with Animated Background */}
      <section className="hero-portfolio">
        <div className="hero-bg-animation">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        
        <div className="hero-container">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Welcome to Sweet Spot
          </div>
          
          <h1 className="hero-main-title">
            Where Every Bite
            <span className="title-highlight"> Tells a Story</span>
          </h1>
          
          <p className="hero-subtitle">
            Artisanal sweets crafted with passion, delivered with love.
            Experience the perfect blend of tradition and innovation.
          </p>
          
          <div className="hero-cta-group">
            <button 
              className="cta-primary" 
              onClick={() => navigate("/user/dashboard")}
            >
              <span>Explore Collection</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button className="cta-secondary" onClick={() => navigate("/user/dashboard")}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 9L10 11L12 9M10 11V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>Watch Story</span>
            </button>
          </div>
          
          <div className="hero-stats-mini">
            <div className="stat-mini">
              <span className="stat-value">500+</span>
              <span className="stat-text">Products</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-mini">
              <span className="stat-value">10k+</span>
              <span className="stat-text">Customers</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-mini">
              <span className="stat-value">4.9★</span>
              <span className="stat-text">Rating</span>
            </div>
          </div>
        </div>
        
        <div className="hero-scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-content">
            <span className="section-label">Our Story</span>
            <h2 className="section-heading">
              Crafting Sweet Memories Since Day One
            </h2>
            <p className="section-description">
              At Sweet Spot, we believe every sweet tells a story. From traditional recipes 
              passed down through generations to innovative flavors that push boundaries, 
              we're dedicated to creating moments of pure joy with every bite.
            </p>
            <div className="about-features">
              <div className="about-feature">
                <div className="feature-number">01</div>
                <div className="feature-content">
                  <h4>Premium Quality</h4>
                  <p>Only the finest ingredients make it into our kitchen</p>
                </div>
              </div>
              <div className="about-feature">
                <div className="feature-number">02</div>
                <div className="feature-content">
                  <h4>Handcrafted Love</h4>
                  <p>Every piece is made with care and attention to detail</p>
                </div>
              </div>
              <div className="about-feature">
                <div className="feature-number">03</div>
                <div className="feature-content">
                  <h4>Fresh Daily</h4>
                  <p>Made fresh every morning for the perfect taste</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-visual">
            <div className="visual-card card-large">
              <span className="visual-emoji">🍰</span>
            </div>
            <div className="visual-card card-small card-float-1">
              <span className="visual-emoji">🧁</span>
            </div>
            <div className="visual-card card-small card-float-2">
              <span className="visual-emoji">🍪</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="categories-showcase">
        <div className="showcase-header">
          <span className="section-label">Collections</span>
          <h2 className="section-heading">Popular Categories</h2>
        </div>
        
        <div className="categories-masonry">
          <div className="category-item large">
            <div className="category-image">
              <span className="category-icon">🍰</span>
            </div>
            <div className="category-info">
              <h3>Premium Cakes</h3>
              <p>120+ varieties</p>
              <button className="category-link">
                Explore
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="category-item">
            <div className="category-image">
              <span className="category-icon">🍪</span>
            </div>
            <div className="category-info">
              <h3>Cookies</h3>
              <p>80+ varieties</p>
              <button className="category-link">
                Explore
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="category-item">
            <div className="category-image">
              <span className="category-icon">🍭</span>
            </div>
            <div className="category-info">
              <h3>Candies</h3>
              <p>150+ varieties</p>
              <button className="category-link">
                Explore
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="category-item tall">
            <div className="category-image">
              <span className="category-icon">🧁</span>
            </div>
            <div className="category-info">
              <h3>Cupcakes</h3>
              <p>100+ varieties</p>
              <button className="category-link">
                Explore
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-modern">
        <div className="features-grid-modern">
          <div className="feature-modern">
            <div className="feature-icon-modern">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="8" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M4 12H28M12 8V4M20 8V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Same Day Delivery</h3>
            <p>Order before 2 PM for same-day delivery in your area</p>
          </div>
          
          <div className="feature-modern">
            <div className="feature-icon-modern">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 8V16L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Always Fresh</h3>
            <p>Made fresh daily with no preservatives or artificial flavors</p>
          </div>
          
          <div className="feature-modern">
            <div className="feature-icon-modern">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 4L18.5 13.5L28 16L18.5 18.5L16 28L13.5 18.5L4 16L13.5 13.5L16 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Premium Quality</h3>
            <p>Sourced from the finest ingredients for exceptional taste</p>
          </div>
          
          <div className="feature-modern">
            <div className="feature-icon-modern">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="8" y="8" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 14L15 17L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Secure Checkout</h3>
            <p>Safe and encrypted payment processing for your peace of mind</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <span className="section-label">Reviews</span>
          <h2 className="section-heading">What Our Customers Say</h2>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "Absolutely amazing! The cakes are always fresh and delicious. 
                Sweet Spot has become our go-to for all celebrations."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">S</div>
                <div className="author-info">
                  <h4>Sarah Johnson</h4>
                  <p>Regular Customer</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card featured">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "The quality is unmatched! Every bite feels like a celebration. 
                The delivery is always on time and the packaging is beautiful."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">M</div>
                <div className="author-info">
                  <h4>Michael Chen</h4>
                  <p>Premium Member</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "Best online sweet shop! The variety is incredible and 
                customer service is exceptional. Highly recommended!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">E</div>
                <div className="author-info">
                  <h4>Emily Davis</h4>
                  <p>Happy Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="cta-container">
          <div className="cta-badge">
            <span className="badge-pulse"></span>
            Limited Time Offer
          </div>
          <h2 className="cta-title">
            Ready to Experience Pure Sweetness?
          </h2>
          <p className="cta-description">
            Join over 10,000 happy customers who trust Sweet Spot for their sweet cravings
          </p>
          <button 
            className="cta-final-button" 
            onClick={() => navigate("/user/dashboard")}
          >
            <span>Start Shopping Now</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="cta-trust-badges">
            <div className="trust-badge">
              <span>✓</span> 100% Satisfaction Guarantee
            </div>
            <div className="trust-badge">
              <span>✓</span> Secure Payment
            </div>
            <div className="trust-badge">
              <span>✓</span> Fast Delivery
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserHome;