import React, { useState, useEffect } from "react";
import { collection, addDoc, query, where, getDocs, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useFirebase } from '../FirebaseContext';
import "../styles/PrivateRooms.css";
import { getAuth, onAuthStateChanged } from 'firebase/auth';


function PrivateRooms() {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("rocklin");
    const [selectedRoom, setSelectedRoom] = useState("");
    const [totalPrice] = useState(15); // Base price $15 per hour
    const [showPaymentSection, setShowPaymentSection] = useState(false);
    const [stripeLink, setStripeLink] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const { db } = useFirebase();
    // Assuming you have the user's UID from the auth state listener
    const [userUid, setUserUid] = useState(null);


// You might fetch the user's UID like this, depending on your app structure
useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserUid(user.uid); // Store the user's UID in state
            console.log("User UID:", user.uid); // Add for debugging
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
    const addUserReservation = async (formData, userId) => {
        try {
            console.log(`Attempting to add reservation for user ${userId}`); // Debugging
            const userReservationsRef = collection(db, `users/${userId}/reservations`);
            const docRef = await addDoc(userReservationsRef, formData);
            console.log("User reservation added with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding user reservation to Firestore: ", error);
            throw error;
        }
    };


    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentDate = new Date(); // Get the current date
        const selectedDateTime = new Date(selectedDate); // Convert selected date to a Date object

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
            firstName,
            lastName,
            email,
            phoneNumber,
            paid: false,
            reservationRequest: serverTimestamp(), // Add the current date
        };

        // Proceed with reservation
        try {
            setShowPaymentSection(true); // Show payment section after successful reservation
            const reservationDocRef = await addReservationToFirestore(formData);

            // Generate a unique client reference ID using the reservation document ID
            const clientReferenceId = reservationDocRef.id;

            await updateDoc(reservationDocRef, { clientReferenceId });

            // Add the reservation to the user's Firestore collection using the user's UID
            await addUserReservation(formData, userUid);


            // Set the Stripe link with the client reference ID
            const stripeLink = `https://buy.stripe.com/test_6oE18ae9QeHo9VecMM?client_reference_id=${clientReferenceId}`;
            setStripeLink(stripeLink);

            alert("Proceed to Payment to book reservation!");
        } catch (error) {
            console.error("Error creating reservation:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="booking-form">
            <h2>Private Room Reservations</h2>
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
                    </select>
                </div>
                <p>* Please note that room reservations are valid during business hours of the day that is booked.</p>
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