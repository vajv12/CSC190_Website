import React from 'react';
import {Link} from "react-router-dom";
import InstagramIcon from'@mui/icons-material/Instagram';
import FaceBookIcon from'@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import "../styles/Footer.css";

function Footer() {
    return <div className="footer">
        <div className="socialMedia">
        {/*link social link below instagram ises target="_blank" to open in new tab*/}
        <Link to='https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley'
         target="_blank">
           <InstagramIcon />
        </Link>

        {/*Facebook */}
        <Link to='https://www.facebook.com/GEGsacramento'
         target="_blank">
       <FaceBookIcon  />
       </Link>

        {/*twitter */}
       <Link to='https://twitter.com/?lang=en'
         target="_blank">
       <TwitterIcon />
       </Link>

        </div>
        <p>&copy; 2023 Great Escape Games</p>
        </div>;
}

export default Footer;