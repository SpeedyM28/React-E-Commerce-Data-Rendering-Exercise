import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart, clearCart, increaseItemQuantity, decreaseItemQuantity } from './CartSlice'; // Assuming you have action creators for increasing and decreasing item quantity
import './ShoppingCart.css';
import SuperCoin from './SuperCoin';

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const [superCoins, setSuperCoins] = useState(0);
    
    useEffect(() => {
        if (totalAmount < 100){
            setSuperCoins(0);}
        else{
            var numof100 = Math.floor(totalAmount / 100);
            var add_percent = Math.floor(numof100+10);
            add_percent = add_percent > 40 ? 40 : add_percent;
            var total_coins = add_percent * (numof100);
            setSuperCoins(Math.floor(total_coins));
        }
    }, [totalAmount]);

    const handleRemoveItem = itemId => {
        dispatch(removeItemFromCart(itemId));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleIncreaseQuantity = itemId => {
        dispatch(increaseItemQuantity(itemId));
    };

    const handleDecreaseQuantity = itemId => {
        dispatch(decreaseItemQuantity(itemId));
    };
    
    return (
        <>
            <div className="shopping-cart">
                <h2 className="shopping-cart-title">Shopping Cart</h2>
                <ul className="cart-items">
                    {cartItems.map(item => (
                        <li key={item.id} className="cart-item">
                            <span>{item.name} - ${item.price}</span>
                            <div className="quantity-controls">
                                <button className="quantity-control-btn" onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                                <span> {item.quantity}</span>
                                <button className="quantity-control-btn" onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                            </div>
                            <button className="remove-item-btn" onClick={() => handleRemoveItem(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
                <button className="clear-cart-btn" onClick={handleClearCart}>Clear Cart</button>
            </div>
            <div>{totalAmount ? <div>The total amount is {totalAmount}</div> : ''}</div>
            <div>
                <h2>Total Amount: ${totalAmount}</h2>
                <SuperCoin superCoins={superCoins} />
                </div>
        </>
    );
};

export default ShoppingCart;
