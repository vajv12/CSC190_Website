import React from "react";
import leftMap from "../assets/dnd-light.jpg";
import "../styles/Login.css";
import {Link}  from 'react-router-dom';

function Login() {
  return (
    <div className="login">

      {/*login page image on left */}
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${leftMap})` }
      }
      ></div>

      {/*rightSide login form */}
      <div className="rightSide">
        <h1> Login</h1>

        <form id="login-form" method="POST">
          <label htmlFor="userEmail">Email</label>
          <input name="userEmail" 
          placeholder="xyz@email.com" 
          type="email" 
          required/>
          
          <label htmlFor="password">Password</label>
          <input name="password" 
          placeholder="password" 
          type="password" 
          required/>

          <button type="submit"> login</button>
        </form>
    
      {/* Apply styles to loginBottom div */}
        <div className='loginBottom'>
        <Link to='./signup'>Sign up</Link>
        <Link to='./forgotpassword'>forgot password?</Link>
        </div>

      </div>
 
    </div>
  );
}

export default Login;