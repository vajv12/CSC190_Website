import React, { useState, useEffect } from "react";
import "../styles/PrivateRooms.css";

function PrivateRooms() {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("rocklin");
    const [selectedRoom, setSelectedRoom] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [numberOfHours, setNumberOfHours] = useState(1);
    const [totalPrice, setTotalPrice] = useState(10); 
    const [showPaymentSection, setShowPaymentSection] = useState(false);
    const [stripeLink, setStripeLink] = useState("");
    const [successfulReservations, setSuccessfulReservations] = useState([]);

    // Define opening and closing times for each day and location
    const openingClosingTimes = {
        rocklin: {
            0: { opening: 12, closing: 19 }, // Sun
            1: { opening: 12, closing: 19 }, // Mon
            2: { opening: 12, closing: 21 }, // Tue
            3: { opening: 12, closing: 19 }, // Wed
            4: { opening: 12, closing: 23 }, // Thu
            5: { opening: 12, closing: 22 }, // Fri
            6: { opening: 12, closing: 18 }  // Sat
        },
        sacramento: {
            0: { opening: 12, closing: 18 }, // Sun
            1: { opening: 12, closing: 20 }, // Mon
            2: { opening: 12, closing: 22 }, // Tue
            3: { opening: 12, closing: 20 }, // Wed
            4: { opening: 12, closing: 23 }, // Thu
            5: { opening: 12, closing: 23 }, // Fri
            6: { opening: 12, closing: 22 }  // Sat
        }
    };

    const rooms = {
        rocklin: ["Room 1", "Room 2", "Room 3"],
        sacramento: ["Room A", "Room B", "Room C"]
    };

    useEffect(() => {
        const calculatePrice = () => {
            const basePricePerHour = 10; // $10 per hour
            const totalPrice = numberOfHours * basePricePerHour;
            setTotalPrice(totalPrice);
        };

        calculatePrice();
    }, [numberOfHours]);

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if the reservation already exists in successfulReservations
        const reservationExists = successfulReservations.some(reservation => 
            reservation.date === selectedDate &&
            reservation.location === selectedLocation &&
            reservation.room === selectedRoom &&
            reservation.time === selectedTime &&
            reservation.hours === numberOfHours
        );

        if (reservationExists) {
            alert("This reservation has already been made.");
        } else {
            setShowPaymentSection(true);
            // Construct Stripe link based on user selections
            const location = selectedLocation === 'rocklin' ? 'rocklin' : 'sacramento';
            const hours = numberOfHours <= 3 ? numberOfHours : 3; // Limit hours to 3
            const hourString = hours === 1 ? '' : `-${hours}hr`;
            const stripeLink = `https://buy.stripe.com/${location === 'rocklin' ? 'test_6oE18ae9QeHo9VecMM' : 'cN26sk8IKcRDf167su'}${hourString}`; 
            setStripeLink(stripeLink);
        }
    };

    const renderTimeOptions = () => {
        const timeOptions = [];
        const selectedDay = new Date(selectedDate).getDay();
        const openingClosingTimesForLocation = openingClosingTimes[selectedLocation];
        
        if (openingClosingTimesForLocation && openingClosingTimesForLocation[selectedDay]) {
            const { opening, closing } = openingClosingTimesForLocation[selectedDay];

            for (let hour = opening; hour <= closing; hour++) {
                const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
                const meridiem = hour < 12 ? "AM" : "PM";
                timeOptions.push(
                    <option key={`${hour}:00`} value={`${formattedHour}:00 ${meridiem}`}>{`${formattedHour}:00 ${meridiem}`}</option>
                );
            }
        }

        return timeOptions;
    };


    const handlePaymentCompletion = () => {
    // Add the current reservation to successfulReservations
    const newReservation = {
        date: selectedDate,
        location: selectedLocation,
        room: selectedRoom,
        time: selectedTime,
        hours: numberOfHours
    };
    setSuccessfulReservations([...successfulReservations, newReservation]);

    // Display the confirmation message
    alert('Payment completed! Your reservation has been confirmed.');
    };

    return (
        <div className="booking-form">
            <h2>Private Room Reservations</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <select id="location" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} required>
                        <option value="rocklin">Rocklin</option>
                        <option value="sacramento">Sacramento</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="room">Room:</label>
                    <select id="room" value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} required>
                        <option value="">Select a room</option>
                        {rooms[selectedLocation] && rooms[selectedLocation].map((room, index) => (
                            <option key={index} value={room}>{room}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="time">Time:</label>
                    <select id="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} required>
                        {renderTimeOptions()}
                    </select>
                </div>
                <div>
                    <label htmlFor="hours">Number of Hours:</label>
                    <input type="number" id="hours" value={numberOfHours} onChange={(e) => setNumberOfHours(parseInt(e.target.value))} min="1" max="3" required />
                </div>
                <button type="submit">Reserve Now</button>
            </form>

            {showPaymentSection && (
                <>
                    <div className="pricing-information">
                        <h2>Pricing Information</h2>
                        <p>Total Price: ${totalPrice}</p>
                    </div>

                    <div className="payment-section">
                        <h2>Payment Section</h2>
                        <button onClick={() => window.location.href = stripeLink}>Proceed to Payment</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default PrivateRooms;