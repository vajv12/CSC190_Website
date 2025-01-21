import '../styles/About.css';
import React from 'react'
import GEGLogo from '../assets/GEG-logo.png';
import phone from '../assets/phone.png';
import location from '../assets/location.jpg';
import {Media1,Media2} from '../components/Media';
function About() {
  return (
    
    <div className ='about'  data-testid="about-page">
        
      {/* after image everthing is aboutBottom
      Gives content of what the store is about */}
      
      <div className="aboutBottom">
      <img src ={GEGLogo} alt ="GEG logo" height = {500} width={500} style={{ alignSelf: 'center'}} /> 
        <h1> ABOUT US</h1>
         
        <p>
            Welcome to Great Escape Games, your go-to destination for all things table-top games!
            We are passionate about bringing people together through the magic of role-playing with our
            variety of tabletop games and creating a community where enthusiasts of all ages and skill 
            levels can find their perfect gaming experience.
        </p>

        <h2> Our Story</h2>
        <p>
            Established in 1996, Great Escape Games was born out of love for tabletop games and a desire to 
            provide a dedicated spaces for gamers to connect, explore, and enjoy their favorite pastime activities.
            Our founder, Gary Lane, envisioned a space where the role-playing community could
            thrive, learn, and share their passion for strategy and creativity. 
        </p>

        <h2>Our Mission</h2>
        <p>
            At Great Escape Games, our mission is to be more than just a store; we aim to be a hub for the tabletop gaming
            commuinity. We strive to create an inclusive space where everyone feels welcome, from families looking for a fun activity to serious
            gamers seeking a competitive challenger.
        </p>

        <h2>What Sets Us Apart</h2>
        <h3>Wide Selection</h3>
        <p> 
            Discover an extensive collection of tabletop games, role-playing games (RPGs), board games,
            card games, and accessories. We curate our selection to cater to all interests, from classic 
            board games to the latest tabletop release.
        </p>

        <h3>Knowledgeable Staff</h3>
        <p>
            Our team consists of avid gamers who are always ready to assist you. Whether you're a 
            seasoned player or new to the world of tabletop gaming, we're here to provide recommendations, answer
            questions, and help you find the perfect game for any occasion.
        </p>

        <h3>Community Events</h3>
        <p>
        Join us for regular gaming events, tournaments, and community gatherings. We believe in fostering a 
        sense of belonging among tabletop enthusiasts. Our events provide opportunities to meet like-minded 
        individuals, make new friends, and engage in friendly competition.
        </p>

        <h3>Dedicated Gaming Space</h3>
        <p>
            Feel at home in our dedicated gaming space. Enjoy a comfortable environment where you can play your favorite
            games, host meet-ups, or participate in organized play. We provide the tables, space, and a welcoming atmosphere
            for you to immerse yourseld in your gaming experience.
        </p>


        <h2>Visit Us</h2>
       <p>
        Come and explore the world of tabletop gaming. Whether you're a seasoned player or a curious newcomer, we invite you to be a part of our 
        growing community. Check out our store in Sacramento or Rocklin, meet fellow gamers, and embark on new adventures!

       <br />
       <br />

       Thank you for choosing Great Escape Games as your tabletop gaming destination.

       <br />
       <br />
       
       Let the games begin!
       </p>

      </div>

      
      <div className='maps-container'>
        <div className='map1'>
          <h3>Sacramento Information</h3>

          <div className='location'>
          <p>
          <img src={location} alt="Location Icon" />
           1250 Howe Ave 3a, Sacramento, California 95825 </p>
          </div>
          <div className='Medias'>
          <h4>Social Media: </h4>
          <div className='apps'>
            {
              Media1.map((item,index) =>{
                return (
                  <div key ={index}>
                   <a href={item.href} target="_blank" rel="noopener noreferrer">
                    <img src={item.img} alt='media' className="h-28" />
                  </a>
                  </div>
                )
              })
            }
          </div>
        </div>
            <iframe
              title="Google Maps 1"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12474.699491666695!2d-121.412755!3d38.5873343!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ada39671a9773%3A0x3405722418e1c297!2sGreat%20Escape%20Games%2C%20Inc.!5e0!3m2!1sen!2sus!4v1701415050469!5m2!1sen!2sus" 
              width="100%"
              height="300"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
           
          <div className='phone'>
          <p>
          <img src={phone} alt="Phone Icon"  /> 
          Buisness Number:
          <a href =" tel: +1 916 927 0810"> +1 916 927 0810</a>
          </p>

          </div>
          <div className='hours'> 
          <h1>Business Hours: </h1>
            <dd>Monday: 12pm - 10pm</dd>
            <dd>Tuesday: 12pm - 10pm</dd>
            <dd>Wednesday: 12pm - 10pm</dd>
            <dd>Thursday: 12pm - 10pm</dd>
            <dd>Friday: 12pm - 12am</dd>
            <dd>Saturday: 12pm - 10pm</dd>
            <dd>Sunday: 12pm - 6pm</dd>
            < br />
            </div>
        </div>
     

        <div className='map2'>
          <h3>Rocklin Information</h3>
          <div className='location'>
            <p>
            <img src={location} alt="Location Icon" />
            5050 Rocklin Road, Suite A22, Rocklin, CA 95677
             </p>

         </div>
          <div className='Media'>
            <h4>Social Media:</h4>
          
          <div className='apps'>
          {
              Media2.map((item,index) =>{
                return (
                  <div key ={index}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      <img src={item.img} alt='media' className="h-28" />
                    </a>
                  </div>
                )
              })
            }
          </div>
        </div>
          <iframe
            title="Google Maps 2"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12439.703363173976!2d-121.208038!3d38.7883344!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809b1f51de1b1cad%3A0xea25202cda1173d1!2sGreat%20Escape%20Games%20Rocklin!5e0!3m2!1sen!2sus!4v1701414977136!5m2!1sen!2sus"
            width="100%"
            height="300"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          
          <div className='phone'>
          <p>
          <img src={phone} alt="Phone Icon"  /> 
          Buisness Number:
          <a href="tel: +1 916 259 1797"> + 1 916 259 1797</a>
          </p>

          </div>
         <div className='hours'> 
         <h1>Business Hours:</h1>
          <dd>Monday: 12pm - 7pm</dd>
          <dd>Tuesday: 12pm - 7pm</dd>
          <dd>Wednesday: 12pm - 9pm</dd>
          <dd>Thursday: 12pm - 7pm</dd>
          <dd>Friday: 12pm - 10pm</dd>
          <dd>Saturday: 12pm - 10pm</dd>
          <dd>Sunday: 12pm - 6pm</dd>
          </div>

        </div>

        {/*map container ending */}
      </div>

      </div>
    
  );
}

export default About;