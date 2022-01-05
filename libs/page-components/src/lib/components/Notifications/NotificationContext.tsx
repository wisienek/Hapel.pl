import { createContext, useState } from 'react';
import { v4 } from 'uuid';

import { INotyfication, INotyficationContext } from "./Notyfication.type";


export const NotyficationsContext: React.FC = ({ children }) => {
    const [ notyfications, setNotyfications ] = useState<INotyfication[]>( [] );

    const addNotyfication = ( notyfication: INotyfication ) => {
        if( !notyfication ) return;
        const id = v4();

        const nextNotyfication = { 
            id, 
            message: notyfication.message, 
            type: notyfication.type 
        };
        
        const list: INotyfication[] = [ ...notyfications, nextNotyfication ];
        
        return setNotyfications(list);
    }

    const removeNotyfication = ( id: string ) => {
        return setNotyfications( notyfications.filter( n => n.id !== id ) );
    }

    return (
        <notyficationsContext.Provider value={{ notyfications, addNotyfication, removeNotyfication }}>
            { children }
        </notyficationsContext.Provider>
    )
};

export const notyficationsContext = createContext<INotyficationContext>({
    notyfications: [],
    addNotyfication: ( notyfication: INotyfication ) => null,
    removeNotyfication: ( id: string ) => null,
});