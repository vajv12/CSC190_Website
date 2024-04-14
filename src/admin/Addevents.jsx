import React, { useState, useEffect } from "react";
import { collection, addDoc, deleteDoc, getDocs, doc } from "firebase/firestore";
import { useFirebase } from "../FirebaseContext";
import { Link } from "react-router-dom";
import { AdminSideData } from "../helpers/AdminSideData";
import "../styles/AddEvents.css";

const AddEventForm = () => {
  const { db } = useFirebase();
  const [event, setEvent] = useState({
    title: "",
    date: "",
    description: "",
    location: "Sacramento", // Default location
    image: "", // Single image URL
  });
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from Firebase when component mounts
    const fetchData = async () => {
      const eventsCollection = collection(db, "events");
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsData = eventsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
    };

    fetchData();
  }, [db]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const eventData = {
        ...event,
        // Adding category based on the selected location
        category: event.location === "Sacramento" ? "Sacramento" : "Rocklin",
      };
      await addDoc(collection(db, "events"), eventData);
      alert("Event added successfully!");
      setEvent({
        title: "",
        date: "",
        description: "",
        location: "Sacramento", // Reset location to default
        image: "",
      });
    } catch (error) {
      console.error("Error adding event: ", error);
      alert("Error adding event, please try again.");
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await deleteDoc(doc(db, "events", eventId));
      alert("Event deleted successfully!");
      // Remove the deleted event from the state
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("Error deleting event: ", error);
      alert("Error deleting event, please try again.");
    }
  };

  return (
    <>
      <div className="adminContainer">
        <div className="adminSide">
          <ul className="SidebarLeft">
            <p>Select an option to edit:</p>
            {AdminSideData.map((val, key) => (
              <li
                key={key}
                className={`row ${
                  val.title === "logout" ? "logout" : ""
                }`}
              >
                <Link to={val.link}>
                  <div id="icon">{val.icon}</div>
                  <div id="title">{val.title}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="addEventForm">
          <h2>Adding Events to the Website</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="eventTitle">Event Title</label>
              <input
                id="eventTitle"
                name="title"
                value={event.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventDate">Date</label>
              <input
                id="eventDate"
                name="date"
                type="date"
                value={event.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventDescription">Event Description</label>
              <textarea
                id="eventDescription"
                name="description"
                value={event.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventLocation">Location</label>
              <select
                id="eventLocation"
                name="location"
                value={event.location}
                onChange={handleChange}
                required
              >
                <option value="Sacramento">Sacramento</option>
                <option value="Rocklin">Rocklin</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="eventImage">Event Image URL (Optional)</label>
              <input
                id="eventImage"
                name="image"
                type="url"
                value={event.image}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Add Event</button>
          </form>

          <div className="eventList">
            <h2>Event List</h2>
            <ul>
              {events.map((event) => (
                <li key={event.id}>
                  <span>{event.title}</span>
                  <button onClick={() => handleDelete(event.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEventForm;