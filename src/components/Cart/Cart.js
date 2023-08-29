import React from 'react';
import "./Cart.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Cart = ({cart,handleClearCart,children}) => {
    // const cart = props.cart
    // const total = cart.reduce((total,prd)=> total+prd.price,0)
    let total = 0;
    for (const product of cart) {
         total = total + product.price
    }
    // let shipping = 0;
    // if(total> 35){
    //     shipping = 0;
    // }
    // else if(total > 15){
    //     shipping = 4.99;
    // }
    // else if(total>0){
    //     shipping = 12.99;
    // }
    const shipping = cart.reduce((shipping,prd) => shipping+prd.shipping,0)
    const tax = total / 10;
    return (
        <div className='cart'>
            <p>Order Summary: {cart.length}</p>
            <p>Product Price: {total}</p>
            <p><small>Shipping Cost: {shipping}</small></p>
            <p><small>Tax + VAT: {tax}</small></p>
            <p>Total Price: {total+shipping+tax}</p>
            <button onClick={handleClearCart} className='btn-clear-cart'>
                <span>Clear Cart </span>
                <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            {children}
        </div>
    );
};

export default Cart;