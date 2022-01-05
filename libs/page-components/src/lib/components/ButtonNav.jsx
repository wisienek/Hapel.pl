import { Fragment } from 'react';

import { useLocation, Route, Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const ButtonNav = ({ nav, perms }) => {
  const Location = useLocation();

  return (
    <Col
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      {nav.map((item, index) => (
        <Fragment key={index}>
          {item.perms && perms == true ? (
            <Link to={item.link}>
              <Button
                variant={
                  item.exact == true
                    ? Location.pathname == item.link
                      ? 'primary'
                      : 'secondary'
                    : Location.pathname.indexOf(item.link) > -1
                    ? 'primary'
                    : 'secondary'
                }
              >
                {item.text}
              </Button>
            </Link>
          ) : !item.perms ? (
            <Link to={item.link}>
              <Button
                variant={
                  item.exact == true
                    ? Location.pathname == item.link
                      ? 'primary'
                      : 'secondary'
                    : Location.pathname.indexOf(item.link) > -1
                    ? 'primary'
                    : 'secondary'
                }
              >
                {item.text}
              </Button>
            </Link>
          ) : (
            ''
          )}
        </Fragment>
      ))}
    </Col>
  );
};

export default ButtonNav;
