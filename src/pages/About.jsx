import '../styles/About.css';
import React from 'react'
import CardShopLogo from '../assets/GEG-logo.png';
import phone from '../assets/phone.png';
import location from '../assets/location.jpg';
import {Media1,Media2} from '../components/Media';
function About() {
  return (
    <>
            <img src ={CardShopLogo} alt ="" />
      <div className='title'> Great Escape Game
        <div className='description'>
          Northern California's Premier Game store with a massive collection of Board Games, RPGs, Miniature Games, CCGs, gaming accessories, dice and more!
        </div>
      </div>

      <div className='maps-container'>
        <div className='map1'>Contact Information
          <div className='location'>
          <img src={location} alt="Location Icon" />
            Sacramento Location: 1250 Howe Ave 3a, Sacramento, California 95825
          </div>
          <div className='Medias'>
          Social Media:
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
          <img src={phone} alt="Phone Icon" />
            Business Number: (916) 927-0810
          </div>
          <div className='hours'> Business Hours:</div>
            <dd>Monday: 12pm - 8pm</dd>
            <dd>Tuesday: 12pm - 10pm</dd>
            <dd>Wednesday: 12pm - 9pm</dd>
            <dd>Thursday: 12pm - 10pm</dd>
            <dd>Friday: 12pm - 11pm</dd>
            <dd>Saturday: 12pm - 10pm</dd>
            <dd>Sunday: 12pm - 6pm</dd>
        </div>

        <div className='map2'>Contact Information
          <div className='location'>
            <img src={location} alt="Location Icon" />
             Rocklin Location: 5050 Rocklin Road, Suite A22, Rocklin, CA 95677
          </div>
          <div className='Media'>
          Social Media:
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
          <img src={phone} alt="Phone Icon" />
            Business Number: (916) 259-1797
         </div>
         <div className='hours'> Business Hours:</div>
          <dd>Monday: 12pm - 7pm</dd>
          <dd>Tuesday: 12pm - 7pm</dd>
          <dd>Wednesday: 12pm - 9pm</dd>
          <dd>Thursday: 12pm - 7pm</dd>
          <dd>Friday: 12pm - 10pm</dd>
          <dd>Saturday: 12pm - 10pm</dd>
          <dd>Sunday: 12pm - 6pm</dd>
        </div>
      </div>
    </>
  );
}

export default About;