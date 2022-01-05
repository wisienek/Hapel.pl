import Container from 'react-bootstrap/Container';

import { useState, useContext, useEffect } from 'react';
import { Route } from 'react-router-dom';

import { errorContext } from '../errorContext';
import { Context } from '../user';
import TopNavbar from '../navbar';

import Board from '../hogwart/Board';
import Grades from '../hogwart/Grades';
import Plan from '../hogwart/Plan';

const Hogwart = () => {
  const [, , addError] = useContext(errorContext);
  const [user] = useContext(Context);
  const przedmioty = [
    'Astronomia',
    'Eliksiry',
    'Historia Magii',
    'Latanie',
    'Mugoloznastwo',
    'Magotechnika',
    'Numerlogia',
    'ONMS',
    'OPCM',
    'P. Magomedycyny',
    'Pojedynkowanie',
    'Starożytne Runy',
    'Transmutacja',
    'Wróżbiarstwo',
    'Zaklęcia',
    'Zielarstwo',
  ];

  const selectLekcja = (e) => {
    console.log(e.target.value);
  };

  const nav = [
    {
      link: '/hogwart',
      exact: true,
      text: 'Tablica',
    },
    {
      link: '/hogwart/plan',
      text: 'Plan lekcji',
    },
    {
      link: '/hogwart/grades',
      text: 'Dzienniczek',
      user: true,
    },
  ];

  const extra = (
    <Route path="/hogwart/grades" exact>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '15px' }}>
        <span>Wybierz dziennik</span>
        <select
          className="form-control"
          placeholder="Wybierz lekcję"
          defaultValue=""
          onChange={selectLekcja}
        >
          {przedmioty.map((p, i) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
    </Route>
  );

  return (
    <>
      <TopNavbar
        nav={nav}
        user={user ? user.discord : ''}
        perms={user ? user.hasPerms : false}
        extra={extra}
      />

      <Container fluid>
        <Route path="/hogwart" exact>
          <Board user={user} addError={addError} />
        </Route>
        <Route path="/hogwart/plan">
          <Plan user={user} addError={addError} />
        </Route>
        <Route path="/hogwart/grades">
          <Grades user={user} addError={addError} />
        </Route>
      </Container>
    </>
  );
};

export default Hogwart;
