import { Fragment} from "react";
import MetaData from "./layouts/MetaData";
import React, { useState } from 'react'
import emailjs from '@emailjs/browser';
import './contact.css';
const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-]+.)+[a-zA-Z]{2,}))$/;
const EmailForm = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceId = 'service_msoee1r';
    const templateId = 'template_mpbzr4i';
    const publicKey = 'PFRblJJch7E9fW5sd';
    
    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: 'Web Wizard',
      message: message,
    };
    if (!name || !email || !message) {
      setHasErrors(true);
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError(true);
      setHasErrors(true);
      return;
    }
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully!', response);
        setName('');
        setEmail('');
        setMessage('');
        setShowPopup(true);
        setEmailError(false); // Clear email error
        setHasErrors(false);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }

  return (
    <Fragment>
                <Fragment>
                    <MetaData title={'Contact Us'} />
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
                src="https://res.cloudinary.com/duhcntqom/video/upload/v1706021065/umvph08g3g3wpvrmmjog.mp4"
                type="video/mp4"
              />
              Your browser does not support the video please update the browser.
            </video>
    <form onSubmit={handleSubmit} className='login '>
    <h2>Contact Us</h2>
              <p>You Are Always Welcome Here To clarify Your Doubts &#128516;</p>
      
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {hasErrors && emailError && <p className="error">Invalid email format</p>}
        {hasErrors && !emailError && <p className="error">Email is required</p>}
      <textarea
        cols="5"
        rows="3"
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      >
      </textarea>
      <div className='start'>
            <input
              type="submit"
              value="Send Email"
            /></div>
    </form>
    {showPopup && (
        <div className="popup-message">
          <p>Your message has been sent!</p>
          <p>We Will Contact you within 24 hours.</p>
          {<button onClick={() => setShowPopup(false)}>Close</button>}
        </div>
      )}</div>
    </Fragment>
    </Fragment>
  )
}

export default EmailForm