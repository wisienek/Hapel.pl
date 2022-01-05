import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Table from 'react-bootstrap/Table';
import Tooltip from 'react-bootstrap/Tooltip';

import { GoPlus, GoX, GoTools, GoHistory } from 'react-icons/go';

const TeacherPanel = ({ plan, days, handleShow, setDef }) => {
  return (
    <div>
      <Card>
        <Card.Header
          className="centerFlex"
          style={{ justifyContent: 'space-between' }}
        >
          <h3>Panel Nauczycielski</h3>

          <div id="helper-icons">
            <OverlayTrigger
              placement="auto"
              overlay={<Tooltip>Usuń lekcję</Tooltip>}
            >
              <GoX id="helpX" className="plan-icon" />
            </OverlayTrigger>
            <OverlayTrigger
              placement="auto"
              overlay={<Tooltip>Edytuj lekcję</Tooltip>}
            >
              <GoTools id="helpE" className="plan-icon" />
            </OverlayTrigger>
            <OverlayTrigger
              placement="auto"
              overlay={<Tooltip>Tymczasowe zmiany</Tooltip>}
            >
              <GoHistory id="helpH" className="plan-icon" />
            </OverlayTrigger>
          </div>
        </Card.Header>
        <Card.Body>
          <div id="teachControlls">
            <div
              className="squareOpt"
              onClick={() => {
                setDef({});
                handleShow(1);
              }}
            >
              <GoPlus />
              <span>Dodaj lekcję</span>
            </div>
          </div>

          <Table
            responsive
            striped
            bordered
            hover
            variant="dark"
            className="planTable"
          >
            <thead>
              <tr>
                <th>Klasa</th>
                <th>Nazwa</th>
                <th>Dzień</th>
                <th>Godziny</th>
                <th>Kontrolki</th>
              </tr>
            </thead>
            <tbody>
              {plan.map((p, i) => (
                <tr key={'tr-' + i}>
                  <td>{p.class}</td>
                  <td>{p.name}</td>
                  <td>{days[p.day]}</td>
                  <td>{`${p.start} - ${p.end}`}</td>
                  <td>
                    <div>
                      <GoX
                        className="plan-icon"
                        onClick={() => {
                          setDef(p);
                          handleShow(2);
                        }}
                      />
                      <GoTools
                        className="plan-icon"
                        onClick={() => {
                          setDef(p);
                          handleShow(1);
                        }}
                      />
                      <GoHistory
                        className="plan-icon"
                        onClick={() => {
                          setDef(p);
                          handleShow(3);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TeacherPanel;
