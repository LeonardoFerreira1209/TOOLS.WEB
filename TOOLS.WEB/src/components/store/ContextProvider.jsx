import React from "react";
import useStorage from "../../utils/storage/UseStorage";
import ContextUser from "./context/ContextUser";
import ContextNotify from "./context/ContextNotify";
import ContextHub from "./context/ContextHub";

function ContextProvider({ children })  {
    const [ user, setUser ] = useStorage('user');
    const [ hub, setHub ] = useStorage('hub');
    const [ notifications, setNotifications, setRemove ] = useStorage('notifications');

    return(
        <ContextUser.Provider value={{ user, setUser }}>
            <ContextHub.Provider value={{ hub, setHub }}>
                <ContextNotify.Provider value={{ notifications, setNotifications, setRemove }}>
                    { children }
                </ContextNotify.Provider>
            </ContextHub.Provider>
        </ContextUser.Provider>
    )
}

export default ContextProvider;