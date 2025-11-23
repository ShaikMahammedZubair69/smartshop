import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { clearCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  // 1. Get Cart Items
  const { items, totalAmount } = useSelector((state) => state.cart);
  
  // 2. Get Auth Data (Token & User Info)
  // ✅ FIX: We extract 'user' here to send the username to the backend
  const { token, isAuthenticated, user } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- RAZORPAY SCRIPT LOADER ---
  // This ensures the Razorpay SDK is loaded without needing external NPM libraries
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadRazorpayScript();
  }, []);
  // ------------------------------

  const handlePayment = async () => {
    if (!isAuthenticated) {
      alert("Please Login to Checkout!");
      navigate('/login');
      return;
    }

    try {
      console.log("🟢 Step 1: Initializing Transaction...");

      // 3. Call Backend to get Transaction ID
      const transactionResponse = await axios.get(
        `http://localhost:8080/order-service/api/order/createTransaction/${totalAmount}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      const txDetails = transactionResponse.data;
      console.log("🟢 Step 2: Transaction Created:", txDetails);

      // 4. Configure Razorpay Popup
      const options = {
        key: txDetails.key,
        amount: txDetails.amount,
        currency: txDetails.currency,
        name: "SmartShop",
        description: "Order Payment",
        order_id: txDetails.orderId,
        
        // 5. HANDLER: This runs ONLY after "Success" is clicked in the popup
        handler: async (response) => {
          console.log("🟢 Step 3: Payment Success! Placing Order...");
          await placeOrderAfterPayment();
        },
        
        prefill: {
          name: user?.sub || "SmartShop User",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // 6. Open the Popup
      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (error) {
      console.error("🔴 Payment Init Failed:", error);
      alert("Could not initialize payment. Check Backend console.");
    }
  };

  const placeOrderAfterPayment = async () => {
    const orderPayload = {
      orderLineItemsDtoList: items.map(item => ({
        skuCode: item.skuCode,
        price: item.price,
        quantity: item.quantity
      }))
    };

    try {
      // 7. Send Order to Backend
      await axios.post('http://localhost:8080/order-service/api/order', orderPayload, {
        headers: { 
            'Authorization': `Bearer ${token}`,
            'loggedInUser': user?.sub || 'UnknownUser' // ✅ Sends the username header
        }
      });

      console.log("🟢 Step 4: Order Saved Successfully!");
      alert("Payment Successful & Order Placed!");
      
      dispatch(clearCart());
      navigate('/dashboard'); // Redirect to see the order
      
    } catch (error) {
      console.error("🔴 Order Creation Failed:", error);
      alert("Payment succeeded, but Order Creation Failed. Contact Support.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-info py-5">
          <h4>Your cart is empty 🛒</h4>
          <button onClick={() => navigate('/')} className="btn btn-primary mt-3">
            Go Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Shopping Cart</h2>
      
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="fw-bold">{item.name}</td>
                <td>₹{item.price}</td>
                <td><span className="badge bg-secondary">{item.quantity}</span></td>
                <td className="fw-bold text-primary">₹{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="row mt-4">
        <div className="col-md-6 offset-md-6">
          <div className="card bg-light">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <h5>Grand Total:</h5>
                <h5 className="text-primary">₹{totalAmount}</h5>
              </div>
              <button 
                className="btn btn-success w-100 py-2 fw-bold" 
                onClick={handlePayment}
              >
                Pay Now with Razorpay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;