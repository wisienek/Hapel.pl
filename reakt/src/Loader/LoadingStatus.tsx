import { useContext, useEffect, useState } from "react";

import { ILoadingContext } from "../Interfaces";
import { loadingContext } from "./LoadingContext";


const LoadingStatus = () => {
    const [ lwidth, setWidth ] = useState<number>(0);
    const { isLoading, loadingTasks } = useContext<ILoadingContext>(loadingContext) ;

    useEffect(() => {
        const percentage = loadingTasks.filter( t => t.state === true ).length / loadingTasks.length;
        setWidth( percentage );
    }, [loadingTasks]);

    return (
        <div 
            className={ 
                `duration-700 
                fixed 
                bottom-0 
                ${ isLoading === true ? "opacity-100" : "opacity-0" }
                `
            }
        >
            <div className="overflow-hidden h-2 text-xs flex bg-purple-200">
                <div
                    style={{
                        width: `${lwidth}%`
                    }}
                    className="
                        shadow-none
                        flex flex-col
                        text-center
                        whitespace-nowrap
                        text-white
                        justify-center
                        bg-purple-500
                    "
                ></div>
            </div>
        </div>
    )
};

export default LoadingStatus;