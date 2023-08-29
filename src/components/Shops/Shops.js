import React, { useState } from 'react';
import fakeData from '../../fakeData/products.json';
import {deleteShoppingCart} from '../../utilities/fakedb'
import './Shops.css'
import Products from '../Products/Products';
import Cart from '../Cart/Cart';

const Shops = () => {
    const first10 = fakeData.slice(0, 10)
    const [products, setProducts] = useState(first10)
    const [cart,setCart] = useState([])
    const handleAddProduct = (product) => {
        const newCart = [...cart,product];
        setCart(newCart)
    }
    const handleClearCart = () => {
        setCart([])
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    products.map(product => <Products handleAddProduct={handleAddProduct} product ={product}></Products>)
                }
            </div>
            <div>
                <Cart cart={cart} handleClearCart={handleClearCart}></Cart>
            </div>
        </div>
    );
};

export default Shops;