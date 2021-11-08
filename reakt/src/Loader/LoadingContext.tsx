import { createContext, useState } from "react";
import { ILoadingContext, ILoadingTask } from "../Interfaces";

function* infinite() {
    let index = 0;
    while (true) yield index++;
}
const generator = infinite();

const LoadingWrapper: React.FC = ({ children }) => {
    const [ isLoading, setLoadingG ] = useState<boolean>( false );
    const [ loadingTasks, setLoadingTasks ] = useState<ILoadingTask[]>( [] );

    const addLoader = ( task: ILoadingTask ) => {
        task.id = generator.next().value as number;

        setLoadingTasks( [ ...loadingTasks, task ] );

        if( isLoading === false ) toggleLoading( true );

        return task.id;
    }

    const finishLoader = ( id: number ) => {
        const task = loadingTasks.find( t => t.id === id );
        if( !task ) return;
        
        task.state = true;
        
        const isComplete = loadingTasks.some( t => t?.state === false ) ? false : true;

        if( isComplete ) setLoadingTasks( [] );
        else setLoadingTasks( [ ...loadingTasks ] );

        if( isComplete ) toggleLoading( false );
    }

    const toggleLoading = ( loading: boolean ) => setLoadingG( loading );

    return (
        <loadingContext.Provider value={{ isLoading, loadingTasks, addLoader, finishLoader }}>
            { children }
        </loadingContext.Provider>
    )
};

const defaults: ILoadingContext = {
    isLoading: false,
    loadingTasks: [],
    addLoader: ( task: ILoadingTask ) => 0,
    finishLoader: ( id: number ) => null,
};

export const loadingContext = createContext<ILoadingContext>( defaults );
export default LoadingWrapper;