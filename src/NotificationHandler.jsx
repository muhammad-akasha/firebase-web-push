import React, { useEffect } from "react";
import { useSnackbar } from "notistack";
import { messaging } from "./firebase";
import { onMessage } from "firebase/messaging";
import { useRouter } from "next/navigation";

const NotificationHandler = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar(); // Get closeSnackbar
  const router = useRouter(); // Initialize navigation

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Foreground message received: ", payload);

      const notificationTitle = payload.data?.title || "New Notification";
      const notificationBody = payload.data?.body || "You have a new message.";

      // Extract the URL or path from the notification payload (if available)
      const notificationPath = payload.data?.redirect || "/notification"; // Adjust accordingly

      // Show a Snackbar Alert using notistack with an Action button
      enqueueSnackbar(`${notificationTitle}: ${notificationBody}`, {
        variant: "info", // Options: success, error, warning, info
        autoHideDuration: 5000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        action: (key) => (
          <button
            size="small"
            color="secondary"
            onClick={() => {
              router.push(notificationPath); // Redirect on click
              closeSnackbar(key); // Close Snackbar correctly
            }}
          >
            View
          </button>
        ),
      });
    });

    return () => unsubscribe();
  }, [enqueueSnackbar, closeSnackbar, router]);

  return null; // This component does not render anything
};

export default NotificationHandler;
