import { createContext, useState } from "react";
import { ILoaderContext } from "./Loader.type";

export const LoadingContext: React.FC = ({ children }) => {
    const [ isLoading, setIsLoading ] = useState( false );

    return (
        <loadingContext.Provider value={{ isLoading }}>
            {children}
        </loadingContext.Provider>
    )
};

export const loadingContext = createContext<ILoaderContext>({
    isLoading: false
});