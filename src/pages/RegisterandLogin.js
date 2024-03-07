import React, { useState } from "react";
import { database, auth } from "./FirebaseConfig";
import {useAuthState} from 'react-firebase-hooks/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, getAuth, sendEmailVerification
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const auth = getAuth();

function RegisterAndLogin() {
  const [login, setLogin] = useState(false);

  const history = useNavigate();
  

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (type == "signup") {
      createUserWithEmailAndPassword(database, email, password)
        .then((data) => {
            console.log(auth.currentUser)
           
          console.log(data, "authData");
          history("/home");
          
        })
        .catch((err) => {
          alert(err.code);
          setLogin(true);
        });
        
        
        
    } else {
      signInWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, "authData");
          history("/home");
        })
        .catch((err) => {
          alert(err.code);
        });
        
    }
  };

  const handleReset = ()=>{
    history("/reset");
  }
  return (
    <div className="App">
      {/* Registration and login Screen */}
      <div className="row">
        <div
          className={login == false ? "activeColor" : "pointer"}
          onClick={() => setLogin(false)}
        >
          SignUp
        </div>
        <div
          className={login == true ? "activeColor" : "pointer"}
          onClick={() => setLogin(true)}
        >
          SignIn
        </div>
      </div>
      <h1>{login ? "SignIn" : "SignUp"}</h1>
      <form onSubmit={(e) => handleSubmit(e, login ? "signin" : "signup")}>
        <input name="email" placeholder="Email" />
        <br />
        <input name="password" type="text" placeholder="Password" />
        <br />
        <p onClick={handleReset}>Forgot Password?</p>
        <br />
        <button>{login ? "SignIn" : "SignUp"}</button>
      </form>
    </div>
  );
}

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'https://www.example.com/finishSignUp?cartId=1234',
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.example.ios'
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12'
  },
  dynamicLinkDomain: 'example.page.link'
};

export default RegisterAndLogin;