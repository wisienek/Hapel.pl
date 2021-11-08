export interface IAlert {
    id: number;
    message: string;
    type: "Info" | "Error" | "Warning";
}

export interface IAlertContext {
    alerts: IAlert[];
    addAlert: (er: IAlert) => void;
    removeAlert: ( id: number ) => void;
}

export interface IAlertTypes {
    id: number;
    message: string;
    type: "Info" | "Error" | "Warning";
    deleteAlert: (id: number) => void;
}