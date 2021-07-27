import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { Link } from "react-router-dom";

import { useEffect, useState } from 'react';

import useLocalStorage from 'react-use-localstorage';

import axios from "axios";


const wx = false;

const Cennik = ({ blad }) => {
    const [ skladniki, setSkladniki ] = useLocalStorage("skladniki", '');
    const [ lista, setLista ] = useState([]);
    const [ cena, setCena ] = useState(0);

    let parsedSkladniki = skladniki? JSON.parse(skladniki): {};

    const getSkladniki = async () => {
        if(!skladniki || skladniki.length == 0){
            axios.get(`http://hapel-ic.pl/api/elki/skladniki`)
            .then(res=>{
                const arr = res?.data?.rows? res.data.rows: "";
                if(arr == "") return blad({ type: "danger", error: "Nie udało się fetchować informacji o składnikach!"});
                let final = {};

                arr.forEach(sk => final[sk.nazwa] = sk );

                setSkladniki(JSON.stringify(final));
                parsedSkladniki = final;
                return;
            })
            .catch(er => {
                blad(er?.response?.data? er.response.data: { type: "danger", error: "Brak wyników do wyświetlenia!"});
                return;
            });
        }
    }

    const selectSkladnik = () => {
        let inputSkladnik = document.querySelector("#skladniki");
        let nazwa = inputSkladnik.value;
        if(parsedSkladniki[ nazwa ]){
            //typ jednostka ilosc, cena
            const typ           = document.getElementById("typ");
            const jednostka     = document.getElementById("jednostka");
            const ilosc         = document.getElementById("ilosc");
            const cena          = document.getElementById("cena");

            typ.value        = parsedSkladniki[ nazwa ].typ;
            jednostka.value  = parsedSkladniki[ nazwa ].jednostka;
            ilosc.value      = parsedSkladniki[ nazwa ].ilosc;
            cena.value       = parsedSkladniki[ nazwa ].cena;
        }
    }

    const dodajSkladnik = () => {
        let inputSkladnik = document.querySelector("#skladniki");
        let nazwa = inputSkladnik.value;
        if(parsedSkladniki[ nazwa ]){
            let inputIle = document.querySelector("#ile");
            let ile = inputIle.value;
            if(!ile || ile<=0 || ile > 4000)
                return blad({ type: "warning", error: "Zła ilość. Musi się znajdować w przedziale (0; 4000)" });
            
            let wart = Math.ceil(ile *  (parsedSkladniki[ nazwa ].cena / parsedSkladniki[ nazwa ].ilosc ));
            let final = {
                id: lista.length + 1,
                nazwa,
                typ: parsedSkladniki[ nazwa ].typ,
                wartosc: wart,
                ile,
                jednostka: parsedSkladniki[ nazwa ].jednostka
            }
            setCena(cena + wart);
            setLista([...lista, final ]);
        }
    }

    const usunSkladnik = (index) => {
        setCena( cena - lista.find(l => l.id == index).wartosc );
        setLista( lista.filter(l => l.id != index) );
        return;
    }

    useEffect( async () => {
        getSkladniki();
    }, []);


    return (
        <>
            {wx? <nav>
                <Link to="/elki/utility" >        <Button variant={Location.pathname == "/elki/utility"? "primary": "secondary"} ></Button></Link>
                <Link to="/elki/utility/tabelka" ><Button variant={Location.pathname == "/elki/utility/tabelka"? "primary": "secondary"} ></Button></Link>
                <Link to="/elki/utility/" >       <Button variant={Location.pathname == "/elki/utility/"? "primary": "secondary"} ></Button></Link>
            </nav>: ""}
            
            <div className="content">
                <h1>Sprawdź ile zapłacisz za eliksir</h1>
                <Card>
                    <Card.Header><h3>Wybierz składnik</h3></Card.Header>
                    <Form id="skladnikSelect">

                        <h5>Składnik i ilość</h5>
                        <Form.Row>
                            
                            <Col >
                                <input className="form-control" list="skladnikiData" placeholder="Nazwa składnika" name="skladniki" id="skladniki" onInput={()=> selectSkladnik()} />
                                    <datalist id="skladnikiData">
                                        {
                                            Object.keys(parsedSkladniki).map((sk, ind)=>(
                                                <option key={ind} value={sk} />
                                            ))
                                        }
                                    </datalist>
                            </Col>
                            <Col lg={4}>
                                <input className="form-control" id="ile" type="number" placeholder={1} />
                            </Col>
                        </Form.Row>

                        <h5>Dane składnika</h5>
                        <Form.Row>
                            
                            <Col>
                                <OverlayTrigger placement="auto" overlay={<Tooltip>Typ składnika</Tooltip>} >
                                    <input className="form-control" id="typ" type="text" placeholder="Typ składnika" disabled />
                                </OverlayTrigger>
                            </Col>
                            <Col>
                                <OverlayTrigger placement="auto" overlay={<Tooltip>Jednostka</Tooltip>} >
                                    <input className="form-control" id="jednostka" type="text" placeholder="szt" disabled />
                                </OverlayTrigger>
                            </Col>
                            <Col>
                                <OverlayTrigger placement="auto" overlay={<Tooltip>ile jednostek</Tooltip>}>
                                    <input className="form-control" id="ilosc" type="number" placeholder="20" disabled />
                                </OverlayTrigger>
                            </Col>
                            <Col>
                                <OverlayTrigger placement="auto" overlay={<Tooltip>cena za X jednostek</Tooltip>} >
                                    <input className="form-control" id="cena" type="number" placeholder="1" disabled /> 
                                </OverlayTrigger>
                            </Col>
                        </Form.Row>

                        <Button variant="primary" onClick={() => dodajSkladnik()}>Dodaj składnik</Button>
                    </Form>
                </Card>

                {lista && lista.length>0?
                    <Card>
                        <Card.Header><h2>Aktualna cena: {cena+ " knutów"}</h2></Card.Header>
                        <ListGroup variant="dark">
                            {
                                lista.map((l, ind)=>(
                                    <ListGroup.Item key={ind}>
                                        { `${l.nazwa} [${l.typ}] ${l.ile}${l.jednostka} = ${l.wartosc} knutów` }
                                        <button type="button" className="close" style={{ float: "right", color: "#b2becd" }} onClick={()=>  usunSkladnik(l.id) } >X</button>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    </Card>
                : ""}

            </div>


        </>
    )
}

export default Cennik;
