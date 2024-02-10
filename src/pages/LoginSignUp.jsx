import React, {useState} from 'react';
import '../styles/LoginSignUp.css';
import AccountForm from '../components/UserAuth/AccountForm'
import { useFirebase } from '../FirebaseContext';

const LoginSignUp = () => {
    const {auth, db, isAuthenticated, username} = useFirebase();
    const [action,setAction] = useState("Sign Up");   
    
    return (
        <div className="container {{isAuthenticated}}">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className = "inputs">
            
                {action === "Login"?<div></div>:
                    <>
                        <AccountForm 
                            usernamePlaceholder="Username" 
                            emailPlaceholder="Email" 
                            passwordPlaceholder="Password"
                            type="createAccount"
                            auth={auth}
                            db={db}
                        />
                    </>
                }
                
                {action === "Sign Up"?<div></div>:
                <>
                    <AccountForm 
                        namePlaceholder="Username" 
                        emailPlaceholder="Email" 
                        passwordPlaceholder="Password"
                        type="signIn"
                        auth={auth}
                        db={db}
                    />
                    <div className='forgot-password'>Forgot Password? <span>Click Here!</span></div>
                </>
                }
            </div>
            <div className = "submit-container">
                <div className={action === "Login"?"submit gray":"submit"} onClick = {() => {setAction("Sign Up")}}> Sign Up</div>
                <div className={action === "Sign Up"?"submit gray":"submit"} onClick = {() => {setAction("Login")}}> Login</div>
                
            </div>
        </div>   
    )
}

export default LoginSignUp
