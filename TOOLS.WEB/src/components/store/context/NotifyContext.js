import { createContext } from "react";

const NotifyContext = createContext({ 
    notifications: [], 
    setNotifications: () => {},
    setResetNotifications: () => {}
});

export default NotifyContext;