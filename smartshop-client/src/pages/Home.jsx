import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8080/product-service/api/products')
      .then(response => {
        setProducts(response.data);
        console.log("Fetched products:", response.data);
        setError('');
      })
      .catch(err => {
        setError('Could not fetch products. Please try again later.');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      skuCode: product.name,
      name: product.name,
      price: product.price
    }));
    alert(`✅ ${product.name} added to cart!`);
  };

  // Helper to check if URL is valid (starts with http)
  const getValidImageUrl = (url) => {
    if (url && (url.startsWith('http') || url.startsWith('https'))) {
      return url;
    }
    // Fallback image if URL is missing or invalid
    return "https://placehold.co/300x200?text=No+Image";
  };

  return (
    <div className="container mt-4">
      {/* --- HERO SECTION --- */}
      <div className="text-center mb-5">
        <h2 style={{ fontSize: '2.5em', marginBottom: '0.5rem' }}>
          🏪 Welcome to SmartShop
        </h2>
        <p style={{ fontSize: '1.1em', color: '#666' }}>
          Discover our amazing collection of products
        </p>
      </div>

      {/* --- ERROR MESSAGE --- */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Oops!</strong> {error}
        </div>
      )}

      {/* --- LOADING SPINNER --- */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 fw-bold text-primary">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="alert alert-info text-center py-5">
          <h5>No products available at the moment</h5>
        </div>
      ) : (
        
        /* --- PRODUCT GRID --- */
        <div className="row g-4">
          {products.map((product) => (
            <div className="col-md-6 col-lg-4 col-xl-3" key={product.id}>
              <div className="card shadow-sm h-100 border-0">
                
                {/* 1. PRODUCT IMAGE */}
                <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
                  <img 
                    src={getValidImageUrl(product.imageUrl)} 
                    className="card-img-top" 
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '10px' }}
                    onError={(e) => { 
                        e.target.onerror = null; 
                        e.target.src="https://placehold.co/300x200?text=Error+Loading" 
                    }} 
                  />
                </div>

                <div className="card-body d-flex flex-column">
                  {/* 2. CATEGORY BADGE */}
                  <div className="mb-2">
                     {product.category ? (
                        <span className="badge bg-secondary">{product.category}</span>
                     ) : (
                        <span className="badge bg-light text-dark border">General</span>
                     )}
                  </div>

                  <h5 className="card-title text-dark">{product.name}</h5>
                  
                  <p className="card-text text-muted flex-grow-1 small">
                    {product.description ? 
                      (product.description.length > 60 ? product.description.substring(0, 60) + "..." : product.description)
                      : 'Premium quality product'}
                  </p>
                  
                  <hr />

                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="text-primary fw-bold mb-0">
                      ₹{product.price}
                    </h5>
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;