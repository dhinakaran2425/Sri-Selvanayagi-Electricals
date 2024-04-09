import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Dropdown, Image} from 'react-bootstrap';
import { logout } from '../../actions/userActions';


export default function Header () {
    const { isAuthenticated, user } = useSelector(state => state.authState);
    const { items:cartItems } = useSelector(state => state.cartState)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = () => {
      dispatch(logout);
    }


    return (
    <nav className="navbar row">
        
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
              <img width="100%"  height="100%" display="block"src="./images/logo.png" alt="SSE Logo"/>
            </Link>
        </div>
      </div>
      

      <Link to="/" className="button" id="_btn">Home</Link>
      <Link to="/allproducts" className="button" id="_btn">Products</Link>
      <Link to="/about" className="button" id="_btn">About Us</Link>
      <Link to="/contact" className="button" id="_btn">Contact Us</Link>
      {!isAuthenticated && (
        <Link to="/register" className="button" id="_btn">Register</Link>
      )}
          { isAuthenticated ? 
            (
              <Dropdown className='d-inline' >
                  <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
                    <figure className='avatar avatar-nav'>
                      <Image width="50px" src={user.avatar??'./images/default_avatar.png'}  />
                    </figure>
                    <span className='black'>{user.name}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                      { user.role === 'admin' && <Dropdown.Item onClick={() => {navigate('admin/dashboard')}} className='text-dark'>Dashboard</Dropdown.Item> }
                      <Dropdown.Item onClick={() => {navigate('/myprofile')}} className='text-dark'>Profile</Dropdown.Item>
                      <Dropdown.Item onClick={() => {navigate('/orders')}} className='text-dark'>Orders</Dropdown.Item>
                      <Dropdown.Item onClick={logoutHandler} className='text-danger'>Logout</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
            )
          
          :
            <Link to="/login"  className="button" id="_btn">Login</Link>
          }
          <Link to="/cart"><span id="cart" className="ml-3">Cart</span></Link>
          <span className="ml-1" id="cart_count">{cartItems.length}</span>
    </nav>
    )
}