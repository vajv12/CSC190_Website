import React, { useState } from 'react';
import '../styles/LoginSignUp.css';
import AccountForm from '../components/UserAuth/AccountForm';
import { useFirebase } from '../FirebaseContext';
import { setDoc, doc } from 'firebase/firestore';
import { sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {  signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';





const LoginSignUp = () => {
  const { auth, db, isAuthenticated } = useFirebase();
  const [action, setAction] = useState("Sign Up");
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [resetPassword, setResetPassword] = useState(false);

  
  
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // Handle user data or navigate as needed
      window.location.href = 'http://localhost:3000/pages/Home';
    } catch (error) {
      console.error('Google Sign-In Error:', error.message);
    }
  };


  function handlePasswordReset() {
    const actionCodeSettings = {
      url: 'http://localhost:3000',
      handleCodeInApp: true,
      expiresIn: 60 * 60, // 1 hour in seconds
    };

    sendPasswordResetEmail(auth, userCredentials.email, actionCodeSettings)
      .then(() => {
        alert('Password reset email sent! Check your inbox for instructions.');
      })
      .catch((error) => {
        console.error('Error sending password reset email:', error.message);
      });
  }


  const handleResetPassword = () => {
    setResetPassword(true);
  };

  
  return (
    <div className={`container ${isAuthenticated}`} style={{marginTop:'100px'}}>
      <div className="header">
        <div className="text reset-password">{resetPassword ? 'Reset Password' : action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
      
        {resetPassword ? (
          <form onSubmit={handlePasswordReset}>
            <div className="email-input">
              <span className="icon">✉️</span>
              <input
                type="email"
                placeholder="Email"
                value={userCredentials.email}
                onChange={(e) => setUserCredentials({ ...userCredentials, email: e.target.value })}
                required
                
              />
              <button type="submit" className="reset-password-btn submit">Reset Password</button>
            </div>
          </form>
        ) : (
          <>
            {action === "Login" ? <div></div> :
              <>
                <AccountForm
                  usernamePlaceholder="Username"
                  emailPlaceholder="Email"
                  passwordPlaceholder="Password"
                  type="createAccount"
                  auth={auth}
                  db={db}
                  setUserCredentials={setUserCredentials}
                  userCredentials={userCredentials}
                />
              </>
            }

            {action === "Sign Up" ? <div></div> :
              <>
                <AccountForm
                  namePlaceholder="Username"
                  emailPlaceholder="Email"
                  passwordPlaceholder="Password"
                  type="signIn"
                  auth={auth}
                  db={db}
                  setUserCredentials={setUserCredentials}
                  userCredentials={userCredentials}
                />
                <div onClick={handleResetPassword} className='forgot-password'>Forgot Password? <span>Click Here!</span></div>
              </>
            }
          </>
        )}
        
      </div>
      {!resetPassword && (
        <div className="submit-container">
          <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => {
            setAction("Sign Up");
            setUserCredentials({
              email: '',
              password: '',
              username: '',
            });
          }}> Sign Up</div>
          <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => {
            setAction("Login");
            setUserCredentials({
              email: '',
              password: '',
              username: '',
            });
          }}> Login</div>

        </div>
      )}
      
      {!resetPassword && (
     
      <button className="google-signin" onClick={handleGoogleSignIn}>
        <img src="/image/google-icon.png" alt="Google Icon" className="google-icon" />
        <span className="google-text">Sign in with Google</span>
      </button>
    )}
    
    </div>
  );
};

export default LoginSignUp;
