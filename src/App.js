import React, { useState } from 'react';
import ProductList from './components/ProductList';
import { Routes, Route } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import './asset/style.css'
import Navbar from './components/Navbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const App = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const addToCart = (product) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1, isAdded: true });
    }

    setCart(updatedCart);
    calculateTotal(updatedCart);
  };

  const updateQuantity = (productId, action) => {
    const updatedCart = [...cart];
    const itemToUpdate = updatedCart.find(item => item.id === productId);

    if (itemToUpdate) {
      if (action === 'increment') {
        itemToUpdate.quantity += 1;
      } else if (action === 'decrement' && itemToUpdate.quantity > 1) {
        itemToUpdate.quantity -= 1;
      }
    }

    setCart(updatedCart);
    calculateTotal(updatedCart);
  };

  const calculateTotal = (cart) => {
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalPrice);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div>
      <Navbar openDrawer={toggleDrawer} totalCartItems={totalCartItems} />
      <Routes>
        <Route path='/' element={<ProductList addToCart={addToCart} cart={cart} />} />
      </Routes>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        {cart.length === 0 ? (
          <img src='https://cdn.dribbble.com/users/2370289/screenshots/6150406/media/6579b4e1f9a6658157cf653538b25a8b.jpg?resize=400x0' />
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((row, i) => (
                    <TableRow
                      key={row.i}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center"><img src={row.image} style={{ width: '50px' }} /></TableCell>
                      <TableCell align="center">{row.title}</TableCell>
                      <TableCell align="center">{row.quantity}</TableCell>
                      <TableCell align="center">
                        <button onClick={() => updateQuantity(row.id, 'increment')}>+</button>
                        <button onClick={() => updateQuantity(row.id, 'decrement')}>-</button>
                      </TableCell>
                      <TableCell align="center">${row.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <h3>Total Amount: ${total}</h3>
              <button className='item-cart-btn'>Proceed to Checkout</button>
            </div>
          </>
        )}
      </Drawer>
    </div>
  );
};

export default App;