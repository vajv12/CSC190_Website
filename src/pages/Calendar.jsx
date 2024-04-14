import React, { useState } from "react";
import "../styles/Calendar.css";

const calendars = [
    "https://calendar.google.com/calendar/embed?src=greatescapegames.com_45ad9ar49edub65ctttnv4eqng%40group.calendar.google.com&ctz=America%2FLos_Angeles",
    "https://calendar.google.com/calendar/embed?src=c_90db9e91b26301709de66ddec84ad3390bfe13c7572ea430e24335d4bcbc4491%40group.calendar.google.com&ctz=America%2FLos_Angeles"
];

function CalendarCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === calendars.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? calendars.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="calendar-carousel">
      <button onClick={handlePrev}>Previous</button>
      <iframe
        src={calendars[currentIndex]}
        style={{ border: "0" }}
        width="800"
        height="600"
        frameBorder="0"
        scrolling="no"
        title={`Calendar ${currentIndex + 1}`}
      ></iframe>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default CalendarCarousel;

