import { useContext, useState } from 'react';
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { Context } from "../user";

import axios from "axios";

const EInfo = ({ info, onDelete, blad }) => {
    const [ stan, setStan ] = useState( Array( info.length ).fill(0) );
    const [ user,  ] = useContext(Context);
    
    const akceptuj = async (e) => {
        e.preventDefault();
        if( !user ) 
            return blad({ type: "danger", error: "Nie jesteś zalgoowany!" });
        if( !user.hasPerms ) 
            return blad({ type: "danger", error: "Nie masz permissi!" });


        const data = {
            ocena: "zaakceptowany",
            gosc: e.target.gosc.value,
            id: e.target.id.value,
            pile: e.target.pile.value,
            cena: e.target.cena.value,
            pdata: e.target.pdata.value,
            user: user.username,
            permissions: user.guilds.filter(g => g.id == "133227600746250240" )[0].permissions
        }

        await axios.post(`http://hapel-ic.pl/api/elki/verify`, data)
        .then( res => {
            if(res.data.ok){
                blad({ type: "success", error: `Zatwierdzono eliksir ${data.id}!` });
                onDelete( data.id );
            }else{
                blad(res.data.error || { type: "danger", error: "Nieoczekiwany błąd" });
            }
        })
        .catch(er => {
            blad(er.response.data || { type: "danger", error: "Nieznany błąd" });
        })

        return;
    }
    const odrzuc = async (e) => { 
        e.preventDefault();
        if( !user ) 
            return blad({ type: "danger", error: "Nie jesteś zalogowany!" });
        if( !user.hasPerms ) 
            return blad({ type: "danger", error: "Nie masz permissi!"});

        const data = {
            ocena: "odrzucony",
            gosc: e.target.gosc.value,
            id: e.target.id.value,
            powod: e.target.powod.value,
            user: user.username,
            permissions: user.guilds.filter(g => g.id == "133227600746250240" )[0].permissions
        }

        await axios.post(`http://hapel-ic.pl/api/elki/verify`, data)
        .then( res => {
            if(res.data.ok){
                blad({ type: "success", error: `Odrzucono eliksir ${data.id}!` });
                onDelete( data.id );
            }else{
                blad(res.data.error || { type: "danger", error: "Nieoczekiwany błąd"});
            }
        })
        .catch(er => {
            blad(er.response.data || { type: "danger", error: "Nieznany błąd"});
        });
    }

    const updateStan = (ind, value) => {
        let ar = [ ...stan ];
        ar[ind] = value;
        return setStan([ ...ar ]);
    }

    return (
        <>
            { 
                info.map((eliksir, ind) => (
                    <Card key={ind} style={{ margin: "20px" }}>
                        <Card.Body>
                            <Card.Title> 
                                <Col>
                                    <h3>
                                        {eliksir.id}
                                    </h3>
                                </Col>
                                <Col style={{ flexGrow: "2" }}>
                                    <Badge style={{ marginRight: "5px" }} variant={eliksir.weryfikowane==1? "success": "danger" } >Weryfikowany</Badge> 
                                    <Badge style={{ marginRight: "5px" }} variant={eliksir.odebrane==1? "success": "danger" } className={ eliksir.odebrane==1? "hoverContainer" : "" } >Odebrane{ eliksir.odebrane==1? <span className="hoverText">{new Date(Number(eliksir.data_odebrania)).toDateString() || "Brak daty odebrania"}</span>: "" }</Badge> 
                                    <Badge style={{ marginRight: "5px" }} variant="warning" >Cena <Badge variant="light">{eliksir.cena}</Badge></Badge> 
                                </Col>

                                <button type="button" className="close" style={{ color: "#b2becd" }} onClick={()=> { updateStan(ind, 0); onDelete( eliksir.id )}} >X</button>

                            </Card.Title>
                            <div style={{ display: "flex" }} className="sm-col">
                                <Col>
                                    {
                                        eliksir.discord?
                                            <Link to={`/user/${eliksir.discord}`} style={{ color: "#c5c9c5" }}><h5 className="hoverContainer">Nick: {eliksir.gracz || "Nieznany"} <span className="hoverText">{eliksir.uuid || ""}</span> </h5></Link>
                                        :
                                            <h5 className="hoverContainer">Nick: {eliksir.gracz || "Nieznany"} <span className="hoverText">{eliksir.uuid || ""}</span> </h5>
                                    }
                                    <h5>Eliksir: {eliksir.eliksir || "Nieznany eliksir"}</h5>
                                    <p>Discord: { eliksir.discord? `<@${eliksir.discord}>`: "Brak" }</p>
                                    <p>Kociołek: {eliksir.kociołek || "Cynowy rozmiar 2"}</p>
                                </Col>
                                <Col>
                                    <ol className="elki_przepis">
                                        {
                                            JSON.parse(eliksir.przepis.replace(/§./g, "")).map((krok, index)=>(
                                                <li key={index}>
                                                    {krok}
                                                </li>
                                            ))
                                        }
                                    </ol>
                                </Col>
                            </div>
                            {
                                user && ( user.hasPerms == true && eliksir.weryfikowane != 1 ) ? 
                                    <>

                                        <div id={`deny-${eliksir.id}`} className={stan[ind]==1? "": "toggle-visible"}>
                                            <Form style={{ margin: "15px" }} onSubmit={ odrzuc }>
                                                <h3>Odrzuć</h3>
                                                <Form.Control type="text" value={eliksir.id} name="id" className="toggle-visible" readOnly />
                                                <Form.Control type="text" value={eliksir.discord} name="gosc" className="toggle-visible" readOnly />
                                                
                                                <Form.Group>
                                                    <Form.Label>Podaj powód odrzucenia</Form.Label>
                                                    <Form.Control as="textarea" name="powod" rows={3} />
                                                </Form.Group>
                                                
                                                <Button variant="primary" type="submit">
                                                    Zatwierdź
                                                </Button>
                                            </Form>
                                        </div>

                                        <div id={`akcept-${eliksir.id}`} className={stan[ind]==2? "": "toggle-visible"}>
                                            <Form style={{ margin: "15px" }} onSubmit={ akceptuj }>
                                                <h3>Zaakceptuj</h3>
                                                <Form.Control type="text" value={eliksir.id} name="id" className="toggle-visible" readOnly />
                                                <Form.Control type="text" value={eliksir.discord} name="gosc" className="toggle-visible" readOnly />

                                                <Form.Row>
                                                    <Col>
                                                        <Form.Group>
                                                            <Form.Label>Liczba fiolek do odebrania</Form.Label>
                                                            <Form.Control type="number" placeholder="4" name="pile" />
                                                            <Form.Text className="text-muted">
                                                                Gracz otrzyma z reguły 4 fiolki jeżeli nie zmienisz wartości.
                                                            </Form.Text>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group>
                                                            <Form.Label>Ważność eliksiru</Form.Label>
                                                            <Form.Control type="number" placeholder="14" name="pdata" />
                                                            <Form.Text className="text-muted">
                                                                14 dni to podstawowa wartość o ile nie ma customowej daty.
                                                            </Form.Text>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group>
                                                            <Form.Label>Cena za odebranie</Form.Label>
                                                            <Form.Control type="number" placeholder={eliksir.cena} name="cena" />
                                                            <Form.Text className="text-muted">
                                                                Wpisz 0 jeżeli ma być darmowe.
                                                            </Form.Text>
                                                        </Form.Group>
                                                    </Col>
                                                </Form.Row>

                                                <Button variant="primary" type="submit">
                                                    Zatwierdź
                                                </Button>
                                            </Form>
                                        </div>

                                        <Button variant="danger" onClick={ () => updateStan(ind, stan[ind]==1? 0: 1) } style={{ float: "left" }} >Odrzuć</Button><Button variant="success" onClick={ () => updateStan(ind, stan[ind]==2? 0: 2) } style={{ float: "right"}} >Zaakceptuj</Button> 
                                    </>
                                :
                                    ""
                            }


                        </Card.Body>
                    </Card>
                ))
            }
        </>

    );
}

export default EInfo;