import { useState, useContext, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import { Context } from '../user';
import MojeKarty from '../karty/MojeKarty';
import KartyFilter from '../karty/kartyFilter';
import TopNavbar from '../navbar';

import axios from 'axios';

import { errorContext } from '../errorContext';

const SCards = () => {
  const [, , addError] = useContext(errorContext);
  const [user, setUser] = useContext(Context);
  const [karty, setKarty] = useLocalStorage('karty', '');
  const [swojeKarty, setSwojeKarty] = useState([]);
  const [filterSwoje, setFilterSwoje] = useState([]);
  const [update, setUpdate] = useState(true);
  const [displayKarty, setDisplayKarty] = useState({
    common: false,
    uncommon: false,
    rare: false,
    ancient: false,
    legendary: false,
  });
  const [typeCount, setTypeCount] = useState({});

  let parsedKarty = karty.length > 0 ? JSON.parse(karty) : {};

  const nav = [
    {
      link: '/karty',
      exact: true,
      perms: true,
      text: 'Wszystkie karty',
    },
    {
      link: '/karty/moje',
      text: 'Moje karty',
    },
  ];

  const getKarty = async () => {
    await axios
      .get(`http://hapel-ic.pl/api/karty`)
      .then((res) => {
        let cards = res?.data?.rows ? res.data.rows : [];
        let final = {};
        cards.forEach((k) => (final[k.numer] = k));
        parsedKarty = final;
        setKarty(JSON.stringify(final));
        return console.log('Załadowano karty!');
      })
      .catch((er) =>
        er.type
          ? addError(er)
          : addError({ type: 'danger', error: 'Nieznany błąd: ' + er })
      );
  };
  const getOwnCards = async (id) => {
    id = id || user.discord || null;

    await axios
      .get(`http://hapel-ic.pl/api/karty/moje`, { params: { user, id } })
      .then((res) => {
        let cards = res?.data?.rows ? res.data.rows : [];
        let unique = [];

        cards.forEach((c) => {
          if (!unique.some((k) => k.karta == c.karta)) unique.push(c);
        });

        setFilterSwoje(unique);
        setSwojeKarty(unique);
        return console.log('Załadowano sowje karty!');
      })
      .catch((er) => {
        return er?.response?.data
          ? addError(er.response.data)
          : console.log(er);
      });
  };
  const searchID = (e) => {
    const input = document.getElementById('searchId');
    const id = e.target.value;
    if (id.length == 18) {
      input.style.color = 'green';
      getOwnCards(id);
    } else {
      input.style.color = 'red';
    }
  };
  const filtrujKarty = (e) => {
    setFilterSwoje(
      swojeKarty.filter(
        (k) =>
          parsedKarty[k.karta].nazwa
            .toLowerCase()
            .indexOf(e.target.value.toLowerCase()) > -1
      )
    ); //e.target.value
  };
  const typesCount = () => {
    let counts = {};

    Object.values(parsedKarty).forEach((k) => {
      counts[k.typ] ? counts[k.typ]++ : (counts[k.typ] = 1);
    });

    console.info('Policzono!');

    return setTypeCount(counts);
  };

  useEffect(() => {
    karty.length == 0 && getKarty();

    typesCount();
  }, []);

  if (!user) return <h1>Musisz być zalogowany!</h1>;

  const filterButtons = (
    <Route path="/karty/moje">
      <div
        className="navWrap"
        style={{ justifyContent: 'center', gap: '10px' }}
      >
        <input
          className="form-control"
          id="nazwa"
          type="text"
          placeholder="Filtruj"
          onChange={filtrujKarty}
          style={{ maxWidth: '300px' }}
        />
        <input
          className="form-control"
          id="searchId"
          type="text"
          onChange={searchID}
          style={{ color: 'red', maxWidth: '300px' }}
          placeholder={user.discord || 'ID'}
        />
      </div>
    </Route>
  );

  return (
    <>
      <TopNavbar
        nav={nav}
        perms={user.hasPerms}
        extra={filterButtons}
        user={user}
      />

      <Container fluid className="containerKarty">
        <Route path="/karty" exact>
          {user && user.hasPerms ? (
            Object.keys(parsedKarty).map((w) => (
              <Card
                key={w}
                style={
                  displayKarty[parsedKarty[w].typ] == true
                    ? { display: 'none' }
                    : {}
                }
                className={`${parsedKarty[w].typ}`}
              >
                <Card.Img
                  loading="lazy"
                  variant="top"
                  src={`http://hapel-ic.pl/assets/karty/${w}.png`}
                />
                <Card.Body>
                  <Card.Title>
                    {parsedKarty[w].nazwa} ({w})
                  </Card.Title>
                  <Card.Text>
                    {JSON.parse(parsedKarty[w].opis).join(' ')}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : user ? (
            <MojeKarty
              displayKarty={displayKarty}
              user={user}
              globalKarty={parsedKarty}
              getOwnCards={getOwnCards}
              update={update}
              setUpdate={setUpdate}
              addError={addError}
              swojeKarty={filterSwoje}
            />
          ) : (
            <h1>Nie jesteś zalogowany!</h1>
          )}
        </Route>

        <Route path="/karty/moje">
          <MojeKarty
            displayKarty={displayKarty}
            user={user}
            globalKarty={parsedKarty}
            getOwnCards={getOwnCards}
            update={update}
            setUpdate={setUpdate}
            addError={addError}
            swojeKarty={filterSwoje}
          />
        </Route>
      </Container>

      <KartyFilter
        displayKarty={displayKarty}
        setDisplayKarty={setDisplayKarty}
        typesCount={typeCount}
      />
    </>
  );
};

export default SCards;
