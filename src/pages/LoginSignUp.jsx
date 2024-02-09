import React, {useState} from 'react';
import '../styles/LoginSignUp.css';
import AccountForm from '../components/UserAuth/AccountForm'
import { useAuth } from '../AuthContext';

const LoginSignUp = () => {
    const auth = useAuth();
    const [action,setAction] = useState("Sign Up");   
    
    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className = "inputs">
            
                {action === "Login"?<di></di>:
                    <>
                        <AccountForm 
                            namePlaceholder="Username" 
                            emailPlaceholder="Email" 
                            passwordPlaceholder="Password"
                            type="createAccount"
                            auth={auth}
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
