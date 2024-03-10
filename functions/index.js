const functions = require("firebase-functions");
const app = require('express')();

app.post('/create-checkout-session', async (req,res) => {
    // Redirect the user to the provided link
    res.redirect(303, 'https://checkout.stripe.com/c/pay/cs_live_a19W3kySdi1aFeOT6rlKVWMTR1YhaLAw2EiUQQb9UoBJExTXu9mMEoQYoN#fidkdWxOYHwnPyd1blppbHNgWjA0SmNEazRMTWNRd2pQaGZvSV9WbW1rUG1tf1NNblFgbjxmRERIVUA3XD1QPH1TU3M3QV81bWcwN1dkdjVSVlwwaWRnPEhqYWtoSUIxME9hVU0yQGAyb1w2NTVtMkBvZF9wSScpJ3VpbGtuQH11anZgYUxhJz8nM2pAZ0hAYzI9Mn1vZlZcPEREJ3gl');
});

exports.app = functions.https.onRequest(app);
