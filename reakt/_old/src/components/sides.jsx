import Glowna from "./sides/glowna";
import Elki from "./sides/elki";
import Discord from "./sides/discord";
import UserSide from "./sides/User";
import Cards from "./sides/cards";
import Role from "./sides/role";
import School from "./sides/school";
import CharacterCreator from "./sides/CharacterCreator";

import { Context } from "./user";

import { useContext } from "react";


const Sides = () => {
    const [ user ] = useContext( Context );
    const test = false;

    return (
        <ul id="sideUl">
            <Glowna />
            <hr />
            <School />
            <Elki />
            <CharacterCreator />
            
            {
                user && !test ? 
                    <>
                        <Cards />
                        {
                            user.hasPerms || user.hasPermsHic?
                                <Role /> 
                            :
                                ""
                        }

                        <UserSide user={ user } />
                    </> 
                : 
                    test?
                        <>
                            <Cards />
                            <Cards />
                            <Cards />
                            <Role /> 
                            <Discord />
                        </>
                    :
                        <Discord />
            }
            
        </ul>
    )
}


export default Sides;