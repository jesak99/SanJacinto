importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");

firebase.initializeApp({
    projectId: 'san-jacinto-amilpas',
    appId: '1:147714289791:web:5dadc25146c8151c464f4a',
    databaseURL: 'https://san-jacinto-amilpas-default-rtdb.firebaseio.com',
    storageBucket: 'san-jacinto-amilpas.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyAcKSdWOLINLU9eSs3AuUEAPUYCs-ZGbqM',
    authDomain: 'san-jacinto-amilpas.firebaseapp.com',
    messagingSenderId: '147714289791',
    measurementId: 'G-HRG2X7P41D',
});
const messaging = firebase.messaging();