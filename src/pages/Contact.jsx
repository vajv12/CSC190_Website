/* user can contact buisness with question and replied back by employee */
/* has to create/connect to email listing later */
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