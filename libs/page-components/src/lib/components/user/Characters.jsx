import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ListGroup from 'react-bootstrap/ListGroup';

import { GoPencil } from 'react-icons/go';
import {
  FaPatreon,
  FaArchive,
  FaEye,
  FaEyeSlash,
  FaUserLock,
} from 'react-icons/fa';

const Characters = ({
  user,
  editInfo,
  toggleEdit,
  toggleVisible,
  archive,
  reloadData,
  players,
  searched,
  displayEdit,
}) => {
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>
            <h4>Połączone konta z grą</h4>
          </Card.Title>

          <ListGroup variant="dark">
            {(searched.length == 0 || user.hasPerms
              ? players
              : players.filter((pl) => pl.visible)
            ).map((pl, ind) => (
              <ListGroup.Item
                className={`listGroupItem ${
                  pl.archived ? 'archivedCharacter' : ''
                }`}
                key={ind}
                style={{ paddingLeft: '25px' }}
              >
                {(searched.length == 0 && !pl.archived) || user.hasPerms ? (
                  <div className="characterControlls">
                    <OverlayTrigger
                      placement="right"
                      overlay={<Tooltip>Zmień informacje</Tooltip>}
                    >
                      <GoPencil
                        className="user-icon"
                        onClick={() => toggleEdit(pl.nick)}
                      />
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip>
                          {user.hasPerms
                            ? `Przełącz arhciwizację: ${
                                pl.archived
                                  ? 'Zarchiwizowane'
                                  : 'Niearchiwizowane'
                              }`
                            : 'Archiwizacja'}
                        </Tooltip>
                      }
                    >
                      <FaUserLock
                        className="user-icon"
                        onClick={() => archive(pl.nick)}
                      />
                    </OverlayTrigger>

                    {pl.visible ? (
                      <OverlayTrigger
                        placement="right"
                        overlay={<Tooltip>Ukryj dla graczy</Tooltip>}
                      >
                        <FaEyeSlash
                          className="user-icon"
                          onClick={() => toggleVisible(pl.nick)}
                        />
                      </OverlayTrigger>
                    ) : (
                      <OverlayTrigger
                        placement="right"
                        overlay={<Tooltip>Pokaż dla graczy</Tooltip>}
                      >
                        <FaEye
                          className="user-icon"
                          onClick={() => toggleVisible(pl.nick)}
                        />
                      </OverlayTrigger>
                    )}
                  </div>
                ) : (
                  ''
                )}

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
                        alt={pl.nick + ' avatar'}
                        style={{ borderRadius: '15px' }}
                      />

                      <div className="profileBadgeContainer">
                        {pl.patreon == true ? (
                          <OverlayTrigger
                            placement="auto"
                            overlay={<Tooltip>Patreon</Tooltip>}
                          >
                            <Badge className="profileBadge">
                              {' '}
                              <FaPatreon />{' '}
                            </Badge>
                          </OverlayTrigger>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>

                    <div>
                      <OverlayTrigger
                        placement="auto"
                        overlay={<Tooltip>{pl.uuid}</Tooltip>}
                      >
                        <h4>{pl.nick}</h4>
                      </OverlayTrigger>
                      <div
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <h5>{pl.displayName}</h5>
                        {pl.plec ? (
                          <OverlayTrigger
                            placement="auto"
                            overlay={<Tooltip>Płeć</Tooltip>}
                          >
                            <Badge
                              style={{ margin: '5px' }}
                              id={pl.nick + '-gender'}
                              variant={
                                pl.plec == null
                                  ? 'secondary'
                                  : pl.plec == 'm'
                                  ? 'primary'
                                  : 'danger'
                              }
                            >
                              {pl.plec || '?'}
                            </Badge>
                          </OverlayTrigger>
                        ) : (
                          ''
                        )}
                        {pl.wiek ? (
                          <OverlayTrigger
                            placement="auto"
                            overlay={<Tooltip>Wiek</Tooltip>}
                          >
                            <Badge
                              style={{ margin: '5px' }}
                              id={pl.nick + '-age'}
                              variant={pl.wiek >= 18 ? 'success' : 'secondary'}
                            >
                              {pl.wiek || 'x lat'}
                            </Badge>
                          </OverlayTrigger>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col>
                  <h4>Grupy</h4>
                  <ul>
                    {pl.grupy.map((g, ind) => (
                      <li key={g + ind}>{g}</li>
                    ))}
                  </ul>
                </Col>
                {searched.length == 0 ? (
                  <>
                    <Col
                      className={
                        displayEdit[pl.nick] == true ? '' : 'toggle-visible'
                      }
                      id={pl.nick}
                    >
                      <Form
                        style={{ margin: '15px' }}
                        onSubmit={(e) => editInfo(e, ind)}
                      >
                        <h3>Edytuj informacje</h3>
                        <Form.Control
                          type="text"
                          value={pl.nick}
                          name="id"
                          disabled
                          required
                          className="toggle-visible"
                        />

                        <div style={{ display: 'flex', gap: '10px' }}>
                          <Form.Group>
                            <Form.Label>Zmień płeć</Form.Label>
                            <Form.Control
                              type="text"
                              name="gender"
                              placeholder={pl.plec || 'm / f'}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Zmień Wiek</Form.Label>
                            <Form.Control
                              type="number"
                              name="age"
                              placeholder={pl.wiek || '11'}
                            />
                          </Form.Group>
                        </div>
                        <Form.Group>
                          <Form.Label>Zmień opis</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={4}
                            name="about"
                            placeholder={pl.opis || 'Twój opis postaci'}
                          />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                          Zatwierdź
                        </Button>
                      </Form>
                    </Col>
                  </>
                ) : (
                  ''
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Characters;
