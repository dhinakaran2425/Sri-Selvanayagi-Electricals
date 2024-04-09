import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { orderDetail as orderDetailAction, updateOrder } from "../../actions/orderActions";
import { toast } from "react-toastify";
import { clearOrderUpdated, clearError } from "../../slices/orderSlice";
import { Link } from "react-router-dom";
import './orderstatus.css';

export default function UpdateOrder() {
    const { loading, isOrderUpdated, error, orderDetail } = useSelector(state => state.orderState)
    const { user = {}, orderItems = [], shippingInfo = {}, totalPrice = 0, paymentInfo = {}} = orderDetail;
    const isPaid = paymentInfo.status === 'succeeded' ? true : false;
    const [orderStatus, setOrderStatus] = useState("Processing");
    const { id:orderId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        const orderData = {};
        orderData.orderStatus = orderStatus;
        dispatch(updateOrder(orderId, orderData))
    }

    useEffect(() => {
        if (isOrderUpdated) {
            toast('Order Updated Successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearOrderUpdated())
            })
            return;
        }

        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            })
            return
        }

        dispatch(orderDetailAction(orderId))
    }, [isOrderUpdated, error, dispatch])

    useEffect(() => {
        if (orderDetail._id) {
            setOrderStatus(orderDetail.orderStatus);
        }
    }, [orderDetail])

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
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
                        <div className="col-12 col-lg-3 mt-5">
                            <h4 className="my-4">Order Status</h4>
                            <div className="form-group">
                                <select
                                    className="form-control"
                                    onChange={e => setOrderStatus(e.target.value)}
                                    value={orderStatus}
                                    name="status"
                                >
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                </select>

                            </div>
                            <button
                                disabled={loading}
                                onClick={submitHandler}
                                className="btn btn-primary btn-block"
                            >
                                Update Status
                            </button>

                        </div>
                    </div>
                </Fragment>
            </div>
        </div>

    )
}
