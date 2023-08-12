import React from "react";
import useStorage from "../../shared/utils/storage/UseStorage";
import ContextUser from "./context/ContextUser";
import ContextNotify from "./context/ContextNotify";

function ContextProvider({ children })  {
    const [ user, setUser, setRemoveUser ] = useStorage('user');
    const [ notifications, setNotifications, setResetNotifications ] = useStorage('notifications');

    return(
        <ContextUser.Provider value={{ user, setUser, setRemoveUser }}>
            <ContextNotify.Provider value={{ notifications, setNotifications, setResetNotifications }}>
                { children }
            </ContextNotify.Provider>
        </ContextUser.Provider>
    )
}

export default ContextProvider;