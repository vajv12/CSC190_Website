import React from 'react';
import './Event.css'

function Event() {
    return (
      <div className='featureEvents'>
            <h1>News and Running Event</h1>
          <div className='eventcal'>
           <img src="/image/testimage3.jpg" alt="Elogo"/>
          </div>
          <div className='SName'>
            <h1>Event Calendar</h1>
          </div>
          <div className='Calendar'>
          <iframe title="calendarframe"src="https://calendar.google.com/calendar/embed?height=1000&wkst=1&bgcolor=%23ffffff&ctz=America%2FLos_Angeles&showTitle=1&showNav=0&showCalendars=1&mode=MONTH&title=Great%20Escape%20Games&showTz=0&showTabs=0&showPrint=0&showDate=1"  width="1000" height="1000" frameborder="0"></iframe>
          </div>
      </div>
      
     
    )
  }
  
  export default Event