import React from 'react';
import '../styles/EventCard.css'; 

const EventCard = ({ event }) => {
  const { date, title, imageUrl, detailUrl } = event;

  return (
    <div className="eventCard">
      <div className="eventDate">{date}</div>
      <div className="eventTitle">{title}</div>
      <div className="eventImageContainer">
        <img src={imageUrl} alt={title} className="eventImage" />
        <a href={detailUrl} className="eventDetailsButton">Details</a>
      </div>
    </div>
  );
};

export default EventCard;
