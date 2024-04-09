import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forgotPassword,clearAuthError } from "../../actions/userActions";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const { error, message } = useSelector(state => state.authState);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        dispatch(forgotPassword(formData))
    }

    useEffect(()=>{
        if(message) {
            toast(message, {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER
            })
            setEmail("");
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
    }, [message, error, dispatch])


    return (
        <>
      <h2 className="title">Forgot Password</h2>
      <div className="profile__box">
        <div className="LOGIN_BOX">
        <img
            src="https://res.cloudinary.com/duhcntqom/image/upload/v1705675875/vijejodtwyajm2mcklye.gif"
            width="520"
            height="540"
            className="video__Login"
            alt="forgot_password_image"
            draggable="false"
          />

          <form
            className="login register Update_BOX"
            onSubmit={submitHandler}
            encType="multipart/form-data"
            style={{marginLeft: '50px'}}
          >
          <h2 style={{marginBottom: '20px'}}> Forgot Your Password </h2>
            <div className="form-group">
              <input
                type="email"
                id="email_field"
                className="form-control"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

          

            <input
              type="submit"
              value="Send Email"
            />
          </form>

          
        </div>
      </div>
    </>
    )
}