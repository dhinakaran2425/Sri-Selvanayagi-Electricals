import MetaData from '../layouts/MetaData';
import { Fragment, useEffect } from 'react';
import { validateShipping } from './Shipping';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutStep';
import './oc.css';

export default function ConfirmOrder() {
    const { shippingInfo, items: cartItems } = useSelector(state => state.cartState);
    const { user } = useSelector(state => state.authState);
    const navigate = useNavigate();
    const itemsPrice = cartItems.reduce((acc, item) => (acc + item.price * item.quantity), 0);
    const shippingPrice = itemsPrice > 200 ? 0 : 25;
    let taxPrice = Number(0.05 * itemsPrice);
    const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
    taxPrice = Number(taxPrice).toFixed(2);

    const processPayment = () => {
        const data = {
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        };
        sessionStorage.setItem('orderInfo', JSON.stringify(data));
        navigate('/payment');
    };

    useEffect(() => {
        validateShipping(shippingInfo, navigate);
    }, []);

    return (
        <Fragment>
            <MetaData title={'Confirm Order'} />
            <CheckoutSteps shipping confirmOrder />
                
                    <div class="contact_inner">
                        <div class="row">
                            <div class="col-md-10">
                                <div class="contact_form_inner">
                                    <div class="contact_field">
                                        <h3>Shipping Info</h3>
                                        <p><b>Name:</b> {user.name}</p>
                <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                <p className="mb-4"><b>Address:</b> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state} </p>
                
                                       
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="right_conatct_social_icon d-flex align-items-end">
                                   
                                </div>
                            </div>
                        </div>
                </div>
  
                <hr /><div className='text-center'>
                <h4 className="mt-4"><b>Your Cart Items:</b></h4>
                <table id="cart">
                
                    <thead>
                        <tr>
                            <th className="first">Photo</th>
                            <th className="third">Product</th>
                            <th className="fourth">Quantity x Price</th>
                            <th className="fifth">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(item => (
                            <tr key={item.product} className="productitm">
                                <td><img src={item.image} alt={item.name} height="100" width="100" /></td>
                                <td><Link to={`/product/${item.product}`}>{item.name}</Link></td>
                                <td><p>{item.quantity} x ₹{item.price} </p></td>
                                <td><p><b>₹{item.quantity * item.price}</b></p></td>
                            </tr>
                        ))}
                        <tr className="extracosts">
                            <td className="light">Subtotal:</td>
                            <td colSpan="2" className="light"></td>
                            <td>₹{itemsPrice}</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr className="extracosts">
                            <td className="light">Shipping:</td>
                            <td colSpan="2" className="light"></td>
                            <td>₹{shippingPrice}</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr className="extracosts">
                            <td className="light">Tax:</td>
                            <td colSpan="2" className="light"></td>
                            <td>₹{taxPrice}</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr className="totalprice">
                            <td className="light">Total:</td>
                            <td colSpan="2">&nbsp;</td>
                            <td colSpan="2"><span className="thick">₹{totalPrice}</span></td>
                        </tr>
                        <tr className="checkoutrow">
                            <td colSpan="5" className="checkout">
                                <button id="checkout_btn" onClick={processPayment} className="btn btn-primary btn-block">Proceed to Payment</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
        </Fragment>
    );
}
