import { createContext, useState } from "react";

export const WikiPageContext = createContext();

export const WikiPageContextProvider = (props) => {
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    return (
        <WikiPageContext.Provider value={{ showOffcanvas, setShowOffcanvas }}>
            {props.children}
        </WikiPageContext.Provider>
    )
}

