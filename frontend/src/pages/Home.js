import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import Navbar from '../components/Navbar'; // Import Navbar component
import Footer from '../components/Footer'; // Import Footer component
import { useNavigate } from 'react-router-dom';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2070',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=2071',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=2070',
];

const CATEGORIES = ['Women', 'Men', 'Juniors', 'Accessories', 'Sale'];

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('Women');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const navigate = useNavigate();

  function handleShopNowClick() {
   
    navigate('/products');
  }

  return (
    <div className="home">
    <Navbar />
      {/* Hero Section */}
      <div className="hero">
        {HERO_IMAGES.map((image, index) => (
          <div
            key={image}
            className={`hero-slide ${index === currentImageIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="overlay"></div>
          </div>
        ))}
        <div className="hero-content">
          <h1>New Season Arrivals</h1>
          <p>Discover the latest trends</p>
          <button className="shop-button" onClick={handleShopNowClick}>
            SHOP NOW
            </button>
        </div>
      </div>

      {/* Categories */}
      <div className="categories">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={activeCategory === category ? 'active' : ''}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Featured Products Grid */}
      <div className="featured-products">
        <h2>Featured Collection</h2>
        <div className="product-grid">
          {[1, 2, 3].map((item) => (
            <div key={item} className="product">
              <div className="product-image">
                <img
                  src={`https://almirah.com.pk/cdn/shop/products/blr-005_8.jpg?v=1742118910`}
                  alt={`Product ${item}`}
                />
              </div>
              <div className="product-info">
                <h3>Product Name</h3>
                <p>$199.99</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
