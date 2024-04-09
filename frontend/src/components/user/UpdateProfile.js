import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import { updateProfile, clearAuthError } from "../../actions/userActions";
import { clearUpdateProfile } from "../../slices/authSlice";

export default function UpdateProfile () {
    const {  error, user, isUpdated } = useSelector(state => state.authState);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");
    const dispatch = useDispatch();

    const onChangeAvatar = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
             if(reader.readyState === 2) {
                 setAvatarPreview(reader.result);
                 setAvatar(e.target.files[0])
             }
        }


        reader.readAsDataURL(e.target.files[0])
    }

    const submitHandler  = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name)
        formData.append('email', email)
        formData.append('avatar', avatar);
        dispatch(updateProfile(formData))
    }

    useEffect(() => {
        if(user) {
            setName(user.name);
            setEmail(user.email);
            if(user.avatar) {
                setAvatarPreview(user.avatar)
            }
        }

        if(isUpdated) {
            toast('Profile updated successfully',{
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearUpdateProfile())
            })
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
    },[user, isUpdated, error, dispatch])

    return (  
    <div className="row wrapper">
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
                src="https://res.cloudinary.com/duhcntqom/video/upload/v1709615217/dvuh7kt5xqoaffs5cnyb.mp4"
                type="video/mp4"
                muted
              />
              Your browser does not support the video please update the browser.
            </video>
            <form className="login" onSubmit={submitHandler} encType='multipart/form-data'>
              <h2>Edit Profile</h2>
              <p>Whether You Need To Change Credential? No Problem Make Changes Here</p>
              <input 
                        type="name" 
                        id="name_field" 
                        className="form-control"
                        name='name'
                        value={name}
                        onChange={e=>setName(e.target.value)}
                    />
              <input
                        type="email"
                        id="email_field"
                        className="form-control"
                        name='email'
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                    <label htmlFor='avatar_upload'>Avatar</label>
                    <div className='d-flex align-items-center'>
                        <div>
                            <figure className='avatar mr-3 item-rtl'>
                                <img
                                    src={avatarPreview}
                                    className='rounded-circle'
                                    alt='Avatar Preview'
                                />
                            </figure>
                        </div>
                        <div className='custom-file'>
                            <input
                                type='file'
                                name='avatar'
                                className='custom-file-input'
                                id='customFile'
                                onChange={onChangeAvatar}
                            />
                            <label className='custom-file-label' htmlFor='customFile'>
                                Choose Avatar
                        </label>
                        </div>
                    </div>
                    <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
            </form>
          </div>
    </div>)
}