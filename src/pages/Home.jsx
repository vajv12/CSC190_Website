import React from "react";
import { Link } from 'react-router-dom';
import BannerImage from '../assets/horse-forest.png';
import '../styles/Home.css';
import Slideshow from '../components/Slideshow';
import '../styles/Slideshow.css'



import picture1 from '../assets/sample-picture-1.jpg';
import picture2 from '../assets/sample-picture-2.jpg';
import picture3 from '../assets/sample-picture-3.jpg';


const images = [
    picture1,
    picture2,
    picture3,
];

  
function Home() {
    return (
        <div className="home" >

            <div className="headerContainer">
                <Slideshow images={images} />
            </div>

            <div className="MiddleContainer">
                <h2>Featured Games</h2>
                <div className="FeaturedGames">
                    <div>
                        <div className="imageContainer">
                            <img src="https://static.wixstatic.com/media/21d03a_b078d8cbcc4d4cbabdf88723c31b6b9e~mv2.jpg/v1/fill/w_399,h_399,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/21d03a_b078d8cbcc4d4cbabdf88723c31b6b9e~mv2.jpg" />
                        </div>
                        <div>
                            <h3>MtG: Lord of the Rings</h3>
                            <div>
                            Releases June 23rd.
                            Pre-release events June 16th thru 18th.
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="imageContainer">
                            <img src="https://static.wixstatic.com/media/21d03a_20fad69447784b43bbf87041ba1c6f72~mv2.jpg/v1/fill/w_335,h_399,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/21d03a_20fad69447784b43bbf87041ba1c6f72~mv2.jpg" />
                        </div>
                        <div>
                            <h3>40K Leviathan</h3>
                            <div>40K Leviathan 10th Edition Boxed Set. Pre-order yours now and get $50 towards a new codex!</div>
                        </div>
                    </div>
                    <div>
                        <div className="imageContainer">
                            <img src="https://static.wixstatic.com/media/21d03a_b435f11332af491380e1825cc62ead8e~mv2.jpg/v1/fill/w_399,h_399,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/21d03a_b435f11332af491380e1825cc62ead8e~mv2.jpg" />
                        </div>
                        <div>
                            <h3>Lorcana</h3>
                            <div>Lorcana CCG Coming August 2023!!!</div>
                        </div>
                    </div>
                </div>
                <div className="buttonContainer"><a><button>Browse All Products</button></a></div>
            </div>


            <div className="BottomContainer">
            <h2>Upcoming Events</h2>
                <div className="UpcomingEvents">
                    <div>
                        <img src="https://static.wixstatic.com/media/21d03a_b078d8cbcc4d4cbabdf88723c31b6b9e~mv2.jpg/v1/fill/w_399,h_399,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/21d03a_b078d8cbcc4d4cbabdf88723c31b6b9e~mv2.jpg" />
                            <div>
                                <h3>MtG: Lord of the Rings Launch Tournament</h3>
                                <span>June 16 &mdash; June 18 at Rocklin Location</span> <br />
                                <p>Embark on an epic journey as magic and mythology collide in the MtG: Lord of the Rings Launch Tournament. Join fellow adventurers in an immersive duel of wits and strategy, where legendary creatures and powerful spells await at every turn.</p>
                            </div>
                    </div>
                    <div>
                        <img src="https://static.wixstatic.com/media/21d03a_b078d8cbcc4d4cbabdf88723c31b6b9e~mv2.jpg/v1/fill/w_399,h_399,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/21d03a_b078d8cbcc4d4cbabdf88723c31b6b9e~mv2.jpg" />
                            <div>
                                <h3>MtG: Lord of the Rings Launch Tournament</h3>
                                <span>June 16 &mdash; June 18 at Rocklin Location</span> <br />
                                <p>Embark on an epic journey as magic and mythology collide in the MtG: Lord of the Rings Launch Tournament. Join fellow adventurers in an immersive duel of wits and strategy, where legendary creatures and powerful spells await at every turn.</p>
                            </div>
                    </div>
                    <div>
                        <img src="https://static.wixstatic.com/media/21d03a_b078d8cbcc4d4cbabdf88723c31b6b9e~mv2.jpg/v1/fill/w_399,h_399,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/21d03a_b078d8cbcc4d4cbabdf88723c31b6b9e~mv2.jpg" />
                            <div>
                                <h3>MtG: Lord of the Rings Launch Tournament</h3>
                                <span>June 16 &mdash; June 18 at Rocklin Location</span> <br />
                                <p>Embark on an epic journey as magic and mythology collide in the MtG: Lord of the Rings Launch Tournament. Join fellow adventurers in an immersive duel of wits and strategy, where legendary creatures and powerful spells await at every turn.</p>
                            </div>
                    </div>
                </div>
                <div className="buttonContainer"><a><button>View All Rocklin Events</button></a> <a style={{ marginLeft: '20px' }}><button>View All Sacramento Events</button></a></div>
            </div>

        </div>
    );

}

export default Home;