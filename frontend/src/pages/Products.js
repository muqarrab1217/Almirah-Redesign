import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Heart, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar'; // Import Navbar
import Footer from '../components/Footer'; // Import Footer
import '../styles/Products.css'; // Import CSS

function ProductsPage() {
  // Mock data
  const CATEGORIES = ['All', 'Clothing', 'Shoes', 'Accessories', 'Beauty'];
  const BRANDS = ['All Brands', 'LUXE', 'Stella', 'Harper', 'Vogue'];
  const SORT_OPTIONS = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'priceAsc', label: 'Price: Low to High' },
    { value: 'priceDesc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
  ];

  // Sample products data
  const products = [
    // Mock products would go here
    // Example:
    {
      id: 1,
      name: 'Classic White Shirt',
      price: 89.99,
      originalPrice: 120,
      rating: 4,
      reviewCount: 42,
      image: '/api/placeholder/400/500',
      category: 'Clothing',
      brand: 'LUXE',
      inStock: true
    },
    // More products...
  ];

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [selectedSort, setSelectedSort] = useState('featured');

  // Filter products
  const filteredProducts = products.filter((product) => {
    // Filter by search query
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by category
    if (selectedCategory !== 'All' && product.category !== selectedCategory) {
      return false;
    }
    
    // Filter by brand
    if (selectedBrand !== 'All Brands' && product.brand !== selectedBrand) {
      return false;
    }
    
    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // Filter by rating
    if (product.rating < minRating) {
      return false;
    }
    
    // Filter by stock
    if (showInStockOnly && !product.inStock) {
      return false;
    }
    
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (selectedSort) {
      case 'priceAsc':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // Custom Slider component to replace Radix UI slider
  const CustomSlider = ({ value, onChange, min, max }) => {
    const handleSliderChange = (e, index) => {
      const newValue = parseInt(e.target.value, 10);
      const newValues = [...value];
      newValues[index] = newValue;
      
      // Ensure min value <= max value
      if (index === 0 && newValue > value[1]) {
        newValues[1] = newValue;
      } else if (index === 1 && newValue < value[0]) {
        newValues[0] = newValue;
      }
      
      onChange(newValues);
    };

    return (
      <div className="slider-container">
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={(e) => handleSliderChange(e, 0)}
          className="slider min-slider"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={(e) => handleSliderChange(e, 1)}
          className="slider max-slider"
        />
      </div>
    );
  };

  return (
    <div className="products-page">
      <Navbar />

      {/* Breadcrumb */}
      <div className="breadcrumb-container">
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span>/</span>
          <span className="breadcrumb-current">Products</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Search Bar */}
        <div className="search-bar-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <Search className="search-icon" />
          </div>
        </div>

        <div className="product-layout">
          {/* Filters Sidebar */}
          <div className="filters-sidebar">
            <div className="filter-section">
              <h3 className="filter-title">Categories</h3>
              <div className="filter-options">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`filter-option ${selectedCategory === category ? 'selected' : ''}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Price Range</h3>
              <CustomSlider
                value={priceRange}
                onChange={setPriceRange}
                min={0}
                max={1000}
              />
              <div className="price-range-display">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Brands</h3>
              <div className="filter-options">
                {BRANDS.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`filter-option ${selectedBrand === brand ? 'selected' : ''}`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Rating</h3>
              <div className="filter-options">
                {[4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`rating-option ${minRating === rating ? 'selected' : ''}`}
                  >
                    <div className="stars-container">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`star-icon ${index < rating ? 'filled' : ''}`}
                        />
                      ))}
                    </div>
                    <span>& Up</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <label className="stock-label">
                <input
                  type="checkbox"
                  checked={showInStockOnly}
                  onChange={(e) => setShowInStockOnly(e.target.checked)}
                  className="stock-checkbox"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </div>

          {/* Products Grid */}
          <div className="products-grid-container">
            {/* Sort Options */}
            <div className="sort-container">
              <div className="sort-dropdown">
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="sort-select"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="dropdown-icon" />
              </div>
            </div>

            {/* Products */}
            <div className="products-grid">
              {sortedProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                    <div className="product-overlay" />
                    <button className="quick-view-button">
                      Quick View
                    </button>
                  </div>
                  <div className="product-details">
                    <div className="product-header">
                      <h3 className="product-name">{product.name}</h3>
                      <button className="wishlist-button">
                        <Heart className="heart-icon" />
                      </button>
                    </div>
                    <div className="product-rating">
                      <div className="stars-container">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className={`star-icon ${index < product.rating ? 'filled' : ''}`}
                          />
                        ))}
                      </div>
                      <span className="review-count">({product.reviewCount})</span>
                    </div>
                    <div className="product-price">
                      <span className="current-price">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="original-price">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              <div className="pagination-buttons">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`page-button ${page === 1 ? 'active' : ''}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProductsPage;