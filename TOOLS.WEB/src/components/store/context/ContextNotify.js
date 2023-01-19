import { createContext } from "react";

const ContextNotify = createContext({ 
    notifications: [], 
    setNotifications: () => {},
    setRemoveNotifications: () => {}
});

export default ContextNotify;