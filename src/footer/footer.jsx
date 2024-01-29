import React from "react";

import "./footer.css";

const MainFooter = () => {
  return (
    <footer>
      <p>
        Locations
        <br /><br />
          <a href="/sacramento">Sacramento</a> {/* Update this line */}
          <br />
          <a href="/rocklin">Rocklin</a> {/* Update this line */}
        <br /><br /><br />
      </p>

      <div id="subEmail">
        <p>
          Join us to get updates on events, sales, and more!
        </p>

        <input type="email" id="suEmail-bar" placeholder="Enter your Email ..." />
        <br /><br />
        <button id="sub-button">subscribe</button>
      </div>
      <br />
      <p>
        Resources
        <br /><br />
        <a href="javascript:void(0);">Home</a>
        <br />
        <a href="javascript:void(0);">About</a>
        <br />
        <a href="./contact/contact.html">Contact Us</a>
        <br /><br />
        <a href="../hours/hours.html">Hours</a>
      </p>
    </footer>
  );
};

const SocialFooterSacramento = () => {
  return (

    <footer className="social">
      Sacramento Follow us:
      <a href="https://www.facebook.com/GEGsacramento" target="_blank" rel="noreferrer">
        <img src=".\components\images\Facebook-logo.png" alt="Facebook" />
      </a>
      <a href="https://www.yelp.com/biz/great-escape-games-sacramento" target="_blank" rel="noreferrer">
        <img src="./components/images/yelp-logo.png" alt="yelp" />
      </a>
      <a href="https://discord.com/invite/QqpvvqK" target="_blank" rel="noreferrer">
        <img src="./components/images/discord-logo.png" alt="discord" />
      </a>
      <a href="https://www.instagram.com/explore/locations/252481501/great-escape-games-and-comics/?hl=en" 
      target="_blank" 
      rel="noreferrer">
        <img src="./components/images/instagram-logo.png" alt="Instagram" />
      </a>
    </footer>
  );
};

const SocialFooterRocklin = () => {
  return (
    <footer className="social">
      Rocklin Follow us:
      <a href="https://www.facebook.com/GEGRocklin/" target="_blank" rel="noreferrer">
        <img src="../images/Facebook-logo.png" alt="Facebook" />
      </a>
      <a href="https://discord.com/invite/e9sqADWfem" target="_blank" rel="noreferrer">
        <img src="../images/discord-logo.png" alt="discord" />
      </a>
    </footer>
  );
};

const RightsFooter = () => {
  return (
    <footer className="rights">
      <p>&copy; 2023 Great Escape Games. All rights reserved.</p>
    </footer>
  );
};

export { MainFooter, SocialFooterSacramento, SocialFooterRocklin, RightsFooter };
