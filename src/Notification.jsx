import { useEffect } from "react";
import { requestNotificationPermission } from "./firebase";
import NotificationHandler from "./NotificationHandler";

const NotificationComponent = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      requestNotificationPermission();
    }
  }, []);

  return (
    <div>
      Push Notifications Enabled
      <NotificationHandler />
    </div>
  );
};

export default NotificationComponent;
