import {Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, login } from '../../actions/userActions';
import MetaData from '../layouts/MetaData';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
 export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { loading, error, isAuthenticated } = useSelector(state => state.authState)
    const redirect = location.search?'/'+location.search.split('=')[1]:'/';

    const  submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    useEffect(() => {
        if(isAuthenticated) {
            navigate(redirect)
        }

        if(error)  {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearAuthError) }
            })
            return
        }
    },[error, isAuthenticated, dispatch, navigate])

    return (
        <Fragment>
        
            <>
      <MetaData title={"Login"} />
      {loading ? (
        <Fragment />
      ) : (
        <>
          <div className="LOGIN_BOX">
            <video
              width="520"
              height="440"
              muted
              autoPlay
              loop
              className="video__Login"
            >
              <source
                src="https://res.cloudinary.com/duhcntqom/video/upload/f_auto:video,q_auto/hi70ewgjctkcikf9v8pu"
                type="video/mp4"
              />
              Your browser does not support the video please update the browser.
            </video>
            <form className="login " onSubmit={submitHandler}>
              <h2>Welcome to Sri Selvanayagi Electricals</h2>
              <p>Please log in to order your products</p>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input type="submit" value="Log In" />
              <div className="links">
                <Link to="/password/forgot" style={{color: 'black', textDecoration: 'none', fontWeight: 'bold'}} className='Link'>Forgot Password?</Link>

                <Link to="/register"style={{color: 'black', textDecoration: 'none', fontWeight: 'bold'}}>Don't have an Account</Link>
              </div> 
            </form>
          </div>
        </>
      )}
    </>
        </Fragment>
    ) 
}