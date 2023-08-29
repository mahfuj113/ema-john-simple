import React from 'react';
import "./Cart.css"

const Cart = (props) => {
    const cart = props.cart
    console.log(cart);
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
        <div>
            <p>Order Summary: {cart.length}</p>
            <p>Product Price: {total}</p>
            <p><small>Shipping Cost: {shipping}</small></p>
            <p><small>Tax + VAT: {tax}</small></p>
            <p>Total Price: {total+shipping+tax}</p>
        </div>
    );
};

export default Cart;