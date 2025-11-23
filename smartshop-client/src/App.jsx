import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/log';
import Register from './pages/register';
import Cart from './pages/Cart';
import AdminProduct from './pages/AdminProduct';
import Dashboard from './pages/Dashboard';
// <--- Import Login

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} /> {/* <--- Add Route */}
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} /> 
        <Route path="/admin" element={<AdminProduct />} /> {/* Admin Product Route */}     
      </Routes>
    </BrowserRouter>
  );
}

export default App;