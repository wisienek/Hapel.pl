import { useContext } from 'react';
import { INotyfication, INotyficationContext } from './Notyfication.type';
import { Notyfication } from './Notyfication';
import { notyficationsContext } from './NotificationContext';

export const NotificationContainer = () => {
  const { notyfications, removeNotyfication } =
    useContext<INotyficationContext>(notyficationsContext);

  return (
    <div className="fixed left-10 bottom-10 flex flex-col-reverse">
      {notyfications?.map((notification: INotyfication, ind: number) => (
        <Notyfication
          key={`N-${ind}`}
          id={notification.id}
          type={notification.type}
          message={notification.message}
          deleteNotyfication={removeNotyfication}
        />
      ))}
    </div>
  );
};
