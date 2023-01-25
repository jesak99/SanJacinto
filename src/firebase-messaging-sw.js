importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");

firebase.initializeApp({
    projectId: 'san-jacinto-amilpas-web',
    appId: '1:309881000808:web:7fcbff524f3e241c4a7cdd',
    databaseURL: 'https://san-jacinto-amilpas-default-rtdb.firebaseio.com',
    storageBucket: 'san-jacinto-amilpas-web.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyDfSmJk_n3D8vAZGk_afw3QN1hR4dcINX8',
    authDomain: 'san-jacinto-amilpas-web.firebaseapp.com',
    messagingSenderId: '309881000808',
    measurementId: 'G-QW20DH6HE4',
    vapidKey: "BF0xGjrrCmUuPimbl7TBJEDOBmKadBpBuh4LczkydsbBKj4ODya-Y1XjVVB-HdL6AJiUiNvwuVjjogg7fzE15MU"
});
const messaging = firebase.messaging();