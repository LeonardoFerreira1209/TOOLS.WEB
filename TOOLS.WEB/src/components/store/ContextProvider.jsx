import React from "react";
import useStorage from "../../shared/utils/storage/UseStorage";
import NotifyContext from "./context/NotifyContext";

function ContextProvider({ children })  {
    const [ notifications, setNotifications, setResetNotifications ] = useStorage('notifications');

    return(
        <NotifyContext.Provider value={{ notifications, setNotifications, setResetNotifications }}>
            { children }
        </NotifyContext.Provider>
    )
}

export default ContextProvider;