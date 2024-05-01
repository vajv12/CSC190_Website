import React from 'react';
import '../styles/EventCard.css'; 

const EventCard = ({ event }) => {
  const { date, name, image, detailUrl } = event;

  return (
    <div className="eventCard" data-testid="event-card">
      <div className="eventDate">{date}</div>
      <div className="eventTitle">{name}</div>
      <div className="eventImageContainer">
        <img src={image} alt={name} className="eventImage" />
   
      </div>
    </div>
  );
};

export default EventCard;
