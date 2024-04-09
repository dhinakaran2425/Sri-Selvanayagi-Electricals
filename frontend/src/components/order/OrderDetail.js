import { Fragment, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTruck, faBox } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import  Loader from '../layouts/Loader';
import {orderDetail as orderDetailAction } from '../../actions/orderActions';
export default function OrderDetail () {
    const { orderDetail, loading } = useSelector(state => state.orderState)
    const { shippingInfo={}, user={}, orderStatus="Processing", orderItems=[], totalPrice=0, paymentInfo={} } = orderDetail;
    const isPaid = paymentInfo && paymentInfo.status === "succeeded" ? true: false;
    const dispatch = useDispatch();
    const {id } = useParams();

    useEffect(() => {
        dispatch(orderDetailAction(id))
    },[id])

    return (
        <Fragment>
            {   loading ? <Loader/> :
                <Fragment>
                    <div className="row d-flex justify-content-around">
                    <div className="col-12 col-lg-8 mt-5 order-details">
                            <div className="cardstatus">
                                <div className="titlesta">Payment: <p className={isPaid ? 'greenColor' : 'redColor'}><b>{isPaid ? 'PAID' : 'NOT PAID'}</b></p></div>
                                <div className="container">
                                    <div className="row">
                                        <h4 className="my-4">Tracking Order:</h4>
                                        <div className="col-12 col-md-10 hh-grayBox pt45 pb20">
                                            <div className="row justify-content-between">
                                                <div className={`order-tracking ${orderStatus === 'Processing' ? 'completed' : ''}`}>
                                                    <span className="is-complete"></span>
                                                    <p>Processing</p>
                                                </div>
                                                <div className={`order-tracking ${orderStatus === 'Shipped' ? 'completed' : ''}`}>
                                                    <span className="is-complete"></span>
                                                    <p>Shipped</p>
                                                </div>
                                                <div className={`order-tracking ${orderStatus === 'Delivered' ? 'completed' : ''}`}>
                                                    <span className="is-complete"></span>
                                                    <p>Delivered</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="info">
                                    <h4 className="mb-4">Shipping Info</h4>
                                    <p><span id="heading">Name:</span><span id="details">{user.name}</span></p>
                                    <p><span id="heading">Phone:</span><span id="details">{shippingInfo.phoneNo}</span></p>
                                    <p><span id="heading">Address:</span><span id="details">{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}</span></p>
                                    <p><span id="heading">Order No.</span><span id="details"># {orderDetail._id}</span></p>
                                </div>
                                <div className="pricing">
                                    <h4 className="my-4">Order Items:</h4>
                                    <div className="cart-item my-1">
                                        {orderItems && orderItems.map(item => (
                                            <div className="row my-5" key={item.product}>
                                                <div className="col-4 col-lg-2">
                                                    <img src={item.image} alt={item.name} height="45" width="65" />
                                                </div>
                                                <div className="col-5 col-lg-5">
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </div>
                                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                    <p>₹{item.price}</p>
                                                </div>
                                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                    <p>{item.quantity} Piece(s)</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="total">
                                    <div className="row">
                                        <div className="col-9">Amount:</div>
                                        <div className="col-3"><big> ₹ {totalPrice}</big></div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                                           </div>
                </Fragment>
            }
        </Fragment>
    )
}