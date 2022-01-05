export interface INotyfication {
  id: string;
  message: string;
  type: 'Info' | 'Error' | 'Warning';
}

export interface INotyficationContext {
  notyfications: INotyfication[];
  addNotyfication: (notyfication: INotyfication) => void;
  removeNotyfication: (id: string) => void;
}

export interface NotyficationInput extends INotyfication {
  deleteNotyfication: (id: string) => void;
}
