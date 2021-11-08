import { createContext, useState } from "react";
import type { IAlert, IAlertContext } from "../Interfaces";

function* infinite() {
    let index = 0;

    while (true) {
        yield index++;
    }
}
const generator = infinite();


const AlertWrapper: React.FC = ({ children }) => {
    const [ alerts, setAlerts ] = useState<IAlert[]>( [] );

    const addAlert = ( er: IAlert ) => {
        if( !er ) return;
        const id = generator.next().value as number;
        
        const list: IAlert[] = [...alerts, { id, message: er.message, type: er.type }];
        
        return setAlerts(list);
    }

    const removeAlert = ( id: number ) => {
        return setAlerts( alerts.filter( er => er.id !== id ) );
    }
    

    return (
        <alertContext.Provider value={{ alerts, addAlert, removeAlert }}>
            { children }
        </alertContext.Provider>
    )
};

export const alertContext = createContext<IAlertContext>({
    alerts: [],
    addAlert: (er: IAlert) => null,
    removeAlert: (id: number) => null
});
export default AlertWrapper;