import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/SacRock.css';

// RocklinEvent component
function SacramentoEvent({ event }) {
  return (
    <div className='event-box'>
      <div className='event'>
        <p>{event.title}</p>
        <p>{event.date}</p>
        <p>{event.time}</p>
        <h3>Requirements:</h3>
        <ul>
          <li>Valid ID proof</li>
          <li>Confirmation email</li>
        </ul>
        <h3>Prohibited Items:</h3>
        <ul>
          <li>Outside food and drinks</li>
          <li>Weapons or dangerous items</li>
        </ul>
      </div>
    </div>
  );
}

// EventCalendar component with Carousel
function EventCalendar() {
  const events = [
    { title: 'Event 1', date: '2024-02-27', time: '10:00 AM' },
    { title: 'Event 2', date: '2024-02-28', time: '2:00 PM' },
  ];

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
