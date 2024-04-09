import {useEffect, useState} from 'react';
import {useDispatch, useSelector } from 'react-redux'
import { register, clearAuthError } from '../../actions/userActions'
import { toast } from 'react-toastify';
import { Link,useNavigate } from 'react-router-dom';

export default function Register() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/avatar.gif");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector(state => state.authState)

    const onChange = (e) => {
        if(e.target.name === 'avatar') {
           const reader = new FileReader();
           reader.onload = () => {
                if(reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0])
                }
           }


           reader.readAsDataURL(e.target.files[0])
        }else{
            setUserData({...userData, [e.target.name]:e.target.value })
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', userData.name)
        formData.append('email', userData.email)
        formData.append('password', userData.password)
        formData.append('avatar', avatar);
        dispatch(register(formData))
    }

    useEffect(()=>{
        if(isAuthenticated) {
            navigate('/');
            return 
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
        <div className="LOGIN_BOX Register_BOX">
          <form
            className="login register"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h2>Hello , User</h2>
            <p>We are selling products at an affordable price.</p>

            <div className="form-group">
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                placeholder="Name"
                onChange={onChange}
              />
            </div>

            <div className="form-group"> 
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                placeholder="Email"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                placeholder="Password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6
                  ,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
                onChange={onChange}
              />
            </div>

            <div className="form-group avatar_div">
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="assets/userAvatar/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose your profile pic
                  </label>
                </div>
              </div>
            </div>
            <div className='start'>
            <input
              type="submit"
              value="Create an Account"
              disabled={loading ? true : false}
            /></div>
            <div className="links registerLink">
              <div></div>
              <Link
                to="/login"
                style={{
                  color: "black",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                click here to login
              </Link>
            </div>
          </form>

          <video
            width="520"
            height="440"
            muted
            autoPlay
            loop
            className="video__Login1"
          >
            <source
              src="https://res.cloudinary.com/duhcntqom/video/upload/v1705674848/aucc7dlbn9en21salaiy.mp4"
              type="video/mp4"
            />
            Your browser does not support the video please update the browser.
          </video>
        </div>
    )
}