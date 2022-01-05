import { createContext, useEffect, useState } from "react";
import { IUserContext, User } from "./User.type";
import axios from "axios";

export const UserContext: React.FC = ({ children }) => {
    const [ user, setUser ] = useState<User>();

    const getUserDetails = () => axios.get(`http://hapel-ic.pl/api/dc/`, { withCredentials: true });

    useEffect(() => {
        getUserDetails().then( async ({ data }: { data: any }) => {
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
        .catch((er: any)=>{
        	console.error("User effect: ", er);
        });
    
    }, []);
    

    return (
        <userContext.Provider value={{ user }}>
            {children}
        </userContext.Provider>
    )
};

export const userContext = createContext<IUserContext>({
    user: undefined,
    setUser: (user: User) => null
});