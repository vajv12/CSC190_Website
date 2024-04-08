
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
