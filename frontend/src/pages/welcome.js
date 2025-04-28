import React from 'react';
import "../pages.css";

const Welcome = () => {
  return (
    <div>
      <div className='welcomeContainer'>
        <h1 className='welcomeH1'>Welcome to</h1>
        <h1 className='title'>
          <span style={{color: "rgb(253, 253, 253)"}}>FIVE</span><span style={{color: "rgb(189, 186, 41)"}}>SECONDS</span>
        </h1>
        <div>      
          <p className='titleDescription'>Answer as many questions as possible within five seconds!</p>          
        </div>


      </div>

      <div className='registerContainer' >
        <a href='signup' className='registerBtns'>Signup</a>
        <p>Or</p>
        <a href='login' className='registerBtns'>Login</a>
      </div>
    </div>
  );
};

export default Welcome;