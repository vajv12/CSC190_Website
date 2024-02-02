import React from "react";
import leftMap from "../assets/board-dice.jpg";
import "../styles/Contact.css";

function Contact() {
  return (
    <div className="contact">
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${leftMap})` }}
      ></div>
      <div className="rightSide">
        <h1> Contact Us</h1>

        <form id="contact-form" method="POST">
          <label htmlFor="name">Full Name</label>
          <input name="name" 
          placeholder="Enter full name..." 
          type="text" 
          required/>
          
          <label htmlFor="email">Email</label>
          <input name="email" 
          placeholder="Enter email..." 
          type="email" 
          required/>

          <label htmlFor="message">Message</label>
          <textarea
            rows="6"
            maxLength={300}
            placeholder="Enter message..."
            name="message"
            required
          ></textarea>

          <button type="submit"> Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;