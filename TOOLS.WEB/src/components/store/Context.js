import { createContext } from "react";

const Context = createContext({
    token: null,
    setToken: () => {},
    tokenData: null,
    setTokenData: () => {},
    notifications: [{ }],
    setNotifications: () => {}
});

export default Context;