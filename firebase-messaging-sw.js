importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// بيانات مشروعك (Residual-App)
const firebaseConfig = {
  apiKey: "AIzaSyDiYRYIg3r7lDZF7ZU7vHQhaPK1znD553o",
  authDomain: "residual-app-d9a45.firebaseapp.com",
  projectId: "residual-app-d9a45",
  storageBucket: "residual-app-d9a45.firebasestorage.app",
  messagingSenderId: "765230796527",
  appId: "1:765230796527:web:6f971e02657feb1962951a"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// استقبال الرسالة في الخلفية
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://i.ibb.co/fzPfcMp0/small-logo.png',
    badge: 'https://i.ibb.co/fzPfcMp0/small-logo.png',
    vibrate: [200, 100, 200]
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
