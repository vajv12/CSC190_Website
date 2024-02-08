import '../styles/Payment.css';
import trophy from '../assets/trophy.jpg';
import React from 'react';

function Payment() {
    function redirectToStripeCheckout(event) {
        event.preventDefault();

        window.location.href = 'https://checkout.stripe.com/c/pay/cs_live_a19W3kySdi1aFeOT6rlKVWMTR1YhaLAw2EiUQQb9UoBJExTXu9mMEoQYoN#fidkdWxOYHwnPyd1blppbHNgWjA0SmNEazRMTWNRd2pQaGZvSV9WbW1rUG1tf1NNblFgbjxmRERIVUA3XD1QPH1TU3M3QV81bWcwN1dkdjVSVlwwaWRnPEhqYWtoSUIxME9hVU0yQGAyb1w2NTVtMkBvZF9wSScpJ3VpbGtuQH11anZgYUxhJz8nM2pAZ0hAYzI9Mn1vZlZcPEREJ3gl';
    }

    return (
        <div className='Payment'>
            <h1>Payment for Tournament</h1>
            <div className="content-wrapper">
                <div className="trophy-section">
                    <img src={trophy} alt="Trophy" />
                    <span className="trophy-text">Buy tickets to attend tournaments here! Check out the events calendar for more details on upcoming tournaments!</span>
                </div>
                <div className="button-section">
                    <form id="checkout-form" onSubmit={redirectToStripeCheckout}>
                        <button type="submit" id="checkout-button" className="btn btn-primary">
                            Purchase Tournament Spot
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Payment;
