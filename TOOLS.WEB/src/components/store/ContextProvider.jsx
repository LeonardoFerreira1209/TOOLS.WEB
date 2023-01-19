import React from "react";
import useStorage from "../../utils/storage/UseStorage";
import ContextUser from "./context/ContextUser";
import ContextNotify from "./context/ContextNotify";
import ContextHub from "./context/ContextHub";

function ContextProvider({ children })  {
    const [ user, setUser, setRemoveUser ] = useStorage('user');
    const [ hub, setHub ] = useStorage('hub');
    const [ notifications, setNotifications, setRemoveNotifications ] = useStorage('notifications');

    return(
        <ContextUser.Provider value={{ user, setUser, setRemoveUser }}>
            <ContextHub.Provider value={{ hub, setHub }}>
                <ContextNotify.Provider value={{ notifications, setNotifications, setRemoveNotifications }}>
                    { children }
                </ContextNotify.Provider>
            </ContextHub.Provider>
        </ContextUser.Provider>
    )
}

export default ContextProvider;