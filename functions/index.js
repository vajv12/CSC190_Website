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
