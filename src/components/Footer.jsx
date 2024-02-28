import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FaceBookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';



import '../styles/Footer.css';
import DiscordIcon from '../assets/discord.png';

function Footer() {

  /*set email listing */
  // Set email listing
  // const [email, setEmail] = useState('');

  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value);
  // };

  // const handleSubscribe = (event) => {
  //   event.preventDefault();
  //   // Add logic here to handle the subscription, e.g., send the email to your server

  //   // For demonstration purposes, log the email to the console
  //   console.log(`Subscribed with email: ${email}`);

  //   // Reset the email input
  //   setEmail('');
  // };

  return (
    <footer className="footer">
      <div className="footer-column">
        <nav className="footer-nav">
          <a href="/products">Products</a>
          <a href="/about">About</a>
          <a href="https://greatescapegamesllc.tcgplayerpro.com/">Card Finder</a>
          <a href="/support">Support</a>
          <a href="/feedback">Feedback</a>
        </nav>
        <div className="social">

          <div className="social-icons">

            {/* Icons */}
            <a href="https://www.instagram.com/explore/locations/252481501/great-escape-games-and-comics/?hl=en" target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
            </a>
            <a href="https://www.facebook.com/GEGsacramento" target="_blank" rel="noopener noreferrer"><FaceBookIcon />
            </a>

            <a href="https://discord.com/invite/QqpvvqK">
              <img src={DiscordIcon} alt="Description" style={{ width: 24, filter: "invert(100%)" }} />
            </a>




            <a href="https://www.youtube.com/channel/UCLXZYz1W28wHGWhjYSmiPtQ/videos" target="_blank" rel="noopener noreferrer"><YouTubeIcon /> </a>
          </div>
        </div>
      </div>

      <div className="footer-column">
        
        <h2>Sacramento Location:</h2>
        <p>Phone: 916 927 0810</p>
        <p>1250 Howe Ave #3a, Sacramento, CA 95825</p>

        <br />

        <h2>Rocklin Location:</h2>
        <p>Phone: 916 259 1797</p>
        <p>5050 Rocklin Road, Suite A22, Rocklin, CA 95677</p>
      </div>

      <div className="footer-column">


        <h2>Sacramento</h2>
        <p>Mon 12pm - 8pm</p>
        <p>Tue 12pm - 10pm</p>
        <p>Wed 12pm - 8pm</p>
        <p>Thu 12pm - 10pm</p>
        <p>Fri 12pm - 11pm</p>
        <p>Sat 12pm - 10pm</p>
        <p>Sun 12pm - 6pm</p>


      </div>

      <div className="footer-column">


        <h2>Rocklin</h2>
        <p>Mon 12pm - 7pm</p>
        <p>Tue 12pm - 7pm</p>
        <p>Wed 12pm - 9pm</p>
        <p>Thu 12pm - 7pm</p>
        <p>Fri 12pm - 11pm</p>
        <p>Sat 12pm - 10pm</p>
        <p>Sun 12pm - 6pm</p>

      </div>
    </footer>
  );


}

export default Footer;