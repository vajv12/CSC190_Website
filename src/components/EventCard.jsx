import React from 'react';
import '../styles/EventCard.css'; 

const EventCard = ({ event }) => {
  const { date, name, image, detailUrl } = event;

  return (
    <div className="eventCard">
      <div className="eventDate">{date}</div>
      <div className="eventTitle">{name}</div>
      <div className="eventImageContainer">
        <img src={image} alt={name} className="eventImage" />
        <a href={detailUrl} className="eventDetailsButton">Details</a>
      </div>
    </div>
  );
};

export default EventCard;
