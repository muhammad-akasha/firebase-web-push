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

  const notificationTitle = payload.data?.title || "New Message";
  const notificationOptions = {
    body: payload.data?.body || "You have a new notification",
    icon: payload.data?.icon || "/default-icon.png",
    data: {
      redirect: payload.data?.redirect || "/notifications",
      chatId: payload.data?.chatId, // Include chatId if sent in payload
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  console.log("Notification Click Event:", event);

  const chatId = event?.notification?.data?.chatId;
  const webUrl = "http://localhost:3000"; // Base URL of your website
  const redirectUrl = event.notification.data?.redirect || "/notifications";

  // Construct the full redirect URL, incorporating chatId if present
  let fullRedirectUrl = redirectUrl.startsWith("http")
    ? redirectUrl
    : `${webUrl}${redirectUrl}`;
  if (chatId) {
    fullRedirectUrl = `${webUrl}/chat/${chatId}`; // Adjust this based on your app’s routing
  }

  console.log("Notification Clicked! Redirect URL:", fullRedirectUrl);

  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      console.log("Matching Clients:", windowClients);

      // Look for an existing tab within your site’s domain
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url.includes(webUrl) && "navigate" in windowClient) {
          console.log("Navigating existing tab to:", fullRedirectUrl);
          return windowClient.focus();
        }
      }

      // If no suitable tab is found, open a new one
      console.log(
        "No matching tab found. Opening new window at:",
        fullRedirectUrl
      );
      return clients.openWindow(fullRedirectUrl);
    })
    .catch((error) => {
      console.error("Error in notificationclick handler:", error);
      // Fallback to opening a new window if something fails
      return clients.openWindow(fullRedirectUrl);
    });

  event.waitUntil(promiseChain);
});
