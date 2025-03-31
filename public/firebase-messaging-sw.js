importScripts(
  "https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyC9q3625-DFPqHRJEGv2C-oit1RWzLuGOw",
  authDomain: "my-first-pro-8fe9f.firebaseapp.com",
  projectId: "my-first-pro-8fe9f",
  storageBucket: "my-first-pro-8fe9f.appspot.com",
  messagingSenderId: "930089270355",
  appId: "1:930089270355:web:b3f12e279c58c3f8dd1aa6",
  measurementId: "G-J4F07VXLLP",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background Notification:", payload);

  const notificationTitle = payload.notification?.title || "New Message";
  const notificationOptions = {
    body: payload.notification?.body || "You have a new notification",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/notifications"));
});
