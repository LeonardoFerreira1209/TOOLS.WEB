import { createContext, useContext } from "react";
import useStorage from "../../../shared/utils/storage/UseStorage";

const UserContext = createContext({
    user: null,
    setUser: () => {},
    setRemoveUser: () => {}
});

export default function UserProvider({children}) {
    const [ user, setUser, setRemoveUser ] = useStorage('user');

    return <UserContext.Provider value={{ user, setUser, setRemoveUser }}>{children}</UserContext.Provider>;
}

export const useUserProvider = () => useContext(UserContext);