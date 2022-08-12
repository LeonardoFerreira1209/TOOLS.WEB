import React, { useState } from "react";
import useStorage from "../../utils/storage/UseStorage";
import ContextUser from "./context/ContextUser";
import ContextNotify from "./context/ContextNotify";

function ContextUserProvider({ children })  {
    const [user, setUser] = useStorage('user');
    const [notifications, setNotifications] = useStorage('notifications');

    return(
        <ContextUser.Provider value={{ user, setUser }}>
            <ContextNotify.Provider value={{ notifications, setNotifications }}>
                { children }
            </ContextNotify.Provider>
        </ContextUser.Provider>
    )
}

export default ContextUserProvider;