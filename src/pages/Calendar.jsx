import React, { useState } from "react";
import "../styles/Calendar.css";

function Calendar() {
    const [calendars, setCalendars] = useState([
        "https://calendar.google.com/calendar/embed?src=greatescapegames.com_45ad9ar49edub65ctttnv4eqng%40group.calendar.google.com&ctz=America%2FLos_Angeles",
        "https://calendar.google.com/calendar/embed?src=c_90db9e91b26301709de66ddec84ad3390bfe13c7572ea430e24335d4bcbc4491%40group.calendar.google.com&ctz=America%2FLos_Angeles"
        // Add more calendar URLs here
    ]);
    const [currentCalendarIndex, setCurrentCalendarIndex] = useState(0);

    const nextCalendar = () => {
        setCurrentCalendarIndex((prevIndex) => (prevIndex + 1) % calendars.length);
    };

    const prevCalendar = () => {
        setCurrentCalendarIndex((prevIndex) => (prevIndex - 1 + calendars.length) % calendars.length);
    };

    return (
        <div className="calendar-container" data-testid="events-page">
            <div className="carousel">
                <button onClick={prevCalendar}>Previous</button>
                <iframe
                    src={calendars[currentCalendarIndex]}
                    style={{ border: "0" }}
                    width="800"
                    height="600"
                    frameBorder="0"
                    scrolling="no"
                ></iframe>
                <button onClick={nextCalendar}>Next</button>
            </div>
        </div>
    );
}

export default Calendar;
