import { createContext } from "react";

const ContextNotify = createContext({ 
    notifications: [], 
    setNotifications: () => {},
    setRemove: () => {}
});

export default ContextNotify;