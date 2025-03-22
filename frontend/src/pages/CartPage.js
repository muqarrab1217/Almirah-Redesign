import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingBag, Search, User, Trash2, Minus, Plus, Instagram, Facebook, Twitter } from 'lucide-react';
import Navbar from '../components/Navbar'; // Import Navbar
import Footer from '../components/Footer'; // Import Footer
import '../styles/CartPage.css'; // Import CSS

const SHIPPING_COST = 10;

function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Women's Summer Dress",
      price: 199.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 2,
      name: 'Classic Denim Jacket',
      price: 149.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=600',
    },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + SHIPPING_COST;

  return (
    <div className="cart-container">
      <Navbar />

      <div className="cart-content">
        <h1 className="cart-title">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Link to="/" className="continue-shopping">Continue Shopping</Link>
          </div>
        ) : (
          <div className="cart-grid">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>${item.price.toFixed(2)}</p>
                    <div className="quantity-control">
                      <button onClick={() => updateQuantity(item.id, -1)}><Minus /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}><Plus /></button>
                      <button onClick={() => removeItem(item.id)} className="remove-item">
                      <Trash2 />
                    </button>
                    </div>
                   
                  </div>
                  <p className="item-total">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-item">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-item">
                <span>Shipping</span>
                <span>${SHIPPING_COST.toFixed(2)}</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="checkout-button">Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default CartPage;
