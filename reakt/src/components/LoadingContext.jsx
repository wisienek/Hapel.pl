import { createContext, useState } from "react";

const LoadingContext = ({ children }) => {
    const [ loadingG, setLoadingG ] = useState( false );

    return (
        <loadingContext.Provider value={[ loadingG, setLoadingG ]}>
            {children}
        </loadingContext.Provider>
    )
};

export const loadingContext = createContext( false );
export default LoadingContext;