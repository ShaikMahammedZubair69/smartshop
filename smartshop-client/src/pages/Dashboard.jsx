import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.sub) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      // Call the new endpoint
      console.log("Fetching orders for user:", user?.sub);
      const response = await axios.get(
        `http://localhost:8080/order-service/api/order/user/${user?.sub || 'UnknownUser'}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>My Order History</h2>
      <p className="text-muted">Welcome back, {user?.sub}</p>
      
      {orders.length === 0 ? (
        <div className="alert alert-info">No orders found. Go buy something!</div>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div className="col-12 mb-3" key={order.id}>
              <div className="card shadow-sm">
                <div className="card-header bg-light d-flex justify-content-between">
                  <span className="fw-bold">Order #{order.orderNumber}</span>
                  <span className="badge bg-success">Placed</span>
                </div>
                <div className="card-body">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Product Code</th>
                        <th>Price</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderLineItemsList.map((item) => (
                        <tr key={item.id}>
                          <td>{item.skuCode}</td>
                          <td>₹{item.price}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;