import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useFirebase } from '../FirebaseContext'; // Adjust the import according to your project structure
import '../styles/MyReservations.css'; // Make sure you have this CSS file

function MyReservations() {
    const [reservations, setReservations] = useState([]);
    const { db } = useFirebase();

    useEffect(() => {
        const fetchReservations = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                const q = query(collection(db, `users/${user.uid}/reservations`));
                const querySnapshot = await getDocs(q);
                const reservationsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    reservationRequest: doc.data().reservationRequest ? new Date(doc.data().reservationRequest.seconds * 1000) : null // Convert timestamp to Date
                }));
                setReservations(reservationsData);
            }
        };

        fetchReservations();
    }, []);

    return (
        <div className="my-reservations">
            <h1>My Reservations</h1>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Room</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Paid</th>
                        <th>Reservation Made On</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation) => (
                        <tr key={reservation.id}>
                            <td>{reservation.selectedDate}</td>
                            <td>{reservation.selectedRoom}</td>
                            <td>{reservation.firstName} {reservation.lastName}</td>
                            <td>{reservation.email}</td>
                            <td>{reservation.phoneNumber}</td>
                            <td>{reservation.paid ? 'Yes' : 'No'}</td>
                            <td>{reservation.reservationRequest ? reservation.reservationRequest.toLocaleString() : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {reservations.length === 0 && <p>No reservations found.</p>}
        </div>
    );
}

export default MyReservations;
