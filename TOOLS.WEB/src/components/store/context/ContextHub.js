import { createContext } from "react";

const ContextHub = createContext({ 
    hub: null, 
    setHub: () => {},
});

export default ContextHub;