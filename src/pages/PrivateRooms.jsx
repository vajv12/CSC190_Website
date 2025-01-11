import React, { useState, useEffect } from "react";
import { collection, addDoc, query, where, getDocs, updateDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { useFirebase } from '../FirebaseContext';
import "../styles/PrivateRooms.css";
import { getAuth, onAuthStateChanged } from 'firebase/auth';


function PrivateRooms() {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("rocklin");
    const [selectedRoom, setSelectedRoom] = useState("");
    const [selectedHours, setSelectedHours] = useState("");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const [stripeLink, setStripeLink] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const { db } = useFirebase();
    const [userUid, setUserUid] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserUid(user.uid);
                const userDocRef = doc(db, "users", user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    const fullName = userData.name;
                    if (fullName) {
                        const [first, ...last] = fullName.split(" ");
                        setFirstName(first || "");
                        setLastName(last.join(" ") || "");
                    }
                    setEmail(user.email || "");
                }
            } else {
                setUserUid(null);
            }
        });
        return () => unsubscribe();
    }, []);

    async function addReservationToFirestore(formData) {
        try {
            const docRef = await addDoc(collection(db, 'roomReservations'), formData);
            console.log("Reservation added with ID: ", docRef.id);
            return docRef;
        } catch (error) {
            console.error("Error adding reservation to Firestore: ", error);
            throw error;
        }
    }

    const addUserReservation = async (formData, userUid, clientReferenceId) => {
        try {
            console.log(`Attempting to add reservation for user ${userUid}`);
            const userReservationsRef = collection(db, `users/${userUid}/reservations`);
            formData.userUid = userUid;
            formData.clientReferenceId = clientReferenceId;
            const docRef = await addDoc(userReservationsRef, formData);
            console.log("User reservation added with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding user reservation to Firestore: ", error);
            throw error;
        }
    };

    const calculateTotalPrice = () => {
        const roomPrices = {
            Dragon: 15,
            Wolf: 15,
            Party: 25
        };
    
        const selectedRoomPrice = roomPrices[selectedRoom];
    
        if (selectedRoomPrice === undefined) {
            console.error("Invalid room selection");
            return;
        }
    
        if (selectedRoom === 'Dragon' || selectedRoom === 'Wolf') {
            setTotalPrice(selectedRoomPrice.toFixed(2));
        } else if (selectedRoom === 'Party') {
            const totalPrice = selectedHours === 1 ? selectedRoomPrice : selectedRoomPrice * selectedHours; 
            setTotalPrice(totalPrice.toFixed(2));
        }
    };
    

    useEffect(() => {
        calculateTotalPrice();
    },[selectedRoom, selectedHours]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentDate = new Date(); 
        const selectedDateTime = new Date(selectedDate); 

        if (selectedDateTime < currentDate) {
            alert("You cannot book for past dates.");
            return;
        }

        if (!selectedDate || !selectedLocation || !selectedRoom || !firstName || !lastName || !email || !phoneNumber) {
            alert("Please fill in all required fields.");
            return;
        }

        // Check if reservation already exists
        const reservationsCollection = collection(db, 'roomReservations');
        const q = query(reservationsCollection, where('selectedRoom', '==', selectedRoom), where('selectedDate', '==', selectedDate));
        const querySnapshot = await getDocs(q);

        // Check if there are existing reservations
        if (!querySnapshot.empty) {
            const existingReservations = querySnapshot.docs;
            const PaidReservation = existingReservations.some(doc => doc.data().paid === true);
            if (PaidReservation) {
                // An existing reservation for the selected date has been paid for, prevent booking
                alert("There is already a reservation paid for on the selected date.");
                return;
            }
        }

        const formData = {
            selectedDate,
            selectedRoom,
            selectedTimeSlot,
            hours: selectedHours, 
            firstName,
            lastName,
            email,
            phoneNumber,
            price: totalPrice,
            paid: false,
            reservationRequest: serverTimestamp(), // Add the current date
        };

        // Proceed with reservation
        try {
            const reservationDocRef = await addReservationToFirestore(formData);

            const clientReferenceId = reservationDocRef.id;

            await updateDoc(reservationDocRef, { userUid });

            await updateDoc(reservationDocRef, { clientReferenceId });

            await addUserReservation(formData, userUid, clientReferenceId);

            let stripeLink;
            if (selectedRoom === 'Party') {
                stripeLink = `https://buy.stripe.com/4gw9Ds2uk0Eu5ri28b?client_reference_id=${clientReferenceId}`;
                alert("During Stripe Payment: Please Select Correct Number Of Hours to Buy!");
            } else {
                //stripeLink = `https://buy.stripe.com/test_6oE18ae9QeHo9VecMM?client_reference_id=${clientReferenceId}`;
                stripeLink = `https://buy.stripe.com/eVa2b05Gw1Iy4ne28a?client_reference_id=${clientReferenceId}`;
            }
            setStripeLink(stripeLink);

            alert("Proceed to Payment to book reservation!");
        } catch (error) {
            console.error("Error creating reservation:", error);
            alert("An error occurred. Please try again.");
        }
    };
    const getTimeSlotOptions = () => {
        if (selectedDate) {
            const selectedDay = new Date(selectedDate).getDay(); 
            switch (selectedDay) {
                case 2: // Monday
                case 6: // Wednesday
                    return ["12pm-8pm"];
                case 1: // Monday
                case 3: // Tuesday
                case 5: // Thursday
                    return ["12pm-5pm", "5pm-10pm"];
                case 4: // Friday
                    return ["12pm-5:30pm", "5:30pm-11pm"];
                case 0: //Sunday
                    return ["12pm-6pm"];
                default:
                    return [];
            }
        }
        return [];
    };

    return (
        <div className="booking-form">
            <h2>Our Online Room Reservation is down for maintenance</h2>
            <h2>Private Room Reservations</h2>
            <p><strong>Room Information & Rates:</strong></p>
            <p><strong>Dragon & Wolf Rooms: $20 for half day or full day depending on day</strong></p>
            <p>* Full day Room Rentals (12-8 pm): Available Monday, Wednesday</p>
            <p>* Full day Room Rental (12-6 pm): Available Sunday</p>
            <p>* Half day Room Rentals (Choice of 12pm-5pm or 5pm-10pm): Available Tuesday, Thursday, Saturday</p>
            <p>* Half day Room Rentals (Choice of 12pm-5:30pm or 5:30pm-11pm): Available Friday</p>
            <p><strong>Party Room: $25 Per Hour any day of the week</strong></p>
            <p>* Suited for larger parties</p>


            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="email">Email Address:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="tel" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <select id="location" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} required>
                        <option value="sacramento">Sacramento</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="room">Room:</label>
                    <select id="room" value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} required>
                        <option value="">Select a room</option>
                        <option value="Dragon">Dragon</option>
                        <option value="Wolf">Wolf</option>
                        <option value="Party">Party</option>
                    </select>
                    </div>
                    {(selectedRoom === 'Dragon' || selectedRoom === 'Wolf') && (
                    <div>
                        <label htmlFor="timeSlot">Time Slot:</label>
                        <select id="timeSlot" value={selectedTimeSlot} onChange={(e) => setSelectedTimeSlot(e.target.value)} required>
                            <option value="">Select a time slot</option>
                            {getTimeSlotOptions().map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                )}
                {selectedRoom === 'Party' && (
                    <div>
                        <label htmlFor="hours">Hours:</label>
                        <select id="hours" value={selectedHours} onChange={(e) => setSelectedHours(parseInt(e.target.value))} required>
                            <option value="">Select Number of Hours</option>
                            <option value="1">1 hour</option>
                            <option value="2">2 hours</option>
                            <option value="3">3 hours</option>
                            <option value="4">4 hours</option>
                            <option value="5">5 hours</option>
                            <option value="6">6 hours</option>
                            <option value="7">7 hours</option>
                            <option value="8">8 hours</option>
                            <option value="9">9 hours</option>
                            <option value="10">10 hours</option>
                        </select>
                    </div>
                )}
                <p>* Please note that room reservations are valid during business hours of the day that is booked.</p>
                {/* Comment this back in once maintenance is done <button type="submit">Reserve Now</button> */}
                
            </form>

            {stripeLink && (
                <div className="payment-information">
                    <h2>Pricing & Payment</h2>
                    <p>Total Price: ${totalPrice}</p>
                    <p>* Proceed to payment to complete room reservation. </p>
                    <p>* If Party Room Is Selected, During Stripe Payment: Please Select Correct Number Of Hours to Buy!</p>
                    <button onClick={() => window.location.href = stripeLink}>Proceed to Payment</button>
                </div>
            )}
        </div>
    );
}

export default PrivateRooms;
