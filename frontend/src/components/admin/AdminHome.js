import { Fragment} from "react";
import '../home.css';
import MetaData from "../layouts/MetaData";
import {Link} from 'react-router-dom';

export default function AdminHome(){
    
 
    return (
        <Fragment>
                <Fragment>
                    <MetaData title={'Buy Best Products'} />
                    <div class="home">
      <video 
              muted
              autoPlay
              loop>
        <source src="https://res.cloudinary.com/duhcntqom/video/upload/v1706197477/wcuml0fmitvdnk0yucuz.mp4" type="video/mp4"/>
      </video>
      <div class="home-content">
        <h2>Sri Selvanayagi Electricals</h2>
        <p>Sri Selvanayagi Electricals in Erode is one of the leading businesses in the Fan Distributors. </p>

        <Link to="/about" className="button" id="_btn">About Us</Link>
      </div>
    </div>
    <div className="abc">
                        <h1>About Us</h1> 
                    <h2>Welcome to Sri Selvanayagi Electricals:</h2>
                    <p>Sri Selvanayagi Electricals in Erode is one of the leading businesses in the Fan Distributors. 
                       Also known for Fan Dealers, Fan Dealers-Crompton Greaves, Fan Distributors, Ceiling Fan Dealers, 
                       Fan Distributors-Crompton Greaves, Exhaust Fan Wholesalers-Crompton Greaves, Wall Fan Distributors-Crompton Greaves, 
                       Brass Fan Dealers and much more. Find Address, Contact Number, Reviews 
                       &amp; Ratings, Photos, Maps of Sri Selvanayagi Electricals, Erode.</p>
                    </div>
                    <div className="cont">
                    <img className="cont1"src="https://res.cloudinary.com/duhcntqom/image/upload/v1705985582/majrkti19t0um1tzpz1x.jpg"alt=" "/>
                    
                    <div class="right">
                    <img className="cont2"src="https://res.cloudinary.com/duhcntqom/image/upload/v1705997655/unckoiseceugqwi8ewwt.png"alt=" "/>
                    <Link to="/allproducts" class="custom-btn btn-15"><span>Products</span></Link>
                    </div></div>
                    
                </Fragment>
        </Fragment>
    )
}