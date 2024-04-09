import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { decreaseCartItemQty, increaseCartItemQty, removeItemFromCart } from '../../slices/cartSlice';
import './cart.css';

export default function Cart() {
    const { items } = useSelector(state => state.cartState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const increaseQty = (item) => {
        const count = item.quantity;
        if (item.stock === 0 || count >= item.stock) return;
        dispatch(increaseCartItemQty(item.product));
    };

    const decreaseQty = (item) => {
        const count = item.quantity;
        if (count === 1) return;
        dispatch(decreaseCartItemQty(item.product));
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping');
    };

    return (
        <Fragment>
            {items.length === 0 ? (
                <h2 className="mt-5">Your Cart is Empty</h2>
            ) : (
                <Fragment>
                    <div id="template" className="row panel-wrapper">
                        <div className="col-12 panel-header basket-header">
                        <div className="row">
                                        <div className="col-6 basket-title"><span className="emphasized">Your Cart :{items.length} Items</span>
                                        </div>
                                    </div>
                                    <div className="row column-titles padding-top-10">
                                        <div className="col-2 align-center"><span>Photo</span></div>
                                        <div className="col-5 align-center"><span>Name</span></div>
                                        <div className="col-2 align-center"><span>Quantity</span></div>
                                        <div className="col-3 align-right"><span>Price</span></div>
                                    </div>                       
                        </div>
                        <div className="col-12 panel-body basket-body">
                            {items.map(item => (
                                <div key={item.product} className="row product">
                                    <div className="col-2 product-image"><img src={item.image} alt={item.name} height="90" width="115" /></div>
                                    <div className="col-5"><Link to={`/product/${item.product}`}>{item.name}</Link></div>
                                    <div className="col-2 align-right">
                                        <span className="btn btn-danger minus" onClick={() => decreaseQty(item)}>-</span>
                                        <span className="sub" >
                                            <input type="text" className="input-qty input-rounded" value={item.quantity} readOnly/>
                                        </span>
                                        <span className="btn btn-primary plus" onClick={() => increaseQty(item)}>+</span>
                                        <i id="delete_cart_item" onClick={() => dispatch(removeItemFromCart(item.product))} className="fa fa-trash btn btn-danger"></i>
                                    </div>
                                    <div className="col-3 align-right">
                                        <span className="sub">₹</span> {item.price}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-12 panel-footer basket-footer">
                            <hr />
                            <div className="row">
                                        <div className="col-8 align-right description"><div className="dive">Subtotal</div></div>
                                        <div className="col-4 align-right"><span className="emphasized">{items.reduce((acc, item)=>(acc + item.quantity), 0)} (Units)</span></div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-8 align-right description"><div className="dive">Est.Total</div></div>
                                        <div className="col-4 align-right"><span className="very emphasized">₹{items.reduce((acc, item)=>(acc + item.quantity * item.price), 0)}</span></div>
                                    </div>
                        </div>
                        
                        <div className="classic">
                                    <div class="button-box">
                <button class="nineteen"onClick={checkoutHandler}><span>Check out</span></button>
            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}
