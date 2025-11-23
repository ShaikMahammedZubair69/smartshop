import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminProduct = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '', // For holding the image link
    category: ''
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:8080/product-service/api/products',
        product,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      alert('Product Added Successfully!');
      navigate('/'); // Go back to home to see it
    } catch (error) {
      console.error("Error adding product:", error);
      alert('Failed to add product');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4>Add New Product</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                
                {/* Product Name */}
                <div className="mb-3">
                  <label>Product Name</label>
                  <input name="name" className="form-control" onChange={handleChange} required />
                </div>

                {/* Image URL */}
                <div className="mb-3">
                  <label>Image URL (Paste a link from Google/Imgur)</label>
                  <input name="imageUrl" className="form-control" onChange={handleChange} placeholder="https://..." required />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label>Description</label>
                  <textarea name="description" className="form-control" onChange={handleChange} required />
                </div>

                {/* Category */}
                <div className="mb-3">
                   <label>Category</label>
                   <select name="category" className="form-control" onChange={handleChange} required>
                      <option value="">Select Category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Home">Home</option>
                   </select>
                </div>

                {/* Price & Stock */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Price ($)</label>
                    <input type="number" name="price" className="form-control" onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Stock Quantity</label>
                    <input type="number" name="stock" className="form-control" onChange={handleChange} required />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100">Add Product</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;