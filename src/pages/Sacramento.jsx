import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useFirebase } from '../FirebaseContext';
import '../styles/SacRock.css';

function SacramentoEvent({ event }) {
  const [showSignup, setShowSignup] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [stripeLink, setStripeLink] = useState('');
  const { db } = useFirebase();

  const handleSignUp = () => {
    setShowSignup(!showSignup); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        eventId: event.target.eventId.value, 
        eventName: event.target.eventName.value, 
        eventDate: event.target.eventDate.value, 
        firstName,
        lastName,
        email,
        phone,
      };
      await addDoc(collection(db, 'tournamentSpots'), formData);

      console.log('submitted doc');

      alert('Signed up for event successfully! Check email for confirmation.');

        setShowSignup(false);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
    }
     catch (error) {
      console.error('Error submitting form: ', error);
      alert('Sign up was unsuccessful. Try again.');
    }
  };

  const handlePayment = async (event) => {
    event.preventDefault();
    try {
        const formData = {
          eventId: event.target.eventId.value, 
          eventName: event.target.eventName.value, 
          eventDate: event.target.eventDate.value, 
          firstName,
          lastName,
          email,
          phone,
          paid: false, 
          price: event.target.price.value,
        };
  
        const paymentTournament = await addDoc(collection(db, 'tournamentSpots'), formData);
  
        const clientReferenceId = paymentTournament.id;
  
        const data = {
          clientReferenceId,
        }
  
        await updateDoc(paymentTournament, data);
  
        // Set the Stripe link with the client reference ID
        const baseURL = event.target.stripeLink.value;
        const stripeLinkFin = `${baseURL}?client_reference_id=${clientReferenceId}`;
        setStripeLink(stripeLinkFin)
  
        console.log('submitted doc');
  
        alert('Press OK to be redirected to complete payment for sign up!');
  
        window.location.href = stripeLinkFin; // Redirect to Stripe link
      }
     catch (error) {
      console.error('Error submitting form: ', error);
      alert('Sign up was unsuccessful. Try again.');
    }
  };

  return (
    <div className='event-box'>
      <h3>{event.title}</h3>
      <p>Date: {event.date}</p>
      <p>Description: {event.description}</p>
      <p>Location: {event.location}</p>
      {event.price && <p>Price: {event.price}</p>} {/* Render price if it exists */}
      <img src={event.image}  />
      {!showSignup ? (
        <button onClick={handleSignUp}>Sign Up</button>
      ) : (
        <form onSubmit={event.stripeLink ? handlePayment : handleSubmit}>
          <input type='hidden' name='eventId' value={event.id} /> 
          <input type='hidden' name='eventName' value={event.title} /> 
          <input type='hidden' name='eventDate' value={event.date} />
          <input type='hidden' name='price' value={event.price} /> 
          <input type='hidden' name='stripeLink' value={event.stripeLink} /> 
          <label>
            First Name:
            <input
              type='text'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label>
            Last Name:
            <input
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Phone:
            <input
              type='tel'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <button type="submit">{event.stripeLink ? 'Pay' : 'Submit'}</button>
        </form>
      )}
      {showSignup && (
        <button onClick={handleSignUp}>Cancel</button>
      )}
    </div>
  );
}
  

// EventCalendar component with Carousel
function EventCalendar() {
  const { db } = useFirebase();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, 'events'), where('category', '==', 'Sacramento'));
        const querySnapshot = await getDocs(q);
        const fetchedEvents = [];
        querySnapshot.forEach((doc) => {
          const event = { ...doc.data(), id: doc.id }; // Add the document ID to the event object
          fetchedEvents.push(event);

        });
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events: ', error);
      }
    };

    fetchEvents();
  }, [db]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className='calendar'>
      <h2>Event Calendar</h2>
      <Slider {...settings}>
        {events.map((event, index) => (
          <SacramentoEvent key={index} event={event} />
        ))}
      </Slider>
    </div>
  );
}

export default EventCalendar;