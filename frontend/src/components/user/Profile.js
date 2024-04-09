import {useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './pro.css';
export default function Profile () {
    const { user }  = useSelector(state => state.authState);

    return (
            <div class="cardpro">
    <div>
    <img className="rounded-circle img-fluid" src={user.avatar??'./images/default_avatar.png'} alt='' />
    <div class="links123"><button class="view123"><a href='/myprofile/update'>MyEdit Profile</a></button></div>
          </div>
          
    <div class="infos123">
    <h4>Full Name</h4>
      <div class="name123">
        <h2>{user.name}</h2>
      </div>
        <h4>Email Address</h4>
      <div class="name123">
        <h4>{user.email}</h4>
      </div>
      <h4>Joined</h4>
      <p class="text123">{String(user.createdAt).substring(0, 10)}
      </p>
      <div class="links123">
        <button class="view123"><a href='/orders'>My Orders</a></button>
        <button class="view123"><a href='/myprofile/update/password'>MyChange Password</a></button>
      </div>
    </div>
  </div>
    )
}