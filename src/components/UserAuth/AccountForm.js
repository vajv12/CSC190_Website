// src/UserAuth/AccountForm.js
import React, {Component} from 'react'
import './AccountForm.css'
import Button from '../../Button';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


class AccountForm extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			email:"",
			password:"",
			error:"",
			type:props.type, //used to conditionally display either the CreateAccount or SignIn form
		}

		this.changeHandler = this.changeHandler.bind(this)
		this.handleClickCreateAccount = this.handleClickCreateAccount.bind(this)
		this.handleClickSignIn = this.handleClickSignIn.bind(this)
	}
	
	//can reuse this changehandler for all inputs
	changeHandler(event){
		const {name, value, type, checked } = event.target
		type === "checkbox" ? this.setState((prevState)=>{ return{ [name]: checked }})	: this.setState({ [name]:value })
	}
	
	handleSubmit(){
		return null
	}
	handleClickCreateAccount(){
		createUserWithEmailAndPassword(this.props.auth, this.state.email, this.state.password)
			.then((userCredential) => {
				// Signed up 
				//const user = userCredential.user;
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				this.setState({ error: this.getReadableErrorMessage(errorCode) })
				// ..
			});
  };

	handleClickSignIn(){
		console.log("signing in");
		console.log(this.state.email);
		console.log(this.state.password);
		signInWithEmailAndPassword(this.props.auth, this.state.email, this.state.password)
			.then((userCredential) => {
				// Signed in 
			})
			.catch((error) => {
				const errorCode = error.code;
				console.log(errorCode);
				const errorMessage = error.message;
				this.setState({ error: this.getReadableErrorMessage(errorCode) })
			});
  };

  //convert Firebase errors into human-friendly error messages
	getReadableErrorMessage(errorCode) {
    switch (errorCode) {
        case 'auth/weak-password':
            return 'The password is too weak. Please use a stronger password (at least 6 characters).';
        case 'auth/invalid-email':
            return 'The email address entered is invalid. Please check and try again.';
        case 'auth/missing-password':
            return 'No password was provided. Please enter a password.';
        case 'auth/email-already-in-use':
            return 'This email address is already in use. Please use a different email address or sign in.';
        case 'auth/invalid-login-credentials':
						return 'Invalid email or password. Please try again.'
				default:
            return 'An unknown error occurred. Please try again.';
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
							<label>Email Address:&nbsp;
								<input class="InputText" type="text" name="email" value={this.state.value} placeholder={this.props.emailPlaceholder} onChange={this.changeHandler} />
							</label>
							<label>Create a Password:&nbsp;
								<input class="InputText" type="text" name="password" value={this.state.value} placeholder={this.props.passwordPlaceholder} onChange={this.changeHandler} />
							</label>
							<div class="SubmitButton" onClick={this.handleClickCreateAccount} >Create Account</div>
							{ errorText }
						</form>
					):null
				}
				{this.state.type === "signIn" ? (
						<form class="InputForm" onSubmit={this.handleSubmit}>
							<label>Email Address:&nbsp;
								<input class="InputText" type="text" name="email" value={this.state.value} placeholder={this.props.emailPlaceholder} onChange={this.changeHandler} />
							</label>
							<label>Password:&nbsp;
								<input class="InputText" type="text" name="password" value={this.state.value} placeholder={this.props.passwordPlaceholder} onChange={this.changeHandler} />
							</label>
							<div class="SubmitButton" onClick={this.handleClickSignIn} >Sign In</div>
							{ errorText }
						</form>
					):null
				}
			</>
		)
	}
}

export default AccountForm