import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC9q3625-DFPqHRJEGv2C-oit1RWzLuGOw",
  authDomain: "my-first-pro-8fe9f.firebaseapp.com",
  projectId: "my-first-pro-8fe9f",
  storageBucket: "my-first-pro-8fe9f.appspot.com",
  messagingSenderId: "930089270355",
  appId: "1:930089270355:web:b3f12e279c58c3f8dd1aa6",
  measurementId: "G-J4F07VXLLP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging =
  typeof window !== "undefined" ? getMessaging(app) : null;

// Request Notification Permission and Get Token
export const requestNotificationPermission = async () => {
  if (typeof window === "undefined" || !messaging) return;

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Notification permission denied.");
      return null;
    }

    // Generate token
    const token = await getToken(messaging, {
      vapidKey:
        "BAi_ZZpsXT_SMuMRplSwGQl4eXyQwyvBs5pGqQLv-nUdpZOwOoTECtpBaslA1eviunkAFKzaDCJKOQF81FtIKo8",
    });

    if (token) {
      console.log("FCM Token:", token);
      await sendTokenToServer(token); // Send token to backend
      return token;
    } else {
      console.warn("Failed to get token.");
      return null;
    }
  } catch (error) {
    console.error("Error getting notification permission:", error);
    return null;
  }
};

// Send Token to Backend
const sendTokenToServer = async (token) => {
  try {
    const response = await fetch("http://localhost:5000/save-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();
    console.log("Token saved:", data);
  } catch (error) {
    console.error("Error sending token to server:", error);
  }
};

// Listen for Foreground Notifications
export const onForegroundNotification = (callback) => {
  if (!messaging) return;
  onMessage(messaging, (payload) => {
    console.log("Foreground Notification:", payload);
    callback(payload);
  });
};
