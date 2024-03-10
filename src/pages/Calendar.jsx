import React from "react";
import "../styles/Calendar.css";

function Calendar() {
    return (
        <div className="calendar-container">
           <iframe src="https://calendar.google.com/calendar/embed?src=783309e13c4b5b7ec0f8c4cc824b1b274e0160b7e09a1eb39b929ef237431e76%40group.calendar.google.com&ctz=America%2FLos_Angeles" style={{ border: "0" }} 
           width="800" 
           height="600" 
           frameborder="0" 
           scrolling="no">
           </iframe>
        </div>
    );
}

export default Calendar;


