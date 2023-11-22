import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';


const ProductList = ({ addToCart, cart }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {products.map(product => (
                    <div class="item-container">
                        <div class="main-item">
                            <img src={product.image} alt="" style={{ width: '200px', height: '200px' }} />
                        </div>
                        <h3 class="item-heading">
                            {product.title}
                        </h3>
                        <p class="item-description">
                            {product.category}
                        </p>
                        <Rating name="read-only" value={product.rating.rate} readOnly />
                        <p class="item-price"><sup>$</sup>{product.price}</p>
                        {cart.some(item => item.id === product.id && item.isAdded) ? (
                            <button className='item-cart-btn' style={{ backgroundColor: 'green' }}>Added</button>
                        ) : (
                            <button className='item-cart-btn' onClick={() => addToCart(product)}>Add to Cart</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;