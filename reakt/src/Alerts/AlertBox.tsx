import { useContext } from "react";

import { alertContext } from "./AlertContext";
import { IAlertContext } from "../Interfaces";
import Alert from "./Alert";

const AlertBox = () => {
    const { alerts, removeAlert } = useContext<IAlertContext>(alertContext);

    return (
        <div className="fixed left-10 bottom-10 flex flex-col-reverse" >
            {
                alerts?.map( (alert, ind: number) => (
                    <Alert
                        key={ `Alert-${ind}` }
                        id={ alert.id }
                        type={ alert.type }
                        message={ alert.message }
                        deleteAlert={ removeAlert }
                    />
                ))
            }
        </div>
    )
}

export default AlertBox;