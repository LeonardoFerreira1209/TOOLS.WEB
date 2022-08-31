import { createContext } from "react";

const ContextNotify = createContext({ 
    notifications: [], 
    setNotifications: () => {}
});

export default ContextNotify;