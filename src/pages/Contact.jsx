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
    <div className="contact">
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
          
           <button type="submit"  disabled={loader}>
          {loader ? "Submitting..." : "Submit"}
        </button>
        </form>

         {/*Sacramento location info */}
         <div className='locationInfo'>
         <div className= "leftLocation">
        <h2>@ Sacramento</h2>
        <a href="https://www.google.com/maps/place/Great+Escape+Games,+Inc./@38.5873343,-121.4153299,17z/data=!3m1!4b1!4m17!1m10!4m9!1m0!1m6!1m2!1s0x809ada39671a9773:0x3405722418e1c297!2sGreat+Escape+Games,+Inc.,+1250+Howe+Ave+%233A,+Sacramento,+CA+95825!2m2!1d-121.412755!2d38.5873343!3e0!3m5!1s0x809ada39671a9773:0x3405722418e1c297!8m2!3d38.5873343!4d-121.412755!16s%2Fg%2F1tdlvjf_?hl=en&entry=ttu" 
         target="_blank" 
         rel="noopener noreferrer">
          1250 Howe Ave #3a, Sacramento, CA 95825
         </a>
            <p>Phone:
              <a href ="tel: +1 916 927 0810">+1 916 927 0810</a>
            </p>
            <ul>
            <li>Mon 12pm - 8pm</li>
            <li>Tues 12pm - 10pm </li>
            <li>Wed 12pm - 8pm</li>
            <li>Thu 12pm - 10pm </li>
            <li>Fri 12pm - 11pm </li>
            <li>Sat 12pm - 10pm </li>
            <li>Sun 12pm - 6pm </li>
        </ul>
        </div>

        <div className = "rightLocation">
        <h2>@ Rocklin</h2>
        <a href="https://www.google.com/maps/place/Great+Escape+Games+Rocklin/@38.788176,-121.2074214,19.54z/data=!4m14!1m7!3m6!1s0x809b1ef9858e62a1:0xaa9f18f663687af7!2s5050+Rocklin+Rd+a22,+Rocklin,+CA+95677!3b1!8m2!3d38.7880998!4d-121.2076018!3m5!1s0x809b1f51de1b1cad:0xea25202cda1173d1!8m2!3d38.7883344!4d-121.208038!16s%2Fg%2F11sgn_qkwz?entry=ttu" 
         target="_blank" 
         rel="noopener noreferrer">
          5050 Rocklin Rd, Rocklin, CA 95677
         </a>
         <p>Phone:
          <a href="tel: +1 916 259 1797">+ 1 916 259 1797</a>
         </p>
        <ul>
            <li>Mon 12pm - 7pm</li>
            <li>Tues 12pm - 7pm </li>
            <li>Wed 12pm - 9pm</li>
            <li>Thu 12pm - 7pm </li>
            <li>Fri 12pm - 11pm </li>
            <li>Sat 12pm - 10pm </li>
            <li>Sun 12pm - 6pm </li>
        </ul>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;