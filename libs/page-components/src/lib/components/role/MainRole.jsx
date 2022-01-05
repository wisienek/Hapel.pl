import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Tooltip from 'react-bootstrap/Tooltip';
import ListGroup from 'react-bootstrap/ListGroup';

import { BsTools, BsTrash, BsQuestionCircle } from 'react-icons/bs';

const MainRole = ({ user, parsedPlayer, parsedCRole }) => {
  const findRole = (name) =>
    (parsedCRole.role || []).find((r) => r.name === name);
  const getRoleControlls = (name) => {
    const role = findRole(name);

    return (
      <>
        {role && role.canResign == 1 ? (
          <OverlayTrigger
            placement="auto"
            overlay={<Tooltip>Rezygnuj</Tooltip>}
          >
            <BsTrash className="user-icon" />
          </OverlayTrigger>
        ) : (
          ''
        )}
        {user && user.hasPerms ? (
          <OverlayTrigger placement="auto" overlay={<Tooltip>Edytuj</Tooltip>}>
            <BsTools className="user-icon" />
          </OverlayTrigger>
        ) : (
          ''
        )}
      </>
    );
  };
  const getRoleInfo = (name) => {
    const foundRole = findRole(name);

    return (
      <Popover>
        <Popover.Title as="h4">informacje o roli {name}</Popover.Title>
        <Popover.Content>
          {foundRole ? (
            <>
              <p>
                <strong>Właściciel: </strong> {foundRole.creator || 'Nieznany'}
              </p>
              <p>
                <strong>DisplayName: </strong>{' '}
                {foundRole.displayname || `[&7${name}&f]`}
              </p>
              <p>
                <strong>Parent: </strong> {foundRole.parent || 'Brak'}
              </p>
              <p>
                <strong>Darmowa: </strong> {foundRole.isFree ? 'Tak' : 'Nie'}
              </p>
              <p>
                <strong>Aplikacje: </strong>{' '}
                {foundRole.canApply ? 'Tak' : 'Nie'}
              </p>
              <p>
                <strong>Rezygnacja: </strong>{' '}
                {foundRole.canResign ? 'Tak' : 'Nie'}
              </p>
            </>
          ) : (
            <p>Nie znaleziono informacji o roli</p>
          )}
        </Popover.Content>
      </Popover>
    );
  };

  return (
    <div className="content">
      <ListGroup variant="dark">
        {parsedPlayer.map((pl, ind) => (
          <ListGroup.Item className="listGroupItem" key={'pl-' + ind}>
            <Col>
              <div
                style={{
                  padding: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex' }}>
                  <img
                    width={80}
                    height={80}
                    className="mr-3"
                    src={`https://minotar.net/helm/${pl.nick}/64.png`}
                    alt={`${pl.nick} avatar`}
                    style={{ borderRadius: '15px' }}
                  />
                </div>

                <div>
                  <h4>{pl.nick}</h4>

                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h5>{pl.displayName}</h5>
                  </div>
                </div>
              </div>
            </Col>
            <Col>
              <h4>Grupy</h4>
              <div className="playerRoles">
                {pl.grupy.map((g, ind) => (
                  <div key={'g-' + ind} className="playerRole">
                    <div className="centerFlex">
                      <h6>{g}</h6>
                    </div>

                    <div className="centerFlex playerRoleIcons">
                      {getRoleControlls(g)}

                      <OverlayTrigger placement="auto" overlay={getRoleInfo(g)}>
                        <BsQuestionCircle className="user-icon" />
                      </OverlayTrigger>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default MainRole;
