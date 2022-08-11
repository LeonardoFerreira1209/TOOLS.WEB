import React from "react";
import useStorage from "../../utils/storage/UseStorage";
import Context from "./Context";

const StoreProvider = ({ children }) => {
    debugger
    const [token, setToken] = useStorage('token');
    const [tokenData, setTokenData] = useStorage('tokenData');
    const [notifications, setNotifications] = useStorage('notifications');

    return(
        <Context.Provider value={{ token, setToken, tokenData, setTokenData, notifications, setNotifications }}>
            { children }
        </Context.Provider>
    )
}

export default StoreProvider;