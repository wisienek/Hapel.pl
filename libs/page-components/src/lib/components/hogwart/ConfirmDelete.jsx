import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

import { Fragment } from 'react';

const ConfirmDelete = ({
  show,
  handleClose,
  setDef,
  def,
  handleDelete,
  days,
}) => {
  return (
    <Modal
      show={show == 2 ? true : false}
      onHide={() => {
        handleClose(2);
        setDef({});
      }}
      size="lg"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Usuń lekcję: {def.id}. {def.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table responsive striped bordered hover className="planTable">
          <thead>
            <tr>
              <td>Nazwa</td>
              <td>Wartość</td>
            </tr>
          </thead>
          <tbody>
            {Object.keys(def).map((t, i) => (
              <Fragment key={'tr-' + i}>
                {def[t] != null ? (
                  <tr>
                    <td>{t}</td>
                    <td>
                      {t == 'prof' || t == 'Sprof'
                        ? def[t].nick
                        : t == 'day' || t == 'Sday'
                        ? days[def[t]]
                        : def[t]}
                    </td>
                  </tr>
                ) : (
                  <></>
                )}
              </Fragment>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: 'space-between' }}>
        <Button
          variant="secondary"
          onClick={() => {
            handleClose(2);
            setDef({});
          }}
        >
          Zamknij
        </Button>
        <Button variant="danger" onClick={() => handleDelete(def)}>
          Usuń
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDelete;
