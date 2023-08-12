import { createContext } from "react";

const ContextNotify = createContext({ 
    notifications: [], 
    setNotifications: () => {},
    setResetNotifications: () => {}
});

export default ContextNotify;