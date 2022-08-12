import { createContext } from "react";

const ContextNotify = createContext({ 
    notifications: null, 
    setNotifications: () => {}
});

export default ContextNotify;