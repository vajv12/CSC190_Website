const nodemailer = require('nodemailer');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')('sk_test_51OfAn1IHfTroUmcjRLjz2Fb41rjIwTbClLbtOpy0LKuJ6cbA0MU9YUuScSrj7IIvKaE8UTCRds1LfUXi4kn8Iwae002FPh92H2');

admin.initializeApp();

exports.handleStripeWebhook = functions.https.onRequest(async (req, res) => {
    const event = req.body;

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        console.log(session.client_reference_id);
        const clientReferenceId = session.client_reference_id;
        
        try {
            console.log('Client Reference ID:', clientReferenceId);

            const docRef = admin.firestore().collection('roomReservations').doc(clientReferenceId);
            const doc = await docRef.get();

            if (doc.exists) {
                console.log('Document data:', doc.data());
                await docRef.update({ paid: true });

                await sendEmailReceipt(doc.data());

                res.status(200).send('Webhook Received');
            } else {
                res.status(404).send('Document Not Found');
            }
        } catch (error) {
            console.error('Error handling webhook:', error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(200).send('Webhook Received');
    }
});

const sendEmailReceipt = async (data) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'examplegreatescape@gmail.com', 
            pass: 'zmzf mwov dpxa kqgd' 
        }
    });

    const mailOptions = {
        from: 'examplegreatescape@gmail.com',
        to: data.email,
        subject: 'Reservation Confirmation',
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reservation Receipt</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header img {
                    display: block;
                    margin: 0 auto;
                    max-width: 100%;
                    height: auto;
                    max-height: 100px; /* Adjust the maximum height as needed */
                }
                h1 {
                    color: #333;
                    text-align: center;
                }
                p {
                    color: #666;
                    margin-bottom: 15px;
                    line-height: 1.5;
                }
                .reservation-details {
                    margin-top: 20px;
                    border-top: 2px solid #ccc;
                    padding-top: 20px;
                }
                .footer {
                    margin-top: 20px;
                    text-align: center;
                    color: #999;
                    font-size: 12px;
                }
            </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="https://csc190-w.web.app/static/media/GEG-logo.f666891fecaab69ecb4f.png" alt="Company Logo">
                    </div>
                    <h1>Reservation Receipt</h1>
                    <p>Thank you for reserving a room with us!</p>
                    <div class="reservation-details">
                    <p><strong>First Name:</strong> ${data.firstName}</p>
                    <p><strong>Last Name:</strong> ${data.lastName}</p>
                    <p><strong>Date:</strong> ${data.selectedDate}</p>
                    <p><strong>Room:</strong> ${data.selectedRoom}</p>
                    <p><strong>Total Price:</strong> $15</p>
                </div>
                    <p>We look forward to seeing you!</p>
                    <p class="footer">This email was sent from <strong>Great Escape Games</strong>. Please do not reply to this email.</p>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Receipt email sent successfully');
    } catch (error) {
        console.error('Error sending receipt email:', error);
    }
};

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const axios = require("axios");

// Initialize Firebase Admin SDK
admin.initializeApp();

// Initialize Firestore
const firestore = admin.firestore();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle email subscription
app.post('/email-newsletterRequest', async (req, res) => {
    const { email } = req.body;

    try {
        // Check if email is valid
        if (!isValidEmail(email)) {
            return res.status(400).send('Invalid email');
        }

        // Check if email already exists
        const existingSubscription = await firestore.collection('newsletterRequest').doc(email).get();
        if (existingSubscription.exists) {
            return res.status(400).send('Email already subscribed');
        }

        // Add email to Firestore
        await firestore.collection('newsletterRequest').doc(email).set({ subscribedAt: new Date() });

        // Send confirmation email using Mailjet API
        await sendConfirmationEmail(email);

        // Return success response
        return res.status(200).send('Subscription successful');
    } catch (error) {
        console.error('Error subscribing email:', error);
        return res.status(500).send('Internal Server Error');
    }
});

// Firestore trigger to send email when a new document is added to newsletterRequests collection
exports.sendEmailOnNewsletterRequest = functions.firestore.document('newsletterRequests/{requestId}')
    .onCreate(async (snapshot, context) => {
        const requestData = snapshot.data();
        const email = requestData.email;

        try {
            // Send email using Mailjet API
            await sendConfirmationEmail(email);

            console.log('Confirmation email sent to:', email);
        } catch (error) {
            console.error('Error sending confirmation email:', error);
        }
    });

// Function to validate email format
function isValidEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to send confirmation email using Mailjet API
async function sendConfirmationEmail(email) {
    try {
        const response = await axios.post('https://api.mailjet.com/v3.1/send', {
            Messages: [{
                From: {
                    Email: 'sharinguyening@gmail.com', // Replace with your Mailjet sender email
                    Name: 'Your Name'
                },
                To: [{
                    Email: email
                }],
                Subject: 'Welcome to our newsletter!',
                TextPart: 'Thank you for subscribing to our newsletter.',
                HTMLPart: '<p>Thank you for subscribing to our newsletter.</p>'
            }]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(
                    '796f1880e9ff286cc1189a47ca778994','2e7b70a7d0661a302a2bb0c0fd97037').toString('base64')}`
            }
        });

        console.log('Mailjet API response:', response.data);
    } catch (error) {
        console.error('Error sending confirmation email:', error.response ? error.response.data : error.message);
    }
}

// Export the Express app as a Cloud Function
exports.handleNewsletterRequest = functions.https.onRequest(app);

const nodemailer = require('nodemailer');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')('sk_test_51OfAn1IHfTroUmcjRLjz2Fb41rjIwTbClLbtOpy0LKuJ6cbA0MU9YUuScSrj7IIvKaE8UTCRds1LfUXi4kn8Iwae002FPh92H2');

admin.initializeApp();

exports.deleteUnpaidReservations = functions.pubsub.schedule('every 60 minutes').onRun(async (context) => {
    const now = admin.firestore.Timestamp.now();
    const twoDaysAgo = new admin.firestore.Timestamp(now.seconds - 2 * 24 * 60 * 60, 0); // Adjust the timestamp for two days ago

    const unpaidReservationsRef = admin.firestore().collection('roomReservations')
        .where('paid', '==', false)
        .where('reservationRequest', '<', twoDaysAgo);

    const unpaidReservationsSnapshot = await unpaidReservationsRef.get();

    if (unpaidReservationsSnapshot.empty) {
        console.log('No unpaid reservations to delete.');
        return null;
    }

    const batch = admin.firestore().batch();

    unpaidReservationsSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
    });

    await batch.commit();

    console.log(`Deleted ${unpaidReservationsSnapshot.size} unpaid reservations.`);
    return null;
});

