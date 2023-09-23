import { createContext, useContext } from "react";
import useStorage from "../../../shared/utils/storage/UseStorage";

const NotifyContext = createContext({ 
    notifications: [], 
    setNotifications: () => {},
    setResetNotifications: () => {}
});

export default function NotifyProvider({children}) {
    const [ notifications, setNotifications, setResetNotifications ] = useStorage('notifications');

    return <NotifyContext.Provider value={{ notifications, setNotifications, setResetNotifications }}>{children}</NotifyContext.Provider>;
}

export const useNotifyProvider = () => useContext(NotifyContext);