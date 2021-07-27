import { useContext } from "react";

import Alert from "react-bootstrap/Alert";

import { errorContext } from "./errorContext";

const ErrorL = () => {
    const [ errors, setErrors, addError, removeError ] = useContext( errorContext );

    return (
        <div className="error_box">
            {errors.map((err, index) => (
                <Alert className="alert_error" key={index} variant={err.type || "danger"} onClose={() => removeError(err.id)} dismissible>
                    {err.message || err.error || JSON.stringify(err) }
                </Alert>
            ))}
        </div>
    )

}

export default ErrorL;