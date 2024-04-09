import Sidebar from "./Sidebar";
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import { getAdminProducts } from "../../actions/productActions";
import {getUsers} from '../../actions/userActions'
import {adminOrders as adminOrdersAction} from '../../actions/orderActions'
import './dash.css';

export default function Dashboard () {
    const { products = [] } = useSelector( state => state.productsState);
    const { adminOrders = [] } = useSelector( state => state.orderState);
    const { users = [] } = useSelector( state => state.userState);
    const dispatch = useDispatch();
    let outOfStock = 0;

    if (products.length > 0) {
        products.forEach( product => {
            if( product.stock === 0  ) {
                outOfStock = outOfStock + 1;
            }
        })
    }

    let totalAmount = 0;
    if (adminOrders.length > 0) {
        adminOrders.forEach( order => {
            totalAmount += order.totalPrice
        })
    }



    useEffect( () => {
       dispatch(getAdminProducts);
       dispatch(getUsers);
       dispatch(adminOrdersAction)
    }, [])


    return (
        <div className="row"> 
            <div className="col-12 col-md-2">
                    <Sidebar/>
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4">Dashboard</h1>
                <div className="row pr-4">
                    <div className="col-xl-12 col-sm-12 mb-3">
                        <div className="card text-white bg-info o-hidden h-100">
                            <div className="card-body">
                            <div className="card-body-icon">
                            <i className="fa fa-fw fa-money"></i>
                        </div>
                                <div className="text-center card-font-size">Total Amount<br /> <b>₹{totalAmount}</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
        <div className="col-xl-3 col-sm-6 mb-3">
          <div className="card text-white bg-primary o-hidden h-100">
            <div className="card-body">
              <div className="card-body-icon">
                <i className="fa fa-fw fa-list-alt"></i>
              </div>
              <div className="mr-5"><b>{products.length}</b> Products</div>
            </div>
            <a className="card-footer text-white clearfix small z-1" href="/admin/products">
              <span className="float-left">View Products</span>
              <span className="float-right">
                <i className="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-3">
          <div className="card text-white bg-success o-hidden h-100">
            <div className="card-body">
              <div className="card-body-icon">
                <i className="fa fa-fw fa-shopping-cart"></i>
              </div>
              <div className="mr-5"><b>{adminOrders.length}</b> Orders</div>
            </div>
            <a className="card-footer text-white clearfix small z-1" href="/admin/orders">
              <span className="float-left">View Orders</span>
              <span className="float-right">
                <i className="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-3">
          <div className="card text-white bg-warning o-hidden h-100">
            <div className="card-body">
              <div className="card-body-icon">
                <i className="fa fa-fw fa-users"></i>
              </div>
              <div className="mr-5"><b>{users.length}</b> Users</div>
            </div>
            <a className="card-footer text-white clearfix small z-1" href="/admin/users">
              <span className="float-left">View Users</span>
              <span className="float-right">
                <i className="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>
        
        <div className="col-xl-3 col-sm-6 mb-3">
          <div className="card text-white bg-danger o-hidden h-100">
            <div className="card-body">
              <div className="card-body-icon">
                <i className="fa fa-fw fa-database"></i>
              </div>
              <div className="mr-5"><b>{outOfStock}</b> Out of Stock!</div>
            </div>
            
          </div>
        </div>
      </div>
            </div>
            
        </div>
      
    )
}