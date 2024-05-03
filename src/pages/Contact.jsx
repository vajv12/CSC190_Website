/* user can contact buisness with question and replied back by employee */
/* has to create/connect to email listing later */
import React, { useState } from "react";
import { serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { useFirebase } from '../FirebaseContext';
import leftMap from "../assets/customer-service-icon.png";
import "../styles/Contact.css";

function Contact() {

  const[name, setName] = useState("");
  const[email, setEmail] = useState("");
  const[subject, setSubject] = useState("");
  const[message, setMessage] = useState("");

  const[loader, setLoader] = useState(false);
  const characterCount = message.length;
  const{ db } = useFirebase();

  //send email using SMTPJS
  const sendEmail = () => {
    const emailData = {
      Host : "smtp.elasticemail.com",
      //from elastic email need to use client domain to make support 
      //and secure to replace username and password with  
      //SecureToken : "C973D7AD-F097-4B95-91F4-40ABC5567812",
      Username : "sharinguyening@gmail.com",
      Password:"4AD30342328240C7724AFD3C6A51193BF987",
      //send copy to customer
      To: email, 
      //use support email
      Cc: 'sharinguyening@gmail.com',
      From: 'sharinguyening@gmail.com',
      Subject: subject,
      Body: 
      `<strong> Hi ${name} </strong>,
       <br>
      "${message}" 
       <br>
       <i> (copy of form submitted) </i>
       <br>
       <br>
      <strong> A Great Escape Games staff will get back to you shortly. </strong>
      <br>
      <strong> Thank you! </strong>
      `,

    };

    window.Email.send(emailData).then(
      (message) => {
        console.log(message);
        alert("Email sent successfully!");
      }
    );
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true)
    console.log('Submitting form:', name, email, subject, message);
  
    //reads database in contacts
    try {
      const docRef = await addDoc(collection(db, 'contacts'), {
        name,
        email,
        subject,
        message,
        timestamp: serverTimestamp(),
      });
      //sends message that it is sent with id if not show error
      console.log("Document written with ID: ", docRef.id);
      alert("Message has been submitted");
       // Send email after successfully adding to Firestore
       sendEmail();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Firestore is not properly initialized");
      alert(error.message);
    }

    setLoader(false);

    // Reset form fields
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="contact" data-testid="contact-page">
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${leftMap})` }}
      ></div>
      <div className="rightSide">
        <h1> Contact Us</h1>

        <form id="contact-form"  method="POST"  onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input name="name" 
          /* as user changes the value changes */
          value ={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Joe Doe" 
          type="text" 
          required/>
          
          <label htmlFor="email">Email</label>
          <input name="email" 
          value ={email}
          onChange ={(e) => setEmail(e.target.value)}
          placeholder="@email" 
          type="email" 
          required/>

          <label htmlFor="subject">Subject</label>
          <input name="subject"
          value={subject}
          onChange= {(e) => setSubject(e.target.value)}
          placeholder="Subject line" 
          type="text" 
          required/>

          <label htmlFor="message">Message</label>
          <textarea
            rows="6"
            maxLength={300}
            placeholder="Enter message..."
            name="message"
            value={message}
            onChange= {(e) => setMessage(e.target.value)}
            required
          ></textarea>
           <div className="character-counter">{characterCount}/300 characters</div>
           <button type="submit"  disabled={loader}>
          {loader ? "Submitting..." : "Submit"}
        </button>
        </form>

       
      </div>
    </div>
  );
}

export default Contact;