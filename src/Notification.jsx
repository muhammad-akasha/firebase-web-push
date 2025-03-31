import { useEffect } from "react";
import { requestNotificationPermission } from "./firebase";

const NotificationComponent = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      requestNotificationPermission();
    }
  }, []);

  return <div>Push Notifications Enabled</div>;
};

export default NotificationComponent;
