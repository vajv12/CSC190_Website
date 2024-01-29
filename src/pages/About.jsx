import React from "react";
import aboutImage from "../assets/map-dice.jpg";
import "../styles/About.css";
function About() {
  return (
    <div className="about">
      <div
        className="aboutTop"
        style={{ backgroundImage: `url(${aboutImage})` }}
      ></div>
      <div className="aboutBottom">
        <h1> ABOUT US</h1>
        <p>
            Welcome to Great Escape Games, your go-to destination for all things role-playing!
            We are passionate about bringing people together through the magic of role-playing with our
            variety of tabletop games and creating a community where ethusiasists of all ages and skill \
            levels can find their perfect gaming experience.
        </p>

        <h2> Our Story</h2>
        <p>
            Established in __, Great Escape Games was born out of love for tabletop games and a desire to 
            provide a dedicated spcae for gameres to connect, explore, and enjoy their favorite pastime activities.
            Our founder, Gary Lane, envisioned a splace where the role-playing community could
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
            Discover an extensive collection of tabletop games, role-playing games(RPGs), board games,
            card games, and accessories. We curate our selection to cater to all interests, from classic 
            board games to teh latest tabletop release.
        </p>

        <h3>Knowledgable Staff</h3>
        <p>
            Our team consists of avid gamers who are always ready to assist you. Whether you're a 
            seasoned player or new to the world of tabletop gmaing, we're here to provide recommendations, answer
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
            games, host meet-ups, or participate in organized play. We provide the tables,space, and a welcoming atmosphere
            for you to immerse yourseld in your gaming experience.
        </p>


        <h2>Visit Us</h2>
       <p>
        Come and explore the world of tabletop gaming. Whehter you're a seasoned player or a curious newcomer, we invite you to be a part of our 
        growing community. Check out our store in Sacramento or Rocklin, meet fellow gamers, and embark on new adventures!

       <br />
       <br />

       Thank you for choosing Great Escape Games as your tabletop gaming destination.

       <br />
       <br />
       
       Let the games being!
       </p>
      </div>
    </div>
  );
}

export default About;