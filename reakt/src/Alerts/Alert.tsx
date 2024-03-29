import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IAlertTypes } from "../Interfaces";

const Alert = ({ 
    id, 
    type, 
    message, 
    deleteAlert 
}: IAlertTypes ) => {
    
    const resolvedTypes = {
        Info: "teal-500",
        Error: "red-500",
        Warning: "orange-500"
    }

    return (
        <div className={ `text-white px-6 py-4 border-0 rounded relative mb-4 bg-${ resolvedTypes[type] || "gray-500" }` }>
            <span className="text-xl inline-block mr-5 align-middle">
                <FontAwesomeIcon icon={['fas', 'bell']} className="bell-ring" />
            </span>

            <span className="inline-block align-middle mr-8">
                { type === "Error"? <b className="capitalize">Error!</b> : null } { message }
            </span>
            
            <button 
                onClick={ () => deleteAlert(id) }
                className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
            >
                <span>×</span>
            </button>
        </div>
    )
}

export default Alert;
