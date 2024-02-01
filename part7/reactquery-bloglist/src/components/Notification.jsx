import { useContext } from "react";
import NotificationContext from "../reducers/NotificationContext";
const Notification = () => {
  const [{ message, color },] = useContext(NotificationContext);

  const notificationStyle = {
    color,
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    margiBottom: 10,
  };

  if (message === null) {
    return null;
  }

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
