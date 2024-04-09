import React from "react";
import './footer.css';

import { Link} from 'react-router-dom';
export default function Footer(){
    return(<footer className="footer-distributed">

    <div className="footer-left">

    <div classNameName="col-12 col-md-3">
        <div classNameName="navbar-brand">
          <Link to="/">
              <img width="60%"  height="60%" display="block"src="./images/logo.png" alt="SSE Logo"/>
            </Link>
        </div>
      </div>

      <p className="footer-links">
        <a href="/" className="link-1">Home</a>
        
        <a href="/allproducts">Products</a>

        <a href="/about">About us</a>
        
        <a href="/contact">Contact Us</a>
      </p>

      <p className="footer-company-name">Sri Selvanayagi Electrical © 2024</p>
    </div>

    <div className="footer-center">

      <div>
        <i className="fa fa-map-marker"></i>
        <p><span>29, Marappa Street-II, Surampatti</span>Erode - 638009, Tamil Nadu</p>
      </div>

      <div>
        <i className="fa fa-phone"></i>
        <p>+91 9842315173</p>
      </div>

      <div>
        <i className="fa fa-envelope"></i>
        <p><a href="mailto:sriselvanayagielectricals@gmail.com">sriselvanayagielectricals@gmail.com</a></p>
      </div>

    </div>

    <div className="footer-right">

      <p className="footer-company-about">
        <span>About the company</span>
        Sri Selvanayagi Electricals in Erode is one of the leading businesses in the Fan Distributors. 
      </p>

    </div>

  </footer>
    )
}