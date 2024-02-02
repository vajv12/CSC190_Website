import React from 'react';
import { Link } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import FaceBookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import '../styles/Footer.css';

function Footer() {
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
      <p>&copy; 2023 Great Escape Games</p>
    </div>
  );
}

export default Footer;