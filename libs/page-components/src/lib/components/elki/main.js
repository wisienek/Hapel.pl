import { useState } from "react";

import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const MainElki = ({ blad, topG, topE }) => {
    const [active, setActive] = useState(1);

    const switchActive = ( id ) => {
        if(!id) return blad({ type: "danger", error: "Brak id swtichActive!"});
        setActive(id);

    }

  return (
    <Card>
        <Card.Body>
            <Card.Title>
                <Col>
                    <h3>Top eliksirów</h3>
                </Col>
                <Col>
                    <ButtonGroup toggle className="mb-2" style={{ float: "right" }} >
                        <ToggleButton type="radio" name="radio" value={1} checked={1 === active} onChange={() => switchActive(1) } variant={ active===1? "info" :"secondary"}>Gracze</ToggleButton>
                        <ToggleButton type="radio" name="radio" value={2} checked={2 === active} onChange={() => switchActive(2) } variant={ active===2? "info" :"secondary"}>Eliksiry</ToggleButton>
                    </ButtonGroup>
                </Col>
            </Card.Title>

            <Table striped bordered hover variant="dark" className={ active === 1? "": "toggle-visible" } >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Gracz</th>
                        <th>Discord</th>
                        <th>Ilość</th>
                        <th>Najczęściej</th>
                        <th>jak często</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        topG.length>0 && topG.map((t, index)=>(
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <th>{t.gosc}</th>
                                <th>{t.discord}</th>
                                <th>{t.Licz}</th>
                                <th>{t.elek}</th>
                                <th>{t.liczElek}</th>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

            <Table striped bordered hover variant="dark" className={active===2? "": "toggle-visible"} >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Eliksir</th>
                        <th>Ilość</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        topE.length>0 && topE.map( (t, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <th>{t.eliksir}</th>
                                <th>{t.Licz}</th>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

        </Card.Body>
    </Card>
  );
}

export default MainElki;
