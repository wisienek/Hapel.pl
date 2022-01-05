import { useState, useContext, useEffect } from 'react';

import {
  Container,
  Row,
  Col,
  InputGroup,
  Button,
  FormControl,
} from 'react-bootstrap';
import { useLocation, Route, Link } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';

import TopNavbar from '../navbar';
import EInfo from '../elki/eInfo';
import MainElki from '../elki/main';
import Moje from '../elki/moje';
import Cennik from '../elki/Cennik';

import { Context } from '../user';
import { errorContext } from '../errorContext';
import { loadingContext } from '../LoadingContext';

import axios from 'axios';
import qs from 'query-string';

const SElki = () => {
  const [, , addError] = useContext(errorContext);
  const [loadingG, setLoadingG] = useContext(loadingContext);

  const Location = useLocation();

  const [info, setInfo] = useState([]);
  const [user] = useContext(Context);

  const [update, setUpdate] = useState(true);
  const [updateMoje, setUpdateMoje] = useState(true);

  const [tableGracze, setTableGracze] = useState([]);
  const [tableElki, setTableElki] = useState([]);
  const [tableMoje, setTableMoje] = useState([]);
  const [filteredMoje, setFilteredMoje] = useState([]);
  const [elkiInfo, setElkiInfo] = useLocalStorage('elki', '');
  let hapelGuild;

  let blad = (er) => addError(er);

  const removeInfo = (id) => {
    if (!id) return blad({ type: 'danger', error: 'Brak id' });

    return setInfo(info.filter((i) => i.id != id));
  };

  const szukaj = (_id) => {
    const id = document.querySelector('#szukaj_input').value || _id;
    console.log(`Szukam id: ${id}`);
    if (!id) return blad({ type: 'danger', error: 'Nie podałeś żadnego id!' });
    if (!user) return blad({ type: 'danger', error: 'Nie jesteś zalogowany!' });

    hapelGuild = user
      ? user.guilds.filter((g) => g.id == '133227600746250240')[0]
      : { permissions: '0' };

    //const res = await axios({ 'url': `http://localhost/api/elki?id=${id}`, 'method': "get"});
    axios({
      url: `http://hapel-ic.pl/api/elki?id=${id}${
        user
          ? '&user=' +
            user.discord +
            '&username=' +
            user.username +
            '&permission=' +
            hapelGuild.permissions
          : ''
      }`,
      method: 'get',
    })
      .then((res) => {
        if (!info.some((i) => i.id == res.data.rows.id))
          return setInfo([...info, res.data.rows]);

        return blad({ type: 'info', error: 'Eliksir już jest wyszukany!' });
      })
      .catch((er) => {
        blad(
          er?.response?.data
            ? er.response.data
            : { type: 'danger', error: 'Brak wyników do wyświetlenia!' }
        );
      });
  };

  const oczekujace = () => {
    if (!user) return blad({ type: 'danger', error: 'Nie jesteś zalogowany!' });
    if (!user.guilds) return blad({ type: 'info', error: 'brak gildii' });
    if (user.hasPerms == false)
      return blad({ type: 'danger', error: 'Nie masz permissi!' });

    hapelGuild = user
      ? user.guilds.filter((g) => g.id == '133227600746250240')[0]
      : { permissions: '0' };

    setLoadingG(true);
    axios({
      url: `http://hapel-ic.pl/api/elki?oczekujace=true${
        user
          ? '&user=' +
            user.discord +
            '&username=' +
            user.username +
            '&permission=' +
            hapelGuild.permissions
          : ''
      }`,
      method: 'get',
    })
      .then((res) => {
        if (!res?.data?.rows) {
          res.data.rows = [];
        }
        let add = [];
        if (info.length > 0) {
          res.data.rows.forEach((r) => {
            if (!info.some((i) => i.id == r.id)) add.push(r);
          });
        } else {
          add = res?.data?.rows || [];
        }

        if (add.length > 0)
          blad({ type: 'info', error: 'Są oczekujące eliksiry!' });

        setLoadingG(false);
        return setInfo([...info, ...add]);
      })
      .catch((er) => {
        setLoadingG(false);
        blad(
          er?.response?.data
            ? er.response.data
            : { type: 'danger', error: 'Brak wyników do wyświetlenia!' }
        );
      });
  };

  const getTop = (opt) => {
    if (!opt)
      return blad({ type: 'danger', error: 'Nie podano opcji getTop!' });
    axios({ url: `http://hapel-ic.pl/api/elki/top?opt=${opt}`, method: 'get' })
      .then((res) => {
        let rows = res.data.rows;
        if (!rows || rows.length == 0) {
          throw {
            response: {
              data: { type: 'warning', error: 'Brak wyników z bazy!' },
            },
          };
        }
        rows = rows.slice(0, 10);

        update && setUpdate(false);
        opt == 'licz' ? setTableGracze([...rows]) : setTableElki([...rows]);
        return;
      })
      .catch((er) => {
        blad(
          er?.response?.data
            ? er.response.data
            : { type: 'danger', error: 'Brak wyników do wyświetlenia!' }
        );
        update && setUpdate(false);
        return;
      });
  };

  const getMoje = () => {
    let id = qs.parse(Location.search).id || undefined;
    console.log(id);

    if (!id && !user) return console.log(`No user!`);

    axios
      .get(`http://hapel-ic.pl/api/elki/moje${id ? `?id=${id}` : ''}`, {
        params: user,
      })
      .then((res) => {
        let x = res?.data?.rows || [];

        setTableMoje([...x]);
        setFilteredMoje([...x]);
        return true;
      })
      .catch((er) => {
        return blad(
          er?.response?.data
            ? er.response.data
            : { type: 'danger', error: 'Brak wyników do wyświetlenia!' }
        );
      });
  };

  //podobnie składniki zrobić
  const getElki = () => {
    axios
      .get(`http://hapel-ic.pl/api/elki/info`)
      .then((res) => {
        const arr = res?.data?.rows ? res.data.rows : '';
        if (arr == '')
          return blad({
            type: 'danger',
            error: 'Nie udało się fetchować informacji o eliksirach!',
          });

        let final = {};
        arr.forEach((el) => {
          let x = el.nazwa;
          delete el.nazwa;
          final[x] = el;
        });

        setElkiInfo(JSON.stringify(final));
        return;
      })
      .catch((er) => {
        blad(
          er?.response?.data
            ? er.response.data
            : { type: 'danger', error: 'Brak wyników do wyświetlenia!' }
        );
        return;
      });
  };

  const searchMine = (e) => {
    setFilteredMoje(
      tableMoje.filter(
        (elek) =>
          elek.id.indexOf(e.target.value.toLowerCase()) > -1 ||
          elek.eliksir.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
      )
    );
  };

  useEffect(() => {
    getTop('licz');
    getTop('elki');
    user && getMoje();
    user && user.hasPerms && oczekujace();
    elkiInfo.length == 0 && getElki();
  }, []);

  const nav = [
    {
      link: '/elki',
      exact: true,
      text: 'Główna',
    },
    {
      link: '/elki/moje',
      text: 'Moje eliksiry',
      user: true,
    },
    {
      link: '/elki/utility',
      text: 'Utility elków',
    },
    {
      link: '/elki/admin',
      perms: true,
      text: 'Admin panel',
    },
  ];
  const extra = (
    <>
      {user && user.hasPerms ? (
        <Route path="/elki/admin">
          <div
            className="navWrap"
            style={{ justifyContent: 'center', gap: '10px' }}
          >
            <InputGroup className="xs-3 md-2">
              <InputGroup.Prepend>
                <Button variant="secondary" onClick={() => szukaj(null)}>
                  Szukaj
                </Button>
              </InputGroup.Prepend>
              <FormControl
                id="szukaj_input"
                aria-describedby="basic-addon1"
                placeholder="ID"
              />
              <InputGroup.Append>
                <Button variant="info" onClick={oczekujace}>
                  Oczekujące
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </Route>
      ) : (
        ''
      )}
      {user ? (
        <Route path="/elki/moje">
          <div
            className="navWrap"
            style={{ justifyContent: 'center', gap: '10px' }}
          >
            <input
              className="form-control"
              type="text"
              placeholder="Szukaj eliksiru"
              onChange={searchMine}
            />
          </div>
        </Route>
      ) : (
        ''
      )}
    </>
  );

  return (
    <>
      <TopNavbar
        nav={nav}
        extra={extra}
        user={user ? user.discord : ''}
        perms={user ? user.hasPerms : false}
      />

      <Container
        className={
          Location.pathname.indexOf('/elki/admin') > -1 ? 'content' : ''
        }
        style={
          Location.pathname.indexOf('/elki/admin') > -1
            ? { gridTemplateColumns: 'repeat(1, minmax(410px, 100%) )' }
            : {}
        }
      >
        <Route path="/elki" exact>
          <MainElki blad={blad} topG={tableGracze} topE={tableElki} />
        </Route>
        {user ? (
          <Route path="/elki/moje">
            <Moje
              globalElki={elkiInfo}
              update={updateMoje}
              setUpdate={setUpdateMoje}
              mojeElki={filteredMoje}
              getMoje={getMoje}
            />
          </Route>
        ) : (
          ''
        )}

        <Route path="/elki/utility">
          <Cennik blad={blad} />
        </Route>

        <Route
          path="/elki/check"
          render={(props) => (
            <Moje
              {...props}
              globalElki={elkiInfo}
              update={false}
              setUpdate={setUpdateMoje}
              mojeElki={filteredMoje}
              getMoje={getMoje}
            />
          )}
        />

        {user && user.hasPerms ? (
          <Route path="/elki/admin">
            <EInfo info={info} onDelete={removeInfo} blad={blad} />
          </Route>
        ) : (
          ''
        )}
      </Container>
    </>
  );
};

export default SElki;
