import React from 'react';

const Modal = ({ isOpen, message, onClose }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', // Fixed position to cover the whole screen
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.75)', // Semi-transparent backdrop
            zIndex: 1000 // High z-index to ensure it's on top of other elements
        }}>
            <div style={{
                padding: '20px',
                background: 'white',
                borderRadius: '5px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                zIndex: 1001 // Ensuring content is above the backdrop
            }}>
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
