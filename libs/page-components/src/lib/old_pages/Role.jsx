import { useState, useContext, useEffect } from 'react';
import { useLocation, Route, Link } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';

// import Badge from "react-bootstrap/Badge";
// import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';

import { Context } from '../user';
import { errorContext } from '../errorContext';

import TopNavbar from '../navbar';
import CreateRole from '../role/CreateRole';
import MainRole from '../role/MainRole';
import AllRoles from '../role/AllRoles';

import axios from 'axios';

// do dokończenia

const Role = () => {
  const [, , addError] = useContext(errorContext);
  const [user] = useContext(Context);

  const [player, setPlayer] = useLocalStorage('playerInfo', JSON.stringify([]));
  const [role, setRole] = useLocalStorage('roleInfo', JSON.stringify([]));
  const [roleDC, setRoleDC] = useLocalStorage('roleInfoDC', JSON.stringify([]));
  const [roleCInfo, setroleCInfo] = useLocalStorage(
    'roleCInfo',
    JSON.stringify({})
  );

  let parsedPlayer = player.length > 2 ? JSON.parse(player) : [];
  let parsedRole = role.length > 2 ? JSON.parse(role) : [];
  let parsedRoleDC = roleDC.length > 2 ? JSON.parse(roleDC) : [];
  let parsedCRole = roleCInfo.length > 2 ? JSON.parse(roleCInfo) : {};

  const getPlayerInfo = () => {
    axios
      .get(`http://hapel-ic.pl/api/users/game`, { user })
      .then((res) => {
        let data = res?.data?.rows ? res.data.rows : [];
        if (data.length == 0)
          return addError({
            type: 'info',
            error: 'Brak podłączonych kont z discordem w bazie!',
          });

        parsedPlayer = data;
        return setPlayer(JSON.stringify(data));
      })
      .catch((er) => {
        console.error(`Get info game ${er}`);
        return addError({
          type: 'warning',
          error: 'Wystąpił błąd podczas pobierania kont z gry!',
        });
      });
  };

  const getServerRoles = () => {
    axios
      .get('http://hapel-ic.pl/api/role/server')
      .then((data) => {
        let serverRoles = data?.data?.data ? data.data.data : [];

        setRole(JSON.stringify(serverRoles));
        parsedRole = serverRoles;

        console.log(`Ustawiono role: ${serverRoles.length}`);
      })
      .catch((er) => {
        console.error(`Get server roles ${er}`);
        return addError({
          type: 'warning',
          error: 'Wystąpił błąd podczas listy ról serwerowych!',
        });
      });
  };
  const getDiscordRoles = () => {
    axios
      .get('http://hapel-ic.pl/api/role/discord')
      .then((data) => {
        let discordRoles = data?.data?.data ? data.data.data : [];

        setRoleDC(JSON.stringify(discordRoles));
        parsedRoleDC = discordRoles;

        console.log(`Ustawiono Discordowe Role: ${discordRoles.length}`);
      })
      .catch((er) => {
        console.error(`Get server roles ${er}`);
        return addError({
          type: 'warning',
          error: 'Wystąpił błąd podczas listy ról discordowych HIC!',
        });
      });
  };
  const getConnectedRoles = () => {
    axios
      .get('http://hapel-ic.pl/api/role/getConnected')
      .then((res) => {
        let connectedRoles = res?.data?.role
          ? {
              role: res.data.role,
              auto: res.data.autoRole,
              perms: res.data.perms,
            }
          : { role: [], auto: [] };

        setroleCInfo(JSON.stringify(connectedRoles));
        parsedCRole = connectedRoles;

        console.log(`Ustawiono Połączone Role!`);
        if (res.data.message && res.data.type)
          addError({ type: res.data.type, message: res.data.message });
        return;
      })
      .catch((er) => {
        console.error(`Get connected roles ${er}`);
        return addError({
          type: 'warning',
          error: 'Wystąpił błąd podczas listy ról Połączonych!',
        });
      });
  };

  const nav = [
    {
      link: '/role',
      exact: true,
      text: 'Moje role',
    },
    {
      link: '/role/wszystkie',
      text: 'Wszystkie role',
    },
    {
      link: '/role/aplikacje',
      text: 'Aplikacje',
    },
    {
      link: '/role/oczekujace',
      perms: true,
      text: 'Oczekujące role',
    },
  ];

  useEffect(() => {
    if (!user) return;

    parsedPlayer.length == 0 && getPlayerInfo();
    getServerRoles();
    getDiscordRoles();
    getConnectedRoles();
  }, []);

  if (!user || !user.hasPerms)
    return (
      <Container>
        <h1> Brak uprawnień! </h1>
      </Container>
    );

  return (
    <>
      <TopNavbar nav={nav} perms={true} />

      <Container fluid>
        <Route path="/role" exact>
          <MainRole
            user={user}
            parsedPlayer={parsedPlayer}
            parsedCRole={parsedCRole}
          />
        </Route>

        <Route path="/role/wszystkie">
          <AllRoles
            parsedCRole={parsedCRole}
            parsedRole={parsedRole}
            parsedRoleDC={parsedRoleDC}
            user={user}
            addError={addError}
          />
        </Route>

        <Route path="/role/aplikacje">
          <CreateRole
            parsedRole={parsedRole}
            parsedRoleDC={parsedRoleDC}
            user={user}
            addError={addError}
          />
        </Route>
      </Container>
    </>
  );
};

export default Role;
