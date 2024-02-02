import React from 'react';
//import { Link } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import FaceBookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import '../styles/Footer.css';

function Footer() {
   
  /*set email listing */
  {/* 
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  
  const handleSubscribe = (event) => {
   event.preventDefault();
    // Add logic here to handle the subscription, e.g., send the email to your server

    // For demonstration purposes, log the email to the console
    console.log(`Subscribed with email: ${email}`);

    // Reset the email input
    setEmail('');
  };
*/}
  return (
    <div className="footer">
      <div className="socialMedia">
        {/* Instagram */}
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" target="_blank" rel="noopener noreferrer">
          <InstagramIcon />
        </a>

        {/* Facebook */}
        <a href="https://www.facebook.com/GEGsacramento" target="_blank" rel="noopener noreferrer">
          <FaceBookIcon />
        </a>

        {/* Twitter */}
        <a href="https://twitter.com/?lang=en" target="_blank" rel="noopener noreferrer">
          <TwitterIcon />
        </a>
      </div>
      <p>&copy; 2024 Great Escape Games</p>

{/* work on later to create a subscribe email option also commented out in css */}
        {/* Email subscription form 
      <form onSubmit={handleSubscribe}>
        <label>
          Subscribe to Updates:
          <input type="email" value={email} onChange={handleEmailChange} required />
        </label>
        <button type="submit">Subscribe</button>
      </form>
       */}
    </div>
  );
}

export default Footer;