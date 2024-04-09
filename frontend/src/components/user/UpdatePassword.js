import {useEffect, useState } from 'react';
import { updatePassword as updatePasswordAction, clearAuthError } from '../../actions/userActions';
import {useDispatch, useSelector} from 'react-redux';
import { toast } from 'react-toastify';

export default function UpdatePassword() {
    
    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const dispatch = useDispatch();
    const { isUpdated, error } = useSelector(state => state.authState)

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('oldPassword', oldPassword);
        formData.append('password', password);
        dispatch(updatePasswordAction(formData))
    }

    useEffect(() => {
        if(isUpdated) {
            toast('Password updated successfully',{
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER
            })
            setOldPassword("");
            setPassword("")
            return;
        }
        if(error)  {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearAuthError) }
            })
            return
        }
    },[isUpdated, error, dispatch])

    return (
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
                src="https://res.cloudinary.com/duhcntqom/video/upload/v1709787933/rpkkqegadf2d7sljvoe5.mp4"
                type="video/mp4"
              />
              Your browser does not support the video please update the browser.
            </video>
            <form className="login " onSubmit={submitHandler}>
              <h2>Update Password</h2>
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={e=>setOldPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
              />
              <input type="submit" value="Update Password" />
            </form>
          </div>
    )
}