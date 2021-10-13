import SRole from "./SRole";

import { useState, useEffect } from "react";
import axios from "axios";


const AllRoles = ({ parsedCRole, parsedRole, parsedRoleDC, user, addError }) => {
    const [ create, setCreate ] = useState( {} );
    const [ add, setAdd ]       = useState( {} );

    const editRole = ( data ) => {

        if( !data || typeof data != "object" )
            return addError({ type: "danger", error: "Zły obiekt zwrócony z kafelka!" });

        if( !data.name || data.name.length < 3 )
            return addError({ type: "warning", error: "Nazwa musi mieć przynajmniej 3 znaki niespecjalne." });
        if( !data.dname )
            data.dname = `[&7${data.name}&f]`;
        if( data.permissions.length > 0 )
            data.permissions = data.permissions.replace(/\s/g, "").split(",");
        if( data.newdc === true && ( !data.dcdisplayname || data.dcdisplayname.length < 3 ) )
            return addError({ type: "warning", error: "Nazwa roli na discordzie musi mieć minimum 3 znaki niespecjalne." });
            
        axios.post(`http://hapel-ic.pl/api/role/edit`, { user, params: data })
        .then(res=> {
            if( res.data )
                addError( res.data );

            console.log(`Zakończono zapytanie na Edytowanie roli!`);
        })
        .catch(er=> {
            console.error( er );
            addError( { type: "danger", error: "Coś poszło nie tak! " + er } );
        });
        
        console.log("data: ", data);
        return true;
    };

    const multiDcRole = () => {
        return ( ( user && user.hasPerms )? parsedRoleDC: parsedRoleDC.filter(r=> r.permissions < 238542409) ) || [];
    };

    const mappedRoles = () => {
        return parsedRole.map((rola, ind)=> (
            <option key={ind} value={rola} >{rola}</option>
        ))
    }

    // useEffect(()=>{
    //     console.info( parsedCRole );
    // },[]);

    return (
        <div className="container content content_2">
            {
                parsedCRole.role.map( (r, ind) => (
                    <SRole key={ ind } 
                        mappedRoles={ mappedRoles() } 
                        user={ user } 
                        parsedCRole={ parsedCRole } 
                        parsedRole={ parsedRole } 
                        addRole={ editRole } 
                        parsedRoleDC={ parsedRoleDC } 
                        multiDcRole={ multiDcRole }  
                        r={ r } 
                        create={ create } 
                        setCreate={ setCreate } 
                        add={ add } 
                        setAdd={ setAdd } 
                        index={ ind } 
                    />
                ))
            }
        </div>
    )
}

export default AllRoles;
