// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
  databaseURL: 'https://csc190-w-default-rtdb.firebaseio.com/',
  projectId: 'csc190-w',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-messaging-sender-id',
  appId: 'your-app-id',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
