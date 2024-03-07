// src/UserAuth/AccountForm.js
import React, {Component} from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { collection, getFirestore,  query, where, doc, addDoc, setDoc, getDocs,getDoc} from 'firebase/firestore';


import user_icon from '../../assets/person.png';
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/password.png';
import '../../styles/LoginSignUp.css';


// Initialize Firebase Firestore

class AccountForm extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			username:"",
			email:"",
			password:"",
			error:"",
			type:props.type, //used to conditionally display either the CreateAccount or SignIn form
		}
		
		this.changeHandler = this.changeHandler.bind(this)
		this.handleClickCreateAccount = this.handleClickCreateAccount.bind(this)
		this.handleClickSignIn = this.handleClickSignIn.bind(this)
		this.addUsernameToFirestore = this.addUsernameToFirestore.bind(this)
		this.doesUsernameExist = this.doesUsernameExist.bind(this)
	}

	//can reuse this changehandler for all inputs
	changeHandler(event){
		const {name, value, type, checked } = event.target
		type === "checkbox" ? this.setState((prevState)=>{ return{ [name]: checked }})	: this.setState({ [name]:value })
	}

	handleSubmit(){
		return null
	}

	// Function to add username to Firestore
	addUsernameToFirestore(userId, username){
		return setDoc(doc(this.props.db, "usernames", username), {
				userId: userId
		});
	};

	//checks if username exists in firestore db, so there can't be duplicates
	async doesUsernameExist(username) {
    try {
        const usernameRef = doc(this.props.db, "usernames", username);
        const docSnap = await getDoc(usernameRef);
        return docSnap.exists(); //returns true if the username document exists
    } catch (error) {
        console.error("Error checking username: ", error);
        return false; 
    }
}

	//creates a user account using an email and password
	async handleClickCreateAccount(){
		const auth = getAuth();
		this.setState({ error: "" })
		//check if the username is at least 4 characters long
    if (this.state.username.length < 4) {
			console.error("Username must be more than 4 characters");
			// Update the state or show an error message to the user
			this.setState({ error: "Username must be more than 4 characters" });
			return; // Stop the function here
		}
		//check if the username is 12 characters or less
		else if (this.state.username.length > 12) {
				console.error("Username must be 12 characters or less.");
				// Update the state or show an error message to the user
				this.setState({ error: "Username must be 12 characters or less." });
				return; // Stop the function here
		}
		//check if the username is already taken
		const isTaken = await this.doesUsernameExist(this.state.username);
    if (isTaken) {
			this.setState({ error: "Username already taken. Try something else." })
			return; // Stop the function here
		}
		//attempt to create a user account
		createUserWithEmailAndPassword(this.props.auth, this.state.email, this.state.password)
			.then((userCredential) => {
				const user = userCredential.user;

				// Signed up 
				//add username to users profile
				return updateProfile(userCredential.user, {
					displayName: this.state.username
				}).then(() => userCredential);

				
			})
			.then((userCredential) => {
				//add username to Firestore
				this.addUsernameToFirestore(userCredential.user.uid, this.state.username);
				
				//navigate back to home
				//window.location.href = '/pages/Home';
				

			})
			.catch((error) => {
				//any errors related to the email or password being in the wrong format get caught here, as well as other errors
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(error.code);
				console.log(error.message);
				this.setState({ error: this.getReadableErrorMessage(errorCode) })
			});
		

  };

	handleClickSignIn(){
		signInWithEmailAndPassword(this.props.auth, this.state.email, this.state.password)
			.then((userCredential) => {
				// Signed in 
				
				console.log(userCredential)
				
				//navigate back to home
				//window.location.href = '/pages/Home';
			})
			.catch((error) => {
				const errorCode = error.code;
				console.log(errorCode);
				const errorMessage = error.message;
				this.setState({ error: this.getReadableErrorMessage(errorCode, errorMessage) })
			});
  };

  //convert Firebase errors into human-friendly error messages
	getReadableErrorMessage(errorCode, errorMessage) {
    switch (errorCode) {
        case 'auth/weak-password':
            return 'The password is too weak. Please use a stronger password (at least 6 characters).';
        case 'auth/invalid-email':
            return 'The email address entered is invalid. Please check and try again.';
        case 'auth/missing-password':
            return 'No password was provided. Please enter a password.';
        case 'auth/email-already-in-use':
            return 'This email address is already in use. Please use a different email address or sign in.';
        case 'auth/invalid-credential':
						return 'Invalid email or password. Please try again.'
				default:
            return errorMessage;
    }
	}

	render(){
		const style = {
			color: this.state.favColor
		}
		let errorText = null
		if(this.state.error != "")
		{ errorText = <div id='errorContainer'><h4>{this.state.error}</h4></div> }


		return(
			<>

				{this.state.type === "createAccount" ?
					(
						<form class="InputForm" onSubmit={this.handleSubmit}>

							<div className="input" >
								<img src ={user_icon} alt =""/>
								<input class="InputText" type="text" name="username" value={this.state.value} placeholder={this.props.usernamePlaceholder} onChange={this.changeHandler} />
							</div>
							<div className='input'>
								<img src ={email_icon} alt =""/>
								<input class="InputText" type="text" name="email" value={this.state.value} placeholder={this.props.emailPlaceholder} onChange={this.changeHandler} />
							</div>
							<div className='input'>
								<img src ={password_icon} alt =""/>
								<input class="InputText" type="text" name="password" value={this.state.value} placeholder={this.props.passwordPlaceholder} onChange={this.changeHandler} />
							</div>	
							<div class="submit" onClick={this.handleClickCreateAccount} >Create Account</div>
							{ errorText }
						</form>
					):null
				}
				{this.state.type === "signIn" ? (
						<form class="InputForm" onSubmit={this.handleSubmit}>
							<div className='input'>
								<img src ={email_icon} alt =""/>
								<input class="InputText" type="text" name="email" value={this.state.value} placeholder={this.props.emailPlaceholder} onChange={this.changeHandler} />
							</div>
							<div className='input'>
								<img src ={password_icon} alt =""/>
								<input class="InputText" type="text" name="password" value={this.state.value} placeholder={this.props.passwordPlaceholder} onChange={this.changeHandler} />
							</div>	
							<div class="submit" onClick={this.handleClickSignIn} >Sign In</div>
							{ errorText }
						</form>
					):null
				}
			</>
		)
	}
}

export default AccountForm