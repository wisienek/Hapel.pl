import { createContext, useState } from "react";


const Error = ({ children }) => {
    const [ errors, setErrors ] = useState( [] );

    const addError = (er) => {
        let id = errors.length;

        if( typeof er != "object" )
            return console.error("Error musi być obiektem {type, message/error} !", er);

        if( !er.message && !er.error )
            return console.error("Brak opisu dla erroru!", er);
        

        let list = (id == 0)? [{ id, type: er.type, error: (er.message)? er.message: er.error }]: [...errors, { id, type: er.type, error: (er.message)? er.message: er.error }];
        
        return setErrors(list);
    }

    const removeError = (id) => {
        return setErrors( errors.filter(er=> er.id != id ) );
    }
    

    return (
        <errorContext.Provider value={[ errors, setErrors, addError, removeError ]}>
            {children}
        </errorContext.Provider>
    )
};

export const errorContext = createContext([]);
export default Error;