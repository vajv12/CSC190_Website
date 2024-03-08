import React, {useState} from 'react';
import '../styles/LoginSignUp.css';
import AccountForm from '../components/UserAuth/AccountForm'
import { useFirebase } from '../FirebaseContext';
import { sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const LoginSignUp = () => {
    const {auth, db, isAuthenticated, username} = useFirebase();
    const [action,setAction] = useState("Sign Up");   
    const [userCredentials, setUserCredentials] = useState ({
        email: '',
        password: '',
        username: '',

    });

    function handlePasswordReset() {
        const email = prompt('Please enter your email');
        if (email) {
            
            const actionCodeSettings = {
                url: 'http://localhost:3000', 
                handleCodeInApp: true,
                expiresIn: 60 * 60, // 1 hour in seconds
            };
    
            sendPasswordResetEmail(auth, email, actionCodeSettings)
                .then(() => {
                    alert('Password reset email sent! Check your inbox for instructions.');
                })
                .catch((error) => {
                    console.error('Error sending password reset email:', error.message);
                });
        }
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const { email, password, username } = userCredentials;
    
        try {
          if (action === 'Sign Up') {
            // Sign up logic using Firebase authentication
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );
            const user = userCredential.user;
            // Additional logic to store user data in the database (if needed)
            await setDoc(doc(db, 'users', user.uid), {
              username,
              email,
            });
          } else if (action === 'Login') {
            // Login logic using Firebase authentication
            await signInWithEmailAndPassword(auth, email, password);
          }
        } catch (error) {
          console.error('Authentication Error:', error.message);
        }
      };

    
    return (
        <div className={`container ${isAuthenticated}`}>
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
                            setUserCredentials={setUserCredentials}
                            userCredentials={userCredentials}
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
                        setUserCredentials={setUserCredentials}
                        userCredentials={userCredentials}
                    />
                    <div onClick={handlePasswordReset} className='forgot-password'>Forgot Password? <span>Click Here!</span></div>
                </>
                }
            </div>
            <div className = "submit-container">
                <div className={action === "Login"?"submit gray":"submit"} onClick = {() => {setAction("Sign Up"); 
                setUserCredentials({
                    email: '',
                    password: '',
                    username: '',
            });}}> Sign Up</div>
                <div className={action === "Sign Up"?"submit gray":"submit"} onClick = {() => {setAction("Login"); 
                setUserCredentials({
                    email: '',
                    password: '',
                    username: '',
            });}}> Login</div>
                
            </div>
        </div>   
    )
}

export default LoginSignUp
