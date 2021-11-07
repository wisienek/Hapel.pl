import { createContext, useEffect, useState } from "react";

const axios = require("axios");

const User = ({ children }) => {
    const [ user, setUser ] = useState( null );

    const getUserDetails = () => axios.get(`http://hapel-ic.pl/api/dc/`, { test: true, withCredentials: true, credentials: 'include' });

    useEffect(() => {
        getUserDetails().then( async ({ data }) => {
        	try{
				const av = await axios.get( data.avatar.replace('webp', 'gif') );
				data.avatar = data.avatar.replace('webp', 'gif');
        	}
        	catch(er){
        	  console.log("Brak animowanego profilowego!");
        	}
			finally{
				return setUser( data );
			}
        })
        .catch(er=>{
        	console.error("User effect: ", er);
        });
    
    }, []);
    

    return (
        <Context.Provider value={[ user, setUser ]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(null);
export default User;