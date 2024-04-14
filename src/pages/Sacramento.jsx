import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useFirebase } from '../FirebaseContext';
import '../styles/SacRock.css';

// SacramentoEvent component
function SacramentoEvent({ event }) {
  return (
    <div className='event-box'>
      <h3>{event.title}</h3>
      <p>Date: {event.date}</p>
      <p>Description: {event.description}</p>
      <p>Location: {event.location}</p>
      <img src={event.image} alt={event.title} />
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
          fetchedEvents.push(doc.data());
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
