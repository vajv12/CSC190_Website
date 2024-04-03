//user can sign up to be up to date with the latest news 
//save emails with timestamp to firebase under subscribers
import React, { useState } from "react";
import { serverTimestamp, addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useFirebase } from '../FirebaseContext';
import axios from 'axios';
import '../styles/Newsletter.css';

function NewsLetter() {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { db } = useFirebase();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      // Check if email already exists
      const emailQuery = query(collection(db, 'newsletterRequests'), where('email', '==', email));
      const emailSnapshot = await getDocs(emailQuery);

      if (!emailSnapshot.empty) {
        setErrorMessage("You are already subscribed.");
        setLoader(false);
        return;
      }

      // Add email to Firestore
      const docRef = await addDoc(collection(db, 'newsletterRequests'), {
        email,
        timestamp: serverTimestamp(),
      });

      // Send confirmation email using Cloud Function
      await sendEmail();

      // Reset the form and show success message
      setEmail("");
      setLoader(false);
      setErrorMessage("");
      alert("Subscribed successfully!");
    } catch (error) {
      console.error("Error subscribing:", error);
      setErrorMessage("Failed to subscribe. Please try again later.");
      setLoader(false);
    }
  };

  const sendEmail = async () => {
    try {
      const response = await axios.post('https://us-central1-csc190-w.cloudfunctions.net/handleNewsletterRequest', { email }); // Update with your Cloud Function endpoint
      console.log('Response:', response.data);
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error.response ? error.response.data : error.message);
      alert('Failed to send email. Please try again later.');
    }
  };

  return (
    <div className="news-letter">
      <h2>Join our newsletter</h2>
      <form id="subscribe" onSubmit={handleSubscribe}>
        
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="@email.com"
          type="email"
          required
          disabled={loader}
        />
        <button type="submit" disabled={loader}>
          {loader ? "Subscribing..." : "Subscribe"}
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default NewsLetter;

